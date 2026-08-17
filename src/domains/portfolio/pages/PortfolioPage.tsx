import { useMemo, useState, useEffect } from 'react';
import { PageHero } from '../../../shared/ui/PageHero/PageHero';
import { Container } from '../../../shared/ui/Container/Container';
import { Section } from '../../../shared/ui/Section/Section';
import { Card } from '../../../shared/ui/Card/Card';
import { Reveal } from '../../../shared/ui/Reveal/Reveal';
import { projects } from '../../../shared/data/projects';
import styles from './PortfolioPage.module.css';

const CATEGORIES = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

export function PortfolioPage() {
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    document.title = 'Project Portfolio — Natobotics';
  }, []);

  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <>
      <PageHero
        eyebrow="Project Portfolio"
        title="Work we've shipped, across the stack."
        description="A sample of projects delivered for enterprise clients — from cloud migrations to mobile apps to document automation pipelines."
      />
      <Section>
        <Container>
          <div className={styles.filterRow} role="group" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterButton} ${filter === cat ? styles.activeFilter : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {filtered.map((project, i) => (
              <Reveal key={project.slug} delay={Math.min(i, 6) * 0.06}>
                <Card interactive glow="accent" className={styles.projectCard}>
                  <div className={styles.meta}>
                    <span className={styles.category}>{project.category}</span>
                    <span className={styles.year}>{project.year}</span>
                  </div>
                  <h3 className={styles.title}>{project.title}</h3>
                  <p className={styles.client}>{project.client}</p>
                  <p className={styles.description}>{project.description}</p>
                  <div className={styles.techRow}>
                    {project.techStack.map((tech) => (
                      <span key={tech} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-tertiary">No projects match this category yet.</p>
          )}
        </Container>
      </Section>
    </>
  );
}
