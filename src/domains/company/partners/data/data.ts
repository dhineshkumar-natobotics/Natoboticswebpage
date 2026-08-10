export const tiers = [
  {
    name: 'Cloud & Technology Partners',
    tone: 'ai' as const,
    description: 'Certified engineering partnerships with the cloud and platform vendors our delivery teams build on daily.',
    partners: ['Amazon Web Services', 'Microsoft Azure', 'Adobe', 'MongoDB'],
  },
  {
    name: 'Delivery Alliances',
    tone: 'default' as const,
    description: 'Regional systems integrators and staffing partners that extend our delivery footprint into specialized markets.',
    partners: ['EU Systems Alliance Network', 'GCC Digital Delivery Consortium', 'APAC Engineering Partners'],
  },
  {
    name: 'Referral Partners',
    tone: 'warning' as const,
    description: 'Consultancies and advisory firms that refer enterprise clients into our engagement pipeline.',
    partners: ['Independent Technology Advisors', 'Boutique Management Consultancies'],
  },
];
