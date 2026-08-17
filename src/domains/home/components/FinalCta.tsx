import { Container } from '../../../shared/ui/Container/Container';
import { Section } from '../../../shared/ui/Section/Section';
import { Reveal } from '../../../shared/ui/Reveal/Reveal';
import { Button } from '../../../shared/ui/Button/Button';
import styles from './FinalCta.module.css';

export function FinalCta() {
  return (
    <Section id="contact-cta" bleed>
      <Container>
        <Reveal>
          <div className={styles.panel}>
            <div className={styles.ambient} aria-hidden="true" />
            <div className={styles.content}>
              <h2 className={styles.heading}>Have a system that needs to work the first time?</h2>
              <p className={styles.body}>
                Tell us about the problem. We'll tell you honestly whether we're the right team for it.
              </p>
              <div className={styles.actions}>
                <Button to="/contact" size="lg" variant="primary">
                  Talk to an Engineer
                </Button>
                <Button to="/company/careers" size="lg" variant="orange">
                  Or Join the Team →
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
