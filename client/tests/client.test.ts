import { describe, it, expect } from 'vitest';
import { getCategoryStyles } from '../src/components/dashboard/AQICard';
import { BENCHMARK_CITIES } from '../src/context/EnvironmentalContext';

describe('Frontend AQI Styling & Visual Rules', () => {
  it('assigns correct visual badge classes and protocol recommendations to AQI categories', () => {
    const good = getCategoryStyles('Good');
    expect(good.barColor).toBe('bg-emerald-500');
    expect(good.badgeBg).toContain('emerald');

    const mod = getCategoryStyles('Moderate');
    expect(mod.barColor).toBe('bg-amber-500');

    const sensitive = getCategoryStyles('Unhealthy for Sensitive Groups');
    expect(sensitive.barColor).toBe('bg-orange-500');

    const unhealthy = getCategoryStyles('Unhealthy');
    expect(unhealthy.barColor).toBe('bg-red-500');

    const veryUnhealthy = getCategoryStyles('Very Unhealthy');
    expect(veryUnhealthy.barColor).toBe('bg-purple-500');

    const hazardous = getCategoryStyles('Hazardous');
    expect(hazardous.barColor).toBe('bg-rose-800');
  });

  it('provides winter smog benchmark hotspots with exact coordinates', () => {
    expect(BENCHMARK_CITIES.length).toBeGreaterThanOrEqual(4);
    const delhi = BENCHMARK_CITIES.find(c => c.city === 'New Delhi');
    expect(delhi).toBeDefined();
    expect(delhi?.latitude).toBeCloseTo(28.6139, 2);
    expect(delhi?.longitude).toBeCloseTo(77.2090, 2);
  });
});
