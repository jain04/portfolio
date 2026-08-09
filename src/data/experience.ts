import type { PipelineStage } from './projects'

/**
 * The through-line, stated once and explicitly. Each role and project below is
 * an instance of one of these steps; this is the shape they add up to, and it is
 * the first thing the experience section shows.
 */
export const careerPath: PipelineStage[] = [
  {
    key: 'CYTECARE',
    label: 'IT / Software Development Intern',
    detail:
      'Business dashboards, operational analytics and real-time visualization in Python and Django.',
  },
  {
    key: 'BFIRST',
    label: 'Software Engineer',
    detail: 'Full-stack engineering on a production multi-tenant SaaS platform.',
  },
  {
    key: 'ACCUMAX',
    label: 'Production SaaS',
    detail:
      'Portals, workflows, documents, reporting and billing for tax and accounting firms.',
  },
  {
    key: 'SECURITY',
    label: 'Application hardening',
    detail:
      'SQL injection prevention, authentication, MFA/TOTP, RBAC and secure token handling.',
  },
  {
    key: 'AUTOMATION',
    label: 'Desktop integration',
    detail: '.NET 8 and Microsoft UI Automation driving desktop tax software.',
  },
  {
    key: 'AI',
    label: 'Intelligent workflows',
    detail: 'Generative AI applied where it genuinely improves a workflow.',
  },
]

export type Experience = {
  role: string
  company: string
  location?: string
  /**
   * A label, not a date range — no dates were recorded for these roles and
   * inventing them would be worse than omitting them.
   */
  period: string
  /** Marks the role the accent dot and 'Current' treatment belong to. */
  current?: boolean
  context: string
  summary: string
  highlights: string[]
  stack: string[]
}

/** Reverse chronological: the role someone is hiring for comes first. */
export const experience: Experience[] = [
  {
    role: 'Software Engineer',
    company: 'BFirst',
    period: 'Current',
    current: true,
    context: 'AccuMax — Multi-Tenant Tax & Accounting SaaS Platform',
    summary:
      'Working across frontend, backend, database, cloud, security, reporting, workflow systems and automation for a multi-tenant SaaS platform serving tax and accounting workflows.',
    highlights: [
      'Built and enhanced full-stack features across Angular and React frontends and Node.js / Python backend services.',
      'Developed workflow, task, document, notification, reporting and billing capabilities.',
      'Implemented authentication and security capabilities including MFA/TOTP, RBAC, refresh-token rotation and secure cookie handling.',
      'Worked on application security and security hardening, including identifying and addressing SQL injection risks, input validation and API security.',
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
  {
    role: 'IT / Software Development Intern',
    company: 'Cytecare Hospitals',
    location: 'Bengaluru',
    period: 'Internship',
    context: 'Business & operational analytics dashboards',
    summary:
      'Built business and operational dashboards from real organizational requirements, giving teams a way to see and track operational data directly instead of maintaining it by hand in spreadsheets.',
    highlights: [
      'Developed business and operational dashboards to visualize, track and analyze organizational data, reducing reliance on manual Excel-based workflows.',
      'Delivered real-time dashboard updates over WebSockets alongside interactive charts for operational metrics.',
      'Processed and shaped operational data with Pandas to drive analytics and reporting views.',
      'Built drill-down views from summary metrics into the underlying operational detail.',
      'Worked the full path from a stated business requirement through data processing and application logic to a dashboard people actually used.',
    ],
    stack: ['Python', 'Django', 'Streamlit', 'Pandas', 'Chart.js', 'WebSockets'],
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
