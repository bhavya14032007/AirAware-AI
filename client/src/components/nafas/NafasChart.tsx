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
  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(defaultData[16]); // Day 17 default

  // Chart dimensions in viewBox coordinates
  const width = 850;
  const height = 230;
  const padLeft = 45;
  const padRight = 25;
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

  const outdoorPath = defaultData.reduce((acc, pt, i) => {
    const x = getX(i);
    const y = getY(pt.outdoor);
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // Active highlighted point (Day 17)
  const activeIndex = 16;
  const activeX = getX(activeIndex);
  const activeY = getY(defaultData[activeIndex].indoor);

  return (
    <div className="rounded-2xl bg-[#8ea293] p-5 shadow-sm text-[#141d18] mb-4 select-none">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold tracking-tight text-[#141d18]">
          Outdoor vs Indoor PM 2.5
        </h3>

        {/* Legend */}
        <div className="flex items-center gap-6 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#141d18]" />
            <span className="text-[#141d18]">Indoor PM 2.5</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5d7364]" />
            <span className="text-[#3c4e42]">Outdoor PM 2.5</span>
          </div>
        </div>

        {/* Time Selector Dropdown */}
        <button 
          onClick={() => setTimeRange(prev => prev === 'Monthly' ? 'Weekly' : 'Monthly')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141d18] text-white text-xs font-medium hover:bg-black transition-colors shadow-sm"
        >
          <span>{timeRange}</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-300" />
        </button>
      </div>

      {/* SVG Responsive Area & Line Chart */}
      <div className="w-full overflow-hidden">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-auto overflow-visible"
        >
          {/* Y-Axis Grid Lines & Labels */}
          {[250, 150, 55, 35, 12, 0].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <text
                  x={padLeft - 10}
                  y={y + 3.5}
                  textAnchor="end"
                  className="text-[10px] font-semibold fill-[#34453a]"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Vertical Bar Columns for Indoor PM2.5 */}
          {defaultData.map((pt, i) => {
            const x = getX(i);
            const y = getY(pt.indoor);
            const barHeight = getY(0) - y;
            return (
              <rect
                key={pt.day}
                x={x - 2.5}
                y={y}
                width={5}
                height={Math.max(0, barHeight)}
                rx={2.5}
                className="fill-[#7a9080]/60 transition-colors"
              />
            );
          })}

          {/* Outdoor PM2.5 Line (Smooth higher curve) */}
          <path
            d={outdoorPath}
            fill="none"
            stroke="#5d7364"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Indoor PM2.5 Line (Dark charcoal curve) */}
          <path
            d={indoorPath}
            fill="none"
            stroke="#141d18"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Active Tooltip Pill on Day 17: "12 µg/m³" */}
          <g transform={`translate(${activeX}, ${activeY})`}>
            {/* Pulsing Outer Ring */}
            <circle r="7" className="fill-none stroke-[#141d18]/40 stroke-2" />
            {/* Center Node */}
            <circle r="4" className="fill-[#141d18] stroke-[#8ea293] stroke-2" />

            {/* Black Tooltip Pill floating above */}
            <g transform="translate(0, -22)">
              <rect
                x="-30"
                y="-10"
                width="60"
                height="19"
                rx="9.5"
                className="fill-[#141d18] shadow-md"
              />
              <text
                x="0"
                y="3"
                textAnchor="middle"
                className="text-[10px] font-bold fill-white"
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
                className="text-[9px] font-medium fill-[#34453a]"
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
