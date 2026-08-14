import React, { useRef } from 'react';
import { GraduationCap, Calendar, School } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';
import { useGSAP } from '@gsap/react';
import { gsap } from '../utils/gsap';

export const Education: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.edu-header',
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
        '.edu-card-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
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
    <section ref={sectionRef} id="education" className="py-24 relative z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="edu-header max-w-3xl mb-12">
          <div className="flex items-center gap-2.5 font-mono text-xs font-semibold text-cyanNeon tracking-widest uppercase mb-3">
            <span className="w-4 h-[1px] bg-cyanNeon shadow-glow-cyan" />
            <span>05 · Education</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-textMain tracking-tight">
            Academic <span className="text-cyanNeon">Background</span>
          </h2>
          <p className="mt-2 text-textDim text-base">
            The formal engineering foundation behind the physical design training.
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDUCATION_DATA.map((edu) => (
            <div
              key={edu.id}
              className="edu-card-item rounded-xl bg-bgPanel border border-lineSoft p-6 flex flex-col justify-between hover:border-cyanDim transition-all duration-300 group shadow-sm hover:shadow-md hover:shadow-cyanNeon/10"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-cyanNeon flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.year}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-bgDark border border-line flex items-center justify-center text-cyanNeon group-hover:border-cyanDim transition-colors">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-display font-semibold text-textMain group-hover:text-cyanNeon transition-colors mb-2 leading-snug">
                  {edu.degree}
                </h3>

                <p className="text-xs sm:text-sm text-textDim flex items-start gap-1.5 mb-4">
                  <School className="w-4 h-4 text-textFaint shrink-0 mt-0.5" />
                  <span>{edu.institution}</span>
                </p>

                {edu.details && (
                  <p className="text-xs text-textFaint leading-relaxed mb-4">
                    {edu.details}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-line/60 flex items-center justify-between">
                <span className="font-mono text-xs text-textFaint">{edu.scoreLabel}</span>
                <span className="font-mono text-sm font-semibold text-greenNeon bg-greenNeon/10 border border-greenNeon/30 px-3 py-0.5 rounded-md shadow-sm shadow-greenNeon/10">
                  {edu.score}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
