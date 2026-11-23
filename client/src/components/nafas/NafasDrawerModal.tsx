import React, { useState } from 'react';
import { 
  X, 
  Bot, 
  CalendarClock, 
  Home, 
  Bike, 
  GitCompare, 
  Award, 
  Users, 
  SlidersHorizontal 
} from 'lucide-react';
import { ChatWindow } from '../advisor/ChatWindow';
import { DailyRoutinePlanner } from '../routine/DailyRoutinePlanner';
import { IndoorOptimizer } from '../indoor/IndoorOptimizer';
import { LowEmissionPlanner } from '../lifestyle/LowEmissionPlanner';
import { WhatIfSimulator } from '../simulator/WhatIfSimulator';
import { ImpactTracker } from '../impact/ImpactTracker';
import { CommunityInsights } from '../community/CommunityInsights';
import { RoomData } from './NafasRoomGrid';

interface NafasDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom?: RoomData | null;
  initialTab?: string;
}

export const NafasDrawerModal: React.FC<NafasDrawerModalProps> = ({
  isOpen,
  onClose,
  selectedRoom,
  initialTab = 'indoor'
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  React.useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'indoor', label: selectedRoom ? `${selectedRoom.name} Optimizer` : 'Indoor Optimizer', icon: Home },
    { id: 'advisor', label: 'AI Smog Advisor', icon: Bot },
    { id: 'routine', label: 'Daily Routine', icon: CalendarClock },
    { id: 'simulator', label: 'What-If Simulator', icon: GitCompare },
    { id: 'lifestyle', label: 'Low-Emission Living', icon: Bike },
    { id: 'impact', label: 'Impact Tracker', icon: Award },
    { id: 'community', label: 'Community', icon: Users },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-5xl bg-[#111714] text-white rounded-[28px] border border-[#232f28] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#1f2b23] flex items-center justify-between bg-[#151e18]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#a3e635] text-[#0f1512] flex items-center justify-center font-bold">
              {selectedRoom ? selectedRoom.name.slice(-1) : 'A'}
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {selectedRoom ? `${selectedRoom.name} Environmental Intelligence & Controls` : 'AirAware AI Intelligence Suite'}
              </h3>
              <p className="text-xs text-[#718679]">
                {selectedRoom 
                  ? `Indoor PM2.5: ${selectedRoom.pm25Value} µg/m³ (${selectedRoom.pm25Category}) | CO₂: ${selectedRoom.co2Value} (${selectedRoom.co2Status})`
                  : 'GenAI Pollution Protection & Optimization Engine'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#718679] hover:text-white hover:bg-[#202c24] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#1f2b23] bg-[#131b16] overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#a3e635] text-[#0f1512] shadow-sm'
                    : 'text-[#879d90] hover:text-white hover:bg-[#1b251f]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#0f1512]">
          {activeTab === 'indoor' && <IndoorOptimizer />}
          {activeTab === 'advisor' && <ChatWindow />}
          {activeTab === 'routine' && <DailyRoutinePlanner />}
          {activeTab === 'simulator' && <WhatIfSimulator />}
          {activeTab === 'lifestyle' && <LowEmissionPlanner />}
          {activeTab === 'impact' && <ImpactTracker />}
          {activeTab === 'community' && <CommunityInsights />}
        </div>
      </div>
    </div>
  );
};
