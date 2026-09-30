import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Utensils,
  Sparkles,
  ShieldCheck,
  UserCheck,
  ChefHat,
  Eye,
  QrCode,
  Smartphone,
  Monitor,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sliders,
  HelpCircle
} from 'lucide-react';

export default function Navbar({ onOpenDemoModal }) {
  const {
    activeRole,
    setActiveRole,
    isMobileFrameView,
    setIsMobileFrameView,
    activeSession,
    currentStudent,
    resetDemoData
  } = useApp();

  const roles = [
    { id: 'student', label: 'Student Portal', icon: UserCheck, desc: 'Rate in <10s & Vote' },
    { id: 'manager', label: 'Mess Manager', icon: ChefHat, desc: '2-Min Daily Briefing' },
    { id: 'warden', label: 'Warden / Committee', icon: Eye, desc: 'Read-Only + QR Override' },
    { id: 'admin', label: 'Platform Admin', icon: ShieldCheck, desc: 'Privacy & Abuse Review' },
    { id: 'kiosk', label: 'Counter QR Kiosk', icon: QrCode, desc: 'Physical Mess Display' }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      {/* Top Banner with Product Identity */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-xl font-bold bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-800 bg-clip-text text-transparent tracking-tight">
                Apni Rasoi
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 border border-emerald-200 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Hostel Dining Platform
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Anonymous Student Feedback & Intelligent Mess Management
            </p>
          </div>
        </div>

        {/* Live Active Meal Status & Quick Stats */}
        <div className="flex items-center gap-2 text-xs">
          {activeSession && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 text-emerald-900 px-3 py-1.5 rounded-xl font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>
                <strong>{activeSession.mealName}</strong> Open • Ends {activeSession.windowEnd}
              </span>
              <span className="bg-white/90 px-2 py-0.5 rounded-md text-emerald-800 border border-emerald-200 font-bold text-[11px] shadow-xs">
                {activeSession.scanCount} Rated
              </span>
            </div>
          )}

          {/* Mobile frame preview toggle for student */}
          {activeRole === 'student' && (
            <button
              onClick={() => setIsMobileFrameView(!isMobileFrameView)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium transition shadow-sm"
              title="Toggle mobile device frame"
            >
              {isMobileFrameView ? (
                <>
                  <Monitor className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden md:inline">Full Width</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden md:inline">Mobile Frame</span>
                </>
              )}
            </button>
          )}

          {/* Demo Scenarios Modal Button */}
          <button
            onClick={onOpenDemoModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-medium transition shadow-sm border border-slate-700"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Demo Controls</span>
          </button>
        </div>
      </div>

      {/* Role Navigation Bar with Distinct Color Highlights */}
      <div className="bg-slate-50/80 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between overflow-x-auto py-1.5 gap-2 scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max">
            {roles.map((r) => {
              const Icon = r.icon;
              const isActive = activeRole === r.id;
              
              // Signature active colors for each role
              const getActiveClasses = () => {
                switch (r.id) {
                  case 'student': return 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20';
                  case 'manager': return 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-amber-600/20';
                  case 'warden': return 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/20';
                  case 'admin': return 'bg-gradient-to-r from-slate-800 to-teal-800 text-white shadow-md shadow-slate-800/20';
                  case 'kiosk': return 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/20';
                  default: return 'bg-emerald-600 text-white';
                }
              };

              return (
                <button
                  key={r.id}
                  onClick={() => setActiveRole(r.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? getActiveClasses()
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Persona indicator for Student */}
          {activeRole === 'student' && (
            <div className="text-xs text-slate-500 flex items-center gap-1.5 min-w-max pl-2 border-l border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Pseudonymous ID:</span>
              <strong className="text-emerald-900 font-mono bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-bold">
                {currentStudent?.anonId || 'ANON-7842'}
              </strong>
            </div>
          )}

          {activeRole === 'warden' && (
            <div className="text-xs text-indigo-800 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 min-w-max">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>Read-Only Oversight + Override Enabled</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
