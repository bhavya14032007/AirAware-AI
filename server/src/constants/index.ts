/**
 * AirAware AI — Environmental & Physics Domain Constants
 * Grounded in EPA (US Environmental Protection Agency), WHO, and Copernicus (CAMS) standards.
 */

/**
 * EPA baseline CO2 emissions for internal combustion engine (ICE) passenger vehicles.
 * 192 grams of CO2 equivalent per vehicle-kilometer.
 * Citation: EPA Greenhouse Gas Equivalencies Calculator & Fleet Emissions Model.
 */
export const EPA_ICE_CO2_GRAMS_PER_KM = 192;

/**
 * Average electric transit (metro/bus) emissions per passenger-kilometer.
 * 45 grams of CO2 equivalent per passenger-kilometer.
 */
export const EPA_TRANSIT_CO2_GRAMS_PER_KM = 45;

/**
 * Typical distance for bundled urban errands in smart batching models.
 * 4.0 kilometers round-trip.
 */
export const DEFAULT_ERRAND_DISTANCE_KM = 4.0;

/**
 * Average fuel consumption rate during vehicle engine idling.
 * 0.8 liters per hour.
 */
export const IDLE_FUEL_CONSUMPTION_L_PER_HOUR = 0.8;

/**
 * Grams of CO2 emitted per liter of gasoline combusted.
 * 2310 grams CO2e per liter.
 */
export const GASOLINE_CO2_GRAMS_PER_LITER = 2310;

/**
 * Infiltration barrier efficiency for high-efficiency sealed HVAC / HEPA building envelopes.
 * 95.1% reduction in ambient outdoor PM2.5 infiltration.
 */
export const INFILTRATION_BARRIER_REDUCTION_PCT = 95.1;

/**
 * Telemetry cache TTL in milliseconds (15 minutes).
 */
export const TELEMETRY_CACHE_TTL_MS = 15 * 60 * 1000;

/**
 * General API Rate Limiting: 200 requests per 15 minutes.
 */
export const GENERAL_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
export const GENERAL_RATE_LIMIT_MAX_REQUESTS = 200;

/**
 * AI Reasoning Rate Limiting: 30 requests per minute.
 */
export const AI_RATE_LIMIT_WINDOW_MS = 60 * 1000;
export const AI_RATE_LIMIT_MAX_REQUESTS = 30;

/**
 * EPA AQI Breakpoints for PM2.5 (ug/m3)
 */
export const EPA_PM25_BREAKPOINTS = [
  { cLow: 0.0, cHigh: 12.0, iLow: 0, iHigh: 50, category: 'Good' },
  { cLow: 12.1, cHigh: 35.4, iLow: 51, iHigh: 100, category: 'Moderate' },
  { cLow: 35.5, cHigh: 55.4, iLow: 101, iHigh: 150, category: 'Unhealthy for Sensitive Groups' },
  { cLow: 55.5, cHigh: 150.4, iLow: 151, iHigh: 200, category: 'Unhealthy' },
  { cLow: 150.5, cHigh: 250.4, iLow: 201, iHigh: 300, category: 'Very Unhealthy' },
  { cLow: 250.5, cHigh: 500.4, iLow: 301, iHigh: 500, category: 'Hazardous' }
] as const;

/**
 * EPA AQI Breakpoints for PM10 (ug/m3)
 */
export const EPA_PM10_BREAKPOINTS = [
  { cLow: 0, cHigh: 54, iLow: 0, iHigh: 50, category: 'Good' },
  { cLow: 55, cHigh: 154, iLow: 51, iHigh: 100, category: 'Moderate' },
  { cLow: 155, cHigh: 254, iLow: 101, iHigh: 150, category: 'Unhealthy for Sensitive Groups' },
  { cLow: 255, cHigh: 354, iLow: 151, iHigh: 200, category: 'Unhealthy' },
  { cLow: 355, cHigh: 424, iLow: 201, iHigh: 300, category: 'Very Unhealthy' },
  { cLow: 425, cHigh: 604, iLow: 301, iHigh: 500, category: 'Hazardous' }
] as const;
