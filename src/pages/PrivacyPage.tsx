import { useEffect } from 'react';
import { PageHero } from './PageHero';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import styles from './LegalPage.module.css';

const sections = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide directly to us, such as when you fill out a contact or careers form, subscribe to updates, or correspond with our team. This may include your name, email address, company, and the content of your message. We also collect limited technical information automatically, such as browser type and pages visited, to help us maintain and improve this site.',
  },
  {
    title: '2. How We Use Information',
    body: 'We use the information we collect to respond to inquiries, evaluate job applications, deliver requested content such as whitepapers, and understand how our site is used so we can improve it. We do not sell personal information to third parties.',
  },
  {
    title: '3. Cookies & Similar Technologies',
    body: 'This site may use cookies and similar technologies for essential site functionality and basic analytics. You can control cookies through your browser settings; disabling them may affect some site features.',
  },
  {
    title: '4. Sharing With Third Parties',
    body: 'We may share information with service providers who help us operate this site or process job applications, under confidentiality obligations consistent with this policy. We do not share personal information with third parties for their own marketing purposes.',
  },
  {
    title: '5. Data Retention & Security',
    body: 'We retain personal information only as long as necessary for the purposes described in this policy, and apply administrative, technical, and organizational safeguards designed to protect it from unauthorized access, alteration, or disclosure.',
  },
  {
    title: '6. Your Rights',
    body: 'Depending on your jurisdiction, you may have rights to access, correct, or request deletion of your personal information. To exercise these rights, contact us using the details on our Contact page.',
  },
  {
    title: '7. Changes to This Policy',
    body: 'We may update this policy from time to time. Material changes will be reflected by an updated revision date on this page.',
  },
];

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
