import React, { useState } from 'react';
import { 
  GitCompare, 
  ArrowRight, 
  ShieldCheck, 
  Leaf, 
  DollarSign, 
  Sliders, 
  Sparkles,
  Info
} from 'lucide-react';
import { useEnvironmental } from '../../context/EnvironmentalContext';
import { api } from '../../services/api';
import { WhatIfScenarioInput, WhatIfScenarioResult } from '../../types';

export const WhatIfSimulator: React.FC = () => {
  const { location, airQuality } = useEnvironmental();

  // State for user scenario inputs
  const [commuteMode, setCommuteMode] = useState<'car' | 'transit' | 'bike'>('car');
  const [commuteDist, setCommuteDist] = useState(14);
  const [errandTrips, setErrandTrips] = useState(3);
  const [workoutMin, setWorkoutMin] = useState(45);
  const [workoutTime, setWorkoutTime] = useState('07:30');

  // Simulation result
  const [result, setResult] = useState<WhatIfScenarioResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = async () => {
    setIsSimulating(true);
    try {
      const scenario: WhatIfScenarioInput = {
        usualRoutine: {
          commuteMode,
          commuteDistanceKm: commuteDist,
          errandsTrips: errandTrips,
          outdoorExerciseMinutes: workoutMin,
          outdoorExerciseTime: workoutTime,
          cookingVentilation: 'unvented',
          heatingSource: 'gas'
        },
        optimizedAlternative: {
          commuteMode: commuteMode === 'car' ? 'transit' : commuteMode,
          commuteDistanceKm: commuteDist,
          errandsTrips: 1, // consolidated
          outdoorExerciseMinutes: 15, // shifted indoors or curtailed
          outdoorExerciseTime: '13:30', // shifted to afternoon dispersion
          cookingVentilation: 'exhaust_fan',
          heatingSource: 'electric'
        }
      };

      const res = await api.simulateWhatIf(scenario, location.latitude, location.longitude);
      setResult(res);
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  // Run initial simulation on mount
  React.useEffect(() => {
    runSimulation();
  }, [location]);

  return (
    <section className="max-w-5xl mx-auto space-y-6" aria-labelledby="simulator-heading">
      {/* Title & Introduction */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white">
            <GitCompare className="w-5 h-5" />
          </div>
          <div>
            <h2 id="simulator-heading" className="text-lg font-bold text-[var(--text-main)]">
              What-If Routine Impact Simulator
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Compare your conventional daily routine against an AI-optimized alternative under current air quality conditions
            </p>
          </div>
        </div>
      </div>

      {/* Simulator Inputs Card */}
      <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-subtle)] flex items-center gap-1.5">
          <Sliders className="w-4 h-4" /> Customize Your Usual Daily Routine
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Commute Mode */}
          <div>
            <label className="text-xs font-semibold text-[var(--text-main)] block mb-2">
              Primary Commute
            </label>
            <select
              value={commuteMode}
              onChange={(e) => setCommuteMode(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card-secondary)] text-sm text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="car">Solo Car (Petrol/Diesel)</option>
              <option value="transit">Public Transit / Metro</option>
              <option value="bike">Bicycle / E-bike</option>
            </select>
          </div>

          {/* Commute Distance */}
          <div>
            <label className="text-xs font-semibold text-[var(--text-main)] block mb-2">
              Commute Distance: <span className="text-emerald-600 font-bold">{commuteDist} km</span>
            </label>
            <input
              type="range"
              min={2}
              max={40}
              value={commuteDist}
              onChange={(e) => setCommuteDist(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Errands Trips */}
          <div>
            <label className="text-xs font-semibold text-[var(--text-main)] block mb-2">
              Errand Trips per Week: <span className="text-emerald-600 font-bold">{errandTrips} trips</span>
            </label>
            <input
              type="range"
              min={1}
              max={6}
              value={errandTrips}
              onChange={(e) => setErrandTrips(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Outdoor Exercise Minutes */}
          <div>
            <label className="text-xs font-semibold text-[var(--text-main)] block mb-2">
              Outdoor Exercise: <span className="text-emerald-600 font-bold">{workoutMin} mins</span>
            </label>
            <input
              type="range"
              min={0}
              max={90}
              step={15}
              value={workoutMin}
              onChange={(e) => setWorkoutMin(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>Simulate Comparison</span>
          </button>
        </div>
      </div>

      {/* Simulator Results Dashboard */}
      {result && (
        <div className="space-y-6">
          {/* Metric Highlights Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block mb-1">
                Estimated Exposure Reduction
              </span>
              <span className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">
                ~{result.exposureReductionPct}%
              </span>
              <p className="text-[11px] text-[var(--text-muted)] mt-1">Lower particulate inhalation</p>
            </div>

            <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 block mb-1">
                Emissions Avoided
              </span>
              <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                {result.emissionsAvoidedKgCO2} kg
              </span>
              <p className="text-[11px] text-[var(--text-muted)] mt-1">CO2 equivalent per day</p>
            </div>

            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 block mb-1">
                Household Cost Impact
              </span>
              <span className="text-4xl font-extrabold text-amber-600 dark:text-amber-400 capitalize">
                {result.estimatedCostImpact}
              </span>
              <p className="text-[11px] text-[var(--text-muted)] mt-1">Fuel & transit savings</p>
            </div>
          </div>

          {/* AI Narrative Analysis */}
          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-subtle)] mb-2">
              Scenario Comparative Analysis
            </h4>
            <p className="text-sm text-[var(--text-main)] leading-relaxed font-medium">
              {result.summary}
            </p>

            {/* Side-by-side Dimensions */}
            <div className="mt-6 divide-y divide-[var(--border-main)] border-t border-[var(--border-main)]">
              {result.keyDifferences.map((diff, idx) => (
                <div key={idx} className="py-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="font-bold text-[var(--text-main)] block">{diff.dimension}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[var(--text-subtle)] uppercase text-[10px] font-semibold block">Usual Routine</span>
                    <span className="text-red-600 dark:text-red-400 font-medium">{diff.usual}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[var(--text-subtle)] uppercase text-[10px] font-semibold block">Optimized Alternative</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">{diff.optimized}</span>
                    <p className="text-[11px] text-[var(--text-muted)] italic mt-1">{diff.benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transparent Scientific Assumptions */}
          <div className="p-4 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-main)] text-xs text-[var(--text-muted)] space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[var(--text-main)]">
              <Info className="w-4 h-4 text-emerald-600" />
              <span>Transparent Modeling Assumptions:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 pl-2">
              {result.assumptions.map((asm, i) => (
                <li key={i}>{asm}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};
