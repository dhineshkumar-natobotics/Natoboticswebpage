import { PageHero } from './PageHero';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import styles from './WhitepapersPage.module.css';

const papers = [
  { id: 1, title: 'The Future of Legacy Systems in Banking', desc: 'Strategies to gradually decouple monoliths while maintaining 99.999% uptime.' },
  { id: 2, title: 'Data Monetization for Telecom Operators', desc: 'A framework for building privacy-first analytics pipelines.' },
  { id: 3, title: 'Scaling Offshore Teams Effectively', desc: 'Best practices for integrating global delivery centers into your agile loop.' },
];

export function WhitepapersPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Whitepapers & Reports"
        description="Comprehensive research, architecture blueprints, and strategic insights."
      />
      <Section>
        <Container narrow>
          <div className={styles.list}>
            {papers.map((paper, i) => (
              <Reveal key={paper.id} delay={i * 0.1}>
                <div className={styles.paperItem}>
                  <div className={styles.content}>
                    <h3 className={styles.title}>{paper.title}</h3>
                    <p className={styles.desc}>{paper.desc}</p>
                  </div>
                  <div className={styles.action}>
                    <Button to="#" variant="secondary">Download PDF</Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
