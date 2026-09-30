import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  QrCode,
  Utensils,
  Clock,
  Sparkles,
  ShieldCheck,
  Smartphone,
  ChevronRight,
  Flame,
  CheckCircle2
} from 'lucide-react';

export default function KioskDisplay() {
  const { activeSession, setActiveRole } = useApp();
  const [rotatingCode, setRotatingCode] = useState('903');

  useEffect(() => {
    const interval = setInterval(() => {
      // simulate rotating 3-digit verification token every 30s
      setRotatingCode(Math.floor(100 + Math.random() * 900).toString());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const getDishBadgeClass = (index) => {
    const colors = [
      'bg-emerald-50 text-emerald-900 border-emerald-300',
      'bg-amber-50 text-amber-900 border-amber-300',
      'bg-orange-50 text-orange-900 border-orange-300',
      'bg-teal-50 text-teal-900 border-teal-300',
      'bg-purple-50 text-purple-900 border-purple-300',
      'bg-rose-50 text-rose-900 border-rose-300'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white border border-emerald-300/80 rounded-3xl p-6 sm:p-10 shadow-2xl text-center relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Utensils className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-slate-900 font-heading">Apni Rasoi Mess Counter</h1>
              <p className="text-xs text-slate-500 font-medium">Hostel Central Dining Hall • Live Diner Feedback Station</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="badge-status badge-green text-xs py-1.5 px-3.5 bg-emerald-100 text-emerald-950 border-emerald-300 shadow-2xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              {activeSession.mealName} Active
            </span>
          </div>
        </div>

        {/* QR Code & Scan Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50/60 via-slate-50 to-teal-50/50 p-6 rounded-3xl border border-emerald-200 shadow-inner">
            {/* High-res SVG QR Code Representation */}
            <div className="bg-white p-5 rounded-2xl shadow-xl border border-slate-200 mb-4">
              <svg className="w-48 h-48 sm:w-56 sm:h-56 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                {/* Patterned QR Code SVG */}
                <rect x="0" y="0" width="30" height="30" rx="4" />
                <rect x="5" y="5" width="20" height="20" fill="white" />
                <rect x="9" y="9" width="12" height="12" />
                
                <rect x="70" y="0" width="30" height="30" rx="4" />
                <rect x="75" y="5" width="20" height="20" fill="white" />
                <rect x="79" y="9" width="12" height="12" />

                <rect x="0" y="70" width="30" height="30" rx="4" />
                <rect x="5" y="75" width="20" height="20" fill="white" />
                <rect x="9" y="79" width="12" height="12" />

                <rect x="36" y="8" width="6" height="14" />
                <rect x="46" y="4" width="8" height="8" />
                <rect x="58" y="12" width="6" height="18" />

                <rect x="36" y="36" width="28" height="28" rx="4" fill="#16a34a" />
                <circle cx="50" cy="50" r="8" fill="white" />

                <rect x="8" y="38" width="14" height="6" />
                <rect x="14" y="50" width="8" height="12" />

                <rect x="72" y="38" width="12" height="8" />
                <rect x="86" y="50" width="10" height="14" />

                <rect x="38" y="74" width="8" height="18" />
                <rect x="52" y="80" width="14" height="10" />
                <rect x="72" y="74" width="20" height="8" />
                <rect x="80" y="86" width="14" height="8" />
              </svg>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs">
              <span>Token: {activeSession.qrToken}</span>
              <span>•</span>
              <span className="text-emerald-700 font-extrabold">Code: #{rotatingCode}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 text-center font-medium">
              Scan with your smartphone camera • Window closes at {activeSession.windowEnd}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                ⚡ 10-Second Feedback Flow
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-2 font-heading">
                Scan to Rate Today's {activeSession.mealName}
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Rate in 1 tap, choose reason chips, and help improve tonight's dinner. 100% anonymous & verified.
              </p>
            </div>

            {/* Today's Menu Highlight with Colorful Badges */}
            <div className="bg-gradient-to-br from-slate-50 to-amber-50/30 p-4 rounded-2xl border border-slate-200/90 shadow-xs">
              <span className="text-xs font-bold text-slate-700 block mb-2.5">Today's Menu Items:</span>
              <div className="flex flex-wrap gap-2">
                {activeSession.dishes.map((dish, i) => (
                  <span key={i} className={`text-xs px-3 py-1 rounded-xl border font-semibold shadow-2xs ${getDishBadgeClass(i)}`}>
                    • {dish}
                  </span>
                ))}
              </div>
            </div>

            {/* Simulated Mobile Scan Button */}
            <div className="pt-2">
              <button
                onClick={() => setActiveRole('student')}
                className="w-full btn-primary py-3.5 rounded-2xl text-sm font-extrabold shadow-xl shadow-emerald-600/25 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-700 hover:to-teal-700 flex items-center justify-center gap-2 transition-all"
              >
                <Smartphone className="w-4 h-4" />
                <span>Simulate Student QR Scan (Open Student Portal)</span>
                <ChevronRight className="w-4 h-4 ml-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

