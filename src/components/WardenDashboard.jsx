import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Eye,
  Star,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  TrendingUp,
  FileText,
  Sliders,
  Calendar,
  Lock,
  History,
  Activity,
  Award,
  Zap,
  X
} from 'lucide-react';

export default function WardenDashboard() {
  const {
    sessions,
    activeSession,
    feedbacks,
    issues,
    aiSummary,
    overrideLogs,
    applyWardenOverride,
    showNotification
  } = useApp();

  // Override Modal State (FR-30, Section 8.6)
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(activeSession?.id || 'session-20260930-lunch');
  const [minutesToAdd, setMinutesToAdd] = useState(30);
  const [overrideReason, setOverrideReason] = useState('');
  const [officerName, setOfficerName] = useState('Dr. K. S. Murthy (Hostel Warden)');

  // Active Tab
  const [activeTab, setActiveTab] = useState('overview');

  const totalReviews = feedbacks.length;
  const avgRating = totalReviews > 0
    ? (feedbacks.reduce((acc, f) => acc + f.rating, 0) / totalReviews).toFixed(1)
    : '0.0';

  const expectedDiners = 300;
  const responseRate = Math.round((totalReviews / expectedDiners) * 100);

  const handleApplyOverride = (e) => {
    e.preventDefault();
    if (!overrideReason.trim()) {
      showNotification('Mandatory reason required for rating-window override.', 'error');
      return;
    }

    const success = applyWardenOverride({
      sessionId: selectedSessionId,
      minutesToAdd: Number(minutesToAdd),
      reason: overrideReason,
      grantedBy: officerName
    });

    if (success) {
      setIsOverrideModalOpen(false);
      setOverrideReason('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Read-Only Oversight Guarantee Notice with Vibrant Indigo Glow */}
      <div className="bg-gradient-to-r from-indigo-950/50 via-[#131B2E] to-purple-950/40 border border-indigo-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 mt-0.5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="badge-status badge-purple text-xs font-bold">
                  <Eye className="w-3.5 h-3.5" /> Read-Only Oversight Role
                </span>
                <span className="text-xs text-indigo-300 font-bold bg-[#0E1524] px-2.5 py-0.5 rounded-full border border-indigo-500/30 shadow-sm">
                  Zero Student Identity Exposure
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white mt-1 font-heading">
                Warden & Mess Committee Oversight Portal
              </h1>
              <p className="text-xs text-slate-300 max-w-2xl mt-0.5 leading-relaxed">
                Independent oversight view for hostel administration. View aggregated ratings, response rates, and verified outcome metrics. The only permitted action is the <strong>Rating-Window / QR Override</strong> to prevent feedback suppression.
              </p>
            </div>
          </div>

          {/* QR Window Override Tool Button */}
          <button
            onClick={() => setIsOverrideModalOpen(true)}
            className="btn-primary bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs py-3 px-4.5 rounded-xl shadow-lg shadow-indigo-900/40 flex items-center gap-2 font-bold border border-indigo-400/30"
          >
            <Clock className="w-4 h-4 text-amber-300" />
            <span>QR & Window Override Tool</span>
          </button>
        </div>
      </div>

      {/* Oversight Sub-tabs with Signature Colorful Styling */}
      <div className="flex items-center gap-2 border-b border-[#233252] pb-3 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm ${
            activeTab === 'overview'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-900/30 border border-indigo-400/40'
              : 'text-slate-300 bg-[#131B2E] hover:bg-[#1C2640] border border-[#233252]'
          }`}
        >
          <Activity className="w-4 h-4 text-indigo-400" />
          <span>Aggregated KPIs & Trends</span>
        </button>

        <button
          onClick={() => setActiveTab('qrlogs')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm ${
            activeTab === 'qrlogs'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30 border border-emerald-400/40'
              : 'text-slate-300 bg-[#131B2E] hover:bg-[#1C2640] border border-[#233252]'
          }`}
        >
          <QrCode className="w-4 h-4 text-emerald-400" />
          <span>QR Scan Logs & Health</span>
        </button>

        <button
          onClick={() => setActiveTab('outcomes')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm ${
            activeTab === 'outcomes'
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-900/30 border border-amber-400/40'
              : 'text-slate-300 bg-[#131B2E] hover:bg-[#1C2640] border border-[#233252]'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <span>Outcome Metrics</span>
        </button>

        <button
          onClick={() => setActiveTab('overrides')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm ${
            activeTab === 'overrides'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-900/30 border border-cyan-400/40'
              : 'text-slate-300 bg-[#131B2E] hover:bg-[#1C2640] border border-[#233252]'
          }`}
        >
          <History className="w-4 h-4 text-cyan-400" />
          <span>Override Audit Log ({overrideLogs.length})</span>
        </button>
      </div>

      {/* ================= TAB 1: AGGREGATED KPIS & TRENDS ================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-amber-950/40 via-[#162035] to-[#0E1524] p-4.5 rounded-2xl border border-amber-500/30 shadow-lg">
              <span className="text-xs text-amber-300 font-bold">Aggregated Mess Rating</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold text-white font-heading">{avgRating}</span>
                <span className="text-xs text-slate-400">/ 5.0</span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400 ml-auto drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Across all student meal feedback</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-950/40 via-[#162035] to-[#0E1524] p-4.5 rounded-2xl border border-indigo-500/30 shadow-lg">
              <span className="text-xs text-indigo-300 font-bold">Student Response Rate</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold text-white font-heading">{aiSummary.responseRatePercent}%</span>
                <span className="text-xs text-slate-400 font-medium">({aiSummary.totalReviews} of 300)</span>
                <Users className="w-4 h-4 text-indigo-400 ml-auto" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Statistically valid student representation</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-950/40 via-[#162035] to-[#0E1524] p-4.5 rounded-2xl border border-emerald-500/30 shadow-lg">
              <span className="text-xs text-emerald-300 font-bold">Active Meal Window</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-emerald-300 font-heading">{activeSession.mealName}</span>
                <span className="badge-status badge-green text-[10px] ml-auto">
                  Normal Scan
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Window: {activeSession.windowStart} – {activeSession.windowEnd}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-950/40 via-[#162035] to-[#0E1524] p-4.5 rounded-2xl border border-purple-500/30 shadow-lg">
              <span className="text-xs text-purple-300 font-bold">Resolution Speed</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold text-white font-heading">2.3 Days</span>
                <span className="text-xs text-purple-300 font-bold ml-auto bg-purple-950/80 px-2 py-0.5 rounded-full border border-purple-500/30">
                  Target: &lt;3d
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">From detected to verified resolved</p>
            </div>
          </div>

          {/* Meal-Wise Ratings Breakdown */}
          <div className="card-clean p-5 sm:p-6 border-[#233252] bg-[#131B2E] shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 font-heading">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Meal Session Ratings & Provider Context Notes</span>
            </h3>

            <div className="space-y-3">
              {sessions.map((sess) => (
                <div key={sess.id} className="p-4 rounded-2xl border border-[#233252] bg-[#0E1524] hover:border-slate-700 transition shadow-lg">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{sess.mealName}</span>
                      <span className={`badge-status ${
                        sess.status === 'open'
                          ? 'badge-green'
                          : sess.status === 'closed'
                          ? 'badge-neutral'
                          : 'badge-amber'
                      }`}>
                        {sess.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                      <span>Window: <strong className="text-slate-200">{sess.windowStart} - {sess.windowEnd}</strong></span>
                      <span>•</span>
                      <span>Diner Scans: <strong className="text-amber-300">{sess.scanCount}</strong></span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 mt-1">
                    <strong className="text-slate-400">Dishes Served:</strong> {sess.dishes.join(', ')}
                  </div>

                  {sess.contextNote && (
                    <div className="mt-3 p-3 bg-amber-950/40 rounded-xl border border-amber-500/30 text-xs text-amber-200 flex items-center gap-2 font-medium">
                      <span className="text-amber-400">📝</span>
                      <div>
                        <strong>Provider Operational Note:</strong> {sess.contextNote}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: QR SCAN LOGS & NO-SCAN ALERTS (FR-29) ================= */}
      {activeTab === 'qrlogs' && (
        <div className="space-y-4">
          <div className="card-clean p-5 sm:p-6 border-[#233252] bg-[#131B2E]">
            <div className="border-b border-[#233252] pb-3 mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  <span>Mess Counter QR Scan Verification & Health (FR-29)</span>
                </h3>
                <span className="badge-status badge-green text-xs">Counter QR Display Active</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Monitors first scan times to ensure the mess counter displays the QR on time without suppressing feedback.
              </p>
            </div>

            <div className="space-y-3">
              {sessions.map((sess) => (
                <div key={sess.id} className="p-4 rounded-xl border border-[#233252] bg-[#0E1524]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{sess.mealName} Session</span>
                      <span className="badge-status badge-neutral text-xs font-mono">{sess.qrToken}</span>
                    </div>
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> No-Scan Alert: NORMAL
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#162035] p-3 rounded-xl text-xs mt-2 border border-[#28375A]">
                    <div>
                      <span className="text-slate-400 block">First Diner Scan:</span>
                      <strong className="text-white">{sess.firstScanAt || 'Pending Start'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Total Counter Scans:</span>
                      <strong className="text-emerald-400">{sess.scanCount} Scans</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Override Extensions:</span>
                      <strong className="text-amber-300">+{sess.extendedByMins} mins</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: OUTCOME METRICS (FR-31) ================= */}
      {activeTab === 'outcomes' && (
        <div className="space-y-4">
          <div className="card-clean p-5 sm:p-6 border-[#233252] bg-[#131B2E]">
            <div className="border-b border-[#233252] pb-3 mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Outcome Metrics & Accountability (PRD FR-31)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Objective measurement of quality improvement following mess management corrective actions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#0E1524] p-4 rounded-xl border border-emerald-500/30">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Rating Change After Action
                </span>
                <div className="text-2xl font-extrabold text-emerald-400 mt-2">+1.5 Stars</div>
                <p className="text-[11px] text-slate-400 mt-1">Average theme improvement post-resolution</p>
              </div>

              <div className="bg-[#0E1524] p-4 rounded-xl border border-indigo-500/30">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Median Issue Resolution Time
                </span>
                <div className="text-2xl font-extrabold text-white mt-2">2.3 Days</div>
                <p className="text-[11px] text-slate-400 mt-1">PRD Pilot target: &lt; 3.0 days</p>
              </div>

              <div className="bg-[#0E1524] p-4 rounded-xl border border-amber-500/30">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Repeat-Issue Rate
                </span>
                <div className="text-2xl font-extrabold text-amber-300 mt-2">4.2%</div>
                <p className="text-[11px] text-slate-400 mt-1">Share of resolved issues recurring within 4 wks</p>
              </div>
            </div>

            {/* Resolved Issue Outcomes List */}
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Action Verification Records:
            </h4>
            <div className="space-y-3">
              {issues.filter(i => i.status === 'Resolved').map((issue) => (
                <div key={issue.id} className="p-4 rounded-xl border border-[#233252] bg-[#0E1524]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-white">{issue.title}</span>
                    <span className="badge-status badge-green text-[10px]">Verified Improvement</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">Action: {issue.actionTaken}</p>
                  {issue.impactMetric && (
                    <div className="mt-2 text-xs font-bold text-emerald-300 bg-emerald-950/70 p-2 rounded-lg border border-emerald-500/40 inline-flex items-center gap-2">
                      <span>Theme Score Before: {issue.impactMetric.beforeRating}★</span>
                      <span>→</span>
                      <span>After: {issue.impactMetric.afterRating}★</span>
                      <span className="text-emerald-400">({issue.impactMetric.improvement})</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: OVERRIDE AUDIT LOG ================= */}
      {activeTab === 'overrides' && (
        <div className="space-y-4">
          <div className="card-clean p-5 sm:p-6 border-[#233252] bg-[#131B2E]">
            <div className="border-b border-[#233252] pb-3 mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                <History className="w-4 h-4 text-cyan-400" />
                <span>Rating-Window & QR Override Audit Trail (FR-30)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Every rating window extension or emergency meal code generation is logged with mandatory reason.
              </p>
            </div>

            <div className="space-y-3">
              {overrideLogs.map((log) => (
                <div key={log.id} className="p-4 rounded-xl border border-[#233252] bg-[#0E1524]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-white">{log.actionType} — {log.mealName}</span>
                    <span className="text-xs text-cyan-300 font-mono">{log.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    <strong className="text-slate-400">Granted By:</strong> {log.grantedBy}
                  </p>
                  <div className="mt-2 bg-[#162035] p-3 rounded-lg border border-[#28375A] text-xs text-slate-200">
                    <strong className="text-amber-300">Justification Reason:</strong> "{log.reason}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: RATING-WINDOW & QR OVERRIDE (FR-30) ================= */}
      {isOverrideModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#131B2E] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#233252]">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white font-heading">Rating-Window & QR Override</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Designated Warden / Committee action to extend rating windows or reopen ratings if QR was delayed. Every override is logged transparently.
            </p>

            <form onSubmit={handleApplyOverride} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Target Meal Session:</label>
                <select
                  value={selectedSessionId}
                  onChange={(e) => setSelectedSessionId(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#28375A] bg-[#0E1524] text-white"
                >
                  {sessions.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.mealName} ({s.status.toUpperCase()} • Ends {s.windowEnd})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Extension Duration:</label>
                <select
                  value={minutesToAdd}
                  onChange={(e) => setMinutesToAdd(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#28375A] bg-[#0E1524] text-white"
                >
                  <option value={15}>+15 Minutes Extension</option>
                  <option value={30}>+30 Minutes Extension</option>
                  <option value={45}>+45 Minutes Extension</option>
                  <option value={60}>+60 Minutes Extension</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Authorizing Officer / Committee Role:</label>
                <input
                  type="text"
                  value={officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                  required
                  className="w-full text-xs p-2.5 rounded-xl border border-[#28375A] bg-[#0E1524] text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Mandatory Justification / Reason:
                </label>
                <textarea
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  rows={2}
                  required
                  placeholder="e.g. Counter QR sheet damaged; new sheet placed at 1:15 PM so rating window extended by 30 mins."
                  className="w-full text-xs p-3 rounded-xl border border-[#28375A] bg-[#0E1524] text-white focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#233252]">
                <button
                  type="button"
                  onClick={() => setIsOverrideModalOpen(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-accent text-xs py-2 px-4"
                >
                  Confirm & Apply Window Override
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
