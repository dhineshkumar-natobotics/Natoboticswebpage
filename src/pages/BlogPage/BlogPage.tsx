import { PageHero } from '../PageHero/PageHero';
import { Container } from '../../components/ui/Container/Container';
import { Section } from '../../components/ui/Section/Section';
import { Card } from '../../components/ui/Card/Card';
import { Reveal } from '../../components/ui/Reveal/Reveal';
import styles from './BlogPage.module.css';
import { posts } from './data';

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
