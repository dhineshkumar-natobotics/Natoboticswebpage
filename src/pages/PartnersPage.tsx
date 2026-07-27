import { useEffect } from 'react';
import { PageHero } from './PageHero';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import styles from './PartnersPage.module.css';

const tiers = [
  {
    name: 'Cloud & Technology Partners',
    tone: 'ai' as const,
    description: 'Certified engineering partnerships with the cloud and platform vendors our delivery teams build on daily.',
    partners: ['Amazon Web Services', 'Microsoft Azure', 'Adobe', 'MongoDB'],
  },
  {
    name: 'Delivery Alliances',
    tone: 'default' as const,
    description: 'Regional systems integrators and staffing partners that extend our delivery footprint into specialized markets.',
    partners: ['EU Systems Alliance Network', 'GCC Digital Delivery Consortium', 'APAC Engineering Partners'],
  },
  {
    name: 'Referral Partners',
    tone: 'warning' as const,
    description: 'Consultancies and advisory firms that refer enterprise clients into our engagement pipeline.',
    partners: ['Independent Technology Advisors', 'Boutique Management Consultancies'],
  },
];

export function PartnersPage() {
  useEffect(() => {
    document.title = 'Partners — Natobotics';
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Company"
        title="Partners & Alliances"
        description="A network of technology, delivery, and referral partners that helps us reduce implementation risk and accelerate go-to-market for clients."
      />
      <Section>
        <Container>
          <div className={styles.grid}>
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.08}>
                <Card interactive glow="accent" className={styles.tierCard}>
                  <Badge tone={tier.tone}>{tier.name}</Badge>
                  <p className={styles.tierDesc}>{tier.description}</p>
                  <ul className={styles.partnerList}>
                    {tier.partners.map((partner) => (
                      <li key={partner}>{partner}</li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className={styles.ctaBanner}>
              <div>
                <h2 className={styles.ctaTitle}>Interested in becoming a partner?</h2>
                <p className={styles.ctaDesc}>We're always looking to extend our alliance network into new markets and technology domains.</p>
              </div>
              <Button to="/contact" size="lg" variant="orange">Get in touch</Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
