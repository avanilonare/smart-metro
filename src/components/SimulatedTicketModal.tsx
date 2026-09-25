import React, { useState, useEffect } from 'react';
import { X, QrCode, CheckCircle, Clock, ShieldCheck, Download, Share2 } from 'lucide-react';
import { DigitalTicket } from '../data/metroData';

interface SimulatedTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket?: DigitalTicket | null;
}

export const SimulatedTicketModal: React.FC<SimulatedTicketModalProps> = ({
  isOpen,
  onClose,
  ticket
}) => {
  const [copied, setCopied] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(7140); // ~1h 59m

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const activeTicket: DigitalTicket = ticket || {
    id: 'TKT-9428-PUN',
    type: 'Single Journey Ticket',
    fromStation: 'Shivajinagar',
    toStation: 'Vanaz',
    fare: 30,
    purchasedAt: 'Today, 12:40 PM',
    validUntil: 'Today, 02:40 PM',
    qrCodeValue: 'SMARTMETRO-2026-SHIV-VANAZ-9428',
    bookingRef: 'SM2677109',
    status: 'ACTIVE',
    passenger: 'Avani'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none animate-in fade-in duration-150">
      <div className="fixed inset-0 bg-black/65 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl z-10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header Ribbon */}
        <div className="bg-[#073B73] px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#22B573] flex items-center justify-center text-white">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wide font-heading">Digital Metro Ticket</h3>
              <p className="text-[10px] text-[#DDF6F2]">Pune Metro AFC QR Pass</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Ticket Body */}
        <div className="p-5 text-[#102A43]">
          {/* Validity Badge */}
          <div className="flex items-center justify-between bg-[#E7F7FA] border border-[#008C8C]/20 rounded-xl p-2.5 mb-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#073B73]">
              <Clock className="w-4 h-4 text-[#008C8C]" />
              <span>Valid for: {formatTimer(secondsRemaining)}</span>
            </div>
            <span className="text-[10px] font-bold bg-[#22B573] text-white px-2 py-0.5 rounded-full">
              {activeTicket.status}
            </span>
          </div>

          {/* Journey Path */}
          <div className="text-center pb-4 border-b border-dashed border-[#D9E5EE]">
            <div className="flex items-center justify-center gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#61758A] font-semibold">From</p>
                <p className="text-base font-bold text-[#073B73] font-heading">
                  {activeTicket.fromStation}
                </p>
              </div>
              <div className="text-[#008C8C] font-bold">→</div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#61758A] font-semibold">To</p>
                <p className="text-base font-bold text-[#073B73] font-heading">
                  {activeTicket.toStation}
                </p>
              </div>
            </div>
            <div className="mt-2 text-xs font-medium text-[#61758A]">
              Passenger: <span className="text-[#102A43] font-semibold">{activeTicket.passenger}</span> · Fare:{' '}
              <span className="text-[#22B573] font-bold">₹{activeTicket.fare}</span>
            </div>
          </div>

          {/* Interactive QR Code Card */}
          <div className="my-4 p-4 bg-[#F7FAFC] border-2 border-dashed border-[#D9E5EE] rounded-2xl flex flex-col items-center relative overflow-hidden group">
            {/* Animated Laser Scanning Beam */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#22B573] to-transparent opacity-80 animate-bounce" />

            {/* Stylized QR Code Matrix */}
            <div className="w-44 h-44 bg-white p-3 rounded-xl shadow-inner border border-slate-200 flex flex-col items-center justify-center relative">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#073B73]">
                {/* QR Corner Anchor 1 */}
                <rect x="5" y="5" width="26" height="26" rx="4" fill="#073B73" />
                <rect x="9" y="9" width="18" height="18" rx="2" fill="#FFFFFF" />
                <rect x="13" y="13" width="10" height="10" rx="1" fill="#073B73" />

                {/* QR Corner Anchor 2 */}
                <rect x="69" y="5" width="26" height="26" rx="4" fill="#073B73" />
                <rect x="73" y="9" width="18" height="18" rx="2" fill="#FFFFFF" />
                <rect x="77" y="13" width="10" height="10" rx="1" fill="#073B73" />

                {/* QR Corner Anchor 3 */}
                <rect x="5" y="69" width="26" height="26" rx="4" fill="#073B73" />
                <rect x="9" y="73" width="18" height="18" rx="2" fill="#FFFFFF" />
                <rect x="13" y="77" width="10" height="10" rx="1" fill="#073B73" />

                {/* Center Metro Insignia */}
                <circle cx="50" cy="50" r="14" fill="#22B573" />
                <path d="M44 50H56" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M50 44V56" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

                {/* Simulated Data Blocks */}
                <rect x="36" y="8" width="6" height="6" rx="1" fill="#062D59" />
                <rect x="46" y="8" width="6" height="6" rx="1" fill="#062D59" />
                <rect x="56" y="8" width="6" height="6" rx="1" fill="#062D59" />
                <rect x="36" y="20" width="8" height="8" rx="1" fill="#062D59" />
                <rect x="52" y="22" width="6" height="6" rx="1" fill="#062D59" />

                <rect x="8" y="38" width="8" height="8" rx="1" fill="#062D59" />
                <rect x="22" y="44" width="6" height="6" rx="1" fill="#062D59" />
                <rect x="72" y="38" width="8" height="8" rx="1" fill="#062D59" />
                <rect x="84" y="44" width="8" height="8" rx="1" fill="#062D59" />

                <rect x="38" y="72" width="8" height="8" rx="1" fill="#062D59" />
                <rect x="52" y="76" width="6" height="6" rx="1" fill="#062D59" />
                <rect x="74" y="74" width="14" height="6" rx="1" fill="#062D59" />
                <rect x="76" y="86" width="12" height="6" rx="1" fill="#062D59" />
              </svg>
            </div>

            <p className="mt-2 text-[11px] font-mono font-medium text-slate-500">
              Ref: {activeTicket.bookingRef}
            </p>
          </div>

          {/* Instructions */}
          <div className="flex items-start gap-2 text-xs text-[#61758A] bg-[#F7FAFC] p-3 rounded-xl border border-[#D9E5EE]">
            <ShieldCheck className="w-4 h-4 text-[#22B573] shrink-0 mt-0.5" />
            <span>Hold phone screen 5 cm over the AFC turnstile scanner at entry & exit.</span>
          </div>

          {/* Action buttons */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="py-2.5 px-3 rounded-xl border border-[#D9E5EE] text-xs font-semibold text-[#073B73] hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copied ? 'Copied Ticket!' : 'Share Pass'}
            </button>
            <button
              onClick={onClose}
              className="py-2.5 px-3 rounded-xl bg-[#073B73] text-white text-xs font-semibold hover:bg-[#062D59] shadow-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
