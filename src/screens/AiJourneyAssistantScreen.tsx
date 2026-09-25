import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  ArrowRight,
  Clock,
  Coins,
  GitFork,
  CheckCircle2,
  Lightbulb,
  Train,
  ArrowDownUp,
  RefreshCw,
  Compass
} from 'lucide-react';
import { MetroStation, STATIONS, calculateRoute, PlannedRoute } from '../data/metroData';

interface AiJourneyAssistantScreenProps {
  onOpenStationSelect: (type: 'from' | 'to') => void;
  selectedFrom: MetroStation | null;
  selectedTo: MetroStation | null;
  onSwapStations: () => void;
  onViewDetailedRoute: (route: PlannedRoute) => void;
}

export const AiJourneyAssistantScreen: React.FC<AiJourneyAssistantScreenProps> = ({
  onOpenStationSelect,
  selectedFrom,
  selectedTo,
  onSwapStations,
  onViewDetailedRoute
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRoute, setGeneratedRoute] = useState<PlannedRoute | null>(null);
  const [aiInsight, setAiInsight] = useState<string>('');

  const handleGenerate = () => {
    if (!selectedFrom || !selectedTo) return;

    setIsGenerating(true);
    setTimeout(() => {
      const route = calculateRoute(selectedFrom.id, selectedTo.id, 'Fastest');
      setGeneratedRoute(route);

      // Generate context-aware AI commuter insights
      if (route.isInterchange) {
        setAiInsight(
          `Smart Recommendation: Board Coach 2 or 3 on ${route.fromStation.line} for fastest access to the central interchange escalator at District Court Pune. Transfer takes approximately 3 minutes.`
        );
      } else {
        setAiInsight(
          `Direct Route: Direct service on ${route.line}. Headway is 6 minutes during peak hours. Best coaches to board for quick station exit: Coach 1 (Front) or Coach 4 (Rear).`
        );
      }
      setIsGenerating(false);
    }, 750);
  };

  return (
    <div className="space-y-4 pb-24 px-4 pt-3 max-w-md mx-auto select-none">
      {/* Vision Header Banner */}
      <div className="bg-gradient-to-br from-[#073B73] via-[#062D59] to-[#008C8C] rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[#F4C542] text-[10px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3" /> Future Vision • Smart Assistant
          </div>
          <h2 className="text-xl font-extrabold tracking-tight font-heading leading-tight text-white">
            AI Journey Assistant
          </h2>
          <p className="text-xs text-[#DDF6F2] mt-1.5 leading-relaxed font-normal">
            Intelligent route planning, interchange optimization, and passenger commuter advice.
          </p>
        </div>

        {/* Decorative corner orb */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-[#008C8C]/30 blur-xl pointer-events-none" />
      </div>

      {/* Input Selection Card: "Where do you want to go?" */}
      <div className="bg-white rounded-2xl p-4 border border-[#D9E5EE] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#102A43] font-heading">
            Where do you want to go?
          </h3>
          <span className="text-[10px] text-slate-400 font-medium">
            28 Network Stops
          </span>
        </div>

        <div className="space-y-2.5 relative">
          {/* FROM Station Input */}
          <div
            onClick={() => onOpenStationSelect('from')}
            role="button"
            tabIndex={0}
            className="w-full bg-[#F7FAFC] hover:bg-[#E7F7FA]/70 border border-[#D9E5EE] rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  selectedFrom
                    ? selectedFrom.line === 'Purple Line'
                      ? 'bg-[#7C3AED]/15 text-[#7C3AED]'
                      : 'bg-[#008C8C]/15 text-[#008C8C]'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#61758A] block">
                  FROM
                </span>
                <span
                  className={`text-sm block truncate ${
                    selectedFrom ? 'font-bold text-[#102A43]' : 'text-slate-400 font-normal'
                  }`}
                >
                  {selectedFrom ? selectedFrom.name : 'Select starting station'}
                </span>
              </div>
            </div>

            {selectedFrom ? (
              <span className="text-[10px] font-bold text-[#073B73] bg-[#E7F7FA] px-2 py-0.5 rounded-md">
                {selectedFrom.line}
              </span>
            ) : (
              <span className="text-xs font-semibold text-[#008C8C]">Select</span>
            )}
          </div>

          {/* Swap Trigger */}
          <div className="flex justify-end pr-6 -my-2 relative z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSwapStations();
              }}
              className="w-8 h-8 rounded-full bg-white border border-[#D9E5EE] shadow-sm hover:bg-slate-50 active:rotate-180 flex items-center justify-center text-[#073B73] transition-all"
              aria-label="Swap stations"
            >
              <ArrowDownUp className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* TO Station Input */}
          <div
            onClick={() => onOpenStationSelect('to')}
            role="button"
            tabIndex={0}
            className="w-full bg-[#F7FAFC] hover:bg-[#E7F7FA]/70 border border-[#D9E5EE] rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  selectedTo
                    ? selectedTo.line === 'Purple Line'
                      ? 'bg-[#7C3AED]/15 text-[#7C3AED]'
                      : 'bg-[#008C8C]/15 text-[#008C8C]'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#61758A] block">
                  TO
                </span>
                <span
                  className={`text-sm block truncate ${
                    selectedTo ? 'font-bold text-[#102A43]' : 'text-slate-400 font-normal'
                  }`}
                >
                  {selectedTo ? selectedTo.name : 'Select destination station'}
                </span>
              </div>
            </div>

            {selectedTo ? (
              <span className="text-[10px] font-bold text-[#073B73] bg-[#E7F7FA] px-2 py-0.5 rounded-md">
                {selectedTo.line}
              </span>
            ) : (
              <span className="text-xs font-semibold text-[#008C8C]">Select</span>
            )}
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="pt-1 flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] text-slate-400 font-semibold">Try sample:</span>
          <button
            onClick={() => {
              const pcmc = STATIONS.find((s) => s.name === 'PCMC')!;
              const ramwadi = STATIONS.find((s) => s.name === 'Ramwadi')!;
              // Trigger route
              const r = calculateRoute(pcmc.id, ramwadi.id, 'Fastest');
              setGeneratedRoute(r);
              setAiInsight(
                'Cross-corridor recommendation: Take Purple Line from PCMC to District Court Pune, then change to Aqua Line towards Ramwadi. Total estimated fare is ₹50.'
              );
            }}
            className="text-[10px] font-bold text-[#073B73] bg-[#E7F7FA] px-2 py-0.5 rounded-md hover:bg-[#DDF6F2] transition-colors"
          >
            PCMC → Ramwadi (Interchange)
          </button>
          <button
            onClick={() => {
              const vanaz = STATIONS.find((s) => s.name === 'Vanaz')!;
              const rto = STATIONS.find((s) => s.name === 'RTO Pune')!;
              const r = calculateRoute(vanaz.id, rto.id, 'Fastest');
              setGeneratedRoute(r);
              setAiInsight(
                'Direct Aqua Line journey: Vanaz to RTO Pune via Nal Stop and Sambhaji Udyan with zero transfers.'
              );
            }}
            className="text-[10px] font-bold text-[#008C8C] bg-[#DDF6F2] px-2 py-0.5 rounded-md hover:bg-[#E7F7FA] transition-colors"
          >
            Vanaz → RTO Pune (Direct)
          </button>
        </div>

        {/* Generate Smart Route Action */}
        <button
          onClick={handleGenerate}
          disabled={!selectedFrom || !selectedTo || isGenerating}
          className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all ${
            selectedFrom && selectedTo && !isGenerating
              ? 'bg-[#073B73] hover:bg-[#062D59] text-white active:scale-98 shadow-[#073B73]/20 cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-[#F4C542]" />
              <span>Analyzing Network & Generating Smart Route…</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#F4C542]" />
              <span>Generate Smart Route</span>
            </>
          )}
        </button>
      </div>

      {/* Generated AI Route Output Card */}
      {generatedRoute && (
        <div className="bg-white rounded-2xl p-4 border border-[#D9E5EE] shadow-sm space-y-3.5 animate-in fade-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22B573] animate-pulse" />
              <h4 className="text-sm font-extrabold text-[#102A43] font-heading">
                Recommended Route
              </h4>
            </div>
            <span className="text-[10px] font-black uppercase text-[#008C8C] bg-[#DDF6F2] px-2 py-0.5 rounded-full">
              AI Optimized
            </span>
          </div>

          {/* From -> To */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#61758A]">Origin</span>
              <p className="text-sm font-bold text-[#073B73] font-heading">
                {generatedRoute.fromStation.name}
              </p>
              <span className="text-[10px] text-slate-500">{generatedRoute.fromStation.line}</span>
            </div>
            <ArrowRight className="w-5 h-5 text-[#008C8C]" />
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-[#61758A]">Destination</span>
              <p className="text-sm font-bold text-[#073B73] font-heading">
                {generatedRoute.toStation.name}
              </p>
              <span className="text-[10px] text-slate-500">{generatedRoute.toStation.line}</span>
            </div>
          </div>

          {/* Interchange Callout */}
          {generatedRoute.isInterchange ? (
            <div className="p-3 bg-[#FFFDF7] border border-[#F4C542] rounded-xl flex items-center gap-2.5 text-xs text-[#073B73]">
              <GitFork className="w-4 h-4 text-[#073B73] shrink-0" />
              <span>
                <strong>Interchange Required:</strong> Change at{' '}
                <strong className="underline decoration-[#F4C542] decoration-2">
                  District Court Pune
                </strong>
              </span>
            </div>
          ) : (
            <div className="p-2.5 bg-[#E7F7FA] rounded-xl text-xs text-[#073B73] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22B573] shrink-0" />
              <span>Direct Journey on {generatedRoute.line} with zero line switches.</span>
            </div>
          )}

          {/* Stat Indicators */}
          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="bg-[#F7FAFC] p-2 rounded-xl border border-[#D9E5EE]">
              <Clock className="w-3.5 h-3.5 text-[#008C8C] mx-auto mb-0.5" />
              <span className="text-xs font-bold text-[#102A43] block">
                {generatedRoute.durationMinutes} min
              </span>
              <span className="text-[9px] text-[#61758A]">Est. Time</span>
            </div>

            <div className="bg-[#F7FAFC] p-2 rounded-xl border border-[#D9E5EE]">
              <MapPin className="w-3.5 h-3.5 text-[#073B73] mx-auto mb-0.5" />
              <span className="text-xs font-bold text-[#102A43] block">
                {generatedRoute.stationCount}
              </span>
              <span className="text-[9px] text-[#61758A]">Stations</span>
            </div>

            <div className="bg-[#F7FAFC] p-2 rounded-xl border border-[#D9E5EE]">
              <Coins className="w-3.5 h-3.5 text-[#22B573] mx-auto mb-0.5" />
              <span className="text-xs font-bold text-[#22B573] block">
                ₹{generatedRoute.fareRupees}
              </span>
              <span className="text-[9px] text-[#61758A]">Sample Fare</span>
            </div>
          </div>

          {/* AI Commuter Insight Tip */}
          {aiInsight && (
            <div className="p-3 bg-[#DDF6F2]/60 border border-[#008C8C]/20 rounded-xl flex items-start gap-2.5 text-xs text-[#102A43]">
              <Lightbulb className="w-4 h-4 text-[#008C8C] shrink-0 mt-0.5" />
              <p className="leading-relaxed">{aiInsight}</p>
            </div>
          )}

          {/* View Detailed Route Navigation Button */}
          <button
            onClick={() => onViewDetailedRoute(generatedRoute)}
            className="w-full py-2.5 px-4 bg-[#073B73] hover:bg-[#062D59] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <span>View Full Journey Timeline & Stations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* College Project Vision Explainer */}
      <div className="p-3.5 bg-[#F7FAFC] rounded-2xl border border-[#D9E5EE] text-center text-xs text-[#61758A] leading-relaxed">
        <p className="font-semibold text-[#073B73]">Future AI Capability Prototype</p>
        <p className="text-[11px] mt-1">
          Designed to demonstrate future AI capabilities including predictive crowd routing, real-time multimodal synchronization, and accessibility guidance.
        </p>
      </div>
    </div>
  );
};
