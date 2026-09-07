import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Prompt from '@/models/Prompt';
import PromptReport from '@/models/PromptReport';
import SavedPrompt from '@/models/SavedPrompt';
import PromptRating from '@/models/PromptRating';
import { requireAdmin } from '@/lib/guards';
import { notify } from '@/lib/notify';
import { statusFromReview, validatePrompt } from '@/lib/prompts/validate';

const EDITABLE = ['title', 'description', 'content', 'category', 'difficulty', 'tags', 'expectedResult'];

/**
 * Moderate one prompt.
 *
 * body.action:
 *   'verify'     → publish it
 *   'reject'     → keep it out, with a note the author can see
 *   'requeue'    → send back to the queue (undo a decision)
 *   'revalidate' → run the automated review again
 * Any of the EDITABLE fields can be sent alongside to fix a prompt before
 * publishing it — small corrections are usually better than a rejection.
 */
export async function PATCH(req, { params }) {
  const { session, error } = await requireAdmin();
  if (error) return error;
  const { id } = await params;

  const body = (await req.json().catch(() => ({}))) || {};
  await connectDB();

  const prompt = await Prompt.findById(id).catch(() => null);
  if (!prompt) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  for (const field of EDITABLE) {
    if (body[field] === undefined) continue;
    prompt[field] =
      field === 'tags'
        ? String(body.tags).split(',').map((t) => t.trim().toLowerCase()).filter(Boolean).slice(0, 8)
        : body[field];
  }

  const note = String(body.note || '').trim().slice(0, 600);

  switch (body.action) {
    case 'verify':
      prompt.status = 'verified';
      prompt.reviewNote = note;
      prompt.reviewedAt = new Date();
      prompt.reviewedBy = session.user.id;
      await notify(prompt.authorId, {
        actorId: session.user.id,
        actorName: 'Learnverse',
        type: 'system',
        message: `Your prompt “${prompt.title}” is now published in the library.`,
        link: `/prompts/${prompt.slug}`,
      });
      break;

    case 'reject':
      prompt.status = 'rejected';
      prompt.reviewNote = note || 'Did not meet the library guidelines.';
      prompt.reviewedAt = new Date();
      prompt.reviewedBy = session.user.id;
      await notify(prompt.authorId, {
        actorId: session.user.id,
        actorName: 'Learnverse',
        type: 'system',
        message: `Your prompt “${prompt.title}” was not published. ${prompt.reviewNote}`,
        link: `/prompts/${prompt.slug}`,
      });
      break;

    case 'requeue':
      prompt.status = prompt.aiReview?.verdict ? 'ai_reviewed' : 'pending';
      prompt.reviewNote = note;
      prompt.reviewedAt = null;
      prompt.reviewedBy = null;
      break;

    case 'revalidate': {
      try {
        const review = await validatePrompt(prompt);
        if (!review) {
          return NextResponse.json(
            { error: 'No server AI key is configured, so automated review cannot run.' },
            { status: 503 }
          );
        }
        prompt.aiReview = review;
        // Re-running the check never un-publishes something an admin approved.
        if (prompt.status !== 'verified') prompt.status = statusFromReview(review);
      } catch (err) {
        console.error('[admin/prompts/revalidate]', err);
        return NextResponse.json({ error: 'Automated review failed to run.' }, { status: 502 });
      }
      break;
    }

    default:
      // No action — this was an edit-only save.
      break;
  }

  await prompt.save();

  // Acting on a prompt closes the reports that were waiting on it.
  if (['verify', 'reject'].includes(body.action)) {
    await PromptReport.updateMany(
      { promptId: prompt._id, status: 'open' },
      { $set: { status: body.action === 'reject' ? 'resolved' : 'dismissed' } }
    );
    prompt.reportCount = 0;
    await prompt.save();
  }

  return NextResponse.json({
    prompt: {
      id: prompt._id.toString(),
      status: prompt.status,
      reviewNote: prompt.reviewNote,
      aiReview: prompt.aiReview,
      reportCount: prompt.reportCount,
    },
  });
}

// Hard delete, for spam that should not sit in the queue at all. The rows that
// point at it go too, so no orphaned saves or ratings are left behind.
export async function DELETE(_req, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await params;

  await connectDB();
  const removed = await Prompt.findByIdAndDelete(id).catch(() => null);
  if (!removed) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await Promise.all([
    PromptReport.deleteMany({ promptId: id }),
    SavedPrompt.deleteMany({ promptId: id }),
    PromptRating.deleteMany({ promptId: id }),
  ]);

  return NextResponse.json({ ok: true });
}
