import { useEffect } from 'react';
import { PageHero } from './PageHero';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import styles from './LegalPage.module.css';

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing this website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use this site.',
  },
  {
    title: '2. Use of This Site',
    body: 'This site is provided for informational purposes about Natobotics’ services, capabilities, and open positions. You agree not to misuse the site, attempt to gain unauthorized access to its systems, or use it in any way that could disable, overburden, or impair it.',
  },
  {
    title: '3. Intellectual Property',
    body: 'All content on this site, including text, graphics, logos, and case study material, is the property of Natobotics or its licensors and is protected by applicable intellectual property laws. No content may be reproduced without prior written permission.',
  },
  {
    title: '4. Case Studies & Client References',
    body: 'Case studies, project portfolio entries, and client references published on this site are illustrative summaries of engagements. Specific figures, client names, and outcomes may be anonymized or aggregated to protect confidentiality under client agreements.',
  },
  {
    title: '5. No Warranty',
    body: 'This site and its content are provided "as is" without warranties of any kind, express or implied, regarding accuracy, completeness, or fitness for a particular purpose.',
  },
  {
    title: '6. Limitation of Liability',
    body: 'To the fullest extent permitted by law, Natobotics shall not be liable for any indirect, incidental, or consequential damages arising from your use of this site.',
  },
  {
    title: '7. Governing Law',
    body: 'These terms are governed by the laws of the jurisdiction in which the relevant Natobotics legal entity is incorporated, without regard to conflict-of-law principles.',
  },
  {
    title: '8. Changes to These Terms',
    body: 'We may revise these terms from time to time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.',
  },
];

export function TermsPage() {
  useEffect(() => {
    document.title = 'Terms of Service — Natobotics';
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
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
