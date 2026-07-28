import { Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container/Container';
import { Section } from '../../components/ui/Section/Section';
import { Card } from '../../components/ui/Card/Card';
import { Reveal } from '../../components/ui/Reveal/Reveal';
import { services } from '../../data/services';
import {
  AppWindow,
  BarChart3,
  Cloud,
  Server,
  Gamepad2,
  FileCheck,
  LayoutTemplate,
  Code2,
  Braces,
  Smartphone,
  Database,
  CloudCog,
} from 'lucide-react';
import styles from './ServicesGrid.module.css';
import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  'application-services': AppWindow,
  'analytics-insights': BarChart3,
  'cloud-mobility': Cloud,
  'infrastructure-management': Server,
  'gaming-design': Gamepad2,
  'kpo-bpo': FileCheck,
  'adobe-indesign': LayoutTemplate,
  'react-js': Code2,
  'dotnet': Braces,
  'react-native': Smartphone,
  'hadoop': Database,
  'aws-azure': CloudCog,
};

export function ServicesGrid() {
  return (
    <Section id="services">
      <Container>
        <Reveal>
          <span className="eyebrow">What we do</span>
          <h2 className={styles.heading}>Core Services &amp; Technologies</h2>
        </Reveal>

        <div className={styles.grid}>
          {services.map((s, i) => {
            const Icon = ICON_MAP[s.slug] || Code2;
            return (
              <Reveal key={s.slug} delay={Math.min(i, 3) * 0.06}>
                <Link to={`/services/${s.slug}`} className={styles.cardLink}>
                  <Card interactive glow="accent" className={styles.card}>
                    <div className={styles.cardHeader}>
                      <div className={styles.iconWrap}>
                        <Icon size={18} />
                      </div>
                      <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className={styles.name}>{s.name}</h3>
                    <p className={styles.summary}>{s.summary}</p>
                    <ul className={styles.caps}>
                      {s.capabilities.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </Card>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
