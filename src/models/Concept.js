import mongoose from 'mongoose';

// Embedded quiz question — small, always loaded with the concept.
const QuizQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctIndex: { type: Number, required: true },
    explanation: { type: String, default: '' },
  },
  { _id: false }
);

const ConceptSchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
    },
    // Denormalised for fast "all concepts of a course" queries (MongoDB pattern).
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    // Bilingual content — the platform's USP.
    explanation: {
      english: { type: String, default: '' },
      hinglish: { type: String, default: '' },
    },
    dailyLifeExample: { type: String, default: '' }, // the desi analogy
    codeExample: { type: String, default: '' },
    codeLanguage: { type: String, default: 'javascript' },
    keyPoints: [{ type: String }],

    quiz: { type: [QuizQuestionSchema], default: [] },

    tags: [{ type: String }],
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'easy',
    },
    order: { type: Number, default: 0 },
    xpReward: { type: Number, default: 10 },

    status: {
      type: String,
      enum: ['draft', 'pending', 'published'],
      default: 'draft',
    },
    aiGenerated: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

ConceptSchema.index({ courseId: 1, order: 1 });
ConceptSchema.index({ topicId: 1, order: 1 });
ConceptSchema.index({ status: 1 });

export default mongoose.models.Concept || mongoose.model('Concept', ConceptSchema);
