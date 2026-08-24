'use client';

import { useEffect, useState } from 'react';
import { slugify } from '@/lib/slug';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [topicsByCourse, setTopicsByCourse] = useState({});
  const [course, setCourse] = useState({ title: '', description: '', icon: '📘', difficulty: 'beginner', status: 'published' });
  const [busy, setBusy] = useState(false);

  async function load() {
    // /api/courses returns an { error } object (not an array) when the DB is
    // unreachable — guard so the page doesn't crash on `.map`.
    let cs = [];
    try {
      const data = await fetch('/api/courses?all=1').then((r) => r.json());
      cs = Array.isArray(data) ? data : [];
    } catch { cs = []; }
    setCourses(cs);

    const map = {};
    await Promise.all(
      cs.map(async (c) => {
        try {
          const topics = await fetch(`/api/topics?courseId=${c._id}`).then((r) => r.json());
          map[c._id] = Array.isArray(topics) ? topics : [];
        } catch { map[c._id] = []; }
      })
    );
    setTopicsByCourse(map);
  }

  useEffect(() => { load(); }, []);

  async function createCourse(e) {
    e.preventDefault();
    setBusy(true);
    const res = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...course, slug: slugify(course.title) }),
    });
    setBusy(false);
    if (res.ok) {
      setCourse({ title: '', description: '', icon: '📘', difficulty: 'beginner', status: 'published' });
      load();
    } else {
      alert((await res.json()).error);
    }
  }

  async function addTopic(courseId, title) {
    if (!title) return;
    const res = await fetch('/api/topics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId, title, slug: slugify(title), status: 'published' }),
    });
    if (res.ok) load();
    else alert((await res.json()).error);
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-ink">Courses &amp; Topics</h1>

      <form onSubmit={createCourse} className="lv-card mt-6 p-5">
        <h2 className="font-bold text-ink">New course</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-[80px_1fr]">
          <input
            value={course.icon}
            onChange={(e) => setCourse({ ...course, icon: e.target.value })}
            className="rounded-xl border border-line bg-card px-3 py-2 text-center text-ink outline-none focus:border-brand"
            placeholder="📘"
          />
          <input
            required
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            className="rounded-xl border border-line bg-card px-3 py-2 text-ink outline-none focus:border-brand"
            placeholder="Course title (e.g. JavaScript)"
          />
        </div>
        <textarea
          value={course.description}
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
          className="mt-3 w-full rounded-xl border border-line bg-card px-3 py-2 text-ink outline-none focus:border-brand"
          placeholder="Short description"
          rows={2}
        />
        <div className="mt-3 flex items-center gap-3">
          <select
            value={course.difficulty}
            onChange={(e) => setCourse({ ...course, difficulty: e.target.value })}
            className="rounded-xl border border-line bg-card px-3 py-2 text-ink outline-none focus:border-brand"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <button disabled={busy} className="lv-btn lv-btn-primary py-2 text-sm disabled:opacity-50">
            {busy ? 'Creating…' : 'Create course'}
          </button>
        </div>
      </form>

      <div className="mt-8 space-y-4">
        {courses.map((c) => (
          <div key={c._id} className="lv-card p-5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-ink">{c.icon} {c.title}</span>
              <span className="lv-pill bg-line-soft text-[11px] text-muted">/{c.slug} · {c.status}</span>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-ink-soft">
              {(topicsByCourse[c._id] || []).map((t) => (
                <li key={t._id} className="rounded-lg bg-line-soft px-3 py-1.5">{t.title}</li>
              ))}
              {(topicsByCourse[c._id] || []).length === 0 && (
                <li className="text-muted-soft">No topics yet.</li>
              )}
            </ul>
            <TopicAdder onAdd={(title) => addTopic(c._id, title)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TopicAdder({ onAdd }) {
  const [title, setTitle] = useState('');
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onAdd(title); setTitle(''); }}
      className="mt-3 flex gap-2"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 rounded-xl border border-line bg-card px-3 py-1.5 text-sm text-ink outline-none focus:border-brand"
        placeholder="Add a topic…"
      />
      <button className="lv-btn lv-btn-ghost px-3 py-1.5 text-sm">
        Add
      </button>
    </form>
  );
}
