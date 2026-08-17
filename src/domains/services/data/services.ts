import type { ServiceItem } from '../../../shared/types';
import { applicationServicesContent } from './applicationservice';
import { analyticsContent } from './analytics';
import { cloudContent } from './cloudandmobility';
import { infraContent } from './inframanagement';
import { gamingContent } from './gaming';
import { kopContent } from './kpo';
import { adobeContent } from './adobeindesign';
import { reactContent } from './react';
import { dotnetContent } from './dotnet';
import { rnContent } from './reactnative';
import { hadoopContent } from './hadoop';
import { awsContent } from './azureandaws';

export const services: ServiceItem[] = [
  {
    slug: 'application-services',
    name: 'Application Services',
    content: applicationServicesContent,
    subServices: [
      { slug: 'react-js', name: 'React.JS Development', content: reactContent },
      { slug: 'dotnet', name: '.Net Architecture', content: dotnetContent },
      { slug: 'react-native', name: 'React Native Mobile', content: rnContent },
    ]
  },
  {
    slug: 'analytics-insights',
    name: 'Analytics & Insights',
    content: analyticsContent,
    subServices: [
      { slug: 'hadoop', name: 'Hadoop Big Data', content: hadoopContent },
    ]
  },
  {
    slug: 'cloud-mobility',
    name: 'Cloud & Mobility',
    content: cloudContent,
    subServices: [
      { slug: 'aws-azure', name: 'AWS & Azure Engineering', content: awsContent },
    ]
  },
  {
    slug: 'infrastructure-management',
    name: 'Infrastructure Management',
    content: infraContent,
  },
  {
    slug: 'gaming-design',
    name: 'Gaming & Design',
    content: gamingContent,
    subServices: [
      { slug: 'adobe-indesign', name: 'Adobe InDesign Automation', content: adobeContent },
    ]
  },
  {
    slug: 'kpo-bpo',
    name: 'KPO/BPO Services',
    content: kopContent,
  },
];
