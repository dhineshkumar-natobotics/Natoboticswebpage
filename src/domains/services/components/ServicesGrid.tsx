import { useRef, useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services } from '../data/services';
import styles from './ServicesGrid.module.css';

const ease = [0.16, 1, 0.3, 1] as const;



export function ServicesGrid() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [progress, setProgress] = useState(0);

  const totalServices = services.length;
  const navigate = useNavigate();

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = sectionHeight - viewportHeight;

    if (scrollableDistance <= 0) return;

    const scrolled = -sectionTop;
    const rawProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
    setProgress(rawProgress);

    const newIdx = Math.min(
      totalServices - 1,
      Math.round(rawProgress * (totalServices - 1))
    );
    setActiveIdx(newIdx);

    const inStickyZone = sectionTop <= 0 && sectionTop > -(scrollableDistance);
    setIsSticky(inStickyZone);
  }, [totalServices]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Get clean excerpt — stripped of HTML/special chars, longer if no capsules
  const getExcerpt = (content?: string, hasSubServices: boolean = false) => {
    if (!content) return 'Comprehensive enterprise solutions tailored to your business needs.';
    const cleaned = content
      .replace(/<[^>]*>/g, '')
      .replace(/[•\-●]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    const maxLength = hasSubServices ? 180 : 360;
    return cleaned.length > maxLength ? cleaned.slice(0, maxLength) + '…' : cleaned;
  };

  /**
   * Compute the inline style for each card based on its discrete position.
   * Reversed (LIFO-style) stack: The current card sits on top and slides UP 
   * to reveal the next card underneath when the active index changes.
   */
  const getCardStyle = (idx: number): React.CSSProperties => {
    const continuousIdx = Math.min(
      totalServices - 1,
      progress * (totalServices - 1)
    );
    const currentActive = Math.floor(continuousIdx);
    const subProgress = continuousIdx - currentActive; // 0..1 within each card transition
    const offset = idx - currentActive;

    // Past cards — fully gone, hidden
    if (offset < 0) {
      return {
        transform: `translateY(-110%) scale(1)`,
        opacity: 0,
        zIndex: totalServices - idx,
        pointerEvents: 'none',
      };
    }

    // Active card — slides up as user scrolls
    if (offset === 0) {
      const translateYPct = -subProgress * 110; // smoothly goes from 0% to -110%
      return {
        transform: `translateY(${translateYPct}%) scale(1)`,
        opacity: 1,
        zIndex: totalServices + 1, // Always on top
        pointerEvents: 'auto',
        boxShadow: '0 24px 48px rgba(0,0,0,0.1)',
      };
    }

    // Next card (offset === 1) — revealed underneath, scales up as active leaves
    if (offset === 1) {
      const scale = 0.96 + subProgress * 0.04; // 0.96 -> 1.0
      const translateY = 30 - subProgress * 30; // 30px -> 0px
      return {
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity: 1,
        zIndex: totalServices - idx,
        pointerEvents: 'none',
      };
    }

    // Future cards further in stack
    if (offset > 2) {
      return {
        transform: `translateY(90px) scale(0.9)`,
        opacity: 1,
        zIndex: totalServices - idx,
        pointerEvents: 'none',
      };
    }

    const translateY = offset * 30;
    const scale = Math.max(0, 1 - (offset * 0.04));

    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      opacity: 1,
      zIndex: totalServices - idx,
      pointerEvents: 'none',
    };
  };

  // We no longer need trackerY as we'll use scaleY for a fill-up bar

  return (
    <section
      id="services"
      className={styles.section}
      ref={sectionRef}
      style={{ height: `${totalServices * 200 + 100}vh` }}
    >
      <motion.div
        className={styles.header}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.span
          className="eyebrow"
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 1, ease } },
          }}
        >
          What we do
        </motion.span>
        <motion.h2
          className={styles.heading}
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.1, ease } },
          }}
        >
          Everything Your Business Needs{' '}
          <motion.span
            className={styles.headingAccent}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2, ease } },
            }}
          >
            Under One Roof
          </motion.span>
        </motion.h2>
      </motion.div>

      <div
        className={`${styles.stickyContainer} ${isSticky ? styles.stickyActive : ''}`}
      >
        {/* ── Layout ── */}
        <div className={styles.layout}>
          {/* Left: Indicator List */}
          <div className={styles.tabNav} aria-label="Services Progress">
            <div className={styles.tabNavTrack}>
              <motion.div
                className={styles.tabNavActivePath}
                style={{ 
                  height: '100%',
                  transformOrigin: 'top',
                  scaleY: progress 
                }}
              />
            </div>
            {services.map((service, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={service.slug}
                  className={`${styles.tabItem} ${isActive ? styles.tabActive : ''}`}
                  onClick={() => {
                    if (!sectionRef.current) return;
                    const sectionTop = sectionRef.current.offsetTop;
                    const sectionHeight = sectionRef.current.offsetHeight;
                    const scrollableDistance = sectionHeight - window.innerHeight;
                    const targetScroll = sectionTop + (scrollableDistance * (idx / (totalServices - 1)));
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                  }}
                >
                  <span className={styles.tabLabel}>{service.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Card Stack */}
          <div className={styles.contentCardContainer}>
            <div className={styles.cardStack}>
              {services.map((service, idx) => (
                <div
                  key={service.slug}
                  className={`${styles.stackCard} ${idx === activeIdx ? styles.active : ''}`}
                  style={getCardStyle(idx)}
                >
                  <div className={styles.cardInner}>
                    <div className={styles.cardHeader}>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.cardHeaderIcon}>
                        <path d="M20 0C20 11.0457 11.0457 20 0 20C11.0457 20 20 28.9543 20 40C20 28.9543 28.9543 20 40 20C28.9543 20 20 11.0457 20 0Z" fill="#ff6f3c" />
                        <circle cx="20" cy="20" r="5" fill="#ff6f3c" />
                      </svg>
                      <h3 className={styles.cardTitle}>{service.name}</h3>
                    </div>

                    {service.content?.image && (
                      <div className={styles.cardImageWrap}>
                        <img
                          src={service.content.image}
                          alt={service.name}
                          className={styles.cardImage}
                        />
                      </div>
                    )}

                    <div className={styles.cardText}>
                      {service.subServices && service.subServices.length > 0 && (
                        <div className={styles.subServicesContainer}>
                          {service.subServices.map(sub => (
                            <Link key={sub.slug} to={`/services/${sub.slug}`} className={styles.subServiceTag}>
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}

                      <div className={styles.cardTextBottom}>
                        <p className={styles.cardExcerpt}>
                          {getExcerpt(service.content?.content, !!(service.subServices && service.subServices.length > 0))}
                        </p>

                        <Link
                          to={`/services/${service.slug}`}
                          className={styles.arrowButton}
                          aria-label={`Explore ${service.name}`}
                          style={{ pointerEvents: 'auto' }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate(`/services/${service.slug}`);
                            setTimeout(() => {
                              window.scrollTo({ top: 0, behavior: 'instant' });
                            }, 10);
                          }}
                        >
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: 'none' }}>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
