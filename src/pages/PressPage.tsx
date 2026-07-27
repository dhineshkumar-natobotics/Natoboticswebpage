import { useEffect } from 'react';
import { PageHero } from './PageHero';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import styles from './PressPage.module.css';

const releases = [
  {
    id: 1,
    date: 'Mar 2026',
    headline: 'Natobotics opens new delivery center in Warsaw to expand European engineering capacity',
    excerpt:
      'The Central European hub adds cloud infrastructure and DevOps automation capability, bringing the company to eight global delivery locations.',
  },
  {
    id: 2,
    date: 'Nov 2025',
    headline: 'Natobotics achieves ISO 27001 certification across all delivery centers',
    excerpt:
      'The certification formalizes information security practices already in place across client engagements in banking, insurance, and energy.',
  },
  {
    id: 3,
    date: 'Jun 2025',
    headline: 'Natobotics publishes research on AI-assisted claims automation in insurance',
    excerpt:
      'Findings drawn from a multi-year engagement with a Tier-1 European insurer are shared in a new whitepaper for the industry.',
  },
  {
    id: 4,
    date: 'Feb 2025',
    headline: 'Natobotics crosses 50 active engineers across its global delivery model',
    excerpt:
      'Growth reflects increased demand for cloud modernization and analytics engagements across enterprise clients.',
  },
  {
    id: 5,
    date: 'Sep 2024',
    headline: 'Natobotics named a preferred vendor for core banking modernization by a regional banking group',
    excerpt:
      'The multi-year engagement covers a phased migration from on-premise infrastructure to a cloud-native core banking platform.',
  },
];

export function PressPage() {
  useEffect(() => {
    document.title = 'Press — Natobotics';
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Company"
        title="Press & News"
        description="Announcements, milestones, and coverage from across our global delivery centers."
      />
      <Section>
        <Container narrow>
          <div className={styles.list}>
            {releases.map((release, i) => (
              <Reveal key={release.id} delay={i * 0.08}>
                <article className={styles.item}>
                  <span className={styles.date}>{release.date}</span>
                  <h3 className={styles.headline}>{release.headline}</h3>
                  <p className={styles.excerpt}>{release.excerpt}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
