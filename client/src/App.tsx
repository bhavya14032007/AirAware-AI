import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ProfileProvider } from './context/ProfileContext';
import { EnvironmentalProvider, useEnvironmental } from './context/EnvironmentalContext';
import { Header } from './components/layout/Header';
import { ModeBanner } from './components/layout/ModeBanner';
import { Navigation, NavTab } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';

// Dashboard components
import { AQICard } from './components/dashboard/AQICard';
import { WeatherCard } from './components/dashboard/WeatherCard';
import { ForecastCard } from './components/dashboard/ForecastCard';
import { PollutantGrid } from './components/dashboard/PollutantGrid';
import { HourlyTrendChart } from './components/dashboard/HourlyTrendChart';
import { AISummaryBanner } from './components/dashboard/AISummaryBanner';

// Module components
import { ChatWindow } from './components/advisor/ChatWindow';
import { DailyRoutinePlanner } from './components/routine/DailyRoutinePlanner';
import { IndoorOptimizer } from './components/indoor/IndoorOptimizer';
import { LowEmissionPlanner } from './components/lifestyle/LowEmissionPlanner';
import { WhatIfSimulator } from './components/simulator/WhatIfSimulator';
import { ImpactTracker } from './components/impact/ImpactTracker';
import { CommunityInsights } from './components/community/CommunityInsights';

const DashboardContent: React.FC<{ onNavigateAdvisor: () => void }> = ({ onNavigateAdvisor }) => {
  const { airQuality, weather, isLoading, error } = useEnvironmental();

  if (isLoading && !airQuality) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-medium text-[var(--text-muted)]">Loading verified atmospheric metrics...</p>
      </div>
    );
  }

  if (error && !airQuality) {
    return (
      <div className="py-16 text-center space-y-3 p-6 rounded-2xl bg-red-500/10 border border-red-500/20 max-w-lg mx-auto">
        <p className="text-sm font-semibold text-red-600 dark:text-red-400">Failed to load live atmospheric data.</p>
        <p className="text-xs text-[var(--text-muted)]">{error}</p>
      </div>
    );
  }

  if (!airQuality || !weather) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Grid: AQI + Weather + 3-Day Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AQICard airQuality={airQuality} />
        </div>
        <div className="space-y-6">
          <WeatherCard weather={weather} />
          <ForecastCard airQuality={airQuality} />
        </div>
      </div>

      {/* AI Intelligence Briefing */}
      <AISummaryBanner onNavigateAdvisor={onNavigateAdvisor} />

      {/* 24-Hour Diurnal Hourly Chart */}
      <HourlyTrendChart airQuality={airQuality} />

      {/* Detailed Pollutants Breakdown */}
      <PollutantGrid airQuality={airQuality} />
    </div>
  );
};

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ModeBanner />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <DashboardContent onNavigateAdvisor={() => setActiveTab('advisor')} />}
        {activeTab === 'advisor' && <ChatWindow />}
        {activeTab === 'routine' && <DailyRoutinePlanner />}
        {activeTab === 'indoor' && <IndoorOptimizer />}
        {activeTab === 'lifestyle' && <LowEmissionPlanner />}
        {activeTab === 'simulator' && <WhatIfSimulator />}
        {activeTab === 'impact' && <ImpactTracker />}
        {activeTab === 'community' && <CommunityInsights />}
      </main>

      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <EnvironmentalProvider>
          <AppContent />
        </EnvironmentalProvider>
      </ProfileProvider>
    </ThemeProvider>
  );
};

export default App;
