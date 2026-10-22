import React, { useState, useRef, useMemo } from 'react';
import { Cpu, ArrowRight, CheckCircle2, Sparkles, Filter, Zap } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { useGSAP } from '@gsap/react';
import { gsap } from '../utils/gsap';

export const Projects: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'soc' | 'processor' | 'fpu' | 'network'>('all');
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

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
        <div className="projects-header max-w-3xl mb-10">
          <div className="flex items-center gap-2.5 font-mono text-xs font-semibold text-cyanNeon tracking-widest uppercase mb-3">
            <span className="w-4 h-[1px] bg-cyanNeon shadow-glow-cyan" />
            <span>04 · Tape‑outs (Training)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-textMain tracking-tight">
            Featured <span className="text-cyanNeon">Projects &amp; PPA Scorecards</span>
          </h2>
          <p className="mt-2 text-textDim text-base">
            Four complete RTL‑to‑GDSII &amp; SoC implementations, each validated with rigorous timing closure and clean DRC/LVS physical verification across 14nm FinFET &amp; 32nm PDKs.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-textFaint mr-2">
            <Filter className="w-3.5 h-3.5 text-cyanNeon" />
            <span>Filter:</span>
          </div>
          
          {[
            { id: 'all', label: 'All Projects (4)' },
            { id: 'soc', label: 'Raven SoC (14nm)' },
            { id: 'processor', label: 'RISC-V Core (32nm)' },
            { id: 'fpu', label: 'Arithmetic FPU (14nm)' },
            { id: 'network', label: 'Router 1×3 (32nm)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`font-mono text-xs px-3.5 py-1.5 rounded-lg border transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyanNeon/15 border-cyanNeon text-cyanNeon shadow-sm shadow-cyanNeon/20 font-semibold'
                  : 'bg-bgPanel/80 border-line text-textDim hover:text-textMain hover:border-lineSoft'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card-item rounded-2xl bg-gradient-to-b from-bgPanel2 to-bgPanel border border-lineSoft overflow-hidden flex flex-col justify-between hover:border-cyanDim transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-cyanNeon/5 group"
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

                  {/* Flow Stages Track */}
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-textFaint block mb-1.5">
                      Completed Stages (RTL → GDSII):
                    </span>
                    <div className="flex items-center gap-1 overflow-x-auto py-1">
                      {['SYN', 'FP', 'PLACE', 'CTS', 'ROUTE', 'SIGNOFF'].map((stage, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded bg-bgDark border border-cyanDim/40 text-cyanNeon shrink-0"
                          title={`${stage} completed and verified`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-greenNeon" />
                          <span>{stage}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PPA Scorecard Box */}
                  {project.ppa && (
                    <div className="p-3.5 rounded-xl bg-bgDark/90 border border-line space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-textFaint font-semibold flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-amberWarn" />
                          PPA Summary
                        </span>
                        <span className="text-[11px] text-greenNeon">Signoff Clean</span>
                      </div>
                      
                      <div className="space-y-1.5 text-xs font-mono">
                        <div className="flex items-start justify-between gap-2 text-textDim">
                          <span className="text-textFaint shrink-0">Timing:</span>
                          <span className="text-right text-textMain font-medium truncate">{project.ppa.timing}</span>
                        </div>
                        <div className="flex items-start justify-between gap-2 text-textDim">
                          <span className="text-textFaint shrink-0">Optimization:</span>
                          <span className="text-right text-cyanNeon truncate">{project.ppa.wirelength}</span>
                        </div>
                        <div className="flex items-start justify-between gap-2 text-textDim">
                          <span className="text-textFaint shrink-0">DRC/LVS:</span>
                          <span className="text-right text-greenNeon font-semibold truncate">{project.ppa.drcLvs}</span>
                        </div>
                      </div>
                    </div>
                  )}

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
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{project.metrics}</span>
                </div>

                <button
                  onClick={() => setActiveModalProject(project)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-mono text-xs font-semibold bg-bgDark border border-line hover:border-cyanNeon hover:text-cyanNeon text-textMain transition-all group-hover:bg-cyanNeon/10"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyanNeon" />
                  <span>Technical Deep Dive &amp; PPA</span>
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
