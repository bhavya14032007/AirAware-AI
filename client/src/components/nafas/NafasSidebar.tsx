import React from 'react';
import { 
  LayoutDashboard, 
  UserSquare, 
  Building2, 
  Users, 
  Store, 
  Smartphone, 
  DoorClosed, 
  Cpu, 
  Sparkles,
  Bot
} from 'lucide-react';

interface NafasSidebarProps {
  activeNav: string;
  onNavClick: (item: string) => void;
  onOpenApartments: () => void;
}

export const NafasSidebar: React.FC<NafasSidebarProps> = ({ activeNav, onNavClick, onOpenApartments }) => {
  return (
    <aside className="w-56 shrink-0 flex flex-col justify-between py-2 pr-2 text-white select-none">
      <div>
        {/* Brand Logo */}
        <div className="flex items-center gap-2 mb-6 px-2 cursor-pointer" onClick={() => onNavClick('dashboard')}>
          <div className="w-7 h-7 rounded-full border border-emerald-400/50 flex items-center justify-center text-emerald-400 text-xs font-mono font-bold tracking-tighter">
            {`{n}`}
          </div>
          <span className="font-bold text-lg tracking-tight text-white">nafas</span>
        </div>

        {/* Primary Dashboard Pill Button */}
        <button
          onClick={() => onNavClick('dashboard')}
          className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-full font-semibold text-xs tracking-wide transition-all shadow-sm ${
            activeNav === 'dashboard'
              ? 'bg-[#a3e635] text-[#0f1512] shadow-[#a3e635]/20'
              : 'text-gray-300 hover:bg-[#18201c] hover:text-white'
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
        <div className="mt-6">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#5d7366] px-2 block mb-2">
            Account Management
          </span>
          <div className="space-y-1">
            <button
              onClick={() => onNavClick('account')}
              className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeNav === 'account' ? 'text-white bg-[#18201c]' : 'text-[#879d90] hover:text-white hover:bg-[#18201c]/60'
              }`}
            >
              <UserSquare className="w-3.5 h-3.5 text-[#5d7366]" />
              <span>Account</span>
            </button>

            <button
              onClick={() => onNavClick('organization')}
              className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeNav === 'organization' ? 'text-white bg-[#18201c]' : 'text-[#879d90] hover:text-white hover:bg-[#18201c]/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-[#5d7366]" />
              <span>Organization</span>
            </button>

            <button
              onClick={() => onNavClick('user')}
              className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeNav === 'user' ? 'text-white bg-[#18201c]' : 'text-[#879d90] hover:text-white hover:bg-[#18201c]/60'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-[#5d7366]" />
              <span>User</span>
            </button>
          </div>
        </div>

        {/* Section: Organization Utilities */}
        <div className="mt-5">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#5d7366] px-2 block mb-2">
            Organization Utilities
          </span>
          <div className="space-y-1">
            <button
              onClick={() => onNavClick('store')}
              className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeNav === 'store' ? 'text-white bg-[#18201c]' : 'text-[#879d90] hover:text-white hover:bg-[#18201c]/60'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-[#5d7366]" />
              <span>Store</span>
            </button>

            <button
              onClick={() => onNavClick('device')}
              className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeNav === 'device' ? 'text-white bg-[#18201c]' : 'text-[#879d90] hover:text-white hover:bg-[#18201c]/60'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-[#5d7366]" />
              <span>Device</span>
            </button>
          </div>
        </div>

        {/* Section: Store Utilities */}
        <div className="mt-5">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#5d7366] px-2 block mb-2">
            Store Utilities
          </span>
          <div className="space-y-1">
            <button
              onClick={() => onNavClick('room')}
              className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeNav === 'room' ? 'text-white bg-[#18201c]' : 'text-[#879d90] hover:text-white hover:bg-[#18201c]/60'
              }`}
            >
              <DoorClosed className="w-3.5 h-3.5 text-[#5d7366]" />
              <span>Room</span>
            </button>

            <button
              onClick={() => onNavClick('ai-advisor')}
              className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeNav === 'ai-advisor' ? 'text-white bg-[#18201c]' : 'text-[#879d90] hover:text-white hover:bg-[#18201c]/60'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-[#5d7366]" />
              <span>Device</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Apartment Card */}
      <div 
        onClick={onOpenApartments}
        className="mt-6 relative h-36 rounded-2xl overflow-hidden border border-[#232f28] shadow-md group cursor-pointer transition-transform hover:scale-[1.02]"
      >
        {/* Background Image of warm cozy interior living room */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80')`
          }}
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

        {/* Top-left CO2 badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-emerald-500/40">
          <div className="w-5 h-5 rounded-full border border-emerald-400 flex items-center justify-center text-[10px] font-bold text-emerald-400">
            79
          </div>
          <div className="text-[9px] font-bold text-white leading-tight">
            <span>CO₂</span><br />
            <span className="text-emerald-400 font-semibold">Normal</span>
          </div>
        </div>

        {/* Bottom center 'All Apartments' pill */}
        <div className="absolute bottom-2.5 inset-x-2.5 text-center">
          <button className="w-full py-1.5 px-3 rounded-full bg-[#0d1410]/90 hover:bg-[#0d1410] border border-white/10 text-[11px] font-semibold text-white tracking-wide shadow-sm transition-colors">
            All Apartments
          </button>
        </div>
      </div>
    </aside>
  );
};
