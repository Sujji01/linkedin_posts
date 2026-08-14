import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  images: { src: string; caption: string; alt: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Click backdrop to close */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-bgPanel border border-line text-textDim hover:text-textMain hover:border-cyanNeon transition-colors"
        aria-label="Close image lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Navigation Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((currentIndex - 1 + images.length) % images.length);
          }}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-bgPanel/80 border border-line text-textDim hover:text-cyanNeon hover:border-cyanNeon transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next Navigation Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((currentIndex + 1) % images.length);
          }}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-bgPanel/80 border border-line text-textDim hover:text-cyanNeon hover:border-cyanNeon transition-all"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Image Container */}
      <div className="relative max-w-4xl max-h-[85vh] z-10 flex flex-col items-center">
        <div className="relative overflow-hidden rounded-xl border border-cyanDim/60 shadow-2xl bg-bgDark">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-h-[70vh] w-auto object-contain select-none"
          />
        </div>

        {/* Caption & Counter */}
        <div className="mt-4 text-center">
          <p className="font-mono text-xs sm:text-sm text-textMain font-medium">
            {currentImage.caption}
          </p>
          <p className="font-mono text-xs text-textFaint mt-1">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>

    </div>
  );
};
