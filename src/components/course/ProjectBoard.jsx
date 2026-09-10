'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Icon from '../Icon';
import CodeBlock from '../concept/CodeBlock';
import { useLang } from '../LanguageProvider';
import { readStore, useTx, writeStore } from './useTx';

/**
 * A course's project board. Everything optional except the brief:
 *
 *   project = {
 *     brief: { name, summary, facts: [{ label, value }] }   (or Jahia's legacy fields)
 *     phases | milestones: [{ n, title, detail, lesson, checks: [] }]
 *     dataModel: [{ id, label, type, fields: [{ name, type, cms, ref }] }]
 *     miniProjects: [{ id, title, level, minutes, goal, types|starter, steps }]
 *     requirements: [{ group, items }]
 *     showcase: { what, stack, features, architecture, structure, deployment, challenges }
 *     portfolio: { readme, resumeBullet, linkedinPost }
 *     storageKey, codeLanguage
 *   }
 *
 * Phase status comes from real course progress: a phase is done when the
 * lesson that teaches it is marked done.
 */

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

function DataModel({ model }) {
  const { pick } = useLang();
  const [active, setActive] = useState(model[0].id);
  const entity = model.find((e) => e.id === active) || model[0];
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-[200px_minmax(0,1fr)]">
      <div className="flex gap-1.5 overflow-x-auto md:flex-col">
        {model.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => setActive(e.id)}
            aria-pressed={active === e.id}
            className={`flex shrink-0 flex-col rounded-xl border px-3 py-2 text-left ${active === e.id ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200 bg-white hover:border-indigo-300'}`}
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
                <th className="px-4 py-2 font-bold">{pick('Type', 'Type')}</th>
                <th className="px-4 py-2 font-bold">{pick('User ko dikhta hai', 'User sees')}</th>
              </tr>
            </thead>
            <tbody>
              {entity.fields.map((f) => (
                <tr key={f.name} className="border-t border-slate-100">
                  <td className="px-4 py-2.5 font-mono font-semibold text-slate-800">
                    {f.ref && model.some((e) => e.id === f.ref) ? (
                      <button type="button" onClick={() => setActive(f.ref)} className="flex items-center gap-1.5 text-indigo-600 hover:underline">
                        {f.name} <span className="text-slate-400">──→</span> {model.find((e) => e.id === f.ref)?.label}
                      </button>
                    ) : (
                      f.name
                    )}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-xs text-slate-500">{f.type}</td>
                  <td className="px-4 py-2.5 text-slate-600">{f.cms || f.ui || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Copyable({ label, text }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(text);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            } catch {
              /* clipboard unavailable */
            }
          }}
          className="ml-auto text-xs font-semibold text-indigo-600"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-[12.5px] leading-relaxed text-slate-700">{text}</pre>
    </div>
  );
}

export default function ProjectBoard({ project, lessons }) {
  const { pick } = useLang();
  const tx = useTx();
  const { status } = useSession();
  const [readIds, setReadIds] = useState(null);
  const [reqs, setReqs] = useState({});
  const [mini, setMini] = useState(null);
  const storeKey = `${project.storageKey || 'course'}:final-requirements`;

  const brief = project.brief || {};
  const phases = project.milestones || project.phases || [];
  const facts =
    brief.facts ||
    [
      brief.module && { label: 'Module · namespace', value: `${brief.module}${brief.namespace ? ` · ${brief.namespace}:` : ''}` },
      brief.sites && { label: 'Sites', value: brief.sites.join(' · ') },
      brief.pages && { label: 'Pages', value: brief.pages.join(' · ') },
      brief.types && { label: 'Content types', value: brief.types.join(' · ') },
    ].filter(Boolean);

  useEffect(() => {
    setReqs(readStore(storeKey, {}));
  }, [storeKey]);

  useEffect(() => {
    if (status !== 'authenticated') return;
    let alive = true;
    fetch('/api/me/stats')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d?.progress) return;
        setReadIds(new Set(d.progress.filter((p) => p.read).map((p) => p.conceptId)));
      })
      .catch(() => {});
    return () => { alive = false; };
  }, [status]);

  const phaseDone = (p) => Boolean(readIds && lessons?.[p.lesson] && readIds.has(lessons[p.lesson].id));
  const donePhases = phases.filter(phaseDone).length;
  const requirements = project.requirements || [];
  const allReqs = requirements.flatMap((g) => g.items.map((i) => `${g.group}:${i}`));
  const reqDone = allReqs.filter((k) => reqs[k]).length;

  function toggleReq(key) {
    const next = { ...reqs, [key]: !reqs[key] };
    setReqs(next);
    writeStore(storeKey, next);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Brief */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 sm:p-8 dark:bg-slate-950">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">{pick('Final project', 'Final project')}</p>
        <h2 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">{brief.name}</h2>
        <p className="mt-2 max-w-3xl text-slate-400">
          {brief.summary
            ? tx(brief.summary)
            : pick(
                'Poora course isi ek project ke around bana hai. Har module ek phase add karta hai.',
                'The whole course builds this one project. Every module adds a phase.'
              )}
        </p>
        {facts.length > 0 && (
          <div className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-4 text-sm sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label}>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{f.label}</p>
                <p className="font-mono text-slate-200">{f.value}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {phases.length > 0 && (
        <Panel title={project.milestones ? pick('Milestones', 'Milestones') : pick(`${phases.length} phases`, `The ${phases.length} phases`)} icon="list-check" right={readIds ? `${donePhases}/${phases.length}` : null}>
          <ol className="grid grid-cols-[minmax(0,1fr)] gap-2 md:grid-cols-2">
            {phases.map((p) => {
              const done = phaseDone(p);
              const slug = lessons?.[p.lesson]?.slug;
              const inner = (
                <>
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold ${done ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {done ? <Icon name="check" className="h-3 w-3" /> : p.n}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{tx(p.title)}</span>
                    {p.detail && <span className="block truncate font-mono text-xs text-slate-500">{tx(p.detail)}</span>}
                    {p.checks?.length > 0 && (
                      <span className="mt-1 flex flex-wrap gap-x-3 text-[11px] text-slate-500">
                        {p.checks.map((c) => <span key={c}>✓ {c}</span>)}
                      </span>
                    )}
                  </span>
                </>
              );
              return (
                <li key={p.n}>
                  {slug ? (
                    <Link href={`/concepts/${slug}`} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5 transition hover:border-indigo-300">{inner}</Link>
                  ) : (
                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5">{inner}</div>
                  )}
                </li>
              );
            })}
          </ol>
        </Panel>
      )}

      {project.dataModel?.length > 0 && (
        <Panel title={pick('Data model', 'Data model')} icon="database">
          <DataModel model={project.dataModel} />
        </Panel>
      )}

      {project.miniProjects?.length > 0 && (
        <Panel title={pick('Mini projects', 'Mini projects')} icon="rocket">
          <div className="grid grid-cols-[minmax(0,1fr)] gap-3 md:grid-cols-2 xl:grid-cols-3">
            {project.miniProjects.map((m, i) => (
              <div key={m.id} className={`flex flex-col gap-2.5 rounded-2xl border p-4 ${mini === m.id ? 'border-indigo-300 md:col-span-2 xl:col-span-3' : 'border-slate-200'}`}>
                <p className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">P{i + 1}</span>
                  <span className="font-bold">{m.title}</span>
                  <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">{m.level} · ⏱ {m.minutes} min</span>
                </p>
                <p className="text-sm text-slate-600">{tx(m.goal)}</p>
                <button type="button" onClick={() => setMini(mini === m.id ? null : m.id)} className="self-start text-sm font-semibold text-indigo-600 hover:underline">
                  {mini === m.id ? pick('Band karo', 'Hide brief') : pick('Brief dekho', 'Open brief')}
                </button>
                {mini === m.id && (
                  <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
                    {(m.types || m.starter) && (
                      <CodeBlock code={m.types || m.starter} language={m.language || project.codeLanguage || 'text'} filename={m.filename} lineNumbers />
                    )}
                    <ol className="flex flex-col gap-1.5">
                      {m.steps.map((s, j) => (
                        <li key={j} className="flex gap-2 text-sm text-slate-700">
                          <span className="font-bold text-indigo-600">{j + 1}.</span> {tx(s)}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Panel>
      )}

      {requirements.length > 0 && (
        <Panel title={pick('Final project requirements', 'Final project requirements')} icon="square-check" right={`${reqDone}/${allReqs.length}`}>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-3">
            {requirements.map((g) => (
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
            {pick('Ye checklist is browser mein save hoti hai.', 'This checklist is saved in this browser.')}
          </p>
        </Panel>
      )}

      {project.showcase && (
        <Panel title={pick('Project showcase', 'Project showcase')} icon="star">
          <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
            {[
              ['What you built', project.showcase.what],
              ['Technology used', project.showcase.stack?.join(' · ')],
              ['Features', project.showcase.features?.map((f) => `• ${f}`).join('\n')],
              ['Architecture', project.showcase.architecture],
              ['Code structure', project.showcase.structure],
              ['Deployment', project.showcase.deployment],
              ['Challenges solved', project.showcase.challenges?.map((f) => `• ${f}`).join('\n')],
            ]
              .filter(([, v]) => v)
              .map(([label, v]) => (
                <div key={label} className="flex min-w-0 flex-col gap-1.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
                  {label === 'Code structure' || label === 'Architecture' ? (
                    <CodeBlock code={tx(v)} language="text" />
                  ) : (
                    <p className="whitespace-pre-line text-sm text-slate-700">{tx(v)}</p>
                  )}
                </div>
              ))}
          </div>
          <p className="text-xs text-slate-400">
            {pick('Screenshots apne deployed project se lo — README aur portfolio dono mein lagao.', 'Take screenshots from your own deployed project — use them in both the README and your portfolio.')}
          </p>
        </Panel>
      )}

      {project.portfolio && (
        <Panel title={pick('Is project ko kaise showcase karein', 'How to showcase this project')} icon="briefcase">
          <p className="text-sm text-slate-600">
            {pick(
              'Ready-to-edit drafts. Learnverse kuch bhi publish nahi karta — copy karo, apne hisaab se badlo.',
              'Ready-to-edit drafts. Learnverse publishes nothing for you — copy them and make them yours.'
            )}
          </p>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-4">
            {project.portfolio.readme && <Copyable label="GitHub README" text={tx(project.portfolio.readme)} />}
            {project.portfolio.resumeBullet && <Copyable label={pick('Resume bullet', 'Resume bullet')} text={tx(project.portfolio.resumeBullet)} />}
            {project.portfolio.linkedinPost && <Copyable label={pick('LinkedIn / project post', 'LinkedIn / project post')} text={tx(project.portfolio.linkedinPost)} />}
          </div>
        </Panel>
      )}
    </div>
  );
}
