import React from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface MetroStatusCardProps {
  onClick?: () => void;
}

export const MetroStatusCard: React.FC<MetroStatusCardProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      className="relative w-full rounded-2xl bg-[#E7F7FA] border border-[#D9E5EE] p-4 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden group"
    >
      <div className="flex items-center justify-between">
        {/* Left Status Info */}
        <div className="flex items-start gap-3 pr-2 z-10">
          <div className="w-9 h-9 rounded-full bg-[#22B573]/15 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5 text-[#22B573]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-[15px] font-bold text-[#102A43] leading-tight font-heading">
                Metro services running normally
              </h3>
            </div>
            <p className="text-xs text-[#61758A] mt-0.5 font-normal">
              All major services are operating normally.
            </p>
            <div className="flex items-center gap-2 mt-2 text-[11px] font-semibold text-[#073B73]">
              <span>Line 1 Headway: 8 min</span>
              <span className="text-[#61758A]">·</span>
              <span className="text-[#008C8C] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                Live Status <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* Right Modern Metro Train Illustration */}
        <div className="w-20 h-16 shrink-0 relative flex items-center justify-center opacity-90 group-hover:scale-105 transition-transform">
          <svg viewBox="0 0 100 80" fill="none" className="w-full h-full">
            {/* Track viaduct snippet */}
            <line x1="0" y1="62" x2="100" y2="62" stroke="#073B73" strokeWidth="4" />
            <line x1="0" y1="65" x2="100" y2="65" stroke="#22B573" strokeWidth="2" />
            {/* Aerodynamic train body */}
            <path
              d="M15 28 H70 Q88 28 92 42 Q94 54 80 54 H15 Z"
              fill="#073B73"
            />
            {/* Windshield & Windows */}
            <rect x="22" y="33" width="12" height="10" rx="2" fill="#E7F7FA" />
            <rect x="38" y="33" width="12" height="10" rx="2" fill="#E7F7FA" />
            <rect x="54" y="33" width="12" height="10" rx="2" fill="#E7F7FA" />
            <path d="M70 33 H78 L84 43 H70 Z" fill="#E7F7FA" />
            {/* Speed accent stripe */}
            <path d="M15 48 H86" stroke="#22B573" strokeWidth="2.5" strokeLinecap="round" />
            {/* Headlight glow */}
            <circle cx="88" cy="46" r="2.5" fill="#F4C542" />
            <polygon points="90,46 99,41 99,51" fill="#F4C542" opacity="0.4" />
          </svg>
        </div>
      </div>
    </div>
  );
};
