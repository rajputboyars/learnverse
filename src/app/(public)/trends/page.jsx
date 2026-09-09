'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import SourceBadge from '@/components/ai/SourceBadge';
import { Pill, TrendPill } from '@/components/ai/primitives';
import RankHistoryChart from '@/components/trends/RankHistoryChart';
import { EmptyState, ErrorState, SkeletonCard } from '@/components/ui/States';
import { useLang } from '@/components/LanguageProvider';


const SHELL = 'mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8';

const COMPARISONS = [
  { id: 'previous', hi: 'pichhle snapshot', en: 'Previous snapshot' },
  { id: '30', hi: '30+ din pehle', en: '30+ days ago' },
  { id: '90', hi: '90+ din pehle', en: '90+ days ago' },
];

export default function TrendsPage() {
  const { pick } = useLang();
  const [scope, setScope] = useState('');
  const [compare, setCompare] = useState('previous');
  const [state, setState] = useState({ loading: true, error: '', scopes: [], ranking: null });
  const [openSkill, setOpenSkill] = useState(null);

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: '' }));
    const params = new URLSearchParams({ compare });
    if (scope) params.set('scope', scope);
    fetch(`/api/trends?${params}`)
      .then((r) =>
        r.ok ? r.json() : Promise.reject(new Error(pick('Trend data load nahi ho paaya', 'Could not load trend data')))
      )
      .then((d) => setState({ loading: false, error: '', ...d }))
      .catch((e) => setState((s) => ({ ...s, loading: false, error: e.message })));
  }, [scope, compare, pick]);

  useEffect(() => {
    load();
  }, [load]);

  const { ranking } = state;

  return (
    <div className={`${SHELL} py-10`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{pick('Skill Trends', 'Skill Trends')}</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            {pick(
              'Samay ke saath record ki gayi rankings. Movement do aise snapshots ke beech naapa jaata hai jo sach mein capture hue the — jahan compare karne ko kuch nahi hai, wahan ye page andaaza lagane ki jagah saaf keh deta hai.',
              'Rankings recorded over time. Movement is measured between two snapshots that were actually captured — where there is nothing to compare against, this page says so instead of guessing.'
            )}
          </p>
        </div>
        <Link href="/ai" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
          <Icon name="sparkles" className="mr-1.5 h-3.5 w-3.5" />
          {pick('Apna analysis chalao', 'Run your own analysis')}
        </Link>
      </div>

      {state.loading ? (
        <div className="mt-8 space-y-4">
          <SkeletonCard lines={2} />
          <SkeletonCard lines={6} />
        </div>
      ) : state.error ? (
        <div className="mt-8"><ErrorState message={state.error} onRetry={load} /></div>
      ) : !ranking ? (
        <div className="mt-8">
          <EmptyState
            icon="chart-line"
            title={pick('Abhi koi snapshot record nahi hua', 'No snapshots recorded yet')}
            description={pick(
              'Trend history un snapshots se banti hai jo ek admin capture karta hai. Jab tak pehla publish nahi hota, dikhane ko sach mein kuch nahi hai — aur yahan ek ranking bana dena khaali page se bhi bura hota.',
              'Trend history is built from snapshots an admin captures. Until the first one is published there is genuinely nothing to show — and inventing a ranking here would be worse than an empty page.'
            )}
            action={
              <Link href="/ai" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                {pick('Trending-skills analysis chalao', 'Run a trending-skills analysis')}
              </Link>
            }
          />
        </div>
      ) : (
        <>
          {/* Controls */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {state.scopes.length > 1 && (
              <select
                value={ranking.scopeKey}
                onChange={(e) => setScope(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400"
              >
                {state.scopes.map((s) => (
                  <option key={s.scopeKey} value={s.scopeKey}>
                    {s.industry} · {s.location} · {s.experienceLevel}
                  </option>
                ))}
              </select>
            )}
            <div className="flex gap-1.5">
              {COMPARISONS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCompare(c.id)}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
                    compare === c.id
                      ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {pick(`${c.hi} se compare karo`, `Compare to ${c.en}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Provenance */}
          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4">
            <SourceBadge source={ranking.current.source} model={ranking.current.model} />
            <span className="text-sm text-slate-600">
              {pick('Capture hua', 'Captured')}{' '}
              {new Date(ranking.current.capturedAt).toLocaleDateString()}
            </span>
            <span className="text-slate-300">·</span>
            {ranking.comparedTo ? (
              <span className="text-sm text-slate-600">
                {pick('is snapshot se compare kiya gaya:', 'compared with the snapshot from')}{' '}
                {new Date(ranking.comparedTo.capturedAt).toLocaleDateString()} (
                {ranking.comparedTo.daysApart} {pick('din pehle', 'days earlier')})
              </span>
            ) : (
              <span className="text-sm text-amber-700">
                <Icon name="warning" className="mr-1 h-3 w-3" />
                {pick(
                  'Compare karne ke liye pehle ka koi snapshot nahi — abhi movement nahi dikha sakte',
                  'No earlier snapshot to compare against — movement cannot be shown yet'
                )}
              </span>
            )}
            {ranking.current.note && (
              <p className="w-full text-sm text-slate-500">{ranking.current.note}</p>
            )}
          </div>

          {/* Ranking */}
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[44rem] text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">{pick('Skill', 'Skill')}</th>
                  <th className="px-4 py-3">{pick('Demand', 'Demand')}</th>
                  <th className="px-4 py-3">{pick('Dishaa', 'Direction')}</th>
                  <th className="px-4 py-3">{pick('Pehle', 'Was')}</th>
                  <th className="px-4 py-3">{pick('Badlaav', 'Change')}</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ranking.skills.map((s) => (
                  <SkillRow
                    key={s.skillSlug}
                    skill={s}
                    scopeKey={ranking.scopeKey}
                    hasComparison={Boolean(ranking.comparedTo)}
                    open={openSkill === s.skillSlug}
                    onToggle={() => setOpenSkill(openSkill === s.skillSlug ? null : s.skillSlug)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {!!ranking.dropped.length && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="flex items-center gap-2 font-semibold">
                <Icon name="trend-down" className="h-4 w-4 text-red-500" />
                {pick('Ranking se bahar ho gaye', 'Fell out of the ranking')}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {pick(
                  'Pehle wale snapshot mein ranked the, is waale mein nahi hain.',
                  'Ranked in the earlier snapshot, absent from the current one.'
                )}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {ranking.dropped.map((d) => (
                  <Pill key={d.skillSlug}>
                    {d.skill}{' '}
                    <span className="opacity-60">
                      {pick('pehle #', 'was #')}
                      {d.previousRank}
                    </span>
                  </Pill>
                ))}
              </div>
            </div>
          )}

          <p className="mt-6 text-xs text-slate-400">
            {pick(
              'Jin rankings pe AI analysis likha hai wo ek model ka aakalan hain, koi naapa gaya job-market index nahi. Inhe yahan isliye record kiya jaata hai taaki samay ke saath inki movement imaandari se compare ho sake, isliye nahi ki ye aakhri sach hain.',
              'Rankings labelled AI analysis are a model’s assessment, not a measured job-market index. They are recorded here so their movement over time can be compared honestly, not because they are authoritative.'
            )}
          </p>
        </>
      )}
    </div>
  );
}

function SkillRow({ skill, scopeKey, hasComparison, open, onToggle }) {
  const { pick } = useLang();
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetched on expand, once — most visitors open one or two rows, not twenty.
  useEffect(() => {
    if (!open || history) return;
    setLoading(true);
    fetch(`/api/trends/history?scope=${encodeURIComponent(scopeKey)}&skill=${skill.skillSlug}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error())))
      .then((d) => setHistory(d.history))
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, [open, history, scopeKey, skill.skillSlug]);

  return (
    <>
      <tr className="align-top">
        <td className="px-4 py-3 font-semibold tabular-nums text-slate-400">{skill.rank}</td>
        <td className="px-4 py-3">
          <p className="font-semibold">
            {skill.skill}
            {skill.isNew && (
              <span className="ml-2 rounded-full border border-green-300 bg-green-50 px-2 py-0.5 text-xs font-medium text-green-800">
                {pick('naya', 'new')}
              </span>
            )}
          </p>
          {skill.whyNow && <p className="mt-0.5 max-w-md text-xs text-slate-500">{skill.whyNow}</p>}
        </td>
        <td className="px-4 py-3 capitalize">{skill.demand || '—'}</td>
        <td className="px-4 py-3"><TrendPill trend={skill.direction} /></td>
        <td className="px-4 py-3 tabular-nums text-slate-500">
          {skill.previousRank ?? <span className="text-slate-300">—</span>}
        </td>
        <td className="px-4 py-3">
          {!hasComparison ? (
            <span className="text-xs text-slate-400">
              {pick('abhi comparison nahi', 'no comparison yet')}
            </span>
          ) : skill.change === null ? (
            <span className="text-xs text-green-600">{pick('nayi entry', 'new entry')}</span>
          ) : skill.change === 0 ? (
            <span className="inline-flex items-center gap-1 text-slate-500">
              <Icon name="minus" className="h-3 w-3" />
              {pick('koi badlaav nahi', 'no change')}
            </span>
          ) : (
            <span className={`inline-flex items-center gap-1 font-medium ${skill.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <Icon name={skill.change > 0 ? 'trend-up' : 'trend-down'} className="h-3 w-3" />
              {skill.change > 0 ? '+' : ''}{skill.change}
            </span>
          )}
        </td>
        <td className="px-4 py-3 text-right">
          <button onClick={onToggle} className="text-xs font-medium text-indigo-600 hover:underline">
            {open ? pick('Chhupao', 'Hide') : pick('History', 'History')}
          </button>
        </td>
      </tr>

      {open && (
        <tr>
          <td colSpan={7} className="bg-slate-50/60 px-4 py-5">
            {loading ? (
              <p className="text-sm text-slate-500">
                <Icon name="spinner" spin className="mr-2 h-3.5 w-3.5" />
                {pick('History load ho rahi hai…', 'Loading history…')}
              </p>
            ) : !history?.length ? (
              <p className="text-sm text-slate-500">
                {pick(
                  'Is skill ki abhi koi record ki hui history nahi hai.',
                  'No recorded history for this skill yet.'
                )}
              </p>
            ) : (
              <div className="space-y-3">
                <RankHistoryChart history={history} />
                <p className="text-xs text-slate-400">
                  {pick(
                    `${history.length} record kiye hue snapshot${history.length > 1 ? 's' : ''}. Points sirf wahin plot hote hain jahan snapshot hai — beech ke gaps bhare nahi jaate.`,
                    `${history.length} recorded snapshot${history.length > 1 ? 's' : ''}. Points are only plotted where a snapshot exists — the gaps between them are not filled in.`
                  )}
                </p>
                {skill.claimedPreviousRank != null && (
                  <p className="text-xs text-slate-500">
                    <Icon name="robot" className="mr-1 h-3 w-3" />
                    {pick(
                      `Jis model ne latest snapshot banaya usne is skill ko pehle #${skill.claimedPreviousRank} pe rakha tha. Ye uska apna andaaza hai, is platform ka naapa hua nahi.`,
                      `The model that produced the latest snapshot put this skill at #${skill.claimedPreviousRank} previously. That is its own estimate, not something this platform measured.`
                    )}
                  </p>
                )}
                {!!skill.roles?.length && (
                  <p className="text-xs text-slate-500">
                    {pick('Aam roles:', 'Common roles:')} {skill.roles.join(' · ')}
                  </p>
                )}
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
}
