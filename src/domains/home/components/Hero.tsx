import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../../../shared/ui/Container/Container';
import { Button } from '../../../shared/ui/Button/Button';
import { Counter } from '../../../shared/ui/Counter/Counter';
import { offices } from '../../../shared/data/offices';
import styles from './Hero.module.css';
import clsx from 'clsx';

const ease = [0.16, 1, 0.3, 1] as const;

const CLIENT_LOGOS = [
  'Acutest.jpg',
  'allied-irish-bank.jpg',
  'bgc.png',
  'deutsche-bank.png',
  'harrods.png',
  'hexaware.png',
  'k2.png',
  'maya.jpg',
  'nlgc.png',
  'nttdata.png',
  'rbs.webp',
  'version1.jpg',
  'vps.png'
];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => { });
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
          <div className={styles.leftCol}>
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
          </div>

          <div className={styles.rightCol}>
            <motion.dl
              className={styles.statRow}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
            >
              <div className={styles.statItem}>
                <dt className={styles.statLabel}>Countries served</dt>
                <dd className={styles.statValue}><Counter value="50+" delay={0.6} /></dd>
              </div>
              <div className={styles.statItem}>
                <dt className={styles.statLabel}>Delivery centers</dt>
                <dd className={styles.statValue}><Counter value={offices.length.toString()} delay={0.6} /></dd>
              </div>
              <div className={styles.statItem}>
                <dt className={styles.statLabel}>Years of delivery</dt>
                <dd className={styles.statValue}><Counter value="12" delay={0.6} /></dd>
              </div>
            </motion.dl>
          </div>
        </Container>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className={styles.marqueeContainer}
        >
          <div className={styles.marqueeTrack}>
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
              <img
                key={i}
                src={`/clients/${logo}`}
                alt="Client logo"
                className={styles.clientLogo}
                loading="lazy"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
