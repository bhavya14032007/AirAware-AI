import React from 'react';
import { Activity, ShieldCheck, Database, AlertCircle } from 'lucide-react';
import { useEnvironmental } from '../../context/EnvironmentalContext';

export const ModeBanner: React.FC = () => {
  const { airQuality, isDemoMode, toggleDemoMode } = useEnvironmental();

  if (!airQuality) return null;

  const isLive = airQuality.status === 'live';

  return (
    <aside 
      className="w-full bg-[var(--bg-card-secondary)] border-b border-[var(--border-main)] py-2 px-4 sm:px-6 lg:px-8 text-xs text-[var(--text-muted)]"
      aria-label="Data authenticity and attribution notice"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span 
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider text-[10px] ${
              isLive
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            {isLive ? 'Live Environmental Feed' : 'Simulated Regional Model'}
          </span>

          <span className="text-[var(--text-subtle)] hidden sm:inline">|</span>
          <span className="truncate max-w-sm">
            Source: <strong className="font-medium text-[var(--text-main)]">{airQuality.source}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[var(--text-subtle)]">
            Updated: {new Date(airQuality.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>

          <button
            onClick={toggleDemoMode}
            className="text-[11px] underline underline-offset-2 hover:text-[var(--accent-primary)] font-medium transition-colors"
          >
            {isDemoMode ? 'Switch to Live API Mode' : 'Explore Demo Preset'}
          </button>
        </div>
      </div>
    </aside>
  );
};
