import React, { useState } from 'react';
import { Terminal, Shield, Zap, RefreshCw, CheckCircle2, GitBranch } from 'lucide-react';
import { SKILLS, SkillItem } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'Databases', 'DevOps & Tools'];

  const filteredSkills = activeCategory === 'All'
    ? SKILLS
    : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-20 md:py-28 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 block font-mono">
              Technical Competence
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Full-Stack Skills & Tooling
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              Specialized tools, frameworks, and database engines leveraged in production environments.
            </p>
          </div>

          {/* Category Filter Tabs */}
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

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-5 rounded-2xl bg-[#0b101c] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with Title and Years of Experience (Unboxed) */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-white">
                    {skill.name}
                  </h3>
                  <span className="text-xs font-mono text-emerald-400 tabular-nums">
                    {skill.yearsExp}
                  </span>
                </div>

                {/* Practical Description */}
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {skill.description}
                </p>
              </div>

              {/* Clean Unboxed Metadata Strip (Zero-Pill Discipline) */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>{skill.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400 truncate max-w-[170px]" title={skill.highlightProjects}>
                  Used in: {skill.highlightProjects}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Engineering Philosophy Cards (Human Editorial Insight) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#080d17] border border-emerald-500/25">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <span>Core Engineering Principles & Best Practices</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs sm:text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Strict Type Safety</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-xs">
                Zero `any` escape hatches. End-to-end typed contract boundaries between frontend components and backend REST controllers.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Performance First</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-xs">
                Sub-second initial page loads, database index tuning, query deduplication, and minimal JavaScript bundle payloads.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <RefreshCw className="w-4 h-4 text-emerald-400" />
                <span>Resilient Fault Tolerance</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-xs">
                Idempotent APIs, exponential backoff retries, graceful service degradation, and defensive error boundaries.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <GitBranch className="w-4 h-4 text-emerald-400" />
                <span>Clean Code Discipline</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-xs">
                Modular component composition, single responsibility architecture, and thorough automated integration testing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
