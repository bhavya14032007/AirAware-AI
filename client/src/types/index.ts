export type AQICategory = 
  | 'Good' 
  | 'Moderate' 
  | 'Unhealthy for Sensitive Groups' 
  | 'Unhealthy' 
  | 'Very Unhealthy' 
  | 'Hazardous';

export interface PollutantMeasurement {
  value: number;
  unit: string;
  category: AQICategory;
  description: string;
}

export interface AirQualityData {
  location: {
    name: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  aqi: number;
  category: AQICategory;
  status: 'live' | 'forecast' | 'simulated' | 'stale';
  timestamp: string;
  source: string;
  attribution: string;
  pollutants: {
    pm2_5: PollutantMeasurement;
    pm10: PollutantMeasurement;
    no2?: PollutantMeasurement;
    o3?: PollutantMeasurement;
    so2?: PollutantMeasurement;
    co?: PollutantMeasurement;
  };
  hourlyTrends: {
    time: string;
    aqi: number;
    pm2_5: number;
    pm10: number;
  }[];
  forecast: {
    date: string;
    maxAqi: number;
    category: AQICategory;
    summary: string;
  }[];
}

export interface WeatherData {
  temperature: number;
  apparentTemperature?: number;
  relativeHumidity: number;
  windSpeed: number;
  windDirection: number;
  precipitation: number;
  weatherCode: number;
  conditionText: string;
  timestamp: string;
}

export interface HouseholdProfile {
  id?: string;
  userId?: string;
  householdSize: number;
  hasChildren: boolean;
  hasElderly: boolean;
  hasAsthmaRespiratory: boolean;
  hasHeartConditions: boolean;
  commuteMode: 'transit' | 'car' | 'bike' | 'walk' | 'remote';
  dailyOutdoorHours: number;
  hasAirPurifier: boolean;
  hasN95Masks: boolean;
  hasHepaAcFilters: boolean;
  budgetTier: 'free' | 'low_cost' | 'moderate' | 'premium';
}

export interface AIRecommendation {
  title: string;
  action: string;
  reason: string;
  impact: string;
  cost_level: 'free' | 'low' | 'moderate';
  priority: 'low' | 'medium' | 'high';
  category: 'indoor' | 'outdoor' | 'commute' | 'sustainability';
}

export interface AIResponse {
  summary: string;
  risk_level: 'low' | 'moderate' | 'high' | 'very_high';
  recommendations: AIRecommendation[];
  alternatives: string[];
  limitations: string[];
}

export interface DailyRoutineAction {
  id: string;
  time: string;
  recommendation: string;
  reason: string;
  alternative: string;
  priority: 'low' | 'medium' | 'high';
  category: 'indoor' | 'outdoor' | 'commute' | 'sustainability';
  completed: boolean;
  expectedBenefit: string;
}

export interface LocationSearchResult {
  id: string;
  name: string;
  city: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export interface WhatIfScenarioInput {
  usualRoutine: {
    commuteMode: string;
    commuteDistanceKm: number;
    errandsTrips: number;
    outdoorExerciseMinutes: number;
    outdoorExerciseTime: string;
    cookingVentilation: string;
    heatingSource: string;
  };
  optimizedAlternative: {
    commuteMode: string;
    commuteDistanceKm: number;
    errandsTrips: number;
    outdoorExerciseMinutes: number;
    outdoorExerciseTime: string;
    cookingVentilation: string;
    heatingSource: string;
  };
}

export interface WhatIfScenarioResult {
  baselineExposureScore: number;
  optimizedExposureScore: number;
  exposureReductionPct: number;
  baselineEmissionsKgCO2: number;
  optimizedEmissionsKgCO2: number;
  emissionsAvoidedKgCO2: number;
  convenienceRating: 'easier' | 'similar' | 'slightly_more_effort' | 'high_effort';
  estimatedCostImpact: 'savings' | 'neutral' | 'slight_cost';
  summary: string;
  assumptions: string[];
  keyDifferences: {
    dimension: string;
    usual: string;
    optimized: string;
    benefit: string;
  }[];
}

export interface ImpactSummary {
  userId: string;
  totalActionsCount: number;
  totalCo2SavedKg: number;
  averageExposureAvoidedPct: number;
  streakDays: number;
  completedActions: {
    id: string;
    category: string;
    actionTitle: string;
    co2SavedKg: number;
    exposureAvoidedPct: number;
    createdAt: string;
  }[];
  disclaimer: string;
}

export interface CommunityData {
  activeCommunityMembers: number;
  communityAvoidedCo2Tons: number;
  initiatives: {
    id: string;
    title: string;
    location: string;
    participants: number;
    impact: string;
    status: string;
  }[];
  isSimulatedData: boolean;
  dataNotice: string;
}
