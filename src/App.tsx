/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeItem, setActiveItem] = useState<string>('Home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navItems = ['Home', 'About', 'Projects', 'Skills', 'Contact'];

  return (
    <div className="min-h-screen w-screen bg-black text-white relative flex flex-col items-center justify-center selection:bg-white selection:text-black">
      {/* FLOATING CAPSULE NAVBAR WITH SMOOTH SPRING & SLIDING PILL ANIMATION */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          aria-label="Capsule Navigation"
          className="pointer-events-auto relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-zinc-950/85 backdrop-blur-xl border border-zinc-800 shadow-2xl shadow-black"
        >
          {/* Brand Name */}
          <motion.button
            type="button"
            onClick={() => setActiveItem('Home')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative px-3.5 py-1.5 text-xs sm:text-sm font-semibold tracking-tight text-white hover:text-zinc-200 transition-colors whitespace-nowrap z-10"
          >
            Deep Baidya
          </motion.button>

          {/* Subtle Vertical Divider */}
          <span className="h-4 w-[1px] bg-zinc-800/80 hidden md:block" />

          {/* Desktop Navigation Links + Hire Me */}
          <div className="hidden md:flex items-center gap-1 relative">
            {navItems.map((item) => {
              const isActive = activeItem === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActiveItem(item)}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap z-10 ${
                    isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {/* Sliding Spring Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="capsuleActivePill"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-zinc-800 rounded-full -z-10 shadow-sm"
                    />
                  )}

                  {/* Subtle Hover Pill */}
                  {!isActive && hoveredItem === item && (
                    <motion.div
                      layoutId="capsuleHoverPill"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute inset-0 bg-zinc-900/60 rounded-full -z-10"
                    />
                  )}

                  <span className="relative z-10">{item}</span>
                </button>
              );
            })}

            {/* "Hire Me" Button with Animated Active State directly inside nav */}
            <motion.button
              type="button"
              onClick={() => setActiveItem('Hire Me')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`relative ml-1.5 px-4 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap shadow-sm z-10 ${
                activeItem === 'Hire Me'
                  ? 'bg-zinc-200 text-black ring-2 ring-white/40'
                  : 'bg-white text-black hover:bg-zinc-200'
              }`}
            >
              Hire Me
            </motion.button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 transition-colors ml-1"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </motion.button>
        </motion.nav>

        {/* Mobile Dropdown Menu with Spring Animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="pointer-events-auto md:hidden fixed top-20 inset-x-6 bg-zinc-950/95 backdrop-blur-xl border border-zinc-800 rounded-2xl p-3 shadow-2xl shadow-black z-50 max-w-sm mx-auto"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeItem === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setActiveItem(item);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-left text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-zinc-900 text-white font-semibold border border-zinc-800'
                          : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white'
                      }`}
                    >
                      <span>{item}</span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </button>
                  );
                })}

                {/* Hire Me in Mobile List */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveItem('Hire Me');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full py-2.5 px-4 rounded-xl text-center text-xs font-semibold transition-colors mt-1 ${
                    activeItem === 'Hire Me'
                      ? 'bg-zinc-200 text-black'
                      : 'bg-white text-black hover:bg-zinc-200'
                  }`}
                >
                  Hire Me
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* FULL BLACK SCREEN BODY */}
      <main className="w-full flex items-center justify-center p-6 text-center select-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="space-y-2"
          >
            <p className="text-zinc-600 font-mono text-xs">
              {activeItem}
            </p>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
