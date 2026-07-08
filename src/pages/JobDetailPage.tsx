import { useParams } from 'react-router-dom';
import { PageHero } from './PageHero';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { jobs } from '../data/jobs';

export function JobDetailPage() {
  const { slug } = useParams();
  const job = jobs.find((j) => j.slug === slug);

  if (!job) {
    return (
      <PageHero eyebrow="Careers" title="Role not found">
        <Button to="/company/careers" variant="secondary">Back to open roles</Button>
      </PageHero>
    );
  }

  return (
    <>
      <PageHero
        eyebrow={`${job.department} · ${job.workMode}`}
        title={job.title}
        description={`${job.location} · ${job.experience} experience`}
      />
      <Section>
        <Container narrow>
          <p className="text-secondary">
            Full role details and the application form live in our applicant tracking system.
            Reach out and we'll route you directly to the hiring manager for this role.
          </p>
          <div style={{ marginTop: 'var(--space-7)', display: 'flex', gap: 'var(--space-4)' }}>
            <Button to="/contact" variant="primary" size="lg">
              Apply now
            </Button>
            <Button to="/company/careers" variant="ghost">
              ← All open roles
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
