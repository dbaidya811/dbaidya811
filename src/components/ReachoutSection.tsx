import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowUpRight, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ReachoutSectionProps {
  onOpenMeeting?: () => void;
}

export const ReachoutSection: React.FC<ReachoutSectionProps> = ({
  onOpenMeeting,
}) => {
  const handleMeetingBooking = () => {
    if (onOpenMeeting) {
      onOpenMeeting();
    } else {
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=Schedule%20a%20Meeting%20with%20Deep%20Baidya&body=Hi%20Deep,%0D%0A%0D%0AI'd%20love%20to%20book%20a%20quick%2015-30%20min%20meeting%20with%20you.%0D%0A%0D%0ATopic:%0D%0APreferred%20Date%20&%20Time:`;
    }
  };

  const socials = [
    {
      name: 'GitHub',
      skillId: 'github',
      href: PERSONAL_INFO.github || 'https://github.com/dbaidya811',
    },
    {
      name: 'LinkedIn',
      skillId: 'linkedin',
      href: PERSONAL_INFO.linkedin || 'https://linkedin.com/in/dbaidya811',
    },
    {
      name: 'X (Twitter)',
      skillId: 'twitter',
      href: PERSONAL_INFO.twitter || 'https://x.com/dbaidya811',
    },
    {
      name: 'Gmail',
      skillId: 'gmail',
      href: `mailto:${PERSONAL_INFO.email}?subject=Hello%20Deep!&body=Hi%20Deep,%0D%0A%0D%0AI'd%20love%20to%20connect%20with%20you%20about...`,
    },
  ];

  return (
    <section
      id="Contact"
      className="relative w-full py-10 xs:py-12 sm:py-20 md:py-24 px-3 sm:px-6 lg:px-8 bg-white dark:bg-[#09090b] transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative min-h-[390px] xs:min-h-[410px] sm:min-h-[480px] md:min-h-[520px] flex items-center justify-center">
        {/* ========================================================================= */}
        {/* TOP-LEFT CUT POCKET: "BOOK A MEETING" CAPSULE BUTTON                     */}
        {/* Perfectly tailored and proportional on mobile and desktop               */}
        {/* ========================================================================= */}
        <div className="absolute top-1.5 xs:top-2 sm:top-3.5 md:top-4 left-1.5 xs:left-2 sm:left-3 md:left-5 z-30 pointer-events-auto">
          <motion.button
            type="button"
            onClick={handleMeetingBooking}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center justify-between gap-1.5 sm:gap-3.5 pl-1.5 sm:pl-3.5 pr-1.5 sm:pr-2.5 py-1 sm:py-2 md:py-2.5 rounded-full bg-slate-950 dark:bg-zinc-900 text-white shadow-md sm:shadow-xl shadow-slate-950/40 dark:shadow-black/70 border border-slate-800/90 dark:border-zinc-700/80 cursor-pointer select-none ring-1 ring-black/10 dark:ring-white/10 max-w-[210px] xs:max-w-[230px] sm:max-w-none transition-transform duration-200"
            aria-label="Book a Meeting"
          >
            {/* Left: Calendar Icon in Gradient Circle */}
            <div className="relative flex items-center justify-center shrink-0">
              <div className="w-5.5 h-5.5 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-xs shrink-0">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5" />
              </div>
            </div>

            {/* Center: "Book a Meeting" label & details */}
            <div className="flex flex-col text-left min-w-0 flex-1 px-1">
              <span className="font-['Outfit'] font-bold text-[11px] xs:text-xs sm:text-sm md:text-base tracking-tight text-white whitespace-nowrap">
                Book a Meeting
              </span>
              <span className="hidden sm:block font-mono text-[10px] sm:text-[11px] text-slate-300 truncate">
                15-30 min · Quick Strategy Chat
              </span>
            </div>

            {/* Right: Round Arrow Badge */}
            <div className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
              <ArrowUpRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </motion.button>
        </div>

        {/* SVG DEFINITIONS - Matching Hero Box Radial Blue Glow Gradients */}
        <svg className="sr-only">
          <defs>
            <radialGradient id="reachoutBlueGlow" cx="50%" cy="38%" r="65%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="16%" stopColor="#e0f2fe" stopOpacity="1" />
              <stop offset="38%" stopColor="#38bdf8" stopOpacity="1" />
              <stop offset="68%" stopColor="#1d4ed8" stopOpacity="1" />
              <stop offset="88%" stopColor="#1e3a8a" stopOpacity="1" />
              <stop offset="100%" stopColor="#08142c" stopOpacity="1" />
            </radialGradient>
            <radialGradient id="reachoutBlueGlowDark" cx="50%" cy="38%" r="65%">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="1" />
              <stop offset="16%" stopColor="#0f172a" stopOpacity="1" />
              <stop offset="38%" stopColor="#0369a1" stopOpacity="1" />
              <stop offset="68%" stopColor="#1e3a8a" stopOpacity="1" />
              <stop offset="88%" stopColor="#0f172a" stopOpacity="1" />
              <stop offset="100%" stopColor="#020617" stopOpacity="1" />
            </radialGradient>
          </defs>
        </svg>

        {/* DESKTOP SVG: Hero-style Box with Wide Top-Left cut pocket */}
        <svg
          className="hidden sm:block absolute inset-0 w-full h-full drop-shadow-xl z-0 pointer-events-none"
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 150 
               Q 0 128 24 128 
               L 410 128 
               C 480 128, 510 0, 580 0 
               L 984 0 
               Q 1000 0 1000 16 
               L 1000 484 
               Q 1000 500 984 500 
               L 16 500 
               Q 0 500 0 484 
               L 0 150 Z"
            fill="#1e3a8a"
            className="dark:fill-[#0a1128]"
          />
          <path
            d="M 0 150 
               Q 0 128 24 128 
               L 410 128 
               C 480 128, 510 0, 580 0 
               L 984 0 
               Q 1000 0 1000 16 
               L 1000 484 
               Q 1000 500 984 500 
               L 16 500 
               Q 0 500 0 484 
               L 0 150 Z"
            fill="url(#reachoutBlueGlow)"
            stroke="#60a5fa"
            strokeWidth="1.2"
            strokeOpacity="0.8"
            className="dark:hidden"
          />
          <path
            d="M 0 150 
               Q 0 128 24 128 
               L 410 128 
               C 480 128, 510 0, 580 0 
               L 984 0 
               Q 1000 0 1000 16 
               L 1000 484 
               Q 1000 500 984 500 
               L 16 500 
               Q 0 500 0 484 
               L 0 150 Z"
            fill="url(#reachoutBlueGlowDark)"
            stroke="#38bdf8"
            strokeWidth="1.2"
            strokeOpacity="0.4"
            className="hidden dark:block"
          />
        </svg>

        {/* MOBILE SVG: Hero-style Box with WIDE & DEEP Top-Left cut pocket fitting mobile button perfectly */}
        <svg
          className="sm:hidden absolute inset-0 w-full h-full drop-shadow-xl z-0 pointer-events-none"
          viewBox="0 0 400 500"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 125 
               Q 0 100 16 100 
               L 230 100 
               C 265 100, 285 0, 320 0 
               L 388 0 
               Q 400 0 400 12 
               L 400 488 
               Q 400 500 388 500 
               L 12 500 
               Q 0 500 0 488 
               L 0 125 Z"
            fill="#1e3a8a"
            className="dark:fill-[#0a1128]"
          />
          <path
            d="M 0 125 
               Q 0 100 16 100 
               L 230 100 
               C 265 100, 285 0, 320 0 
               L 388 0 
               Q 400 0 400 12 
               L 400 488 
               Q 400 500 388 500 
               L 12 500 
               Q 0 500 0 488 
               L 0 125 Z"
            fill="url(#reachoutBlueGlow)"
            stroke="#60a5fa"
            strokeWidth="1.2"
            strokeOpacity="0.8"
            className="dark:hidden"
          />
          <path
            d="M 0 125 
               Q 0 100 16 100 
               L 230 100 
               C 265 100, 285 0, 320 0 
               L 388 0 
               Q 400 0 400 12 
               L 400 488 
               Q 400 500 388 500 
               L 12 500 
               Q 0 500 0 488 
               L 0 125 Z"
            fill="url(#reachoutBlueGlowDark)"
            stroke="#38bdf8"
            strokeWidth="1.2"
            strokeOpacity="0.4"
            className="hidden dark:block"
          />
        </svg>

        {/* Ambient Center Aura from Hero Box */}
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] sm:w-[480px] md:w-[560px] h-[90px] sm:h-[220px] bg-white/40 dark:bg-sky-400/10 blur-[35px] sm:blur-[90px] rounded-full pointer-events-none z-1" />
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] sm:w-[260px] h-[50px] sm:h-[120px] bg-white/55 dark:bg-blue-400/15 blur-[25px] sm:blur-[50px] rounded-full pointer-events-none z-1" />

        {/* Content Container - Balanced padding for mobile and desktop */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 sm:px-12 pt-16 xs:pt-18 sm:pt-28 md:pt-32 pb-6 xs:pb-7 sm:pb-12">
          {/* 1. Center Text */}
          <div className="max-w-xl mx-auto space-y-1.5 xs:space-y-2 sm:space-y-3">
            <h2 className="font-['Outfit'] text-xl xs:text-2xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
              Have a project in mind?
            </h2>
            <p className="text-[11px] xs:text-xs sm:text-base text-slate-800 dark:text-zinc-200 font-normal leading-relaxed max-w-lg mx-auto">
              I&apos;m always open to discussing new projects, innovative ideas, or opportunities to be part of your vision.
            </p>
          </div>

          {/* 2. "Say Hello" Button (Opens Email) */}
          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=Hello%20Deep!&body=Hi%20Deep,%0D%0A%0D%0AI'd%20love%20to%20connect%20with%20you%20about...`}
            className="mt-4 xs:mt-5 sm:mt-8 inline-flex items-center justify-center gap-2 px-6 xs:px-7 sm:px-10 py-2.5 xs:py-3 sm:py-4 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-bold text-xs xs:text-sm sm:text-base shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer select-none"
          >
            <Mail className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            <span>Say Hello</span>
          </a>

          {/* 3. Social Media Icons via skill-icons (Below the button) */}
          <div className="mt-4 xs:mt-5 sm:mt-7 flex items-center justify-center gap-3 xs:gap-3.5 sm:gap-4.5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={social.href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                aria-label={social.name}
                title={social.name}
                className="group relative flex items-center justify-center transition-transform duration-200 hover:scale-115 active:scale-95 cursor-pointer"
              >
                <img
                  src={`https://skillicons.dev/icons?i=${social.skillId}`}
                  alt={social.name}
                  className="w-8.5 h-8.5 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-xl drop-shadow-sm select-none"
                  loading="lazy"
                />
                {/* Floating Tooltip */}
                <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-150 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-[10px] font-mono font-semibold px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-30">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
