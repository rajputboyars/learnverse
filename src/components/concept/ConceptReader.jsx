'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import CodeBlock from './CodeBlock';
import CodePlayground from './CodePlayground';
import BookmarkButton from './BookmarkButton';
import CommentsSection from './CommentsSection';
import Reactions from './Reactions';
import ShareButtons from '../ShareButtons';
import Quiz from './Quiz';
import { useLang } from '../LanguageProvider';

const RUNNABLE = new Set(['javascript', 'html']);

export default function ConceptReader({ concept }) {
  const { data: session } = useSession();
  const { lang: uiLang, t } = useLang();
  const [done, setDone] = useState(false);
  const [marking, setMarking] = useState(false);
  const [toast, setToast] = useState(null);

  const hasHinglish = !!concept.explanation?.hinglish;
  // Content language follows the global top-bar toggle ('hi' = Hinglish).
  const showHinglish = uiLang === 'hi' && hasHinglish;
  const explanation = showHinglish
    ? concept.explanation.hinglish
    : concept.explanation?.english || '';

  // Load whether this concept is already completed by the user.
  useEffect(() => {
    if (!session?.user) return;
    fetch('/api/me/stats')
      .then((r) => r.json())
      .then((d) => {
        const p = d.progress?.find((x) => x.conceptId === concept._id);
        if (p?.read) setDone(true);
      })
      .catch(() => {});
  }, [session, concept._id]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function markDone() {
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
    const data = await res.json();
    setMarking(false);
    if (res.ok) {
      setDone(true);
      if (data.gained) {
        showToast(`+${data.gained} XP! 🔥 ${data.currentStreak}-day streak`);
      }
    }
  }

  return (
    <article className="relative">
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}

      <header className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600 capitalize">
            {concept.difficulty}
          </span>
          {concept.tags?.map((t) => (
            <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-500">
              #{t}
            </span>
          ))}
        </div>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{concept.title}</h1>
          <div className="shrink-0 pt-1">
            <BookmarkButton conceptId={concept._id} />
          </div>
        </div>
      </header>

      {/* Reading in — language follows the global top-bar toggle (the USP). */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500">
        <span>🌐</span>
        <span>
          <span className="font-semibold text-indigo-600">{showHinglish ? 'Hinglish' : 'English'}</span>
          {' · '}{t('reader.langNote')}
        </span>
        {!hasHinglish && uiLang === 'hi' && (
          <span className="text-slate-400">(English only)</span>
        )}
      </div>

      {/* Explanation */}
      <div className="prose-content text-[15px] text-slate-700">{explanation}</div>

      {/* Daily-life example — own coloured block, visually distinct (USP) */}
      {concept.dailyLifeExample && (
        <div className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <div className="mb-2 flex items-center gap-2 font-semibold text-amber-800">
            <span className="text-xl">🪔</span> {t('reader.dailyExample')}
          </div>
          <p className="prose-content text-[15px] text-amber-900">
            {concept.dailyLifeExample}
          </p>
        </div>
      )}

      {/* Code — runnable playground for JS/HTML, static block otherwise */}
      {concept.codeExample && (
        <div className="my-8">
          <h2 className="mb-3 text-lg font-semibold">{t('reader.codeExample')}</h2>
          {RUNNABLE.has(concept.codeLanguage) ? (
            <CodePlayground code={concept.codeExample} language={concept.codeLanguage} />
          ) : (
            <CodeBlock code={concept.codeExample} language={concept.codeLanguage} />
          )}
        </div>
      )}

      {/* Key points */}
      {concept.keyPoints?.length > 0 && (
        <div className="my-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <h2 className="mb-3 text-lg font-semibold">{t('reader.keyPoints')}</h2>
          <ul className="space-y-2 text-[15px] text-slate-700">
            {concept.keyPoints.map((k, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-indigo-600">→</span>
                <span>{k}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quiz */}
      <div className="my-8">
        <Quiz
          conceptId={concept._id}
          quiz={concept.quiz}
          onPassed={(reward) =>
            showToast(`Quiz passed! +${reward.gained} XP 🎉`)
          }
        />
      </div>

      {/* Mark done */}
      <div className="my-8 flex flex-col items-start gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        {done ? (
          <span className="inline-flex items-center gap-2 font-semibold text-green-700">
            {t('reader.completed')}
          </span>
        ) : (
          <button
            onClick={markDone}
            disabled={marking}
            className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
          >
            {marking ? t('reader.saving') : `${t('reader.markDone')} (+${concept.xpReward || 10} XP)`}
          </button>
        )}
        {!session?.user && (
          <span className="text-sm text-slate-500">
            <Link href="/login" className="font-semibold text-indigo-600 underline">
              {t('nav.login')}
            </Link>{' '}
            {t('reader.loginToSave')}
          </span>
        )}
      </div>

      {/* Interview questions linked to this concept */}
      {concept.interviewQuestions?.length > 0 && (
        <div className="my-8">
          <h2 className="mb-3 text-lg font-semibold">{t('reader.interviewHeading')}</h2>
          <div className="space-y-3">
            {concept.interviewQuestions.map((q) => (
              <details
                key={q._id}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <summary className="cursor-pointer font-medium">{q.question}</summary>
                <p className="prose-content mt-3 text-sm text-slate-600">
                  {showHinglish && q.answer?.hinglish
                    ? q.answer.hinglish
                    : q.answer?.english}
                </p>
              </details>
            ))}
          </div>
        </div>
      )}

      {/* Reactions */}
      <Reactions conceptId={concept._id} />

      {/* Share */}
      <ShareButtons title={`${concept.title} — Learnverse`} text={`Check out "${concept.title}" on Learnverse`} />

      {/* Community Q&A */}
      <CommentsSection conceptId={concept._id} />
    </article>
  );
}
