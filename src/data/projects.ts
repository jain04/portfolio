export type CaseStudySection = {
  heading: string
  body?: string
  bullets?: string[]
}

export type Project = {
  id: string
  name: string
  tagline: string
  summary: string
  /** Featured projects get the large treatment and a full case study view. */
  featured: boolean
  /** Rendered inside the card as an ambient diagram/label pair. */
  kind: 'saas' | 'automation' | 'analytics' | 'ai' | 'product'
  year: string
  tags: string[]
  /** Small capability chips shown on the featured cards. */
  areas?: string[]
  links?: { label: string; href: string }[]
  caseStudy?: {
    overview: string
    sections: CaseStudySection[]
    /** Ordered pipeline/architecture nodes rendered as a diagram. */
    diagram?: { title: string; nodes: string[]; footer?: string }
    challenges?: string[]
  }
}

export const projects: Project[] = [
  {
    id: 'accumax',
    name: 'AccuMax',
    tagline: 'Multi-Tenant Tax & Accounting SaaS Platform',
    summary:
      'A production SaaS platform for tax and accounting firms, bringing client management, CPA workflows, documents, tasks, communication, reporting, billing and automation into one platform.',
    featured: true,
    kind: 'saas',
    year: 'BFirst',
    tags: [
      'Angular',
      'React',
      'Node.js',
      'Python',
      'MongoDB',
      'Azure',
      'GitHub Actions',
      'REST APIs',
      'RBAC',
      'MFA',
      'Automation',
    ],
    areas: [
      'Multi-Tenancy',
      'Role-Based Access',
      'Authentication',
      'MFA / TOTP',
      'Workflow Management',
      'Document Management',
      'Reporting',
      'Dashboard Analytics',
      'Billing',
      'Notifications',
      'API Development',
      'Database Optimization',
      'Cloud Deployment',
      'CI/CD',
      'Automation',
    ],
    caseStudy: {
      overview:
        'AccuMax is a multi-tenant SaaS platform designed for tax and accounting firms. Clients, CPAs, administrators and internal teams work inside the same platform, each with their own portal, permissions and workflows.',
      diagram: {
        title: 'Platform architecture',
        nodes: [
          'Admin Portal · CPA Portal · Client Portal',
          'Team Workflows',
          'Backend APIs',
          'MongoDB',
          'Azure',
        ],
        footer: 'Authentication · RBAC · MFA · Caching · CI/CD · Reporting · Integrations',
      },
      sections: [
        {
          heading: 'Problem',
          body: 'Tax and accounting firms run on many moving parts — clients, engagements, documents, tasks, communication, reporting and billing. Each portal serves a different role with different permissions, while everything has to stay isolated per organisation and consistent across the platform.',
        },
        {
          heading: 'Approach',
          body: 'A multi-tenant platform with dedicated portals for administrators, CPAs, clients and internal teams, sitting on shared backend services. Access is governed by role-based permissions, sensitive operations are protected by MFA, and operational data is surfaced through reporting APIs and dashboards.',
        },
        {
          heading: 'My contribution',
          bullets: [
            'Built and enhanced full-stack features across Angular and React frontends and Node.js / Python backend services.',
            'Developed workflow, task, document, notification, reporting and billing capabilities.',
            'Implemented authentication and security capabilities including MFA/TOTP, RBAC, refresh-token rotation and secure cookie handling.',
            'Built MongoDB aggregation pipelines and reporting APIs for operational dashboards and exports.',
            'Worked on application performance, caching and database-performance investigation for high-volume workloads.',
            'Built GitHub Actions and Azure deployment workflows across multiple application environments.',
            'Developed automation and integration workflows for tax preparation software.',
          ],
        },
      ],
      challenges: [
        'Keeping tenant data isolated while sharing platform services',
        'Modelling permissions across four distinct portal experiences',
        'Aggregation and reporting over high-volume workflow data',
        'Session security: MFA, refresh-token rotation, secure cookies',
        'Repeatable deployments across multiple environments',
      ],
    },
  },
  {
    id: 'tax-automation',
    name: 'Tax Entry Automation',
    tagline: 'Bridging structured tax data with desktop tax preparation software',
    summary:
      'A .NET automation system that takes structured tax data, maps it to the right fields and screens, and enters it into desktop tax preparation software through Microsoft UI Automation — then verifies what was written.',
    featured: true,
    kind: 'automation',
    year: 'BFirst',
    tags: [
      '.NET 8',
      'C#',
      'Microsoft UI Automation',
      'JSON',
      'Field Mapping',
      'Screen Identification',
      'Data Transformation',
    ],
    areas: [
      'Screen Discovery',
      'UI Hierarchy Inspection',
      'Screen Definitions',
      'Field Mapping',
      'Value Transformation',
      'Masked Inputs',
      'Write & Verify',
    ],
    caseStudy: {
      overview:
        'Tax preparation happens inside desktop software that was never designed to be driven by another system. This project connects structured tax data from the CPA portal to that software, without asking anyone to retype it.',
      diagram: {
        title: 'Automation pipeline',
        nodes: [
          'Structured Tax Data',
          'Extraction',
          'Transformation',
          'Field Mapping',
          'Screen Identification',
          'Microsoft UI Automation',
          'Desktop Tax Software',
          'Verification',
        ],
      },
      sections: [
        {
          heading: 'The challenge',
          body: 'Desktop tax preparation software does not behave like a normal web application. There is no API to post to and no DOM to query — only a native UI hierarchy whose screens, controls and input behaviour have to be discovered, described and driven reliably.',
        },
        {
          heading: 'The approach',
          body: 'A UI Automation-based system built on .NET 8 and Microsoft UI Automation. Structured data is transformed into target values, mapped onto business fields, and written into the correct screen once that screen has been positively identified. This is not OCR — nothing is read off pixels. Everything runs on structured data, declarative field mappings and the application’s own accessibility tree.',
          bullets: [
            'Discovering application screens and inspecting UI hierarchies',
            'Identifying screens and maintaining reusable screen definitions',
            'Mapping business fields to concrete UI elements',
            'Transforming values into the formats the target software expects',
            'Handling masked inputs and constrained controls',
            'Writing values and verifying what actually landed on screen',
          ],
        },
      ],
      challenges: [
        'No API surface — integration happens through the UI automation tree',
        'Screens must be identified before anything can be safely written',
        'Screen definitions have to stay reusable as the UI changes',
        'Masked and formatted inputs reject naive value writes',
        'Verification matters as much as entry: written ≠ accepted',
      ],
    },
  },
  {
    id: 'hospital-analytics',
    name: 'Real-Time Hospital Analytics',
    tagline: 'Operational dashboards with live updates and patient-level drilldowns',
    summary:
      'An analytics dashboard for hospital operations with interactive visualizations, real-time updates and patient-level drilldowns, replacing manual Excel-based reporting.',
    featured: false,
    kind: 'analytics',
    year: 'Project',
    tags: ['Python', 'Django', 'Streamlit', 'WebSockets', 'Chart.js', 'Pandas'],
    caseStudy: {
      overview:
        'Hospital operations were tracked through manual spreadsheets. This project turns that reporting into a live dashboard where operational data updates as it changes.',
      sections: [
        {
          heading: 'What it does',
          bullets: [
            'Real-time dashboards driven over WebSockets',
            'Interactive charts for operational metrics',
            'Patient-level drilldowns from summary views',
            'Operational analytics assembled with Pandas',
            'Removes repetitive manual Excel reporting',
          ],
        },
      ],
    },
  },
  {
    id: 'ai-trip-planner',
    name: 'AI Trip Planner',
    tagline: 'AI-generated itineraries with a fast, responsive interface',
    summary:
      'A travel planning application that generates itineraries with Gemini AI, backed by Firebase and a responsive React interface.',
    featured: false,
    kind: 'ai',
    year: 'Project',
    tags: ['React', 'Tailwind CSS', 'Firebase', 'Gemini AI'],
    caseStudy: {
      overview:
        'A React application that turns a few trip inputs into a structured, usable itinerary using generative AI.',
      sections: [
        {
          heading: 'What it does',
          bullets: [
            'AI itinerary generation via the Gemini API',
            'Firebase for data and application state',
            'Responsive interface across mobile and desktop',
            'API integration and response handling on the client',
          ],
        },
      ],
    },
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Platform',
    tagline: 'Catalogue, cart and checkout flows on a REST backend',
    summary:
      'A full-stack storefront covering product catalogue, cart, checkout flow and order handling on a REST API backend.',
    featured: false,
    kind: 'product',
    year: 'Project',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
  },
  {
    id: 'news-app',
    name: 'News Application',
    tagline: 'Cross-platform mobile client over a live news API',
    summary:
      'A cross-platform mobile news client built in Flutter, with category browsing and article views over a live news API.',
    featured: false,
    kind: 'product',
    year: 'Project',
    tags: ['Flutter', 'Dart', 'REST APIs'],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const otherProjects = projects.filter((p) => !p.featured)
