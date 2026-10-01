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
  Flame,
  Shield,
  Clock,
  Key
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
    {
      id: 'student',
      label: 'Student Portal',
      icon: UserCheck,
      desc: 'Rate in <10s & Vote',
      badge: 'Active',
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-950/80 border-emerald-500/30',
      activeGradient: 'from-emerald-600 to-teal-600',
      activeBorder: 'border-emerald-400/40'
    },
    {
      id: 'manager',
      label: 'Mess Manager',
      icon: ChefHat,
      desc: '2-Min Daily Briefing',
      badge: null,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-950/80 border-amber-500/30',
      activeGradient: 'from-amber-600 to-orange-600',
      activeBorder: 'border-amber-400/40'
    },
    {
      id: 'warden',
      label: 'Warden Oversight',
      icon: Eye,
      desc: 'Audit & Override',
      badge: null,
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-950/80 border-purple-500/30',
      activeGradient: 'from-purple-600 to-indigo-600',
      activeBorder: 'border-purple-400/40'
    },
    {
      id: 'admin',
      label: 'Platform Admin',
      icon: ShieldCheck,
      desc: 'Campus & Security',
      badge: null,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-950/80 border-cyan-500/30',
      activeGradient: 'from-cyan-600 to-blue-600',
      activeBorder: 'border-cyan-400/40'
    },
    {
      id: 'kiosk',
      label: 'Dining Hall QR',
      icon: QrCode,
      desc: 'Counter QR Kiosk',
      badge: null,
      iconColor: 'text-rose-400',
      iconBg: 'bg-rose-950/80 border-rose-500/30',
      activeGradient: 'from-rose-600 to-pink-600',
      activeBorder: 'border-rose-400/40'
    }
  ];

  return (
    <>
      {/* ================= DESKTOP / TABLET VERTICAL LEFT SIDEBAR ================= */}
      <aside className="hidden md:flex md:flex-col md:w-64 lg:w-72 bg-[#131B2E] border-r border-[#233252] h-screen sticky top-0 z-30 flex-shrink-0 shadow-2xl">
        {/* Brand Header */}
        <div className="p-4.5 border-b border-[#233252]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/25 relative flex-shrink-0">
              <Utensils className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-orange-500 rounded-full border-2 border-[#131B2E] flex items-center justify-center animate-pulse">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-200 bg-clip-text text-transparent">
                  Apni Rasoi
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Hostel Dining Platform
              </span>
            </div>
          </div>
        </div>

        {/* Live Active Meal Card with Glowing Flame Icon */}
        {activeSession && (
          <div className="px-3.5 py-2.5">
            <div className="bg-gradient-to-br from-amber-950/50 via-[#1C2640] to-orange-950/40 border border-amber-500/30 rounded-2xl p-3.5 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none"></div>
              <div className="flex items-center justify-between text-xs mb-1 relative z-10">
                <span className="font-bold text-amber-300 flex items-center gap-2">
                  <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Flame className="w-3.5 h-3.5" />
                  </div>
                  <span>Today's {activeSession.mealName}</span>
                </span>
                <span className="bg-[#0E1524] px-2 py-0.5 rounded-md text-amber-400 border border-amber-500/30 font-bold text-[10px] flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> {activeSession.scanCount} Scans
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium relative z-10 flex items-center gap-1.5 mt-1">
                <Clock className="w-3 h-3 text-amber-400/80" />
                <span>Window: {activeSession.windowStart} – {activeSession.windowEnd}</span>
              </p>
            </div>
          </div>
        )}

        {/* Vertical Navigation Menu with Themed Icon Badges */}
        <div className="flex-1 px-3 py-1.5 space-y-1.5 overflow-y-auto scrollbar-none">
          <p className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Platform Roles</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </p>

          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = activeRole === r.id;

            return (
              <button
                key={r.id}
                onClick={() => setActiveRole(r.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                  isActive
                    ? `bg-gradient-to-r ${r.activeGradient} text-white shadow-lg shadow-emerald-950/40 border ${r.activeBorder} font-bold`
                    : 'text-slate-300 hover:bg-[#1C2640] hover:text-white border border-transparent hover:border-[#28375A]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-all border ${
                    isActive
                      ? 'bg-white/20 text-white border-white/30 shadow-inner'
                      : `${r.iconBg} ${r.iconColor}`
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">{r.label}</div>
                    <div className={`text-[10px] font-medium leading-tight mt-0.5 ${
                      isActive ? 'text-white/90' : 'text-slate-400'
                    }`}>
                      {r.desc}
                    </div>
                  </div>
                </div>

                {r.badge && !isActive && (
                  <span className="text-[9px] font-bold bg-emerald-950/80 text-emerald-400 px-1.5 py-0.5 rounded-md border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                    {r.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Sidebar Footer */}
        <div className="p-3.5 border-t border-[#233252] bg-[#0E1524] space-y-2.5">
          {/* Active Persona Info with Shield Icon */}
          {activeRole === 'student' && (
            <div className="bg-[#131B2E] p-2.5 rounded-xl border border-[#233252] text-xs shadow-inner">
              <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span>Anonymous Identity</span>
              </div>
              <div className="flex items-center justify-between mt-1 font-mono font-bold text-white text-xs">
                <span className="text-amber-300">{currentStudent?.anonId || 'ANON-7842'}</span>
                <span className="text-[9px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30 font-sans font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Shielded
                </span>
              </div>
            </div>
          )}

          {/* Desktop Controls with Distinct Icons */}
          <div className="flex items-center gap-2">
            {activeRole === 'student' && (
              <button
                onClick={() => setIsMobileFrameView(!isMobileFrameView)}
                className="flex-1 btn-secondary btn-sm text-xs font-semibold"
              >
                {isMobileFrameView ? (
                  <>
                    <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Full Width</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Phone View</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={onOpenDemoModal}
              className="flex-1 btn-accent btn-sm text-xs font-semibold"
            >
              <Sliders className="w-3.5 h-3.5 text-white" />
              <span>Scenarios</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MOBILE PHONE TOP APP BAR ================= */}
      <header className="md:hidden bg-[#131B2E]/95 backdrop-blur-md border-b border-[#233252] sticky top-0 z-40 px-3.5 py-2.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-slate-950 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Utensils className="w-4.5 h-4.5 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-heading text-base font-extrabold text-white leading-tight flex items-center gap-1.5">
              <span>Apni Rasoi</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </h1>
            <p className="text-[10px] text-emerald-400 font-medium">Hostel Dining Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeSession && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-950/70 text-amber-300 border border-amber-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              {activeSession.mealName}
            </span>
          )}

          <button
            onClick={onOpenDemoModal}
            className="p-2 rounded-xl bg-[#1C2640] hover:bg-[#263353] text-white border border-[#28375A] shadow-sm"
            title="Demo Controls"
          >
            <Sliders className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </header>

      {/* ================= MOBILE PHONE NATIVE BOTTOM APP DOCK ================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#131B2E]/95 backdrop-blur-md border-t border-[#233252] z-40 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-around">
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = activeRole === r.id;

            return (
              <button
                key={r.id}
                onClick={() => setActiveRole(r.id)}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                  isActive ? 'text-emerald-400 font-bold scale-105' : 'text-slate-400 font-medium hover:text-slate-200'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition border ${
                  isActive
                    ? 'bg-emerald-950/90 text-emerald-400 border-emerald-500/40 shadow-sm'
                    : 'border-transparent'
                }`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight font-medium">
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
