import { useEffect, useMemo } from 'react';
import { PageHero } from './PageHero';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Reveal } from '../components/ui/Reveal';
import { clients } from '../data/clients';
import styles from './ClientsPage.module.css';

export function ClientsPage() {
  useEffect(() => {
    document.title = 'Client Portfolio — Natobotics';
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof clients>();
    for (const client of clients) {
      const list = map.get(client.industry) ?? [];
      list.push(client);
      map.set(client.industry, list);
    }
    return Array.from(map.entries());
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Client Portfolio"
        title="Enterprise clients we partner with."
        description="Long-term engagements across insurance, banking, energy, media, telecom, and logistics — anonymized where required by NDA."
      />
      <Section>
        <Container>
          {grouped.map(([industry, group], groupIndex) => (
            <div key={industry} className={styles.industryGroup}>
              <Reveal delay={groupIndex * 0.05}>
                <h2 className={styles.industryHeading}>{industry}</h2>
              </Reveal>
              <div className={styles.grid}>
                {group.map((client, i) => (
                  <Reveal key={client.slug} delay={groupIndex * 0.05 + i * 0.06}>
                    <Card interactive glow="ai" className={styles.clientCard}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.name}>{client.name}</h3>
                        <Badge tone="ai">Since {client.since}</Badge>
                      </div>
                      <p className={styles.quote}>&ldquo;{client.testimonial}&rdquo;</p>
                      <p className={styles.contact}>— {client.contact}</p>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </Section>
    </>
  );
}
