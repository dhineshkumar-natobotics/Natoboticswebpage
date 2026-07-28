import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../../components/ui/Container/Container';
import { Button } from '../../components/ui/Button/Button';
import { offices } from '../../data/offices';
import { clients } from '../../data/clients';
import styles from './Hero.module.css';
import clsx from 'clsx';

const ease = [0.16, 1, 0.3, 1] as const;

const tickerNames = clients.map((c) => c.name);

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.carousel}>
        <video
          ref={videoRef}
          className={clsx(styles.video, videoLoaded && styles.videoLoaded)}
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          aria-hidden="true"
        />
        <div className={styles.overlay} aria-hidden="true" />
        <div className={styles.grain} aria-hidden="true" />

        <Container className={styles.content}>
          <motion.span
            className={styles.slideTag}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
          >
            Digital Transformation
          </motion.span>

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

        {/* Company Name Ticker — inside carousel so video + ticker are one frame */}
        <div className={styles.ticker}>
          <div className={styles.tickerTrack}>
            {[0, 1].map((set) => (
              <span key={set} className={styles.tickerSet}>
                {tickerNames.map((name, i) => (
                  <span key={`${set}-${i}`} className={styles.tickerItem}>
                    {name}
                    <span className={styles.tickerDot} aria-hidden="true" />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
