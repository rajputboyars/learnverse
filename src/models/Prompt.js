import mongoose from 'mongoose';

// A prompt in the public library. Two origins share one shape:
//   origin 'official'  — curated, seeded with the app
//   origin 'community' — submitted by a user, and not public until reviewed
//
// The prompt body uses {{variable}} placeholders; the run form is generated
// from them, so a prompt needs no bespoke UI to become runnable.
const PromptSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    content: { type: String, required: true },

    category: {
      type: String,
      enum: [
        'learning',
        'programming',
        'career',
        'productivity',
        'research',
        'analysis',
        'social',
        'interview',
      ],
      default: 'learning',
      index: true,
    },
    tags: { type: [String], default: [] },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },

    // Provider ids the author has actually used this with ('any' when it is
    // provider-agnostic, which most good prompts are).
    providers: { type: [String], default: ['any'] },

    expectedResult: { type: String, default: '' },
    exampleOutput: { type: String, default: '' },

    origin: { type: String, enum: ['official', 'community'], default: 'community' },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    authorName: { type: String, default: 'Learnverse' },

    // pending → ai_reviewed → verified (public) | rejected
    // Only 'verified' prompts are visible in the public library.
    status: {
      type: String,
      enum: ['pending', 'ai_reviewed', 'verified', 'rejected'],
      default: 'pending',
      index: true,
    },
    reviewNote: { type: String, default: '' },
    reviewedAt: { type: Date, default: null },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

    usageCount: { type: Number, default: 0 },
    saveCount: { type: Number, default: 0 },
    reportCount: { type: Number, default: 0 },
    ratingSum: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Text search across the fields a learner would actually type into the box.
PromptSchema.index({ title: 'text', description: 'text', tags: 'text' });
PromptSchema.index({ status: 1, category: 1, usageCount: -1 });

PromptSchema.virtual('rating').get(function () {
  return this.ratingCount ? Number((this.ratingSum / this.ratingCount).toFixed(1)) : 0;
});

export default mongoose.models.Prompt || mongoose.model('Prompt', PromptSchema);
