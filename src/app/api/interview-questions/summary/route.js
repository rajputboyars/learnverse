import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import InterviewQuestion from '@/models/InterviewQuestion';
import Course from '@/models/Course';

const PUBLISHED = { status: { $in: ['approved', 'published'] } };

// GET /api/interview-questions/summary
// Counts for the header's Interview dropdown: how many questions sit at each
// level, and which courses actually carry the most. Small enough to fetch once
// when the panel is first opened, instead of shipping 45 course tiles.
export async function GET() {
  try {
    await connectDB();

    const [byLevel, byCourse, courses] = await Promise.all([
      InterviewQuestion.aggregate([{ $match: PUBLISHED }, { $group: { _id: '$difficulty', n: { $sum: 1 } } }]),
      InterviewQuestion.aggregate([
        { $match: PUBLISHED },
        { $group: { _id: '$courseId', n: { $sum: 1 } } },
        { $sort: { n: -1 } },
        { $limit: 9 },
      ]),
      Course.find({ status: 'published' }).select('title slug icon').lean(),
    ]);

    const byId = {};
    for (const c of courses) byId[c._id.toString()] = c;

    return NextResponse.json({
      levels: {
        easy: byLevel.find((r) => r._id === 'easy')?.n || 0,
        medium: byLevel.find((r) => r._id === 'medium')?.n || 0,
        hard: byLevel.find((r) => r._id === 'hard')?.n || 0,
      },
      topCourses: byCourse
        .map((r) => {
          const c = byId[r._id?.toString()];
          return c ? { title: c.title, slug: c.slug, icon: c.icon, n: r.n } : null;
        })
        .filter(Boolean),
      courseCount: courses.length,
    });
  } catch (err) {
    console.error('GET /api/interview-questions/summary failed:', err);
    return NextResponse.json({ error: 'Summary temporarily unavailable' }, { status: 503 });
  }
}
