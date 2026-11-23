import React from 'react';
import { AirQualityData } from '../../types';
import { getCategoryStyles } from './AQICard';

interface PollutantGridProps {
  airQuality: AirQualityData;
}

export const PollutantGrid: React.FC<PollutantGridProps> = ({ airQuality }) => {
  const p = airQuality.pollutants;

  const pollutantItems = [
    {
      name: 'PM2.5 (Fine Particles)',
      symbol: 'PM2.5',
      value: p.pm2_5.value,
      unit: p.pm2_5.unit,
      category: p.pm2_5.category,
      threshold: 'WHO Guideline: 15 µg/m³ (24h)',
      desc: p.pm2_5.description
    },
    {
      name: 'PM10 (Coarse Dust)',
      symbol: 'PM10',
      value: p.pm10.value,
      unit: p.pm10.unit,
      category: p.pm10.category,
      threshold: 'WHO Guideline: 45 µg/m³ (24h)',
      desc: p.pm10.description
    },
    ...(p.no2 ? [{
      name: 'Nitrogen Dioxide',
      symbol: 'NO2',
      value: p.no2.value,
      unit: p.no2.unit,
      category: p.no2.category,
      threshold: 'WHO Guideline: 25 µg/m³ (24h)',
      desc: p.no2.description
    }] : []),
    ...(p.o3 ? [{
      name: 'Ground Ozone',
      symbol: 'O3',
      value: p.o3.value,
      unit: p.o3.unit,
      category: p.o3.category,
      threshold: 'WHO Guideline: 100 µg/m³ (8h)',
      desc: p.o3.description
    }] : []),
    ...(p.co ? [{
      name: 'Carbon Monoxide',
      symbol: 'CO',
      value: p.co.value,
      unit: p.co.unit,
      category: p.co.category,
      threshold: 'WHO Guideline: 4 mg/m³',
      desc: p.co.description
    }] : []),
    ...(p.so2 ? [{
      name: 'Sulfur Dioxide',
      symbol: 'SO2',
      value: p.so2.value,
      unit: p.so2.unit,
      category: p.so2.category,
      threshold: 'WHO Guideline: 40 µg/m³',
      desc: p.so2.description
    }] : [])
  ];

  return (
    <section className="mt-8" aria-labelledby="pollutants-heading">
      <div className="flex items-center justify-between mb-4">
        <h3 id="pollutants-heading" className="text-sm font-bold uppercase tracking-wider text-[var(--text-subtle)]">
          Real-Time Atmospheric Pollutant Breakdown
        </h3>
        <span className="text-xs text-[var(--text-muted)]">Verified CAMS Atmospheric Sensor Feed</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pollutantItems.map((item) => {
          const styles = getCategoryStyles(item.category);
          return (
            <article 
              key={item.symbol}
              className="p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm hover:border-emerald-500/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[var(--text-main)]">{item.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${styles.badgeBg}`}>
                  {item.category}
                </span>
              </div>

              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-[var(--text-main)] tracking-tight">
                  {item.value}
                </span>
                <span className="text-xs text-[var(--text-subtle)] font-medium">{item.unit}</span>
              </div>

              <div className="mt-2 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                {item.threshold}
              </div>

              <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed border-t border-[var(--border-main)] pt-2.5">
                {item.desc}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};
