import mongoose from 'mongoose';

// One resume per user. Sections are embedded arrays so the whole resume loads
// in a single query and prints from one document.
const ExperienceSchema = new mongoose.Schema(
  {
    company: { type: String, default: '' },
    role: { type: String, default: '' },
    start: { type: String, default: '' }, // free text e.g. "Jan 2023"
    end: { type: String, default: '' }, // free text e.g. "Present"
    description: { type: String, default: '' },
  },
  { _id: false }
);

const EducationSchema = new mongoose.Schema(
  {
    school: { type: String, default: '' },
    degree: { type: String, default: '' },
    start: { type: String, default: '' },
    end: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: false }
);

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    link: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: false }
);

const CertificationSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    issuer: { type: String, default: '' },
    year: { type: String, default: '' },
  },
  { _id: false }
);

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    // Header / contact
    fullName: { type: String, default: '' },
    headline: { type: String, default: '' }, // e.g. "Full-Stack Developer"
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },

    summary: { type: String, default: '' },
    skills: { type: [String], default: [] },

    experience: { type: [ExperienceSchema], default: [] },
    education: { type: [EducationSchema], default: [] },
    projects: { type: [ProjectSchema], default: [] },
    certifications: { type: [CertificationSchema], default: [] },

    theme: { type: String, enum: ['indigo', 'slate', 'emerald'], default: 'indigo' },
  },
  { timestamps: true }
);

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
