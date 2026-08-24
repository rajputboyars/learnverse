'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';

function UserIcon({ className = '' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 ${className}`}>
      <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.4 0-8 2.24-8 5v1a2 2 0 002 2h12a2 2 0 002-2v-1c0-2.76-3.6-5-8-5z" />
    </svg>
  );
}

function MailIcon({ className = '' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 ${className}`}>
      <path d="M4 6a2 2 0 00-2 2v8a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2H4zm.4 2h15.2L12 13.4 4.4 8zM4 10.2V16h16v-5.8l-7.4 5.5a1 1 0 01-1.2 0L4 10.2z" />
    </svg>
  );
}

function LockIcon({ className = '' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 ${className}`}>
      <path d="M12 2a4 4 0 00-4 4v3H7a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 7V6a2 2 0 114 0v3h-4zm2 4a1.5 1.5 0 011.5 1.5c0 .6-.32 1.12-.8 1.4l.3 1.6a1 1 0 01-1 1.2 1 1 0 01-1-1.2l.3-1.6a1.5 1.5 0 01.7-2.9z" />
    </svg>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const { pick } = useLang();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || pick('Kuch galat ho gaya', 'Something went wrong'));
      setLoading(false);
      return;
    }
    // Auto-login after register.
    await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    router.push('/dashboard');
    router.refresh();
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-[200px] -top-[220px] h-[640px] w-[640px] rounded-full"
        style={{ background: 'radial-gradient(circle,var(--color-amber-tint-2) 0%,transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -left-[220px] -bottom-[260px] h-[560px] w-[560px] rounded-full"
        style={{ background: 'radial-gradient(circle,var(--color-brand-tint-2) 0%,transparent 70%)' }}
      />

      <div className="relative mx-auto flex max-w-[440px] flex-col px-4 py-16">
        <span className="lv-pill w-fit bg-amber-tint text-amber-ink">🇮🇳 {pick('Hamesha ke liye free', 'Free, forever')}</span>
        <h1 className="mt-4 text-[28px] font-bold text-ink sm:text-[34px]">{pick('Apna account banao', 'Create your account')}</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{pick('Free hai. Padho, XP kamao, streak banao.', "It's free. Learn, earn XP, build a streak.")}</p>

        <form onSubmit={onSubmit} className="mt-7 flex flex-col gap-3.5">
          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
          )}
          <div className="flex items-center gap-2.5 rounded-2xl border-[1.5px] border-line bg-card px-[18px] py-3.5 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand-tint">
            <UserIcon className="text-muted" />
            <input
              required
              placeholder={pick('Naam', 'Name')}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-muted-soft"
            />
          </div>
          <div className="flex items-center gap-2.5 rounded-2xl border-[1.5px] border-line bg-card px-[18px] py-3.5 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand-tint">
            <MailIcon className="text-muted" />
            <input
              type="email"
              required
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-muted-soft"
            />
          </div>
          <div className="flex items-center gap-2.5 rounded-2xl border-[1.5px] border-line bg-card px-[18px] py-3.5 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand-tint">
            <LockIcon className="text-muted" />
            <input
              type="password"
              required
              minLength={6}
              placeholder={pick('Password (min 6 chars)', 'Password (min 6 chars)')}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-muted-soft"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="lv-btn lv-btn-primary mt-1.5 w-full justify-center disabled:opacity-50"
          >
            {loading ? pick('Ban raha hai…', 'Creating…') : pick('Sign up', 'Sign up')}
          </button>
        </form>

        <p className="mt-7 text-center text-[14.5px] text-muted">
          {pick('Pehle se account hai?', 'Already have an account?')}{' '}
          <Link href="/login" className="font-bold text-brand hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
