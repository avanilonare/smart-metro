import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  Send,
  AlertCircle
} from 'lucide-react';
import { FAQS } from '../data/metroData';

export const HelpSupportScreen: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [supportMessage, setSupportMessage] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    setFeedbackSent(true);
    setSupportMessage('');
    setTimeout(() => setFeedbackSent(false), 3000);
  };

  return (
    <div className="space-y-4 pb-24 px-4 pt-3 max-w-md mx-auto select-none">
      <div>
        <h2 className="text-xl font-bold text-[#102A43] font-heading">
          Help & Support
        </h2>
        <p className="text-xs text-[#61758A]">
          Passenger guide, FAQs and transit assistance
        </p>
      </div>

      {/* Emergency Transit Helpline Card */}
      <div className="bg-[#E7F7FA] border border-[#008C8C]/20 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#008C8C] text-white flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#073B73] block">
              Pune Metro Toll-Free Helpline
            </span>
            <span className="text-sm font-extrabold text-[#102A43] font-mono">
              1800 270 5555
            </span>
          </div>
        </div>
        <span className="text-[10px] font-bold text-[#22B573] bg-[#22B573]/15 px-2 py-0.5 rounded-full">
          24x7
        </span>
      </div>

      {/* Frequently Asked Questions */}
      <div>
        <h3 className="text-sm font-bold text-[#102A43] font-heading mb-2.5">
          Frequently Asked Questions
        </h3>

        <div className="space-y-2">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#D9E5EE] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="text-xs font-bold text-[#102A43] pr-2">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#008C8C] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-3.5 pb-3.5 pt-1 text-xs text-[#61758A] leading-relaxed border-t border-slate-100 bg-[#F7FAFC] animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Support Prototype Card */}
      <div className="bg-white rounded-2xl border border-[#D9E5EE] p-4 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-4 h-4 text-[#073B73]" />
          <h3 className="text-sm font-bold text-[#102A43] font-heading">
            Contact Passenger Support
          </h3>
        </div>
        <p className="text-xs text-[#61758A] mb-3">
          Have an inquiry regarding routes, smart cards or accessibility? Send us a quick note.
        </p>

        {feedbackSent ? (
          <div className="p-3 bg-[#DDF6F2] rounded-xl text-xs text-[#073B73] font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#22B573] shrink-0" />
            Thank you! Your demo support ticket #SM-2026 has been logged.
          </div>
        ) : (
          <form onSubmit={handleSendFeedback} className="space-y-2.5">
            <textarea
              value={supportMessage}
              onChange={(e) => setSupportMessage(e.target.value)}
              placeholder="Describe your question or feedback..."
              rows={3}
              className="w-full p-2.5 bg-[#F7FAFC] border border-[#D9E5EE] rounded-xl text-xs text-[#102A43] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#008C8C]"
            />
            <button
              type="submit"
              disabled={!supportMessage.trim()}
              className="w-full py-2.5 bg-[#073B73] hover:bg-[#062D59] disabled:bg-slate-200 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5" /> Submit Inquiry (Prototype)
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
