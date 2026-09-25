import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SkylineMetroIllustration } from '../components/Branding';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 400);
          return 100;
        }
        return prev + 18;
      });
    }, 280);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#DDF6F2] via-[#E7F7FA] to-[#F7FAFC] flex flex-col justify-between overflow-hidden select-none">
      {/* Top ambient decor */}
      <div className="pt-12 px-6 flex justify-between items-center">
        <span className="text-[11px] font-semibold tracking-widest text-[#008C8C] uppercase">
          Pune Transit Innovation
        </span>
        <button
          onClick={onFinish}
          className="text-xs font-semibold text-[#073B73] px-3 py-1 rounded-full bg-white/70 hover:bg-white border border-[#D9E5EE] transition-all flex items-center gap-1 shadow-xs"
        >
          Skip <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Center Branding Hero */}
      <div className="flex flex-col items-center justify-center px-6 text-center -mt-8">
        {/* Circular Light Cream Badge with Simplified Metro Train Icon */}
        <div className="relative w-28 h-28 rounded-full bg-[#FFFDF7] border-4 border-white shadow-[0_12px_32px_rgba(7,59,115,0.12)] flex items-center justify-center mb-6 transform transition-transform hover:scale-105">
          <div className="w-18 h-18 rounded-full bg-gradient-to-br from-[#073B73] to-[#008C8C] flex items-center justify-center p-3 text-white shadow-inner">
            <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
              <rect x="7" y="5" width="22" height="23" rx="5" fill="#FFFFFF" />
              <path d="M10 9H26V16C26 16.5 25.5 17 25 17H11C10.5 17 10 16.5 10 16V9Z" fill="#073B73" />
              <rect x="13" y="7" width="10" height="1.5" rx="0.5" fill="#22B573" />
              <circle cx="12.5" cy="22.5" r="2" fill="#F4C542" />
              <circle cx="23.5" cy="22.5" r="2" fill="#F4C542" />
              <path d="M16.5 20.5H19.5" stroke="#008C8C" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="10" y="28" width="4" height="3" rx="1" fill="#062D59" />
              <rect x="22" y="28" width="4" height="3" rx="1" fill="#062D59" />
              <path d="M5 32H31" stroke="#22B573" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          {/* Subtle gold badge highlight */}
          <span className="absolute top-2 right-3 w-3 h-3 bg-[#F4C542] rounded-full ring-2 ring-white" />
        </div>

        {/* Text */}
        <h1 className="text-3xl font-extrabold text-[#073B73] tracking-tight font-heading">
          SMART METRO
        </h1>
        <p className="text-sm font-semibold text-[#008C8C] mt-1.5 tracking-wide">
          “Smarter Travel. A Better Tomorrow.”
        </p>
        <p className="text-xs text-[#61758A] mt-2 max-w-[240px] leading-relaxed">
          Real-time routes, live train headway, and seamless digital travel.
        </p>

        {/* Loading bar animation */}
        <div className="w-48 h-1.5 bg-[#D9E5EE] rounded-full overflow-hidden mt-6 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#073B73] via-[#008C8C] to-[#22B573] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] font-medium text-slate-400 mt-1.5">
          Initializing Pune Transit Corridors…
        </span>
      </div>

      {/* Bottom Train moving toward city skyline illustration */}
      <div className="w-full">
        <SkylineMetroIllustration className="h-28" />
        <div className="bg-[#073B73] pb-6 pt-2 text-center text-[11px] text-[#DDF6F2]/80">
          Fast • Safe • Accessible
        </div>
      </div>
    </div>
  );
};
