import mongoose from 'mongoose';

// The single bridge between content and user data.
const UserProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    conceptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Concept',
      required: true,
    },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },

    read: { type: Boolean, default: false },
    quizPassed: { type: Boolean, default: false },
    xpEarned: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Compound unique — one progress doc per user per concept.
UserProgressSchema.index({ userId: 1, conceptId: 1 }, { unique: true });
UserProgressSchema.index({ userId: 1, courseId: 1 });

export default mongoose.models.UserProgress ||
  mongoose.model('UserProgress', UserProgressSchema);
