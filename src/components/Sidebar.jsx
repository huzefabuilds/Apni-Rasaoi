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
  Sparkles,
  Calendar,
  Vote,
  TrendingUp,
  Clock,
  Shield
} from 'lucide-react';

export default function Sidebar({ onOpenDemoModal }) {
  const {
    activeRole,
    setActiveRole,
    isMobileFrameView,
    setIsMobileFrameView,
    activeSession,
    currentStudent
  } = useApp();

  const roles = [
    { id: 'student', label: 'Student Portal', icon: UserCheck, desc: 'Rate in <10s & Vote', badge: 'Active' },
    { id: 'manager', label: 'Mess Manager', icon: ChefHat, desc: '2-Min Daily Briefing', badge: null },
    { id: 'warden', label: 'Warden Oversight', icon: Eye, desc: 'Audit & Override', badge: null },
    { id: 'admin', label: 'Platform Admin', icon: ShieldCheck, desc: 'Campus & Isolation', badge: null },
    { id: 'kiosk', label: 'Dining Hall QR', icon: QrCode, desc: 'Counter QR Kiosk', badge: null }
  ];

  return (
    <>
      {/* ================= DESKTOP / TABLET VERTICAL LEFT SIDEBAR ================= */}
      <aside className="hidden md:flex md:flex-col md:w-64 lg:w-72 bg-white border-r border-stone-200/90 h-screen sticky top-0 z-30 flex-shrink-0 shadow-xs">
        {/* Brand Header */}
        <div className="p-5 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 text-white flex items-center justify-center shadow-md shadow-brand-600/20 relative flex-shrink-0">
              <Utensils className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-xl font-extrabold text-stone-900 tracking-tight">
                  Apni Rasoi
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-700 bg-brand-50 px-2 py-0.2 rounded-full border border-brand-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-600"></span>
                Hostel Mess Platform
              </span>
            </div>
          </div>
        </div>

        {/* Live Active Meal Card in Sidebar */}
        {activeSession && (
          <div className="px-4 py-3">
            <div className="bg-orange-50/80 border border-orange-200/80 rounded-2xl p-3.5 shadow-2xs">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-orange-950 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                  Today's {activeSession.mealName}
                </span>
                <span className="bg-white px-2 py-0.5 rounded-md text-orange-800 border border-orange-200 font-bold text-[10px]">
                  {activeSession.scanCount} Scans
                </span>
              </div>
              <p className="text-[11px] text-orange-900/80 font-medium">
                Window: {activeSession.windowStart} – {activeSession.windowEnd}
              </p>
            </div>
          </div>
        )}

        {/* Vertical Navigation Menu */}
        <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto scrollbar-none">
          <p className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-stone-400">
            Platform Roles
          </p>

          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = activeRole === r.id;

            return (
              <button
                key={r.id}
                onClick={() => setActiveRole(r.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-left transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/20'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition ${
                    isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">{r.label}</div>
                    <div className={`text-[11px] font-medium leading-tight mt-0.5 ${
                      isActive ? 'text-brand-100' : 'text-stone-400'
                    }`}>
                      {r.desc}
                    </div>
                  </div>
                </div>

                {r.badge && !isActive && (
                  <span className="text-[10px] font-bold bg-brand-50 text-brand-700 px-2 py-0.5 rounded-md border border-brand-200">
                    {r.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Sidebar Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50/50 space-y-3">
          {/* Active Persona Info */}
          {activeRole === 'student' && (
            <div className="bg-white p-3 rounded-xl border border-stone-200 text-xs">
              <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                Anonymous Identity
              </div>
              <div className="flex items-center justify-between mt-1 font-mono font-bold text-brand-900">
                <span>{currentStudent?.anonId || 'ANON-7842'}</span>
                <span className="text-[10px] text-brand-700 bg-brand-50 px-1.5 py-0.2 rounded border border-brand-200 font-sans">
                  Shielded
                </span>
              </div>
            </div>
          )}

          {/* Desktop controls */}
          <div className="flex items-center gap-2">
            {activeRole === 'student' && (
              <button
                onClick={() => setIsMobileFrameView(!isMobileFrameView)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition shadow-2xs"
              >
                {isMobileFrameView ? (
                  <>
                    <Monitor className="w-3.5 h-3.5 text-brand-600" />
                    <span>Full Width</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-3.5 h-3.5 text-brand-600" />
                    <span>Phone View</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={onOpenDemoModal}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition shadow-xs"
            >
              <Sliders className="w-3.5 h-3.5 text-brand-400" />
              <span>Scenarios</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MOBILE PHONE TOP APP BAR ================= */}
      <header className="md:hidden bg-white/95 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-40 px-4 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-brand-700 text-white flex items-center justify-center shadow-xs">
            <Utensils className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-heading text-lg font-extrabold text-stone-900 leading-tight">
              Apni Rasoi
            </h1>
            <p className="text-[10px] text-stone-500 font-medium">Hostel Dining Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeSession && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-50 text-orange-900 border border-orange-200">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
              {activeSession.mealName}
            </span>
          )}

          <button
            onClick={onOpenDemoModal}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200"
            title="Demo Controls"
          >
            <Sliders className="w-4 h-4 text-brand-700" />
          </button>
        </div>
      </header>

      {/* ================= MOBILE PHONE NATIVE BOTTOM APP DOCK ================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-200/90 z-40 px-2 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-around">
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = activeRole === r.id;

            return (
              <button
                key={r.id}
                onClick={() => setActiveRole(r.id)}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                  isActive ? 'text-brand-700 font-bold scale-105' : 'text-stone-400 font-medium hover:text-stone-700'
                }`}
              >
                <div className={`p-1 rounded-xl transition ${isActive ? 'bg-brand-50 text-brand-700' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight">
                  {r.id === 'student' ? 'Student' : r.id === 'manager' ? 'Manager' : r.id === 'warden' ? 'Warden' : r.id === 'admin' ? 'Admin' : 'Kiosk'}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
