import { useParams } from 'react-router-dom';
import { PageHero } from '../../../shared/ui/PageHero/PageHero';
import { Section } from '../../../shared/ui/Section/Section';
import { Button } from '../../../shared/ui/Button/Button';
import { Container } from '../../../shared/ui/Container/Container';
import { services } from '../data/services';
import { ServicesGrid } from '../components/ServicesGrid';
import styles from './ServicesPage.module.css';

export function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Twelve core practices, delivered by engineers who ship."
        description="Every practice at Natobotics is staffed by senior engineers, not layered account teams. That's how a 12-practice firm still moves like a single product team."
      />
      <div style={{ paddingBottom: 'var(--space-8)', background: 'var(--color-bg-base)' }}>
        <ServicesGrid />
      </div>
    </>
  );
}

export function ServiceDetailPage() {
  const { slug } = useParams();
  let service = services.find((s) => s.slug === slug);
  if (!service) {
    for (const main of services) {
      if (main.subServices) {
        const sub = main.subServices.find((s) => s.slug === slug);
        if (sub) {
          service = sub as any; // Cast safely as it matches ServiceItem shape
          break;
        }
      }
    }
  }

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
      <PageHero eyebrow="Service" title={service.name} />
      <Section>
        <Container narrow>
          {service.content ? (
            <div style={{ paddingBottom: '3rem' }}>
              <h2 className={styles.subheading}>{service.content.title}</h2>
              {service.content.content.split('\n\n').map((para, i) => (
                <p key={i} style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)', lineHeight: '1.75' }}>
                  {para}
                </p>
              ))}

              {service.content.heading && (
                <h3 className={styles.subheading} style={{ marginTop: '3rem', fontSize: 'var(--fs-h3)' }}>
                  {service.content.heading}
                </h3>
              )}

              {service.content.svgReference && (
                <div style={{ marginTop: '2rem', display: 'flex' }}>
                  <img
                    src={service.content.svgReference}
                    alt={service.content.heading || service.name}
                    style={{ width: '100%', maxWidth: '600px', height: 'auto', borderRadius: 'var(--radius-lg)' }}
                  />
                </div>
              )}
            </div>
          ) : (
            <p style={{ color: 'var(--color-text-secondary)', paddingBottom: '3rem' }}>Content for this service is coming soon.</p>
          )}
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
