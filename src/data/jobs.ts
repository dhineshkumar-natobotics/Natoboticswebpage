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

export const jobs: JobItem[] = [
  { 
    slug: 'senior-ml-engineer', 
    title: 'Senior ML Engineer', 
    department: 'AI Engineering', 
    location: 'Chennai, IN', 
    workMode: 'Hybrid', 
    experience: '5+ years',
    description: 'Build, deploy, and scale production-grade machine learning models and large language model (LLM) workflows for our enterprise client platforms.',
    salary: '$120k - $160k'
  },
  { 
    slug: 'platform-engineer', 
    title: 'Platform Engineer', 
    department: 'Platform', 
    location: 'Rotterdam, NL', 
    workMode: 'Hybrid', 
    experience: '4+ years',
    description: 'Design and architect core internal platforms, system frameworks, APIs, and microservices supporting critical high-throughput infrastructure.',
    salary: '$100k - $145k'
  },
  { 
    slug: 'frontend-engineer-react', 
    title: 'Frontend Engineer (React)', 
    department: 'Engineering', 
    location: 'Remote', 
    workMode: 'Remote', 
    experience: '3+ years',
    description: 'Craft beautiful, accessible, and high-fidelity user experiences using React, TypeScript, and modern CSS modules for our responsive SaaS products.',
    salary: '$85k - $120k'
  },
  { 
    slug: 'devops-engineer', 
    title: 'DevOps Engineer', 
    department: 'DevOps', 
    location: 'Warsaw, PL', 
    workMode: 'Hybrid', 
    experience: '4+ years',
    description: 'Automate build, test, and release cycles. Maintain Kubernetes orchestration environments and secure multi-cloud architectures.',
    salary: '$95k - $135k'
  },
  { 
    slug: 'data-engineer', 
    title: 'Data Engineer', 
    department: 'Data', 
    location: 'Fremont, CA', 
    workMode: 'Hybrid', 
    experience: '3+ years',
    description: 'Design and build high-performance data warehousing assets, ETL pipelines, and structured analytics environments for data-driven decisions.',
    salary: '$90k - $130k'
  },
  { 
    slug: 'engineering-intern', 
    title: 'Software Engineering Intern', 
    department: 'Engineering', 
    location: 'Chennai, IN', 
    workMode: 'On-site', 
    experience: '0-1 years',
    description: 'Work alongside senior software engineers to fix real production issues, write comprehensive test cases, and build product features.',
    salary: '$30k - $45k'
  }
];
