import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Star, Quote, ArrowUpRight } from 'lucide-react';
import { WORK_REVIEWS, WorkReview } from '../data/reviewsData';

export const WorkReviewsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll position across the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Smooth springs for buttery scroll tracking
  // Top row: scrolls Left to Right as user scrolls down
  const rawXTop = useTransform(scrollYProgress, [0, 1], ['-26%', '2%']);
  const xTop = useSpring(rawXTop, { stiffness: 120, damping: 28, mass: 0.2 });

  // Bottom row: scrolls Right to Left as user scrolls down
  const rawXBottom = useTransform(scrollYProgress, [0, 1], ['2%', '-26%']);
  const xBottom = useSpring(rawXBottom, { stiffness: 120, damping: 28, mass: 0.2 });

  // Split reviews into two distinct rows and duplicate for infinite continuous breadth
  const topReviews = [
    WORK_REVIEWS[0],
    WORK_REVIEWS[1],
    WORK_REVIEWS[2],
    WORK_REVIEWS[3],
    WORK_REVIEWS[0],
    WORK_REVIEWS[1],
    WORK_REVIEWS[2],
    WORK_REVIEWS[3],
    WORK_REVIEWS[0],
    WORK_REVIEWS[1],
    WORK_REVIEWS[2],
    WORK_REVIEWS[3],
  ];

  const bottomReviews = [
    WORK_REVIEWS[4],
    WORK_REVIEWS[5],
    WORK_REVIEWS[6],
    WORK_REVIEWS[7],
    WORK_REVIEWS[4],
    WORK_REVIEWS[5],
    WORK_REVIEWS[6],
    WORK_REVIEWS[7],
    WORK_REVIEWS[4],
    WORK_REVIEWS[5],
    WORK_REVIEWS[6],
    WORK_REVIEWS[7],
  ];

  return (
    <section
      id="Reviews"
      ref={sectionRef}
      className="relative w-full py-8 xs:py-10 sm:py-20 md:py-24 overflow-hidden bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-[2px] select-none border-t border-zinc-100 dark:border-zinc-850 transition-colors duration-300 z-20"
    >
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[240px] sm:w-[500px] h-[240px] sm:h-[500px] bg-blue-500/4 dark:bg-blue-500/10 blur-[100px] sm:blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[240px] sm:w-[500px] h-[240px] sm:h-[500px] bg-emerald-500/4 dark:bg-emerald-500/10 blur-[100px] sm:blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 text-center mb-5 xs:mb-6 sm:mb-14">
        <h2 className="font-['Outfit'] text-lg xs:text-xl sm:text-3xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          What Collaborators Say About Working With Me
        </h2>

        <p className="font-['Plus_Jakarta_Sans'] text-[11px] xs:text-xs sm:text-base text-slate-600 dark:text-zinc-400 mt-1.5 sm:mt-3.5 max-w-2xl mx-auto leading-relaxed">
          Production-tested feedback from engineering leaders, product directors, and founders. Scroll to glide across reviews — hover any card to reveal its full color.
        </p>
      </div>

      {/* Continuous Dual-Row Scroll Container */}
      <div className="relative w-full space-y-2.5 xs:space-y-3 sm:space-y-6">
        {/* Edge Gradient Fade Masks (left and right) */}
        <div className="absolute inset-y-0 left-0 w-6 xs:w-8 sm:w-28 bg-gradient-to-r from-white dark:from-[#09090b] via-white/80 dark:via-[#09090b]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-6 xs:w-8 sm:w-28 bg-gradient-to-l from-white dark:from-[#09090b] via-white/80 dark:via-[#09090b]/80 to-transparent z-20 pointer-events-none" />

        {/* ROW 1: Moves Left to Right on Scroll */}
        <div className="w-full overflow-hidden py-0.5 sm:py-1">
          <motion.div
            style={{ x: xTop }}
            className="flex items-stretch gap-2.5 xs:gap-3 sm:gap-6 will-change-transform"
          >
            {topReviews.map((item: WorkReview, idx: number) => (
              <ReviewCard key={`top-${item.id}-${idx}`} review={item} />
            ))}
          </motion.div>
        </div>

        {/* ROW 2: Moves Right to Left on Scroll */}
        <div className="w-full overflow-hidden py-0.5 sm:py-1">
          <motion.div
            style={{ x: xBottom }}
            className="flex items-stretch gap-2.5 xs:gap-3 sm:gap-6 will-change-transform"
          >
{bottomReviews.map((item: WorkReview, idx: number) => (
            <ReviewCard key={`bottom-${item.id}-${idx}`} review={item} />
          ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
};

interface ReviewCardProps {
  review: WorkReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div
      className={`group relative w-[210px] xs:w-[235px] sm:w-[350px] md:w-[410px] shrink-0 p-3 xs:p-3.5 sm:p-5 md:p-6.5 rounded-xl xs:rounded-2xl sm:rounded-3xl cursor-pointer select-none
        /* Default State: NO COLOR (monochrome grayscale & muted contrast) */
        grayscale contrast-[0.95] opacity-75 bg-zinc-50/90 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 shadow-sm
        /* Hover State: FULL COLOR BLOOM */
        hover:grayscale-0 hover:opacity-100 hover:bg-white dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white hover:shadow-xl hover:shadow-slate-300/40 dark:hover:shadow-black/70 hover:-translate-y-1 sm:hover:-translate-y-1.5 ${review.accent.border}
        transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden`}
    >
      {/* Top Accent Beam (Lights up on hover) */}
      <div
        className={`absolute top-0 inset-x-0 h-[2px] sm:h-[2.5px] bg-gradient-to-r from-transparent ${review.accent.line} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Ambient Radial Hover Glow */}
      <div className="absolute -top-10 -right-10 sm:-top-12 sm:-right-12 w-20 sm:w-28 h-20 sm:h-28 bg-current opacity-0 group-hover:opacity-[0.04] rounded-full blur-xl pointer-events-none transition-opacity duration-300" />

      {/* Top Meta: Stars & Project Tag */}
      <div>
        <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-4">
          {/* Rating Stars: Muted default, Gold on hover */}
          <div className="flex items-center gap-0.5">
            {[...Array(review.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 text-zinc-300 dark:text-zinc-700 fill-zinc-300 dark:fill-zinc-700 group-hover:text-amber-400 group-hover:fill-amber-400 transition-colors duration-250"
              />
            ))}
          </div>

          {/* Project Tag: Neutral default, colored on hover */}
          <span
            className={`text-[8px] xs:text-[8.5px] sm:text-[10px] md:text-[11px] font-mono tracking-tight px-1.5 py-0.5 rounded-full border border-zinc-200/90 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 ${review.accent.tagBg} transition-all duration-250 truncate max-w-[110px] xs:max-w-[125px] sm:max-w-[190px]`}
          >
            {review.project}
          </span>
        </div>

        {/* Review Quote Body */}
        <div className="relative mb-3 xs:mb-3.5 sm:mb-6">
          <Quote className="absolute -top-0.5 -left-0.5 w-3.5 h-3.5 sm:w-5 sm:h-5 text-zinc-300/60 dark:text-zinc-700/60 group-hover:text-blue-500/25 transition-colors duration-250 pointer-events-none" />
          <p className="font-['Plus_Jakarta_Sans'] text-[10px] xs:text-[11px] sm:text-[13px] md:text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-800 dark:group-hover:text-zinc-100 transition-colors duration-200 pl-3 sm:pl-4 line-clamp-3 sm:line-clamp-none">
            "{review.review}"
          </p>
        </div>
      </div>

      {/* Author Footer: Avatar + Name + Role */}
      <div className="pt-2 sm:pt-3.5 border-t border-zinc-200/60 dark:border-zinc-800/80 group-hover:border-zinc-200 dark:group-hover:border-zinc-700 flex items-center justify-between gap-2 sm:gap-3 transition-colors duration-200">
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          {/* Avatar Initials: Grey default, Vivid Gradient on hover */}
          <div
            className={`w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-bold text-[8.5px] xs:text-[9.5px] sm:text-xs md:text-[13px] flex items-center justify-center shrink-0 border border-zinc-300/80 dark:border-zinc-700/80 group-hover:bg-gradient-to-tr ${review.accent.gradient} group-hover:text-white group-hover:border-transparent group-hover:shadow-md transition-all duration-300`}
          >
            {review.avatarText}
          </div>

          <div className="min-w-0">
            <h4 className="font-['Outfit'] font-bold text-[10.5px] xs:text-[11.5px] sm:text-sm text-zinc-700 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors duration-200 truncate">
              {review.author}
            </h4>
            <p className="text-[8.5px] xs:text-[9.5px] sm:text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors duration-200 truncate">
              {review.role} · <span className="font-medium">{review.company}</span>
            </p>
          </div>
        </div>

        {/* Small Arrow indicator on hover */}
        <div className="w-4.5 h-4.5 xs:w-5 xs:h-5 sm:w-6 sm:h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-400 group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-slate-950 flex items-center justify-center shrink-0 transition-all duration-200 opacity-60 group-hover:opacity-100">
          <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </div>
      </div>
    </div>
  );
};
