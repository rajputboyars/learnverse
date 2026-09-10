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
    // String (legacy, Hinglish) or { english, hinglish }. See lib/content.js.
    description: { type: mongoose.Schema.Types.Mixed, default: '' },
    level: {
      type: String,
      // 'project' is a capstone band after advanced (used by the Jahia path).
      enum: ['beginner', 'intermediate', 'advanced', 'project'],
      default: 'beginner',
    },
    // Roadmap metadata. Both optional; courses without them render as before.
    stage: { type: Number },
    estimatedMinutes: { type: Number },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  { timestamps: true }
);

TopicSchema.index({ courseId: 1, order: 1 });
TopicSchema.index({ courseId: 1, slug: 1 }, { unique: true });

export default mongoose.models.Topic || mongoose.model('Topic', TopicSchema);
