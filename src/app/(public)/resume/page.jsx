'use client';

import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import PrintButton from '@/components/PrintButton';
import { useLang } from '@/components/LanguageProvider';
import Icon from '@/components/Icon';

const LS_KEY = 'learnverse_resume_draft';

// A4 at 96dpi. The sheet renders at true size and is scaled with a transform,
// so the preview keeps its proportions instead of being clipped by its column.
const PAGE_W = 794;
const PAGE_H = 1123;

const THEMES = {
  indigo: { accent: '#4f46e5', light: '#eef2ff' },
  slate: { accent: '#334155', light: '#f1f5f9' },
  emerald: { accent: '#059669', light: '#ecfdf5' },
  rose: { accent: '#e11d48', light: '#fff1f2' },
};

const EMPTY = {
  fullName: '', headline: '', email: '', phone: '', location: '',
  website: '', github: '', linkedin: '', summary: '',
  skills: [], experience: [], education: [], projects: [], certifications: [],
  theme: 'indigo',
};

const blankExp = () => ({ company: '', role: '', start: '', end: '', description: '' });
const blankEdu = () => ({ school: '', degree: '', start: '', end: '', description: '' });
const blankProj = () => ({ name: '', link: '', description: '' });
const blankCert = () => ({ name: '', issuer: '', year: '' });

const SECTIONS = [
  { key: 'personal', hi: 'Personal details', en: 'Personal details' },
  { key: 'summary', hi: 'Summary', en: 'Summary' },
  { key: 'skills', hi: 'Skills', en: 'Skills' },
  { key: 'experience', hi: 'Experience', en: 'Experience' },
  { key: 'projects', hi: 'Projects', en: 'Projects' },
  { key: 'education', hi: 'Education', en: 'Education' },
  { key: 'certifications', hi: 'Certifications', en: 'Certifications' },
];

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveToStorage(data) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch {}
}

const hasNumber = (s = '') => /\d/.test(s);

export default function ResumePage() {
  const { data: session, status } = useSession();
  const { pick } = useLang();

  const [form, setForm] = useState(EMPTY);
  const [skillsText, setSkillsText] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);
  const [dbLoaded, setDbLoaded] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const [started, setStarted] = useState(false);
  const [active, setActive] = useState('personal');
  const [zoom, setZoom] = useState(70);
  const [mobileTab, setMobileTab] = useState('edit');
  const [pages, setPages] = useState(1);

  const sheetRef = useRef(null);
  const autoSaveTimer = useRef(null);

  /* ── Load: localStorage first, then the DB when signed in ── */
  useEffect(() => {
    const local = loadFromStorage();
    if (local) {
      setForm({ ...EMPTY, ...local });
      setSkillsText((local.skills || []).join(', '));
      setStarted(true);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (status !== 'authenticated' || dbLoaded) return;
    fetch('/api/resume')
      .then((r) => r.json())
      .then(({ resume }) => {
        if (resume) {
          const merged = { ...EMPTY, ...resume };
          setForm(merged);
          setSkillsText((resume.skills || []).join(', '));
          saveToStorage(merged);
          setStarted(true);
        } else {
          setForm((f) => ({
            ...f,
            fullName: f.fullName || session?.user?.name || '',
            email: f.email || session?.user?.email || '',
          }));
        }
        setDbLoaded(true);
      })
      .catch(() => setDbLoaded(true));
  }, [status, session, dbLoaded]);

  /* ── Helpers ── */
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const addItem = (key, factory) => () => setForm((f) => ({ ...f, [key]: [...f[key], factory()] }));
  const removeItem = (key, idx) => () =>
    setForm((f) => ({ ...f, [key]: f[key].filter((_, i) => i !== idx) }));
  const setItem = (key, idx, field) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].map((it, i) => (i === idx ? { ...it, [field]: e.target.value } : it)),
    }));

  // Reordering — you could only add and delete before, so moving your most
  // recent job to the top meant retyping it.
  const move = (key, idx, dir) => () =>
    setForm((f) => {
      const next = [...f[key]];
      const to = idx + dir;
      if (to < 0 || to >= next.length) return f;
      [next[idx], next[to]] = [next[to], next[idx]];
      return { ...f, [key]: next };
    });

  const save = useCallback(async () => {
    setSaving(true);
    const skills = skillsText.split(',').map((s) => s.trim()).filter(Boolean);
    const payload = { ...form, skills };
    saveToStorage(payload);
    setForm((f) => ({ ...f, skills }));

    if (status === 'authenticated') {
      try {
        await fetch('/api/resume', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {}
    }
    setSavedAt(new Date());
    setSaving(false);
  }, [form, skillsText, status]);

  // Auto-save, and say so — the indicator used to appear only after a manual
  // save while this ran silently.
  useEffect(() => {
    if (!hydrated || !started) return;
    clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      const skills = skillsText.split(',').map((s) => s.trim()).filter(Boolean);
      saveToStorage({ ...form, skills });
      setSavedAt(new Date());
    }, 1000);
    return () => clearTimeout(autoSaveTimer.current);
  }, [form, skillsText, hydrated, started]);

  const importSkills = async () => {
    try {
      const { courseProgress = [] } = await fetch('/api/me/dashboard').then((r) => r.json());
      const learned = courseProgress.filter((c) => c.completed > 0).map((c) => c.title);
      if (!learned.length) return;
      const current = new Set(skillsText.split(',').map((s) => s.trim()).filter(Boolean));
      learned.forEach((s) => current.add(s));
      setSkillsText([...current].join(', '));
    } catch {}
  };

  const skillsList = useMemo(
    () => skillsText.split(',').map((s) => s.trim()).filter(Boolean),
    [skillsText]
  );

  const accent = THEMES[form.theme]?.accent || THEMES.indigo.accent;
  const light = THEMES[form.theme]?.light || THEMES.indigo.light;

  /* ── Completeness: what a resume builder is actually for ── */
  const checks = useMemo(() => {
    const bullets = [...form.experience, ...form.projects].map((x) => x.description || '');
    return [
      { key: 'contact', ok: !!(form.fullName && form.email), hi: 'Naam aur contact', en: 'Name and contact' },
      { key: 'summary', ok: (form.summary || '').trim().length >= 40, hi: 'Summary likha', en: 'Summary written' },
      { key: 'skills', ok: skillsList.length >= 5, hi: '5+ skills', en: '5+ skills' },
      {
        key: 'proof',
        ok: form.experience.length >= 1 || form.projects.length >= 2,
        hi: 'Ek experience ya do projects',
        en: 'One job or two projects',
      },
      {
        key: 'numbers',
        ok: bullets.length > 0 && bullets.some(hasNumber),
        hi: 'Kisi bullet mein ek number',
        en: 'A number in at least one bullet',
      },
      { key: 'education', ok: form.education.length >= 1, hi: 'Education', en: 'Education' },
    ];
  }, [form, skillsList]);

  const percent = Math.round((checks.filter((c) => c.ok).length / checks.length) * 100);

  const counts = {
    personal: [form.fullName, form.headline, form.email, form.phone, form.location, form.website, form.github, form.linkedin].filter(Boolean).length,
    summary: form.summary ? 1 : 0,
    skills: skillsList.length,
    experience: form.experience.length,
    projects: form.projects.length,
    education: form.education.length,
    certifications: form.certifications.length,
  };

  // Page count, measured off the real sheet.
  useEffect(() => {
    if (!sheetRef.current) return;
    const h = sheetRef.current.scrollHeight;
    setPages(Math.max(1, Math.ceil(h / PAGE_H)));
  }, [form, skillsList, zoom]);

  /* ── First run: a starting point, not thirty empty inputs ── */
  if (hydrated && !started) {
    const startBlank = () => setStarted(true);
    const startWith = (patch) => () => {
      setForm((f) => ({ ...f, ...patch }));
      setStarted(true);
      setActive(patch.experience?.length ? 'experience' : 'projects');
    };

    return (
      <div className="bg-slate-50 pb-16">
        <div className="mx-auto w-full max-w-[900px] px-4 pt-10 sm:px-6">
          <div className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600">
              {pick('Naukri-ready bano', 'Get job-ready')}
            </span>
            <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-[38px]">
              {pick('Ek page ka resume, das minute mein.', 'A one-page resume, in ten minutes.')}
            </h1>
            <p className="max-w-2xl leading-relaxed text-slate-600">
              {pick(
                'Live A4 preview, chaar theme, aur print se seedha PDF. Jo courses poore kiye, unki skills ek click mein aa jayengi.',
                'A live A4 preview, four themes, and print straight to PDF. Skills from your finished courses are one click away.'
              )}
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <button
              type="button"
              onClick={startBlank}
              className="flex flex-col items-start gap-2.5 rounded-2xl border border-indigo-200 bg-indigo-50/40 p-5 text-left transition hover:border-indigo-300"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-100">
                <span className="text-lg font-semibold leading-none text-indigo-600">+</span>
              </span>
              <span className="font-bold">{pick('Khaali se shuru', 'Start blank')}</span>
              <span className="text-sm leading-relaxed text-slate-600">
                {pick('Section by section, har step pe guidance ke saath.', 'Section by section, with guidance at each step.')}
              </span>
            </button>

            <button
              type="button"
              onClick={startWith({ projects: [blankProj(), blankProj()], education: [blankEdu()] })}
              className="flex flex-col items-start gap-2.5 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-indigo-300"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100">
                <Icon name="seedling" className="h-4 w-4 text-slate-600" />
              </span>
              <span className="font-bold">{pick('Fresher', 'First job')}</span>
              <span className="text-sm leading-relaxed text-slate-600">
                {pick('Do project aur ek education slot pehle se taiyar.', 'Two project slots and an education slot, ready to fill.')}
              </span>
            </button>

            <button
              type="button"
              onClick={startWith({ experience: [blankExp(), blankExp()], education: [blankEdu()] })}
              className="flex flex-col items-start gap-2.5 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-indigo-300"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100">
                <Icon name="briefcase" className="h-4 w-4 text-slate-600" />
              </span>
              <span className="font-bold">{pick('Experienced', 'Experienced')}</span>
              <span className="text-sm leading-relaxed text-slate-600">
                {pick('Do experience aur ek education slot pehle se taiyar.', 'Two experience slots and an education slot, ready to fill.')}
              </span>
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-4">
            <Icon name="lock" className="h-4 w-4 shrink-0 text-indigo-600" />
            <p className="flex-1 text-sm leading-relaxed text-indigo-900">
              {status === 'authenticated'
                ? pick(
                    'Tumhara resume account mein save hoga — kisi bhi device pe milega.',
                    'Your resume saves to your account, so it follows you across devices.'
                  )
                : pick(
                    'Bina login ke bhi bana sakte ho — resume browser mein save rahega. Login karoge toh account mein save hoga.',
                    "You can build it signed out — it saves in this browser. Sign in and it saves to your account instead."
                  )}
            </p>
            {status !== 'authenticated' && (
              <span className="flex shrink-0 gap-2">
                <Link
                  href="/login?callbackUrl=/resume"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  {pick('Login', 'Sign in')}
                </Link>
                <Link
                  href="/register?callbackUrl=/resume"
                  className="rounded-lg border border-indigo-200 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-100"
                >
                  {pick('Account banao', 'Sign up')}
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  const activeIdx = SECTIONS.findIndex((s) => s.key === active);
  const prevSection = SECTIONS[activeIdx - 1];
  const nextSection = SECTIONS[activeIdx + 1];

  return (
    <div className="bg-slate-100 dark:bg-slate-950">
      <style>{`
        @media print {
          .resume-chrome { display: none !important; }
          .resume-scaler { transform: none !important; width: auto !important; height: auto !important; }
          .resume-preview { box-shadow: none !important; border: none !important; margin: 0 !important; }
          .resume-shell { display: block !important; background: #fff !important; }
        }
      `}</style>

      {/* ══════════ Top bar ══════════ */}
      <div className="resume-chrome sticky top-14 z-30 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-slate-200 bg-white px-4 py-3 sm:px-6 dark:bg-slate-900">
        <span className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-50">
            <Icon name="file" className="h-4 w-4 text-indigo-600" />
          </span>
          <span className="font-bold">{pick('Resume builder', 'Resume builder')}</span>
        </span>

        <span className="ml-auto flex items-center gap-3">
          {savedAt && (
            <span className="hidden items-center gap-1.5 text-xs font-medium text-green-600 sm:flex">
              <Icon name="check" className="h-3 w-3" />
              {status === 'authenticated'
                ? pick('Account mein save', 'Saved to your account')
                : pick('Browser mein save', 'Saved in this browser')}
            </span>
          )}
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50 disabled:opacity-60"
          >
            {saving ? pick('Save ho raha hai…', 'Saving…') : pick('Save', 'Save')}
          </button>
          <PrintButton label={pick('PDF download karo', 'Download PDF')} />
        </span>
      </div>

      {/* Mobile: the A4 sheet never gets squeezed into a phone column */}
      <div className="resume-chrome flex gap-1 border-b border-slate-200 bg-white p-1.5 lg:hidden dark:bg-slate-900">
        {['edit', 'preview'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setMobileTab(t)}
            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold capitalize transition ${
              mobileTab === t ? 'bg-slate-900 text-white dark:bg-slate-700' : 'text-slate-500'
            }`}
          >
            {t === 'edit' ? pick('Edit', 'Edit') : pick('Preview', 'Preview')}
          </button>
        ))}
      </div>

      {status !== 'authenticated' && hydrated && (
        <div className="resume-chrome flex flex-wrap items-center gap-3 border-b border-indigo-100 bg-indigo-50 px-4 py-2.5 text-sm sm:px-6">
          <p className="flex-1 text-indigo-900">
            {pick(
              'Guest mode — resume is browser mein save hai. Login karo toh account mein save hoga.',
              'Guest mode — this resume is saved in your browser. Sign in and it saves to your account.'
            )}
          </p>
          <Link
            href="/login?callbackUrl=/resume"
            className="shrink-0 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
          >
            {pick('Login', 'Sign in')}
          </Link>
        </div>
      )}

      <div className="resume-shell flex items-start">

        {/* ══════════ Left: completeness + sections ══════════ */}
        <aside
          className={`resume-chrome sticky top-[7.5rem] hidden w-[268px] shrink-0 flex-col gap-5 self-start border-r border-slate-200 bg-white p-4 lg:flex dark:bg-slate-900`}
          style={{ minHeight: 'calc(100vh - 7.5rem)' }}
        >
          <div className="flex flex-col gap-2.5 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
            <p className="flex items-baseline">
              <span className="text-sm font-bold">{pick('Resume ready?', 'Resume ready?')}</span>
              <span className="ml-auto text-sm font-bold text-indigo-600">{percent}%</span>
            </p>
            <span className="block h-1.5 overflow-hidden rounded-full bg-indigo-100">
              <span className="block h-1.5 rounded-full bg-indigo-600 transition-all" style={{ width: `${percent}%` }} />
            </span>
            <div className="mt-1 flex flex-col gap-2">
              {checks.map((c) => (
                <span key={c.key} className="flex items-center gap-2.5">
                  <span
                    className={`grid h-4 w-4 shrink-0 place-items-center rounded-full ${
                      c.ok ? 'bg-green-600' : 'bg-indigo-100'
                    }`}
                  >
                    {c.ok && <Icon name="check" className="h-2 w-2 text-white" />}
                  </span>
                  <span className={`text-xs ${c.ok ? 'text-slate-400' : 'font-medium text-slate-700'}`}>
                    {pick(c.hi, c.en)}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <nav className="flex flex-col gap-0.5">
            <p className="px-2.5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {pick('Sections', 'Sections')}
            </p>
            {SECTIONS.map((s, i) => {
              const on = s.key === active;
              const filled = counts[s.key] > 0;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setActive(s.key)}
                  className={`flex items-center gap-3 rounded-lg px-2.5 py-2 text-left transition ${
                    on ? 'bg-indigo-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`grid h-5.5 w-5.5 shrink-0 place-items-center rounded-md text-[10px] font-bold ${
                      filled
                        ? 'bg-green-100 text-green-700'
                        : on
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-400'
                    }`}
                    style={{ height: '22px', width: '22px' }}
                  >
                    {filled ? <Icon name="check" className="h-2.5 w-2.5" /> : i + 1}
                  </span>
                  <span className={`flex-1 text-[13.5px] ${on ? 'font-semibold' : 'text-slate-600'}`}>
                    {pick(s.hi, s.en)}
                  </span>
                  {counts[s.key] > 0 && <span className="text-[11px] text-slate-400">{counts[s.key]}</span>}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ══════════ Middle: one section at a time ══════════ */}
        <main
          className={`resume-chrome min-w-0 flex-1 px-4 py-6 sm:px-7 ${mobileTab === 'edit' ? '' : 'hidden lg:block'}`}
        >
          {/* Mobile: the rail is hidden, so completeness and section nav live here */}
          <div className="mb-5 flex flex-col gap-3 lg:hidden">
            <div className="flex flex-col gap-2 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
              <p className="flex items-baseline">
                <span className="text-sm font-bold">{pick('Resume ready?', 'Resume ready?')}</span>
                <span className="ml-auto text-sm font-bold text-indigo-600">{percent}%</span>
              </p>
              <span className="block h-1.5 overflow-hidden rounded-full bg-indigo-100">
                <span className="block h-1.5 rounded-full bg-indigo-600 transition-all" style={{ width: `${percent}%` }} />
              </span>
              {checks.some((c) => !c.ok) && (
                <span className="text-xs text-slate-600">
                  {pick('Bacha hai: ', 'Still missing: ')}
                  {checks.filter((c) => !c.ok).map((c) => pick(c.hi, c.en)).join(', ')}
                </span>
              )}
            </div>

            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-7 sm:px-7">
              {SECTIONS.map((s, i) => {
                const on = s.key === active;
                const filled = counts[s.key] > 0;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setActive(s.key)}
                    className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                      on
                        ? 'bg-slate-900 text-white dark:bg-slate-700'
                        : 'border border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    {filled && !on && <Icon name="check" className="h-2.5 w-2.5 text-green-600" />}
                    {pick(s.hi, s.en)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold tracking-tight sm:text-[21px]">
                {pick(SECTIONS[activeIdx].hi, SECTIONS[activeIdx].en)}
              </h2>
              <p className="text-sm text-slate-600">{sectionHint(active, pick)}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              {prevSection && (
                <button
                  type="button"
                  onClick={() => setActive(prevSection.key)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  ← {pick(prevSection.hi, prevSection.en)}
                </button>
              )}
              {nextSection && (
                <button
                  type="button"
                  onClick={() => setActive(nextSection.key)}
                  className="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white dark:bg-slate-700"
                >
                  {pick(nextSection.hi, nextSection.en)} →
                </button>
              )}
            </div>
          </div>

          {sectionTip(active, pick) && (
            <div className="mt-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
              <Icon name="lightbulb" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <p className="text-sm leading-relaxed text-amber-900">{sectionTip(active, pick)}</p>
            </div>
          )}

          <div className="mt-4 flex flex-col gap-4">
            {active === 'personal' && (
              <Card>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label={pick('Poora naam', 'Full name')} value={form.fullName} onChange={set('fullName')} />
                  <Field label={pick('Headline', 'Headline')} value={form.headline} onChange={set('headline')} placeholder="Full-Stack Developer" />
                  <Field label="Email" value={form.email} onChange={set('email')} />
                  <Field label={pick('Phone', 'Phone')} value={form.phone} onChange={set('phone')} />
                  <Field label={pick('Sheher', 'Location')} value={form.location} onChange={set('location')} />
                  <Field label="Website / Portfolio" value={form.website} onChange={set('website')} />
                  <Field label="GitHub" value={form.github} onChange={set('github')} />
                  <Field label="LinkedIn" value={form.linkedin} onChange={set('linkedin')} />
                </div>
              </Card>
            )}

            {active === 'summary' && (
              <Card>
                <textarea
                  value={form.summary}
                  onChange={set('summary')}
                  rows={4}
                  placeholder={pick('Apne baare mein 2–3 lines…', '2–3 lines about yourself…')}
                  className="w-full resize-none rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-indigo-400"
                />
                <p className="mt-2 text-xs text-slate-400">
                  {(form.summary || '').trim().length} {pick('akshar', 'characters')} ·{' '}
                  {pick('40+ theek rehta hai', '40+ reads well')}
                </p>
              </Card>
            )}

            {active === 'skills' && (
              <Card
                action={
                  status === 'authenticated' ? (
                    <button type="button" onClick={importSkills} className="text-xs font-semibold text-indigo-600 hover:underline">
                      {pick('Courses se import karo', 'Import from my courses')}
                    </button>
                  ) : null
                }
              >
                <input
                  value={skillsText}
                  onChange={(e) => setSkillsText(e.target.value)}
                  placeholder="JavaScript, React, Node.js, MongoDB…"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-indigo-400"
                />
                {skillsList.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {skillsList.map((s, i) => (
                      <span key={i} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            )}

            {active === 'experience' && (
              <Repeatable
                items={form.experience}
                onAdd={addItem('experience', blankExp)}
                onRemove={(i) => removeItem('experience', i)}
                onMove={(i, d) => move('experience', i, d)}
                titleOf={(it) => it.role || pick('Nayi entry', 'New entry')}
                addLabel={pick('Ek aur experience jodo', 'Add another role')}
                emptyLabel={pick('Abhi koi experience nahi.', 'No experience yet.')}
                render={(item, i) => (
                  <>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label={pick('Role', 'Role')} value={item.role} onChange={setItem('experience', i, 'role')} />
                      <Field label={pick('Company', 'Company')} value={item.company} onChange={setItem('experience', i, 'company')} />
                      <Field label={pick('Start', 'Start')} value={item.start} onChange={setItem('experience', i, 'start')} placeholder="Jan 2024" />
                      <Field label={pick('End', 'End')} value={item.end} onChange={setItem('experience', i, 'end')} placeholder="Present" />
                    </div>
                    <Bullet
                      value={item.description}
                      onChange={setItem('experience', i, 'description')}
                      pick={pick}
                      placeholder={pick('Kya kiya, kya achieve kiya…', 'What you did, what it achieved…')}
                    />
                  </>
                )}
              />
            )}

            {active === 'projects' && (
              <Repeatable
                items={form.projects}
                onAdd={addItem('projects', blankProj)}
                onRemove={(i) => removeItem('projects', i)}
                onMove={(i, d) => move('projects', i, d)}
                titleOf={(it) => it.name || pick('Naya project', 'New project')}
                addLabel={pick('Ek aur project jodo', 'Add another project')}
                emptyLabel={pick('Abhi koi project nahi.', 'No projects yet.')}
                render={(item, i) => (
                  <>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label={pick('Project naam', 'Project name')} value={item.name} onChange={setItem('projects', i, 'name')} />
                      <Field label="GitHub / live link" value={item.link} onChange={setItem('projects', i, 'link')} />
                    </div>
                    <Bullet
                      value={item.description}
                      onChange={setItem('projects', i, 'description')}
                      pick={pick}
                      placeholder={pick('Kya bana, kaunsi tech…', 'What you built, with what…')}
                    />
                  </>
                )}
              />
            )}

            {active === 'education' && (
              <Repeatable
                items={form.education}
                onAdd={addItem('education', blankEdu)}
                onRemove={(i) => removeItem('education', i)}
                onMove={(i, d) => move('education', i, d)}
                titleOf={(it) => it.degree || pick('Nayi entry', 'New entry')}
                addLabel={pick('Ek aur jodo', 'Add another')}
                emptyLabel={pick('Abhi kuch nahi.', 'Nothing yet.')}
                render={(item, i) => (
                  <>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label={pick('Degree / course', 'Degree / course')} value={item.degree} onChange={setItem('education', i, 'degree')} />
                      <Field label={pick('College', 'School')} value={item.school} onChange={setItem('education', i, 'school')} />
                      <Field label={pick('Start', 'Start')} value={item.start} onChange={setItem('education', i, 'start')} />
                      <Field label={pick('End', 'End')} value={item.end} onChange={setItem('education', i, 'end')} />
                    </div>
                  </>
                )}
              />
            )}

            {active === 'certifications' && (
              <Repeatable
                items={form.certifications}
                onAdd={addItem('certifications', blankCert)}
                onRemove={(i) => removeItem('certifications', i)}
                onMove={(i, d) => move('certifications', i, d)}
                titleOf={(it) => it.name || pick('Naya certificate', 'New certificate')}
                addLabel={pick('Ek aur jodo', 'Add another')}
                emptyLabel={pick('Abhi koi certificate nahi.', 'No certificates yet.')}
                render={(item, i) => (
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Field label={pick('Naam', 'Name')} value={item.name} onChange={setItem('certifications', i, 'name')} />
                    <Field label={pick('Issuer', 'Issuer')} value={item.issuer} onChange={setItem('certifications', i, 'issuer')} />
                    <Field label={pick('Saal', 'Year')} value={item.year} onChange={setItem('certifications', i, 'year')} />
                  </div>
                )}
              />
            )}
          </div>
        </main>

        {/* ══════════ Right: the preview, at a size you can read ══════════ */}
        <section
          className={`w-full shrink-0 self-stretch border-slate-200 bg-slate-200/70 lg:sticky lg:top-[7.5rem] lg:w-[560px] lg:border-l dark:bg-slate-900 ${
            mobileTab === 'preview' ? '' : 'hidden lg:block'
          }`}
        >
          <div className="resume-chrome flex flex-wrap items-center gap-3 border-b border-slate-200 bg-white px-4 py-2.5 dark:bg-slate-900">
            <span className="flex gap-1.5">
              {Object.entries(THEMES).map(([key, th]) => (
                <button
                  key={key}
                  type="button"
                  title={key}
                  onClick={() => setForm((f) => ({ ...f, theme: key }))}
                  className={`h-5 w-5 rounded-full transition ${
                    form.theme === key ? 'ring-2 ring-slate-900 ring-offset-2' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: th.accent }}
                />
              ))}
            </span>

            <span className="h-5 w-px bg-slate-200" />

            <span className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(40, z - 10))}
                className="grid h-7 w-7 place-items-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                −
              </button>
              <span className="w-9 text-center font-mono text-[11px] text-slate-500">{zoom}%</span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(130, z + 10))}
                className="grid h-7 w-7 place-items-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                +
              </button>
            </span>

            <span
              className={`ml-auto flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                pages === 1 ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
              }`}
            >
              <Icon name={pages === 1 ? 'check' : 'error-circle'} className="h-3 w-3" />
              {pages === 1
                ? pick('1 page mein fit hai', 'Fits on one page')
                : pick(`${pages} pages ho gaya`, `${pages} pages`)}
            </span>
          </div>

          <div className="flex justify-center overflow-auto p-4 lg:p-6">
            <div
              className="resume-scaler origin-top"
              style={{
                width: PAGE_W * (zoom / 100),
                height: (sheetRef.current?.scrollHeight || PAGE_H) * (zoom / 100),
              }}
            >
              <div
                ref={sheetRef}
                className="resume-preview bg-white text-slate-800 shadow-lg ring-1 ring-slate-200"
                style={{
                  width: PAGE_W,
                  minHeight: PAGE_H,
                  padding: '48px 44px',
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'top left',
                }}
              >
                <header className="border-b-2 pb-4" style={{ borderColor: accent }}>
                  <h2 className="text-3xl font-bold" style={{ color: accent }}>
                    {form.fullName || pick('Tumhara naam', 'Your name')}
                  </h2>
                  {form.headline && <p className="mt-1 text-lg text-slate-600">{form.headline}</p>}
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    {form.email && <span><Icon name="envelope" className="mr-1 h-3 w-3" />{form.email}</span>}
                    {form.phone && <span><Icon name="phone" className="mr-1 h-3 w-3" />{form.phone}</span>}
                    {form.location && <span><Icon name="location-dot" className="mr-1 h-3 w-3" />{form.location}</span>}
                    {form.website && <span><Icon name="globe" className="mr-1 h-3 w-3" />{form.website}</span>}
                    {form.github && <span><Icon name="github" className="mr-1 h-3 w-3" />{form.github}</span>}
                    {form.linkedin && <span><Icon name="linkedin" className="mr-1 h-3 w-3" />{form.linkedin}</span>}
                  </div>
                </header>

                {form.summary && (
                  <PreviewSection title="Summary" accent={accent}>
                    <p className="text-sm leading-relaxed text-slate-700">{form.summary}</p>
                  </PreviewSection>
                )}

                {skillsList.length > 0 && (
                  <PreviewSection title="Skills" accent={accent}>
                    <div className="flex flex-wrap gap-1.5">
                      {skillsList.map((s, i) => (
                        <span
                          key={i}
                          className="rounded px-2 py-0.5 text-xs font-medium"
                          style={{ backgroundColor: light, color: accent }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </PreviewSection>
                )}

                {form.experience.length > 0 && (
                  <PreviewSection title="Experience" accent={accent}>
                    {form.experience.map((e, i) => (
                      <PreviewEntry
                        key={i}
                        title={e.role || 'Role'}
                        subtitle={e.company}
                        period={[e.start, e.end].filter(Boolean).join(' – ')}
                        description={e.description}
                      />
                    ))}
                  </PreviewSection>
                )}

                {form.projects.length > 0 && (
                  <PreviewSection title="Projects" accent={accent}>
                    {form.projects.map((p, i) => (
                      <PreviewEntry key={i} title={p.name || 'Project'} subtitle={p.link} description={p.description} />
                    ))}
                  </PreviewSection>
                )}

                {form.education.length > 0 && (
                  <PreviewSection title="Education" accent={accent}>
                    {form.education.map((e, i) => (
                      <PreviewEntry
                        key={i}
                        title={e.degree || 'Degree'}
                        subtitle={e.school}
                        period={[e.start, e.end].filter(Boolean).join(' – ')}
                        description={e.description}
                      />
                    ))}
                  </PreviewSection>
                )}

                {form.certifications.length > 0 && (
                  <PreviewSection title="Certifications" accent={accent}>
                    <ul className="space-y-1 text-sm text-slate-700">
                      {form.certifications.map((c, i) => (
                        <li key={i}>
                          <span className="font-medium">{c.name}</span>
                          {c.issuer && <span className="text-slate-500"> — {c.issuer}</span>}
                          {c.year && <span className="text-slate-400"> ({c.year})</span>}
                        </li>
                      ))}
                    </ul>
                  </PreviewSection>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ─── Copy helpers ─── */

function sectionHint(key, pick) {
  switch (key) {
    case 'personal': return pick('Recruiter ko sabse pehle yahi dikhta hai.', 'The first thing a recruiter reads.');
    case 'summary': return pick('Do-teen line — kaun ho, kya banate ho.', 'Two or three lines: who you are, what you build.');
    case 'skills': return pick('Comma se alag karo. Wahi likho jispe sawaal jhel sako.', 'Comma separated. Only what you can be questioned on.');
    case 'experience': return pick('Sabse naya sabse upar. Fresher ho? Projects bharo.', 'Most recent first. No jobs yet? Fill Projects instead.');
    case 'projects': return pick('Fresher ke liye ye sabse zaroori section hai.', 'For a first job, this is the section that matters most.');
    case 'education': return pick('Degree, college aur saal — bas itna kaafi hai.', 'Degree, school and years is enough.');
    case 'certifications': return pick('Learnverse ke certificates bhi yahan aa sakte hain.', 'Your Learnverse certificates belong here too.');
    default: return '';
  }
}

function sectionTip(key, pick) {
  switch (key) {
    case 'experience':
    case 'projects':
      return pick(
        '“Frontend pe kaam kiya” kamzor hai. Number daalo: “First paint 4s se 1.2s kiya, 8 pages pe.”',
        '"Worked on the frontend" is weak. Put a number in it: "Cut first paint from 4s to 1.2s across 8 pages."'
      );
    case 'summary':
      return pick(
        'Objective mat likho. Ye batao ki tum kya bana chuke ho.',
        'Skip the objective. Say what you have actually built.'
      );
    case 'skills':
      return pick('12 se zyada skills likhoge toh koi bhi alag nahi dikhegi.', 'Past a dozen, no single skill stands out.');
    default:
      return '';
  }
}

/* ─── Editor primitives ─── */

function Card({ children, action }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      {action && <div className="mb-3 flex justify-end">{action}</div>}
      {children}
    </div>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-500">{label}</span>
      <input
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none placeholder:text-slate-300 focus:border-indigo-400"
      />
    </label>
  );
}

// A bullet field that flags the most common weakness: no measurable result.
function Bullet({ value, onChange, placeholder, pick }) {
  const filled = (value || '').trim().length > 0;
  const numbered = hasNumber(value || '');
  return (
    <label className="mt-3 block">
      <span className="mb-1.5 flex items-center">
        <span className="text-xs font-semibold text-slate-500">{pick('Kya kiya', 'What you did')}</span>
        {filled && (
          <span className={`ml-auto text-[11px] font-medium ${numbered ? 'text-green-600' : 'text-amber-600'}`}>
            {numbered ? pick('number hai ✓', 'has a number ✓') : pick('koi number nahi', 'no number yet')}
          </span>
        )}
      </span>
      <textarea
        value={value || ''}
        onChange={onChange}
        rows={3}
        placeholder={placeholder}
        className="w-full resize-none rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none placeholder:text-slate-300 focus:border-indigo-400"
      />
    </label>
  );
}

function Repeatable({ items, onAdd, onRemove, onMove, render, titleOf, addLabel, emptyLabel }) {
  return (
    <div className="flex flex-col gap-4">
      {items.length === 0 && (
        <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-400">
          {emptyLabel}
        </p>
      )}

      {items.map((item, i) => (
        <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-slate-100 text-[11px] font-bold text-slate-500">
              {i + 1}
            </span>
            <span className="flex-1 truncate font-bold">{titleOf(item)}</span>
            <span className="flex shrink-0 gap-1.5">
              <button
                type="button"
                onClick={onMove(i, -1)}
                disabled={i === 0}
                aria-label="Move up"
                className="grid h-7 w-7 place-items-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-40"
              >
                <Icon name="arrow-up" className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={onMove(i, 1)}
                disabled={i === items.length - 1}
                aria-label="Move down"
                className="grid h-7 w-7 place-items-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-40"
              >
                <Icon name="arrow-down" className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={onRemove(i)}
                aria-label="Remove"
                className="grid h-7 w-7 place-items-center rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
              >
                <Icon name="x" className="h-3 w-3" />
              </button>
            </span>
          </div>
          {render(item, i)}
        </div>
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="flex items-center justify-center gap-2.5 rounded-2xl border border-dashed border-slate-300 py-4 text-sm font-semibold text-indigo-600 transition hover:border-indigo-300 hover:bg-white"
      >
        <span className="text-base leading-none">+</span>
        {addLabel}
      </button>
    </div>
  );
}

/* ─── Preview primitives ─── */

function PreviewSection({ title, accent, children }) {
  return (
    <section className="mt-5">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>
        {title}
      </h3>
      {children}
    </section>
  );
}

function PreviewEntry({ title, subtitle, period, description }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        {period && <p className="shrink-0 text-xs text-slate-400">{period}</p>}
      </div>
      {subtitle && <p className="text-xs font-medium text-slate-500">{subtitle}</p>}
      {description && <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{description}</p>}
    </div>
  );
}
