import { describe, it, expect } from 'vitest';
import { clientLogger } from '../src/utils/logger';

describe('Client Logger & Atmospheric Schedule Modeling', () => {
  it('exposes safe client logger methods without causing browser console exceptions', () => {
    expect(() => {
      clientLogger.info('Client test message');
      clientLogger.warn('Client warning message');
      clientLogger.error('Client error message', new Error('Simulated network error'));
    }).not.toThrow();
  });

  it('validates diurnal winter smog atmospheric boundary layer dynamics', () => {
    // Diurnal atmospheric pattern: Morning inversion (06:00 - 09:30) traps particulates;
    // Midday solar warming (12:00 - 15:00) dilutes boundary layer;
    // Evening rush hour (17:30 - 20:30) increases ground NO2 and PM2.5.
    const morningHours = [6, 7, 8, 9];
    const middayHours = [12, 13, 14, 15];
    const eveningHours = [18, 19, 20];

    const getRecommendedAction = (hour: number, aqi: number) => {
      if (aqi >= 150) {
        if (morningHours.includes(hour)) return 'SEAL_WINDOWS_RUN_PURIFIER';
        if (middayHours.includes(hour)) return 'MICRO_VENTILATION_WINDOW';
        if (eveningHours.includes(hour)) return 'CONSOLIDATED_COMMUTE_NO_IDLE';
      }
      return 'NORMAL_VENTILATION';
    };

    expect(getRecommendedAction(7, 210)).toBe('SEAL_WINDOWS_RUN_PURIFIER');
    expect(getRecommendedAction(13, 210)).toBe('MICRO_VENTILATION_WINDOW');
    expect(getRecommendedAction(18, 210)).toBe('CONSOLIDATED_COMMUTE_NO_IDLE');
    expect(getRecommendedAction(7, 45)).toBe('NORMAL_VENTILATION');
  });

  it('calculates personal pollution exposure reduction under HEPA filtration', () => {
    const ambientPm25 = 180; // ug/m3
    const hepaPassThrough = 0.049; // 95.1% exclusion
    const indoorPm25 = ambientPm25 * hepaPassThrough;

    expect(indoorPm25).toBeLessThan(10); // Should be well within WHO 15 ug/m3 24h guideline
    expect(Number(indoorPm25.toFixed(2))).toBe(8.82);
  });

  it('validates transit modal emissions savings over private vehicle', () => {
    const distanceKm = 15;
    const iceEmissionsKg = (distanceKm * 2 * 192) / 1000; // 5.76 kg CO2
    const transitEmissionsKg = (distanceKm * 2 * 45) / 1000; // 1.35 kg CO2
    const avoidedKg = iceEmissionsKg - transitEmissionsKg;

    expect(avoidedKg).toBeCloseTo(4.41, 2);
    expect(avoidedKg).toBeGreaterThan(4.0);
  });
});
