'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useLang } from '@/components/LanguageProvider';

export default function ConceptRightRail({ courseId, totalConcepts, conceptId }) {
  const { status } = useSession();
  const { pick } = useLang();
  const [completedCount, setCompletedCount] = useState(null);
  const [comments, setComments] = useState(null);
  const [dueCount, setDueCount] = useState(null);

  useEffect(() => {
    fetch(`/api/comments?conceptId=${conceptId}`)
      .then((r) => r.json())
      .then((d) => setComments(d.comments || []))
      .catch(() => {});
  }, [conceptId]);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch(`/api/progress?courseId=${courseId}`)
      .then((r) => r.json())
      .then((d) => setCompletedCount((d.completedConceptIds || []).length))
      .catch(() => {});
    fetch('/api/revise')
      .then((r) => r.json())
      .then((d) => setDueCount(d.dueCount ?? 0))
      .catch(() => {});
  }, [status, courseId]);

  const pct = completedCount !== null && totalConcepts > 0
    ? Math.min(100, Math.round((completedCount / totalConcepts) * 100))
    : 0;
  const dash = `${pct} 100`;
  const latestComment = comments?.length ? comments[comments.length - 1] : null;

  return (
    <aside className="hidden lg:flex lg:sticky lg:top-24 lg:flex-col lg:gap-4">
      {completedCount !== null && (
        <div className="lv-card p-5 text-center">
          <svg width="72" height="72" viewBox="0 0 36 36" className="mx-auto">
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--color-line-soft)" strokeWidth="3" />
            <circle
              cx="18" cy="18" r="15.5" fill="none" stroke="var(--color-brand)" strokeWidth="3"
              strokeDasharray={dash} strokeLinecap="round" transform="rotate(-90 18 18)"
            />
          </svg>
          <div className="mt-2 text-[15px] font-bold text-ink">{pct}% {pick('poora', 'done')}</div>
          <div className="text-xs text-muted">{completedCount} {pick('mein se', 'of')} {totalConcepts} {pick('concepts', 'concepts')}</div>
        </div>
      )}

      <div className="lv-card p-[18px]">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
          💬 {pick('Discussion', 'Discussion')} {comments ? `(${comments.length})` : ''}
        </h4>
        {latestComment ? (
          <div className="flex gap-2">
            <span className="h-[26px] w-[26px] shrink-0 rounded-full bg-brand-tint" />
            <p className="text-[12.5px] leading-relaxed text-ink-soft">"{latestComment.body}"</p>
          </div>
        ) : (
          <p className="text-[12.5px] text-muted">{pick('Abhi koi comment nahi.', 'No comments yet.')}</p>
        )}
        <a href="#discussion" className="mt-2.5 inline-block text-[12.5px] font-bold text-brand">
          {pick('Discussion mein judo', 'Join the discussion')} →
        </a>
      </div>

      {dueCount > 0 && (
        <div className="lv-card p-[18px]" style={{ background: 'var(--color-accent-green-tint)', borderColor: '#a7f3d0' }}>
          <div className="text-[13px] font-bold text-accent-green-ink">🔁 {pick('Revision due', 'Due for revision')}</div>
          <p className="mt-1.5 text-[12.5px] text-ink-soft">
            {dueCount} {pick('flashcards revise karne ke liye ready hain.', 'flashcards are ready to review.')}
          </p>
        </div>
      )}
    </aside>
  );
}
