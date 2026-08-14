import React, { useState, useRef } from 'react';
import { Wrench, FileInput, FileOutput, ShieldAlert } from 'lucide-react';
import { PD_FLOW_STEPS } from '../data/portfolioData';
import { useGSAP } from '@gsap/react';
import { gsap } from '../utils/gsap';

export const PdFlowExplorer: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(2); // Default to Floorplanning
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

  return (
    <section ref={sectionRef} id="flow" className="py-24 relative z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flow-header max-w-3xl mb-12">
          <div className="flex items-center gap-2.5 font-mono text-xs font-semibold text-cyanNeon tracking-widest uppercase mb-3">
            <span className="w-4 h-[1px] bg-cyanNeon shadow-glow-cyan" />
            <span>07 · Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-textMain tracking-tight">
            VLSI Physical Design <span className="text-cyanNeon">Journey</span>
          </h2>
          <p className="mt-2 text-textDim text-base">
            The signal path every design travels on the way to silicon. Click any stage to inspect the tools, inputs, outputs, and signoff checks.
          </p>
        </div>

        {/* 8-Stage Interactive Pipeline Flow */}
        <div className="flow-pipeline-bar overflow-x-auto pb-4 mb-8 scrollbar-thin">
          <div className="flex items-center min-w-[760px] gap-2 p-2 bg-bgPanel rounded-xl border border-line">
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

          {/* Description */}
          <p className="py-6 text-sm sm:text-base text-textDim leading-relaxed border-b border-line/50">
            {currentStep.description}
          </p>

          {/* Inputs, Outputs & Critical Checks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            
            {/* Key Inputs */}
            <div className="p-4 rounded-xl bg-bgDark/60 border border-line">
              <div className="font-mono text-xs text-textFaint uppercase tracking-widest flex items-center gap-1.5 mb-3 font-semibold">
                <FileInput className="w-4 h-4 text-cyanNeon" />
                Key Inputs
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

            {/* Key Outputs */}
            <div className="p-4 rounded-xl bg-bgDark/60 border border-line">
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

            {/* Critical Checks */}
            <div className="p-4 rounded-xl bg-bgDark/60 border border-line">
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
