import { createElement } from 'react';
import { PageHero } from '../../../../shared/ui/PageHero/PageHero';
import { Container } from '../../../../shared/ui/Container/Container';
import { Section } from '../../../../shared/ui/Section/Section';
import SpotlightCard from '../../../../shared/ui/SpotlightCard/SpotlightCard';
import { Reveal } from '../../../../shared/ui/Reveal/Reveal';
import styles from './AboutPage.module.css';
import { stats, sections } from '../data';
import { icons } from 'lucide-react';

export function AboutPage() {
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
            {sections.map((sec, i) => {
              const IconComponent = icons[sec.icon as keyof typeof icons];
              return (
                <Reveal key={i} delay={i * 0.06}>
                  <SpotlightCard className={styles.infoCard} spotlightColor="rgba(255, 111, 60, 0.15)">
                    <div className={styles.cardHeader}>
                      <span className={styles.cardIcon}>
                        {IconComponent ? createElement(IconComponent, { size: 24 }) : null}
                      </span>
                      <h3 className={styles.cardTitle}>{sec.title}</h3>
                    </div>
                    <p className={styles.cardDesc}>{sec.desc}</p>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
