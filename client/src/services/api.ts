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

// Robust API Base URL resolution:
// Handles:
// 1. Full URL with /api (https://app.onrender.com/api)
// 2. Full URL without /api (https://app.onrender.com -> automatically appends /api)
// 3. Trailing slashes
// 4. Default relative /api proxy
function getApiBase(): string {
  const envUrl = ((import.meta as any).env?.VITE_API_BASE_URL || '').trim();
  if (!envUrl) return '/api';
  const stripped = envUrl.replace(/\/+$/, '');
  return stripped.endsWith('/api') ? stripped : `${stripped}/api`;
}

const API_BASE = getApiBase();

function buildUrl(path: string, params?: Record<string, string | number | undefined>): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const full = `${API_BASE}${cleanPath}`;
  const isAbsolute = /^https?:\/\//i.test(full);
  const url = isAbsolute ? new URL(full) : new URL(full, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        url.searchParams.set(k, v.toString());
      }
    });
  }
  return url.toString();
}

async function safeJsonFetch(url: string, options?: RequestInit): Promise<any> {
  const res = await fetch(url, options);
  const contentType = res.headers.get('content-type') || '';
  
  if (!res.ok) {
    if (contentType.includes('application/json')) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || errData.message || `Request failed with status ${res.status}`);
    }
    throw new Error(`API returned HTTP ${res.status}: ${res.statusText}`);
  }

  if (!contentType.includes('application/json')) {
    const text = await res.text();
    if (text.trim().startsWith('<!doctype') || text.trim().startsWith('<html')) {
      throw new Error(
        'Backend returned HTML instead of JSON. Ensure VITE_API_BASE_URL points to your Render backend URL (e.g. https://your-backend.onrender.com/api) and redeploy on Vercel.'
      );
    }
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

  return res.json();
}

export const api = {
  // Health Diagnostic Check
  async checkHealth(): Promise<{ status: string; environment?: string }> {
    return safeJsonFetch(buildUrl('/health'));
  },

  // Environmental Endpoints
  async getAirQuality(lat: number, lon: number, name?: string): Promise<AirQualityData> {
    const url = buildUrl('/air-quality', { lat, lon, name });
    return safeJsonFetch(url);
  },

  async getWeather(lat: number, lon: number): Promise<WeatherData> {
    const url = buildUrl('/weather', { lat, lon });
    return safeJsonFetch(url);
  },

  async searchLocations(query: string): Promise<LocationSearchResult[]> {
    if (!query || query.trim().length < 2) return [];
    const url = buildUrl('/locations/search', { q: query });
    try {
      return await safeJsonFetch(url);
    } catch {
      return [];
    }
  },

  // AI Endpoints
  async sendChatMessage(
    messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
    lat: number,
    lon: number,
    locationName?: string
  ): Promise<{ reply: string; sources: string[]; limitations: string[] }> {
    return safeJsonFetch(buildUrl('/ai/chat'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, lat, lon, locationName }),
    });
  },

  async getRecommendations(lat: number, lon: number, locationName?: string): Promise<AIResponse> {
    return safeJsonFetch(buildUrl('/ai/recommendations'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lon, locationName }),
    });
  },

  async getDailyPlan(lat: number, lon: number, locationName?: string): Promise<{
    location: { name?: string; city?: string; country?: string; latitude?: number; longitude?: number } | Record<string, unknown>;
    aqi: number;
    category: string;
    actions: DailyRoutineAction[];
  }> {
    return safeJsonFetch(buildUrl('/ai/daily-plan'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lon, locationName }),
    });
  },

  async simulateWhatIf(scenario: WhatIfScenarioInput, lat: number, lon: number): Promise<WhatIfScenarioResult> {
    return safeJsonFetch(buildUrl('/ai/what-if'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario, lat, lon }),
    });
  },

  // Profile Endpoints
  async getProfile(): Promise<HouseholdProfile> {
    return safeJsonFetch(buildUrl('/profile'));
  },

  async updateProfile(profile: Partial<HouseholdProfile>): Promise<HouseholdProfile> {
    return safeJsonFetch(buildUrl('/profile'), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
  },

  // Impact Endpoints
  async getImpact(): Promise<ImpactSummary> {
    return safeJsonFetch(buildUrl('/impact'));
  },

  async logAction(action: { category: string; actionTitle: string; co2SavedKg?: number; exposureAvoidedPct?: number }): Promise<any> {
    return safeJsonFetch(buildUrl('/impact/actions'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action),
    });
  },

  // Community Endpoints
  async getCommunity(): Promise<CommunityData> {
    return safeJsonFetch(buildUrl('/community'));
  }
};
