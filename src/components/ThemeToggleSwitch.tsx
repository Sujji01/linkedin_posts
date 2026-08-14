import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleSwitchProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggleSwitch: React.FC<ThemeToggleSwitchProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showLabel && (
        <span className="font-mono text-xs text-textDim uppercase tracking-wider select-none">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={!isDark}
        onClick={toggleTheme}
        className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-all duration-300 focus:outline-none border shadow-inner ${
          isDark
            ? 'bg-bgPanel2 border-line hover:border-cyanNeon/60 shadow-black/40'
            : 'bg-cyanDim/25 border-cyanNeon/50 hover:border-cyanNeon shadow-cyanNeon/10'
        }`}
        aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
        title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      >
        {/* Track Icons */}
        <span className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none select-none">
          <Moon
            className={`w-3.5 h-3.5 transition-all duration-300 ${
              isDark ? 'text-cyanNeon opacity-90 scale-100' : 'text-textDim opacity-25 scale-75'
            }`}
          />
          <Sun
            className={`w-3.5 h-3.5 transition-all duration-300 ${
              !isDark ? 'text-amberWarn opacity-100 scale-100' : 'text-textDim opacity-25 scale-75'
            }`}
          />
        </span>

        {/* Sliding Thumb Knob */}
        <span
          className={`pointer-events-none inline-flex h-5.5 w-5.5 transform items-center justify-center rounded-full shadow-md transition-transform duration-300 ease-in-out ${
            isDark
              ? 'translate-x-0.5 bg-bgDark border border-cyanDim text-cyanNeon shadow-cyanNeon/20'
              : 'translate-x-7 bg-white border border-amberWarn/60 text-amberWarn shadow-amberWarn/30'
          }`}
        >
          {isDark ? (
            <Moon className="w-3 h-3 text-cyanNeon" />
          ) : (
            <Sun className="w-3 h-3 text-amberWarn animate-spin-slow" />
          )}
        </span>
      </button>
    </div>
  );
};
