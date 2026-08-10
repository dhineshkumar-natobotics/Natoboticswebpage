'use client';

import { useEffect } from 'react';
import styles from './GlobalCoverageMap.module.css';

// ── constants (same as original HTML) ───────────────────────────────────────
const W = 1200, H = 600;
const NAVY  = '#0D1C6A';
const ORANGE = '#F07B1E';
const DOT   = '#A8BFF4';
const LINE  = '#8BAEE8';
const PULSE = '#4A7FE8';

const LOCS = [
  { id: 'Canada',      lon: -96, lat:  60, lx:  10, ly: -24, ta: 'start' },
  { id: 'USA',         lon: -98, lat:  38, lx:  10, ly:  22, ta: 'start' },
  { id: 'UK',          lon:  -3, lat:  54, lx:  10, ly: -24, ta: 'start' },
  { id: 'Europe',      lon:  15, lat:  51, lx:  10, ly:  22, ta: 'start' },
  { id: 'UAE',         lon:  55, lat:  25, lx:  10, ly:  22, ta: 'start' },
  { id: 'India',       lon:  79, lat:  22, lx:  10, ly: -24, ta: 'start' },
  { id: 'S. Africa',   lon:  26, lat: -29, lx:  10, ly:  22, ta: 'start' },
  { id: 'Australia',   lon: 135, lat: -26, lx: -10, ly: -24, ta: 'end'   },
  { id: 'New Zealand', lon: 174, lat: -41, lx:  10, ly:  22, ta: 'start' },
];

const CONNS = [
  ['India', 'UAE'],
  ['India', 'Australia'],
  ['India', 'S. Africa'],
  ['UAE',   'Europe'],
  ['UAE',   'S. Africa'],
  ['Australia', 'New Zealand'],
  ['Europe', 'UK'],
  ['Europe', 'USA'],
  ['UK',    'USA'],
  ['UK',    'Canada'],
];

const SKYLINE = [
  [8,40],[32,58],[56,38],[80,66],[104,44],[126,36],[148,58],[170,42],[192,50],[212,34],[234,54],
  [W-242,44],[W-220,62],[W-196,38],[W-172,68],[W-148,46],[W-126,52],[W-102,36],[W-78,62],[W-54,44],[W-30,36],[W-10,52],
];

// ── pure helpers (identical to original) ────────────────────────────────────
function pinPath(r, h) {
  const cy = -(h - r);
  return `M0,0 C${-r*0.85},${cy+r*0.5} ${-r},${cy+r*0.05} ${-r},${cy} A${r},${r} 0 1,1 ${r},${cy} C${r},${cy+r*0.05} ${r*0.85},${cy+r*0.5} 0,0 Z`;
}

function arcCP(x1, y1, x2, y2) {
  const mx = (x1+x2)/2, my = (y1+y2)/2;
  const dx = x2-x1,     dy = y2-y1, dist = Math.hypot(dx, dy);
  let nx = -dy/dist, ny = dx/dist;
  if (ny > 0) { nx = -nx; ny = -ny; }
  return [mx + nx * Math.min(dist*0.22, 72), Math.max(18, my + ny * Math.min(dist*0.22, 72))];
}

function skylinePath(blds) {
  let d = `M0,${H}`;
  for (const [x, bh] of blds)
    d += ` L${x},${H} L${x},${H-bh} L${x+20},${H-bh} L${x+20},${H}`;
  return d + ` L${W},${H} Z`;
}

// ── component ────────────────────────────────────────────────────────────────
export default function GlobalCoverageMap() {
  useEffect(() => {
    // Track all timer IDs so we can cancel them on unmount
    const timers = [];
    let cancelled = false;

    async function init() {
      // Dynamic imports keep d3/topojson out of the SSR bundle
      const d3       = await import('d3');
      const topojson = await import('topojson-client');

      if (cancelled) return;

      // ── projection ────────────────────────────────────────────────────────
      const proj = d3.geoNaturalEarth1().scale(192).translate([W/2, H/2 + 10]);

      // ── world atlas ───────────────────────────────────────────────────────
      const world = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
      if (cancelled) return;

      const land = topojson.merge(world, world.objects.countries.geometries);

      // ── rasterise land to canvas → sample dots ───────────────────────────
      const cv = document.createElement('canvas');
      cv.width = W; cv.height = H;
      const ctx = cv.getContext('2d');
      d3.geoPath().projection(proj).context(ctx)(land);
      ctx.fillStyle = '#000'; ctx.fill();
      const px = ctx.getImageData(0, 0, W, H).data;

      const dotsG = d3.select('#gcm-dots');
      for (let x = 0; x < W; x += 6) {
        for (let y = 0; y < H; y += 6) {
          if (px[(y*W + x)*4 + 3] > 0) {
            dotsG.append('circle')
              .attr('cx', x).attr('cy', y).attr('r', 1.8)
              .attr('fill', 'none').attr('stroke', DOT).attr('stroke-width', 0.85);
          }
        }
      }

      // ── project location coordinates ──────────────────────────────────────
      const pos = {};
      for (const loc of LOCS) {
        const [sx, sy] = proj([loc.lon, loc.lat]);
        pos[loc.id] = [sx, sy];
      }

      const linesG  = d3.select('#gcm-lines');
      const pulsesG = d3.select('#gcm-pulses');

      // ── pulse bullets (same logic as original animatePulsesOnPath) ────────
      function animatePulsesOnPath(arcD, pathLen) {
        const COUNT = 3, SEG = 5, GAP = pathLen / COUNT;
        const DURATION = 1800, LOOP_PAUSE = 300;

        function spawnBullet(offsetAlong) {
          if (cancelled) return;
          const line = pulsesG.append('path')
            .attr('d', arcD)
            .attr('fill', 'none')
            .attr('stroke', PULSE)
            .attr('stroke-width', 2.2)
            .attr('stroke-linecap', 'round')
            .attr('stroke-dasharray', `${SEG} ${pathLen + SEG}`)
            .attr('stroke-dashoffset', pathLen + SEG - offsetAlong)
            .attr('opacity', 0.9);

          line.transition()
            .duration(DURATION)
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', -(offsetAlong + SEG))
            .attr('opacity', 0.9)
            .on('end', function () { d3.select(this).remove(); });
        }

        function loop() {
          if (cancelled) return;
          for (let i = 0; i < COUNT; i++) {
            timers.push(setTimeout(() => spawnBullet(i * GAP), i * (DURATION / COUNT)));
          }
          timers.push(setTimeout(loop, DURATION + LOOP_PAUSE));
        }

        loop();
      }

      // ── draw arc connections ───────────────────────────────────────────────
      CONNS.forEach(([a, b], i) => {
        const [x1, y1] = pos[a], [x2, y2] = pos[b];
        const [cpx, cpy] = arcCP(x1, y1, x2, y2);
        const arcD = `M${x1},${y1} Q${cpx},${cpy} ${x2},${y2}`;

        const path = linesG.append('path')
          .attr('d', arcD)
          .attr('fill', 'none')
          .attr('stroke', LINE)
          .attr('stroke-width', 1.4)
          .attr('opacity', 0);

        const lineLen   = path.node().getTotalLength();
        const pulseDelay = 900 + i*160 + 700 + 200 + i*180;

        path
          .attr('stroke-dasharray', lineLen)
          .attr('stroke-dashoffset', lineLen)
          .transition()
            .delay(900 + i * 160)
            .duration(700)
            .ease(d3.easeQuadInOut)
            .attr('stroke-dashoffset', 0)
            .attr('opacity', 0.5)
          .on('end', function () {
            d3.select(this).attr('stroke-dasharray', '6,5').attr('stroke-dashoffset', 0);
          });

        timers.push(setTimeout(() => animatePulsesOnPath(arcD, lineLen), pulseDelay));
      });

      // ── draw pins ─────────────────────────────────────────────────────────
      const PR = 9, PH = 24;
      const pinsG = d3.select('#gcm-pins');

      LOCS.forEach((loc, i) => {
        const [sx, sy] = pos[loc.id];

        const g = pinsG.append('g')
          .attr('class', 'gcm-pin')
          .attr('transform', `translate(${sx},${sy}) scale(0)`)
          .attr('opacity', 0)
          .attr('tabindex', '0')
          .attr('role', 'img')
          .attr('aria-label', `${loc.id} office`);

        const inner = g.append('g').attr('class', 'pin-group');
        inner.append('path')
          .attr('d', pinPath(PR, PH))
          .attr('fill', NAVY)
          .attr('filter', 'url(#gcm-pin-shadow)');

        const pcY = -(PH - PR);
        inner.append('circle').attr('cx', 0).attr('cy', pcY).attr('r', PR * 0.56).attr('fill', '#fff');
        inner.append('circle').attr('cx', 0).attr('cy', pcY).attr('r', PR * 0.23).attr('fill', ORANGE);

        g.append('circle').attr('class', 'pin-hit').attr('cx', 0).attr('cy', pcY).attr('r', 22);
        g.append('text')
          .attr('x', loc.lx).attr('y', loc.ly)
          .attr('text-anchor', loc.ta)
          .attr('font-size', '12').attr('font-weight', '600')
          .attr('fill', NAVY)
          .style('user-select', 'none').style('pointer-events', 'none')
          .text(loc.id);

        g.transition()
          .delay(500 + i * 110)
          .duration(500)
          .ease(d3.easeBackOut.overshoot(1.6))
          .attr('transform', `translate(${sx},${sy}) scale(1)`)
          .attr('opacity', 1);
      });

      // ── skyline silhouette ────────────────────────────────────────────────
      d3.select('#gcm-skyline').attr('d', skylinePath(SKYLINE));

      // ── fade in dots + hide loader (same timing as original) ─────────────
      const dotsEl = document.getElementById('gcm-dots');
      if (dotsEl) {
        dotsEl.style.transition = 'opacity 1.1s ease';
        timers.push(setTimeout(() => { dotsEl.style.opacity = '1'; }, 100));
      }

      const loader = document.getElementById('gcm-loader');
      if (loader) {
        loader.style.opacity = '0';
        timers.push(setTimeout(() => { loader.style.display = 'none'; }, 500));
      }
    }

    init().catch(console.error);

    // ── cleanup on unmount ───────────────────────────────────────────────────
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div id="gcm-wrap" className={styles.wrap}>
      {/* Loader */}
      <div id="gcm-loader" className={styles.loader}>
        <div className={styles.spin} />
        <span className={styles.loaderTxt}>Loading World Atlas</span>
      </div>

      {/* SVG canvas — D3 writes into the named groups below */}
      <svg
        id="gcm-svg"
        className={styles.svg}
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Global coverage world map"
      >
        <title>Global Coverage Map</title>
        <defs>
          <filter id="gcm-pin-shadow" x="-80%" y="-80%" width="260%" height="300%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(5,10,80,0.25)" />
          </filter>
        </defs>

        <g id="gcm-dots"    style={{ opacity: 0 }} />
        <g id="gcm-lines"   />
        <g id="gcm-pulses"  />
        <g id="gcm-pins"    />
        <path id="gcm-skyline" fill="#7898DC" opacity="0.07" />
      </svg>
    </div>
  );
}
