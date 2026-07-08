export interface ServiceItem {
  slug: string;
  name: string;
  summary: string;
  capabilities: string[];
}

export interface IndustryItem {
  slug: string;
  name: string;
  summary: string;
}

export interface OfficeItem {
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  type: 'headquarters' | 'regional';
}

export interface StatItem {
  value: string;
  label: string;
}

export interface CaseStudyItem {
  slug: string;
  client: string;
  industry: string;
  title: string;
  summary: string;
  metrics: { label: string; value: string }[];
  image?: string;
}
