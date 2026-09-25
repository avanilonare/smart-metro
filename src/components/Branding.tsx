import React from 'react';

export const MetroLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = ''
}) => {
  const dim = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-16 h-16' : 'w-10 h-10';

  return (
    <div
      className={`relative ${dim} rounded-xl bg-gradient-to-br from-[#073B73] to-[#008C8C] p-1.5 flex items-center justify-center shadow-md ${className}`}
      aria-label="Smart Metro Logo"
    >
      <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
        {/* Train front outline */}
        <rect x="7" y="5" width="22" height="23" rx="5" fill="#FFFFFF" />
        {/* Train windshield */}
        <path d="M10 9H26V16C26 16.5 25.5 17 25 17H11C10.5 17 10 16.5 10 16V9Z" fill="#073B73" />
        {/* Front destination display */}
        <rect x="13" y="7" width="10" height="1.5" rx="0.5" fill="#22B573" />
        {/* Headlights */}
        <circle cx="12.5" cy="22.5" r="2" fill="#F4C542" />
        <circle cx="23.5" cy="22.5" r="2" fill="#F4C542" />
        {/* Center badge */}
        <path d="M16.5 20.5H19.5" stroke="#008C8C" strokeWidth="1.5" strokeLinecap="round" />
        {/* Wheels / tracks */}
        <rect x="10" y="28" width="4" height="3" rx="1" fill="#062D59" />
        <rect x="22" y="28" width="4" height="3" rx="1" fill="#062D59" />
        <path d="M5 32H31" stroke="#22B573" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {/* Small gold indicator pip */}
      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#F4C542] rounded-full ring-2 ring-white" />
    </div>
  );
};

export const SkylineMetroIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full overflow-hidden select-none ${className}`}>
      <svg viewBox="0 0 400 130" fill="none" className="w-full h-auto">
        <defs>
          <linearGradient id="skylineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DDF6F2" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F7FAFC" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="trainGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#073B73" />
            <stop offset="50%" stopColor="#008C8C" />
            <stop offset="100%" stopColor="#22B573" />
          </linearGradient>
        </defs>

        {/* Soft atmospheric gradient */}
        <rect width="400" height="130" fill="url(#skylineGrad)" />

        {/* Simplified Pune Skyline Silhouettes */}
        <path
          d="M10 95 H35 V65 H55 V95 H75 V50 H100 V95 H130 V72 H155 V95 H180 V42 H205 V95 H240 V60 H265 V95 H290 V70 H315 V95 H345 V55 H370 V95 H395"
          fill="#D9E5EE"
          opacity="0.65"
        />
        {/* Mid-ground skyline towers */}
        <path
          d="M40 95 V78 H65 V95 H110 V62 H135 V95 H175 V58 H195 V95 H250 V75 H275 V95 H325 V68 H350 V95"
          fill="#CBD5E1"
          opacity="0.5"
        />

        {/* Elevated Metro Viaduct & Pillars */}
        <line x1="0" y1="96" x2="400" y2="96" stroke="#073B73" strokeWidth="4" />
        <line x1="0" y1="99" x2="400" y2="99" stroke="#22B573" strokeWidth="1.5" />
        {/* Pillars */}
        <rect x="40" y="96" width="12" height="34" rx="2" fill="#073B73" opacity="0.8" />
        <rect x="120" y="96" width="12" height="34" rx="2" fill="#073B73" opacity="0.8" />
        <rect x="200" y="96" width="12" height="34" rx="2" fill="#073B73" opacity="0.8" />
        <rect x="280" y="96" width="12" height="34" rx="2" fill="#073B73" opacity="0.8" />
        <rect x="360" y="96" width="12" height="34" rx="2" fill="#073B73" opacity="0.8" />

        {/* Sleek Modern Metro Train cruising on viaduct */}
        <g transform="translate(140, 74)">
          {/* Coach 1 (Rear) */}
          <rect x="0" y="3" width="56" height="18" rx="4" fill="#073B73" />
          <rect x="4" y="6" width="10" height="7" rx="1.5" fill="#E7F7FA" />
          <rect x="18" y="6" width="10" height="7" rx="1.5" fill="#E7F7FA" />
          <rect x="32" y="6" width="10" height="7" rx="1.5" fill="#E7F7FA" />
          <rect x="0" y="16" width="56" height="2" fill="#22B573" />

          {/* Coupler */}
          <rect x="56" y="10" width="4" height="4" fill="#102A43" />

          {/* Coach 2 (Front Aerodynamic Lead) */}
          <path
            d="M60 3 H110 Q124 3 126 12 Q128 21 114 21 H60 Z"
            fill="url(#trainGrad)"
          />
          {/* Windows */}
          <rect x="66" y="6" width="10" height="7" rx="1.5" fill="#E7F7FA" />
          <rect x="80" y="6" width="10" height="7" rx="1.5" fill="#E7F7FA" />
          <path d="M96 6 H108 L114 13 H96 Z" fill="#E7F7FA" />
          {/* Green accent stripe */}
          <path d="M60 16 H115" stroke="#F4C542" strokeWidth="2" strokeLinecap="round" />
          {/* Headlight beam */}
          <polygon points="126,16 160,8 160,24" fill="#F4C542" opacity="0.3" />
          <circle cx="125" cy="16" r="2" fill="#F4C542" />
        </g>
      </svg>
    </div>
  );
};
