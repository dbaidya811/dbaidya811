import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'exp-1': true, // First one open by default
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="experience" className="py-20 md:py-28 border-t border-white/10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center md:text-left mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 block font-mono">
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Work Experience & Milestones
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
            Track record of shipping production-scale software, collaborating in agile engineering teams, and optimizing web architectures.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative border-l-2 border-emerald-500/20 ml-3 sm:ml-6 space-y-10">
          {EXPERIENCES.map((exp) => {
            const isExpanded = !!expandedIds[exp.id];

            return (
              <div key={exp.id} className="relative pl-6 sm:pl-8 group">
                {/* Timeline Node Marker */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#080d17] border-2 border-emerald-400 group-hover:scale-125 transition-transform" />

                {/* Experience Card */}
                <div className="p-6 sm:p-7 rounded-2xl bg-[#0b101c] border border-white/10 hover:border-emerald-500/30 transition-all">
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-semibold text-emerald-400">
                        {exp.company}
                      </div>
                    </div>

                    {/* Clean Unboxed Metadata */}
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {exp.period}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {exp.summary}
                  </p>

                  {/* Expand / Collapse Button for Measurable Achievements */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(exp.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors py-1"
                  >
                    <span>{isExpanded ? 'Hide Key Impact' : 'Show Measurable Impact'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {/* Expandable Achievements Area */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-2.5 animate-in fade-in duration-150">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                        Key Engineering Contributions:
                      </span>
                      {exp.achievements.map((ach, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}

                      {/* Tech stack row */}
                      <div className="pt-3 flex flex-wrap gap-1 text-[11px] font-mono text-slate-400">
                        <span className="text-slate-500">Tech:</span>
                        {exp.technologies.map((t, idx) => (
                          <React.Fragment key={t}>
                            <span className="text-emerald-300">{t}</span>
                            {idx < exp.technologies.length - 1 && <span className="text-slate-600">·</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
