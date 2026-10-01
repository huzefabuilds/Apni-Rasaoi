import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Utensils,
  ShieldCheck,
  UserCheck,
  ChefHat,
  Eye,
  QrCode,
  Smartphone,
  Monitor,
  Sliders,
  Sparkles
} from 'lucide-react';

export default function Navbar({ onOpenDemoModal }) {
  const {
    activeRole,
    setActiveRole,
    isMobileFrameView,
    setIsMobileFrameView,
    activeSession,
    currentStudent
  } = useApp();

  const roles = [
    { id: 'student', label: 'Student Portal', icon: UserCheck, desc: 'Rate & Vote' },
    { id: 'manager', label: 'Mess Manager', icon: ChefHat, desc: 'Daily Briefing' },
    { id: 'warden', label: 'Warden Oversight', icon: Eye, desc: 'Audit & Override' },
    { id: 'admin', label: 'Platform Admin', icon: ShieldCheck, desc: 'Campus Setup' },
    { id: 'kiosk', label: 'Dining Hall QR', icon: QrCode, desc: 'Live Display' }
  ];

  return (
    <header className="bg-[#131B2E] border-b border-[#233252] sticky top-0 z-40 shadow-2xl">
      {/* Top Banner with Food Brand Identity */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 font-black flex items-center justify-center shadow-lg shadow-emerald-500/25 relative">
            <Utensils className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-[#131B2E] animate-pulse"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-2xl font-extrabold text-white tracking-tight">
                Apni Rasoi
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Hostel Mess Platform
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Fresh, anonymous student meal feedback & menu planning
            </p>
          </div>
        </div>

        {/* Live Active Meal Status & Quick Controls */}
        <div className="flex items-center gap-2.5 text-xs">
          {activeSession && (
            <div className="flex items-center gap-2 bg-[#0E1524] border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-xl font-medium shadow-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>
                <strong className="text-white">{activeSession.mealName}</strong> Active ({activeSession.windowStart}–{activeSession.windowEnd})
              </span>
              <span className="bg-[#162035] px-2 py-0.5 rounded-md text-amber-300 border border-amber-500/30 font-bold text-[11px]">
                {activeSession.scanCount} Scans
              </span>
            </div>
          )}

          {/* Mobile Frame Preview Toggle (Student Only) */}
          {activeRole === 'student' && (
            <button
              onClick={() => setIsMobileFrameView(!isMobileFrameView)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#28375A] bg-[#162035] hover:bg-[#1E2B47] text-slate-200 font-semibold transition shadow-sm"
              title="Toggle mobile view simulation"
            >
              {isMobileFrameView ? (
                <>
                  <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden md:inline">Full Width</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden md:inline">Mobile Frame</span>
                </>
              )}
            </button>
          )}

          {/* Demo Switcher */}
          <button
            onClick={onOpenDemoModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold transition shadow-lg shadow-amber-500/20"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Demo Scenarios</span>
          </button>
        </div>
      </div>

      {/* Role Navigation Bar */}
      <div className="bg-[#0E1524] border-t border-[#233252]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between overflow-x-auto py-1.5 gap-2 scrollbar-none">
          <div className="flex items-center gap-1 min-w-max">
            {roles.map((r) => {
              const Icon = r.icon;
              const isActive = activeRole === r.id;

              return (
                <button
                  key={r.id}
                  onClick={() => setActiveRole(r.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/40 border border-emerald-400/40'
                      : 'text-slate-300 hover:text-white hover:bg-[#162035] border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>

          {/* Student ID Badge */}
          {activeRole === 'student' && (
            <div className="text-xs text-slate-400 flex items-center gap-1.5 min-w-max pl-2 border-l border-[#233252]">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Anonymous ID:</span>
              <strong className="text-amber-300 font-mono bg-[#162035] px-2 py-0.5 rounded-md border border-[#28375A] font-bold">
                {currentStudent?.anonId || 'ANON-7842'}
              </strong>
            </div>
          )}

          {activeRole === 'warden' && (
            <div className="text-xs text-indigo-300 bg-[#162035] border border-indigo-500/30 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 min-w-max">
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              <span>Warden Oversight Active</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
