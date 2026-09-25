import React, { useState } from 'react';
import {
  Ticket,
  Bookmark,
  Settings,
  HelpCircle,
  ChevronRight,
  LogOut,
  User,
  Shield,
  Smartphone,
  Check
} from 'lucide-react';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
  onOpenMyTickets: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigate,
  onOpenMyTickets
}) => {
  const [loggedOutNotice, setLoggedOutNotice] = useState(false);

  const handleLogout = () => {
    setLoggedOutNotice(true);
    setTimeout(() => setLoggedOutNotice(false), 2500);
  };

  return (
    <div className="space-y-4 pb-24 px-4 pt-3 max-w-md mx-auto select-none">
      {/* Profile Header Section */}
      <div className="bg-white rounded-3xl p-5 border border-[#D9E5EE] shadow-sm flex items-center gap-4">
        {/* Circular Avatar Containing 'A' */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#073B73] to-[#008C8C] flex items-center justify-center text-white text-2xl font-bold font-heading shadow-md ring-4 ring-[#DDF6F2]">
            A
          </div>
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#22B573] rounded-full ring-2 ring-white" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#102A43] font-heading">
            Avani
          </h2>
          <p className="text-xs text-[#61758A] mt-0.5">
            View and edit profile
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] font-bold bg-[#DDF6F2] text-[#073B73] px-2 py-0.5 rounded-full">
              Student Smart Pass
            </span>
            <span className="text-[10px] text-slate-400">Pune Metro Member</span>
          </div>
        </div>
      </div>

      {/* Profile Action Cards */}
      <div className="space-y-2.5">
        {/* 1. My Tickets */}
        <button
          onClick={onOpenMyTickets}
          className="w-full bg-white p-4 rounded-2xl border border-[#D9E5EE] hover:border-[#008C8C] active:scale-99 flex items-center justify-between transition-all shadow-2xs group text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#DDF6F2] text-[#008C8C] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#102A43] font-heading">
                My Tickets
              </h3>
              <p className="text-xs text-[#61758A] mt-0.5">
                View past & active tickets
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold bg-[#22B573] text-white px-2 py-0.5 rounded-full">
              1 Active
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>

        {/* 2. Saved Routes */}
        <button
          onClick={() => onNavigate('saved-routes')}
          className="w-full bg-white p-4 rounded-2xl border border-[#D9E5EE] hover:border-[#008C8C] active:scale-99 flex items-center justify-between transition-all shadow-2xs group text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#E7F7FA] text-[#073B73] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#102A43] font-heading">
                Saved Routes
              </h3>
              <p className="text-xs text-[#61758A] mt-0.5">
                Your favourite routes
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* 3. Settings */}
        <button
          onClick={() => onNavigate('settings')}
          className="w-full bg-white p-4 rounded-2xl border border-[#D9E5EE] hover:border-[#008C8C] active:scale-99 flex items-center justify-between transition-all shadow-2xs group text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#F7FAFC] text-slate-700 border border-[#D9E5EE] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#102A43] font-heading">
                Settings
              </h3>
              <p className="text-xs text-[#61758A] mt-0.5">
                App preferences
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* 4. Help & Support */}
        <button
          onClick={() => onNavigate('help-support')}
          className="w-full bg-white p-4 rounded-2xl border border-[#D9E5EE] hover:border-[#008C8C] active:scale-99 flex items-center justify-between transition-all shadow-2xs group text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center group-hover:scale-105 transition-transform">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#102A43] font-heading">
                Help & Support
              </h3>
              <p className="text-xs text-[#61758A] mt-0.5">
                FAQs and contact
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Logout Notice Feedback */}
      {loggedOutNotice && (
        <div className="p-3 bg-[#DDF6F2] rounded-xl text-xs text-[#073B73] font-semibold flex items-center justify-center gap-1.5 animate-in fade-in">
          <Check className="w-4 h-4 text-[#22B573]" /> Demo profile session reset successfully.
        </div>
      )}

      {/* Bottom Light-Colored Log Out Button */}
      <div className="pt-2">
        <button
          onClick={handleLogout}
          className="w-full py-3.5 px-4 bg-[#F7FAFC] hover:bg-slate-100 active:scale-98 text-[#E05252] border border-[#D9E5EE] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
        <p className="text-center text-[10px] text-slate-400 mt-2">
          College Prototype Demo Account • No online sign-in needed
        </p>
      </div>
    </div>
  );
};
