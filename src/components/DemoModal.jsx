import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sliders,
  UserCheck,
  Zap,
  RotateCcw,
  Sparkles,
  Shield,
  Clock,
  CheckCircle2,
  X
} from 'lucide-react';

export default function DemoModal({ isOpen, onClose }) {
  const {
    registeredStudents,
    currentStudent,
    switchStudentProfile,
    resetDemoData,
    submitFeedback,
    activeSession,
    applyWardenOverride,
    showNotification
  } = useApp();

  if (!isOpen) return null;

  const simulateBatchRatings = (count, rating, chips, comment, lang) => {
    for (let i = 0; i < count; i++) {
      submitFeedback({
        rating,
        chips,
        rawComment: comment,
        sessionId: activeSession.id,
        completionSeconds: +(3.2 + Math.random() * 4).toFixed(1)
      });
    }
    showNotification(`Simulated ${count} ${rating}-Star diner feedback submissions!`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#131B2E] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#233252] space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#233252] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">Interactive Demo Scenarios</h3>
              <p className="text-xs text-slate-400">Test every requirement in Apni Rasoi PRD v3.1</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-[#1C2640] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Persona Switcher */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            1. Switch Active Student Persona (Pseudonymous IDs)
          </label>
          <div className="space-y-1.5">
            {registeredStudents.map((st) => {
              const isCurrent = currentStudent?.id === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => {
                    switchStudentProfile(st);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs text-left transition ${
                    isCurrent
                      ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-bold shadow-sm'
                      : 'border-[#233252] bg-[#0E1524] hover:bg-[#162035] text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <UserCheck className={`w-4 h-4 ${isCurrent ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span>{st.name} ({st.rollNo})</span>
                  </div>
                  <span className="font-mono bg-[#162035] px-2 py-0.5 rounded border border-[#28375A] text-amber-300 font-bold">
                    {st.anonId}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Simulation Scenarios with Colorful Glow */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            2. Instant Traffic & Feedback Simulations
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={() => simulateBatchRatings(15, 5, [{ code: 'taste', direction: 'positive', label: 'Delicious Taste' }], 'Gulab Jamun was outstanding today!', 'English')}
              className="p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-950/30 hover:bg-emerald-950/60 text-emerald-200 text-xs text-left transition shadow-sm"
            >
              <Zap className="w-4 h-4 text-emerald-400 mb-1" />
              <strong className="block text-white">Simulate +15 Superb Ratings (5★)</strong>
              <span className="text-[11px] text-emerald-300">Boosts taste theme & sentiment</span>
            </button>

            <button
              onClick={() => simulateBatchRatings(10, 2, [{ code: 'temperature', direction: 'negative', label: 'Temperature' }], 'Rotis were cold at Counter 1', 'Hinglish')}
              className="p-3.5 rounded-2xl border border-amber-500/30 bg-amber-950/30 hover:bg-amber-950/60 text-amber-200 text-xs text-left transition shadow-sm"
            >
              <Clock className="w-4 h-4 text-amber-400 mb-1" />
              <strong className="block text-white">Simulate +10 Cold Roti Ratings (2★)</strong>
              <span className="text-[11px] text-amber-300">Triggers temperature alert</span>
            </button>

            <button
              onClick={() => {
                applyWardenOverride({
                  sessionId: activeSession.id,
                  minutesToAdd: 45,
                  reason: 'Hostel mess power outage delayed lunch service by 30 mins.',
                  grantedBy: 'Warden (Dr. K. S. Murthy)'
                });
                onClose();
              }}
              className="p-3.5 rounded-2xl border border-indigo-500/30 bg-indigo-950/30 hover:bg-indigo-950/60 text-indigo-200 text-xs text-left transition shadow-sm"
            >
              <Shield className="w-4 h-4 text-indigo-400 mb-1" />
              <strong className="block text-white">Trigger Warden Override (+45m)</strong>
              <span className="text-[11px] text-indigo-300">Logs window extension audit</span>
            </button>

            <button
              onClick={() => {
                resetDemoData();
                onClose();
              }}
              className="p-3.5 rounded-2xl border border-[#233252] bg-[#0E1524] hover:bg-[#162035] text-slate-300 text-xs text-left transition shadow-sm"
            >
              <RotateCcw className="w-4 h-4 text-slate-400 mb-1" />
              <strong className="block text-white">Reset All Demo Data</strong>
              <span className="text-[11px] text-slate-400">Restore factory PRD v3.1 baseline</span>
            </button>
          </div>
        </div>

        <div className="pt-2 border-t border-[#233252] text-right">
          <button
            onClick={onClose}
            className="btn-secondary text-xs py-2 px-4"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
