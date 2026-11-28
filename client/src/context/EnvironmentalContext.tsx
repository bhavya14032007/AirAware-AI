import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AirQualityData, WeatherData } from '../types';
import { api } from '../services/api';
import { clientLogger } from '../utils/logger';

export interface LocationSelection {
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export const BENCHMARK_CITIES: LocationSelection[] = [
  { name: 'Connaught Place, New Delhi', city: 'New Delhi', country: 'India', latitude: 28.6139, longitude: 77.2090 },
  { name: 'Downtown Los Angeles, CA', city: 'Los Angeles', country: 'United States', latitude: 34.0522, longitude: -118.2437 },
  { name: 'Central London', city: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278 },
  { name: 'Salt Lake Basin', city: 'Salt Lake City', country: 'United States', latitude: 40.7608, longitude: -111.8910 },
  { name: 'Chaoyang District, Beijing', city: 'Beijing', country: 'China', latitude: 39.9042, longitude: 116.4074 }
];

interface EnvironmentalContextType {
  location: LocationSelection;
  airQuality: AirQualityData | null;
  weather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  setLocation: (loc: LocationSelection) => void;
  refreshData: () => Promise<void>;
  isDemoMode: boolean;
  toggleDemoMode: () => void;
}

const EnvironmentalContext = createContext<EnvironmentalContextType | undefined>(undefined);

export const EnvironmentalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<LocationSelection>(() => {
    const saved = localStorage.getItem('airaware_location');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return BENCHMARK_CITIES[0]; // Default New Delhi for winter smog intelligence
  });

  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  const fetchData = useCallback(async (loc: LocationSelection) => {
    setIsLoading(true);
    setError(null);
    try {
      const [aqData, weatherData] = await Promise.all([
        api.getAirQuality(loc.latitude, loc.longitude, loc.name),
        api.getWeather(loc.latitude, loc.longitude)
      ]);
      setAirQuality(aqData);
      setWeather(weatherData);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load air quality data';
      clientLogger.error('Failed to fetch environmental data', err);
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(location);
    localStorage.setItem('airaware_location', JSON.stringify(location));
  }, [location, fetchData]);

  const handleSetLocation = (newLoc: LocationSelection) => {
    setLocation(newLoc);
  };

  const refreshData = async () => {
    await fetchData(location);
  };

  const toggleDemoMode = () => {
    setIsDemoMode(prev => !prev);
  };

  return (
    <EnvironmentalContext.Provider
      value={{
        location,
        airQuality,
        weather,
        isLoading,
        error,
        setLocation: handleSetLocation,
        refreshData,
        isDemoMode,
        toggleDemoMode
      }}
    >
      {children}
    </EnvironmentalContext.Provider>
  );
};

export const useEnvironmental = () => {
  const context = useContext(EnvironmentalContext);
  if (!context) throw new Error('useEnvironmental must be used within EnvironmentalProvider');
  return context;
};
