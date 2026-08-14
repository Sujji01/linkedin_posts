import React, { useRef } from 'react';
import { Cpu, Clock, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ABOUT_DATA } from '../data/portfolioData';
import { useGSAP } from '@gsap/react';
import { gsap } from '../utils/gsap';

const ICONS = {
  Cpu,
  Clock,
  Layers,
  ShieldCheck,
};

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.about-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.about-paragraph',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.about-highlight-card',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="about" className="py-24 relative z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="about-header max-w-3xl mb-12">
          <div className="flex items-center gap-2.5 font-mono text-xs font-semibold text-cyanNeon tracking-widest uppercase mb-3">
            <span className="w-4 h-[1px] bg-cyanNeon shadow-glow-cyan" />
            <span>01 · Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-textMain tracking-tight">
            About <span className="text-cyanNeon">Me</span>
          </h2>
          <p className="mt-2 text-textDim text-base">
            Where I stand today, and the direction I&apos;m building toward.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Narrative Text (7 Cols) */}
          <div className="lg:col-span-7 space-y-5 text-textDim text-base leading-relaxed">
            {ABOUT_DATA.paragraphs.map((p, idx) => (
              <div
                key={idx}
                className="about-paragraph p-5 rounded-xl bg-bgPanel/60 border border-lineSoft relative group hover:border-cyanDim/50 transition-colors"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-cyanNeon/30 rounded-l group-hover:bg-cyanNeon transition-colors" />
                <p className="pl-2">
                  {p}
                </p>
              </div>
            ))}
          </div>

          {/* Right Highlights Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-textFaint mb-2">
              Key Competencies & Mindset
            </h3>
            
            {ABOUT_DATA.highlights.map((item, idx) => {
              const IconComp = ICONS[item.icon as keyof typeof ICONS] || CheckCircle2;
              return (
                <div
                  key={idx}
                  className="about-highlight-card p-4 rounded-xl bg-bgPanel border border-lineSoft hover:border-cyanDim/70 hover:bg-bgPanelHover transition-all flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyanNeon/10 border border-cyanDim flex items-center justify-center text-cyanNeon shrink-0 group-hover:scale-105 group-hover:shadow-glow-cyan transition-all">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-display font-semibold text-textMain group-hover:text-cyanNeon transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-textDim mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
