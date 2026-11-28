import { describe, it, expect } from 'vitest';
import {
  EPA_ICE_CO2_GRAMS_PER_KM,
  EPA_TRANSIT_CO2_GRAMS_PER_KM,
  INFILTRATION_BARRIER_REDUCTION_PCT,
  DEFAULT_ERRAND_DISTANCE_KM,
  IDLE_FUEL_CONSUMPTION_L_PER_HOUR,
  GASOLINE_CO2_GRAMS_PER_LITER,
  EPA_PM25_BREAKPOINTS,
  EPA_PM10_BREAKPOINTS,
  TELEMETRY_CACHE_TTL_MS
} from '../src/constants/index.js';

describe('Environmental & Physics Domain Constants Verification', () => {
  it('enforces accurate EPA vehicular emission factors', () => {
    expect(EPA_ICE_CO2_GRAMS_PER_KM).toBe(192);
    expect(EPA_TRANSIT_CO2_GRAMS_PER_KM).toBe(45);
    // Public electric transit delivers > 75% emissions reduction vs ICE solo driving
    const transitSavingsPct = ((EPA_ICE_CO2_GRAMS_PER_KM - EPA_TRANSIT_CO2_GRAMS_PER_KM) / EPA_ICE_CO2_GRAMS_PER_KM) * 100;
    expect(transitSavingsPct).toBeGreaterThan(75);
  });

  it('enforces accurate envelope infiltration reduction metrics', () => {
    expect(INFILTRATION_BARRIER_REDUCTION_PCT).toBe(95.1);
  });

  it('enforces verified fuel consumption and idling emission factors', () => {
    expect(IDLE_FUEL_CONSUMPTION_L_PER_HOUR).toBe(0.8);
    expect(GASOLINE_CO2_GRAMS_PER_LITER).toBe(2310);
    expect(DEFAULT_ERRAND_DISTANCE_KM).toBe(4.0);
  });

  it('verifies EPA PM2.5 breakpoint integrity across all 6 AQI categories', () => {
    expect(EPA_PM25_BREAKPOINTS).toHaveLength(6);
    expect(EPA_PM25_BREAKPOINTS[0].category).toBe('Good');
    expect(EPA_PM25_BREAKPOINTS[0].cHigh).toBe(12.0);
    expect(EPA_PM25_BREAKPOINTS[5].category).toBe('Hazardous');
    expect(EPA_PM25_BREAKPOINTS[5].iHigh).toBe(500);

    // Verify monotonic ascending continuity
    for (let i = 1; i < EPA_PM25_BREAKPOINTS.length; i++) {
      expect(EPA_PM25_BREAKPOINTS[i].cLow).toBeGreaterThan(EPA_PM25_BREAKPOINTS[i - 1].cLow);
      expect(EPA_PM25_BREAKPOINTS[i].iLow).toBe(EPA_PM25_BREAKPOINTS[i - 1].iHigh + 1);
    }
  });

  it('verifies EPA PM10 breakpoint integrity and cache TTL settings', () => {
    expect(EPA_PM10_BREAKPOINTS).toHaveLength(6);
    expect(EPA_PM10_BREAKPOINTS[0].cHigh).toBe(54);
    expect(TELEMETRY_CACHE_TTL_MS).toBe(15 * 60 * 1000);
  });
});
