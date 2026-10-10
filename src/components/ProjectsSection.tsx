import React, { useRef, useEffect, useState } from 'react';
import {
  Navigation,
  Camera,
  ScanFace,
  BellRing,
  Car,
  FileText,
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ProjectsSectionProps {
  onOpenContact?: () => void;
}

interface ProjectSkill {
  id: string; // tandpfun/skill-icons ID (e.g. 'react', 'ts', 'nodejs')
  name: string; // Technology display label
}

interface ProjectData {
  id: string;
  step: string;
  watermark: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  features: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    text: string;
  }[];
  skills: ProjectSkill[];
  accentColor: {
    badge: string;
    text: string;
  };
}

const PROJECTS: ProjectData[] = [
  {
    id: 'manchitra',
    step: '01',
    watermark: 'MANCHITRA',
    category: 'Geospatial AI & Live Festival Navigation',
    title: 'Manchitra (মানচিত্র) — Durga Puja Live Navigation & Route Guide',
    tagline: 'Turn-by-turn Pandal route planner with live crowd heatmaps & barricade bypassing',
    description:
      'An intelligent festival navigation system built for Kolkata Durga Puja. When users ask or enter where they need to go from their location ("kothatheke kothay jete hobe"), Manchitra instantly computes the complete routed map with live turn-by-turn navigation—routing pedestrians safely through festival alleys while steering clear of police barricades and heavy crowd congestion.',
    features: [
      {
        icon: Navigation,
        title: 'Live Turn-by-Turn Navigation',
        text: 'Full point-to-point routed map providing real-time audio and visual directions to pandal gates.',
      },
      {
        icon: CheckCircle2,
        title: 'Dynamic Barricade & One-Way Detours',
        text: 'Automatically factors in Kolkata Police festival route restrictions and pedestrian corridors.',
      },
      {
        icon: Activity,
        title: 'Live Crowd Density & Queue Estimates',
        text: 'Real-time crowd heatmaps displaying waiting times and nearest transit/metro exits.',
      },
    ],
    skills: [
      { id: 'react', name: 'React 19' },
      { id: 'ts', name: 'TypeScript' },
      { id: 'nodejs', name: 'Node.js' },
      { id: 'tailwind', name: 'Tailwind CSS' },
      { id: 'postgres', name: 'PostgreSQL / PostGIS' },
      { id: 'express', name: 'Express.js API' },
      { id: 'docker', name: 'Docker' },
      { id: 'git', name: 'Git' },
    ],
    accentColor: {
      badge: 'text-amber-600 dark:text-amber-400',
      text: 'text-amber-500',
    },
  },
  {
    id: 'surveillance',
    step: '02',
    watermark: 'SURVEILLANCE',
    category: 'Computer Vision & Public Safety AI',
    title: 'Smart Surveillance & Suspect Identification System',
    tagline: 'Real-time CCTV biometric facial recognition & automated missing person alert dispatch',
    description:
      'An advanced AI-driven surveillance platform that analyzes live CCTV camera feeds in real time to locate missing persons or wanted suspects. Utilizing high-precision biometric full-face identification, the system scans through dense crowds, matches faces against target registries in under 50 milliseconds, and automatically transmits instant alert dispatches with camera coordinates to patrol teams.',
    features: [
      {
        icon: ScanFace,
        title: 'Full Facial Identification',
        text: 'Deep neural biometric face recognition extracting facial landmarks even under partial occlusion.',
      },
      {
        icon: Camera,
        title: 'Real-Time CCTV Stream Ingestion',
        text: 'Continuous processing of 60 FPS RTSP multi-camera feeds with sub-second facial detection latency.',
      },
      {
        icon: BellRing,
        title: 'Automated Emergency Alert Dispatch',
        text: 'Instantly sends automated WebSocket notifications, SMS, and alerts to nearby security units.',
      },
    ],
    skills: [
      { id: 'py', name: 'Python' },
      { id: 'fastapi', name: 'FastAPI' },
      { id: 'opencv', name: 'OpenCV' },
      { id: 'pytorch', name: 'PyTorch / YOLO' },
      { id: 'redis', name: 'Redis Pub/Sub' },
      { id: 'postgres', name: 'pgvector / Postgres' },
      { id: 'docker', name: 'Docker' },
      { id: 'linux', name: 'Linux RTSP' },
    ],
    accentColor: {
      badge: 'text-emerald-600 dark:text-emerald-400',
      text: 'text-emerald-500',
    },
  },
  {
    id: 'traffic',
    step: '03',
    watermark: 'SMART TRAFFIC',
    category: 'Intelligent Transportation & IoT Enforcement',
    title: 'Smart Traffic & Automated E-Challan System',
    tagline: 'ANPR vehicle plate scanning, instant document compliance audit & dynamic signal timing',
    description:
      'An end-to-end intelligent traffic monitoring and automated enforcement engine. Using high-speed Automatic Number Plate Recognition (ANPR), it detects vehicle registration numbers (cars, motorbikes, commercial vehicles) in real time and automatically audits transport databases to verify whether Pollution (PUC), insurance, or registration validity has expired. If non-compliant, it automatically issues an official e-challan in the vehicle owner\'s name, while continuously maintaining traffic flow by dynamically adjusting traffic signal light timings.',
    features: [
      {
        icon: Car,
        title: 'Real-Time ANPR Plate Scanner',
        text: 'High-speed OCR capturing license plates of moving cars and bikes across active junction lanes.',
      },
      {
        icon: FileText,
        title: 'Automatic Expiry Check & E-Challan Issuance',
        text: 'Instantly audits Pollution (PUC), Insurance, and Fitness; automatically issues digital penalty challans.',
      },
      {
        icon: Zap,
        title: 'Adaptive Traffic Signal Management',
        text: 'Dynamically optimizes green signal durations according to lane congestion to prevent bottlenecks.',
      },
    ],
    skills: [
      { id: 'nextjs', name: 'Next.js 15' },
      { id: 'py', name: 'Python' },
      { id: 'nodejs', name: 'Node.js' },
      { id: 'tensorflow', name: 'TensorFlow / TensorRT' },
      { id: 'postgres', name: 'PostgreSQL' },
      { id: 'kafka', name: 'Apache Kafka' },
      { id: 'tailwind', name: 'Tailwind CSS' },
      { id: 'docker', name: 'Docker' },
    ],
    accentColor: {
      badge: 'text-blue-600 dark:text-blue-400',
      text: 'text-blue-500',
    },
  },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenContact }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSkillByProject, setActiveSkillByProject] = useState<{ [projectId: string]: string }>({});

  // Wheel intercept: when scrolling vertically inside the projects track,
  // scroll horizontally from left to right instead of moving the entire page down!
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const canScrollLeft = container.scrollLeft > 5;
        const canScrollRight = container.scrollLeft < container.scrollWidth - container.clientWidth - 5;

        // If we can scroll within projects, intercept wheel and scroll horizontally
        if ((e.deltaY > 0 && canScrollRight) || (e.deltaY < 0 && canScrollLeft)) {
          e.preventDefault();
          container.scrollBy({ left: e.deltaY * 1.3, behavior: 'auto' });
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <section
      id="Projects"
      className="relative w-full py-16 xs:py-20 sm:py-24 md:py-28 overflow-hidden bg-white dark:bg-[#09090b] border-t border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-300"
    >
      {/* Edge Fade Gradients for smooth horizontal scroll entry/exit */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 xs:w-12 sm:w-24 bg-gradient-to-r from-white dark:from-[#09090b] to-transparent z-20" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 xs:w-12 sm:w-24 bg-gradient-to-l from-white dark:from-[#09090b] to-transparent z-20" />

      {/* NORMAL SECTION HEADER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <h2 className="font-['Outfit'] text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          Featured Projects
        </h2>
        <p className="mt-2 text-xs xs:text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl">
          Real-world systems engineered to solve large-scale civic, security, and festival mobility challenges.
        </p>
      </div>

      {/* HORIZONTAL CAROUSEL - BOX CHARA (NO BOX CONTAINER) */}
      <div
        ref={scrollContainerRef}
        className="relative w-full overflow-x-auto snap-x snap-mandatory flex items-stretch gap-8 xs:gap-12 sm:gap-16 lg:gap-20 px-4 sm:px-8 lg:px-12 py-3 sm:py-4 scrollbar-none scroll-smooth select-none"
      >
        {PROJECTS.map((project, idx) => {
          return (
            <div
              key={project.id}
              className="relative w-[90vw] xs:w-[86vw] sm:w-[80vw] md:w-[760px] lg:w-[880px] max-w-4xl shrink-0 snap-center p-2 xs:p-3 sm:p-6 flex flex-col justify-between overflow-hidden"
            >
              {/* GIANT BACKGROUND WATERMARK WITH PROJECT NAME */}
              <div
                aria-hidden="true"
                className="absolute -top-3 sm:-top-6 -right-2 sm:-right-6 font-['Outfit'] font-black text-6xl xs:text-7xl sm:text-8xl md:text-9xl text-slate-950/[0.04] dark:text-white/[0.04] select-none pointer-events-none tracking-tighter uppercase z-0 leading-none"
              >
                {project.watermark}
              </div>

              {/* PROJECT CONTENT - CLEAN, OPEN, UNBOXED */}
              <div className="relative z-10">
                {/* Category & Step Badge */}
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] xs:text-xs font-mono font-bold ${project.accentColor.badge}`}>
                      {project.step} //
                    </span>
                    <span className="text-[9px] xs:text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                      {project.category}
                    </span>
                  </div>
                  <span className="text-[9px] xs:text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                    {idx + 1} OF {PROJECTS.length}
                  </span>
                </div>

                {/* Project Title & Tagline */}
                <h3 className="font-['Outfit'] text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-snug sm:leading-tight">
                  {project.title}
                </h3>
                <p className={`text-[11px] xs:text-xs sm:text-sm font-medium mt-1 sm:mt-1.5 ${project.accentColor.badge}`}>
                  {project.tagline}
                </p>

                {/* Detailed Description */}
                <p className="text-xs xs:text-sm sm:text-base text-zinc-600 dark:text-zinc-300 mt-3 sm:mt-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Core Highlights */}
                <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                  {project.features.map((feature, fIdx) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={fIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300"
                      >
                        <Icon className={`w-4 h-4 ${project.accentColor.text} shrink-0 mt-0.5`} />
                        <span>
                          <strong className="text-slate-900 dark:text-white font-semibold">
                            {feature.title}:
                          </strong>{' '}
                          {feature.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Footer: Tech Stack with tandpfun/skill-icons & CTA */}
              <div className="relative z-10 mt-6 sm:mt-8 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col gap-2 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] sm:text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500">
                      Technologies:
                    </span>
                    {activeSkillByProject[project.id] ? (
                      <span className="text-[10px] sm:text-xs font-mono font-semibold text-slate-900 dark:text-white px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/60 transition-all">
                        {activeSkillByProject[project.id]}
                      </span>
                    ) : (
                      <span className="text-[9px] xs:text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                        (tap/hover icon for details)
                      </span>
                    )}
                  </div>

                  {/* Interactive Skill Icons from https://github.com/tandpfun/skill-icons */}
                  <div className="flex flex-wrap items-center gap-1.5 xs:gap-2 sm:gap-2.5">
                    {project.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="group relative"
                        onMouseEnter={() =>
                          setActiveSkillByProject((prev) => ({ ...prev, [project.id]: skill.name }))
                        }
                        onMouseLeave={() =>
                          setActiveSkillByProject((prev) => {
                            const updated = { ...prev };
                            delete updated[project.id];
                            return updated;
                          })
                        }
                        onClick={() =>
                          setActiveSkillByProject((prev) => ({
                            ...prev,
                            [project.id]: prev[project.id] === skill.name ? '' : skill.name,
                          }))
                        }
                      >
                        <img
                          src={`https://skillicons.dev/icons?i=${skill.id}`}
                          alt={skill.name}
                          title={skill.name}
                          className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-xl hover:scale-115 active:scale-95 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md select-none"
                          loading="lazy"
                        />
                        {/* Desktop Hover Floating Tooltip */}
                        <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-150 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-[10px] font-mono font-semibold px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-30">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenContact}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-slate-950 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-95 transition-all cursor-pointer shadow-sm shrink-0 self-start sm:self-auto"
                >
                  <span>Contact for Demo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* SECTION FOOTER: CENTERED VIEW MORE PROJECTS BUTTON */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14 flex items-center justify-center">
        <a
          href={PERSONAL_INFO.github ? `${PERSONAL_INFO.github}?tab=repositories` : 'https://github.com/dbaidya811'}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-slate-950 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-95 transition-all cursor-pointer shadow-md hover:shadow-lg"
        >
          <span>View More Projects</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
};
