import { connectDB } from '@/lib/db';
import SkillTrend from '@/models/SkillTrend';
import TrendSnapshot from '@/models/TrendSnapshot';
import { slugify } from '@/lib/slug';

/**
 * Trend history, recorded rather than reconstructed.
 *
 * The rule this whole module exists to enforce: movement is only ever reported
 * when two real snapshots exist to compare. Where there is one snapshot, the
 * answer is "no earlier snapshot to compare against" — never a fabricated
 * previous rank, and never a model's guess dressed up as measurement.
 */

const DEMAND_SCORE = { 'very high': 95, high: 80, moderate: 55, medium: 55, low: 30 };

export function scopeKey({ industry, location, experienceLevel } = {}) {
  return [
    (industry || 'Web development').trim().toLowerCase(),
    (location || 'India').trim().toLowerCase(),
    (experienceLevel || 'All levels').trim().toLowerCase(),
  ].join('::');
}

/** Normalises one skill row out of a trending-skills result. */
function toEntry(skill, index) {
  const name = String(skill.name || skill.skill || '').trim();
  if (!name) return null;
  const demand = String(skill.demand || '').toLowerCase();
  return {
    skill: name,
    skillSlug: slugify(name),
    rank: Number(skill.rank) || index + 1,
    score: Number(skill.score) || DEMAND_SCORE[demand] || 0,
    demand: skill.demand || '',
    direction: skill.trend || skill.direction || '',
    claimedPreviousRank: Number.isFinite(Number(skill.previousRank))
      ? Number(skill.previousRank)
      : null,
    whyNow: skill.whyNow || '',
    roles: Array.isArray(skill.commonRoles) ? skill.commonRoles.slice(0, 6) : [],
    industries: Array.isArray(skill.hiringIndustries) ? skill.hiringIndustries.slice(0, 6) : [],
    difficulty: skill.difficulty || '',
  };
}

/**
 * Stores a ranking as a snapshot plus its skill rows.
 *
 * @param {{ scope, source, provider, model, resultId, note, capturedBy,
 *           capturedAt, published, skills: object[] }} input
 */
export async function createSnapshot(input) {
  await connectDB();

  const entries = (input.skills || []).map(toEntry).filter(Boolean);
  if (!entries.length) {
    const err = new Error('That result has no ranked skills to capture.');
    err.status = 400;
    throw err;
  }

  const key = scopeKey(input.scope);
  const snapshot = await TrendSnapshot.create({
    scope: {
      industry: input.scope?.industry || 'Web development',
      location: input.scope?.location || 'India',
      experienceLevel: input.scope?.experienceLevel || 'All levels',
    },
    scopeKey: key,
    capturedAt: input.capturedAt ? new Date(input.capturedAt) : new Date(),
    source: input.source || 'ai',
    provider: input.provider || '',
    model: input.model || '',
    resultId: input.resultId || null,
    note: input.note || '',
    capturedBy: input.capturedBy || null,
    entryCount: entries.length,
    published: Boolean(input.published),
  });

  await SkillTrend.insertMany(
    entries.map((e) => ({
      ...e,
      snapshotId: snapshot._id,
      scopeKey: key,
      capturedAt: snapshot.capturedAt,
      source: snapshot.source,
    }))
  );

  return snapshot;
}

export async function deleteSnapshot(id) {
  await connectDB();
  const removed = await TrendSnapshot.findByIdAndDelete(id);
  if (removed) await SkillTrend.deleteMany({ snapshotId: id });
  return Boolean(removed);
}

/** Published scopes that actually have data, for the scope picker. */
export async function listScopes() {
  await connectDB();
  const rows = await TrendSnapshot.aggregate([
    { $match: { published: true } },
    {
      $group: {
        _id: '$scopeKey',
        industry: { $last: '$scope.industry' },
        location: { $last: '$scope.location' },
        experienceLevel: { $last: '$scope.experienceLevel' },
        snapshots: { $sum: 1 },
        latest: { $max: '$capturedAt' },
      },
    },
    { $sort: { snapshots: -1, latest: -1 } },
  ]);
  return rows.map((r) => ({
    scopeKey: r._id,
    industry: r.industry,
    location: r.location,
    experienceLevel: r.experienceLevel,
    snapshots: r.snapshots,
    latest: r.latest,
  }));
}

/**
 * The current ranking for a scope, with movement measured against the most
 * recent earlier snapshot that is at least `minAgeDays` old.
 *
 * `comparedTo` is null when no such snapshot exists — the caller must then show
 * "no comparison available" rather than any kind of change indicator.
 */
export async function getRanking({ key, minAgeDays = 0 }) {
  await connectDB();

  const current = await TrendSnapshot.findOne({ scopeKey: key, published: true })
    .sort({ capturedAt: -1 })
    .lean();
  if (!current) return null;

  const cutoff = new Date(current.capturedAt.getTime() - minAgeDays * 24 * 60 * 60 * 1000);
  const previous = await TrendSnapshot.findOne({
    scopeKey: key,
    published: true,
    capturedAt: { $lt: cutoff },
  })
    .sort({ capturedAt: -1 })
    .lean();

  const [currentRows, previousRows] = await Promise.all([
    SkillTrend.find({ snapshotId: current._id }).sort({ rank: 1 }).lean(),
    previous ? SkillTrend.find({ snapshotId: previous._id }).lean() : [],
  ]);

  const previousBySlug = new Map(previousRows.map((r) => [r.skillSlug, r]));
  const currentSlugs = new Set(currentRows.map((r) => r.skillSlug));

  const skills = currentRows.map((r) => {
    const before = previousBySlug.get(r.skillSlug);
    return {
      skill: r.skill,
      skillSlug: r.skillSlug,
      rank: r.rank,
      score: r.score,
      demand: r.demand,
      direction: r.direction,
      whyNow: r.whyNow,
      roles: r.roles,
      industries: r.industries,
      difficulty: r.difficulty,
      // Measured against a stored snapshot. null when this skill was not in it.
      previousRank: before ? before.rank : null,
      change: before ? before.rank - r.rank : null,
      isNew: Boolean(previous) && !before,
      // The model's own estimate, kept clearly separate from the measurement.
      claimedPreviousRank: r.claimedPreviousRank,
    };
  });

  // Skills that were ranked before and have fallen out entirely.
  const dropped = previousRows
    .filter((r) => !currentSlugs.has(r.skillSlug))
    .sort((a, b) => a.rank - b.rank)
    .map((r) => ({ skill: r.skill, skillSlug: r.skillSlug, previousRank: r.rank }));

  return {
    scope: current.scope,
    scopeKey: key,
    current: {
      id: current._id.toString(),
      capturedAt: current.capturedAt,
      source: current.source,
      provider: current.provider,
      model: current.model,
      note: current.note,
    },
    comparedTo: previous
      ? {
          id: previous._id.toString(),
          capturedAt: previous.capturedAt,
          source: previous.source,
          daysApart: Math.max(
            1,
            Math.round((current.capturedAt - previous.capturedAt) / (24 * 60 * 60 * 1000))
          ),
        }
      : null,
    skills,
    dropped,
  };
}

/** Every recorded position of one skill in one scope, oldest first. */
export async function getSkillHistory({ key, skillSlug }) {
  await connectDB();
  const rows = await SkillTrend.find({ scopeKey: key, skillSlug })
    .sort({ capturedAt: 1 })
    .lean();

  return rows.map((r) => ({
    capturedAt: r.capturedAt,
    rank: r.rank,
    score: r.score,
    demand: r.demand,
    direction: r.direction,
    source: r.source,
  }));
}
