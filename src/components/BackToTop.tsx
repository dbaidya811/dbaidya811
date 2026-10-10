import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

interface BackToTopProps {
  threshold?: number;
  onScrollTop?: () => void;
}

export const BackToTop: React.FC<BackToTopProps> = ({ threshold = 400, onScrollTop }) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal button only after scrolling past the hero section threshold
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onScrollTop?.();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          aria-label="Back to top"
          className="fixed bottom-8 xs:bottom-10 sm:bottom-12 md:bottom-14 right-4 sm:right-6 md:right-8 z-40 group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-950/90 dark:bg-zinc-900/90 hover:bg-slate-950 dark:hover:bg-zinc-800 text-white backdrop-blur-md border border-white/20 dark:border-white/10 shadow-xl shadow-slate-950/30 dark:shadow-black/60 cursor-pointer select-none transition-colors"
        >
          <ArrowUp className="w-5 h-5 text-white transition-transform duration-200 group-hover:-translate-y-1" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
