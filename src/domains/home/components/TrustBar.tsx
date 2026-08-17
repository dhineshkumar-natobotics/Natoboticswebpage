import { Container } from '../../../shared/ui/Container/Container';
import { Reveal } from '../../../shared/ui/Reveal/Reveal';
import styles from './TrustBar.module.css';

const SECTORS = ['Insurance', 'Banking', 'Energy', 'Healthcare', 'Telecommunications', 'Manufacturing'];

export function TrustBar() {
  return (
    <section className={styles.bar}>
      <Container>
        <Reveal>
          <p className={styles.label}>Trusted by enterprise teams across</p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className={styles.row}>
            {SECTORS.map((s) => (
              <span key={s} className={styles.item}>
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
