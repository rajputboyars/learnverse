'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminConceptsPage() {
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await fetch('/api/concepts?all=1').then((r) => r.json());
      setConcepts(Array.isArray(data) ? data : []);
    } catch {
      // A non-JSON error response would otherwise leave this stuck loading.
      setConcepts([]);
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-2xl font-bold text-ink">Concepts</h1>
        <Link href="/admin/concepts/new" className="lv-btn lv-btn-primary py-2 text-sm">
          + New concept
        </Link>
      </div>

      {loading ? (
        <p className="mt-6 text-muted">Loading…</p>
      ) : concepts.length === 0 ? (
        <p className="mt-6 rounded-3xl border border-dashed border-line p-8 text-center text-muted">No concepts yet.</p>
      ) : (
        <div className="lv-card mt-6 divide-y divide-line-soft overflow-hidden">
          {concepts.map((c) => (
            <div key={c._id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div>
                <p className="font-semibold text-ink">{c.title}</p>
                <p className="mt-0.5 text-xs text-muted-soft">/{c.slug} · {c.status}</p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Link href={`/concepts/${c.slug}`} className="text-muted hover:text-brand">View</Link>
                <Link href={`/admin/concepts/${c._id}/edit`} className="font-bold text-brand hover:underline">Edit</Link>
                <button onClick={() => remove(c._id)} className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
