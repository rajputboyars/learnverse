'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminConceptsPage() {
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await fetch('/api/concepts?all=1').then((r) => r.json());
    setConcepts(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function remove(id) {
    if (!confirm('Delete this concept?')) return;
    const res = await fetch(`/api/concepts/${id}`, { method: 'DELETE' });
    if (res.ok) load();
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Concepts</h1>
        <Link href="/admin/concepts/new" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
          + New concept
        </Link>
      </div>

      {loading ? (
        <p className="mt-6 text-slate-400">Loading…</p>
      ) : concepts.length === 0 ? (
        <p className="mt-6 text-slate-400">No concepts yet.</p>
      ) : (
        <div className="mt-6 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
          {concepts.map((c) => (
            <div key={c._id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-medium">{c.title}</p>
                <p className="text-xs text-slate-400">/{c.slug} · {c.status}</p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Link href={`/concepts/${c.slug}`} className="text-slate-500 hover:text-indigo-600">View</Link>
                <Link href={`/admin/concepts/${c._id}/edit`} className="font-medium text-indigo-600 hover:underline">Edit</Link>
                <button onClick={() => remove(c._id)} className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
