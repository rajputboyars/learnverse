'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '../Icon';
import CodeBlock from '../concept/CodeBlock';
import { useLang } from '../LanguageProvider';
import { useTx } from './useTx';
import FlowDiagram from './FlowDiagram';
import WhereIsThis from './WhereIsThis';
import CourseScreenshot from './CourseScreenshot';
import PerspectiveTabs from './PerspectiveTabs';
import CodeResult from './CodeResult';
import { StepList, ExpectedResult } from './LessonChecklist';
import Challenge from './Challenge';
import DebugCard from './DebugCard';
import Lab from './Lab';

// The hands-on half of a Jahia lesson, in the course's fixed order:
// LEARN (build, objectives) → SEE (where, screenshots, three views) →
// DO (steps) → CODE (files, CND vs CMS) → TEST (expected) → DEBUG (mistakes,
// debugging) → BUILD (challenge). Every block is optional.
const SECTIONS = [
  { id: 'lesson-prereq', key: 'prerequisites', icon: 'list-check', en: 'Before you start', hi: 'Shuru karne se pehle' },
  { id: 'lesson-build', key: 'build', icon: 'rocket', en: "What you'll build", hi: 'Kya banaoge' },
  { id: 'lesson-objectives', key: 'objectives', icon: 'target', en: "What you'll learn", hi: 'Kya seekhoge' },
  { id: 'lesson-why', key: 'why', icon: 'lightbulb', en: 'Why it matters', hi: 'Kyun zaroori hai' },
  { id: 'lesson-where', key: 'where', icon: 'location-dot', en: 'Where do I find this?', hi: 'Ye kahan milega?' },
  { id: 'lesson-see', key: 'screenshots', icon: 'eye', en: 'What does it look like?', hi: 'Dikhta kaisa hai?' },
  { id: 'lesson-cards', key: 'cards', icon: 'users', en: 'Explore', hi: 'Explore karo' },
  { id: 'lesson-views', key: 'views', icon: 'layers', en: 'Three perspectives', hi: 'Teen nazariye' },
  { id: 'lesson-behind', key: 'behind', icon: 'gem', en: 'What happens behind the scenes', hi: 'Parde ke peeche kya hota hai' },
  { id: 'lesson-try', key: 'steps', icon: 'hand-point-up', en: 'Try it yourself', hi: 'Khud karke dekho' },
  { id: 'lesson-code', key: 'files', icon: 'code', en: 'Code', hi: 'Code' },
  { id: 'lesson-cms', key: 'cmsVsCode', icon: 'sliders', en: 'CND → CMS field', hi: 'CND → CMS field' },
  { id: 'lesson-result', key: 'codeResult', icon: 'eye', en: 'Code → what you see', hi: 'Code → kya dikhta hai' },
  { id: 'lesson-lab', key: 'lab', icon: 'flask', en: 'Lab', hi: 'Lab' },
  { id: 'lesson-table', key: 'table', icon: 'table', en: 'Comparison', hi: 'Comparison' },
  { id: 'lesson-expected', key: 'expected', icon: 'check-circle', en: 'Expected result', hi: 'Expected result' },
  { id: 'lesson-mistakes', key: 'mistakes', icon: 'warning', en: 'Common mistakes', hi: 'Common galtiyan' },
  { id: 'lesson-debug', key: 'debug', icon: 'bug', en: 'Debugging', hi: 'Debugging' },
  { id: 'lesson-challenge', key: 'challenge', icon: 'puzzle', en: 'Mini challenge', hi: 'Mini challenge' },
  { id: 'lesson-summary', key: 'summary', icon: 'list-check', en: 'Summary', hi: 'Summary' },
];

// "Ask the AI tutor" — opens the Explain-a-Topic tool; the tutor explains,
// it does not do the lab for you.
function Tutor({ topic }) {
  const { pick } = useLang();
  const q = encodeURIComponent(topic || '');
  return (
    <div className="mt-8 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4">
      <Icon name="robot" className="h-4 w-4 text-indigo-600" />
      <span className="mr-auto text-sm font-semibold">{pick('AI tutor se poocho', 'Ask the AI tutor')}</span>
      {[
        { en: 'Explain simply', hi: 'Aasaan bhasha mein' },
        { en: 'Explain professionally', hi: 'Interview level pe' },
        { en: 'Generate practice', hi: 'Practice banao' },
      ].map((a) => (
        <Link key={a.en} href={`/ai?tab=learning&topic=${q}`} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-indigo-300">
          {pick(a.hi, a.en)}
        </Link>
      ))}
    </div>
  );
}

function present(lesson, key) {
  const v = lesson?.[key];
  return Array.isArray(v) ? v.length > 0 : Boolean(v);
}

/** Anchors for the "On this page" rail. */
export function lessonAnchors(lesson) {
  return SECTIONS.filter((s) => present(lesson, s.key));
}

function Section({ s, children, title }) {
  const { pick } = useLang();
  return (
    <section id={s.id} className="mt-8 scroll-mt-32">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
        <Icon name={s.icon} className="h-4 w-4 text-indigo-600" />
        {title || pick(s.hi, s.en)}
      </h2>
      {children}
    </section>
  );
}

/** Pick one card from a set (roles, apps, tools) and read about it. */
function CardPicker({ cards }) {
  const tx = useTx();
  const [active, setActive] = useState(0);
  const item = cards.items[active];
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {cards.title && <p className="border-b border-slate-100 px-4 py-3 text-sm font-bold">{tx(cards.title)}</p>}
      <div className="flex gap-1.5 overflow-x-auto border-b border-slate-100 bg-slate-50 p-2">
        {cards.items.map((c, i) => (
          <button
            key={c.label}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
              active === i ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Icon name={c.icon || 'circle'} className="h-3.5 w-3.5" />
            {c.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <p className="text-[15px] leading-relaxed text-slate-700">{tx(item.summary)}</p>
        {item.does?.length > 0 && (
          <ul className="flex flex-col gap-1.5">
            {item.does.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <Icon name="check" className="mt-1 h-3 w-3 shrink-0 text-green-600" />
                <span>{tx(d)}</span>
              </li>
            ))}
          </ul>
        )}
        {item.tools?.length > 0 && (
          <p className="flex flex-wrap gap-1.5">
            {item.tools.map((t) => (
              <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{t}</span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}

export default function CourseLesson({ lesson, conceptId }) {
  const { pick } = useLang();
  const tx = useTx();
  if (!lesson) return null;
  const on = (key) => present(lesson, key);
  const S = Object.fromEntries(SECTIONS.map((s) => [s.key, s]));

  return (
    <div className="course-lesson">
      {on('prerequisites') && (
        <Section s={S.prerequisites}>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-3 md:grid-cols-2">
            {lesson.prerequisites.map((p) => (
              <div key={p.title} className="flex flex-col gap-2.5 rounded-2xl border border-slate-200 bg-white p-4">
                <p className="flex items-center gap-2 font-bold">
                  <Icon name={p.icon || 'book'} brand className="h-4 w-4" />
                  {p.title}
                </p>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{pick('Tumhe aana chahiye', 'You should know')}</p>
                  <ul className="mt-1 flex flex-col gap-1">
                    {p.know.map((k, i) => (
                      <li key={i} className="flex gap-2 text-sm text-slate-700">
                        <span className="text-indigo-600">•</span>
                        {tx(k)}
                      </li>
                    ))}
                  </ul>
                </div>
                {p.refresher && (
                  <p className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                    <b className="text-slate-700">{pick('Quick refresher: ', 'Quick refresher: ')}</b>
                    {tx(p.refresher)}
                  </p>
                )}
                {p.link && (
                  <Link href={p.link.href} className="mt-auto text-sm font-semibold text-indigo-600 hover:underline">
                    {p.link.label} <Icon name="arrow-right" className="h-3 w-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <p className="mb-2 text-sm font-bold">{pick('Prerequisite checklist', 'Prerequisite checklist')}</p>
            <StepList steps={lesson.prerequisites.map((p) => ({ title: `I'm comfortable with ${p.title}` }))} storageKey={`${conceptId}:prereq`} />
          </div>
        </Section>
      )}

      {on('build') && (
        <Section s={S.build}>
          <div className="flex flex-col gap-3">
            {lesson.build.text && <p className="text-[15.5px] leading-relaxed text-slate-700">{tx(lesson.build.text)}</p>}
            {lesson.build.flow && <FlowDiagram flow={lesson.build.flow} />}
          </div>
        </Section>
      )}

      {on('objectives') && (
        <Section s={S.objectives}>
          <ul className="grid grid-cols-[minmax(0,1fr)] gap-2 sm:grid-cols-2">
            {lesson.objectives.map((o, i) => (
              <li key={i} className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700">
                <Icon name="target" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-600" />
                {tx(o)}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {on('why') && (
        <Section s={S.why}>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-2 sm:grid-cols-2">
            {(Array.isArray(lesson.why) ? lesson.why : [lesson.why]).map((w, i) => (
              <p key={i} className="rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-sm leading-relaxed text-amber-900">{tx(w)}</p>
            ))}
          </div>
        </Section>
      )}

      {on('where') && (
        <Section s={S.where}>
          <WhereIsThis where={lesson.where} />
        </Section>
      )}

      {on('screenshots') && (
        <Section s={S.screenshots}>
          <div className="flex flex-col gap-4">
            {lesson.screenshots.map((shot, i) => (
              <CourseScreenshot key={i} shot={shot} />
            ))}
          </div>
        </Section>
      )}

      {on('cards') && (
        <Section s={S.cards} title={lesson.cards.heading ? tx(lesson.cards.heading) : undefined}>
          <CardPicker cards={lesson.cards} />
        </Section>
      )}

      {on('views') && (
        <Section s={S.views}>
          <PerspectiveTabs views={lesson.views} />
        </Section>
      )}

      {on('behind') && (
        <Section s={S.behind}>
          <FlowDiagram flow={lesson.behind} />
        </Section>
      )}

      {on('steps') && (
        <Section s={S.steps}>
          <StepList steps={lesson.steps} storageKey={conceptId} />
        </Section>
      )}

      {on('files') && (
        <Section s={S.files}>
          <div className="flex flex-col gap-5">
            {lesson.files.map((f, i) => (
              <div key={i} className="flex flex-col gap-2">
                {f.path && (
                  <p className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                    <Icon name="location-dot" className="h-3 w-3 text-indigo-600" />
                    <span className="font-mono">{f.path}</span>
                  </p>
                )}
                <CodeBlock code={f.code} language={f.language || 'text'} filename={f.filename} highlight={f.highlight} lineNumbers />
                {f.explain && <p className="text-sm leading-relaxed text-slate-600">{tx(f.explain)}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {on('cmsVsCode') && (
        <Section s={S.cmsVsCode}>
          <CodeResult rows={lesson.cmsVsCode} />
        </Section>
      )}

      {on('codeResult') && (
        <Section s={S.codeResult}>
          <CodeResult
            rows={lesson.codeResult.rows || lesson.codeResult}
            language={lesson.codeResult.language}
            filename={lesson.codeResult.filename}
            codeLabel={lesson.codeResult.codeLabel}
            resultLabel={lesson.codeResult.resultLabel}
          />
        </Section>
      )}

      {on('lab') && (
        <Section s={S.lab} title={lesson.lab.title ? tx(lesson.lab.title) : undefined}>
          <Lab lab={lesson.lab} id={conceptId} />
        </Section>
      )}

      {on('table') && (
        <Section s={S.table} title={lesson.table.title ? tx(lesson.table.title) : undefined}>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
                <tr>
                  {lesson.table.columns.map((c) => (
                    <th key={c} className="px-4 py-2.5 font-bold">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lesson.table.rows.map((row, i) => (
                  <tr key={i} className="border-t border-slate-100">
                    {row.map((cell, j) => (
                      <td key={j} className={`px-4 py-2.5 ${j === 0 ? 'font-semibold text-slate-800' : 'text-slate-600'} ${j === row.length - 1 ? 'font-mono text-[13px]' : ''}`}>
                        {tx(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {on('expected') && (
        <Section s={S.expected}>
          <ExpectedResult expected={lesson.expected} />
        </Section>
      )}

      {on('mistakes') && (
        <Section s={S.mistakes}>
          <div className="flex flex-col gap-2">
            {lesson.mistakes.map((m, i) => (
              <details key={i} className="group rounded-2xl border border-slate-200 bg-white p-4 sm:px-5">
                <summary className="flex cursor-pointer items-start gap-3 font-semibold">
                  <Icon name="warning" className="mt-1 h-3.5 w-3.5 shrink-0 text-amber-600" />
                  <span className="flex-1">{m.wrong ? <>❌ {tx(m.wrong)}</> : tx(m.title)}</span>
                  <Icon name="chevron-down" className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-400 transition group-open:rotate-180" />
                </summary>
                <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-600">
                  {m.detail && <p>{tx(m.detail)}</p>}
                  {m.why && (
                    <p>
                      <b className="text-slate-700">{pick('Kyun? ', 'Why? ')}</b>
                      {tx(m.why)}
                    </p>
                  )}
                  {m.wrongCode && <CodeBlock code={m.wrongCode} language={m.language || 'javascript'} filename="❌ wrong" />}
                  {m.right && (
                    <p className="rounded-lg bg-green-50 px-3 py-2 text-green-800">
                      <b>✅ {pick('Sahi: ', 'Correct: ')}</b>
                      {tx(m.right)}
                    </p>
                  )}
                  {m.rightCode && <CodeBlock code={m.rightCode} language={m.language || 'javascript'} filename="✅ correct" />}
                  {m.fix && (
                    <p className="rounded-lg bg-green-50 px-3 py-2 text-green-800">
                      <b>Fix: </b>
                      {tx(m.fix)}
                    </p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </Section>
      )}

      {on('debug') && (
        <Section s={S.debug}>
          <div className="flex flex-col gap-3">
            {lesson.debug.map((d, i) => (
              <DebugCard key={i} item={d} />
            ))}
          </div>
        </Section>
      )}

      {on('challenge') && (
        <Section s={S.challenge}>
          <Challenge challenge={lesson.challenge} id={conceptId} />
        </Section>
      )}

      {on('summary') && (
        <Section s={S.summary}>
          <ul className="flex flex-col gap-1.5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            {lesson.summary.map((s, i) => (
              <li key={i} className="flex gap-2.5 text-[15px] text-slate-700">
                <Icon name="check" className="mt-1.5 h-3 w-3 shrink-0 text-green-600" />
                {tx(s)}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {lesson.tutor !== false && <Tutor topic={lesson.tutorTopic || lesson.module} />}
    </div>
  );
}
