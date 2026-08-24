'use client';

import { useState } from 'react';
import { useLang } from '@/components/LanguageProvider';

function ShieldIcon() {
  return (
    <svg width="27" height="27" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2l7 3v6c0 5-3.4 8.5-7 10-3.6-1.5-7-5-7-10V5l7-3zm0 2.2L7 6.1v4.9c0 3.8 2.4 6.6 5 7.8 2.6-1.2 5-4 5-7.8V6.1l-5-1.9z" />
      <path d="M10.2 12.9l-1.5 1.5 3 3 5.6-5.6-1.5-1.5-4.1 4.1z" />
    </svg>
  );
}
function CheckCircle() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff">
      <path d="M20.3 5.7a1 1 0 010 1.4l-10 10a1 1 0 01-1.42 0l-5-5a1 1 0 111.42-1.4L9.6 15l9.3-9.3a1 1 0 011.4 0z" />
    </svg>
  );
}
function IdIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
      <rect x="3" y="6" width="18" height="12" rx="2" />
    </svg>
  );
}

export default function VerifyCertificatePage() {
  const { pick } = useLang();
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { ok: true, data } | { ok: false }

  async function verify(e) {
    e.preventDefault();
    if (!id.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/certificates/verify?id=${encodeURIComponent(id.trim())}`);
      const data = await res.json();
      setResult(res.ok ? { ok: true, data } : { ok: false });
    } catch {
      setResult({ ok: false });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[480px] px-4 py-10 text-center sm:px-6 lg:px-8 lg:py-14">
      <span className="mx-auto flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-brand-tint text-brand-dark">
        <ShieldIcon />
      </span>
      <h1 className="mt-4 text-[25px] font-bold text-ink">{pick('Certificate verify karo', 'Verify a Certificate')}</h1>
      <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
        {pick('Har Learnverse certificate ki ek unique ID hoti hai — yahan check karo.', 'Every Learnverse certificate has a unique ID you can check right here.')}
      </p>

      <form onSubmit={verify} className="mt-6 text-left">
        <p className="mb-2.5 text-xs font-bold uppercase tracking-wide text-muted">{pick('Certificate ID', 'Certificate ID')}</p>
        <div className="flex items-center gap-2.5 rounded-2xl border-[1.5px] border-brand bg-card px-[18px] py-[15px] ring-4 ring-brand-tint">
          <span className="text-brand"><IdIcon /></span>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="LV-HTML-9F21A"
            className="w-full bg-transparent font-mono text-[15px] font-bold uppercase text-ink outline-none placeholder:text-muted-soft placeholder:normal-case"
          />
        </div>
        <button type="submit" disabled={loading} className="lv-btn lv-btn-primary mt-3.5 w-full justify-center disabled:opacity-50">
          {loading ? pick('Check ho raha hai…', 'Checking…') : pick('Certificate verify karo', 'Verify certificate')}
        </button>
      </form>

      {result?.ok === false && (
        <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {pick('Is ID se koi certificate nahi mila.', 'No certificate found with that ID.')}
        </p>
      )}

      {result?.ok && (
        <div className="mt-7">
          <div className="flex items-center justify-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-green">
              <CheckCircle />
            </span>
            <span className="text-[15.5px] font-bold text-accent-green-ink">{pick('Certificate Verified', 'Certificate Verified')}</span>
          </div>

          <div className="mt-[18px] rounded-[20px] p-0.5" style={{ background: 'linear-gradient(120deg,#f59e0b,var(--color-brand),var(--color-violet))' }}>
            <div className="rounded-[18px] bg-card p-[26px] text-left">
              <div className="flex items-center gap-3.5">
                <svg width="42" height="42" viewBox="0 0 24 24" className="shrink-0">
                  <path d="M9.1 12.9L7 21l5-2.6L17 21l-2.1-8.1-1.9.5L14.4 19l-2.4-1.3L9.6 19l1.4-6.6z" fill="#f59e0b" />
                  <circle cx="12" cy="9" r="6.5" fill="#f59e0b" />
                  <path d="M9.4 9.1l1.7 1.7 3.3-3.4 1.3 1.3-4.6 4.7-3-3z" fill="var(--color-amber-tint)" />
                </svg>
                <div>
                  <p className="text-[10.5px] uppercase tracking-[0.1em] text-muted">{pick('Certificate of Completion', 'Certificate of Completion')}</p>
                  <h3 className="mt-0.5 text-[17px] font-bold text-ink">{result.data.courseIcon} {result.data.courseTitle}</h3>
                </div>
              </div>
              <div className="mt-[18px] flex flex-col gap-2.5 border-t border-dashed border-line pt-[18px]">
                <div className="flex justify-between text-[13px]"><span className="text-muted">{pick('Kisko mila', 'Awarded to')}</span><span className="font-bold text-ink">{result.data.userName}</span></div>
                <div className="flex justify-between text-[13px]"><span className="text-muted">{pick('Poora hua', 'Completed')}</span><span className="font-bold text-ink">{result.data.totalConcepts}/{result.data.totalConcepts} {pick('concepts', 'concepts')}</span></div>
                <div className="flex justify-between text-[13px]"><span className="text-muted">{pick('Issue hua', 'Issued on')}</span><span className="font-bold text-ink">{new Date(result.data.completedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span></div>
                <div className="flex justify-between text-[13px]"><span className="text-muted">Certificate ID</span><span className="font-mono font-bold text-ink">{result.data.certId}</span></div>
              </div>
            </div>
          </div>

          <p className="mt-[18px] text-xs leading-relaxed text-muted-soft">
            {pick('Ye certificate Learnverse ne issue kiya hai aur confirm karta hai ki course poora complete hua.', 'This certificate was issued by Learnverse and confirms the course was completed in full.')}
          </p>
        </div>
      )}
    </div>
  );
}
