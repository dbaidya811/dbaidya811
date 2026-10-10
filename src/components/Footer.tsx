import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Twitter, ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenContact?: () => void;
  onOpenLicense?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onOpenLicense }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'Contact') {
      if (onOpenContact) onOpenContact();
      else {
        const el = document.getElementById('Contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full overflow-hidden bg-zinc-50 dark:bg-[#07090e] border-t border-zinc-200/80 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
      {/* 1. GIANT WATERMARK BANNER ("LET'S GO") */}
      <div className="relative pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 px-4 select-none overflow-hidden flex flex-col items-center justify-center">
        {/* Giant Watermark Typography in Background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <span className="font-['Outfit'] font-black text-[18vw] sm:text-[19vw] md:text-[20vw] leading-none text-slate-950/[0.04] dark:text-white/[0.04] tracking-tighter uppercase select-none transform translate-y-1">
            LET’S GO
          </span>
        </div>

        {/* Foreground Content Over Watermark */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] font-mono font-medium mb-3">
            <Sparkles className="w-3 h-3" />
            <span>Turn Vision Into Scalable Reality</span>
          </div>

          <h3 className="font-['Outfit'] text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight max-w-2xl">
            Have a bold project in mind? Let’s make it happen.
          </h3>

          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('Contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else if (onOpenContact) onOpenContact();
              }}
              className="group inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold bg-slate-950 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-95 transition-all cursor-pointer shadow-lg hover:shadow-xl"
            >
              <span>LET’S GO — START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold bg-zinc-200/80 hover:bg-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-all cursor-pointer active:scale-95 border border-zinc-300/60 dark:border-zinc-800"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER NAV & SOCIALS BAR */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 border-t border-zinc-200/60 dark:border-zinc-800/60">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Role */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-9 h-9 rounded-full bg-slate-950 dark:bg-white text-white dark:text-black font-['Outfit'] font-black text-sm flex items-center justify-center shadow-sm">
              DB
            </div>
            <div>
              <span className="font-['Outfit'] font-extrabold text-sm text-slate-950 dark:text-white tracking-tight block">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 block">
                Full Stack Software Engineer · MERN & Next.js
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-medium text-zinc-700 dark:text-zinc-300">
            <button
              type="button"
              onClick={() => handleNavClick('Home')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('Capabilities')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Capabilities
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('Projects')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('Reviews')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Reviews
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('Contact')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Reach Out
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-xl bg-zinc-200/70 hover:bg-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white transition-all hover:scale-105 border border-zinc-300/40 dark:border-zinc-800"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-xl bg-zinc-200/70 hover:bg-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 transition-all hover:scale-105 border border-zinc-300/40 dark:border-zinc-800"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter / X"
              className="p-2 rounded-xl bg-zinc-200/70 hover:bg-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-sky-500 transition-all hover:scale-105 border border-zinc-300/40 dark:border-zinc-800"
            >
              <Twitter className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Email"
              className="p-2 rounded-xl bg-zinc-200/70 hover:bg-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 transition-all hover:scale-105 border border-zinc-300/40 dark:border-zinc-800"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quiet Bottom Copyright Line */}
        <div className="mt-8 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-500 dark:text-zinc-500 text-[11px] font-mono">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</span>
            <span>·</span>
            {onOpenLicense && (
              <button
                type="button"
                onClick={onOpenLicense}
                className="inline-flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-2 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>MIT License</span>
              </button>
            )}
          </div>
          <div>
            Built with React 19, TypeScript & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
};
