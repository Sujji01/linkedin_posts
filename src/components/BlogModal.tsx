import React, { useEffect } from 'react';
import { X, Calendar, Clock, ExternalLink, Sparkles, Wrench, CheckCircle2 } from 'lucide-react';
import { BlogPost } from '../types';
import { LinkedInIcon } from './Icons';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (post) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-bgPanel2 border border-cyanDim/70 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyanNeon via-greenNeon to-amberWarn" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-line">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-xs font-semibold text-cyanNeon bg-cyanNeon/10 border border-cyanDim px-2.5 py-0.5 rounded">
                {post.category}
              </span>
              <span className="font-mono text-xs text-textFaint flex items-center gap-1">
                <Calendar className="w-3 h-3 text-cyanNeon" />
                {post.publishedDate}
              </span>
              <span className="font-mono text-xs text-textFaint flex items-center gap-1">
                <Clock className="w-3 h-3 text-greenNeon" />
                {post.readTime}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-bold text-textMain leading-tight">
              {post.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-bgDark border border-line text-textDim hover:text-textMain hover:border-cyanNeon transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto pr-2 py-5 space-y-6 scrollbar-thin">
          {/* Key Takeaways Box */}
          <div className="p-4 rounded-xl bg-bgPanel border border-cyanDim/40">
            <div className="font-mono text-xs text-cyanNeon flex items-center gap-1.5 mb-2.5 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyanNeon" />
              <span>Key Technical Highlights &amp; Metrics:</span>
            </div>
            <ul className="space-y-1.5">
              {post.keyTakeaways.map((item, idx) => (
                <li key={idx} className="font-mono text-xs text-textDim flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-greenNeon shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Full Article Content Paragraphs */}
          <div className="space-y-4 text-textDim text-sm sm:text-base leading-relaxed">
            {post.fullContent.map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>

          {/* EDA Tools Used */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-textFaint mb-2.5 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-cyanNeon" />
              <span>EDA Tools &amp; Verification Environment</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {post.edaTools.map((tool, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs px-2.5 py-1 rounded bg-bgDark border border-line text-textMain"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-line/60">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="font-mono text-xs text-cyanNeon/80 bg-cyanNeon/5 px-2.5 py-0.5 rounded border border-cyanDim/30"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="pt-4 border-t border-line flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 font-mono text-xs rounded-lg border border-line text-textDim hover:text-textMain hover:border-lineSoft transition-colors"
          >
            Close Article
          </button>

          <a
            href={post.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyanNeon/10 border border-cyanDim hover:bg-cyanNeon/20 text-cyanNeon font-mono text-xs font-semibold transition-all shadow-sm shadow-cyanNeon/10"
          >
            <LinkedInIcon className="w-4 h-4" />
            <span>Discuss on LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
