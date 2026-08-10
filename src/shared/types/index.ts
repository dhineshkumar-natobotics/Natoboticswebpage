export interface ServiceItem {
  slug: string;
  name: string;
  image?: string;
  subServices?: Array<{
    slug: string;
    name: string;
    content?: string | { title: string; content: string; };
  }>;
  content?: {
    title: string;
    content: string;
    heading?: string;
    svgReference?: string;
    image?: string;
  };
}

export interface IndustryItem {
  slug: string;
  name: string;
  content?: {
    title: string;
    heading?: string;
    svgReference?: string;
    content: string;
    image?: string;
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
  image?: string;
  logoColor?: string;
  logoBg?: string;
}

export interface JobItem {
  slug: string;
  title: string;
  department: string;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  experience: string;
  description: string;
  salary: string;
}

export interface MailContact {
  id: string;
  label: string;
  email: string;
}

export interface ContactDetail {
  title: string;
  desc: string;
  contact: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'leadership' | 'engineering' | 'design-product';
  photo: string;
  bio: string;
  linkedin: string;
  github?: string;
  website?: string;
  email: string;
  location: string;
  skills: string[];
}

export interface TimelineEvent {
  date: string;
  time: string;
  location: string;
  topic: string;
  description: string;
  speakerId: string;
}
