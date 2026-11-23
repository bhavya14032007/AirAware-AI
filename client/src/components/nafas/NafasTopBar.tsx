import React from 'react';
import { ChevronLeft, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface NafasTopBarProps {
  onProfileClick: () => void;
  onBackClick?: () => void;
}

export const NafasTopBar: React.FC<NafasTopBarProps> = ({ onProfileClick, onBackClick }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between pb-5 pt-1 text-white border-b border-[#1d2721]/40 mb-6">
      {/* Breadcrumbs Navigation */}
      <div className="flex items-center gap-2 text-xs font-medium text-[#7d9385]">
        <button
          onClick={onBackClick}
          className="p-1 rounded-md hover:text-white transition-colors flex items-center justify-center text-[#7d9385]"
          aria-label="Go back"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <span className="hover:text-white cursor-pointer transition-colors">Overview</span>
          <span className="text-[#48594f]">/</span>
          <span className="hover:text-white cursor-pointer transition-colors">Building Overview</span>
          <span className="text-[#48594f]">/</span>
          <span className="text-[#8fa395] font-semibold">Floor Overview</span>
        </div>
      </div>

      {/* Right Controls: Theme Toggle & User Pill */}
      <div className="flex items-center gap-4">
        {/* Light/Dark Toggle */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#7d9385]">
          <span className={theme === 'light' ? 'text-white font-semibold' : 'text-[#7d9385]'}>
            Light
          </span>

          <button
            onClick={toggleTheme}
            className="w-11 h-6 rounded-full bg-[#18231e] border border-[#2b3a30] p-0.5 flex items-center relative transition-colors focus:outline-none"
            title="Toggle theme"
            aria-label="Toggle light/dark theme"
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#a3e635] flex items-center justify-center shadow-sm transition-transform duration-200 ${
                theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
              }`}
            >
              {theme === 'dark' ? (
                <Moon className="w-2.5 h-2.5 text-[#0f1512]" />
              ) : (
                <Sun className="w-2.5 h-2.5 text-[#0f1512]" />
              )}
            </div>
          </button>

          <span className={theme === 'dark' ? 'text-white font-semibold' : 'text-[#7d9385]'}>
            Dark
          </span>
        </div>

        {/* User Pill */}
        <button
          onClick={onProfileClick}
          className="flex items-center gap-2.5 pl-4 pr-1.5 py-1 rounded-full bg-[#18231e] border border-[#26352b] hover:border-[#384c3f] transition-all group shadow-sm"
          title="Household Profile & Settings"
        >
          <span className="text-xs font-semibold text-white">Hello, Nixtio 👋</span>
          <div className="w-7 h-7 rounded-lg bg-black flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
            {/* Geometric stylized 'N' logo icon */}
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
              <path
                d="M6 18V6h3l6 9V6h3v12h-3l-6-9v9H6z"
                fill="currentColor"
              />
            </svg>
          </div>
        </button>
      </div>
    </header>
  );
};
