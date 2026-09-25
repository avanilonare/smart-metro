import React, { useState } from 'react';
import { Ticket, QrCode, Clock, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import { DEMO_TICKETS, DigitalTicket } from '../data/metroData';

interface MyTicketsScreenProps {
  onOpenTicketQr: (ticket: DigitalTicket) => void;
  onBuyNewTicket: () => void;
}

export const MyTicketsScreen: React.FC<MyTicketsScreenProps> = ({
  onOpenTicketQr,
  onBuyNewTicket
}) => {
  const [tickets, setTickets] = useState<DigitalTicket[]>(DEMO_TICKETS);

  return (
    <div className="space-y-4 pb-24 px-4 pt-3 max-w-md mx-auto select-none">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#102A43] font-heading">
            My Tickets
          </h2>
          <p className="text-xs text-[#61758A]">
            Digital QR tickets and transit passes
          </p>
        </div>

        <button
          onClick={onBuyNewTicket}
          className="p-2 rounded-xl bg-[#073B73] text-white hover:bg-[#062D59] text-xs font-bold flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Book</span>
        </button>
      </div>

      <div className="space-y-3">
        {tickets.map((t) => {
          const isActive = t.status === 'ACTIVE';

          return (
            <div
              key={t.id}
              onClick={() => onOpenTicketQr(t)}
              role="button"
              tabIndex={0}
              className={`p-4 bg-white rounded-2xl border transition-all cursor-pointer shadow-xs group ${
                isActive
                  ? 'border-[#22B573] ring-1 ring-[#22B573]/20'
                  : 'border-[#D9E5EE] opacity-75'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-dashed border-slate-200">
                <div className="flex items-center gap-2">
                  <Ticket className={`w-4 h-4 ${isActive ? 'text-[#22B573]' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold text-[#102A43] font-heading">
                    {t.type}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[#22B573] text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {t.status}
                </span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#073B73] font-heading">
                    {t.fromStation} → {t.toStation}
                  </p>
                  <p className="text-[11px] text-[#61758A] mt-0.5">
                    Purchased: {t.purchasedAt}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-[#102A43] font-heading block">
                    ₹{t.fare}
                  </span>
                  <span className="text-[10px] text-slate-400">Paid via UPI</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-[#61758A] flex items-center gap-1 font-mono">
                  {t.bookingRef}
                </span>
                <span className="text-[#008C8C] font-bold flex items-center gap-1 group-hover:underline">
                  <QrCode className="w-3.5 h-3.5" /> Tap to Scan
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 bg-[#E7F7FA] rounded-2xl border border-[#D9E5EE] text-center text-xs text-[#073B73]">
        Single journey QR tickets must be scanned at entry within 120 minutes of booking.
      </div>
    </div>
  );
};
