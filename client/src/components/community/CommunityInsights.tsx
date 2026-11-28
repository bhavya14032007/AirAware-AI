import React, { useEffect, useState } from 'react';
import { Users, Globe2, Sparkles, Handshake, HeartHandshake, ShieldCheck, Info } from 'lucide-react';
import { api } from '../../services/api';
import { clientLogger } from '../../utils/logger';
import { CommunityData } from '../../types';

export const CommunityInsights: React.FC = () => {
  const [data, setData] = useState<CommunityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCommunity()
      .then(setData)
      .catch((err) => clientLogger.warn('Failed to load community insights', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-5xl mx-auto space-y-6" aria-labelledby="community-heading">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 id="community-heading" className="text-lg font-bold text-[var(--text-main)]">
                Community Insights & Collective Action
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                Demo Aggregate
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Local neighborhood smog response initiatives, shared clean transit, and aggregate emissions saved
            </p>
          </div>
        </div>

        {/* Aggregate Stats */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block mb-1">
              Active Community Members
            </span>
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {data?.activeCommunityMembers ?? 1420} households
            </span>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">Taking coordinated winter smog precautions</p>
          </div>

          <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 block mb-1">
              Collective Emissions Avoided
            </span>
            <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
              {data?.communityAvoidedCo2Tons ?? 18.4} Tons CO2
            </span>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">Prevented via carpools & zero waste burning</p>
          </div>
        </div>
      </div>

      {/* Community Initiatives */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.initiatives.map((init) => (
          <article 
            key={init.id}
            className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm hover:border-emerald-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                  {init.status}
                </span>
                <span className="text-xs text-[var(--text-subtle)] font-medium">
                  {init.participants} participants
                </span>
              </div>

              <h3 className="text-base font-bold text-[var(--text-main)] mb-1">
                {init.title}
              </h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-3">
                📍 {init.location}
              </p>

              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {init.impact}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--border-main)]">
              <button
                onClick={() => alert(`Joined initiative: ${init.title}!`)}
                className="w-full py-2 rounded-xl border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 text-xs font-semibold transition-colors"
              >
                Join Neighborhood Group
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Data Notice Banner */}
      <div className="p-4 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-main)] text-xs text-[var(--text-subtle)] flex items-center gap-2">
        <Info className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>{data?.dataNotice} Local privacy is preserved; exact household addresses are never tracked or shared.</span>
      </div>
    </section>
  );
};
