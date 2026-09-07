import mongoose from 'mongoose';

/**
 * Time actually spent on a page, in bounded increments.
 *
 * "Learning hours" cannot be derived from the progress records the platform
 * already had — those only say *that* a concept was completed, never for how
 * long. Rather than estimate a number and present it as measured, time is
 * recorded from now on: the reader sends a heartbeat while a page is open and
 * visible, and each one extends the open session by a capped amount.
 *
 * Because tracking starts the day this shipped, the analytics page states the
 * date it began instead of implying it covers a user's whole history.
 */
const LearningSessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    startedAt: { type: Date, required: true },
    lastBeatAt: { type: Date, required: true },
    // Sum of capped increments — never end-minus-start, so a tab left open all
    // night cannot turn into eight hours of study.
    seconds: { type: Number, default: 0 },

    kind: {
      type: String,
      enum: ['concept', 'challenge', 'interview', 'practice', 'other'],
      default: 'concept',
    },
    conceptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Concept', default: null },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', default: null },

    // Local day and hour at the moment the session started, as reported by the
    // browser. Stored because "most productive time" in UTC is meaningless to
    // someone in IST, and the server cannot know their offset.
    localDate: { type: String, default: '' }, // YYYY-MM-DD
    localHour: { type: Number, default: null }, // 0-23
    localWeekday: { type: Number, default: null }, // 0 = Sunday
  },
  { timestamps: true }
);

LearningSessionSchema.index({ userId: 1, lastBeatAt: -1 });
LearningSessionSchema.index({ userId: 1, localDate: 1 });

export default mongoose.models.LearningSession ||
  mongoose.model('LearningSession', LearningSessionSchema);
