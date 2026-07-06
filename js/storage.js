/* ==========================================================================
   storage.js
   localStorage-backed persistence, mirroring the desktop app's SQLite
   storage.py API. Everything lives under one JSON blob in localStorage.
   Data is per-browser, not synced across devices - see README for notes
   on classroom use.
   ========================================================================== */

const Storage = (() => {
  const DB_KEY = "ignore_the_bait_db_v1";

  function loadDb() {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
      return {
        nextUserId: 1,
        users: [],
        lessonProgress: [],   // {userId, lessonId, completedAt}
        quizAttempts: [],     // {userId, questionId, wasCorrect, answeredAt}
        vishingAttempts: [],  // {userId, scenarioId, outcome, completedAt}
      };
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error("Corrupt Ignore The Bait data, resetting.", e);
      return {
        nextUserId: 1,
        users: [],
        lessonProgress: [],
        quizAttempts: [],
        vishingAttempts: [],
      };
    }
  }

  function saveDb(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  }

  function getOrCreateUser(name) {
    name = name.trim();
    const db = loadDb();
    let user = db.users.find((u) => u.name.toLowerCase() === name.toLowerCase());
    if (user) return user;
    user = { id: db.nextUserId++, name, createdAt: new Date().toISOString() };
    db.users.push(user);
    saveDb(db);
    return user;
  }

  function listUsers() {
    const db = loadDb();
    return [...db.users].sort((a, b) => a.name.localeCompare(b.name));
  }

  function markLessonComplete(userId, lessonId) {
    const db = loadDb();
    const exists = db.lessonProgress.some(
      (p) => p.userId === userId && p.lessonId === lessonId
    );
    if (!exists) {
      db.lessonProgress.push({ userId, lessonId, completedAt: new Date().toISOString() });
      saveDb(db);
    }
  }

  function getCompletedLessons(userId) {
    const db = loadDb();
    return new Set(
      db.lessonProgress.filter((p) => p.userId === userId).map((p) => p.lessonId)
    );
  }

  function recordQuizAttempt(userId, questionId, wasCorrect) {
    const db = loadDb();
    db.quizAttempts.push({
      userId,
      questionId,
      wasCorrect: !!wasCorrect,
      answeredAt: new Date().toISOString(),
    });
    saveDb(db);
  }

  function getUserStats(userId) {
    const db = loadDb();
    const attempts = db.quizAttempts.filter((a) => a.userId === userId);
    const total = attempts.length;
    const correct = attempts.filter((a) => a.wasCorrect).length;
    const accuracy = total > 0 ? (correct / total) * 100 : 0;
    return { total, correct, accuracy };
  }

  function recordVishingAttempt(userId, scenarioId, outcome) {
    const db = loadDb();
    db.vishingAttempts.push({
      userId,
      scenarioId,
      outcome,
      completedAt: new Date().toISOString(),
    });
    saveDb(db);
  }

  function getVishingHistory(userId) {
    const db = loadDb();
    // Attempts are always appended in chronological order, so reversing
    // gives most-recent-first without relying on Date-string comparisons,
    // which can tie when two attempts land in the same millisecond.
    return db.vishingAttempts
      .filter((a) => a.userId === userId)
      .slice()
      .reverse();
  }

  function getVishingStats(userId) {
    const history = getVishingHistory(userId);
    const counts = { safe: 0, partial: 0, compromised: 0 };
    history.forEach((h) => {
      if (counts[h.outcome] !== undefined) counts[h.outcome]++;
    });
    const total = history.length;
    return { total, ...counts };
  }

  function getLeaderboard() {
    const db = loadDb();
    return db.users
      .map((u) => {
        const attempts = db.quizAttempts.filter((a) => a.userId === u.id);
        const total = attempts.length;
        const correct = attempts.filter((a) => a.wasCorrect).length;
        const accuracy = total > 0 ? (correct / total) * 100 : 0;
        return { userId: u.id, name: u.name, total, correct, accuracy };
      })
      .sort((a, b) => (b.accuracy - a.accuracy) || (b.total - a.total));
  }

  function exportLeaderboardCSV() {
    const rows = getLeaderboard();
    const header = "Name,Questions Answered,Correct,Accuracy %\n";
    const body = rows
      .map((r) => `${r.name},${r.total},${r.correct},${r.accuracy.toFixed(1)}`)
      .join("\n");
    return header + body + "\n";
  }

  function resetAll() {
    localStorage.removeItem(DB_KEY);
  }

  return {
    getOrCreateUser,
    listUsers,
    markLessonComplete,
    getCompletedLessons,
    recordQuizAttempt,
    getUserStats,
    recordVishingAttempt,
    getVishingHistory,
    getVishingStats,
    getLeaderboard,
    exportLeaderboardCSV,
    resetAll,
  };
})();
