'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';

const DIFFICULTY_TINT = {
  beginner: 'bg-accent-green-tint text-accent-green-ink',
  intermediate: 'bg-brand-tint text-brand-dark',
  advanced: 'bg-amber-tint text-amber-ink',
};

const DIFFICULTY_LABEL = {
  beginner: '🟢 Beginner',
  intermediate: '🟡 Intermediate',
  advanced: '🔴 Advanced',
};

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-muted">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 4a7 7 0 100 14 7 7 0 000-14zm0 2a5 5 0 110 10 5 5 0 010-10z"
        fill="currentColor"
      />
      <rect x="15.5" y="16.9" width="2.2" height="7" rx="1.1" transform="rotate(-45 15.5 16.9)" fill="currentColor" />
    </svg>
  );
}

function CourseCard({ c, progress, pick }) {
  return (
    <Link href={`/courses/${c.slug}`} className={`lv-card block p-[22px] transition hover:border-brand/40 ${c.isNew ? 'border-brand-tint-2' : ''}`} style={c.isNew ? { background: 'linear-gradient(155deg,var(--color-brand-tint),var(--color-card))' } : undefined}>
      <div className="flex items-start justify-between">
        <div className="text-[28px]">{c.icon}</div>
        <span className={`lv-pill ${c.isNew ? 'bg-card text-brand-dark' : DIFFICULTY_TINT[c.difficulty] || DIFFICULTY_TINT.beginner}`}>
          {DIFFICULTY_LABEL[c.difficulty]?.replace(/^\S+ /, '') || c.difficulty}
        </span>
      </div>
      <h3 className="mt-3.5 text-[17px] font-bold text-ink">{c.title}</h3>
      <p className={`mt-1.5 line-clamp-2 text-[13px] leading-relaxed ${c.isNew ? 'text-ink-soft' : 'text-muted'}`}>{c.description}</p>

      <div className="mt-4">
        {progress && progress.completed > 0 ? (
          <>
            <div className="mb-1.5 flex justify-between text-[11.5px] text-muted">
              <span>{progress.pct}% {pick('complete', 'complete')}</span>
              <span>{progress.completed}/{progress.total} {pick('concepts', 'concepts')}</span>
            </div>
            <div className="h-[7px] overflow-hidden rounded-full bg-line-soft">
              <div
                className={`h-full rounded-full ${progress.pct >= 100 ? 'bg-accent-green' : 'bg-brand'}`}
                style={{ width: `${progress.pct}%` }}
              />
            </div>
          </>
        ) : (
          <span className={`lv-pill text-[11.5px] ${c.isNew ? 'bg-card text-brand-dark' : 'bg-brand-tint text-brand-dark'}`}>
            {c.isNew ? '✨ ' : ''}{c.isNew ? pick('Naya', 'New') : pick('Shuru nahi kiya', 'Not started')} · {c.conceptCount} {pick('concepts', 'concepts')}
          </span>
        )}
      </div>
    </Link>
  );
}

export default function CourseCatalogClient({ courses }) {
  const { status, data: session } = useSession();
  const { pick } = useLang();
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('all');
  const [sort, setSort] = useState('popular');
  const [progressBySlug, setProgressBySlug] = useState({});

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch('/api/me/dashboard')
      .then((r) => r.json())
      .then((d) => {
        const map = {};
        for (const c of d.allCourseProgress || []) map[c.slug] = c;
        setProgressBySlug(map);
      })
      .catch(() => {});
  }, [status]);

  const diffCounts = useMemo(() => {
    const counts = { all: courses.length, beginner: 0, intermediate: 0, advanced: 0 };
    for (const c of courses) counts[c.difficulty] = (counts[c.difficulty] || 0) + 1;
    return counts;
  }, [courses]);

  const filtered = useMemo(() => {
    let list = courses;
    if (difficulty !== 'all') list = list.filter((c) => c.difficulty === difficulty);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (c) => c.title.toLowerCase().includes(q) || c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    list = [...list];
    if (sort === 'newest') list.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
    else if (sort === 'az') list.sort((a, b) => a.title.localeCompare(b.title));
    // 'popular' keeps the curated server order (Course.order)
    return list;
  }, [courses, difficulty, search, sort]);

  const diffOptions = [
    { value: 'all', label: pick('Sabhi levels', 'All levels') },
    { value: 'beginner', label: DIFFICULTY_LABEL.beginner },
    { value: 'intermediate', label: DIFFICULTY_LABEL.intermediate },
    { value: 'advanced', label: DIFFICULTY_LABEL.advanced },
  ];

  return (
    <div className="mt-8 lg:mt-10 lg:grid lg:grid-cols-[260px_1fr] lg:items-start lg:gap-8">
      {/* Filters */}
      <aside className="flex flex-col gap-3 lg:gap-6">
        <div className="lv-card p-3 lg:p-[18px]">
          <div className="flex items-center gap-2 rounded-xl border border-line px-3 py-2.5">
            <SearchIcon />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={pick('Course dhundo…', 'Search courses…')}
              className="w-full bg-transparent text-[13.5px] text-ink outline-none placeholder:text-muted-soft"
            />
          </div>
        </div>

        <div className="lv-card p-3 lg:p-[18px]">
          <h4 className="mb-2.5 hidden text-xs font-semibold uppercase tracking-wide text-muted lg:block">
            {pick('Difficulty', 'Difficulty')}
          </h4>
          <div className="flex gap-2 overflow-x-auto pb-0.5 lg:flex-col lg:overflow-visible lg:pb-0">
            {diffOptions.map((opt) => {
              const active = difficulty === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setDifficulty(opt.value)}
                  className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold lg:w-full lg:shrink lg:justify-between lg:rounded-xl lg:px-3 lg:py-2.5 lg:text-sm ${
                    active
                      ? 'bg-ink text-white lg:bg-brand-tint lg:text-brand-dark'
                      : 'border border-line bg-card text-ink-soft lg:border-0'
                  }`}
                >
                  <span>{opt.label}</span>
                  <span className={active ? '' : 'text-muted'}>{diffCounts[opt.value] || 0}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:block lv-card p-[18px]">
          <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted">{pick('Language', 'Language')}</h4>
          <div className="lv-pill w-full justify-between bg-brand-tint text-brand-dark">
            <span>English + हिंग्लिश</span>
            <span>{courses.length}</span>
          </div>
        </div>

        <Link
          href="/roadmaps"
          className="lv-card flex items-center gap-3 p-4 lg:block lg:p-[18px]"
          style={{ background: 'linear-gradient(160deg,var(--color-violet-tint),var(--color-card))', borderColor: '#ddd6fe' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-violet lg:hidden">
            <path d="M12 2l2.6 6.6L22 9l-5.3 4.6L18.2 21 12 17.1 5.8 21l1.5-7.4L2 9l7.4-.4L12 2z" />
          </svg>
          <div>
            <div className="hidden items-center gap-2 lg:flex">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-violet">
                <path d="M12 2l2.6 6.6L22 9l-5.3 4.6L18.2 21 12 17.1 5.8 21l1.5-7.4L2 9l7.4-.4L12 2z" />
              </svg>
              <span className="text-[13.5px] font-bold text-ink">{pick('Kahan se shuru karein pata nahi?', 'Not sure where to start?')}</span>
            </div>
            <p className="hidden text-[12.5px] leading-relaxed text-ink-soft lg:mt-2 lg:block">
              {pick('Ek structured roadmap follow karo.', 'Follow a structured roadmap instead.')}
            </p>
            <div className="text-[12.5px] font-bold text-violet-ink lg:mt-2.5">
              {pick('Roadmaps dekho', 'Browse roadmaps')} →
            </div>
          </div>
        </Link>
      </aside>

      {/* Course grid */}
      <div className="mt-6 lg:mt-0">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[13.5px] text-muted">
            {pick('Dikha rahe hain', 'Showing')} {filtered.length} {pick('mein se', 'of')} {courses.length}
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="lv-pill border border-line bg-card text-ink-soft outline-none"
          >
            <option value="popular">{pick('Sort: Popular', 'Sort: Popular')}</option>
            <option value="newest">{pick('Sort: Naye pehle', 'Sort: Newest')}</option>
            <option value="az">{pick('Sort: A–Z', 'Sort: A–Z')}</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-line p-10 text-center text-muted">
            {pick('Koi course nahi mila.', 'No courses match your filters.')}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {filtered.map((c) => (
              <CourseCard key={c.id} c={c} progress={progressBySlug[c.slug]} pick={pick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
