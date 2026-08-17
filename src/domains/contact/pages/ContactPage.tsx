import { useState, type FormEvent } from 'react';
import { PageHero } from '../../../shared/ui/PageHero/PageHero';
import { Container } from '../../../shared/ui/Container/Container';
import { Section } from '../../../shared/ui/Section/Section';
import { Button } from '../../../shared/ui/Button/Button';
import { contactdetails } from '../data/data';
import styles from './ContactPage.module.css';

// SVG Icons based on the data.ts 'icon' field
const getIcon = (iconName: string) => {
  if (iconName === 'Phone') {
    return (
      <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  }
  if (iconName === 'Headset') {
    return (
      <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    );
  }
  return null;
};

export function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    // Wire this to your backend/CRM endpoint (see Deliverable: API Design).
    window.setTimeout(() => setStatus('submitted'), 700);
  }

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Get in touch with Natobotics."
        description="Ready to accelerate your digital transformation? Reach out to our experts and we'll reply within one business day."
      />
      <Section>
        <Container narrow>
          {/* Displaying Contact Data */}
          <div className={styles.cards}>
            {contactdetails.map((detail, index) => (
              <div key={index} className={styles.card}>
                {getIcon(detail.icon)}
                <h3>{detail.title}</h3>
                <p className="text-secondary" style={{ fontSize: 'var(--fs-body-sm)' }}>
                  {detail.desc}
                </p>
                <div className={styles.contactValue}>
                  {detail.contact}
                </div>
              </div>
            ))}
          </div>

          {status === 'submitted' ? (
            <div className={styles.success} role="status">
              <h2>Thank you for reaching out.</h2>
              <p className="text-secondary">A Natobotics expert will follow up with you shortly.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span>Full Name</span>
                  <input type="text" name="name" required autoComplete="name" />
                </label>
                <label className={styles.field}>
                  <span>Work Email</span>
                  <input type="email" name="email" required autoComplete="email" />
                </label>
              </div>
              <label className={styles.field}>
                <span>Company</span>
                <input type="text" name="company" required autoComplete="organization" />
              </label>
              <label className={styles.field}>
                <span>Tell us about your project or business needs</span>
                <textarea name="message" rows={5} required />
              </label>
              <Button type="submit" size="lg" variant="primary" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
          )}
        </Container>
      </Section>
    </>
  );
}
