import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { isDark } = useTheme();

  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const mouseCoordsRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (mouse / trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsVisible(true);

    let followerX = -100;
    let followerY = -100;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseCoordsRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });

      // Detect interactive elements
      const target = e.target as HTMLElement | null;
      const isInteractive = target?.closest('a, button, input, textarea, [role="button"], .cursor-pointer');
      setIsHovered(!!isInteractive);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Smooth follower interpolation loop (60fps)
    const animateFollower = () => {
      const { x: targetX, y: targetY } = mouseCoordsRef.current;
      followerX += (targetX - followerX) * 0.22;
      followerY += (targetY - followerY) * 0.22;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animateFollower);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    animationFrameId = requestAnimationFrame(animateFollower);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999]" aria-hidden="true">
      {/* 1. Precision Center Probe Dot */}
      <div
        ref={cursorRef}
        className={`fixed left-0 top-0 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 transition-colors duration-150 ${
          isHovered
            ? isDark
              ? 'bg-greenNeon shadow-glow-green scale-125'
              : 'bg-greenNeon border border-white shadow-[0_0_8px_rgba(5,150,105,0.6)] scale-125'
            : isDark
            ? 'bg-cyanNeon shadow-glow-cyan'
            : 'bg-cyanNeon border border-white shadow-[0_0_8px_rgba(2,132,199,0.6)]'
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
            isClicked ? 0.75 : 1
          })`,
        }}
      />

      {/* 2. VLSI EDA Layout Reticle / Target Cell Frame */}
      <div
        ref={followerRef}
        className={`fixed left-0 top-0 transition-all duration-150 ease-out flex items-center justify-center ${
          isHovered
            ? isDark
              ? 'w-10 h-10 border border-greenNeon/90 bg-greenNeon/10 shadow-[0_0_15px_rgba(79,224,168,0.4)]'
              : 'w-10 h-10 border-2 border-greenNeon bg-greenNeon/15 shadow-[0_0_15px_rgba(5,150,105,0.25)]'
            : isDark
            ? 'w-7 h-7 border border-cyanNeon/60 bg-cyanNeon/5 shadow-[0_0_10px_rgba(51,214,240,0.25)]'
            : 'w-7 h-7 border-2 border-cyanNeon/80 bg-cyanNeon/10 shadow-[0_0_10px_rgba(2,132,199,0.2)]'
        } ${isClicked ? 'scale-90' : 'scale-100'}`}
      >
        {/* VLSI Reticle Corner Marks */}
        <span
          className={`absolute -top-1 -left-1 w-1.5 h-1.5 border-t-2 border-l-2 ${
            isHovered ? 'border-greenNeon' : 'border-cyanNeon'
          }`}
        />
        <span
          className={`absolute -top-1 -right-1 w-1.5 h-1.5 border-t-2 border-r-2 ${
            isHovered ? 'border-greenNeon' : 'border-cyanNeon'
          }`}
        />
        <span
          className={`absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b-2 border-l-2 ${
            isHovered ? 'border-greenNeon' : 'border-cyanNeon'
          }`}
        />
        <span
          className={`absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b-2 border-r-2 ${
            isHovered ? 'border-greenNeon' : 'border-cyanNeon'
          }`}
        />

        {/* Micro Precision Crosshair Lines */}
        <div
          className={`absolute w-full h-[1px] ${
            isHovered ? 'bg-greenNeon/40' : 'bg-cyanNeon/30'
          }`}
        />
        <div
          className={`absolute h-full w-[1px] ${
            isHovered ? 'bg-greenNeon/40' : 'bg-cyanNeon/30'
          }`}
        />
      </div>
    </div>
  );
};
