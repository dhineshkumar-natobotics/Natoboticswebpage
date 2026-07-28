import { useState } from 'react';
import { PageHero } from '../PageHero/PageHero';
import { Container } from '../../components/ui/Container/Container';
import { Section } from '../../components/ui/Section/Section';
import styles from './FaqPage.module.css';
import clsx from 'clsx';
import { faqs } from './data';

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
