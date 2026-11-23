import React from 'react';
import { Calendar, TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';
import { AirQualityData } from '../../types';
import { getCategoryStyles } from './AQICard';

interface ForecastCardProps {
  airQuality: AirQualityData;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ airQuality }) => {
  const forecast = airQuality.forecast || [];

  return (
    <article 
      className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm transition-colors"
      aria-labelledby="forecast-title"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 id="forecast-title" className="text-xs font-bold uppercase tracking-wider text-[var(--text-subtle)]">
          3-Day Pollution Forecast & Inversion Outlook
        </h3>
        <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
      </div>

      <div className="space-y-3">
        {forecast.map((f, idx) => {
          const styles = getCategoryStyles(f.category);
          const isToday = idx === 0;
          return (
            <div 
              key={f.date}
              className="p-3.5 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card-secondary)] hover:bg-[var(--bg-hover)] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[var(--text-main)]">
                    {isToday ? 'Today' : new Date(f.date).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${styles.badgeBg}`}>
                    {f.category}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-1">{f.summary}</p>
              </div>

              <div className="flex items-baseline gap-1 text-right sm:shrink-0">
                <span className="text-xl font-extrabold text-[var(--text-main)]">
                  {f.maxAqi}
                </span>
                <span className="text-[10px] text-[var(--text-subtle)] font-medium">Peak AQI</span>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
};
