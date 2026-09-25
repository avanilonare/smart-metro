import React, { useState } from 'react';
import { Search, MapPin, Train, ChevronRight, Filter, Accessibility } from 'lucide-react';
import {
  STATIONS,
  PURPLE_LINE_STATIONS,
  AQUA_LINE_STATIONS,
  MetroStation
} from '../data/metroData';

interface StationsListScreenProps {
  onSelectStation: (station: MetroStation) => void;
  onOpenMap: () => void;
}

export const StationsListScreen: React.FC<StationsListScreenProps> = ({
  onSelectStation,
  onOpenMap
}) => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Purple Line' | 'Aqua Line' | 'Interchange'>('All');

  const filtered = STATIONS.filter((s) => {
    const matchesQuery =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.nameMarathi.includes(search) ||
      s.popularNearby.some((p) => p.toLowerCase().includes(search.toLowerCase()));

    if (filterType === 'Interchange') {
      return matchesQuery && s.isInterchange;
    }
    if (filterType === 'Purple Line') {
      return matchesQuery && s.line === 'Purple Line';
    }
    if (filterType === 'Aqua Line') {
      return matchesQuery && s.line === 'Aqua Line';
    }
    return matchesQuery;
  });

  return (
    <div className="space-y-4 pb-24 px-4 pt-3 max-w-md mx-auto select-none">
      {/* Title & Full Map Switch */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#102A43] font-heading">
            Metro Stations
          </h2>
          <p className="text-xs text-[#61758A]">
            Complete network ({STATIONS.length} stations across Purple & Aqua lines)
          </p>
        </div>

        <button
          onClick={onOpenMap}
          className="px-3 py-1.5 rounded-xl bg-[#E7F7FA] text-[#073B73] border border-[#008C8C]/30 text-xs font-bold hover:bg-[#DDF6F2] transition-colors"
        >
          View Map
        </button>
      </div>

      {/* Search Input */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search station or nearby landmark..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D9E5EE] rounded-xl text-xs text-[#102A43] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#008C8C] shadow-2xs"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {(['All', 'Purple Line', 'Aqua Line', 'Interchange'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterType(tab)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
              filterType === tab
                ? 'bg-[#073B73] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-[#D9E5EE] hover:bg-slate-50'
            }`}
          >
            {tab === 'All' ? `All (${STATIONS.length})` : tab}
          </button>
        ))}
      </div>

      {/* Stations List */}
      <div className="space-y-2.5">
        {filtered.map((station) => {
          const isPurple = station.line === 'Purple Line';

          return (
            <div
              key={`${station.line}-${station.id}`}
              onClick={() => onSelectStation(station)}
              role="button"
              tabIndex={0}
              className="p-3.5 bg-white rounded-2xl border border-[#D9E5EE] hover:border-[#008C8C] active:scale-[0.99] transition-all cursor-pointer shadow-2xs group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      station.isInterchange
                        ? 'bg-[#F4C542]/20 text-[#073B73]'
                        : isPurple
                        ? 'bg-[#7C3AED]/15 text-[#7C3AED]'
                        : 'bg-[#008C8C]/15 text-[#008C8C]'
                    }`}
                  >
                    {station.isInterchange ? (
                      <Train className="w-5 h-5 text-[#073B73]" />
                    ) : (
                      <MapPin className="w-5 h-5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#102A43] font-heading group-hover:text-[#073B73] transition-colors truncate">
                        {station.name}
                      </h3>
                      <span className="text-xs text-[#61758A] shrink-0">({station.nameMarathi})</span>
                    </div>
                    <p className="text-[11px] text-[#61758A] mt-0.5 truncate max-w-[210px]">
                      Near {station.popularNearby.slice(0, 2).join(', ')}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 ml-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full block ${
                      station.isInterchange
                        ? 'bg-[#F4C542] text-[#073B73] font-black'
                        : isPurple
                        ? 'bg-[#7C3AED]/15 text-[#7C3AED]'
                        : 'bg-[#008C8C]/15 text-[#008C8C]'
                    }`}
                  >
                    {station.isInterchange ? 'Interchange' : station.line}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Next: {station.nextTrains[0]?.etaMinutes || 4}m
                  </span>
                </div>
              </div>

              {/* Facilities Bar */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <div className="flex items-center gap-2">
                  <span>🛗 Lift</span>
                  <span>⚡ Escalator</span>
                  <span>🚻 Restroom</span>
                  <span>📶 Wi-Fi</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
