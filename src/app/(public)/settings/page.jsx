'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';
import { useTheme } from '@/hooks/useTheme';

function GlobeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="3.6" ry="9" fill="none" stroke="var(--color-card)" strokeWidth="1.3" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="var(--color-card)" strokeWidth="1.3" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 14.5A8 8 0 0110 4.06 8 8 0 1020 14.5z" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a4 4 0 00-4 4v.29A6 6 0 004 12v3l-1.4 2.1A1 1 0 003.4 19h17.2a1 1 0 00.8-1.9L20 15v-3a6 6 0 00-4-5.71V6a4 4 0 00-4-4zm0 20a2.5 2.5 0 002.45-2h-4.9A2.5 2.5 0 0012 22z" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a4 4 0 00-4 4v3H7a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 7V6a2 2 0 114 0v3h-4z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 6a2 2 0 00-2 2v8a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2H4zm.4 2h15.2L12 13.4 4.4 8zM4 10.2V16h16v-5.8l-7.4 5.5a1 1 0 01-1.2 0L4 10.2z" />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 3a1 1 0 00-1 1v1H5a1 1 0 100 2h.5l.8 12.1A2 2 0 008.3 21h7.4a2 2 0 002-1.9L18.5 7H19a1 1 0 100-2h-4V4a1 1 0 00-1-1h-4zM9.6 9a1 1 0 011 1v7a1 1 0 11-2 0v-7a1 1 0 011-1zm4.8 0a1 1 0 011 1v7a1 1 0 11-2 0v-7a1 1 0 011-1z" />
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-muted-soft">
      <path d="M8.3 4.3a1 1 0 000 1.4L14.17 12 8.3 18.3a1 1 0 001.46 1.4l6.5-7a1 1 0 000-1.4l-6.5-7a1 1 0 00-1.46 0z" />
    </svg>
  );
}

function Segmented({ options, value, onChange }) {
  return (
    <div className="flex shrink-0 gap-0.5 rounded-full bg-line-soft p-[3px]">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-full px-3.5 py-1.5 text-xs font-bold ${
            value === o.value ? 'bg-card text-ink shadow-sm' : 'text-muted'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function IconBox({ tint, children }) {
  return (
    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${tint}`}>
      {children}
    </span>
  );
}

function Row({ children }) {
  return <div className="flex items-center gap-3.5 px-[22px] py-[18px]">{children}</div>;
}

export default function SettingsPage() {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();
  const { lang, setLang, pick } = useLang();
  const { dark, setTheme } = useTheme();

  const [profile, setProfile] = useState(null);

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [savingName, setSavingName] = useState(false);

  const [pwOpen, setPwOpen] = useState(false);
  const [pwForm, setPwForm] = useState({ current: '', next: '' });
  const [pwError, setPwError] = useState('');
  const [pwSaving, setPwSaving] = useState(false);

  const [emailOpen, setEmailOpen] = useState(false);
  const [emailForm, setEmailForm] = useState({ newEmail: '', password: '' });
  const [emailError, setEmailError] = useState('');
  const [emailSaving, setEmailSaving] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch('/api/me')
      .then((r) => r.json())
      .then((d) => { setProfile(d); setNameInput(d.name || ''); })
      .catch(() => {});
  }, [status]);

  async function saveName() {
    if (!profile) return;
    const name = nameInput.trim();
    if (!name || name === profile.name) { setEditingName(false); return; }
    setSavingName(true);
    const res = await fetch('/api/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    setSavingName(false);
    if (res.ok) {
      setProfile((p) => ({ ...p, name: data.name }));
      await updateSession({ name: data.name });
      setEditingName(false);
    }
  }

  async function toggleEmailNotifications() {
    if (!profile) return;
    const next = !profile.emailNotifications;
    setProfile((p) => ({ ...p, emailNotifications: next }));
    await fetch('/api/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailNotifications: next }),
    }).catch(() => setProfile((p) => ({ ...p, emailNotifications: !next })));
  }

  async function savePassword(e) {
    e.preventDefault();
    setPwError('');
    setPwSaving(true);
    const res = await fetch('/api/me/password', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.next }),
    });
    const data = await res.json();
    setPwSaving(false);
    if (!res.ok) { setPwError(data.error || pick('Kuch galat ho gaya', 'Something went wrong')); return; }
    setPwOpen(false);
    setPwForm({ current: '', next: '' });
  }

  async function saveEmail(e) {
    e.preventDefault();
    setEmailError('');
    setEmailSaving(true);
    const res = await fetch('/api/me/email', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailForm),
    });
    const data = await res.json();
    setEmailSaving(false);
    if (!res.ok) { setEmailError(data.error || pick('Kuch galat ho gaya', 'Something went wrong')); return; }
    setProfile((p) => ({ ...p, email: data.email }));
    await updateSession({ email: data.email });
    setEmailOpen(false);
    setEmailForm({ newEmail: '', password: '' });
  }

  async function deleteAccount() {
    setDeleting(true);
    const res = await fetch('/api/me', { method: 'DELETE' });
    if (res.ok) {
      await signOut({ callbackUrl: '/' });
    } else {
      setDeleting(false);
    }
  }

  if (status === 'loading') {
    return <p className="mx-auto w-full max-w-[640px] px-4 sm:px-6 lg:px-8 py-12 text-muted">Loading…</p>;
  }

  if (status !== 'authenticated') {
    return (
      <div className="mx-auto w-full max-w-[640px] px-4 py-10 sm:px-6 lg:px-8 lg:py-[52px]">
        <h1 className="text-[28px] font-bold text-ink">Settings</h1>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-brand-tint px-6 py-5">
          <p className="text-sm text-ink-soft">
            {pick('Settings dekhne ke liye login karo.', 'Login to view and manage your settings.')}
          </p>
          <div className="flex gap-2">
            <Link href="/login" className="lv-btn lv-btn-ghost">Login</Link>
            <Link href="/register" className="lv-btn lv-btn-primary">Sign up free</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[640px] px-4 py-10 sm:px-6 lg:px-8 lg:py-[52px]">
      <h1 className="text-[28px] font-bold text-ink">Settings</h1>

      {/* Profile */}
      <div className="lv-card mt-6 flex items-center gap-4 p-[22px]">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-tint text-lg font-bold text-brand-dark">
          {(profile?.name || session.user.name || '?').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()}
        </span>
        {editingName ? (
          <div className="flex flex-1 items-center gap-2">
            <input
              autoFocus
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveName()}
              className="w-full rounded-lg border border-line bg-card px-3 py-1.5 text-sm text-ink outline-none focus:border-brand"
            />
            <button onClick={saveName} disabled={savingName} className="shrink-0 text-sm font-bold text-brand disabled:opacity-50">
              {pick('Save', 'Save')}
            </button>
            <button onClick={() => { setEditingName(false); setNameInput(profile?.name || ''); }} className="shrink-0 text-sm font-semibold text-muted">
              {pick('Cancel', 'Cancel')}
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1">
              <div className="text-[16px] font-bold text-ink">{profile?.name || session.user.name}</div>
              <div className="mt-0.5 text-[13px] text-muted">{profile?.email || session.user.email}</div>
            </div>
            <button onClick={() => setEditingName(true)} className="shrink-0 text-[13px] font-bold text-brand">
              {pick('Edit', 'Edit')}
            </button>
          </>
        )}
      </div>

      {/* Preferences */}
      <p className="mb-2.5 mt-7 text-[11.5px] font-bold uppercase tracking-wide text-muted">{pick('Preferences', 'Preferences')}</p>
      <div className="lv-card divide-y divide-line-soft overflow-hidden">
        <Row>
          <IconBox tint="bg-brand-tint text-brand-dark"><GlobeIcon /></IconBox>
          <span className="flex-1 text-[14.5px] font-semibold text-ink">{pick('Language', 'Language')}</span>
          <Segmented
            value={lang}
            onChange={setLang}
            options={[{ value: 'en', label: 'EN' }, { value: 'hi', label: 'हिं' }]}
          />
        </Row>
        <Row>
          <IconBox tint="bg-amber-tint text-amber-ink"><MoonIcon /></IconBox>
          <span className="flex-1 text-[14.5px] font-semibold text-ink">{pick('Theme', 'Theme')}</span>
          <Segmented
            value={dark ? 'dark' : 'light'}
            onChange={(v) => setTheme(v === 'dark')}
            options={[
              { value: 'light', label: pick('Light', 'Light') },
              { value: 'dark', label: pick('Dark', 'Dark') },
            ]}
          />
        </Row>
        <Row>
          <IconBox tint="bg-violet-tint text-violet-ink"><BellIcon /></IconBox>
          <span className="flex-1 text-[14.5px] font-semibold text-ink">{pick('Email notifications', 'Email notifications')}</span>
          <button
            onClick={toggleEmailNotifications}
            role="switch"
            aria-checked={!!profile?.emailNotifications}
            className={`flex h-6 w-[42px] shrink-0 items-center rounded-full p-0.5 transition-colors ${profile?.emailNotifications ? 'bg-brand' : 'bg-line-soft'}`}
          >
            <span className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${profile?.emailNotifications ? 'translate-x-[18px]' : 'translate-x-0'}`} />
          </button>
        </Row>
      </div>

      {/* Account */}
      <p className="mb-2.5 mt-6 text-[11.5px] font-bold uppercase tracking-wide text-muted">{pick('Account', 'Account')}</p>
      <div className="lv-card divide-y divide-line-soft overflow-hidden">
        <button onClick={() => setPwOpen(true)} className="flex w-full items-center gap-3.5 px-[22px] py-[18px] text-left hover:bg-line-soft/60">
          <IconBox tint="bg-line-soft text-ink-soft"><LockIcon /></IconBox>
          <span className="flex-1 text-[14.5px] font-semibold text-ink">{pick('Password badlo', 'Change password')}</span>
          <ChevronIcon />
        </button>
        <button onClick={() => setEmailOpen(true)} className="flex w-full items-center gap-3.5 px-[22px] py-[18px] text-left hover:bg-line-soft/60">
          <IconBox tint="bg-line-soft text-ink-soft"><MailIcon /></IconBox>
          <span className="flex-1 text-[14.5px] font-semibold text-ink">{pick('Email update karo', 'Update email')}</span>
          <ChevronIcon />
        </button>
        <button onClick={() => signOut({ callbackUrl: '/' })} className="flex w-full items-center gap-3.5 px-[22px] py-[18px] text-left hover:bg-line-soft/60">
          <IconBox tint="bg-red-50 text-red-700"><LogoutIcon /></IconBox>
          <span className="flex-1 text-[14.5px] font-semibold text-red-700">{pick('Log out', 'Log out')}</span>
        </button>
      </div>

      <p className="mt-6 text-center text-[12.5px] text-muted-soft">
        Learnverse v1.0 · <button onClick={() => setDeleteOpen(true)} className="underline">{pick('Account delete karo', 'Delete account')}</button>
      </p>

      {/* Change password modal */}
      {pwOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 p-4" onClick={(e) => e.target === e.currentTarget && setPwOpen(false)}>
          <form onSubmit={savePassword} className="lv-card w-full max-w-sm p-6">
            <h2 className="text-lg font-bold text-ink">{pick('Password badlo', 'Change password')}</h2>
            {pwError && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{pwError}</p>}
            <input
              type="password" required placeholder={pick('Current password', 'Current password')}
              value={pwForm.current} onChange={(e) => setPwForm({ ...pwForm, current: e.target.value })}
              className="mt-4 w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand"
            />
            <input
              type="password" required minLength={6} placeholder={pick('New password (min 6 chars)', 'New password (min 6 chars)')}
              value={pwForm.next} onChange={(e) => setPwForm({ ...pwForm, next: e.target.value })}
              className="mt-3 w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand"
            />
            <div className="mt-5 flex gap-2.5">
              <button type="button" onClick={() => setPwOpen(false)} className="lv-btn lv-btn-ghost flex-1 justify-center py-2.5 text-sm">{pick('Cancel', 'Cancel')}</button>
              <button type="submit" disabled={pwSaving} className="lv-btn lv-btn-primary flex-1 justify-center py-2.5 text-sm disabled:opacity-50">
                {pwSaving ? pick('Saving…', 'Saving…') : pick('Save', 'Save')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Update email modal */}
      {emailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 p-4" onClick={(e) => e.target === e.currentTarget && setEmailOpen(false)}>
          <form onSubmit={saveEmail} className="lv-card w-full max-w-sm p-6">
            <h2 className="text-lg font-bold text-ink">{pick('Email update karo', 'Update email')}</h2>
            {emailError && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{emailError}</p>}
            <input
              type="email" required placeholder={pick('Naya email', 'New email')}
              value={emailForm.newEmail} onChange={(e) => setEmailForm({ ...emailForm, newEmail: e.target.value })}
              className="mt-4 w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand"
            />
            <input
              type="password" required placeholder={pick('Password se confirm karo', 'Confirm with password')}
              value={emailForm.password} onChange={(e) => setEmailForm({ ...emailForm, password: e.target.value })}
              className="mt-3 w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand"
            />
            <div className="mt-5 flex gap-2.5">
              <button type="button" onClick={() => setEmailOpen(false)} className="lv-btn lv-btn-ghost flex-1 justify-center py-2.5 text-sm">{pick('Cancel', 'Cancel')}</button>
              <button type="submit" disabled={emailSaving} className="lv-btn lv-btn-primary flex-1 justify-center py-2.5 text-sm disabled:opacity-50">
                {emailSaving ? pick('Saving…', 'Saving…') : pick('Save', 'Save')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete account modal */}
      {deleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 p-4" onClick={(e) => e.target === e.currentTarget && setDeleteOpen(false)}>
          <div className="lv-card w-full max-w-sm p-6">
            <h2 className="text-lg font-bold text-red-700">{pick('Account delete karo?', 'Delete your account?')}</h2>
            <p className="mt-2.5 text-sm text-ink-soft">
              {pick(
                'Ye permanent hai — tumhara XP, streak, progress aur bookmarks sab hamesha ke liye chale jayenge.',
                "This is permanent — your XP, streak, progress and bookmarks will be gone for good."
              )}
            </p>
            <p className="mt-3 text-xs font-semibold text-muted">
              {pick('Confirm karne ke liye ', 'Type ')}<b>DELETE</b>{pick(' type karo', ' to confirm')}
            </p>
            <input
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="DELETE"
              className="mt-2 w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-sm text-ink outline-none focus:border-red-400"
            />
            <div className="mt-5 flex gap-2.5">
              <button onClick={() => { setDeleteOpen(false); setDeleteConfirmText(''); }} className="lv-btn lv-btn-ghost flex-1 justify-center py-2.5 text-sm">
                {pick('Cancel', 'Cancel')}
              </button>
              <button
                onClick={deleteAccount}
                disabled={deleteConfirmText !== 'DELETE' || deleting}
                className="lv-btn flex-1 justify-center bg-red-600 py-2.5 text-sm text-white disabled:opacity-50"
              >
                {deleting ? pick('Delete ho raha hai…', 'Deleting…') : pick('Delete', 'Delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
