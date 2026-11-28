import { describe, it, expect } from 'vitest';
import {
  EPA_ICE_CO2_GRAMS_PER_KM,
  EPA_TRANSIT_CO2_GRAMS_PER_KM,
  INFILTRATION_BARRIER_REDUCTION_PCT,
  AQI_CATEGORY_COLORS,
  BRAND_COLORS
} from '../src/constants/index';

describe('Client Design System & Environmental Constants', () => {
  it('defines verified brand color palette matching Linear/Vercel obsidian aesthetic', () => {
    expect(BRAND_COLORS.bgApp).toBe('#0D110E');
    expect(BRAND_COLORS.cardSurface).toBe('#141916');
    expect(BRAND_COLORS.cardBorder).toBe('#232B26');
    expect(BRAND_COLORS.accentLime).toBe('#A3E635');
    expect(BRAND_COLORS.semanticGreen).toBe('#10B981');
    expect(BRAND_COLORS.textBright).toBe('#F4F4F5');
  });

  it('provides accessible semantic status colors for all 6 EPA AQI tiers', () => {
    expect(AQI_CATEGORY_COLORS.Good).toBe('#10B981');
    expect(AQI_CATEGORY_COLORS.Moderate).toBe('#F59E0B');
    expect(AQI_CATEGORY_COLORS['Unhealthy for Sensitive Groups']).toBe('#F97316');
    expect(AQI_CATEGORY_COLORS.Unhealthy).toBe('#EF4444');
    expect(AQI_CATEGORY_COLORS['Very Unhealthy']).toBe('#8B5CF6');
    expect(AQI_CATEGORY_COLORS.Hazardous).toBe('#7F1D1D');
  });

  it('ensures emission and physical building constants match environmental baselines', () => {
    expect(EPA_ICE_CO2_GRAMS_PER_KM).toBe(192);
    expect(EPA_TRANSIT_CO2_GRAMS_PER_KM).toBe(45);
    expect(INFILTRATION_BARRIER_REDUCTION_PCT).toBe(95.1);
  });
});
