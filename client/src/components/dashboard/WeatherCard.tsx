import React from 'react';
import { Thermometer, Droplets, Wind, CloudFog, Compass, Gauge } from 'lucide-react';
import { WeatherData } from '../../types';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  // Check for thermal inversion markers (low wind + high humidity in cold weather)
  const hasInversionRisk = weather.windSpeed < 8 && weather.relativeHumidity > 70 && weather.temperature < 20;

  return (
    <article 
      className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm transition-colors flex flex-col justify-between"
      aria-labelledby="weather-card-title"
    >
      <div>
        <div className="flex items-center justify-between">
          <h3 id="weather-card-title" className="text-xs font-bold uppercase tracking-wider text-[var(--text-subtle)]">
            Atmospheric Weather & Dispersion
          </h3>
          {hasInversionRisk && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <CloudFog className="w-3 h-3" /> Inversion Layer Active
            </span>
          )}
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-[var(--text-main)]">
            {weather.temperature}°C
          </span>
          <span className="text-xs text-[var(--text-muted)] font-medium">
            ({weather.conditionText})
          </span>
        </div>
      </div>

      {/* Atmospheric Metric Grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 pt-4 border-t border-[var(--border-main)]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[var(--bg-card-secondary)] text-emerald-600 dark:text-emerald-400">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[var(--text-subtle)] uppercase font-semibold block">Humidity</span>
            <span className="text-sm font-bold text-[var(--text-main)]">{weather.relativeHumidity}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[var(--bg-card-secondary)] text-emerald-600 dark:text-emerald-400">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[var(--text-subtle)] uppercase font-semibold block">Wind Velocity</span>
            <span className="text-sm font-bold text-[var(--text-main)]">{weather.windSpeed} km/h</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[var(--bg-card-secondary)] text-emerald-600 dark:text-emerald-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[var(--text-subtle)] uppercase font-semibold block">Wind Direction</span>
            <span className="text-sm font-bold text-[var(--text-main)]">{weather.windDirection}°</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[var(--bg-card-secondary)] text-emerald-600 dark:text-emerald-400">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[var(--text-subtle)] uppercase font-semibold block">Precipitation</span>
            <span className="text-sm font-bold text-[var(--text-main)]">{weather.precipitation} mm</span>
          </div>
        </div>
      </div>

      {hasInversionRisk && (
        <div className="mt-4 p-2.5 rounded-lg bg-rose-500/5 border border-rose-500/15 text-[11px] text-[var(--text-muted)] leading-relaxed">
          <strong className="text-rose-600 dark:text-rose-400">Thermal Inversion Advisory:</strong> Low wind speed coupled with high moisture creates a cold surface trap, locking particulates within lower 100 meters.
        </div>
      )}
    </article>
  );
};
