import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import LearningSession from '@/models/LearningSession';
import { requireUser } from '@/lib/guards';

// A heartbeat extends the open session by at most this much, whatever the
// client claims — the cap is what keeps an idle tab from inflating the total.
const MAX_INCREMENT_SECONDS = 90;
// A gap longer than this means they went away; the next beat starts a new
// session rather than joining the two across the absence.
const SESSION_GAP_MS = 5 * 60 * 1000;

/**
 * POST /api/me/session
 * { kind, conceptId, courseId, seconds, localDate, localHour, localWeekday }
 *
 * Called every 60s by the reader while a learning page is open and visible.
 * Silent for signed-out visitors — time tracking is a feature of having an
 * account, not a reason to reject a request.
 */
export async function POST(req) {
  const { session, error } = await requireUser();
  if (error) return error;

  const body = (await req.json().catch(() => ({}))) || {};
  // An explicit 0 means "nothing to record" and must stay 0 — only a missing or
  // unparseable value falls back to one beat's worth.
  const claimed = Number.isFinite(Number(body.seconds)) ? Number(body.seconds) : 60;
  const increment = Math.min(Math.max(claimed, 0), MAX_INCREMENT_SECONDS);
  if (increment <= 0) return NextResponse.json({ ok: true, seconds: 0 });

  await connectDB();
  const userId = session.user.id;
  const now = new Date();

  const open = await LearningSession.findOne({ userId }).sort({ lastBeatAt: -1 });

  if (open && now - open.lastBeatAt < SESSION_GAP_MS) {
    open.seconds += increment;
    open.lastBeatAt = now;
    await open.save();
    return NextResponse.json({ ok: true, sessionId: open._id.toString(), seconds: open.seconds });
  }

  const created = await LearningSession.create({
    userId,
    startedAt: now,
    lastBeatAt: now,
    seconds: increment,
    kind: ['concept', 'challenge', 'interview', 'practice', 'other'].includes(body.kind)
      ? body.kind
      : 'other',
    conceptId: body.conceptId || null,
    courseId: body.courseId || null,
    // The browser reports its own local day and hour; the server has no way to
    // know the reader's timezone.
    localDate: /^\d{4}-\d{2}-\d{2}$/.test(body.localDate) ? body.localDate : '',
    localHour: Number.isInteger(body.localHour) ? body.localHour : null,
    localWeekday: Number.isInteger(body.localWeekday) ? body.localWeekday : null,
  });

  return NextResponse.json({ ok: true, sessionId: created._id.toString(), seconds: created.seconds });
}
