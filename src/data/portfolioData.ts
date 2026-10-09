export interface Project {
  id: string;
  title: string;
  category: 'Full Stack' | 'Next.js / React' | 'APIs & Backend';
  tagline: string;
  description: string;
  tech: string[];
  metrics: string;
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    cachingDevOps: string;
  };
  features: string[];
  challengesSolved: string;
  demoUrl: string;
  githubUrl: string;
  gradientTheme: string;
  iconType: 'analytics' | 'ecommerce' | 'collab' | 'security' | 'code' | 'pipeline';
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Databases' | 'DevOps & Tools';
  level: string;
  yearsExp: string;
  description: string;
  highlightProjects: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export const PERSONAL_INFO = {
  name: 'Deep Baidya',
  title: 'Full Stack Developer',
  focus: 'MERN Stack & Next.js Ecosystem',
  tagline: 'Engineering high-performance web applications, scalable APIs, and intuitive user experiences.',
  bio: 'Full-stack software engineer with 4+ years of specialized experience designing resilient web applications. From low-latency backend architectures with Node.js & PostgreSQL to responsive, accessible frontends in React 19 & Next.js, I build software that scales reliably.',
  email: 'dbaidya811@gmail.com',
  github: 'https://github.com/dbaidya811',
  linkedin: 'https://linkedin.com/in/dbaidya811',
  twitter: 'https://x.com/dbaidya811',
  location: 'Available Globally (Remote)',
  timezone: 'UTC+6 (Flexible overlap with US, EU, APAC)',
  status: 'Open to Full-Time Roles & High-Impact Contracts',
  stats: [
    { label: 'Years Experience', value: '4+' },
    { label: 'Production Apps', value: '24+' },
    { label: 'Uptime Reliability', value: '99.9%' },
    { label: 'Code Quality', value: '100% Type-Safe' },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'pulse-metrics',
    title: 'PulseMetrics',
    category: 'Full Stack',
    tagline: 'Distributed Cloud Observability & Anomaly Telemetry',
    description: 'Real-time telemetry and infrastructure health monitoring platform capable of ingesting high-frequency server metrics, rendering interactive time-series anomalies, and notifying on-call engineers via automated webhooks.',
    tech: ['React 19', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'TimescaleDB', 'Redis', 'Docker'],
    metrics: 'Sub-45ms metric ingestion · 12,000 events/sec peak capacity',
    architecture: {
      frontend: 'React 19, TypeScript, Tailwind CSS, Canvas-based Time-series Visualizer',
      backend: 'Node.js / Express microservices with WebSocket streaming hub',
      database: 'PostgreSQL with TimescaleDB hypertables for metrics retention',
      cachingDevOps: 'Redis Cluster for pub/sub and Docker containerized pipelines',
    },
    features: [
      'Multi-tenant project dashboards with role-based team permissions',
      'Live WebSocket metric streaming with zero-lag canvas charts',
      'Threshold-based alerting pipeline with Slack & Discord integration',
      'Automated database table partitioning for long-term telemetry storage',
    ],
    challengesSolved: 'Mitigated high write-load database contention by establishing a Redis pub/sub queue worker pipeline before batching inserts into TimescaleDB.',
    demoUrl: 'https://pulsemetrics-demo.example.com',
    githubUrl: 'https://github.com/dbaidya811/pulse-metrics',
    gradientTheme: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    iconType: 'analytics',
  },
  {
    id: 'omni-cart',
    title: 'OmniCart Platform',
    category: 'Next.js / React',
    tagline: 'Headless E-Commerce Storefront & Real-time Inventory',
    description: 'Ultra-fast headless commerce solution featuring hybrid static and server-rendered product displays, optimistic cart mutations, localized pricing, and webhook-synchronized multi-warehouse inventory.',
    tech: ['Next.js 15', 'React 19', 'Tailwind CSS', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe API', 'Zustand'],
    metrics: '99 Mobile Lighthouse Score · <1.1s Core Web Vitals LCP',
    architecture: {
      frontend: 'Next.js 15 App Router, React Server Components, Tailwind CSS',
      backend: 'Express.js commerce orchestration API with Stripe Checkout integration',
      database: 'MongoDB replica sets with compound indexing for faceted search',
      cachingDevOps: 'Edge middleware routing, Redis session cache, Vercel & AWS S3',
    },
    features: [
      'Sub-second faceted product filtering with URL-synchronized state',
      'Optimistic cart updates with instant stock validation',
      'Stripe Payment Elements integration supporting Apple Pay & Google Pay',
      'Admin analytics dashboard with revenue trends and order lifecycle management',
    ],
    challengesSolved: 'Resolved race conditions during concurrent flash-sale checkouts using atomic MongoDB document increment operations and distributed Redis locks.',
    demoUrl: 'https://omnicart-demo.example.com',
    githubUrl: 'https://github.com/dbaidya811/omnicart-commerce',
    gradientTheme: 'from-emerald-400/20 via-cyan-500/10 to-transparent',
    iconType: 'ecommerce',
  },
  {
    id: 'nexus-flow',
    title: 'NexusFlow Workspace',
    category: 'Full Stack',
    tagline: 'Real-Time Collaborative Engineering Docs & Editor',
    description: 'Collaborative knowledge workspace allowing distributed engineering teams to write technical documentation, diagram architectures, and review snippets simultaneously with zero edit collisions.',
    tech: ['React', 'TypeScript', 'Node.js', 'WebSockets', 'Tailwind CSS', 'MongoDB', 'JWT Auth'],
    metrics: '0 conflict collisions · 60 FPS real-time cursor tracking',
    architecture: {
      frontend: 'React 19, TypeScript, Custom Rich Text Engine, Tailwind CSS',
      backend: 'Node.js WebSocket gateway with Operational Transformation (OT)',
      database: 'MongoDB for versioned document trees and workspace metadata',
      cachingDevOps: 'Redis socket adapter for multi-instance scaling',
    },
    features: [
      'Multiplayer live cursors and peer selection highlights',
      'Markdown syntax highlighting with interactive code block execution',
      'Granular role-based access control (Viewer, Editor, Admin)',
      'Document revision history with one-click rollback capabilities',
    ],
    challengesSolved: 'Engineered an OT-based text reconciliation algorithm to ensure seamless offline reconnection without dropping user keystrokes.',
    demoUrl: 'https://nexusflow-demo.example.com',
    githubUrl: 'https://github.com/dbaidya811/nexus-flow-workspace',
    gradientTheme: 'from-teal-500/20 via-emerald-600/10 to-transparent',
    iconType: 'collab',
  },
  {
    id: 'hyper-gate',
    title: 'HyperGate Security Proxy',
    category: 'APIs & Backend',
    tagline: 'High-Throughput API Gateway & Authentication Service',
    description: 'Enterprise API reverse proxy featuring token validation, token bucket rate limiting, structured audit logging, and automated routing to downstream microservices.',
    tech: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'JWT', 'Swagger/OpenAPI'],
    metrics: '12ms average proxy latency · 100% automated test coverage',
    architecture: {
      frontend: 'Lightweight Admin Dashboard in React for route inspection',
      backend: 'Node.js / Express reverse proxy using asynchronous stream pipelines',
      database: 'PostgreSQL for client credentials, scope ACLs, and rate tier rules',
      cachingDevOps: 'Redis for distributed sliding-window rate limit counters',
    },
    features: [
      'Sliding window rate limiter preventing API abuse and DDoS surges',
      'JWT asymmetric verification (RS256) with automated key rotation',
      'Dynamic upstream routing with circuit-breaker health probes',
      'Detailed OpenAPI 3.0 documentation with interactive test sandbox',
    ],
    challengesSolved: 'Achieved sub-15ms proxy overhead by avoiding blocking I/O and caching client authorization tokens in Redis with sliding TTL.',
    demoUrl: 'https://hypergate-demo.example.com',
    githubUrl: 'https://github.com/dbaidya811/hypergate-api-proxy',
    gradientTheme: 'from-emerald-600/20 via-mint-500/10 to-transparent',
    iconType: 'security',
  },
  {
    id: 'dev-canvas',
    title: 'DevCanvas Sandbox',
    category: 'Next.js / React',
    tagline: 'Browser Component Sandbox & CSS Micro-Builder',
    description: 'Interactive web prototyping playground for developers to write, inspect, and benchmark isolated React components, test Tailwind styles, and export clean production code.',
    tech: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide React', 'Web Workers'],
    metrics: 'Instant live transpile · Zero server roundtrip latency',
    architecture: {
      frontend: 'React 19, Monaco editor integration, sandboxed execution iframe',
      backend: 'Static client-side web worker compiler, zero server dependence',
      database: 'Browser IndexedDB for offline project caching and state restoration',
      cachingDevOps: 'Vite static build with PWA offline service worker',
    },
    features: [
      'Isolated sandbox environment preventing DOM contamination',
      'Dynamic Tailwind CSS JIT compilation directly in browser',
      'One-click export to GitHub Gist and standalone code bundles',
      'Responsive device frame simulator (Mobile, Tablet, Desktop)',
    ],
    challengesSolved: 'Utilized background Web Workers for TypeScript compilation to keep the main browser thread at a silky smooth 60 FPS while typing.',
    demoUrl: 'https://devcanvas-demo.example.com',
    githubUrl: 'https://github.com/dbaidya811/devcanvas-sandbox',
    gradientTheme: 'from-mint-400/20 via-emerald-500/10 to-transparent',
    iconType: 'code',
  },
  {
    id: 'data-stream',
    title: 'DataStream Webhook Pipeline',
    category: 'APIs & Backend',
    tagline: 'Resilient Webhook Dispatcher & Event Processing Queue',
    description: 'Fault-tolerant background job engine managing outbound webhook dispatches for third-party platforms with exponential retry backoff and detailed delivery audit logs.',
    tech: ['Node.js', 'Express', 'TypeScript', 'MongoDB', 'BullMQ', 'Redis', 'Docker'],
    metrics: '99.98% successful delivery rate · 500k+ jobs handled daily',
    architecture: {
      frontend: 'React monitoring console with dead-letter queue inspection',
      backend: 'Node.js consumer workers with BullMQ job distribution',
      database: 'MongoDB for webhook delivery logs and idempotency tracking',
      cachingDevOps: 'Redis BullMQ coordinator with Docker Compose clustering',
    },
    features: [
      'HMAC SHA-256 payload signing for verifiable receiver authentication',
      'Configurable exponential backoff retries with jitter',
      'Interactive dead-letter queue with one-click manual retry dispatch',
      'Prometheus metric exporter for Prometheus and Grafana alerts',
    ],
    challengesSolved: 'Prevented duplicate event processing across worker restarts by enforcing strict idempotency key locks in Redis with automatic expiration.',
    demoUrl: 'https://datastream-demo.example.com',
    githubUrl: 'https://github.com/dbaidya811/datastream-webhook-engine',
    gradientTheme: 'from-emerald-500/20 via-teal-700/10 to-transparent',
    iconType: 'pipeline',
  },
];

export const SKILLS: SkillItem[] = [
  {
    id: 'react-next',
    name: 'React 19 & Next.js 15',
    category: 'Frontend',
    level: 'Expert',
    yearsExp: '4 Years',
    description: 'Server Components, Suspense, App Router, Hooks architecture, and performance profiling.',
    highlightProjects: 'OmniCart, PulseMetrics, DevCanvas',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Frontend',
    level: 'Advanced',
    yearsExp: '4 Years',
    description: 'Strict type modeling, generic utilities, end-to-end type safety between client and server.',
    highlightProjects: 'All Projects',
  },
  {
    id: 'tailwind-css',
    name: 'Tailwind CSS & Modern UI',
    category: 'Frontend',
    level: 'Expert',
    yearsExp: '4 Years',
    description: 'Design systems, responsive layout math, glassmorphic dark styling, accessibility (WCAG AA).',
    highlightProjects: 'Portfolio, OmniCart, DevCanvas',
  },
  {
    id: 'state-mgmt',
    name: 'Zustand & Redux Toolkit',
    category: 'Frontend',
    level: 'Advanced',
    yearsExp: '3+ Years',
    description: 'Predictable state stores, optimistic mutation patterns, selector memoization.',
    highlightProjects: 'OmniCart, NexusFlow',
  },
  {
    id: 'node-express',
    name: 'Node.js & Express.js',
    category: 'Backend',
    level: 'Expert',
    yearsExp: '4 Years',
    description: 'RESTful architectures, asynchronous event loops, custom middleware, microservices.',
    highlightProjects: 'PulseMetrics, HyperGate, DataStream',
  },
  {
    id: 'api-security',
    name: 'REST APIs & Security',
    category: 'Backend',
    level: 'Advanced',
    yearsExp: '4 Years',
    description: 'JWT & OAuth 2.0 flows, rate limiting, CORS configuration, input sanitization, OpenAPI.',
    highlightProjects: 'HyperGate, DataStream',
  },
  {
    id: 'websockets',
    name: 'WebSockets & Real-Time Sync',
    category: 'Backend',
    level: 'Advanced',
    yearsExp: '3 Years',
    description: 'Bi-directional state streaming, heartbeat ping-pong, room management, connection resilience.',
    highlightProjects: 'PulseMetrics, NexusFlow',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL & SQL Optimization',
    category: 'Databases',
    level: 'Advanced',
    yearsExp: '3+ Years',
    description: 'Relational schema design, ACID transactions, complex joins, indexing, query execution planning.',
    highlightProjects: 'PulseMetrics, HyperGate',
  },
  {
    id: 'mongodb',
    name: 'MongoDB & Mongoose',
    category: 'Databases',
    level: 'Expert',
    yearsExp: '4 Years',
    description: 'Document modeling, aggregation pipelines, replica sets, schema validation, sharding basics.',
    highlightProjects: 'OmniCart, NexusFlow, DataStream',
  },
  {
    id: 'redis',
    name: 'Redis In-Memory Cache',
    category: 'Databases',
    level: 'Advanced',
    yearsExp: '3 Years',
    description: 'Sub-millisecond caching, rate-limiter counters, pub/sub queues, session storage.',
    highlightProjects: 'HyperGate, PulseMetrics, DataStream',
  },
  {
    id: 'docker',
    name: 'Docker & Containerization',
    category: 'DevOps & Tools',
    level: 'Proficient',
    yearsExp: '3 Years',
    description: 'Multi-stage Dockerfiles, Docker Compose service orchestration, environment consistency.',
    highlightProjects: 'PulseMetrics, HyperGate',
  },
  {
    id: 'git-cicd',
    name: 'Git, GitHub Actions & CI/CD',
    category: 'DevOps & Tools',
    level: 'Advanced',
    yearsExp: '4 Years',
    description: 'Automated test runners, linting pipelines, semantic versioning, continuous deployment.',
    highlightProjects: 'All Projects',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Senior Full Stack Engineer',
    company: 'TechScale Labs',
    period: '2024 — Present',
    location: 'Remote',
    type: 'Full-Time',
    summary: 'Lead full-stack engineering across cloud telemetry and web application pipelines, driving scalable architecture and performance optimizations.',
    achievements: [
      'Architected microservices transition from legacy monolith using Node.js and TypeScript, reducing deployment cycle times by 65%.',
      'Engineered an event-driven Redis caching layer that dropped critical PostgreSQL query latency from 180ms to under 24ms.',
      'Designed responsive Next.js frontend portals with strict accessibility standards and zero layout shifts.',
      'Supervised code reviews and established automated CI/CD quality gates across a distributed team of 8 engineers.',
    ],
    technologies: ['React 19', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    id: 'exp-2',
    role: 'Full Stack Developer',
    company: 'InnovateX Solutions',
    period: '2022 — 2024',
    location: 'Hybrid',
    type: 'Full-Time',
    summary: 'Built production web products for fast-growing startup clients, owning both backend APIs and responsive user interfaces.',
    achievements: [
      'Delivered 8+ MERN stack client applications from initial discovery to live production deployment with 99.9% uptime.',
      'Implemented robust JWT authentication with refresh token rotation and granular role-based permissions.',
      'Developed real-time messaging and collaborative board features using WebSockets and optimized MongoDB aggregation queries.',
      'Optimized client bundle sizes by 38% using dynamic code splitting and modern image compression strategies.',
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'WebSockets', 'Jest'],
  },
  {
    id: 'exp-3',
    role: 'Frontend & API Developer',
    company: 'DigitalCraft Studio',
    period: '2021 — 2022',
    location: 'Remote',
    type: 'Full-Time',
    summary: 'Developed modern web applications and robust REST APIs, collaborating closely with UI/UX designers and product managers.',
    achievements: [
      'Constructed pixel-perfect, mobile-first responsive web apps matching complex Figma design systems.',
      'Engineered clean RESTful API endpoints in Express.js with comprehensive payload validation and automated unit testing.',
      'Achieved 95+ Google Lighthouse scores across all client web properties for performance and SEO.',
    ],
    technologies: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'REST APIs', 'Git'],
  },
];
