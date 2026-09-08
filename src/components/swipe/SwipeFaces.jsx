'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { useLang } from '@/components/LanguageProvider';

/* ── Concept face: one idea, its desi example, and the points worth keeping ── */
export function ConceptFace({ item }) {
  const { lang } = useLang();
  const hinglish = lang === 'hi';
  const teaser = hinglish ? item.teaser.hinglish || item.teaser.english : item.teaser.english || item.teaser.hinglish;
  const showExampleLabel = hinglish && item.hasDailyLifeExample;

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {item.course && (
          <span className="flex items-center gap-1.5 font-medium text-slate-600">
            <Icon name={item.course.icon} brand className="h-3.5 w-3.5" />
            {item.course.title}
          </span>
        )}
        <span className="rounded-full border border-slate-200 px-2 py-0.5 capitalize text-slate-500">
          {item.difficulty}
        </span>
        {item.read && (
          <span className="rounded-full border border-green-300 bg-green-50 px-2 py-0.5 font-medium text-green-800">
            done
          </span>
        )}
      </div>

      <h2 className="mt-3 text-2xl font-bold leading-tight">{item.title}</h2>

      {teaser && (
        <p className="prose-content mt-3 text-[15px] leading-relaxed text-slate-600">
          {showExampleLabel && (
            <span className="mr-1.5 font-semibold text-amber-600">Real-life example —</span>
          )}
          {teaser}
          {teaser.length >= 260 && '…'}
        </p>
      )}

      {!!item.keyPoints.length && (
        <ul className="mt-4 space-y-2">
          {item.keyPoints.map((p, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-700">
              <Icon name="circle-dot" className="mt-1.5 h-2 w-2 shrink-0 text-indigo-400" />
              {p}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-5">
        <Link
          href={`/concepts/${item.slug}`}
          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Read it properly <Icon name="arrow-right" className="h-3 w-3" />
        </Link>
        <p className="mt-2 text-xs text-slate-400">Opens the full concept — that is where XP is earned.</p>
      </div>
    </div>
  );
}

/* ── Quiz face: the question first, the concept only after you commit ── */
export function QuizFace({ item, onAnswered }) {
  const [choice, setChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);

  async function check(index) {
    if (result || checking) return;
    setChoice(index);
    setChecking(true);
    try {
      const res = await fetch('/api/feed/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conceptId: item.id, answer: index }),
      });
      const body = await res.json();
      if (res.ok) {
        setResult(body);
        onAnswered?.(body.correct);
      }
    } catch {
      setChoice(null);
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {item.course && (
          <span className="flex items-center gap-1.5 font-medium text-slate-600">
            <Icon name={item.course.icon} brand className="h-3.5 w-3.5" />
            {item.course.title}
          </span>
        )}
        <span className="rounded-full border border-slate-200 px-2 py-0.5 capitalize text-slate-500">
          {item.difficulty}
        </span>
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-indigo-600">
        {item.title}
      </p>
      <h2 className="mt-1.5 text-xl font-bold leading-snug">{item.quickQuestion.question}</h2>

      <div className="mt-4 grid gap-2">
        {item.quickQuestion.options.map((option, i) => {
          const isChoice = choice === i;
          const isAnswer = result && i === result.correctIndex;
          const wrongPick = result && isChoice && !result.correct;
          return (
            <button
              key={i}
              onClick={() => check(i)}
              disabled={Boolean(result) || checking}
              className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                isAnswer
                  ? 'border-green-400 bg-green-50 font-medium text-green-900'
                  : wrongPick
                    ? 'border-red-300 bg-red-50 text-red-800'
                    : 'border-slate-200 bg-white hover:border-indigo-300'
              }`}
            >
              {option}
              {isAnswer && <Icon name="check" className="ml-2 h-3 w-3" />}
              {wrongPick && <Icon name="x" className="ml-2 h-3 w-3" />}
            </button>
          );
        })}
      </div>

      {result && (
        <div className="mt-4">
          <p className={`text-sm font-semibold ${result.correct ? 'text-green-700' : 'text-slate-700'}`}>
            {result.correct ? 'Correct.' : 'Not quite.'}
          </p>
          {result.explanation && <p className="mt-1 text-sm text-slate-600">{result.explanation}</p>}
        </div>
      )}

      <div className="mt-auto pt-5">
        {result ? (
          <Link
            href={`/concepts/${item.slug}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            {result.correct ? 'Read the full concept' : 'Learn why'}
            <Icon name="arrow-right" className="h-3 w-3" />
          </Link>
        ) : (
          <p className="text-xs text-slate-400">Pick an answer — or swipe on without guessing.</p>
        )}
      </div>
    </div>
  );
}
