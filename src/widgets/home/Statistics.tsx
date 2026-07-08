import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { Reveal } from '../../components/ui/Reveal';
import { Counter } from '../../components/ui/Counter';
import { stats } from '../../data/stats';
import styles from './Statistics.module.css';

export function Statistics() {
  return (
    <Section id="statistics">
      <Container>
        <div className={styles.grid}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className={styles.stat}>
                <span className={styles.value}>
                  <Counter value={s.value} />
                </span>
                <span className={styles.label}>{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
