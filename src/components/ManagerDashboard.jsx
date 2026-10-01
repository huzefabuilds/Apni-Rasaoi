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
  Award,
  X,
  ThumbsUp,
  ThumbsDown,
  Activity,
  Zap
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
      {/* 2-Minute Daily Briefing Header (Rich Dark Glass with Neon Highlights) */}
      <div className="bg-[#131B2E] border border-[#233252] rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-[#233252] relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge-status badge-amber flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 2-Minute Daily Briefing
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>Updated live as students scan & rate</span>
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-1 font-heading">
              Mess Manager & Provider Command Center
            </h1>
            <p className="text-xs text-slate-400">
              Hostel Central Dining • Target Review Time: ~2 Minutes/Day
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsDigestModalOpen(true)}
              className="btn-secondary text-xs py-2 px-3.5 rounded-xl flex items-center gap-2 shadow-sm hover:border-emerald-500/40"
            >
              <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <span>Daily Digest Preview</span>
            </button>
            <button
              onClick={() => setIsContextNoteModalOpen(true)}
              className="btn-secondary text-xs py-2 px-3.5 rounded-xl flex items-center gap-2 shadow-sm hover:border-amber-500/40"
            >
              <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <span>Add Meal Context Note</span>
            </button>
            <button
              onClick={() => setIsDisputeModalOpen(true)}
              className="btn-secondary text-xs py-2 px-3.5 rounded-xl flex items-center gap-2 text-rose-300 hover:bg-rose-950/40 border-rose-500/30 shadow-sm"
            >
              <div className="p-1 rounded-lg bg-rose-500/20 text-rose-400">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <span>Dispute Meal Ratings</span>
            </button>
          </div>
        </div>

        {/* 4 Core KPIs Cards with Distinct Colorful Glowing Accents & Icon Containers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {/* Average Rating - Amber / Gold Glow */}
          <div className="bg-gradient-to-br from-amber-950/40 via-[#162035] to-[#0E1524] p-4.5 rounded-2xl border border-amber-500/30 shadow-lg">
            <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
              <span>Overall Mess Rating</span>
              <div className="p-2 bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-bold rounded-xl shadow-md shadow-amber-500/20">
                <Star className="w-4 h-4 fill-slate-950 text-slate-950 stroke-[2.5]" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-white font-heading">{avgRating}</span>
              <span className="text-xs text-slate-400 font-medium">/ 5.0</span>
              <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full ml-auto border border-emerald-500/30 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" /> +0.3
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Based on {totalReviews} total verified diner ratings</p>
          </div>

          {/* Response Count & Rate - Cyan / Teal Glow */}
          <div className="bg-gradient-to-br from-cyan-950/40 via-[#162035] to-[#0E1524] p-4.5 rounded-2xl border border-cyan-500/30 shadow-lg">
            <div className="flex items-center justify-between text-xs text-cyan-300 font-bold">
              <span>Today's Response Rate</span>
              <div className="p-2 bg-gradient-to-tr from-cyan-500 to-teal-500 text-slate-950 rounded-xl shadow-md shadow-cyan-500/20">
                <Users className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-white font-heading">{aiSummary.totalReviews}</span>
              <span className="text-xs text-slate-400 font-medium">of {expectedTotalDiners} Diners</span>
              <span className="text-xs font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-full ml-auto border border-cyan-500/30">
                {aiSummary.responseRatePercent}% Turnout
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Target: &gt;30% in Pilot Stage</p>
          </div>

          {/* Active Meal Session - Emerald Green Glow */}
          <div className="bg-gradient-to-br from-emerald-950/40 via-[#162035] to-[#0E1524] p-4.5 rounded-2xl border border-emerald-500/30 shadow-lg">
            <div className="flex items-center justify-between text-xs text-emerald-300 font-bold">
              <span>Live Meal Status</span>
              <div className="p-2 bg-gradient-to-tr from-emerald-500 to-teal-500 text-slate-950 rounded-xl shadow-md shadow-emerald-500/20 relative">
                <Flame className="w-4 h-4 stroke-[2.5]" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-extrabold text-emerald-300 font-heading">{activeSession.mealName}</span>
              <span className="text-xs font-bold text-emerald-200 bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
                {activeSession.scanCount} Scans
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              First scan: {activeSession.firstScanAt || '12:32 PM'} (QR Log OK)
            </p>
          </div>

          {/* Action Resolution Tracker - Royal Purple Glow */}
          <div className="bg-gradient-to-br from-purple-950/40 via-[#162035] to-[#0E1524] p-4.5 rounded-2xl border border-purple-500/30 shadow-lg">
            <div className="flex items-center justify-between text-xs text-purple-300 font-bold">
              <span>Issues Resolved</span>
              <div className="p-2 bg-gradient-to-tr from-purple-500 to-indigo-500 text-white rounded-xl shadow-md shadow-purple-500/20">
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-white font-heading">
                {issues.filter(i => i.status === 'Resolved').length}
              </span>
              <span className="text-xs text-slate-400 font-medium">of {issues.length} Total</span>
              <span className="text-xs font-bold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded-full ml-auto border border-purple-500/30">
                83% Fix Rate
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Avg Resolution Time: 2.3 days</p>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs with Signature Colorful Gradients & Badges */}
      <div className="flex items-center gap-2 border-b border-[#233252] pb-3 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 shadow-sm ${
            activeTab === 'overview'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30 border border-emerald-400/40'
              : 'text-slate-300 bg-[#131B2E] hover:bg-[#1C2640] border border-[#233252]'
          }`}
        >
          <div className={`p-1 rounded-lg ${activeTab === 'overview' ? 'bg-white/20 text-white' : 'bg-emerald-950/60 text-emerald-400'}`}>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span>AI Daily Summary & Themes</span>
        </button>

        <button
          onClick={() => setActiveTab('comments')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 shadow-sm ${
            activeTab === 'comments'
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-900/30 border border-amber-400/40'
              : 'text-slate-300 bg-[#131B2E] hover:bg-[#1C2640] border border-[#233252]'
          }`}
        >
          <div className={`p-1 rounded-lg ${activeTab === 'comments' ? 'bg-white/20 text-white' : 'bg-amber-950/60 text-amber-400'}`}>
            <MessageSquare className="w-3.5 h-3.5" />
          </div>
          <span>Multilingual Comments ({feedbacks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('menu')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 shadow-sm ${
            activeTab === 'menu'
              ? 'bg-gradient-to-r from-teal-600 to-cyan-700 text-white shadow-lg shadow-teal-900/30 border border-teal-400/40'
              : 'text-slate-300 bg-[#131B2E] hover:bg-[#1C2640] border border-[#233252]'
          }`}
        >
          <div className={`p-1 rounded-lg ${activeTab === 'menu' ? 'bg-white/20 text-white' : 'bg-teal-950/60 text-teal-400'}`}>
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <span>Weekly Menu & Timings</span>
        </button>

        <button
          onClick={() => setActiveTab('actions')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 shadow-sm ${
            activeTab === 'actions'
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-900/30 border border-rose-400/40'
              : 'text-slate-300 bg-[#131B2E] hover:bg-[#1C2640] border border-[#233252]'
          }`}
        >
          <div className={`p-1 rounded-lg ${activeTab === 'actions' ? 'bg-white/20 text-white' : 'bg-rose-950/60 text-rose-400'}`}>
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <span>Action Tracker ({issues.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('polls')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 shadow-sm ${
            activeTab === 'polls'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/30 border border-purple-400/40'
              : 'text-slate-300 bg-[#131B2E] hover:bg-[#1C2640] border border-[#233252]'
          }`}
        >
          <div className={`p-1 rounded-lg ${activeTab === 'polls' ? 'bg-white/20 text-white' : 'bg-purple-950/60 text-purple-400'}`}>
            <Vote className="w-3.5 h-3.5" />
          </div>
          <span>Menu Polls & Preference</span>
        </button>
      </div>

      {/* ================= TAB 1: AI DAILY SUMMARY & THEMES ================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* AI Daily Natural Language Executive Briefing */}
          <div className="card-clean p-5 sm:p-6 border-[#233252] bg-[#131B2E] shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-heading">AI Daily Synthesis Briefing</h3>
                  <span className="text-xs text-slate-400">Processed from Reason Chips & Multilingual Free-Text</span>
                </div>
              </div>
              <span className="badge-status badge-green text-xs flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Language Auto-Detected: English, Hindi & Hinglish
              </span>
            </div>

            <p className="text-sm font-semibold text-emerald-100 leading-relaxed bg-[#0E1524] p-4 rounded-xl border border-emerald-500/30 shadow-inner">
              "{aiSummary.headline}"
            </p>

            {/* Top Positives vs Negatives Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Positive Themes */}
              <div className="bg-emerald-950/30 p-4.5 rounded-2xl border border-emerald-500/30 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 mb-3">
                  <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Award className="w-4 h-4" />
                  </div>
                  <span>WHAT DINERS LIKED (Top Positive Themes)</span>
                </div>
                <div className="space-y-2.5">
                  {aiSummary.keyPositives.map((pos, idx) => (
                    <div key={idx} className="bg-[#0E1524] p-3 rounded-xl border border-emerald-500/20 text-xs">
                      <div className="flex justify-between font-bold text-white mb-1">
                        <span className="flex items-center gap-1.5">
                          <ThumbsUp className="w-3 h-3 text-emerald-400" />
                          <span>{pos.theme}</span>
                        </span>
                        <span className="text-emerald-400">{pos.mentionCount} mentions ({pos.percentage}%)</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">{pos.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Needs Attention / Bottlenecks */}
              <div className="bg-rose-950/30 p-4.5 rounded-2xl border border-rose-500/30 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-300 mb-3">
                  <div className="p-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <span>AREAS FOR IMPROVEMENT (Needs Attention)</span>
                </div>
                <div className="space-y-2.5">
                  {aiSummary.keyNegatives.map((neg, idx) => (
                    <div key={idx} className="bg-[#0E1524] p-3 rounded-xl border border-rose-500/20 text-xs">
                      <div className="flex justify-between font-bold text-white mb-1">
                        <span className="flex items-center gap-1.5">
                          <ThumbsDown className="w-3 h-3 text-rose-400" />
                          <span>{neg.theme}</span>
                        </span>
                        <span className="text-rose-400">{neg.mentionCount} mentions ({neg.percentage}%)</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">{neg.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Needs Attention Actionable Cards */}
          <div className="card-clean p-5 sm:p-6 border-[#233252] bg-[#131B2E]">
            <h3 className="text-sm font-bold text-white mb-3.5 flex items-center gap-2 font-heading">
              <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <span>Recommended Operational Adjustments for Tonight / Tomorrow</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiSummary.needsAttention.map((alert) => (
                <div key={alert.id} className="p-4 rounded-2xl border border-[#233252] bg-[#0E1524] hover:border-amber-500/40 transition shadow-lg">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className={`badge-status ${alert.severity === 'medium' ? 'badge-amber' : 'badge-neutral'}`}>
                      {alert.severity.toUpperCase()} Priority
                    </span>
                    <button
                      onClick={() => {
                        setSelectedIssueForAction({ id: alert.id, title: alert.title, theme: 'Operational' });
                        setActionInput(alert.suggestedAction);
                        setPublicSummaryInput(alert.suggestedAction);
                      }}
                      className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30"
                    >
                      <Plus className="w-3.5 h-3.5" /> Track & Fix
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">{alert.title}</h4>
                  <p className="text-xs text-slate-300 mb-2.5">{alert.summary}</p>
                  <div className="bg-[#162035] p-2.5 rounded-xl border border-[#28375A] text-xs text-emerald-300 font-medium flex items-start gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Suggested Action:</strong> {alert.suggestedAction}</span>
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
          <div className="card-clean p-5 sm:p-6 border-[#233252] bg-[#131B2E]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#233252] pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                  <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span>Student Feedback Stream</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Privacy Protected: Personal details (names, room numbers, phone numbers) are automatically redacted before display.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 text-xs">
                <select
                  value={commentFilter}
                  onChange={(e) => setCommentFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-[#28375A] bg-[#0E1524] font-medium text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="all">All Sentiments</option>
                  <option value="positive">Positive Only (4-5★)</option>
                  <option value="negative">Negative Only (1-3★)</option>
                </select>

                <select
                  value={mealFilter}
                  onChange={(e) => setMealFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-[#28375A] bg-[#0E1524] font-medium text-slate-200 focus:outline-none focus:border-amber-500"
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
                <div key={fb.id} className="p-4 rounded-xl border border-[#233252] bg-[#0E1524] hover:border-slate-700 transition shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= fb.rating ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]' : 'text-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-white">{fb.rating}.0 / 5</span>
                      <span className="text-xs text-slate-600">•</span>
                      <span className="text-xs text-slate-400 font-medium capitalize">{fb.mealType} ({fb.date})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="badge-status badge-neutral text-[10px] font-mono">
                        {fb.language}
                      </span>
                      <button
                        onClick={() => showNotification(`Feedback ${fb.id} flagged for Platform Admin review.`, 'info')}
                        className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 p-1 rounded-lg hover:bg-rose-950/40"
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
                              ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40'
                              : 'bg-rose-950/70 text-rose-300 border border-rose-500/40'
                          }`}
                        >
                          {chip.label}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Redacted Comment Text */}
                  {fb.comment ? (
                    <p className="text-xs text-slate-200 bg-[#162035] p-3 rounded-xl border border-[#28375A] leading-relaxed font-sans">
                      "{fb.redactedComment || fb.comment}"
                    </p>
                  ) : (
                    <span className="text-xs text-slate-500 italic">No additional text comment submitted.</span>
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
          <div className="card-clean p-5 sm:p-6 border-[#233252] bg-[#131B2E]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#233252] pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                  <div className="p-1 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span>{weeklyMenu.weekTitle} Management</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Published menu automatically powers the student rating windows and current meal detection.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyLastWeekMenu}
                  className="btn-secondary text-xs py-2 px-3.5 flex items-center gap-2"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-300" />
                  <span>Copy Last Week</span>
                </button>
                <button
                  onClick={() => showNotification('Menu published to student dashboards!', 'success')}
                  className="btn-primary text-xs py-2 px-4 flex items-center gap-2"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Publish Menu</span>
                </button>
              </div>
            </div>

            {/* Days Grid */}
            <div className="space-y-4">
              {weeklyMenu.days.map((d, index) => (
                <div key={d.day} className="p-4.5 rounded-2xl border border-[#233252] bg-[#0E1524]">
                  <div className="flex items-center justify-between mb-3.5">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2 font-heading">
                      <span>{d.day}</span>
                      {d.isToday && <span className="badge-status badge-amber text-[10px]">Today</span>}
                      {d.isSpecial && <span className="badge-status badge-green text-[10px]">Special Feast</span>}
                    </h4>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 3 Meals Scheduled
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Breakfast */}
                    <div className="bg-[#162035] p-3.5 rounded-xl border border-[#28375A]">
                      <div className="text-xs font-bold text-amber-300 mb-2 flex justify-between items-center">
                        <span>☕ Breakfast</span>
                        <span className="text-slate-400 font-normal text-[11px]">07:30 - 09:30</span>
                      </div>
                      <div className="text-xs text-slate-300 space-y-1">
                        {d.meals.breakfast.map((dish, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="text-amber-400 font-bold">›</span>
                            <span>{dish}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Lunch */}
                    <div className="bg-[#162035] p-3.5 rounded-xl border border-emerald-500/30">
                      <div className="text-xs font-bold text-emerald-300 mb-2 flex justify-between items-center">
                        <span>🍛 Lunch</span>
                        <span className="text-slate-400 font-normal text-[11px]">12:30 - 14:30</span>
                      </div>
                      <div className="text-xs text-slate-200 space-y-1 font-medium">
                        {d.meals.lunch.map((dish, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="text-emerald-400 font-bold">›</span>
                            <span>{dish}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dinner */}
                    <div className="bg-[#162035] p-3.5 rounded-xl border border-indigo-500/30">
                      <div className="text-xs font-bold text-indigo-300 mb-2 flex justify-between items-center">
                        <span>🌙 Dinner</span>
                        <span className="text-slate-400 font-normal text-[11px]">19:30 - 21:30</span>
                      </div>
                      <div className="text-xs text-slate-300 space-y-1">
                        {d.meals.dinner.map((dish, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="text-indigo-400 font-bold">›</span>
                            <span>{dish}</span>
                          </div>
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
          <div className="card-clean p-5 sm:p-6 border-[#233252] bg-[#131B2E]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#233252] pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                  <div className="p-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span>Corrective Action Pipeline</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Track recurring themes, record kitchen adjustments, and publish "You Said → We Did" updates to student feeds.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {issues.map((issue) => (
                <div key={issue.id} className="p-4 rounded-2xl border border-[#233252] bg-[#0E1524]">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`badge-status ${
                        issue.status === 'Resolved' ? 'badge-green' : 'badge-amber'
                      }`}>
                        {issue.status}
                      </span>
                      <span className="text-xs font-bold text-white">{issue.id}: {issue.title}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Detected: {issue.detectedDate}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 bg-[#162035] p-3 rounded-xl border border-[#28375A] text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block mb-0.5">Category Theme:</span>
                      <p className="text-slate-200 font-medium">{issue.theme} ({issue.mealType})</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block mb-0.5">Action Record:</span>
                      <p className="text-slate-200 font-medium">{issue.actionTaken || 'Pending action definition'}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#233252]">
                    <div className="text-xs text-slate-400">
                      {issue.publishedToFeed ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1.5">
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
                      <Edit className="w-3.5 h-3.5 text-emerald-400" />
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
          <div className="card-clean p-5 sm:p-6 border-[#233252] bg-[#131B2E]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#233252] pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                  <div className="p-1 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    <Vote className="w-4 h-4" />
                  </div>
                  <span>Student Menu Preference Polls (Phase 5)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Allow students to vote on provider-approved meal options. Polls inform planning without compromising budget/capacity.
                </p>
              </div>

              <button
                onClick={() => setIsCreatePollOpen(true)}
                className="btn-primary text-xs py-2 px-3.5 flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Poll</span>
              </button>
            </div>

            {/* Polls List */}
            <div className="space-y-4">
              {polls.map((poll) => (
                <div key={poll.id} className="p-4.5 rounded-2xl border border-[#233252] bg-[#0E1524]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="badge-status badge-purple text-xs flex items-center gap-1">
                      <Vote className="w-3 h-3" /> Active Student Poll
                    </span>
                    <span className="text-xs font-bold text-purple-300">{poll.totalVotes} Total Votes Cast</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1 font-heading">{poll.title}</h4>
                  <p className="text-xs text-slate-400 mb-3">{poll.description}</p>

                  <div className="space-y-2.5">
                    {poll.options.map((opt) => (
                      <div key={opt.id} className="bg-[#162035] p-3 rounded-xl border border-[#28375A]">
                        <div className="flex justify-between text-xs font-bold text-slate-200 mb-1.5">
                          <span>{opt.title}</span>
                          <span className="text-purple-300">{opt.votes} votes ({opt.percentage}%)</span>
                        </div>
                        <div className="w-full bg-[#0E1524] h-2.5 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full" style={{ width: `${opt.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-400 mt-3 italic flex items-center gap-1">
                    <Info className="w-3 h-3 text-slate-500" />
                    <span>Note: {poll.managerNote}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: UPDATE ACTION & PUBLISH ================= */}
      {selectedIssueForAction && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#131B2E] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#233252]">
            <h3 className="text-lg font-bold text-white mb-1 font-heading flex items-center gap-2">
              <Edit className="w-4 h-4 text-emerald-400" />
              <span>Record Action for Issue {selectedIssueForAction.id}</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">{selectedIssueForAction.title}</p>

            <form onSubmit={handleSaveAction} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Internal Corrective Action:
                </label>
                <textarea
                  value={actionInput}
                  onChange={(e) => setActionInput(e.target.value)}
                  rows={2}
                  required
                  placeholder="e.g. Adjusted spice level in dal recipe, added extra hot casserole station"
                  className="w-full text-xs p-3 rounded-xl border border-[#28375A] bg-[#0E1524] text-white focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Public Summary for "You Said → We Did":
                </label>
                <input
                  type="text"
                  value={publicSummaryInput}
                  onChange={(e) => setPublicSummaryInput(e.target.value)}
                  required
                  placeholder="e.g. Standardized spice level in Dal Tadka. Chili reduced per student feedback."
                  className="w-full text-xs p-3 rounded-xl border border-[#28375A] bg-[#0E1524] text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  id="publishCheck"
                  checked={publishToFeed}
                  onChange={(e) => setPublishToFeed(e.target.checked)}
                  className="rounded text-emerald-500 focus:ring-emerald-500 bg-[#0E1524] border-[#28375A]"
                />
                <label htmlFor="publishCheck" className="font-medium cursor-pointer">
                  Publish update to student "You Said → We Did" feed (Theme-level, no student identity)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#233252]">
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
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#131B2E] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#233252]">
            <h3 className="text-lg font-bold text-white mb-1 font-heading flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Add Context Note to Today's {activeSession.mealName}</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Official operational notes appear alongside ratings for Warden and Manager review (e.g. gas supply delay).
            </p>

            <form onSubmit={handleSaveContextNote} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Context Note:</label>
                <textarea
                  value={contextNoteText}
                  onChange={(e) => setContextNoteText(e.target.value)}
                  rows={3}
                  required
                  placeholder="e.g. Commercial cylinder delivery was delayed by 20 mins; extra counter operational."
                  className="w-full text-xs p-3 rounded-xl border border-[#28375A] bg-[#0E1524] text-white focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#233252]">
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
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#131B2E] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#233252]">
            <h3 className="text-lg font-bold text-white mb-1 font-heading flex items-center gap-2">
              <Vote className="w-4 h-4 text-purple-400" />
              <span>Create Upcoming Meal Poll</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Set provider-approved meal options for students to vote on.
            </p>

            <form onSubmit={handleCreatePollSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Poll Title:</label>
                <input
                  type="text"
                  value={newPollData.title}
                  onChange={(e) => setNewPollData({ ...newPollData, title: e.target.value })}
                  required
                  className="w-full text-xs p-2.5 rounded-xl border border-[#28375A] bg-[#0E1524] text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Target Date:</label>
                  <input
                    type="text"
                    value={newPollData.targetDate}
                    onChange={(e) => setNewPollData({ ...newPollData, targetDate: e.target.value })}
                    required
                    className="w-full text-xs p-2.5 rounded-xl border border-[#28375A] bg-[#0E1524] text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Meal Type:</label>
                  <select
                    value={newPollData.mealType}
                    onChange={(e) => setNewPollData({ ...newPollData, mealType: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#28375A] bg-[#0E1524] text-white"
                  >
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Breakfast">Breakfast</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Option 1:</label>
                <input
                  type="text"
                  value={newPollData.option1}
                  onChange={(e) => setNewPollData({ ...newPollData, option1: e.target.value })}
                  required
                  className="w-full text-xs p-2.5 rounded-xl border border-[#28375A] bg-[#0E1524] text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Option 2:</label>
                <input
                  type="text"
                  value={newPollData.option2}
                  onChange={(e) => setNewPollData({ ...newPollData, option2: e.target.value })}
                  required
                  className="w-full text-xs p-2.5 rounded-xl border border-[#28375A] bg-[#0E1524] text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Option 3:</label>
                <input
                  type="text"
                  value={newPollData.option3}
                  onChange={(e) => setNewPollData({ ...newPollData, option3: e.target.value })}
                  required
                  className="w-full text-xs p-2.5 rounded-xl border border-[#28375A] bg-[#0E1524] text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#233252]">
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
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#131B2E] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#233252]">
            <div className="flex items-center justify-between mb-3 border-b border-[#233252] pb-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Daily Digest Simulation (FR-27)</span>
              </h3>
              <span className="badge-status badge-green text-[10px] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Email / WhatsApp Channel
              </span>
            </div>

            <div className="bg-[#0E1524] p-4 rounded-xl border border-[#233252] text-xs space-y-2">
              <p className="font-bold text-white">Subject: Apni Rasoi Daily Digest — 30 Sep 2026</p>
              <div className="border-t border-[#233252] pt-2 space-y-1.5 text-slate-300">
                <p className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span><strong>Total Ratings:</strong> 78 Diners (26% response rate)</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span><strong>Average Rating:</strong> 3.8 / 5.0</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span><strong>Top Positive:</strong> Taste & Food Quality (61%)</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span><strong>Top Negative:</strong> Roti Temperature at Peak (24%)</span>
                </p>
                <p className="pt-2 italic text-slate-400">"Gulab Jamun was highly appreciated. Water glass dispenser checked."</p>
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
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#131B2E] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#233252]">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2 font-heading">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Raise Rating Dispute (FR-33)</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Provider can dispute ratings due to operational failures or suspected abuse. Platform Admin & Warden review dispute.
            </p>

            <form onSubmit={handleRaiseDispute} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Dispute Grounds & Reason:</label>
                <textarea
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  rows={3}
                  required
                  placeholder="e.g. City gas pipeline failure caused 20m food preparation delay; requests context note attachment."
                  className="w-full text-xs p-3 rounded-xl border border-[#28375A] bg-[#0E1524] text-white focus:outline-none focus:border-rose-500"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#233252]">
                <button
                  type="button"
                  onClick={() => setIsDisputeModalOpen(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-4 bg-rose-600 hover:bg-rose-700 shadow-rose-900/40"
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
