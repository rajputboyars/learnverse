import mongoose from 'mongoose';

// One skill's position within one snapshot. Flat rather than embedded in the
// snapshot so a single skill's history across snapshots is one indexed query.
const SkillTrendSchema = new mongoose.Schema(
  {
    snapshotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TrendSnapshot',
      required: true,
    },
    scopeKey: { type: String, required: true },
    capturedAt: { type: Date, required: true },
    source: { type: String, enum: ['ai', 'manual', 'live', 'demo'], default: 'ai' },

    skill: { type: String, required: true, trim: true },
    skillSlug: { type: String, required: true },
    category: { type: String, default: '' },

    rank: { type: Number, required: true },
    score: { type: Number, default: 0 }, // 0-100 demand score, when given
    demand: { type: String, default: '' }, // very high | high | moderate | low
    direction: { type: String, default: '' }, // growing | stable | declining

    // The model's own guess at where this skill stood previously. Kept separate
    // from measured movement between two stored snapshots, and labelled as an
    // estimate wherever it is shown — the two must never be confused.
    claimedPreviousRank: { type: Number, default: null },

    whyNow: { type: String, default: '' },
    roles: { type: [String], default: [] },
    industries: { type: [String], default: [] },
    difficulty: { type: String, default: '' },
  },
  { timestamps: true }
);

SkillTrendSchema.index({ snapshotId: 1, rank: 1 });
SkillTrendSchema.index({ scopeKey: 1, skillSlug: 1, capturedAt: -1 });

export default mongoose.models.SkillTrend || mongoose.model('SkillTrend', SkillTrendSchema);
