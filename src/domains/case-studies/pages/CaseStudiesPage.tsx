import { Link, useParams } from 'react-router-dom';
import { PageHero } from '../../../shared/ui/PageHero/PageHero';
import { Container } from '../../../shared/ui/Container/Container';
import { Section } from '../../../shared/ui/Section/Section';
import { Reveal } from '../../../shared/ui/Reveal/Reveal';
import { Card } from '../../../shared/ui/Card/Card';
import { Button } from '../../../shared/ui/Button/Button';
import { caseStudies } from '../data';
import styles from './CaseStudiesPage.module.css';

export function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Outcomes we can point to, not slogans."
        description="A sample of engagements across insurance, banking, and energy. Full case studies with architecture detail are shared under NDA."
      />
      <Section>
        <Container>
          <div className={styles.grid}>
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.slug} delay={Math.min(i, 3) * 0.06}>
                <Link to={`/case-studies/${cs.slug}`} className={styles.cardLink}>
                  <Card interactive glow="accent" className={styles.card}>
                    {cs.image && (
                      <div className={styles.cardBg}>
                        <img src={cs.image} alt={cs.title} />
                      </div>
                    )}
                    <div className={styles.cardOverlay} />
                    <div className={styles.cardContent}>
                      <span className={styles.industry}>{cs.industry}</span>
                      <h3 className={styles.name}>{cs.title}</h3>
                      <p className={styles.summary}>{cs.summary}</p>
                    </div>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

export function CaseStudyDetailPage() {
  const { slug } = useParams();
  const cs = caseStudies.find((c) => c.slug === slug);

  if (!cs) {
    return (
      <PageHero eyebrow="Case study" title="Case study not found">
        <Button to="/case-studies" variant="secondary">Back to case studies</Button>
      </PageHero>
    );
  }

  return (
    <>
      <PageHero eyebrow={cs.industry} title={cs.title} description={cs.summary} />
      <Section>
        <Container narrow>
          <div className={styles.metricsRow}>
            {cs.metrics.map((m) => (
              <div key={m.label} className={styles.metric}>
                <span className={styles.metricValue}>{m.value}</span>
                <span className={styles.metricLabel}>{m.label}</span>
              </div>
            ))}
          </div>
          <h2 className={styles.subheading}>Client</h2>
          <p className="text-secondary">{cs.client}</p>
          <div className={styles.ctaRow}>
            <Button to="/contact" variant="primary" size="lg">
              Discuss a similar problem
            </Button>
            <Button to="/case-studies" variant="ghost">← All case studies</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
