import React, { useRef } from 'react';
import { Maximize2, LayoutGrid, GitBranch, Route, Activity, Target, ShieldCheck, Zap } from 'lucide-react';
import { KNOWLEDGE_AREAS } from '../data/portfolioData';
import { useGSAP } from '@gsap/react';
import { gsap } from '../utils/gsap';

const ICONS = {
  Maximize2,
  LayoutGrid,
  GitBranch,
  Route,
  Activity,
  Target,
  ShieldCheck,
  Zap,
};

export const KnowledgeGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.know-header',
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
        '.know-card-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.07,
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
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="knowledge" className="py-24 relative z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="know-header max-w-3xl mb-12">
          <div className="flex items-center gap-2.5 font-mono text-xs font-semibold text-cyanNeon tracking-widest uppercase mb-3">
            <span className="w-4 h-[1px] bg-cyanNeon shadow-glow-cyan" />
            <span>08 · Focus Areas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-textMain tracking-tight">
            Technical <span className="text-cyanNeon">Knowledge</span>
          </h2>
          <p className="mt-2 text-textDim text-base">
            The core concepts and physical design methodologies I actively apply during implementation and signoff.
          </p>
        </div>

        {/* Knowledge Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {KNOWLEDGE_AREAS.map((item, idx) => {
            const IconComp = ICONS[item.iconName as keyof typeof ICONS] || Activity;
            
            const badgeColor =
              item.category === 'Stage'
                ? 'text-cyanNeon border-cyanDim/50 bg-cyanNeon/5'
                : item.category === 'Analysis'
                ? 'text-greenNeon border-greenNeon/30 bg-greenNeon/5'
                : item.category === 'Signoff'
                ? 'text-amberWarn border-amberWarn/30 bg-amberWarn/5'
                : 'text-purple-400 border-purple-500/30 bg-purple-500/5';

            return (
              <div
                key={idx}
                className="know-card-item rounded-xl bg-bgPanel border border-lineSoft p-6 flex flex-col justify-between hover:border-cyanDim transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md hover:shadow-cyanNeon/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded border ${badgeColor}`}>
                      {item.tag}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-bgDark border border-line flex items-center justify-center text-textDim group-hover:text-cyanNeon group-hover:border-cyanDim transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display font-semibold text-lg text-textMain group-hover:text-cyanNeon transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-textDim leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
