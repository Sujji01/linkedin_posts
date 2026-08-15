import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Download, 
  Mail, 
  Cpu, 
  User, 
  Briefcase, 
  Layers, 
  GraduationCap, 
  Trophy, 
  Activity, 
  BookOpen, 
  Target, 
  ChevronRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeToggleSwitch } from './ThemeToggleSwitch';
import { LinkedInIcon } from './Icons';

interface NavItem {
  number: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
}

const NAV_ITEMS: NavItem[] = [
  { number: '01', label: 'About', href: '#about', icon: User },
  { number: '02', label: 'Skills', href: '#skills', icon: Cpu },
  { number: '03', label: 'Experience', href: '#experience', icon: Briefcase },
  { number: '04', label: 'Projects', href: '#projects', icon: Layers },
  { number: '05', label: 'Education', href: '#education', icon: GraduationCap },
  { number: '06', label: 'Activities', href: '#activities', icon: Trophy },
  { number: '07', label: 'PD Flow', href: '#flow', icon: Activity, tag: 'Interactive' },
  { number: '08', label: 'Focus Areas', href: '#knowledge', icon: Target },
  { number: '09', label: 'Articles', href: '#blog', icon: BookOpen, tag: 'New' },
  { number: '10', label: 'Contact', href: '#contact', icon: Mail },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  // Track active section and header scroll styling with high precision
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Bottom of page detection -> highlight Contact
      if (windowHeight + scrollY >= docHeight - 80) {
        setActiveSection('contact');
        return;
      }

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active when section top enters viewport upper area
          if (rect.top <= windowHeight * 0.38) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    // Run once on load to set correct initial active section
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and handle Escape key when side drawer is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSideDrawerOpen(false);
    };

    if (sideDrawerOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sideDrawerOpen]);

  const handleNavClick = (href: string) => {
    setSideDrawerOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Fixed Navigation Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-bgDark/85 backdrop-blur-md border-b border-line shadow-lg shadow-black/20 py-3.5'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo (Left) */}
          <a
            href="#"
            className="flex items-center gap-2.5 font-mono font-bold text-sm tracking-wider text-textMain group flex-shrink-0"
          >
            <div className="w-7 h-7 rounded-md bg-bgPanel border border-cyanDim flex items-center justify-center group-hover:border-cyanNeon transition-colors shadow-sm">
              <Cpu className="w-4 h-4 text-cyanNeon group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <span className="tracking-widest">
              SUJITH<span className="text-cyanNeon">.PD</span>
            </span>
          </a>

          {/* Desktop Nav Links (Centered with Balanced Proportions) */}
          <div className="hidden xl:flex items-center justify-center flex-1 gap-3 2xl:gap-4.5 px-2 min-w-0">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;
              const displayLabel = item.label === 'Focus Areas' ? 'Focus' : item.label;

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`font-mono text-[11px] 2xl:text-xs uppercase tracking-wider transition-all duration-200 py-1 relative flex items-center gap-1 whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'text-cyanNeon font-semibold'
                      : 'text-textDim hover:text-cyanNeon'
                  }`}
                >
                  <span>{displayLabel}</span>
                  {item.tag && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-cyanNeon/10 text-cyanNeon border border-cyanDim/40 font-mono">
                      {item.tag}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyanNeon rounded-full shadow-glow-cyan" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-2.5 2xl:gap-3 flex-shrink-0">
            {/* Theme Toggle Switch */}
            <ThemeToggleSwitch />

            {/* CV Download */}
            <a
              href={PERSONAL_INFO.resumePath}
              download
              className="flex items-center gap-1.5 font-mono text-xs text-textDim hover:text-textMain px-3 py-1.5 rounded border border-line hover:border-lineSoft transition-colors bg-bgPanel/50"
            >
              <Download className="w-3.5 h-3.5 text-cyanNeon" />
              <span>CV</span>
            </a>

            {/* Hire Me CTA */}
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-1.5 font-mono text-xs text-cyanNeon bg-cyanNeon/10 border border-cyanDim hover:bg-cyanNeon/20 hover:border-cyanNeon px-3.5 py-1.5 rounded-md transition-all shadow-sm shadow-cyanNeon/10"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Hire Me</span>
            </a>

            {/* Drawer Toggle for Tablet (< xl) */}
            <button
              onClick={() => setSideDrawerOpen(true)}
              className="xl:hidden p-2 text-cyanNeon border border-cyanDim/60 rounded-md bg-bgPanel hover:bg-cyanNeon/10 transition-colors ml-1"
              aria-label="Open side menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Right Controls (< sm) */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggleSwitch />
            <button
              onClick={() => setSideDrawerOpen(true)}
              className="p-2 text-cyanNeon border border-cyanDim/60 rounded-md bg-bgPanel hover:bg-cyanNeon/10 transition-colors"
              aria-label="Open side menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Side-Expanding Sidebar Drawer Overlay */}
      {sideDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
            onClick={() => setSideDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-In Sidebar Panel */}
          <div className="relative w-full max-w-md bg-bgPanel2 border-l border-cyanDim/50 h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyanNeon via-greenNeon to-amberWarn" />

            {/* Drawer Header */}
            <div>
              <div className="p-6 border-b border-line flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-bgDark border border-cyanDim flex items-center justify-center text-cyanNeon shadow-sm">
                    <Cpu className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-textMain tracking-wide">
                      SUJITH POLISETTY
                    </h3>
                    <p className="font-mono text-[11px] text-cyanNeon flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-greenNeon animate-ping" />
                      Physical Design Engineer
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSideDrawerOpen(false)}
                  className="p-2 rounded-lg bg-bgDark border border-line text-textDim hover:text-cyanNeon hover:border-cyanNeon transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Badge */}
              <div className="mx-6 mt-4 p-3 rounded-xl bg-bgDark/80 border border-line flex items-center justify-between text-xs font-mono">
                <span className="text-textDim flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyanNeon" />
                  Status:
                </span>
                <span className="text-greenNeon font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-greenNeon" />
                  Available for Roles
                </span>
              </div>

              {/* Navigation Menu List */}
              <div className="px-4 py-4 space-y-1">
                <div className="px-3 pb-2 font-mono text-[10px] uppercase tracking-widest text-textFaint">
                  Quick Navigation
                </div>
                {NAV_ITEMS.map((item) => {
                  const IconComponent = item.icon;
                  const sectionId = item.href.substring(1);
                  const isActive = activeSection === sectionId;

                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-mono text-xs transition-all group ${
                        isActive
                          ? 'bg-cyanNeon/15 text-cyanNeon border border-cyanNeon/60 font-semibold shadow-sm shadow-cyanNeon/10'
                          : 'text-textDim hover:text-textMain hover:bg-bgDark/70 hover:border-line border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-[11px] font-mono ${isActive ? 'text-cyanNeon' : 'text-textFaint'}`}>
                          {item.number}
                        </span>
                        <div className={`p-1.5 rounded-md ${isActive ? 'bg-cyanNeon/20 text-cyanNeon' : 'bg-bgDark text-textDim group-hover:text-cyanNeon group-hover:border-cyanDim/50'} border border-line transition-colors`}>
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-medium tracking-wide">{item.label}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.tag && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyanNeon/10 text-cyanNeon border border-cyanDim/50 font-mono">
                            {item.tag}
                          </span>
                        )}
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-cyanNeon translate-x-0.5' : 'text-textFaint group-hover:translate-x-1 group-hover:text-cyanNeon'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drawer Footer Actions & Socials */}
            <div className="p-6 border-t border-line bg-bgDark/50 space-y-4">
              {/* Theme Toggle Bar */}
              <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-bgPanel border border-line">
                <span className="font-mono text-xs text-textDim">Theme Mode</span>
                <ThemeToggleSwitch showLabel />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PERSONAL_INFO.resumePath}
                  download
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-line bg-bgPanel hover:border-cyanDim text-textMain font-mono text-xs font-semibold transition-all hover:bg-cyanNeon/5"
                >
                  <Download className="w-3.5 h-3.5 text-cyanNeon" />
                  <span>Resume</span>
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-cyanDim bg-cyanNeon/10 hover:bg-cyanNeon/20 text-cyanNeon font-mono text-xs font-semibold transition-all shadow-sm shadow-cyanNeon/10"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Hire Me</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="pt-2 flex items-center justify-between text-xs font-mono text-textFaint">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-textDim hover:text-cyanNeon transition-colors"
                >
                  <LinkedInIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <span>Bangalore, IN</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

