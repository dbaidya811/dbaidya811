import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Code2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CapsuleNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenContact: () => void;
}

export const CapsuleNavbar: React.FC<CapsuleNavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Tech Stack' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleTabSelect = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      {/* Floating Capsule Bar */}
      <nav
        aria-label="Main Navigation"
        className="pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-4 md:px-6 py-2 rounded-full bg-black/90 backdrop-blur-md border border-zinc-800 shadow-2xl shadow-black max-w-3xl w-full mx-auto"
      >
        {/* Zone 1: Single text element Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleTabSelect('overview')}
          className="flex items-center gap-2.5 text-white hover:text-emerald-400 transition-colors group shrink-0"
        >
          <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500 transition-colors">
            <Code2 className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-white whitespace-nowrap">
            {PERSONAL_INFO.name}
          </span>
          <span className="relative flex h-2 w-2 ml-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabSelect(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-white bg-zinc-800 border border-zinc-700 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Zone 3: Action Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-black bg-white hover:bg-zinc-200 active:scale-95 rounded-full transition-all whitespace-nowrap shadow-sm"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden fixed top-18 inset-x-4 bg-black/95 backdrop-blur-xl border border-zinc-800 rounded-2xl p-4 shadow-2xl shadow-black z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex flex-col gap-1.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabSelect(tab.id)}
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-zinc-900 text-white font-semibold border border-zinc-800'
                      : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                </button>
              );
            })}
            <div className="pt-2 border-t border-zinc-850 mt-1">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-semibold text-black bg-white hover:bg-zinc-200 transition-colors"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
