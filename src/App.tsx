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
  ReachoutSection,
  ContactModal,
  BackToTop,
  MeetingPage,
  LicenseModal,
} from './components';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'meeting'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#meeting' || hash === '#book' || hash === '#booking') {
        return 'meeting';
      }
    }
    return 'home';
  });
  const [activeItem, setActiveItem] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#meeting' || hash === '#book' || hash === '#booking') {
        return 'Book Call';
      }
    }
    return 'Home';
  });
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [licenseModalOpen, setLicenseModalOpen] = useState<boolean>(false);
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

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#meeting' || hash === '#book' || hash === '#booking') {
        setCurrentView('meeting');
        setActiveItem('Book Call');
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navItems = ['Home', 'Capabilities', 'Projects', 'Reviews', 'Book Call'];

  const scrollToSection = (id: string) => {
    setActiveItem(id);
    if (id === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'Projects') {
      const el = document.getElementById('Projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'Reviews') {
      const el = document.getElementById('Reviews');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById('Capabilities');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (id: string) => {
    if (id === 'Book Call' || id === 'Meeting' || id === 'Schedule' || id === 'Book a Call') {
      setCurrentView('meeting');
      setActiveItem('Book Call');
      window.location.hash = 'meeting';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentView === 'meeting') {
      setCurrentView('home');
      window.location.hash = '';
      setTimeout(() => {
        scrollToSection(id);
      }, 80);
    } else {
      scrollToSection(id);
    }
  };

  const activeNavItem =
    currentView === 'meeting'
      ? 'Book Call'
      : activeItem;

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 relative flex flex-col selection:bg-blue-600 selection:text-white overflow-x-hidden font-sans p-[5px] transition-colors duration-300">
      {/* 1. FLOATING CAPSULE NAVBAR WITH THEME TOGGLE */}
      <Navbar
        navItems={navItems}
        activeItem={activeNavItem}
        onNavigate={handleNavigate}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {currentView === 'meeting' ? (
        <MeetingPage
          onBackToHome={() => handleNavigate('Home')}
          onOpenLicense={() => setLicenseModalOpen(true)}
        />
      ) : (
        <>
          {/* 2. HERO CONTAINER */}
          <Hero />

          {/* 3. CAPABILITIES / SEMI-CIRCLE 5-CARD DECK */}
          <CapabilitiesSection
            activeCardIndex={activeCardIndex}
            setActiveCardIndex={setActiveCardIndex}
            screenWidth={screenWidth}
            isMobile={isMobile}
          />

          {/* 4. FEATURED PROJECTS SECTION */}
          <ProjectsSection />

          {/* 5. WORK REVIEWS SECTION (Dual-Row Scroll-Linked Testimonials) */}
          <WorkReviewsSection />

          {/* 6. #5227FF REACHOUT BOX (Say Hello & Social Media Icons) */}
          <ReachoutSection
            onOpenMeeting={() => handleNavigate('Meeting')}
          />

          {/* 8. CONTACT MODAL DIALOG (Optional quick popup trigger) */}
          <ContactModal
            isOpen={contactModalOpen}
            onClose={() => setContactModalOpen(false)}
          />

          {/* 9. FLOATING 'BACK TO TOP' BUTTON */}
          <BackToTop
            threshold={380}
            onScrollTop={() => setActiveItem('Home')}
          />
        </>
      )}

      {/* GLOBAL LICENSE MODAL */}
      <LicenseModal
        isOpen={licenseModalOpen}
        onClose={() => setLicenseModalOpen(false)}
      />
    </div>
  );
}
