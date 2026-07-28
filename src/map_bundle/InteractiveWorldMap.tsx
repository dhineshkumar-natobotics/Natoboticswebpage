'use client';

import { useEffect, useState } from 'react';
import styles from './InteractiveWorldMap.module.css';

const W = 1000, H = 650;
const NAVY = '#0D2B6B';
const ORANGE = '#F57C00';
const DOT = '#A8BFF4';
const LINE = '#8BAEE8';
const PULSE = '#4A7FE8';

const LOCS = [
  { id: 'Canada', lon: -96, lat: 60, lx: 10, ly: -24, ta: 'start' },
  { id: 'USA', lon: -98, lat: 38, lx: 10, ly: 22, ta: 'start' },
  { id: 'UK', lon: -0, lat: 51, lx: 889, ly: 5973, ta: 'start' },
  { id: 'Europe', lon: 15, lat: 51, lx: 10, ly: 22, ta: 'start' },
  { id: 'UAE', lon: 55, lat: 25, lx: 10, ly: 22, ta: 'start' },
  { id: 'India', lon: 79, lat: 22, lx: 10, ly: -24, ta: 'start' },
  { id: 'South Africa', lon: 26, lat: -29, lx: 10, ly: 22, ta: 'start' },
  { id: 'Australia', lon: 135, lat: -26, lx: -10, ly: -24, ta: 'end' },
  { id: 'New Zealand', lon: 174, lat: -41, lx: 10, ly: 22, ta: 'start' },
];

const CONNS = [
  ['India', 'UAE'],
  ['India', 'Australia'],
  ['India', 'South Africa'],
  ['UAE', 'Europe'],
  ['UAE', 'South Africa'],
  ['Australia', 'New Zealand'],
  ['Europe', 'UK'],
  ['Europe', 'USA'],
  ['UK', 'USA'],
  ['UK', 'Canada'],
];




function pinPath(r: number, h: number) {
  const cy = -(h - r);
  return `M0,0 C${-r * 0.85},${cy + r * 0.5} ${-r},${cy + r * 0.05} ${-r},${cy} A${r},${r} 0 1,1 ${r},${cy} C${r},${cy + r * 0.05} ${r * 0.85},${cy + r * 0.5} 0,0 Z`;
}

function arcCP(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1, dist = Math.hypot(dx, dy);
  let nx = -dy / dist, ny = dx / dist;
  if (ny > 0) { nx = -nx; ny = -ny; }
  return [mx + nx * Math.min(dist * 0.22, 72), Math.max(18, my + ny * Math.min(dist * 0.22, 72))];
}



interface InteractiveWorldMapProps {
  hoveredCountry: string | null;
  onLocationHover: (id: string | null) => void;
}

export default function InteractiveWorldMap({ hoveredCountry, onLocationHover }: InteractiveWorldMapProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Use a small timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.01 }
      );

      const container = document.getElementById('gcm-container');
      if (container) {
        observer.observe(container);
      }

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timers: any[] = [];
    let cancelled = false;

    async function init() {
      const d3 = await import('d3');
      const topojson = await import('topojson-client');

      if (cancelled) return;

      // Clear previous content
      d3.select('#gcm-dots').selectAll('*').remove();
      d3.select('#gcm-lines').selectAll('*').remove();
      d3.select('#gcm-pulses').selectAll('*').remove();
      d3.select('#gcm-pins').selectAll('*').remove();

      const proj = d3.geoNaturalEarth1().scale(200).translate([W / 2 - 50, H / 2 + 80]);

      const world = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json') as any;
      if (cancelled) return;

      const land = topojson.merge(world, world.objects.countries.geometries);

      const cv = document.createElement('canvas');
      cv.width = W; cv.height = H;
      const ctx = cv.getContext('2d')!;
      d3.geoPath().projection(proj).context(ctx)(land as any);
      ctx.fillStyle = '#000'; ctx.fill();
      const px = ctx.getImageData(0, 0, W, H).data;

      const dotsG = d3.select('#gcm-dots');
      for (let x = 0; x < W; x += 6) {
        for (let y = 0; y < H - 80; y += 6) {
          if (px[(y * W + x) * 4 + 3] > 0) {
            dotsG.append('circle')
              .attr('cx', x).attr('cy', y).attr('r', 1.8)
              .attr('fill', 'none').attr('stroke', DOT).attr('stroke-width', 0.85);
          }
        }
      }

      const pos: Record<string, [number, number]> = {};
      for (const loc of LOCS) {
        const p = proj([loc.lon, loc.lat]);
        if (p) {
          pos[loc.id] = p;
        } else {
          pos[loc.id] = [0, 0];
        }
      }

      const linesG = d3.select('#gcm-lines');
      const pulsesG = d3.select('#gcm-pulses');

      function animatePulsesOnPath(arcD: string, pathLen: number) {
        const COUNT = 3, SEG = 5, GAP = pathLen / COUNT;
        const DURATION = 1800, LOOP_PAUSE = 300;

        function spawnBullet(offsetAlong: number) {
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

        const lineLen = (path.node() as SVGPathElement).getTotalLength();
        const pulseDelay = 900 + i * 160 + 700 + 200 + i * 180;

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

      const PR = 9, PH = 24;
      const pinsG = d3.select('#gcm-pins');

      LOCS.forEach((loc, i) => {
        const [sx, sy] = pos[loc.id];

        const g = pinsG.append('g')
          .attr('class', 'gcm-pin')
          .attr('data-location', loc.id)
          .attr('transform', `translate(${sx},${sy}) scale(0)`)
          .attr('opacity', 0)
          .attr('tabindex', '0')
          .attr('role', 'button')
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

        // Hover events
        g.on('mouseenter', () => onLocationHover(loc.id))
          .on('mouseleave', () => onLocationHover(null));
      });



      const dotsEl = document.getElementById('gcm-dots');
      if (dotsEl) {
        dotsEl.style.transition = 'opacity 1.1s ease';
        timers.push(setTimeout(() => { dotsEl.style.opacity = '1'; }, 100));
      }

      timers.push(setTimeout(() => setIsLoading(false), 500));
    }

    init().catch(console.error);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [onLocationHover, isVisible]);

  // Highlight pin when country card is hovered
  useEffect(() => {
    if (!hoveredCountry) {
      document.querySelectorAll('.gcm-pin').forEach(el => {
        (el as SVGGElement).classList.remove('highlighted');
      });
      return;
    }

    const pin = document.querySelector(`[data-location="${hoveredCountry}"]`);
    if (pin) {
      document.querySelectorAll('.gcm-pin').forEach(el => {
        (el as SVGGElement).classList.remove('highlighted');
      });
      pin.classList.add('highlighted');
    }
  }, [hoveredCountry]);

  return (
    <div id="gcm-container" style={{ position: 'relative', width: '100%', minHeight: '600px', display: 'flex', alignItems: 'center' }}>
      {isLoading && (
        <div className={styles.loader}>
          <div className={styles.spin} />
          <span className={styles.loaderTxt}>Loading World Atlas</span>
        </div>
      )}

      <svg
        id="gcm-svg"
        className={styles.svg}
        viewBox="0 0 1000 650"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Global coverage world map"
        style={{ width: '100%', height: 'auto' }}
      >
        <title>Global Coverage Map</title>
        <defs>
          <filter id="gcm-pin-shadow" x="-80%" y="-80%" width="260%" height="300%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(5,10,80,0.25)" />
          </filter>
        </defs>

        <g id="gcm-dots" style={{ opacity: 0 }} />
        <g id="gcm-lines" />
        <g id="gcm-pulses" />
        <g id="gcm-pins" />
      </svg>
    </div>
  );
}
