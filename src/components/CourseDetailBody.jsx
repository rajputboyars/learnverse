'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';

const DIFFICULTY_LABEL = { easy: 'Beginner', medium: 'Intermediate', hard: 'Advanced' };

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff">
      <path d="M20.3 5.7a1 1 0 010 1.4l-10 10a1 1 0 01-1.42 0l-5-5a1 1 0 111.42-1.4L9.6 15l9.3-9.3a1 1 0 011.4 0z" />
    </svg>
  );
}

export default function CourseDetailBody({ courseId, totalConcepts, levels }) {
  const { status } = useSession();
  const { pick } = useLang();
  const [completedIds, setCompletedIds] = useState(null);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch(`/api/progress?courseId=${courseId}`)
      .then((r) => r.json())
      .then((d) => setCompletedIds(new Set(d.completedConceptIds || [])))
      .catch(() => {});
  }, [status, courseId]);

  const currentId = useMemo(() => {
    if (!completedIds) return null;
    for (const lvl of levels) {
      for (const t of lvl.topics) {
        for (const c of t.concepts) {
          if (!completedIds.has(c.id)) return c.id;
        }
      }
    }
    return null;
  }, [completedIds, levels]);

  const completedCount = completedIds?.size || 0;
  const pct = totalConcepts > 0 ? Math.min(100, Math.round((completedCount / totalConcepts) * 100)) : 0;

  return (
    <>
      {completedIds && totalConcepts > 0 && (
        <div className="mt-4 max-w-[340px] sm:mt-4">
          <div className="mb-1.5 flex justify-between text-[12.5px] text-muted">
            <span>{pct}% {pick('poora', 'complete')}</span>
            <span>{completedCount}/{totalConcepts}</span>
          </div>
          <div className="h-[7px] overflow-hidden rounded-full bg-line-soft">
            <div className={`h-full rounded-full ${pct >= 100 ? 'bg-accent-green' : 'bg-brand'}`} style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      <div className="mt-10 space-y-11 sm:mt-[44px]">
        {levels.map((lvl) => (
          <div key={lvl.key}>
            <div className="flex items-center gap-2.5">
              <span className="text-xl sm:text-2xl">{lvl.icon}</span>
              <h2 className="text-lg font-bold text-ink sm:text-[22px]">{lvl.label}</h2>
              <span className="lv-pill border border-line bg-card px-2.5 py-0.5 text-[11px] text-ink-soft sm:text-[11.5px]">
                {lvl.topics.length} {lvl.topics.length === 1 ? pick('topic', 'topic') : pick('topics', 'topics')}
              </span>
            </div>

            <div className="mt-4 space-y-6 sm:mt-[22px] sm:space-y-[26px]">
              {lvl.topics.map((t) => (
                <div key={t.id}>
                  <h3 className="text-[14px] font-bold text-ink sm:text-base">{t.title}</h3>
                  {t.description && <p className="mt-0.5 text-[11.5px] text-muted sm:text-[13px]">{t.description}</p>}
                  <div className="lv-card mt-2.5 divide-y divide-line-soft overflow-hidden sm:mt-3">
                    {t.concepts.length === 0 ? (
                      <p className="p-4 text-sm text-muted-soft"><span>{pick('Jald aa raha hai…', 'Coming soon…')}</span></p>
                    ) : (
                      t.concepts.map((c, i) => {
                        const done = completedIds?.has(c.id);
                        const isCurrent = c.id === currentId;
                        return (
                          <Link
                            key={c.id}
                            href={`/concepts/${c.slug}`}
                            className={`flex items-center gap-3 px-4 py-3 sm:gap-3.5 sm:px-5 sm:py-3.5 ${isCurrent ? 'bg-brand-tint' : ''}`}
                          >
                            <span
                              className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold sm:h-7 sm:w-7 sm:text-xs ${
                                done ? 'bg-accent-green text-white' : isCurrent ? 'bg-brand text-white' : 'bg-line-soft text-muted'
                              }`}
                            >
                              {done ? <CheckIcon /> : i + 1}
                            </span>
                            <span className={`flex-1 text-[13.5px] sm:text-[14.5px] ${isCurrent ? 'font-bold text-brand-dark' : 'font-semibold text-ink'}`}>
                              {c.title}
                            </span>
                            <span className={`text-[11px] capitalize sm:text-xs ${isCurrent ? 'font-bold text-brand-dark' : 'text-muted-soft'}`}>
                              {DIFFICULTY_LABEL[c.difficulty] || c.difficulty}
                            </span>
                          </Link>
                        );
                      })
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
