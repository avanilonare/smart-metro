import React, { useState } from 'react';
import {
  Ticket,
  CreditCard,
  QrCode,
  CheckCircle2,
  Sparkles,
  Info,
  ShieldCheck,
  Zap,
  Calculator,
  Compass
} from 'lucide-react';
import { TICKET_TYPES, TicketType, calculatePrototypeFare } from '../data/metroData';

interface TicketInfoScreenProps {
  onOpenSimulatedTicket: (ticketType?: TicketType) => void;
  onNavigateToPlanner: () => void;
}

export const TicketInfoScreen: React.FC<TicketInfoScreenProps> = ({
  onOpenSimulatedTicket,
  onNavigateToPlanner
}) => {
  const [demoStationCount, setDemoStationCount] = useState<number>(6);

  const fareSlabs = [
    { stations: '1–3 stations', fare: '₹10', desc: 'Short neighborhood hops' },
    { stations: '4–6 stations', fare: '₹20', desc: 'Inner city transit' },
    { stations: '7–9 stations', fare: '₹30', desc: 'Across central zones' },
    { stations: '10–12 stations', fare: '₹40', desc: 'Inter-corridor trips' },
    { stations: '13–16 stations', fare: '₹50', desc: 'End-to-end corridor' },
    { stations: '17+ stations', fare: '₹60+', desc: 'Cross-line interchange transit' }
  ];

  return (
    <div className="space-y-4 pb-24 px-4 pt-3 max-w-md mx-auto select-none">
      {/* Title & Clear Prototype Disclaimer Banner */}
      <div>
        <h2 className="text-xl font-bold text-[#102A43] font-heading">
          Ticket & Fare Information
        </h2>
        <p className="text-xs text-[#61758A]">
          Understand distance-based fare calculation & demo passes
        </p>
      </div>

      {/* Prominent Prototype Notice */}
      <div className="p-3 bg-[#FFFDF7] border-2 border-[#F4C542] rounded-2xl flex items-start gap-2.5 shadow-2xs">
        <Info className="w-4 h-4 text-[#073B73] shrink-0 mt-0.5" />
        <div>
          <span className="text-xs font-bold text-[#073B73] block">
            Prototype fare — for demonstration only
          </span>
          <p className="text-[11px] text-[#61758A] mt-0.5 leading-relaxed">
            Values displayed represent sample distance slabs designed for college project demonstration, not official live ticket rates.
          </p>
        </div>
      </div>

      {/* Main Ticket Categories */}
      <div className="space-y-3">
        {/* 1. Single Journey */}
        <div className="p-4 rounded-2xl bg-white border border-[#D9E5EE] shadow-xs">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E7F7FA] text-[#008C8C] flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#102A43] font-heading">
                  Single Journey
                </h4>
                <p className="text-xs text-[#61758A] mt-0.5 font-medium">
                  Fare depends on journey distance/stations.
                </p>
              </div>
            </div>
            <span className="text-sm font-extrabold text-[#073B73] font-heading">
              ₹10 – ₹60
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Estimated Fare</span>
            <span className="text-[#073B73] font-semibold bg-[#E7F7FA] px-2 py-0.5 rounded-md text-[11px]">
              Calculated after selecting From and To
            </span>
          </div>
        </div>

        {/* 2. Day Pass */}
        <div className="p-4 rounded-2xl bg-white border border-[#D9E5EE] shadow-xs">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#DDF6F2] text-[#22B573] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#102A43] font-heading">
                    Day Pass
                  </h4>
                  <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-full">
                    Prototype pass
                  </span>
                </div>
                <p className="text-xs text-[#61758A] mt-0.5">
                  Unlimited travel for 1 day across both lines
                </p>
              </div>
            </div>
            <span className="text-sm font-extrabold text-[#073B73] font-heading">
              ₹120
            </span>
          </div>
        </div>

        {/* 3. Monthly Pass */}
        <div className="p-4 rounded-2xl bg-white border border-[#D9E5EE] shadow-xs">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E0E7FF] text-[#4338CA] flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#102A43] font-heading">
                    Monthly Pass
                  </h4>
                  <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-full">
                    Prototype pass
                  </span>
                </div>
                <p className="text-xs text-[#61758A] mt-0.5">
                  Designed for regular commuters & students
                </p>
              </div>
            </div>
            <span className="text-sm font-extrabold text-[#073B73] font-heading">
              ₹2,000
            </span>
          </div>
        </div>
      </div>

      {/* Distance / Station-Based Prototype Fare Slabs Table */}
      <div className="bg-white rounded-2xl p-4 border border-[#D9E5EE] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#102A43] uppercase tracking-wider font-heading">
            Prototype Fare Slabs Structure
          </h3>
          <span className="text-[10px] text-slate-400 font-semibold">Demo Scale</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {fareSlabs.map((slab, idx) => (
            <div key={idx} className="py-2 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#102A43]">{slab.stations}</span>
                <span className="text-[10px] text-slate-400 block -mt-0.5">{slab.desc}</span>
              </div>
              <span className="font-mono font-bold text-[#22B573] bg-[#22B573]/10 px-2 py-0.5 rounded-md">
                {slab.fare}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Interactive Estimator Slider */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-600">Test Station Count:</span>
            <span className="font-bold text-[#073B73]">
              {demoStationCount} stations →{' '}
              <strong className="text-[#22B573]">
                ₹{calculatePrototypeFare(demoStationCount)}
              </strong>
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="22"
            value={demoStationCount}
            onChange={(e) => setDemoStationCount(Number(e.target.value))}
            className="w-full accent-[#073B73] cursor-pointer"
          />
        </div>
      </div>

      {/* Action Buttons: Plan Journey / View Simulated Ticket */}
      <div className="pt-1 space-y-2">
        <button
          onClick={onNavigateToPlanner}
          className="w-full py-3 px-4 bg-[#073B73] hover:bg-[#062D59] text-white rounded-xl text-xs font-bold shadow-md shadow-[#073B73]/20 flex items-center justify-center gap-2 transition-all active:scale-98"
        >
          <Compass className="w-4 h-4 text-[#F4C542]" />
          Calculate Fare For Your Route in Journey Planner
        </button>

        <button
          onClick={() => {
            const single = TICKET_TYPES[0];
            onOpenSimulatedTicket(single);
          }}
          className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-[#073B73] border border-[#D9E5EE] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-2xs"
        >
          <Ticket className="w-3.5 h-3.5 text-[#008C8C]" />
          Preview Simulated Digital QR Ticket (Demo Only)
        </button>
      </div>
    </div>
  );
};
