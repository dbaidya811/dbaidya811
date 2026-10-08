import React, { useEffect } from 'react';
import { X, Printer, Download, CheckCircle2, Mail, MapPin, Globe } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, SKILLS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c1220] border border-emerald-500/30 rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#090e1a] border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-mono font-semibold text-slate-300">
              Curriculum Vitae — {PERSONAL_INFO.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close CV Modal"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 text-slate-300 font-sans print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-white/10 pb-6 print:border-black/20">
            <h2 id="resume-title" className="text-3xl font-bold text-white print:text-black mb-1">
              {PERSONAL_INFO.name}
            </h2>
            <div className="text-base font-semibold text-emerald-400 print:text-emerald-700 mb-3">
              {PERSONAL_INFO.title} · {PERSONAL_INFO.focus}
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-slate-400 print:text-gray-700 font-mono">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                {PERSONAL_INFO.email}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {PERSONAL_INFO.location}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                github.com/deepbaidya
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-800 mb-2 font-mono">
              Professional Summary
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 print:text-gray-800 leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Core Technical Proficiencies */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-800 mb-3 font-mono">
              Technical Proficiencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#090d18] border border-white/5 print:bg-gray-50 print:border-gray-200">
                <span className="font-semibold text-white print:text-black block mb-1">Frontend Engineering:</span>
                <span className="text-slate-400 print:text-gray-700">React 19, Next.js 15, TypeScript, Tailwind CSS, Zustand, Redux Toolkit, Web Workers</span>
              </div>
              <div className="p-3 rounded-lg bg-[#090d18] border border-white/5 print:bg-gray-50 print:border-gray-200">
                <span className="font-semibold text-white print:text-black block mb-1">Backend & Systems:</span>
                <span className="text-slate-400 print:text-gray-700">Node.js, Express.js, RESTful APIs, WebSockets, JWT/OAuth, Microservices Architecture</span>
              </div>
              <div className="p-3 rounded-lg bg-[#090d18] border border-white/5 print:bg-gray-50 print:border-gray-200">
                <span className="font-semibold text-white print:text-black block mb-1">Databases & Storage:</span>
                <span className="text-slate-400 print:text-gray-700">PostgreSQL, MongoDB, Mongoose, TimescaleDB, Redis Caching, Query Optimization</span>
              </div>
              <div className="p-3 rounded-lg bg-[#090d18] border border-white/5 print:bg-gray-50 print:border-gray-200">
                <span className="font-semibold text-white print:text-black block mb-1">DevOps & Cloud Tooling:</span>
                <span className="text-slate-400 print:text-gray-700">Docker, Docker Compose, Git, GitHub Actions, CI/CD Pipelines, Linux Shell</span>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-800 mb-4 font-mono">
              Professional Experience
            </h3>
            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white print:text-black text-sm">{exp.role}</span>
                      <span className="text-emerald-400 print:text-emerald-700 font-semibold ml-2">— {exp.company}</span>
                    </div>
                    <span className="text-slate-400 print:text-gray-600 font-mono mt-0.5 sm:mt-0">{exp.period}</span>
                  </div>

                  <p className="text-xs text-slate-400 print:text-gray-700">{exp.summary}</p>

                  <ul className="space-y-1.5 pl-3 border-l border-emerald-500/30 text-xs">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="text-slate-300 print:text-gray-800">
                        • {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-800 mb-2 font-mono">
              Education & Certifications
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-white print:text-black">B.Sc. in Computer Science & Engineering</span>
                <span className="text-slate-400 print:text-gray-600 block sm:inline sm:ml-2">Major in Software Engineering & Database Systems</span>
              </div>
              <span className="text-slate-400 print:text-gray-600 font-mono">Graduated with Honors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
