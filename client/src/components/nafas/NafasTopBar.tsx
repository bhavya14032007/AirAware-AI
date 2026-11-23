import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, Moon, Sun, Building, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface NafasTopBarProps {
  onProfileClick: () => void;
  onBackClick?: () => void;
}

export const NafasTopBar: React.FC<NafasTopBarProps> = ({ onProfileClick, onBackClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [isFloorDropdownOpen, setIsFloorDropdownOpen] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState('Floor Overview (Fl. 3)');

  const floors = [
    'Building Overview (All Floors)',
    'Floor Overview (Fl. 3 - Active)',
    'Floor Overview (Fl. 2 - Residential)',
    'Floor Overview (Fl. 1 - Commercial)',
  ];

  return (
    <header className="flex items-center justify-between pb-5 pt-1 text-white border-b border-[#232B26] mb-6">
      {/* Breadcrumbs Navigation with Dropdown Switcher */}
      <div className="flex items-center gap-2 text-xs font-medium text-[#718679]">
        <button
          onClick={onBackClick}
          className="p-1 rounded-md hover:text-white transition-colors flex items-center justify-center text-[#718679]"
          aria-label="Go back"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <span className="hover:text-white cursor-pointer transition-colors">Overview</span>
          <span className="text-[#333F37]">/</span>
          <span className="hover:text-white cursor-pointer transition-colors">Building Overview</span>
          <span className="text-[#333F37]">/</span>

          {/* Interactive Floor Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFloorDropdownOpen(prev => !prev)}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#141916] border border-[#232B26] text-white font-medium hover:border-[#38463E] transition-colors"
            >
              <span>{selectedFloor.split(' ')[0]} {selectedFloor.split(' ')[1]}</span>
              <ChevronDown className="w-3 h-3 text-[#A3E635]" />
            </button>

            {isFloorDropdownOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-60 rounded-xl bg-[#141916] border border-[#232B26] p-1.5 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100">
                {floors.map((fl) => (
                  <button
                    key={fl}
                    onClick={() => {
                      setSelectedFloor(fl);
                      setIsFloorDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      selectedFloor === fl ? 'bg-[#18201B] text-[#A3E635] font-semibold' : 'text-gray-300 hover:bg-[#18201B]/70'
                    }`}
                  >
                    <span>{fl}</span>
                    {selectedFloor === fl && <Check className="w-3.5 h-3.5 text-[#A3E635]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Controls: Theme Toggle & User Pill */}
      <div className="flex items-center gap-4">
        {/* Light/Dark Toggle */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#718679]">
          <span className={theme === 'light' ? 'text-white font-semibold' : 'text-[#718679]'}>
            Light
          </span>

          <button
            onClick={toggleTheme}
            className="w-11 h-6 rounded-full bg-[#141916] border border-[#232B26] p-0.5 flex items-center relative transition-colors focus:outline-none"
            title="Toggle theme"
            aria-label="Toggle light/dark theme"
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#A3E635] flex items-center justify-center shadow-sm transition-transform duration-200 ${
                theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
              }`}
            >
              {theme === 'dark' ? (
                <Moon className="w-2.5 h-2.5 text-[#0D110E]" />
              ) : (
                <Sun className="w-2.5 h-2.5 text-[#0D110E]" />
              )}
            </div>
          </button>

          <span className={theme === 'dark' ? 'text-white font-semibold' : 'text-[#718679]'}>
            Dark
          </span>
        </div>

        {/* User Pill */}
        <button
          onClick={onProfileClick}
          className="flex items-center gap-2.5 pl-3.5 pr-1.5 py-1 rounded-full bg-[#141916] border border-[#232B26] hover:border-[#38463E] transition-all group shadow-sm"
          title="Household Profile & Settings"
        >
          <span className="text-xs font-semibold text-white">Hello, Nixtio 👋</span>
          <div className="w-7 h-7 rounded-lg bg-[#0D110E] border border-[#232B26] flex items-center justify-center text-white group-hover:border-[#A3E635]/40 transition-colors">
            {/* Geometric stylized 'N' logo icon */}
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#A3E635]">
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
