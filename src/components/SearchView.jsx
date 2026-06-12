'use client';

import Link from 'next/link';
import { useLang } from './LanguageProvider';

export default function SearchView({ q, concepts, questions }) {
  const { pick } = useLang();
  const total = concepts.length + questions.length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">{pick('Search', 'Search')}</h1>

      <form action="/search" className="mt-6">
        <input
          name="q"
          defaultValue={q}
          autoFocus
          placeholder={pick(
            'Concepts, interview questions search karo… (jaise closure, flexbox)',
            'Search concepts, interview questions… (e.g. closure, flexbox)'
          )}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400"
        />
      </form>

      {!q ? (
        <p className="mt-8 text-slate-500">
          {pick('Kuch type karo — saare courses mein search hoga.', 'Type something to search across all courses.')}
        </p>
      ) : (
        <>
          <p className="mt-6 text-sm text-slate-500">
            {total} {pick('result', total === 1 ? 'result' : 'results')} {pick('iske liye', 'for')} &ldquo;{q}&rdquo;
          </p>

          {concepts.length > 0 && (
            <section className="mt-6">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{pick('Concepts', 'Concepts')}</h2>
              <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
                {concepts.map((c) => (
                  <Link key={c.id} href={`/concepts/${c.slug}`} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50">
                    <span className="font-medium">{c.title}</span>
                    <span className="flex items-center gap-2 text-xs text-slate-400">
                      {c.course && <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-indigo-600">{c.course.icon} {c.course.title}</span>}
                      <span className="capitalize">{c.difficulty}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {questions.length > 0 && (
            <section className="mt-6">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{pick('Interview Questions', 'Interview Questions')}</h2>
              <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
                {questions.map((qn) => (
                  <Link key={qn.id} href={qn.course ? `/interview-questions?course=${qn.course.slug}` : '/interview-questions'} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50">
                    <span>{qn.question}</span>
                    {qn.course && <span className="shrink-0 rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-600">{qn.course.icon}</span>}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {total === 0 && (
            <p className="mt-8 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
              {pick('Kuch nahi mila. Doosre keywords try karo.', 'Nothing found. Try different keywords.')}
            </p>
          )}
        </>
      )}
    </div>
  );
}
