import { PageHero } from './PageHero';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Reveal } from '../components/ui/Reveal';
import styles from './BlogPage.module.css';

const posts = [
  { id: 1, title: 'Re-engineering the Mainframe for Real-time Insurance Quoting', date: 'Oct 12, 2026', category: 'Engineering' },
  { id: 2, title: 'Why Edge Computing is the New Cloud for Media Streaming', date: 'Sep 28, 2026', category: 'Technology' },
  { id: 3, title: 'Navigating DORA Compliance in European Financial Services', date: 'Sep 15, 2026', category: 'Compliance' },
  { id: 4, title: 'Building a Resilient KPO Workforce: Our Global Delivery Model', date: 'Aug 30, 2026', category: 'Operations' },
];

export function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Engineering Insights & News"
        description="Deep dives into technology, process automation, and how we solve complex problems for global enterprises."
      />
      <Section>
        <Container>
          <div className={styles.grid}>
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.1}>
                <Card interactive glow="accent" className={styles.postCard}>
                  <div className={styles.meta}>
                    <span className={styles.category}>{post.category}</span>
                    <span className={styles.date}>{post.date}</span>
                  </div>
                  <h3 className={styles.title}>{post.title}</h3>
                  <div className={styles.readMore}>Read article →</div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
