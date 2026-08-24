// Badge catalog. Each badge is earned when test(metrics) is true.
// metrics: { totalXP, longestStreak, conceptsCompleted, quizzesPassed, bookmarks, completedCourses }

export const BADGES = [
  { id: 'first-steps', name: 'First Steps', icon: 'seedling', desc: 'Complete your first concept', test: (m) => m.conceptsCompleted >= 1 },
  { id: 'quiz-whiz', name: 'Quiz Whiz', icon: 'brain', desc: 'Pass your first quiz', test: (m) => m.quizzesPassed >= 1 },
  { id: 'curator', name: 'Curator', icon: 'bookmark', desc: 'Bookmark a concept', test: (m) => m.bookmarks >= 1 },
  { id: 'century', name: 'Century', icon: 'bolt', desc: 'Earn 100 XP', test: (m) => m.totalXP >= 100 },
  { id: 'streak-3', name: 'Getting Consistent', icon: 'fire', desc: '3-day streak', test: (m) => m.longestStreak >= 3 },
  { id: 'curious-mind', name: 'Curious Mind', icon: 'book-open', desc: 'Complete 10 concepts', test: (m) => m.conceptsCompleted >= 10 },
  { id: 'week-warrior', name: 'Week Warrior', icon: 'calendar', desc: '7-day streak', test: (m) => m.longestStreak >= 7 },
  { id: 'high-achiever', name: 'High Achiever', icon: 'rocket', desc: 'Earn 500 XP', test: (m) => m.totalXP >= 500 },
  { id: 'course-champion', name: 'Course Champion', icon: 'graduation', desc: 'Complete a full course', test: (m) => m.completedCourses >= 1 },
  { id: 'knowledge-seeker', name: 'Knowledge Seeker', icon: 'trophy', desc: 'Complete 50 concepts', test: (m) => m.conceptsCompleted >= 50 },
  { id: 'unstoppable', name: 'Unstoppable', icon: 'gem', desc: '30-day streak', test: (m) => m.longestStreak >= 30 },
  { id: 'xp-master', name: 'XP Master', icon: 'crown', desc: 'Earn 1000 XP', test: (m) => m.totalXP >= 1000 },
];

export function evaluateBadges(metrics) {
  return BADGES.map((b) => ({
    id: b.id,
    name: b.name,
    icon: b.icon,
    desc: b.desc,
    earned: !!b.test(metrics),
  }));
}
