import React, { useState, useRef } from 'react';
import { Trophy, CheckCircle2, ZoomIn, Award } from 'lucide-react';
import { ACTIVITIES_DATA } from '../data/portfolioData';
import { ImageLightbox } from './ImageLightbox';
import { LinkedInFeed } from './LinkedInFeed';
import { LinkedInIcon } from './Icons';
import { useGSAP } from '@gsap/react';
import { gsap } from '../utils/gsap';

export const Activities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recognition' | 'linkedin'>('recognition');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const allImages = ACTIVITIES_DATA.flatMap((a) => a.images);

  const handleImageClick = (imageSrc: string) => {
    const idx = allImages.findIndex((img) => img.src === imageSrc);
    if (idx !== -1) {
      setLightboxIndex(idx);
      setLightboxOpen(true);
    }
  };

  useGSAP(
    () => {
      gsap.fromTo(
        '.activities-header',
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
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="activities" className="py-24 relative z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="activities-header max-w-3xl mb-8">
          <div className="flex items-center gap-2.5 font-mono text-xs font-semibold text-cyanNeon tracking-widest uppercase mb-3">
            <span className="w-4 h-[1px] bg-cyanNeon shadow-glow-cyan" />
            <span>06 · Beyond the Bench</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-textMain tracking-tight">
            Activities &amp; <span className="text-cyanNeon">Recognition</span>
          </h2>
          <p className="mt-2 text-textDim text-base">
            Presenting, building hardware systems, and leading in technical competitions.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('recognition')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold transition-all ${
              activeTab === 'recognition'
                ? 'bg-cyanNeon/15 text-cyanNeon border border-cyanNeon shadow-sm shadow-cyanNeon/10'
                : 'bg-bgPanel text-textDim border border-line hover:text-textMain hover:border-lineSoft'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Symposia &amp; Honors ({ACTIVITIES_DATA.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('linkedin')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold transition-all ${
              activeTab === 'linkedin'
                ? 'bg-cyanNeon/15 text-cyanNeon border border-cyanNeon shadow-sm shadow-cyanNeon/10'
                : 'bg-bgPanel text-textDim border border-line hover:text-textMain hover:border-lineSoft'
            }`}
          >
            <LinkedInIcon className="w-3.5 h-3.5 text-cyanNeon" />
            <span>⚡ Live LinkedIn Insights</span>
            <span className="w-1.5 h-1.5 rounded-full bg-greenNeon animate-pulse" />
          </button>
        </div>

        {/* Tab 1: Recognition & Symposia */}
        {activeTab === 'recognition' ? (
          <div className="space-y-12 animate-in fade-in duration-300">
            {ACTIVITIES_DATA.map((activity) => (
              <div
                key={activity.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-bgPanel border border-lineSoft rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:shadow-cyanNeon/5 transition-all"
              >
                {/* Left Details (7 Cols) */}
                <div className="activity-left-info lg:col-span-7 space-y-4">
                  {/* Prize Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amberWarn/40 bg-amberWarn/10 text-amberWarn font-mono text-xs tracking-wider uppercase font-semibold">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{activity.badge}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-textMain leading-snug">
                    {activity.title}
                  </h3>

                  <p className="font-mono text-xs text-cyanNeon">
                    {activity.organization}
                  </p>

                  <p className="text-sm text-textDim leading-relaxed">
                    {activity.description}
                  </p>

                  {/* Key Points */}
                  <div className="space-y-2 pt-2">
                    {activity.keyPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-textDim">
                        <CheckCircle2 className="w-4 h-4 text-greenNeon shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Gallery Grid (5 Cols) */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                  {activity.images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleImageClick(img.src)}
                      className="activity-gallery-photo relative aspect-4/3 rounded-xl overflow-hidden border border-lineSoft group cursor-pointer bg-bgDark"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Hover Zoom Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-bgDark/90 via-bgDark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2.5">
                        <div className="flex justify-end">
                          <span className="p-1 rounded-md bg-bgDark/80 text-cyanNeon">
                            <ZoomIn className="w-3.5 h-3.5" />
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-textMain line-clamp-2 leading-tight">
                          {img.caption}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Tab 2: Live LinkedIn Feed */
          <LinkedInFeed />
        )}

      </div>

      {/* Lightbox Modal */}
      <ImageLightbox
        images={allImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
};
