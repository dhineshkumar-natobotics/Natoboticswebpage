import { useEffect } from 'react';
import { PageHero } from '../PageHero/PageHero';
import { Container } from '../../components/ui/Container/Container';
import { Section } from '../../components/ui/Section/Section';
import styles from './LegalPage.module.css';
import { sections } from './data';

export function PrivacyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy — Natobotics';
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated: January 2026. This is placeholder policy content pending final legal review."
      />
      <Section>
        <Container narrow>
          <div className={styles.content}>
            {sections.map((section) => (
              <div key={section.title} className={styles.block}>
                <h2 className={styles.heading}>{section.title}</h2>
                <p className={styles.body}>{section.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
