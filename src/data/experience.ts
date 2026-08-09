export type Experience = {
  role: string
  company: string
  context: string
  summary: string
  highlights: string[]
  stack: string[]
}

export const experience: Experience[] = [
  {
    role: 'Software Engineer',
    company: 'BFirst',
    context: 'AccuMax — Multi-Tenant Tax & Accounting SaaS Platform',
    summary:
      'Working across frontend, backend, database, cloud, security, reporting, workflow systems and automation for a multi-tenant SaaS platform serving tax and accounting workflows.',
    highlights: [
      'Built and enhanced full-stack features across Angular and React frontends and Node.js / Python backend services.',
      'Developed workflow, task, document, notification, reporting and billing capabilities.',
      'Implemented authentication and security capabilities including MFA/TOTP, RBAC, refresh-token rotation and secure cookie handling.',
      'Built MongoDB aggregation pipelines and reporting APIs powering operational dashboards and exports.',
      'Worked on application performance, caching and database-performance investigation for high-volume workloads.',
      'Built GitHub Actions and Azure deployment workflows across multiple application environments.',
      'Developed automation and integration workflows for desktop tax preparation software.',
    ],
    stack: [
      'Angular',
      'React',
      'TypeScript',
      'Node.js',
      'Python',
      'MongoDB',
      'Azure',
      'GitHub Actions',
      '.NET 8',
    ],
  },
]

export type Education = {
  degree: string
  abbreviation: string
  institution: string
  detail: string
}

export const education: Education[] = [
  {
    degree: 'Master of Computer Applications',
    abbreviation: 'MCA',
    institution: 'Atria Institute of Technology',
    detail: 'CGPA 7.7',
  },
  {
    degree: 'Bachelor of Computer Applications',
    abbreviation: 'BCA',
    institution: "KLE'S College of BCA RLSI, Belagavi",
    detail: 'CGPA 7.4',
  },
]
