import React, { useState } from 'react';
import {
  CheckCircle2,
  Train,
  Clock,
  Radio,
  RefreshCw,
  Info,
  ChevronRight
} from 'lucide-react';
import {
  PURPLE_LINE_STATIONS,
  AQUA_LINE_STATIONS,
  STATIONS,
  MetroStation
} from '../data/metroData';

interface LiveMetroScreenProps {
  onSelectStation: (station: MetroStation) => void;
  onViewAllStations: () => void;
}

export const LiveMetroScreen: React.FC<LiveMetroScreenProps> = ({
  onSelectStation,
  onViewAllStations
}) => {
  const [selectedLine, setSelectedLine] = useState<'Purple Line' | 'Aqua Line'>('Purple Line');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // Sample live data matching new station lists
  const purpleTimeline = [
    { stationId: 'pcmc', statusText: 'Departed ✓', isTrainHere: false, isCompleted: true },
    { stationId: 'sant-tukaram-nagar', statusText: 'Departed ✓', isTrainHere: false, isCompleted: true },
    { stationId: 'nashik-phata', statusText: 'At Station', isTrainHere: true, isCompleted: false },
    { stationId: 'kasarwadi', statusText: '3 min', isTrainHere: false, isCompleted: false },
    { stationId: 'dapodi', statusText: '7 min', isTrainHere: false, isCompleted: false },
    { stationId: 'shivajinagar', statusText: '12 min', isTrainHere: false, isCompleted: false },
    { stationId: 'district-court-pune', statusText: '15 min', isTrainHere: false, isCompleted: false },
    { stationId: 'swargate', statusText: '22 min', isTrainHere: false, isCompleted: false }
  ];

  const aquaTimeline = [
    { stationId: 'vanaz', statusText: 'Departed ✓', isTrainHere: false, isCompleted: true },
    { stationId: 'anand-nagar', statusText: 'Departed ✓', isTrainHere: false, isCompleted: true },
    { stationId: 'sndt-college', statusText: 'At Station', isTrainHere: true, isCompleted: false },
    { stationId: 'garware-college', statusText: '3 min', isTrainHere: false, isCompleted: false },
    { stationId: 'district-court-pune', statusText: '9 min', isTrainHere: false, isCompleted: false },
    { stationId: 'pune-railway-station', statusText: '13 min', isTrainHere: false, isCompleted: false },
    { stationId: 'bund-garden', statusText: '17 min', isTrainHere: false, isCompleted: false },
    { stationId: 'ramwadi', statusText: '24 min', isTrainHere: false, isCompleted: false }
  ];

  const activeTimeline = selectedLine === 'Purple Line' ? purpleTimeline : aquaTimeline;

  return (
    <div className="space-y-4 pb-24 px-4 pt-3 max-w-md mx-auto select-none">
      {/* Main Status Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#D9E5EE] shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#22B573] animate-pulse" />
            <h2 className="text-base font-bold text-[#102A43] font-heading">
              Live Metro Status
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#22B573]/15 text-[#22B573] text-xs font-bold border border-[#22B573]/30">
              <span className="w-2 h-2 rounded-full bg-[#22B573] animate-pulse" />
              Normal
            </span>
            <button
              onClick={handleRefresh}
              className={`p-1.5 rounded-lg bg-[#F7FAFC] hover:bg-slate-100 text-[#073B73] transition-all ${
                isRefreshing ? 'animate-spin' : ''
              }`}
              title="Refresh live status"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <p className="text-xs text-[#61758A] mt-2">
          All lines are running on schedule.
        </p>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#D9E5EE] text-center">
          <div className="bg-[#F7FAFC] p-2 rounded-xl">
            <span className="text-xs font-bold text-[#073B73] block">6–8 min</span>
            <span className="text-[10px] text-[#61758A]">Headway</span>
          </div>
          <div className="bg-[#F7FAFC] p-2 rounded-xl">
            <span className="text-xs font-bold text-[#22B573] block">100%</span>
            <span className="text-[10px] text-[#61758A]">Fleet Active</span>
          </div>
          <div className="bg-[#F7FAFC] p-2 rounded-xl">
            <span className="text-xs font-bold text-[#073B73] block">34 km/h</span>
            <span className="text-[10px] text-[#61758A]">Avg Speed</span>
          </div>
        </div>
      </div>

      {/* Corridor Selector Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSelectedLine('Purple Line')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            selectedLine === 'Purple Line'
              ? 'bg-[#7C3AED] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-[#D9E5EE] hover:bg-slate-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-white" />
          Purple Line (PCMC ↔ Swargate)
        </button>

        <button
          onClick={() => setSelectedLine('Aqua Line')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            selectedLine === 'Aqua Line'
              ? 'bg-[#008C8C] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-[#D9E5EE] hover:bg-slate-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-white" />
          Aqua Line (Vanaz ↔ Ramwadi)
        </button>
      </div>

      {/* Live Train Locations Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#102A43] font-heading">
              Live Train Locations
            </h3>
            <p className="text-xs font-semibold text-[#61758A]">
              {selectedLine === 'Purple Line'
                ? 'Purple Line · PCMC → Swargate'
                : 'Aqua Line · Vanaz → Ramwadi'}
            </p>
          </div>

          <button
            onClick={onViewAllStations}
            className="text-xs font-bold text-[#073B73] hover:underline flex items-center gap-0.5"
          >
            View All ({STATIONS.length}) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Vertical Train / Station Timeline Card */}
        <div className="bg-white rounded-2xl p-4 border border-[#D9E5EE] shadow-xs relative">
          {/* Vertical Metro Line Track */}
          <div
            className={`absolute left-[31px] top-6 bottom-6 w-1 rounded-full ${
              selectedLine === 'Purple Line'
                ? 'bg-gradient-to-b from-[#7C3AED] via-[#A855F7] to-[#073B73]'
                : 'bg-gradient-to-b from-[#22B573] via-[#008C8C] to-[#073B73]'
            }`}
          />

          <div className="space-y-4">
            {activeTimeline.map((item) => {
              const stationObj =
                STATIONS.find((s) => s.id === item.stationId) ||
                PURPLE_LINE_STATIONS.find((s) => s.id === item.stationId) ||
                AQUA_LINE_STATIONS.find((s) => s.id === item.stationId) ||
                STATIONS[0];
              const isDeparted = item.statusText.includes('Departed');
              const isTrainHere = item.isTrainHere;
              const isInterchange = stationObj.name === 'District Court Pune';

              return (
                <div
                  key={item.stationId}
                  onClick={() => onSelectStation(stationObj)}
                  role="button"
                  tabIndex={0}
                  className="relative flex items-center justify-between group cursor-pointer hover:bg-slate-50/80 -mx-2 p-2 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Circular Station Marker */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-transform group-hover:scale-110 ${
                        isTrainHere
                          ? 'bg-[#22B573] text-white ring-4 ring-[#DDF6F2] shadow-sm animate-pulse'
                          : isDeparted
                          ? 'bg-[#073B73] text-white'
                          : isInterchange
                          ? 'bg-[#F4C542] text-[#073B73] ring-2 ring-[#073B73]'
                          : selectedLine === 'Purple Line'
                          ? 'bg-white border-2 border-[#7C3AED] text-[#7C3AED]'
                          : 'bg-white border-2 border-[#008C8C] text-[#008C8C]'
                      }`}
                    >
                      {isTrainHere ? (
                        <Train className="w-3.5 h-3.5 text-white" />
                      ) : isDeparted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <span
                          className={`w-2 h-2 rounded-full ${
                            selectedLine === 'Purple Line' ? 'bg-[#7C3AED]' : 'bg-[#008C8C]'
                          }`}
                        />
                      )}
                    </div>

                    {/* Station Labels */}
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#102A43] group-hover:text-[#073B73] transition-colors font-heading truncate">
                          {stationObj.name}
                        </span>
                        {isTrainHere && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#22B573] bg-[#DDF6F2] px-1.5 py-0.2 rounded-md animate-pulse">
                            Train Arriving
                          </span>
                        )}
                        {isInterchange && !isTrainHere && (
                          <span className="text-[9px] font-black text-[#073B73] bg-[#F4C542] px-1.5 py-0.2 rounded-md">
                            Interchange
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#61758A] block">
                        {stationObj.nameMarathi}
                      </span>
                    </div>
                  </div>

                  {/* Status / ETA Badge */}
                  <div className="shrink-0 text-right pl-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                        isDeparted
                          ? 'text-[#073B73] bg-[#E7F7FA]'
                          : isTrainHere
                          ? 'text-white bg-[#22B573] shadow-xs'
                          : 'text-[#073B73] bg-[#F7FAFC] border border-[#D9E5EE]'
                      }`}
                    >
                      {item.statusText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Demo Notice Banner */}
      <div className="p-3 bg-[#E7F7FA] rounded-2xl border border-[#D9E5EE] flex items-start gap-2.5 text-xs text-[#102A43]">
        <Info className="w-4 h-4 text-[#008C8C] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Prototype Telemetry Feed:</span>
          <p className="text-[11px] text-[#61758A] mt-0.5 leading-relaxed">
            Real-time GPS train location and headway simulator. Ready for automated integration with Pune Metro Open Data GTFS-RT APIs.
          </p>
        </div>
      </div>
    </div>
  );
};
