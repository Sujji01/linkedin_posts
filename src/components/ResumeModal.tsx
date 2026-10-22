import React, { useEffect, useState } from 'react';
import { X, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { PdfViewer } from './PdfViewer';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
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
      if (e.key === 'Escape' && isOpen) onClose();
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
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden overscroll-none transition-opacity duration-240 ease-out ${
        isActive ? 'opacity-100' : 'opacity-0'
      } bg-black/80 backdrop-blur-sm`}
    >
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div 
        className={`relative w-full max-w-5xl h-[94vh] max-h-[940px] bg-bgPanel2 border border-cyanDim/70 rounded-2xl shadow-2xl shadow-cyanNeon/15 z-10 flex flex-col overflow-hidden my-auto transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'
        }`}
      >
        {/* Top Accent Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyanNeon via-[#63e6be] to-amberWarn" />

        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5 border-b border-line bg-bgPanel/95 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-cyanNeon/10 border border-cyanDim flex items-center justify-center text-cyanNeon shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-display font-bold text-textMain truncate">
                  Sujith Polisetty — Resume
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] text-greenNeon bg-greenNeon/10 border border-greenNeon/30 px-2 py-0.5 rounded">
                  <Sparkles className="w-3 h-3" />
                  Verified · 2 Pages
                </span>
              </div>
              <p className="font-mono text-xs text-textDim truncate">
                Physical Design Engineer (RTL‑to‑GDSII) · Bangalore, India
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg bg-bgDark border border-line text-textDim hover:text-textMain hover:border-cyanNeon hover:rotate-90 transition-all duration-200 shrink-0"
            aria-label="Close resume viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dedicated Modern PDF Viewer with Progressive Canvas Rendering & Continuous Smooth Scrolling */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          <PdfViewer
            url={PERSONAL_INFO.resumePath}
            downloadUrl={PERSONAL_INFO.resumePath}
            className="flex-1"
          />

          {/* Bottom quick summary footer bar */}
          <div className="px-4 py-2.5 bg-bgPanel border-t border-line flex flex-wrap items-center justify-between gap-3 text-xs font-mono shrink-0">
            <div className="flex items-center gap-4 text-textDim">
              <span className="flex items-center gap-1.5 text-cyanNeon font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Available Immediately
              </span>
              <span className="hidden md:inline">·</span>
              <span className="hidden md:inline">Bangalore / Relocate</span>
              <span className="hidden md:inline">·</span>
              <span className="hidden md:inline">{PERSONAL_INFO.email}</span>
            </div>

            <div className="flex items-center gap-2 text-textFaint">
              <span>Scroll with mouse wheel or touchpad · Zoom with controls above</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
