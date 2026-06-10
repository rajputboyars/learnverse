import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    conceptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Concept', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  },
  { timestamps: true }
);

// One bookmark per user per concept.
BookmarkSchema.index({ userId: 1, conceptId: 1 }, { unique: true });

export default mongoose.models.Bookmark || mongoose.model('Bookmark', BookmarkSchema);
