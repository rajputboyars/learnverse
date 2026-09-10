'use client';

import { useEffect, useState } from 'react';
import Icon from '../Icon';
import { useLang } from '../LanguageProvider';
import { readStore, useTx, writeStore } from './useTx';
import { highlightLine } from '@/lib/highlight';

export const CHALLENGE_STORE = 'jahia:challenges';

/**
 * Fill-in-the-blank challenge with instant feedback and progressive hints.
 *
 *   challenge = { prompt, code: '- title (____)', options, answer, explanation,
 *                 language, hints: ['think about…', '…', 'try …'] }
 *
 * Hints unlock one at a time; "Show solution" appears only after the last
 * hint. Solved challenges are remembered in this browser (the course hub
 * counts them); quizzes remain the server-graded part of progress.
 */
export default function Challenge({ challenge, id }) {
  const { pick } = useLang();
  const tx = useTx();
  const [choice, setChoice] = useState(null);
  const [solvedBefore, setSolvedBefore] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setSolvedBefore(Boolean(readStore(CHALLENGE_STORE, {})[id]));
  }, [id]);

  if (!challenge) return null;
  const language = challenge.language || 'cnd';
  const hints = challenge.hints || [];
  const answered = choice !== null;
  const correct = answered && choice === challenge.answer;

  function pickOption(i) {
    setChoice(i);
    if (i === challenge.answer && !revealed) {
      const all = readStore(CHALLENGE_STORE, {});
      all[id] = true;
      writeStore(CHALLENGE_STORE, all);
      setSolvedBefore(true);
    }
  }

  const filled = answered ? challenge.options[choice] : '____';

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white">
          <Icon name="puzzle" className="h-4 w-4 text-indigo-600" />
        </span>
        <div className="flex flex-1 flex-col gap-1">
          <p className="font-bold">{tx(challenge.prompt)}</p>
          {solvedBefore && (
            <p className="flex items-center gap-1.5 text-xs font-semibold text-green-700">
              <Icon name="check-circle" className="h-3 w-3" /> {pick('Pehle solve kar chuke ho', 'Solved before')}
            </p>
          )}
        </div>
      </div>

      <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 font-mono text-[13px] leading-relaxed text-slate-100">
        {challenge.code.split('\n').map((line, i) => {
          if (!line.includes('____')) {
            return <span key={i} className="block whitespace-pre">{highlightLine(line, language)}</span>;
          }
          const [before, after] = line.split('____');
          return (
            <span key={i} className="block whitespace-pre">
              {highlightLine(before, language)}
              <span className={`rounded px-1 font-bold ${!answered ? 'bg-slate-700 text-amber-300' : correct ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{filled}</span>
              {highlightLine(after, language)}
            </span>
          );
        })}
      </pre>

      <div className="flex flex-wrap gap-2">
        {challenge.options.map((opt, i) => {
          const isPicked = choice === i;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => pickOption(i)}
              disabled={answered && correct}
              className={`rounded-lg border px-3.5 py-2 font-mono text-sm font-semibold transition ${
                isPicked && correct
                  ? 'border-green-300 bg-green-50 text-green-700'
                  : isPicked && !correct
                    ? 'border-red-300 bg-red-50 text-red-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {!correct && (hints.length > 0 || answered) && (
        <div className="flex flex-col gap-2">
          {hints.slice(0, hintsShown).map((h, i) => (
            <p key={i} className="rounded-xl bg-white px-3.5 py-2.5 text-sm text-slate-700">
              <b className="text-amber-700">Hint {i + 1}: </b>
              {tx(h)}
            </p>
          ))}
          <div className="flex flex-wrap gap-2">
            {hintsShown < hints.length && (
              <button type="button" onClick={() => setHintsShown((n) => n + 1)} className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                💡 {pick(`Hint ${hintsShown + 1} dikhao`, `Show hint ${hintsShown + 1}`)}
              </button>
            )}
            {hintsShown >= hints.length && !revealed && (
              <button type="button" onClick={() => setRevealed(true)} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                {pick('Solution dikhao', 'Show solution')}
              </button>
            )}
          </div>
          {revealed && (
            <p className="rounded-xl bg-white px-3.5 py-2.5 text-sm text-slate-700">
              <b>{pick('Solution: ', 'Solution: ')}</b>
              <span className="font-mono">{challenge.options[challenge.answer]}</span>
              {challenge.explanation && <> — {tx(challenge.explanation)}</>}
            </p>
          )}
        </div>
      )}

      {answered && (
        <div className={`flex flex-col gap-1 rounded-xl p-3.5 text-sm ${correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`} role="status">
          <p className="font-bold">{correct ? pick('Sahi jawab!', 'Correct!') : pick('Nahi — ek baar aur try karo.', 'Not quite — try another option.')}</p>
          {correct && challenge.explanation && <p>{tx(challenge.explanation)}</p>}
        </div>
      )}
    </div>
  );
}
