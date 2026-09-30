import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Star,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  MessageSquare,
  ShieldAlert,
  Calendar,
  Vote,
  FileText,
  Mail,
  Plus,
  Edit,
  Send,
  Flag,
  Share2,
  ChevronDown,
  Info,
  Sliders,
  Copy,
  Check,
  Flame,
  Award
} from 'lucide-react';

export default function ManagerDashboard() {
  const {
    sessions,
    activeSession,
    feedbacks,
    weeklyMenu,
    aiSummary,
    issues,
    polls,
    updateIssueStatus,
    addSessionContextNote,
    createMenuPoll,
    updateMenuDish,
    copyLastWeekMenu,
    showNotification
  } = useApp();

  // Active View Tab: 'overview' | 'comments' | 'menu' | 'actions' | 'polls'
  const [activeTab, setActiveTab] = useState('overview');

  // Comments Filter
  const [commentFilter, setCommentFilter] = useState('all'); // 'all' | 'positive' | 'negative'
  const [mealFilter, setMealFilter] = useState('all');

  // Issue Action Modal State
  const [selectedIssueForAction, setSelectedIssueForAction] = useState(null);
  const [actionInput, setActionInput] = useState('');
  const [publicSummaryInput, setPublicSummaryInput] = useState('');
  const [publishToFeed, setPublishToFeed] = useState(true);

  // Context Note Modal State
  const [isContextNoteModalOpen, setIsContextNoteModalOpen] = useState(false);
  const [contextNoteText, setContextNoteText] = useState('');

  // New Poll Modal State
  const [isCreatePollOpen, setIsCreatePollOpen] = useState(false);
  const [newPollData, setNewPollData] = useState({
    title: 'Wednesday Special Lunch Poll 🍲',
    targetDate: 'Wednesday, 08 Oct',
    mealType: 'Lunch',
    option1: 'Matar Paneer with Puri & Kheer',
    option2: 'Dal Makhani with Butter Naan & Jeera Rice',
    option3: 'Veg Hyderabadi Biryani with Mirchi Salan',
    managerNote: 'Top choice will be included in the official weekly roster.'
  });

  // Daily Digest Modal State
  const [isDigestModalOpen, setIsDigestModalOpen] = useState(false);

  // Dispute Modal State (FR-33)
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');

  // Calculate stats
  const totalReviews = feedbacks.length;
  const avgRating = totalReviews > 0
    ? (feedbacks.reduce((acc, f) => acc + f.rating, 0) / totalReviews).toFixed(1)
    : '0.0';
  const lunchFeedbacks = feedbacks.filter(f => f.mealType === 'lunch');
  const lunchAvg = lunchFeedbacks.length > 0
    ? (lunchFeedbacks.reduce((acc, f) => acc + f.rating, 0) / lunchFeedbacks.length).toFixed(1)
    : '0.0';

  const expectedTotalDiners = 300;
  const responseRate = Math.round((totalReviews / expectedTotalDiners) * 100);

  // Filtered comments
  const filteredFeedbacks = feedbacks.filter(f => {
    if (commentFilter === 'positive' && f.rating < 4) return false;
    if (commentFilter === 'negative' && f.rating > 3) return false;
    if (mealFilter !== 'all' && f.mealType !== mealFilter) return false;
    return true;
  });

  const handleSaveAction = (e) => {
    e.preventDefault();
    if (!selectedIssueForAction) return;

    updateIssueStatus(
      selectedIssueForAction.id,
      'Resolved',
      actionInput || selectedIssueForAction.actionTaken,
      publicSummaryInput || actionInput,
      publishToFeed
    );

    setSelectedIssueForAction(null);
    setActionInput('');
    setPublicSummaryInput('');
  };

  const handleSaveContextNote = (e) => {
    e.preventDefault();
    if (!contextNoteText.trim()) return;
    addSessionContextNote(activeSession.id, contextNoteText);
    setIsContextNoteModalOpen(false);
    setContextNoteText('');
  };

  const handleCreatePollSubmit = (e) => {
    e.preventDefault();
    createMenuPoll({
      title: newPollData.title,
      targetDate: newPollData.targetDate,
      mealType: newPollData.mealType,
      options: [
        { title: newPollData.option1, tag: 'Option A' },
        { title: newPollData.option2, tag: 'Option B' },
        { title: newPollData.option3, tag: 'Option C' }
      ],
      managerNote: newPollData.managerNote
    });
    setIsCreatePollOpen(false);
  };

  const handleRaiseDispute = (e) => {
    e.preventDefault();
    if (!disputeReason.trim()) return;
    showNotification(`Dispute raised on ${activeSession.mealName} ratings. Platform Admin & Warden notified.`, 'info');
    setIsDisputeModalOpen(false);
    setDisputeReason('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* 2-Minute Daily Briefing Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge-status badge-green bg-amber-100 text-amber-900 border-amber-300">
                <Sparkles className="w-3.5 h-3.5" /> 2-Minute Daily Briefing
              </span>
              <span className="text-xs text-slate-500 font-medium">Updated live as students scan & rate</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1 font-heading">
              Mess Manager & Provider Command Center
            </h1>
            <p className="text-xs text-slate-500">
              Hostel Central Dining • Target Review Time: ~2 Minutes/Day
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsDigestModalOpen(true)}
              className="btn-secondary text-xs py-2 px-3 rounded-xl flex items-center gap-1.5 shadow-2xs"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <span>Daily Digest Preview</span>
            </button>
            <button
              onClick={() => setIsContextNoteModalOpen(true)}
              className="btn-secondary text-xs py-2 px-3 rounded-xl flex items-center gap-1.5 shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              <span>Add Meal Context Note</span>
            </button>
            <button
              onClick={() => setIsDisputeModalOpen(true)}
              className="btn-secondary text-xs py-2 px-3 rounded-xl flex items-center gap-1.5 text-rose-700 hover:bg-rose-50 border-rose-200 shadow-2xs"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Dispute Meal Ratings</span>
            </button>
          </div>
        </div>

        {/* 4 Core KPIs Cards with Distinct Colorful Accents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Average Rating */}
          <div className="bg-gradient-to-br from-amber-50/70 via-amber-50/30 to-white p-4.5 rounded-2xl border border-amber-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-amber-900 font-bold">
              <span>Overall Mess Rating</span>
              <div className="p-1.5 bg-amber-500 text-white rounded-lg shadow-xs">
                <Star className="w-4 h-4 fill-white text-white" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-slate-900 font-heading">{avgRating}</span>
              <span className="text-xs text-slate-500 font-medium">/ 5.0</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full ml-auto border border-emerald-200">
                +0.3 vs last wk
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Based on {totalReviews} total verified diner ratings</p>
          </div>

          {/* Response Count & Rate */}
          <div className="bg-gradient-to-br from-teal-50/70 via-emerald-50/30 to-white p-4.5 rounded-2xl border border-teal-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-teal-900 font-bold">
              <span>Today's Response Rate</span>
              <div className="p-1.5 bg-teal-600 text-white rounded-lg shadow-xs">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-slate-900 font-heading">{aiSummary.totalReviews}</span>
              <span className="text-xs text-slate-500 font-medium">of {expectedTotalDiners} Diners</span>
              <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full ml-auto border border-teal-200">
                {aiSummary.responseRatePercent}% Turnout
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Target: &gt;30% in Pilot Stage</p>
          </div>

          {/* Active Meal Session */}
          <div className="bg-gradient-to-br from-emerald-50/70 via-teal-50/30 to-white p-4.5 rounded-2xl border border-emerald-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-emerald-900 font-bold">
              <span>Live Meal Status</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-extrabold text-emerald-800 font-heading">{activeSession.mealName}</span>
              <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">
                {activeSession.scanCount} Scans
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              First scan: {activeSession.firstScanAt || '12:32 PM'} (QR Log OK)
            </p>
          </div>

          {/* Action Resolution Tracker */}
          <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/30 to-white p-4.5 rounded-2xl border border-purple-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-purple-900 font-bold">
              <span>Issues Resolved</span>
              <div className="p-1.5 bg-purple-600 text-white rounded-lg shadow-xs">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-slate-900 font-heading">
                {issues.filter(i => i.status === 'Resolved').length}
              </span>
              <span className="text-xs text-slate-500 font-medium">of {issues.length} Total</span>
              <span className="text-xs font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full ml-auto border border-purple-200">
                83% Fix Rate
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Avg Resolution Time: 2.3 days</p>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs with Signature Colors */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs ${
            activeTab === 'overview'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20'
              : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Daily Summary & Themes</span>
        </button>

        <button
          onClick={() => setActiveTab('comments')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs ${
            activeTab === 'comments'
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-amber-600/20'
              : 'text-slate-600 hover:bg-amber-50 hover:text-amber-900'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Multilingual Comments ({feedbacks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('menu')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs ${
            activeTab === 'menu'
              ? 'bg-gradient-to-r from-teal-600 to-cyan-700 text-white shadow-md shadow-teal-600/20'
              : 'text-slate-600 hover:bg-teal-50 hover:text-teal-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Weekly Menu & Timings</span>
        </button>

        <button
          onClick={() => setActiveTab('actions')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs ${
            activeTab === 'actions'
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-600/20'
              : 'text-slate-600 hover:bg-rose-50 hover:text-rose-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Action Tracker & You Said We Did ({issues.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('polls')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs ${
            activeTab === 'polls'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 hover:bg-purple-50 hover:text-purple-900'
          }`}
        >
          <Vote className="w-4 h-4" />
          <span>Menu Polls & Preference</span>
        </button>
      </div>

      {/* ================= TAB 1: AI DAILY SUMMARY & THEMES ================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* AI Daily Natural Language Executive Briefing */}
          <div className="card-clean p-5 border-emerald-200 bg-gradient-to-r from-emerald-50/40 via-white to-white">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-600 text-white shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">AI Daily Synthesis Briefing</h3>
                  <span className="text-xs text-slate-500">Processed from Reason Chips & Multilingual Free-Text</span>
                </div>
              </div>
              <span className="badge-status badge-green text-xs">
                Language Auto-Detected: English, Hindi & Hinglish
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-800 leading-relaxed bg-white p-3.5 rounded-xl border border-emerald-200/80 shadow-sm">
              "{aiSummary.headline}"
            </p>

            {/* Top Positives vs Negatives Breakdown (Equal Weight PRD Section 10.3) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Positive Themes */}
              <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>WHAT DINERS LIKED (Top Positive Themes)</span>
                </div>
                <div className="space-y-2.5">
                  {aiSummary.keyPositives.map((pos, idx) => (
                    <div key={idx} className="bg-white p-2.5 rounded-lg border border-emerald-100 text-xs">
                      <div className="flex justify-between font-bold text-slate-800 mb-1">
                        <span>{pos.theme}</span>
                        <span className="text-emerald-600">{pos.mentionCount} mentions ({pos.percentage}%)</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">{pos.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Needs Attention / Bottlenecks */}
              <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-800 mb-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>AREAS FOR IMPROVEMENT (Needs Attention)</span>
                </div>
                <div className="space-y-2.5">
                  {aiSummary.keyNegatives.map((neg, idx) => (
                    <div key={idx} className="bg-white p-2.5 rounded-lg border border-rose-100 text-xs">
                      <div className="flex justify-between font-bold text-slate-800 mb-1">
                        <span>{neg.theme}</span>
                        <span className="text-rose-600">{neg.mentionCount} mentions ({neg.percentage}%)</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">{neg.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Needs Attention Actionable Cards */}
          <div className="card-clean p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Recommended Operational Adjustments for Tonight / Tomorrow</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiSummary.needsAttention.map((alert) => (
                <div key={alert.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`badge-status ${alert.severity === 'medium' ? 'badge-amber' : 'badge-neutral'}`}>
                      {alert.severity.toUpperCase()} Priority
                    </span>
                    <button
                      onClick={() => {
                        setSelectedIssueForAction({ id: alert.id, title: alert.title, theme: 'Operational' });
                        setActionInput(alert.suggestedAction);
                        setPublicSummaryInput(alert.suggestedAction);
                      }}
                      className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Track & Fix
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">{alert.title}</h4>
                  <p className="text-xs text-slate-600 mb-2">{alert.summary}</p>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs text-emerald-900 font-medium">
                    💡 <strong>Suggested Action:</strong> {alert.suggestedAction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: MULTILINGUAL & REDACTED COMMENTS ================= */}
      {activeTab === 'comments' && (
        <div className="space-y-4">
          <div className="card-clean p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Student Feedback Stream</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Privacy Protected: Personal details (names, room numbers, phone numbers) are automatically redacted before display.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 text-xs">
                <select
                  value={commentFilter}
                  onChange={(e) => setCommentFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700"
                >
                  <option value="all">All Sentiments</option>
                  <option value="positive">Positive Only (4-5★)</option>
                  <option value="negative">Negative Only (1-3★)</option>
                </select>

                <select
                  value={mealFilter}
                  onChange={(e) => setMealFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700"
                >
                  <option value="all">All Meals</option>
                  <option value="lunch">Lunch</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-3">
              {filteredFeedbacks.map((fb) => (
                <div key={fb.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= fb.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-900">{fb.rating}.0 / 5</span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500 font-medium capitalize">{fb.mealType} ({fb.date})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="badge-status badge-neutral text-[10px] font-mono">
                        {fb.language}
                      </span>
                      <button
                        onClick={() => showNotification(`Feedback ${fb.id} flagged for Platform Admin review.`, 'info')}
                        className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1"
                        title="Flag abusive feedback"
                      >
                        <Flag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Chips */}
                  {fb.chips && fb.chips.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {fb.chips.map((chip, idx) => (
                        <span
                          key={idx}
                          className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                            chip.direction === 'positive'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {chip.label}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Redacted Comment Text */}
                  {fb.comment ? (
                    <p className="text-xs text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed font-sans">
                      "{fb.redactedComment || fb.comment}"
                    </p>
                  ) : (
                    <span className="text-xs text-slate-400 italic">No additional text comment submitted.</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: WEEKLY MENU & TIMINGS ================= */}
      {activeTab === 'menu' && (
        <div className="space-y-4">
          <div className="card-clean p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>{weeklyMenu.weekTitle} Management</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Published menu automatically powers the student rating windows and current meal detection.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyLastWeekMenu}
                  className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  <span>Copy Last Week</span>
                </button>
                <button
                  onClick={() => showNotification('Menu published to student dashboards!', 'success')}
                  className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Publish Menu</span>
                </button>
              </div>
            </div>

            {/* Days Grid */}
            <div className="space-y-4">
              {weeklyMenu.days.map((d, index) => (
                <div key={d.day} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span>{d.day}</span>
                      {d.isToday && <span className="badge-status badge-amber text-[10px]">Today</span>}
                      {d.isSpecial && <span className="badge-status badge-green text-[10px]">Special Feast</span>}
                    </h4>
                    <span className="text-xs text-slate-400">3 Meals Scheduled</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Breakfast */}
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <div className="text-xs font-bold text-slate-700 mb-1.5 flex justify-between">
                        <span>☕ Breakfast</span>
                        <span className="text-slate-400 font-normal">07:30 - 09:30</span>
                      </div>
                      <div className="text-xs text-slate-600 space-y-1">
                        {d.meals.breakfast.map((dish, i) => (
                          <div key={i}>• {dish}</div>
                        ))}
                      </div>
                    </div>

                    {/* Lunch */}
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <div className="text-xs font-bold text-emerald-800 mb-1.5 flex justify-between">
                        <span>🍛 Lunch</span>
                        <span className="text-slate-400 font-normal">12:30 - 14:30</span>
                      </div>
                      <div className="text-xs text-slate-700 space-y-1 font-medium">
                        {d.meals.lunch.map((dish, i) => (
                          <div key={i}>• {dish}</div>
                        ))}
                      </div>
                    </div>

                    {/* Dinner */}
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <div className="text-xs font-bold text-slate-700 mb-1.5 flex justify-between">
                        <span>🌙 Dinner</span>
                        <span className="text-slate-400 font-normal">19:30 - 21:30</span>
                      </div>
                      <div className="text-xs text-slate-600 space-y-1">
                        {d.meals.dinner.map((dish, i) => (
                          <div key={i}>• {dish}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: ACTION TRACKING & YOU SAID WE DID ================= */}
      {activeTab === 'actions' && (
        <div className="space-y-4">
          <div className="card-clean p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Corrective Action Pipeline</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Track recurring themes, record kitchen adjustments, and publish "You Said → We Did" updates to student feeds.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {issues.map((issue) => (
                <div key={issue.id} className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`badge-status ${
                        issue.status === 'Resolved' ? 'badge-green' : 'badge-amber'
                      }`}>
                        {issue.status}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{issue.id}: {issue.title}</span>
                    </div>
                    <span className="text-xs text-slate-400">Detected: {issue.detectedDate}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-500 font-semibold block mb-0.5">Category Theme:</span>
                      <p className="text-slate-800 font-medium">{issue.theme} ({issue.mealType})</p>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold block mb-0.5">Action Record:</span>
                      <p className="text-slate-800 font-medium">{issue.actionTaken || 'Pending action definition'}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                    <div className="text-xs text-slate-500">
                      {issue.publishedToFeed ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Published to "You Said → We Did" Feed
                        </span>
                      ) : (
                        <span>Internal record (Not published to students)</span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedIssueForAction(issue);
                        setActionInput(issue.actionTaken || '');
                        setPublicSummaryInput(issue.publicSummary || issue.actionTaken || '');
                      }}
                      className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
                    >
                      <Edit className="w-3 h-3 text-emerald-600" />
                      <span>Update Action</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 5: MENU POLLS & STUDENT PREFERENCES ================= */}
      {activeTab === 'polls' && (
        <div className="space-y-4">
          <div className="card-clean p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Vote className="w-4 h-4 text-emerald-600" />
                  <span>Student Menu Preference Polls (Phase 5)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Allow students to vote on provider-approved meal options. Polls inform planning without compromising budget/capacity.
                </p>
              </div>

              <button
                onClick={() => setIsCreatePollOpen(true)}
                className="btn-primary text-xs py-2 px-3 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Poll</span>
              </button>
            </div>

            {/* Polls List */}
            <div className="space-y-4">
              {polls.map((poll) => (
                <div key={poll.id} className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <span className="badge-status badge-green text-xs">Active Student Poll</span>
                    <span className="text-xs font-bold text-slate-700">{poll.totalVotes} Total Votes Cast</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">{poll.title}</h4>
                  <p className="text-xs text-slate-500 mb-3">{poll.description}</p>

                  <div className="space-y-2">
                    {poll.options.map((opt) => (
                      <div key={opt.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                          <span>{opt.title}</span>
                          <span className="text-emerald-700">{opt.votes} votes ({opt.percentage}%)</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${opt.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-500 mt-3 italic">
                    Note: {poll.managerNote}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: UPDATE ACTION & PUBLISH ================= */}
      {selectedIssueForAction && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Record Action for Issue {selectedIssueForAction.id}
            </h3>
            <p className="text-xs text-slate-500 mb-4">{selectedIssueForAction.title}</p>

            <form onSubmit={handleSaveAction} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Internal Corrective Action:
                </label>
                <textarea
                  value={actionInput}
                  onChange={(e) => setActionInput(e.target.value)}
                  rows={2}
                  required
                  placeholder="e.g. Adjusted spice level in dal recipe, added extra hot casserole station"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-600"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Public Summary for "You Said → We Did":
                </label>
                <input
                  type="text"
                  value={publicSummaryInput}
                  onChange={(e) => setPublicSummaryInput(e.target.value)}
                  required
                  placeholder="e.g. Standardized spice level in Dal Tadka. Chili reduced per student feedback."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-700">
                <input
                  type="checkbox"
                  id="publishCheck"
                  checked={publishToFeed}
                  onChange={(e) => setPublishToFeed(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="publishCheck" className="font-medium cursor-pointer">
                  Publish update to student "You Said → We Did" feed (Theme-level, no student identity)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedIssueForAction(null)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-4"
                >
                  Save & Resolve Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD CONTEXT NOTE ================= */}
      {isContextNoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Add Context Note to Today's {activeSession.mealName}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Official operational notes appear alongside ratings for Warden and Manager review (e.g. gas supply delay).
            </p>

            <form onSubmit={handleSaveContextNote} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Context Note:</label>
                <textarea
                  value={contextNoteText}
                  onChange={(e) => setContextNoteText(e.target.value)}
                  rows={3}
                  required
                  placeholder="e.g. Commercial cylinder delivery was delayed by 20 mins; extra counter operational."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-600"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsContextNoteModalOpen(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-4"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: CREATE POLL ================= */}
      {isCreatePollOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Create Upcoming Meal Poll</h3>
            <p className="text-xs text-slate-500 mb-4">
              Set provider-approved meal options for students to vote on.
            </p>

            <form onSubmit={handleCreatePollSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Poll Title:</label>
                <input
                  type="text"
                  value={newPollData.title}
                  onChange={(e) => setNewPollData({ ...newPollData, title: e.target.value })}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Date:</label>
                  <input
                    type="text"
                    value={newPollData.targetDate}
                    onChange={(e) => setNewPollData({ ...newPollData, targetDate: e.target.value })}
                    required
                    className="w-full text-xs p-2 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Meal Type:</label>
                  <select
                    value={newPollData.mealType}
                    onChange={(e) => setNewPollData({ ...newPollData, mealType: e.target.value })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Breakfast">Breakfast</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Option 1:</label>
                <input
                  type="text"
                  value={newPollData.option1}
                  onChange={(e) => setNewPollData({ ...newPollData, option1: e.target.value })}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Option 2:</label>
                <input
                  type="text"
                  value={newPollData.option2}
                  onChange={(e) => setNewPollData({ ...newPollData, option2: e.target.value })}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Option 3:</label>
                <input
                  type="text"
                  value={newPollData.option3}
                  onChange={(e) => setNewPollData({ ...newPollData, option3: e.target.value })}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreatePollOpen(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-4"
                >
                  Publish Poll to Students
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: DAILY DIGEST PREVIEW (FR-27) ================= */}
      {isDigestModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>Daily Digest Simulation (FR-27)</span>
              </h3>
              <span className="badge-status badge-green text-[10px]">Email / WhatsApp Channel</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <p className="font-bold text-slate-800">Subject: Apni Rasoi Daily Digest — 30 Sep 2026</p>
              <div className="border-t border-slate-200 pt-2 space-y-1 text-slate-700">
                <p>📊 <strong>Total Ratings:</strong> 78 Diners (26% response rate)</p>
                <p>⭐ <strong>Average Rating:</strong> 3.8 / 5.0</p>
                <p>✨ <strong>Top Positive:</strong> Taste & Food Quality (61%)</p>
                <p>⚠️ <strong>Top Negative:</strong> Roti Temperature at Peak (24%)</p>
                <p className="pt-2 italic text-slate-500">"Gulab Jamun was highly appreciated. Water glass dispenser checked."</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setIsDigestModalOpen(false)}
                className="btn-secondary text-xs py-2 px-4"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showNotification('Daily digest sent to mess.manager@hostel.edu and WhatsApp group.', 'success');
                  setIsDigestModalOpen(false);
                }}
                className="btn-primary text-xs py-2 px-4"
              >
                <Send className="w-3.5 h-3.5" /> Send Test Digest
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: DISPUTE REQUEST (FR-33) ================= */}
      {isDisputeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Raise Rating Dispute (FR-33)</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Provider can dispute ratings due to operational failures or suspected abuse. Platform Admin & Warden review dispute.
            </p>

            <form onSubmit={handleRaiseDispute} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dispute Grounds & Reason:</label>
                <textarea
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  rows={3}
                  required
                  placeholder="e.g. City gas pipeline failure caused 20m food preparation delay; requests context note attachment."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-600"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsDisputeModalOpen(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-4 bg-rose-600 hover:bg-rose-700"
                >
                  Submit Dispute for Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
