import React, { useState, useRef } from 'react';
import { 
  Wrench, 
  FileInput, 
  FileOutput, 
  ShieldAlert, 
  Terminal, 
  Copy, 
  Check, 
  Sparkles,
  BookOpen,
  Activity,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Cpu,
  Zap,
  Maximize2,
  FileCode,
  RotateCcw
} from 'lucide-react';
import { 
  PD_FLOW_STEPS, 
  VLSI_TOOLS_ECOSYSTEM, 
  VLSI_FILE_FORMATS, 
  STAGE_DEPENDENCY_LOOPS 
} from '../data/portfolioData';
import { useGSAP } from '@gsap/react';
import { gsap } from '../utils/gsap';

export const PdFlowExplorer: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(2); // Default to Floorplanning
  const [activeTab, setActiveTab] = useState<'overview' | 'deepdive' | 'visual' | 'commands' | 'debugging'>('deepdive');
  const [showGlobalGuide, setShowGlobalGuide] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [heatmapMode, setHeatmapMode] = useState<'congested' | 'improved'>('improved');
  const sectionRef = useRef<HTMLElement>(null);
  const currentStep = PD_FLOW_STEPS[activeStepIndex];

  useGSAP(
    () => {
      gsap.fromTo(
        '.flow-header',
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
        '.flow-pipeline-bar',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
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
        '.flow-inspector-card',
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
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

  const handleCopyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <section ref={sectionRef} id="flow" className="py-24 relative z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Global Reference Guide Toggle */}
        <div className="flow-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 font-mono text-xs font-semibold text-cyanNeon tracking-widest uppercase mb-3">
              <span className="w-4 h-[1px] bg-cyanNeon shadow-glow-cyan" />
              <span>07 · Practical Physical Design Guide</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-textMain tracking-tight">
              VLSI Physical Design <span className="text-cyanNeon">Pipeline &amp; Reference</span>
            </h2>
            <p className="mt-2 text-textDim text-sm sm:text-base leading-relaxed">
              Complete practical and industry guide across all 8 backend stages. Explore core geometry, clock tree distribution, multi-layer routing crosstalk, EDA commands, and real debugging playbooks.
            </p>
          </div>

          <button
            onClick={() => setShowGlobalGuide(!showGlobalGuide)}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyanNeon/10 border border-cyanNeon/40 hover:bg-cyanNeon/20 text-cyanNeon font-mono text-xs font-medium transition-all shadow-sm shadow-cyanNeon/10 hover:shadow-cyanNeon/20"
          >
            <BookOpen className="w-4 h-4 text-cyanNeon" />
            <span>{showGlobalGuide ? "Hide Flow Matrix" : "📘 EDA Tools & Standard Files Matrix"}</span>
            {showGlobalGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Global Reference Guide Collapsible Panel (Image 2: VLSI PHYSICAL DESIGN TOOLS) */}
        {showGlobalGuide && (
          <div className="mb-12 rounded-2xl bg-bgPanel2 border border-cyanNeon/30 p-6 sm:p-8 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
              <div>
                <div className="font-mono text-xs text-greenNeon font-semibold tracking-wider uppercase mb-1">
                  Complete Practical &amp; Industry Guide
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-textMain">
                  End-to-End Implementation Flow &amp; EDA Ecosystem
                </h3>
              </div>
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-cyanNeon/10 border border-cyanNeon/30 text-cyanNeon">
                PDK &amp; Signoff Discipline
              </span>
            </div>

            {/* End-to-End Visual Flow Bar with Iterative Feedback */}
            <div className="p-4 rounded-xl bg-bgDark/80 border border-line mb-8">
              <div className="text-xs font-mono text-textFaint uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Implementation Stage Flow</span>
                <span className="text-amberWarn flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" /> Iterative Feedback: PPA, Timing, Routability, Power Integrity
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {[
                  { stage: "RTL", tool: "Verilog", role: "Architecture / Logic" },
                  { stage: "Synthesis", tool: "DC / Genus", role: "RTL → Gates" },
                  { stage: "Floorplan", tool: "ICC2 / Innovus", role: "Core & Macros" },
                  { stage: "Place + CTS", tool: "FC / Innovus", role: "Cells & Clocks" },
                  { stage: "Route", tool: "P&R Engines", role: "Tracks & Vias" },
                  { stage: "Signoff", tool: "STA / DRC / LVS", role: "Golden Tape-out" }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-bgPanel border border-line flex flex-col justify-between">
                    <div className="font-display font-bold text-sm text-cyanNeon">{item.stage}</div>
                    <div className="font-mono text-[11px] text-textMain my-1">{item.tool}</div>
                    <div className="font-mono text-[10px] text-textFaint">{item.role}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-[11px] font-mono text-textFaint flex flex-wrap items-center justify-between gap-2 border-t border-line/40 pt-2">
                <span><strong>Inputs:</strong> RTL + .lib + .sdc + LEF/tech + PDK</span>
                <span className="text-cyanNeon"><strong>Outputs:</strong> netlist + DEF/database + SPEF + GDSII + signoff reports</span>
              </div>
            </div>

            {/* Two Column Reference: EDA Tools Matrix vs Standard File Formats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* EDA Tool Roles (Alternatives vs Partners) */}
              <div className="p-5 rounded-xl bg-bgDark/60 border border-line">
                <div className="font-mono text-xs text-textFaint uppercase tracking-widest font-semibold flex items-center gap-2 mb-4">
                  <Cpu className="w-4 h-4 text-cyanNeon" />
                  <span>EDA Tool Roles — Alternatives vs Partners</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-line text-textFaint">
                        <th className="pb-2 font-medium">Stage / Role</th>
                        <th className="pb-2 font-medium text-cyanNeon">Synopsys</th>
                        <th className="pb-2 font-medium text-greenNeon">Cadence</th>
                        <th className="pb-2 font-medium text-textDim">Siemens / Open</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/40 text-textDim">
                      {VLSI_TOOLS_ECOSYSTEM.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-bgPanel/40 transition-colors">
                          <td className="py-2.5 pr-2 font-semibold text-textMain">{row.category}</td>
                          <td className="py-2.5 pr-2 text-cyanNeon/90">{row.synopsys}</td>
                          <td className="py-2.5 pr-2 text-greenNeon/90">{row.cadence}</td>
                          <td className="py-2.5 text-textFaint">{row.siemens || row.openSource || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-[11px] font-mono text-textFaint border-t border-line/40 pt-2">
                  * Note: DC vs Genus are synthesis alternatives; ICC2/FC vs Innovus are implementation alternatives. PrimeTime and StarRC are complementary signoff partners.
                </p>
              </div>

              {/* Standard Files to Recognize */}
              <div className="p-5 rounded-xl bg-bgDark/60 border border-line flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-textFaint uppercase tracking-widest font-semibold flex items-center gap-2 mb-4">
                    <FileCode className="w-4 h-4 text-greenNeon" />
                    <span>Standard Physical Design File Formats</span>
                  </div>
                  <div className="space-y-2.5">
                    {VLSI_FILE_FORMATS.map((file, fIdx) => (
                      <div key={fIdx} className="p-2.5 rounded-lg bg-bgPanel/80 border border-line flex items-start gap-3">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyanNeon/10 border border-cyanNeon/30 text-cyanNeon font-bold shrink-0">
                          {file.extension}
                        </span>
                        <div>
                          <div className="font-display font-semibold text-xs text-textMain">{file.name}</div>
                          <div className="font-mono text-[11px] text-textDim mt-0.5 leading-snug">{file.purpose}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-cyanNeon/5 border border-cyanNeon/20 font-mono text-[11px] text-textDim">
                  <span className="text-cyanNeon font-bold">Handoff Discipline:</span> Record the exact RTL hash, block hierarchy, clock definitions, macro abstracts, and tool version. A passed report from another database revision is NOT evidence for the current GDS.
                </div>
              </div>
            </div>

            {/* Stage Dependencies that Cause Loops */}
            <div className="p-4 rounded-xl bg-amberWarn/5 border border-amberWarn/30">
              <div className="font-mono text-xs text-amberWarn font-semibold uppercase tracking-wider flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-amberWarn" />
                <span>Stage Dependencies That Trigger Engineering Loops</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {STAGE_DEPENDENCY_LOOPS.map((loop, lIdx) => (
                  <div key={lIdx} className="p-3 rounded-lg bg-bgDark/80 border border-line">
                    <div className="font-mono text-xs text-amberWarn font-semibold">{loop.stagePair}</div>
                    <div className="text-[11px] font-mono text-textFaint mt-1">Cause: {loop.cause}</div>
                    <div className="text-[11px] text-textDim mt-1 leading-snug">{loop.impact}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 8-Stage Interactive Pipeline Flow Navigation */}
        <div className="flow-pipeline-bar overflow-x-auto pb-4 mb-8 scrollbar-thin">
          <div className="flex items-center min-w-[820px] gap-2 p-2 bg-bgPanel rounded-xl border border-line">
            {PD_FLOW_STEPS.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`flex-1 py-3 px-2 rounded-lg text-center transition-all relative ${
                    isActive
                      ? 'bg-cyanNeon/15 border border-cyanNeon text-cyanNeon shadow-sm shadow-cyanNeon/20'
                      : 'bg-bgDark/60 border border-line text-textDim hover:text-textMain hover:border-lineSoft'
                  }`}
                >
                  <span className="block font-mono text-[10px] text-textFaint mb-1">
                    {step.stepNumber}
                  </span>
                  <span className="block font-display font-semibold text-xs truncate">
                    {step.name.split(' ')[0]}
                  </span>

                  {/* Active Indicator Dot */}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyanNeon shadow-glow-cyan" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detailed Inspector Card */}
        <div className="flow-inspector-card rounded-2xl bg-gradient-to-br from-bgPanel2 via-bgPanel to-bgDark border border-cyanDim/60 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyanNeon/5 rounded-full blur-3xl -z-0 pointer-events-none" />

          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-line">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-greenNeon bg-greenNeon/10 border border-greenNeon/30 px-3 py-1 rounded-full mb-2">
                <span>Stage {currentStep.stepNumber} of 08</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-textMain">
                {currentStep.name}
              </h3>
            </div>

            {/* Step Tools */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-mono text-xs text-textFaint flex items-center gap-1 mr-1">
                <Wrench className="w-3.5 h-3.5 text-cyanNeon" />
                Tools:
              </span>
              {currentStep.tools.map((tool, tIdx) => (
                <span
                  key={tIdx}
                  className="font-mono text-xs px-2.5 py-1 rounded bg-bgDark border border-line text-cyanNeon font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* 5 Tab Navigation for Inspector Mode */}
          <div className="flex flex-wrap items-center gap-2 pt-5 pb-3">
            <button
              onClick={() => setActiveTab('deepdive')}
              className={`font-mono text-xs px-3.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                activeTab === 'deepdive'
                  ? 'bg-cyanNeon/15 border-cyanNeon text-cyanNeon font-semibold shadow-sm shadow-cyanNeon/20'
                  : 'bg-bgDark/60 border-line text-textDim hover:text-textMain'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-cyanNeon" />
              <span>🔬 Industry Deep Dive</span>
            </button>

            <button
              onClick={() => setActiveTab('visual')}
              className={`font-mono text-xs px-3.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                activeTab === 'visual'
                  ? 'bg-cyanNeon/15 border-cyanNeon text-cyanNeon font-semibold shadow-sm shadow-cyanNeon/20'
                  : 'bg-bgDark/60 border-line text-textDim hover:text-textMain'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5 text-greenNeon" />
              <span>📐 Interactive Schematics</span>
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`font-mono text-xs px-3.5 py-1.5 rounded-lg border transition-all ${
                activeTab === 'overview'
                  ? 'bg-cyanNeon/15 border-cyanNeon text-cyanNeon font-semibold'
                  : 'bg-bgDark/60 border-line text-textDim hover:text-textMain'
              }`}
            >
              Flow Deliverables &amp; Checks
            </button>

            <button
              onClick={() => setActiveTab('commands')}
              className={`font-mono text-xs px-3.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                activeTab === 'commands'
                  ? 'bg-cyanNeon/15 border-cyanNeon text-cyanNeon font-semibold'
                  : 'bg-bgDark/60 border-line text-textDim hover:text-textMain'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-cyanNeon" />
              <span>EDA Commands (Tcl)</span>
            </button>

            <button
              onClick={() => setActiveTab('debugging')}
              className={`font-mono text-xs px-3.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                activeTab === 'debugging'
                  ? 'bg-amberWarn/15 border-amberWarn text-amberWarn font-semibold'
                  : 'bg-bgDark/60 border-line text-textDim hover:text-textMain'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amberWarn" />
              <span>⚡ Diagnosis &amp; Playbooks</span>
            </button>
          </div>

          {/* Description */}
          <p className="py-4 text-sm sm:text-base text-textDim leading-relaxed border-b border-line/50">
            {currentStep.description}
          </p>

          {/* TAB 1: Industry Deep Dive (Concepts, Equations, Reports, Audit) */}
          {activeTab === 'deepdive' && (
            <div className="pt-6 space-y-6 animate-in fade-in duration-200">
              {/* Core Theoretical Concepts */}
              {currentStep.deepDive?.concepts && currentStep.deepDive.concepts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentStep.deepDive.concepts.map((concept, cIdx) => (
                    <div key={cIdx} className="p-4 rounded-xl bg-bgDark/70 border border-line flex flex-col justify-between">
                      <div>
                        <h4 className="font-display font-bold text-sm text-cyanNeon flex items-center gap-2 mb-2.5">
                          <span className="w-2 h-2 rounded-full bg-cyanNeon" />
                          {concept.title}
                        </h4>
                        <ul className="space-y-1.5">
                          {concept.points.map((pt, pIdx) => (
                            <li key={pIdx} className="text-xs text-textDim flex items-start gap-2 leading-relaxed">
                              <span className="text-cyanNeon/60 shrink-0">▸</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Mathematical Formulas & Numerical Examples */}
              {currentStep.deepDive?.equations && currentStep.deepDive.equations.length > 0 && (
                <div className="p-4 sm:p-5 rounded-xl bg-bgDark border border-line">
                  <div className="font-mono text-xs text-textFaint uppercase tracking-widest font-semibold flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-greenNeon" />
                    <span>Physical Equations &amp; Numerical Metrics</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentStep.deepDive.equations.map((eq, eIdx) => (
                      <div key={eIdx} className="p-3 rounded-lg bg-bgPanel border border-line">
                        <div className="font-mono text-xs font-bold text-greenNeon mb-1">{eq.name}</div>
                        <div className="font-mono text-xs bg-bgDark p-2 rounded border border-line text-textMain break-words">
                          {eq.formula}
                        </div>
                        {eq.note && (
                          <div className="font-mono text-[11px] text-textFaint mt-1.5 leading-snug">
                            💡 {eq.note}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Illustrative Timing / Skew Report Sample */}
              {currentStep.deepDive?.reportExample && (
                <div className="p-4 sm:p-5 rounded-xl bg-bgDark/90 border border-line">
                  <div className="font-mono text-xs text-cyanNeon uppercase tracking-widest font-semibold flex items-center justify-between mb-2">
                    <span className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-cyanNeon" />
                      {currentStep.deepDive.reportExample.title}
                    </span>
                    <span className="text-textFaint text-[11px]">Tool Report Analysis</span>
                  </div>
                  <pre className="p-3.5 rounded-lg bg-black/60 border border-line font-mono text-[11px] text-textDim overflow-x-auto leading-relaxed scrollbar-thin">
                    <code>{currentStep.deepDive.reportExample.content}</code>
                  </pre>
                  <p className="mt-2.5 text-xs text-textDim font-mono border-t border-line/40 pt-2 leading-relaxed">
                    <strong className="text-greenNeon">Engineer Commentary: </strong>
                    {currentStep.deepDive.reportExample.commentary}
                  </p>
                </div>
              )}

              {/* Post-Stage Audit Checklist */}
              {currentStep.deepDive?.auditChecklist && currentStep.deepDive.auditChecklist.length > 0 && (
                <div className="p-4 sm:p-5 rounded-xl bg-bgDark/60 border border-line">
                  <div className="font-mono text-xs text-textFaint uppercase tracking-widest font-semibold flex items-center gap-2 mb-3">
                    <ShieldAlert className="w-4 h-4 text-amberWarn" />
                    <span>Post-Stage Engineering Audit Checklist</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentStep.deepDive.auditChecklist.map((item, aIdx) => (
                      <div key={aIdx} className="p-2.5 rounded-lg bg-bgPanel/60 border border-line flex items-start gap-2.5 text-xs text-textDim">
                        <span className="text-greenNeon font-mono font-bold mt-0.5">✓</span>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Interactive Schematics (Logic Mapping, Floorplan & Heatmaps, CTS Waveforms, Multi-Layer Routing) */}
          {activeTab === 'visual' && (
            <div className="pt-6 space-y-6 animate-in fade-in duration-200">
              {/* Visual 1: Logic Synthesis (Image 4) */}
              {currentStep.stepNumber === "02" && (
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-bgDark border border-line">
                    <div className="font-mono text-xs text-cyanNeon uppercase tracking-widest font-semibold mb-4">
                      Logic Transformation Flow: Behavioral RTL → Generic Logic → Mapped Cells
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                      <div className="p-4 rounded-xl bg-bgPanel border border-line text-center">
                        <div className="font-mono text-[10px] text-textFaint uppercase mb-1">Phase 1: Input</div>
                        <div className="font-display font-bold text-sm text-cyanNeon mb-1">RTL Behavior</div>
                        <div className="font-mono text-xs text-textDim bg-bgDark p-2 rounded border border-line">
                          always_ff / assign / operators
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-bgPanel border border-line text-center">
                        <div className="font-mono text-[10px] text-textFaint uppercase mb-1">Phase 2: Elaboration</div>
                        <div className="font-display font-bold text-sm text-greenNeon mb-1">Generic Logic (GTECH)</div>
                        <div className="font-mono text-xs text-textDim bg-bgDark p-2 rounded border border-line">
                          MUX / AND / DFF / Arithmetic
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-bgPanel border border-line text-center">
                        <div className="font-mono text-[10px] text-textFaint uppercase mb-1">Phase 3: Tech Mapping (.lib)</div>
                        <div className="font-display font-bold text-sm text-amberWarn mb-1">Mapped Cells</div>
                        <div className="font-mono text-xs text-textDim bg-bgDark p-2 rounded border border-line">
                          NAND2_X1 / DFF_X2 / AOI22
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 rounded-lg bg-bgPanel2 border border-line flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                      <span className="text-textDim">
                        Illustrative Setup Check: <strong className="text-textMain">Required (0.90 ns)</strong> - <strong className="text-textMain">Arrival (1.08 ns)</strong> = <strong className="text-red-400">Slack -0.18 ns (VIOLATED)</strong>
                      </span>
                      <span className="text-textFaint text-[11px]">
                        Delay constraint violated; inspect cell delay, fanout, wire estimation &amp; SDC.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Visual 2: Floorplan, Power Plan & Heatmaps (Image 1) */}
              {(currentStep.stepNumber === "03" || currentStep.stepNumber === "04") && (
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-bgDark border border-line">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div>
                        <div className="font-mono text-xs text-cyanNeon uppercase tracking-widest font-semibold">
                          Chip Planning Canvas &amp; Routing Demand Heatmap Proxy
                        </div>
                        <p className="font-mono text-[11px] text-textFaint mt-0.5">
                          Schematic representation of core rows, macro halo channels, and global route demand.
                        </p>
                      </div>

                      {/* Heatmap Toggle */}
                      <div className="inline-flex rounded-lg border border-line bg-bgPanel p-0.5 font-mono text-xs">
                        <button
                          onClick={() => setHeatmapMode('congested')}
                          className={`px-3 py-1 rounded-md transition-colors ${
                            heatmapMode === 'congested'
                              ? 'bg-amberWarn/20 text-amberWarn border border-amberWarn/40'
                              : 'text-textDim hover:text-textMain'
                          }`}
                        >
                          Congested (Hotspots)
                        </button>
                        <button
                          onClick={() => setHeatmapMode('improved')}
                          className={`px-3 py-1 rounded-md transition-colors ${
                            heatmapMode === 'improved'
                              ? 'bg-greenNeon/20 text-greenNeon border border-greenNeon/40'
                              : 'text-textDim hover:text-textMain'
                          }`}
                        >
                          Improved (Wide Channels)
                        </button>
                      </div>
                    </div>

                    {/* Floorplan Layout Canvas Schematic */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left: Physical Block Canvas */}
                      <div className="p-4 rounded-xl bg-bgPanel border border-line relative overflow-hidden min-h-[220px] flex flex-col justify-between">
                        <div className="font-mono text-[10px] text-textFaint uppercase flex items-center justify-between">
                          <span>Die Boundary (Chip Outer Bounds)</span>
                          <span className="text-cyanNeon">60% Core Utilization</span>
                        </div>

                        {/* Core Area with Legal Rows */}
                        <div className="my-3 p-3 rounded-lg border-2 border-dashed border-cyanNeon/40 bg-bgDark/80 relative flex items-center justify-between gap-4 min-h-[140px]">
                          {/* SRAM Macro */}
                          <div className="p-3 rounded-lg bg-cyanNeon/15 border-2 border-cyanNeon/60 text-center w-28">
                            <span className="font-mono text-xs font-bold text-cyanNeon block">SRAM 64KB</span>
                            <span className="font-mono text-[9px] text-textFaint">Hard Macro</span>
                            <div className="mt-1 font-mono text-[8px] text-textDim border-t border-cyanNeon/20 pt-0.5">
                              Halo: 12µm
                            </div>
                          </div>

                          {/* Channel Corridor */}
                          <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <div className="font-mono text-[10px] text-textFaint">
                              {heatmapMode === 'congested' ? "⚠️ Narrow Channel (5µm)" : "✓ Wide Channel (15µm)"}
                            </div>
                            <div className="w-full h-1 bg-line/60 my-1 relative">
                              <div className={`h-full ${heatmapMode === 'congested' ? 'bg-amberWarn' : 'bg-greenNeon'} rounded`} />
                            </div>
                            <div className="font-mono text-[9px] text-textDim">
                              Standard Cell Rows &amp; Placement Channels
                            </div>
                          </div>

                          {/* IP Macro */}
                          <div className="p-3 rounded-lg bg-greenNeon/15 border-2 border-greenNeon/60 text-center w-28">
                            <span className="font-mono text-xs font-bold text-greenNeon block">IP MACRO</span>
                            <span className="font-mono text-[9px] text-textFaint">PLL / SerDes</span>
                            <div className="mt-1 font-mono text-[8px] text-textDim border-t border-greenNeon/20 pt-0.5">
                              Halo: 12µm
                            </div>
                          </div>
                        </div>

                        <div className="font-mono text-[10px] text-textFaint flex items-center justify-between">
                          <span>VDD / VSS Mesh Straps (M7 / M8)</span>
                          <span>Pins oriented toward partner macros</span>
                        </div>
                      </div>

                      {/* Right: Heatmap GRC Grid */}
                      <div className="p-4 rounded-xl bg-bgPanel border border-line flex flex-col justify-between">
                        <div className="font-mono text-[10px] text-textFaint uppercase flex items-center justify-between">
                          <span>Global Route Routing Demand Proxy</span>
                          <span className={heatmapMode === 'congested' ? 'text-amberWarn' : 'text-greenNeon'}>
                            {heatmapMode === 'congested' ? 'Max GRC Overflow: +28%' : 'Max GRC Overflow: 0%'}
                          </span>
                        </div>

                        {/* 6x4 Grid Proxy */}
                        <div className="grid grid-cols-6 gap-1.5 my-3">
                          {Array.from({ length: 24 }).map((_, gIdx) => {
                            let cellBg = 'bg-cyanNeon/10 border-cyanNeon/20';
                            let cellText = 'text-cyanNeon';
                            if (heatmapMode === 'congested') {
                              if (gIdx === 7 || gIdx === 8 || gIdx === 13 || gIdx === 14) {
                                cellBg = 'bg-red-500/40 border-red-500/60 shadow-sm';
                                cellText = 'text-red-300 font-bold';
                              } else if (gIdx === 6 || gIdx === 9 || gIdx === 12 || gIdx === 15) {
                                cellBg = 'bg-amberWarn/30 border-amberWarn/50';
                                cellText = 'text-amberWarn';
                              }
                            } else {
                              if (gIdx % 5 === 0) {
                                cellBg = 'bg-greenNeon/20 border-greenNeon/40';
                                cellText = 'text-greenNeon';
                              }
                            }
                            return (
                              <div
                                key={gIdx}
                                className={`h-8 rounded border flex items-center justify-center font-mono text-[9px] ${cellBg} ${cellText}`}
                              >
                                {heatmapMode === 'congested' && (gIdx === 7 || gIdx === 13) ? 'HOT' : `${40 + (gIdx * 2)}%`}
                              </div>
                            );
                          })}
                        </div>

                        <div className="font-mono text-[10px] text-textDim flex items-center justify-between">
                          <span>Demand divided by capacity resources</span>
                          <span className="text-textFaint">Heat colors = Relative demand</span>
                        </div>
                      </div>
                    </div>

                    {/* Numerical Utilization Box */}
                    <div className="mt-4 p-3 rounded-lg bg-bgPanel2 border border-line font-mono text-xs flex flex-wrap items-center justify-between gap-2">
                      <span className="text-textDim">
                        <strong className="text-cyanNeon">Quick Utilization Rule:</strong> If placed cell area = 42,000 µm² and available row area = 70,000 µm², utilization = <strong>60.0%</strong>.
                      </span>
                      <span className="text-amberWarn font-medium">
                        * A 50% utilized block can still have severe macro channel choke points!
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Visual 3: Clock Tree Synthesis & Skew Waveforms (Image 3) */}
              {currentStep.stepNumber === "05" && (
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-bgDark border border-line">
                    <div className="font-mono text-xs text-cyanNeon uppercase tracking-widest font-semibold mb-4">
                      Clock Tree Distribution Network &amp; Launch vs. Capture Arrival Waveforms
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left: Clock Tree Network Schematic */}
                      <div className="p-4 rounded-xl bg-bgPanel border border-line flex flex-col justify-between">
                        <div className="font-mono text-[10px] text-textFaint uppercase mb-2">
                          Physical Clock Buffer Hierarchy
                        </div>

                        <div className="space-y-3 py-2">
                          {/* CLK Source */}
                          <div className="flex justify-center">
                            <div className="px-4 py-1.5 rounded-lg bg-cyanNeon/15 border border-cyanNeon font-mono text-xs text-cyanNeon font-bold">
                              CLK Source
                            </div>
                          </div>
                          
                          {/* Down arrow */}
                          <div className="text-center font-mono text-xs text-textFaint">↓</div>

                          {/* Root Buffer BUF0 */}
                          <div className="flex justify-center">
                            <div className="px-5 py-1.5 rounded-lg bg-bgDark border border-line font-mono text-xs text-textMain">
                              Root BUF0 (NDR 2W2S)
                            </div>
                          </div>

                          {/* Down arrow */}
                          <div className="text-center font-mono text-xs text-textFaint">↙ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↘</div>

                          {/* Branch Buffers */}
                          <div className="flex justify-between gap-2">
                            <div className="p-2 rounded bg-bgDark border border-line font-mono text-[11px] text-textDim text-center flex-1">
                              CLK BUF (Branch A)
                            </div>
                            <div className="p-2 rounded bg-bgDark border border-line font-mono text-[11px] text-textDim text-center flex-1">
                              CLK BUF (Branch B)
                            </div>
                          </div>

                          {/* Leaf Sinks */}
                          <div className="flex justify-between gap-2">
                            <div className="p-2 rounded bg-greenNeon/10 border border-greenNeon/40 font-mono text-[11px] text-greenNeon text-center flex-1">
                              Launch FF (0.15 ns)
                            </div>
                            <div className="p-2 rounded bg-cyanNeon/10 border border-cyanNeon/40 font-mono text-[11px] text-cyanNeon text-center flex-1">
                              Capture FF (0.23 ns)
                            </div>
                          </div>
                        </div>

                        <div className="font-mono text-[10px] text-textFaint text-center border-t border-line/40 pt-2 mt-2">
                          Propagated clocks model actual wire &amp; buffer delays
                        </div>
                      </div>

                      {/* Right: Waveform Sketch: Capture vs Launch Clock Arrival */}
                      <div className="p-4 rounded-xl bg-bgPanel border border-line flex flex-col justify-between">
                        <div className="font-mono text-[10px] text-textFaint uppercase mb-2 flex items-center justify-between">
                          <span>Waveform Timing Sketch</span>
                          <span className="text-greenNeon">Skew = Capture - Launch</span>
                        </div>

                        {/* Waveforms */}
                        <div className="space-y-4 py-2 font-mono text-xs">
                          {/* Ideal */}
                          <div>
                            <div className="text-[10px] text-textFaint mb-1">Ideal Clocks (Synchronous 0 ps skew):</div>
                            <div className="h-6 flex items-center gap-1">
                              <span className="text-[10px] text-textDim w-16">Ideal CLK:</span>
                              <div className="flex-1 flex items-center border-b border-cyanNeon/40 relative h-4">
                                <span className="inline-block w-8 h-4 border-l-2 border-t-2 border-r-2 border-cyanNeon bg-cyanNeon/10" />
                                <span className="inline-block w-8 h-0 border-b-2 border-cyanNeon" />
                                <span className="inline-block w-8 h-4 border-l-2 border-t-2 border-r-2 border-cyanNeon bg-cyanNeon/10" />
                              </div>
                            </div>
                          </div>

                          {/* Propagated Launch vs Capture */}
                          <div>
                            <div className="text-[10px] text-textFaint mb-1">Propagated Clocks (Early Launch vs Late Capture):</div>
                            {/* Launch */}
                            <div className="h-6 flex items-center gap-1 mb-2">
                              <span className="text-[10px] text-greenNeon w-16">Launch:</span>
                              <div className="flex-1 flex items-center border-b border-greenNeon/40 relative h-4">
                                <span className="inline-block w-4 h-0" />
                                <span className="inline-block w-8 h-4 border-l-2 border-t-2 border-r-2 border-greenNeon bg-greenNeon/10" />
                                <span className="inline-block w-8 h-0 border-b-2 border-greenNeon" />
                              </div>
                            </div>
                            {/* Capture */}
                            <div className="h-6 flex items-center gap-1">
                              <span className="text-[10px] text-cyanNeon w-16">Capture:</span>
                              <div className="flex-1 flex items-center border-b border-cyanNeon/40 relative h-4">
                                <span className="inline-block w-10 h-0" />
                                <span className="inline-block w-8 h-4 border-l-2 border-t-2 border-r-2 border-cyanNeon bg-cyanNeon/10" />
                                <span className="inline-block w-8 h-0 border-b-2 border-cyanNeon" />
                              </div>
                            </div>
                          </div>

                          {/* Annotated Skew */}
                          <div className="p-2.5 rounded bg-bgDark border border-line text-[11px] leading-snug">
                            <span className="text-cyanNeon font-bold">Skew = 0.23 ns - 0.15 ns = +0.08 ns (+80 ps)</span>
                            <p className="text-textDim text-[10px] mt-1">
                              Helps setup on this data path by 80 ps, but reduces hold margin by 80 ps!
                            </p>
                          </div>
                        </div>

                        <div className="font-mono text-[10px] text-textFaint text-center border-t border-line/40 pt-2 mt-2">
                          Waveform sketch is conceptual; not to physical scale
                        </div>
                      </div>
                    </div>

                    {/* Equations Banner */}
                    <div className="mt-4 p-3 rounded-lg bg-bgPanel2 border border-line font-mono text-xs grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="text-textDim">
                        <span className="text-greenNeon font-bold">Setup Margin: </span>
                        <code>Tclk + skew - uncertainty - tCQ - tDATA - tSETUP</code>
                      </div>
                      <div className="text-textDim">
                        <span className="text-amberWarn font-bold">Hold Margin: </span>
                        <code>tCQ_min + tDATA_min - skew - tHOLD - hold_unc</code>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Visual 4: Routing, Multi-layer & Signal Integrity (Image 5) */}
              {currentStep.stepNumber === "06" && (
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-bgDark border border-line">
                    <div className="font-mono text-xs text-cyanNeon uppercase tracking-widest font-semibold mb-4">
                      Multi-Layer Routing Corridors &amp; Crosstalk Coupling Capacitance
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left: Multi-layer Stack with Vias */}
                      <div className="p-4 rounded-xl bg-bgPanel border border-line flex flex-col justify-between">
                        <div className="font-mono text-[10px] text-textFaint uppercase mb-2 flex items-center justify-between">
                          <span>Multi-Layer Interconnect Stack</span>
                          <span className="text-cyanNeon">Orthogonal Layer Direction</span>
                        </div>

                        <div className="space-y-3 py-3 font-mono text-xs">
                          {/* M3 */}
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-cyanNeon w-24">M3 (Horizontal)</span>
                            <div className="flex-1 h-3 rounded bg-cyanNeon/40 border border-cyanNeon relative flex items-center justify-end pr-8">
                              <span className="w-2.5 h-2.5 rounded-full bg-amberWarn" title="Via23" />
                            </div>
                          </div>

                          {/* Via23 Drop */}
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-textFaint w-24">Via23</span>
                            <div className="flex-1 flex justify-end pr-8">
                              <span className="w-1 h-4 bg-amberWarn/80" />
                            </div>
                          </div>

                          {/* M2 */}
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-greenNeon w-24">M2 (Vertical)</span>
                            <div className="flex-1 flex items-center justify-around h-8">
                              <span className="w-3 h-full rounded bg-greenNeon/40 border border-greenNeon" />
                              <span className="w-3 h-full rounded bg-greenNeon/40 border border-greenNeon" />
                              <span className="w-3 h-full rounded bg-greenNeon/40 border border-greenNeon relative flex items-center justify-center">
                                <span className="w-2 h-2 rounded-full bg-amberWarn" title="Via12" />
                              </span>
                            </div>
                          </div>

                          {/* Via12 Drop */}
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-textFaint w-24">Via12</span>
                            <div className="flex-1 flex justify-end pr-6">
                              <span className="w-1 h-4 bg-amberWarn/80" />
                            </div>
                          </div>

                          {/* M1 */}
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-cyanNeon w-24">M1 (Horizontal)</span>
                            <div className="flex-1 h-3 rounded bg-cyanNeon/40 border border-cyanNeon" />
                          </div>
                        </div>

                        <div className="font-mono text-[10px] text-textFaint text-center border-t border-line/40 pt-2">
                          Actual layer directions and pitch spacing are technology PDK-specific
                        </div>
                      </div>

                      {/* Right: Coupled Nets & Crosstalk Noise */}
                      <div className="p-4 rounded-xl bg-bgPanel border border-line flex flex-col justify-between">
                        <div className="font-mono text-[10px] text-textFaint uppercase mb-2 flex items-center justify-between">
                          <span>Coupled Nets / Noise Glitch</span>
                          <span className="text-amberWarn">Cc Coupling Model</span>
                        </div>

                        <div className="py-4 space-y-4 font-mono text-xs">
                          {/* Aggressor */}
                          <div>
                            <div className="flex items-center justify-between text-[11px] mb-1">
                              <span className="text-red-400 font-bold">Aggressor Net (Fast Switching 0 → 1)</span>
                              <span className="text-textFaint">High slew</span>
                            </div>
                            <div className="w-full h-3 rounded bg-red-500/40 border border-red-500 relative flex items-center">
                              <span className="w-full h-[2px] bg-red-400" />
                            </div>
                          </div>

                          {/* Coupling Capacitors Bridge */}
                          <div className="flex justify-around items-center px-8 text-amberWarn font-mono text-[10px]">
                            <span>|| Cc</span>
                            <span>|| Cc</span>
                            <span>|| Cc</span>
                            <span>|| Cc</span>
                          </div>

                          {/* Victim */}
                          <div>
                            <div className="flex items-center justify-between text-[11px] mb-1">
                              <span className="text-cyanNeon font-bold">Victim Net (Quiet or Timing Critical)</span>
                              <span className="text-amberWarn">Induced Delta-Delay / Glitch</span>
                            </div>
                            <div className="w-full h-3 rounded bg-cyanNeon/40 border border-cyanNeon relative flex items-center justify-center">
                              <span className="w-1/2 h-[2px] bg-cyanNeon" />
                              <span className="w-4 h-2 border-t-2 border-red-400 -mt-1" title="Crosstalk Glitch" />
                              <span className="w-1/2 h-[2px] bg-cyanNeon" />
                            </div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded bg-bgDark border border-line font-mono text-[11px] text-textDim leading-snug">
                          <strong className="text-greenNeon">SI-Aware Timing: </strong>
                          Aggressor transition changes victim delay and induces glitches. Mitigated via <strong>NDR 2W2S</strong>, shielding with VSS, or buffer insertion.
                        </div>
                      </div>
                    </div>

                    {/* Routing Defects Taxonomy */}
                    <div className="mt-4 p-3 rounded-lg bg-bgPanel2 border border-line font-mono text-xs">
                      <span className="text-amberWarn font-bold block mb-1">Route Defects: Engineer's Taxonomy</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-textDim text-[11px]">
                        <div>• <strong>Short:</strong> Unintended conductor contact</div>
                        <div>• <strong>Open:</strong> Disconnected terminal or trace</div>
                        <div>• <strong>Spacing:</strong> Geometric PDK rule violation</div>
                        <div>• <strong>RC Degradation:</strong> Detours &amp; coupling delay</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Default Visual for other stages */}
              {(currentStep.stepNumber === "01" || currentStep.stepNumber === "07" || currentStep.stepNumber === "08") && (
                <div className="p-6 rounded-xl bg-bgDark border border-line text-center space-y-3">
                  <Cpu className="w-8 h-8 text-cyanNeon mx-auto" />
                  <h4 className="font-display font-bold text-base text-textMain">
                    {currentStep.name} Data Flow Schematic
                  </h4>
                  <p className="text-xs font-mono text-textDim max-w-xl mx-auto leading-relaxed">
                    Golden handoff flow: Verifies RTL behavior, physical DRC/LVS decks, multi-corner extraction SPEF, and exports mask-ready GDSII/OASIS streams.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyanNeon/10 border border-cyanNeon/30 font-mono text-xs text-cyanNeon">
                    <span>Clean Signoff Manifest &amp; Mask Checksum</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Flow Deliverables & Checks (Overview) */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 animate-in fade-in duration-200">
              {/* Key Inputs */}
              <div className="p-4 rounded-xl bg-bgDark/60 border border-line flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-textFaint uppercase tracking-widest flex items-center gap-1.5 mb-3 font-semibold">
                    <FileInput className="w-4 h-4 text-cyanNeon" />
                    Key Inputs &amp; Libraries
                  </div>
                  <ul className="space-y-2">
                    {currentStep.keyInputs.map((input, idx) => (
                      <li key={idx} className="font-mono text-xs text-textDim flex items-start gap-2">
                        <span className="text-cyanNeon">▸</span>
                        <span>{input}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Key Outputs */}
              <div className="p-4 rounded-xl bg-bgDark/60 border border-line flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-textFaint uppercase tracking-widest flex items-center gap-1.5 mb-3 font-semibold">
                    <FileOutput className="w-4 h-4 text-greenNeon" />
                    Key Outputs &amp; Deliverables
                  </div>
                  <ul className="space-y-2">
                    {currentStep.keyOutputs.map((output, idx) => (
                      <li key={idx} className="font-mono text-xs text-textDim flex items-start gap-2">
                        <span className="text-greenNeon">▸</span>
                        <span>{output}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Critical Checks */}
              <div className="p-4 rounded-xl bg-bgDark/60 border border-line flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-textFaint uppercase tracking-widest flex items-center gap-1.5 mb-3 font-semibold">
                    <ShieldAlert className="w-4 h-4 text-amberWarn" />
                    Critical Signoff Checks
                  </div>
                  <ul className="space-y-2">
                    {currentStep.criticalChecks.map((check, idx) => (
                      <li key={idx} className="font-mono text-xs text-textDim flex items-start gap-2">
                        <span className="text-amberWarn">▸</span>
                        <span>{check}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EDA Tcl Commands & Commercial Alternatives */}
          {activeTab === 'commands' && (
            <div className="pt-6 space-y-6 animate-in fade-in duration-200">
              {/* EDA Tool Comparison Row */}
              {currentStep.deepDive?.edaComparison && (
                <div className="p-4 rounded-xl bg-bgDark/80 border border-line">
                  <div className="font-mono text-xs text-textFaint uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyanNeon" />
                    <span>Commercial Tool Command Comparison (Version Aware)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentStep.deepDive.edaComparison.map((comp, cpIdx) => (
                      <div key={cpIdx} className="p-3 rounded-lg bg-bgPanel border border-line">
                        <div className="font-mono text-xs font-bold text-textMain mb-1">{comp.role}</div>
                        <div className="text-xs font-mono text-cyanNeon">Synopsys: <code>{comp.synopsys}</code></div>
                        <div className="text-xs font-mono text-greenNeon mt-0.5">Cadence: <code>{comp.cadence}</code></div>
                        {comp.notes && <div className="text-[11px] font-mono text-textFaint mt-1 leading-snug">{comp.notes}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tcl Commands List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-textDim flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyanNeon" />
                    Synopsys ICC2 / Fusion Compiler / DC Shell Procedures:
                  </span>
                  <span className="font-mono text-[11px] text-textFaint">Click command to copy</span>
                </div>

                <div className="space-y-2">
                  {currentStep.tclCommands && currentStep.tclCommands.length > 0 ? (
                    currentStep.tclCommands.map((cmd, cIdx) => (
                      <div
                        key={cIdx}
                        onClick={() => handleCopyCommand(cmd)}
                        className="group p-3 rounded-xl bg-bgDark border border-line hover:border-cyanNeon/60 flex items-center justify-between gap-4 cursor-pointer transition-all"
                      >
                        <div className="font-mono text-xs text-cyanNeon truncate">
                          <span className="text-textFaint select-none mr-2">{cIdx + 1}.</span>
                          <span>{cmd}</span>
                        </div>
                        <button
                          className="p-1 rounded bg-bgPanel border border-line text-textFaint group-hover:text-cyanNeon group-hover:border-cyanNeon transition-colors shrink-0"
                          title="Copy command"
                        >
                          {copiedCmd === cmd ? (
                            <Check className="w-3.5 h-3.5 text-greenNeon" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 rounded-xl bg-bgDark border border-line text-xs font-mono text-textFaint">
                      Standard EDA batch shell procedures utilized.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Diagnosis & Debugging (Playbooks, Mistakes, Interview Tip) */}
          {activeTab === 'debugging' && (
            <div className="pt-6 space-y-6 animate-in fade-in duration-200">
              {/* Real Debugging Patterns (Symptom → Verify → Fix) */}
              {currentStep.deepDive?.debuggingPatterns && currentStep.deepDive.debuggingPatterns.length > 0 && (
                <div className="space-y-3">
                  <div className="font-mono text-xs text-amberWarn uppercase tracking-widest font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amberWarn" />
                    <span>Real Engineering Debugging Patterns</span>
                  </div>

                  <div className="space-y-3">
                    {currentStep.deepDive.debuggingPatterns.map((pat, pIdx) => (
                      <div key={pIdx} className="p-4 rounded-xl bg-bgDark border border-line space-y-2">
                        <div className="font-mono text-xs font-bold text-textMain flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amberWarn" />
                          <span>{pat.problem}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                          <div className="p-2.5 rounded bg-bgPanel border border-line">
                            <span className="text-amberWarn font-bold block mb-1">Symptom</span>
                            <span className="text-textDim">{pat.symptom}</span>
                          </div>
                          <div className="p-2.5 rounded bg-bgPanel border border-line">
                            <span className="text-cyanNeon font-bold block mb-1">Verify</span>
                            <span className="text-textDim">{pat.verify}</span>
                          </div>
                          <div className="p-2.5 rounded bg-bgPanel border border-line">
                            <span className="text-greenNeon font-bold block mb-1">Fix</span>
                            <span className="text-textDim">{pat.fix}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Common Mistakes to Avoid */}
              {currentStep.deepDive?.commonMistakes && currentStep.deepDive.commonMistakes.length > 0 && (
                <div className="p-4 sm:p-5 rounded-xl bg-bgDark/80 border border-line">
                  <div className="font-mono text-xs text-red-400 uppercase tracking-widest font-semibold flex items-center gap-2 mb-3">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    <span>Common Engineering Mistakes &amp; Gotchas</span>
                  </div>
                  <ul className="space-y-2">
                    {currentStep.deepDive.commonMistakes.map((mistake, mIdx) => (
                      <li key={mIdx} className="font-mono text-xs text-textDim flex items-start gap-2.5 leading-relaxed">
                        <span className="text-red-400 font-bold shrink-0">✕</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technical Interview Checkpoint */}
              <div className="p-5 rounded-2xl bg-amberWarn/5 border border-amberWarn/30 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-amberWarn font-semibold">
                  <Sparkles className="w-4 h-4 text-amberWarn" />
                  <span>Technical Interview Question Focus</span>
                </div>
                <p className="text-sm text-textDim leading-relaxed">
                  {currentStep.interviewTip || "Focus on trade-offs between timing slack, routing congestion, and physical DRC rules."}
                </p>
                <div className="pt-2 border-t border-amberWarn/20 font-mono text-xs text-textFaint">
                  💡 Tip: Always tie answers back to how the change impacted Worst Negative Slack (WNS), clock skew budgets, or design rule cleanliness.
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation */}
          <div className="mt-8 pt-4 border-t border-line flex items-center justify-between">
            <button
              disabled={activeStepIndex === 0}
              onClick={() => setActiveStepIndex(activeStepIndex - 1)}
              className="font-mono text-xs px-4 py-2 rounded-lg bg-bgDark border border-line text-textDim hover:text-textMain disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              ← Previous Stage
            </button>

            <span className="font-mono text-xs text-textFaint">
              Stage {activeStepIndex + 1} of {PD_FLOW_STEPS.length}
            </span>

            <button
              disabled={activeStepIndex === PD_FLOW_STEPS.length - 1}
              onClick={() => setActiveStepIndex(activeStepIndex + 1)}
              className="font-mono text-xs px-4 py-2 rounded-lg bg-cyanNeon/10 border border-cyanDim text-cyanNeon hover:bg-cyanNeon/20 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              Next Stage →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

