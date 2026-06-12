'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import PrintButton from '@/components/PrintButton';
import { useLang } from '@/components/LanguageProvider';

const THEMES = {
  indigo: { accent: '#4f46e5', light: '#eef2ff' },
  slate: { accent: '#334155', light: '#f1f5f9' },
  emerald: { accent: '#059669', light: '#ecfdf5' },
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

export default function ResumePage() {
  const { data: session, status } = useSession();
  const { pick } = useLang();
  const [form, setForm] = useState(EMPTY);
  const [skillsText, setSkillsText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  // Load existing resume; prefill name/email from the session.
  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch('/api/resume')
      .then((r) => r.json())
      .then(({ resume }) => {
        if (resume) {
          setForm({ ...EMPTY, ...resume });
          setSkillsText((resume.skills || []).join(', '));
        } else {
          setForm((f) => ({
            ...f,
            fullName: session.user.name || '',
            email: session.user.email || '',
          }));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [status, session]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // Generic helpers for the repeatable sections.
  const addItem = (key, factory) => () =>
    setForm((f) => ({ ...f, [key]: [...f[key], factory()] }));
  const removeItem = (key, idx) => () =>
    setForm((f) => ({ ...f, [key]: f[key].filter((_, i) => i !== idx) }));
  const setItem = (key, idx, field) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].map((it, i) => (i === idx ? { ...it, [field]: e.target.value } : it)),
    }));

  const save = useCallback(async () => {
    setSaving(true);
    const skills = skillsText.split(',').map((s) => s.trim()).filter(Boolean);
    const payload = { ...form, skills };
    try {
      const res = await fetch('/api/resume', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setForm((f) => ({ ...f, skills }));
        setSavedAt(new Date());
      }
    } finally {
      setSaving(false);
    }
  }, [form, skillsText]);

  // Pull course names the user has completed and suggest them as skills.
  const importSkills = async () => {
    try {
      const { courseProgress = [] } = await fetch('/api/me/dashboard').then((r) => r.json());
      const learned = courseProgress
        .filter((c) => c.completed > 0)
        .map((c) => c.title);
      if (!learned.length) return;
      const current = new Set(skillsText.split(',').map((s) => s.trim()).filter(Boolean));
      learned.forEach((s) => current.add(s));
      setSkillsText([...current].join(', '));
    } catch {}
  };

  if (status === 'loading' || (status === 'authenticated' && loading)) {
    return <p className="mx-auto max-w-4xl px-4 py-12 text-slate-400">Loading…</p>;
  }

  if (status !== 'authenticated') {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Resume Builder</h1>
        <p className="mt-2 text-slate-600">{pick('Login karke apna resume banao aur PDF download karo.', 'Login to build your resume and download it as a PDF.')}</p>
        <Link
          href="/login?callbackUrl=/resume"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Login
        </Link>
      </div>
    );
  }

  const skillsList = skillsText.split(',').map((s) => s.trim()).filter(Boolean);
  const accent = THEMES[form.theme]?.accent || THEMES.indigo.accent;
  const light = THEMES[form.theme]?.light || THEMES.indigo.light;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Print rules scoped to this page: show only the resume sheet, full width. */}
      <style>{`
        @media print {
          .resume-editor { display: none !important; }
          .resume-preview { box-shadow: none !important; border: none !important; margin: 0 !important; max-width: 100% !important; }
          .resume-grid { display: block !important; }
        }
      `}</style>

      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">📄 Resume Builder</h1>
          <p className="mt-1 text-slate-600">{pick('Left mein edit, right mein preview. Print → “Save as PDF”.', 'Edit left, preview right. Print → “Save as PDF”.')}</p>
        </div>
        <div className="flex items-center gap-3">
          {savedAt && <span className="text-sm text-green-600">{pick('Save ho gaya ✓', 'Saved ✓')}</span>}
          <button
            onClick={save}
            disabled={saving}
            className="rounded-lg border border-slate-200 px-4 py-2 font-semibold hover:bg-slate-50 disabled:opacity-60"
          >
            {saving ? pick('Save ho raha hai…', 'Saving…') : pick('💾 Save', '💾 Save')}
          </button>
          <PrintButton label={pick('Download PDF', 'Download PDF')} />
        </div>
      </div>

      <div className="resume-grid grid gap-8 lg:grid-cols-2">
        {/* ───────── Editor ───────── */}
        <div className="resume-editor no-print space-y-6">
          {/* Theme */}
          <Section title={pick('Theme', 'Theme')}>
            <div className="flex gap-2">
              {Object.entries(THEMES).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setForm((f) => ({ ...f, theme: key }))}
                  className={`h-9 w-9 rounded-full ring-2 ring-offset-2 ${form.theme === key ? 'ring-slate-900' : 'ring-transparent'}`}
                  style={{ backgroundColor: t.accent }}
                  aria-label={key}
                />
              ))}
            </div>
          </Section>

          {/* Header */}
          <Section title={pick('Personal details', 'Personal details')}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Full name" value={form.fullName} onChange={set('fullName')} />
              <Field label="Headline (e.g. Full-Stack Developer)" value={form.headline} onChange={set('headline')} />
              <Field label="Email" value={form.email} onChange={set('email')} />
              <Field label="Phone" value={form.phone} onChange={set('phone')} />
              <Field label="Location" value={form.location} onChange={set('location')} />
              <Field label="Website" value={form.website} onChange={set('website')} />
              <Field label="GitHub" value={form.github} onChange={set('github')} />
              <Field label="LinkedIn" value={form.linkedin} onChange={set('linkedin')} />
            </div>
          </Section>

          {/* Summary */}
          <Section title={pick('Summary', 'Summary')}>
            <textarea
              value={form.summary}
              onChange={set('summary')}
              rows={3}
              placeholder={pick('Apne baare mein 2–3 lines…', '2–3 lines about you…')}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
            />
          </Section>

          {/* Skills */}
          <Section title={pick('Skills', 'Skills')} action={<button onClick={importSkills} className="text-xs font-semibold text-indigo-600 hover:underline">{pick('↓ Mere courses se import karo', '↓ Import from my courses')}</button>}>
            <input
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              placeholder="JavaScript, React, Node.js, MongoDB"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
            />
            <p className="mt-1 text-xs text-slate-400">{pick('Comma se separate karo.', 'Separate with commas.')}</p>
          </Section>

          {/* Experience */}
          <Repeatable
            title="Experience"
            items={form.experience}
            onAdd={addItem('experience', blankExp)}
            onRemove={(i) => removeItem('experience', i)}
            render={(item, i) => (
              <>
                <div className="grid gap-2 sm:grid-cols-2">
                  <Field label="Role" value={item.role} onChange={setItem('experience', i, 'role')} />
                  <Field label="Company" value={item.company} onChange={setItem('experience', i, 'company')} />
                  <Field label="Start" value={item.start} onChange={setItem('experience', i, 'start')} />
                  <Field label="End" value={item.end} onChange={setItem('experience', i, 'end')} />
                </div>
                <textarea
                  value={item.description}
                  onChange={setItem('experience', i, 'description')}
                  rows={2}
                  placeholder="What you did…"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
                />
              </>
            )}
          />

          {/* Education */}
          <Repeatable
            title="Education"
            items={form.education}
            onAdd={addItem('education', blankEdu)}
            onRemove={(i) => removeItem('education', i)}
            render={(item, i) => (
              <>
                <div className="grid gap-2 sm:grid-cols-2">
                  <Field label="Degree" value={item.degree} onChange={setItem('education', i, 'degree')} />
                  <Field label="School" value={item.school} onChange={setItem('education', i, 'school')} />
                  <Field label="Start" value={item.start} onChange={setItem('education', i, 'start')} />
                  <Field label="End" value={item.end} onChange={setItem('education', i, 'end')} />
                </div>
                <textarea
                  value={item.description}
                  onChange={setItem('education', i, 'description')}
                  rows={2}
                  placeholder="Grade, focus area…"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
                />
              </>
            )}
          />

          {/* Projects */}
          <Repeatable
            title="Projects"
            items={form.projects}
            onAdd={addItem('projects', blankProj)}
            onRemove={(i) => removeItem('projects', i)}
            render={(item, i) => (
              <>
                <div className="grid gap-2 sm:grid-cols-2">
                  <Field label="Name" value={item.name} onChange={setItem('projects', i, 'name')} />
                  <Field label="Link" value={item.link} onChange={setItem('projects', i, 'link')} />
                </div>
                <textarea
                  value={item.description}
                  onChange={setItem('projects', i, 'description')}
                  rows={2}
                  placeholder="What it does, tech used…"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
                />
              </>
            )}
          />

          {/* Certifications */}
          <Repeatable
            title="Certifications"
            items={form.certifications}
            onAdd={addItem('certifications', blankCert)}
            onRemove={(i) => removeItem('certifications', i)}
            render={(item, i) => (
              <div className="grid gap-2 sm:grid-cols-3">
                <Field label="Name" value={item.name} onChange={setItem('certifications', i, 'name')} />
                <Field label="Issuer" value={item.issuer} onChange={setItem('certifications', i, 'issuer')} />
                <Field label="Year" value={item.year} onChange={setItem('certifications', i, 'year')} />
              </div>
            )}
          />
        </div>

        {/* ───────── Live preview (printable) ───────── */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div
            className="resume-preview mx-auto bg-white p-8 text-slate-800 shadow-lg ring-1 ring-slate-200"
            style={{ maxWidth: '210mm', minHeight: '297mm' }}
          >
            {/* Header */}
            <header className="border-b-2 pb-4" style={{ borderColor: accent }}>
              <h2 className="text-3xl font-bold" style={{ color: accent }}>
                {form.fullName || 'Your Name'}
              </h2>
              {form.headline && <p className="mt-1 text-lg text-slate-600">{form.headline}</p>}
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                {form.email && <span>✉ {form.email}</span>}
                {form.phone && <span>☎ {form.phone}</span>}
                {form.location && <span>📍 {form.location}</span>}
                {form.website && <span>🌐 {form.website}</span>}
                {form.github && <span>⌥ {form.github}</span>}
                {form.linkedin && <span>in {form.linkedin}</span>}
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
                    <span key={i} className="rounded px-2 py-0.5 text-xs font-medium" style={{ backgroundColor: light, color: accent }}>
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
                  <PreviewEntry
                    key={i}
                    title={p.name || 'Project'}
                    subtitle={p.link}
                    description={p.description}
                  />
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
    </div>
  );
}

/* ───────── Small editor primitives ───────── */

function Section({ title, action, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-bold">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-500">{label}</span>
      <input
        value={value || ''}
        onChange={onChange}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
      />
    </label>
  );
}

function Repeatable({ title, items, onAdd, onRemove, render }) {
  const { pick } = useLang();
  return (
    <Section
      title={title}
      action={
        <button onClick={onAdd} className="text-xs font-semibold text-indigo-600 hover:underline">
          {pick('+ Add', '+ Add')}
        </button>
      }
    >
      {items.length === 0 ? (
        <p className="text-sm text-slate-400">{pick('Koi entry nahi. “+ Add” dabao.', 'No entries yet. Tap “+ Add”.')}</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
              <div className="mb-2 flex justify-end">
                <button onClick={onRemove(i)} className="text-xs font-medium text-red-500 hover:underline">
                  {pick('Remove', 'Remove')}
                </button>
              </div>
              {render(item, i)}
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

/* ───────── Preview primitives ───────── */

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
