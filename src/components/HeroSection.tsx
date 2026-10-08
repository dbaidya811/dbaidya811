import React from 'react';
import { ArrowDown, Github, Linkedin, Mail, ExternalLink, Terminal, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume, onOpenContact }) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[400px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-teal-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & Content (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium mb-6 backdrop-blur-sm shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Full-Time Roles & Contracts</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-6 text-balance">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">{PERSONAL_INFO.name}</span>.
              <br />
              <span className="text-slate-200 text-3xl sm:text-4xl md:text-5xl font-semibold">
                Full Stack Developer.
              </span>
            </h1>

            {/* Subtitle / Bio */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mb-8">
              Specialized in the <strong className="text-emerald-300 font-semibold">MERN & Next.js ecosystem</strong>. I design and build production-grade web systems, high-throughput backend APIs, and responsive, accessible user interfaces.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 active:scale-95 transition-all"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Contact Deep</span>
              </button>

              <button
                type="button"
                onClick={onOpenResume}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Quick CV</span>
              </button>
            </div>

            {/* Social & Contact Strip */}
            <div className="flex items-center gap-5 pt-6 border-t border-white/10 w-full max-w-xl text-slate-400 text-xs">
              <span className="text-slate-500 font-medium">Connect:</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-700">·</span>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-700">·</span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Code & Architecture Visual Anchor (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Surrounding Glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-700/20 blur-xl opacity-60" />

              {/* Terminal / Code Card */}
              <div className="relative rounded-2xl bg-[#0b101c] border border-emerald-500/25 shadow-2xl overflow-hidden backdrop-blur-md">
                {/* Window Top Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#080d17] border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-slate-400 ml-2">deep-baidya.config.ts</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400/90">
                    <Sparkles className="w-3 h-3" />
                    <span>TypeScript 5.8</span>
                  </div>
                </div>

                {/* Code Content */}
                <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-300">
                  <div className="text-slate-500">// Full-Stack Architecture Profile</div>
                  <div className="mt-1">
                    <span className="text-purple-400">export const</span>{' '}
                    <span className="text-emerald-400">developer</span> = &#123;
                  </div>
                  <div className="pl-4 mt-1">
                    <span className="text-slate-400">name:</span>{' '}
                    <span className="text-amber-300">'{PERSONAL_INFO.name}'</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">role:</span>{' '}
                    <span className="text-amber-300">'{PERSONAL_INFO.title}'</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">primaryStack:</span> [
                  </div>
                  <div className="pl-8 text-teal-300">
                    'React 19', 'Next.js 15', 'Node.js',
                  </div>
                  <div className="pl-8 text-teal-300">
                    'TypeScript', 'PostgreSQL', 'MongoDB'
                  </div>
                  <div className="pl-4">],</div>
                  <div className="pl-4">
                    <span className="text-slate-400">architectureStyle:</span>{' '}
                    <span className="text-amber-300">'Clean / Modular / Scalable'</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">testCoverage:</span>{' '}
                    <span className="text-emerald-400">true</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">status:</span>{' '}
                    <span className="text-emerald-300">'Ready to Deploy 🚀'</span>
                  </div>
                  <div className="mt-1">&#125;;</div>

                  {/* Terminal Execution Output Banner */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Pipeline Passing</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px] tabular-nums">0 errors · 0 warnings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quantifiable Metrics Strip */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {PERSONAL_INFO.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white text-emerald-400 tabular-nums">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
