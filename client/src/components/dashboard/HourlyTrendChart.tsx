import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { AirQualityData } from '../../types';

interface HourlyTrendChartProps {
  airQuality: AirQualityData;
}

export const HourlyTrendChart: React.FC<HourlyTrendChartProps> = ({ airQuality }) => {
  const data = (airQuality.hourlyTrends || []).map(t => {
    // Format "2026-11-23T08:00" -> "08:00"
    const hour = t.time.includes('T') 
      ? t.time.split('T')[1].slice(0, 5) 
      : t.time.slice(-5);
    return {
      time: hour,
      aqi: t.aqi,
      pm25: t.pm2_5,
      pm10: t.pm10
    };
  });

  return (
    <article 
      className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm transition-colors mt-8"
      aria-labelledby="chart-title"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 id="chart-title" className="text-sm font-bold uppercase tracking-wider text-[var(--text-subtle)]">
            24-Hour Diurnal Pollution Trend & Smog Peak Curve
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Hourly progression showing morning rush & evening thermal inversion peaks
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-500" />
            <span className="text-[var(--text-main)]">US AQI</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-blue-500" />
            <span className="text-[var(--text-main)]">PM2.5 (µg/m³)</span>
          </div>
        </div>
      </div>

      <div className="w-full h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="pm25Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-main)" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="var(--text-subtle)" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
            />
            <YAxis 
              stroke="var(--text-subtle)" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-main)',
                borderRadius: '0.75rem',
                fontSize: '12px',
                color: 'var(--text-main)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="aqi" 
              stroke="#10b981" 
              strokeWidth={2.5} 
              fillOpacity={1} 
              fill="url(#aqiGradient)" 
              name="AQI"
            />
            <Area 
              type="monotone" 
              dataKey="pm25" 
              stroke="#3b82f6" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#pm25Gradient)" 
              name="PM2.5 (µg/m³)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-main)] flex items-center justify-between text-xs text-[var(--text-muted)]">
        <span>💡 <strong>Optimization Tip:</strong> Plan outdoor movements during the afternoon dip (12:00 – 15:30) when ground warming facilitates vertical particulate dispersion.</span>
      </div>
    </article>
  );
};
