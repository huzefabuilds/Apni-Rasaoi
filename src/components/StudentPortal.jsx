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
  Sparkles,
  Send,
  Lock,
  TrendingUp,
  MessageSquare,
  AlertCircle,
  Flame,
  Coffee,
  Moon
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

  // Food-Themed Feedback Chips (Positive & Negative)
  const foodFeedbackChips = {
    positive: [
      { code: 'taste_rich', icon: '🥘', label: 'Delicious Gravy', hindi: 'स्वादिष्ट', category: 'taste' },
      { code: 'salt_perfect', icon: '🧂', label: 'Perfect Salt & Spice', hindi: 'सही मसाला', category: 'taste' },
      { code: 'roti_soft', icon: '🍞', label: 'Soft Warm Rotis', hindi: 'नरम रोटी', category: 'quality' },
      { code: 'fresh_veg', icon: '🥗', label: 'Fresh Veggies', hindi: 'ताज़ा सब्जी', category: 'hygiene' },
      { code: 'hot_fresh', icon: '🌡️', label: 'Steaming Hot', hindi: 'गरमा-गरम', category: 'temp' },
      { code: 'generous', icon: '🥣', label: 'Generous Serving', hindi: 'भरपूर मात्रा', category: 'quantity' },
      { code: 'quick_line', icon: '⚡', label: 'Fast Counter', hindi: 'तेज़ सेवा', category: 'service' },
      { code: 'clean_hall', icon: '🧼', label: 'Clean Plates', hindi: 'स्वच्छ', category: 'hygiene' },
    ],
    negative: [
      { code: 'too_spicy', icon: '🌶️', label: 'Too Spicy / Oily', hindi: 'ज्यादा मिर्च', category: 'taste' },
      { code: 'salt_issue', icon: '🧂', label: 'Salt Off', hindi: 'नमक कम/ज्यादा', category: 'taste' },
      { code: 'hard_roti', icon: '🍞', label: 'Hard Rotis', hindi: 'कड़क रोटियां', category: 'quality' },
      { code: 'cold_food', icon: '🧊', label: 'Food Cold', hindi: 'ठंडा खाना', category: 'temp' },
      { code: 'watery_curry', icon: '🥘', label: 'Watery Gravy', hindi: 'पतली दाल/ग्रेवी', category: 'quality' },
      { code: 'short_supply', icon: '🥣', label: 'Refill Delay', hindi: 'रीफिल में देरी', category: 'quantity' },
      { code: 'long_queue', icon: '⏳', label: 'Long Line', hindi: 'लंबी लाइन', category: 'service' },
      { code: 'hygiene_alert', icon: '🧼', label: 'Cleanliness Issue', hindi: 'सफाई समस्या', category: 'hygiene' },
    ]
  };

  // Start 10-second timer on mount
  useEffect(() => {
    if (!alreadyRated && !isSubmitted) {
      setTimerSeconds(0);
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => +(prev + 0.1).toFixed(1));
      }, 100);
    }
    return () => clearInterval(timerRef.current);
  }, [alreadyRated, isSubmitted, activeSession?.id]);

  const handleStarSelect = (rating) => {
    setSelectedRating(rating);
    setSelectedChips([]);
  };

  const toggleChip = (chip) => {
    if (selectedChips.some(c => c.code === chip.code)) {
      setSelectedChips(selectedChips.filter(c => c.code !== chip.code));
    } else {
      if (selectedChips.length >= 3) {
        showNotification('You can select up to 3 reason chips.', 'info');
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
    const completionTime = Math.max(2.1, timerSeconds);

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

  // Dynamic Star Labels with Rich Dark Colorful Styling
  const starLabels = {
    1: { title: 'Needs Improvement', sub: 'सुधार चाहिए', color: 'text-rose-300 bg-rose-950/70 border-rose-500/40' },
    2: { title: 'Below Average', sub: 'औसत से कम', color: 'text-orange-300 bg-orange-950/70 border-orange-500/40' },
    3: { title: 'Satisfactory', sub: 'ठीक-ठाक', color: 'text-amber-300 bg-amber-950/70 border-amber-500/40' },
    4: { title: 'Tasty & Good', sub: 'स्वादिष्ट', color: 'text-emerald-300 bg-emerald-950/70 border-emerald-500/40' },
    5: { title: 'Delicious Feast!', sub: 'लाजवाब', color: 'text-teal-200 bg-teal-950/80 border-teal-400/50' }
  };

  const resolvedIssues = issues.filter(i => i.publishedToFeed || i.status === 'Resolved');

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
      {/* Student Navigation Sub-tabs with Vibrant Glowing Dark Pills */}
      <div className="flex items-center justify-between border-b border-[#233252] pb-3 mb-4 overflow-x-auto gap-1.5 scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          <button
            onClick={() => setActiveTab('rate')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === 'rate'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30 border border-emerald-400/30'
                : 'text-slate-300 bg-[#131B2E] hover:bg-[#1C2640] border border-[#233252]'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 text-emerald-400" />
            <span>Rate Meal</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === 'menu'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-900/30 border border-amber-400/30'
                : 'text-slate-300 bg-[#131B2E] hover:bg-[#1C2640] border border-[#233252]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Weekly Menu</span>
          </button>

          <button
            onClick={() => setActiveTab('vote')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === 'vote'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/30 border border-purple-400/30'
                : 'text-slate-300 bg-[#131B2E] hover:bg-[#1C2640] border border-[#233252]'
            }`}
          >
            <Vote className="w-3.5 h-3.5 text-purple-400" />
            <span>Menu Poll</span>
          </button>

          <button
            onClick={() => setActiveTab('yousaid')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === 'yousaid'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-900/30 border border-cyan-400/30'
                : 'text-slate-300 bg-[#131B2E] hover:bg-[#1C2640] border border-[#233252]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>You Said → We Did</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-900/30 border border-rose-400/30'
                : 'text-slate-300 bg-[#131B2E] hover:bg-[#1C2640] border border-[#233252]'
            }`}
          >
            <History className="w-3.5 h-3.5 text-rose-400" />
            <span>My Ratings</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 1: RATE CURRENT MEAL ================= */}
      {activeTab === 'rate' && (
        <div className="space-y-4">
          {/* Privacy Notice Banner */}
          <div className="bg-[#131B2E] border border-emerald-500/30 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-slate-300 shadow-lg">
            <div className="p-1.5 bg-emerald-950/80 text-emerald-400 rounded-xl mt-0.5 border border-emerald-500/40 flex-shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white">100% Anonymous Feedback:</span> Your response is strictly signed by pseudonymous token <code className="bg-[#0E1524] px-2 py-0.5 rounded-lg border border-[#233252] font-mono text-amber-300 font-bold">{currentStudent?.anonId}</code>. No hostel staff can trace this to your personal identity.
            </div>
          </div>

          {/* Active Meal Card */}
          <div className="card-clean p-4 sm:p-6 relative overflow-hidden bg-[#131B2E] border border-[#233252] shadow-2xl">
            {/* Meal Header with Vibrant Warm Orange Highlights */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3.5 border-b border-[#233252]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="badge-status badge-green">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Verified QR Counter Scan
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {activeSession.windowStart} – {activeSession.windowEnd}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 flex items-center gap-2 font-heading">
                  <span className="bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400 bg-clip-text text-transparent">
                    Today's {activeSession.mealName}
                  </span>
                  <span className="text-xs font-semibold text-slate-300 bg-[#1C2640] px-2.5 py-0.5 rounded-full border border-[#28375A]">
                    {activeSession.expectedDiners} Expected Diners
                  </span>
                </h2>
              </div>

              {/* Live 10-Second Timer Tracker */}
              {!alreadyRated && !isSubmitted && (
                <div className="flex items-center gap-1.5 bg-[#0E1524] text-white px-3 py-1.5 rounded-xl text-xs font-medium border border-[#233252] shadow-inner">
                  <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                  <span className="text-slate-400">Timer: </span>
                  <strong className="font-mono text-amber-400 text-xs sm:text-sm">{timerSeconds}s</strong>
                </div>
              )}
            </div>

            {/* Today's Menu Dishes */}
            <div className="mb-4 bg-[#0E1524] rounded-2xl p-3 sm:p-4 border border-[#233252]">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-emerald-400" /> Today's Meal Items:
              </p>
              <div className="flex flex-wrap gap-2">
                {activeSession.dishes.map((dish, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border border-[#28375A] bg-[#162035] text-slate-200 font-semibold shadow-sm hover:border-emerald-500/40 transition"
                  >
                    <span className="text-amber-400 text-xs">🥘</span>
                    <span>{dish}</span>
                  </span>
                ))}
              </div>
              {activeSession.contextNote && (
                <p className="mt-2.5 text-xs text-amber-300 bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-500/30 flex items-center gap-1.5 font-medium">
                  <span className="text-amber-400 font-bold">ℹ️ Note:</span> {activeSession.contextNote}
                </p>
              )}
            </div>

            {/* Already Rated / Submitted Confirmation */}
            {(alreadyRated || isSubmitted) ? (
              <div className="text-center py-7 px-4 bg-gradient-to-b from-emerald-950/40 to-[#0E1524] rounded-2xl border border-emerald-500/30 shadow-inner">
                <div className="w-14 h-14 bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">Feedback Submitted!</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto font-medium">
                  Thank you for rating today's {activeSession.mealName}. Your response has been securely added to the daily kitchen briefing.
                </p>

                {/* Rating Badge */}
                <div className="mt-4 inline-flex flex-col items-center bg-[#131B2E] p-3.5 rounded-2xl border border-[#233252] shadow-lg text-xs">
                  <div className="flex items-center gap-1 text-amber-400 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= (submittedFeedback?.rating || existingFeedback?.rating || 0)
                            ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                            : 'text-slate-700'
                        }`}
                      />
                    ))}
                    <span className="font-extrabold text-white ml-2 text-xs">
                      {submittedFeedback?.rating || existingFeedback?.rating} / 5 Stars
                    </span>
                  </div>
                  <span className="text-slate-400 font-medium text-[10px]">
                    Verified • 1 rating per student per meal
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                  <button
                    onClick={() => setActiveTab('vote')}
                    className="btn-primary btn-sm text-xs rounded-xl"
                  >
                    <Vote className="w-3.5 h-3.5" /> Vote for Sunday Menu
                  </button>
                  <button
                    onClick={() => setActiveTab('yousaid')}
                    className="btn-secondary btn-sm text-xs rounded-xl"
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" /> View "You Said → We Did"
                  </button>
                </div>
              </div>
            ) : (
              /* ================= RATING FORM ================= */
              <form onSubmit={handleFeedbackSubmit} className="space-y-4 sm:space-y-5">
                {/* Step 1: Star Rating Buttons */}
                <div className="text-center py-4 bg-[#0E1524] rounded-2xl p-4 border border-[#233252]">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    Step 1: Tap Your Overall Meal Rating
                  </label>
                  <div className="flex items-center justify-center gap-2 sm:gap-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => handleStarSelect(star)}
                        className="star-btn flex flex-col items-center group p-1"
                      >
                        <div className="p-1.5 rounded-2xl transition-all group-hover:bg-[#1C2640]">
                          <Star
                            className={`w-9 h-9 sm:w-12 sm:h-12 transition-all ${
                              star <= selectedRating
                                ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.7)] scale-110'
                                : 'text-slate-700 group-hover:text-amber-400/60'
                            }`}
                          />
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-bold mt-1 text-slate-400 group-hover:text-amber-300">
                          {star}★
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Rating Label */}
                  {selectedRating > 0 && starLabels[selectedRating] && (
                    <div className="mt-3">
                      <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-sm ${starLabels[selectedRating].color}`}>
                        <span>{starLabels[selectedRating].title}</span>
                        <span className="font-normal opacity-80">({starLabels[selectedRating].sub})</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Step 2: Reason Chips */}
                {selectedRating > 0 && (
                  <div className="bg-[#0E1524] p-3.5 sm:p-4 rounded-2xl border border-[#233252] shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        {selectedRating <= 3 ? (
                          <>
                            <span className="text-rose-400 text-sm">⚠️</span>
                            <span>Step 2: What could be improved? (Up to 3)</span>
                          </>
                        ) : (
                          <>
                            <span className="text-emerald-400 text-sm">✨</span>
                            <span>Step 2: What made it great? (Up to 3)</span>
                          </>
                        )}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-300 bg-[#1C2640] px-2 py-0.5 rounded-full border border-[#28375A]">
                        {selectedChips.length}/3 selected
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(selectedRating <= 3 ? foodFeedbackChips.negative : foodFeedbackChips.positive).map((chip) => {
                        const isSelected = selectedChips.some(c => c.code === chip.code);
                        return (
                          <button
                            type="button"
                            key={chip.code}
                            onClick={() => toggleChip(chip)}
                            className={`chip-btn ${
                              isSelected
                                ? selectedRating <= 3
                                  ? 'selected-negative'
                                  : 'selected-positive'
                                : ''
                            }`}
                          >
                            <span className="text-sm">{chip.icon}</span>
                            <span>{chip.label}</span>
                            <span className="text-[10px] opacity-70">
                              ({chip.hindi})
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 3: Multilingual Comment */}
                {selectedRating > 0 && (
                  <div className="space-y-1.5 bg-[#0E1524] p-3.5 rounded-2xl border border-[#233252] shadow-lg">
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-bold text-white flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Optional Kitchen Note</span>
                        <span className="text-slate-400 text-[11px] font-normal">(English/Hindi/Hinglish)</span>
                      </label>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30 font-semibold flex items-center gap-1">
                        <Lock className="w-3 h-3 text-emerald-400" /> Private
                      </span>
                    </div>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="e.g. Paneer was very fresh, rotis were soft! or दाल में नमक सही था..."
                      rows={2}
                      maxLength={180}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#28375A] focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition bg-[#131B2E] text-slate-100 placeholder-slate-500"
                    ></textarea>
                  </div>
                )}

                {/* Submit Button in Neon Emerald Gradient */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={selectedRating === 0}
                    className="w-full btn-primary py-3.5 text-xs sm:text-sm rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Anonymous Rating ({timerSeconds}s)</span>
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-2 font-medium">
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
          <div className="card-clean p-4 sm:p-6 shadow-2xl border-[#233252] bg-[#131B2E]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 border-b border-[#233252] pb-2.5">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-heading">
                  <div className="p-1.5 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-orange-500/20">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <span>{weeklyMenu.weekTitle}</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Approved Hostel Dining Schedule</p>
              </div>
              <span className="badge-status badge-green text-[11px]">
                <CheckCircle2 className="w-3 h-3" /> Published & Live
              </span>
            </div>

            {/* Day Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-4 scrollbar-none">
              {weeklyMenu.days.map((d, index) => {
                const isSelected = selectedDayIndex === index;
                return (
                  <button
                    key={d.day}
                    onClick={() => setSelectedDayIndex(index)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30 border border-emerald-400/40'
                        : 'bg-[#1C2640] text-slate-300 hover:bg-[#263558] border border-[#28375A]'
                    }`}
                  >
                    <span>{d.day}</span>
                    {d.isToday && (
                      <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        • Today
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Meals Grid with Colorful Themes */}
            {weeklyMenu.days[selectedDayIndex] && (
              <div className="space-y-3.5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Breakfast Card - Warm Amber Theme */}
                  <div className="bg-gradient-to-br from-amber-950/30 via-[#131B2E] to-[#0E1524] p-3.5 rounded-2xl border border-amber-500/30 shadow-lg">
                    <div className="flex items-center justify-between mb-2.5 text-amber-300 font-bold text-xs">
                      <span className="flex items-center gap-1.5">
                        <Coffee className="w-4 h-4 text-amber-400" />
                        <span className="font-heading font-bold text-white">Breakfast</span>
                      </span>
                      <span className="text-amber-400 font-medium text-[11px]">07:30 - 09:30</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {weeklyMenu.days[selectedDayIndex].meals.breakfast.map((dish, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 bg-[#162035] px-2.5 py-1.5 rounded-xl border border-[#28375A] font-medium shadow-xs">
                          <span className="text-amber-400 font-bold">›</span>
                          <span>{dish}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Lunch Card - Fresh Emerald Theme */}
                  <div className="bg-gradient-to-br from-emerald-950/30 via-[#131B2E] to-[#0E1524] p-3.5 rounded-2xl border border-emerald-500/30 shadow-lg">
                    <div className="flex items-center justify-between mb-2.5 text-emerald-300 font-bold text-xs">
                      <span className="flex items-center gap-1.5">
                        <Utensils className="w-4 h-4 text-emerald-400" />
                        <span className="font-heading font-bold text-white">Lunch</span>
                      </span>
                      <span className="text-emerald-400 font-medium text-[11px]">12:30 - 14:30</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-200">
                      {weeklyMenu.days[selectedDayIndex].meals.lunch.map((dish, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 bg-[#162035] px-2.5 py-1.5 rounded-xl border border-[#28375A] font-medium shadow-xs">
                          <span className="text-emerald-400 font-bold">›</span>
                          <span>{dish}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dinner Card - Royal Indigo Theme */}
                  <div className="bg-gradient-to-br from-indigo-950/30 via-[#131B2E] to-[#0E1524] p-3.5 rounded-2xl border border-indigo-500/30 shadow-lg">
                    <div className="flex items-center justify-between mb-2.5 text-indigo-300 font-bold text-xs">
                      <span className="flex items-center gap-1.5">
                        <Moon className="w-4 h-4 text-indigo-400" />
                        <span className="font-heading font-bold text-white">Dinner</span>
                      </span>
                      <span className="text-indigo-400 font-medium text-[11px]">19:30 - 21:30</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {weeklyMenu.days[selectedDayIndex].meals.dinner.map((dish, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 bg-[#162035] px-2.5 py-1.5 rounded-xl border border-[#28375A] font-medium shadow-xs">
                          <span className="text-indigo-400 font-bold">›</span>
                          <span>{dish}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 3: MENU VOTING POLLS ================= */}
      {activeTab === 'vote' && (
        <div className="space-y-4">
          <div className="card-clean p-4 sm:p-6 shadow-2xl border-[#233252] bg-[#131B2E]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#233252] pb-2.5 mb-3.5">
              <div>
                <span className="badge-status badge-orange mb-1">
                  <Vote className="w-3 h-3" /> Active Poll
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white font-heading">{activePoll.title}</h2>
                <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{activePoll.description}</p>
              </div>
              <div className="text-right text-xs bg-[#0E1524] p-2.5 rounded-xl border border-[#233252]">
                <span className="text-slate-400 text-[11px] font-medium block">{activePoll.closingLabel}</span>
                <p className="font-extrabold text-amber-300 text-xs sm:text-sm">{activePoll.totalVotes} Votes</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {activePoll.options.map((opt) => {
                const isSelected = votedPolls[activePoll.id] === opt.id;

                return (
                  <div
                    key={opt.id}
                    onClick={() => !hasVotedActivePoll && submitPollVote(activePoll.id, opt.id)}
                    className={`p-3.5 rounded-xl border transition-all ${
                      hasVotedActivePoll
                        ? isSelected
                          ? 'border-emerald-500/60 bg-emerald-950/30 shadow-md shadow-emerald-950/20'
                          : 'border-[#233252] bg-[#0E1524]'
                        : 'border-[#233252] hover:border-emerald-500/40 hover:bg-[#162035] cursor-pointer shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                          isSelected
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold'
                            : 'border-slate-600 bg-[#162035]'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-white">{opt.title}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg border bg-[#1C2640] text-amber-300 border-amber-500/30">
                        {opt.tag}
                      </span>
                    </div>

                    <div className="mt-2.5">
                      <div className="w-full bg-[#1C2640] h-2.5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm"
                          style={{ width: `${opt.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 font-semibold">
                        <span>{opt.votes} student votes</span>
                        <strong className="text-emerald-400 text-xs">{opt.percentage}%</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: "YOU SAID → WE DID" ================= */}
      {activeTab === 'yousaid' && (
        <div className="space-y-4">
          <div className="card-clean p-4 sm:p-6 shadow-2xl border-[#233252] bg-[#131B2E]">
            <div className="border-b border-[#233252] pb-2.5 mb-3.5">
              <span className="badge-status badge-cyan mb-1">
                <TrendingUp className="w-3 h-3" /> Action & Accountability
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white font-heading">You Said → We Did</h2>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                Real corrective actions taken in the hostel kitchen based on student feedback.
              </p>
            </div>

            <div className="space-y-3">
              {resolvedIssues.map((issue) => (
                <div key={issue.id} className="p-3.5 rounded-2xl border border-[#233252] bg-[#0E1524] hover:border-slate-700 transition shadow-lg">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="badge-status badge-green text-[10px]">
                      <CheckCircle2 className="w-3 h-3" /> Action Verified
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">{issue.publishedDate || issue.detectedDate}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2">
                    <div className="bg-rose-950/40 p-3 rounded-xl border border-rose-500/30">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                        📢 You Said:
                      </span>
                      <p className="text-xs text-rose-100 font-bold">{issue.title}</p>
                    </div>

                    <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/30">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                        ✅ We Did:
                      </span>
                      <p className="text-xs text-emerald-100 font-bold">
                        {issue.publicSummary || issue.actionTaken}
                      </p>
                      {issue.impactMetric && (
                        <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-300 bg-[#0E1524] px-2.5 py-1 rounded-md border border-emerald-500/40">
                          <span>Rating:</span>
                          <span className="text-slate-500 line-through">{issue.impactMetric.beforeRating}★</span>
                          <span>→</span>
                          <span className="text-emerald-400 font-extrabold">{issue.impactMetric.afterRating}★</span>
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
          <div className="card-clean p-4 sm:p-6 shadow-2xl border-[#233252] bg-[#131B2E]">
            <div className="border-b border-[#233252] pb-2.5 mb-3.5">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-heading">
                <History className="w-4 h-4 text-emerald-400" />
                <span>My Anonymous Feedback History</span>
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">
                Ratings signed with pseudonymous token <code className="bg-[#0E1524] text-amber-300 px-2 py-0.5 rounded font-mono font-bold border border-[#233252]">{currentStudent?.anonId}</code>
              </p>
            </div>

            <div className="space-y-2.5">
              {feedbacks
                .filter(f => f.anonId === currentStudent?.anonId)
                .map((fb) => (
                  <div key={fb.id} className="p-3.5 rounded-xl border border-[#233252] bg-[#0E1524]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= fb.rating ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]' : 'text-slate-700'
                            }`}
                          />
                        ))}
                        <span className="text-xs font-bold text-white ml-1.5">{fb.rating}.0 Stars</span>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 bg-[#162035] px-2 py-0.5 rounded-md border border-[#28375A]">
                        {fb.date} • {fb.timeCoarse}
                      </span>
                    </div>

                    {fb.chips && fb.chips.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 my-2">
                        {fb.chips.map((chip, idx) => (
                          <span
                            key={idx}
                            className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
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

                    {fb.comment && (
                      <p className="text-xs text-slate-200 bg-[#162035] p-2.5 rounded-xl border border-[#28375A] mt-1.5 font-medium">
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
