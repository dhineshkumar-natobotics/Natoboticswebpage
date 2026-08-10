import { useEffect } from 'react';
import { PageHero } from '../../../shared/ui/PageHero/PageHero';
import { Container } from '../../../shared/ui/Container/Container';
import { Section } from '../../../shared/ui/Section/Section';
import { Reveal } from '../../../shared/ui/Reveal/Reveal';
import { clients } from '../../../shared/data/clients';
import styles from './ClientsPage.module.css';

export function ClientsPage() {
  useEffect(() => {
    document.title = 'Client Portfolio — Natobotics';
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Client Portfolio"
        title="Enterprise clients we partner with."
        description="Long-term engagements across banking, insurance, energy, technology, and retail — delivering measurable outcomes at scale."
      />
      <Section>
        <Container>
          <div className={styles.logoGrid}>
            {clients.map((client, i) => (
              <Reveal key={client.slug} delay={i * 0.05}>
                <div
                  className={styles.logoCard}
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <div className={styles.logoImageWrapper}>
                    <img
                      src={client.image}
                      alt={`${client.name} logo`}
                      className={styles.logoImage}
                    />
                  </div>
                  <span className={styles.companyName}>{client.name}</span>
                  <span className={styles.industryTag}>{client.industry}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
