/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, Hero, CapabilitiesSection, ContactModal } from './components';

export default function App() {
  const [activeItem, setActiveItem] = useState<string>('Home');
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(2);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = ['Home', 'Capabilities', 'Contact'];

  const handleNavigate = (id: string) => {
    setActiveItem(id);
    if (id === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'Contact' || id === 'Hire Me') {
      setContactModalOpen(true);
    } else {
      const el = document.getElementById('Capabilities');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-zinc-900 relative flex flex-col selection:bg-blue-600 selection:text-white overflow-x-hidden font-sans p-[5px]">
      {/* 1. FLOATING CAPSULE NAVBAR */}
      <Navbar
        navItems={navItems}
        activeItem={activeItem}
        onNavigate={handleNavigate}
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

      {/* 4. CONTACT MODAL DIALOG */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}
