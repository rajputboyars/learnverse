'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { useLang } from '@/components/LanguageProvider';

/**
 * The cards the feed is made of. Each one is a single idea with one obvious
 * thing to do — the shape that makes a feed scrollable — but the thing to do is
 * always learning, not liking.
 */

const CARD = 'rounded-2xl border border-slate-200 bg-white p-5';

/* ── A concept, with one question you can answer without leaving the feed ── */
export function ConceptCard({ item, onOpenQuiz }) {
  const { lang } = useLang();
  // The card follows the header's language switch. Only the Hinglish side
  // carries the daily-life example, because that field is written in Hinglish.
  const hinglish = lang === 'hi';
  const teaser = hinglish ? item.teaser.hinglish || item.teaser.english : item.teaser.english || item.teaser.hinglish;
  const showExampleLabel = hinglish && item.hasDailyLifeExample;

  const [choice, setChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);

  async function check(index) {
    if (result) return; // answered already
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
        onOpenQuiz?.(body.correct);
      }
    } catch {
      setChoice(null);
    } finally {
      setChecking(false);
    }
  }

  return (
    <article className={CARD}>
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {item.course && (
          <Link href={`/courses/${item.course.slug}`} className="flex items-center gap-1.5 font-medium text-slate-600 hover:text-indigo-600">
            <Icon name={item.course.icon} brand className="h-3.5 w-3.5" />
            {item.course.title}
          </Link>
        )}
        <span className="rounded-full border border-slate-200 px-2 py-0.5 capitalize text-slate-500">
          {item.difficulty}
        </span>
        {item.read && (
          <span className="rounded-full border border-green-300 bg-green-50 px-2 py-0.5 font-medium text-green-800">
            <Icon name="check" className="mr-1 h-2.5 w-2.5" />done
          </span>
        )}
      </div>

      <h2 className="mt-3 text-lg font-bold">
        <Link href={`/concepts/${item.slug}`} className="hover:text-indigo-600">{item.title}</Link>
      </h2>

      {teaser && (
        <p className="prose-content mt-2 text-[15px] leading-relaxed text-slate-600">
          {showExampleLabel && (
            <span className="mr-1.5 font-semibold text-amber-600">Real-life example —</span>
          )}
          {teaser}
          {teaser.length >= 260 && '…'}
        </p>
      )}

      {!!item.keyPoints.length && (
        <ul className="mt-3 space-y-1.5">
          {item.keyPoints.map((p, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-600">
              <Icon name="circle-dot" className="mt-1.5 h-2 w-2 shrink-0 text-indigo-400" />
              {p}
            </li>
          ))}
        </ul>
      )}

      {/* The hook: one question, answerable in place. */}
      {item.quickQuestion && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold">{item.quickQuestion.question}</p>
          <div className="mt-3 grid gap-2">
            {item.quickQuestion.options.map((option, i) => {
              const isChoice = choice === i;
              const isAnswer = result && i === result.correctIndex;
              const wrongPick = result && isChoice && !result.correct;
              return (
                <button
                  key={i}
                  onClick={() => check(i)}
                  disabled={Boolean(result) || checking}
                  className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                    isAnswer
                      ? 'border-green-400 bg-green-50 font-medium text-green-900'
                      : wrongPick
                        ? 'border-red-300 bg-red-50 text-red-800'
                        : 'border-slate-200 bg-white hover:border-indigo-300'
                  } ${result ? '' : 'cursor-pointer'}`}
                >
                  {option}
                  {isAnswer && <Icon name="check" className="ml-2 h-3 w-3" />}
                  {wrongPick && <Icon name="x" className="ml-2 h-3 w-3" />}
                </button>
              );
            })}
          </div>

          {result && (
            <div className="mt-3">
              <p className={`text-sm font-semibold ${result.correct ? 'text-green-700' : 'text-slate-700'}`}>
                {result.correct ? 'Correct.' : 'Not quite.'}
              </p>
              {result.explanation && (
                <p className="mt-1 text-sm text-slate-600">{result.explanation}</p>
              )}
              <Link
                href={`/concepts/${item.slug}`}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                {result.correct ? 'Read the full concept' : 'Learn why'}
                <Icon name="arrow-right" className="h-3 w-3" />
              </Link>
              <span className="ml-2 text-xs text-slate-400">XP is earned on the concept page</span>
            </div>
          )}
        </div>
      )}

      {!item.quickQuestion && (
        <Link
          href={`/concepts/${item.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:underline"
        >
          Read it <Icon name="arrow-right" className="h-3 w-3" />
        </Link>
      )}
    </article>
  );
}

/* ── Someone else keeping a streak ── */
export function MilestoneCard({ item }) {
  return (
    <article className={`${CARD} border-amber-200 bg-amber-50`}>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber-200 text-amber-800">
          <Icon name="fire" className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-amber-900">
            {item.isYou ? 'You are' : `${item.name} is`} on a {item.streak}-day streak
          </p>
          <p className="mt-0.5 text-sm text-amber-800">
            Level {item.level} · {item.conceptsCompleted} concepts completed
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm text-amber-800">
        {item.isYou
          ? 'Keep it going — one concept today is enough to hold it.'
          : 'Streaks are held one day at a time. Yours counts the same as theirs.'}
      </p>
      <Link href="/leaderboard" className="mt-3 inline-block text-sm font-semibold text-amber-900 hover:underline">
        See the leaderboard <Icon name="arrow-right" className="h-3 w-3" />
      </Link>
    </article>
  );
}

/* ── A prompt from the library ── */
export function PromptCard({ item }) {
  return (
    <article className={CARD}>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-indigo-600">
        <Icon name="sparkles" className="h-3 w-3" />
        Prompt worth trying
      </p>
      <h2 className="mt-2 text-lg font-bold">
        <Link href={`/prompts/${item.slug}`} className="hover:text-indigo-600">{item.title}</Link>
      </h2>
      <p className="mt-1 text-sm text-slate-600">{item.description}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span className="rounded-full border border-slate-200 px-2 py-0.5 capitalize">{item.category}</span>
        <span className="rounded-full border border-slate-200 px-2 py-0.5 capitalize">{item.difficulty}</span>
        {item.usageCount > 0 && <span>{item.usageCount} runs</span>}
      </div>
      <Link
        href={`/prompts/${item.slug}`}
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-semibold hover:bg-slate-50"
      >
        <Icon name="play" className="h-3 w-3" />Run this prompt
      </Link>
    </article>
  );
}

/* ── An AI action, inline ── */
export function ActionCard({ item, onRun }) {
  return (
    <article className={`${CARD} border-indigo-200 bg-indigo-50`}>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-indigo-700">
        <Icon name={item.icon} className="h-3 w-3" />
        One click
      </p>
      <h2 className="mt-2 text-lg font-bold text-indigo-950">{item.title}</h2>
      <button
        onClick={() => onRun(item.templateId)}
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        {item.cta}
        <Icon name="arrow-right" className="h-3 w-3" />
      </button>
    </article>
  );
}
