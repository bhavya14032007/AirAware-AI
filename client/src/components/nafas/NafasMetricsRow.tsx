import React from 'react';
import { Info, Zap, ArrowDownRight, Activity } from 'lucide-react';

interface NafasMetricsRowProps {
  currentIndoorPM25?: number;
  averageIndoorPM25?: number;
  averageOutdoorPM25?: number;
  powerConsumptionKWh?: number;
  onDetailsClick?: () => void;
}

export const NafasMetricsRow: React.FC<NafasMetricsRowProps> = ({
  currentIndoorPM25 = 12,
  averageIndoorPM25 = 12,
  averageOutdoorPM25 = 244,
  powerConsumptionKWh = 151.27,
  onDetailsClick
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Card 1: Current PM2.5 Level */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#141916] border border-[#232B26] shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-medium text-[#718679]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#18201B] border border-[#232B26] flex items-center justify-center text-gray-300">
              <Activity className="w-3.5 h-3.5 text-[#10B981]" />
            </div>
            <span className="text-gray-300 font-medium">Current PM2.5 Level</span>
          </div>
          <span className="text-[11px] uppercase font-mono tracking-wider text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full border border-[#10B981]/25">
            Optimal
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          {/* Translucent Tinted Indoor Badge */}
          <div 
            className="inline-flex items-baseline gap-2 px-3.5 py-2 rounded-xl transition-all"
            style={{
              backgroundColor: 'rgba(163, 230, 53, 0.12)',
              border: '1px solid rgba(163, 230, 53, 0.3)',
              color: '#A3E635'
            }}
          >
            <span className="text-3xl font-semibold font-mono tracking-[-0.02em] tabular-nums">{currentIndoorPM25}</span>
            <div className="text-[10px] font-medium leading-tight text-[#A3E635]">
              <span>Indoor</span><br />
              <span className="opacity-80 font-mono tabular-nums">µg/m³</span>
            </div>
          </div>

          <div className="text-xs text-[#718679] leading-tight">
            <span className="text-gray-300 font-medium block">WHO Safe Tier</span>
            <span className="text-[11px] font-mono tabular-nums">&lt; 15 µg/m³ 24h</span>
          </div>
        </div>
      </div>

      {/* Card 2: Today's Average PM2.5 Levels */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#141916] border border-[#232B26] shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-300">
            <div className="w-6 h-6 rounded-lg bg-[#18201B] border border-[#232B26] flex items-center justify-center text-gray-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-[#A3E635]">
                <circle cx="12" cy="7" r="2.5" />
                <circle cx="6" cy="17" r="2.5" />
                <circle cx="18" cy="17" r="2.5" />
                <path d="M12 9.5v3m-3.5 2.5 1.5-1m5.5 1-1.5-1" />
              </svg>
            </div>
            <span>Today's Average PM2.5 Levels</span>
          </div>
          <span className="text-[11px] uppercase font-mono text-[#718679] tracking-wider">
            Up to 11:00 AM
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          {/* Indoor Average Translucent Tinted Badge */}
          <div 
            className="inline-flex items-baseline gap-2 px-3.5 py-2 rounded-xl flex-1"
            style={{
              backgroundColor: 'rgba(163, 230, 53, 0.12)',
              border: '1px solid rgba(163, 230, 53, 0.3)',
              color: '#A3E635'
            }}
          >
            <span className="text-2xl font-semibold font-mono tracking-[-0.02em] tabular-nums">{averageIndoorPM25}</span>
            <div className="text-[10px] font-medium leading-tight text-[#A3E635]">
              <span>Indoor</span><br />
              <span className="opacity-80 font-mono tabular-nums">µg/m³</span>
            </div>
          </div>

          {/* Outdoor Average Translucent Tinted Badge */}
          <div 
            className="inline-flex items-baseline gap-2 px-3.5 py-2 rounded-xl flex-1"
            style={{
              backgroundColor: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: '#C4B5FD'
            }}
          >
            <span className="text-2xl font-semibold font-mono tracking-[-0.02em] tabular-nums text-white">{averageOutdoorPM25}</span>
            <div className="text-[10px] font-medium leading-tight text-[#C4B5FD]">
              <span>Outdoor</span><br />
              <span className="opacity-80 font-mono tabular-nums">µg/m³</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Power Consumption with Balance & Trend Badge */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#141916] border border-[#232B26] shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-medium text-gray-300">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#18201B] border border-[#232B26] flex items-center justify-center text-[#A3E635]">
              <Zap className="w-3.5 h-3.5 text-[#A3E635]" />
            </div>
            <span className="flex items-center gap-1">
              Power Consumption <Info className="w-3 h-3 text-[#718679]" />
            </span>
          </div>

          {/* Trend Pill in Emerald */}
          <span className="inline-flex items-center gap-0.5 text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25 tabular-nums">
            <ArrowDownRight className="w-3 h-3" />
            -4.2% vs yesterday
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold font-mono text-[#A3E635] tracking-[-0.02em] tabular-nums">
              {powerConsumptionKWh}
            </span>
            <span className="text-xs text-[#718679] font-mono tabular-nums">kWh</span>
          </div>

          <button
            onClick={onDetailsClick}
            className="px-3.5 py-1.5 rounded-lg border border-[#232B26] bg-[#18201B] hover:bg-[#1E2721] hover:border-[#38463E] text-xs font-medium text-gray-300 hover:text-white transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};
