import { PageHero } from './PageHero';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Reveal } from '../components/ui/Reveal';
import styles from './AboutPage.module.css';

export function AboutPage() {
  const stats = [
    { value: '12+', label: 'Years of Service' },
    { value: 'US$ 5M+', label: 'Total Revenue (LTM)' },
    { value: '8', label: 'Global Delivery Offices' },
    { value: '50+', label: 'Active Engineers' },
    { value: '10+', label: 'Enterprise Clients' }
  ];

  const sections = [
    {
      title: 'Our History',
      desc: 'Founded in 2012, Natobotics provides boutique technology, digital customer experience, consulting, and software development services. Over the years, we have supported our clients in their journey towards cloud transformation, Big Data, and AI integrations.',
      icon: '🕰️'
    },
    {
      title: 'Global Subsidiaries',
      desc: 'To deliver specialized local expertise, Natobotics has established strategic entities and subsidiaries across key markets including the UK, USA, Germany, Singapore, UAE, Netherlands, Poland, and Spain.',
      icon: '🏢'
    },
    {
      title: 'Alliances & Partnerships',
      desc: 'Our network of alliance and teaming relationships creates business value, reduces implementation risk, and accelerates go-to-market strategies for our enterprise clients.',
      icon: '🤝'
    },
    {
      title: 'Corporate Governance',
      desc: 'At Natobotics, our goal is to ensure absolute transparency, fairness, and accountability for every stakeholder — our clients, investors, vendor-partners, the community, and the regulatory bodies.',
      icon: '⚖️'
    }
  ];

  return (
    <>
      <PageHero
        eyebrow="Company"
        title="We steer enterprises through their digital journey."
        description="Natobotics is a global leader in next-generation digital services, process automation, and technology consulting, enabling clients across 50+ countries to navigate transformation."
      />

      <Section className={styles.statsSection}>
        <Container>
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className={styles.statCard}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container narrow>
          <Reveal>
            <div className={styles.mainIntro}>
              <h2 className={styles.introHeading}>An AI-Powered Core with Agile Digital at Scale</h2>
              <p className={styles.introText}>
                We expertly guide our clients through their digital transformation by enabling an AI-powered core that helps prioritize change. We also empower businesses with agile digital operations at scale to deliver unprecedented levels of performance and customer delight.
              </p>
              <p className={styles.introText}>
                Our always-on learning agenda drives continuous improvement through building and transferring digital skills, expertise, and ideas from our global innovation ecosystem.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section className={styles.gridSection}>
        <Container>
          <div className={styles.infoGrid}>
            {sections.map((sec, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <Card interactive glow="accent" className={styles.infoCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardIcon}>{sec.icon}</span>
                    <h3 className={styles.cardTitle}>{sec.title}</h3>
                  </div>
                  <p className={styles.cardDesc}>{sec.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
