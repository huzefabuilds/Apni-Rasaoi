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
  AlertCircle
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

  // Star Labels
  const starLabels = {
    1: { title: 'Needs Improvement', sub: 'सुधार चाहिए', color: 'text-rose-700 bg-rose-50 border-rose-200' },
    2: { title: 'Below Average', sub: 'औसत से कम', color: 'text-orange-700 bg-orange-50 border-orange-200' },
    3: { title: 'Satisfactory', sub: 'ठीक-ठाक', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    4: { title: 'Tasty & Good', sub: 'स्वादिष्ट', color: 'text-brand-800 bg-brand-50 border-brand-200' },
    5: { title: 'Delicious Feast!', sub: 'लाजवाब', color: 'text-brand-900 bg-brand-100 border-brand-300' }
  };

  const resolvedIssues = issues.filter(i => i.publishedToFeed || i.status === 'Resolved');

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
      {/* Student Navigation Sub-tabs with properly adjusted button heights */}
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-2.5 mb-4 overflow-x-auto gap-1.5 scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          <button
            onClick={() => setActiveTab('rate')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-2xs ${
              activeTab === 'rate'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-stone-600 bg-white hover:bg-stone-50 border border-stone-200/80'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Rate Meal</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-2xs ${
              activeTab === 'menu'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-stone-600 bg-white hover:bg-stone-50 border border-stone-200/80'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Weekly Menu</span>
          </button>

          <button
            onClick={() => setActiveTab('vote')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-2xs ${
              activeTab === 'vote'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-stone-600 bg-white hover:bg-stone-50 border border-stone-200/80'
            }`}
          >
            <Vote className="w-3.5 h-3.5" />
            <span>Menu Poll</span>
          </button>

          <button
            onClick={() => setActiveTab('yousaid')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-2xs ${
              activeTab === 'yousaid'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-stone-600 bg-white hover:bg-stone-50 border border-stone-200/80'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
            <span>You Said → We Did</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-2xs ${
              activeTab === 'history'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-stone-600 bg-white hover:bg-stone-50 border border-stone-200/80'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>My Ratings</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 1: RATE CURRENT MEAL ================= */}
      {activeTab === 'rate' && (
        <div className="space-y-4">
          {/* Privacy Notice Banner */}
          <div className="bg-white border border-brand-200/80 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-stone-700 shadow-2xs">
            <div className="p-1 bg-brand-50 text-brand-700 rounded-lg mt-0.5 border border-brand-200 flex-shrink-0">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-bold text-stone-900">100% Anonymous:</span> Feedback signed by pseudonymous token <code className="bg-stone-100 px-1.5 py-0.2 rounded border border-stone-200 font-mono text-stone-800 font-bold">{currentStudent?.anonId}</code>.
            </div>
          </div>

          {/* Active Meal Card */}
          <div className="card-clean p-4 sm:p-6 relative overflow-hidden bg-white border border-stone-200/90 shadow-sm">
            {/* Meal Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3.5 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="badge-status badge-green">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-600"></span>
                    Verified QR Counter Scan
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    {activeSession.windowStart} – {activeSession.windowEnd}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1 flex items-center gap-2 font-heading">
                  <span>Today's {activeSession.mealName}</span>
                  <span className="text-xs font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
                    {activeSession.expectedDiners} Diners
                  </span>
                </h2>
              </div>

              {/* Live 10-Second Timer Tracker */}
              {!alreadyRated && !isSubmitted && (
                <div className="flex items-center gap-1.5 bg-stone-900 text-white px-3 py-1.5 rounded-xl text-xs font-medium shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-brand-400" />
                  <span>Timer: </span>
                  <strong className="font-mono text-brand-300 text-xs sm:text-sm">{timerSeconds}s</strong>
                </div>
              )}
            </div>

            {/* Today's Menu Dishes */}
            <div className="mb-4 bg-stone-50/80 rounded-2xl p-3 sm:p-4 border border-stone-200/70">
              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-brand-600" /> Today's Meal Items:
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {activeSession.dishes.map((dish, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-xl border border-stone-200 bg-white text-stone-800 font-semibold shadow-2xs"
                  >
                    <span className="text-brand-600 text-xs">🥘</span>
                    <span>{dish}</span>
                  </span>
                ))}
              </div>
              {activeSession.contextNote && (
                <p className="mt-2 text-xs text-orange-900 bg-orange-50/90 px-2.5 py-1 rounded-xl border border-orange-200 flex items-center gap-1.5 font-medium">
                  <span className="text-orange-600 font-bold">ℹ️ Note:</span> {activeSession.contextNote}
                </p>
              )}
            </div>

            {/* Already Rated / Submitted Confirmation */}
            {(alreadyRated || isSubmitted) ? (
              <div className="text-center py-6 px-3 bg-brand-50/40 rounded-2xl border border-brand-200/80">
                <div className="w-12 h-12 bg-brand-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-2.5 shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 font-heading">Feedback Submitted!</h3>
                <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto font-medium">
                  Thank you for rating today's {activeSession.mealName}. Your response has been securely added to the daily kitchen briefing.
                </p>

                {/* Rating Badge */}
                <div className="mt-4 inline-flex flex-col items-center bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs text-xs">
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= (submittedFeedback?.rating || existingFeedback?.rating || 0)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-200'
                        }`}
                      />
                    ))}
                    <span className="font-extrabold text-stone-900 ml-1.5 text-xs">
                      {submittedFeedback?.rating || existingFeedback?.rating} / 5 Stars
                    </span>
                  </div>
                  <span className="text-stone-500 font-medium text-[10px]">
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
                    <TrendingUp className="w-3.5 h-3.5 text-orange-600" /> View "You Said → We Did"
                  </button>
                </div>
              </div>
            ) : (
              /* ================= RATING FORM ================= */
              <form onSubmit={handleFeedbackSubmit} className="space-y-4 sm:space-y-5">
                {/* Step 1: Star Rating Buttons (Properly scaled for phone and desktop) */}
                <div className="text-center py-3 bg-stone-50/70 rounded-2xl p-3 border border-stone-200/80">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                    Step 1: Tap Your Overall Meal Rating
                  </label>
                  <div className="flex items-center justify-center gap-1.5 sm:gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => handleStarSelect(star)}
                        className="star-btn flex flex-col items-center group p-1"
                      >
                        <div className="p-1 rounded-xl transition-all group-hover:bg-amber-50">
                          <Star
                            className={`w-9 h-9 sm:w-11 sm:h-11 transition-all ${
                              star <= selectedRating
                                ? 'fill-amber-400 text-amber-400 drop-shadow-sm scale-105'
                                : 'text-stone-300 group-hover:text-amber-300'
                            }`}
                          />
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-bold mt-0.5 text-stone-500">
                          {star}★
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Rating Label */}
                  {selectedRating > 0 && starLabels[selectedRating] && (
                    <div className="mt-2.5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${starLabels[selectedRating].color}`}>
                        <span>{starLabels[selectedRating].title}</span>
                        <span className="font-normal opacity-80">({starLabels[selectedRating].sub})</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Step 2: Reason Chips (Properly sized for touch targets) */}
                {selectedRating > 0 && (
                  <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-stone-200 shadow-2xs">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        {selectedRating <= 3 ? (
                          <>
                            <span className="text-rose-500 text-sm">⚠️</span>
                            <span>Step 2: What could be improved? (Up to 3)</span>
                          </>
                        ) : (
                          <>
                            <span className="text-brand-600 text-sm">✨</span>
                            <span>Step 2: What made it great? (Up to 3)</span>
                          </>
                        )}
                      </span>
                      <span className="text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
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
                  <div className="space-y-1.5 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-bold text-stone-800 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-brand-600" />
                        <span>Optional Kitchen Note</span>
                        <span className="text-stone-400 text-[11px] font-normal">(English/Hindi/Hinglish)</span>
                      </label>
                      <span className="text-[10px] text-brand-800 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-200/80 font-semibold flex items-center gap-1">
                        <Lock className="w-3 h-3 text-brand-600" /> Private
                      </span>
                    </div>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="e.g. Paneer was very fresh, rotis were soft! or दाल में नमक सही था..."
                      rows={2}
                      maxLength={180}
                      className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/10 transition bg-stone-50/50"
                    ></textarea>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={selectedRating === 0}
                    className="w-full btn-primary py-3 text-xs sm:text-sm rounded-xl font-bold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Anonymous Rating ({timerSeconds}s)</span>
                  </button>
                  <p className="text-[10px] text-center text-stone-400 mt-1.5 font-medium">
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
          <div className="card-clean p-4 sm:p-6 shadow-sm border-stone-200/90 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 border-b border-stone-100 pb-2.5">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2 font-heading">
                  <div className="p-1.5 rounded-xl bg-orange-500 text-white shadow-2xs">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <span>{weeklyMenu.weekTitle}</span>
                </h2>
                <p className="text-[11px] text-stone-500 mt-0.5 font-medium">Approved Hostel Dining Schedule</p>
              </div>
              <span className="badge-status badge-green text-[11px]">
                <CheckCircle2 className="w-3 h-3" /> Published & Live
              </span>
            </div>

            {/* Day Selector Pills with Compact Button Sizing */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-4 scrollbar-none">
              {weeklyMenu.days.map((d, index) => {
                const isSelected = selectedDayIndex === index;
                return (
                  <button
                    key={d.day}
                    onClick={() => setSelectedDayIndex(index)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-brand-600 text-white shadow-2xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 border border-transparent'
                    }`}
                  >
                    <span>{d.day}</span>
                    {d.isToday && (
                      <span className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-brand-100 text-brand-800'
                      }`}>
                        • Today
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Meals Grid */}
            {weeklyMenu.days[selectedDayIndex] && (
              <div className="space-y-3.5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Breakfast Card */}
                  <div className="bg-orange-50/50 p-3.5 rounded-2xl border border-orange-200/70">
                    <div className="flex items-center justify-between mb-2.5 text-orange-950 font-bold text-xs">
                      <span className="flex items-center gap-1.5">
                        <span>☕</span>
                        <span className="font-heading font-bold text-stone-900">Breakfast</span>
                      </span>
                      <span className="text-orange-700 font-medium text-[11px]">07:30 - 09:30</span>
                    </div>
                    <ul className="space-y-1 text-xs text-stone-700">
                      {weeklyMenu.days[selectedDayIndex].meals.breakfast.map((dish, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 bg-white px-2 py-1 rounded-lg border border-orange-100 font-medium shadow-2xs">
                          <span className="text-orange-600 font-bold">›</span>
                          <span>{dish}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Lunch Card */}
                  <div className="bg-brand-50/50 p-3.5 rounded-2xl border border-brand-200/70">
                    <div className="flex items-center justify-between mb-2.5 text-brand-950 font-bold text-xs">
                      <span className="flex items-center gap-1.5">
                        <span>🍛</span>
                        <span className="font-heading font-bold text-stone-900">Lunch</span>
                      </span>
                      <span className="text-brand-700 font-medium text-[11px]">12:30 - 14:30</span>
                    </div>
                    <ul className="space-y-1 text-xs text-stone-800">
                      {weeklyMenu.days[selectedDayIndex].meals.lunch.map((dish, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 bg-white px-2 py-1 rounded-lg border border-brand-100 font-medium shadow-2xs">
                          <span className="text-brand-600 font-bold">›</span>
                          <span>{dish}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dinner Card */}
                  <div className="bg-stone-100/70 p-3.5 rounded-2xl border border-stone-200/80">
                    <div className="flex items-center justify-between mb-2.5 text-stone-900 font-bold text-xs">
                      <span className="flex items-center gap-1.5">
                        <span>🌙</span>
                        <span className="font-heading font-bold text-stone-900">Dinner</span>
                      </span>
                      <span className="text-stone-500 font-medium text-[11px]">19:30 - 21:30</span>
                    </div>
                    <ul className="space-y-1 text-xs text-stone-700">
                      {weeklyMenu.days[selectedDayIndex].meals.dinner.map((dish, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 bg-white px-2 py-1 rounded-lg border border-stone-200 font-medium shadow-2xs">
                          <span className="text-stone-500 font-bold">›</span>
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
          <div className="card-clean p-4 sm:p-6 shadow-sm border-stone-200/90 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2.5 mb-3.5">
              <div>
                <span className="badge-status badge-orange mb-1">
                  <Vote className="w-3 h-3" /> Active Poll
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-heading">{activePoll.title}</h2>
                <p className="text-[11px] text-stone-500 mt-0.5 font-medium">{activePoll.description}</p>
              </div>
              <div className="text-right text-xs bg-stone-50 p-2 rounded-xl border border-stone-200">
                <span className="text-stone-600 text-[11px] font-medium block">{activePoll.closingLabel}</span>
                <p className="font-extrabold text-stone-900 text-xs sm:text-sm">{activePoll.totalVotes} Votes</p>
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
                          ? 'border-brand-600 bg-brand-50/50 shadow-2xs'
                          : 'border-stone-200 bg-stone-50/40'
                        : 'border-stone-200 hover:border-brand-300 hover:bg-stone-50/80 cursor-pointer shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                          isSelected
                            ? 'bg-brand-600 border-brand-600 text-white'
                            : 'border-stone-300 bg-white'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-stone-900">{opt.title}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg border bg-stone-100 text-stone-800 border-stone-200">
                        {opt.tag}
                      </span>
                    </div>

                    <div className="mt-2">
                      <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 bg-brand-600"
                          style={{ width: `${opt.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-stone-500 mt-1 font-semibold">
                        <span>{opt.votes} student votes</span>
                        <strong className="text-stone-900 text-xs">{opt.percentage}%</strong>
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
          <div className="card-clean p-4 sm:p-6 shadow-sm border-stone-200/90 bg-white">
            <div className="border-b border-stone-100 pb-2.5 mb-3.5">
              <span className="badge-status badge-orange mb-1">
                <TrendingUp className="w-3 h-3" /> Action & Accountability
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-heading">You Said → We Did</h2>
              <p className="text-[11px] text-stone-500 mt-0.5 font-medium">
                Real corrective actions taken in the hostel kitchen based on student feedback.
              </p>
            </div>

            <div className="space-y-3">
              {resolvedIssues.map((issue) => (
                <div key={issue.id} className="p-3.5 rounded-2xl border border-stone-200 bg-white hover:border-stone-300 transition shadow-2xs">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="badge-status badge-green text-[10px]">
                      <CheckCircle2 className="w-3 h-3" /> Action Verified
                    </span>
                    <span className="text-[11px] text-stone-400 font-medium">{issue.publishedDate || issue.detectedDate}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2">
                    <div className="bg-rose-50/50 p-2.5 rounded-xl border border-rose-200/70">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block mb-0.5">
                        📢 You Said:
                      </span>
                      <p className="text-xs text-stone-900 font-bold">{issue.title}</p>
                    </div>

                    <div className="bg-brand-50/50 p-2.5 rounded-xl border border-brand-200/70">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-800 block mb-0.5">
                        ✅ We Did:
                      </span>
                      <p className="text-xs text-stone-900 font-bold">
                        {issue.publicSummary || issue.actionTaken}
                      </p>
                      {issue.impactMetric && (
                        <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-brand-900 bg-white px-2 py-0.5 rounded-md border border-brand-200">
                          <span>Rating:</span>
                          <span className="text-stone-400 line-through">{issue.impactMetric.beforeRating}★</span>
                          <span>→</span>
                          <span className="text-brand-700">{issue.impactMetric.afterRating}★</span>
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
          <div className="card-clean p-4 sm:p-6 shadow-sm border-stone-200/90 bg-white">
            <div className="border-b border-stone-100 pb-2.5 mb-3.5">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2 font-heading">
                <History className="w-4 h-4 text-brand-600" />
                <span>My Anonymous Feedback History</span>
              </h2>
              <p className="text-[11px] text-stone-500 font-medium">
                Ratings signed with pseudonymous token <code className="bg-stone-100 text-stone-800 px-1.5 py-0.2 rounded font-mono font-bold">{currentStudent?.anonId}</code>
              </p>
            </div>

            <div className="space-y-2.5">
              {feedbacks
                .filter(f => f.anonId === currentStudent?.anonId)
                .map((fb) => (
                  <div key={fb.id} className="p-3 rounded-xl border border-stone-200 bg-stone-50/50">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= fb.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200'
                            }`}
                          />
                        ))}
                        <span className="text-xs font-bold text-stone-900 ml-1">{fb.rating}.0 Stars</span>
                      </div>
                      <span className="text-[10px] font-semibold text-stone-500 bg-white px-2 py-0.5 rounded-md border border-stone-200">
                        {fb.date} • {fb.timeCoarse}
                      </span>
                    </div>

                    {fb.chips && fb.chips.length > 0 && (
                      <div className="flex flex-wrap gap-1 my-1.5">
                        {fb.chips.map((chip, idx) => (
                          <span
                            key={idx}
                            className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                              chip.direction === 'positive'
                                ? 'bg-brand-50 text-brand-800 border border-brand-200'
                                : 'bg-rose-50 text-rose-800 border border-rose-200'
                            }`}
                          >
                            {chip.label}
                          </span>
                        ))}
                      </div>
                    )}

                    {fb.comment && (
                      <p className="text-xs text-stone-800 bg-white p-2 rounded-lg border border-stone-200/80 mt-1 font-medium">
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
