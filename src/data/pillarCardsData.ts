import React from 'react';
import { Code2, Layers, Cpu, Database, Cloud } from 'lucide-react';

export interface PillarCard {
  id: number;
  pillar: string;
  badge: string;
  tagline: string;
  title: string;
  description: string;
  icon: React.ElementType;
  accent: {
    color: string;
    text: string;
    border: string;
    ring: string;
    glow: string;
    badgeBg: string;
    lineGradient: string;
    highlight: string;
  };
  metrics: Array<{ label: string; val: string; color: string }>;
  tags: string[];
}

export const PILLAR_CARDS: PillarCard[] = [
  {
    id: 0,
    pillar: '01',
    badge: 'Frontend',
    tagline: 'Frontend Architecture',
    title: 'React 19 & Next.js 15',
    description: 'Server Components, streaming SSR, App Router, low-latency UI pipelines, and sub-second LCP score.',
    icon: Code2,
    accent: {
      color: 'sky',
      text: 'text-sky-400',
      border: 'border-sky-500/80',
      ring: 'ring-sky-500/50',
      glow: 'shadow-sky-950/70',
      badgeBg: 'bg-sky-500/10 border-sky-500/30 text-sky-300',
      lineGradient: 'via-sky-400/90',
      highlight: 'text-sky-300',
    },
    metrics: [
      { label: 'Lighthouse', val: '100 / 100', color: 'text-sky-300' },
      { label: 'Core Vitals', val: '<0.8s LCP', color: 'text-emerald-400' },
    ],
    tags: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind'],
  },
  {
    id: 1,
    pillar: '02',
    badge: 'Backend',
    tagline: 'Backend Microservices',
    title: 'Distributed Systems',
    description: 'High-throughput event-driven microservices engineered with Node.js, Kafka, Redis, and high-concurrency queues.',
    icon: Layers,
    accent: {
      color: 'indigo',
      text: 'text-indigo-400',
      border: 'border-indigo-500/80',
      ring: 'ring-indigo-500/50',
      glow: 'shadow-indigo-950/70',
      badgeBg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300',
      lineGradient: 'via-indigo-400/90',
      highlight: 'text-indigo-300',
    },
    metrics: [
      { label: 'Uptime SLA', val: '99.99%', color: 'text-white' },
      { label: 'P99 Latency', val: '<45ms', color: 'text-indigo-300' },
    ],
    tags: ['Node.js', 'Kafka', 'Redis', 'WebSockets'],
  },
  {
    id: 2,
    pillar: '03',
    badge: 'Core',
    tagline: 'Core Architecture',
    title: 'Full-Stack Enterprise',
    description: 'Scalable multi-tenant architectures connecting high-concurrency APIs with resilient database pipelines and interfaces.',
    icon: Cpu,
    accent: {
      color: 'cyan',
      text: 'text-cyan-400',
      border: 'border-cyan-400/90',
      ring: 'ring-cyan-400/60',
      glow: 'shadow-cyan-950/80',
      badgeBg: 'bg-cyan-500/15 border-cyan-400/50 text-cyan-300',
      lineGradient: 'via-cyan-400',
      highlight: 'text-cyan-300',
    },
    metrics: [
      { label: 'Throughput', val: '10M+ Req/Day', color: 'text-cyan-300' },
      { label: 'Resilience', val: 'Zero SPoF', color: 'text-emerald-400' },
    ],
    tags: ['MERN', 'Next.js', 'PostgreSQL', 'Microservices'],
  },
  {
    id: 3,
    pillar: '04',
    badge: 'Data',
    tagline: 'Data & Storage',
    title: 'High-Performance Data',
    description: 'Relational & document database modeling, connection pooling, indexing, and multi-region caching layers.',
    icon: Database,
    accent: {
      color: 'emerald',
      text: 'text-emerald-400',
      border: 'border-emerald-500/80',
      ring: 'ring-emerald-500/50',
      glow: 'shadow-emerald-950/70',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
      lineGradient: 'via-emerald-400/90',
      highlight: 'text-emerald-300',
    },
    metrics: [
      { label: 'Query Speed', val: '10x Optimized', color: 'text-emerald-300' },
      { label: 'Integrity', val: 'ACID Compliant', color: 'text-white' },
    ],
    tags: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'],
  },
  {
    id: 4,
    pillar: '05',
    badge: 'DevOps',
    tagline: 'Cloud & Infrastructure',
    title: 'Cloud Scale & DevOps',
    description: 'Containerized deployments on AWS & GCP, Docker orchestration, automated CI/CD, and zero-trust security.',
    icon: Cloud,
    accent: {
      color: 'purple',
      text: 'text-purple-400',
      border: 'border-purple-500/80',
      ring: 'ring-purple-500/50',
      glow: 'shadow-purple-950/70',
      badgeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
      lineGradient: 'via-purple-400/90',
      highlight: 'text-purple-300',
    },
    metrics: [
      { label: 'Deployments', val: 'Zero Downtime', color: 'text-purple-300' },
      { label: 'CI/CD Flow', val: 'Automated', color: 'text-white' },
    ],
    tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
  },
];
