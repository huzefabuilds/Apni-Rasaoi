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
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-slate-900 text-emerald-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Interactive Demo Scenarios</h3>
              <p className="text-xs text-slate-500">Test every requirement in Apni Rasoi PRD v3.1</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Persona Switcher */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
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
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <UserCheck className={`w-4 h-4 ${isCurrent ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{st.name} ({st.rollNo})</span>
                  </div>
                  <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                    {st.anonId}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Simulation Scenarios */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            2. Instant Traffic & Feedback Simulations
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => simulateBatchRatings(15, 5, [{ code: 'taste', direction: 'positive', label: 'Delicious Taste' }], 'Gulab Jamun was outstanding today!', 'English')}
              className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/70 text-emerald-900 text-xs text-left transition"
            >
              <Zap className="w-4 h-4 text-emerald-600 mb-1" />
              <strong className="block">Simulate +15 Superb Ratings (5★)</strong>
              <span className="text-[11px] text-emerald-700">Boosts taste theme & sentiment</span>
            </button>

            <button
              onClick={() => simulateBatchRatings(10, 2, [{ code: 'temperature', direction: 'negative', label: 'Temperature' }], 'Rotis were cold at Counter 1', 'Hinglish')}
              className="p-3 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100/70 text-amber-900 text-xs text-left transition"
            >
              <Clock className="w-4 h-4 text-amber-600 mb-1" />
              <strong className="block">Simulate +10 Cold Roti Ratings (2★)</strong>
              <span className="text-[11px] text-amber-700">Triggers temperature alert</span>
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
              className="p-3 rounded-xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100/70 text-indigo-900 text-xs text-left transition"
            >
              <Shield className="w-4 h-4 text-indigo-600 mb-1" />
              <strong className="block">Trigger Warden Override (+45m)</strong>
              <span className="text-[11px] text-indigo-700">Logs window extension audit</span>
            </button>

            <button
              onClick={() => {
                resetDemoData();
                onClose();
              }}
              className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs text-left transition"
            >
              <RotateCcw className="w-4 h-4 text-slate-500 mb-1" />
              <strong className="block">Reset All Demo Data</strong>
              <span className="text-[11px] text-slate-500">Restore factory PRD v3.1 baseline</span>
            </button>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 text-right">
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
