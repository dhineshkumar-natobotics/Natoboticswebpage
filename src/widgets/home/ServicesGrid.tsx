import { Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { Card } from '../../components/ui/Card';
import { Reveal } from '../../components/ui/Reveal';
import { services } from '../../data/services';
import styles from './ServicesGrid.module.css';

export function ServicesGrid() {
  return (
    <Section id="services">
      <Container>
        <Reveal>
          <span className="eyebrow">What we do</span>
          <h2 className={styles.heading}>Nine practices. One accountable team.</h2>
        </Reveal>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={Math.min(i, 3) * 0.06}>
              <Link to={`/services/${s.slug}`} className={styles.cardLink}>
                <Card interactive glow="accent" className={styles.card}>
                  <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className={styles.name}>{s.name}</h3>
                  <p className={styles.summary}>{s.summary}</p>
                  <ul className={styles.caps}>
                    {s.capabilities.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
