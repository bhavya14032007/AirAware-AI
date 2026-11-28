/**
 * AirAware AI — Client Environmental & Design System Constants
 */

export const EPA_ICE_CO2_GRAMS_PER_KM = 192;
export const EPA_TRANSIT_CO2_GRAMS_PER_KM = 45;
export const INFILTRATION_BARRIER_REDUCTION_PCT = 95.1;
export const DEFAULT_ERRAND_DISTANCE_KM = 4.0;
export const IDLE_FUEL_CONSUMPTION_L_PER_HOUR = 0.8;

export const AQI_CATEGORY_COLORS = {
  Good: '#10B981',
  Moderate: '#F59E0B',
  'Unhealthy for Sensitive Groups': '#F97316',
  Unhealthy: '#EF4444',
  'Very Unhealthy': '#8B5CF6',
  Hazardous: '#7F1D1D'
} as const;

export const BRAND_COLORS = {
  bgApp: '#0D110E',
  cardSurface: '#141916',
  cardBorder: '#232B26',
  accentLime: '#A3E635',
  semanticGreen: '#10B981',
  textMuted: '#A1A1AA',
  textBright: '#F4F4F5'
} as const;
