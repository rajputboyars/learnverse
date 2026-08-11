import mongoose from 'mongoose';

const InterviewQuestionSchema = new mongoose.Schema(
  {
    conceptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Concept' },
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },

    question: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    answer: {
      english: { type: String, default: '' },
      hinglish: { type: String, default: '' },
    },

    // Short runnable snippet shown under the answer.
    codeExample: {
      code: { type: String, default: '' },
      output: { type: String, default: '' },
      language: { type: String, default: 'javascript' },
    },

    // Key of an animated explainer component (call-stack, event-loop,
    // hoisting, closure, prototype-chain, promise-states, this-binding,
    // coercion, …). Empty means the question has no animation.
    visual: { type: String, default: '' },

    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    frequency: { type: String, enum: ['common', 'rare'], default: 'common' },
    companyTags: [{ type: String }],
    tags: [{ type: String }],

    aiGenerated: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'published'],
      default: 'published',
    },
  },
  { timestamps: true }
);

InterviewQuestionSchema.index({ courseId: 1 });
InterviewQuestionSchema.index({ status: 1 });

export default mongoose.models.InterviewQuestion ||
  mongoose.model('InterviewQuestion', InterviewQuestionSchema);
