import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../Container/Container';
import { Reveal } from '../Reveal/Reveal';
import styles from './PageHero.module.css';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <Container>
        <Reveal>
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <span className={styles.separator}>/</span>
            <span className={styles.current}>{eyebrow}</span>
          </div>
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
