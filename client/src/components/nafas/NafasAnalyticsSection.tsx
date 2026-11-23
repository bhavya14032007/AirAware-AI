import React from 'react';
import { 
  Sparkles, 
  ShieldAlert, 
  Leaf, 
  ArrowUpRight, 
  Clock, 
  Zap, 
  ShieldCheck, 
  GitCompare 
} from 'lucide-react';

interface NafasAnalyticsSectionProps {
  onOpenAdvisor?: () => void;
  onOpenSimulator?: () => void;
}

export const NafasAnalyticsSection: React.FC<NafasAnalyticsSectionProps> = ({ 
  onOpenAdvisor,
  onOpenSimulator
}) => {
  return (
    <section className="mb-8 space-y-6" aria-labelledby="analytics-heading">
      {/* GenAI Atmospheric Smog Briefing Banner with Clean Left Accent & Ambient Radial Glow */}
      <div 
        className="rounded-xl border border-[#232B26] border-l-2 border-l-[#A3E635] shadow-sm overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-5 transition-all p-4 sm:p-5 relative"
        style={{
          background: 'radial-gradient(ellipse 50% 100% at 0% 50%, rgba(163, 230, 53, 0.05), transparent 70%), #141916'
        }}
      >
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-lg bg-[#A3E635]/10 border border-[#A3E635]/25 text-[#A3E635] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <Sparkles className="w-4 h-4 text-[#A3E635]" />
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#A3E635]">
                AirAware GenAI Atmospheric Inversion Briefing
              </span>
              <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/25">
                Ground Inversion Active
              </span>
            </div>

            {/* Simplified clean paragraph in #A1A1AA with key metrics bolded in #F4F4F5 */}
            <p className="text-xs sm:text-sm text-[#A1A1AA] font-normal leading-relaxed max-w-3xl">
              Thermal inversion has compressed the boundary layer below{' '}
              <strong className="text-[#F4F4F5] font-semibold tabular-nums font-mono">140m</strong>, trapping
              particulate soot at street level. Ambient outdoor PM2.5 is{' '}
              <strong className="text-[#F4F4F5] font-semibold tabular-nums font-mono">244 µg/m³</strong>. Automated
              indoor multi-stage filtration is maintaining{' '}
              <strong className="text-[#F4F4F5] font-semibold tabular-nums font-mono">12 µg/m³ (95.1% exclusion)</strong>.
            </p>

            {/* Structured Bottom Metadata in subtle inline pill chips */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1.5">
              <div className="inline-flex items-center gap-1.5 bg-[#1A211D] border border-[#26302A] px-2.5 py-1 rounded-md text-xs text-[#A1A1AA]">
                <Clock className="w-3.5 h-3.5 text-[#A3E635]" />
                <span>
                  Recommended Window Flush:{' '}
                  <strong className="text-[#F4F4F5] font-mono tabular-nums">1:30 PM – 3:30 PM</strong>
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-[#1A211D] border border-[#26302A] px-2.5 py-1 rounded-md text-xs text-[#A1A1AA]">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  Morning Peak Smog:{' '}
                  <strong className="text-[#F4F4F5] font-mono tabular-nums">6:30 AM – 9:45 AM</strong> (Keep sealed)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-center pt-2 lg:pt-0 border-t lg:border-t-0 border-[#232B26] w-full lg:w-auto">
          <button
            onClick={onOpenAdvisor}
            className="flex-1 lg:flex-none px-4 py-2 rounded-lg bg-[#A3E635] hover:bg-[#B0EF46] text-[#0D110E] text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <span>Ask AI Advisor</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onOpenSimulator}
            className="flex-1 lg:flex-none px-4 py-2 rounded-lg bg-[#18201B] hover:bg-[#1E2721] text-gray-200 hover:text-white text-xs font-semibold transition-colors border border-[#232B26] flex items-center justify-center gap-1.5"
          >
            <GitCompare className="w-3.5 h-3.5 text-[#A3E635]" />
            <span>Simulate What-If</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards for Building Environmental Efficiency (Unified #F4F4F5 hero numbers & consistent header/footer) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Infiltration Barrier Efficiency */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#141916] border border-[#232B26] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-medium text-gray-300">
            <span className="text-gray-300 font-medium">Infiltration Reduction</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full border border-[#10B981]/25">
                Exclusion Active
              </span>
              <ShieldCheck className="w-4 h-4 text-[#718679]" />
            </div>
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold font-mono text-[#F4F4F5] tracking-tight tabular-nums">
                95.1%
              </span>
              <span className="text-xs font-semibold text-[#10B981]">Particulate Block</span>
            </div>
            <p className="text-xs text-[#718679] mt-1 leading-relaxed">
              Outdoor 244 µg/m³ scrubbed down to 12 µg/m³ across sealed residential envelopes.
            </p>
          </div>

          <div className="pt-3 border-t border-[#232B26] text-[11px] text-[#718679] flex items-center justify-between">
            <span>WHO 24h Guideline Target</span>
            <strong className="text-white font-mono tabular-nums">15 µg/m³ (Met)</strong>
          </div>
        </div>

        {/* Metric 2: Avoided Carbon Emissions (Domain-accurate HVAC telemetry copy) */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#141916] border border-[#232B26] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-medium text-gray-300">
            <span className="text-gray-300 font-medium">Avoided Emissions</span>
            <Leaf className="w-4 h-4 text-[#718679]" />
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold font-mono text-[#F4F4F5] tracking-tight tabular-nums">
                42.8
              </span>
              <span className="text-xs font-mono text-gray-400">kg CO₂e</span>
            </div>
            <p className="text-xs text-[#718679] mt-1 leading-relaxed">
              Weekly carbon offset from adaptive EC-motor variable speed scheduling and thermal envelope retention.
            </p>
          </div>

          <div className="pt-3 border-t border-[#232B26] text-[11px] text-[#718679] flex items-center justify-between">
            <span>Grid Factor: 0.71 kg CO₂/kWh</span>
            <strong className="text-white font-mono">Building HVAC Benchmark</strong>
          </div>
        </div>

        {/* Metric 3: Filtration Power Split */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#141916] border border-[#232B26] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-medium text-gray-300">
            <span className="text-gray-300 font-medium">Filtration Power Split</span>
            <Zap className="w-4 h-4 text-[#718679]" />
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold font-mono text-[#F4F4F5] tracking-tight tabular-nums">
                1.82
              </span>
              <span className="text-xs font-mono text-gray-400">kWh/room/day</span>
            </div>
            <p className="text-xs text-[#718679] mt-1 leading-relaxed">
              Brushless DC fan motors running in adaptive Eco-Auto mode maintain low operational draw.
            </p>
          </div>

          <div className="pt-3 border-t border-[#232B26] text-[11px] text-[#718679] flex items-center justify-between">
            <span>Energy Star Benchmark</span>
            <strong className="text-[#10B981] font-mono">Tier 1 High-Efficiency</strong>
          </div>
        </div>
      </div>
    </section>
  );
};
