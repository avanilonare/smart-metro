import React, { useState } from 'react';
import {
  Bell,
  Languages,
  Moon,
  Bookmark,
  Sliders,
  Info,
  ChevronRight,
  Check
} from 'lucide-react';

interface SettingsScreenProps {
  onOpenAbout: () => void;
  onNavigate: (screen: string) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onOpenAbout,
  onNavigate
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState<'English' | 'मराठी'>('English');
  const [theme, setTheme] = useState<'Light' | 'Dark' | 'System'>('Light');
  const [travelPref, setTravelPref] = useState<'Fastest' | 'Least Fare' | 'Less Transfers'>('Fastest');

  return (
    <div className="space-y-4 pb-24 px-4 pt-3 max-w-md mx-auto select-none">
      <div>
        <h2 className="text-xl font-bold text-[#102A43] font-heading">
          Settings
        </h2>
        <p className="text-xs text-[#61758A]">
          Manage your app preferences and transit alerts
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#D9E5EE] shadow-xs divide-y divide-slate-100 overflow-hidden">
        {/* 1. Notifications Toggle */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E7F7FA] text-[#008C8C] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#102A43] block">
                Notifications
              </span>
              <span className="text-xs text-[#61758A]">
                Headway updates & delays
              </span>
            </div>
          </div>

          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              notificationsEnabled ? 'bg-[#22B573]' : 'bg-slate-300'
            }`}
            aria-label="Toggle notifications"
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-xs ${
                notificationsEnabled ? 'left-6.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* 2. Language Selector */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#DDF6F2] text-[#073B73] flex items-center justify-center">
              <Languages className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#102A43] block">
                Language
              </span>
              <span className="text-xs text-[#61758A]">
                Station display voice & text
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['English', 'मराठी'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  language === lang
                    ? 'bg-white text-[#073B73] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Theme Selector */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F7FAFC] text-slate-700 border border-[#D9E5EE] flex items-center justify-center">
              <Moon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#102A43] block">
                Theme
              </span>
              <span className="text-xs text-[#61758A]">
                Interface contrast mode
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['Light', 'Dark', 'System'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all ${
                  theme === t
                    ? 'bg-[#073B73] text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Saved Stations Link */}
        <button
          onClick={() => onNavigate('saved-routes')}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#102A43] block">
                Saved Stations
              </span>
              <span className="text-xs text-[#61758A]">
                Manage frequently visited stops
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* 5. Travel Preferences */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E0E7FF] text-[#4338CA] flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#102A43] block">
                Travel Preferences
              </span>
              <span className="text-xs text-[#61758A]">
                Routing strategy default
              </span>
            </div>
          </div>

          <select
            value={travelPref}
            onChange={(e) => setTravelPref(e.target.value as any)}
            className="bg-slate-100 border border-[#D9E5EE] rounded-xl text-xs font-bold text-[#073B73] px-2 py-1.5 focus:outline-none"
          >
            <option value="Fastest">Fastest</option>
            <option value="Least Fare">Least Fare</option>
            <option value="Less Transfers">Less Transfers</option>
          </select>
        </div>

        {/* 6. About Smart Metro */}
        <button
          onClick={onOpenAbout}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#DDF6F2] text-[#008C8C] flex items-center justify-center">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#102A43] block">
                About Smart Metro
              </span>
              <span className="text-xs text-[#61758A]">
                College project demo & architecture
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      <div className="text-center pt-2">
        <p className="text-[11px] text-slate-400">
          Smart Metro System • Prototype Version 2.4 (2026-27)
        </p>
      </div>
    </div>
  );
};
