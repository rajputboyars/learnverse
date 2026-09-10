import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    // String (legacy, Hinglish) or { english, hinglish }. See lib/content.js.
    description: { type: mongoose.Schema.Types.Mixed, default: '' },
    thumbnail: { type: String, default: '' },
    icon: { type: String, default: 'book' },
    tags: [{ type: String }],
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    language: { type: [String], default: ['english', 'hinglish'] },
    category: {
      type: String,
      enum: ['programming', 'english'],
      default: 'programming',
    },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    // Optional stricter certificate rules, e.g. { requireQuizzes: true, title,
    // subtitle, note }. Absent: certificate on every concept read (the default).
    certification: { type: mongoose.Schema.Types.Mixed, default: undefined },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

CourseSchema.index({ status: 1, order: 1 });

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
