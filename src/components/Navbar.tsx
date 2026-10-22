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
  ChevronRight,
  Sparkles,
  ExternalLink,
  BookOpen
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

// All sections for the full drawer navigation
const ALL_NAV_ITEMS: NavItem[] = [
  { number: '01', label: 'About', href: '#about', icon: User },
  { number: '02', label: 'Skills', href: '#skills', icon: Cpu },
  { number: '03', label: 'Experience', href: '#experience', icon: Briefcase },
  { number: '04', label: 'Projects', href: '#projects', icon: Layers },
  { number: '05', label: 'PD Flow', href: '#flow', icon: Activity },
  { number: '06', label: 'Training Handbook', href: '#training', icon: BookOpen },
  { number: '07', label: 'Education', href: '#education', icon: GraduationCap },
  { number: '08', label: 'Activities', href: '#activities', icon: Trophy },
  { number: '09', label: 'Contact', href: '#contact', icon: Mail },
];

// Clean, compact desktop navbar items to prevent any horizontal collision
const DESKTOP_NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'PD Flow', href: '#flow' },
  { label: 'Training', href: '#training' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onOpenResume?: () => void;
  onOpenRecruiter?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenResume, 
  onOpenRecruiter 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Precise scroll position tracking and active section highlighting (throttled with rAF)
  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // When near top (Hero section), no internal section is active
      if (scrollY < 240) {
        setActiveSection('');
        ticking = false;
        return;
      }

      // Bottom of page detection -> highlight Contact
      if (windowHeight + scrollY >= docHeight - 80) {
        setActiveSection('contact');
        ticking = false;
        return;
      }

      const sections = ALL_NAV_ITEMS.map((item) => item.href.substring(1));

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.4) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScroll);
      }
    };

    updateScroll();
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

  // Accurate smooth scrolling with fixed header offset compensation
  const handleNavClick = (href: string) => {
    setSideDrawerOpen(false);
    if (href === '#' || href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 76;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - headerOffset),
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Fixed Navigation Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-bgDark/90 backdrop-blur-md border-b border-line shadow-lg shadow-black/25 py-2.5 sm:py-3'
            : 'bg-transparent border-b border-transparent py-3.5 sm:py-5'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          
          {/* Brand Logo (Left) */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 font-mono font-bold text-sm tracking-wider text-textMain group shrink-0"
            title="Scroll to top"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-bgPanel border border-cyanDim flex items-center justify-center group-hover:border-cyanNeon group-hover:shadow-glow-cyan/20 transition-all shadow-sm">
              <img
                src="/sp-logo.png"
                alt="SP Logo"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="tracking-widest">
              SUJITH<span className="text-cyanNeon">.PD</span>
            </span>
          </a>

          {/* Desktop Nav Links (Visible on >= lg screens, perfectly sized) */}
          <div className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 px-1 min-w-0">
            {DESKTOP_NAV_ITEMS.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`font-mono text-xs uppercase tracking-wider transition-all duration-200 px-2.5 xl:px-3 py-1.5 rounded-lg relative whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-cyanNeon font-semibold bg-cyanNeon/10 shadow-sm shadow-cyanNeon/10'
                      : 'text-textDim hover:text-cyanNeon hover:bg-bgPanel/60'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-cyanNeon rounded-full shadow-glow-cyan" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Theme Toggle Switch */}
            <ThemeToggleSwitch />

            {/* Recruiter Fast Track CTA (desktop xl+) */}
            {onOpenRecruiter && (
              <button
                onClick={onOpenRecruiter}
                className="hidden xl:inline-flex items-center gap-1.5 font-mono text-xs text-amberWarn bg-amberWarn/10 border border-amberWarn/30 hover:bg-amberWarn/20 hover:border-amberWarn px-2.5 py-1.5 rounded-lg transition-all font-semibold cursor-pointer shrink-0"
                title="60-Second Recruiter Fast Track"
              >
                <Sparkles className="w-3.5 h-3.5 text-amberWarn" />
                <span>Recruiter View</span>
              </button>
            )}

            {/* Resume Button */}
            {onOpenResume ? (
              <button
                onClick={onOpenResume}
                className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-textDim hover:text-cyanNeon hover:border-cyanNeon px-3 py-1.5 rounded-lg border border-line hover:border-lineSoft transition-colors bg-bgPanel/50 cursor-pointer shrink-0"
                title="Preview Resume"
              >
                <Download className="w-3.5 h-3.5 text-cyanNeon" />
                <span>Resume</span>
              </button>
            ) : (
              <a
                href={PERSONAL_INFO.resumePath}
                download
                className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-textDim hover:text-textMain px-3 py-1.5 rounded-lg border border-line hover:border-lineSoft transition-colors bg-bgPanel/50 shrink-0"
              >
                <Download className="w-3.5 h-3.5 text-cyanNeon" />
                <span>CV</span>
              </a>
            )}

            {/* Hire Me CTA (hidden on small mobile to ensure zero overlap) */}
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hidden md:inline-flex items-center gap-1.5 font-mono text-xs text-cyanNeon bg-cyanNeon/10 border border-cyanDim hover:bg-cyanNeon/20 hover:border-cyanNeon px-3.5 py-1.5 rounded-lg transition-all shadow-sm shadow-cyanNeon/10 font-semibold shrink-0"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Hire Me</span>
            </a>

            {/* Mobile Recruiter Fast Track Sparkle (< xl) */}
            {onOpenRecruiter && (
              <button
                onClick={onOpenRecruiter}
                className="xl:hidden p-1.5 rounded-lg bg-amberWarn/10 border border-amberWarn/30 text-amberWarn font-mono text-xs cursor-pointer hover:bg-amberWarn/20 transition-colors"
                title="Recruiter Fast Track (60s)"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Mobile / Tablet Drawer Toggle Button (< lg screens) */}
            <button
              onClick={() => setSideDrawerOpen(true)}
              className="lg:hidden p-2 text-cyanNeon border border-cyanDim/70 rounded-lg bg-bgPanel hover:bg-cyanNeon/10 transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

        </nav>
      </header>

      {/* Side-Expanding Navigation Drawer Overlay */}
      {sideDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop Blur */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
            onClick={() => setSideDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-In Sidebar Panel */}
          <div className="relative w-full max-w-sm sm:max-w-md bg-bgPanel2 border-l border-cyanDim/50 h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyanNeon via-greenNeon to-amberWarn" />

            {/* Drawer Top Content */}
            <div>
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-line flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg overflow-hidden bg-bgDark border border-cyanDim flex items-center justify-center shadow-sm">
                    <img
                      src="/sp-logo.png"
                      alt="SP Logo"
                      className="w-full h-full object-cover"
                    />
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
              <div className="mx-5 sm:mx-6 mt-4 p-3 rounded-xl bg-bgDark/80 border border-line flex items-center justify-between text-xs font-mono">
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
              <div className="px-3 sm:px-4 py-4 space-y-1">
                <div className="px-3 pb-2 font-mono text-[10px] uppercase tracking-widest text-textFaint">
                  All Sections
                </div>
                {ALL_NAV_ITEMS.map((item) => {
                  const IconComponent = item.icon;
                  const sectionId = item.href.substring(1);
                  const isActive = activeSection === sectionId;

                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-mono text-xs transition-all group cursor-pointer ${
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
            <div className="p-5 sm:p-6 border-t border-line bg-bgDark/50 space-y-3">
              {/* Recruiter Fast Track Button */}
              {onOpenRecruiter && (
                <button
                  onClick={() => {
                    setSideDrawerOpen(false);
                    onOpenRecruiter();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-amberWarn/40 bg-amberWarn/10 text-amberWarn font-mono text-xs font-semibold cursor-pointer hover:bg-amberWarn/20 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amberWarn" />
                  <span>⚡ Recruiter Fast Track (60s)</span>
                </button>
              )}

              {/* Action Buttons: Resume & Hire Me */}
              <div className="grid grid-cols-2 gap-3">
                {onOpenResume ? (
                  <button
                    onClick={() => {
                      setSideDrawerOpen(false);
                      onOpenResume();
                    }}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-line bg-bgPanel hover:border-cyanDim text-textMain font-mono text-xs font-semibold transition-all hover:bg-cyanNeon/5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-cyanNeon" />
                    <span>Resume</span>
                  </button>
                ) : (
                  <a
                    href={PERSONAL_INFO.resumePath}
                    download
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-line bg-bgPanel hover:border-cyanDim text-textMain font-mono text-xs font-semibold transition-all hover:bg-cyanNeon/5"
                  >
                    <Download className="w-3.5 h-3.5 text-cyanNeon" />
                    <span>Resume</span>
                  </a>
                )}

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
