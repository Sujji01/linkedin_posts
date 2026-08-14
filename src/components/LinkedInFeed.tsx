import React from 'react';
import { ExternalLink, Sparkles, RefreshCw, ThumbsUp, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { LinkedInIcon } from './Icons';
import rawPosts from '../data/linkedinPosts.json';
import { LinkedInPost } from '../types';

export const LinkedInFeed: React.FC = () => {
  const posts = rawPosts as LinkedInPost[];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Feed Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-bgPanel2 border border-line">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyanNeon/10 border border-cyanDim flex items-center justify-center text-cyanNeon">
            <LinkedInIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-semibold text-sm text-textMain">
                Sujith Polisetty on LinkedIn
              </span>
              <span className="w-2 h-2 rounded-full bg-greenNeon animate-pulse" />
            </div>
            <p className="font-mono text-xs text-textDim">
              Auto-synced updates on Physical Design, CTS, STA & Tape-outs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-textFaint px-2.5 py-1 rounded bg-bgDark border border-line">
            <RefreshCw className="w-3 h-3 text-cyanNeon animate-spin-slow" />
            <span>Synced via GitHub Actions</span>
          </div>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyanNeon/10 border border-cyanDim hover:bg-cyanNeon/20 text-cyanNeon font-mono text-xs font-semibold transition-all shadow-sm shadow-cyanNeon/10"
          >
            <span>Follow Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Posts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="rounded-xl bg-bgPanel border border-lineSoft p-6 flex flex-col justify-between hover:border-cyanDim transition-all duration-300 group shadow-sm hover:shadow-md hover:shadow-cyanNeon/10 relative overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyanNeon to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

            <div>
              {/* Post Author Header */}
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-line">
                <div className="flex items-center gap-2.5">
                  <img
                    src={PERSONAL_INFO.profileImage}
                    alt={PERSONAL_INFO.name}
                    className="w-9 h-9 rounded-full object-cover border border-cyanDim"
                  />
                  <div>
                    <h4 className="font-display font-semibold text-xs text-textMain leading-tight">
                      {PERSONAL_INFO.name}
                    </h4>
                    <span className="font-mono text-[10px] text-textFaint">
                      {post.publishedDate}
                    </span>
                  </div>
                </div>

                <a
                  href={post.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md bg-bgDark border border-line text-textFaint hover:text-cyanNeon hover:border-cyanNeon transition-colors"
                  title="View on LinkedIn"
                >
                  <LinkedInIcon className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Key Highlight Badge if present */}
              {post.keyHighlight && (
                <div className="inline-flex items-center gap-1.5 font-mono text-[11px] text-cyanNeon bg-cyanNeon/5 border border-cyanDim/50 px-2.5 py-0.5 rounded-md mb-3">
                  <Sparkles className="w-3 h-3 text-cyanNeon" />
                  <span>{post.keyHighlight}</span>
                </div>
              )}

              {/* Post Content */}
              <p className="text-xs sm:text-sm text-textDim leading-relaxed mb-4">
                {post.content}
              </p>

              {/* Hashtags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono text-[10px] text-cyanNeon/80 bg-cyanNeon/5 px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Post Footer */}
            <div className="pt-3 border-t border-line flex items-center justify-between text-xs font-mono text-textFaint">
              <div className="flex items-center gap-3">
                {post.likesCount !== undefined && (
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-3.5 h-3.5 text-cyanNeon/70" />
                    <span>{post.likesCount}</span>
                  </span>
                )}
                {post.commentsCount !== undefined && (
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-greenNeon/70" />
                    <span>{post.commentsCount}</span>
                  </span>
                )}
              </div>

              <a
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyanNeon hover:underline font-semibold"
              >
                <span>Read Post</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
