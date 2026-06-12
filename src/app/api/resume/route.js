import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Resume from '@/models/Resume';
import { requireUser } from '@/lib/guards';

// Whitelist of fields a user may write — never trust the raw body.
const FIELDS = [
  'fullName', 'headline', 'email', 'phone', 'location',
  'website', 'github', 'linkedin', 'summary', 'skills',
  'experience', 'education', 'projects', 'certifications', 'theme',
];

// GET /api/resume → the current user's resume (null if not created yet)
export async function GET() {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();
  const resume = await Resume.findOne({ userId: session.user.id }).lean();
  return NextResponse.json({ resume: resume || null });
}

// PUT /api/resume  { ...fields }  → upsert the current user's resume
export async function PUT(request) {
  const { session, error } = await requireUser();
  if (error) return error;
  await connectDB();

  const body = await request.json().catch(() => ({}));
  const update = {};
  for (const key of FIELDS) {
    if (key in body) update[key] = body[key];
  }

  const resume = await Resume.findOneAndUpdate(
    { userId: session.user.id },
    { $set: update, $setOnInsert: { userId: session.user.id } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).lean();

  return NextResponse.json({ resume });
}
