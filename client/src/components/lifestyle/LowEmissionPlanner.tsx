import React from 'react';
import { Bike, Car, ArrowRight, Shield, Leaf, DollarSign, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import { clientLogger } from '../../utils/logger';

export const LowEmissionPlanner: React.FC = () => {
  const habits = [
    {
      domain: 'Errand Trips',
      habit: 'Running 3 to 4 separate short vehicle runs across the week for groceries and errands.',
      alternative: 'Batch errands into a single consolidated weekend loop or walk/bike for local stops under 1.5 km.',
      difficulty: 'Easy',
      cost: 'Saves fuel ($10–$25/month)',
      personalBenefit: 'Eliminates repetitive traffic stress and cold-start exhaust fumes inside the garage/car cabin.',
      emissionsAvoided: '3.8 kg CO2 & 22g PM2.5 per consolidated week',
      assumptions: 'Calculated at 4.2 km per trip @ 192g CO2/km plus cold engine start enrichment factor.'
    },
    {
      domain: 'School & Office Commute',
      habit: 'Solo internal combustion engine (ICE) driving through rush-hour traffic gridlock.',
      alternative: 'Switch to electric metro/train, neighborhood carpool, or electric bus.',
      difficulty: 'Moderate',
      cost: 'Significant savings on fuel & parking',
      personalBenefit: 'Avoids direct roadside exhaust inhalation trapped between heavy truck lanes.',
      emissionsAvoided: '2.3 kg CO2 per daily 12 km round-trip',
      assumptions: 'Comparing 192g CO2/km (single occupancy car) against 45g CO2/passenger-km (electric transit).'
    },
    {
      domain: 'Vehicle Idling',
      habit: 'Keeping engine idling while waiting at school pick-up zones, drive-thrus, or railway crossings.',
      alternative: 'Turn engine off when stationary for more than 30 seconds.',
      difficulty: 'Very Easy',
      cost: 'Zero cost; prevents fuel waste',
      personalBenefit: 'Prevents toxic fumes from circulating directly around children waiting at curbside.',
      emissionsAvoided: '0.6 kg CO2 per 15 minutes of eliminated idling',
      assumptions: 'EPA estimate: average 4-cylinder engine consumes ~0.8 liters of fuel per hour of idling.'
    },
    {
      domain: 'Home Heating & Ambiance',
      habit: 'Burning firewood or coal in decorative open fireplaces or unvented space heaters.',
      alternative: 'Utilize high-efficiency electric heat pumps or sealed oil radiator space heaters.',
      difficulty: 'Moderate',
      cost: 'Neutral to lower operating cost',
      personalBenefit: 'Protects household pulmonary airways from carcinogenic polycyclic aromatic hydrocarbons (PAHs).',
      emissionsAvoided: '4.5 kg CO2 & 180g PM2.5 per heating evening',
      assumptions: 'Standard residential wood stove emits ~15g PM2.5 per hour under slow burn conditions.'
    },
    {
      domain: 'Garden & Yard Waste',
      habit: 'Open burning of dry leaves, twigs, and agricultural residue.',
      alternative: 'Mulching or backyard composting for nutrient-rich soil enrichment.',
      difficulty: 'Easy',
      cost: 'Free',
      personalBenefit: 'Stops hazardous smoke plumes from settling across neighborhood homes.',
      emissionsAvoided: '12.0 kg CO2 & 320g PM2.5 per mulch pile',
      assumptions: 'Open biomass burning produces high black carbon and toxic carbon monoxide ratios.'
    }
  ];

  const handleAdopt = async (title: string, co2: number) => {
    try {
      await api.logAction({
        category: 'sustainability',
        actionTitle: `Adopted: ${title}`,
        co2SavedKg: co2,
        exposureAvoidedPct: 35
      });
      alert(`Action logged to Impact Tracker! Saved ~${co2} kg CO2.`);
    } catch (err) {
      clientLogger.warn('Failed to log lifestyle action', err);
    }
  };

  return (
    <section className="max-w-5xl mx-auto space-y-6" aria-labelledby="lifestyle-heading">
      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h2 id="lifestyle-heading" className="text-lg font-bold text-[var(--text-main)]">
              Low-Emission Lifestyle & Habit Planner
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              High-impact behavioral switches that reduce urban air pollution at the source while cutting household exposure
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {habits.map((h, i) => (
          <article 
            key={i}
            className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm hover:border-emerald-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                  {h.domain}
                </span>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[var(--text-subtle)]">Difficulty: <strong className="text-[var(--text-main)]">{h.difficulty}</strong></span>
                  <span className="text-[var(--text-subtle)]">•</span>
                  <span className="text-[var(--text-subtle)]">Cost: <strong className="text-emerald-600">{h.cost}</strong></span>
                </div>
              </div>

              {/* Before vs After Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/15">
                  <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block mb-1">
                    Conventional Habit
                  </span>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{h.habit}</p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                    Low-Emission Alternative
                  </span>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{h.alternative}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[var(--text-muted)] mt-4 pt-4 border-t border-[var(--border-main)]">
                <div>
                  <strong className="text-[var(--text-main)] block mb-0.5">Personal Health & Lifestyle Benefit:</strong>
                  {h.personalBenefit}
                </div>
                <div>
                  <strong className="text-emerald-600 dark:text-emerald-400 block mb-0.5">Estimated Environmental Savings:</strong>
                  {h.emissionsAvoided}
                </div>
              </div>

              <p className="text-[10px] text-[var(--text-subtle)] italic mt-3">
                *Assumption: {h.assumptions}
              </p>
            </div>

            <div className="mt-4 pt-3 flex justify-end">
              <button
                onClick={() => handleAdopt(h.domain, parseFloat(h.emissionsAvoided) || 2.0)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 text-xs font-medium transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Log to My Impact</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
