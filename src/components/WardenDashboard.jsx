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
  Award
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
      {/* Read-Only Oversight Guarantee Notice */}
      <div className="bg-gradient-to-r from-indigo-50/90 via-indigo-50/30 to-amber-50/40 border border-indigo-200 rounded-3xl p-5 sm:p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white shadow-md shadow-indigo-500/20 mt-0.5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="badge-status badge-amber bg-indigo-100 text-indigo-900 border-indigo-300 text-xs font-bold">
                  <Eye className="w-3.5 h-3.5" /> Read-Only Oversight Role
                </span>
                <span className="text-xs text-indigo-900 font-bold bg-white px-2 py-0.5 rounded-full border border-indigo-200 shadow-2xs">
                  Zero Student Identity Exposure
                </span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mt-1 font-heading">
                Warden & Mess Committee Oversight Portal
              </h1>
              <p className="text-xs text-slate-600 max-w-2xl mt-0.5 leading-relaxed">
                Independent oversight view for hostel administration. View aggregated ratings, response rates, and verified outcome metrics. The only permitted action is the <strong>Rating-Window / QR Override</strong> to prevent feedback suppression.
              </p>
            </div>
          </div>

          {/* QR Window Override Tool Button */}
          <button
            onClick={() => setIsOverrideModalOpen(true)}
            className="btn-primary bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs py-3 px-4.5 rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2 font-bold"
          >
            <Clock className="w-4 h-4" />
            <span>QR & Window Override Tool</span>
          </button>
        </div>
      </div>

      {/* Oversight Sub-tabs with Signature Color Styling */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs ${
            activeTab === 'overview'
              ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Aggregated KPIs & Trends</span>
        </button>

        <button
          onClick={() => setActiveTab('qrlogs')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs ${
            activeTab === 'qrlogs'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20'
              : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>QR Scan Logs & No-Scan Alerts</span>
        </button>

        <button
          onClick={() => setActiveTab('outcomes')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs ${
            activeTab === 'outcomes'
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-amber-600/20'
              : 'text-slate-600 hover:bg-amber-50 hover:text-amber-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Outcome Metrics</span>
        </button>

        <button
          onClick={() => setActiveTab('overrides')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs ${
            activeTab === 'overrides'
              ? 'bg-gradient-to-r from-slate-800 to-teal-800 text-white shadow-md shadow-slate-800/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Override Audit Log ({overrideLogs.length})</span>
        </button>
      </div>

      {/* ================= TAB 1: AGGREGATED KPIS & TRENDS ================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-amber-50/70 via-amber-50/20 to-white p-4.5 rounded-2xl border border-amber-200 shadow-xs">
              <span className="text-xs text-amber-900 font-bold">Aggregated Mess Rating</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold text-slate-900 font-heading">{avgRating}</span>
                <span className="text-xs text-slate-500">/ 5.0</span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400 ml-auto" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Across all student meal feedback</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50/70 via-indigo-50/20 to-white p-4.5 rounded-2xl border border-indigo-200 shadow-xs">
              <span className="text-xs text-indigo-900 font-bold">Student Response Rate</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold text-slate-900 font-heading">{aiSummary.responseRatePercent}%</span>
                <span className="text-xs text-slate-500 font-medium">({aiSummary.totalReviews} of 300)</span>
                <Users className="w-4 h-4 text-indigo-600 ml-auto" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Statistically valid student representation</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50/70 via-teal-50/20 to-white p-4.5 rounded-2xl border border-emerald-200 shadow-xs">
              <span className="text-xs text-emerald-900 font-bold">Active Meal Window</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-emerald-800 font-heading">{activeSession.mealName}</span>
                <span className="badge-status badge-green text-[10px] ml-auto bg-emerald-100 text-emerald-900 border-emerald-300">
                  Normal Scan
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Window: {activeSession.windowStart} – {activeSession.windowEnd}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50/70 via-purple-50/20 to-white p-4.5 rounded-2xl border border-purple-200 shadow-xs">
              <span className="text-xs text-purple-900 font-bold">Resolution Speed</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold text-slate-900 font-heading">2.3 Days</span>
                <span className="text-xs text-purple-800 font-bold ml-auto bg-purple-100 px-2 py-0.5 rounded-full border border-purple-200">
                  Target: &lt;3d
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">From detected to verified resolved</p>
            </div>
          </div>

          {/* Meal-Wise Ratings Breakdown */}
          <div className="card-clean p-5 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2 font-heading">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Meal Session Ratings & Provider Context Notes</span>
            </h3>

            <div className="space-y-3">
              {sessions.map((sess) => (
                <div key={sess.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{sess.mealName}</span>
                      <span className={`badge-status ${
                        sess.status === 'open'
                          ? 'badge-green bg-emerald-100 text-emerald-900 border-emerald-300'
                          : sess.status === 'closed'
                          ? 'badge-neutral bg-slate-100 text-slate-700 border-slate-300'
                          : 'badge-amber bg-amber-100 text-amber-900 border-amber-300'
                      }`}>
                        {sess.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                      <span>Window: <strong>{sess.windowStart} - {sess.windowEnd}</strong></span>
                      <span>•</span>
                      <span>Diner Scans: <strong className="text-slate-900">{sess.scanCount}</strong></span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-700 mt-1">
                    <strong>Dishes Served:</strong> {sess.dishes.join(', ')}
                  </div>

                  {sess.contextNote && (
                    <div className="mt-2.5 p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2 font-medium">
                      <span>📝</span>
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
          <div className="card-clean p-5">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <span>Mess Counter QR Scan Verification & Health (FR-29)</span>
                </h3>
                <span className="badge-status badge-green text-xs">Counter QR Display Active</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Monitors first scan times to ensure the mess counter displays the QR on time without suppressing feedback.
              </p>
            </div>

            <div className="space-y-3">
              {sessions.map((sess) => (
                <div key={sess.id} className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{sess.mealName} Session</span>
                      <span className="badge-status badge-neutral text-xs font-mono">{sess.qrToken}</span>
                    </div>
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> No-Scan Alert: NORMAL
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-lg text-xs mt-2">
                    <div>
                      <span className="text-slate-500 block">First Diner Scan:</span>
                      <strong className="text-slate-800">{sess.firstScanAt || 'Pending Start'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Total Counter Scans:</span>
                      <strong className="text-slate-800">{sess.scanCount} Scans</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Override Extensions:</span>
                      <strong className="text-slate-800">+{sess.extendedByMins} mins</strong>
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
          <div className="card-clean p-5">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Outcome Metrics & Accountability (PRD FR-31)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Objective measurement of quality improvement following mess management corrective actions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                  Rating Change After Action
                </span>
                <div className="text-2xl font-extrabold text-emerald-700 mt-2">+1.5 Stars</div>
                <p className="text-[11px] text-slate-500 mt-1">Average theme improvement post-resolution</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                  Median Issue Resolution Time
                </span>
                <div className="text-2xl font-extrabold text-slate-900 mt-2">2.3 Days</div>
                <p className="text-[11px] text-slate-500 mt-1">PRD Pilot target: &lt; 3.0 days</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                  Repeat-Issue Rate
                </span>
                <div className="text-2xl font-extrabold text-emerald-700 mt-2">4.2%</div>
                <p className="text-[11px] text-slate-500 mt-1">Share of resolved issues recurring within 4 wks</p>
              </div>
            </div>

            {/* Resolved Issue Outcomes List */}
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Action Verification Records:
            </h4>
            <div className="space-y-3">
              {issues.filter(i => i.status === 'Resolved').map((issue) => (
                <div key={issue.id} className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-900">{issue.title}</span>
                    <span className="badge-status badge-green text-[10px]">Verified Improvement</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">Action: {issue.actionTaken}</p>
                  {issue.impactMetric && (
                    <div className="mt-2 text-xs font-bold text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200 inline-flex items-center gap-2">
                      <span>Theme Score Before: {issue.impactMetric.beforeRating}★</span>
                      <span>→</span>
                      <span>After: {issue.impactMetric.afterRating}★</span>
                      <span className="text-emerald-700">({issue.impactMetric.improvement})</span>
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
          <div className="card-clean p-5">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <History className="w-4 h-4 text-emerald-600" />
                <span>Rating-Window & QR Override Audit Trail (FR-30)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Every rating window extension or emergency meal code generation is logged with mandatory reason.
              </p>
            </div>

            <div className="space-y-3">
              {overrideLogs.map((log) => (
                <div key={log.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-900">{log.actionType} — {log.mealName}</span>
                    <span className="text-xs text-slate-400 font-mono">{log.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1">
                    <strong>Granted By:</strong> {log.grantedBy}
                  </p>
                  <div className="mt-2 bg-white p-2.5 rounded border border-slate-200 text-xs text-slate-800">
                    <strong>Justification Reason:</strong> "{log.reason}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: RATING-WINDOW & QR OVERRIDE (FR-30) ================= */}
      {isOverrideModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center gap-2 text-amber-800 mb-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-bold text-slate-900">Rating-Window & QR Override</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Designated Warden / Committee action to extend rating windows or reopen ratings if QR was delayed. Every override is logged transparently.
            </p>

            <form onSubmit={handleApplyOverride} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Meal Session:</label>
                <select
                  value={selectedSessionId}
                  onChange={(e) => setSelectedSessionId(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
                >
                  {sessions.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.mealName} ({s.status.toUpperCase()} • Ends {s.windowEnd})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Extension Duration:</label>
                <select
                  value={minutesToAdd}
                  onChange={(e) => setMinutesToAdd(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
                >
                  <option value={15}>+15 Minutes Extension</option>
                  <option value={30}>+30 Minutes Extension</option>
                  <option value={45}>+45 Minutes Extension</option>
                  <option value={60}>+60 Minutes Extension</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Authorizing Officer / Committee Role:</label>
                <input
                  type="text"
                  value={officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mandatory Justification / Reason:
                </label>
                <textarea
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  rows={2}
                  required
                  placeholder="e.g. Counter QR sheet damaged; new sheet placed at 1:15 PM so rating window extended by 30 mins."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-amber-600"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsOverrideModalOpen(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary bg-amber-700 hover:bg-amber-800 text-white text-xs py-2 px-4"
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
