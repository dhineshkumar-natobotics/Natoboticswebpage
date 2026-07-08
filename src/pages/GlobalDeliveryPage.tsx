import { PageHero } from './PageHero';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Reveal } from '../components/ui/Reveal';
import { offices } from '../data/offices';
import styles from './GlobalDeliveryPage.module.css';

export function GlobalDeliveryPage() {
  return (
    <>
      <PageHero
        eyebrow="Global delivery"
        title="Eight countries. One accountable delivery model."
        description="Natobotics operates through eight legal entities, each staffed with full-time engineers — not a brokered offshore bench."
      />
      <Section>
        <Container>
          <div className={styles.grid}>
            {offices.map((o, i) => (
              <Reveal key={o.city} delay={Math.min(i, 4) * 0.05}>
                <Card interactive className={styles.card}>
                  {o.type === 'headquarters' && <Badge tone="ai">Headquarters</Badge>}
                  <h3 className={styles.city}>{o.city}</h3>
                  <p className={styles.country}>{o.country}</p>
                  <p className={styles.coords}>
                    {o.lat.toFixed(2)}°, {o.lng.toFixed(2)}°
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
