import { useEffect } from 'react';
import { PageHero } from '../PageHero/PageHero';
import { Container } from '../../components/ui/Container/Container';
import { Section } from '../../components/ui/Section/Section';
import { Reveal } from '../../components/ui/Reveal/Reveal';
import styles from './PressPage.module.css';
import { releases } from './data';

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
