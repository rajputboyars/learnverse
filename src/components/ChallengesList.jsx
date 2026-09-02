'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useLang } from './LanguageProvider';
import Icon from '@/components/Icon';

const SHELL = 'mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8';
const ORDER = ['easy', 'medium', 'hard'];

const LEVEL_STYLE = {
  easy: { dot: 'bg-emerald-500', tint: 'bg-emerald-50' },
  medium: { dot: 'bg-amber-500', tint: 'bg-amber-50' },
  hard: { dot: 'bg-red-500', tint: 'bg-red-50' },
};

export default function ChallengesList({ challenges, done, loggedIn, total }) {
  const { pick } = useLang();
  const doneSet = useMemo(() => new Set(done), [done]);

  const [filter, setFilter] = useState('all'); // all | unsolved | solved
  const [level, setLevel] = useState('all');

  const solvedCount = doneSet.size;
  const xpEarned = challenges.reduce((n, c) => (doneSet.has(c.slug) ? n + c.xp : n), 0);
  const xpLeft = challenges.reduce((n, c) => (doneSet.has(c.slug) ? n : n + c.xp), 0);
  const pct = total ? Math.round((solvedCount / total) * 100) : 0;

  // The next unsolved challenge, in ladder order — the page's primary action.
  const next = useMemo(() => {
    const ordered = [...challenges].sort(
      (a, b) => ORDER.indexOf(a.difficulty) - ORDER.indexOf(b.difficulty)
    );
    return ordered.find((c) => !doneSet.has(c.slug)) || null;
  }, [challenges, doneSet]);

  const shown = challenges.filter((c) => {
    if (level !== 'all' && c.difficulty !== level) return false;
    if (filter === 'solved') return doneSet.has(c.slug);
    if (filter === 'unsolved') return !doneSet.has(c.slug);
    return true;
  });

  const levelCounts = ORDER.reduce((acc, l) => {
    acc[l] = challenges.filter((c) => c.difficulty === l).length;
    return acc;
  }, {});

  const chip = (on) =>
    `rounded-full px-4 py-2.5 text-xs font-semibold transition ${
      on
        ? 'bg-slate-900 text-white dark:bg-slate-700'
        : 'border border-slate-200 bg-white text-slate-600 hover:border-indigo-300'
    }`;

  return (
    <div className="bg-slate-50 pb-16">

      {/* ══════════ Hero ══════════ */}
      <section className={`${SHELL} pt-5`}>
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 dark:bg-slate-950">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -top-40 right-64 h-[400px] w-[600px] rounded-full bg-indigo-600 opacity-25 blur-[150px]"
          />

          <div className="relative flex flex-col gap-8 p-6 sm:p-10 lg:flex-row lg:items-center lg:gap-12">
            <div className="flex flex-col items-start gap-4 lg:flex-1">
              <span className="flex items-center gap-2 rounded-full border border-slate-700 px-3.5 py-1.5 text-xs font-medium text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                {pick('Browser mein hi chalte hain — koi setup nahi', 'They run in your browser — no setup')}
              </span>

              <h1 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl">
                {pick('Code likho. Tests pass karo. ', 'Write code. Pass the tests. ')}
                <span className="text-indigo-300">{pick('XP kamao.', 'Earn XP.')}</span>
              </h1>

              <p className="max-w-xl leading-relaxed text-slate-400">
                {pick(
                  'Chhote, tez problems — har ek ke apne test cases hain jo tumhare browser mein hi chalte hain.',
                  'Small, sharp problems — each with its own test cases, run right in your browser.'
                )}
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-3">
                {next ? (
                  <Link
                    href={`/challenges/${next.slug}`}
                    className="flex items-center gap-2.5 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white hover:bg-indigo-700"
                  >
                    {loggedIn && solvedCount > 0
                      ? pick('Agla challenge', 'Next challenge')
                      : pick('Pehla challenge', 'First challenge')}
                    {' — '}
                    {next.title}
                    <Icon name="arrow-right" className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <span className="flex items-center gap-2.5 rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white">
                    <Icon name="check-circle" className="h-4 w-4" />
                    {pick('Saare challenges solved!', 'All challenges solved!')}
                  </span>
                )}
                <Link
                  href="/leaderboard"
                  className="rounded-xl border border-slate-700 px-5 py-3.5 font-semibold text-slate-200 hover:bg-slate-800"
                >
                  {pick('Leaderboard', 'Leaderboard')}
                </Link>
              </div>
            </div>

            {/* Progress, or the reason to sign in */}
            <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-800/40 p-5 lg:w-[340px] lg:shrink-0">
              {loggedIn ? (
                <>
                  <p className="flex items-baseline text-sm font-semibold text-slate-400">
                    {pick('Solved', 'Solved')}
                    <span className="ml-auto text-slate-300">{solvedCount} / {total}</span>
                  </p>
                  <span className="block h-2 overflow-hidden rounded-full bg-slate-800">
                    <span className="block h-2 rounded-full bg-indigo-600" style={{ width: `${pct}%` }} />
                  </span>
                  <div className="flex gap-2.5">
                    <span className="flex flex-1 flex-col gap-1 rounded-xl border border-slate-800 px-3.5 py-3">
                      <span className="text-lg font-bold text-white">{xpEarned}</span>
                      <span className="text-xs text-slate-500">{pick('XP kamaya', 'XP earned')}</span>
                    </span>
                    <span className="flex flex-1 flex-col gap-1 rounded-xl border border-slate-800 px-3.5 py-3">
                      <span className="text-lg font-bold text-white">{xpLeft}</span>
                      <span className="text-xs text-slate-500">{pick('XP bacha hua', 'XP left')}</span>
                    </span>
                  </div>
                  <p className="flex items-center gap-2.5 border-t border-slate-800 pt-3.5 text-xs text-slate-400">
                    <Icon name="fire" className="h-3.5 w-3.5 text-amber-400" />
                    {pick('Har challenge ka XP ek hi baar milta hai.', 'Each challenge pays its XP once.')}
                  </p>
                </>
              ) : (
                <>
                  <Icon name="bolt" className="h-6 w-6 text-amber-400" />
                  <p className="font-bold text-white">
                    {pick('Login karo, XP track hoga', 'Sign in to keep your XP')}
                  </p>
                  <p className="text-sm text-slate-400">
                    {pick(
                      `Saare ${total} challenges abhi bhi solve kar sakte ho — bas XP aur streak save nahi hoga.`,
                      `You can still solve all ${total} — it just will not save your XP or streak.`
                    )}
                  </p>
                  <Link
                    href="/login"
                    className="mt-auto w-fit rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    {pick('Login karo', 'Sign in')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ Filters ══════════ */}
      <div className={`${SHELL} flex flex-wrap items-center gap-2.5 pt-5`}>
        <div className="flex gap-2">
          <button type="button" onClick={() => setFilter('all')} className={chip(filter === 'all')}>
            {pick('Sab', 'All')} · {total}
          </button>
          <button type="button" onClick={() => setFilter('unsolved')} className={chip(filter === 'unsolved')}>
            {pick('Baaki', 'Unsolved')} · {total - solvedCount}
          </button>
          {loggedIn && (
            <button type="button" onClick={() => setFilter('solved')} className={chip(filter === 'solved')}>
              {pick('Solved', 'Solved')} · {solvedCount}
            </button>
          )}
        </div>

        <span className="hidden h-6 w-px bg-slate-200 sm:block" />

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setLevel('all')} className={chip(level === 'all')}>
            {pick('Har level', 'Any level')}
          </button>
          {ORDER.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLevel(l)}
              className={`flex items-center gap-2 capitalize ${chip(level === l)}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${LEVEL_STYLE[l].dot}`} />
              {l} · {levelCounts[l]}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════ Challenges, grouped by level ══════════ */}
      <div className={`${SHELL} flex flex-col gap-7 pt-6`}>
        {shown.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
            {pick('Is filter mein kuch nahi hai.', 'Nothing matches this filter.')}
          </p>
        )}

        {ORDER.map((lvl) => {
          const group = shown.filter((c) => c.difficulty === lvl);
          if (group.length === 0) return null;
          const groupXp = group.reduce((n, c) => n + c.xp, 0);
          const allDone = loggedIn && group.every((c) => doneSet.has(c.slug));

          return (
            <section key={lvl} className="flex flex-col gap-3.5">
              <div className="flex items-center gap-3">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${LEVEL_STYLE[lvl].tint}`}>
                  <span className={`h-2 w-2 rounded-full ${LEVEL_STYLE[lvl].dot}`} />
                </span>
                <h2 className="text-lg font-bold capitalize tracking-tight">{lvl}</h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {group.length} · {groupXp} XP
                </span>
                <span className="h-px flex-1 bg-slate-200" />
                {allDone && (
                  <span className="shrink-0 text-xs font-semibold text-green-700">
                    <Icon name="check" className="mr-1.5 h-3 w-3" />
                    {pick('sab solved', 'all solved')}
                  </span>
                )}
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {group.map((c) => {
                  const solved = doneSet.has(c.slug);
                  const isNext = next?.slug === c.slug && loggedIn;
                  return (
                    <Link
                      key={c.slug}
                      href={`/challenges/${c.slug}`}
                      className={`flex flex-col gap-3 rounded-2xl border p-5 transition hover:shadow-sm sm:px-6 ${
                        isNext
                          ? 'border-indigo-200 bg-indigo-50/40 hover:border-indigo-300'
                          : 'border-slate-200 bg-white hover:border-indigo-300'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${
                            solved ? 'bg-green-100' : isNext ? 'bg-indigo-600' : 'bg-slate-100'
                          }`}
                        >
                          {solved && <Icon name="check" className="h-3 w-3 text-green-700" />}
                        </span>
                        <span className="flex-1 font-bold">{c.title}</span>
                        <span className={`text-xs font-semibold ${solved ? 'text-green-600' : 'text-slate-400'}`}>
                          {c.xp} XP
                        </span>
                      </span>

                      {/* The prompt — what the challenge actually asks */}
                      <span className="font-mono text-[12.5px] leading-relaxed text-slate-500">{c.prompt}</span>

                      <span className="flex items-center gap-3 border-t border-slate-100 pt-3">
                        <span className="text-xs text-slate-400">
                          {c.tests} {pick('tests', c.tests === 1 ? 'test' : 'tests')}
                        </span>
                        <span
                          className={`ml-auto rounded-lg px-4 py-2 text-sm font-semibold ${
                            solved
                              ? 'bg-slate-100 text-slate-600'
                              : 'bg-indigo-600 text-white'
                          }`}
                        >
                          {solved
                            ? pick('Phir se dekho', 'Review')
                            : isNext
                              ? pick('Yahin se shuru', 'Start here')
                              : pick('Solve karo', 'Solve')}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* ══════════ How it works ══════════ */}
      <section className={`${SHELL} pt-8`}>
        <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 lg:flex-row lg:items-center lg:gap-8 lg:p-7">
          <div className="flex flex-col gap-1.5 lg:w-[260px] lg:shrink-0">
            <h2 className="font-bold">{pick('Kaam kaise karta hai', 'How it works')}</h2>
            <p className="text-sm text-slate-500">
              {pick('Sab kuch tumhare browser mein.', 'All of it runs in your browser.')}
            </p>
          </div>
          <div className="grid flex-1 gap-4 sm:grid-cols-3">
            {[
              {
                n: '01',
                t: pick('Function likho', 'Write the function'),
                d: pick('Starter code pehle se bhara hua hai.', 'Starter code is already there.'),
              },
              {
                n: '02',
                t: pick('Tests chalao', 'Run the tests'),
                d: pick(
                  'Sandboxed Web Worker mein — page freeze nahi hoga.',
                  'In a sandboxed Web Worker — the page never freezes.'
                ),
              },
              {
                n: '03',
                t: pick('XP claim karo', 'Claim the XP'),
                d: pick('Sab tests green hote hi, ek baar.', 'Once every test is green, once only.'),
              },
            ].map((s) => (
              <div key={s.n} className="flex gap-3">
                <span className="font-mono text-xs text-indigo-600">{s.n}</span>
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-semibold">{s.t}</span>
                  <span className="text-xs leading-relaxed text-slate-500">{s.d}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
