import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  navItems: string[];
  activeItem: string;
  onNavigate: (item: string) => void;
  theme?: 'light' | 'dark';
  toggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  navItems,
  activeItem,
  onNavigate,
  theme = 'light',
  toggleTheme,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleItemClick = (item: string) => {
    setMobileMenuOpen(false);
    onNavigate(item);
  };

  return (
    <header className="fixed top-2.5 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
      <div className="flex items-center gap-[10px] w-full max-w-[340px] md:w-auto md:max-w-none justify-center">
        <motion.nav
          initial={{ y: -50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          aria-label="Capsule Navigation"
          className="pointer-events-auto relative flex items-center justify-between md:justify-center w-full md:w-auto gap-2 sm:gap-3 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/65 dark:bg-zinc-950/80 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-xl sm:shadow-2xl text-white"
        >
          {/* Brand Name */}
          <motion.button
            type="button"
            onClick={() => handleItemClick('Home')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative px-2 py-1 text-xs sm:text-sm font-semibold tracking-tight text-white hover:text-zinc-200 transition-colors whitespace-nowrap z-10 shrink-0 cursor-pointer"
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
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap z-10 cursor-pointer ${
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
            {/* Removed - no longer needed */}
          </div>

          {/* Mobile Right Controls: Hamburger Toggle */}
          <div className="flex md:hidden items-center shrink-0">
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="flex items-center justify-center w-7.5 h-7.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/20 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </motion.button>
          </div>
        </motion.nav>

        {/* Desktop Theme Switcher - Right beside Navbar with exactly 10px gap */}
        {toggleTheme && (
          <motion.button
            type="button"
            onClick={toggleTheme}
            initial={{ y: -50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="pointer-events-auto hidden md:flex items-center justify-center shrink-0 w-9 h-9 rounded-full bg-black/65 dark:bg-zinc-950/80 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-xl sm:shadow-2xl text-white hover:bg-black/80 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-center"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-300" />
                ) : (
                  <Moon className="w-4 h-4 text-sky-200" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        )}
      </div>

      {/* Mobile Dropdown Menu with Spring Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="pointer-events-auto md:hidden fixed top-12 sm:top-16 inset-x-3 sm:inset-x-4 bg-black/95 dark:bg-zinc-950/95 backdrop-blur-xl border border-white/15 rounded-2xl p-2.5 sm:p-3 shadow-2xl shadow-black z-50 max-w-sm mx-auto text-white"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeItem === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleItemClick(item)}
                    className={`flex items-center justify-between w-full px-3.5 py-2 rounded-xl text-left text-xs font-medium transition-colors cursor-pointer ${
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

              {/* Theme Toggle inside Mobile Dropdown */}
              {toggleTheme && (
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl text-left text-xs font-medium text-zinc-200 hover:bg-white/10 hover:text-white transition-colors cursor-pointer border-t border-white/10 mt-1 pt-2.5"
                >
                  <span className="flex items-center gap-2">
                    {theme === 'dark' ? (
                      <Sun className="w-3.5 h-3.5 text-amber-300" />
                    ) : (
                      <Moon className="w-3.5 h-3.5 text-sky-200" />
                    )}
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/15 text-zinc-100">
                    Switch to {theme === 'dark' ? 'Light' : 'Dark'}
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
