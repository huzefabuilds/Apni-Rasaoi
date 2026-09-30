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
      <aside className="hidden md:flex md:flex-col md:w-64 lg:w-72 bg-white border-r border-[#E8DECA] h-screen sticky top-0 z-30 flex-shrink-0 shadow-xs">
        {/* Brand Header */}
        <div className="p-4.5 border-b border-[#F4EADA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4F8A4C] text-white flex items-center justify-center shadow-md shadow-[#4F8A4C]/20 relative flex-shrink-0">
              <Utensils className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#F4A261] rounded-full border-2 border-white"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-lg font-extrabold text-[#2B2621] tracking-tight">
                  Apni Rasoi
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#4F8A4C] bg-[#F3F8F2] px-2 py-0.2 rounded-full border border-[#C7E2C5]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F8A4C]"></span>
                Hostel Mess Platform
              </span>
            </div>
          </div>
        </div>

        {/* Live Active Meal Card with Warm Orange Highlights (#F4A261) */}
        {activeSession && (
          <div className="px-3.5 py-2.5">
            <div className="bg-[#FEF8F3] border border-[#FBD9C3] rounded-2xl p-3 shadow-2xs">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-[#A65615] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F4A261] animate-pulse"></span>
                  Today's {activeSession.mealName}
                </span>
                <span className="bg-white px-1.5 py-0.2 rounded-md text-[#C77024] border border-[#FBD9C3] font-bold text-[10px]">
                  {activeSession.scanCount} Scans
                </span>
              </div>
              <p className="text-[11px] text-[#A65615]/90 font-medium">
                Window: {activeSession.windowStart} – {activeSession.windowEnd}
              </p>
            </div>
          </div>
        )}

        {/* Vertical Navigation Menu */}
        <div className="flex-1 px-3 py-1.5 space-y-1 overflow-y-auto scrollbar-none">
          <p className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#968D82]">
            Platform Roles
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
                    ? 'bg-[#4F8A4C] text-white shadow-xs'
                    : 'text-[#5C544B] hover:bg-[#FAF2DD] hover:text-[#2B2621] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg transition ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#FAF2DD] text-[#5C544B]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">{r.label}</div>
                    <div className={`text-[10px] font-medium leading-tight mt-0.5 ${
                      isActive ? 'text-white/80' : 'text-[#968D82]'
                    }`}>
                      {r.desc}
                    </div>
                  </div>
                </div>

                {r.badge && !isActive && (
                  <span className="text-[9px] font-bold bg-[#F3F8F2] text-[#4F8A4C] px-1.5 py-0.2 rounded-md border border-[#C7E2C5]">
                    {r.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Sidebar Footer */}
        <div className="p-3.5 border-t border-[#F4EADA] bg-[#FFFDF8] space-y-2.5">
          {/* Active Persona Info */}
          {activeRole === 'student' && (
            <div className="bg-white p-2.5 rounded-xl border border-[#E8DECA] text-xs">
              <div className="text-[9px] text-[#968D82] font-bold uppercase tracking-wider">
                Anonymous Identity
              </div>
              <div className="flex items-center justify-between mt-0.5 font-mono font-bold text-[#2B2621] text-xs">
                <span>{currentStudent?.anonId || 'ANON-7842'}</span>
                <span className="text-[9px] text-[#4F8A4C] bg-[#F3F8F2] px-1.5 py-0.2 rounded border border-[#C7E2C5] font-sans">
                  Shielded
                </span>
              </div>
            </div>
          )}

          {/* Desktop Controls */}
          <div className="flex items-center gap-2">
            {activeRole === 'student' && (
              <button
                onClick={() => setIsMobileFrameView(!isMobileFrameView)}
                className="flex-1 btn-secondary btn-sm text-xs font-semibold"
              >
                {isMobileFrameView ? (
                  <>
                    <Monitor className="w-3.5 h-3.5 text-[#4F8A4C]" />
                    <span>Full Width</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-3.5 h-3.5 text-[#4F8A4C]" />
                    <span>Phone View</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={onOpenDemoModal}
              className="flex-1 btn-primary btn-sm text-xs font-semibold"
            >
              <Sliders className="w-3.5 h-3.5 text-[#F4A261]" />
              <span>Scenarios</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MOBILE PHONE TOP APP BAR ================= */}
      <header className="md:hidden bg-white/95 backdrop-blur-md border-b border-[#E8DECA] sticky top-0 z-40 px-3.5 py-2 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#4F8A4C] text-white flex items-center justify-center shadow-xs">
            <Utensils className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-heading text-base font-extrabold text-[#2B2621] leading-tight">
              Apni Rasoi
            </h1>
            <p className="text-[10px] text-[#5C544B] font-medium">Hostel Dining</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeSession && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF8F3] text-[#C77024] border border-[#FBD9C3]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4A261] animate-pulse"></span>
              {activeSession.mealName}
            </span>
          )}

          <button
            onClick={onOpenDemoModal}
            className="p-1.5 rounded-xl bg-[#FAF2DD] hover:bg-[#F2E7CA] text-[#2B2621] border border-[#E8DECA]"
            title="Demo Controls"
          >
            <Sliders className="w-3.5 h-3.5 text-[#4F8A4C]" />
          </button>
        </div>
      </header>

      {/* ================= MOBILE PHONE NATIVE BOTTOM APP DOCK ================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#E8DECA] z-40 px-2 py-1 shadow-[0_-4px_16px_rgba(43,38,33,0.06)]">
        <div className="flex items-center justify-around">
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = activeRole === r.id;

            return (
              <button
                key={r.id}
                onClick={() => setActiveRole(r.id)}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                  isActive ? 'text-[#4F8A4C] font-bold scale-105' : 'text-[#968D82] font-medium hover:text-[#5C544B]'
                }`}
              >
                <div className={`p-1 rounded-xl transition ${isActive ? 'bg-[#F3F8F2] text-[#4F8A4C]' : ''}`}>
                  <Icon className="w-4.5 h-4.5" />
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
