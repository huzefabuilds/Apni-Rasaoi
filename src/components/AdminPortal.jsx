import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Lock,
  Users,
  AlertOctagon,
  History,
  Sliders,
  CheckCircle2,
  XCircle,
  Eye,
  Key,
  Database,
  FileCheck,
  HelpCircle
} from 'lucide-react';

export default function AdminPortal() {
  const {
    registeredStudents,
    auditLogs,
    toggles,
    feedbacks,
    toggleAnonIdSuspension,
    showNotification
  } = useApp();

  const [activeTab, setActiveTab] = useState('registry');
  const [selectedStudentForLookup, setSelectedStudentForLookup] = useState(null);
  const [lookupReason, setLookupReason] = useState('');
  const [isLookupModalOpen, setIsLookupModalOpen] = useState(false);

  // Rollout toggles local state for demo toggling
  const [localToggles, setLocalToggles] = useState(toggles);

  const toggleFeature = (key) => {
    setLocalToggles(prev => prev.map(t => {
      if (t.key === key) {
        const updated = !t.enabled;
        showNotification(`Module "${t.title}" ${updated ? 'Enabled' : 'Disabled'}.`, 'info');
        return { ...t, enabled: updated };
      }
      return t;
    }));
  };

  const handleIdentityLookup = (e) => {
    e.preventDefault();
    if (!lookupReason.trim()) {
      showNotification('Mandatory escalation reason required for identity lookup.', 'error');
      return;
    }
    showNotification(`Identity lookup recorded for ${selectedStudentForLookup.anonId}. Audit log generated.`, 'success');
    setIsLookupModalOpen(false);
    setLookupReason('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Admin Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 text-white shadow-md">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="badge-status badge-neutral text-xs">Hostel Office & Technical Admin</span>
                <span className="badge-status badge-green text-xs">DPDP & Anonymity Safeguards Active</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 mt-1">
                Platform Admin & Privacy Security Console
              </h1>
              <p className="text-xs text-slate-500 max-w-2xl">
                Restricted hostel office interface for student verification, identity mapping security, abuse review, and pilot rollout management.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Sub-tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('registry')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'registry'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Database className="w-4 h-4 text-emerald-400" />
          <span>Identity Isolation & Registry</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'audit'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <History className="w-4 h-4 text-amber-400" />
          <span>Identity Access Audit Log ({auditLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('abuse')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'abuse'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <AlertOctagon className="w-4 h-4 text-rose-400" />
          <span>Abuse Escalation Queue</span>
        </button>

        <button
          onClick={() => setActiveTab('rollout')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'rollout'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sliders className="w-4 h-4 text-emerald-400" />
          <span>Rollout Toggles & Pilot Scorecard</span>
        </button>
      </div>

      {/* ================= TAB 1: IDENTITY REGISTRY & ENCRYPTED PARTITION ================= */}
      {activeTab === 'registry' && (
        <div className="space-y-6">
          {/* Privacy Architecture Visual Banner */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-2">
              <Lock className="w-4 h-4" />
              <span>CRYPTOGRAPHIC IDENTITY PARTITION (PRD SECTION 7)</span>
            </div>
            <p className="text-xs text-slate-300 mb-4 max-w-3xl">
              Student personal information is stored in an encrypted partition completely isolated from the feedback database. Mess managers, cooks, and wardens only interact with pseudonymous IDs (e.g. <code>ANON-7842</code>).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 text-xs">
                <span className="text-emerald-400 font-bold block mb-1">🔒 Real Student Database (Isolated)</span>
                <p className="text-slate-400">Roll No, Name, Hostel Room, College Email. Restricted to Admin with audit logging.</p>
              </div>
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 text-xs">
                <span className="text-amber-400 font-bold block mb-1">🌐 Anonymous Feedback Database (Public to Mess)</span>
                <p className="text-slate-400">Pseudonymous IDs, Star Ratings, Reason Chips, Redacted Comments.</p>
              </div>
            </div>
          </div>

          {/* Student Registry Table */}
          <div className="card-clean p-5">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Verified Student Roster</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Roll Number</th>
                    <th className="p-3">Hostel Room</th>
                    <th className="p-3">Pseudonymous ID</th>
                    <th className="p-3">Verification Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {registeredStudents.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-800">{st.name}</td>
                      <td className="p-3 font-mono text-slate-600">{st.rollNo}</td>
                      <td className="p-3 text-slate-600">{st.room}</td>
                      <td className="p-3">
                        <span className="bg-emerald-50 text-emerald-800 font-mono font-bold px-2 py-0.5 rounded border border-emerald-200">
                          {st.anonId}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="badge-status badge-green text-[10px]">Verified OTP</span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedStudentForLookup(st);
                            setIsLookupModalOpen(true);
                          }}
                          className="text-xs text-slate-600 hover:text-slate-900 font-semibold bg-slate-100 px-2 py-1 rounded"
                        >
                          Audit Lookup
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: AUDIT LOGS ================= */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="card-clean p-5">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <History className="w-4 h-4 text-emerald-600" />
                <span>Identity Access & Security Audit Trail (FR-20)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Every access to the identity mapping table is recorded for compliance with DPDP data governance.
              </p>
            </div>

            <div className="space-y-3">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-900">{log.action}</span>
                    <span className="text-xs text-slate-400 font-mono">{log.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    <strong>Actor:</strong> {log.actor} • <strong>Target:</strong> {log.target}
                  </p>
                  <p className="text-xs text-slate-800 bg-white p-2 rounded border border-slate-200 mt-2">
                    <strong>Documented Reason:</strong> {log.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: ABUSE ESCALATION ================= */}
      {activeTab === 'abuse' && (
        <div className="space-y-4">
          <div className="card-clean p-5">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-rose-600" />
                <span>Abuse Review Queue (FR-25)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Review comments flagged by manager for offensive language. Admin can suspend an anonymous ID without exposing student identity to the mess staff.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40">
              <div className="flex justify-between items-center mb-2">
                <span className="badge-status badge-rose text-[10px]">Active Review</span>
                <span className="text-xs text-slate-500 font-mono">Flagged on 29 Sep</span>
              </div>
              <p className="text-xs font-bold text-slate-900 mb-1">Flagged Anonymous Profile: ANON-9012</p>
              <p className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 mb-3">
                "Water glasses were oily near the dispenser. Dal me namak bohot zyada tha..."
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleAnonIdSuspension('ANON-9012', 'Cleared - Genuine feedback')}
                  className="btn-secondary text-xs py-1.5 px-3"
                >
                  Clear & Mark Genuine
                </button>
                <button
                  onClick={() => toggleAnonIdSuspension('ANON-9012', 'Suspended for abusive conduct')}
                  className="btn-primary bg-rose-600 hover:bg-rose-700 text-xs py-1.5 px-3"
                >
                  Suspend Anonymous ID (3 Days)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: ROLLOUT TOGGLES & PILOT SCORECARD ================= */}
      {activeTab === 'rollout' && (
        <div className="space-y-6">
          {/* Pilot Go / No-Go Scorecard (PRD Section 24.5) */}
          <div className="card-clean p-5">
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Pilot Go / No-Go Scorecard (PRD Section 24.5)</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Objective benchmark evaluated at Week 4 before expanding to other campus hostels.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-xs">
                <span className="font-bold text-emerald-900 block mb-1">Feedback Time (&lt;10s)</span>
                <div className="flex justify-between items-baseline">
                  <span className="text-base font-extrabold text-emerald-700">4.2s Median</span>
                  <span className="badge-status badge-green text-[10px]">PASS</span>
                </div>
              </div>

              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-xs">
                <span className="font-bold text-emerald-900 block mb-1">Identity Exposures</span>
                <div className="flex justify-between items-baseline">
                  <span className="text-base font-extrabold text-emerald-700">0 Breaches</span>
                  <span className="badge-status badge-green text-[10px]">PASS</span>
                </div>
              </div>

              <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs">
                <span className="font-bold text-amber-900 block mb-1">Response Rate (&gt;30%)</span>
                <div className="flex justify-between items-baseline">
                  <span className="text-base font-extrabold text-amber-700">26% Active</span>
                  <span className="badge-status badge-amber text-[10px]">ON TRACK</span>
                </div>
              </div>

              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-xs">
                <span className="font-bold text-emerald-900 block mb-1">Action Loop (≥3 Fixes)</span>
                <div className="flex justify-between items-baseline">
                  <span className="text-base font-extrabold text-emerald-700">4 Resolved</span>
                  <span className="badge-status badge-green text-[10px]">PASS</span>
                </div>
              </div>

              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-xs">
                <span className="font-bold text-emerald-900 block mb-1">Manager Engagement</span>
                <div className="flex justify-between items-baseline">
                  <span className="text-base font-extrabold text-emerald-700">6 Days / Wk</span>
                  <span className="badge-status badge-green text-[10px]">PASS</span>
                </div>
              </div>

              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-xs">
                <span className="font-bold text-emerald-900 block mb-1">Warden Involvement</span>
                <div className="flex justify-between items-baseline">
                  <span className="text-base font-extrabold text-emerald-700">Weekly Review</span>
                  <span className="badge-status badge-green text-[10px]">PASS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Module Feature Flags (FR-32) */}
          <div className="card-clean p-5">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              <span>Phase Rollout Toggles (PRD FR-32)</span>
            </h3>

            <div className="space-y-3">
              {localToggles.map((tog) => (
                <div key={tog.key} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{tog.title}</span>
                    <span className="text-[11px] text-slate-500">Stage: {tog.stage}</span>
                  </div>
                  <button
                    onClick={() => toggleFeature(tog.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      tog.enabled
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    {tog.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lookup Reason Modal */}
      {isLookupModalOpen && selectedStudentForLookup && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Document Escalation Reason for Identity Lookup
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Accessing student mapping for {selectedStudentForLookup.anonId}. Mandatory log is generated.
            </p>

            <form onSubmit={handleIdentityLookup} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Escalation Justification:</label>
                <textarea
                  value={lookupReason}
                  onChange={(e) => setLookupReason(e.target.value)}
                  rows={3}
                  required
                  placeholder="e.g. Formal disciplinary committee inquiry regarding abuse report #409."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-900"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsLookupModalOpen(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary bg-slate-900 hover:bg-slate-800 text-white text-xs py-2 px-4"
                >
                  Log & Proceed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
