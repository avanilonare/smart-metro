import React, { useState } from 'react';
import { Bookmark, ArrowRight, Clock, Coins, Trash2, Plus, Compass } from 'lucide-react';
import { DEFAULT_SAVED_ROUTES, SavedRoute, STATIONS, MetroStation } from '../data/metroData';

interface SavedRoutesScreenProps {
  savedRoutes: SavedRoute[];
  onSelectRoute: (from: MetroStation, to: MetroStation) => void;
  onRemoveRoute: (id: string) => void;
  onPlanNew: () => void;
}

export const SavedRoutesScreen: React.FC<SavedRoutesScreenProps> = ({
  savedRoutes,
  onSelectRoute,
  onRemoveRoute,
  onPlanNew
}) => {
  return (
    <div className="space-y-4 pb-24 px-4 pt-3 max-w-md mx-auto select-none">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#102A43] font-heading">
            Saved Routes
          </h2>
          <p className="text-xs text-[#61758A]">
            Quick 1-tap route planning for your routine trips
          </p>
        </div>

        <button
          onClick={onPlanNew}
          className="p-2 rounded-xl bg-[#073B73] text-white hover:bg-[#062D59] text-xs font-bold flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New</span>
        </button>
      </div>

      {savedRoutes.length === 0 ? (
        <div className="p-8 bg-white rounded-3xl border border-[#D9E5EE] text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#E7F7FA] text-[#073B73] flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-[#102A43] font-heading">
            Save your frequently used routes here.
          </h3>
          <p className="text-xs text-[#61758A] max-w-xs mx-auto">
            You can bookmark journeys from the Route Details screen for quick access.
          </p>
          <button
            onClick={onPlanNew}
            className="py-2.5 px-4 bg-[#073B73] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#062D59] transition-colors inline-flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" /> Plan a Journey
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {savedRoutes.map((route) => {
            const fromStation = STATIONS.find((s) => s.id === route.fromStationId) || STATIONS[0];
            const toStation = STATIONS.find((s) => s.id === route.toStationId) || STATIONS[5];

            return (
              <div
                key={route.id}
                className="p-4 bg-white rounded-2xl border border-[#D9E5EE] shadow-2xs hover:border-[#008C8C] transition-all relative group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#008C8C] bg-[#DDF6F2] px-2 py-0.5 rounded-md">
                    {route.tag}
                  </span>
                  <button
                    onClick={() => onRemoveRoute(route.id)}
                    className="p-1 text-slate-300 hover:text-[#E05252] transition-colors"
                    title="Remove saved route"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div
                  onClick={() => onSelectRoute(fromStation, toStation)}
                  role="button"
                  tabIndex={0}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-2 font-heading">
                    <span className="text-sm font-bold text-[#102A43]">
                      {fromStation.name}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#008C8C]" />
                    <span className="text-sm font-bold text-[#102A43]">
                      {toStation.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-2 text-xs text-[#61758A]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#008C8C]" />
                      {route.duration}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Coins className="w-3 h-3 text-[#22B573]" />
                      {route.fare}
                    </span>
                    <span className="ml-auto text-[11px] font-bold text-[#073B73] group-hover:underline flex items-center gap-0.5">
                      Open Route →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
