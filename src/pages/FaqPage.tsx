import { useState } from 'react';
import { PageHero } from './PageHero';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import styles from './FaqPage.module.css';
import clsx from 'clsx';

const faqs = [
  { q: 'What is your typical engagement model?', a: 'We typically start with a 2-4 week discovery phase to build a blueprint, followed by agile sprints with a dedicated offshore/nearshore team.' },
  { q: 'Where are your delivery centers located?', a: 'We have delivery centers in Chennai (India), London (UK), and Dubai (UAE), allowing us to provide "follow the sun" support and development.' },
  { q: 'Do you offer post-launch support?', a: 'Yes. Every project includes a warranty period, and we offer SLA-driven support and maintenance contracts for long-term reliability.' },
  { q: 'How do you ensure data security and compliance?', a: 'We are GDPR compliant and follow ISO 27001 standards. Data is encrypted at rest and in transit, and we use secure VPNs for all offshore access.' },
];

export function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Frequently Asked Questions"
        description="Everything you need to know about partnering with Natobotics."
      />
      <Section>
        <Container narrow>
          <div className={styles.faqList}>
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className={clsx(styles.faqItem, isOpen && styles.open)}>
                  <button 
                    className={styles.question}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                  >
                    {faq.q}
                    <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className={styles.answer}>
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
