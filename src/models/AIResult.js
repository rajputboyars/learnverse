import mongoose from 'mongoose';

// Every AI run is recorded: it powers "recent results", follow-ups, sharing,
// and the admin usage analytics. The prompt is kept so a result can always be
// traced back to exactly what was asked.
const AIResultSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    templateId: { type: String, required: true }, // e.g. 'trending-skills'
    templateVersion: { type: String, default: '1.0' },
    title: { type: String, default: '' },
    category: { type: String, default: '' },

    inputs: { type: mongoose.Schema.Types.Mixed, default: {} },
    prompt: { type: String, default: '' },

    provider: { type: String, default: '' },
    model: { type: String, default: '' },

    // How much of this result is real: 'ai' = live model output,
    // 'demo' = sample data shipped with the template.
    source: { type: String, enum: ['ai', 'demo'], default: 'ai' },

    outputFormat: { type: String, enum: ['structured', 'text'], default: 'structured' },
    data: { type: mongoose.Schema.Types.Mixed, default: null }, // parsed JSON
    text: { type: String, default: '' }, // raw text (always kept)

    tokensIn: { type: Number, default: 0 },
    tokensOut: { type: Number, default: 0 },
    durationMs: { type: Number, default: 0 },

    saved: { type: Boolean, default: false },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'AIResult', default: null },
  },
  { timestamps: true }
);

AIResultSchema.index({ userId: 1, createdAt: -1 });
AIResultSchema.index({ userId: 1, saved: 1, createdAt: -1 });
AIResultSchema.index({ templateId: 1, createdAt: -1 });

export default mongoose.models.AIResult || mongoose.model('AIResult', AIResultSchema);
