import { Link, useParams } from 'react-router-dom';
import { PageHero } from '../PageHero/PageHero';
import { Container } from '../../components/ui/Container/Container';
import { Section } from '../../components/ui/Section/Section';
import { Reveal } from '../../components/ui/Reveal/Reveal';
import { Button } from '../../components/ui/Button/Button';
import { caseStudies } from '../../data/caseStudies';
import { FiPlus } from 'react-icons/fi';
import styles from './CaseStudiesPage.module.css';

export function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Outcomes we can point to, not slogans."
        description="A sample of engagements across insurance, banking, and energy. Full case studies with architecture detail are shared under NDA."
      />
      <Section
        className="relative bg-[#030816] bg-[size:25%_100%] max-md:bg-[size:50%_100%] py-10 md:py-8 overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          backgroundPosition: 'center',
        }}
      >
        <Container>
          <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-6">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.slug} delay={i * 0.08}>
                <Link to={`/case-studies/${cs.slug}`} className="block h-full group">
                  <div className="flex flex-col h-full bg-transparent rounded-[28px] overflow-hidden transition-all duration-fast ease-out-expo group-hover:-translate-y-2 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
                    <div className="bg-white p-6 pt-10 pb-12 relative flex-grow flex flex-col rounded-t-[28px]">
                      <span className="font-sans text-[11px] uppercase tracking-[0.08em] font-bold text-accent-500 mb-5 block">
                        {cs.industry}
                      </span>
                      <h3 className="font-sans text-[1.45rem] font-medium leading-[1.35] text-[#0d121f] m-0 mb-6 tracking-tight flex-grow">
                        {cs.title}
                      </h3>
                      <div className="absolute bottom-7 right-7 w-[38px] h-[38px] rounded-full bg-accent-500 flex items-center justify-center text-white transition-all duration-fast ease-out-expo group-hover:scale-115 group-hover:rotate-90 group-hover:bg-accent-600 group-hover:shadow-[0_0_16px_rgba(47,111,237,0.45)]">
                        <FiPlus className="w-[18px] h-[18px] stroke-[3]" />
                      </div>
                    </div>
                    <div className="h-[200px] overflow-hidden rounded-b-[28px] bg-[#080c16]">
                      <img
                        src={cs.image}
                        alt={cs.title}
                        className="w-full h-full object-cover transition-transform duration-fast ease-out-expo group-hover:scale-105"
                      />
                    </div>
                  </div>
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
