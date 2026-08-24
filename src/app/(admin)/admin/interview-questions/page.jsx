'use client';

import { useEffect, useState } from 'react';
import { slugify } from '@/lib/slug';

const EMPTY = {
  courseId: '',
  question: '',
  answer: { english: '', hinglish: '' },
  difficulty: 'medium',
  frequency: 'common',
};

export default function AdminInterviewQuestionsPage() {
  const [courses, setCourses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  async function load() {
    const [cs, qs] = await Promise.all([
      fetch('/api/courses?all=1').then((r) => r.json()),
      fetch('/api/interview-questions').then((r) => r.json()),
    ]);
    setCourses(Array.isArray(cs) ? cs : []);
    setQuestions(Array.isArray(qs) ? qs : []);
  }

  useEffect(() => { load(); }, []);

  const courseById = {};
  for (const c of courses) courseById[c._id] = c;

  async function add(e) {
    e.preventDefault();
    if (!form.courseId || !form.question) { setMsg('Course and question are required.'); return; }
    setBusy(true);
    setMsg('');
    const payload = {
      ...form,
      slug: `${slugify(form.question).slice(0, 60)}-${Date.now().toString(36)}`,
      status: 'published',
    };
    const res = await fetch('/api/interview-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setBusy(false);
    if (res.ok) { setForm(EMPTY); load(); }
    else setMsg((await res.json()).error || 'Failed to add');
  }

  async function remove(id) {
    if (!confirm('Delete this question?')) return;
    const res = await fetch(`/api/interview-questions/${id}`, { method: 'DELETE' });
    if (res.ok) load();
  }

  const input = 'w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-indigo-400';

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold">Interview Questions</h1>

      <form onSubmit={add} className="mt-6 space-y-3 rounded-2xl border border-slate-200 p-5">
        <h2 className="font-semibold">Add a question</h2>
        {msg && <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{msg}</p>}
        <div className="grid gap-3 sm:grid-cols-2">
          <select value={form.courseId} onChange={(e) => setForm({ ...form, courseId: e.target.value })} className={input}>
            <option value="">Select course…</option>
            {courses.map((c) => <option key={c._id} value={c._id}>{c.title}</option>)}
          </select>
          <div className="grid grid-cols-2 gap-3">
            <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} className={input}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <select value={form.frequency} onChange={(e) => setForm({ ...form, frequency: e.target.value })} className={input}>
              <option value="common">Common</option>
              <option value="rare">Rare</option>
            </select>
          </div>
        </div>
        <input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} placeholder="Question" className={input} />
        <textarea rows={3} value={form.answer.english} onChange={(e) => setForm({ ...form, answer: { ...form.answer, english: e.target.value } })} placeholder="Answer (English)" className={input} />
        <textarea rows={3} value={form.answer.hinglish} onChange={(e) => setForm({ ...form, answer: { ...form.answer, hinglish: e.target.value } })} placeholder="Answer (Hinglish)" className={input} />
        <button disabled={busy} className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">
          {busy ? 'Adding…' : 'Add question'}
        </button>
      </form>

      <p className="mt-8 text-sm text-slate-500">{questions.length} questions</p>
      <div className="mt-3 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
        {questions.map((q) => (
          <div key={q._id} className="flex items-start justify-between gap-3 px-4 py-3">
            <div>
              <p className="font-medium">{q.question}</p>
              <p className="text-xs text-slate-400">
                {q.courseId && courseById[q.courseId] ? courseById[q.courseId].title : 'No course'} · {q.difficulty}
              </p>
            </div>
            <button onClick={() => remove(q._id)} className="shrink-0 text-sm text-red-500 hover:underline">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
