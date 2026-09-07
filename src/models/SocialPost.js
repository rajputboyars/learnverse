import mongoose from 'mongoose';

// A generated post the user kept. Drafts are private: nothing here is published
// anywhere by Learnverse — the user copies the text and posts it themselves,
// on their own account, having read it first.
const SocialPostSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    platform: {
      type: String,
      enum: ['linkedin', 'instagram', 'x', 'reddit'],
      default: 'linkedin',
    },
    topic: { type: String, default: '' },
    tone: { type: String, default: '' },

    hook: { type: String, default: '' },
    // What the user will actually paste. Edited text is saved here, so a draft
    // reopens as the user left it rather than as the model wrote it.
    body: { type: String, default: '' },
    thread: { type: [String], default: [] },
    slides: { type: [{ title: String, body: String }], default: [] },
    hashtags: { type: [String], default: [] },
    notes: { type: String, default: '' },

    // Provenance: which run produced it, and whether that was a real model.
    resultId: { type: mongoose.Schema.Types.ObjectId, ref: 'AIResult', default: null },
    provider: { type: String, default: '' },
    model: { type: String, default: '' },
    source: { type: String, enum: ['ai', 'demo'], default: 'ai' },
    // True once the user has changed the text themselves.
    edited: { type: Boolean, default: false },
  },
  { timestamps: true }
);

SocialPostSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.models.SocialPost || mongoose.model('SocialPost', SocialPostSchema);
