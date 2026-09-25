import React from 'react';
import {
  Home,
  Compass,
  Radio,
  MapPin,
  Ticket,
  User,
  Settings,
  HelpCircle,
  X,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { MetroLogo, SkylineMetroIllustration } from './Branding';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeScreen: string;
  onNavigate: (screen: string) => void;
  onOpenAbout: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  activeScreen,
  onNavigate,
  onOpenAbout
}) => {
  if (!isOpen) return null;

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'journey-planner', label: 'Plan Journey', icon: Compass },
    { id: 'ai-assistant', label: 'AI Journey Assistant', icon: Sparkles, badge: 'Vision' },
    { id: 'live-metro', label: 'Live Metro', icon: Radio },
    { id: 'stations', label: 'Stations', icon: MapPin },
    { id: 'station-map', label: 'Station Map', icon: MapPin },
    { id: 'ticket-info', label: 'Ticket Info', icon: Ticket },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help-support', label: 'Help & Support', icon: HelpCircle }
  ];

  return (
    <div className="fixed inset-0 z-50 flex select-none animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Body: Deep Dark Navy (#062D59) */}
      <div className="relative w-[300px] max-w-[85vw] h-full bg-[#062D59] text-white flex flex-col z-10 shadow-2xl overflow-hidden animate-in slide-in-from-left duration-200">
        {/* Top Header */}
        <div className="p-5 border-b border-white/10 bg-[#073B73]">
          <div className="flex items-center justify-between">
            <MetroLogo size="md" />
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3">
            <h2 className="text-xl font-bold tracking-tight font-heading text-white">
              SMART METRO
            </h2>
            <p className="text-xs text-[#DDF6F2]/90 mt-0.5 font-medium">
              “Smarter Travel. A Better Tomorrow.”
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeScreen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-[#073B73] text-white shadow-sm border border-white/15'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-[#008C8C] text-white' : 'bg-white/10 text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto text-[9px] font-black bg-[#F4C542] text-[#073B73] px-1.5 py-0.2 rounded-full uppercase">
                    {item.badge}
                  </span>
                )}
                {isSelected && !item.badge && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-[#22B573]" />
                )}
              </button>
            );
          })}

          {/* College Project Badge Button */}
          <div className="pt-2 border-t border-white/10 mt-3">
            <button
              onClick={() => {
                onOpenAbout();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs text-[#DDF6F2] bg-[#008C8C]/25 hover:bg-[#008C8C]/40 border border-[#008C8C]/40 transition-colors cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-[#F4C542]" />
              <div className="text-left leading-tight">
                <p className="font-semibold text-white">College Project Info</p>
                <p className="text-[10px] text-[#DDF6F2]/80">D.Y. Patil College • 2026–27</p>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Skyline & Train Graphic */}
        <div className="p-3 bg-[#073B73]/60 border-t border-white/10">
          <SkylineMetroIllustration className="h-16" />
          <div className="flex items-center justify-between text-[10px] text-white/60 mt-1 px-1">
            <span>Prototype Network (28 Stops)</span>
            <span className="text-[#22B573] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22B573] animate-pulse" />
              Demo Data
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
