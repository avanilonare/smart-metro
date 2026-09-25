import React from 'react';
import {
  MapPin,
  ArrowDownUp,
  Search,
  Compass,
  Train,
  Ticket,
  Radio,
  Sparkles,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { MetroStation, STATIONS } from '../data/metroData';
import { MetroStatusCard } from '../components/MetroStatusCard';

interface HomeScreenProps {
  fromStation: MetroStation | null;
  toStation: MetroStation | null;
  onOpenStationSelect: (type: 'from' | 'to') => void;
  onSwapStations: () => void;
  onFindRoute: () => void;
  onNavigate: (screen: string) => void;
  onSelectStationDetails: (station: MetroStation) => void;
  onOpenAiAssistant: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  fromStation,
  toStation,
  onOpenStationSelect,
  onSwapStations,
  onFindRoute,
  onNavigate,
  onSelectStationDetails,
  onOpenAiAssistant
}) => {
  // Key representative popular stations from both lines
  const popularStationNames = ['PCMC', 'District Court Pune', 'Ramwadi', 'Swargate'];
  const popularStations = popularStationNames
    .map((name) => STATIONS.find((s) => s.name === name))
    .filter(Boolean) as MetroStation[];

  const isFindRouteReady = Boolean(fromStation && toStation);

  return (
    <div className="space-y-4 pb-24 px-4 pt-3 max-w-md mx-auto select-none">
      {/* Search Header Banner */}
      <div>
        <h2 className="text-2xl font-bold text-[#102A43] tracking-tight font-heading">
          Where are you going?
        </h2>
        <p className="text-xs text-[#61758A] mt-0.5">
          Plan your journey with ease across Purple & Aqua lines
        </p>
      </div>

      {/* Journey Search Card - Initially Empty with Placeholders */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#D9E5EE] relative">
        <div className="space-y-2.5 relative">
          {/* FROM Field */}
          <div
            onClick={() => onOpenStationSelect('from')}
            role="button"
            tabIndex={0}
            className={`w-full border rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] ${
              fromStation
                ? 'bg-[#F7FAFC] border-[#073B73]/30'
                : 'bg-[#F7FAFC] hover:bg-[#E7F7FA]/60 border-[#D9E5EE]'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  fromStation
                    ? fromStation.line === 'Purple Line'
                      ? 'bg-[#7C3AED]/15 text-[#7C3AED]'
                      : 'bg-[#008C8C]/15 text-[#008C8C]'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#61758A] block">
                  FROM
                </span>
                <span
                  className={`text-sm block truncate max-w-[210px] ${
                    fromStation
                      ? 'font-bold text-[#102A43]'
                      : 'font-normal text-slate-400'
                  }`}
                >
                  {fromStation ? fromStation.name : 'Select starting station'}
                </span>
              </div>
            </div>

            {fromStation ? (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ml-1 ${
                  fromStation.line === 'Purple Line'
                    ? 'bg-[#7C3AED]/15 text-[#7C3AED]'
                    : 'bg-[#008C8C]/15 text-[#008C8C]'
                }`}
              >
                {fromStation.isInterchange ? 'Interchange' : fromStation.line}
              </span>
            ) : (
              <span className="text-[11px] font-medium text-[#008C8C] shrink-0">
                Choose
              </span>
            )}
          </div>

          {/* Swap Button Floating in Between */}
          <div className="flex justify-end pr-6 -my-2 relative z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSwapStations();
              }}
              className="w-8 h-8 rounded-full bg-white border border-[#D9E5EE] shadow-sm hover:bg-slate-50 active:rotate-180 flex items-center justify-center text-[#073B73] transition-all"
              aria-label="Swap starting and destination stations"
            >
              <ArrowDownUp className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* TO Field */}
          <div
            onClick={() => onOpenStationSelect('to')}
            role="button"
            tabIndex={0}
            className={`w-full border rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] ${
              toStation
                ? 'bg-[#F7FAFC] border-[#22B573]/40'
                : 'bg-[#F7FAFC] hover:bg-[#E7F7FA]/60 border-[#D9E5EE]'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  toStation
                    ? toStation.line === 'Purple Line'
                      ? 'bg-[#7C3AED]/15 text-[#7C3AED]'
                      : 'bg-[#008C8C]/15 text-[#008C8C]'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#61758A] block">
                  TO
                </span>
                <span
                  className={`text-sm block truncate max-w-[210px] ${
                    toStation
                      ? 'font-bold text-[#102A43]'
                      : 'font-normal text-slate-400'
                  }`}
                >
                  {toStation ? toStation.name : 'Select destination station'}
                </span>
              </div>
            </div>

            {toStation ? (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ml-1 ${
                  toStation.line === 'Purple Line'
                    ? 'bg-[#7C3AED]/15 text-[#7C3AED]'
                    : 'bg-[#008C8C]/15 text-[#008C8C]'
                }`}
              >
                {toStation.isInterchange ? 'Interchange' : toStation.line}
              </span>
            ) : (
              <span className="text-[11px] font-medium text-[#008C8C] shrink-0">
                Choose
              </span>
            )}
          </div>
        </div>

        {/* Primary Find Route Button */}
        <button
          onClick={() => {
            if (!fromStation) {
              onOpenStationSelect('from');
            } else if (!toStation) {
              onOpenStationSelect('to');
            } else {
              onFindRoute();
            }
          }}
          className={`w-full mt-3.5 py-3 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all ${
            isFindRouteReady
              ? 'bg-[#073B73] hover:bg-[#062D59] text-white active:scale-[0.98] shadow-[#073B73]/20 cursor-pointer'
              : 'bg-[#073B73]/80 hover:bg-[#073B73] text-white cursor-pointer'
          }`}
        >
          <Search className="w-4 h-4" />
          {isFindRouteReady ? 'Find Route' : 'Select Stations to Plan Route'}
        </button>
      </div>

      {/* AI Journey Assistant - Futuristic Prototype Banner */}
      <div
        onClick={onOpenAiAssistant}
        role="button"
        tabIndex={0}
        className="w-full bg-gradient-to-r from-[#073B73] via-[#062D59] to-[#008C8C] p-3.5 rounded-2xl text-white shadow-sm border border-[#008C8C]/30 flex items-center justify-between cursor-pointer hover:shadow-md transition-all active:scale-[0.99] group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-[#F4C542] shrink-0 group-hover:rotate-12 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-wide font-heading">
                AI Journey Assistant
              </span>
              <span className="text-[9px] bg-[#F4C542] text-[#073B73] font-black px-1.5 py-0.2 rounded-full uppercase">
                Vision
              </span>
            </div>
            <p className="text-[11px] text-[#DDF6F2] mt-0.5">
              Smart route generator & interchange guidance
            </p>
          </div>
        </div>

        <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-white group-hover:translate-x-0.5 transition-transform">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Quick Actions (4 rounded cards) */}
      <div>
        <h3 className="text-sm font-bold text-[#102A43] font-heading mb-2.5">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          {/* 1. Plan Journey */}
          <button
            onClick={() => onNavigate('journey-planner')}
            className="p-3.5 rounded-2xl bg-white border border-[#D9E5EE] shadow-xs hover:shadow-sm hover:border-[#008C8C]/50 active:scale-98 text-left transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#DDF6F2] text-[#008C8C] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#102A43] font-heading leading-tight">
              Plan Journey
            </h4>
            <p className="text-[11px] text-[#61758A] mt-0.5">
              Routes & Interchanges
            </p>
          </button>

          {/* 2. Stations */}
          <button
            onClick={() => onNavigate('stations')}
            className="p-3.5 rounded-2xl bg-white border border-[#D9E5EE] shadow-xs hover:shadow-sm hover:border-[#008C8C]/50 active:scale-98 text-left transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E7F7FA] text-[#073B73] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Train className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#102A43] font-heading leading-tight">
              Stations
            </h4>
            <p className="text-[11px] text-[#61758A] mt-0.5">
              28 stops & facilities
            </p>
          </button>

          {/* 3. Ticket Info */}
          <button
            onClick={() => onNavigate('ticket-info')}
            className="p-3.5 rounded-2xl bg-white border border-[#D9E5EE] shadow-xs hover:shadow-sm hover:border-[#008C8C]/50 active:scale-98 text-left transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E0E7FF] text-[#4338CA] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Ticket className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#102A43] font-heading leading-tight">
              Ticket Info
            </h4>
            <p className="text-[11px] text-[#61758A] mt-0.5">
              Distance-based slabs
            </p>
          </button>

          {/* 4. Live Metro */}
          <button
            onClick={() => onNavigate('live-metro')}
            className="p-3.5 rounded-2xl bg-white border border-[#D9E5EE] shadow-xs hover:shadow-sm hover:border-[#22B573]/50 active:scale-98 text-left transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#22B573]/15 text-[#22B573] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Radio className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-[#102A43] font-heading leading-tight">
              Live Metro
            </h4>
            <p className="text-[11px] text-[#61758A] mt-0.5">
              Live schedule & ETA
            </p>
          </button>
        </div>
      </div>

      {/* Metro Status Card */}
      <div>
        <MetroStatusCard onClick={() => onNavigate('live-metro')} />
      </div>

      {/* Key Interchange & Popular Stations */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-sm font-bold text-[#102A43] font-heading">
            Key Stations & Junctions
          </h3>
          <button
            onClick={() => onNavigate('stations')}
            className="text-xs font-semibold text-[#008C8C] hover:underline flex items-center"
          >
            View all ({STATIONS.length}) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {popularStations.map((station) => (
            <button
              key={station.id}
              onClick={() => onSelectStationDetails(station)}
              className="p-3 rounded-xl bg-white border border-[#D9E5EE] shadow-2xs hover:border-[#073B73] active:scale-95 text-left transition-all group flex items-center gap-2.5"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  station.isInterchange
                    ? 'bg-[#F4C542]/20 text-[#073B73]'
                    : station.line === 'Purple Line'
                    ? 'bg-[#7C3AED]/15 text-[#7C3AED]'
                    : 'bg-[#008C8C]/15 text-[#008C8C]'
                }`}
              >
                {station.isInterchange ? (
                  <Train className="w-4 h-4 text-[#073B73]" />
                ) : (
                  <MapPin className="w-4 h-4" />
                )}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#102A43] block truncate font-heading">
                  {station.name}
                </span>
                <span className="text-[10px] text-[#61758A] block truncate">
                  {station.isInterchange ? 'Interchange Hub' : station.line}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
