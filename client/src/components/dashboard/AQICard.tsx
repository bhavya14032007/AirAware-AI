import React from 'react';
import { AlertTriangle, ShieldCheck, Activity, Info } from 'lucide-react';
import { AirQualityData, AQICategory } from '../../types';

interface AQICardProps {
  airQuality: AirQualityData;
}

export const getCategoryStyles = (category: AQICategory) => {
  switch (category) {
    case 'Good':
      return {
        badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
        ringColor: 'ring-emerald-500',
        barColor: 'bg-emerald-500',
        advisory: 'Air quality is satisfactory and poses little to no health risk.',
        action: 'Ideal conditions for outdoor exercise, ventilation, and active commuting.'
      };
    case 'Moderate':
      return {
        badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
        ringColor: 'ring-amber-500',
        barColor: 'bg-amber-500',
        advisory: 'Acceptable air quality; unusually sensitive people should consider reducing prolonged outdoor exertion.',
        action: 'Normal activities for general public; sensitive individuals monitor symptoms.'
      };
    case 'Unhealthy for Sensitive Groups':
      return {
        badgeBg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30',
        ringColor: 'ring-orange-500',
        barColor: 'bg-orange-500',
        advisory: 'Children, elderly, and people with respiratory or heart conditions may experience health effects.',
        action: 'Sensitive groups should reduce heavy outdoor exertion and wear N95 during transit.'
      };
    case 'Unhealthy':
      return {
        badgeBg: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30',
        ringColor: 'ring-red-500',
        barColor: 'bg-red-500',
        advisory: 'Everyone may begin to experience health effects; members of sensitive groups may experience serious effects.',
        action: 'Avoid prolonged outdoor cardio. Keep residential windows closed and run HEPA air filtration.'
      };
    case 'Very Unhealthy':
      return {
        badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
        ringColor: 'ring-purple-500',
        barColor: 'bg-purple-500',
        advisory: 'Health alert: Risk of health effects is increased for all household members.',
        action: 'Strictly avoid outdoor exercise. Fit certified N95/FFP2 masks for all transit. Seal window drafts.'
      };
    case 'Hazardous':
    default:
      return {
        badgeBg: 'bg-rose-900/10 text-rose-700 dark:text-rose-400 border-rose-700/30',
        ringColor: 'ring-rose-800',
        barColor: 'bg-rose-800',
        advisory: 'Health warning of emergency conditions: Entire population is likely to be severely affected.',
        action: 'Remain indoors in sealed or filtered clean air spaces. Restrict all unmasked outdoor exposure.'
      };
  }
};

export const AQICard: React.FC<AQICardProps> = ({ airQuality }) => {
  const styles = getCategoryStyles(airQuality.category);
  const aqiPercentage = Math.min(100, Math.round((airQuality.aqi / 400) * 100));

  return (
    <article 
      className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm flex flex-col justify-between transition-colors relative overflow-hidden"
      aria-labelledby="aqi-card-title"
    >
      {/* Decorative top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${styles.barColor}`} />

      <div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 id="aqi-card-title" className="text-xs font-bold uppercase tracking-wider text-[var(--text-subtle)]">
              Air Quality Index (US AQI)
            </h2>
            <p className="text-sm font-semibold text-[var(--text-main)] mt-0.5">{airQuality.location.name}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${styles.badgeBg}`}>
            {airQuality.category}
          </span>
        </div>

        {/* Big AQI Number & Meter */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-6">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[var(--text-main)]">
              {airQuality.aqi}
            </span>
            <span className="text-sm text-[var(--text-subtle)] font-medium">/ 500 scale</span>
          </div>

          <div className="flex-1">
            <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1 font-medium">
              <span>0 (Clean)</span>
              <span>150 (Unhealthy)</span>
              <span>500+ (Severe)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[var(--bg-card-secondary)] overflow-hidden p-0.5 border border-[var(--border-main)]">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${styles.barColor}`}
                style={{ width: `${aqiPercentage}%` }}
                role="progressbar"
                aria-valuenow={airQuality.aqi}
                aria-valuemin={0}
                aria-valuemax={500}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Advisory & Action Grid */}
      <div className="mt-6 pt-6 border-t border-[var(--border-main)] grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-semibold text-[var(--text-main)] block">Health Impact</span>
            <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed">{styles.advisory}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-semibold text-[var(--text-main)] block">Recommended Protocol</span>
            <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed">{styles.action}</p>
          </div>
        </div>
      </div>
    </article>
  );
};
