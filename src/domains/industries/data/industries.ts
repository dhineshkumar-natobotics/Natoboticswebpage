import type { IndustryItem } from '../../../shared/types';
import { bankingContent } from './banking';
import { insuranceContent } from './insurance';
import { mediaentertainmentcontent } from './media-entertainment';
import { telecomContent } from './telecom';
import { oilEnergyContent } from './oil-energy';
export const industries: IndustryItem[] = [

  {
    slug: 'banking-financial-services',
    name: 'Financial Services IT Solutions',
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
    content: mediaentertainmentcontent,
  },
  {
    slug: 'telecom',
    name: 'Telecom',
    content: telecomContent,
  },
  {
    slug: 'oil-energy',
    name: 'Oil & Energy',
    content: oilEnergyContent,
  },
];
