import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { PillarCard, PILLAR_CARDS } from '../data/pillarCardsData';

interface CapabilitiesSectionProps {
  activeCardIndex: number;
  setActiveCardIndex: (index: number) => void;
  screenWidth: number;
  isMobile: boolean;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  activeCardIndex,
  setActiveCardIndex,
  screenWidth,
  isMobile,
}) => {
  const deckRef = useRef<HTMLElement>(null);
  const isDeckInView = useInView(deckRef, { amount: 0.15, once: false });

  // Compute Half-Circle (semi-circle fan) coordinates based on screen size
  const getArcTransform = (index: number) => {
    // Mobile (< 640px): Full desktop-like half-circle fan geometry scaled for phone screen
    if (screenWidth < 640) {
      const mobileArcs = [
        { x: -116, y: 36, rotate: -26 },
        { x: -58, y: 10, rotate: -13 },
        { x: 0, y: 0, rotate: 0 },
        { x: 58, y: 10, rotate: 13 },
        { x: 116, y: 36, rotate: 26 },
      ];
      return mobileArcs[index];
    }

    // Tablet (640px - 1024px)
    if (screenWidth < 1024) {
      const tabletArcs = [
        { x: -300, y: 78, rotate: -24 },
        { x: -150, y: 22, rotate: -12 },
        { x: 0, y: 0, rotate: 0 },
        { x: 150, y: 22, rotate: 12 },
        { x: 300, y: 78, rotate: 24 },
      ];
      return tabletArcs[index];
    }

    // Desktop (>= 1024px): Prominent Half-Circle Arch
    const desktopArcs = [
      { x: -430, y: 110, rotate: -32 },
      { x: -215, y: 28, rotate: -16 },
      { x: 0, y: 0, rotate: 0 },
      { x: 215, y: 28, rotate: 16 },
      { x: 430, y: 110, rotate: 32 },
    ];
    return desktopArcs[index];
  };

  return (
    <section
      id="Capabilities"
      ref={deckRef}
      className="relative w-full sm:min-h-screen sm:min-h-[100dvh] flex flex-col items-center justify-start sm:justify-center select-none overflow-hidden z-20 px-3 sm:px-6 pt-[25px] sm:py-10 pb-16 sm:pb-12"
    >
      {/* Section Header Text */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-4 xs:mb-6 sm:mb-12 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 border border-slate-900/10 text-slate-800 text-[10px] xs:text-xs font-mono font-semibold tracking-wider uppercase mb-2 sm:mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          <span>Core Engineering Pillars</span>
        </div>
        <h2 className="font-['Outfit'] text-xl xs:text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
          System Architecture & Capabilities
        </h2>
        <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-base text-slate-600 mt-1.5 sm:mt-3 leading-relaxed max-w-xl mx-auto">
          Five core engineering competencies designed to build, scale, and secure modern web systems.
        </p>
      </div>

      {/* Interactive 5-Card Semi-Circle Spread Container (25px below hero on mobile) */}
      <div className="relative w-full flex items-center justify-center h-[210px] xs:h-[235px] sm:h-auto sm:min-h-[520px] md:min-h-[600px] sm:flex-1 max-w-7xl mx-auto">
        {/* Luminous Half-Circle Arc Guide (Visual Semi-Circle Framing, Centered with Cards) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-4 xs:-mt-5 sm:-mt-16 flex items-center justify-center pointer-events-none opacity-60">
          <svg className="w-[300px] xs:w-[340px] sm:w-[880px] h-[130px] xs:h-[150px] sm:h-[340px] max-w-full overflow-visible" viewBox="0 0 880 340" fill="none">
            <defs>
              <linearGradient id="halfCircleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
                <stop offset="25%" stopColor="#818cf8" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.85" />
                <stop offset="75%" stopColor="#34d399" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.1" />
              </linearGradient>
              <radialGradient id="centerCoreGlow" cx="50%" cy="0%" r="50%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.0" />
              </radialGradient>
            </defs>
            <circle cx="440" cy="180" r="280" fill="url(#centerCoreGlow)" />
            <path
              d="M 60 300 Q 440 20 820 300"
              stroke="url(#halfCircleGrad)"
              strokeWidth="1.5"
              strokeDasharray="5 7"
            />
            <path
              d="M 60 300 Q 440 20 820 300"
              stroke="url(#halfCircleGrad)"
              strokeWidth="6"
              className="blur-sm opacity-40"
            />
            <circle cx="150" cy="225" r="3.5" fill="#38bdf8" className="opacity-75" />
            <circle cx="280" cy="115" r="3.5" fill="#818cf8" className="opacity-80" />
            <circle cx="440" cy="65" r="4.5" fill="#22d3ee" className="animate-pulse" />
            <circle cx="600" cy="115" r="3.5" fill="#34d399" className="opacity-80" />
            <circle cx="730" cy="225" r="3.5" fill="#c084fc" className="opacity-75" />
          </svg>
        </div>

        {PILLAR_CARDS.map((card: PillarCard) => {
          const arc = getArcTransform(card.id);
          const isActive = activeCardIndex === card.id;
          const currentZIndex = isActive
            ? 50
            : card.id === 2
            ? 30
            : card.id === 1 || card.id === 3
            ? 20
            : 10;

          return (
            <motion.div
              key={card.id}
              onClick={() => setActiveCardIndex(card.id)}
              initial={{ x: 0, y: 50, rotate: 0, scale: 0.9, opacity: 0.2 }}
              animate={{
                x: isDeckInView ? arc.x : 0,
                y: isDeckInView ? arc.y : 50,
                rotate: isDeckInView ? arc.rotate : 0,
                scale: isDeckInView ? (isActive ? (isMobile ? 1.04 : 1.04) : (isMobile ? 0.95 : 0.97)) : 0.9,
                opacity: isDeckInView ? 1 : 0.25,
                zIndex: currentZIndex,
              }}
              transition={{
                type: 'spring',
                stiffness: 180,
                damping: 22,
                mass: 0.8,
                delay: isDeckInView ? Math.abs(card.id - 2) * 0.06 : 0,
              }}
              whileHover={
                isDeckInView
                  ? { scale: isActive ? (isMobile ? 1.05 : 1.05) : (isMobile ? 0.98 : 1.01) }
                  : {}
              }
              className={`absolute w-[130px] xs:w-[145px] sm:w-[285px] md:w-[295px] h-[210px] xs:h-[235px] sm:h-[395px] md:h-[415px] rounded-xl xs:rounded-2xl sm:rounded-[30px] bg-gradient-to-b from-zinc-900/95 via-zinc-950 to-black p-2 xs:p-2.5 sm:p-5.5 text-white shadow-2xl transition-all cursor-pointer border ${
                isActive
                  ? `${card.accent.border} ${card.accent.glow} ring-2 ${card.accent.ring}`
                  : 'border-zinc-800/80 shadow-black/80 hover:border-zinc-700'
              } flex flex-col justify-between overflow-hidden backdrop-blur-xl select-none`}
            >
              {/* Top Neon Accent Beam */}
              <div
                className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent ${card.accent.lineGradient} to-transparent`}
              />

              {/* Header: Icon + Pillar Badge */}
              <div>
                <div className="flex items-center justify-between gap-1 sm:gap-2 mb-1 xs:mb-1.5 sm:mb-3.5">
                  <div
                    className={`w-5 h-5 xs:w-6 xs:h-6 sm:w-9 sm:h-9 rounded-md xs:rounded-lg sm:rounded-2xl bg-zinc-900/90 border border-zinc-800 ${card.accent.text} flex items-center justify-center shadow-inner`}
                  >
                    <card.icon className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <div className="flex items-center gap-0.5 sm:gap-1.5">
                    {card.id === 2 && (
                      <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                    <span
                      className={`text-[7px] xs:text-[7.5px] sm:text-[10px] font-mono tracking-wider uppercase px-1 xs:px-1.5 py-0.5 rounded-full border ${
                        isActive
                          ? card.accent.badgeBg
                          : 'text-zinc-400 bg-zinc-900/90 border-zinc-800'
                      }`}
                    >
                      {card.id === 2 ? 'Core' : `P${card.pillar}`}
                    </span>
                  </div>
                </div>

                {/* Category Subtitle */}
                <div
                  className={`text-[6.5px] xs:text-[7.5px] sm:text-[10.5px] font-mono ${card.accent.text} font-semibold uppercase tracking-wider mb-0.5 sm:mb-1 line-clamp-1`}
                >
                  {card.tagline}
                </div>

                {/* Main Title */}
                <h3 className="font-['Outfit'] text-[10.5px] xs:text-[11.5px] sm:text-lg md:text-xl font-bold tracking-tight text-white leading-tight sm:leading-snug line-clamp-1">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="font-['Plus_Jakarta_Sans'] text-[7.5px] xs:text-[8.5px] sm:text-xs text-zinc-300 mt-0.5 xs:mt-1 sm:mt-2 leading-tight sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {card.description}
                </p>
              </div>

              {/* Metrics & Tech Stack */}
              <div className="space-y-1 sm:space-y-3 pt-1 xs:pt-1.5 sm:pt-3 border-t border-zinc-800/80">
                <div className="grid grid-cols-2 gap-1 xs:gap-1.5 sm:gap-2">
                  {card.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-1 xs:p-1.5 sm:p-2.5 rounded xs:rounded-md sm:rounded-xl bg-zinc-900/80 border border-zinc-800/80"
                    >
                      <div className="text-[6.5px] xs:text-[7px] sm:text-[9.5px] font-mono text-zinc-400 line-clamp-1">{m.label}</div>
                      <div className={`text-[8px] xs:text-[9px] sm:text-sm font-bold font-mono mt-0.5 ${m.color} line-clamp-1`}>
                        {m.val}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hidden xs:flex sm:flex flex-wrap gap-0.5 sm:gap-1">
                  {card.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[6.5px] xs:text-[7.5px] sm:text-[9.5px] font-mono text-zinc-400 bg-zinc-900/90 px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded border border-zinc-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
