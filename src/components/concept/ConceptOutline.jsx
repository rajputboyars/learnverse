'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

function CheckIcon({ className = '' }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.3 5.7a1 1 0 010 1.4l-10 10a1 1 0 01-1.42 0l-5-5a1 1 0 111.42-1.4L9.6 15l9.3-9.3a1 1 0 011.4 0z" />
    </svg>
  );
}

export default function ConceptOutline({ course, siblings, currentSlug }) {
  const { status } = useSession();
  const [completedIds, setCompletedIds] = useState(null);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch(`/api/progress?courseId=${course._id}`)
      .then((r) => r.json())
      .then((d) => setCompletedIds(new Set(d.completedConceptIds || [])))
      .catch(() => {});
  }, [status, course._id]);

  const doneCount = completedIds
    ? siblings.filter((s) => completedIds.has(s._id)).length
    : 0;
  const pct = siblings.length > 0 ? Math.round((doneCount / siblings.length) * 100) : 0;

  return (
    <aside className="hidden lg:block">
      <div className="lv-card sticky top-24 p-4">
        <Link href={`/courses/${course.slug}`} className="mb-3 flex items-center gap-2 text-sm font-bold text-ink hover:text-brand">
          <span>{course.icon}</span> {course.title}
        </Link>
        {completedIds && (
          <>
            <h4 className="px-0.5 pb-2.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
              {doneCount}/{siblings.length}
            </h4>
            <div className="mb-3.5 h-[5px] overflow-hidden rounded-full bg-line-soft">
              <div className={`h-full rounded-full ${pct >= 100 ? 'bg-accent-green' : 'bg-brand'}`} style={{ width: `${pct}%` }} />
            </div>
          </>
        )}
        <nav className="flex flex-col gap-0.5">
          {siblings.map((s) => {
            const active = s.slug === currentSlug;
            const done = completedIds?.has(s._id);
            return (
              <Link
                key={s._id}
                href={`/concepts/${s.slug}`}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13.5px] font-semibold ${
                  active ? 'bg-brand-tint text-brand-dark' : 'text-ink-soft hover:bg-brand-tint/40'
                }`}
              >
                {done ? (
                  <CheckIcon className="shrink-0 text-accent-green" />
                ) : active ? (
                  <span className="h-[15px] w-[15px] shrink-0 rounded-full bg-brand" />
                ) : (
                  <span className="h-[15px] w-[15px] shrink-0 rounded-full border-2 border-line" />
                )}
                <span className="truncate">{s.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
