import type { CaseStudyItem } from '../../../shared/types';


export const caseStudies: Array<CaseStudyItem> = [
  {
    slug: 'insurance-claims-automation',
    client: 'Tier-1 European Insurer',
    industry: 'Insurance',
    title: 'Cutting claims processing time from days to minutes',
    summary:
      'Replaced a manual claims triage process with an ML-assisted pipeline, reducing adjuster workload while improving fraud detection accuracy.',
    metrics: [
      { label: 'Faster claims cycle', value: '68%' },
      { label: 'Fraud flags improved', value: '2.3x' },
    ],
    image: '/images/case-studies/insurance.png',
  },
  {
    slug: 'core-banking-modernization',
    client: 'Regional Banking Group',
    industry: 'Banking',
    title: 'Migrating a 20-year-old core banking platform to the cloud',
    summary:
      'Phased strangler-fig migration from on-prem mainframe to a cloud-native core, with zero downtime across the cutover.',
    metrics: [
      { label: 'Infra cost reduction', value: '41%' },
      { label: 'Deployment frequency', value: '15x' },
    ],
    image: '/images/case-studies/banking.png',
  },
  {
    slug: 'energy-grid-analytics',
    client: 'Energy Operator, Middle East',
    industry: 'Energy',
    title: 'Predictive maintenance across a national grid network',
    summary:
      'Built a data platform ingesting sensor telemetry from thousands of grid assets to predict failures before they happen.',
    metrics: [
      { label: 'Unplanned downtime', value: '-34%' },
      { label: 'Assets monitored', value: '12,000+' },
    ],
    image: '/images/case-studies/energy.png',
  },
];
