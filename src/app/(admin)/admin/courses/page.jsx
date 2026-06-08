'use client';

import { useEffect, useState } from 'react';
import { slugify } from '@/lib/slug';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [topicsByCourse, setTopicsByCourse] = useState({});
  const [course, setCourse] = useState({ title: '', description: '', icon: '📘', difficulty: 'beginner', status: 'published' });
  const [busy, setBusy] = useState(false);

  async function load() {
    const cs = await fetch('/api/courses?all=1').then((r) => r.json());
    setCourses(cs);
    const map = {};
    await Promise.all(
      cs.map(async (c) => {
        map[c._id] = await fetch(`/api/topics?courseId=${c._id}`).then((r) => r.json());
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
      <h1 className="text-2xl font-bold">Courses & Topics</h1>

      <form onSubmit={createCourse} className="mt-6 rounded-2xl border border-slate-200 p-5">
        <h2 className="font-semibold">New course</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-[80px_1fr]">
          <input
            value={course.icon}
            onChange={(e) => setCourse({ ...course, icon: e.target.value })}
            className="rounded-lg border border-slate-200 px-3 py-2 text-center"
            placeholder="📘"
          />
          <input
            required
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            className="rounded-lg border border-slate-200 px-3 py-2"
            placeholder="Course title (e.g. JavaScript)"
          />
        </div>
        <textarea
          value={course.description}
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
          className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2"
          placeholder="Short description"
          rows={2}
        />
        <div className="mt-3 flex items-center gap-3">
          <select
            value={course.difficulty}
            onChange={(e) => setCourse({ ...course, difficulty: e.target.value })}
            className="rounded-lg border border-slate-200 px-3 py-2"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <button disabled={busy} className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">
            {busy ? 'Creating…' : 'Create course'}
          </button>
        </div>
      </form>

      <div className="mt-8 space-y-4">
        {courses.map((c) => (
          <div key={c._id} className="rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{c.icon} {c.title}</span>
              <span className="text-xs text-slate-400">/{c.slug} · {c.status}</span>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-slate-600">
              {(topicsByCourse[c._id] || []).map((t) => (
                <li key={t._id} className="rounded bg-slate-50 px-3 py-1.5">{t.title}</li>
              ))}
              {(topicsByCourse[c._id] || []).length === 0 && (
                <li className="text-slate-400">No topics yet.</li>
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
        className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
        placeholder="Add a topic…"
      />
      <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium hover:bg-slate-50">
        Add
      </button>
    </form>
  );
}
