import { Link, useParams } from 'react-router-dom';
import { PageHero } from './PageHero';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { services } from '../data/services';
import styles from './ServicesPage.module.css';

export function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Twelve core practices, delivered by engineers who ship."
        description="Every practice at Natobotics is staffed by senior engineers, not layered account teams. That's how a 12-practice firm still moves like a single product team."
      />
      <Section>
        <Container>
          <div className={styles.grid}>
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={Math.min(i, 4) * 0.05}>
                <Link to={`/services/${s.slug}`}>
                  <Card interactive glow="accent" className={styles.card}>
                    <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
                    <h3 className={styles.name}>{s.name}</h3>
                    <p className={styles.summary}>{s.summary}</p>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <PageHero eyebrow="Services" title="Service not found">
        <Button to="/services" variant="secondary">
          Back to services
        </Button>
      </PageHero>
    );
  }

  return (
    <>
      <PageHero eyebrow="Service" title={service.name} description={service.summary} />
      <Section>
        <Container narrow>
          <h2 className={styles.subheading}>Core Capabilities</h2>
          <div className={styles.capGrid}>
            {service.capabilities.map((c, i) => (
              <Reveal key={c} delay={i * 0.1}>
                <div className={styles.capCard}>
                  <div className={styles.capIcon}>✦</div>
                  <h3 className={styles.capTitle}>{c}</h3>
                </div>
              </Reveal>
            ))}
          </div>
          <div className={styles.ctaRow}>
            <Button to="/contact" variant="primary" size="lg">
              Discuss this practice
            </Button>
            <Button to="/services" variant="ghost">
              ← All services
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
