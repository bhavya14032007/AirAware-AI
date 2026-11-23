import React from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  CalendarClock, 
  Home, 
  Bike, 
  GitCompare, 
  Award, 
  Users 
} from 'lucide-react';

export type NavTab = 
  | 'dashboard'
  | 'advisor'
  | 'routine'
  | 'indoor'
  | 'lifestyle'
  | 'simulator'
  | 'impact'
  | 'community';

interface NavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'advisor', label: 'AI Smog Advisor', icon: Bot },
    { id: 'routine', label: 'Daily Routine', icon: CalendarClock },
    { id: 'indoor', label: 'Indoor Optimizer', icon: Home },
    { id: 'lifestyle', label: 'Low-Emission Living', icon: Bike },
    { id: 'simulator', label: 'What-If Simulator', icon: GitCompare },
    { id: 'impact', label: 'Impact Tracker', icon: Award },
    { id: 'community', label: 'Community', icon: Users },
  ];

  return (
    <nav 
      className="w-full border-b border-[var(--border-main)] bg-[var(--bg-card)] transition-colors overflow-x-auto scrollbar-none"
      aria-label="Main Application Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
