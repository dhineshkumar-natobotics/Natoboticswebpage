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

export const teamData: TeamMember[] = [
  { 
    id: '1', 
    name: 'Kannagi Swayam Prakasam', 
    role: 'Co-Founder & Director', 
    category: 'leadership',
    photo: '/images/team/kannagi.png',
    bio: 'Kannagi has over 15 years of leadership experience in software consultancy and IT services. As Co-Founder of Natobotics, he steers the company\'s long-term technology vision and oversees strategic delivery networks across Europe, North America, and Asia.',
    linkedin: 'https://www.linkedin.com/company/natobotics',
    email: 'kannagi@natobotics.com',
    location: 'Chennai, India',
    skills: ['Strategic Leadership', 'IT Consulting', 'Global Delivery', 'Operations Management']
  },
  { 
    id: '2', 
    name: 'Kirubanandam Swayamprakasam', 
    role: 'Co-Founder & Managing Director', 
    category: 'leadership',
    photo: '/images/team/kirubanandam.png',
    bio: 'Kirubanandam is a seasoned business leader managing global operations for Natobotics and its UK-based subsidiaries. He specializes in enterprise digital consulting, process automation frameworks, and structuring international client alliances.',
    linkedin: 'https://www.linkedin.com/company/natobotics',
    email: 'kirubanandam@natobotics.com',
    location: 'London, United Kingdom',
    skills: ['Enterprise Strategy', 'Business Development', 'Process Automation', 'Alliances & Partnerships']
  },
  { 
    id: '3', 
    name: 'Alice Smith', 
    role: 'Engineering Lead & Architect', 
    category: 'engineering',
    photo: '/images/team/alice.png',
    bio: 'Alice leads the core engineering squads at Natobotics, specializing in cloud-native applications, distributed databases, and high-performance microservices. She has a passion for building scalable, fault-tolerant infrastructure.',
    linkedin: 'https://www.linkedin.com/company/natobotics',
    github: 'https://github.com/natobotics',
    email: 'alice.smith@natobotics.com',
    location: 'San Francisco, USA',
    skills: ['Cloud Architecture', 'Distributed Systems', 'Go / Java', 'Kubernetes']
  },
  { 
    id: '4', 
    name: 'Bob Johnson', 
    role: 'Design Head & Creative Director', 
    category: 'design-product',
    photo: '/images/team/bob.png',
    bio: 'Bob is a visionary design leader with over a decade of experience crafting digital customer experiences. He champions user-centric design principles, responsive design systems, and sleek interfaces that drive customer satisfaction.',
    linkedin: 'https://www.linkedin.com/company/natobotics',
    email: 'bob.johnson@natobotics.com',
    location: 'New York, USA',
    skills: ['Creative Direction', 'UI/UX Design', 'Design Systems', 'User Research']
  },
  { 
    id: '5', 
    name: 'Charlie Davis', 
    role: 'Product Manager & Strategy Lead', 
    category: 'design-product',
    photo: '/images/team/charlie.png',
    bio: 'Charlie defines product roadmaps and bridges the gap between client requirements and engineering execution. His focus is on agile product delivery, data-driven decisions, and scaling SaaS platforms for enterprise adoption.',
    linkedin: 'https://www.linkedin.com/company/natobotics',
    email: 'charlie.davis@natobotics.com',
    location: 'Austin, USA',
    skills: ['Product Strategy', 'Agile Delivery', 'SaaS Metrics', 'Stakeholder Management']
  },
  { 
    id: '6', 
    name: 'Diana Evans', 
    role: 'Senior Frontend Developer', 
    category: 'engineering',
    photo: '/images/team/diana.png',
    bio: 'Diana is a frontend specialist focused on clean code, web accessibility (a11y), and responsive interactions. She is an expert in React, TypeScript, and CSS architecture, crafting interactive experiences that are fast and accessible.',
    linkedin: 'https://www.linkedin.com/company/natobotics',
    github: 'https://github.com/natobotics',
    email: 'diana.evans@natobotics.com',
    location: 'Berlin, Germany',
    skills: ['React / Next.js', 'TypeScript', 'CSS/CSS Modules', 'Web Accessibility (a11y)']
  },
  { 
    id: '7', 
    name: 'Eve Foster', 
    role: 'Lead Data Scientist', 
    category: 'engineering',
    photo: '/images/team/eve.png',
    bio: 'Eve leads the AI and machine learning initiatives at Natobotics. She builds predictive analytics pipelines, natural language processing models, and recommendation engines that empower enterprises with data-driven decision capabilities.',
    linkedin: 'https://www.linkedin.com/company/natobotics',
    github: 'https://github.com/natobotics',
    email: 'eve.foster@natobotics.com',
    location: 'Singapore',
    skills: ['Machine Learning', 'Python / PyTorch', 'Data Pipelines', 'NLP & LLMs']
  },
  { 
    id: '8', 
    name: 'Frank Green', 
    role: 'Principal Cloud Architect', 
    category: 'engineering',
    photo: '/images/team/frank.png',
    bio: 'Frank architected the multi-cloud infrastructure strategy for Natobotics\' enterprise clients. He is an expert in AWS, Azure, Google Cloud Platform, and automated CI/CD deployment pipelines.',
    linkedin: 'https://www.linkedin.com/company/natobotics',
    github: 'https://github.com/natobotics',
    email: 'frank.green@natobotics.com',
    location: 'Dubai, UAE',
    skills: ['Multi-Cloud', 'DevOps / CI-CD', 'Terraform', 'Infrastructure as Code']
  }
];

export interface TimelineEvent {
  date: string;
  time: string;
  location: string;
  topic: string;
  description: string;
  speakerId: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    date: '12 Oct 2026',
    time: '10:00 AM',
    location: 'Main Conference Hall',
    topic: 'The Future of Enterprise Cloud Transformation',
    description: 'An in-depth keynote address exploring strategies to scale multi-cloud infrastructures in Fortune 500 companies.',
    speakerId: '2' // Kirubanandam
  },
  {
    date: '15 Oct 2026',
    time: '02:00 PM',
    location: 'Virtual Webinar',
    topic: 'Designing Secure, High-Throughput REST & gRPC APIs',
    description: 'A practical session on optimization strategies, connection pooling, and payload compression for backend architectures.',
    speakerId: '3' // Alice
  },
  {
    date: '28 Oct 2026',
    time: '11:00 AM',
    location: 'Virtual Roundtable',
    topic: 'AI-Powered Automation in Modern Business Operations',
    description: 'Roundtable discussion with industry leaders on implementing predictive analytics and generative AI securely.',
    speakerId: '1' // Kannagi
  },
  {
    date: '05 Nov 2026',
    time: '04:30 PM',
    location: 'Design Workshop',
    topic: 'UX/UI Best Practices for Accessible SaaS Applications',
    description: 'Hands-on workshop on typography scales, interactive states, and design token integration in component libraries.',
    speakerId: '4' // Bob
  }
];
