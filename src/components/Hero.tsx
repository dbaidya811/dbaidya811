import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { StrokeText } from './StrokeText';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section className="relative w-full flex-none sm:flex-1 h-[275px] xs:h-[300px] sm:h-auto min-h-0 sm:min-h-[580px] md:min-h-[calc(100vh-10px)] overflow-hidden select-none flex flex-col justify-between">
      {/* 3. CAPSULE CONTACT BUTTON WITH ARROW (Z-30) */}
      <div className="absolute bottom-1.5 xs:bottom-2 sm:bottom-3.5 md:bottom-5 lg:bottom-6 right-1.5 xs:right-2 sm:right-4 md:right-7 lg:right-9 z-30 pointer-events-auto">
        <motion.button
          type="button"
          onClick={onOpenContact}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25, delay: 0.15 }}
          className="group relative flex items-center justify-between gap-1.5 sm:gap-4 md:gap-5 pl-2 sm:pl-4.5 md:pl-5 pr-1.5 sm:pr-3 md:pr-3.5 py-1 sm:py-2.5 md:py-3.5 rounded-full bg-slate-950 text-white shadow-lg sm:shadow-2xl shadow-slate-950/40 border border-slate-800/90 cursor-pointer select-none ring-1 ring-black/10 min-w-0 sm:min-w-[350px] md:min-w-[400px] lg:min-w-[440px] max-w-[calc(100vw-20px)] transition-transform duration-200"
          aria-label={`Contact: ${PERSONAL_INFO.email}`}
        >
          {/* Left: Mail icon in accent circle */}
          <div className="relative flex items-center justify-center shrink-0">
            <div className="w-5.5 h-5.5 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-blue-600/30">
              <Mail className="w-3 h-3 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
            </div>
          </div>

          {/* Center: "Contact" on mobile, "Contact via Email" & email on desktop */}
          <div className="flex flex-col text-left min-w-0 flex-1 pr-0.5 sm:pr-1">
            <span className="sm:hidden font-['Outfit'] font-bold text-xs tracking-wide text-white px-1 whitespace-nowrap">
              Contact
            </span>

            <div className="hidden sm:flex items-center">
              <span className="font-['Outfit'] font-bold text-sm md:text-base tracking-wide text-white">
                Contact via Email
              </span>
            </div>
            <span className="hidden sm:block font-mono text-xs text-slate-300 truncate">
              {PERSONAL_INFO.email}
            </span>
          </div>

          {/* Right: Round arrow capsule badge */}
          <div className="w-5.5 h-5.5 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </motion.button>
      </div>

      {/* SVG DEFINITIONS */}
      <svg className="sr-only">
        <defs>
          <radialGradient id="heroBlueGlow" cx="50%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="16%" stopColor="#e0f2fe" stopOpacity="1" />
            <stop offset="38%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="68%" stopColor="#1d4ed8" stopOpacity="1" />
            <stop offset="88%" stopColor="#1e3a8a" stopOpacity="1" />
            <stop offset="100%" stopColor="#08142c" stopOpacity="1" />
          </radialGradient>
        </defs>
      </svg>

      {/* DESKTOP SVG: Fully opaque fills with bottom-right curve pocket framing the contact capsule */}
      <svg
        className="hidden sm:block absolute inset-0 w-full h-full drop-shadow-xl z-10 pointer-events-none"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
      >
        <path
          d="M 16 0 
             L 984 0 
             Q 1000 0 1000 16 
             L 1000 450 
             Q 1000 472 976 472 
             L 640 472 
             C 570 472, 540 600, 470 600 
             L 16 600 
             Q 0 600 0 584 
             L 0 16 
             Q 0 0 16 0 Z"
          fill="#1e3a8a"
        />
        <path
          d="M 16 0 
             L 984 0 
             Q 1000 0 1000 16 
             L 1000 450 
             Q 1000 472 976 472 
             L 640 472 
             C 570 472, 540 600, 470 600 
             L 16 600 
             Q 0 600 0 584 
             L 0 16 
             Q 0 0 16 0 Z"
          fill="url(#heroBlueGlow)"
          stroke="#60a5fa"
          strokeWidth="1.2"
          strokeOpacity="0.8"
        />
      </svg>

      {/* MOBILE SVG: Fully opaque fills with compact bottom-right curve pocket framing the contact capsule */}
      <svg
        className="sm:hidden absolute inset-0 w-full h-full drop-shadow-xl z-10 pointer-events-none"
        viewBox="0 0 400 600"
        preserveAspectRatio="none"
      >
        <path
          d="M 12 0 
             L 388 0 
             Q 400 0 400 12 
             L 400 480 
             Q 400 500 380 500 
             L 225 500 
             C 185 500, 165 600, 125 600 
             L 12 600 
             Q 0 600 0 588 
             L 0 12 
             Q 0 0 12 0 Z"
          fill="#1e3a8a"
        />
        <path
          d="M 12 0 
             L 388 0 
             Q 400 0 400 12 
             L 400 480 
             Q 400 500 380 500 
             L 225 500 
             C 185 500, 165 600, 125 600 
             L 12 600 
             Q 0 600 0 588 
             L 0 12 
             Q 0 0 12 0 Z"
          fill="url(#heroBlueGlow)"
          stroke="#60a5fa"
          strokeWidth="1.2"
          strokeOpacity="0.8"
        />
      </svg>

      {/* Ambient Center White Spotlight Aura */}
      <div className="absolute top-[44%] sm:top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] sm:w-[480px] md:w-[600px] h-[90px] sm:h-[300px] bg-white/40 blur-[35px] sm:blur-[100px] rounded-full pointer-events-none z-15" />
      <div className="absolute top-[44%] sm:top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] sm:w-[260px] h-[50px] sm:h-[160px] bg-white/55 blur-[25px] sm:blur-[60px] rounded-full pointer-events-none z-15" />

      {/* Hero Content */}
      <div className="relative z-20 w-full flex-1 flex flex-col items-center justify-center text-center px-3 sm:px-8 pt-8 xs:pt-9 sm:pt-20 pb-4 xs:pb-5 sm:pb-24 max-w-4xl mx-auto">
        <div className="space-y-1 xs:space-y-1.5 sm:space-y-4 max-w-xs xs:max-w-sm sm:max-w-2xl mx-auto flex flex-col items-center w-full">
          {/* Eyebrow / Kicker */}
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/50 backdrop-blur-sm border border-white/70 text-slate-900 text-[8.5px] xs:text-[9.5px] sm:text-xs font-mono font-semibold tracking-wider uppercase shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse shrink-0" />
            <span className="whitespace-nowrap">Full-Stack Architect</span>
            <span className="text-slate-400">·</span>
            <span className="whitespace-nowrap">MERN & Next.js</span>
          </motion.div>

          {/* StrokeText Animated Heading: React Bits Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="w-full flex justify-center py-0.5"
          >
            {/* Desktop StrokeText */}
            <div className="hidden sm:block w-full max-w-2xl">
              <StrokeText
                text="Architecting Resilient Web Systems"
                strokeColor="#1e3a8a"
                fillColor="#020617"
                strokeWidth={1.8}
                drawDuration={1.5}
                fillDelay={0.2}
                stagger={0.035}
                ease="power2.out"
                trigger="mount"
                fillMode="wipe"
                fontSize={46}
                fontWeight={800}
                letterSpacing={-1.5}
                className="font-['Outfit'] drop-shadow-sm"
              />
            </div>

            {/* Mobile StrokeText */}
            <div className="block sm:hidden w-full max-w-[320px]">
              <StrokeText
                text="Architecting Resilient Web Systems"
                strokeColor="#1e3a8a"
                fillColor="#020617"
                strokeWidth={1.4}
                drawDuration={1.3}
                fillDelay={0.15}
                stagger={0.025}
                ease="power2.out"
                trigger="mount"
                fillMode="wipe"
                fontSize={24}
                fontWeight={800}
                letterSpacing={-0.8}
                className="font-['Outfit'] drop-shadow-sm"
              />
            </div>
          </motion.div>

          {/* Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Plus_Jakarta_Sans'] text-[10px] xs:text-[11px] sm:text-base md:text-lg text-slate-800 font-normal max-w-xs sm:max-w-xl mx-auto leading-normal sm:leading-relaxed text-balance px-1"
          >
            Specialized in React 19, Next.js 15, and Node.js microservices. Engineering low-latency APIs, robust distributed architectures, and intuitive digital experiences.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
