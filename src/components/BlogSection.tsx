import React, { useState, useMemo, useRef } from 'react';
import { BookOpen, Search, ArrowRight, Sparkles, Calendar, Clock, Filter } from 'lucide-react';
import { BLOG_POSTS } from '../data/portfolioData';
import { BlogPost } from '../types';
import { BlogModal } from './BlogModal';
import { LinkedInIcon } from './Icons';
import { useGSAP } from '@gsap/react';
import { gsap } from '../utils/gsap';

export const BlogSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { key: 'all', label: 'All Articles' },
    { key: 'CTS', label: 'CTS & Clocking' },
    { key: 'STA', label: 'Static Timing (STA)' },
    { key: 'Floorplanning', label: 'Floorplan & Power' },
    { key: 'Placement', label: 'Placement' },
    { key: 'Signoff', label: 'DRC/LVS Signoff' },
    { key: 'Scripting', label: 'Tcl Scripting' },
  ];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query)) ||
        post.edaTools.some((tool) => tool.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  useGSAP(
    () => {
      gsap.fromTo(
        '.blog-header',
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
        '.blog-card-item',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
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
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="blog" className="py-24 relative z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="blog-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs font-semibold text-cyanNeon tracking-widest uppercase mb-3">
              <span className="w-4 h-[1px] bg-cyanNeon shadow-glow-cyan" />
              <span>09 · Technical Publications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-textMain tracking-tight">
              Physical Design <span className="text-cyanNeon">Articles &amp; Insights</span>
            </h2>
            <p className="mt-2 text-textDim text-base max-w-2xl">
              Engineering case studies, timing closure strategies, floorplanning methodologies, and automated RTL-to-GDSII insights.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-textFaint absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic, EDA tool, tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-bgPanel border border-line rounded-lg font-mono text-xs text-textMain placeholder-textFaint focus:outline-none focus:border-cyanNeon focus:ring-1 focus:ring-cyanNeon transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-textFaint hover:text-textMain"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          <div className="flex items-center gap-1.5 text-xs font-mono text-textFaint mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5 text-cyanNeon" />
            <span>Category:</span>
          </div>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-2 rounded-lg font-mono text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyanNeon/15 text-cyanNeon border border-cyanNeon shadow-sm shadow-cyanNeon/10 font-semibold'
                    : 'bg-bgPanel text-textDim border border-line hover:text-textMain hover:border-lineSoft'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Blog Post Cards Grid */}
        {filteredPosts.length > 0 ? (
          <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="blog-card-item rounded-xl bg-bgPanel border border-lineSoft p-6 relative overflow-hidden flex flex-col justify-between hover:border-cyanDim transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-cyanNeon/10 group"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyanNeon via-greenNeon to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Meta Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5 rounded bg-cyanNeon/10 border border-cyanDim text-cyanNeon">
                      {post.category}
                    </span>

                    <div className="flex items-center gap-2 font-mono text-[11px] text-textFaint">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-cyanNeon" />
                        {post.publishedDate}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-greenNeon" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setSelectedPost(post)}
                    className="font-display font-bold text-lg text-textMain group-hover:text-cyanNeon transition-colors cursor-pointer mb-2.5 leading-snug"
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-textDim leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  {/* Highlights Bullet Preview */}
                  <div className="mb-4 space-y-1.5 p-3 rounded-lg bg-bgDark/60 border border-line">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-textFaint flex items-center gap-1 mb-1 font-semibold">
                      <Sparkles className="w-3 h-3 text-cyanNeon" />
                      Key Takeaway:
                    </div>
                    <p className="font-mono text-xs text-textDim line-clamp-2">
                      {post.keyTakeaways[0]}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {post.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-[10px] text-textFaint px-2 py-0.5 rounded bg-bgDark border border-line"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-3 border-t border-line/60 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-cyanNeon hover:text-cyanNeon/80 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={post.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md bg-bgDark border border-line text-textFaint hover:text-cyanNeon hover:border-cyanNeon transition-colors"
                    title="View on LinkedIn"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-bgPanel border border-line rounded-xl">
            <BookOpen className="w-8 h-8 text-cyanNeon/60 mx-auto mb-3" />
            <p className="font-mono text-sm text-textDim">
              No articles found matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 font-mono text-xs text-cyanNeon hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>

      {/* Article Reader Modal */}
      <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </section>
  );
};
