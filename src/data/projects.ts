export type CaseStudySection = {
  heading: string
  body?: string
  bullets?: string[]
  /** A short system-console stamp, in the runner's voice. Used sparingly. */
  badge?: string
}

/** A component of a diagram. `detail` is revealed on hover or focus. */
export type DiagramNode = {
  label: string
  detail: string
}

/**
 * One horizontal band of a layered system. Tiers stack top-to-bottom; the items
 * inside a tier sit side by side because they are peers, not steps.
 */
export type ArchitectureTier = {
  label: string
  items: DiagramNode[]
  tone?: 'edge' | 'core' | 'data'
}

/**
 * One step of a sequential pipeline. `key` is the short uppercase rail label,
 * `label` the human description beside it, `detail` the explanation shown when
 * the stage is hovered or focused.
 */
export type PipelineStage = {
  key: string
  label: string
  detail: string
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
  /** Where the work happened — an employer, or 'Project' for personal work. */
  context: string
  /** Shown in the system readout. Only set where it is literally true. */
  status?: string
  tags: string[]
  /** Capability chips. The card shows a slice; the case study shows them all. */
  areas?: string[]
  links?: { label: string; href: string }[]
  caseStudy?: {
    overview: string
    sections: CaseStudySection[]
    /**
     * A system is drawn as layered tiers, a process as an ordered pipeline.
     * Projects declare whichever one actually describes them — never both.
     */
    architecture?: { title: string; tiers: ArchitectureTier[]; footer?: string }
    pipeline?: { title: string; stages: PipelineStage[]; footer?: string }
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
    context: 'BFirst',
    status: 'Production',
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
      'Application Security',
      'SQL Injection Prevention',
      'Input Validation',
      'API Security',
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
      architecture: {
        title: 'Platform architecture',
        tiers: [
          {
            label: 'Portals',
            tone: 'edge',
            items: [
              {
                label: 'Client',
                detail: 'Client-facing portal for documents, tasks and communication with the firm.',
              },
              {
                label: 'CPA',
                detail: 'CPA workspace covering engagements, client management and workflows.',
              },
              {
                label: 'Admin',
                detail: 'Administrative control over organizations, users, roles and permissions.',
              },
            ],
          },
          {
            label: 'Workflows',
            tone: 'core',
            items: [
              {
                label: 'Tasks',
                detail: 'Task and workflow tracking across teams and engagements.',
              },
              {
                label: 'Documents',
                detail: 'Document management with role-based access to each file.',
              },
              {
                label: 'Notifications',
                detail: 'Notification delivery driven by activity across the platform.',
              },
            ],
          },
          {
            label: 'Services',
            tone: 'core',
            items: [
              {
                label: 'Backend APIs',
                detail:
                  'REST APIs connecting portal workflows to backend services, behind authentication and role checks.',
              },
            ],
          },
          {
            label: 'Platform',
            tone: 'data',
            items: [
              {
                label: 'MongoDB',
                detail:
                  'MongoDB aggregation pipelines powering reporting, dashboards and data exports.',
              },
              {
                label: 'Azure',
                detail: 'Azure App Service hosting, deployed through GitHub Actions workflows.',
              },
            ],
          },
        ],
        footer: 'Authentication · RBAC · MFA · Caching · Reporting · CI/CD · Integrations',
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
        {
          heading: 'Security & reliability',
          badge: 'Threat mitigated',
          body: 'A platform holding financial and tax data for multiple firms has to be defensible at every layer, not just behind a login. I worked on application security and security hardening across the platform — identifying and addressing SQL injection risks, and strengthening how the application authenticates, authorizes, validates input and handles tokens.',
          bullets: [
            'Identifying and addressing SQL injection risks in the application.',
            'Authentication, MFA/TOTP and role-based access control across four portal experiences.',
            'JWT handling, refresh-token rotation and secure cookie controls.',
            'API security and authorization checks on sensitive operations.',
            'Secure input handling on the paths where untrusted data reaches the system.',
          ],
        },
      ],
      challenges: [
        'Keeping tenant data isolated while sharing platform services',
        'Modelling permissions across four distinct portal experiences',
        'Aggregation and reporting over high-volume workflow data',
        'Session security: MFA, refresh-token rotation, secure cookies',
        'Closing application-layer risks such as SQL injection',
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
    context: 'BFirst',
    status: 'Production',
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
      pipeline: {
        title: 'Automation pipeline',
        stages: [
          {
            key: 'DATA',
            label: 'Structured tax data',
            detail: 'Structured tax data from the platform, not scanned pixels.',
          },
          {
            key: 'EXTRACT',
            label: 'Extraction',
            detail: 'Pulls the fields the target return actually requires.',
          },
          {
            key: 'TRANSFORM',
            label: 'Value transformation',
            detail: 'Converts values into the formats the target software expects.',
          },
          {
            key: 'MAP',
            label: 'Business field mapping',
            detail: 'Maps structured business data to application-specific fields.',
          },
          {
            key: 'IDENTIFY',
            label: 'Screen identification',
            detail: 'Identifies the correct desktop screen and its controls before writing.',
          },
          {
            key: 'AUTOMATE',
            label: 'Microsoft UI Automation',
            detail: 'Writes values through Microsoft UI Automation.',
          },
          {
            key: 'DESKTOP',
            label: 'Desktop tax software',
            detail: 'The target application, driven through its own accessibility tree.',
          },
          {
            key: 'VERIFY',
            label: 'Post-write verification',
            detail: 'Reads back what landed on screen and confirms it matches.',
          },
        ],
        footer: 'Driven by structured data and declarative field mappings — not OCR.',
      },
      sections: [
        {
          heading: 'The challenge',
          body: 'Desktop tax preparation software does not behave like a normal web application. There is no API to post to and no DOM to query — only a native UI hierarchy whose screens, controls and input behaviour have to be discovered, described and driven reliably.',
        },
        {
          heading: 'The approach',
          badge: 'Process automated',
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
    name: 'Real-Time Hospital Analytics Dashboard',
    tagline: 'Business and operational dashboards built from real requirements',
    summary:
      'Business and operational dashboards for Cytecare Hospitals providing interactive analytics, real-time visibility and drill-down views, reducing reliance on manual Excel-based workflows.',
    featured: false,
    kind: 'analytics',
    context: 'Cytecare Hospitals',
    tags: ['Python', 'Django', 'Streamlit', 'WebSockets', 'Chart.js', 'Pandas'],
    areas: [
      'Business Requirements',
      'Dashboard Development',
      'Real-Time Analytics',
      'Interactive Visualization',
      'Operational Tracking',
      'Data Processing',
      'Drill-Down Views',
    ],
    caseStudy: {
      overview:
        'Operational reporting was being assembled and maintained by hand in spreadsheets. This was my first experience building software against real organizational requirements rather than a specification I had written for myself: sitting with what teams actually needed to see, and turning it into dashboards that stayed current on their own.',
      pipeline: {
        title: 'From requirement to visibility',
        stages: [
          {
            key: 'REQUIREMENT',
            label: 'Business and operational requirement',
            detail: 'What a team actually needed to see, stated in their terms.',
          },
          {
            key: 'PROCESS',
            label: 'Data processing',
            detail: 'Shaping and aggregating the operational data with Pandas.',
          },
          {
            key: 'LOGIC',
            label: 'Application logic',
            detail: 'Django application and backend logic behind the views.',
          },
          {
            key: 'ANALYTICS',
            label: 'Operational analytics',
            detail: 'Turning processed data into the metrics that mattered.',
          },
          {
            key: 'DASHBOARD',
            label: 'Interactive dashboard',
            detail: 'Interactive charts kept live over WebSockets.',
          },
          {
            key: 'VISIBILITY',
            label: 'Operational visibility',
            detail: 'A team seeing its own operation without rebuilding a spreadsheet.',
          },
        ],
      },
      sections: [
        {
          heading: 'What it does',
          bullets: [
            'Business and operational dashboards for tracking and analysis',
            'Real-time updates delivered over WebSockets',
            'Interactive charts for operational metrics',
            'Drill-down views from summary metrics into underlying detail',
            'Operational analytics assembled with Pandas',
            'Removes repetitive manual Excel-based reporting',
          ],
        },
        {
          heading: 'What it taught me',
          body: 'That the hard part of business software is rarely the framework. It is understanding what someone needs to see, where that data actually lives, and what has to stay true every time the dashboard refreshes — the same questions that turn up later on a much larger platform.',
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
    context: 'Project',
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
    context: 'Project',
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
    context: 'Project',
    tags: ['Flutter', 'Dart', 'REST APIs'],
  },
]

/** True when a project declares a visual, so callers can skip empty columns. */
export function hasDiagram(project: Project): boolean {
  return Boolean(project.caseStudy?.architecture ?? project.caseStudy?.pipeline)
}

export const featuredProjects = projects.filter((p) => p.featured)
export const otherProjects = projects.filter((p) => !p.featured)
