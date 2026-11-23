import React, { useState } from 'react';
import { NafasSidebar } from './NafasSidebar';
import { NafasTopBar } from './NafasTopBar';
import { NafasMetricsRow } from './NafasMetricsRow';
import { NafasChart } from './NafasChart';
import { NafasRoomGrid, RoomData } from './NafasRoomGrid';
import { NafasDrawerModal } from './NafasDrawerModal';
import { HouseholdProfileModal } from '../profile/HouseholdProfileModal';
import { useEnvironmental } from '../../context/EnvironmentalContext';
import { Github, ExternalLink, Leaf } from 'lucide-react';

export const NafasDashboard: React.FC = () => {
  const { airQuality, weather } = useEnvironmental();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
  const [drawerTab, setDrawerTab] = useState('indoor');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleNavClick = (navItem: string) => {
    setActiveNav(navItem);
    if (navItem === 'dashboard') {
      setIsDrawerOpen(false);
      return;
    }
    if (navItem === 'ai-advisor') {
      setDrawerTab('advisor');
      setIsDrawerOpen(true);
    } else if (navItem === 'room') {
      setDrawerTab('indoor');
      setIsDrawerOpen(true);
    } else if (navItem === 'account' || navItem === 'user') {
      setIsProfileOpen(true);
    } else {
      setDrawerTab('routine');
      setIsDrawerOpen(true);
    }
  };

  const handleRoomSelect = (room: RoomData) => {
    setSelectedRoom(room);
    setDrawerTab('indoor');
    setIsDrawerOpen(true);
  };

  const handlePowerDetails = () => {
    setSelectedRoom(null);
    setDrawerTab('simulator');
    setIsDrawerOpen(true);
  };

  const handleApartmentsClick = () => {
    setSelectedRoom(null);
    setDrawerTab('community');
    setIsDrawerOpen(true);
  };

  // Sync real outdoor PM2.5 reading if live data is available
  const outdoorPM25 = airQuality?.pollutants?.pm2_5?.value 
    ? Math.round(airQuality.pollutants.pm2_5.value) 
    : 244;

  return (
    <div className="min-h-screen bg-[#9ebaa5] dark:bg-[#0c120f] transition-colors py-4 sm:py-8 px-2 sm:px-4 lg:px-6 flex flex-col items-center justify-center font-sans antialiased">
      {/* Outer Dashboard Window Container */}
      <div className="w-full max-w-[1360px] bg-[#0f1512] rounded-[32px] p-5 sm:p-7 border border-[#1f2923] shadow-2xl flex flex-col lg:flex-row gap-6 relative overflow-hidden">
        {/* Left Sidebar */}
        <NafasSidebar
          activeNav={activeNav}
          onNavClick={handleNavClick}
          onOpenApartments={handleApartmentsClick}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            {/* Top Bar with Breadcrumbs & Theme/User Controls */}
            <NafasTopBar
              onProfileClick={() => setIsProfileOpen(true)}
              onBackClick={() => setActiveNav('dashboard')}
            />

            {/* Page Title */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Floor Overview
              </h1>

              {/* Public GitHub Link Badge */}
              <a
                href="https://github.com/airaware-ai/airaware-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18231e] border border-[#27382d] text-xs font-medium text-[#879d90] hover:text-white hover:border-emerald-500/40 transition-colors"
                title="View Public GitHub Repository"
              >
                <Github className="w-3.5 h-3.5" />
                <span>airaware-ai</span>
                <ExternalLink className="w-3 h-3 text-[#5e7467]" />
              </a>
            </div>

            {/* Top 3 Cards Row */}
            <NafasMetricsRow
              currentIndoorPM25={12}
              averageIndoorPM25={12}
              averageOutdoorPM25={outdoorPM25}
              powerConsumptionKWh={151.27}
              onDetailsClick={handlePowerDetails}
            />

            {/* Middle Outdoor vs Indoor PM 2.5 Chart */}
            <NafasChart />

            {/* Bottom 6 Room Cards Grid */}
            <NafasRoomGrid onRoomSelect={handleRoomSelect} />
          </div>

          {/* Bottom Attribution Notice */}
          <footer className="mt-6 pt-4 border-t border-[#1c2721] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#5e7467]">
            <div className="flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>AirAware AI & Copernicus Atmosphere (CAMS) Sensor Sync</span>
            </div>
            <div className="flex items-center gap-3">
              <span>8px Grid & Accessibility Standards</span>
              <span>•</span>
              <a
                href="https://github.com/airaware-ai/airaware-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#879d90] hover:text-white hover:underline"
              >
                GitHub Repository
              </a>
            </div>
          </footer>
        </main>
      </div>

      {/* Intelligence Drawer / Modal */}
      <NafasDrawerModal
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedRoom={selectedRoom}
        initialTab={drawerTab}
      />

      {/* Household Profile Modal */}
      <HouseholdProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
};
