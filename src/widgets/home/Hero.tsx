import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { offices } from '../../data/offices';
import styles from './Hero.module.css';
import clsx from 'clsx';

const ease = [0.16, 1, 0.3, 1] as const;
const SLIDE_DURATION = 6000;

const SLIDES = [
  {
    src: '/images/hero/hero-main-wide.jpg',
    alt: 'Engineering team collaborating on laptops around a shared table',
    tag: 'Digital Transformation',
    line: 'Reengineering legacy cores into agile, cloud-native platforms.',
  },
  {
    src: '/images/hero/hero-data.jpg',
    alt: 'Engineer reviewing infrastructure in a data center',
    tag: 'Data, Cloud & Analytics',
    line: 'Real-time intelligence, from data center to decision engine.',
  },
  {
    src: '/images/hero/hero-finance.jpg',
    alt: 'Financial district skyscrapers seen from below',
    tag: 'Banking & Financial Services',
    line: 'Compliance-ready delivery for the world’s regulated industries.',
  },
  {
    src: '/images/hero/hero-global.jpg',
    alt: 'Distributed team working across laptops and devices',
    tag: 'Global Process Outsourcing',
    line: `KPO/BPO operations across ${offices.length} delivery centers, always on.`,
  },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [active, paused]);

  const goTo = (index: number) => setActive((index + SLIDES.length) % SLIDES.length);

  return (
    <section className={styles.hero}>
      <div
        className={styles.carousel}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
        aria-label="Natobotics service lines"
      >
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={clsx(styles.slide, i === active && styles.slideActive)}
            aria-hidden={i !== active}
          >
            <img src={slide.src} alt={slide.alt} className={styles.slideImg} />
          </div>
        ))}
        <div className={styles.overlay} aria-hidden="true" />
        <div className={styles.grain} aria-hidden="true" />

        <Container className={styles.content}>
          <div className={styles.eyebrowRow}>
            <span className={styles.slideIndex}>
              {String(active + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                className={styles.slideTag}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease }}
              >
                {SLIDES[active].tag}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            New business models to <span className={styles.gradientTextOrange}>renew customer experience</span>.
          </motion.h1>

          <motion.p
            className={styles.subhead}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            Natobotics is a global leader in next-generation digital services, process
            outsourcing, and IT consulting. We enable clients across 50+ countries to
            expertly steer their digital journeys with an agile delivery core.
          </motion.p>

          <motion.div
            className={styles.ctaRow}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            <Button to="/contact" size="lg" variant="orange">
              Start a project
            </Button>
            <Button to="/services" size="lg" variant="secondary">
              Explore Services
            </Button>
          </motion.div>

          <motion.dl
            className={styles.statRow}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
          >
            <div className={styles.statItem}>
              <dt className={styles.statLabel}>Countries served</dt>
              <dd className={styles.statValue}>50+</dd>
            </div>
            <div className={styles.statItem}>
              <dt className={styles.statLabel}>Delivery centers</dt>
              <dd className={styles.statValue}>{offices.length}</dd>
            </div>
            <div className={styles.statItem}>
              <dt className={styles.statLabel}>Years of delivery</dt>
              <dd className={styles.statValue}>12</dd>
            </div>
          </motion.dl>
        </Container>

        <Container className={styles.controlBar}>
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              className={styles.slideLine}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
            >
              {SLIDES[active].line}
            </motion.p>
          </AnimatePresence>

          <div className={styles.controls}>
            <div className={styles.indicators} role="tablist" aria-label="Slides">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.src}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Slide ${i + 1}: ${slide.tag}`}
                  className={clsx(styles.indicator, i === active && styles.indicatorActive)}
                  onClick={() => goTo(i)}
                >
                  {i === active && (
                    <span
                      key={`progress-${active}-${paused}`}
                      className={styles.indicatorProgress}
                      style={{ animationPlayState: paused ? 'paused' : 'running' }}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className={styles.arrows}>
              <button className={styles.arrowBtn} onClick={() => goTo(active - 1)} aria-label="Previous slide">
                ←
              </button>
              <button className={styles.arrowBtn} onClick={() => goTo(active + 1)} aria-label="Next slide">
                →
              </button>
            </div>
          </div>
        </Container>
      </div>

      <div className={styles.marqueeContainer}>
        <p className={styles.marqueeTitle}>Trusted by industry leaders in</p>
        <div className={styles.marquee}>
          <div className={styles.marqueeTrack}>
             <span>Banking & Financial Services</span>
             <span className={styles.marqueeDot} />
             <span>Insurance</span>
             <span className={styles.marqueeDot} />
             <span>Media & Entertainment</span>
             <span className={styles.marqueeDot} />
             <span>Telecom</span>
             <span className={styles.marqueeDot} />
             <span>Oil & Energy</span>
             <span className={styles.marqueeDot} />
             <span>Banking & Financial Services</span>
             <span className={styles.marqueeDot} />
             <span>Insurance</span>
             <span className={styles.marqueeDot} />
             <span>Media & Entertainment</span>
             <span className={styles.marqueeDot} />
             <span>Telecom</span>
             <span className={styles.marqueeDot} />
             <span>Oil & Energy</span>
             <span className={styles.marqueeDot} />
          </div>
        </div>
      </div>
    </section>
  );
}
