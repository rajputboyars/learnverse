'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Icon from '@/components/Icon';
import AIQuickActions from '@/components/ai/AIQuickActions';
import BarChart from '@/components/analytics/BarChart';
import ComparisonTile from '@/components/analytics/ComparisonTile';
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
  const { status } = useSession();
  const [state, setState] = useState({ loading: true, error: '', data: null });

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: '' }));
    fetch('/api/me/analytics')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Could not load your analytics'))))
      .then((data) => setState({ loading: false, error: '', data }))
      .catch((e) => setState({ loading: false, error: e.message, data: null }));
  }, []);

  useEffect(() => {
    if (status === 'authenticated') load();
  }, [status, load]);

  if (status === 'loading') {
    return <div className={`${SHELL} py-12`}><SkeletonCard lines={4} /></div>;
  }
  if (status !== 'authenticated') {
    return (
      <div className={`${SHELL} py-12`}>
        <h1 className="text-3xl font-bold">Your learning analytics</h1>
        <div className="mt-6"><LoginGate message="Log in to see your own learning patterns." /></div>
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
          <h1 className="text-3xl font-bold">Your learning analytics</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Everything here comes from activity this site actually recorded for you. Where there is
            not enough data yet, it says so rather than filling the gap.
          </p>
        </div>
        <Link href="/dashboard" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
          <Icon name="arrow-left" className="mr-1.5 h-3.5 w-3.5" />Dashboard
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
            title="Nothing to analyse yet"
            description="Complete a concept or two and this page fills in — streaks, weekly patterns, the times of day you actually study."
            action={
              <Link href="/courses" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                Start a course
              </Link>
            }
          />
        </div>
      ) : (
        <>
          {/* Headline activity */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Concepts completed', value: d.conceptsCompleted, icon: 'check-circle' },
              { label: 'Active days', value: d.activeDays, icon: 'calendar' },
              { label: 'Current streak', value: `${d.currentStreak} day${d.currentStreak === 1 ? '' : 's'}`, icon: 'fire' },
              { label: 'Longest streak', value: `${d.longestStreak} day${d.longestStreak === 1 ? '' : 's'}`, icon: 'trophy' },
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
            <h2 className="text-xl font-bold">You vs your previous self</h2>
            <p className="mt-1 text-sm text-slate-500">
              The only comparison that matters here. Nobody else&rsquo;s numbers are involved.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ComparisonTile
                label="Concepts this week"
                current={d.comparison.last7}
                previous={d.comparison.previous7}
                change={d.comparison.week}
              />
              <ComparisonTile
                label="Concepts this month"
                current={d.comparison.last30}
                previous={d.comparison.previous30}
                change={d.comparison.month}
              />
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">Completion rate</p>
                <p className="mt-1 text-2xl font-bold">{d.completionRate}%</p>
                <p className="mt-2 text-xs text-slate-400">
                  Of the concepts you opened, how many you finished.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">Quizzes passed</p>
                <p className="mt-1 text-2xl font-bold">{d.quizzesPassed}</p>
                <p className="mt-2 text-xs text-slate-400">
                  {d.challengesCompleted} challenge{d.challengesCompleted === 1 ? '' : 's'} completed
                </p>
              </div>
            </div>
          </section>

          {/* Activity over time */}
          <section className="mt-10 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold">Last 12 weeks</h3>
              <p className="mt-0.5 text-sm text-slate-500">Concepts completed per week.</p>
              <div className="mt-4"><BarChart data={d.weeks} /></div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold">Last 12 months</h3>
              <p className="mt-0.5 text-sm text-slate-500">Concepts completed per month.</p>
              <div className="mt-4"><BarChart data={d.months} /></div>
            </div>
          </section>

          {/* Rhythm */}
          <section className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold">Which days you learn</h3>
              <p className="mt-0.5 text-sm text-slate-500">
                {d.busiestWeekday
                  ? `Most of your completions land on ${d.busiestWeekday.label}.`
                  : 'Not enough activity to see a pattern yet.'}
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
                  <h3 className="font-semibold">Time of day</h3>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {time.busiestHour
                      ? `You study most around ${hourLabel(time.busiestHour.hour)}.`
                      : 'No recorded study time yet.'}
                  </p>
                </div>
                <span className="rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-500">
                  your local time
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
                  Time tracking starts the first time you open a concept page from now on.
                </p>
              )}
            </div>
          </section>

          {/* Time spent */}
          <section className="mt-10">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold">Time spent</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {time.since ? (
                    <>
                      Counted from real page time since{' '}
                      {new Date(time.since).toLocaleDateString()} — not estimated, and not
                      backdated over your earlier learning.
                    </>
                  ) : (
                    'Nothing recorded yet. This counts only time with a learning page open and in front of you.'
                  )}
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">Total tracked</p>
                <p className="mt-1 text-2xl font-bold">{formatDuration(time.totalSeconds)}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">Sessions</p>
                <p className="mt-1 text-2xl font-bold">{time.sessionCount}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">Average session</p>
                <p className="mt-1 text-2xl font-bold">{formatDuration(time.averageSessionSeconds)}</p>
              </div>
            </div>
          </section>

          {/* Course progress */}
          {!!d.courseProgress.length && (
            <section className="mt-10">
              <h2 className="text-xl font-bold">Where your effort went</h2>
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
              heading="Ask AI what this says about you"
              subheading="It reads the same recorded numbers you see above — nothing more."
            />
          </section>
        </>
      )}
    </div>
  );
}
