import React, { useState } from 'react';
import {
  MapPin,
  ChevronRight,
  Clock,
  Navigation,
  Compass,
  Building,
  CheckCircle2,
  Accessibility,
  ArrowRight,
  Info,
  Train,
  GitFork
} from 'lucide-react';
import { MetroStation } from '../data/metroData';

interface StationDetailsScreenProps {
  station: MetroStation;
  onOpenMap: () => void;
  onPlanFromStation: (station: MetroStation) => void;
}

export const StationDetailsScreen: React.FC<StationDetailsScreenProps> = ({
  station,
  onOpenMap,
  onPlanFromStation
}) => {
  const [activeTab, setActiveTab] = useState<'Facilities' | 'Timings' | 'Map' | 'Nearby'>('Facilities');
  const [imgFailed, setImgFailed] = useState(false);

  const isPurple = station.line === 'Purple Line';

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto select-none">
      {/* Hero Section with Metro Station Image & Overlay */}
      <div className="relative w-full h-48 bg-[#073B73] overflow-hidden">
        {!imgFailed ? (
          <img
            src="/src/assets/images/metro_station_hero_1790192753213.jpg"
            alt={`${station.name} Metro Station Platform`}
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover object-center opacity-75 transition-opacity"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[#062D59] via-[#073B73] to-[#008C8C] p-4">
            <Train className="w-16 h-16 text-white/30 animate-pulse" />
          </div>
        )}

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#062D59] via-[#062D59]/50 to-transparent" />

        {/* Station Name Overlay */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <div className="flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <span className="text-xs font-semibold text-[#F4C542] tracking-wider uppercase">
                Station Overview
              </span>
              <h2 className="text-2xl font-extrabold font-heading text-white tracking-tight truncate">
                {station.name}
              </h2>
              <span className="text-xs text-[#DDF6F2] font-medium block truncate">
                {station.nameMarathi} · Pune Metro Corridor
              </span>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-white text-xs font-bold shadow-md shrink-0 ${
                station.isInterchange
                  ? 'bg-[#F4C542] text-[#073B73] font-black'
                  : isPurple
                  ? 'bg-[#7C3AED]'
                  : 'bg-[#008C8C]'
              }`}
            >
              {station.isInterchange ? 'Interchange Hub' : station.line}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Four Circular Quick-Action Buttons */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          {[
            { id: 'Facilities' as const, label: 'Facilities', icon: Accessibility },
            { id: 'Timings' as const, label: 'Timings', icon: Clock },
            { id: 'Map' as const, label: 'Map', icon: Navigation },
            { id: 'Nearby' as const, label: 'Nearby', icon: Building }
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === 'Map') onOpenMap();
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all active:scale-95 group"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-xs ${
                    isSelected
                      ? 'bg-[#073B73] text-white ring-4 ring-[#DDF6F2]'
                      : 'bg-white border border-[#D9E5EE] text-[#073B73] group-hover:bg-[#E7F7FA]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-[11px] font-semibold ${
                    isSelected ? 'text-[#073B73] font-bold' : 'text-[#61758A]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Next Trains Section */}
        <div>
          <h3 className="text-sm font-bold text-[#102A43] font-heading mb-2.5">
            Next Trains
          </h3>
          <div className="space-y-2">
            {station.nextTrains.map((train, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-3.5 border border-[#D9E5EE] shadow-xs flex items-center justify-between hover:border-[#008C8C] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      idx === 0
                        ? 'bg-[#DDF6F2] text-[#008C8C]'
                        : 'bg-[#E7F7FA] text-[#073B73]'
                    }`}
                  >
                    <Train className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#102A43] font-heading">
                        Towards {train.destination}
                      </span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                        {train.platform}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#61758A]">
                      Scheduled prototype departure
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-base font-extrabold font-heading ${
                      idx === 0 ? 'text-[#22B573]' : 'text-[#073B73]'
                    }`}
                  >
                    {train.etaMinutes} min
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Station Facilities Section */}
        <div>
          <h3 className="text-sm font-bold text-[#102A43] font-heading mb-2.5">
            Station Facilities
          </h3>

          <div className="grid grid-cols-4 gap-2">
            {[
              { name: 'Lift', icon: '🛗' },
              { name: 'Escalator', icon: '⚡' },
              { name: 'Washroom', icon: '🚻' },
              { name: 'Wi-Fi', icon: '📶' }
            ].map((fac) => (
              <div
                key={fac.name}
                className="bg-white p-3 rounded-2xl border border-[#D9E5EE] flex flex-col items-center justify-center text-center shadow-2xs hover:border-[#008C8C] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#E7F7FA] flex items-center justify-center text-base mb-1.5 shadow-inner">
                  {fac.icon}
                </div>
                <span className="text-xs font-bold text-[#102A43]">
                  {fac.name}
                </span>
                <span className="text-[10px] text-[#22B573] font-semibold flex items-center gap-0.5 mt-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Descriptive Information Card */}
        <div className="p-3.5 bg-[#E7F7FA] rounded-2xl border border-[#D9E5EE] flex items-start gap-3">
          <Info className="w-5 h-5 text-[#073B73] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-[#073B73] leading-relaxed">
              “{station.description || 'A well-connected station in the heart of Pune.'}”
            </p>
            <p className="text-[11px] text-[#61758A] mt-1">
              Gates: {station.gates?.map((g) => `${g.number} (${g.name})`).join(' • ')}
            </p>
          </div>
        </div>

        {/* Plan Journey from this station CTA */}
        <button
          onClick={() => onPlanFromStation(station)}
          className="w-full py-3 px-4 bg-[#073B73] hover:bg-[#062D59] text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
        >
          <Compass className="w-4 h-4 text-[#F4C542]" />
          Plan Journey From {station.name}
        </button>
      </div>
    </div>
  );
};
