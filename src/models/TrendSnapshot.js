import mongoose from 'mongoose';

/**
 * One captured ranking, at one moment, for one scope.
 *
 * History on this platform is *recorded*, never reconstructed: a snapshot exists
 * only because someone captured it on a given day. Rank movement is measured by
 * comparing two real snapshots — if there is only one, the UI says there is
 * nothing to compare against rather than inventing a previous position.
 */
const TrendSnapshotSchema = new mongoose.Schema(
  {
    // What this ranking is *of*. Snapshots are only comparable within one scope.
    scope: {
      industry: { type: String, default: 'Web development', trim: true },
      location: { type: String, default: 'India', trim: true },
      experienceLevel: { type: String, default: 'All levels', trim: true },
    },
    // Denormalised join of the three, so snapshots in a series are one query.
    scopeKey: { type: String, required: true, index: true },

    capturedAt: { type: Date, required: true, default: Date.now },

    // Where the numbers came from. This is displayed, not just stored.
    //   'ai'     — a model's assessment, captured from an AI result
    //   'manual' — typed in by an admin from their own research
    //   'live'   — pulled from a real data feed (no such feed yet)
    //   'demo'   — sample data, for showing the feature with an empty database
    source: { type: String, enum: ['ai', 'manual', 'live', 'demo'], default: 'ai' },
    provider: { type: String, default: '' },
    model: { type: String, default: '' },
    // The AIResult this was captured from, when it came from one.
    resultId: { type: mongoose.Schema.Types.ObjectId, ref: 'AIResult', default: null },

    note: { type: String, default: '' },
    capturedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    entryCount: { type: Number, default: 0 },

    // Snapshots are only visible on /trends once an admin publishes them.
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

TrendSnapshotSchema.index({ scopeKey: 1, capturedAt: -1 });
TrendSnapshotSchema.index({ published: 1, capturedAt: -1 });

export default mongoose.models.TrendSnapshot ||
  mongoose.model('TrendSnapshot', TrendSnapshotSchema);
