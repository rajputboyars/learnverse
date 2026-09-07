import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import AIResult from '@/models/AIResult';
import TrendSnapshot from '@/models/TrendSnapshot';
import { requireAdmin } from '@/lib/guards';
import { createSnapshot } from '@/lib/trends/snapshots';

/**
 * Snapshot management.
 *
 * Capture is admin-only on purpose: /trends is presented as the platform's own
 * recorded history, so it cannot be open to anyone who runs an analysis. A
 * learner's own runs stay in their personal results.
 */
export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  await connectDB();

  const [snapshots, capturable] = await Promise.all([
    TrendSnapshot.find().sort({ capturedAt: -1 }).limit(100).lean(),
    // Trending-skills results that have not been captured yet — the raw
    // material for a new snapshot.
    AIResult.find({ templateId: 'trending-skills' })
      .sort({ createdAt: -1 })
      .limit(25)
      .select('inputs provider model source data createdAt')
      .lean(),
  ]);

  const usedResultIds = new Set(
    snapshots.filter((s) => s.resultId).map((s) => s.resultId.toString())
  );

  return NextResponse.json({
    snapshots: snapshots.map((s) => ({
      id: s._id.toString(),
      scope: s.scope,
      scopeKey: s.scopeKey,
      capturedAt: s.capturedAt,
      source: s.source,
      provider: s.provider,
      model: s.model,
      note: s.note,
      entryCount: s.entryCount,
      published: s.published,
    })),
    capturable: capturable
      .filter((r) => !usedResultIds.has(r._id.toString()) && Array.isArray(r.data?.skills))
      .map((r) => ({
        id: r._id.toString(),
        inputs: r.inputs,
        provider: r.provider,
        model: r.model,
        source: r.source,
        skillCount: r.data.skills.length,
        topSkills: r.data.skills.slice(0, 3).map((s) => s.name),
        createdAt: r.createdAt,
      })),
  });
}

// Capture a snapshot from an AI result, or from skills typed in by hand.
export async function POST(req) {
  const { session, error } = await requireAdmin();
  if (error) return error;

  const body = (await req.json().catch(() => ({}))) || {};
  await connectDB();

  try {
    let payload;

    if (body.resultId) {
      const result = await AIResult.findById(body.resultId).lean().catch(() => null);
      if (!result) return NextResponse.json({ error: 'Result not found' }, { status: 404 });
      if (!Array.isArray(result.data?.skills)) {
        return NextResponse.json(
          { error: 'That result does not contain a skill ranking.' },
          { status: 400 }
        );
      }
      payload = {
        scope: {
          industry: result.inputs?.industry,
          location: result.inputs?.location,
          experienceLevel: result.inputs?.experienceLevel,
        },
        // A demo-mode result stays labelled demo for as long as it exists —
        // capturing it does not launder sample data into real trend data.
        source: result.source === 'demo' ? 'demo' : 'ai',
        provider: result.provider,
        model: result.model,
        resultId: result._id,
        skills: result.data.skills,
        // Snapshots record when the ranking was produced, not when an admin got
        // round to filing it.
        capturedAt: result.createdAt,
      };
    } else {
      if (!Array.isArray(body.skills) || !body.skills.length) {
        return NextResponse.json({ error: 'Provide a resultId or a list of skills' }, { status: 400 });
      }
      payload = {
        scope: body.scope || {},
        source: ['manual', 'live', 'demo'].includes(body.source) ? body.source : 'manual',
        skills: body.skills,
        capturedAt: body.capturedAt,
      };
    }

    const snapshot = await createSnapshot({
      ...payload,
      note: String(body.note || '').slice(0, 400),
      capturedBy: session.user.id,
      published: body.published !== false,
    });

    return NextResponse.json(
      { snapshot: { id: snapshot._id.toString(), entryCount: snapshot.entryCount } },
      { status: 201 }
    );
  } catch (err) {
    const status = err?.status || 500;
    if (status === 500) console.error('[admin/trends]', err);
    return NextResponse.json(
      { error: status === 500 ? 'Could not capture that snapshot.' : err.message },
      { status }
    );
  }
}
