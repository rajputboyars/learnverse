import mongoose from 'mongoose';

// 1-to-1 with User but kept separate: fast-changing data (XP/streak update on
// every action) lives apart from the rarely-changed profile.
const UserStatsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    name: { type: String, default: '' }, // denormalised for the leaderboard
    image: { type: String, default: '' },

    totalXP: { type: Number, default: 0 },
    weeklyXP: { type: Number, default: 0 }, // reset every Monday
    level: { type: Number, default: 1 },

    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastActiveDate: { type: Date, default: null },

    conceptsCompleted: { type: Number, default: 0 },
  },
  { timestamps: true }
);

UserStatsSchema.index({ weeklyXP: -1 });
UserStatsSchema.index({ totalXP: -1 });

export default mongoose.models.UserStats ||
  mongoose.model('UserStats', UserStatsSchema);
