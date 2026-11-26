import { describe, it, expect } from 'vitest';
import { GeminiService } from '../src/services/geminiService.js';
import { getAQICategory, getPM25Category, getPM10Category } from '../src/services/openMeteoService.js';

describe('Environmental Mathematical Models & Constants', () => {
  it('models vehicular carbon baseline at 192 g CO2/km (round-trip)', () => {
    // 10 km one-way commute = 20 km round-trip = 20 * 0.192 = 3.84 kg CO2
    const result = GeminiService.simulateWhatIfScenario({
      usualRoutine: {
        commuteMode: 'car',
        commuteDistanceKm: 10,
        errandsTrips: 0,
        outdoorExerciseMinutes: 0,
        outdoorExerciseTime: '12:00',
        cookingVentilation: 'hood',
        heatingSource: 'electric'
      },
      optimizedAlternative: {
        commuteMode: 'remote',
        commuteDistanceKm: 0,
        errandsTrips: 0,
        outdoorExerciseMinutes: 0,
        outdoorExerciseTime: '12:00',
        cookingVentilation: 'hood',
        heatingSource: 'electric'
      }
    }, 150);

    // 20 km round trip * 0.192 kg/km = 3.84 kg CO2
    expect(result.emissionsAvoidedKgCO2).toBeCloseTo(3.84, 1);
  });

  it('calculates electric transit as 45 g CO2/passenger-km relative to solo ICE car', () => {
    // 20 km one-way = 40 km round-trip: 40 * (0.192 - 0.045) = 5.88 kg CO2
    const result = GeminiService.simulateWhatIfScenario({
      usualRoutine: {
        commuteMode: 'car',
        commuteDistanceKm: 20,
        errandsTrips: 0,
        outdoorExerciseMinutes: 0,
        outdoorExerciseTime: '12:00',
        cookingVentilation: 'hood',
        heatingSource: 'electric'
      },
      optimizedAlternative: {
        commuteMode: 'transit',
        commuteDistanceKm: 20,
        errandsTrips: 0,
        outdoorExerciseMinutes: 0,
        outdoorExerciseTime: '12:00',
        cookingVentilation: 'hood',
        heatingSource: 'electric'
      }
    }, 180);

    expect(result.emissionsAvoidedKgCO2).toBeCloseTo(5.88, 1);
  });

  it('models particulate exposure reduction when shifting outdoor cardio away from morning smog peak', () => {
    // Morning peak (07:30) vs Midday trough (13:30)
    const result = GeminiService.simulateWhatIfScenario({
      usualRoutine: {
        commuteMode: 'transit',
        commuteDistanceKm: 10,
        errandsTrips: 1,
        outdoorExerciseMinutes: 60,
        outdoorExerciseTime: '07:30', // Morning smog inversion peak
        cookingVentilation: 'none',
        heatingSource: 'electric'
      },
      optimizedAlternative: {
        commuteMode: 'transit',
        commuteDistanceKm: 10,
        errandsTrips: 1,
        outdoorExerciseMinutes: 20,
        outdoorExerciseTime: '13:30', // Boundary layer dispersed
        cookingVentilation: 'exhaust_hood',
        heatingSource: 'electric'
      }
    }, 280); // Severe smog condition

    expect(result.exposureReductionPct).toBeGreaterThanOrEqual(35);
    expect(result.assumptions.length).toBeGreaterThanOrEqual(2);
  });

  it('rigorously validates EPA PM10 and PM2.5 breakpoints', () => {
    expect(getPM10Category(40)).toBe('Good');
    expect(getPM10Category(100)).toBe('Moderate');
    expect(getPM10Category(200)).toBe('Unhealthy for Sensitive Groups');
    expect(getPM10Category(300)).toBe('Unhealthy');
    expect(getPM10Category(400)).toBe('Very Unhealthy');
    expect(getPM10Category(500)).toBe('Hazardous');

    expect(getPM25Category(10)).toBe('Good');
    expect(getPM25Category(30)).toBe('Moderate');
    expect(getPM25Category(50)).toBe('Unhealthy for Sensitive Groups');
    expect(getPM25Category(100)).toBe('Unhealthy');
    expect(getPM25Category(200)).toBe('Very Unhealthy');
    expect(getPM25Category(300)).toBe('Hazardous');
  });
});
