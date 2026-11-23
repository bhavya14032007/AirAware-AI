import React, { useState } from 'react';
import { 
  Wind, 
  MapPin, 
  Search, 
  Moon, 
  Sun, 
  Users, 
  Github, 
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useEnvironmental, BENCHMARK_CITIES } from '../../context/EnvironmentalContext';
import { useTheme } from '../../context/ThemeContext';
import { LocationSelectorModal } from '../dashboard/LocationSelectorModal';
import { HouseholdProfileModal } from '../profile/HouseholdProfileModal';

export const Header: React.FC = () => {
  const { location, setLocation, refreshData, isLoading, airQuality } = useEnvironmental();
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-main)] bg-[var(--bg-card)]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-800 flex items-center justify-center text-white shadow-sm ring-2 ring-emerald-500/20">
            <Wind className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-[var(--text-main)]">AirAware AI</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-2.5 h-2.5" /> Intelligence
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] hidden sm:block">Severe Smog & Lifestyle Protection</p>
          </div>
        </div>

        {/* Location Switcher & Benchmarks */}
        <div className="flex items-center gap-2 flex-1 max-w-md justify-center">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-main)] bg-[var(--bg-app)] hover:bg-[var(--bg-hover)] text-sm text-[var(--text-main)] transition-colors group focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Change location"
          >
            <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="truncate max-w-[150px] sm:max-w-[200px] font-medium">{location.city || location.name}</span>
            <Search className="w-3.5 h-3.5 text-[var(--text-subtle)] ml-1" />
          </button>

          {/* Quick Benchmark Pills for Winter Smog Hotspots */}
          <div className="hidden lg:flex items-center gap-1">
            {BENCHMARK_CITIES.slice(0, 3).map((bench) => (
              <button
                key={bench.name}
                onClick={() => setLocation(bench)}
                className={`text-xs px-2 py-1 rounded-md transition-colors ${
                  location.city === bench.city
                    ? 'bg-emerald-600 text-white font-medium shadow-sm'
                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                {bench.city}
              </button>
            ))}
          </div>
        </div>

        {/* Right Action Icons: Refresh, Profile, Theme, Repo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => refreshData()}
            disabled={isLoading}
            className="p-2 rounded-lg border border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition-colors disabled:opacity-50"
            title="Refresh live environmental data"
            aria-label="Refresh data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setIsProfileOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-main)] bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] text-xs sm:text-sm font-medium text-[var(--text-main)] transition-colors"
            title="Configure household sensitivity & equipment"
            aria-label="Household safety profile"
          >
            <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden md:inline">Household</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition-colors"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <a
            href="https://github.com/airaware-ai/airaware-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition-colors"
            title="View Public GitHub Repository"
            aria-label="Public GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>

      <LocationSelectorModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <HouseholdProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </header>
  );
};
