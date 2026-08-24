'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';
import { pickRoadmapForProgress, roadmapPreviewSteps } from '@/lib/roadmapProgress';

const ICON_PATHS = {
  flame: 'M12 2c1 4 5 6 5 11a5 5 0 11-10 0c0-2 1-3 2-4-.3 2 .5 3 1 3 .5-3-.5-6 2-10z',
  bolt: 'M13 2L3 14h7l-1 8 10-12h-7l1-8z',
  trending:
    'M21 6a1 1 0 00-1-1h-5a1 1 0 100 2h2.59l-4.3 4.3-3.3-3.3a1 1 0 00-1.4 0l-6 6a1 1 0 101.4 1.4L8.6 9.83l3.3 3.3a1 1 0 001.4 0L18 8.4V11a1 1 0 102 0V6z',
  star: 'M12 2l2.6 6.6L22 9l-5.3 4.6L18.2 21 12 17.1 5.8 21l1.5-7.4L2 9l7.4-.4L12 2z',
  check: 'M20.3 5.7a1 1 0 010 1.4l-10 10a1 1 0 01-1.42 0l-5-5a1 1 0 111.42-1.4L9.6 15l9.3-9.3a1 1 0 011.4 0z',
};

function Icon({ name, size = 22, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

const BADGE_TINTS = ['bg-amber-tint', 'bg-brand-tint', 'bg-violet-tint', 'bg-accent-green-tint'];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { t } = useLang();
  const [data, setData] = useState(null);
  const [cont, setCont] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [dueCount, setDueCount] = useState(null);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch('/api/me/dashboard').then((r) => r.json()).then(setData).catch(() => {});
    fetch('/api/me/continue')
      .then((r) => r.json())
      .then((d) => setCont(d.concept ? d : null))
      .catch(() => {});
    fetch('/api/leaderboard?scope=weekly')
      .then((r) => r.json())
      .then((d) => setLeaderboard(d.leaderboard || []))
      .catch(() => {});
    fetch('/api/revise')
      .then((r) => r.json())
      .then((d) => setDueCount(d.dueCount ?? 0))
      .catch(() => {});
  }, [status]);

  if (status === 'loading') {
    return <p className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12 text-muted">Loading…</p>;
  }

  const isGuest = status !== 'authenticated';

  if (isGuest) {
    return (
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-ink">Dashboard</h1>
        <p className="mt-2 text-muted">Login karke apni progress dekho.</p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-brand-tint px-6 py-5">
          <div>
            <p className="font-semibold text-ink">Track your progress</p>
            <p className="mt-1 text-sm text-muted">Sign up free to earn XP, unlock badges, and save your learning streak.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/login" className="lv-btn lv-btn-ghost">Login</Link>
            <Link href="/signup" className="lv-btn lv-btn-primary">Sign up free</Link>
          </div>
        </div>
      </div>
    );
  }

  const badgesEarned = data?.badges?.filter((b) => b.earned) || [];
  const badgesPreview = data ? [...badgesEarned, ...data.badges.filter((b) => !b.earned)].slice(0, 5) : [];
  const roadmap = data ? pickRoadmapForProgress(data.allCourseProgress) : null;
  const roadmapSteps = roadmap ? roadmapPreviewSteps(roadmap, data.allCourseProgress, 4) : [];
  const continueCoursePct = cont?.course
    ? data?.allCourseProgress?.find((c) => c.slug === cont.course.slug)?.pct ?? 0
    : 0;
  const myRank = leaderboard?.find((r) => r.userId === session.user.id);
  const leaderboardTop = leaderboard?.slice(0, 3) || [];
  const showMyRankSeparately = myRank && !leaderboardTop.some((r) => r.userId === myRank.userId);
  const levelPct = data ? Math.min(100, Math.round((data.totalXP / data.nextLevelAt) * 100)) : 0;

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-ink">{t('dash.greeting')} {session.user.name?.split(' ')[0]} 👋</h1>
          <p className="mt-1.5 text-[14.5px] text-muted">{t('dash.sub')}</p>
        </div>
        <Link href={`/u/${session.user.id}`} className="lv-btn lv-btn-ghost">
          {t('dash.publicProfile')}
        </Link>
      </div>

      {/* Stat row */}
      <div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="lv-card p-[22px]" style={{ background: 'linear-gradient(140deg,#78350f,#1a1408)', color: '#fff' }}>
          <Icon name="flame" size={26} className="text-amber-400" />
          <div className="mt-2.5 text-[28px] font-bold">{data?.currentStreak ?? '—'}</div>
          <div className="text-[12.5px] text-amber-200">{t('dash.streak')}</div>
        </div>
        <div className="lv-card p-[22px]">
          <Icon name="bolt" size={26} className="text-violet" />
          <div className="mt-2.5 text-[28px] font-bold text-ink">{data?.totalXP ?? '—'}</div>
          <div className="text-[12.5px] text-muted">{t('dash.xpLevel')} {data?.level ?? '—'}</div>
        </div>
        <div className="lv-card p-[22px]">
          <Icon name="trending" size={26} className="text-brand" />
          <div className="mt-2.5 text-[28px] font-bold text-ink">{myRank ? `#${myRank.rank}` : '—'}</div>
          <div className="text-[12.5px] text-muted">{myRank ? t('dash.weeklyRank') : t('dash.notRanked')}</div>
        </div>
        <div className="lv-card p-[22px]">
          <Icon name="star" size={26} className="text-amber-500" />
          <div className="mt-2.5 text-[28px] font-bold text-ink">{data ? badgesEarned.length : '—'}</div>
          <div className="text-[12.5px] text-muted">{t('dash.badgesUnlocked')}</div>
        </div>
      </div>

      {/* XP progress to next level */}
      {data && (
        <div className="lv-card mt-4 p-5">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-ink">Level {data.level}</span>
            <span className="text-muted">{data.totalXP} / {data.nextLevelAt} XP</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-line-soft">
            <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${levelPct}%` }} />
          </div>
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]">
        {/* Left column */}
        <div className="flex flex-col gap-5">
          <div className="lv-card p-6">
            <h3 className="text-[17px] font-bold text-ink">{t('dash.continueLearning')}</h3>
            {cont?.concept ? (
              <div className="mt-4 flex items-center gap-4 rounded-2xl bg-brand-tint p-4">
                <div className="text-2xl">{cont.course?.icon || '📘'}</div>
                <div className="flex-1">
                  <div className="text-[14.5px] font-bold text-ink">
                    {cont.course?.title ? `${cont.course.title} · ${cont.concept.title}` : cont.concept.title}
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
                    <div className="h-full rounded-full bg-brand" style={{ width: `${continueCoursePct}%` }} />
                  </div>
                </div>
                <Link href={`/concepts/${cont.concept.slug}`} className="rounded-xl bg-brand px-4 py-2.5 text-[13px] font-bold text-white">
                  {t('dash.resume')}
                </Link>
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted">
                <Link href="/courses" className="font-semibold text-brand">Explore courses</Link> to get started.
              </p>
            )}
          </div>

          {roadmap && (
            <div className="lv-card p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[17px] font-bold text-ink">{roadmap.icon} {t('dash.yourRoadmap')} · {roadmap.title}</h3>
                <Link href={`/roadmaps/${roadmap.slug}`} className="text-[12.5px] font-bold text-brand">
                  {t('dash.viewRoadmap')}
                </Link>
              </div>
              <div className="mt-[18px] flex flex-col gap-2.5">
                {roadmapSteps.map((s) => (
                  <div key={s.courseSlug} className={`flex items-center gap-3 ${s.state === 'locked' ? 'opacity-50' : ''}`}>
                    {s.state === 'done' ? (
                      <Icon name="check" size={18} className="text-accent-green shrink-0" />
                    ) : (
                      <span
                        className="inline-block h-[18px] w-[18px] shrink-0 rounded-full border-2"
                        style={{ borderColor: s.state === 'current' ? 'var(--color-brand)' : 'var(--color-line)' }}
                      />
                    )}
                    <span className={`flex-1 text-[13.5px] ${s.state === 'current' ? 'font-bold' : 'font-semibold'} text-ink`}>{s.title}</span>
                    <span className={`text-xs ${s.state === 'current' ? 'font-bold text-brand-dark' : 'text-muted'}`}>
                      {s.state === 'locked' ? t('dash.locked') : `${s.pct}%`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data && (
            <div className="lv-card p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[17px] font-bold text-ink">🏅 {t('dash.badges')}</h3>
                <Link href="/badges" className="text-[12.5px] font-bold text-brand">{t('dash.viewAllBadges')} →</Link>
              </div>
              <div className="mt-[18px] grid grid-cols-3 gap-3.5 sm:grid-cols-5">
                {badgesPreview.map((b, i) => (
                  <div key={b.id} title={b.desc} className={`text-center ${b.earned ? '' : 'opacity-40'}`}>
                    <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${b.earned ? BADGE_TINTS[i % BADGE_TINTS.length] : 'bg-line-soft'}`}>
                      {b.earned ? b.icon : '🔒'}
                    </div>
                    <div className="mt-1.5 text-[11px] text-muted">{b.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          <div className="rounded-3xl p-6 text-white" style={{ background: 'linear-gradient(150deg,var(--color-violet),#a855f7)' }}>
            <h3 className="text-base font-bold">🏆 {t('dash.weeklyLeaderboard')}</h3>
            {leaderboard === null ? (
              <p className="mt-4 text-sm text-white/80">Loading…</p>
            ) : (
              <>
                <div className="mt-4 flex flex-col gap-2.5">
                  {leaderboardTop.map((r) => (
                    <div key={r.userId} className="flex items-center gap-2.5 rounded-xl bg-white/10 px-3 py-2.5">
                      <span className="w-[18px] font-bold">{r.rank}</span>
                      <span className="h-[26px] w-[26px] shrink-0 rounded-full bg-white/30" />
                      <span className="flex-1 truncate text-[13.5px] font-semibold">{r.name}</span>
                      <span className="text-[12.5px] font-bold">{r.xp} XP</span>
                    </div>
                  ))}
                  {showMyRankSeparately && (
                    <div className="flex items-center gap-2.5 rounded-xl border-[1.5px] border-white bg-white/20 px-3 py-2.5">
                      <span className="w-[18px] font-bold">{myRank.rank}</span>
                      <span className="h-[26px] w-[26px] shrink-0 rounded-full bg-white" />
                      <span className="flex-1 truncate text-[13.5px] font-bold">{t('dash.you')}</span>
                      <span className="text-[12.5px] font-bold">{myRank.xp} XP</span>
                    </div>
                  )}
                </div>
                <Link href="/leaderboard" className="mt-4 inline-block text-[12.5px] font-bold">
                  {t('dash.seeFullLeaderboard')}
                </Link>
              </>
            )}
          </div>

          <div className="lv-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-ink">🎓 {t('dash.certificates')}</h3>
              <Link href="/certificates" className="text-[12.5px] font-bold text-brand">{t('dash.viewAllBadges')} →</Link>
            </div>
            {data?.completedCourses?.length ? (
              <>
                <Link
                  href={`/certificate/${data.completedCourses[0].slug}`}
                  className="mt-3.5 flex items-center gap-3 rounded-2xl border border-dashed border-amber-tint-2 bg-amber-tint p-4"
                >
                  <div className="text-xl">📜</div>
                  <div>
                    <div className="text-[13px] font-bold text-ink">{data.completedCourses[0].title} — Certificate of Completion</div>
                  </div>
                </Link>
                {data.completedCourses.length > 1 && (
                  <Link href="/certificates" className="mt-2 inline-block text-xs text-muted hover:text-brand">+{data.completedCourses.length - 1} more</Link>
                )}
              </>
            ) : (
              <p className="mt-3.5 text-sm text-muted">{t('dash.noCertificates')}</p>
            )}
          </div>

          <div className="lv-card p-6">
            <h3 className="text-base font-bold text-ink">🔁 {t('dash.revisionDue')}</h3>
            {dueCount === null ? (
              <p className="mt-2 text-sm text-muted">Loading…</p>
            ) : dueCount > 0 ? (
              <>
                <p className="mt-2 text-[13px] text-muted">{dueCount} {t('dash.revisionCount')}</p>
                <Link href="/revise" className="mt-3 inline-block text-[12.5px] font-bold text-brand">
                  {t('dash.startRevision')}
                </Link>
              </>
            ) : (
              <p className="mt-2 text-[13px] text-muted">{t('dash.noRevision')}</p>
            )}
          </div>
        </div>
      </div>

      {/* Course progress */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-ink">Course progress</h2>
        {!data ? (
          <p className="mt-3 text-muted">Loading…</p>
        ) : data.courseProgress.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-line p-6 text-center text-muted">
            Abhi koi course start nahi kiya. <Link href="/courses" className="font-semibold text-brand underline">Explore courses</Link>
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {data.courseProgress.map((c) => (
              <Link key={c.slug} href={`/courses/${c.slug}`} className="lv-card block p-4 hover:border-brand/40">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">{c.icon} {c.title}</span>
                  <span className="text-muted">{c.completed}/{c.total} · {c.pct}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-line-soft">
                  <div className="h-full rounded-full bg-accent-green" style={{ width: `${c.pct}%` }} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Bookmarks */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-ink">🔖 Bookmarks</h2>
        {!data ? (
          <p className="mt-3 text-muted">Loading…</p>
        ) : data.bookmarks.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-line p-6 text-center text-muted">
            Koi bookmark nahi. Kisi concept pe 🏷️ Bookmark dabao taaki yahan save ho.
          </p>
        ) : (
          <div className="lv-card mt-4 divide-y divide-line overflow-hidden">
            {data.bookmarks.map((b) => (
              <Link key={b.slug} href={`/concepts/${b.slug}`} className="flex items-center justify-between px-4 py-3 hover:bg-brand-tint/40">
                <span className="font-medium text-ink">{b.title}</span>
                <span className="text-xs capitalize text-muted">{b.difficulty}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/courses" className="lv-btn lv-btn-primary">{t('dash.keepLearning')}</Link>
        <Link href="/leaderboard" className="lv-btn lv-btn-ghost">{t('nav.leaderboard')}</Link>
        <Link href="/resume" className="lv-btn lv-btn-ghost">{t('dash.buildResume')}</Link>
      </div>
    </div>
  );
}
