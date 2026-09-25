import React from 'react';
import { Home, Compass, MapPin, User } from 'lucide-react';

export type TabType = 'home' | 'journey' | 'stations' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    {
      id: 'home' as TabType,
      label: 'HOME',
      icon: Home
    },
    {
      id: 'journey' as TabType,
      label: 'JOURNEY',
      icon: Compass
    },
    {
      id: 'stations' as TabType,
      label: 'STATIONS',
      icon: MapPin
    },
    {
      id: 'profile' as TabType,
      label: 'PROFILE',
      icon: User
    }
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#D9E5EE] shadow-[0_-4px_16px_rgba(7,59,115,0.06)] select-none"
      aria-label="Bottom Navigation"
    >
      <div className="grid grid-cols-4 max-w-md mx-auto h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center h-full transition-all duration-150 relative ${
                isActive ? 'text-[#073B73]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {/* Active top indicator pill */}
              {isActive && (
                <span className="absolute top-0 w-8 h-1 bg-gradient-to-r from-[#073B73] to-[#008C8C] rounded-full" />
              )}
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive ? 'bg-[#DDF6F2] text-[#073B73]' : 'text-slate-400'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              </div>
              <span
                className={`text-[10px] tracking-wider mt-0.5 ${
                  isActive ? 'font-bold text-[#073B73]' : 'font-medium text-slate-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
