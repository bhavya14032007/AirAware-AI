import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { useEnvironmental } from '../../context/EnvironmentalContext';
import { useProfile } from '../../context/ProfileContext';
import { api } from '../../services/api';
import { AIResponse } from '../../types';

interface AISummaryBannerProps {
  onNavigateAdvisor?: () => void;
}

export const AISummaryBanner: React.FC<AISummaryBannerProps> = ({ onNavigateAdvisor }) => {
  const { location, airQuality } = useEnvironmental();
  const { profile } = useProfile();
  const [aiData, setAiData] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (!airQuality) return;

    setLoading(true);
    api.getRecommendations(location.latitude, location.longitude, location.name)
      .then(res => {
        if (isMounted) setAiData(res);
      })
      .catch(err => {
        console.warn('AI summary fetch error:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [location, airQuality?.aqi]);

  if (!aiData && !loading) return null;

  return (
    <section 
      className="mt-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-950/20 via-[var(--bg-card)] to-emerald-900/10 border border-emerald-500/30 shadow-sm relative overflow-hidden"
      aria-label="AI Pollution Intelligence Briefing"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0 shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                AirAware AI Intelligence Briefing
              </h3>
              {aiData?.risk_level && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  Risk: {aiData.risk_level.replace('_', ' ')}
                </span>
              )}
            </div>

            {loading ? (
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mt-2">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                <span>Synthesizing atmospheric conditions with household safety profile...</span>
              </div>
            ) : (
              <p className="text-sm font-medium text-[var(--text-main)] mt-2 leading-relaxed max-w-4xl">
                {aiData?.summary}
              </p>
            )}
          </div>
        </div>

        {onNavigateAdvisor && (
          <button
            onClick={onNavigateAdvisor}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm shrink-0 self-start md:self-center"
          >
            <span>Ask Advisor</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Top 3 Action recommendations preview */}
      {aiData?.recommendations && aiData.recommendations.length > 0 && (
        <div className="mt-6 pt-6 border-t border-emerald-500/20 grid grid-cols-1 md:grid-cols-3 gap-3">
          {aiData.recommendations.slice(0, 3).map((rec, i) => (
            <div key={i} className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[var(--text-main)]">{rec.title}</span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600">
                  {rec.category}
                </span>
              </div>
              <p className="text-[var(--text-muted)] leading-relaxed">{rec.action}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
