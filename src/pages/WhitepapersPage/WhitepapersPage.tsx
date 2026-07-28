import { PageHero } from '../PageHero/PageHero';
import { Container } from '../../components/ui/Container/Container';
import { Section } from '../../components/ui/Section/Section';
import { Button } from '../../components/ui/Button/Button';
import { Reveal } from '../../components/ui/Reveal/Reveal';
import styles from './WhitepapersPage.module.css';
import { papers } from './data';

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
