import React, { useState } from 'react';
import { 
  Cpu, 
  Activity, 
  Droplets, 
  Thermometer, 
  Wind, 
  Sliders,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export interface DeviceNode {
  id: string;
  roomNumber: string;
  roomTitle: string;
  deviceName: string;
  status: 'Online' | 'Optimizing' | 'Standby';
  pm25: number;
  pm25Category: 'Good' | 'Moderate';
  co2: number;
  co2Status: 'Normal';
  temp: number;
  humidity: number;
  tvoc: number;
  cadr: number;
  filterLife: number;
  fanMode: 'Auto' | 'Turbo' | 'Eco';
}

// Synchronized authentic room telemetry matching all requirements
export const mockSynchronizedRooms: DeviceNode[] = [
  {
    id: 'NODE-101',
    roomNumber: 'Room 1',
    roomTitle: 'Master Suite',
    deviceName: 'AirPulse HEPA-H13 Pro',
    status: 'Online',
    pm25: 14,
    pm25Category: 'Good',
    co2: 790,
    co2Status: 'Normal',
    temp: 21.4,
    humidity: 48,
    tvoc: 110,
    cadr: 380,
    filterLife: 78,
    fanMode: 'Turbo'
  },
  {
    id: 'NODE-102',
    roomNumber: 'Room 2',
    roomTitle: 'Living Lounge',
    deviceName: 'Corsi-Matrix MultiFlow',
    status: 'Online',
    pm25: 11,
    pm25Category: 'Good',
    co2: 680,
    co2Status: 'Normal',
    temp: 22.1,
    humidity: 45,
    tvoc: 85,
    cadr: 420,
    filterLife: 92,
    fanMode: 'Auto'
  },
  {
    id: 'NODE-103',
    roomNumber: 'Room 3',
    roomTitle: 'Children Nursery',
    deviceName: 'PureQuiet Pediatric HEPA',
    status: 'Online',
    pm25: 8,
    pm25Category: 'Good',
    co2: 540,
    co2Status: 'Normal',
    temp: 22.8,
    humidity: 50,
    tvoc: 45,
    cadr: 260,
    filterLife: 86,
    fanMode: 'Auto'
  },
  {
    id: 'NODE-104',
    roomNumber: 'Room 4',
    roomTitle: 'Home Office',
    deviceName: 'AirPulse Nano-Shield',
    status: 'Online',
    pm25: 12,
    pm25Category: 'Good',
    co2: 720,
    co2Status: 'Normal',
    temp: 21.8,
    humidity: 46,
    tvoc: 95,
    cadr: 310,
    filterLife: 64,
    fanMode: 'Eco'
  },
  {
    id: 'NODE-105',
    roomNumber: 'Room 5',
    roomTitle: 'Dining & Kitchen',
    deviceName: 'Vortex Extract & Scrub',
    status: 'Optimizing',
    pm25: 16,
    pm25Category: 'Moderate',
    co2: 810,
    co2Status: 'Normal',
    temp: 23.2,
    humidity: 52,
    tvoc: 140,
    cadr: 450,
    filterLife: 59,
    fanMode: 'Turbo'
  },
  {
    id: 'NODE-106',
    roomNumber: 'Room 6',
    roomTitle: 'Guest Wing',
    deviceName: 'AirPulse Compact S2',
    status: 'Online',
    pm25: 9,
    pm25Category: 'Good',
    co2: 590,
    co2Status: 'Normal',
    temp: 20.9,
    humidity: 44,
    tvoc: 60,
    cadr: 220,
    filterLife: 95,
    fanMode: 'Eco'
  }
];

interface NafasTelemetrySectionProps {
  onRoomSelect?: (room: DeviceNode) => void;
}

export const NafasTelemetrySection: React.FC<NafasTelemetrySectionProps> = ({ onRoomSelect }) => {
  const [filterMode, setFilterMode] = useState<'All' | 'Optimizing' | 'Online'>('All');

  const filtered = filterMode === 'All' 
    ? mockSynchronizedRooms 
    : mockSynchronizedRooms.filter(d => d.status === filterMode);

  return (
    <section className="mb-8" aria-labelledby="telemetry-heading">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#A3E635]" />
            <h2 id="telemetry-heading" className="text-base sm:text-lg font-semibold text-white tracking-[-0.02em]">
              Multi-Zone Sensor Mesh & Room Telemetry
            </h2>
          </div>
          <p className="text-xs text-[#718679] mt-0.5">
            Active real-time environmental sensors and HEPA air purification scrubbers across all 6 zones
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#141916] border border-[#232B26] self-start sm:self-auto">
          {(['All', 'Optimizing', 'Online'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                filterMode === mode
                  ? 'bg-[#18201B] text-[#A3E635] border border-[#232B26] shadow-sm'
                  : 'text-[#879D90] hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Promoted 3-Column Room Cards Grid (Linear/Vercel Dark Surface) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((room) => {
          const isOptimizing = room.status === 'Optimizing';
          const isModerate = room.pm25Category === 'Moderate';

          return (
            <article
              key={room.id}
              onClick={() => onRoomSelect?.(room)}
              className="p-5 rounded-xl bg-[#141916] border border-[#232B26] hover:border-[#38463E] transition-all shadow-sm flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Header: Node ID + Status Tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white group-hover:text-[#A3E635] transition-colors">
                      {room.roomNumber}
                    </span>
                    <span className="text-[10px] font-mono tabular-nums text-[#718679] bg-[#18201B] px-1.5 py-0.5 rounded border border-[#232B26]">
                      {room.id}
                    </span>
                  </div>

                  {/* Semantic Online / Optimizing badge */}
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-medium uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isOptimizing 
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/25' 
                      : 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isOptimizing ? 'bg-amber-400 animate-pulse' : 'bg-[#10B981]'}`} />
                    {room.status}
                  </span>
                </div>

                <div className="text-xs text-[#879D90] font-normal mb-3">
                  {room.roomTitle} • <span className="text-[#5D7366] font-mono text-[11px] tabular-nums">{room.deviceName}</span>
                </div>

                {/* Primary Dual Ring Status Badges (PM2.5 & CO2) */}
                <div className="grid grid-cols-2 gap-2.5 p-3 rounded-lg bg-[#0D110E] border border-[#232B26] mb-3">
                  {/* PM2.5 Meter */}
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-mono font-semibold tabular-nums"
                      style={{
                        backgroundColor: isModerate ? 'rgba(245, 158, 11, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                        border: `1.5px solid ${isModerate ? '#F59E0B' : '#10B981'}`,
                        color: isModerate ? '#F59E0B' : '#10B981'
                      }}
                    >
                      {room.pm25}
                    </div>
                    <div className="leading-tight">
                      <span className="text-[9px] text-[#718679] uppercase font-mono font-medium block">PM2.5</span>
                      <span className={`text-xs font-medium ${isModerate ? 'text-amber-400' : 'text-[#10B981]'}`}>
                        {room.pm25Category}
                      </span>
                    </div>
                  </div>

                  {/* CO2 Meter */}
                  <div className="flex items-center gap-2.5 border-l border-[#232B26] pl-2.5">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-mono font-semibold text-[#10B981] tabular-nums"
                      style={{
                        backgroundColor: 'rgba(16, 185, 129, 0.12)',
                        border: '1.5px solid #10B981'
                      }}
                    >
                      {room.co2}
                    </div>
                    <div className="leading-tight">
                      <span className="text-[9px] text-[#718679] uppercase font-mono font-medium block">CO₂</span>
                      <span className="text-xs font-medium text-[#10B981]">
                        {room.co2Status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Granular Sensor Measurements */}
                <div className="grid grid-cols-3 gap-2 py-1 text-xs text-[#879D90]">
                  <div className="flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-[#5D7366]" />
                    <span className="font-mono tabular-nums text-gray-300">{room.temp}<span className="text-[#718679] text-[10px]">°C</span></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-[#5D7366]" />
                    <span className="font-mono tabular-nums text-gray-300">{room.humidity}<span className="text-[#718679] text-[10px]">%</span></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5 text-[#5D7366]" />
                    <span className="font-mono tabular-nums text-gray-300">{room.cadr} <span className="text-[#718679] text-[10px]">m³/h</span></span>
                  </div>
                </div>
              </div>

              {/* Bottom: Filter Lifespan & Controls */}
              <div className="mt-4 pt-3 border-t border-[#232B26] flex items-center justify-between text-xs">
                <div>
                  <div className="flex justify-between text-[11px] text-[#718679] mb-1 font-mono font-medium">
                    <span>HEPA Lifespan</span>
                    <span className="text-gray-300 tabular-nums">{room.filterLife}%</span>
                  </div>
                  <div className="w-24 h-1.5 rounded-full bg-[#0D110E] overflow-hidden border border-[#232B26]">
                    <div 
                      className={`h-full rounded-full ${room.filterLife > 70 ? 'bg-[#10B981]' : 'bg-amber-400'}`} 
                      style={{ width: `${room.filterLife}%` }} 
                    />
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#718679] font-medium block">Fan Mode</span>
                  <span className="text-xs font-mono font-semibold text-[#A3E635]">{room.fanMode}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
