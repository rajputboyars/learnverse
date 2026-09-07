import mongoose from 'mongoose';

const SavedPromptSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    promptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prompt', required: true },
  },
  { timestamps: true }
);

SavedPromptSchema.index({ userId: 1, promptId: 1 }, { unique: true });
SavedPromptSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.models.SavedPrompt || mongoose.model('SavedPrompt', SavedPromptSchema);
