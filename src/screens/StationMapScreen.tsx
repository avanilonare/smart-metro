import React, { useState } from 'react';
import {
  ChevronUp,
  ChevronDown,
  Navigation,
  Train,
  MapPin,
  Clock,
  ArrowRight,
  Info,
  GitFork
} from 'lucide-react';
import {
  STATIONS,
  PURPLE_LINE_STATIONS,
  AQUA_LINE_STATIONS,
  MetroStation
} from '../data/metroData';

interface StationMapScreenProps {
  initialStation?: MetroStation;
  onSelectStationDetails: (station: MetroStation) => void;
  onPlanFromStation: (station: MetroStation) => void;
}

export const StationMapScreen: React.FC<StationMapScreenProps> = ({
  initialStation,
  onSelectStationDetails,
  onPlanFromStation
}) => {
  const [selectedStation, setSelectedStation] = useState<MetroStation>(
    initialStation || STATIONS[9] // District Court Pune default
  );
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  // Schematic coordinate mapping across 440x500 SVG canvas:
  // Purple Line runs North-South at X ~ 210 (Y: 40 to 450)
  // Aqua Line runs West-East at Y ~ 260 (X: 30 to 410)
  // Intersection at District Court Pune (X: 210, Y: 260)

  const purpleCoords: Record<string, { x: number; y: number }> = {
    'pcmc': { x: 210, y: 40 },
    'sant-tukaram-nagar': { x: 210, y: 65 },
    'nashik-phata': { x: 210, y: 90 },
    'kasarwadi': { x: 210, y: 115 },
    'phugewadi': { x: 210, y: 140 },
    'dapodi': { x: 210, y: 165 },
    'bopodi': { x: 210, y: 190 },
    'khadki': { x: 210, y: 215 },
    'shivajinagar': { x: 210, y: 238 },
    'district-court-pune': { x: 210, y: 260 },
    'kasba-peth': { x: 210, y: 295 },
    'mahatma-phule-mandai': { x: 210, y: 325 },
    'swargate': { x: 210, y: 355 }
  };

  const aquaCoords: Record<string, { x: number; y: number }> = {
    'vanaz': { x: 30, y: 260 },
    'anand-nagar': { x: 55, y: 260 },
    'paud-phata': { x: 78, y: 260 },
    'sndt-college': { x: 100, y: 260 },
    'garware-college': { x: 125, y: 260 },
    'deccan-gymkhana': { x: 150, y: 260 },
    'chhatrapati-sambhaji-udyan': { x: 172, y: 260 },
    'pmc': { x: 192, y: 260 },
    'rto-pune': { x: 240, y: 260 },
    'pune-railway-station': { x: 268, y: 260 },
    'ruby-hall-clinic': { x: 298, y: 260 },
    'bund-garden': { x: 328, y: 260 },
    'yerawada': { x: 358, y: 260 },
    'kalyani-nagar': { x: 385, y: 260 },
    'ramwadi': { x: 412, y: 260 }
  };

  const getStationCoord = (station: MetroStation) => {
    if (station.id === 'district-court-pune' || station.name === 'District Court Pune') {
      return { x: 210, y: 260 };
    }
    if (purpleCoords[station.id]) return purpleCoords[station.id];
    if (aquaCoords[station.id]) return aquaCoords[station.id];
    return { x: 210, y: 260 };
  };

  const isSelected = (station: MetroStation) =>
    selectedStation.name === station.name;

  return (
    <div className="relative w-full h-[calc(100vh-3.5rem)] bg-[#F0F5FA] flex flex-col justify-between overflow-hidden select-none max-w-md mx-auto">
      {/* Metro Route Canvas Area */}
      <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center p-2">
        <svg
          viewBox="0 0 440 400"
          className="w-full h-full max-h-[64vh] drop-shadow-sm select-none"
        >
          <defs>
            {/* Soft grid pattern for stylized city road layout */}
            <pattern id="cityGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2EBF2" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Clean City Base Grid */}
          <rect width="440" height="400" fill="url(#cityGrid)" />

          {/* Stylized Mutha River */}
          <path
            d="M 120 180 C 180 230, 230 250, 360 210 L 440 220"
            fill="none"
            stroke="#D0EAF4"
            strokeWidth="32"
            strokeLinecap="round"
          />
          <text x="310" y="200" fill="#7FA9C0" fontSize="8" fontWeight="600">
            Mutha River
          </text>

          {/* PURPLE LINE TRACK (North to South: PCMC to Swargate) */}
          <line
            x1="210"
            y1="40"
            x2="210"
            y2="355"
            stroke="#7C3AED"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* AQUA LINE TRACK (West to East: Vanaz to Ramwadi) */}
          <line
            x1="30"
            y1="260"
            x2="412"
            y2="260"
            stroke="#008C8C"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Purple Line Terminal Labels */}
          <text x="210" y="28" fill="#7C3AED" fontSize="8.5" fontWeight="bold" textAnchor="middle">
            ▲ PCMC (Purple Line)
          </text>
          <text x="210" y="375" fill="#7C3AED" fontSize="8.5" fontWeight="bold" textAnchor="middle">
            ▼ SWARGATE
          </text>

          {/* Aqua Line Terminal Labels */}
          <text x="30" y="280" fill="#008C8C" fontSize="8" fontWeight="bold" textAnchor="middle">
            ◀ VANAZ
          </text>
          <text x="412" y="280" fill="#008C8C" fontSize="8" fontWeight="bold" textAnchor="middle">
            RAMWADI ▶
          </text>

          {/* Render All Stations */}
          {STATIONS.map((station) => {
            const coord = getStationCoord(station);
            const selected = isSelected(station);
            const isInterchange = station.name === 'District Court Pune';
            const isPurple = station.line === 'Purple Line';

            return (
              <g
                key={station.id}
                onClick={() => setSelectedStation(station)}
                className="cursor-pointer transition-transform"
                style={{ transformOrigin: `${coord.x}px ${coord.y}px` }}
              >
                {/* Ping wave on selected station */}
                {selected && (
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r="14"
                    fill={isInterchange ? '#F4C542' : isPurple ? '#7C3AED' : '#008C8C'}
                    fillOpacity="0.25"
                    className="animate-ping"
                  />
                )}

                {/* Node circle */}
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r={isInterchange ? 8 : selected ? 6 : 4}
                  fill={isInterchange ? '#F4C542' : '#FFFFFF'}
                  stroke={isInterchange ? '#073B73' : isPurple ? '#7C3AED' : '#008C8C'}
                  strokeWidth={isInterchange ? 2.5 : selected ? 2.5 : 1.5}
                />

                {isInterchange && (
                  <circle cx={coord.x} cy={coord.y} r="3" fill="#073B73" />
                )}
              </g>
            );
          })}

          {/* Interchange Label at District Court Pune */}
          <g transform="translate(210, 240)">
            <rect x="-56" y="-12" width="112" height="16" rx="4" fill="#073B73" />
            <text x="0" y="-1" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" textAnchor="middle">
              DISTRICT COURT (HUB)
            </text>
          </g>
        </svg>

        {/* Map Legend Floating */}
        <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs p-2 rounded-xl border border-[#D9E5EE] shadow-xs text-[10px] space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-[#7C3AED]">
            <span className="w-3 h-1 bg-[#7C3AED] rounded-full" />
            Purple Line (PCMC ↔ Swargate)
          </div>
          <div className="flex items-center gap-1.5 font-bold text-[#008C8C]">
            <span className="w-3 h-1 bg-[#008C8C] rounded-full" />
            Aqua Line (Vanaz ↔ Ramwadi)
          </div>
          <div className="flex items-center gap-1.5 font-bold text-[#073B73]">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-[#073B73] bg-[#F4C542]" />
            Interchange Hub (District Court)
          </div>
        </div>
      </div>

      {/* Floating Bottom Information Card for Selected Station */}
      <div className="relative z-30 p-4 pb-20">
        <div className="bg-white rounded-3xl p-4 shadow-xl border border-[#D9E5EE] transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  selectedStation.isInterchange
                    ? 'bg-[#F4C542]/20 text-[#073B73]'
                    : selectedStation.line === 'Purple Line'
                    ? 'bg-[#7C3AED]/15 text-[#7C3AED]'
                    : 'bg-[#008C8C]/15 text-[#008C8C]'
                }`}
              >
                {selectedStation.isInterchange ? (
                  <GitFork className="w-5 h-5 text-[#073B73]" />
                ) : (
                  <MapPin className="w-5 h-5" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#102A43] font-heading truncate">
                    {selectedStation.name}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white shrink-0 ${
                      selectedStation.isInterchange
                        ? 'bg-[#073B73]'
                        : selectedStation.line === 'Purple Line'
                        ? 'bg-[#7C3AED]'
                        : 'bg-[#008C8C]'
                    }`}
                  >
                    {selectedStation.isInterchange ? 'Interchange' : selectedStation.line}
                  </span>
                </div>
                <p className="text-xs text-[#61758A] font-medium truncate">
                  {selectedStation.nameMarathi} · Next train: {selectedStation.nextTrains[0]?.etaMinutes || 4} min
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCardExpanded(!isCardExpanded)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 shrink-0 ml-2"
              aria-label="Toggle details"
            >
              {isCardExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>

          {/* Expanded Content Details */}
          {isCardExpanded && (
            <div className="mt-3 pt-3 border-t border-[#D9E5EE] space-y-2 text-xs">
              <p className="text-[#61758A] leading-snug">{selectedStation.description}</p>
              <div className="flex flex-wrap gap-1">
                {selectedStation.facilities.slice(0, 4).map((f) => (
                  <span
                    key={f}
                    className="px-2 py-0.5 bg-[#F7FAFC] border border-[#D9E5EE] rounded text-[10px] text-slate-700"
                  >
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectStationDetails(selectedStation)}
              className="py-2.5 px-3 rounded-xl border border-[#073B73] text-[#073B73] hover:bg-[#E7F7FA] text-xs font-bold transition-colors"
            >
              Station Details
            </button>
            <button
              onClick={() => onPlanFromStation(selectedStation)}
              className="py-2.5 px-3 rounded-xl bg-[#073B73] hover:bg-[#062D59] text-white text-xs font-bold shadow-sm transition-colors"
            >
              Plan Route From Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
