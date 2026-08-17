import { Link, useParams } from 'react-router-dom';
import { PageHero } from '../../../shared/ui/PageHero/PageHero';
import { Container } from '../../../shared/ui/Container/Container';
import { Section } from '../../../shared/ui/Section/Section';
import { Reveal } from '../../../shared/ui/Reveal/Reveal';
import { Button } from '../../../shared/ui/Button/Button';
import { industries } from '../data/industries';
import { caseStudies } from '../../case-studies/data/caseStudies';
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
                <Link
                  to={`/industries/${ind.slug}`}
                  className={styles.row}
                >
                  <div className={styles.rowContent}>
                    <span className={styles.name}>{ind.name}</span>
                    <span className={styles.summary}></span>
                  </div>
                  {ind.content?.image && (
                    <div className={styles.rowImageWrapper}>
                      <img src={ind.content.image} alt={ind.name} className={styles.rowImage} />
                    </div>
                  )}
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
      <PageHero eyebrow="Industry" title={industry.name} />
      <Section>
        <Container narrow>
          {industry.content && (
            <div className={styles.contentBlock}>
              <h2 className={styles.contentTitle}>{industry.content.title}</h2>
              {industry.content.content.split('\n\n').map((para, i) => (
                <p key={i} className={styles.contentParagraph}>{para}</p>
              ))}
              {industry.content.heading && (
                <h3 className={styles.imageHeading}>{industry.content.heading}</h3>
              )}
              {industry.content.svgReference && (
                <img
                  src={industry.content.svgReference}
                  alt={industry.content.heading || industry.name}
                  className={styles.contentImage}
                />
              )}
            </div>
          )}
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
