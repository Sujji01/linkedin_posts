import React, { useEffect } from 'react';
import { X, Cpu, Wrench, CheckCircle2, AlertTriangle, Zap, Clock, ShieldCheck } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl bg-bgPanel2 border border-cyanDim/70 rounded-2xl p-5 sm:p-8 shadow-2xl shadow-cyanNeon/10 z-10 my-6 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Top Accent Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyanNeon via-greenNeon to-amberWarn" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-line">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-amberWarn bg-amberWarn/10 border border-amberWarn/30 px-2.5 py-0.5 rounded">
                {project.technology}
              </span>
              <span className="font-mono text-xs text-cyanNeon flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5" />
                Physical Design Tape-Out
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-textMain">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-cyanNeon mt-1">
              {project.role}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-bgDark border border-line text-textDim hover:text-textMain hover:border-cyanNeon transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto pr-2 py-5 space-y-6 scrollbar-thin">
          
          {/* Overview */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-textFaint mb-2">
              Implementation Overview
            </h4>
            <p className="text-sm sm:text-base text-textDim leading-relaxed">
              {project.fullDesc}
            </p>
          </div>

          {/* Full PPA Engineering Scorecard */}
          {project.ppa && (
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-textFaint mb-3 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amberWarn" />
                Silicon PPA Scorecard (Performance, Power, Area)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-bgDark border border-line">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyanNeon mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Timing Closure (STA)</span>
                  </div>
                  <p className="text-xs text-textMain font-mono font-medium">{project.ppa.timing}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-bgDark border border-line">
                  <div className="flex items-center gap-2 text-xs font-mono text-greenNeon mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Physical Verification (DRC/LVS)</span>
                  </div>
                  <p className="text-xs text-textMain font-mono font-medium">{project.ppa.drcLvs}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-bgDark border border-line">
                  <div className="flex items-center gap-2 text-xs font-mono text-amberWarn mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Area &amp; Wirelength</span>
                  </div>
                  <p className="text-xs text-textMain font-mono font-medium">{project.ppa.wirelength}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-bgDark border border-line">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyanNeon mb-1">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Clock Skew &amp; CTS</span>
                  </div>
                  <p className="text-xs text-textMain font-mono font-medium">{project.ppa.skewTarget || '<80ps clock skew'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Signoff Result Banner */}
          <div className="bg-bgDark/80 border border-line rounded-xl p-4">
            <div className="font-mono text-xs text-greenNeon flex items-center gap-1.5 mb-1.5 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-greenNeon" />
              Signoff Result &amp; Metric:
            </div>
            <p className="text-sm font-mono text-textMain">
              {project.metrics}
            </p>
          </div>

          {/* Detailed Deliverables */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-textFaint mb-3">
              Key PD Milestones &amp; Actions
            </h4>
            <div className="space-y-2.5">
              {project.keyHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-textDim">
                  <span className="text-cyanNeon font-mono font-bold">▸</span>
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges & Solutions */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-textFaint mb-3 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amberWarn" />
              Physical Design Challenges &amp; Solutions
            </h4>
            <div className="space-y-2.5">
              {project.challengesSolved.map((cs, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-bgPanel border border-lineSoft text-xs sm:text-sm text-textDim flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amberWarn shrink-0 mt-2" />
                  <span>{cs}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Toolchain Used */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-textFaint mb-2.5 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-cyanNeon" />
              EDA Toolchain &amp; Engines
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((t, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs px-3 py-1 rounded-md bg-bgDark border border-line text-cyanNeon"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-line flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg font-mono text-xs font-semibold bg-bgDark border border-line hover:border-cyanNeon text-textMain transition-all"
          >
            Close Spec
          </button>
        </div>

      </div>
    </div>
  );
};
