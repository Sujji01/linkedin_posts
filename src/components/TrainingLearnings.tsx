import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Terminal, 
  ExternalLink, 
  Download, 
  HelpCircle, 
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Compass
} from 'lucide-react';
import { TRAINING_CHAPTERS } from '../data/trainingData';
import { PdfViewer } from './PdfViewer';
import { useGSAP } from '@gsap/react';
import { gsap } from '../utils/gsap';

export const TrainingLearnings: React.FC = () => {
  const [viewMode, setViewMode] = useState<'website' | 'pdf'>('website');
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [pdfPageTarget, setPdfPageTarget] = useState<number>(1);
  const sectionRef = useRef<HTMLElement>(null);
  const currentChapter = TRAINING_CHAPTERS[activeChapterIndex];

  useGSAP(
    () => {
      gsap.fromTo(
        '.training-header',
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
        '.training-panel',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
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

  const handleJumpToPdfPage = (pageNumber: number) => {
    setPdfPageTarget(pageNumber);
    setViewMode('pdf');
  };

  return (
    <section ref={sectionRef} id="training" className="py-24 relative z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="training-header flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 font-mono text-xs font-semibold text-cyanNeon tracking-widest uppercase mb-3">
              <span className="w-4 h-[1px] bg-cyanNeon shadow-glow-cyan" />
              <span>08 · Training Learnings &amp; Engineering Handbook</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-textMain tracking-tight">
              What I Learned in My <span className="text-cyanNeon">Training Period</span>
            </h2>
            <p className="mt-2 text-textDim text-sm sm:text-base leading-relaxed">
              A comprehensive 10-chapter physical design engineering handbook compiled during my Advanced Physical Design training at Maven Silicon. Explore the full curriculum in an interactive website view or browse the original 10-page technical handbook PDF.
            </p>
          </div>

          {/* Action Toolbar: View Mode Toggle & PDF Download */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Mode Switcher */}
            <div className="p-1 rounded-xl bg-bgPanel border border-line flex items-center gap-1 shadow-inner">
              <button
                onClick={() => setViewMode('website')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all ${
                  viewMode === 'website'
                    ? 'bg-cyanNeon/15 border border-cyanNeon text-cyanNeon font-semibold shadow-sm shadow-cyanNeon/20'
                    : 'text-textDim hover:text-textMain'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-cyanNeon" />
                <span>Website View</span>
              </button>

              <button
                onClick={() => setViewMode('pdf')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all ${
                  viewMode === 'pdf'
                    ? 'bg-cyanNeon/15 border border-cyanNeon text-cyanNeon font-semibold shadow-sm shadow-cyanNeon/20'
                    : 'text-textDim hover:text-textMain'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-cyanNeon" />
                <span>PDF View (10 Pages)</span>
              </button>
            </div>

            {/* Direct PDF Download & Popout Links */}
            <a
              href="/VLSI_Training_Guide.pdf"
              download="Sujith_Polisetty_VLSI_Training_Handbook.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-bgDark border border-line hover:border-cyanNeon/50 text-textDim hover:text-cyanNeon font-mono text-xs transition-colors"
              title="Download original handbook PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <a
              href="/VLSI_Training_Guide.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-bgDark border border-line hover:border-cyanNeon/50 text-textDim hover:text-cyanNeon font-mono text-xs transition-colors"
              title="Open full PDF in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>New Tab</span>
            </a>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MODE A: INTERACTIVE WEBSITE VIEW                             */}
        {/* ============================================================ */}
        {viewMode === 'website' && (
          <div className="training-panel space-y-8 animate-in fade-in duration-300">
            {/* 10-Chapter Responsive Navigation Grid (fits cleanly within container) */}
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 p-2.5 bg-bgPanel rounded-2xl border border-line shadow-lg">
              {TRAINING_CHAPTERS.map((chap, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <button
                    key={chap.id}
                    onClick={() => setActiveChapterIndex(idx)}
                    className={`group w-full py-2 px-1.5 rounded-xl text-center transition-all duration-200 relative flex flex-col justify-between min-h-[62px] ${
                      isActive
                        ? 'bg-cyanNeon/15 border border-cyanNeon text-cyanNeon shadow-sm shadow-cyanNeon/25 font-semibold'
                        : 'bg-bgDark/70 border border-line/80 text-textDim hover:text-textMain hover:border-lineSoft hover:bg-bgDark'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] w-full px-1 text-textFaint group-hover:text-textDim">
                      <span className={isActive ? 'text-cyanNeon font-bold' : ''}>Ch.{chap.chapterNumber}</span>
                      <span className="text-[9px] text-cyanNeon/80">p.{chap.pdfPage}</span>
                    </div>
                    
                    <span 
                      className="block font-display font-medium text-xs px-1 truncate w-full"
                      title={chap.title}
                    >
                      {chap.shortTitle || chap.title}
                    </span>

                    {/* Active Accent Bar/Pill */}
                    <div className="w-full flex justify-center mt-1">
                      {isActive ? (
                        <span className="w-5 h-1 rounded-full bg-cyanNeon shadow-glow-cyan" />
                      ) : (
                        <span className="w-1.5 h-1 rounded-full bg-transparent group-hover:bg-lineSoft transition-colors" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Chapter Content Card */}
            <div className="rounded-2xl bg-gradient-to-br from-bgPanel2 via-bgPanel to-bgDark border border-cyanDim/60 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Ambient Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyanNeon/5 rounded-full blur-3xl -z-0 pointer-events-none" />

              {/* Chapter Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-line">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-greenNeon/10 border border-greenNeon/30 text-greenNeon">
                      Chapter {currentChapter.chapterNumber} of 10
                    </span>
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-cyanNeon/10 border border-cyanNeon/30 text-cyanNeon">
                      {currentChapter.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-textMain">
                    {currentChapter.title}
                  </h3>
                  <p className="font-mono text-xs text-textDim mt-1">
                    {currentChapter.subtitle}
                  </p>
                </div>

                {/* Jump to Corresponding PDF Page */}
                <button
                  onClick={() => handleJumpToPdfPage(currentChapter.pdfPage)}
                  className="self-start md:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyanNeon/10 border border-cyanNeon/40 hover:bg-cyanNeon/20 text-cyanNeon font-mono text-xs transition-colors shrink-0"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View in Original PDF (Page {currentChapter.pdfPage})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Chapter Executive Overview */}
              <div className="py-5 border-b border-line/50">
                <div className="text-xs font-mono text-textFaint uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-cyanNeon" />
                  <span>Executive Curriculum Summary</span>
                </div>
                <p className="text-sm sm:text-base text-textDim leading-relaxed">
                  {currentChapter.overview}
                </p>
              </div>

              {/* Core Concepts Grid */}
              <div className="py-6 space-y-4">
                <div className="text-xs font-mono text-textFaint uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-cyanNeon" />
                  <span>Core Physical Design Concepts &amp; Architecture</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentChapter.coreConcepts.map((concept, cIdx) => (
                    <div key={cIdx} className="p-4 rounded-xl bg-bgDark/80 border border-line flex flex-col justify-between">
                      <div>
                        <h4 className="font-display font-bold text-sm text-cyanNeon mb-2.5 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyanNeon" />
                          {concept.title}
                        </h4>
                        <ul className="space-y-2">
                          {concept.points.map((pt, pIdx) => (
                            <li key={pIdx} className="text-xs text-textDim flex items-start gap-2 leading-relaxed">
                              <span className="text-cyanNeon/60 shrink-0 mt-0.5">▸</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Physical Formulas & Mathematical Calculations */}
              {currentChapter.formulasAndExamples && currentChapter.formulasAndExamples.length > 0 && (
                <div className="my-4 p-5 rounded-xl bg-bgDark border border-line">
                  <div className="font-mono text-xs text-greenNeon uppercase tracking-widest font-semibold flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-greenNeon" />
                    <span>Physical Formulas &amp; Real Numerical Calculations</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentChapter.formulasAndExamples.map((item, fIdx) => (
                      <div key={fIdx} className="p-3.5 rounded-lg bg-bgPanel border border-line">
                        <div className="font-mono text-xs font-bold text-textMain mb-1.5">{item.name}</div>
                        {item.formula && (
                          <div className="font-mono text-xs bg-bgDark p-2 rounded border border-line text-cyanNeon font-bold mb-2">
                            {item.formula}
                          </div>
                        )}
                        {item.calculation && (
                          <pre className="font-mono text-[11px] bg-black/50 p-2 rounded border border-line/60 text-greenNeon whitespace-pre-wrap leading-relaxed">
                            {item.calculation}
                          </pre>
                        )}
                        {item.note && (
                          <div className="font-mono text-[11px] text-textFaint mt-2 leading-snug">
                            💡 {item.note}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EDA Tool Roles & Commands */}
              {currentChapter.edaAndCommands && currentChapter.edaAndCommands.length > 0 && (
                <div className="my-4 p-5 rounded-xl bg-bgDark/80 border border-line">
                  <div className="font-mono text-xs text-cyanNeon uppercase tracking-widest font-semibold flex items-center gap-2 mb-3">
                    <Terminal className="w-4 h-4 text-cyanNeon" />
                    <span>EDA Tools &amp; Industrial Execution</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {currentChapter.edaAndCommands.map((eda, eIdx) => (
                      <div key={eIdx} className="p-3 rounded-lg bg-bgPanel border border-line">
                        <div className="font-mono text-xs font-bold text-cyanNeon mb-1">{eda.tool}</div>
                        <div className="font-mono text-[11px] text-textDim leading-snug">{eda.purpose}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Debugging Protocols (Symptom ➔ Verify ➔ Fix) */}
              {currentChapter.debuggingAndGotchas && currentChapter.debuggingAndGotchas.length > 0 && (
                <div className="my-4 p-5 rounded-xl bg-amberWarn/5 border border-amberWarn/30">
                  <div className="font-mono text-xs text-amberWarn uppercase tracking-widest font-semibold flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-amberWarn" />
                    <span>Real Engineering Debugging Playbooks (Symptom ➔ Verify ➔ Action)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentChapter.debuggingAndGotchas.map((dbg, dIdx) => (
                      <div key={dIdx} className="p-3.5 rounded-lg bg-bgDark/90 border border-line space-y-2">
                        <div className="font-mono text-xs font-bold text-textMain">{dbg.problem}</div>
                        <div className="grid grid-cols-3 gap-2 text-[11px] font-mono pt-1">
                          <div className="p-2 rounded bg-bgPanel border border-line">
                            <span className="text-amberWarn font-bold block mb-0.5">Symptom</span>
                            <span className="text-textDim">{dbg.symptom}</span>
                          </div>
                          <div className="p-2 rounded bg-bgPanel border border-line">
                            <span className="text-cyanNeon font-bold block mb-0.5">Verify</span>
                            <span className="text-textDim">{dbg.verify}</span>
                          </div>
                          <div className="p-2 rounded bg-bgPanel border border-line">
                            <span className="text-greenNeon font-bold block mb-0.5">Action/Fix</span>
                            <span className="text-textDim">{dbg.fix}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Interview Self-Check */}
              {currentChapter.interviewQuestions && currentChapter.interviewQuestions.length > 0 && (
                <div className="my-4 p-5 rounded-xl bg-bgDark border border-line">
                  <div className="font-mono text-xs text-cyanNeon uppercase tracking-widest font-semibold flex items-center gap-2 mb-3">
                    <HelpCircle className="w-4 h-4 text-cyanNeon" />
                    <span>Technical Interview Viva Checkpoints</span>
                  </div>
                  <div className="space-y-3">
                    {currentChapter.interviewQuestions.map((q, qIdx) => (
                      <div key={qIdx} className="p-3.5 rounded-lg bg-bgPanel border border-line">
                        <div className="font-display font-semibold text-xs text-textMain mb-1.5 flex items-start gap-2">
                          <span className="text-cyanNeon font-mono">Q:</span>
                          <span>{q.question}</span>
                        </div>
                        <div className="text-xs text-textDim font-mono pl-4 border-l border-cyanNeon/30 leading-relaxed">
                          <span className="text-greenNeon font-bold">A: </span>
                          {q.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Deliverables Checklist */}
              {currentChapter.deliverables && currentChapter.deliverables.length > 0 && (
                <div className="pt-4 border-t border-line/40">
                  <div className="font-mono text-xs text-textFaint uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-greenNeon" />
                    <span>Engineering Deliverables &amp; Artifacts</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentChapter.deliverables.map((deliv, dIdx) => (
                      <span
                        key={dIdx}
                        className="font-mono text-xs px-2.5 py-1 rounded bg-bgDark border border-line text-textDim flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-greenNeon" />
                        <span>{deliv}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Pagination */}
              <div className="mt-8 pt-4 border-t border-line flex items-center justify-between">
                <button
                  disabled={activeChapterIndex === 0}
                  onClick={() => setActiveChapterIndex(activeChapterIndex - 1)}
                  className="font-mono text-xs px-4 py-2 rounded-lg bg-bgDark border border-line text-textDim hover:text-textMain disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  ← Previous Chapter
                </button>

                <span className="font-mono text-xs text-textFaint">
                  Chapter {activeChapterIndex + 1} of {TRAINING_CHAPTERS.length}
                </span>

                <button
                  disabled={activeChapterIndex === TRAINING_CHAPTERS.length - 1}
                  onClick={() => setActiveChapterIndex(activeChapterIndex + 1)}
                  className="font-mono text-xs px-4 py-2 rounded-lg bg-cyanNeon/10 border border-cyanDim text-cyanNeon hover:bg-cyanNeon/20 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  Next Chapter →
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* MODE B: ORIGINAL HANDBOOK PDF VIEW                           */}
        {/* ============================================================ */}
        {viewMode === 'pdf' && (
          <div className="training-panel space-y-6 animate-in fade-in duration-300">
            {/* Quick Page Jump Selector */}
            <div className="p-4 rounded-xl bg-bgPanel border border-line flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="font-mono text-xs text-cyanNeon font-semibold uppercase tracking-wider">
                  Original 10-Page Technical Handbook
                </div>
                <div className="text-xs text-textDim mt-0.5">
                  Rendered in full resolution with progressive virtualization. Jump directly to any of the 10 training chapters:
                </div>
              </div>

              {/* Page Number Chips */}
              <div className="flex flex-wrap items-center gap-1.5">
                {Array.from({ length: 10 }).map((_, pIdx) => {
                  const pageNum = pIdx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPdfPageTarget(pageNum)}
                      className={`font-mono text-xs w-8 h-8 rounded-lg border transition-all ${
                        pdfPageTarget === pageNum
                          ? 'bg-cyanNeon text-bgDark font-bold border-cyanNeon shadow-sm shadow-cyanNeon/30'
                          : 'bg-bgDark/80 border-line text-textDim hover:text-textMain hover:border-cyanNeon/50'
                      }`}
                      title={`Jump to Page ${pageNum}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Embedded Progressive PDF Viewer */}
            <div className="rounded-2xl border border-line bg-bgPanel2 p-2 sm:p-4 shadow-2xl relative">
              <PdfViewer
                url="/VLSI_Training_Guide.pdf"
                downloadUrl="/VLSI_Training_Guide.pdf"
                className="max-h-[850px]"
              />
            </div>

            {/* Native Browser Fallback Bar */}
            <div className="p-4 rounded-xl bg-bgDark/80 border border-line flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-textDim">
              <span>
                💡 Prefer your browser's native PDF interface or Adobe Reader?
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="/VLSI_Training_Guide.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyanNeon hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full PDF in New Window</span>
                </a>
                <span className="text-textFaint">·</span>
                <a
                  href="/VLSI_Training_Guide.pdf"
                  download="Sujith_Polisetty_VLSI_Training_Handbook.pdf"
                  className="text-greenNeon hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Local Copy</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
