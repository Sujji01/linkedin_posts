import React, { useState, useRef } from 'react';
import { Cpu, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { useGSAP } from '@gsap/react';
import { gsap } from '../utils/gsap';

export const Projects: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.projects-header',
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
        '.project-card-item',
        { opacity: 0, y: 35 },
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
    <section ref={sectionRef} id="projects" className="py-24 relative z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="projects-header max-w-3xl mb-12">
          <div className="flex items-center gap-2.5 font-mono text-xs font-semibold text-cyanNeon tracking-widest uppercase mb-3">
            <span className="w-4 h-[1px] bg-cyanNeon shadow-glow-cyan" />
            <span>04 · Tape‑outs (Training)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-textMain tracking-tight">
            Featured <span className="text-cyanNeon">Projects</span>
          </h2>
          <p className="mt-2 text-textDim text-base">
            Three RTL‑to‑GDSII implementations, each carried through to DRC/LVS signoff on a 32nm PDK.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project) => (
            <div
              key={project.id}
              className="project-card-item rounded-xl bg-gradient-to-b from-bgPanel2 to-bgPanel border border-lineSoft overflow-hidden flex flex-col justify-between hover:border-cyanDim transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-cyanNeon/5 group"
            >
              <div>
                {/* Project Header */}
                <div className="p-6 border-b border-line/60 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-display font-bold text-textMain group-hover:text-cyanNeon transition-colors">
                      {project.title}
                    </h3>
                    <div className="font-mono text-xs text-cyanNeon mt-1.5 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-cyanNeon" />
                      <span>{project.role}</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-amberWarn bg-amberWarn/10 border border-amberWarn/30 px-2.5 py-0.5 rounded whitespace-nowrap">
                    {project.technology}
                  </span>
                </div>

                {/* Project Body */}
                <div className="p-6 space-y-4">
                  <p className="text-sm text-textDim leading-relaxed">
                    {project.shortDesc}
                  </p>

                  {/* Tool Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tools.map((t, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-bgDark border border-line text-textDim"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Card Footer */}
              <div className="p-6 pt-0 space-y-4">
                <div className="pt-4 border-t border-dashed border-line flex items-center gap-2 font-mono text-xs text-greenNeon">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{project.metrics}</span>
                </div>

                <button
                  onClick={() => setActiveModalProject(project)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-mono text-xs font-semibold bg-bgDark border border-line hover:border-cyanNeon hover:text-cyanNeon text-textMain transition-all group-hover:bg-cyanNeon/10"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyanNeon" />
                  <span>Technical Deep Dive</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Deep-Dive Spec Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
