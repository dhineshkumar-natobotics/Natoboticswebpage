import { PageHero } from './PageHero';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';

interface StubPageProps {
  eyebrow: string;
  title: string;
  description: string;
}

/**
 * Placeholder for sitemap routes intentionally scoped for a later phase
 * (Leadership, Press, Blog, Whitepapers, FAQs, Legal). Swap for CMS-driven
 * content once the headless CMS layer (Phase 4) is wired up.
 */
export function StubPage({ eyebrow, title, description }: StubPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <Section>
        <Container narrow>
          <p className="text-tertiary">This page is scoped for a later build phase.</p>
        </Container>
      </Section>
    </>
  );
}
