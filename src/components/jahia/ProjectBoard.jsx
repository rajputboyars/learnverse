'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Icon from '../Icon';
import CodeBlock from '../concept/CodeBlock';
import { useLang } from '../LanguageProvider';
import { readStore, writeStore } from './useTx';
import { DATA_MODEL, FINAL_REQUIREMENTS, MINI_PROJECTS, PHASES, PROJECT } from '@/data/jahia/project';

const REQ_STORE = 'jahia:final-requirements';

function Panel({ title, icon, children, right }) {
  return (
    <section className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex items-center gap-2.5">
        <Icon name={icon} className="h-4 w-4 text-indigo-600" />
        <h2 className="text-lg font-bold">{title}</h2>
        {right && <span className="ml-auto text-xs text-slate-400">{right}</span>}
      </div>
      {children}
    </section>
  );
}

/** Interactive data model: pick an entity, follow its reference fields. */
function DataModel() {
  const { pick } = useLang();
  const [active, setActive] = useState('article');
  const entity = DATA_MODEL.find((e) => e.id === active);
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-[200px_minmax(0,1fr)]">
      <div className="flex gap-1.5 overflow-x-auto md:flex-col">
        {DATA_MODEL.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => setActive(e.id)}
            aria-pressed={active === e.id}
            className={`flex shrink-0 flex-col rounded-xl border px-3 py-2 text-left ${
              active === e.id ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200 bg-white hover:border-indigo-300'
            }`}
          >
            <span className="text-xs font-extrabold tracking-wider">{e.label}</span>
            <span className="font-mono text-[11px] text-slate-500">{e.type}</span>
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <p className="bg-slate-900 px-4 py-2.5 font-mono text-sm font-bold text-slate-100">
          {entity.label} <span className="font-normal text-slate-400">· {entity.type}</span>
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-2 font-bold">{pick('Field', 'Field')}</th>
                <th className="px-4 py-2 font-bold">CND</th>
                <th className="px-4 py-2 font-bold">{pick('Author ko dikhta hai', 'Author sees')}</th>
              </tr>
            </thead>
            <tbody>
              {entity.fields.map((f) => (
                <tr key={f.name} className="border-t border-slate-100">
                  <td className="px-4 py-2.5 font-mono font-semibold text-slate-800">
                    {f.ref ? (
                      <button type="button" onClick={() => setActive(f.ref)} className="flex items-center gap-1.5 text-indigo-600 hover:underline">
                        {f.name} <span className="text-slate-400">──→</span> {DATA_MODEL.find((e) => e.id === f.ref)?.label}
                      </button>
                    ) : (
                      f.name
                    )}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-xs text-slate-500">{f.type}</td>
                  <td className="px-4 py-2.5 text-slate-600">{f.cms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function ProjectBoard({ lessons }) {
  const { pick } = useLang();
  const { status } = useSession();
  const [readSlugs, setReadSlugs] = useState(null);
  const [reqs, setReqs] = useState({});
  const [mini, setMini] = useState(null);

  useEffect(() => {
    setReqs(readStore(REQ_STORE, {}));
  }, []);

  // Phase status comes from real course progress: a phase is done when the
  // lesson that teaches it is marked done.
  useEffect(() => {
    if (status !== 'authenticated') return;
    let alive = true;
    fetch('/api/me/stats')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d?.progress) return;
        setReadSlugs(new Set(d.progress.filter((p) => p.read).map((p) => p.conceptId)));
      })
      .catch(() => {});
    return () => { alive = false; };
  }, [status]);

  // `lessons` maps title → { slug, id }; progress is keyed by concept id.
  const phaseDone = (p) => Boolean(readSlugs && lessons?.[p.lesson] && readSlugs.has(lessons[p.lesson].id));
  const donePhases = PHASES.filter(phaseDone).length;
  const allReqs = FINAL_REQUIREMENTS.flatMap((g) => g.items.map((i) => `${g.group}:${i}`));
  const reqDone = allReqs.filter((k) => reqs[k]).length;

  function toggleReq(key) {
    const next = { ...reqs, [key]: !reqs[key] };
    setReqs(next);
    writeStore(REQ_STORE, next);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Brief */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 sm:p-8 dark:bg-slate-950">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">{pick('Final project', 'Final project')}</p>
        <h2 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">{PROJECT.name}</h2>
        <p className="mt-2 max-w-3xl text-slate-400">
          {pick(
            'Poora course isi ek project ke around bana hai. Har module ek phase add karta hai — module, namespace, types, views, authoring, GraphQL, languages, workflow, cache.',
            'The whole course builds this one project. Every module adds a phase — module, namespace, types, views, authoring, GraphQL, languages, workflow, cache.'
          )}
        </p>
        <div className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-4 text-sm sm:grid-cols-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Module · namespace</p>
            <p className="font-mono text-slate-200">{PROJECT.module} · {PROJECT.namespace}:</p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">Sites</p>
            <p className="font-mono text-slate-200">{PROJECT.sites.join(' · ')}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Pages</p>
            <p className="text-slate-200">{PROJECT.pages.join(' · ')}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Content types</p>
            <p className="font-mono text-slate-200">{PROJECT.types.join(' · ')}</p>
          </div>
        </div>
      </section>

      {/* Phases */}
      <Panel title={pick('17 phases', 'The 17 phases')} icon="list-check" right={readSlugs ? `${donePhases}/${PHASES.length}` : null}>
        <ol className="grid grid-cols-[minmax(0,1fr)] gap-2 md:grid-cols-2">
          {PHASES.map((p) => {
            const done = phaseDone(p);
            const slug = lessons?.[p.lesson]?.slug;
            const Inner = (
              <>
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold ${done ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {done ? <Icon name="check" className="h-3 w-3" /> : p.n}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{p.title}</span>
                  <span className="block truncate font-mono text-xs text-slate-500">{p.detail}</span>
                </span>
              </>
            );
            return (
              <li key={p.n}>
                {slug ? (
                  <Link href={`/concepts/${slug}`} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5 transition hover:border-indigo-300">
                    {Inner}
                  </Link>
                ) : (
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5">{Inner}</div>
                )}
              </li>
            );
          })}
        </ol>
      </Panel>

      {/* Data model */}
      <Panel title={pick('Content data model', 'Content data model')} icon="database">
        <DataModel />
      </Panel>

      {/* Mini projects */}
      <Panel title={pick('Mini projects', 'Mini projects')} icon="rocket">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-3 md:grid-cols-2 xl:grid-cols-3">
          {MINI_PROJECTS.map((m, i) => (
            <div key={m.id} className={`flex flex-col gap-2.5 rounded-2xl border p-4 ${mini === m.id ? 'border-indigo-300 md:col-span-2 xl:col-span-3' : 'border-slate-200'}`}>
              <p className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">P{i + 1}</span>
                <span className="font-bold">{m.title}</span>
                <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">{m.level} · ⏱ {m.minutes} min</span>
              </p>
              <p className="text-sm text-slate-600">{m.goal}</p>
              <button type="button" onClick={() => setMini(mini === m.id ? null : m.id)} className="self-start text-sm font-semibold text-indigo-600 hover:underline">
                {mini === m.id ? pick('Band karo', 'Hide brief') : pick('Brief dekho', 'Open brief')}
              </button>
              {mini === m.id && (
                <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
                  <CodeBlock code={m.types} language="cnd" filename="definitions.cnd" lineNumbers />
                  <ol className="flex flex-col gap-1.5">
                    {m.steps.map((s, j) => (
                      <li key={j} className="flex gap-2 text-sm text-slate-700">
                        <span className="font-bold text-indigo-600">{j + 1}.</span> {s}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ))}
          <div className="flex flex-col gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="font-bold">{pick('Final: poora News Portal', 'Final: the complete News Portal')}</p>
            <p className="text-sm text-slate-600">{pick('Neeche ki requirements list tumhara definition of done hai.', 'The requirements below are your definition of done.')}</p>
          </div>
        </div>
      </Panel>

      {/* Requirements */}
      <Panel title={pick('Final project requirements', 'Final project requirements')} icon="square-check" right={`${reqDone}/${allReqs.length}`}>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-3">
          {FINAL_REQUIREMENTS.map((g) => (
            <div key={g.group} className="flex flex-col gap-1.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{g.group}</p>
              {g.items.map((item) => {
                const key = `${g.group}:${item}`;
                const ok = Boolean(reqs[key]);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleReq(key)}
                    aria-pressed={ok}
                    className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm transition ${ok ? 'bg-green-50 text-green-800' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    <span className={`grid h-4 w-4 shrink-0 place-items-center rounded border ${ok ? 'border-green-600 bg-green-600 text-white' : 'border-slate-200 bg-white'}`}>
                      {ok && <Icon name="check" className="h-2.5 w-2.5" />}
                    </span>
                    {item}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400">
          {pick('Ye checklist is browser mein save hoti hai. Certificate ke liye final project lessons aur final assessment complete karne honge.', 'This checklist is saved in this browser. The certificate needs the final-project lessons and the final assessment completed.')}
        </p>
      </Panel>
    </div>
  );
}
