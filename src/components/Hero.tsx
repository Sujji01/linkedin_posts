import React, { useMemo, useRef } from 'react';
import { Download, ArrowRight, MapPin, Phone, Mail, Sparkles, Workflow } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { LinkedInIcon, InstagramIcon } from './Icons';
import { useGSAP } from '@gsap/react';
import { gsap } from '../utils/gsap';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dieRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  // Generate stylized IC pins around the die package
  const pins = useMemo(() => {
    const generated = [];
    const count = 10;
    const margin = 40;
    const size = 380;

    for (let side = 0; side < 4; side++) {
      for (let i = 0; i < count; i++) {
        const globalIdx = side * count + i;
        const t = (i + 0.5) / count;
        let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
        const outer = margin - 22;

        if (side === 0) { // Top
          x1 = margin + t * (size - 2 * margin);
          y1 = margin;
          x2 = x1;
          y2 = outer;
        } else if (side === 1) { // Right
          x1 = size - margin;
          y1 = margin + t * (size - 2 * margin);
          x2 = size - outer;
          y2 = y1;
        } else if (side === 2) { // Bottom
          x1 = margin + t * (size - 2 * margin);
          y1 = size - margin;
          x2 = x1;
          y2 = size - outer;
        } else { // Left
          x1 = margin;
          y1 = margin + t * (size - 2 * margin);
          x2 = outer;
          y2 = y1;
        }

        // 4-by-4 Alternating Pin Banks (Bank 0 or Bank 1 every 4 pins)
        const bank = Math.floor(globalIdx / 4) % 2;

        generated.push({
          id: `pin-${side}-${i}`,
          x1,
          y1,
          x2,
          y2,
          bank,
          initialStroke: bank === 0 ? 'rgb(var(--cyan))' : 'rgb(var(--line))',
        });
      }
    }
    return generated;
  }, []);

  useGSAP(
    () => {
      // Staggered entrance of hero elements on load
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-badge',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, clearProps: 'all' }
      )
        .fromTo(
          '.hero-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, clearProps: 'all' },
          '-=0.3'
        )
        .fromTo(
          '.hero-pipeline',
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.5, clearProps: 'all' },
          '-=0.4'
        )
        .fromTo(
          '.hero-desc',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, clearProps: 'all' },
          '-=0.3'
        )
        .fromTo(
          '.hero-ctas',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, clearProps: 'all' },
          '-=0.3'
        )
        .fromTo(
          '.hero-meta',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, clearProps: 'all' },
          '-=0.3'
        )
        .fromTo(
          dieRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out', clearProps: 'opacity,transform' },
          '-=0.7'
        );

      // Subtle slow floating animation for the silicon die
      gsap.to(dieRef.current, {
        y: -8,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Slow breathing ambient radial glow
      gsap.to('.die-ambient-glow', {
        opacity: 0.3,
        scale: 1.1,
        duration: 4.0,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Slow breathing silicon carrier border glow
      gsap.to('.die-carrier-frame', {
        borderColor: 'rgba(var(--cyan), 0.7)',
        boxShadow: '0 0 24px rgba(var(--cyan), 0.25)',
        duration: 4.0,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Slow, smooth pin leads wave glow:
      // Bank 0 (4 pins): Slow Cyan glow -> Soft Dim -> Slow Green glow -> Soft Dim
      gsap.to('.die-pin-bank-0', {
        keyframes: [
          { stroke: 'rgb(var(--cyan))', opacity: 1, filter: 'drop-shadow(0 0 8px rgba(var(--cyan), 0.85))', duration: 3.8 },
          { stroke: 'rgb(var(--line))', opacity: 0.4, filter: 'drop-shadow(0 0 2px rgba(var(--cyan), 0.2))', duration: 3.2 },
          { stroke: 'rgb(var(--green))', opacity: 0.95, filter: 'drop-shadow(0 0 8px rgba(var(--green), 0.85))', duration: 3.8 },
          { stroke: 'rgb(var(--line))', opacity: 0.4, filter: 'none', duration: 3.2 },
        ],
        repeat: -1,
        ease: 'sine.inOut',
      });

      // Bank 1 (alternate 4 pins): Soft Dim -> Slow Amber glow -> Soft Dim -> Slow Cyan glow
      gsap.to('.die-pin-bank-1', {
        keyframes: [
          { stroke: 'rgb(var(--line))', opacity: 0.4, filter: 'none', duration: 3.2 },
          { stroke: 'rgb(var(--amber))', opacity: 0.9, filter: 'drop-shadow(0 0 8px rgba(var(--amber), 0.8))', duration: 3.8 },
          { stroke: 'rgb(var(--line))', opacity: 0.4, filter: 'drop-shadow(0 0 2px rgba(var(--cyan), 0.2))', duration: 3.2 },
          { stroke: 'rgb(var(--cyan))', opacity: 1, filter: 'drop-shadow(0 0 8px rgba(var(--cyan), 0.85))', duration: 3.8 },
        ],
        repeat: -1,
        ease: 'sine.inOut',
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Details (7 Cols) */}
          <div ref={leftColRef} className="lg:col-span-7 space-y-6">
            
            {/* Status Badge */}
            <div className="hero-badge inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-greenNeon/40 bg-greenNeon/10 text-greenNeon font-mono text-xs tracking-wider uppercase backdrop-blur-md shadow-sm shadow-greenNeon/10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-greenNeon opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-greenNeon"></span>
              </span>
              <span>{PERSONAL_INFO.status}</span>
            </div>

            {/* Title & Name */}
            <div>
              <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-textMain tracking-tight leading-[1.08]">
                Sujith Polisetty
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyanNeon via-[#63e6be] to-greenNeon font-semibold">
                  Physical Design Engineer
                </span>
              </h1>
              
              {/* RTL to GDSII Flow Bar */}
              <div className="hero-pipeline mt-4 inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-cyanNeon bg-bgPanel/80 border border-lineSoft px-3.5 py-2 rounded-lg shadow-inner-chip">
                <Workflow className="w-4 h-4 text-cyanNeon shrink-0" />
                <span className="truncate">{PERSONAL_INFO.tagline}</span>
              </div>
            </div>

            {/* Description */}
            <p className="hero-desc text-textDim text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              {PERSONAL_INFO.bio}
            </p>

            {/* Action Buttons */}
            <div className="hero-ctas flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg font-mono text-xs sm:text-sm font-bold bg-gradient-to-r from-cyanNeon to-[#5be3f5] text-slate-950 hover:shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.resumePath}
                download
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg font-mono text-xs sm:text-sm font-medium text-textMain border border-line bg-bgPanel hover:border-cyanNeon hover:text-cyanNeon transition-all transform hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4 text-cyanNeon" />
                <span>Download Resume</span>
              </a>

              <a
                href="#flow"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg font-mono text-xs font-medium text-textDim hover:text-textMain border border-transparent hover:border-lineSoft transition-colors"
              >
                <Sparkles className="w-4 h-4 text-amberWarn" />
                <span>Explore PD Flow</span>
              </a>
            </div>

            {/* Quick Meta Info Pills */}
            <div className="hero-meta pt-4 flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs font-mono text-textDim border-t border-line/60">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyanNeon" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <a
                href={`tel:${PERSONAL_INFO.phoneFormatted}`}
                className="flex items-center gap-1.5 hover:text-cyanNeon transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-greenNeon" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1.5 hover:text-cyanNeon transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amberWarn" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-cyanNeon transition-colors"
              >
                <LinkedInIcon className="w-3.5 h-3.5 text-cyanNeon" />
                <span>LinkedIn ↗</span>
              </a>
              <a
                href={PERSONAL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-cyanNeon transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-cyanNeon" />
                <span>@electronics_with_AI ↗</span>
              </a>
            </div>

          </div>

          {/* Right Hero Silicon Die Package (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div
              ref={dieRef}
              className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square flex items-center justify-center"
            >
              
              {/* Outer Cyan/Green Radial Ambient Glow (Slow Breathing) */}
              <div className="die-ambient-glow absolute inset-2 rounded-3xl bg-cyanNeon/15 blur-2xl -z-10" />

              {/* Silicon Package Board Base */}
              <div className="absolute inset-3 rounded-2xl border border-line bg-gradient-to-br from-bgPanel2 via-bgPanel to-[#0a1017] shadow-2xl shadow-black/80" />

              {/* Die SVG IC Leads / Pins with 4-by-4 Alternating Color & Off Pulse */}
              <svg
                viewBox="0 0 380 380"
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {pins.map((pin) => (
                  <line
                    key={pin.id}
                    className={`die-pin-item die-pin-bank-${pin.bank}`}
                    x1={pin.x1}
                    y1={pin.y1}
                    x2={pin.x2}
                    y2={pin.y2}
                    stroke={pin.initialStroke}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{
                      transition: 'opacity 0.3s ease, filter 0.3s ease',
                    }}
                  />
                ))}
              </svg>

              {/* Silicon Core Carrier Frame (Slow Glowing Border) */}
              <div className="die-carrier-frame relative w-[78%] h-[78%] rounded-2xl border-2 border-cyanDim bg-bgDark p-2 shadow-2xl flex flex-col items-center justify-center overflow-hidden group">
                
                {/* Silicon IC Corner Reticle Marks */}
                <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-cyanNeon z-20 pointer-events-none" />
                <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-cyanNeon z-20 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-cyanNeon z-20 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-cyanNeon z-20 pointer-events-none" />

                {/* Photo Frame - Positioned with optimal headroom & centered portrait alignment */}
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-bgPanel2 border border-line flex items-center justify-center">
                  <img
                    src={PERSONAL_INFO.profileImage}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-[center_22%] scale-110 group-hover:scale-115 transition-transform duration-700"
                  />
                  
                  {/* Subtle bottom edge gradient for badge contrast only */}
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-bgDark/80 to-transparent pointer-events-none" />
                </div>

                {/* Silicon Label Badge */}
                <div className="absolute bottom-3 z-20 px-3 py-0.5 rounded-full bg-bgDark/90 backdrop-blur-md border border-cyanDim/80 flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-greenNeon animate-pulse" />
                  <span className="font-mono text-[9.5px] font-semibold text-textMain tracking-widest uppercase">
                    32NM · PHYSICAL DESIGN
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
