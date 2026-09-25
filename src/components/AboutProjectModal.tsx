import React from 'react';
import { X, GraduationCap, Award, Compass, CheckCircle2, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { PROJECT_DETAILS } from '../data/metroData';
import { MetroLogo } from './Branding';

interface AboutProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutProjectModal: React.FC<AboutProjectModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none animate-in fade-in duration-150">
      <div className="fixed inset-0 bg-black/65 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header Ribbon */}
        <div className="bg-[#073B73] px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MetroLogo size="sm" />
            <div>
              <h3 className="text-base font-bold font-heading leading-tight">About Smart Metro</h3>
              <p className="text-[11px] text-[#DDF6F2]">College Project Vision & Prototype</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-[#102A43]">
          {/* Institutional Credential Banner */}
          <div className="bg-[#E7F7FA] border border-[#008C8C]/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#073B73]">
              <GraduationCap className="w-4 h-4 text-[#008C8C]" />
              <span>ACADEMIC PROJECT PROFILE</span>
            </div>
            <p className="text-sm font-bold text-[#062D59] mt-1">
              {PROJECT_DETAILS.institution}
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-[#61758A] mt-2">
              <span className="bg-white px-2 py-0.5 rounded-md border border-[#D9E5EE]">
                Dept: {PROJECT_DETAILS.department}
              </span>
              <span className="bg-white px-2 py-0.5 rounded-md border border-[#D9E5EE]">
                Academic Year: {PROJECT_DETAILS.academicYear}
              </span>
            </div>
          </div>

          {/* Project Vision Statement */}
          <div className="bg-[#FFFDF7] border-2 border-[#F4C542] rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#073B73] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-[#F4C542]" />
              <span>Future Vision</span>
            </div>
            <p className="text-xs font-semibold text-[#102A43] leading-relaxed">
              &ldquo;Smart Metro is designed as a future-ready metro assistance platform that can combine route planning, station information, live metro information, ticket/fare estimation and AI-powered journey assistance.&rdquo;
            </p>
          </div>

          {/* Project Objective */}
          <div className="bg-[#F7FAFC] border border-[#D9E5EE] rounded-xl p-3.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#61758A] mb-1">
              Project Objective
            </h5>
            <p className="text-xs text-[#102A43] leading-relaxed">
              {PROJECT_DETAILS.objective}
            </p>
          </div>

          {/* Future Integration Roadmap */}
          <div className="bg-[#DDF6F2]/60 border border-[#008C8C]/30 rounded-2xl p-4 space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#073B73] flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#008C8C]" />
              Future Roadmap Integrations
            </h5>
            <p className="text-xs text-[#61758A]">
              Future versions of the platform could integrate:
            </p>
            <ul className="space-y-1.5 pt-1">
              {[
                'Official metro APIs',
                'Real-time train locations',
                'Real-time fares',
                'Live service alerts',
                'AI-powered journey recommendations'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs font-medium text-[#102A43]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22B573] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clear Disclaimer Note */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <p className="text-[11px] text-slate-500 leading-normal">
              <strong>College Prototype Notice:</strong> Live GPS telemetry, fares, and transit data in this build are structured demonstration data for academic presentation and do not claim to be official live Pune Metro operational feeds.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F7FAFC] border-t border-[#D9E5EE] flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-[#073B73] hover:bg-[#062D59] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
          >
            Close Project Overview
          </button>
        </div>
      </div>
    </div>
  );
};
