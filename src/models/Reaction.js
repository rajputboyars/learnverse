import mongoose from 'mongoose';

// One reaction per user per concept (they can change it).
const ReactionSchema = new mongoose.Schema(
  {
    conceptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Concept', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['helpful', 'understood', 'fire'], required: true },
  },
  { timestamps: true }
);

ReactionSchema.index({ conceptId: 1, userId: 1 }, { unique: true });
ReactionSchema.index({ conceptId: 1, type: 1 });

export default mongoose.models.Reaction || mongoose.model('Reaction', ReactionSchema);
