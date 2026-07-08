import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <section className={styles.wrap}>
      <Container>
        <span className="eyebrow">404</span>
        <h1 className={styles.title}>This route doesn't exist in production.</h1>
        <p className="text-secondary">Check the URL, or head back to something that does.</p>
        <Button to="/" size="lg" variant="primary" className={styles.button}>
          Back to home
        </Button>
      </Container>
    </section>
  );
}
