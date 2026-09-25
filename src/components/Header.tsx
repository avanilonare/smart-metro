import React, { useState } from 'react';
import { ArrowLeft, Bell, Menu, Train, X, CheckCircle2, Info } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  onOpenDrawer?: () => void;
  onOpenAbout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBack,
  onOpenDrawer,
  onOpenAbout
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 'n1',
      title: 'Line 1 Operations',
      desc: 'Normal headway of 8 minutes maintained on Shivajinagar - Vanaz section.',
      time: '5m ago',
      type: 'success'
    },
    {
      id: 'n2',
      title: 'Digital Smart Card Pass',
      desc: 'Get 10% cash rebate on UPI recharge before 11 AM.',
      time: '1h ago',
      type: 'info'
    },
    {
      id: 'n3',
      title: 'Civil Court Interchange',
      desc: 'Seamless transfers active between Elevated and Underground platforms.',
      time: '3h ago',
      type: 'info'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#062D59] text-white shadow-md select-none">
      <div className="flex items-center justify-between px-4 h-14 max-w-md mx-auto">
        {/* Left Section */}
        <div className="flex items-center gap-2.5">
          {showBack ? (
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-all text-white"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onOpenDrawer}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-all text-white"
              aria-label="Open menu drawer"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {!showBack ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#E7F7FA] flex items-center justify-center text-[#073B73] shadow-inner">
                <Train className="w-4 h-4 text-[#073B73]" />
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-white font-heading">
                  Smart Metro
                </span>
                <span className="block text-[10px] text-[#DDF6F2]/80 leading-none">
                  Pune transit portal
                </span>
              </div>
            </div>
          ) : (
            <h1 className="text-base font-semibold text-white truncate max-w-[200px]">
              {title || 'Smart Metro'}
            </h1>
          )}
        </div>

        {/* Right Section: Notification & About trigger */}
        <div className="flex items-center gap-1.5">
          {onOpenAbout && (
            <button
              onClick={onOpenAbout}
              className="px-2 py-1 text-[11px] font-medium bg-[#008C8C]/40 text-[#DDF6F2] hover:bg-[#008C8C]/60 rounded-md transition-colors"
              title="About College Project"
            >
              About
            </button>
          )}

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-all text-white"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4 text-white" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#F4C542] rounded-full ring-2 ring-[#062D59]" />
            </button>

            {/* Notification Drawer Modal */}
            {showNotifications && (
              <div className="absolute right-0 top-11 w-80 bg-white rounded-2xl shadow-2xl border border-[#D9E5EE] p-3.5 z-50 text-[#102A43] animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D9E5EE]">
                  <div className="flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-[#073B73]" />
                    <span className="text-xs font-bold text-[#102A43]">Metro Advisories</span>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-xl bg-[#F7FAFC] border border-[#D9E5EE] text-left"
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        {item.type === 'success' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#22B573]" />
                        ) : (
                          <Info className="w-3.5 h-3.5 text-[#008C8C]" />
                        )}
                        <span className="text-xs font-semibold text-[#102A43]">{item.title}</span>
                        <span className="ml-auto text-[10px] text-slate-400">{item.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#D9E5EE] flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Live service feeds</span>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-[#073B73] font-semibold hover:underline"
                  >
                    Mark as read
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
