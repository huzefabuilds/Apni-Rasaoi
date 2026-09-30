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
      { code: 'taste_rich', icon: '🥘', label: 'Delicious Gravy', hindi: 'स्वादिष्ट स्वाद', category: 'taste' },
      { code: 'salt_perfect', icon: '🧂', label: 'Perfect Salt & Spice', hindi: 'सही नमक-मसाला', category: 'taste' },
      { code: 'roti_soft', icon: '🍞', label: 'Soft Warm Rotis', hindi: 'नरम रोटियां', category: 'quality' },
      { code: 'fresh_veg', icon: '🥗', label: 'Fresh Veggies & Salad', hindi: 'ताज़ा सब्जियां', category: 'hygiene' },
      { code: 'hot_fresh', icon: '🌡️', label: 'Served Steaming Hot', hindi: 'गरमा-गरम', category: 'temp' },
      { code: 'generous', icon: '🥣', label: 'Generous Serving', hindi: 'भरपूर मात्रा', category: 'quantity' },
      { code: 'quick_line', icon: '⚡', label: 'Fast Counter Service', hindi: 'तेज़ सेवा', category: 'service' },
      { code: 'clean_hall', icon: '🧼', label: 'Clean Plates & Hall', hindi: 'स्वच्छ मेस', category: 'hygiene' },
    ],
    negative: [
      { code: 'too_spicy', icon: '🌶️', label: 'Too Spicy / Oily', hindi: 'ज्यादा मिर्च/तेल', category: 'taste' },
      { code: 'salt_issue', icon: '🧂', label: 'Salt Off (High/Low)', hindi: 'नमक कम/ज्यादा', category: 'taste' },
      { code: 'hard_roti', icon: '🍞', label: 'Hard / Cold Rotis', hindi: 'कड़क/ठंडी रोटियां', category: 'quality' },
      { code: 'cold_food', icon: '🧊', label: 'Food Served Cold', hindi: 'ठंडा खाना', category: 'temp' },
      { code: 'watery_curry', icon: '🥘', label: 'Watery / Bland Gravy', hindi: 'पतली ग्रेवी', category: 'quality' },
      { code: 'short_supply', icon: '🥣', label: 'Refill Delayed', hindi: 'देरी से रीफिल', category: 'quantity' },
      { code: 'long_queue', icon: '⏳', label: 'Long Counter Queue', hindi: 'लंबी लाइन', category: 'service' },
      { code: 'hygiene_alert', icon: '🧼', label: 'Hygiene / Utensil Issue', hindi: 'सफाई की कमी', category: 'hygiene' },
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
    1: { title: 'Needs Improvement', sub: 'सुधार चाहिए', color: 'text-rose-600 bg-rose-50 border-rose-200' },
    2: { title: 'Below Average', sub: 'औसत से कम', color: 'text-orange-600 bg-orange-50 border-orange-200' },
    3: { title: 'Satisfactory', sub: 'ठीक-ठाक', color: 'text-amber-600 bg-amber-50 border-amber-200' },
    4: { title: 'Tasty & Good', sub: 'स्वादिष्ट', color: 'text-brand-700 bg-brand-50 border-brand-200' },
    5: { title: 'Delicious Feast!', sub: 'लाजवाब भोजन', color: 'text-brand-800 bg-brand-100 border-brand-300' }
  };

  const resolvedIssues = issues.filter(i => i.publishedToFeed || i.status === 'Resolved');

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-3 sm:py-5">
      {/* Student Navigation Bar */}
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-3 mb-5 overflow-x-auto gap-2 scrollbar-none">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('rate')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-xs ${
              activeTab === 'rate'
                ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/20'
                : 'text-stone-600 bg-white hover:bg-stone-50 border border-stone-200/80'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Rate Meal</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-xs ${
              activeTab === 'menu'
                ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/20'
                : 'text-stone-600 bg-white hover:bg-stone-50 border border-stone-200/80'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Weekly Menu</span>
          </button>

          <button
            onClick={() => setActiveTab('vote')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-xs ${
              activeTab === 'vote'
                ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/20'
                : 'text-stone-600 bg-white hover:bg-stone-50 border border-stone-200/80'
            }`}
          >
            <Vote className="w-4 h-4" />
            <span>Menu Poll</span>
          </button>

          <button
            onClick={() => setActiveTab('yousaid')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-xs ${
              activeTab === 'yousaid'
                ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/20'
                : 'text-stone-600 bg-white hover:bg-stone-50 border border-stone-200/80'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <span>You Said → We Did</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-xs ${
              activeTab === 'history'
                ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/20'
                : 'text-stone-600 bg-white hover:bg-stone-50 border border-stone-200/80'
            }`}
          >
            <History className="w-4 h-4" />
            <span>My Ratings</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 1: RATE CURRENT MEAL (MOBILE-FRIENDLY & CLEAN) ================= */}
      {activeTab === 'rate' && (
        <div className="space-y-4">
          {/* Privacy & Trust Assurance Notice */}
          <div className="bg-white border border-brand-200/80 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-stone-700 shadow-xs">
            <div className="p-1.5 bg-brand-50 text-brand-700 rounded-lg mt-0.5 border border-brand-200 flex-shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-stone-900">100% Anonymous & Private:</span> Your identity is strictly shielded. The mess team and cooks only see your feedback signed by your verified token <code className="bg-stone-100 px-2 py-0.5 rounded border border-stone-200 font-mono text-stone-800 font-bold">{currentStudent?.anonId}</code>.
            </div>
          </div>

          {/* Active Meal Card */}
          <div className="card-clean p-5 sm:p-7 relative overflow-hidden bg-white border border-stone-200/90 shadow-sm">
            {/* Meal Header with Warm Clean Food Accents */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="badge-status badge-green">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-600"></span>
                    Verified QR Counter Scan
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    Window: {activeSession.windowStart} – {activeSession.windowEnd}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-stone-900 mt-1 flex items-center gap-2 font-heading">
                  <span>Today's {activeSession.mealName}</span>
                  <span className="text-xs font-semibold text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
                    {activeSession.expectedDiners} Expected Diners
                  </span>
                </h2>
              </div>

              {/* Live 10-Second Timer Tracker */}
              {!alreadyRated && !isSubmitted && (
                <div className="flex items-center gap-2 bg-stone-900 text-white px-3.5 py-2 rounded-xl text-xs font-medium shadow-xs">
                  <Clock className="w-4 h-4 text-brand-400" />
                  <span>Timer: </span>
                  <strong className="font-mono text-brand-300 text-sm">{timerSeconds}s</strong>
                  <span className="text-stone-400 text-[10px] bg-stone-800 px-1.5 py-0.5 rounded">(&lt;10s Flow)</span>
                </div>
              )}
            </div>

            {/* Today's Menu Dishes with Appetizing Minimal Badges */}
            <div className="mb-6 bg-stone-50/80 rounded-2xl p-4 border border-stone-200/70">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5 flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-brand-600" /> Today's Meal Items:
              </p>
              <div className="flex flex-wrap gap-2">
                {activeSession.dishes.map((dish, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-stone-800 font-semibold shadow-2xs"
                  >
                    <span className="text-brand-600 text-sm">🥘</span>
                    <span>{dish}</span>
                  </span>
                ))}
              </div>
              {activeSession.contextNote && (
                <p className="mt-3 text-xs text-orange-900 bg-orange-50/90 px-3 py-1.5 rounded-xl border border-orange-200 flex items-center gap-1.5 font-medium">
                  <span className="text-orange-600 font-bold">ℹ️ Kitchen Note:</span> {activeSession.contextNote}
                </p>
              )}
            </div>

            {/* Already Rated / Submission Confirmation View */}
            {(alreadyRated || isSubmitted) ? (
              <div className="text-center py-8 px-4 bg-brand-50/40 rounded-2xl border border-brand-200/80">
                <div className="w-14 h-14 bg-brand-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md shadow-brand-600/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 font-heading">Feedback Submitted!</h3>
                <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto font-medium">
                  Thank you for rating today's {activeSession.mealName}. Your response has been securely added to the daily kitchen briefing.
                </p>

                {/* Rating Badge */}
                <div className="mt-5 inline-flex flex-col items-center bg-white p-4 rounded-2xl border border-stone-200 shadow-sm text-xs">
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= (submittedFeedback?.rating || existingFeedback?.rating || 0)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-200'
                        }`}
                      />
                    ))}
                    <span className="font-extrabold text-stone-900 ml-1.5 text-sm">
                      {submittedFeedback?.rating || existingFeedback?.rating} / 5 Stars
                    </span>
                  </div>
                  <span className="text-stone-500 font-medium text-[11px]">
                    Verified • 1 rating per student per meal
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => setActiveTab('vote')}
                    className="btn-primary text-xs py-2.5 px-4 rounded-xl shadow-sm"
                  >
                    <Vote className="w-4 h-4" /> Vote for Sunday Menu
                  </button>
                  <button
                    onClick={() => setActiveTab('yousaid')}
                    className="btn-secondary text-xs py-2.5 px-4 rounded-xl"
                  >
                    <TrendingUp className="w-4 h-4 text-orange-600" /> View "You Said → We Did"
                  </button>
                </div>
              </div>
            ) : (
              /* ================= RATING INPUT INTERFACE ================= */
              <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                {/* Step 1: Big Tactile Star Rating Buttons */}
                <div className="text-center py-4 bg-stone-50/70 rounded-2xl p-4 border border-stone-200/80">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                    Step 1: Tap Your Overall Meal Rating
                  </label>
                  <div className="flex items-center justify-center gap-2 sm:gap-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => handleStarSelect(star)}
                        className="star-btn flex flex-col items-center group"
                      >
                        <div className="p-1 rounded-2xl transition-all group-hover:bg-amber-50">
                          <Star
                            className={`w-11 h-11 sm:w-13 sm:h-13 transition-all ${
                              star <= selectedRating
                                ? 'fill-amber-400 text-amber-400 drop-shadow-sm scale-105'
                                : 'text-stone-300 group-hover:text-amber-300'
                            }`}
                          />
                        </div>
                        <span className="text-[11px] font-bold mt-1 text-stone-500">
                          {star}★
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Rating Label */}
                  {selectedRating > 0 && starLabels[selectedRating] && (
                    <div className="mt-3">
                      <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold border ${starLabels[selectedRating].color}`}>
                        <span>{starLabels[selectedRating].title}</span>
                        <span className="font-normal opacity-80">({starLabels[selectedRating].sub})</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Step 2: Food-Themed Feedback Reason Chips */}
                {selectedRating > 0 && (
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        {selectedRating <= 3 ? (
                          <>
                            <span className="text-rose-500 text-sm">⚠️</span>
                            <span>Step 2: What could be improved? (Tap up to 3)</span>
                          </>
                        ) : (
                          <>
                            <span className="text-brand-600 text-sm">✨</span>
                            <span>Step 2: What made it great? (Tap up to 3)</span>
                          </>
                        )}
                      </span>
                      <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full">
                        {selectedChips.length}/3 selected
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
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
                            <span className="text-base">{chip.icon}</span>
                            <span>{chip.label}</span>
                            <span className="text-[10px] font-medium opacity-70">
                              ({chip.hindi})
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 3: Optional Multilingual Short Comment */}
                {selectedRating > 0 && (
                  <div className="space-y-1.5 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-bold text-stone-800 flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-brand-600" />
                        <span>Optional Kitchen Note</span>
                        <span className="text-stone-400 font-normal">(English, Hindi or Hinglish)</span>
                      </label>
                      <span className="text-[11px] text-brand-800 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-200/80 font-semibold flex items-center gap-1">
                        <Lock className="w-3 h-3 text-brand-600" /> Privacy Shielded
                      </span>
                    </div>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="e.g. Paneer was very fresh, rotis were soft! or दाल में नमक सही था..."
                      rows={2}
                      maxLength={180}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/10 transition bg-stone-50/50"
                    ></textarea>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={selectedRating === 0}
                    className="w-full btn-primary py-3.5 text-sm rounded-xl font-bold shadow-md shadow-brand-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Anonymous Rating ({timerSeconds}s)</span>
                  </button>
                  <p className="text-[11px] text-center text-stone-400 mt-2 font-medium">
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
          <div className="card-clean p-5 sm:p-7 shadow-sm border-stone-200/90 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-stone-100 pb-3">
              <div>
                <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2 font-heading">
                  <div className="p-1.5 rounded-xl bg-orange-500 text-white shadow-xs">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span>{weeklyMenu.weekTitle}</span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5 font-medium">Approved Hostel Dining Schedule</p>
              </div>
              <span className="badge-status badge-green">
                <CheckCircle2 className="w-3.5 h-3.5" /> Published & Live
              </span>
            </div>

            {/* Day Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 scrollbar-none">
              {weeklyMenu.days.map((d, index) => {
                const isSelected = selectedDayIndex === index;
                return (
                  <button
                    key={d.day}
                    onClick={() => setSelectedDayIndex(index)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-brand-600 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 border border-transparent'
                    }`}
                  >
                    <span>{d.day}</span>
                    {d.isToday && (
                      <span className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-brand-100 text-brand-800'
                      }`}>
                        • Today
                      </span>
                    )}
                    {d.isSpecial && (
                      <span className={`ml-1 text-[10px] ${isSelected ? 'text-orange-200' : 'text-orange-600'} font-bold`}>
                        ★ Special
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Day Meals Grid */}
            {weeklyMenu.days[selectedDayIndex] && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                    <span>{weeklyMenu.days[selectedDayIndex].day}'s Daily Roster</span>
                  </h3>
                  {weeklyMenu.days[selectedDayIndex].isToday && (
                    <span className="badge-status badge-orange text-[11px]">
                      Today's Active Schedule
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {/* Breakfast Card */}
                  <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-200/70">
                    <div className="flex items-center justify-between mb-3 text-orange-950 font-bold text-xs">
                      <span className="flex items-center gap-1.5">
                        <span className="text-base">☕</span>
                        <span className="font-heading text-sm font-bold text-stone-900">Breakfast</span>
                      </span>
                      <span className="text-orange-700 font-medium text-[11px]">07:30 - 09:30</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-stone-700">
                      {weeklyMenu.days[selectedDayIndex].meals.breakfast.map((dish, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-white px-2.5 py-1.5 rounded-xl border border-orange-100 font-medium shadow-2xs">
                          <span className="text-orange-600 font-bold">›</span>
                          <span>{dish}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Lunch Card */}
                  <div className="bg-brand-50/50 p-4 rounded-2xl border border-brand-200/70">
                    <div className="flex items-center justify-between mb-3 text-brand-950 font-bold text-xs">
                      <span className="flex items-center gap-1.5">
                        <span className="text-base">🍛</span>
                        <span className="font-heading text-sm font-bold text-stone-900">Lunch</span>
                      </span>
                      <span className="text-brand-700 font-medium text-[11px]">12:30 - 14:30</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-stone-800">
                      {weeklyMenu.days[selectedDayIndex].meals.lunch.map((dish, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-white px-2.5 py-1.5 rounded-xl border border-brand-100 font-medium shadow-2xs">
                          <span className="text-brand-600 font-bold">›</span>
                          <span>{dish}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dinner Card */}
                  <div className="bg-stone-100/70 p-4 rounded-2xl border border-stone-200/80">
                    <div className="flex items-center justify-between mb-3 text-stone-900 font-bold text-xs">
                      <span className="flex items-center gap-1.5">
                        <span className="text-base">🌙</span>
                        <span className="font-heading text-sm font-bold text-stone-900">Dinner</span>
                      </span>
                      <span className="text-stone-500 font-medium text-[11px]">19:30 - 21:30</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-stone-700">
                      {weeklyMenu.days[selectedDayIndex].meals.dinner.map((dish, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-white px-2.5 py-1.5 rounded-xl border border-stone-200 font-medium shadow-2xs">
                          <span className="text-stone-500 font-bold">›</span>
                          <span>{dish}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {weeklyMenu.days[selectedDayIndex].changesLogged && (
                  <div className="bg-orange-50 p-3.5 rounded-xl border border-orange-200 text-xs text-orange-900 flex items-center gap-2 font-medium">
                    <span className="p-1 rounded-md bg-orange-200 text-orange-800">🔔</span>
                    <div>
                      <strong>Kitchen Notice:</strong> {weeklyMenu.days[selectedDayIndex].changesLogged[0]?.note}
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
          <div className="card-clean p-5 sm:p-7 shadow-sm border-stone-200/90 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3 mb-4">
              <div>
                <span className="badge-status badge-orange mb-1">
                  <Vote className="w-3.5 h-3.5" /> Active Student Poll
                </span>
                <h2 className="text-xl font-bold text-stone-900 font-heading">{activePoll.title}</h2>
                <p className="text-xs text-stone-500 mt-0.5 font-medium">{activePoll.description}</p>
              </div>
              <div className="text-right text-xs bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <span className="text-stone-600 font-medium block">{activePoll.closingLabel}</span>
                <p className="font-extrabold text-stone-900 text-sm">{activePoll.totalVotes} Student Votes</p>
              </div>
            </div>

            {/* Voting Options */}
            <div className="space-y-3">
              {activePoll.options.map((opt) => {
                const isSelected = votedPolls[activePoll.id] === opt.id;

                return (
                  <div
                    key={opt.id}
                    onClick={() => !hasVotedActivePoll && submitPollVote(activePoll.id, opt.id)}
                    className={`p-4 rounded-2xl border transition-all ${
                      hasVotedActivePoll
                        ? isSelected
                          ? 'border-brand-600 bg-brand-50/50 shadow-xs'
                          : 'border-stone-200 bg-stone-50/40'
                        : 'border-stone-200 hover:border-brand-300 hover:bg-stone-50/80 cursor-pointer shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                          isSelected
                            ? 'bg-brand-600 border-brand-600 text-white'
                            : 'border-stone-300 bg-white'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                        <span className="text-sm font-bold text-stone-900">{opt.title}</span>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg border bg-stone-100 text-stone-800 border-stone-200">
                        {opt.tag}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-2.5">
                      <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 bg-brand-600"
                          style={{ width: `${opt.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[11px] text-stone-500 mt-1.5 font-semibold">
                        <span>{opt.votes} student votes</span>
                        <strong className="text-stone-900 text-xs">{opt.percentage}%</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {hasVotedActivePoll ? (
              <div className="mt-5 p-3.5 bg-brand-50 rounded-xl border border-brand-200 text-xs text-brand-900 flex items-center gap-2.5 font-medium">
                <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0" />
                <span>Your anonymous vote has been counted! The mess provider will inspect results before finalizing Sunday's feast.</span>
              </div>
            ) : (
              <p className="text-xs text-center text-stone-400 mt-4 font-medium">
                Tap any option above to cast your 1 verified vote.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 4: "YOU SAID → WE DID" FEED ================= */}
      {activeTab === 'yousaid' && (
        <div className="space-y-4">
          <div className="card-clean p-5 sm:p-7 shadow-sm border-stone-200/90 bg-white">
            <div className="border-b border-stone-100 pb-3 mb-4">
              <span className="badge-status badge-orange mb-1">
                <TrendingUp className="w-3.5 h-3.5" /> Action & Accountability
              </span>
              <h2 className="text-xl font-bold text-stone-900 font-heading">You Said → We Did</h2>
              <p className="text-xs text-stone-500 mt-0.5 font-medium">
                Real corrective actions taken in the hostel kitchen based on student feedback.
              </p>
            </div>

            <div className="space-y-4">
              {resolvedIssues.map((issue) => (
                <div key={issue.id} className="p-4 rounded-2xl border border-stone-200 bg-white hover:border-stone-300 transition shadow-2xs">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="badge-status badge-green text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Action Verified
                    </span>
                    <span className="text-xs text-stone-400 font-medium">{issue.publishedDate || issue.detectedDate}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-3">
                    {/* Student Feedback */}
                    <div className="bg-rose-50/50 p-3.5 rounded-xl border border-rose-200/70">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block mb-1">
                        📢 You Said:
                      </span>
                      <p className="text-xs text-stone-900 font-bold">{issue.title}</p>
                      <span className="text-[11px] text-rose-700 mt-1 block font-medium">Theme: {issue.theme}</span>
                    </div>

                    {/* Mess Action */}
                    <div className="bg-brand-50/50 p-3.5 rounded-xl border border-brand-200/70">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-800 block mb-1">
                        ✅ We Did:
                      </span>
                      <p className="text-xs text-stone-900 font-bold">
                        {issue.publicSummary || issue.actionTaken}
                      </p>
                      {issue.impactMetric && (
                        <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-900 bg-white px-2.5 py-1 rounded-lg border border-brand-200 shadow-2xs">
                          <span>Rating:</span>
                          <span className="text-stone-400 line-through">{issue.impactMetric.beforeRating}★</span>
                          <span>→</span>
                          <span className="text-brand-700">{issue.impactMetric.afterRating}★</span>
                          <span className="text-brand-800 font-extrabold bg-brand-100 px-1.5 py-0.2 rounded">
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
          <div className="card-clean p-5 sm:p-7 shadow-sm border-stone-200/90 bg-white">
            <div className="border-b border-stone-100 pb-3 mb-4">
              <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2 font-heading">
                <History className="w-5 h-5 text-brand-600" />
                <span>My Anonymous Feedback History</span>
              </h2>
              <p className="text-xs text-stone-500 font-medium">
                Ratings signed with pseudonymous token <code className="bg-stone-100 text-stone-800 px-1.5 py-0.5 rounded font-mono font-bold">{currentStudent?.anonId}</code>
              </p>
            </div>

            <div className="space-y-3">
              {feedbacks
                .filter(f => f.anonId === currentStudent?.anonId)
                .map((fb) => (
                  <div key={fb.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= fb.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200'
                            }`}
                          />
                        ))}
                        <span className="text-xs font-bold text-stone-900 ml-1">{fb.rating}.0 Stars</span>
                      </div>
                      <span className="text-xs font-semibold text-stone-500 bg-white px-2 py-0.5 rounded-md border border-stone-200">
                        {fb.date} • {fb.timeCoarse}
                      </span>
                    </div>

                    {/* Reason Chips */}
                    {fb.chips && fb.chips.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 my-2">
                        {fb.chips.map((chip, idx) => (
                          <span
                            key={idx}
                            className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
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

                    {/* Comment */}
                    {fb.comment && (
                      <p className="text-xs text-stone-800 bg-white p-2.5 rounded-xl border border-stone-200/80 mt-1 font-medium">
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
