import { 
  AirQualityData, 
  WeatherData, 
  HouseholdProfile, 
  AIResponse, 
  DailyRoutineAction,
  LocationSearchResult,
  WhatIfScenarioInput,
  WhatIfScenarioResult,
  ImpactSummary,
  CommunityData
} from '../types';

// Read API base URL from Vite environment variable when deployed separately (e.g. Vercel -> Render)
// Fall back to local relative '/api' proxy
const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/+$/, '');

export const api = {
  // Environmental Endpoints
  async getAirQuality(lat: number, lon: number, name?: string): Promise<AirQualityData> {
    const url = new URL(`${API_BASE}/air-quality`, window.location.origin);
    url.searchParams.set('lat', lat.toString());
    url.searchParams.set('lon', lon.toString());
    if (name) url.searchParams.set('name', name);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Air quality error: ${res.statusText}`);
    return res.json();
  },

  async getWeather(lat: number, lon: number): Promise<WeatherData> {
    const url = new URL(`${API_BASE}/weather`, window.location.origin);
    url.searchParams.set('lat', lat.toString());
    url.searchParams.set('lon', lon.toString());

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Weather error: ${res.statusText}`);
    return res.json();
  },

  async searchLocations(query: string): Promise<LocationSearchResult[]> {
    if (!query || query.trim().length < 2) return [];
    const url = new URL(`${API_BASE}/locations/search`, window.location.origin);
    url.searchParams.set('q', query);

    const res = await fetch(url.toString());
    if (!res.ok) return [];
    return res.json();
  },

  // AI Endpoints
  async sendChatMessage(
    messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
    lat: number,
    lon: number,
    locationName?: string
  ): Promise<{ reply: string; sources: string[]; limitations: string[] }> {
    const res = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, lat, lon, locationName }),
    });
    if (!res.ok) throw new Error(`Chat error: ${res.statusText}`);
    return res.json();
  },

  async getRecommendations(lat: number, lon: number, locationName?: string): Promise<AIResponse> {
    const res = await fetch(`${API_BASE}/ai/recommendations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lon, locationName }),
    });
    if (!res.ok) throw new Error(`Recommendations error: ${res.statusText}`);
    return res.json();
  },

  async getDailyPlan(lat: number, lon: number, locationName?: string): Promise<{
    location: any;
    aqi: number;
    category: string;
    actions: DailyRoutineAction[];
  }> {
    const res = await fetch(`${API_BASE}/ai/daily-plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lon, locationName }),
    });
    if (!res.ok) throw new Error(`Daily plan error: ${res.statusText}`);
    return res.json();
  },

  async simulateWhatIf(scenario: WhatIfScenarioInput, lat: number, lon: number): Promise<WhatIfScenarioResult> {
    const res = await fetch(`${API_BASE}/ai/what-if`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario, lat, lon }),
    });
    if (!res.ok) throw new Error(`Simulation error: ${res.statusText}`);
    return res.json();
  },

  // Profile Endpoints
  async getProfile(): Promise<HouseholdProfile> {
    const res = await fetch(`${API_BASE}/profile`);
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  },

  async updateProfile(profile: Partial<HouseholdProfile>): Promise<HouseholdProfile> {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  },

  // Impact Endpoints
  async getImpact(): Promise<ImpactSummary> {
    const res = await fetch(`${API_BASE}/impact`);
    if (!res.ok) throw new Error('Failed to fetch impact');
    return res.json();
  },

  async logAction(action: { category: string; actionTitle: string; co2SavedKg?: number; exposureAvoidedPct?: number }): Promise<any> {
    const res = await fetch(`${API_BASE}/impact/actions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action),
    });
    if (!res.ok) throw new Error('Failed to log action');
    return res.json();
  },

  // Community Endpoints
  async getCommunity(): Promise<CommunityData> {
    const res = await fetch(`${API_BASE}/community`);
    if (!res.ok) throw new Error('Failed to fetch community data');
    return res.json();
  }
};
