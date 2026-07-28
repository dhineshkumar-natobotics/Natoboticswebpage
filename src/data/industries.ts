import type { IndustryItem } from '../types';
import { bankingContent } from '../pages/IndustriesPage/banking';
import { insuranceContent } from '../pages/IndustriesPage/insurance';

export const industries: IndustryItem[] = [
  {
    slug: 'banking-financial-services',
    name: 'Banking & Financial Services',
    content: bankingContent,
  },
  {
    slug: 'insurance',
    name: 'Insurance',
    content: insuranceContent,
  },
  {
    slug: 'media-entertainment',
    name: 'Media & Entertainment',
  },
  {
    slug: 'telecom',
    name: 'Telecom',
  },
  {
    slug: 'oil-energy',
    name: 'Oil & Energy',
  },
];
