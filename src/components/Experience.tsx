import React, { useRef } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Terminal } from 'lucide-react';
import { EXPERIENCE_DATA } from '../data/portfolioData';
import { useGSAP } from '@gsap/react';
import { gsap } from '../utils/gsap';

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.exp-header',
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
        '.exp-timeline-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.7,
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
    <section ref={sectionRef} id="experience" className="py-24 relative z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="exp-header max-w-3xl mb-12">
          <div className="flex items-center gap-2.5 font-mono text-xs font-semibold text-cyanNeon tracking-widest uppercase mb-3">
            <span className="w-4 h-[1px] bg-cyanNeon shadow-glow-cyan" />
            <span>03 · Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-textMain tracking-tight">
            Experience &amp; <span className="text-cyanNeon">Training</span>
          </h2>
          <p className="mt-2 text-textDim text-base">
            Hands‑on training in a production‑style physical design and ASIC tape-out environment.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative pl-6 sm:pl-10 space-y-12">
          
          {/* Vertical Glowing Line */}
          <div
            ref={lineRef}
            className="absolute left-[11px] sm:left-[19px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-cyanNeon via-greenNeon to-line"
          />

          {EXPERIENCE_DATA.map((item) => (
            <div key={item.id} className="relative group">
              
              {/* Pulsing Node Dot */}
              <div className="absolute -left-[30px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-bgDark border-2 border-cyanNeon flex items-center justify-center shadow-glow-cyan">
                <span className="w-2 h-2 rounded-full bg-greenNeon animate-pulse" />
              </div>

              {/* Experience Card */}
              <div className="exp-timeline-card bg-bgPanel border border-lineSoft rounded-xl p-6 sm:p-8 hover:border-cyanDim transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:shadow-cyanNeon/10">
                
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-greenNeon bg-greenNeon/10 border border-greenNeon/30 px-2.5 py-1 rounded-full mb-2">
                      <Calendar className="w-3 h-3" />
                      {item.period}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-textMain">
                      {item.role}
                    </h3>
                  </div>

                  <div className="text-right">
                    <div className="font-mono text-sm text-cyanNeon font-medium flex items-center gap-1.5 justify-start sm:justify-end">
                      <Briefcase className="w-4 h-4 text-cyanNeon" />
                      <span>{item.company}</span>
                    </div>
                    <div className="font-mono text-xs text-textFaint flex items-center gap-1 mt-1 justify-start sm:justify-end">
                      <MapPin className="w-3.5 h-3.5 text-textFaint" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Bullet Points */}
                <div className="space-y-3 mb-6">
                  {item.bulletPoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyanNeon shrink-0 mt-1" />
                      <p className="text-sm sm:text-base text-textDim leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tools Applied */}
                <div className="pt-4 border-t border-line/60 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-textFaint flex items-center gap-1 mr-2">
                    <Terminal className="w-3.5 h-3.5 text-cyanNeon" />
                    Stack &amp; EDA:
                  </span>
                  {item.toolsUsed.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono text-xs px-2.5 py-1 rounded bg-bgDark border border-line text-textDim"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};
