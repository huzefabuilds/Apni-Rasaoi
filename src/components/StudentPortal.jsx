import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Star,
  CheckCircle2,
  Clock,
  Shield,
  Utensils,
  Vote,
  History,
  Calendar,
  Flame,
  Scale,
  Sparkles,
  Award,
  Thermometer,
  Heart,
  Send,
  AlertCircle,
  QrCode,
  Lock,
  ChevronRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';

export default function StudentPortal() {
  const {
    currentStudent,
    sessions,
    activeSession,
    feedbacks,
    weeklyMenu,
    polls,
    votedPolls,
    issues,
    submitFeedback,
    submitPollVote,
    hasStudentRatedSession,
    reasonChips,
    showNotification
  } = useApp();

  // Active Tab: 'rate' | 'menu' | 'vote' | 'yousaid' | 'history'
  const [activeTab, setActiveTab] = useState('rate');

  // Rating State
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedChips, setSelectedChips] = useState([]);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState(null);

  // 10-Second Timer Tracker
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const timerRef = useRef(null);

  // Selected Day in Weekly Menu
  const [selectedDayIndex, setSelectedDayIndex] = useState(3); // Thursday default

  // Check if student already rated active session
  const alreadyRated = activeSession ? hasStudentRatedSession(activeSession.id) : false;
  const existingFeedback = activeSession
    ? feedbacks.find(f => f.mealSessionId === activeSession.id && f.anonId === currentStudent?.anonId)
    : null;

  // Active Poll
  const activePoll = polls.find(p => p.status === 'active') || polls[0];
  const hasVotedActivePoll = activePoll ? !!votedPolls[activePoll.id] : false;

  // Start 10-second timer on mount or when rating starts
  useEffect(() => {
    if (!alreadyRated && !isSubmitted) {
      setTimerSeconds(0);
      setIsTimerRunning(true);
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => +(prev + 0.1).toFixed(1));
      }, 100);
    }
    return () => clearInterval(timerRef.current);
  }, [alreadyRated, isSubmitted, activeSession?.id]);

  const handleStarSelect = (rating) => {
    setSelectedRating(rating);
    // Reset chips when switching between positive/negative
    setSelectedChips([]);
  };

  const toggleChip = (chip) => {
    if (selectedChips.some(c => c.code === chip.code)) {
      setSelectedChips(selectedChips.filter(c => c.code !== chip.code));
    } else {
      if (selectedChips.length >= 3) {
        showNotification('You can select up to 3 reasons.', 'info');
        return;
      }
      setSelectedChips([...selectedChips, chip]);
    }
  };

  const handleFeedbackSubmit = (e) => {
    e?.preventDefault();
    if (selectedRating === 0) {
      showNotification('Please select a star rating first.', 'error');
      return;
    }

    clearInterval(timerRef.current);
    setIsTimerRunning(false);

    const completionTime = Math.max(1.8, timerSeconds);
    const result = submitFeedback({
      rating: selectedRating,
      chips: selectedChips,
      rawComment: comment,
      sessionId: activeSession.id,
      completionSeconds: completionTime
    });

    if (result.success) {
      setIsSubmitted(true);
      setSubmittedFeedback(result.feedback);
    }
  };

  const getChipCategoryClass = (code, isSelected, rating) => {
    if (isSelected) {
      return rating <= 3
        ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20 scale-105'
        : 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 scale-105';
    }

    switch (code) {
      case 'taste':
        return 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100/80';
      case 'quantity':
        return 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100/80';
      case 'hygiene':
        return 'bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100/80';
      case 'quality':
        return 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100/80';
      case 'temperature':
        return 'bg-orange-50 text-orange-800 border-orange-200 hover:bg-orange-100/80';
      case 'service':
        return 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100/80';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100';
    }
  };

  const getDishBadgeClass = (index) => {
    const colors = [
      'bg-emerald-50 text-emerald-800 border-emerald-200',
      'bg-amber-50 text-amber-800 border-amber-200',
      'bg-orange-50 text-orange-800 border-orange-200',
      'bg-teal-50 text-teal-800 border-teal-200',
      'bg-purple-50 text-purple-800 border-purple-200',
      'bg-rose-50 text-rose-800 border-rose-200'
    ];
    return colors[index % colors.length];
  };

  // Resolved issues for "You Said -> We Did"
  const resolvedIssues = issues.filter(i => i.publishedToFeed || i.status === 'Resolved');

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Student Navigation Sub-tabs with colorful distinct active styles */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-5 overflow-x-auto gap-2 scrollbar-none">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('rate')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
              activeTab === 'rate'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-800'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Rate Current Meal</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
              activeTab === 'menu'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20'
                : 'text-slate-600 hover:bg-amber-50 hover:text-amber-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Weekly Menu</span>
          </button>

          <button
            onClick={() => setActiveTab('vote')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
              activeTab === 'vote'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20'
                : 'text-slate-600 hover:bg-purple-50 hover:text-purple-800'
            }`}
          >
            <Vote className="w-4 h-4" />
            <span>Menu Poll</span>
          </button>

          <button
            onClick={() => setActiveTab('yousaid')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
              activeTab === 'yousaid'
                ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-md shadow-rose-500/20'
                : 'text-slate-600 hover:bg-rose-50 hover:text-rose-800'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-amber-200" />
            <span>You Said → We Did</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-slate-800 to-teal-800 text-white shadow-md shadow-slate-800/20'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <History className="w-4 h-4" />
            <span>My History</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 1: RATE CURRENT MEAL (10-SECOND FLOW) ================= */}
      {activeTab === 'rate' && (
        <div className="space-y-4">
          {/* Anonymity & Trust Banner */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-emerald-950 shadow-xs">
            <div className="p-1.5 bg-emerald-600 text-white rounded-lg mt-0.5 shadow-xs flex-shrink-0">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-bold text-emerald-900">100% Anonymous Feedback:</span> Your name and room are never visible to the mess manager, cooks, or warden. Feedback is signed with your pseudonymous ID <code className="bg-white px-2 py-0.5 rounded-md border border-emerald-300 font-mono text-emerald-800 font-bold shadow-2xs">{currentStudent?.anonId}</code>.
            </div>
          </div>

          {/* Active Meal Session Card */}
          <div className="card-clean p-4 sm:p-6 relative overflow-hidden border-slate-200/80 shadow-md">
            {/* Top Meal Header with soft colorful background */}
            <div className="bg-gradient-to-r from-emerald-50/70 via-teal-50/40 to-amber-50/50 -m-4 sm:-m-6 p-4 sm:p-6 mb-4 sm:mb-6 border-b border-emerald-100/70">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="badge-status badge-green bg-emerald-100/80 text-emerald-900 border-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      Verified Counter QR Scan
                    </span>
                    <span className="text-xs text-slate-600 font-medium">
                      Window: {activeSession.windowStart} – {activeSession.windowEnd}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2 font-heading">
                    <span>Today's {activeSession.mealName}</span>
                    <span className="text-xs font-semibold text-emerald-800 bg-white px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-xs">
                      {activeSession.expectedDiners} Diners
                    </span>
                  </h2>
                </div>

                {/* 10-Second Constraint Live Timer */}
                {!alreadyRated && !isSubmitted && (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-medium shadow-md border border-slate-700">
                    <Clock className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span>Timer: </span>
                    <strong className="font-mono text-emerald-300 text-sm">{timerSeconds}s</strong>
                    <span className="text-slate-400 text-[10px] bg-slate-800 px-1.5 py-0.5 rounded font-medium">(Target &lt;10s)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Today's Dishes List with Appetizing Colorful Tags */}
            <div className="mb-5 bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-2xl p-4 border border-slate-200/80 shadow-xs">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5 flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-emerald-600" /> Today's Menu Items:
              </p>
              <div className="flex flex-wrap gap-2">
                {activeSession.dishes.map((dish, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl border font-semibold shadow-2xs transition ${getDishBadgeClass(idx)}`}
                  >
                    <span>•</span>
                    <span>{dish}</span>
                  </span>
                ))}
              </div>
              {activeSession.contextNote && (
                <p className="mt-3 text-xs text-amber-900 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200/90 flex items-center gap-1.5 font-medium">
                  <span className="text-amber-600 font-bold">ℹ️ Mess Note:</span> {activeSession.contextNote}
                </p>
              )}
            </div>

            {/* If Student Already Rated or Just Submitted */}
            {(alreadyRated || isSubmitted) ? (
              <div className="text-center py-8 px-4 bg-gradient-to-b from-emerald-50/60 to-white rounded-2xl border border-emerald-200 shadow-sm">
                <div className="w-14 h-14 bg-gradient-to-tr from-emerald-500 to-teal-400 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">Feedback Submitted!</h3>
                <p className="text-xs text-slate-600 mt-1.5 max-w-md mx-auto">
                  Thank you for rating today's {activeSession.mealName}. Your verified response has been updated in the manager briefing and AI trends.
                </p>

                {/* Submitted Summary */}
                <div className="mt-5 inline-flex flex-col items-center bg-white p-4 rounded-2xl border border-emerald-100 shadow-md text-xs">
                  <div className="flex items-center gap-1 text-amber-500 mb-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= (submittedFeedback?.rating || existingFeedback?.rating || 0)
                            ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                    <span className="font-extrabold text-slate-900 ml-1.5 text-sm">
                      {submittedFeedback?.rating || existingFeedback?.rating} / 5 Stars
                    </span>
                  </div>
                  <span className="text-emerald-800 font-medium text-[11px] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Recorded via {currentStudent?.anonId} • One rating per meal
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => setActiveTab('vote')}
                    className="btn-primary text-xs py-2.5 px-4 rounded-xl shadow-md"
                  >
                    <Vote className="w-4 h-4" /> Vote for Sunday Feast
                  </button>
                  <button
                    onClick={() => setActiveTab('yousaid')}
                    className="btn-secondary text-xs py-2.5 px-4 rounded-xl"
                  >
                    <TrendingUp className="w-4 h-4 text-amber-600" /> View "You Said → We Did"
                  </button>
                </div>
              </div>
            ) : (
              /* ================= RATING INPUT INTERFACE ================= */
              <form onSubmit={handleFeedbackSubmit} className="space-y-5">
                {/* 1-Tap Star Rating Selection */}
                <div className="text-center py-2 bg-gradient-to-b from-amber-50/30 to-transparent rounded-2xl p-4 border border-amber-100/50">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                    Step 1: Tap Your Star Rating
                  </label>
                  <div className="flex items-center justify-center gap-2 sm:gap-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => handleStarSelect(star)}
                        className="star-btn flex flex-col items-center group transition-transform"
                      >
                        <div className="p-1 rounded-2xl transition-all group-hover:bg-amber-50">
                          <Star
                            className={`w-10 h-10 sm:w-12 sm:h-12 transition-all ${
                              star <= selectedRating
                                ? 'fill-amber-400 text-amber-400 filter drop-shadow-md scale-110'
                                : 'text-slate-300 group-hover:text-amber-300'
                            }`}
                          />
                        </div>
                        <span className={`text-[11px] font-bold mt-1 px-2 py-0.5 rounded-full transition-colors ${
                          star === selectedRating
                            ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs'
                            : 'text-slate-400'
                        }`}>
                          {star === 1 ? 'Poor' : star === 2 ? 'Fair' : star === 3 ? 'Average' : star === 4 ? 'Good' : 'Superb'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Adaptive Reason Chips with Category-Specific Food Colors */}
                {selectedRating > 0 && (
                  <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs animate-fadeIn">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        {selectedRating <= 3 ? (
                          <>
                            <span className="p-1 rounded-md bg-rose-100 text-rose-700">⚠️</span>
                            <span>Step 2: What went wrong? (Tap up to 3)</span>
                          </>
                        ) : (
                          <>
                            <span className="p-1 rounded-md bg-emerald-100 text-emerald-700">✨</span>
                            <span>Step 2: What was good? (Tap up to 3)</span>
                          </>
                        )}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {selectedChips.length}/3 selected
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {(selectedRating <= 3 ? reasonChips.negative : reasonChips.positive).map((chip) => {
                        const isSelected = selectedChips.some(c => c.code === chip.code);
                        return (
                          <button
                            type="button"
                            key={chip.code}
                            onClick={() => toggleChip(chip)}
                            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${getChipCategoryClass(
                              chip.code,
                              isSelected,
                              selectedRating
                            )}`}
                          >
                            {getChipIcon(chip.icon)}
                            <span>{chip.label}</span>
                            <span className={`text-[10px] font-medium ${isSelected ? 'text-white/90' : 'text-slate-500'}`}>
                              ({chip.hindi})
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Optional Multilingual Short Comment Box */}
                {selectedRating > 0 && (
                  <div className="space-y-1.5 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-bold text-slate-800 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Optional Comment</span>
                        <span className="text-slate-400 font-normal">(English, Hindi, or Hinglish)</span>
                      </label>
                      <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-semibold flex items-center gap-1">
                        <Lock className="w-3 h-3 text-emerald-600" /> Privacy Protected
                      </span>
                    </div>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="e.g. Paneer was very fresh, but rotis were cold... or दाल में नमक सही था"
                      rows={2}
                      maxLength={180}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 transition bg-slate-50/50"
                    ></textarea>
                  </div>
                )}

                {/* Submit Button (Quick & Prominent) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={selectedRating === 0}
                    className="w-full btn-primary py-3.5 text-sm rounded-xl font-extrabold shadow-lg shadow-emerald-600/25 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-700 hover:to-teal-700 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Anonymous Rating ({timerSeconds}s)</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-500 mt-2 font-medium">
                    ⚡ Fast 10-Second Flow • One rating per student per meal
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 2: UPCOMING WEEKLY MENU ================= */}
      {activeTab === 'menu' && (
        <div className="space-y-4">
          <div className="card-clean p-4 sm:p-6 shadow-md border-slate-200/90">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 font-heading">
                  <div className="p-1.5 rounded-lg bg-amber-500 text-white shadow-sm">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span>{weeklyMenu.weekTitle}</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Approved Hostel Weekly Dining Schedule</p>
              </div>
              <span className="badge-status badge-green bg-emerald-100 text-emerald-900 border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" /> Published & Live
              </span>
            </div>

            {/* Day Selector Pills with Colorful Highlighting */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 scrollbar-none">
              {weeklyMenu.days.map((d, index) => {
                const isSelected = selectedDayIndex === index;
                return (
                  <button
                    key={d.day}
                    onClick={() => setSelectedDayIndex(index)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/25 scale-102'
                        : 'bg-slate-100/90 text-slate-700 hover:bg-amber-50 hover:text-amber-900 border border-transparent'
                    }`}
                  >
                    <span>{d.day}</span>
                    {d.isToday && (
                      <span className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        • Today
                      </span>
                    )}
                    {d.isSpecial && (
                      <span className={`ml-1 text-[10px] ${isSelected ? 'text-amber-200' : 'text-amber-600'} font-bold`}>
                        ★ Feast
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Day Meals Grid with Soft Colorful Cards */}
            {weeklyMenu.days[selectedDayIndex] && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>{weeklyMenu.days[selectedDayIndex].day}'s Daily Menu</span>
                  </h3>
                  {weeklyMenu.days[selectedDayIndex].isToday && (
                    <span className="badge-status badge-amber bg-amber-100 text-amber-900 border-amber-300 text-[11px]">
                      Today's Active Schedule
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {/* Breakfast: Morning Sunrise Amber Theme */}
                  <div className="bg-gradient-to-br from-amber-50/80 via-amber-50/30 to-orange-50/40 p-4 rounded-2xl border border-amber-200/90 shadow-xs">
                    <div className="flex items-center justify-between mb-3 text-amber-950 font-bold text-xs">
                      <span className="flex items-center gap-1.5">
                        <span className="p-1 rounded-lg bg-amber-200 text-amber-900">☕</span>
                        <span className="font-heading text-sm">Breakfast</span>
                      </span>
                      <span className="text-amber-700/80 font-normal text-[11px]">07:30 - 09:30</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {weeklyMenu.days[selectedDayIndex].meals.breakfast.map((dish, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-white/70 px-2.5 py-1.5 rounded-lg border border-amber-100/80">
                          <span className="text-amber-600 font-bold">›</span>
                          <span className="font-medium">{dish}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Lunch: Fresh Mint & Sage Emerald Theme */}
                  <div className="bg-gradient-to-br from-emerald-50/80 via-emerald-50/30 to-teal-50/40 p-4 rounded-2xl border border-emerald-200/90 shadow-xs">
                    <div className="flex items-center justify-between mb-3 text-emerald-950 font-bold text-xs">
                      <span className="flex items-center gap-1.5">
                        <span className="p-1 rounded-lg bg-emerald-200 text-emerald-900">🍛</span>
                        <span className="font-heading text-sm">Lunch</span>
                      </span>
                      <span className="text-emerald-700/80 font-normal text-[11px]">12:30 - 14:30</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-800">
                      {weeklyMenu.days[selectedDayIndex].meals.lunch.map((dish, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-white/80 px-2.5 py-1.5 rounded-lg border border-emerald-100/80 font-medium">
                          <span className="text-emerald-600 font-bold">›</span>
                          <span>{dish}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dinner: Twilight Indigo & Royal Lavender Theme */}
                  <div className="bg-gradient-to-br from-indigo-50/80 via-indigo-50/30 to-purple-50/40 p-4 rounded-2xl border border-indigo-200/90 shadow-xs">
                    <div className="flex items-center justify-between mb-3 text-indigo-950 font-bold text-xs">
                      <span className="flex items-center gap-1.5">
                        <span className="p-1 rounded-lg bg-indigo-200 text-indigo-900">🌙</span>
                        <span className="font-heading text-sm">Dinner</span>
                      </span>
                      <span className="text-indigo-700/80 font-normal text-[11px]">19:30 - 21:30</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {weeklyMenu.days[selectedDayIndex].meals.dinner.map((dish, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-white/70 px-2.5 py-1.5 rounded-lg border border-indigo-100/80">
                          <span className="text-indigo-600 font-bold">›</span>
                          <span className="font-medium">{dish}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Changes logged badge */}
                {weeklyMenu.days[selectedDayIndex].changesLogged && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3.5 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                    <span className="p-1 rounded-md bg-amber-200 text-amber-800">🔔</span>
                    <div>
                      <strong>Notice:</strong> {weeklyMenu.days[selectedDayIndex].changesLogged[0]?.note}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 3: MENU VOTING POLLS ================= */}
      {activeTab === 'vote' && (
        <div className="space-y-4">
          <div className="card-clean p-4 sm:p-6 shadow-md border-slate-200/90">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="badge-status badge-green bg-purple-100 text-purple-900 border-purple-300 mb-1">
                  <Vote className="w-3.5 h-3.5" /> Active Student Poll
                </span>
                <h2 className="text-xl font-bold text-slate-900 font-heading">{activePoll.title}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{activePoll.description}</p>
              </div>
              <div className="text-right text-xs bg-purple-50 p-2.5 rounded-xl border border-purple-200">
                <span className="text-purple-700 font-medium block">{activePoll.closingLabel}</span>
                <p className="font-extrabold text-purple-900 text-sm">{activePoll.totalVotes} Student Votes</p>
              </div>
            </div>

            {/* Voting Options with Colorful Cards */}
            <div className="space-y-3">
              {activePoll.options.map((opt, idx) => {
                const isSelected = votedPolls[activePoll.id] === opt.id;
                const optColorSchemes = [
                  { border: 'border-emerald-200', active: 'border-emerald-600 bg-emerald-50/80', bar: 'bg-emerald-600', tag: 'bg-emerald-100 text-emerald-800' },
                  { border: 'border-amber-200', active: 'border-amber-600 bg-amber-50/80', bar: 'bg-amber-600', tag: 'bg-amber-100 text-amber-800' },
                  { border: 'border-purple-200', active: 'border-purple-600 bg-purple-50/80', bar: 'bg-purple-600', tag: 'bg-purple-100 text-purple-800' }
                ];
                const scheme = optColorSchemes[idx % optColorSchemes.length];

                return (
                  <div
                    key={opt.id}
                    onClick={() => !hasVotedActivePoll && submitPollVote(activePoll.id, opt.id)}
                    className={`p-4 rounded-2xl border transition-all ${
                      hasVotedActivePoll
                        ? isSelected
                          ? `${scheme.active} shadow-md`
                          : 'border-slate-200 bg-slate-50/60'
                        : `border-slate-200 hover:${scheme.border} hover:bg-slate-50/90 cursor-pointer shadow-xs`
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                          isSelected
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                            : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                        <span className="text-sm font-bold text-slate-900">{opt.title}</span>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border ${scheme.tag}`}>
                        {opt.tag}
                      </span>
                    </div>

                    {/* Live Vote Progress Bar */}
                    <div className="mt-2.5">
                      <div className="w-full bg-slate-200/80 h-3 rounded-full overflow-hidden p-0.5">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${scheme.bar}`}
                          style={{ width: `${opt.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-600 mt-1.5 font-semibold">
                        <span>{opt.votes} student votes</span>
                        <strong className="text-slate-900 text-xs">{opt.percentage}%</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {hasVotedActivePoll ? (
              <div className="mt-5 p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2.5 font-medium shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Your anonymous vote has been recorded! The mess provider will review final results before finalizing Sunday's feast.</span>
              </div>
            ) : (
              <p className="text-xs text-center text-slate-400 mt-4 font-medium">
                Tap any option above to cast your 1 verified vote.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 4: "YOU SAID → WE DID" FEED ================= */}
      {activeTab === 'yousaid' && (
        <div className="space-y-4">
          <div className="card-clean p-4 sm:p-6 shadow-md border-slate-200/90">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <span className="badge-status badge-amber bg-rose-100 text-rose-900 border-rose-300 mb-1">
                <TrendingUp className="w-3.5 h-3.5" /> Action & Accountability
              </span>
              <h2 className="text-xl font-bold text-slate-900 font-heading">You Said → We Did</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real corrective actions and recipe adjustments made in the kitchen based on student feedback.
              </p>
            </div>

            <div className="space-y-4">
              {resolvedIssues.map((issue) => (
                <div key={issue.id} className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition shadow-xs">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="badge-status badge-green bg-emerald-100 text-emerald-900 border-emerald-300 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Action Verified
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{issue.publishedDate || issue.detectedDate}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-3">
                    {/* Student Feedback */}
                    <div className="bg-gradient-to-br from-rose-50 to-orange-50/40 p-3.5 rounded-xl border border-rose-200/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block mb-1">
                        📢 You Said:
                      </span>
                      <p className="text-xs text-slate-900 font-bold">{issue.title}</p>
                      <span className="text-[11px] text-rose-700 mt-1 block font-medium">Theme: {issue.theme}</span>
                    </div>

                    {/* Mess Action */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50/40 p-3.5 rounded-xl border border-emerald-200/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                        ✅ We Did:
                      </span>
                      <p className="text-xs text-slate-900 font-bold">
                        {issue.publicSummary || issue.actionTaken}
                      </p>
                      {issue.impactMetric && (
                        <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-900 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                          <span>Rating:</span>
                          <span className="text-slate-400 line-through">{issue.impactMetric.beforeRating}★</span>
                          <span>→</span>
                          <span className="text-emerald-700">{issue.impactMetric.afterRating}★</span>
                          <span className="text-emerald-800 font-extrabold bg-emerald-100 px-1.5 py-0.2 rounded">
                            ({issue.impactMetric.improvement})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 5: MY RECENT FEEDBACK HISTORY ================= */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="card-clean p-4 sm:p-6 shadow-md border-slate-200/90">
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-heading">
                <History className="w-5 h-5 text-emerald-600" />
                <span>My Anonymous Feedback History</span>
              </h2>
              <p className="text-xs text-slate-500">
                Submissions linked to pseudonymous profile <code className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-bold">{currentStudent?.anonId}</code>
              </p>
            </div>

            <div className="space-y-3">
              {feedbacks
                .filter(f => f.anonId === currentStudent?.anonId)
                .map((fb) => (
                  <div key={fb.id} className="p-4 rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-amber-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= fb.rating ? 'fill-amber-400 text-amber-400 drop-shadow-2xs' : 'text-slate-200'
                            }`}
                          />
                        ))}
                        <span className="text-xs font-bold text-slate-900 ml-1">{fb.rating}.0 Stars</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                        {fb.date} • {fb.timeCoarse}
                      </span>
                    </div>

                    {/* Chips */}
                    {fb.chips && fb.chips.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 my-2">
                        {fb.chips.map((chip, idx) => (
                          <span
                            key={idx}
                            className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                              chip.direction === 'positive'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-rose-100 text-rose-800 border border-rose-200'
                            }`}
                          >
                            {chip.label}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Comment */}
                    {fb.comment && (
                      <p className="text-xs text-slate-800 bg-white p-2.5 rounded-xl border border-slate-200/80 mt-1 font-medium">
                        "{fb.comment}"
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
