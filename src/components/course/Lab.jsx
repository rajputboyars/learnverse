'use client';

import { useState } from 'react';
import Icon from '../Icon';
import CodeBlock from '../concept/CodeBlock';
import CodePlayground from '../concept/CodePlayground';
import { StepList, ExpectedResult } from './LessonChecklist';
import { useLang } from '../LanguageProvider';
import { useTx } from './useTx';

const RUNNABLE = new Set(['javascript', 'html']);

/**
 * A lab: Goal → Prerequisites → Starting code → Tasks → Hints → Expected
 * result → Solution → Common errors. The starting code is runnable in the
 * browser when the language allows (JavaScript / HTML); the solution stays
 * hidden until every hint has been offered.
 *
 *   lab = { goal, prerequisites: [], starter: { code, language, filename },
 *           tasks: [], hints: [], expected: { text, checks }, solution:
 *           { code, language, filename, explain }, errors: [{ title, fix }] }
 */
export default function Lab({ lab, id }) {
  const { pick } = useLang();
  const tx = useTx();
  const hints = lab.hints || [];
  const [hintsShown, setHintsShown] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const starter = lab.starter;

  const Label = ({ children }) => <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{children}</p>;

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-50">
          <Icon name="flask" className="h-4 w-4 text-indigo-600" />
        </span>
        <div className="flex flex-col gap-1">
          <Label>{pick('Goal', 'Goal')}</Label>
          <p className="font-semibold text-slate-800">{tx(lab.goal)}</p>
        </div>
      </div>

      {lab.prerequisites?.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <Label>{pick('Pehle se aana chahiye', 'Prerequisites')}</Label>
          <ul className="flex flex-wrap gap-1.5">
            {lab.prerequisites.map((p, i) => (
              <li key={i} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{tx(p)}</li>
            ))}
          </ul>
        </div>
      )}

      {starter && (
        <div className="flex flex-col gap-1.5">
          <Label>{pick('Starting code', 'Starting code')}</Label>
          {RUNNABLE.has(starter.language) ? (
            <CodePlayground code={starter.code} language={starter.language} />
          ) : (
            <CodeBlock code={starter.code} language={starter.language || 'text'} filename={starter.filename} lineNumbers />
          )}
        </div>
      )}

      {lab.tasks?.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <Label>{pick('Tasks', 'Tasks')}</Label>
          <StepList steps={lab.tasks} storageKey={`${id}:lab`} />
        </div>
      )}

      {hints.length > 0 && (
        <div className="flex flex-col gap-2">
          <Label>{pick('Hints', 'Hints')}</Label>
          {hints.slice(0, hintsShown).map((h, i) => (
            <p key={i} className="rounded-xl bg-amber-50 px-3.5 py-2.5 text-sm text-amber-900">
              <b>Hint {i + 1}: </b>
              {tx(h)}
            </p>
          ))}
          {hintsShown < hints.length && (
            <button type="button" onClick={() => setHintsShown((n) => n + 1)} className="self-start rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
              💡 {pick(`Hint ${hintsShown + 1} dikhao`, `Show hint ${hintsShown + 1}`)}
            </button>
          )}
        </div>
      )}

      {lab.expected && (
        <div className="flex flex-col gap-1.5">
          <Label>{pick('Expected result', 'Expected result')}</Label>
          <ExpectedResult expected={lab.expected} />
        </div>
      )}

      {lab.solution && (
        <div className="flex flex-col gap-1.5">
          <Label>{pick('Solution', 'Solution')}</Label>
          {showSolution ? (
            <>
              <CodeBlock code={lab.solution.code} language={lab.solution.language || starter?.language || 'text'} filename={lab.solution.filename} lineNumbers highlight={lab.solution.highlight} />
              {lab.solution.explain && <p className="text-sm leading-relaxed text-slate-600">{tx(lab.solution.explain)}</p>}
            </>
          ) : (
            <button
              type="button"
              onClick={() => setShowSolution(true)}
              disabled={hintsShown < hints.length}
              className="self-start rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-600 disabled:opacity-50"
              title={hintsShown < hints.length ? 'Try the hints first' : undefined}
            >
              {hintsShown < hints.length ? pick('Pehle hints try karo', 'Try the hints first') : pick('Solution dikhao', 'Show solution')}
            </button>
          )}
        </div>
      )}

      {lab.errors?.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <Label>{pick('Common errors', 'Common errors')}</Label>
          {lab.errors.map((e, i) => (
            <details key={i} className="group rounded-xl border border-slate-200 px-3.5 py-2.5">
              <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
                <Icon name="warning" className="h-3.5 w-3.5 text-amber-600" />
                <span className="flex-1 font-mono text-[13px]">{tx(e.title)}</span>
                <Icon name="chevron-down" className="h-3 w-3 text-slate-400 transition group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-sm text-slate-600">{tx(e.fix)}</p>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
