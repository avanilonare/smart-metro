import React from 'react';
import {
  Clock,
  MapPin,
  Coins,
  ArrowRight,
  Train,
  Bookmark,
  Map,
  Info,
  CheckCircle2,
  Ticket,
  GitFork,
  ArrowDown
} from 'lucide-react';
import { PlannedRoute } from '../data/metroData';

interface RouteResultScreenProps {
  route: PlannedRoute;
  onViewMap: () => void;
  onBuyTicket: () => void;
  onSaveRoute: (route: PlannedRoute) => void;
  isSaved?: boolean;
}

export const RouteResultScreen: React.FC<RouteResultScreenProps> = ({
  route,
  onViewMap,
  onBuyTicket,
  onSaveRoute,
  isSaved = false
}) => {
  return (
    <div className="space-y-4 pb-24 px-4 pt-3 max-w-md mx-auto select-none">
      {/* Top Best Route Status Badge & Actions */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22B573]/15 text-[#22B573] border border-[#22B573]/30 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-[#22B573] animate-pulse" />
          {route.isInterchange ? 'Interchange Route' : 'Direct Line Route'}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSaveRoute(route)}
            className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1 transition-colors ${
              isSaved
                ? 'bg-[#073B73] text-white border-[#073B73]'
                : 'bg-white text-[#61758A] border-[#D9E5EE] hover:bg-slate-50'
            }`}
            title="Save route"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="text-[11px]">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
          <button
            onClick={onBuyTicket}
            className="p-2 rounded-xl bg-[#22B573] hover:bg-[#1fa367] text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span className="text-[11px]">Demo Pass</span>
          </button>
        </div>
      </div>

      {/* Main Route Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#D9E5EE] shadow-sm">
        {/* Origin to Destination Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D9E5EE]">
          <div className="text-left min-w-0 max-w-[42%]">
            <span className="text-[10px] uppercase font-bold text-[#61758A] block">
              START
            </span>
            <span className="text-base font-bold text-[#073B73] font-heading truncate block">
              {route.fromStation.name}
            </span>
            <span className="text-[10px] text-slate-500 truncate block">
              {route.fromStation.line}
            </span>
          </div>

          <div className="w-8 h-8 rounded-full bg-[#E7F7FA] flex items-center justify-center text-[#008C8C] shrink-0 mx-2">
            <ArrowRight className="w-4 h-4" />
          </div>

          <div className="text-right min-w-0 max-w-[42%]">
            <span className="text-[10px] uppercase font-bold text-[#61758A] block">
              END
            </span>
            <span className="text-base font-bold text-[#073B73] font-heading truncate block">
              {route.toStation.name}
            </span>
            <span className="text-[10px] text-slate-500 truncate block">
              {route.toStation.line}
            </span>
          </div>
        </div>

        {/* Prominent Interchange Instruction Banner if cross-line */}
        {route.isInterchange && (
          <div className="my-3 p-3 bg-[#FFFDF7] border-2 border-[#F4C542] rounded-xl flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#F4C542] text-[#073B73] flex items-center justify-center shrink-0 mt-0.5 font-bold">
              <GitFork className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#073B73] block">
                INTERCHANGE REQUIRED
              </span>
              <p className="text-xs font-bold text-[#102A43] mt-0.5 leading-snug">
                {route.interchangeInstruction}
              </p>
              <p className="text-[11px] text-[#61758A] mt-1">
                Follow internal concourse signs between Underground & Elevated platforms (~3-min transfer).
              </p>
            </div>
          </div>
        )}

        {/* Vertical Metro Line Timeline Rendering Both Single and Interchange Legs */}
        <div className="py-3 relative pl-2">
          {route.legs.map((leg, legIdx) => {
            const isPurple = leg.line === 'Purple Line';

            return (
              <div key={legIdx} className="mb-4 last:mb-0">
                {/* Leg Header Badge */}
                <div className="flex items-center gap-2 mb-2 ml-1">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md text-white ${
                      isPurple ? 'bg-[#7C3AED]' : 'bg-[#008C8C]'
                    }`}
                  >
                    Part {legIdx + 1}: {leg.line}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {leg.stationCount} stops • ~{leg.durationMinutes} min
                  </span>
                </div>

                {/* Stations within this leg */}
                <div className="relative pl-3 space-y-3.5">
                  {/* Vertical Line Track */}
                  <div
                    className={`absolute left-[21px] top-3 bottom-3 w-1 rounded-full ${
                      isPurple ? 'bg-[#7C3AED]' : 'bg-[#008C8C]'
                    }`}
                  />

                  {leg.path.map((station, sIdx) => {
                    const isLegStart = sIdx === 0;
                    const isLegEnd = sIdx === leg.path.length - 1;
                    const isOverallStart = legIdx === 0 && isLegStart;
                    const isOverallEnd = legIdx === route.legs.length - 1 && isLegEnd;
                    const isTransferNode = station.name === 'District Court Pune';

                    return (
                      <div key={station.id} className="relative flex items-center gap-3 group">
                        {/* Station Marker */}
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 transition-transform ${
                            isOverallStart
                              ? 'bg-[#073B73] text-white ring-4 ring-[#DDF6F2]'
                              : isOverallEnd
                              ? 'bg-[#22B573] text-white ring-4 ring-[#DDF6F2]'
                              : isTransferNode
                              ? 'bg-[#F4C542] text-[#073B73] ring-4 ring-[#FFFDF7] font-black'
                              : isPurple
                              ? 'bg-white border-2 border-[#7C3AED] text-[#7C3AED]'
                              : 'bg-white border-2 border-[#008C8C] text-[#008C8C]'
                          }`}
                        >
                          {isOverallStart || isOverallEnd ? (
                            <span className="w-2 h-2 rounded-full bg-white" />
                          ) : isTransferNode ? (
                            <GitFork className="w-3 h-3 text-[#073B73]" />
                          ) : (
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isPurple ? 'bg-[#7C3AED]' : 'bg-[#008C8C]'
                              }`}
                            />
                          )}
                        </div>

                        {/* Station Label */}
                        <div className="flex-1 flex items-center justify-between min-w-0 pr-1">
                          <div className="min-w-0">
                            <span
                              className={`text-xs block font-heading truncate ${
                                isOverallStart || isOverallEnd || isTransferNode
                                  ? 'font-bold text-[#102A43]'
                                  : 'font-medium text-slate-700'
                              }`}
                            >
                              {station.name}
                            </span>
                            <span className="text-[10px] text-slate-400 block -mt-0.5">
                              {station.nameMarathi}
                            </span>
                          </div>

                          {isOverallStart && (
                            <span className="text-[10px] font-bold text-[#073B73] bg-[#E7F7FA] px-2 py-0.5 rounded-md shrink-0">
                              Origin
                            </span>
                          )}
                          {isOverallEnd && (
                            <span className="text-[10px] font-bold text-[#22B573] bg-[#DDF6F2] px-2 py-0.5 rounded-md shrink-0">
                              Destination
                            </span>
                          )}
                          {isTransferNode && !isOverallStart && !isOverallEnd && (
                            <span className="text-[10px] font-bold text-[#073B73] bg-[#F4C542] px-2 py-0.5 rounded-md shrink-0 shadow-2xs">
                              Transfer Hub
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Transfer Callout between Part 1 and Part 2 */}
                {legIdx < route.legs.length - 1 && (
                  <div className="my-2.5 ml-3 pl-6 border-l-2 border-dashed border-[#F4C542] py-1 text-xs text-[#073B73]">
                    <span className="inline-flex items-center gap-1 font-bold bg-[#FFFDF7] px-2 py-0.5 rounded border border-[#F4C542]/40">
                      <ArrowDown className="w-3 h-3 text-[#073B73]" />
                      Change to {route.legs[legIdx + 1].line} at District Court Pune
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 4 Stat Indicators: Duration, Stations, Prototype Fare, Interchange */}
        <div className="pt-3 border-t border-[#D9E5EE] grid grid-cols-4 gap-2 text-center">
          {/* 1. Time */}
          <div className="bg-[#F7FAFC] p-2 rounded-xl border border-[#D9E5EE]">
            <Clock className="w-3.5 h-3.5 text-[#008C8C] mx-auto mb-1" />
            <span className="text-xs font-bold text-[#102A43] block">
              {route.durationMinutes} min
            </span>
            <span className="text-[9px] text-[#61758A] block">Duration</span>
          </div>

          {/* 2. Stations */}
          <div className="bg-[#F7FAFC] p-2 rounded-xl border border-[#D9E5EE]">
            <MapPin className="w-3.5 h-3.5 text-[#073B73] mx-auto mb-1" />
            <span className="text-xs font-bold text-[#102A43] block">
              {route.stationCount}
            </span>
            <span className="text-[9px] text-[#61758A] block">Stations</span>
          </div>

          {/* 3. Estimated Prototype Fare */}
          <div className="bg-[#F7FAFC] p-2 rounded-xl border border-[#D9E5EE]">
            <Coins className="w-3.5 h-3.5 text-[#22B573] mx-auto mb-1" />
            <span className="text-xs font-bold text-[#22B573] block">
              ₹{route.fareRupees}
            </span>
            <span className="text-[9px] text-[#61758A] block">Sample Fare</span>
          </div>

          {/* 4. Interchange */}
          <div className="bg-[#F7FAFC] p-2 rounded-xl border border-[#D9E5EE]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#073B73] mx-auto mb-1" />
            <span className="text-xs font-bold text-[#102A43] block truncate">
              {route.isInterchange ? '1 Transfer' : 'Direct'}
            </span>
            <span className="text-[9px] text-[#61758A] block">Interchange</span>
          </div>
        </div>

        {/* Prototype Fare Slab Explanation Note */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
          <span>Estimated Prototype Fare ({route.stationCount} stations slab)</span>
          <span className="font-bold text-[#22B573]">₹{route.fareRupees}</span>
        </div>
      </div>

      {/* Metro Line Section */}
      <div className="bg-white rounded-2xl p-4 border border-[#D9E5EE] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-lg text-white text-xs font-bold ${
                route.isInterchange
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#008C8C]'
                  : route.line.includes('Purple')
                  ? 'bg-[#7C3AED]'
                  : 'bg-[#008C8C]'
              }`}
            >
              {route.line}
            </span>
            <span className="text-xs font-bold text-[#102A43]">
              {route.fromStation.name} → {route.toStation.name}
            </span>
          </div>
          <span className="text-xs text-[#61758A] font-medium">
            {route.stationCount} stops • ~{route.durationMinutes} min
          </span>
        </div>

        <button
          onClick={onViewMap}
          className="w-full py-2.5 px-3 rounded-xl border border-[#073B73] text-[#073B73] hover:bg-[#E7F7FA] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <Map className="w-4 h-4 text-[#008C8C]" />
          View Full Route Map
        </button>
      </div>

      {/* Next Metro Card */}
      <div className="bg-gradient-to-r from-[#073B73] to-[#008C8C] rounded-2xl p-4 text-white shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
            <Train className="w-6 h-6 text-[#F4C542]" />
          </div>
          <div>
            <span className="text-xs text-[#DDF6F2] block">Next Metro</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-white font-heading">
                {route.nextMetroMinutes} min
              </span>
              <span className="text-xs text-[#DDF6F2]/90 truncate max-w-[150px]">
                from {route.fromStation.name}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-white/70 block uppercase tracking-wider">Line</span>
          <span className="text-xs font-bold text-[#F4C542]">{route.fromStation.line}</span>
        </div>
      </div>

      {/* Train Frequency Info Card */}
      <div className="p-3 bg-[#E7F7FA] rounded-2xl border border-[#D9E5EE] flex items-center gap-2.5 text-xs text-[#102A43]">
        <Info className="w-4 h-4 text-[#008C8C] shrink-0" />
        <span className="font-medium">
          Trains run every 6–8 minutes across both lines (Peak frequency: 6 mins).
        </span>
      </div>

      {/* Prototype Disclaimer */}
      <div className="text-center pt-1">
        <p className="text-[11px] text-slate-400">
          Estimated Prototype Fare • Demonstration data for college project presentation.
        </p>
      </div>
    </div>
  );
};
