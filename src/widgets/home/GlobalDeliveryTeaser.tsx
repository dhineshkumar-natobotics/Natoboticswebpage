import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { Reveal } from '../../components/ui/Reveal';
import { Button } from '../../components/ui/Button';
import { offices } from '../../data/offices';
import styles from './GlobalDeliveryTeaser.module.css';

export function GlobalDeliveryTeaser() {
  return (
    <Section id="global-delivery" bleed>
      <div className={styles.ambient} aria-hidden="true" />
      <Container className={styles.layout}>
        <Reveal>
          <span className="eyebrow">Global delivery</span>
          <h2 className={styles.heading}>
            One team, eight countries, zero handoff friction.
          </h2>
          <p className={styles.body}>
            Every Natobotics engagement is staffed from our own delivery centers —
            not subcontracted. That means the architect who scopes your project is
            reachable throughout, whether your team is in New York or Rotterdam.
          </p>
          <Button to="/global-delivery" variant="secondary" size="lg">
            Explore our delivery network
          </Button>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className={styles.officeList}>
            {offices.map((o) => (
              <li key={o.city} className={styles.officeRow}>
                <span className={styles.officeDot} data-hq={o.type === 'headquarters'} />
                <span className={styles.officeCity}>{o.city}</span>
                <span className={styles.officeCountry}>{o.country}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
