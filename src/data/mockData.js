// Apni Rasoi — Comprehensive Initial Data Model strictly aligned with PRD v3.1

export const MEAL_SCHEDULE = [
  { id: 'breakfast', name: 'Breakfast', startTime: '07:30', endTime: '09:30', bufferMins: 60, icon: 'Coffee', hindiName: 'नाश्ता' },
  { id: 'lunch', name: 'Lunch', startTime: '12:30', endTime: '14:30', bufferMins: 60, icon: 'Utensils', hindiName: 'दोपहर का भोजन' },
  { id: 'dinner', name: 'Dinner', startTime: '19:30', endTime: '21:30', bufferMins: 60, icon: 'Moon', hindiName: 'रात का खाना' },
];

export const REASON_CHIPS = {
  negative: [
    { code: 'taste', label: 'Taste', hindi: 'स्वाद', icon: 'Flame' },
    { code: 'quantity', label: 'Quantity', hindi: 'मात्रा', icon: 'Scale' },
    { code: 'hygiene', label: 'Hygiene', hindi: 'स्वच्छता', icon: 'Sparkles' },
    { code: 'quality', label: 'Food Quality', hindi: 'गुणवत्ता', icon: 'Award' },
    { code: 'temperature', label: 'Temperature', hindi: 'तापमान (ठंडा/गरम)', icon: 'Thermometer' },
    { code: 'service', label: 'Delay & Service', hindi: 'देरी / सेवा', icon: 'Clock' },
  ],
  positive: [
    { code: 'taste', label: 'Delicious Taste', hindi: 'स्वादिष्ट स्वाद', icon: 'Heart' },
    { code: 'quantity', label: 'Generous Serving', hindi: 'भरपूर मात्रा', icon: 'Scale' },
    { code: 'hygiene', label: 'Clean & Fresh', hindi: 'साफ व स्वच्छ', icon: 'Sparkles' },
    { code: 'quality', label: 'High Quality', hindi: 'उत्तम गुणवत्ता', icon: 'Award' },
    { code: 'temperature', label: 'Hot & Fresh', hindi: 'गरमा-गरम', icon: 'Flame' },
    { code: 'service', label: 'Quick Service', hindi: 'त्वरित सेवा', icon: 'Clock' },
  ]
};

export const INITIAL_MENU = {
  id: 'menu_week_42',
  weekTitle: 'Current Week (28 Sep - 04 Oct)',
  status: 'published',
  publishedAt: '2026-09-28T09:00:00Z',
  totalHeadCount: 300,
  days: [
    {
      day: 'Monday',
      meals: {
        breakfast: ['Poha with Roasted Peanuts', 'Boiled Eggs / Sprouts', 'Bread, Butter & Jam', 'Masala Tea / Milk'],
        lunch: ['Rajma Masala', 'Steamed Basmati Rice', 'Butter Roti', 'Boondi Raita', 'Fresh Green Salad'],
        dinner: ['Aloo Gobi Matar', 'Dal Tadka', 'Hot Phulkas', 'Jeera Rice', 'Gulab Jamun (1 pc)']
      }
    },
    {
      day: 'Tuesday',
      meals: {
        breakfast: ['Stuffed Aloo Paratha (2 pcs)', 'Curd & Pickle', 'Masala Tea / Milk'],
        lunch: ['Kadhi Pakora', 'Jeera Rice', 'Tawa Roti', 'Aloo Beans Fry', 'Roasted Papad'],
        dinner: ['Egg Curry / Paneer Do Pyaza', 'Yellow Dal Fry', 'Steamed Rice', 'Butter Roti', 'Suji Halwa']
      }
    },
    {
      day: 'Wednesday',
      meals: {
        breakfast: ['Idli & Medu Vada (2+1)', 'Coconut Chutney & Sambhar', 'Filter Coffee / Milk'],
        lunch: ['Chole Masala', 'Bhature (2 pcs) / Steamed Rice', 'Kachumber Salad', 'Sweet Mint Chutney'],
        dinner: ['Mix Vegetable Curry', 'Dal Makhani', 'Jeera Rice', 'Tandoori Roti', 'Custard with Fruits']
      }
    },
    {
      day: 'Thursday',
      isToday: true,
      meals: {
        breakfast: ['Crispy Veg Cutlets (2 pcs)', 'Poha', 'Tomato Ketchup & Green Chutney', 'Ginger Tea / Milk'],
        lunch: ['Shahi Paneer / Chicken Curry', 'Dal Fry', 'Jeera Rice', 'Butter Naan / Roti', 'Cucumber Raita', 'Sweet Gulab Jamun'],
        dinner: ['Baingan Bharta', 'Panchmel Dal', 'Missi Roti & Phulkas', 'Steamed Rice', 'Rasgulla (1 pc)']
      },
      contextNote: 'Special Punjabi Thali festival theme. Extra counter opened for faster service.',
      changesLogged: [
        { meal: 'lunch', time: '11:45 AM', note: 'Added Sweet Gulab Jamun on student popular request.' }
      ]
    },
    {
      day: 'Friday',
      meals: {
        breakfast: ['Upma with Coconut Chutney', 'Boiled Eggs / Banana', 'Tea / Coffee'],
        lunch: ['Kashmiri Dum Aloo', 'Dal Palak', 'Steamed Rice', 'Tawa Chapati', 'Curd'],
        dinner: ['Veg Biryani / Chicken Biryani', 'Mirchi Ka Salan', 'Onion Raita', 'Kheer']
      }
    },
    {
      day: 'Saturday',
      meals: {
        breakfast: ['Pav Bhaji / Poha', 'Chopped Onions & Lemon', 'Tea / Milk'],
        lunch: ['Lauki Chana Dal', 'Steamed Rice', 'Aloo Jeera', 'Phulkas', 'Pickle & Papad'],
        dinner: ['Dal Tadka', 'Jeera Aloo', 'Hot Phulkas', 'Rice', 'Ice Cream Cup']
      }
    },
    {
      day: 'Sunday',
      isSpecial: true,
      meals: {
        breakfast: ['Bedmi Puri & Aloo Sabzi (3 pcs)', 'Sweet Lassi', 'Masala Tea'],
        lunch: ['Special Mess Feast (Voted Choice)', 'Veg Pulao', 'Dal Bukhara', 'Butter Naan', 'Moong Dal Halwa'],
        dinner: ['Khichdi / Dalia (Light Dinner)', 'Kadai Sabzi', 'Curd', 'Papad', 'Fruit Salad']
      }
    }
  ]
};

export const INITIAL_MEAL_SESSIONS = [
  {
    id: 'session-20260930-lunch',
    date: '2026-09-30',
    mealType: 'lunch',
    mealName: 'Lunch',
    status: 'open',
    qrToken: 'AR-LUNCH-903-VALID',
    windowStart: '12:30',
    windowEnd: '15:30', // Meal end 14:30 + 60m buffer
    extendedByMins: 0,
    scanCount: 78,
    firstScanAt: '12:32 PM',
    expectedDiners: 300,
    dishes: ['Shahi Paneer / Chicken Curry', 'Dal Fry', 'Jeera Rice', 'Butter Naan / Roti', 'Cucumber Raita', 'Sweet Gulab Jamun'],
    contextNote: 'Extra counter operational to manage high lunch rush.',
    disputeStatus: null
  },
  {
    id: 'session-20260930-breakfast',
    date: '2026-09-30',
    mealType: 'breakfast',
    mealName: 'Breakfast',
    status: 'closed',
    qrToken: 'AR-BKFST-903-EXPIRED',
    windowStart: '07:30',
    windowEnd: '10:30',
    extendedByMins: 0,
    scanCount: 112,
    firstScanAt: '07:31 AM',
    expectedDiners: 300,
    dishes: ['Crispy Veg Cutlets (2 pcs)', 'Poha', 'Tomato Ketchup & Green Chutney', 'Ginger Tea / Milk'],
    contextNote: null,
    disputeStatus: null
  },
  {
    id: 'session-20260930-dinner',
    date: '2026-09-30',
    mealType: 'dinner',
    mealName: 'Dinner',
    status: 'upcoming',
    qrToken: 'AR-DINNER-903-PENDING',
    windowStart: '19:30',
    windowEnd: '22:30',
    extendedByMins: 0,
    scanCount: 0,
    firstScanAt: null,
    expectedDiners: 300,
    dishes: ['Baingan Bharta', 'Panchmel Dal', 'Missi Roti & Phulkas', 'Steamed Rice', 'Rasgulla (1 pc)'],
    contextNote: null,
    disputeStatus: null
  }
];

export const INITIAL_FEEDBACKS = [
  {
    id: 'fb-101',
    anonId: 'ANON-7842',
    mealSessionId: 'session-20260930-lunch',
    mealType: 'lunch',
    date: 'Today',
    timeCoarse: 'Lunch',
    rating: 4,
    chips: [
      { code: 'taste', direction: 'positive', label: 'Delicious Taste' },
      { code: 'quality', direction: 'positive', label: 'High Quality' }
    ],
    comment: 'Shahi paneer was super rich and fresh today! Best lunch this week.',
    language: 'English',
    redactedComment: 'Shahi paneer was super rich and fresh today! Best lunch this week.',
    status: 'valid',
    isAbuseFlagged: false
  },
  {
    id: 'fb-102',
    anonId: 'ANON-3319',
    mealSessionId: 'session-20260930-lunch',
    mealType: 'lunch',
    date: 'Today',
    timeCoarse: 'Lunch',
    rating: 2,
    chips: [
      { code: 'temperature', direction: 'negative', label: 'Temperature' },
      { code: 'service', direction: 'negative', label: 'Delay & Service' }
    ],
    comment: 'Roti thandi thi aur counter 2 par 15 minute line me khada hona pada.',
    language: 'Hinglish',
    redactedComment: 'Roti thandi thi aur counter 2 par 15 minute line me khada hona pada.',
    status: 'valid',
    isAbuseFlagged: false
  },
  {
    id: 'fb-103',
    anonId: 'ANON-9012',
    mealSessionId: 'session-20260930-lunch',
    mealType: 'lunch',
    date: 'Today',
    timeCoarse: 'Lunch',
    rating: 1,
    chips: [
      { code: 'hygiene', direction: 'negative', label: 'Hygiene' },
      { code: 'taste', direction: 'negative', label: 'Taste' }
    ],
    comment: 'Water glasses were oily near the dispenser. Dal me namak bohot zyada tha. My room 312 friend also noticed.',
    language: 'English',
    redactedComment: 'Water glasses were oily near the dispenser. Dal me namak bohot zyada tha. My [REDACTED ROOM] friend also noticed.',
    status: 'valid',
    isAbuseFlagged: false
  },
  {
    id: 'fb-104',
    anonId: 'ANON-5581',
    mealSessionId: 'session-20260930-lunch',
    mealType: 'lunch',
    date: 'Today',
    timeCoarse: 'Lunch',
    rating: 5,
    chips: [
      { code: 'taste', direction: 'positive', label: 'Delicious Taste' },
      { code: 'quantity', direction: 'positive', label: 'Generous Serving' },
      { code: 'temperature', direction: 'positive', label: 'Hot & Fresh' }
    ],
    comment: 'Gulab jamun was warm and fresh! Great improvement over yesterday.',
    language: 'English',
    redactedComment: 'Gulab jamun was warm and fresh! Great improvement over yesterday.',
    status: 'valid',
    isAbuseFlagged: false
  },
  {
    id: 'fb-105',
    anonId: 'ANON-1194',
    mealSessionId: 'session-20260930-lunch',
    mealType: 'lunch',
    date: 'Today',
    timeCoarse: 'Lunch',
    rating: 3,
    chips: [
      { code: 'quantity', direction: 'negative', label: 'Quantity' }
    ],
    comment: 'Curry khatam ho gayi thi by 1:40 PM, had to wait for refill.',
    language: 'Hinglish',
    redactedComment: 'Curry khatam ho gayi thi by 1:40 PM, had to wait for refill.',
    status: 'valid',
    isAbuseFlagged: false
  },
  {
    id: 'fb-106',
    anonId: 'ANON-6623',
    mealSessionId: 'session-20260930-breakfast',
    mealType: 'breakfast',
    date: 'Today',
    timeCoarse: 'Breakfast',
    rating: 4,
    chips: [
      { code: 'taste', direction: 'positive', label: 'Delicious Taste' },
      { code: 'service', direction: 'positive', label: 'Quick Service' }
    ],
    comment: 'Veg cutlets crispy aur garam the. Tea was also good.',
    language: 'Hinglish',
    redactedComment: 'Veg cutlets crispy aur garam the. Tea was also good.',
    status: 'valid',
    isAbuseFlagged: false
  },
  {
    id: 'fb-107',
    anonId: 'ANON-8847',
    mealSessionId: 'session-20260930-breakfast',
    mealType: 'breakfast',
    date: 'Today',
    timeCoarse: 'Breakfast',
    rating: 2,
    chips: [
      { code: 'temperature', direction: 'negative', label: 'Temperature' }
    ],
    comment: 'Tea was lukewarm at 8:45 AM. Contact me at 9876543210 if needed - Aryan Room 104.',
    language: 'English',
    redactedComment: 'Tea was lukewarm at 8:45 AM. Contact me at [REDACTED PHONE] if needed - [REDACTED NAME] [REDACTED ROOM].',
    status: 'valid',
    isAbuseFlagged: false
  }
];

export const INITIAL_AI_SUMMARY = {
  date: 'Today (30 Sep 2026)',
  overallSentiment: 'Positive (3.8 / 5.0)',
  totalReviews: 78,
  expectedDiners: 300,
  responseRatePercent: 26,
  headline: 'Strong appreciation for Shahi Paneer & Gulab Jamun; Minor bottlenecks in roti temperature & water dispenser hygiene.',
  keyPositives: [
    { theme: 'Taste & Food Quality', mentionCount: 48, percentage: 61, text: 'Shahi Paneer gravy and Gulab Jamun received highest ratings (89% positive).' },
    { theme: 'Serving Quantity', mentionCount: 34, percentage: 44, text: 'Students appreciated unmetered dessert and fresh curd raita.' }
  ],
  keyNegatives: [
    { theme: 'Temperature / Delays', mentionCount: 19, percentage: 24, text: 'Rotis served in Batch 2 (1:15-1:45 PM) were reported cold due to counter lag.' },
    { theme: 'Dispenser Hygiene', mentionCount: 7, percentage: 9, text: 'Minor complaints regarding water glasses cleaning near South Dispenser.' }
  ],
  needsAttention: [
    {
      id: 'alert-01',
      severity: 'medium',
      title: 'Water Glass Hygiene at South Counter',
      summary: '3 students reported residue on glasses near dispenser. Recommended to inspect washing temperature.',
      suggestedAction: 'Deploy extra basket of sanitized steel glasses & check dishwasher rinse cycle.'
    },
    {
      id: 'alert-02',
      severity: 'low',
      title: 'Roti Supply Delay at Peak Rush (1:30 PM)',
      summary: 'Batch 2 experienced 8-10 min delay causing rotis to cool down before serving.',
      suggestedAction: 'Stagger phulka preparation with hot insulated casseroles.'
    }
  ],
  multilingualStats: {
    english: '54%',
    hinglish: '36%',
    hindi: '10%'
  }
};

export const INITIAL_ISSUES = [
  {
    id: 'ISSUE-401',
    theme: 'Hygiene & Cleanliness',
    title: 'Water dispenser glass cleaning',
    detectedDate: '30 Sep 2026',
    mealType: 'Lunch',
    status: 'In Progress',
    priority: 'Medium',
    actionTaken: 'Inspected washing area, switched to high-temp sanitizer rinse.',
    publishedToFeed: false,
    impactMetric: null
  },
  {
    id: 'ISSUE-398',
    theme: 'Temperature',
    title: 'Lukewarm rotis during peak 1:30 PM rush',
    detectedDate: '29 Sep 2026',
    mealType: 'Lunch',
    status: 'In Progress',
    priority: 'Medium',
    actionTaken: 'Ordered 2 additional thermal casseroles for live chapati station.',
    publishedToFeed: false,
    impactMetric: null
  },
  {
    id: 'ISSUE-382',
    theme: 'Taste & Spiciness',
    title: 'Excessive chili in Dal Tadka',
    detectedDate: '26 Sep 2026',
    mealType: 'Dinner',
    status: 'Resolved',
    priority: 'High',
    actionTaken: 'Reduced green chili ratio by 40% and standardized tadka recipe with head chef.',
    publishedToFeed: true,
    publishedDate: '28 Sep 2026',
    publicSummary: 'Standardized spice level in Dal Tadka. Green chili reduced per student preference.',
    impactMetric: {
      beforeRating: 2.9,
      afterRating: 4.4,
      improvement: '+1.5 Stars'
    }
  },
  {
    id: 'ISSUE-375',
    theme: 'Service & Refills',
    title: 'Tea dispenser empty at 8:45 AM breakfast',
    detectedDate: '24 Sep 2026',
    mealType: 'Breakfast',
    status: 'Resolved',
    priority: 'Medium',
    actionTaken: 'Added a secondary 20L hot beverage boiler at Counter B.',
    publishedToFeed: true,
    publishedDate: '25 Sep 2026',
    publicSummary: 'Installed a secondary 20L hot tea boiler to eliminate morning breakfast queue.',
    impactMetric: {
      beforeRating: 3.1,
      afterRating: 4.6,
      improvement: '+1.5 Stars'
    }
  }
];

export const INITIAL_POLLS = [
  {
    id: 'poll-sun-feast-01',
    title: 'Sunday Feast Special Vote 🍛',
    description: 'Help the kitchen plan this Sunday’s Special Lunch menu! Vote for your favorite combo.',
    targetDate: 'Sunday, 05 Oct',
    mealType: 'Lunch',
    status: 'active',
    closingAt: '2026-10-02T22:00:00Z',
    closingLabel: 'Closes Friday at 10:00 PM',
    totalVotes: 296,
    options: [
      { id: 'opt-1', title: 'Pav Bhaji with Butter Pav & Gulab Jamun', votes: 142, percentage: 48, tag: 'High Protein / Rich' },
      { id: 'opt-2', title: 'Chole Bhature with Sweet Punjabi Lassi', votes: 98, percentage: 33, tag: 'North Indian Classic' },
      { id: 'opt-3', title: 'Paneer Butter Masala with Garlic Naan & Dal Makhani', votes: 56, percentage: 19, tag: 'Royal Feast' }
    ],
    managerNote: 'Winning option will be reviewed against kitchen capacity and budget before final publish.'
  }
];

export const REGISTERED_STUDENTS_MOCK = [
  { id: 'st-01', name: 'Aarav Sharma', rollNo: '22CS1004', email: 'aarav.22cs@hostel.edu', room: 'B-204', verified: true, anonId: 'ANON-7842' },
  { id: 'st-02', name: 'Rohan Gupta', rollNo: '22EE1032', email: 'rohan.22ee@hostel.edu', room: 'A-112', verified: true, anonId: 'ANON-3319' },
  { id: 'st-03', name: 'Priya Verma', rollNo: '23ME1018', email: 'priya.23me@hostel.edu', room: 'C-314', verified: true, anonId: 'ANON-9012' },
  { id: 'st-04', name: 'Aditya Singh', rollNo: '21CS1090', email: 'aditya.21cs@hostel.edu', room: 'B-108', verified: true, anonId: 'ANON-5581' },
  { id: 'st-05', name: 'Sneha Patel', rollNo: '23CH1005', email: 'sneha.23ch@hostel.edu', room: 'C-201', verified: true, anonId: 'ANON-1194' }
];

export const INITIAL_OVERRIDE_LOGS = [
  {
    id: 'ovr-1',
    mealSessionId: 'session-20260928-dinner',
    mealName: 'Dinner (28 Sep)',
    grantedBy: 'Warden (Dr. K. S. Murthy)',
    actionType: 'Window Extended',
    details: '+45 minutes extension',
    reason: 'Power outage in hostel mess delayed dinner service by 30 mins.',
    timestamp: '2026-09-28 21:25'
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'aud-1',
    actor: 'Platform Admin (Hostel Office)',
    action: 'Student Verification OTP sent',
    target: 'Roll No: 22CS1004',
    reason: 'Initial student onboarding & device link',
    timestamp: '2026-09-28 10:15 AM'
  },
  {
    id: 'aud-2',
    actor: 'Platform Admin (Hostel Office)',
    action: 'Abuse Flag Review (Cleared)',
    target: 'ANON-9012',
    reason: 'Routine check on flagged low rating cluster - found genuine feedback.',
    timestamp: '2026-09-29 03:40 PM'
  }
];

export const ROLLOUT_TOGGLES = [
  { key: 'verification', title: 'Student Pseudonymous Verification', enabled: true, stage: 'Pilot Core' },
  { key: 'qr_window', title: 'QR Token & Rating Window Enforcement', enabled: true, stage: 'Pilot Core' },
  { key: 'reason_chips', title: 'Adaptive Reason Chips', enabled: true, stage: 'Pilot Core' },
  { key: 'manager_dashboard', title: 'Manager 2-Min Dashboard & Response Rates', enabled: true, stage: 'Pilot Core' },
  { key: 'warden_override', title: 'Warden Read-Only & QR Window Override', enabled: true, stage: 'Pilot Core' },
  { key: 'ai_summaries', title: 'AI Multilingual Summaries & Comment Redaction', enabled: true, stage: 'Phase 2' },
  { key: 'you_said_we_did', title: 'You Said → We Did Student Feed', enabled: true, stage: 'Phase 4' },
  { key: 'menu_voting', title: 'Student Menu Voting Polls', enabled: true, stage: 'Phase 5' },
  { key: 'daily_digest', title: 'Automated Daily Email/WhatsApp Digest', enabled: true, stage: 'Phase 2' }
];
