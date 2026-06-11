import mongoose from 'mongoose';

// Spaced-repetition schedule per (user, concept). SM-2-lite.
const ReviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    conceptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Concept', required: true },
    dueAt: { type: Date, default: () => new Date() },
    intervalDays: { type: Number, default: 1 },
    ease: { type: Number, default: 2.5 },
    reps: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ReviewSchema.index({ userId: 1, conceptId: 1 }, { unique: true });
ReviewSchema.index({ userId: 1, dueAt: 1 });

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
