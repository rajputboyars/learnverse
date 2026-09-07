import mongoose from 'mongoose';

// A user flagging a prompt. Kept as its own collection (rather than a counter
// alone) so an admin can see who reported what and why before acting.
const PromptReportSchema = new mongoose.Schema(
  {
    promptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prompt', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reason: {
      type: String,
      enum: ['harmful', 'spam', 'misleading', 'low-quality', 'other'],
      default: 'other',
    },
    detail: { type: String, default: '' },
    status: { type: String, enum: ['open', 'resolved', 'dismissed'], default: 'open' },
  },
  { timestamps: true }
);

// One open report per user per prompt — repeat flags from one account add noise,
// not signal.
PromptReportSchema.index({ promptId: 1, userId: 1 }, { unique: true });
PromptReportSchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.PromptReport || mongoose.model('PromptReport', PromptReportSchema);
