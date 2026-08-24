'use client';

import Link from 'next/link';
import { useLang } from './LanguageProvider';
import SearchBox from './SearchBox';

const DIFFICULTY_LABEL = { easy: 'Beginner', medium: 'Intermediate', hard: 'Advanced' };
const SUGGESTIONS = ['Closures', 'Promises', 'Flexbox', 'JWT auth'];

function NotFoundIcon() {
  return (
    <svg width="88" height="88" viewBox="0 0 24 24" className="mx-auto">
      <circle cx="10.5" cy="10.5" r="7.5" fill="var(--color-line-soft)" />
      <circle cx="10.5" cy="10.5" r="4.2" fill="none" stroke="var(--color-muted-soft)" strokeWidth="1.6" />
      <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="var(--color-muted-soft)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M9 10.5h3M10.5 9v3" stroke="var(--color-paper)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function SearchView({ q, concepts, questions }) {
  const { pick } = useLang();
  const total = concepts.length + questions.length;

  return (
    <div className="mx-auto w-full max-w-[820px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <h1 className="text-[28px] font-bold text-ink sm:text-[32px]">{pick('Search', 'Search')}</h1>

      {/* Live search box with suggestions */}
      <div className="mt-6">
        <SearchBox
          placeholder={pick(
            'Concepts, interview questions search karo…',
            'Search concepts, interview questions…',
          )}
          className="w-full"
          large
        />
      </div>

      {!q ? (
        <p className="mt-8 text-muted">
          {pick('Kuch type karo — saare courses mein search hoga.', 'Type something to search across all courses.')}
        </p>
      ) : total === 0 ? (
        <div className="pt-14 text-center">
          <NotFoundIcon />
          <h2 className="mt-6 text-[22px] font-bold text-ink">{pick('Kuch nahi mila', 'Nothing found')}</h2>
          <p className="mt-2 text-[15px] text-muted">
            {pick('Alag keywords try karo — ya spelling check karo.', 'Try different keywords — or check the spelling.')}
          </p>

          <p className="mt-9 text-xs font-bold uppercase tracking-wide text-muted">{pick('Ye try karo', 'Try searching')}</p>
          <div className="mt-3.5 flex flex-wrap justify-center gap-2.5">
            {SUGGESTIONS.map((s) => (
              <Link key={s} href={`/search?q=${encodeURIComponent(s)}`} className="lv-pill border border-brand-tint-2 bg-brand-tint px-4 py-2.5 text-[13.5px] text-brand-dark">
                {s}
              </Link>
            ))}
          </div>

          <Link href="/courses" className="lv-btn lv-btn-primary mt-8 inline-flex">
            {pick('Saare courses dekho', 'Browse all courses')}
          </Link>
        </div>
      ) : (
        <>
          <p className="mt-5 text-[13.5px] text-muted">
            {total}{' '}
            {pick('result', total === 1 ? 'result' : 'results')}{' '}
            {pick('iske liye', 'for')} &ldquo;{q}&rdquo;
          </p>

          {concepts.length > 0 && (
            <section className="mt-7">
              <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-muted">
                {pick('Concepts', 'Concepts')}
              </h2>
              <div className="lv-card divide-y divide-line-soft overflow-hidden">
                {concepts.map((c) => (
                  <Link
                    key={c.id}
                    href={`/concepts/${c.slug}`}
                    className="flex items-center justify-between gap-3.5 px-[22px] py-4 hover:bg-brand-tint/40"
                  >
                    <span className="font-semibold text-ink">{c.title}</span>
                    <span className="flex shrink-0 items-center gap-2 text-xs text-muted-soft">
                      {c.course && (
                        <span className="lv-pill bg-brand-tint text-brand-dark">
                          {c.course.icon} {c.course.title}
                        </span>
                      )}
                      <span>{DIFFICULTY_LABEL[c.difficulty] || c.difficulty}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {questions.length > 0 && (
            <section className="mt-7">
              <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-muted">
                {pick('Interview Questions', 'Interview Questions')}
              </h2>
              <div className="lv-card divide-y divide-line-soft overflow-hidden">
                {questions.map((qn) => (
                  <Link
                    key={qn.id}
                    href={qn.course ? `/interview-questions?course=${qn.course.slug}` : '/interview-questions'}
                    className="flex items-center justify-between gap-3.5 px-[22px] py-4 hover:bg-brand-tint/40"
                  >
                    <span className="text-ink">{qn.question}</span>
                    {qn.course && <span className="shrink-0 text-lg">{qn.course.icon}</span>}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
