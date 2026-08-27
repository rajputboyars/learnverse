import Link from 'next/link';
import { connectDB } from '@/lib/db';
import InterviewQuestion from '@/models/InterviewQuestion';
import Course from '@/models/Course';
import L from '@/components/L';
import InterviewQuestionsBrowser from '@/components/InterviewQuestionsBrowser';
import Icon from '@/components/Icon';

export const revalidate = 3600;

export const metadata = {
  title: 'Interview Questions',
  description:
    'Developer interview questions with answers in English and Hinglish — search across every course, or browse by level.',
};

const SHELL = 'mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8';
const LEVELS = ['all', 'easy', 'medium', 'hard'];
const PUBLISHED = { status: { $in: ['approved', 'published'] } };

// Questions are always presented easy → medium → hard.
const DIFFICULTY_RANK = { easy: 0, medium: 1, hard: 2 };

const LEVEL_STYLE = {
  easy: { dot: 'bg-emerald-500', tint: 'bg-emerald-50', bar: 'bg-emerald-500' },
  medium: { dot: 'bg-amber-500', tint: 'bg-amber-50', bar: 'bg-amber-500' },
  hard: { dot: 'bg-red-500', tint: 'bg-red-50', bar: 'bg-red-500' },
};

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hrefFor({ course, difficulty, q }) {
  const params = new URLSearchParams();
  if (course && course !== 'all') params.set('course', course);
  if (difficulty && difficulty !== 'all') params.set('difficulty', difficulty);
  if (q) params.set('q', q);
  const qs = params.toString();
  return qs ? `/interview-questions?${qs}` : '/interview-questions';
}

/* ── The landing view: everything you need to choose a way in ── */
async function getIndexData() {
  await connectDB();

  const [courses, byCourseLevel, byLevel, total, starterRows] = await Promise.all([
    Course.find({ status: 'published' }).sort({ order: 1 }).select('title slug icon').lean(),
    InterviewQuestion.aggregate([
      { $match: PUBLISHED },
      { $group: { _id: { course: '$courseId', level: '$difficulty' }, n: { $sum: 1 } } },
    ]),
    InterviewQuestion.aggregate([{ $match: PUBLISHED }, { $group: { _id: '$difficulty', n: { $sum: 1 } } }]),
    InterviewQuestion.countDocuments(PUBLISHED),
    InterviewQuestion.find({ ...PUBLISHED, frequency: 'common' })
      .select('question difficulty courseId')
      .lean(),
  ]);

  // Per-course totals and difficulty mix.
  const stats = {};
  for (const c of courses) stats[c._id.toString()] = { easy: 0, medium: 0, hard: 0, total: 0 };
  for (const row of byCourseLevel) {
    const s = stats[row._id.course?.toString()];
    if (!s) continue;
    s[row._id.level || 'medium'] += row.n;
    s.total += row.n;
  }

  const courseCards = courses
    .map((c) => ({ slug: c.slug, title: c.title, icon: c.icon, ...stats[c._id.toString()] }))
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total);

  const levels = ['easy', 'medium', 'hard'].map((key) => ({
    key,
    count: byLevel.find((r) => r._id === key)?.n || 0,
  }));

  // One starter from each of the five biggest courses. "Keeps coming up" has to
  // mean the core of the stack, not whichever question was added most recently.
  const rank = {};
  courseCards.slice(0, 5).forEach((c, i) => { rank[c.slug] = i; });
  const byIdInfo = {};
  for (const c of courses) byIdInfo[c._id.toString()] = { title: c.title, slug: c.slug };

  const picked = new Map();
  for (const q of starterRows) {
    const course = byIdInfo[q.courseId?.toString()];
    if (!course || rank[course.slug] === undefined || picked.has(course.slug)) continue;
    picked.set(course.slug, {
      id: q._id.toString(),
      question: q.question,
      difficulty: q.difficulty || 'medium',
      course,
    });
  }
  const starters = [...picked.values()].sort((a, b) => rank[a.course.slug] - rank[b.course.slug]);

  return { courseCards, levels, total, starters, courseCount: courseCards.length };
}

/* ── Cross-course results: a search term, a level, or both ── */
async function getCrossCourseData(term, difficulty) {
  await connectDB();
  const filter = { ...PUBLISHED };
  if (difficulty && difficulty !== 'all') filter.difficulty = difficulty;
  if (term) filter.question = new RegExp(escapeRegex(term), 'i');

  const [rows, courses] = await Promise.all([
    InterviewQuestion.find(filter)
      .sort({ createdAt: -1 })
      .limit(400)
      .select('question difficulty frequency courseId')
      .lean(),
    Course.find({ status: 'published' }).select('title slug icon').lean(),
  ]);

  const byId = {};
  for (const c of courses) byId[c._id.toString()] = c;

  const results = rows
    .map((q) => {
      const course = byId[q.courseId?.toString()];
      if (!course) return null;
      return {
        id: q._id.toString(),
        question: q.question,
        difficulty: q.difficulty || 'medium',
        frequency: q.frequency || 'common',
        course: { title: course.title, slug: course.slug, icon: course.icon },
      };
    })
    .filter(Boolean)
    .sort((a, b) => (DIFFICULTY_RANK[a.difficulty] ?? 1) - (DIFFICULTY_RANK[b.difficulty] ?? 1));

  return { results, capped: rows.length >= 400 };
}

/* ── One course: the full browser ── */
async function getCourseData(courseSlug, difficulty) {
  await connectDB();
  const activeCourse = await Course.findOne({ slug: courseSlug, status: 'published' })
    .select('title slug icon')
    .lean();
  if (!activeCourse) return null;

  const filter = { ...PUBLISHED, courseId: activeCourse._id };
  if (difficulty && difficulty !== 'all') filter.difficulty = difficulty;

  const [rows, mix] = await Promise.all([
    InterviewQuestion.find(filter).sort({ createdAt: -1 }).lean(),
    InterviewQuestion.aggregate([
      { $match: { ...PUBLISHED, courseId: activeCourse._id } },
      { $group: { _id: '$difficulty', n: { $sum: 1 } } },
    ]),
  ]);

  const questions = rows
    .sort((a, b) => (DIFFICULTY_RANK[a.difficulty] ?? 1) - (DIFFICULTY_RANK[b.difficulty] ?? 1))
    .map((q) => ({
      id: q._id.toString(),
      question: q.question,
      difficulty: q.difficulty || 'medium',
      frequency: q.frequency || 'common',
      english: q.answer?.english || '',
      hinglish: q.answer?.hinglish || '',
      codeExample: q.codeExample?.code
        ? { code: q.codeExample.code, output: q.codeExample.output || '' }
        : null,
      visual: q.visual || '',
      deepDive: (q.deepDive || [])
        .filter((d) => d?.body?.en || d?.body?.hi || d?.code || d?.diagram)
        .map((d) => ({
          heading: { en: d.heading?.en || '', hi: d.heading?.hi || '' },
          body: { en: d.body?.en || '', hi: d.body?.hi || '' },
          code: d.code || '',
          diagram: d.diagram || '',
        })),
    }));

  const counts = { easy: 0, medium: 0, hard: 0, total: 0 };
  for (const row of mix) {
    counts[row._id || 'medium'] += row.n;
    counts.total += row.n;
  }

  return {
    activeCourse: {
      title: activeCourse.title,
      slug: activeCourse.slug,
      icon: activeCourse.icon,
    },
    questions,
    counts,
  };
}

export default async function InterviewQuestionsPage({ searchParams }) {
  const sp = await searchParams;
  const course = sp?.course || 'all';
  const difficulty = sp?.difficulty || 'all';
  const term = (sp?.q || '').trim();
  const qid = sp?.qid || null;

  /* ══════════ One course: the browser ══════════ */
  if (course !== 'all') {
    const data = await getCourseData(course, difficulty).catch(() => null);
    if (data) {
      const { activeCourse, questions, counts } = data;
      return (
        <div className="bg-slate-50 pb-16">
          <nav className={`${SHELL} flex items-center gap-2 pt-5 text-sm text-slate-400`}>
            <Link href="/interview-questions" className="hover:text-indigo-600">
              <L hi="Interview questions" en="Interview questions" />
            </Link>
            <span>/</span>
            <span className="truncate font-medium text-slate-600">{activeCourse.title}</span>
          </nav>

          {/* Compact course header */}
          <header className={`${SHELL} pt-3.5`}>
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 dark:bg-slate-950">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-45"
                style={{
                  backgroundImage:
                    'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -top-36 right-72 h-[340px] w-[520px] rounded-full bg-indigo-600 opacity-25 blur-[140px]"
              />
              <div className="relative flex flex-wrap items-center gap-6 p-6 sm:px-7">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-800">
                  <Icon name={activeCourse.icon} brand className="h-6 w-6" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h1 className="text-2xl font-extrabold tracking-tight text-white">{activeCourse.title}</h1>
                  <p className="flex flex-wrap items-center gap-3.5 text-xs text-slate-400">
                    <span>{counts.total} <L hi="questions" en="questions" /></span>
                    {['easy', 'medium', 'hard'].map((k) =>
                      counts[k] > 0 ? (
                        <span key={k} className="flex items-center gap-1.5">
                          <span className={`h-1.5 w-1.5 rounded-full ${LEVEL_STYLE[k].dot}`} />
                          {counts[k]} {k}
                        </span>
                      ) : null
                    )}
                  </p>
                </div>
                <div className="ml-auto flex flex-wrap gap-2.5">
                  <Link
                    href={`/courses/${activeCourse.slug}`}
                    className="rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800"
                  >
                    <L hi="Course kholo" en="Open course" />
                  </Link>
                  <Link
                    href={`/mock-interview/${activeCourse.slug}`}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    <Icon name="microphone" className="h-3.5 w-3.5" />
                    <L hi="Mock interview" en="Mock interview" />
                  </Link>
                </div>
              </div>
            </div>
          </header>

          <div className={SHELL}>
            {questions.length > 0 ? (
              <InterviewQuestionsBrowser
                questions={questions}
                initialQuestionId={qid}
                levelLinks={LEVELS.map((l) => ({
                  key: l,
                  href: hrefFor({ course, difficulty: l }),
                  active: difficulty === l,
                }))}
              />
            ) : (
              <p className="mt-6 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
                <L
                  hi="Is filter ke liye koi question nahi mila. Doosra level try karo."
                  en="No questions for this filter. Try another level."
                />
              </p>
            )}
          </div>
        </div>
      );
    }
  }

  /* ══════════ Cross-course: a search term or a level ══════════ */
  if (term.length >= 2 || difficulty !== 'all') {
    const { results, capped } = await getCrossCourseData(term, difficulty).catch(() => ({
      results: [],
      capped: false,
    }));

    return (
      <div className="bg-slate-50 pb-16">
        <nav className={`${SHELL} flex items-center gap-2 pt-5 text-sm text-slate-400`}>
          <Link href="/interview-questions" className="hover:text-indigo-600">
            <L hi="Interview questions" en="Interview questions" />
          </Link>
          <span>/</span>
          <span className="font-medium capitalize text-slate-600">
            {term ? `“${term}”` : difficulty}
          </span>
        </nav>

        <div className={`${SHELL} pt-4`}>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {results.length}{' '}
            {difficulty !== 'all' && <span className="capitalize">{difficulty} </span>}
            <L hi="questions mile" en="questions" />
          </h1>

          <form action="/interview-questions" className="mt-5 flex flex-wrap gap-2.5">
            {difficulty !== 'all' && <input type="hidden" name="difficulty" value={difficulty} />}
            <span className="relative min-w-[240px] flex-1">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Icon name="search" className="h-4 w-4" />
              </span>
              <input
                type="search"
                name="q"
                defaultValue={term}
                placeholder="Search…"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-indigo-400"
              />
            </span>
            {LEVELS.map((l) => (
              <Link
                key={l}
                href={hrefFor({ difficulty: l, q: term })}
                className={`flex h-11 items-center rounded-xl px-4 text-sm font-semibold capitalize transition ${
                  difficulty === l
                    ? 'bg-slate-900 text-white dark:bg-slate-700'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-indigo-300'
                }`}
              >
                {l === 'all' ? <L hi="Sab" en="All" /> : l}
              </Link>
            ))}
          </form>

          {results.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
              <L
                hi="Kuch nahi mila. Doosra search ya level try karo."
                en="Nothing matched. Try another search or level."
              />
            </p>
          ) : (
            <div className="mt-5 flex flex-col gap-2.5">
              {results.map((r) => (
                <Link
                  key={r.id}
                  href={`/interview-questions?course=${r.course.slug}&qid=${r.id}`}
                  className="flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-2xl border border-slate-200 bg-white px-5 py-4 transition hover:border-indigo-300"
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${LEVEL_STYLE[r.difficulty]?.dot}`} />
                  <span className="flex-1 font-medium">{r.question}</span>
                  <span className="flex shrink-0 items-center gap-1.5 text-xs text-slate-400">
                    <Icon name={r.course.icon} brand className="h-3.5 w-3.5" />
                    {r.course.title}
                  </span>
                  <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-600">
                    {r.difficulty}
                  </span>
                </Link>
              ))}
              {capped && (
                <p className="pt-2 text-center text-sm text-slate-400">
                  <L
                    hi="Pehle 400 dikhaye ja rahe hain — search se aur narrow karo."
                    en="Showing the first 400 — narrow it down with a search."
                  />
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ══════════ Landing ══════════ */
  const { courseCards, levels, total, starters, courseCount } = await getIndexData().catch(() => ({
    courseCards: [],
    levels: [],
    total: 0,
    starters: [],
    courseCount: 0,
  }));

  return (
    <div className="bg-slate-50 pb-16">

      {/* Hero — search first */}
      <section className={`${SHELL} pt-5`}>
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 dark:bg-slate-950">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -top-44 right-60 h-[420px] w-[640px] rounded-full bg-indigo-600 opacity-25 blur-[150px]"
          />

          <div className="relative flex flex-col items-center gap-5 p-6 py-10 sm:p-12">
            <span className="flex items-center gap-2 rounded-full border border-slate-700 px-3.5 py-1.5 text-xs font-medium text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              <L hi="Har jawab English aur Hinglish, dono mein" en="Every answer in English and Hinglish" />
            </span>

            <h1 className="max-w-3xl text-center text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
              {total.toLocaleString()}{' '}
              <L hi="questions. Wahi jo interview mein " en="questions. The ones interviews " />
              <span className="text-indigo-300">
                <L hi="sach mein poochhe jaate hain." en="actually ask." />
              </span>
            </h1>

            <form action="/interview-questions" className="w-full max-w-2xl">
              <span className="relative block">
                <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Icon name="search" className="h-4 w-4" />
                </span>
                <input
                  type="search"
                  name="q"
                  placeholder="Search across every course — closures, event loop, useEffect…"
                  className="h-14 w-full rounded-2xl border border-slate-700 bg-slate-800 pl-12 pr-4 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500"
                />
              </span>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <Link
                href={hrefFor({ difficulty: 'easy' })}
                className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800"
              >
                <L hi="Easy se shuru" en="Start easy" />
              </Link>
              <Link
                href={hrefFor({ difficulty: 'hard' })}
                className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800"
              >
                <L hi="Sirf hard" en="Hard only" />
              </Link>
              <Link
                href="/courses"
                className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                <Icon name="microphone" className="h-3 w-3" />
                <L hi="Mock interview" en="Mock interview" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by level */}
      {levels.length > 0 && (
        <section className={`${SHELL} pt-8`}>
          <h2 className="text-xl font-bold tracking-tight">
            <L hi="Level se browse karo" en="Browse by level" />
          </h2>
          <p className="mt-1.5 text-sm text-slate-600">
            <L
              hi="Saare courses ke questions, ek hi jagah."
              en="Every course's questions, in one place."
            />
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {levels.map((lv) => (
              <Link
                key={lv.key}
                href={hrefFor({ difficulty: lv.key })}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-300"
              >
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${LEVEL_STYLE[lv.key].tint}`}>
                  <span className={`h-3 w-3 rounded-full ${LEVEL_STYLE[lv.key].dot}`} />
                </span>
                <span className="flex flex-1 flex-col gap-0.5">
                  <span className="flex items-baseline gap-2">
                    <span className="font-bold capitalize">{lv.key}</span>
                    <span className="text-sm text-slate-400">{lv.count.toLocaleString()}</span>
                  </span>
                  <span className="text-sm text-slate-500">
                    {lv.key === 'easy' && <L hi="Definitions aur basics" en="Definitions and basics" />}
                    {lv.key === 'medium' && (
                      <L hi="Yahin pe interviews tikte hain" en="Where most interviews live" />
                    )}
                    {lv.key === 'hard' && <L hi="Senior rounds" en="Senior rounds" />}
                  </span>
                </span>
                <Icon name="arrow-right" className="h-3.5 w-3.5 shrink-0 text-slate-300" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Start here */}
      {starters.length > 0 && (
        <section className={`${SHELL} pt-8`}>
          <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 lg:flex-row lg:gap-8 lg:p-7">
            <div className="flex flex-col gap-2.5 lg:w-[300px] lg:shrink-0">
              <span className="w-fit rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
                <L hi="Yahin se shuru karo" en="Start here" />
              </span>
              <h2 className="text-xl font-bold tracking-tight">
                <L
                  hi="Kahan se shuru karein, samajh nahi aa raha?"
                  en="Not sure where to start?"
                />
              </h2>
              <p className="text-sm leading-relaxed text-slate-600">
                <L
                  hi="Ye woh sawaal hain jo baar-baar poochhe jaate hain — course chahe koi bhi ho."
                  en="The questions that keep coming up, whichever course they belong to."
                />
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-2.5">
              {starters.map((s) => (
                <Link
                  key={s.id}
                  href={`/interview-questions?course=${s.course.slug}&qid=${s.id}`}
                  className="flex flex-wrap items-center gap-x-3.5 gap-y-1 rounded-xl border border-slate-200 px-4 py-3 transition hover:border-indigo-300"
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${LEVEL_STYLE[s.difficulty]?.dot}`} />
                  <span className="flex-1 text-sm">{s.question}</span>
                  <span className="shrink-0 text-xs text-slate-400">{s.course.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Browse by course */}
      <section className={`${SHELL} pt-8`}>
        <h2 className="text-xl font-bold tracking-tight">
          <L hi="Course se browse karo" en="Browse by course" />
        </h2>
        <p className="mt-1.5 text-sm text-slate-600">
          {courseCount}{' '}
          <L
            hi="courses. Har card apna difficulty mix dikhata hai."
            en="courses. Every card shows its difficulty mix."
          />
        </p>

        {courseCards.length === 0 ? (
          <p className="mt-6 text-center text-slate-500">
            <L hi="Abhi koi course nahi hai." en="No courses available yet." />
          </p>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courseCards.map((c) => (
              <div key={c.slug} className="flex flex-col gap-3.5 rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-50">
                    <Icon name={c.icon || 'book'} brand className="h-5 w-5" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate font-bold">{c.title}</span>
                    <span className="text-xs text-slate-400">
                      {c.total} <L hi="questions" en="questions" />
                    </span>
                  </span>
                </div>

                {/* Difficulty mix — the thing the old card never showed */}
                <div className="flex flex-col gap-2">
                  <span className="flex h-1.5 gap-0.5">
                    {['easy', 'medium', 'hard'].map((k) =>
                      c[k] > 0 ? (
                        <span
                          key={k}
                          className={`rounded-full ${LEVEL_STYLE[k].bar}`}
                          style={{ width: `${(c[k] / c.total) * 100}%` }}
                        />
                      ) : null
                    )}
                  </span>
                  <span className="flex gap-3 text-[11px] text-slate-400">
                    <span>{c.easy} easy</span>
                    <span>{c.medium} medium</span>
                    <span>{c.hard} hard</span>
                  </span>
                </div>

                <div className="mt-auto flex gap-2">
                  <Link
                    href={`/interview-questions?course=${c.slug}`}
                    className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    <L hi="Browse" en="Browse" />
                  </Link>
                  <Link
                    href={`/mock-interview/${c.slug}`}
                    title="Mock interview"
                    className="grid w-11 place-items-center rounded-xl border border-slate-200 hover:border-indigo-300"
                  >
                    <Icon name="microphone" className="h-4 w-4 text-indigo-600" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
