import { describe, it, expect } from 'vitest';
import { getAQICategory, getPM25Category, OpenMeteoService } from '../src/services/openMeteoService.js';
import { GeminiService } from '../src/services/geminiService.js';
import { AIResponseSchema } from '../src/types/index.js';

describe('Environmental Categorization', () => {
  it('correctly maps AQI values to EPA categories', () => {
    expect(getAQICategory(35)).toBe('Good');
    expect(getAQICategory(75)).toBe('Moderate');
    expect(getAQICategory(120)).toBe('Unhealthy for Sensitive Groups');
    expect(getAQICategory(175)).toBe('Unhealthy');
    expect(getAQICategory(250)).toBe('Very Unhealthy');
    expect(getAQICategory(380)).toBe('Hazardous');
  });

  it('correctly categorizes PM2.5 concentrations', () => {
    expect(getPM25Category(8.0)).toBe('Good');
    expect(getPM25Category(25.0)).toBe('Moderate');
    expect(getPM25Category(45.0)).toBe('Unhealthy for Sensitive Groups');
    expect(getPM25Category(80.0)).toBe('Unhealthy');
    expect(getPM25Category(190.0)).toBe('Very Unhealthy');
    expect(getPM25Category(350.0)).toBe('Hazardous');
  });

  it('returns high fidelity simulated data for offline benchmark locations', () => {
    const delhi = OpenMeteoService.getSimulatedAirQuality(28.61, 77.20, 'New Delhi, India');
    expect(delhi.category).toBe('Hazardous');
    expect(delhi.aqi).toBeGreaterThan(300);
    expect(delhi.pollutants.pm2_5.value).toBeGreaterThan(250);
    expect(delhi.hourlyTrends.length).toBe(24);
    expect(delhi.forecast.length).toBe(3);
  });
});

describe('AI Reasoning & What-If Simulation', () => {
  it('simulates scenario comparison with transparent calculated metrics', () => {
    const result = GeminiService.simulateWhatIfScenario({
      usualRoutine: {
        commuteMode: 'car',
        commuteDistanceKm: 15,
        errandsTrips: 3,
        outdoorExerciseMinutes: 60,
        outdoorExerciseTime: '07:30',
        cookingVentilation: 'none',
        heatingSource: 'gas'
      },
      optimizedAlternative: {
        commuteMode: 'transit',
        commuteDistanceKm: 15,
        errandsTrips: 1,
        outdoorExerciseMinutes: 15,
        outdoorExerciseTime: '13:30',
        cookingVentilation: 'exhaust_hood',
        heatingSource: 'electric'
      }
    }, 220); // AQI 220

    expect(result.emissionsAvoidedKgCO2).toBeGreaterThan(0);
    expect(result.exposureReductionPct).toBeGreaterThan(20);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.keyDifferences.length).toBe(3);
  });

  it('validates structured AI output conforming to AIResponseSchema', async () => {
    const mockData = OpenMeteoService.getSimulatedAirQuality(28.61, 77.20);
    const mockWeather = {
      temperature: 14,
      relativeHumidity: 80,
      windSpeed: 4,
      windDirection: 180,
      precipitation: 0,
      weatherCode: 3,
      conditionText: 'Smoggy',
      timestamp: new Date().toISOString()
    };

    const recs = await GeminiService.getRecommendations(mockData, mockWeather);
    const parsed = AIResponseSchema.safeParse(recs);
    expect(parsed.success).toBe(true);
    expect(recs.recommendations.length).toBeGreaterThan(0);
  });
});
