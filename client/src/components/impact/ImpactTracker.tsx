import React, { useEffect, useState } from 'react';
import { Award, Flame, Shield, Leaf, PlusCircle, CheckCircle, Info } from 'lucide-react';
import { api } from '../../services/api';
import { ImpactSummary } from '../../types';

export const ImpactTracker: React.FC = () => {
  const [impact, setImpact] = useState<ImpactSummary | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state for logging a custom completed action
  const [category, setCategory] = useState('commute');
  const [actionTitle, setActionTitle] = useState('');
  const [co2Saved, setCo2Saved] = useState('1.5');
  const [exposureAvoided, setExposureAvoided] = useState('40');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchImpact = async () => {
    try {
      const data = await api.getImpact();
      setImpact(data);
    } catch (err) {
      console.warn('Error loading impact summary:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImpact();
  }, []);

  const handleLogAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionTitle.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await api.logAction({
        category,
        actionTitle: actionTitle.trim(),
        co2SavedKg: parseFloat(co2Saved) || 0.5,
        exposureAvoidedPct: parseFloat(exposureAvoided) || 30
      });
      setActionTitle('');
      await fetchImpact();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto space-y-6" aria-labelledby="impact-heading">
      {/* Overview Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 id="impact-heading" className="text-lg font-bold text-[var(--text-main)]">
              Personal Impact & Exposure Tracker
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Transparent, model-grounded tracking of pollution avoided, emissions reduced, and household consistency
            </p>
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-main)] text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 mb-1">
              <Leaf className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">CO2 Avoided</span>
            </div>
            <span className="text-3xl font-extrabold text-[var(--text-main)]">
              {impact?.totalCo2SavedKg ?? 0.0} <span className="text-xs font-medium">kg</span>
            </span>
            <p className="text-[10px] text-[var(--text-subtle)] mt-1">Direct tailpipe avoidance</p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-main)] text-center">
            <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400 mb-1">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Avg Exposure Cut</span>
            </div>
            <span className="text-3xl font-extrabold text-[var(--text-main)]">
              ~{impact?.averageExposureAvoidedPct ?? 0}%
            </span>
            <p className="text-[10px] text-[var(--text-subtle)] mt-1">Estimated PM2.5 inhalation</p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-main)] text-center">
            <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400 mb-1">
              <Flame className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Clean Air Streak</span>
            </div>
            <span className="text-3xl font-extrabold text-[var(--text-main)]">
              {impact?.streakDays ?? 0} <span className="text-xs font-medium">days</span>
            </span>
            <p className="text-[10px] text-[var(--text-subtle)] mt-1">Consecutive smog protocols</p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-main)] text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 mb-1">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Logged Actions</span>
            </div>
            <span className="text-3xl font-extrabold text-[var(--text-main)]">
              {impact?.totalActionsCount ?? 0}
            </span>
            <p className="text-[10px] text-[var(--text-subtle)] mt-1">Verified family actions</p>
          </div>
        </div>
      </div>

      {/* Log an Action Form */}
      <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm">
        <h3 className="text-sm font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
          <PlusCircle className="w-4 h-4 text-emerald-600" />
          Log a Clean Air or Low-Emission Action
        </h3>

        <form onSubmit={handleLogAction} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="text-xs font-semibold text-[var(--text-main)] block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card-secondary)] text-xs text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="commute">Clean Commute / Transit</option>
              <option value="indoor">Indoor Air Sealing / HEPA</option>
              <option value="sustainability">Consolidated Errands / Zero-Idling</option>
              <option value="heating">Clean Heating / No Biomass</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-[var(--text-main)] block mb-1">Action Description</label>
            <input
              type="text"
              value={actionTitle}
              onChange={(e) => setActionTitle(e.target.value)}
              placeholder="e.g. Switched to metro for office commute; wore N95 respirator"
              className="w-full px-3 py-2 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] text-xs text-[var(--text-main)] placeholder-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isSubmitting || !actionTitle.trim()}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Record Action'}
            </button>
          </div>
        </form>
      </div>

      {/* Action History Table */}
      <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-subtle)] mb-4">
          Household Completed Action History
        </h3>

        {impact?.completedActions && impact.completedActions.length > 0 ? (
          <div className="divide-y divide-[var(--border-main)]">
            {impact.completedActions.map((act) => (
              <div key={act.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--text-main)]">{act.actionTitle}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                      {act.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-[var(--text-subtle)]">
                    Logged: {new Date(act.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="font-bold text-emerald-600 block">+{act.co2SavedKg} kg CO2</span>
                    <span className="text-[10px] text-[var(--text-subtle)]">Emissions Avoided</span>
                  </div>
                  <div>
                    <span className="font-bold text-blue-600 block">~{act.exposureAvoidedPct}%</span>
                    <span className="text-[10px] text-[var(--text-subtle)]">Exposure Cut</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-[var(--text-muted)]">
            No completed actions logged yet. Toggle items in your Daily Routine or record one above!
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-[var(--border-main)] text-[11px] text-[var(--text-subtle)] italic flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5" />
          <span>{impact?.disclaimer}</span>
        </div>
      </div>
    </section>
  );
};
