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
const DIFFICULTY_LABEL = { easy: 'Beginner', medium: 'Intermediate', hard: 'Advanced' };

export default function ConceptReader({ concept, course }) {
  const { data: session } = useSession();
  const { lang: uiLang, t, setLang } = useLang();
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
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="lv-pill bg-brand-tint text-brand-dark">
          {course?.icon} {course?.title}{course && ' · '}{DIFFICULTY_LABEL[concept.difficulty] || concept.difficulty}
        </span>
        <BookmarkButton conceptId={concept._id} />
      </div>

      <h1 className="mt-3.5 text-[26px] font-bold text-ink sm:text-[34px]">{concept.title}</h1>

      {/* Language toggle — same global state used sitewide, just an in-context control */}
      <div className="mt-5 inline-flex gap-1 rounded-xl bg-line-soft p-1">
        <button
          onClick={() => setLang('en')}
          className={`rounded-lg px-4 py-2 text-[13px] font-bold ${uiLang === 'en' ? 'bg-card text-ink shadow-sm' : 'text-muted'}`}
        >
          English
        </button>
        <button
          onClick={() => setLang('hi')}
          className={`rounded-lg px-4 py-2 text-[13px] font-semibold ${uiLang === 'hi' ? 'bg-card text-ink shadow-sm' : 'text-muted'}`}
        >
          हिंग्लिश
        </button>
      </div>
      {!hasHinglish && uiLang === 'hi' && (
        <p className="mt-1.5 text-xs text-muted">(English only for this concept)</p>
      )}

      {/* Explanation */}
      <div className="prose-content mt-6 text-[15.5px] leading-[1.75] text-ink-soft">{explanation}</div>

      {/* Daily-life example — own coloured block, visually distinct (USP) */}
      {concept.dailyLifeExample && (
        <div className="lv-card my-6 flex gap-3.5 p-5" style={{ background: 'linear-gradient(155deg,var(--color-amber-tint),var(--color-card))', borderColor: 'var(--color-amber-tint-2)' }}>
          <div className="shrink-0 text-2xl">🪔</div>
          <div>
            <div className="text-[13px] font-bold uppercase tracking-wide text-amber-ink">{t('reader.dailyExample')}</div>
            <p className="prose-content mt-1.5 text-[14.5px] leading-[1.6] text-ink-soft">
              {concept.dailyLifeExample}
            </p>
          </div>
        </div>
      )}

      {/* Code — runnable playground for JS/HTML, static block otherwise */}
      {concept.codeExample && (
        <div className="my-6">
          <h2 className="mb-3 text-lg font-bold text-ink">{t('reader.codeExample')}</h2>
          {RUNNABLE.has(concept.codeLanguage) ? (
            <CodePlayground code={concept.codeExample} language={concept.codeLanguage} />
          ) : (
            <CodeBlock code={concept.codeExample} language={concept.codeLanguage} />
          )}
        </div>
      )}

      {/* Key points */}
      {concept.keyPoints?.length > 0 && (
        <div className="lv-card my-6 p-5">
          <h2 className="mb-3 text-lg font-bold text-ink">{t('reader.keyPoints')}</h2>
          <ul className="space-y-2 text-[15px] text-ink-soft">
            {concept.keyPoints.map((k, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-brand">→</span>
                <span>{k}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quiz */}
      <div className="my-6">
        <Quiz
          conceptId={concept._id}
          quiz={concept.quiz}
          onPassed={(reward) =>
            showToast(`Quiz passed! +${reward.gained} XP 🎉`)
          }
        />
      </div>

      {/* Mark done */}
      <div className="my-6 flex flex-col items-start gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        {done ? (
          <span className="inline-flex items-center gap-2 font-semibold text-accent-green-ink">
            {t('reader.completed')}
          </span>
        ) : (
          <button
            onClick={markDone}
            disabled={marking}
            className="lv-btn disabled:opacity-50"
            style={{ background: 'var(--color-accent-green)', color: '#fff' }}
          >
            {marking ? t('reader.saving') : `${t('reader.markDone')} (+${concept.xpReward || 10} XP)`}
          </button>
        )}
        {!session?.user && (
          <span className="text-sm text-muted">
            <Link href="/login" className="font-semibold text-brand underline">
              {t('nav.login')}
            </Link>{' '}
            {t('reader.loginToSave')}
          </span>
        )}
      </div>

      {/* Interview questions linked to this concept */}
      {concept.interviewQuestions?.length > 0 && (
        <div className="my-6">
          <div className="flex items-center gap-2 text-[13.5px] font-bold text-brand-dark">{t('reader.interviewHeading')}</div>
          <div className="mt-3 space-y-2.5">
            {concept.interviewQuestions.map((q) => (
              <details key={q._id} className="lv-card p-4">
                <summary className="cursor-pointer font-semibold text-ink">{q.question}</summary>
                <p className="prose-content mt-3 text-sm text-ink-soft">
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
      <div id="discussion">
        <CommentsSection conceptId={concept._id} />
      </div>
    </article>
  );
}
