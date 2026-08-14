import React, { useRef } from 'react';
import { STATS_DATA } from '../data/portfolioData';
import { useGSAP } from '@gsap/react';
import { gsap } from '../utils/gsap';

export const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.stats-header',
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
        '.stat-card-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
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

      // Animated numeric counters on scroll trigger
      const countElements = document.querySelectorAll('.stat-counter-val');
      countElements.forEach((el) => {
        const targetVal = el.getAttribute('data-target');
        if (!targetVal) return;

        // Check if numeric with optional suffix
        const numericMatch = targetVal.match(/^(\d+)(.*)$/);
        if (numericMatch) {
          const num = parseInt(numericMatch[1], 10);
          const suffix = numericMatch[2];
          const obj = { val: 0 };

          gsap.to(obj, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
            val: num,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = `${Math.floor(obj.val)}${suffix}`;
            },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="achievements" className="py-24 relative z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="stats-header max-w-3xl mb-12">
          <div className="flex items-center gap-2.5 font-mono text-xs font-semibold text-cyanNeon tracking-widest uppercase mb-3">
            <span className="w-4 h-[1px] bg-cyanNeon shadow-glow-cyan" />
            <span>09 · By the Numbers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-textMain tracking-tight">
            Key <span className="text-cyanNeon">Achievements</span>
          </h2>
          <p className="mt-2 text-textDim text-base">
            Measurable physical design metrics and milestones from hands-on training projects.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {STATS_DATA.map((stat, idx) => {
            return (
              <div
                key={idx}
                className="stat-card-item rounded-xl bg-bgPanel border border-lineSoft p-6 text-center hover:border-cyanDim transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md hover:shadow-cyanNeon/10"
              >
                <div
                  data-target={stat.number}
                  className={`stat-counter-val font-mono text-4xl sm:text-5xl font-bold mb-3 tracking-tight ${
                    stat.accent === 'green'
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-greenNeon to-[#6ee7b7]'
                      : stat.accent === 'amber'
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-amberWarn to-[#fcd34d]'
                      : 'text-transparent bg-clip-text bg-gradient-to-r from-cyanNeon to-[#67e8f9]'
                  }`}
                >
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-textDim leading-snug group-hover:text-textMain transition-colors">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
