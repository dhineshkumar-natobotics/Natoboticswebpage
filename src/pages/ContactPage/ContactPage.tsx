import { useState, type FormEvent } from 'react';
import { Phone, Headset } from 'lucide-react';
import { PageHero } from '../PageHero/PageHero';
import { Container } from '../../components/ui/Container/Container';
import { Section } from '../../components/ui/Section/Section';
import { Button } from '../../components/ui/Button/Button';
import styles from './ContactPage.module.css';
import { contactdetails } from './data';

const iconMap: Record<string, React.ReactNode> = {
  Phone: <Phone size={28} />,
  Headset: <Headset size={28} />,
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
        eyebrow="Contact"
        title="Tell us what you're building."
        description="We reply within one business day. If it's not a fit, we'll tell you that too."
      />
      <Section>
        <Container narrow>
          <div className={styles.cards}>
            {contactdetails.map((c) => (
              <div key={c.title} className={styles.card}>
                <span className={styles.cardIcon}>{iconMap[c.icon] ?? <Phone size={28} />}</span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <p className={styles.contactValue}>{c.contact}</p>
              </div>
            ))}
          </div>
          {status === 'submitted' ? (
            <div className={styles.success} role="status">
              <h2>Thanks — that's in.</h2>
              <p className="text-secondary">Someone from our team will follow up shortly.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span>Name</span>
                  <input type="text" name="name" required autoComplete="name" />
                </label>
                <label className={styles.field}>
                  <span>Work email</span>
                  <input type="email" name="email" required autoComplete="email" />
                </label>
              </div>
              <label className={styles.field}>
                <span>Company</span>
                <input type="text" name="company" required autoComplete="organization" />
              </label>
              <label className={styles.field}>
                <span>What are you trying to solve?</span>
                <textarea name="message" rows={5} required />
              </label>
              <Button type="submit" size="lg" variant="primary" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </Button>
            </form>
          )}
        </Container>
      </Section>
    </>
  );
}
