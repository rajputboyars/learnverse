'use client';

import Link from 'next/link';
import Icon from '../Icon';
import { useLang } from '../LanguageProvider';

export function formatMinutes(min) {
  if (!min) return '';
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (!h) return `${m} min`;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

/**
 * The course roadmap — every module as a stage, grouped into bands
 * (Prerequisites … Interview Prep, or a course's own), each marked
 * ✓ completed, ● current or ○ upcoming, with time, lesson and project counts.
 *
 * @param stages [{ id, stage, title, band, estimatedMinutes, concepts, done, total }]
 * @param bands  [{ key, label, tone }] in display order
 */
export default function CourseRoadmap({ stages, bands, tracking, title }) {
  const { pick } = useLang();
  const currentId = tracking ? stages.find((s) => s.done < s.total)?.id : null;
  const used = bands.filter((b) => stages.some((s) => s.band === b.key));
  const orphan = stages.filter((s) => !bands.some((b) => b.key === s.band));
  const groups = [...used.map((b) => ({ ...b, list: stages.filter((s) => s.band === b.key) }))];
  if (orphan.length) groups.push({ key: 'other', label: 'More', tone: 'text-slate-600', list: orphan });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline gap-3">
        <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-500">{title}</h2>
        <span className="text-xs text-slate-400">
          {stages.length} {pick('modules', 'modules')} · ⏱ {formatMinutes(stages.reduce((n, s) => n + (s.estimatedMinutes || 0), 0))}
        </span>
        <span className="ml-auto flex items-center gap-3 text-[11px] text-slate-400">
          <span>✓ {pick('ho gaya', 'completed')}</span>
          <span className="text-indigo-600">● {pick('abhi', 'current')}</span>
          <span>○ {pick('aage', 'upcoming')}</span>
        </span>
      </div>

      <div className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2 xl:grid-cols-4">
        {groups.map((band) => (
          <div key={band.key} className="flex flex-col gap-2">
            <p className={`text-[11px] font-extrabold uppercase tracking-[0.18em] ${band.tone}`}>{band.label}</p>
            <ol className="flex flex-col">
              {band.list.map((s, i) => {
                const complete = tracking && s.total > 0 && s.done === s.total;
                const current = s.id === currentId;
                const first = s.concepts.find((c) => !c.read) || s.concepts[0];
                const labs = s.concepts.filter((c) => c.kind === 'lab').length;
                const projects = s.concepts.filter((c) => c.kind === 'project').length;
                return (
                  <li key={s.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                          complete
                            ? 'bg-green-600 text-white'
                            : current
                              ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                              : 'border border-slate-200 bg-white text-slate-500'
                        }`}
                        aria-label={complete ? 'completed' : current ? 'current' : 'upcoming'}
                      >
                        {complete ? <Icon name="check" className="h-3 w-3" /> : String(s.stage ?? i + 1).padStart(2, '0')}
                      </span>
                      {i < band.list.length - 1 && <span className="w-px flex-1 bg-slate-200" />}
                    </div>
                    <div className="min-w-0 flex-1 pb-3">
                      {first ? (
                        <Link href={`/concepts/${first.slug}`} className={`block text-sm font-semibold leading-snug hover:text-indigo-600 ${complete ? 'text-slate-500' : 'text-slate-800'}`}>
                          {s.title}
                        </Link>
                      ) : (
                        <span className="block text-sm font-semibold">{s.title}</span>
                      )}
                      <span className="mt-0.5 flex flex-wrap gap-x-2 text-[11px] text-slate-400">
                        {s.estimatedMinutes ? <span>⏱ {formatMinutes(s.estimatedMinutes)}</span> : null}
                        <span>{tracking ? `${s.done}/${s.total}` : s.total} {pick('lessons', 'lessons')}</span>
                        {labs > 0 && <span>🧪 {labs}</span>}
                        {projects > 0 && <span>🎯 {projects}</span>}
                        {current && <span className="font-semibold text-indigo-600">{pick('yahan ho', 'you are here')}</span>}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
