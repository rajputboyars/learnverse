import mongoose from 'mongoose';

// Course-level async discussion board. A thread has parentId = null and a
// title; a reply has parentId = the thread id and an empty title.
const DiscussionSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, default: 'Learner' },
    title: { type: String, default: '', maxlength: 160 },
    body: { type: String, required: true, maxlength: 5000 },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Discussion', default: null },
    voters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    votes: { type: Number, default: 0 },
    replyCount: { type: Number, default: 0 }, // threads only
    lastActivityAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

DiscussionSchema.index({ courseId: 1, parentId: 1, lastActivityAt: -1 });
DiscussionSchema.index({ parentId: 1, createdAt: 1 });

export default mongoose.models.Discussion ||
  mongoose.model('Discussion', DiscussionSchema);
