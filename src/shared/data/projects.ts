import type { ProjectPortfolioItem } from '../types';

export const projects: ProjectPortfolioItem[] = [
  {
    slug: 'claims-portal-rebuild',
    title: 'Self-service claims portal for a European insurer',
    client: 'Tier-1 European Insurer',
    category: 'Application Services',
    description:
      'Rebuilt a legacy claims intake form as a responsive, accessible self-service portal, cutting average submission time and first-contact support tickets.',
    techStack: ['React', 'TypeScript', '.NET', 'Azure'],
    year: '2025',
  },
  {
    slug: 'grid-telemetry-dashboard',
    title: 'Real-time telemetry dashboard for grid operations',
    client: 'Energy Operator, Middle East',
    category: 'Analytics & Insights',
    description:
      'Built a streaming analytics dashboard surfacing sensor telemetry from thousands of grid assets, with anomaly alerts routed to field engineers.',
    techStack: ['Python', 'Kafka', 'Hadoop', 'Grafana'],
    year: '2024',
  },
  {
    slug: 'core-banking-cloud-migration',
    title: 'Phased migration of core banking to cloud-native infrastructure',
    client: 'Regional Banking Group',
    category: 'Cloud & Mobility',
    description:
      'Executed a strangler-fig migration from on-prem mainframe to a hybrid AWS/Azure landscape with zero downtime across cutover weekends.',
    techStack: ['AWS', 'Azure', 'Terraform', 'Kubernetes'],
    year: '2024',
  },
  {
    slug: 'logistics-fleet-ops-platform',
    title: 'Fleet operations platform for a logistics carrier',
    client: 'Regional Logistics Carrier',
    category: 'Infrastructure Management',
    description:
      'Modernized dispatch and fleet-tracking infrastructure with automated scaling and a unified ops console for regional depots.',
    techStack: ['.NET', 'Azure', 'React', 'SQL Server'],
    year: '2023',
  },
  {
    slug: 'mobile-loyalty-game',
    title: 'Cross-platform loyalty mini-game for a retail brand',
    client: 'Multi-Region Retail Chain',
    category: 'Gaming & Design',
    description:
      'Designed and shipped a lightweight mobile mini-game tying in-app rewards to a loyalty program, launched simultaneously on iOS and Android.',
    techStack: ['React Native', 'Unity', 'Node.js'],
    year: '2023',
  },
  {
    slug: 'catalogue-automation-pipeline',
    title: 'Automated catalogue generation for a publishing house',
    client: 'Publishing & Media Group',
    category: 'Adobe InDesign Automation',
    description:
      'Replaced manual catalogue layout with a server-side InDesign automation pipeline pulling structured XML product data into print-ready templates.',
    techStack: ['Adobe InDesign Server', 'XML', 'JavaScript'],
    year: '2022',
  },
  {
    slug: 'document-digitisation-workflow',
    title: 'High-volume document digitisation workflow',
    client: 'Financial Back-Office Provider',
    category: 'KPO/BPO Services',
    description:
      'Stood up an OCR-assisted digitisation and validation workflow processing high volumes of financial documents with a human-in-the-loop QA layer.',
    techStack: ['OCR', 'Python', 'Workflow Automation'],
    year: '2022',
  },
  {
    slug: 'fintech-mobile-app',
    title: 'Consumer mobile banking app for a fintech challenger',
    client: 'Southeast Asia Fintech Startup',
    category: 'React Native Mobile',
    description:
      'Delivered a cross-platform mobile banking app from design through App Store launch, sharing a single React Native codebase across iOS and Android.',
    techStack: ['React Native', 'TypeScript', 'AWS Amplify'],
    year: '2021',
  },
];
