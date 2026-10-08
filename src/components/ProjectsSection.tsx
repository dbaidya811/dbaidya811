import React, { useState } from 'react';
import { ExternalLink, Github, Layers, ArrowUpRight, Activity, ShoppingBag, Users, ShieldCheck, Code, Workflow } from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Full Stack', 'Next.js / React', 'APIs & Backend'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  // Render bespoke aesthetic vector illustration for each project type
  const renderProjectVisual = (iconType: Project['iconType']) => {
    switch (iconType) {
      case 'analytics':
        return (
          <div className="w-full h-44 bg-[#070b14] relative flex items-center justify-center overflow-hidden border-b border-white/10 group-hover:border-emerald-500/30 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-teal-500/5" />
            {/* Vector Telemetry Grid */}
            <svg className="w-full h-full px-6 py-4 opacity-80" viewBox="0 0 300 120" fill="none">
              <path d="M10 80 Q 40 40 70 70 T 130 50 T 190 85 T 250 30 T 290 60" stroke="#10b981" strokeWidth="2.5" fill="none" />
              <path d="M10 80 Q 40 40 70 70 T 130 50 T 190 85 T 250 30 T 290 60 L 290 120 L 10 120 Z" fill="url(#emerald-gradient)" opacity="0.2" />
              <circle cx="130" cy="50" r="4" fill="#34d399" className="animate-pulse" />
              <circle cx="250" cy="30" r="4" fill="#10b981" />
              <defs>
                <linearGradient id="emerald-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0b101c]/90 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
              <Activity className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
              <span>12k evt/s</span>
            </div>
          </div>
        );
      case 'ecommerce':
        return (
          <div className="w-full h-44 bg-[#070b14] relative flex items-center justify-center overflow-hidden border-b border-white/10 group-hover:border-emerald-500/30 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-emerald-500/5" />
            <div className="w-4/5 h-28 rounded-lg bg-[#0b1220] border border-white/10 p-3 shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  <span className="text-[11px] font-medium text-slate-300">OmniStore Checkout</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">SSR 1.1s</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-10 rounded bg-white/5 border border-white/5" />
                <div className="h-10 rounded bg-white/5 border border-white/5" />
                <div className="h-10 rounded bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[10px] font-mono text-emerald-300">
                  Cart (3)
                </div>
              </div>
            </div>
          </div>
        );
      case 'collab':
        return (
          <div className="w-full h-44 bg-[#070b14] relative flex items-center justify-center overflow-hidden border-b border-white/10 group-hover:border-emerald-500/30 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 via-transparent to-emerald-500/5" />
            <div className="w-5/6 h-28 rounded-lg bg-[#0c1424] border border-white/10 p-3 shadow-lg flex flex-col justify-between font-mono text-[11px]">
              <div className="flex items-center justify-between text-slate-400 border-b border-white/5 pb-1.5">
                <span>doc_sync.md</span>
                <span className="flex items-center gap-1 text-[10px] text-teal-400">
                  <Users className="w-3 h-3" /> 4 online
                </span>
              </div>
              <div className="space-y-1 text-slate-300 text-[10px]">
                <div className="flex items-center gap-1">
                  <span className="text-emerald-400 font-bold"># Architecture</span>
                  <span className="inline-block w-1.5 h-3 bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-slate-400">Operational Transformation v2.1 active</div>
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="w-full h-44 bg-[#070b14] relative flex items-center justify-center overflow-hidden border-b border-white/10 group-hover:border-emerald-500/30 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/10 via-transparent to-mint-500/5" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-mono text-emerald-300">RS256 JWT Signed</div>
                <div className="text-[10px] font-mono text-slate-400">Rate Limit: 100 req/s</div>
                <div className="text-[10px] font-mono text-emerald-400">Proxy Overhead: 12ms</div>
              </div>
            </div>
          </div>
        );
      case 'code':
        return (
          <div className="w-full h-44 bg-[#070b14] relative flex items-center justify-center overflow-hidden border-b border-white/10 group-hover:border-emerald-500/30 transition-colors">
            <div className="w-5/6 h-28 rounded-lg bg-[#0b101c] border border-white/10 p-3 shadow-lg flex flex-col justify-between font-mono text-[10px]">
              <div className="flex items-center justify-between text-slate-400 border-b border-white/5 pb-1">
                <span className="text-emerald-400">ComponentPreview.tsx</span>
                <span className="text-slate-500">Live JSX</span>
              </div>
              <div className="text-slate-300 space-y-0.5">
                <div><span className="text-purple-400">const</span> Button = () =&gt; (</div>
                <div className="pl-3 text-emerald-300">&lt;button className="glow"&gt;Run&lt;/button&gt;</div>
                <div>);</div>
              </div>
            </div>
          </div>
        );
      case 'pipeline':
        return (
          <div className="w-full h-44 bg-[#070b14] relative flex items-center justify-center overflow-hidden border-b border-white/10 group-hover:border-emerald-500/30 transition-colors">
            <div className="w-5/6 flex items-center justify-between px-2">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-[10px] font-mono text-center">
                Webhook
                <div className="text-emerald-400 mt-0.5">Ingest</div>
              </div>
              <div className="w-8 h-0.5 bg-emerald-500/50" />
              <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono text-center">
                BullMQ
                <div className="text-emerald-400 mt-0.5">Worker</div>
              </div>
              <div className="w-8 h-0.5 bg-emerald-500/50" />
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-[10px] font-mono text-center">
                Endpoint
                <div className="text-emerald-400 mt-0.5">200 OK</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 block font-mono">
              Selected Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Full-Stack Projects
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              Production web applications and distributed architectures engineered with the MERN stack, Next.js, and TypeScript.
            </p>
          </div>

          {/* Interactive Category Filter Segmented Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0b101c] border border-white/10 rounded-xl overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-emerald-400 text-slate-950 font-semibold shadow-sm shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-[#0b101c] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:shadow-emerald-950/20"
            >
              {/* Visual Showcase Banner */}
              {renderProjectVisual(project.iconType)}

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category & Status Indicator */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
                    <span className="text-emerald-400 font-medium">{project.category}</span>
                    <span className="text-slate-500 text-[11px] font-mono">Validated</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors mb-1.5">
                    {project.title}
                  </h3>

                  {/* Tagline / Summary */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {project.tagline}
                  </p>

                  {/* Clean Unboxed Metadata with · (Zero-Pill Discipline) */}
                  <div className="text-[11px] text-slate-400 mb-4 font-mono leading-relaxed">
                    <span>{project.metrics}</span>
                  </div>

                  {/* Tech stack items with typographic separators */}
                  <div className="flex flex-wrap gap-1 text-[11px] font-mono text-slate-400 mb-5">
                    {project.tech.slice(0, 4).map((t, idx) => (
                      <React.Fragment key={t}>
                        <span className="text-slate-300">{t}</span>
                        {idx < Math.min(project.tech.length, 4) - 1 && (
                          <span className="text-slate-600">·</span>
                        )}
                      </React.Fragment>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-emerald-400 font-semibold">+{project.tech.length - 4} more</span>
                    )}
                  </div>
                </div>

                {/* Interactive Card Action Triggers */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors py-1"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Inspect Architecture</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} GitHub repository`}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} Live Demo`}
                      className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
