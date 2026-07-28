import { useEffect } from 'react';
import { PageHero } from '../PageHero/PageHero';
import { Container } from '../../components/ui/Container/Container';
import { Section } from '../../components/ui/Section/Section';
import { Reveal } from '../../components/ui/Reveal/Reveal';
import { clients } from '../../data/clients';
import styles from './ClientsPage.module.css';

function getInitials(name: string): string {
  const words = name.replace(/[^a-zA-Z\s]/g, '').split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return words[0]?.slice(0, 3).toUpperCase() || name.slice(0, 3).toUpperCase();
}

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
                  <div
                    className={styles.logoMark}
                    style={{
                      backgroundColor: client.logoBg || 'var(--color-accent-500)',
                      color: client.logoColor || '#ffffff',
                    }}
                  >
                    {getInitials(client.name)}
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
