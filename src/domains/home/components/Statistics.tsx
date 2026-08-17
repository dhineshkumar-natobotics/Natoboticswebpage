import { Container } from '../../../shared/ui/Container/Container';
import { Section } from '../../../shared/ui/Section/Section';
import { Reveal } from '../../../shared/ui/Reveal/Reveal';
import { Counter } from '../../../shared/ui/Counter/Counter';
import { stats } from '../../../shared/data/stats';
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
