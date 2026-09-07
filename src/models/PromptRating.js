import mongoose from 'mongoose';

// One rating per user per prompt. The running totals live on the Prompt so the
// library can sort by rating without a join; this collection is what makes a
// changed rating correctable rather than double-counted.
const PromptRatingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    promptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prompt', required: true },
    value: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

PromptRatingSchema.index({ userId: 1, promptId: 1 }, { unique: true });

export default mongoose.models.PromptRating || mongoose.model('PromptRating', PromptRatingSchema);
