import React, { useState, useMemo } from 'react';
import { Search, MapPin, X, Check, Train, ArrowRight } from 'lucide-react';
import {
  STATIONS,
  PURPLE_LINE_STATIONS,
  AQUA_LINE_STATIONS,
  MetroStation
} from '../data/metroData';

interface StationSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  selectedStationId?: string;
  onSelectStation: (station: MetroStation) => void;
}

export const StationSelectModal: React.FC<StationSelectModalProps> = ({
  isOpen,
  onClose,
  title = 'Select Station',
  selectedStationId,
  onSelectStation
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLineFilter, setActiveLineFilter] = useState<'All' | 'Purple Line' | 'Aqua Line'>('All');

  // Filter stations based on search query and active line filter
  const filteredStations = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    let list: MetroStation[] = STATIONS;
    if (activeLineFilter === 'Purple Line') {
      list = PURPLE_LINE_STATIONS;
    } else if (activeLineFilter === 'Aqua Line') {
      list = AQUA_LINE_STATIONS;
    }

    if (!q) return list;

    return list.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.nameMarathi.includes(q) ||
        s.popularNearby.some((p) => p.toLowerCase().includes(q))
    );
  }, [searchQuery, activeLineFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center select-none animate-in fade-in duration-150">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 max-h-[88vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Handle bar on mobile */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 mb-1 sm:hidden" />

        {/* Modal Header */}
        <div className="px-5 py-3 border-b border-[#D9E5EE] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#102A43] font-heading">{title}</h2>
            <p className="text-xs text-[#61758A]">
              Choose from 28 stations across Purple & Aqua Lines
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Field */}
        <div className="px-5 py-3 bg-[#F7FAFC] border-b border-[#D9E5EE] space-y-2.5">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search station (e.g. Swargate, Ramwadi, PCMC)..."
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#D9E5EE] rounded-xl text-xs text-[#102A43] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#008C8C] transition-all"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Line Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
            <button
              onClick={() => setActiveLineFilter('All')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                activeLineFilter === 'All'
                  ? 'bg-[#073B73] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-[#D9E5EE] hover:bg-slate-50'
              }`}
            >
              All Lines (28)
            </button>
            <button
              onClick={() => setActiveLineFilter('Purple Line')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                activeLineFilter === 'Purple Line'
                  ? 'bg-[#7C3AED] text-white shadow-xs'
                  : 'bg-white text-[#7C3AED] border border-[#7C3AED]/30 hover:bg-[#7C3AED]/5'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              Purple Line (13)
            </button>
            <button
              onClick={() => setActiveLineFilter('Aqua Line')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                activeLineFilter === 'Aqua Line'
                  ? 'bg-[#008C8C] text-white shadow-xs'
                  : 'bg-white text-[#008C8C] border border-[#008C8C]/30 hover:bg-[#008C8C]/5'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#008C8C]" />
              Aqua Line (15)
            </button>
          </div>
        </div>

        {/* Stations List */}
        <div className="flex-1 overflow-y-auto px-4 py-2 divide-y divide-slate-100">
          {filteredStations.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-medium">No stations found matching &quot;{searchQuery}&quot;</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for PCMC, District Court, Swargate, or Ramwadi
              </p>
            </div>
          ) : (
            filteredStations.map((station) => {
              const isSelected = station.id === selectedStationId;
              const isPurple = station.line === 'Purple Line';

              return (
                <button
                  key={`${station.line}-${station.id}`}
                  onClick={() => {
                    onSelectStation(station);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between py-3 px-2 rounded-xl text-left transition-all ${
                    isSelected ? 'bg-[#DDF6F2]/80 text-[#073B73]' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        station.isInterchange
                          ? 'bg-[#F4C542]/20 text-[#073B73] border border-[#F4C542]/50'
                          : isPurple
                          ? 'bg-[#7C3AED]/15 text-[#7C3AED] border border-[#7C3AED]/20'
                          : 'bg-[#008C8C]/15 text-[#008C8C] border border-[#008C8C]/20'
                      }`}
                    >
                      {station.isInterchange ? (
                        <Train className="w-5 h-5 text-[#073B73]" />
                      ) : (
                        <MapPin className="w-5 h-5" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm font-bold text-[#102A43] truncate font-heading">
                          {station.name}
                        </span>
                        <span className="text-[11px] text-[#61758A]">({station.nameMarathi})</span>
                      </div>
                      <p className="text-[11px] text-[#61758A] truncate max-w-[210px]">
                        Near {station.popularNearby.slice(0, 2).join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        station.isInterchange
                          ? 'bg-[#F4C542] text-[#073B73] font-black'
                          : isPurple
                          ? 'bg-[#7C3AED]/15 text-[#7C3AED]'
                          : 'bg-[#008C8C]/15 text-[#008C8C]'
                      }`}
                    >
                      {station.isInterchange ? 'Interchange' : station.line}
                    </span>
                    {isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-[#073B73] text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-300" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info note */}
        <div className="px-5 py-2.5 bg-[#F7FAFC] border-t border-[#D9E5EE] text-center text-[11px] text-[#61758A]">
          Interchange hub at <strong className="text-[#073B73]">District Court Pune</strong> connects Purple Line (PCMC ↔ Swargate) and Aqua Line (Vanaz ↔ Ramwadi)
        </div>
      </div>
    </div>
  );
};
