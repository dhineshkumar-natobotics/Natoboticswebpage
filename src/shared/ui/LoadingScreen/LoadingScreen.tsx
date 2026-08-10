import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import styles from './LoadingScreen.module.css';

const BRAND = 'Natobotics';
const MIN_DURATION = 1600; // ms the loader stays up even on a fast load
const MAX_DURATION = 4000; // ms before we bail out regardless of load state

const letterContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.15 },
  },
};

const letter = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function LoadingScreen({ onFinish }: { onFinish?: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDone(true);
      onFinish?.();
      return;
    }

    document.body.style.overflow = 'hidden';

    const start = performance.now();
    let pageLoaded = document.readyState === 'complete';
    let raf = 0;
    let value = 0;

    const onLoad = () => {
      pageLoaded = true;
    };
    window.addEventListener('load', onLoad);

    const tick = (now: number) => {
      const elapsed = now - start;
      // Ramp toward 90% on a fixed clock; the last 10% is unlocked by the
      // real window load event (or the hard timeout).
      const ceiling =
        pageLoaded || elapsed > MAX_DURATION
          ? 100
          : Math.min(90, (elapsed / MIN_DURATION) * 90);
      value += (ceiling - value) * 0.08;

      if (value > 99.5 && elapsed >= MIN_DURATION) {
        setProgress(100);
        if (!finishedRef.current) {
          finishedRef.current = true;
          setTimeout(() => {
            setDone(true);
            onFinish?.();
          }, 350);
        }
        return;
      }

      setProgress(Math.floor(value));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', onLoad);
      document.body.style.overflow = '';
    };
  }, [prefersReducedMotion, onFinish]);

  useEffect(() => {
    if (done) document.body.style.overflow = '';
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className={styles.overlay}
          role="status"
          aria-label="Loading Natobotics"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className={styles.mesh} aria-hidden="true" />

          <motion.div
            className={styles.center}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeIn' }}
          >
            <motion.img
              src="/natobotics-logo.png"
              alt="Natobotics"
              className={styles.mark}
              aria-hidden="true"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.34, 1.2, 0.64, 1] }}
            />
            <motion.h1
              className={styles.wordmark}
              variants={letterContainer}
              initial="hidden"
              animate="visible"
            >
              {BRAND.split('').map((char, i) => (
                <span key={i} className={styles.letterMask}>
                  <motion.span className={styles.letter} variants={letter}>
                    {char}
                  </motion.span>
                </span>
              ))}
            </motion.h1>
            <motion.p
              className={styles.tagline}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              AI · Data · Engineering
            </motion.p>
          </motion.div>

          <div className={styles.footer}>
            <span className={styles.counter}>
              {String(progress).padStart(3, '0')}
              <span className={styles.percent}>%</span>
            </span>
            <div className={styles.track} aria-hidden="true">
              <div className={styles.bar} style={{ transform: `scaleX(${progress / 100})` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
