import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Mail, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeToggleSwitch } from './ThemeToggleSwitch';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Activities', href: '#activities' },
  { label: 'PD Flow', href: '#flow' },
  { label: 'Articles', href: '#blog' },
  { label: 'Focus', href: '#knowledge' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section detection
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-bgDark/85 backdrop-blur-md border-b border-line shadow-lg shadow-black/20 py-3.5'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 font-mono font-bold text-sm tracking-wider text-textMain group"
        >
          <div className="w-7 h-7 rounded-md bg-bgPanel border border-cyanDim flex items-center justify-center group-hover:border-cyanNeon transition-colors shadow-sm">
            <Cpu className="w-4 h-4 text-cyanNeon group-hover:rotate-45 transition-transform duration-300" />
          </div>
          <span className="tracking-widest">
            SUJITH<span className="text-cyanNeon">.PD</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className={`font-mono text-xs uppercase tracking-widest transition-all duration-200 py-1 relative ${
                  isActive
                    ? 'text-cyanNeon font-semibold'
                    : 'text-textDim hover:text-cyanNeon'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyanNeon rounded-full shadow-glow-cyan" />
                )}
              </button>
            );
          })}
        </div>

        {/* Desktop Actions & Theme Toggle Switch */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Slider Switch */}
          <ThemeToggleSwitch />

          <a
            href={PERSONAL_INFO.resumePath}
            download
            className="flex items-center gap-1.5 font-mono text-xs text-textDim hover:text-textMain px-3 py-1.5 rounded border border-line hover:border-lineSoft transition-colors bg-bgPanel/50"
          >
            <Download className="w-3.5 h-3.5 text-cyanNeon" />
            <span>CV</span>
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-1.5 font-mono text-xs text-cyanNeon bg-cyanNeon/10 border border-cyanDim hover:bg-cyanNeon/20 hover:border-cyanNeon px-3.5 py-1.5 rounded-md transition-all shadow-sm shadow-cyanNeon/10"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Hire Me</span>
          </a>
        </div>

        {/* Mobile menu controls */}
        <div className="flex sm:hidden items-center gap-2.5">
          <ThemeToggleSwitch />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-textDim hover:text-textMain border border-line rounded-md bg-bgPanel"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-bgPanel/95 backdrop-blur-xl border-b border-line px-6 py-5 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between py-2 border-b border-line/40">
              <span className="font-mono text-xs uppercase tracking-widest text-textDim">Theme Mode</span>
              <ThemeToggleSwitch showLabel />
            </div>

            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-left font-mono text-xs uppercase tracking-widest text-textDim hover:text-cyanNeon py-2 border-b border-line/40 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="flex gap-3 pt-3">
              <a
                href={PERSONAL_INFO.resumePath}
                download
                className="flex-1 flex items-center justify-center gap-2 font-mono text-xs text-textMain py-2 rounded border border-line bg-bgDark"
              >
                <Download className="w-3.5 h-3.5 text-cyanNeon" />
                <span>Resume</span>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex-1 flex items-center justify-center gap-2 font-mono text-xs text-cyanNeon py-2 rounded border border-cyanDim bg-cyanNeon/10"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Hire Me</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
