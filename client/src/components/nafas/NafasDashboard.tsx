import React, { useState } from 'react';
import { NafasSidebar } from './NafasSidebar';
import { NafasTopBar } from './NafasTopBar';
import { NafasMetricsRow } from './NafasMetricsRow';
import { NafasChart } from './NafasChart';
import { NafasTelemetrySection, DeviceNode } from './NafasTelemetrySection';
import { NafasAnalyticsSection } from './NafasAnalyticsSection';
import { NafasEventLog } from './NafasEventLog';
import { NafasDrawerModal } from './NafasDrawerModal';
import { HouseholdProfileModal } from '../profile/HouseholdProfileModal';
import { useEnvironmental } from '../../context/EnvironmentalContext';
import { Github, ExternalLink, Leaf, MapPin } from 'lucide-react';

export const NafasDashboard: React.FC = () => {
  const { airQuality, location } = useEnvironmental();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<{ id: string; name: string; pm25Value: number; pm25Category: string; co2Value: number; co2Status: string } | null>(null);
  const [drawerTab, setDrawerTab] = useState('indoor');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleNavClick = (navItem: string) => {
    setActiveNav(navItem);
    if (navItem === 'dashboard') {
      setIsDrawerOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (navItem === 'ai-advisor') {
      setDrawerTab('advisor');
      setIsDrawerOpen(true);
    } else if (navItem === 'room' || navItem === 'room-nodes') {
      setDrawerTab('indoor');
      setIsDrawerOpen(true);
    } else if (navItem === 'account' || navItem === 'user') {
      setIsProfileOpen(true);
    } else {
      setDrawerTab('routine');
      setIsDrawerOpen(true);
    }
  };

  const handleRoomSelect = (room: DeviceNode) => {
    setSelectedRoom({
      id: room.id,
      name: `${room.roomNumber} (${room.roomTitle})`,
      pm25Value: room.pm25,
      pm25Category: room.pm25Category,
      co2Value: room.co2,
      co2Status: room.co2Status
    });
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
    <div className="min-h-screen w-full bg-[#0D110E] text-white flex flex-col lg:flex-row font-sans antialiased selection:bg-[#A3E635] selection:text-[#0D110E]">
      {/* Fixed Full-Height Left Sidebar */}
      <NafasSidebar
        activeNav={activeNav}
        onNavClick={handleNavClick}
        onOpenApartments={handleApartmentsClick}
      />

      {/* Main Full-Width Scrollable Content */}
      <div className="flex-1 min-w-0 bg-[#0D110E] flex flex-col justify-between">
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Top Bar with Breadcrumbs & Theme/User Controls */}
          <NafasTopBar
            onProfileClick={() => setIsProfileOpen(true)}
            onBackClick={() => handleNavClick('dashboard')}
          />

          {/* Page Title & Location Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Floor Overview
              </h1>
              <div className="flex items-center gap-2 mt-1 text-xs text-[#718679]">
                <MapPin className="w-3.5 h-3.5 text-[#A3E635]" />
                <span>Monitoring Station: <strong className="text-white font-medium">{location.city || 'Connaught Place, New Delhi'}</strong></span>
                <span>•</span>
                <span className="text-[#10B981] font-semibold">Live Mesh Synced</span>
              </div>
            </div>

            {/* Public GitHub Repository Link Badge */}
            <a
              href="https://github.com/airaware-ai/airaware-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141916] border border-[#232B26] text-xs font-semibold text-[#879D90] hover:text-white hover:border-[#38463E] transition-all self-start sm:self-auto shadow-sm"
              title="View Public GitHub Repository"
            >
              <Github className="w-3.5 h-3.5 text-white" />
              <span>airaware-ai</span>
              <ExternalLink className="w-3 h-3 text-[#5E7467]" />
            </a>
          </div>

          {/* 1. Top 3 Metric Cards Row (Translucent Tinted Badges + Tabular Numerals) */}
          <NafasMetricsRow
            currentIndoorPM25={12}
            averageIndoorPM25={12}
            averageOutdoorPM25={outdoorPM25}
            powerConsumptionKWh={151.27}
            onDetailsClick={handlePowerDetails}
          />

          {/* 2. Main Line Chart (Sleek Dark #141916 Surface, Neon Lime & Violet Lines, Uniform Ticks) */}
          <NafasChart />

          {/* 3. Promoted Multi-Zone Sensor Mesh & Room Telemetry (Eliminates redundant duplicate list) */}
          <NafasTelemetrySection onRoomSelect={handleRoomSelect} />

          {/* 4. GenAI Smog Inversion Briefing & Efficiency Analytics */}
          <NafasAnalyticsSection
            onOpenAdvisor={() => {
              setDrawerTab('advisor');
              setIsDrawerOpen(true);
            }}
            onOpenSimulator={() => {
              setDrawerTab('simulator');
              setIsDrawerOpen(true);
            }}
          />

          {/* 5. Building Incident & Air Quality Event Audit Log */}
          <NafasEventLog />
        </main>

        {/* Full-Width Website Footer */}
        <footer className="w-full border-t border-[#232B26] bg-[#0D110E] py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#5E7467]">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-[#10B981]/10 border border-[#10B981]/25 flex items-center justify-center text-[#10B981]">
                <Leaf className="w-3.5 h-3.5" />
              </div>
              <span className="text-gray-300 font-medium">AirAware AI & Copernicus Atmosphere (CAMS) Sensor Sync</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[#718679]">
              <span>8px Grid & WCAG 2.1 AA Compliant</span>
              <span>•</span>
              <span>WHO 2021 Global Air Targets (15 µg/m³ 24h)</span>
              <span>•</span>
              <a
                href="https://github.com/airaware-ai/airaware-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A3E635] hover:underline font-semibold"
              >
                GitHub Repository
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Intelligence Suite Drawer Modal */}
      <NafasDrawerModal
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedRoom={selectedRoom ? {
          id: selectedRoom.id,
          name: selectedRoom.name,
          deviceCount: 16,
          pm25Value: selectedRoom.pm25Value,
          pm25Category: selectedRoom.pm25Category,
          pm25RingColor: '#10B981',
          co2Value: selectedRoom.co2Value,
          co2Status: selectedRoom.co2Status,
          co2RingColor: '#10B981'
        } : null}
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
