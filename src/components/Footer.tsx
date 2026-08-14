import React from 'react';
import { ArrowUp, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-line/60 bg-bgDark relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-bgPanel border border-cyanDim flex items-center justify-center">
              <Cpu className="w-4 h-4 text-cyanNeon" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-textMain tracking-wider block">
                SUJITH POLISETTY
              </span>
              <span className="font-mono text-[11px] text-textFaint">
                Physical Design Engineer · RTL-to-GDSII
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-bgPanel border border-line">
            <span className="w-2 h-2 rounded-full bg-greenNeon animate-pulse" />
            <span className="font-mono text-[11px] text-textDim">
              Node: 32nm Synopsys Toolchain · DRC/LVS Clean
            </span>
          </div>

          {/* Scroll to top */}
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 font-mono text-xs text-textDim hover:text-cyanNeon p-2 rounded-lg bg-bgPanel border border-line hover:border-cyanNeon transition-all group"
              aria-label="Scroll to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-line/40 text-center font-mono text-xs text-textFaint">
          © {new Date().getFullYear()} Sujith Polisetty. All rights reserved. Crafted for High-Yield ASIC Tape-Outs.
        </div>
      </div>
    </footer>
  );
};
