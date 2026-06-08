// Streak logic — Duolingo-style: did the user do *something* today?

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function daysBetween(a, b) {
  return Math.round((startOfDay(b) - startOfDay(a)) / 86400000);
}

/**
 * Mutates a UserStats document's streak fields based on activity "now".
 * Returns the (possibly unchanged) stats doc — caller saves it.
 */
export function applyStreak(stats, now = new Date()) {
  if (!stats.lastActiveDate) {
    stats.currentStreak = 1;
  } else {
    const gap = daysBetween(stats.lastActiveDate, now);
    if (gap === 0) {
      // already active today — streak unchanged
    } else if (gap === 1) {
      stats.currentStreak += 1; // consecutive day
    } else {
      stats.currentStreak = 1; // missed a day — reset
    }
  }

  stats.lastActiveDate = now;
  if (stats.currentStreak > stats.longestStreak) {
    stats.longestStreak = stats.currentStreak;
  }
  return stats;
}
