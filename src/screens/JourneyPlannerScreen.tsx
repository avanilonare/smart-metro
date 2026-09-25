import React, { useState } from 'react';
import { MapPin, X, ArrowDownUp, Search, Zap, Coins, GitFork, ArrowRight, Train } from 'lucide-react';
import { MetroStation } from '../data/metroData';
import { SkylineMetroIllustration } from '../components/Branding';

interface JourneyPlannerScreenProps {
  fromStation: MetroStation | null;
  toStation: MetroStation | null;
  onOpenStationSelect: (type: 'from' | 'to') => void;
  onClearStation: (type: 'from' | 'to') => void;
  onSwapStations: () => void;
  onFindRoute: (preference: 'Fastest' | 'Least Fare' | 'Less Transfers') => void;
}

export const JourneyPlannerScreen: React.FC<JourneyPlannerScreenProps> = ({
  fromStation,
  toStation,
  onOpenStationSelect,
  onClearStation,
  onSwapStations,
  onFindRoute
}) => {
  const [preference, setPreference] = useState<'Fastest' | 'Least Fare' | 'Less Transfers'>('Fastest');

  const preferences: {
    id: 'Fastest' | 'Least Fare' | 'Less Transfers';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'Fastest', label: 'Fastest', icon: Zap },
    { id: 'Least Fare', label: 'Least Fare', icon: Coins },
    { id: 'Less Transfers', label: 'Less Transfers', icon: GitFork }
  ];

  // Detect whether selected route will need an interchange
  const willInterchange = Boolean(
    fromStation &&
    toStation &&
    fromStation.name !== toStation.name &&
    fromStation.line !== toStation.line &&
    !fromStation.isInterchange &&
    !toStation.isInterchange
  );

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-between pb-20 select-none max-w-md mx-auto">
      <div className="px-4 pt-3 space-y-4">
        {/* Page Heading */}
        <div>
          <h2 className="text-2xl font-bold text-[#102A43] font-heading tracking-tight">
            Plan Your Journey
          </h2>
          <p className="text-xs text-[#61758A] mt-0.5">
            Select any station on Purple Line or Aqua Line
          </p>
        </div>

        {/* Two Large Input Cards */}
        <div className="space-y-3 relative">
          {/* FROM Input Card */}
          <div className="bg-white rounded-2xl p-3.5 border border-[#D9E5EE] shadow-xs hover:border-[#008C8C] transition-all">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#61758A] block mb-1">
              FROM
            </span>
            <div className="flex items-center justify-between">
              <div
                onClick={() => onOpenStationSelect('from')}
                role="button"
                tabIndex={0}
                className="flex items-center gap-3 flex-1 cursor-pointer min-w-0"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    fromStation
                      ? fromStation.line === 'Purple Line'
                        ? 'bg-[#7C3AED]/15 text-[#7C3AED]'
                        : 'bg-[#008C8C]/15 text-[#008C8C]'
                      : 'bg-[#E7F7FA] text-[#008C8C]'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="truncate pr-2 min-w-0">
                  <span
                    className={`text-base block truncate font-heading ${
                      fromStation ? 'font-bold text-[#102A43]' : 'text-slate-400 font-normal'
                    }`}
                  >
                    {fromStation ? fromStation.name : 'Select starting station'}
                  </span>
                  <span className="text-xs text-[#61758A] block truncate">
                    {fromStation
                      ? `${fromStation.line} · ${fromStation.nameMarathi}`
                      : 'Tap to choose origin'}
                  </span>
                </div>
              </div>

              {fromStation ? (
                <button
                  onClick={() => onClearStation('from')}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 transition-colors"
                  aria-label="Clear departure station"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => onOpenStationSelect('from')}
                  className="text-xs font-bold text-[#008C8C] px-2 py-1 rounded-lg bg-[#E7F7FA]"
                >
                  Select
                </button>
              )}
            </div>
          </div>

          {/* Swap Trigger Floating Button */}
          <div className="flex justify-end pr-6 -my-2 relative z-10">
            <button
              onClick={onSwapStations}
              className="w-9 h-9 rounded-full bg-white border border-[#D9E5EE] shadow-sm hover:bg-slate-50 active:scale-90 flex items-center justify-center text-[#073B73] transition-all"
              aria-label="Swap origin and destination"
            >
              <ArrowDownUp className="w-4 h-4" />
            </button>
          </div>

          {/* TO Input Card */}
          <div className="bg-white rounded-2xl p-3.5 border border-[#D9E5EE] shadow-xs hover:border-[#22B573] transition-all">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#61758A] block mb-1">
              TO
            </span>
            <div className="flex items-center justify-between">
              <div
                onClick={() => onOpenStationSelect('to')}
                role="button"
                tabIndex={0}
                className="flex items-center gap-3 flex-1 cursor-pointer min-w-0"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    toStation
                      ? toStation.line === 'Purple Line'
                        ? 'bg-[#7C3AED]/15 text-[#7C3AED]'
                        : 'bg-[#008C8C]/15 text-[#008C8C]'
                      : 'bg-[#DDF6F2] text-[#22B573]'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="truncate pr-2 min-w-0">
                  <span
                    className={`text-base block truncate font-heading ${
                      toStation ? 'font-bold text-[#102A43]' : 'text-slate-400 font-normal'
                    }`}
                  >
                    {toStation ? toStation.name : 'Select destination station'}
                  </span>
                  <span className="text-xs text-[#61758A] block truncate">
                    {toStation
                      ? `${toStation.line} · ${toStation.nameMarathi}`
                      : 'Tap to choose destination'}
                  </span>
                </div>
              </div>

              {toStation ? (
                <button
                  onClick={() => onClearStation('to')}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 transition-colors"
                  aria-label="Clear destination station"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => onOpenStationSelect('to')}
                  className="text-xs font-bold text-[#008C8C] px-2 py-1 rounded-lg bg-[#E7F7FA]"
                >
                  Select
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Interchange Alert Preview if crossing lines */}
        {willInterchange && (
          <div className="p-3 bg-[#FFFDF7] border border-[#F4C542]/50 rounded-xl flex items-center gap-2.5 text-xs text-[#073B73]">
            <Train className="w-4 h-4 text-[#073B73] shrink-0" />
            <span>
              <strong>Interchange Route:</strong> Change from {fromStation?.line} to{' '}
              {toStation?.line} at <strong>District Court Pune</strong>.
            </span>
          </div>
        )}

        {/* Travel Preference Section */}
        <div className="pt-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#61758A] mb-2">
            Travel Preference
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {preferences.map((item) => {
              const isSelected = preference === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => setPreference(item.id)}
                  className={`py-3 px-2 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-[#073B73] text-white shadow-md shadow-[#073B73]/20 border border-[#073B73]'
                      : 'bg-white text-[#102A43] border border-[#D9E5EE] hover:bg-slate-50'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isSelected ? 'text-[#F4C542]' : 'text-[#61758A]'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Find Route Button */}
        <button
          onClick={() => onFindRoute(preference)}
          disabled={!fromStation || !toStation}
          className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all ${
            fromStation && toStation
              ? 'bg-[#073B73] hover:bg-[#062D59] text-white active:scale-98 shadow-[#073B73]/20 cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Search className="w-4 h-4" />
          {fromStation && toStation ? 'Find Route' : 'Please select origin & destination'}
        </button>
      </div>

      {/* Bottom Illustration Section */}
      <div className="pt-4">
        <SkylineMetroIllustration className="h-28" />
        <div className="text-center py-2 text-xs font-bold text-[#073B73] tracking-wider uppercase">
          Fast • Safe • Convenient
        </div>
      </div>
    </div>
  );
};
