'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { slugify } from '@/lib/slug';

const EMPTY = {
  courseId: '',
  topicId: '',
  title: '',
  slug: '',
  explanation: { english: '', hinglish: '' },
  dailyLifeExample: '',
  codeExample: '',
  codeLanguage: 'javascript',
  keyPoints: '',
  difficulty: 'easy',
  tags: '',
};

export default function ConceptForm() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [quiz, setQuiz] = useState([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/courses?all=1').then((r) => r.json()).then(setCourses);
  }, []);

  useEffect(() => {
    if (!form.courseId) { setTopics([]); return; }
    fetch(`/api/topics?courseId=${form.courseId}`).then((r) => r.json()).then(setTopics);
  }, [form.courseId]);

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }
  function setExp(k, v) { setForm((f) => ({ ...f, explanation: { ...f.explanation, [k]: v } })); }

  function addQuiz() {
    setQuiz((q) => [...q, { question: '', options: ['', '', '', ''], correctIndex: 0, explanation: '' }]);
  }
  function updateQuiz(i, patch) {
    setQuiz((q) => q.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  }
  function updateOption(i, oi, val) {
    setQuiz((q) => q.map((item, idx) => idx === i ? { ...item, options: item.options.map((o, j) => j === oi ? val : o) } : item));
  }

  async function save(status) {
    if (!form.courseId || !form.topicId) { setMsg('Select a course and topic.'); return; }
    setSaving(true);
    setMsg('');
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      keyPoints: form.keyPoints.split('\n').map((s) => s.trim()).filter(Boolean),
      tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean),
      quiz: quiz.filter((q) => q.question && q.options.every((o) => o)),
      status,
    };
    const res = await fetch('/api/concepts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      router.push('/admin/concepts');
      router.refresh();
    } else {
      setMsg((await res.json()).error || 'Failed to save');
    }
  }

  const input = 'w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-indigo-400';

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="space-y-5">
        {msg && <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{msg}</p>}

        <div className="grid gap-3 sm:grid-cols-2">
          <select value={form.courseId} onChange={(e) => { set('courseId', e.target.value); set('topicId', ''); }} className={input}>
            <option value="">Select course…</option>
            {courses.map((c) => <option key={c._id} value={c._id}>{c.title}</option>)}
          </select>
          <select value={form.topicId} onChange={(e) => set('topicId', e.target.value)} className={input}>
            <option value="">Select topic…</option>
            {topics.map((t) => <option key={t._id} value={t._id}>{t.title}</option>)}
          </select>
        </div>

        <div>
          <input
            value={form.title}
            onChange={(e) => { set('title', e.target.value); set('slug', slugify(e.target.value)); }}
            placeholder="Concept title (e.g. JavaScript Closures)"
            className={input}
          />
          <p className="mt-1 text-xs text-slate-400">URL: /concepts/{form.slug || 'your-slug'}</p>
        </div>

        <div className="grid gap-3">
          <label className="text-sm font-medium">English explanation</label>
          <textarea rows={5} value={form.explanation.english} onChange={(e) => setExp('english', e.target.value)} className={input} />
          <label className="text-sm font-medium">Hinglish explanation</label>
          <textarea rows={5} value={form.explanation.hinglish} onChange={(e) => setExp('hinglish', e.target.value)} className={input} />
        </div>

        <div>
          <label className="text-sm font-medium">🪔 Daily-life example (the USP)</label>
          <textarea rows={3} value={form.dailyLifeExample} onChange={(e) => set('dailyLifeExample', e.target.value)} className={`${input} mt-1`} />
        </div>

        <div>
          <label className="text-sm font-medium">Code example</label>
          <textarea rows={6} value={form.codeExample} onChange={(e) => set('codeExample', e.target.value)} className={`${input} mt-1 font-mono text-sm`} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Key points (one per line)</label>
            <textarea rows={3} value={form.keyPoints} onChange={(e) => set('keyPoints', e.target.value)} className={`${input} mt-1`} />
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Tags (comma separated)</label>
              <input value={form.tags} onChange={(e) => set('tags', e.target.value)} className={`${input} mt-1`} />
            </div>
            <div>
              <label className="text-sm font-medium">Difficulty</label>
              <select value={form.difficulty} onChange={(e) => set('difficulty', e.target.value)} className={`${input} mt-1`}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quiz builder */}
        <div className="rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">🧠 Quiz</h3>
            <button onClick={addQuiz} className="text-sm font-medium text-indigo-600 hover:underline">+ Add question</button>
          </div>
          {quiz.map((q, i) => (
            <div key={i} className="mt-3 rounded-lg bg-slate-50 p-3">
              <input value={q.question} onChange={(e) => updateQuiz(i, { question: e.target.value })} placeholder="Question" className={input} />
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {q.options.map((o, oi) => (
                  <label key={oi} className="flex items-center gap-2">
                    <input type="radio" checked={q.correctIndex === oi} onChange={() => updateQuiz(i, { correctIndex: oi })} />
                    <input value={o} onChange={(e) => updateOption(i, oi, e.target.value)} placeholder={`Option ${oi + 1}`} className="flex-1 rounded border border-slate-200 px-2 py-1 text-sm" />
                  </label>
                ))}
              </div>
              <input value={q.explanation} onChange={(e) => updateQuiz(i, { explanation: e.target.value })} placeholder="Why is this correct? (optional)" className={`${input} mt-2 text-sm`} />
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={() => save('draft')} disabled={saving} className="rounded-lg border border-slate-200 px-5 py-2.5 font-semibold hover:bg-slate-50 disabled:opacity-50">
            Save draft
          </button>
          <button onClick={() => save('published')} disabled={saving} className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">
            {saving ? 'Saving…' : 'Publish'}
          </button>
        </div>
      </div>

      {/* AI assist panel — separate column (wireframe). Stub for Phase 2. */}
      <aside className="h-fit rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/40 p-4">
        <h3 className="flex items-center gap-2 font-semibold text-indigo-700">✨ AI Assist</h3>
        <p className="mt-2 text-sm text-slate-600">
          Phase 2: generate a draft, auto-create the Hinglish version, suggest a
          daily-life analogy, and draft quiz questions.
        </p>
        <button disabled className="mt-3 w-full cursor-not-allowed rounded-lg bg-indigo-200 px-4 py-2 text-sm font-semibold text-white">
          Generate draft (coming soon)
        </button>
      </aside>
    </div>
  );
}
