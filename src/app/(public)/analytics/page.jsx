'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Icon from '@/components/Icon';
import AIQuickActions from '@/components/ai/AIQuickActions';
import BarChart from '@/components/analytics/BarChart';
import ComparisonTile from '@/components/analytics/ComparisonTile';
import { useLang } from '@/components/LanguageProvider';

import { EmptyState, ErrorState, LoginGate, SkeletonCard } from '@/components/ui/States';

const SHELL = 'mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8';

function formatDuration(seconds) {
  if (!seconds) return '0m';
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  if (!h) return `${m}m`;
  return m ? `${h}h ${m}m` : `${h}h`;
}

function hourLabel(hour) {
  if (hour === 0) return '12am';
  if (hour === 12) return '12pm';
  return hour < 12 ? `${hour}am` : `${hour - 12}pm`;
}

export default function AnalyticsPage() {
  const { pick } = useLang();
  const { status } = useSession();
  const [state, setState] = useState({ loading: true, error: '', data: null });

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: '' }));
    fetch('/api/me/analytics')
      .then((r) =>
        r.ok
          ? r.json()
          : Promise.reject(new Error(pick('Tumhari analytics load nahi ho paayi', 'Could not load your analytics')))
      )
      .then((data) => setState({ loading: false, error: '', data }))
      .catch((e) => setState({ loading: false, error: e.message, data: null }));
  }, [pick]);

  useEffect(() => {
    if (status === 'authenticated') load();
  }, [status, load]);

  if (status === 'loading') {
    return <div className={`${SHELL} py-12`}><SkeletonCard lines={4} /></div>;
  }
  if (status !== 'authenticated') {
    return (
      <div className={`${SHELL} py-12`}>
        <h1 className="text-3xl font-bold">
          {pick('Tumhari learning analytics', 'Your learning analytics')}
        </h1>
        <div className="mt-6">
          <LoginGate
            message={pick(
              'Apne learning patterns dekhne ke liye login karo.',
              'Log in to see your own learning patterns.'
            )}
          />
        </div>
      </div>
    );
  }

  const d = state.data;
  const time = d?.timeTracking;
  const hasActivity = d && (d.conceptsCompleted > 0 || d.activeDays > 0);

  return (
    <div className={`${SHELL} py-10`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            {pick('Tumhari learning analytics', 'Your learning analytics')}
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            {pick(
              'Yahan sab kuch us activity se aata hai jo is site ne sach mein tumhare liye record ki. Jahan abhi data kam hai, wahan ye khaali jagah bharne ki jagah saaf bata deta hai.',
              'Everything here comes from activity this site actually recorded for you. Where there is not enough data yet, it says so rather than filling the gap.'
            )}
          </p>
        </div>
        <Link href="/dashboard" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
          <Icon name="arrow-left" className="mr-1.5 h-3.5 w-3.5" />
          {pick('Dashboard', 'Dashboard')}
        </Link>
      </div>

      {state.loading ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} lines={2} />)}
        </div>
      ) : state.error ? (
        <div className="mt-8"><ErrorState message={state.error} onRetry={load} /></div>
      ) : !hasActivity ? (
        <div className="mt-8">
          <EmptyState
            icon="seedling"
            title={pick('Abhi analyse karne ko kuch nahi', 'Nothing to analyse yet')}
            description={pick(
              'Ek-do concepts poore karo aur ye page bharna shuru ho jaayega — streaks, hafte ke patterns, aur din ke wo time jab tum sach mein padhte ho.',
              'Complete a concept or two and this page fills in — streaks, weekly patterns, the times of day you actually study.'
            )}
            action={
              <Link href="/courses" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                {pick('Ek course shuru karo', 'Start a course')}
              </Link>
            }
          />
        </div>
      ) : (
        <>
          {/* Headline activity */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: pick('Concepts poore hue', 'Concepts completed'), value: d.conceptsCompleted, icon: 'check-circle' },
              { label: pick('Active din', 'Active days'), value: d.activeDays, icon: 'calendar' },
              { label: pick('Abhi ki streak', 'Current streak'), value: pick(`${d.currentStreak} din`, `${d.currentStreak} day${d.currentStreak === 1 ? '' : 's'}`), icon: 'fire' },
              { label: pick('Sabse lambi streak', 'Longest streak'), value: pick(`${d.longestStreak} din`, `${d.longestStreak} day${d.longestStreak === 1 ? '' : 's'}`), icon: 'trophy' },
            ].map((c) => (
              <div key={c.label} className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="flex items-center gap-2 text-sm text-slate-500">
                  <Icon name={c.icon} className="h-3.5 w-3.5" />{c.label}
                </p>
                <p className="mt-1 text-2xl font-bold">{c.value}</p>
              </div>
            ))}
          </div>

          {/* You vs you */}
          <section className="mt-10">
            <h2 className="text-xl font-bold">
              {pick('Tum vs tumhara purana khud', 'You vs your previous self')}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {pick(
                'Yahan sirf yahi comparison maayne rakhta hai. Kisi aur ke numbers beech mein nahi aate.',
                'The only comparison that matters here. Nobody else’s numbers are involved.'
              )}
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ComparisonTile
                label={pick('Is hafte ke concepts', 'Concepts this week')}
                current={d.comparison.last7}
                previous={d.comparison.previous7}
                change={d.comparison.week}
              />
              <ComparisonTile
                label={pick('Is mahine ke concepts', 'Concepts this month')}
                current={d.comparison.last30}
                previous={d.comparison.previous30}
                change={d.comparison.month}
              />
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">{pick('Completion rate', 'Completion rate')}</p>
                <p className="mt-1 text-2xl font-bold">{d.completionRate}%</p>
                <p className="mt-2 text-xs text-slate-400">
                  {pick(
                    'Jo concepts tumne khole, unme se kitne poore kiye.',
                    'Of the concepts you opened, how many you finished.'
                  )}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">{pick('Quizzes pass hue', 'Quizzes passed')}</p>
                <p className="mt-1 text-2xl font-bold">{d.quizzesPassed}</p>
                <p className="mt-2 text-xs text-slate-400">
                  {pick(
                    `${d.challengesCompleted} challenge poore hue`,
                    `${d.challengesCompleted} challenge${d.challengesCompleted === 1 ? '' : 's'} completed`
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* Activity over time */}
          <section className="mt-10 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold">{pick('Pichhle 12 hafte', 'Last 12 weeks')}</h3>
              <p className="mt-0.5 text-sm text-slate-500">
                {pick('Har hafte poore hue concepts.', 'Concepts completed per week.')}
              </p>
              <div className="mt-4"><BarChart data={d.weeks} /></div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold">{pick('Pichhle 12 mahine', 'Last 12 months')}</h3>
              <p className="mt-0.5 text-sm text-slate-500">
                {pick('Har mahine poore hue concepts.', 'Concepts completed per month.')}
              </p>
              <div className="mt-4"><BarChart data={d.months} /></div>
            </div>
          </section>

          {/* Rhythm */}
          <section className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold">{pick('Kin dino tum seekhte ho', 'Which days you learn')}</h3>
              <p className="mt-0.5 text-sm text-slate-500">
                {d.busiestWeekday
                  ? pick(
                      `Tumhare zyadatar completions ${d.busiestWeekday.label} ko hote hain.`,
                      `Most of your completions land on ${d.busiestWeekday.label}.`
                    )
                  : pick(
                      'Pattern dekhne ke liye abhi itni activity nahi hai.',
                      'Not enough activity to see a pattern yet.'
                    )}
              </p>
              <div className="mt-4">
                <BarChart
                  data={d.byWeekday.map((w) => ({ ...w, label: w.label.slice(0, 3) }))}
                  highlight={d.byWeekday.findIndex((w) => w.label === d.busiestWeekday?.label)}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{pick('Din ka kaunsa time', 'Time of day')}</h3>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {time.busiestHour
                      ? pick(
                          `Tum sabse zyada ${hourLabel(time.busiestHour.hour)} ke aas-paas padhte ho.`,
                          `You study most around ${hourLabel(time.busiestHour.hour)}.`
                        )
                      : pick('Abhi koi study time record nahi hua.', 'No recorded study time yet.')}
                  </p>
                </div>
                <span className="rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-500">
                  {pick('tumhara local time', 'your local time')}
                </span>
              </div>
              {time.totalSeconds ? (
                <div className="mt-4">
                  <BarChart
                    data={time.byHour.map((h) => ({ ...h, label: h.hour % 6 === 0 ? hourLabel(h.hour) : '' }))}
                    valueKey="seconds"
                    format={formatDuration}
                    highlight={time.busiestHour?.hour}
                  />
                </div>
              ) : (
                <p className="mt-4 rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-500">
                  {pick(
                    'Time tracking tab shuru hoti hai jab tum ab ke baad pehli baar koi concept page kholte ho.',
                    'Time tracking starts the first time you open a concept page from now on.'
                  )}
                </p>
              )}
            </div>
          </section>

          {/* Time spent */}
          <section className="mt-10">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold">{pick('Kitna time laga', 'Time spent')}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {time.since ? (
                    <>
                      {pick('Asli page time se gina gaya, is date se:', 'Counted from real page time since')}{' '}
                      {new Date(time.since).toLocaleDateString()}{' '}
                      {pick(
                        '— andaaza nahi, aur tumhari purani padhai pe peechhe se laagu nahi kiya gaya.',
                        '— not estimated, and not backdated over your earlier learning.'
                      )}
                    </>
                  ) : (
                    pick(
                      'Abhi kuch record nahi hua. Isme sirf wo time ginta hai jab koi learning page khula ho aur tumhare saamne ho.',
                      'Nothing recorded yet. This counts only time with a learning page open and in front of you.'
                    )
                  )}
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">{pick('Kul tracked', 'Total tracked')}</p>
                <p className="mt-1 text-2xl font-bold">{formatDuration(time.totalSeconds)}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">{pick('Sessions', 'Sessions')}</p>
                <p className="mt-1 text-2xl font-bold">{time.sessionCount}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">{pick('Average session', 'Average session')}</p>
                <p className="mt-1 text-2xl font-bold">{formatDuration(time.averageSessionSeconds)}</p>
              </div>
            </div>
          </section>

          {/* Course progress */}
          {!!d.courseProgress.length && (
            <section className="mt-10">
              <h2 className="text-xl font-bold">
                {pick('Tumhari mehnat kahan gayi', 'Where your effort went')}
              </h2>
              <div className="mt-4 space-y-3">
                {d.courseProgress.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/courses/${c.slug}`}
                    className="block rounded-2xl border border-slate-200 bg-white p-4 hover:border-indigo-300"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium">
                        <Icon name={c.icon} brand className="h-4 w-4" />{c.title}
                      </span>
                      <span className="text-slate-500">{c.completed}/{c.total} · {c.pct}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-indigo-500" style={{ width: `${c.pct}%` }} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* AI reading of the same numbers */}
          <section className="mt-12">
            <AIQuickActions
              category="analytics"
              heading={pick('AI se poochho ye tumhare baare mein kya kehta hai', 'Ask AI what this says about you')}
              subheading={pick(
                'Wo wahi record kiye hue numbers padhta hai jo upar dikh rahe hain — isse zyada kuch nahi.',
                'It reads the same recorded numbers you see above — nothing more.'
              )}
            />
          </section>
        </>
      )}
    </div>
  );
}
