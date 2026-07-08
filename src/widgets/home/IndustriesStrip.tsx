import { Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { Reveal } from '../../components/ui/Reveal';
import { industries } from '../../data/industries';
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
                <span className={styles.name}>{ind.name}</span>
                <span className={styles.summary}>{ind.summary}</span>
                <span className={styles.arrow} aria-hidden="true">→</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
