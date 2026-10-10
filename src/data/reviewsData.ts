export interface WorkReview {
  id: string;
  author: string;
  role: string;
  company: string;
  avatarText: string;
  rating: number;
  date: string;
  project: string;
  review: string;
  accent: {
    border: string;
    glow: string;
    gradient: string;
    text: string;
    tagBg: string;
    line: string;
  };
}

export const WORK_REVIEWS: WorkReview[] = [
  {
    id: 'rev-1',
    author: 'Pooja Sharma',
    role: 'VP of Engineering',
    company: 'NexaScale Tech',
    avatarText: 'PS',
    rating: 5,
    date: 'February 2026',
    project: 'Next.js 15 Migration & SSR Optimization',
    review:
      'Deep overhauled our enterprise Next.js architecture and reduced cold-start API latencies by 65%. His rigor with TypeScript, server components, and clean system boundaries made our deployment pipeline completely bulletproof.',
    accent: {
      border: 'hover:border-emerald-500/50',
      glow: 'hover:shadow-emerald-500/15',
      gradient: 'from-emerald-500 to-teal-600',
      text: 'group-hover:text-emerald-600',
      tagBg: 'group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-200',
      line: 'via-emerald-500',
    },
  },
  {
    id: 'rev-2',
    author: 'Rohan Malhotra',
    role: 'Co-Founder & CTO',
    company: 'FinVenture Capital',
    avatarText: 'RM',
    rating: 5,
    date: 'January 2026',
    project: 'High-Throughput Fintech Trading Hub',
    review:
      'Rarely do you meet a full-stack engineer who understands both intricate PostgreSQL query optimizations and fluid frontend micro-interactions equally well. Deep delivered our fintech platform two weeks ahead of schedule.',
    accent: {
      border: 'hover:border-blue-500/50',
      glow: 'hover:shadow-blue-500/15',
      gradient: 'from-blue-600 to-indigo-600',
      text: 'group-hover:text-blue-600',
      tagBg: 'group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200',
      line: 'via-blue-500',
    },
  },
  {
    id: 'rev-3',
    author: 'Ananya Sen',
    role: 'Director of Product',
    company: 'CloudMesh Global',
    avatarText: 'AS',
    rating: 5,
    date: 'November 2025',
    project: 'Distributed Microservices Architecture',
    review:
      'Working with Deep was an absolute pleasure. He turned ambiguous product specs into scalable REST and WebSocket services with zero production regressions. His proactive communication saved us countless cycles.',
    accent: {
      border: 'hover:border-cyan-500/50',
      glow: 'hover:shadow-cyan-500/15',
      gradient: 'from-cyan-500 to-blue-600',
      text: 'group-hover:text-cyan-600',
      tagBg: 'group-hover:bg-cyan-50 group-hover:text-cyan-700 group-hover:border-cyan-200',
      line: 'via-cyan-400',
    },
  },
  {
    id: 'rev-4',
    author: 'Arjun Mehta',
    role: 'Lead Architect',
    company: 'DevPulse Systems',
    avatarText: 'AM',
    rating: 5,
    date: 'October 2025',
    project: 'Scalable MERN Monorepo Refactor',
    review:
      'Deep’s architectural hygiene and modular repository patterns slashed our team’s bug turnaround time in half. He brings senior-level engineering standards and deep empathy for end-user performance.',
    accent: {
      border: 'hover:border-purple-500/50',
      glow: 'hover:shadow-purple-500/15',
      gradient: 'from-purple-600 to-pink-600',
      text: 'group-hover:text-purple-600',
      tagBg: 'group-hover:bg-purple-50 group-hover:text-purple-700 group-hover:border-purple-200',
      line: 'via-purple-500',
    },
  },
  {
    id: 'rev-5',
    author: 'Rahul Banerjee',
    role: 'Engineering Manager',
    company: 'OmniCore Analytics',
    avatarText: 'RB',
    rating: 5,
    date: 'September 2025',
    project: 'Real-Time Streaming Metrics Dashboard',
    review:
      'Deep engineered our real-time telemetry console with React 19 and WebSockets. The dashboard renders 30,000 live metric events per minute without dropping a single animation frame. Brilliant execution.',
    accent: {
      border: 'hover:border-indigo-500/50',
      glow: 'hover:shadow-indigo-500/15',
      gradient: 'from-indigo-600 to-blue-600',
      text: 'group-hover:text-indigo-600',
      tagBg: 'group-hover:bg-indigo-50 group-hover:text-indigo-700 group-hover:border-indigo-200',
      line: 'via-indigo-500',
    },
  },
  {
    id: 'rev-6',
    author: 'Dr. Sunita Deshmukh',
    role: 'Head of Digital Health',
    company: 'MedSynapse Labs',
    avatarText: 'SD',
    rating: 5,
    date: 'July 2025',
    project: 'HIPAA-Compliant Patient Portal & RBAC',
    review:
      'Deep designed our HIPAA-ready healthcare portal with meticulous role-based access control and end-to-end encryption. His work passed rigorous third-party penetration audits on the very first try.',
    accent: {
      border: 'hover:border-teal-500/50',
      glow: 'hover:shadow-teal-500/15',
      gradient: 'from-teal-500 to-emerald-600',
      text: 'group-hover:text-teal-600',
      tagBg: 'group-hover:bg-teal-50 group-hover:text-teal-700 group-hover:border-teal-200',
      line: 'via-teal-400',
    },
  },
  {
    id: 'rev-7',
    author: 'Karthik Sundaram',
    role: 'Principal Engineer',
    company: 'DataGrid Labs',
    avatarText: 'KS',
    rating: 5,
    date: 'May 2025',
    project: 'Distributed Database Concurrency Fix',
    review:
      'Deep’s deep understanding of distributed transactions and Redis cache invalidation solved an elusive race condition that our core backend team had struggled with for weeks. Exceptionally talented engineer.',
    accent: {
      border: 'hover:border-amber-500/50',
      glow: 'hover:shadow-amber-500/15',
      gradient: 'from-amber-500 to-orange-600',
      text: 'group-hover:text-amber-600',
      tagBg: 'group-hover:bg-amber-50 group-hover:text-amber-700 group-hover:border-amber-200',
      line: 'via-amber-400',
    },
  },
  {
    id: 'rev-8',
    author: 'Meera Nambiar',
    role: 'Founder & CEO',
    company: 'Horizon Intelligent AI',
    avatarText: 'MN',
    rating: 5,
    date: 'March 2025',
    project: 'MVP to 100k DAU Platform Scaling',
    review:
      'Deep took our platform from a prototype to handling over 100,000 daily active users with seamless resilience. His full-stack capability and speed are remarkable. We consider him our go-to engineering partner.',
    accent: {
      border: 'hover:border-rose-500/50',
      glow: 'hover:shadow-rose-500/15',
      gradient: 'from-rose-500 to-pink-600',
      text: 'group-hover:text-rose-600',
      tagBg: 'group-hover:bg-rose-50 group-hover:text-rose-700 group-hover:border-rose-200',
      line: 'via-rose-400',
    },
  },
];
