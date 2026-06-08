import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, default: '' },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  { timestamps: true }
);

TopicSchema.index({ courseId: 1, order: 1 });
TopicSchema.index({ courseId: 1, slug: 1 }, { unique: true });

export default mongoose.models.Topic || mongoose.model('Topic', TopicSchema);
