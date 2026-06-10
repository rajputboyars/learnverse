import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    conceptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Concept',
      required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, default: 'Learner' },
    body: { type: String, required: true, maxlength: 2000 },
    // null = top-level question/comment; otherwise a reply to that comment.
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
    voters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    votes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

CommentSchema.index({ conceptId: 1, createdAt: 1 });

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
