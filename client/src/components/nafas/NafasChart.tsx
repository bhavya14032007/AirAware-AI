import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ChartPoint {
  day: number;
  indoor: number;
  outdoor: number;
}

const defaultData: ChartPoint[] = [
  { day: 1, indoor: 18, outdoor: 85 },
  { day: 2, indoor: 28, outdoor: 110 },
  { day: 3, indoor: 38, outdoor: 135 },
  { day: 4, indoor: 38, outdoor: 145 },
  { day: 5, indoor: 37, outdoor: 140 },
  { day: 6, indoor: 24, outdoor: 120 },
  { day: 7, indoor: 24, outdoor: 115 },
  { day: 8, indoor: 36, outdoor: 130 },
  { day: 9, indoor: 48, outdoor: 165 },
  { day: 10, indoor: 75, outdoor: 195 },
  { day: 11, indoor: 82, outdoor: 220 },
  { day: 12, indoor: 78, outdoor: 244 },
  { day: 13, indoor: 62, outdoor: 235 },
  { day: 14, indoor: 45, outdoor: 215 },
  { day: 15, indoor: 32, outdoor: 190 },
  { day: 16, indoor: 32, outdoor: 175 },
  { day: 17, indoor: 12, outdoor: 185 }, // Highlighted node (12 µg/m³)
  { day: 18, indoor: 26, outdoor: 195 },
  { day: 19, indoor: 38, outdoor: 210 },
  { day: 20, indoor: 45, outdoor: 225 },
  { day: 21, indoor: 48, outdoor: 230 },
  { day: 22, indoor: 44, outdoor: 215 },
  { day: 23, indoor: 39, outdoor: 185 },
  { day: 24, indoor: 41, outdoor: 175 },
  { day: 25, indoor: 62, outdoor: 190 },
  { day: 26, indoor: 65, outdoor: 185 },
  { day: 27, indoor: 28, outdoor: 170 },
];

export const NafasChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'Monthly' | 'Weekly' | 'Daily'>('Monthly');

  // Chart dimensions in viewBox coordinates
  const width = 850;
  const height = 240;
  const padLeft = 45;
  const padRight = 20;
  const padTop = 30;
  const padBottom = 35;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const maxY = 250;

  // Coordinate mapping
  const getX = (idx: number) => padLeft + (idx / (defaultData.length - 1)) * chartW;
  const getY = (val: number) => padTop + chartH - (val / maxY) * chartH;

  // Build SVG path for indoor and outdoor
  const indoorPath = defaultData.reduce((acc, pt, i) => {
    const x = getX(i);
    const y = getY(pt.indoor);
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // Closed area path for indoor gradient
  const indoorAreaPath = `${indoorPath} L ${getX(defaultData.length - 1)} ${getY(0)} L ${getX(0)} ${getY(0)} Z`;

  const outdoorPath = defaultData.reduce((acc, pt, i) => {
    const x = getX(i);
    const y = getY(pt.outdoor);
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // Active highlighted point (Day 17)
  const activeIndex = 16;
  const activeX = getX(activeIndex);
  const activeY = getY(defaultData[activeIndex].indoor);

  // Uniform Y-axis intervals (0, 50, 100, 150, 200, 250)
  const yTicks = [250, 200, 150, 100, 50, 0];

  return (
    <div className="rounded-xl bg-[#141916] border border-[#232B26] p-5 shadow-sm text-white mb-6 select-none">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-semibold tracking-[-0.02em] text-white">
            Outdoor vs Indoor PM 2.5
          </h3>
          <p className="text-[11px] text-[#718679] mt-0.5">
            Diurnal particulate filtration efficiency across current billing cycle
          </p>
        </div>

        <div className="flex items-center gap-5">
          {/* Legend */}
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A3E635] shadow-[0_0_8px_rgba(163,230,53,0.4)]" />
              <span className="text-gray-300">Indoor PM 2.5</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_rgba(139,92,246,0.3)]" />
              <span className="text-gray-400">Outdoor PM 2.5</span>
            </div>
          </div>

          {/* Time Range Selector */}
          <button 
            onClick={() => setTimeRange(prev => prev === 'Monthly' ? 'Weekly' : 'Monthly')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#18201B] border border-[#232B26] hover:border-[#38463E] text-white text-xs font-medium transition-colors shadow-sm"
          >
            <span>{timeRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* SVG Responsive Area & Line Chart */}
      <div className="w-full overflow-hidden">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-auto overflow-visible"
        >
          <defs>
            {/* Neon lime vertical linear gradient */}
            <linearGradient id="neonLimeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A3E635" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#A3E635" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Subtle Horizontal Dashed Gridlines & Uniform Y-Axis Ticks */}
          {yTicks.map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#1F2622"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={padLeft - 10}
                  y={y + 3.5}
                  textAnchor="end"
                  className="text-[10px] font-mono tabular-nums fill-[#64748B]"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Indoor PM2.5 Gradient Fill Underneath */}
          <path
            d={indoorAreaPath}
            fill="url(#neonLimeGradient)"
          />

          {/* Outdoor PM2.5 Line (Muted Violet #8B5CF6, 2px stroke) */}
          <path
            d={outdoorPath}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-80"
          />

          {/* Indoor PM2.5 Line (Neon Lime #A3E635, 2px stroke) */}
          <path
            d={indoorPath}
            fill="none"
            stroke="#A3E635"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Active Tooltip Pill on Day 17: "12 µg/m³" */}
          <g transform={`translate(${activeX}, ${activeY})`}>
            {/* Pulsing Outer Ring */}
            <circle r="7" className="fill-none stroke-[#A3E635]/40 stroke-2 animate-ping" />
            {/* Center Node */}
            <circle r="4" className="fill-[#A3E635] stroke-[#0D110E] stroke-2" />

            {/* High-contrast tooltip pill */}
            <g transform="translate(0, -26)">
              <rect
                x="-34"
                y="-11"
                width="68"
                height="22"
                rx="6"
                className="fill-[#0D110E] stroke-[#232B26] stroke-1 shadow-xl"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                className="text-[10px] font-mono font-medium tabular-nums fill-[#A3E635]"
              >
                12 µg/m³
              </text>
            </g>
          </g>

          {/* X-Axis Days Labels (1 to 27) */}
          {defaultData.map((pt, i) => {
            const x = getX(i);
            const y = getY(0) + 16;
            return (
              <text
                key={pt.day}
                x={x}
                y={y}
                textAnchor="middle"
                className="text-[9px] font-mono tabular-nums fill-[#64748B]"
              >
                {pt.day}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
