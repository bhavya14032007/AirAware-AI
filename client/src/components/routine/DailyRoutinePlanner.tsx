import React, { useEffect, useState } from 'react';
import { 
  CalendarClock, 
  CheckCircle2, 
  Circle, 
  RefreshCw, 
  ShieldAlert, 
  Sparkles, 
  Clock, 
  ArrowRight,
  TrendingDown 
} from 'lucide-react';
import { useEnvironmental } from '../../context/EnvironmentalContext';
import { useProfile } from '../../context/ProfileContext';
import { api } from '../../services/api';
import { clientLogger } from '../../utils/logger';
import { DailyRoutineAction } from '../../types';

export const DailyRoutinePlanner: React.FC = () => {
  const { location, airQuality } = useEnvironmental();
  const { profile } = useProfile();
  const [actions, setActions] = useState<DailyRoutineAction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  const fetchPlan = async () => {
    setIsLoading(true);
    try {
      const res = await api.getDailyPlan(location.latitude, location.longitude, location.name);
      setActions(res.actions);
      setCompletedCount(res.actions.filter(a => a.completed).length);
    } catch (err) {
      clientLogger.error('Error fetching routine plan', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, [location, airQuality?.aqi]);

  const toggleAction = async (id: string) => {
    setActions(prev => {
      const next = prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a);
      const action = next.find(a => a.id === id);
      if (action && action.completed) {
        // Log to impact tracker
        api.logAction({
          category: action.category,
          actionTitle: action.recommendation,
          co2SavedKg: action.category === 'commute' || action.category === 'sustainability' ? 1.5 : 0.0,
          exposureAvoidedPct: action.priority === 'high' ? 45 : 25
        }).catch(err => clientLogger.warn('Failed to log routine action', err));
      }
      setCompletedCount(next.filter(a => a.completed).length);
      return next;
    });
  };

  return (
    <section className="max-w-5xl mx-auto space-y-6" aria-labelledby="routine-heading">
      {/* Header & Controls */}
      <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 id="routine-heading" className="text-lg font-bold text-[var(--text-main)]">
              Dynamic Daily Routine Planner
            </h2>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Hour-by-hour schedule optimized around diurnal smog peaks, temperature inversions, and your household routine
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-semibold text-[var(--text-main)] block">
              {completedCount} of {actions.length} Done
            </span>
            <div className="w-24 h-1.5 rounded-full bg-[var(--bg-card-secondary)] overflow-hidden mt-1">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${actions.length > 0 ? (completedCount / actions.length) * 100 : 0}%` }}
              />
            </div>
          </div>

          <button
            onClick={fetchPlan}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>
        </div>
      </div>

      {/* Routine Timeline Grid */}
      <div className="space-y-3">
        {actions.map((act) => {
          const isDone = act.completed;
          const isHigh = act.priority === 'high';
          return (
            <article 
              key={act.id}
              className={`p-5 rounded-2xl border transition-all ${
                isDone 
                  ? 'bg-emerald-500/5 border-emerald-500/30 opacity-75' 
                  : 'bg-[var(--bg-card)] border-[var(--border-main)] hover:border-emerald-500/40 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => toggleAction(act.id)}
                    className="mt-0.5 text-emerald-600 dark:text-emerald-400 hover:scale-110 transition-transform focus:outline-none"
                    aria-label={`Mark "${act.recommendation}" as ${isDone ? 'incomplete' : 'complete'}`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white" />
                    ) : (
                      <Circle className="w-5 h-5 text-[var(--text-subtle)]" />
                    )}
                  </button>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3" />
                        {act.time}
                      </span>

                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        isHigh 
                          ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' 
                          : 'bg-[var(--bg-card-secondary)] text-[var(--text-muted)] border-[var(--border-main)]'
                      }`}>
                        {act.priority} priority
                      </span>

                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[var(--bg-card-secondary)] text-[var(--text-subtle)]">
                        {act.category}
                      </span>
                    </div>

                    <h3 className={`text-sm sm:text-base font-semibold mt-2 ${isDone ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-main)]'}`}>
                      {act.recommendation}
                    </h3>

                    <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                      <strong>Why:</strong> {act.reason}
                    </p>

                    <div className="mt-3 pt-3 border-t border-[var(--border-main)]/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[var(--text-subtle)] font-medium">Alternative:</span>{' '}
                        <span className="text-[var(--text-muted)]">{act.alternative}</span>
                      </div>
                      <div>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">Expected Benefit:</span>{' '}
                        <span className="text-[var(--text-muted)]">{act.expectedBenefit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
