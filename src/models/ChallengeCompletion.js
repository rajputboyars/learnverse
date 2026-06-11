import mongoose from 'mongoose';

const ChallengeCompletionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    slug: { type: String, required: true },
  },
  { timestamps: true }
);

ChallengeCompletionSchema.index({ userId: 1, slug: 1 }, { unique: true });

export default mongoose.models.ChallengeCompletion ||
  mongoose.model('ChallengeCompletion', ChallengeCompletionSchema);
