import mongoose from 'mongoose';

// Issued once per (user, course) the moment a completed course is first
// viewed — certId is generated then and never changes, so it stays valid
// for the public /certificate/verify lookup forever after.
const CertificateSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    certId: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    courseTitle: { type: String, required: true },
    courseSlug: { type: String, required: true },
    courseIcon: { type: String, default: '📘' },
    totalConcepts: { type: Number, default: 0 },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

CertificateSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);
