'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import CodeBlock from './CodeBlock';
import CodePlayground from './CodePlayground';
import CommentsSection from './CommentsSection';
import Reactions from './Reactions';
import ShareButtons from '../ShareButtons';
import Quiz from './Quiz';
import { useLang } from '../LanguageProvider';
import Icon from '../Icon';

const RUNNABLE = new Set(['javascript', 'html']);

// Roughly 200 words a minute, floored at one — a hint, not a promise.
function readingTime(text = '') {
  return Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));
}

// The article itself. Completion state and the mark-done action live in
// ConceptLayout, which renders them in the reading bar; this component keeps
// the reading.
export default function ConceptReader({ concept, done, marking, onMarkDone, showToast, lang, setLang }) {
  const { data: session } = useSession();
  const { t } = useLang();

  const hasHinglish = !!concept.explanation?.hinglish;
  const showHinglish = lang === 'hi' && hasHinglish;
  const explanation = showHinglish
    ? concept.explanation.hinglish
    : concept.explanation?.english || '';

  const minutes = readingTime(explanation);

  return (
    <article className="relative">

      {/* ══════════ Title block ══════════ */}
      <header className="flex flex-col gap-3.5">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold capitalize text-slate-600">
            {concept.difficulty}
          </span>
          {concept.tags?.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-500">
              #{tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl font-extrabold leading-[1.14] tracking-tight sm:text-[40px]">
          {concept.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Icon name="clock" className="h-3.5 w-3.5" />
            {minutes} min read
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="bolt" className="h-3.5 w-3.5" />
            +{concept.xpReward || 10} XP
          </span>
          {concept.interviewQuestions?.length > 0 && (
            <span className="flex items-center gap-1.5">
              <Icon name="briefcase" className="h-3.5 w-3.5" />
              {concept.interviewQuestions.length}{' '}
              {lang === 'hi'
                ? 'sawaal'
                : concept.interviewQuestions.length === 1
                  ? 'question'
                  : 'questions'}
            </span>
          )}
        </div>

        {/* Language: a real control, not a note. Bilingual reading is the point. */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5">
          <Icon name="globe" className="h-4 w-4 shrink-0 text-indigo-600" />
          <span className="text-sm text-slate-500">
            {hasHinglish
              ? lang === 'hi'
                ? 'Padho apni bhasha mein'
                : 'Read it in your own language'
              : lang === 'hi'
                ? 'Ye concept sirf English mein hai'
                : 'This concept is English only'}
          </span>
          {hasHinglish && (
            <span className="ml-auto flex gap-1 rounded-full bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  lang === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('hi')}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  lang === 'hi' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
              >
                Hinglish
              </button>
            </span>
          )}
        </div>
      </header>

      {/* ══════════ Explanation ══════════ */}
      <div id="explanation" className="prose-content mt-7 text-[17px] leading-[1.75] text-slate-700">
        {explanation}
      </div>

      {/* ══════════ Daily-life example ══════════ */}
      {concept.dailyLifeExample && (
        <section id="daily-example" className="mt-7 flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-100">
            <Icon name="lightbulb" className="h-4 w-4 text-amber-600" />
          </span>
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-700">
              {t('reader.dailyExample')}
            </h2>
            <p className="prose-content text-[15.5px] leading-[1.7] text-amber-900">
              {concept.dailyLifeExample}
            </p>
          </div>
        </section>
      )}

      {/* ══════════ Code ══════════ */}
      {concept.codeExample && (
        <section id="code-example" className="mt-7">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
            <Icon name="code" className="h-4 w-4 text-indigo-600" />
            {t('reader.codeExample')}
          </h2>
          {RUNNABLE.has(concept.codeLanguage) ? (
            <CodePlayground code={concept.codeExample} language={concept.codeLanguage} />
          ) : (
            <CodeBlock code={concept.codeExample} language={concept.codeLanguage} />
          )}
        </section>
      )}

      {/* ══════════ Key points ══════════ */}
      {concept.keyPoints?.length > 0 && (
        <section id="key-points" className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <Icon name="lightbulb" className="h-4 w-4 text-indigo-600" />
            {t('reader.keyPoints')}
          </h2>
          <ul className="flex flex-col gap-3">
            {concept.keyPoints.map((k, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-[1.65] text-slate-700">
                <span className="w-5 shrink-0 text-sm font-semibold text-indigo-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{k}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ══════════ Quiz ══════════ */}
      {concept.quiz?.length > 0 && (
        <section id="quiz" className="mt-7">
          <Quiz
            conceptId={concept._id}
            quiz={concept.quiz}
            onPassed={(reward) => showToast(`Quiz passed! +${reward.gained} XP`)}
          />
        </section>
      )}

      {/* ══════════ Completion ══════════ */}
      <section className="mt-7 flex flex-col items-start gap-4 rounded-2xl border border-green-200 bg-green-50 p-5 sm:flex-row sm:items-center sm:p-6">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-green-100">
          <Icon name={done ? 'check-circle' : 'check'} className="h-5 w-5 text-green-600" />
        </span>
        <div className="flex flex-1 flex-col gap-1">
          <p className="font-bold">
            {done
              ? t('reader.completed')
              : lang === 'hi'
                ? 'Padh liya? Mark kar do.'
                : 'Read it? Mark it done.'}
          </p>
          <p className="text-sm text-slate-600">
            {lang === 'hi'
              ? `+${concept.xpReward || 10} XP, streak zinda, aur course progress badhega.`
              : `+${concept.xpReward || 10} XP, your streak stays alive, and the course bar moves.`}
          </p>
        </div>
        {!done && (
          <button
            type="button"
            onClick={onMarkDone}
            disabled={marking}
            className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
          >
            {marking ? t('reader.saving') : t('reader.markDone')}
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
      </section>

      {/* ══════════ Interview questions ══════════ */}
      {concept.interviewQuestions?.length > 0 && (
        <section id="interview" className="mt-7">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
            <Icon name="briefcase" className="h-4 w-4 text-indigo-600" />
            {t('reader.interviewHeading')}
            <span className="ml-auto text-sm font-normal text-slate-400">
              {concept.interviewQuestions.length}
            </span>
          </h2>
          <div className="flex flex-col gap-2.5">
            {concept.interviewQuestions.map((q) => (
              <details key={q._id} className="group rounded-2xl border border-slate-200 bg-white p-4 sm:px-5">
                <summary className="flex cursor-pointer items-start gap-3 font-semibold">
                  <span className="flex-1">{q.question}</span>
                  <Icon
                    name="chevron-down"
                    className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-400 transition group-open:rotate-180"
                  />
                </summary>
                <p className="prose-content mt-3 border-t border-slate-100 pt-3 text-[15px] leading-[1.7] text-slate-600">
                  {showHinglish && q.answer?.hinglish ? q.answer.hinglish : q.answer?.english}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ Reactions + share ══════════ */}
      <div className="mt-7 flex flex-wrap items-center gap-4 border-y border-slate-200 py-4">
        <Reactions conceptId={concept._id} />
        <div className="ml-auto">
          <ShareButtons
            title={`${concept.title} — Learnverse`}
            text={`Check out "${concept.title}" on Learnverse`}
          />
        </div>
      </div>

      {/* ══════════ Discussion ══════════ */}
      <section id="discussion" className="mt-7">
        <CommentsSection conceptId={concept._id} />
      </section>
    </article>
  );
}
