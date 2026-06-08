'use client';

import { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-4 py-16 text-slate-400">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') || '/dashboard';
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await signIn('credentials', {
      ...form,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError('Galat email ya password.');
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <h1 className="text-2xl font-bold">Welcome back 👋</h1>
      <p className="mt-1 text-slate-600">Login to track your XP and streak.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
        )}
        <input
          type="email"
          required
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-indigo-400"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-indigo-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Logging in…' : 'Login'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        New here?{' '}
        <Link href="/register" className="font-semibold text-indigo-600 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
