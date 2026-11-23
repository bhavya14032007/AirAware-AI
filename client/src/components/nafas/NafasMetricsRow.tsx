import React from 'react';
import { Info, Zap } from 'lucide-react';

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-4">
      {/* Card 1: Current PM2.5 Level */}
      <div className="p-4 rounded-2xl bg-[#16201b] border border-[#212d26] shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-2 text-xs font-medium text-[#879d90]">
          <div className="w-6 h-6 rounded-full bg-[#202b25] flex items-center justify-center text-gray-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
              <circle cx="12" cy="7" r="2.5" />
              <circle cx="6" cy="17" r="2.5" />
              <circle cx="18" cy="17" r="2.5" />
              <path d="M12 9.5v3m-3.5 2.5 1.5-1m5.5 1-1.5-1" />
            </svg>
          </div>
          <span>Current PM2.5 Level</span>
        </div>

        <div className="mt-3">
          <div className="inline-flex items-baseline gap-2.5 px-4 py-1.5 rounded-xl bg-[#a3e635] text-[#0f1512]">
            <span className="text-3xl font-black tracking-tight">{currentIndoorPM25}</span>
            <div className="text-[10px] font-bold leading-tight">
              <span>Indoor</span><br />
              <span className="font-semibold text-[#293c12]">µg/m³</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Today's Average PM2.5 Levels */}
      <div className="p-4 rounded-2xl bg-[#16201b] border border-[#212d26] shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-[#879d90]">
            <div className="w-6 h-6 rounded-full bg-[#202b25] flex items-center justify-center text-gray-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                <circle cx="12" cy="7" r="2.5" />
                <circle cx="6" cy="17" r="2.5" />
                <circle cx="18" cy="17" r="2.5" />
                <path d="M12 9.5v3m-3.5 2.5 1.5-1m5.5 1-1.5-1" />
              </svg>
            </div>
            <span>Today's Average PM2.5 Levels</span>
          </div>
          <span className="text-[9px] uppercase font-bold text-[#5e7467] tracking-wider">
            Up to 11:00AM
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2.5">
          {/* Indoor Average */}
          <div className="inline-flex items-baseline gap-2 px-3.5 py-1.5 rounded-xl bg-[#a3e635] text-[#0f1512] flex-1">
            <span className="text-2xl font-black tracking-tight">{averageIndoorPM25}</span>
            <div className="text-[10px] font-bold leading-tight">
              <span>Indoor</span><br />
              <span className="font-semibold text-[#293c12]">µg/m³</span>
            </div>
          </div>

          {/* Outdoor Average */}
          <div className="inline-flex items-baseline gap-2 px-3.5 py-1.5 rounded-xl bg-[#4b1d56] text-white flex-1">
            <span className="text-2xl font-black tracking-tight">{averageOutdoorPM25}</span>
            <div className="text-[10px] font-semibold text-purple-200 leading-tight">
              <span>Outdoor</span><br />
              <span>µg/m³</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Power Consumption */}
      <div className="p-4 rounded-2xl bg-[#16201b] border border-[#212d26] shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-2 text-xs font-medium text-[#879d90]">
          <div className="w-6 h-6 rounded-full bg-[#1b3424] flex items-center justify-center text-[#a3e635]">
            <Zap className="w-3.5 h-3.5 fill-[#a3e635]" />
          </div>
          <span className="flex items-center gap-1">
            Power <Info className="w-3 h-3 text-[#5e7467]" /> Consumption
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-[#a3e635] tracking-tight">{powerConsumptionKWh}</span>
            <span className="text-xs text-[#7e9486] font-medium">kWh</span>
          </div>

          <button
            onClick={onDetailsClick}
            className="px-4 py-1.5 rounded-full border border-[#3b4c40] text-xs font-medium text-gray-200 hover:text-white hover:border-[#5a7262] transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};
