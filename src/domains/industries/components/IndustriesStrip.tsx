import { Link } from 'react-router-dom';
import { Container } from '../../../shared/ui/Container/Container';
import { Section } from '../../../shared/ui/Section/Section';
import { Reveal } from '../../../shared/ui/Reveal/Reveal';
import { industries } from '../data/industries';
import styles from './IndustriesStrip.module.css';

export function IndustriesStrip() {
  return (
    <Section id="industries" className={styles.section}>
      <Container>
        <Reveal>
          <span className="eyebrow">Where we deliver</span>
          <h2 className={styles.heading}>Depth in five core industries, not surface-level familiarity.</h2>
        </Reveal>

        <div className={styles.list}>
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={Math.min(i, 4) * 0.05}>
              <Link to={`/industries/${ind.slug}`} className={styles.row}>
                <div className={styles.rowContent}>
                  <span className={styles.name}>{ind.name}</span>
                  <span className={styles.summary}>{ind.content?.title || ''}</span>
                </div>

                {/* ── Hover-reveal content panel ── */}
                <div className={styles.expandContent}>
                  <p className={styles.expandText}>
                    {ind.content?.content
                      ?.split('\n\n')
                      .slice(0, 2)
                      .join(' ')
                      .replace(/<[^>]*>/g, '')
                      .replace(/•[^\n]*/g, '')
                      .trim()
                      .slice(0, 300)}
                    ...
                  </p>
                  <span className={styles.expandCta}>
                    Explore {ind.name}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>

                {ind.content?.image && (
                  <>
                    <div className={styles.rowBg}>
                      <img src={ind.content.image} alt={ind.name} />
                    </div>
                    <div className={styles.rowOverlay} />
                  </>
                )}
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
