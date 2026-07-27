import { useState } from 'react';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { Reveal } from '../../components/ui/Reveal';
import { Button } from '../../components/ui/Button';
import InteractiveWorldMap from '../../components/ui/InteractiveWorldMap';
import styles from './GlobalDeliveryTeaser.module.css';

export function GlobalDeliveryTeaser() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

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
          <div className={styles.mapWrapper}>
            <InteractiveWorldMap hoveredCountry={hoveredCountry} onLocationHover={setHoveredCountry} />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

