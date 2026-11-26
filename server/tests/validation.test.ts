import { describe, it, expect } from 'vitest';
import { 
  AIResponseSchema, 
  DailyRoutineActionSchema, 
  HouseholdProfileSchema, 
  WhatIfScenarioSchema 
} from '../src/types/index.js';

describe('Zod Schema Strict Boundary Validation', () => {
  it('validates valid structured AI response conforming to AIResponseSchema', () => {
    const valid = {
      summary: 'Severe ground thermal inversion trapping exhaust particulates.',
      risk_level: 'high' as const,
      recommendations: [
        {
          title: 'Seal residential envelopes',
          action: 'Keep north-facing windows latched during morning stagnation.',
          reason: 'Thermal boundary layer is compressed below 140m.',
          impact: 'Eliminates 65% of particulate infiltration.',
          cost_level: 'free' as const,
          priority: 'high' as const,
          category: 'indoor' as const
        }
      ],
      alternatives: ['Batch errands into a single mid-afternoon trip'],
      limitations: ['Local construction plumes may introduce micro-variations.']
    };

    const parsed = AIResponseSchema.parse(valid);
    expect(parsed.summary).toBeDefined();
    expect(parsed.risk_level).toBe('high');
    expect(parsed.recommendations.length).toBe(1);
    expect(parsed.recommendations[0].priority).toBe('high');
  });

  it('rejects AI responses with missing mandatory fields', () => {
    const invalid = {
      summary: 'Incomplete response',
      aqiCategory: 'Good'
      // missing primaryRisks, windowVentilationSchedule, recommendations, etc.
    };

    expect(() => AIResponseSchema.parse(invalid)).toThrow();
  });

  it('validates HouseholdProfileSchema with all vulnerability flags', () => {
    const profile = {
      householdMembers: 4,
      hasChildren: true,
      hasElderly: true,
      hasRespiratoryConditions: true,
      hasCardiovascularConditions: false,
      hasAirPurifier: true,
      hasACFiltration: false,
      hasN95Masks: true,
      commuteMode: 'transit',
      commuteDistanceKm: 12,
      budgetTier: 'low_cost'
    };

    const parsed = HouseholdProfileSchema.parse(profile);
    expect(parsed.hasChildren).toBe(true);
    expect(parsed.budgetTier).toBe('low_cost');
  });

  it('validates WhatIfScenarioSchema input bounds', () => {
    const scenario = {
      usualRoutine: {
        commuteMode: 'car',
        commuteDistanceKm: 15,
        errandsTrips: 3,
        outdoorExerciseMinutes: 45,
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
    };

    const parsed = WhatIfScenarioSchema.parse(scenario);
    expect(parsed.usualRoutine.commuteDistanceKm).toBe(15);
    expect(parsed.optimizedAlternative.cookingVentilation).toBe('exhaust_hood');
  });
});
