import React, { useEffect, useState } from 'react';
import { 
  X, 
  Zap, 
  Download, 
  Mail, 
  Phone, 
  Cpu, 
  Clock, 
  ShieldCheck, 
  MessageCircle,
  FileText
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { LinkedInIcon } from './Icons';

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export const RecruiterModal: React.FC<RecruiterModalProps> = ({ 
  isOpen, 
  onClose,
  onOpenResume 
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
      // Double rAF ensures the browser paints initial closed state before transition starts
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsActive(true);
        });
      });
    } else {
      setIsActive(false);
      timeoutId = window.setTimeout(() => {
        setIsRendered(false);
        document.body.style.overflow = 'unset';
      }, 240);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isRendered) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto transition-opacity duration-240 ease-out ${
        isActive ? 'opacity-100' : 'opacity-0'
      } bg-black/80 backdrop-blur-sm`}
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 transition-opacity" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* Modal Dialog */}
      <div 
        className={`relative w-full max-w-4xl bg-bgPanel2 border border-cyanNeon/50 rounded-2xl p-5 sm:p-8 shadow-2xl shadow-cyanNeon/15 z-10 my-auto overflow-hidden max-h-[92vh] flex flex-col transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'
        }`}
      >
        {/* Top Highlight Stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyanNeon via-greenNeon to-amberWarn" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-line">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyanNeon/10 border border-cyanDim text-cyanNeon font-mono text-xs mb-2 shadow-sm shadow-cyanNeon/10">
              <Zap className="w-3.5 h-3.5 text-cyanNeon animate-pulse" />
              <span>Recruiter Fast Track · 60-Second Summary</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-textMain tracking-tight">
              Why Hire <span className="text-cyanNeon">{PERSONAL_INFO.name}</span>
            </h2>
            <p className="text-xs sm:text-sm text-textDim mt-1">
              Key competencies, project metrics, and hiring availability summarized for engineering recruiters.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-bgDark border border-line text-textDim hover:text-textMain hover:border-cyanNeon transition-all duration-200 hover:rotate-90 shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto pr-1 sm:pr-2 py-5 space-y-6 scrollbar-thin scroll-smooth overscroll-contain">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-bgDark border border-line hover:border-cyanDim/70 hover:bg-bgPanel hover:-translate-y-0.5 transition-all duration-200 group">
              <span className="font-mono text-[11px] text-textFaint uppercase block mb-1">Target Role</span>
              <span className="font-display font-bold text-sm sm:text-base text-cyanNeon group-hover:text-cyanNeon/90">Physical Design</span>
              <span className="block text-[11px] text-textDim mt-0.5">ASIC Implementation</span>
            </div>
            <div className="p-3.5 rounded-xl bg-bgDark border border-line hover:border-greenNeon/50 hover:bg-bgPanel hover:-translate-y-0.5 transition-all duration-200">
              <span className="font-mono text-[11px] text-textFaint uppercase block mb-1">Status</span>
              <span className="font-display font-bold text-sm sm:text-base text-greenNeon flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-greenNeon animate-pulse" />
                Immediate
              </span>
              <span className="block text-[11px] text-textDim mt-0.5">Bangalore / Relocate</span>
            </div>
            <div className="p-3.5 rounded-xl bg-bgDark border border-line hover:border-amberWarn/50 hover:bg-bgPanel hover:-translate-y-0.5 transition-all duration-200">
              <span className="font-mono text-[11px] text-textFaint uppercase block mb-1">Node Experience</span>
              <span className="font-display font-bold text-sm sm:text-base text-amberWarn">14nm / 32nm</span>
              <span className="block text-[11px] text-textDim mt-0.5">FinFET &amp; Planar PDKs</span>
            </div>
            <div className="p-3.5 rounded-xl bg-bgDark border border-line hover:border-greenNeon/50 hover:bg-bgPanel hover:-translate-y-0.5 transition-all duration-200">
              <span className="font-mono text-[11px] text-textFaint uppercase block mb-1">DRC / LVS Signoff</span>
              <span className="font-display font-bold text-sm sm:text-base text-greenNeon">100% Clean</span>
              <span className="block text-[11px] text-textDim mt-0.5">3 Full Design Projects</span>
            </div>
          </div>

          {/* 3 Core Strengths Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Strength 1 */}
            <div className="p-4 rounded-xl bg-bgPanel border border-lineSoft space-y-2 hover:border-cyanNeon/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyanNeon/5 transition-all duration-250">
              <div className="flex items-center gap-2 text-cyanNeon font-display font-semibold text-sm">
                <Cpu className="w-4 h-4 text-cyanNeon" />
                <span>Full RTL‑to‑GDSII</span>
              </div>
              <p className="text-xs text-textDim leading-relaxed">
                Hands-on training at Maven Silicon across floorplanning, macro placement, power meshes, standard cell placement, CTS, detailed routing, and final signoff.
              </p>
              <div className="pt-2 border-t border-line/40 font-mono text-[11px] text-cyanNeon">
                Fusion Compiler &amp; ICC2
              </div>
            </div>

            {/* Strength 2 */}
            <div className="p-4 rounded-xl bg-bgPanel border border-lineSoft space-y-2 hover:border-greenNeon/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-greenNeon/5 transition-all duration-250">
              <div className="flex items-center gap-2 text-greenNeon font-display font-semibold text-sm">
                <Clock className="w-4 h-4 text-greenNeon" />
                <span>STA &amp; Timing Closure</span>
              </div>
              <p className="text-xs text-textDim leading-relaxed">
                Skilled in resolving setup and hold timing violations across multi-corner (SS/FF) environments, clock skew balancing (&lt;80ps), and NDR routing in PrimeTime.
              </p>
              <div className="pt-2 border-t border-line/40 font-mono text-[11px] text-greenNeon">
                PrimeTime &amp; MCMM Analysis
              </div>
            </div>

            {/* Strength 3 */}
            <div className="p-4 rounded-xl bg-bgPanel border border-lineSoft space-y-2 hover:border-amberWarn/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-amberWarn/5 transition-all duration-250">
              <div className="flex items-center gap-2 text-amberWarn font-display font-semibold text-sm">
                <ShieldCheck className="w-4 h-4 text-amberWarn" />
                <span>Signoff &amp; Automation</span>
              </div>
              <p className="text-xs text-textDim leading-relaxed">
                Comprehensive physical verification (DRC, LVS, Antenna diode fixes) with automated Tcl scripts to streamline report parsing, ECOs, and pin constraints.
              </p>
              <div className="pt-2 border-t border-line/40 font-mono text-[11px] text-amberWarn">
                Tcl Scripting &amp; Calibre/ICV
              </div>
            </div>
          </div>

          {/* Project Highlights Table */}
          <div className="border border-line rounded-xl overflow-hidden bg-bgDark/60 shadow-sm">
            <div className="px-4 py-2.5 bg-bgPanel border-b border-line flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-textMain uppercase tracking-wider">
                Project Scorecard (14nm &amp; 32nm PDKs)
              </span>
              <span className="font-mono text-[11px] text-greenNeon font-medium">4 / 4 Clean Signoffs</span>
            </div>
            <div className="divide-y divide-line/50 text-xs font-mono">
              <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-cyanNeon/[0.03] transition-colors">
                <div>
                  <span className="font-bold text-textMain">Raven SoC – Physical Implementation</span>
                  <span className="block text-textDim text-[11px]">14nm FinFET · Synopsys ICC2 &amp; PrimeTime</span>
                </div>
                <div className="sm:text-right">
                  <span className="text-greenNeon font-semibold">Zero Setup/Hold Slack Violations</span>
                  <span className="block text-textFaint text-[10px]">100% Clean DRC/LVS · Skew &lt;70ps</span>
                </div>
              </div>

              <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-cyanNeon/[0.03] transition-colors">
                <div>
                  <span className="font-bold text-textMain">RISC‑V Core Physical Implementation</span>
                  <span className="block text-textDim text-[11px]">Synopsys ICC2 · Custom Macro Placement</span>
                </div>
                <div className="sm:text-right">
                  <span className="text-greenNeon font-semibold">10% Wirelength Reduction</span>
                  <span className="block text-textFaint text-[10px]">Zero DRC/LVS · Skew &lt;75ps</span>
                </div>
              </div>

              <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-cyanNeon/[0.03] transition-colors">
                <div>
                  <span className="font-bold text-textMain">Floating Point Unit (FPU)</span>
                  <span className="block text-textDim text-[11px]">14nm FinFET · ICC2 &amp; PrimeTime Arithmetic</span>
                </div>
                <div className="sm:text-right">
                  <span className="text-greenNeon font-semibold">0ns Setup/Hold Slack Violations</span>
                  <span className="block text-textFaint text-[10px]">Dynamic IR Drop &lt;2.8%</span>
                </div>
              </div>

              <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-cyanNeon/[0.03] transition-colors">
                <div>
                  <span className="font-bold text-textMain">Router 1×3 Network Block</span>
                  <span className="block text-textDim text-[11px]">Fusion Compiler · Single Power Domain</span>
                </div>
                <div className="sm:text-right">
                  <span className="text-greenNeon font-semibold">Full RTL → GDSII Tape-Out Flow</span>
                  <span className="block text-textFaint text-[10px]">100% Routability · Setup Slack +0.22ns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Recruiter Actions */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyanNeon/10 via-bgPanel to-bgDark border border-cyanDim/60 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div>
              <h4 className="font-display font-bold text-sm sm:text-base text-textMain">
                Ready to schedule a technical discussion?
              </h4>
              <p className="text-xs text-textDim mt-0.5">
                Direct phone, WhatsApp, email, or resume review:
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onOpenResume();
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-bgDark border border-cyanNeon/50 text-cyanNeon font-mono text-xs hover:bg-cyanNeon/15 hover:border-cyanNeon hover:shadow-glow-cyan transition-all font-semibold"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Resume</span>
              </button>

              <a
                href={PERSONAL_INFO.resumePath}
                download
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyanNeon text-slate-950 font-mono text-xs font-bold hover:shadow-glow-cyan hover:-translate-y-0.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </a>

              <a
                href={`https://wa.me/${PERSONAL_INFO.phoneFormatted.replace('+', '')}?text=Hi%20Sujith,%20we%20reviewed%20your%20Physical%20Design%20portfolio%20and%20would%20like%20to%20connect.`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-greenNeon/10 border border-greenNeon/40 text-greenNeon hover:bg-greenNeon/25 hover:border-greenNeon hover:-translate-y-0.5 transition-all"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phoneFormatted}`}
                className="p-2 rounded-lg bg-bgDark border border-line text-textDim hover:text-cyanNeon hover:border-cyanNeon hover:-translate-y-0.5 transition-all"
                title="Call Phone"
              >
                <Phone className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Physical%20Design%20Engineer%20Opportunity`}
                className="p-2 rounded-lg bg-bgDark border border-line text-textDim hover:text-cyanNeon hover:border-cyanNeon hover:-translate-y-0.5 transition-all"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-bgDark border border-line text-textDim hover:text-cyanNeon hover:border-cyanNeon hover:-translate-y-0.5 transition-all"
                title="LinkedIn Profile"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
