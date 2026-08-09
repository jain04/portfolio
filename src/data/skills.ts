export type SkillGroup = {
  title: string
  /** lucide icon name resolved in the Skills component */
  icon: 'layout' | 'server' | 'database' | 'cloud' | 'shield' | 'sparkles'
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    icon: 'layout',
    items: [
      'React',
      'Angular',
      'TypeScript',
      'JavaScript',
      'Next.js',
      'Tailwind CSS',
      'HTML',
      'CSS',
    ],
  },
  {
    title: 'Backend',
    icon: 'server',
    items: ['Node.js', 'Express', 'NestJS', 'Python', 'Django', 'REST APIs'],
  },
  {
    title: 'Databases',
    icon: 'database',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'cloud',
    items: ['Azure', 'Azure App Service', 'GitHub Actions', 'CI/CD', 'Docker'],
  },
  {
    title: 'Security',
    icon: 'shield',
    items: [
      'Authentication',
      'MFA / TOTP',
      'RBAC',
      'JWT',
      'Refresh Token Rotation',
      'API Security',
    ],
  },
  {
    title: 'Automation & AI',
    icon: 'sparkles',
    items: [
      'Microsoft UI Automation',
      'Workflow Automation',
      'Generative AI',
      'OpenAI',
      'Gemini',
      'API Integrations',
    ],
  },
]

export type Principle = {
  title: string
  question: string
}

export const principles: Principle[] = [
  {
    title: 'Scalability',
    question: 'How does the system behave when users and data grow?',
  },
  {
    title: 'Security',
    question: 'Who should be allowed to access this operation or information?',
  },
  {
    title: 'Automation',
    question: 'Can repetitive manual work be eliminated?',
  },
  {
    title: 'Integration',
    question: 'How do we connect systems that were never designed to work together?',
  },
]

export type FocusArea = {
  title: string
  description: string
  icon: 'layers' | 'building' | 'workflow' | 'brain'
}

export const focusAreas: FocusArea[] = [
  {
    title: 'Full-Stack',
    description:
      'Building applications across frontend, backend, APIs, databases and infrastructure.',
    icon: 'layers',
  },
  {
    title: 'SaaS',
    description: 'Designing multi-tenant business applications and workflows.',
    icon: 'building',
  },
  {
    title: 'Automation',
    description:
      'Eliminating repetitive manual processes through application and desktop automation.',
    icon: 'workflow',
  },
  {
    title: 'AI & Integrations',
    description: 'Connecting applications and using AI to improve product workflows.',
    icon: 'brain',
  },
]
