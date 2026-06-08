import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    icon: { type: String, default: '📘' },
    tags: [{ type: String }],
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    language: { type: [String], default: ['english', 'hinglish'] },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

CourseSchema.index({ status: 1, order: 1 });

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
