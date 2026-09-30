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
    <header className="bg-white border-b border-stone-200/80 sticky top-0 z-40 shadow-xs">
      {/* Top Banner with Food Brand Identity */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          {/* Subtle Food Plate & Steam Emblem */}
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 text-white flex items-center justify-center shadow-md shadow-brand-600/20 relative">
            <Utensils className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-2xl font-extrabold text-stone-900 tracking-tight">
                Apni Rasoi
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-50 text-brand-700 border border-brand-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-600"></span>
                Hostel Mess Platform
              </span>
            </div>
            <p className="text-xs text-stone-500 font-medium">
              Fresh, anonymous student meal feedback & menu planning
            </p>
          </div>
        </div>

        {/* Live Active Meal Status & Quick Controls */}
        <div className="flex items-center gap-2.5 text-xs">
          {activeSession && (
            <div className="flex items-center gap-2 bg-orange-50/80 border border-orange-200/80 text-orange-950 px-3 py-1.5 rounded-xl font-medium shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span>
                <strong>{activeSession.mealName}</strong> Active ({activeSession.windowStart}–{activeSession.windowEnd})
              </span>
              <span className="bg-white px-2 py-0.5 rounded-md text-orange-800 border border-orange-200 font-bold text-[11px]">
                {activeSession.scanCount} Scans
              </span>
            </div>
          )}

          {/* Mobile Frame Preview Toggle (Student Only) */}
          {activeRole === 'student' && (
            <button
              onClick={() => setIsMobileFrameView(!isMobileFrameView)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 font-semibold transition shadow-2xs"
              title="Toggle mobile view simulation"
            >
              {isMobileFrameView ? (
                <>
                  <Monitor className="w-3.5 h-3.5 text-brand-600" />
                  <span className="hidden md:inline">Full Width</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-brand-600" />
                  <span className="hidden md:inline">Mobile Frame</span>
                </>
              )}
            </button>
          )}

          {/* Demo Switcher */}
          <button
            onClick={onOpenDemoModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold transition shadow-sm border border-stone-800"
          >
            <Sliders className="w-3.5 h-3.5 text-brand-400" />
            <span className="hidden md:inline">Demo Scenarios</span>
          </button>
        </div>
      </div>

      {/* Role Navigation Bar with Clean White / Warm Accents */}
      <div className="bg-stone-50/70 border-t border-stone-200/70">
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
                      ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/25'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white border border-transparent hover:border-stone-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>

          {/* Student ID Badge */}
          {activeRole === 'student' && (
            <div className="text-xs text-stone-500 flex items-center gap-1.5 min-w-max pl-2 border-l border-stone-200">
              <span className="w-2 h-2 rounded-full bg-brand-500"></span>
              <span>Anonymous ID:</span>
              <strong className="text-brand-900 font-mono bg-brand-50 px-2 py-0.5 rounded-md border border-brand-200/80 font-bold">
                {currentStudent?.anonId || 'ANON-7842'}
              </strong>
            </div>
          )}

          {activeRole === 'warden' && (
            <div className="text-xs text-stone-700 bg-white border border-stone-200 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 min-w-max">
              <Eye className="w-3.5 h-3.5 text-brand-600" />
              <span>Warden Oversight Active</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
