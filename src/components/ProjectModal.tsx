import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Layers, Database, Cpu, Server, CheckCircle2, AlertCircle } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Pure black backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Window */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative w-full max-w-2xl max-h-[88vh] bg-black border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-950 border-b border-zinc-900">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-emerald-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-full">
              {project.category}
            </span>
            <span className="text-xs text-zinc-400 font-mono">Architecture Details</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors border border-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-7 space-y-6 bg-black">
          {/* Title & Tagline */}
          <div>
            <h2 id="project-modal-title" className="text-2xl font-bold text-white mb-1.5">
              {project.title}
            </h2>
            <p className="text-sm text-emerald-400 font-medium mb-3">
              {project.tagline}
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Scale Metrics Bar */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Production Benchmark:</span>
            </div>
            <span className="font-mono text-zinc-300">
              {project.metrics}
            </span>
          </div>

          {/* Architecture Breakdown */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>System Tiers</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="flex items-center gap-1.5 text-zinc-200 font-semibold mb-1">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Frontend Client</span>
                </div>
                <p className="text-zinc-400 leading-relaxed font-mono text-[11px]">
                  {project.architecture.frontend}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="flex items-center gap-1.5 text-zinc-200 font-semibold mb-1">
                  <Server className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Backend & API</span>
                </div>
                <p className="text-zinc-400 leading-relaxed font-mono text-[11px]">
                  {project.architecture.backend}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="flex items-center gap-1.5 text-zinc-200 font-semibold mb-1">
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Data Persistence</span>
                </div>
                <p className="text-zinc-400 leading-relaxed font-mono text-[11px]">
                  {project.architecture.database}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="flex items-center gap-1.5 text-zinc-200 font-semibold mb-1">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Cache & Infrastructure</span>
                </div>
                <p className="text-zinc-400 leading-relaxed font-mono text-[11px]">
                  {project.architecture.cachingDevOps}
                </p>
              </div>
            </div>
          </div>

          {/* Key Capabilities */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
              Core Capabilities
            </h3>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400">▹</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Challenge */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1.5 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Key Challenge Solved</span>
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {project.challengesSolved}
            </p>
          </div>

          {/* Tech stack */}
          <div>
            <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold block mb-1.5">
              Technologies
            </span>
            <div className="flex flex-wrap gap-2 text-xs text-zinc-400 font-mono">
              {project.tech.map((t, index) => (
                <React.Fragment key={t}>
                  <span className="text-white">{t}</span>
                  {index < project.tech.length - 1 && <span className="text-zinc-600">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-zinc-950 border-t border-zinc-900 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Code</span>
            </a>

            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-black bg-white hover:bg-zinc-200 transition-colors"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs text-zinc-400 hover:text-white transition-colors"
          >
            Close (Esc)
          </button>
        </div>
      </div>
    </div>
  );
};
