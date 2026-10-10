/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Hero,
  CapabilitiesSection,
  ProjectsSection,
  WorkReviewsSection,
  ContactModal,
} from './components';

export default function App() {
  const [activeItem, setActiveItem] = useState<string>('Home');
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(2);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Theme State: 'light' | 'dark' with persistence
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = ['Home', 'Capabilities', 'Projects', 'Reviews', 'Contact'];

  const handleNavigate = (id: string) => {
    setActiveItem(id);
    if (id === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'Contact' || id === 'Hire Me') {
      setContactModalOpen(true);
    } else if (id === 'Projects') {
      const el = document.getElementById('Projects');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (id === 'Reviews') {
      const el = document.getElementById('Reviews');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const el = document.getElementById('Capabilities');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 relative flex flex-col selection:bg-blue-600 selection:text-white overflow-x-hidden font-sans p-[5px] transition-colors duration-300">
      {/* 1. FLOATING CAPSULE NAVBAR WITH THEME TOGGLE */}
      <Navbar
        navItems={navItems}
        activeItem={activeItem}
        onNavigate={handleNavigate}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* 2. HERO CONTAINER */}
      <Hero onOpenContact={() => setContactModalOpen(true)} />

      {/* 3. CAPABILITIES / SEMI-CIRCLE 5-CARD DECK */}
      <CapabilitiesSection
        activeCardIndex={activeCardIndex}
        setActiveCardIndex={setActiveCardIndex}
        screenWidth={screenWidth}
        isMobile={isMobile}
      />

      {/* 4. FEATURED PROJECTS SECTION (Manchitra, Drishti AI, VahanFlow) */}
      <ProjectsSection onOpenContact={() => setContactModalOpen(true)} />

      {/* 5. WORK REVIEWS SECTION (Dual-Row Scroll-Linked Testimonials) */}
      <WorkReviewsSection onOpenContact={() => setContactModalOpen(true)} />

      {/* 6. CONTACT MODAL DIALOG */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}
