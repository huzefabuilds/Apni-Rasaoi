import React, { useState, useEffect } from 'react';
import { Utensils, ShieldCheck, Sparkles, Flame, CheckCircle2 } from 'lucide-react';

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing campus mess node...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const statuses = [
      { at: 15, text: 'Connecting to Hostel Dining Node...' },
      { at: 45, text: 'Syncing today’s meal schedule & dishes...' },
      { at: 75, text: 'Encrypting DPDP anonymous tokens...' },
      { at: 95, text: 'Ready! Welcome to Apni Rasoi' },
      { at: 100, text: 'Launching...' }
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 4, 100);
        const match = statuses.findLast((s) => next >= s.at);
        if (match) setStatusText(match.text);

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              onFinish?.();
            }, 500);
          }, 400);
        }
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#0B0F19] flex flex-col items-center justify-center p-6 select-none transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient Lighting Rings */}
      <div className="absolute w-[360px] h-[360px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute w-[280px] h-[280px] bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
        {/* Animated Brand Emblem with Rotating Gradient Border */}
        <div className="relative mb-6">
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-500 rounded-3xl blur-md opacity-75 animate-spin duration-[6000ms]"></div>
          
          <div className="relative w-20 h-20 rounded-2xl bg-[#131B2E] border-2 border-emerald-400/50 flex items-center justify-center shadow-2xl">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/40">
              <Utensils className="w-7 h-7 stroke-[2.5]" />
            </div>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-[#131B2E] flex items-center justify-center animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-[#131B2E]"></span>
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-200 bg-clip-text text-transparent">
          Apni Rasoi
        </h1>
        <p className="text-xs text-emerald-400 font-semibold mt-1 tracking-wide uppercase flex items-center gap-1.5 justify-center">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Campus Dining Intelligence</span>
        </p>

        {/* Loading Progress Bar */}
        <div className="w-full mt-8 bg-[#162035] p-1 rounded-full border border-[#28375A] shadow-inner">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-all duration-100 shadow-md shadow-emerald-500/30"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Status Text & Percentage */}
        <div className="flex items-center justify-between w-full mt-3 text-xs">
          <span className="text-slate-400 font-medium text-[11px] truncate">{statusText}</span>
          <span className="text-amber-400 font-mono font-bold text-xs ml-2">{progress}%</span>
        </div>

        {/* DPDP Compliance & Privacy Footer */}
        <div className="mt-10 inline-flex items-center gap-2 bg-[#131B2E]/90 px-3.5 py-1.5 rounded-full border border-[#28375A] text-[11px] text-slate-400 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>100% Anonymous & DPDP Shielded</span>
        </div>
      </div>
    </div>
  );
}
