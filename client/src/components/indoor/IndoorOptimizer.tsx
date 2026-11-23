import React, { useState } from 'react';
import { Home, Shield, DollarSign, Wind, AlertCircle, Check, ArrowRight } from 'lucide-react';
import { useEnvironmental } from '../../context/EnvironmentalContext';
import { useProfile } from '../../context/ProfileContext';

export const IndoorOptimizer: React.FC = () => {
  const { airQuality } = useEnvironmental();
  const { profile } = useProfile();
  const [activeTab, setActiveTab] = useState<'free' | 'low_cost' | 'equipment'>('free');

  const aqi = airQuality?.aqi ?? 140;
  const isSevere = aqi >= 150;

  const solutions = {
    free: [
      {
        title: 'Diurnal Cross-Ventilation Timing',
        how: 'Keep windows latched tight during morning and late evening inversion hours. If indoor air feels heavy or humid, open windows exclusively between 1:30 PM and 3:30 PM for a quick 10-minute flush.',
        why: 'Atmospheric boundary layers compress overnight and early morning, trapping vehicle exhaust and particulate soot right above residential rooftops.',
        limitations: 'Does not clean already-trapped particulate matter; must be paired with wet dusting.',
        benefit: 'Balances carbon dioxide (CO2) build-up without flooding bedrooms with toxic PM2.5.',
        cost: 'Free'
      },
      {
        title: 'Microfiber Damp Mopping Protocol',
        how: 'Clean hard floors and flat surfaces with a damp microfiber cloth instead of dry brooms or feather dusters.',
        why: 'Dry sweeping propels settled toxic heavy metals and silica particles back into the breathing zone for 2 to 4 hours.',
        limitations: 'Requires regular cloth rinsing in water buckets.',
        benefit: 'Permanently removes settled fine particles without airborne re-suspension.',
        cost: 'Free'
      },
      {
        title: 'Zero Indoor Combustion Rule',
        how: 'Strictly prohibit indoor burning of incense sticks (agarbatti), scented paraffin candles, mosquito coils, and kerosene space heaters.',
        why: 'A single incense stick emits PM2.5 concentrations exceeding 400 µg/m³ in closed bedrooms, equivalent to heavy traffic curbside exposure.',
        limitations: 'Requires family habit adjustment.',
        benefit: 'Immediately removes the #1 domestic contributor to acute household particulate spikes.',
        cost: 'Free'
      }
    ],
    low_cost: [
      {
        title: 'DIY Corsi-Rosenthal Cube Box Filter',
        how: 'Assemble 4 to 5 standard MERV-13 furnace filters (20x20 in) into a cube around a regular 20-inch box fan sealed with duct tape.',
        why: 'MERV-13 pleated synthetic media captures >= 85% of 1.0–3.0 µm particles and >= 50% of 0.3–1.0 µm aerosols, rivaling $400 HEPA purifiers in Clean Air Delivery Rate (CADR).',
        limitations: 'Fan noise on high speed; requires filter replacement every 4–6 months.',
        benefit: 'High CADR (250+ CFM) at less than one-fourth the cost of commercial HEPA purifiers.',
        cost: 'Approx. $35 – $55 total'
      },
      {
        title: 'Silicone Draft Weather-Stripping',
        how: 'Apply self-adhesive V-strip silicone or brush sweeps along the bottom of exterior doors and drafty window frames.',
        why: 'Smog infiltrates homes primarily through structural perimeter gaps driven by indoor-outdoor pressure differentials (stack effect).',
        limitations: 'Requires measuring and cutting door gaps accurately.',
        benefit: 'Cuts uncontrolled outdoor particulate infiltration by up to 60%.',
        cost: 'Approx. $8 – $15'
      },
      {
        title: 'Kitchen Range Hood Backdraft Damper',
        how: 'Ensure kitchen exhaust fan is equipped with a functioning gravity backdraft flap so outdoor smog cannot backflow down the vent pipe when fan is idle.',
        why: 'Exhaust ducts often act as funnels for ambient smog during thermal inversions when kitchen vents are turned off.',
        limitations: 'Requires accessing exterior wall or hood ducting.',
        benefit: 'Prevents reverse smog intrusion into kitchen and living rooms.',
        cost: 'Approx. $12 – $20'
      }
    ],
    equipment: [
      {
        title: 'True HEPA (H13) Air Purifier Placement',
        how: 'Position a certified H13 True HEPA purifier in the main bedroom, elevated 1 foot above floor level and at least 2 feet away from walls for unobstructed 360° intake.',
        why: 'Certified H13 fiberglass filters capture 99.97% of particles down to 0.3 microns, protecting alveoli during 8 hours of sleep.',
        limitations: 'Pre-filters must be vacuumed monthly; replacement filters cost $30–$60 annually.',
        benefit: 'Maintains clean room air (PM2.5 < 10 µg/m³) even when outdoor AQI surpasses 350.',
        cost: 'Approx. $90 – $220'
      },
      {
        title: 'Real-Time Laser PM2.5 Indoor Monitor',
        how: 'Place a low-cost optical particulate sensor (laser scattering) in the living room away from cooking steam to monitor indoor/outdoor ratios.',
        why: 'Invisible PM2.5 particles give no sensory warning; laser counters provide objective confirmation of when window seals or filters are succeeding.',
        limitations: 'Sensors can drift after 2 years without recalibration.',
        benefit: 'Eliminates guesswork; alerts you immediately when indoor air quality deteriorates.',
        cost: 'Approx. $45 – $85'
      }
    ]
  };

  return (
    <section className="max-w-5xl mx-auto space-y-6" aria-labelledby="indoor-heading">
      {/* Overview Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <h2 id="indoor-heading" className="text-lg font-bold text-[var(--text-main)]">
              Indoor Air Quality Optimizer
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Science-backed protocols to eliminate indoor particulate spikes and prevent outdoor smog intrusion
            </p>
          </div>
        </div>

        {/* Current Advisory Notice */}
        <div className={`mt-6 p-4 rounded-xl border flex items-start gap-3 ${
          isSevere 
            ? 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-300' 
            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300'
        }`}>
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong>Current Outdoor Smog Level: {airQuality?.category} (AQI {aqi}).</strong>{' '}
            {isSevere 
              ? 'Outdoor particulate concentrations are hazardous. Seal exterior openings, keep purifiers running continuously, and avoid incense or frying without high-flow ventilation.'
              : 'Outdoor air quality is relatively manageable. Natural cross-ventilation is recommended between 12:00 PM and 3:30 PM to clear indoor stale air and VOCs.'}
          </div>
        </div>

        {/* Tier Selector Buttons */}
        <div className="mt-6 flex flex-wrap gap-2 border-b border-[var(--border-main)] pb-4">
          <button
            onClick={() => setActiveTab('free')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'free'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-[var(--bg-card-secondary)] text-[var(--text-muted)] hover:bg-[var(--bg-hover)]'
            }`}
          >
            Zero-Cost Behavioral Protocols (Free)
          </button>
          <button
            onClick={() => setActiveTab('low_cost')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'low_cost'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-[var(--bg-card-secondary)] text-[var(--text-muted)] hover:bg-[var(--bg-hover)]'
            }`}
          >
            Low-Cost DIY & Sealing ($10 – $50)
          </button>
          <button
            onClick={() => setActiveTab('equipment')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'equipment'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-[var(--bg-card-secondary)] text-[var(--text-muted)] hover:bg-[var(--bg-hover)]'
            }`}
          >
            Equipment & Certified HEPA
          </button>
        </div>
      </div>

      {/* Solutions Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {solutions[activeTab].map((sol, idx) => (
          <article 
            key={idx}
            className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm hover:border-emerald-500/40 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {sol.cost}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              <h3 className="text-base font-bold text-[var(--text-main)] mb-2">
                {sol.title}
              </h3>

              <div className="space-y-2.5 text-xs text-[var(--text-muted)] leading-relaxed">
                <div>
                  <strong className="text-[var(--text-main)] block">How to Implement:</strong>
                  {sol.how}
                </div>
                <div>
                  <strong className="text-[var(--text-main)] block">Scientific Rationale:</strong>
                  {sol.why}
                </div>
                <div className="italic text-[11px] text-[var(--text-subtle)]">
                  <strong>Limitations:</strong> {sol.limitations}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--border-main)] text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Expected Benefit: {sol.benefit}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
