import mongoose from 'mongoose';

// One row per (user, provider). The key is stored as AES-256-GCM ciphertext
// (see src/lib/ai/crypto.js) and is never selected into any API response —
// only `keyHint` ("sk-…4f2a") ever reaches the browser.
const AIProviderConnectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    provider: { type: String, required: true }, // 'anthropic' | 'openai' | 'gemini' | …
    model: { type: String, default: '' },

    encryptedKey: { type: String, required: true, select: false },
    keyHint: { type: String, default: '' },

    enabled: { type: Boolean, default: true },
    isDefault: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ['untested', 'ok', 'failed'],
      default: 'untested',
    },
    lastTestedAt: { type: Date, default: null },
    lastError: { type: String, default: '' },
  },
  { timestamps: true }
);

AIProviderConnectionSchema.index({ userId: 1, provider: 1 }, { unique: true });

export default mongoose.models.AIProviderConnection ||
  mongoose.model('AIProviderConnection', AIProviderConnectionSchema);
