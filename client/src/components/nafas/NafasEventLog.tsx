import React, { useState } from 'react';
import { History } from 'lucide-react';

interface EventItem {
  id: string;
  time: string;
  zone: string;
  eventType: string;
  severity: 'Normal' | 'Advisory' | 'Alert';
  measuredShift: string;
  status: 'Resolved' | 'Active' | 'Monitored';
  description: string;
}

const eventLogs: EventItem[] = [
  {
    id: 'EVT-904',
    time: '10:45 AM',
    zone: 'Room 5 (Dining & Kitchen)',
    eventType: 'Automated HEPA Surge Activated',
    severity: 'Advisory',
    measuredShift: 'PM2.5 dropped 48 → 16 µg/m³',
    status: 'Resolved',
    description: 'High-speed localized HEPA scrubber activated during mid-morning frying.'
  },
  {
    id: 'EVT-903',
    time: '09:12 AM',
    zone: 'Room 1 (Master Suite)',
    eventType: 'Window Latch Advisory Triggered',
    severity: 'Alert',
    measuredShift: 'Outdoor PM2.5 peaked at 244 µg/m³',
    status: 'Resolved',
    description: 'Sensor detected pressure differential; prompt confirmed to seal north balcony door.'
  },
  {
    id: 'EVT-902',
    time: '08:20 AM',
    zone: 'Room 3 (Children Nursery)',
    eventType: 'Clean Air Buffer Target Reached',
    severity: 'Normal',
    measuredShift: 'PM2.5 maintained at 8 µg/m³',
    status: 'Active',
    description: 'Quiet-mode pediatric air cleaner running at 28 dB; particulate concentration below 10 µg/m³.'
  },
  {
    id: 'EVT-901',
    time: '07:05 AM',
    zone: 'Building Main Intake & Lounge',
    eventType: 'Diurnal Smog Inversion Warning',
    severity: 'Alert',
    measuredShift: 'Boundary layer compressed < 140m',
    status: 'Monitored',
    description: 'CAMS atmospheric model confirmed cold air surface inversion trapping regional road exhaust.'
  },
  {
    id: 'EVT-900',
    time: '06:00 AM',
    zone: 'All Apartments Mesh',
    eventType: 'Overnight Microclimate Diagnostic',
    severity: 'Normal',
    measuredShift: 'Average bedroom CO₂ stabilized at 620 ppm',
    status: 'Resolved',
    description: 'Nighttime ERV ventilation cycle completed without particulate intrusion.'
  }
];

export const NafasEventLog: React.FC = () => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');

  const filtered = selectedSeverity === 'All'
    ? eventLogs
    : eventLogs.filter(e => e.severity === selectedSeverity);

  return (
    <section className="mb-8" aria-labelledby="events-heading">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#A3E635]" />
            <h2 id="events-heading" className="text-base sm:text-lg font-bold text-white tracking-tight">
              Building Air Quality & Operational Incident Log
            </h2>
          </div>
          <p className="text-xs text-[#718679] mt-0.5">
            Chronological audit trail of automated scrubber activations, ventilation adjustments, and threshold alerts
          </p>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#141916] border border-[#232B26] self-start sm:self-auto">
          {['All', 'Alert', 'Advisory', 'Normal'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSelectedSeverity(sev)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                selectedSeverity === sev
                  ? 'bg-[#18201B] text-[#A3E635] border border-[#232B26] shadow-sm'
                  : 'text-[#879D90] hover:text-white'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Events Table Container (Surface: #141916, Border: #232B26) */}
      <div className="rounded-xl bg-[#141916] border border-[#232B26] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#232B26] bg-[#0D110E] text-[#718679] uppercase font-mono font-bold text-[10px] tracking-wider">
                <th className="py-3.5 px-5 w-24">Time</th>
                <th className="py-3.5 px-5 w-48">Zone / Room</th>
                <th className="py-3.5 px-5 min-w-[320px]">Operational Event</th>
                <th className="py-3.5 px-5 w-52">Shift & Impact</th>
                <th className="py-3.5 px-5 w-32 text-center">Severity</th>
                <th className="py-3.5 px-5 text-right w-28">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D2621] text-gray-200">
              {filtered.map((evt) => {
                const isAlert = evt.severity === 'Alert';
                const isAdvisory = evt.severity === 'Advisory';
                return (
                  <tr key={evt.id} className="hover:bg-[#19201C] transition-colors">
                    {/* Timestamp with Tabular Numerals & Monospace */}
                    <td className="py-3.5 px-5 font-mono text-[11px] text-[#A3E635] tabular-nums whitespace-nowrap">
                      {evt.time}
                    </td>

                    {/* Zone / Room */}
                    <td className="py-3.5 px-5 font-medium text-white whitespace-nowrap">
                      {evt.zone}
                    </td>

                    {/* Operational Event with 2-Line Clean Description Wrap */}
                    <td className="py-3.5 px-5">
                      <span className="font-semibold text-gray-200 block">{evt.eventType}</span>
                      <span className="text-[11px] text-[#718679] line-clamp-2 leading-relaxed mt-0.5">
                        {evt.description}
                      </span>
                    </td>

                    {/* Measured Shift & Impact */}
                    <td className="py-3.5 px-5 text-[#879D90] font-mono text-[11px] tabular-nums whitespace-nowrap">
                      {evt.measuredShift}
                    </td>

                    {/* Normalized Severity Badges with Uniform w-24 Width */}
                    <td className="py-3.5 px-5 text-center whitespace-nowrap">
                      <span className={`inline-flex items-center justify-center w-24 text-center text-[10px] font-mono font-semibold uppercase tracking-wider py-0.5 rounded-full ${
                        isAlert
                          ? 'bg-red-500/10 text-red-400 border border-red-500/25'
                          : isAdvisory
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/25'
                          : 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25'
                      }`}>
                        {evt.severity}
                      </span>
                    </td>

                    {/* Right-Aligned Status */}
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <span className="text-[11px] font-medium font-mono">
                        {evt.status === 'Resolved' && <span className="text-[#10B981]">✓ Resolved</span>}
                        {evt.status === 'Active' && <span className="text-[#A3E635] font-semibold">● Active</span>}
                        {evt.status === 'Monitored' && <span className="text-amber-400">⚡ Monitored</span>}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
