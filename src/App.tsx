/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from './data/portfolioData';

// Normal skill texts as requested (no logo images)
const SKILL_TEXTS = [
  'React 19',
  'Next.js 15',
  'TypeScript',
  'Node.js',
  'Tailwind CSS',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Docker',
  'Express.js',
  'GraphQL',
  'RESTful APIs',
  'Microservices',
  'System Architecture',
  'Git & CI/CD',
];

export default function App() {
  const [activeItem, setActiveItem] = useState<string>('Home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navItems = ['Home', 'About', 'Projects', 'Skills', 'Contact'];

  const scrollToSection = (id: string) => {
    setActiveItem(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-white text-zinc-900 relative flex flex-col selection:bg-blue-600 selection:text-white overflow-x-hidden font-sans p-[5px]">
      {/* 1. FLOATING TRANSPARENT CAPSULE NAVBAR
          - Fits seamlessly on desktop & mobile with zero overflow
          - "Deep Baidya" and "Hire Me" securely contained inside the black rounded capsule
      */}
      <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-2 sm:px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          aria-label="Capsule Navigation"
          className="pointer-events-auto relative flex items-center justify-between md:justify-center w-[94%] max-w-sm md:w-auto md:max-w-none gap-2 sm:gap-3 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/55 backdrop-blur-md border border-white/20 shadow-2xl text-white"
        >
          {/* Brand Name */}
          <motion.button
            type="button"
            onClick={() => scrollToSection('Home')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative px-2 py-1 text-xs sm:text-sm font-semibold tracking-tight text-white hover:text-zinc-200 transition-colors whitespace-nowrap z-10 shrink-0"
          >
            {PERSONAL_INFO.name}
          </motion.button>

          {/* Vertical Divider (Desktop Only) */}
          <span className="h-4 w-[1px] bg-white/25 hidden md:block" />

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 relative">
            {navItems.map((item) => {
              const isActive = activeItem === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => scrollToSection(item)}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap z-10 ${
                    isActive ? 'text-black font-semibold' : 'text-zinc-200 hover:text-white'
                  }`}
                >
                  {/* Sliding Spring Pill Indicator (WHITE background) */}
                  {isActive && (
                    <motion.div
                      layoutId="capsuleActivePill"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-white rounded-full -z-10 shadow-md"
                    />
                  )}

                  {/* Hover Pill */}
                  {!isActive && hoveredItem === item && (
                    <motion.div
                      layoutId="capsuleHoverPill"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    />
                  )}

                  <span className="relative z-10">{item}</span>
                </button>
              );
            })}

            {/* "Hire Me" Button inside nav (Desktop - WHITE background) */}
            <motion.button
              type="button"
              onClick={() => scrollToSection('Contact')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`relative ml-1.5 px-4 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap shadow-md z-10 shrink-0 ${
                activeItem === 'Hire Me' || activeItem === 'Contact'
                  ? 'bg-white text-black ring-2 ring-white/60'
                  : 'bg-white text-black hover:bg-zinc-100 active:scale-95'
              }`}
            >
              Hire Me
            </motion.button>
          </div>

          {/* Mobile Right Controls: Hire Me Button + Hamburger Toggle (Both securely inside capsule) */}
          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            <motion.button
              type="button"
              onClick={() => scrollToSection('Contact')}
              whileTap={{ scale: 0.95 }}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-full transition-all whitespace-nowrap shadow-sm ${
                activeItem === 'Hire Me' || activeItem === 'Contact'
                  ? 'bg-white text-black ring-2 ring-white/60'
                  : 'bg-white text-black hover:bg-zinc-100'
              }`}
            >
              Hire Me
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="flex items-center justify-center w-7 h-7 rounded-full bg-white/15 text-white border border-white/20 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </motion.button>
          </div>
        </motion.nav>

        {/* Mobile Dropdown Menu with Spring Animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="pointer-events-auto md:hidden fixed top-16 inset-x-4 bg-black/95 backdrop-blur-xl border border-white/15 rounded-2xl p-3 shadow-2xl shadow-black z-50 max-w-sm mx-auto text-white"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeItem === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => scrollToSection(item)}
                      className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-left text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-white text-black font-semibold'
                          : 'text-zinc-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>{item}</span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                    </button>
                  );
                })}

                {/* Hire Me in Mobile List */}
                <button
                  type="button"
                  onClick={() => scrollToSection('Contact')}
                  className={`w-full py-2.5 px-4 rounded-xl text-center text-xs font-semibold transition-colors mt-1 ${
                    activeItem === 'Hire Me' || activeItem === 'Contact'
                      ? 'bg-white text-black ring-2 ring-white/50'
                      : 'bg-white text-black hover:bg-zinc-100'
                  }`}
                >
                  Hire Me
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO CONTAINER WITH 5PX MARGIN */}
      <section className="relative w-full flex-1 min-h-[540px] sm:min-h-[580px] md:min-h-[calc(100vh-10px)] overflow-hidden select-none flex flex-col justify-between">
          {/* UNDERLYING CONTINUOUS SKILL TEXT MARQUEE (Z-0)
              - Automatic continuous loop (runs smoothly on its own, not tied to scroll)
              - Modern display typography with large, bold font size
              - NO dots between texts (clean spacing only)
              - Slides smoothly from right to left under the hero box curve
          */}
          <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 z-0 pointer-events-none select-none overflow-hidden h-16 sm:h-20 md:h-24 flex items-center">
            <motion.div
              className="flex items-center whitespace-nowrap will-change-transform shrink-0"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                ease: 'linear',
                duration: 35,
                repeat: Infinity,
              }}
            >
              {[...SKILL_TEXTS, ...SKILL_TEXTS].map((skill, index) => (
                <div
                  key={`track1-${index}`}
                  className="flex items-center shrink-0 px-6 sm:px-8 md:px-12"
                >
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase text-slate-800 font-['Outfit',sans-serif] select-none">
                    {skill}
                  </span>
                </div>
              ))}
              {[...SKILL_TEXTS, ...SKILL_TEXTS].map((skill, index) => (
                <div
                  key={`track2-${index}`}
                  className="flex items-center shrink-0 px-6 sm:px-8 md:px-12"
                >
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase text-slate-800 font-['Outfit',sans-serif] select-none">
                    {skill}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* SVG DEFINITIONS */}
          <svg className="sr-only">
            <defs>
              {/* 100% OPAQUE Radial Gradient: intense white core -> sky blue -> rich royal blue -> deep midnight blue */}
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

          {/* DESKTOP SVG: Fully opaque fills ensure text passing under is 100% occluded (Z-10) */}
          <svg
            className="hidden sm:block absolute inset-0 w-full h-full drop-shadow-xl z-10 pointer-events-none"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            {/* Base solid background fill */}
            <path
              d="M 16 0 
                 L 984 0 
                 Q 1000 0 1000 16 
                 L 1000 460 
                 Q 1000 480 976 480 
                 L 720 480 
                 C 660 480, 630 600, 560 600 
                 L 16 600 
                 Q 0 600 0 584 
                 L 0 16 
                 Q 0 0 16 0 Z"
              fill="#1e3a8a"
            />
            {/* Opaque gradient fill with crisp outline */}
            <path
              d="M 16 0 
                 L 984 0 
                 Q 1000 0 1000 16 
                 L 1000 460 
                 Q 1000 480 976 480 
                 L 720 480 
                 C 660 480, 630 600, 560 600 
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

          {/* MOBILE SVG: Fully opaque fills, curve placed at bottom 18% so hero text NEVER spills out (Z-10) */}
          <svg
            className="sm:hidden absolute inset-0 w-full h-full drop-shadow-xl z-10 pointer-events-none"
            viewBox="0 0 400 600"
            preserveAspectRatio="none"
          >
            {/* Base solid background fill */}
            <path
              d="M 12 0 
                 L 388 0 
                 Q 400 0 400 12 
                 L 400 495 
                 Q 400 515 380 515 
                 L 270 515 
                 C 230 515, 210 600, 160 600 
                 L 12 600 
                 Q 0 600 0 588 
                 L 0 12 
                 Q 0 0 12 0 Z"
              fill="#1e3a8a"
            />
            {/* Opaque gradient fill with crisp outline */}
            <path
              d="M 12 0 
                 L 388 0 
                 Q 400 0 400 12 
                 L 400 495 
                 Q 400 515 380 515 
                 L 270 515 
                 C 230 515, 210 600, 160 600 
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

          {/* Ambient Center White Spotlight Aura (Z-15) */}
          <div className="absolute top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[480px] md:w-[600px] h-[160px] sm:h-[300px] bg-white/40 blur-[65px] sm:blur-[100px] rounded-full pointer-events-none z-15" />
          <div className="absolute top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] sm:w-[260px] h-[90px] sm:h-[160px] bg-white/55 blur-[40px] sm:blur-[60px] rounded-full pointer-events-none z-15" />

          {/* Hero Content (Z-20: strictly inside the solid upper-mid portion of the blue box) */}
          <div className="relative z-20 w-full flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-8 pt-14 sm:pt-20 pb-20 sm:pb-24 max-w-4xl mx-auto">
            <div className="space-y-3.5 sm:space-y-5 max-w-xs xs:max-w-sm sm:max-w-2xl mx-auto flex flex-col items-center">
              {/* Eyebrow / Kicker */}
              <motion.div
                initial={{ opacity: 0, y: -15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-white/50 backdrop-blur-sm border border-white/70 text-slate-900 text-[10px] sm:text-xs font-mono font-semibold tracking-wider uppercase shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse shrink-0" />
                <span className="whitespace-nowrap">Full-Stack Architect</span>
                <span className="text-slate-400">·</span>
                <span className="whitespace-nowrap">MERN & Next.js</span>
              </motion.div>

              {/* Bold Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="font-['Outfit'] text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight sm:tracking-[-0.03em] text-slate-950 leading-[1.14] sm:leading-[1.1] text-balance drop-shadow-sm px-1"
              >
                Architecting Resilient Web Systems & Scalable Products
              </motion.h1>

              {/* Value Proposition */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="font-['Plus_Jakarta_Sans'] text-xs sm:text-base md:text-lg text-slate-800 font-normal max-w-xs sm:max-w-xl mx-auto leading-relaxed text-balance px-2"
              >
                Specialized in React 19, Next.js 15, and Node.js microservices. Engineering low-latency APIs, robust distributed architectures, and intuitive digital experiences.
              </motion.p>
            </div>
          </div>
        </section>
    </div>
  );
}
