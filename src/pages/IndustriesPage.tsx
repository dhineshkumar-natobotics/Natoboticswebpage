import { Link, useParams } from 'react-router-dom';
import { PageHero } from './PageHero';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { industries } from '../data/industries';
import { caseStudies } from '../data/caseStudies';
import styles from './IndustriesPage.module.css';

export function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Five industries. Real regulatory and operational depth."
        description="We don't rotate generalists across sectors. Each practice has engineers who've spent years inside that industry's constraints."
      />
      <Section>
        <Container>
          <div className={styles.list}>
            {industries.map((ind, i) => (
              <Reveal key={ind.slug} delay={Math.min(i, 4) * 0.05}>
                <Link to={`/industries/${ind.slug}`} className={styles.row}>
                  <span className={styles.name}>{ind.name}</span>
                  <span className={styles.summary}>{ind.summary}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

export function IndustryDetailPage() {
  const { slug } = useParams();
  const industry = industries.find((i) => i.slug === slug);
  const related = caseStudies.filter((cs) => cs.industry.toLowerCase() === industry?.name.toLowerCase());

  if (!industry) {
    return (
      <PageHero eyebrow="Industries" title="Industry not found">
        <Button to="/industries" variant="secondary">Back to industries</Button>
      </PageHero>
    );
  }

  return (
    <>
      <PageHero eyebrow="Industry" title={industry.name} description={industry.summary} />
      <Section>
        <Container narrow>
          {related.length > 0 ? (
            <>
              <h2 className={styles.subheading}>Related work</h2>
              <ul className={styles.relatedList}>
                {related.map((cs) => (
                  <li key={cs.slug}>
                    <Link to={`/case-studies/${cs.slug}`}>{cs.title}</Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-secondary">Case studies for this industry are coming soon.</p>
          )}
          <Button to="/contact" variant="primary" size="lg">
            Talk to our {industry.name.toLowerCase()} team
          </Button>
        </Container>
      </Section>
    </>
  );
}
