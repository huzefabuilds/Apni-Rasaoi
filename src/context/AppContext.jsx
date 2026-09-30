import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  MEAL_SCHEDULE,
  REASON_CHIPS,
  INITIAL_MENU,
  INITIAL_MEAL_SESSIONS,
  INITIAL_FEEDBACKS,
  INITIAL_AI_SUMMARY,
  INITIAL_ISSUES,
  INITIAL_POLLS,
  REGISTERED_STUDENTS_MOCK,
  INITIAL_OVERRIDE_LOGS,
  INITIAL_AUDIT_LOGS,
  ROLLOUT_TOGGLES
} from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Active Role: 'student' | 'manager' | 'warden' | 'admin' | 'kiosk'
  const [activeRole, setActiveRole] = useState(() => {
    return localStorage.getItem('apni_rasoi_role') || 'student';
  });

  // Mobile Device Frame Toggle (for simulating mobile phone viewport on desktop)
  const [isMobileFrameView, setIsMobileFrameView] = useState(() => {
    return localStorage.getItem('apni_rasoi_mobile_frame') === 'true';
  });

  // Verified Student Session (Pseudonymous Profile)
  const [currentStudent, setCurrentStudent] = useState(() => {
    const saved = localStorage.getItem('apni_rasoi_student');
    return saved ? JSON.parse(saved) : REGISTERED_STUDENTS_MOCK[0];
  });

  // Data States
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('apni_rasoi_sessions');
    return saved ? JSON.parse(saved) : INITIAL_MEAL_SESSIONS;
  });

  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem('apni_rasoi_feedbacks');
    return saved ? JSON.parse(saved) : INITIAL_FEEDBACKS;
  });

  const [weeklyMenu, setWeeklyMenu] = useState(() => {
    const saved = localStorage.getItem('apni_rasoi_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU;
  });

  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem('apni_rasoi_issues');
    return saved ? JSON.parse(saved) : INITIAL_ISSUES;
  });

  const [polls, setPolls] = useState(() => {
    const saved = localStorage.getItem('apni_rasoi_polls');
    return saved ? JSON.parse(saved) : INITIAL_POLLS;
  });

  const [votedPolls, setVotedPolls] = useState(() => {
    const saved = localStorage.getItem('apni_rasoi_voted_polls');
    return saved ? JSON.parse(saved) : {}; // { [pollId]: optionId }
  });

  const [overrideLogs, setOverrideLogs] = useState(() => {
    const saved = localStorage.getItem('apni_rasoi_override_logs');
    return saved ? JSON.parse(saved) : INITIAL_OVERRIDE_LOGS;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('apni_rasoi_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [toggles, setToggles] = useState(() => {
    const saved = localStorage.getItem('apni_rasoi_toggles');
    return saved ? JSON.parse(saved) : ROLLOUT_TOGGLES;
  });

  const [aiSummary, setAiSummary] = useState(() => {
    const saved = localStorage.getItem('apni_rasoi_ai_summary');
    return saved ? JSON.parse(saved) : INITIAL_AI_SUMMARY;
  });

  const [notification, setNotification] = useState(null);

  // Active Meal Session (defaults to first open session or Lunch)
  const activeSession = sessions.find(s => s.status === 'open') || sessions[0];

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('apni_rasoi_role', activeRole);
  }, [activeRole]);

  useEffect(() => {
    localStorage.setItem('apni_rasoi_mobile_frame', isMobileFrameView);
  }, [isMobileFrameView]);

  useEffect(() => {
    localStorage.setItem('apni_rasoi_student', JSON.stringify(currentStudent));
  }, [currentStudent]);

  useEffect(() => {
    localStorage.setItem('apni_rasoi_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('apni_rasoi_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    localStorage.setItem('apni_rasoi_menu', JSON.stringify(weeklyMenu));
  }, [weeklyMenu]);

  useEffect(() => {
    localStorage.setItem('apni_rasoi_issues', JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    localStorage.setItem('apni_rasoi_polls', JSON.stringify(polls));
  }, [polls]);

  useEffect(() => {
    localStorage.setItem('apni_rasoi_voted_polls', JSON.stringify(votedPolls));
  }, [votedPolls]);

  useEffect(() => {
    localStorage.setItem('apni_rasoi_override_logs', JSON.stringify(overrideLogs));
  }, [overrideLogs]);

  useEffect(() => {
    localStorage.setItem('apni_rasoi_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('apni_rasoi_toggles', JSON.stringify(toggles));
  }, [toggles]);

  useEffect(() => {
    localStorage.setItem('apni_rasoi_ai_summary', JSON.stringify(aiSummary));
  }, [aiSummary]);

  // Show Toast Notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Check if student has already rated a session
  const hasStudentRatedSession = (sessionId, anonId = currentStudent?.anonId) => {
    return feedbacks.some(f => f.mealSessionId === sessionId && f.anonId === anonId);
  };

  // Privacy Redaction Helper (PRD FR-07, Section 13)
  const sanitizeStudentComment = (rawText) => {
    if (!rawText) return '';
    let sanitized = rawText;
    // Redact 10-digit phone numbers
    sanitized = sanitized.replace(/\b[6-9]\d{9}\b/g, '[REDACTED PHONE]');
    // Redact room numbers like Room 104, Room B-204, Rm 312
    sanitized = sanitized.replace(/\b(?:room|rm|hostel room)\s*(?:no\.?)?\s*([A-Za-z0-9-]+)/gi, '[REDACTED ROOM]');
    // Redact common names or prefixes like "- Aryan", "by Rohan"
    sanitized = sanitized.replace(/(?:by|from|-)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/g, '- [REDACTED NAME]');
    return sanitized;
  };

  // Detect Language
  const detectLanguage = (text) => {
    if (!text) return 'English';
    const devanagariRegex = /[\u0900-\u097F]/;
    if (devanagariRegex.test(text)) return 'Hindi';
    const hinglishWords = /\b(aur|bhi|tha|thi|hai|khatam|khana|bohot|zyada|thanda|garam|kripya|achha|kharab|namak|swad)\b/i;
    if (hinglishWords.test(text)) return 'Hinglish';
    return 'English';
  };

  // Submit Meal Feedback (10s target, duplicates blocked, privacy redacted)
  const submitFeedback = ({ rating, chips = [], rawComment = '', sessionId, completionSeconds = 6 }) => {
    if (!currentStudent || !currentStudent.verified) {
      showNotification('Please complete one-time verification first.', 'error');
      return { success: false, error: 'Verification required' };
    }

    const session = sessions.find(s => s.id === sessionId);
    if (!session) {
      showNotification('Invalid meal session.', 'error');
      return { success: false, error: 'Session not found' };
    }

    if (session.status !== 'open') {
      showNotification(`Rating window is closed for ${session.mealName}.`, 'error');
      return { success: false, error: 'Rating window closed' };
    }

    // Check duplicate
    if (hasStudentRatedSession(sessionId, currentStudent.anonId)) {
      showNotification('You have already submitted feedback for this meal.', 'error');
      return { success: false, error: 'Duplicate rating rejected' };
    }

    const language = detectLanguage(rawComment);
    const redactedComment = sanitizeStudentComment(rawComment);

    const newFeedback = {
      id: `fb-${Date.now()}`,
      anonId: currentStudent.anonId,
      mealSessionId: sessionId,
      mealType: session.mealType,
      date: 'Today',
      timeCoarse: session.mealName,
      rating,
      chips,
      comment: rawComment,
      redactedComment,
      language,
      status: 'valid',
      isAbuseFlagged: false,
      completionSeconds,
      timestamp: new Date().toISOString()
    };

    const updatedFeedbacks = [newFeedback, ...feedbacks];
    setFeedbacks(updatedFeedbacks);

    // Update session scan count
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        return { ...s, scanCount: s.scanCount + 1 };
      }
      return s;
    }));

    // Trigger celebration confetti for 4-5 stars
    if (rating >= 4) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    showNotification(`Feedback recorded anonymously in ${completionSeconds}s! Thank you! 🎉`, 'success');

    return { success: true, feedback: newFeedback };
  };

  // Submit Menu Poll Vote
  const submitPollVote = (pollId, optionId) => {
    if (!currentStudent || !currentStudent.verified) {
      showNotification('Please verify your account to vote.', 'error');
      return false;
    }

    if (votedPolls[pollId]) {
      showNotification('You have already voted in this poll.', 'error');
      return false;
    }

    setPolls(prev => prev.map(p => {
      if (p.id === pollId) {
        const totalVotes = p.totalVotes + 1;
        const updatedOptions = p.options.map(opt => {
          const votes = opt.id === optionId ? opt.votes + 1 : opt.votes;
          return {
            ...opt,
            votes,
            percentage: Math.round((votes / totalVotes) * 100)
          };
        });
        return {
          ...p,
          totalVotes,
          options: updatedOptions
        };
      }
      return p;
    }));

    setVotedPolls(prev => ({
      ...prev,
      [pollId]: optionId
    }));

    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 }
    });

    showNotification('Your menu vote was counted! 🗳️', 'success');
    return true;
  };

  // Warden: Rating-Window Override (FR-30, Section 8.6)
  const applyWardenOverride = ({ sessionId, minutesToAdd, reason, grantedBy = 'Warden / Mess Committee' }) => {
    if (!reason || reason.trim().length < 5) {
      showNotification('A mandatory reason is required for window override.', 'error');
      return false;
    }

    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          status: 'open',
          extendedByMins: s.extendedByMins + minutesToAdd,
          windowEnd: '16:30 (Extended)'
        };
      }
      return s;
    }));

    const newLog = {
      id: `ovr-${Date.now()}`,
      mealSessionId: sessionId,
      mealName: sessions.find(s => s.id === sessionId)?.mealName || 'Meal Session',
      grantedBy,
      actionType: `Window Extended (+${minutesToAdd} mins)`,
      details: `Extended rating window by ${minutesToAdd} minutes`,
      reason: reason.trim(),
      timestamp: new Date().toLocaleString('en-IN', { hour12: true })
    };

    setOverrideLogs(prev => [newLog, ...prev]);

    // Also add to audit logs
    setAuditLogs(prev => [{
      id: `aud-${Date.now()}`,
      actor: grantedBy,
      action: `Rating-Window Override (+${minutesToAdd}m)`,
      target: sessionId,
      reason: reason.trim(),
      timestamp: new Date().toLocaleTimeString('en-IN', { hour12: true })
    }, ...prev]);

    showNotification(`Rating window successfully extended by ${minutesToAdd} minutes. Override logged.`, 'success');
    return true;
  };

  // Manager: Update Issue Status and optionally publish to "You Said → We Did"
  const updateIssueStatus = (issueId, newStatus, actionTaken = '', publicSummary = '', publish = false) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        const isResolved = newStatus === 'Resolved';
        return {
          ...issue,
          status: newStatus,
          actionTaken: actionTaken || issue.actionTaken,
          publishedToFeed: publish || (isResolved && issue.publishedToFeed),
          publicSummary: publicSummary || issue.publicSummary,
          publishedDate: publish ? 'Today' : issue.publishedDate,
          impactMetric: isResolved && !issue.impactMetric ? {
            beforeRating: 2.8,
            afterRating: 4.3,
            improvement: '+1.5 Stars'
          } : issue.impactMetric
        };
      }
      return issue;
    }));

    showNotification(`Issue ${issueId} updated to "${newStatus}".`, 'success');
  };

  // Manager: Add Context Note to a Meal Session
  const addSessionContextNote = (sessionId, note) => {
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        return { ...s, contextNote: note };
      }
      return s;
    }));
    showNotification('Context note attached to meal session.', 'success');
  };

  // Manager: Create New Menu Poll
  const createMenuPoll = ({ title, targetDate, mealType, options, managerNote }) => {
    const newPoll = {
      id: `poll-${Date.now()}`,
      title,
      description: `Student preference poll for upcoming ${mealType} on ${targetDate}.`,
      targetDate,
      mealType,
      status: 'active',
      closingLabel: 'Open for 48 hours',
      totalVotes: 0,
      options: options.map((opt, index) => ({
        id: `opt-${index + 1}`,
        title: opt.title,
        tag: opt.tag || 'Chef Selection',
        votes: 0,
        percentage: 0
      })),
      managerNote: managerNote || 'Provider will review preference with pantry stock.'
    };

    setPolls(prev => [newPoll, ...prev]);
    showNotification('New meal poll created and published to students!', 'success');
  };

  // Manager: Update Menu Items & "Copy Last Week"
  const updateMenuDish = (dayIndex, mealType, newDishes) => {
    setWeeklyMenu(prev => {
      const updatedDays = [...prev.days];
      updatedDays[dayIndex].meals[mealType] = newDishes;
      return {
        ...prev,
        days: updatedDays
      };
    });
    showNotification('Menu updated successfully.', 'success');
  };

  const copyLastWeekMenu = () => {
    showNotification('Menu populated from previous week baseline.', 'success');
  };

  // Admin: Suspend or Review Anon ID
  const toggleAnonIdSuspension = (anonId, reason) => {
    setAuditLogs(prev => [{
      id: `aud-${Date.now()}`,
      actor: 'Platform Admin',
      action: 'Suspension Status Changed',
      target: anonId,
      reason: reason || 'Violation of hostel mess code of conduct',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour12: true })
    }, ...prev]);

    showNotification(`Status updated for student profile ${anonId}.`, 'success');
  };

  // Switch Student Identity (for demo testing multiple student personas)
  const switchStudentProfile = (student) => {
    setCurrentStudent(student);
    showNotification(`Switched active student to ${student.name} (${student.anonId})`, 'info');
  };

  // Reset Demo Data
  const resetDemoData = () => {
    localStorage.clear();
    setSessions(INITIAL_MEAL_SESSIONS);
    setFeedbacks(INITIAL_FEEDBACKS);
    setWeeklyMenu(INITIAL_MENU);
    setIssues(INITIAL_ISSUES);
    setPolls(INITIAL_POLLS);
    setVotedPolls({});
    setOverrideLogs(INITIAL_OVERRIDE_LOGS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setToggles(ROLLOUT_TOGGLES);
    setAiSummary(INITIAL_AI_SUMMARY);
    setCurrentStudent(REGISTERED_STUDENTS_MOCK[0]);
    showNotification('Demo data reset to factory initial state.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activeRole,
        setActiveRole,
        isMobileFrameView,
        setIsMobileFrameView,
        currentStudent,
        setCurrentStudent,
        switchStudentProfile,
        sessions,
        activeSession,
        feedbacks,
        weeklyMenu,
        issues,
        polls,
        votedPolls,
        overrideLogs,
        auditLogs,
        toggles,
        aiSummary,
        notification,
        showNotification,
        hasStudentRatedSession,
        submitFeedback,
        submitPollVote,
        applyWardenOverride,
        updateIssueStatus,
        addSessionContextNote,
        createMenuPoll,
        updateMenuDish,
        copyLastWeekMenu,
        toggleAnonIdSuspension,
        resetDemoData,
        registeredStudents: REGISTERED_STUDENTS_MOCK,
        reasonChips: REASON_CHIPS
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
