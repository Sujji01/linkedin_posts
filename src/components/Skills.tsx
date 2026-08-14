import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Sparkles, Filter, Cpu, Wrench, Binary, Code, Sliders } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { useGSAP } from '@gsap/react';
import { gsap } from '../utils/gsap';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const filterTabs = [
    { key: 'all', label: 'All Capabilities', icon: Filter },
    { key: 'vlsi', label: 'Physical Design Flow', icon: Cpu },
    { key: 'eda', label: 'EDA Tools', icon: Wrench },
    { key: 'node', label: 'Nodes & Signoff', icon: Binary },
    { key: 'scripting', label: 'Scripting & RTL', icon: Code },
    { key: 'tools', label: 'Other Skills', icon: Sliders },
  ];

  // Filtered skill categories based on active tab and search query
  const filteredCategories = useMemo(() => {
    return SKILL_CATEGORIES.map((category) => {
      const categoryMatches =
        selectedCategory === 'all' || category.categoryKey === selectedCategory;

      const matchedSkills = category.skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (skill.level && skill.level.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      return {
        ...category,
        skills: matchedSkills,
        visible: categoryMatches && matchedSkills.length > 0,
      };
    }).filter((c) => c.visible);
  }, [selectedCategory, searchQuery]);

  // Initial ScrollTrigger entrance
  useGSAP(
    () => {
      gsap.fromTo(
        '.skills-header',
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
        '.skill-card-item',
        { opacity: 0, y: 30 },
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

  // Smooth fade-in animation when switching tabs or typing search
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll('.skill-card-item');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out', clearProps: 'all' }
        );
      }
    }
  }, [selectedCategory, searchQuery]);

  return (
    <section ref={sectionRef} id="skills" className="py-24 relative z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="skills-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs font-semibold text-cyanNeon tracking-widest uppercase mb-3">
              <span className="w-4 h-[1px] bg-cyanNeon shadow-glow-cyan" />
              <span>02 · Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-textMain tracking-tight">
              Technical <span className="text-cyanNeon">Skills</span>
            </h2>
            <p className="mt-2 text-textDim text-base">
              Organized the way a design kit is organized — by function and EDA pipeline.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-textFaint absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill, tool, node..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-bgPanel border border-line rounded-lg font-mono text-xs text-textMain placeholder-textFaint focus:outline-none focus:border-cyanNeon focus:ring-1 focus:ring-cyanNeon transition-all"
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

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedCategory === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyanNeon/15 text-cyanNeon border border-cyanDim shadow-sm shadow-cyanNeon/10'
                    : 'bg-bgPanel text-textDim border border-line hover:text-textMain hover:border-lineSoft'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyanNeon' : 'text-textFaint'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        {filteredCategories.length > 0 ? (
          <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat, idx) => (
              <div
                key={idx}
                className="skill-card-item rounded-xl bg-bgPanel border border-lineSoft p-6 relative overflow-hidden flex flex-col justify-between group hover:border-cyanDim transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-cyanNeon/10"
              >
                {/* Top Cyan Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyanNeon via-greenNeon to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-display font-semibold text-base text-textMain group-hover:text-cyanNeon transition-colors">
                      {cat.title}
                    </h3>
                    <span className="font-mono text-[11px] text-textFaint px-2 py-0.5 rounded bg-bgDark border border-line">
                      {cat.skills.length} skills
                    </span>
                  </div>
                  <p className="font-mono text-xs text-textDim mb-5">
                    {cat.subtitle}
                  </p>

                  {/* Chips */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className={`font-mono text-xs px-3 py-1.5 rounded-md border transition-all flex items-center gap-1.5 ${
                          skill.highlight
                            ? 'bg-cyanNeon/5 border-cyanDim/60 text-cyanNeon hover:bg-cyanNeon/15 hover:border-cyanNeon'
                            : 'bg-bgDark/60 border-line text-textDim hover:text-textMain hover:border-lineSoft'
                        }`}
                      >
                        {skill.highlight && <Sparkles className="w-2.5 h-2.5 text-cyanNeon" />}
                        <span>{skill.name}</span>
                        {skill.level && (
                          <span className="text-[10px] text-textFaint">· {skill.level}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-bgPanel border border-line rounded-xl">
            <p className="font-mono text-sm text-textDim">
              No skills found matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 font-mono text-xs text-cyanNeon hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
