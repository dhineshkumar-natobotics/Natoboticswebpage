import { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { industries } from '../../industries/data/industries';
import { FiArrowRight } from 'react-icons/fi';
import styles from './CaseStudyPreview.module.css';

export function CaseStudyPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [progress, setProgress] = useState(0);

  // Total horizontal distance the track needs to travel
  const getMaxTranslate = useCallback(() => {
    if (!trackRef.current || !sectionRef.current) return 0;
    const trackWidth = trackRef.current.scrollWidth;
    const containerWidth = window.innerWidth;
    return Math.max(0, trackWidth - containerWidth + 80); // 80px for padding
  }, []);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    const viewportHeight = window.innerHeight;

    // The scrollable distance for this section
    const scrollableDistance = sectionHeight - viewportHeight;
    if (scrollableDistance <= 0) return;

    // How far into the section we've scrolled (0 → 1)
    const scrolled = -sectionTop;
    const rawProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

    setProgress(rawProgress);

    // Map scroll progress to horizontal translation
    // Scrolling down → images move left (negative translateX) = left-to-right reveal
    const maxTranslate = getMaxTranslate();
    setTranslateX(-rawProgress * maxTranslate);
  }, [getMaxTranslate]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  // Number of cards determines how much vertical scroll space we need
  const numCards = industries.length;
  const scrollMultiplier = Math.max(3, numCards * 0.8);

  return (
    <section
      id="case-studies"
      className={styles.section}
      ref={sectionRef}
      style={{ height: `${scrollMultiplier * 100}vh` }}
    >
      <div className={styles.stickyWrap}>
        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.headerRow}>
            <h2 className={styles.headerTitle}>
              Case studies :<br />
              <span className={styles.headerTitleWhite}>at the heart of our missions</span>
            </h2>
          </div>
        </div>

        {/* ── Horizontal Gallery ── */}
        <div className={styles.galleryContainer}>
          <div
            className={styles.galleryTrack}
            ref={trackRef}
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {industries.map((ind) => (
              <Link
                key={ind.slug}
                to={`/industries/${ind.slug}`}
                className={styles.galleryCard}
              >
                {ind.content?.image && (
                  <img
                    src={ind.content.image}
                    alt={ind.name}
                    loading="lazy"
                  />
                )}
                <div className={styles.cardGradient} />
                <div className={styles.cardContent}>
                  <span className={styles.cardLabel}>
                    {ind.content?.title?.substring(0, 40) || ''}
                  </span>
                  <h3 className={styles.cardName}>{ind.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Footer CTA ── */}
        <div className={styles.footer}>
          <Link to="/industries" className={styles.footerLink}>
            <div className={styles.footerIconCircle}>
              <FiArrowRight style={{ width: 20, height: 20, strokeWidth: 2.5 }} />
            </div>
            <span className={styles.footerLabel}>Explore Industries</span>
          </Link>
        </div>

        {/* ── Scroll Progress Indicator ── */}
        <div className={styles.scrollHint}>
          <span className={styles.scrollHintText}>Scroll</span>
          <div className={styles.scrollHintBar}>
            <div
              className={styles.scrollHintFill}
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
