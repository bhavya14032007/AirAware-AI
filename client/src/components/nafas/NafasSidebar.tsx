import React from 'react';
import { 
  UserSquare, 
  Building2, 
  Users, 
  Store, 
  Smartphone, 
  DoorClosed, 
  Cpu, 
  Bot,
  Layers
} from 'lucide-react';

interface NafasSidebarProps {
  activeNav: string;
  onNavClick: (item: string) => void;
  onOpenApartments: () => void;
}

export const NafasSidebar: React.FC<NafasSidebarProps> = ({ activeNav, onNavClick, onOpenApartments }) => {
  return (
    <aside className="w-full lg:w-64 shrink-0 bg-[#0D110E] border-b lg:border-b-0 lg:border-r border-[#232B26] p-4 flex flex-col justify-between lg:h-screen lg:sticky lg:top-0 select-none z-30">
      <div className="overflow-y-auto scrollbar-none space-y-6">
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-2.5 px-2 py-1 cursor-pointer group" 
          onClick={() => onNavClick('dashboard')}
        >
          <div className="w-8 h-8 rounded-lg bg-[#141916] border border-[#232B26] flex items-center justify-center text-[#A3E635] text-xs font-mono font-bold tracking-tighter group-hover:border-[#A3E635]/40 transition-colors">
            {`{n}`}
          </div>
          <div>
            <span className="font-semibold text-lg tracking-[-0.02em] text-white block leading-none">nafas</span>
            <span className="text-[10px] font-mono tabular-nums text-[#718679] leading-none">Environmental IQ</span>
          </div>
        </div>

        {/* Primary Dashboard Pill Button */}
        <button
          onClick={() => onNavClick('dashboard')}
          className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs tracking-wide transition-all ${
            activeNav === 'dashboard'
              ? 'bg-[#A3E635] text-[#0D110E] shadow-[0_0_12px_rgba(163,230,53,0.25)] font-semibold'
              : 'text-gray-400 hover:bg-[#141916] hover:text-white font-medium'
          }`}
        >
          <div className="w-4 h-4 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
              <circle cx="12" cy="7" r="2.5" />
              <circle cx="6" cy="17" r="2.5" />
              <circle cx="18" cy="17" r="2.5" />
              <path d="M12 9.5v3m-3.5 2.5 1.5-1m5.5 1-1.5-1" />
            </svg>
          </div>
          <span>Dashboard</span>
        </button>

        {/* Section: Account Management */}
        <div>
          <span className="text-[11px] uppercase font-mono font-medium tracking-wider text-[#5D7366] px-2 block mb-2">
            Account Management
          </span>
          <div className="space-y-1">
            <button
              onClick={() => onNavClick('account')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeNav === 'account' ? 'text-white bg-[#141916]' : 'text-[#879D90] hover:text-white hover:bg-[#141916]/70'
              }`}
            >
              <UserSquare className="w-4 h-4 text-[#5D7366]" />
              <span>Account</span>
            </button>

            <button
              onClick={() => onNavClick('organization')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeNav === 'organization' ? 'text-white bg-[#141916]' : 'text-[#879D90] hover:text-white hover:bg-[#141916]/70'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#5D7366]" />
              <span>Organization</span>
            </button>

            <button
              onClick={() => onNavClick('user')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeNav === 'user' ? 'text-white bg-[#141916]' : 'text-[#879D90] hover:text-white hover:bg-[#141916]/70'
              }`}
            >
              <Users className="w-4 h-4 text-[#5D7366]" />
              <span>User</span>
            </button>
          </div>
        </div>

        {/* Section: Organization Utilities */}
        <div>
          <span className="text-[11px] uppercase font-mono font-medium tracking-wider text-[#5D7366] px-2 block mb-2">
            Organization Utilities
          </span>
          <div className="space-y-1">
            <button
              onClick={() => onNavClick('store')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeNav === 'store' ? 'text-white bg-[#141916]' : 'text-[#879D90] hover:text-white hover:bg-[#141916]/70'
              }`}
            >
              <Store className="w-4 h-4 text-[#5D7366]" />
              <span>Store</span>
            </button>

            {/* Disambiguated Name: Fleet Devices */}
            <button
              onClick={() => onNavClick('fleet-devices')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeNav === 'fleet-devices' ? 'text-white bg-[#141916]' : 'text-[#879D90] hover:text-white hover:bg-[#141916]/70'
              }`}
            >
              <Smartphone className="w-4 h-4 text-[#5D7366]" />
              <span>Fleet Devices</span>
            </button>
          </div>
        </div>

        {/* Section: Store Utilities */}
        <div>
          <span className="text-[11px] uppercase font-mono font-medium tracking-wider text-[#5D7366] px-2 block mb-2">
            Store Utilities
          </span>
          <div className="space-y-1">
            <button
              onClick={() => onNavClick('room')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeNav === 'room' ? 'text-white bg-[#141916]' : 'text-[#879D90] hover:text-white hover:bg-[#141916]/70'
              }`}
            >
              <DoorClosed className="w-4 h-4 text-[#5D7366]" />
              <span>Room</span>
            </button>

            {/* Disambiguated Name: Room Nodes */}
            <button
              onClick={() => onNavClick('room-nodes')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeNav === 'room-nodes' ? 'text-white bg-[#141916]' : 'text-[#879D90] hover:text-white hover:bg-[#141916]/70'
              }`}
            >
              <Cpu className="w-4 h-4 text-[#5D7366]" />
              <span>Room Nodes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cleanly Docked Bottom Apartment Card (16px margins, inside container) */}
      <div className="pt-4 border-t border-[#232B26] mt-4">
        <div 
          onClick={onOpenApartments}
          className="relative h-32 rounded-xl overflow-hidden border border-[#232B26] group cursor-pointer transition-all hover:border-[#38463E] shadow-sm"
        >
          {/* Background Image of warm cozy interior living room */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80')`
            }}
          />
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D110E] via-[#0D110E]/60 to-transparent" />

          {/* Top-left CO2 badge */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-[#0D110E]/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-[#232B26]">
            <div className="w-4 h-4 rounded-full border border-[#10B981] flex items-center justify-center text-[9px] font-mono font-bold text-[#10B981] tabular-nums">
              79
            </div>
            <div className="text-[9px] font-medium text-white leading-tight">
              <span>CO₂</span> <span className="text-[#10B981]">Normal</span>
            </div>
          </div>

          {/* Bottom center 'All Apartments' pill */}
          <div className="absolute bottom-2.5 inset-x-2.5">
            <button className="w-full py-1.5 px-3 rounded-lg bg-[#141916]/90 hover:bg-[#18201B] border border-[#232B26] text-[11px] font-semibold text-white tracking-wide shadow-sm transition-colors flex items-center justify-center gap-1.5">
              <Layers className="w-3 h-3 text-[#A3E635]" />
              <span>All Apartments</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
