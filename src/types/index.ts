export interface ServiceItem {
  slug: string;
  name: string;
  summary: string;
  capabilities: string[];
}

export interface IndustryItem {
  slug: string;
  name: string;
  content?: {
    title: string;
    heading: string;
    svgReference: string;
    content: string;
  };
}

export interface OfficeItem {
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  type: 'headquarters' | 'regional';
  timezone: string;
  description: string;
  address: string;
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

export interface ProjectPortfolioItem {
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  techStack: string[];
  year: string;
}

export interface ClientItem {
  slug: string;
  name: string;
  industry: string;
  testimonial: string;
  contact: string;
  since: string;
  logoColor?: string;
  logoBg?: string;
}
