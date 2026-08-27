'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import ConceptReader from './ConceptReader';
import BookmarkButton from './BookmarkButton';
import { useLang } from '../LanguageProvider';
import Icon from '../Icon';

const SHELL = 'mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8';

// The concept page shell. It owns everything the reading bar and the reader
// both need — completion state, the mark-done call, the toast — so the action
// that earns XP can live at the top of the page instead of halfway down it.
export default function ConceptLayout({ concept, course, nav, topicTitle, position, prev, next }) {
  const { data: session } = useSession();
  const { t, pick, lang, setLang } = useLang();

  const [readIds, setReadIds] = useState(null);
  const [done, setDone] = useState(false);
  const [marking, setMarking] = useState(false);
  const [toast, setToast] = useState(null);
  const [scrolled, setScrolled] = useState(0);

  // Progress for the tick marks in the nav, and this concept's own state.
  useEffect(() => {
    if (!session?.user) return;
    let alive = true;
    fetch('/api/me/stats')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d?.progress) return;
        setReadIds(new Set(d.progress.filter((p) => p.read).map((p) => p.conceptId)));
        if (d.progress.find((p) => p.conceptId === concept._id)?.read) setDone(true);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, [session, concept._id]);

  // Reading progress hairline under the bar.
  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const markDone = useCallback(async () => {
    if (!session?.user) {
      showToast(t('reader.loginToClaim'));
      return;
    }
    setMarking(true);
    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conceptId: concept._id }),
    });
    const data = await res.json().catch(() => ({}));
    setMarking(false);
    if (res.ok) {
      setDone(true);
      setReadIds((prev) => new Set(prev ? [...prev, concept._id] : [concept._id]));
      if (data.gained) showToast(`+${data.gained} XP! ${data.currentStreak}-day streak`);
    }
  }, [session, concept._id, showToast, t]);

  const tracking = readIds !== null;
  const readCount = tracking
    ? nav.reduce((n, g) => n + g.items.filter((i) => readIds.has(i.id)).length, 0)
    : 0;
  const coursePct = position.total ? Math.round((readCount / position.total) * 100) : 0;

  return (
    <div className="bg-slate-50 pb-16">
      {toast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg sm:bottom-6">
          {toast}
        </div>
      )}

      {/* ══════════ Reading bar ══════════ */}
      <div className="sticky top-14 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:bg-slate-900/90">
        <div className={`${SHELL} flex items-center gap-4 py-2.5`}>
          {course && (
            <Link
              href={`/courses/${course.slug}`}
              className="flex min-w-0 items-center gap-2 text-xs text-slate-400 hover:text-indigo-600"
            >
              <Icon name={course.icon} brand className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate font-medium text-slate-600">{course.title}</span>
              {topicTitle && (
                <>
                  <span className="hidden sm:inline">/</span>
                  <span className="hidden truncate sm:inline">{topicTitle}</span>
                </>
              )}
            </Link>
          )}

          <span className="hidden items-center gap-2.5 md:flex">
            <span className="text-xs text-slate-400">
              {String(position.index).padStart(2, '0')} / {position.total}
            </span>
            {tracking && (
              <span className="block h-1 w-24 overflow-hidden rounded-full bg-slate-200">
                <span className="block h-1 rounded-full bg-indigo-600" style={{ width: `${coursePct}%` }} />
              </span>
            )}
          </span>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            {prev && (
              <Link
                href={`/concepts/${prev.slug}`}
                title={prev.title}
                className="hidden h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white hover:border-indigo-300 sm:grid"
              >
                <Icon name="arrow-left" className="h-3.5 w-3.5 text-slate-500" />
              </Link>
            )}
            <BookmarkButton conceptId={concept._id} />
            {done ? (
              <span className="flex h-9 items-center gap-2 rounded-lg bg-green-50 px-3.5 text-sm font-semibold text-green-700">
                <Icon name="check-circle" className="h-4 w-4" />
                <span className="hidden sm:inline">{t('reader.completed')}</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={markDone}
                disabled={marking}
                className="flex h-9 items-center gap-2 rounded-lg bg-green-600 px-3.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
              >
                <Icon name="check" className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">
                  {marking ? t('reader.saving') : `${t('reader.markDone')} · +${concept.xpReward || 10} XP`}
                </span>
              </button>
            )}
            {next && (
              <Link
                href={`/concepts/${next.slug}`}
                title={next.title}
                className="flex h-9 items-center gap-2 rounded-lg bg-indigo-600 px-3.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                <span className="hidden sm:inline">{pick('Agla', 'Next')}</span>
                <Icon name="arrow-right" className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
        <span
          aria-hidden
          className="absolute -bottom-px left-0 h-0.5 bg-indigo-600 transition-[width]"
          style={{ width: `${scrolled}%` }}
        />
      </div>

      {/* ══════════ Columns ══════════ */}
      <div className={`${SHELL} flex items-start gap-7 pt-6`}>

        {/* Course nav, grouped by topic */}
        <aside className="sticky top-32 hidden w-[264px] shrink-0 flex-col gap-3.5 lg:flex">
          {course && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <Link
                href={`/courses/${course.slug}`}
                className="flex items-center gap-2.5 border-b border-slate-100 pb-3 text-sm font-bold leading-snug hover:text-indigo-600"
              >
                <Icon name={course.icon} brand className="h-4 w-4 shrink-0" />
                {course.title}
              </Link>
              <p className="flex items-center gap-2.5 pt-3">
                <span className="block h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <span className="block h-1.5 rounded-full bg-green-600" style={{ width: `${coursePct}%` }} />
                </span>
                <span className="text-xs text-slate-400">
                  {tracking ? `${readCount}/${position.total}` : position.total}
                </span>
              </p>
            </div>
          )}

          <nav className="max-h-[calc(100vh-16rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2">
            {nav.map((g) => (
              <div key={g.id} className="flex flex-col gap-0.5 px-1 pb-2.5 pt-2">
                {g.title && (
                  <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {g.title}
                  </p>
                )}
                {g.items.map((item) => {
                  const here = item.slug === concept.slug;
                  const read = tracking && readIds.has(item.id);
                  return (
                    <Link
                      key={item.id}
                      href={`/concepts/${item.slug}`}
                      className={`flex items-start gap-2.5 rounded-lg px-2 py-1.5 text-[13px] leading-snug transition ${
                        here
                          ? 'bg-indigo-50 font-semibold text-indigo-700'
                          : read
                            ? 'text-slate-400 hover:bg-slate-50'
                            : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span
                        className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${
                          read ? 'bg-green-100' : here ? 'bg-indigo-600' : 'bg-slate-100'
                        }`}
                      >
                        {read && <Icon name="check" className="h-2 w-2 text-green-700" />}
                      </span>
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </aside>

        {/* Article — capped measure, centred in its column */}
        <main className="flex min-w-0 flex-1 justify-center">
          <div className="w-full max-w-[720px]">
            <ConceptReader
              concept={concept}
              done={done}
              marking={marking}
              onMarkDone={markDone}
              showToast={showToast}
              lang={lang}
              setLang={setLang}
            />

            {/* Prev / next */}
            <div className="mt-8 grid gap-3.5 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/concepts/${prev.slug}`}
                  className="flex flex-col gap-1.5 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300"
                >
                  <span className="text-xs text-slate-400">← {pick('Pichla', 'Previous')}</span>
                  <span className="font-semibold">{prev.title}</span>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}
              {next && (
                <Link
                  href={`/concepts/${next.slug}`}
                  className="flex flex-col items-end gap-1.5 rounded-2xl border border-slate-200 bg-white p-4 text-right transition hover:border-indigo-300"
                >
                  <span className="text-xs font-medium text-indigo-600">{pick('Agla', 'Next')} →</span>
                  <span className="font-semibold">{next.title}</span>
                </Link>
              )}
            </div>
          </div>
        </main>

        {/* Right rail */}
        <aside className="sticky top-32 hidden w-[248px] shrink-0 flex-col gap-3.5 xl:flex">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {pick('Is page par', 'On this page')}
            </p>
            <div className="mt-2.5 flex flex-col gap-0.5">
              {[
                { id: 'explanation', label: pick('Samjho', 'The explanation'), on: true },
                { id: 'daily-example', label: t('reader.dailyExample'), on: !!concept.dailyLifeExample },
                { id: 'code-example', label: t('reader.codeExample'), on: !!concept.codeExample },
                { id: 'key-points', label: t('reader.keyPoints'), on: concept.keyPoints?.length > 0 },
                { id: 'quiz', label: 'Quiz', on: concept.quiz?.length > 0 },
                {
                  id: 'interview',
                  label: t('reader.interviewHeading'),
                  on: concept.interviewQuestions?.length > 0,
                },
                { id: 'discussion', label: pick('Doubts', 'Discussion'), on: true },
              ]
                .filter((s) => s.on)
                .map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                  >
                    <span className="h-3.5 w-0.5 shrink-0 rounded-full bg-slate-200" />
                    <span className="truncate">{s.label}</span>
                  </a>
                ))}
            </div>
          </div>

          {course && (
            <div className="flex flex-col gap-2.5 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-bold">{pick('Practice', 'Practice')}</p>
              <Link
                href={`/mock-interview/${course.slug}`}
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-3 py-2.5 text-[13px] font-semibold transition hover:border-indigo-300"
              >
                <Icon name="microphone" className="h-3.5 w-3.5 text-indigo-600" />
                {pick('Mock interview', 'Mock interview')}
              </Link>
              <Link
                href={`/practice/${course.slug}`}
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-3 py-2.5 text-[13px] font-semibold transition hover:border-indigo-300"
              >
                <Icon name="brain" className="h-3.5 w-3.5 text-indigo-600" />
                {pick('Practice quiz', 'Practice quiz')}
              </Link>
              <Link
                href="/revise"
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-3 py-2.5 text-[13px] font-semibold transition hover:border-indigo-300"
              >
                <Icon name="repeat" className="h-3.5 w-3.5 text-indigo-600" />
                {pick('Revision', 'Revision')}
              </Link>
            </div>
          )}
        </aside>
      </div>

      {/* ══════════ Docked action bar (mobile) ══════════ */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-2.5 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden dark:bg-slate-900/95">
        {done ? (
          <span className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-green-50 font-semibold text-green-700">
            <Icon name="check-circle" className="h-4 w-4" />
            {t('reader.completed')}
          </span>
        ) : (
          <button
            type="button"
            onClick={markDone}
            disabled={marking}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 font-semibold text-white disabled:opacity-50"
          >
            <Icon name="check" className="h-4 w-4" />
            {marking ? t('reader.saving') : `${t('reader.markDone')} · +${concept.xpReward || 10} XP`}
          </button>
        )}
        {next && (
          <Link
            href={`/concepts/${next.slug}`}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-indigo-600 text-white"
          >
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
