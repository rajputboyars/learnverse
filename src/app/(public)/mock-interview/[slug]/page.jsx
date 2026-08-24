'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';

const DIFFICULTY_LABEL = { easy: 'Beginner', medium: 'Intermediate', hard: 'Advanced' };

function MicIcon() {
  return (
    <svg className="relative h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V5a4 4 0 0 0-4-4Z" />
      <path fillRule="evenodd" d="M4 11a1 1 0 0 1 2 0 6 6 0 0 0 12 0 1 1 0 1 1 2 0 8 8 0 0 1-7 7.93V21h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-2.07A8 8 0 0 1 4 11Z" clipRule="evenodd" />
    </svg>
  );
}

export default function MockInterviewPage() {
  const { slug } = useParams();
  const { lang: uiLang, pick } = useLang();
  const { data: session, status: authStatus } = useSession();

  const [data, setData]         = useState(null);
  const [idx, setIdx]           = useState(0);
  const [score, setScore]       = useState(0);
  const [finished, setFinished] = useState(false);
  const [baselineXP, setBaselineXP] = useState(null);
  const [xpEarned, setXpEarned] = useState(0);

  // Answer inputs
  const [userText, setUserText]     = useState('');
  const [recording, setRecording]   = useState(false);
  const [audioURL, setAudioURL]     = useState(null);
  const [showModal, setShowModal]   = useState(false);

  const mediaRecorderRef = useRef(null);
  const chunksRef        = useRef([]);

  /* ── Load questions ────────────────────────────────────────────── */
  function resetAnswer() {
    setUserText('');
    setAudioURL(null);
    setRecording(false);
    setShowModal(false);
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }

  function load() {
    setData(null); setIdx(0); setScore(0); setFinished(false); setXpEarned(0); resetAnswer();
    fetch(`/api/mock-interview?courseSlug=${slug}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ questions: [] }));
  }

  useEffect(() => { load(); }, [slug]);

  useEffect(() => {
    if (authStatus !== 'authenticated') return;
    fetch('/api/me/stats')
      .then((r) => r.json())
      .then((d) => setBaselineXP(d.totalXP ?? 0))
      .catch(() => {});
  }, [authStatus]);

  /* ── Voice recording ───────────────────────────────────────────── */
  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => e.data.size > 0 && chunksRef.current.push(e.data);
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioURL(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      mediaRecorderRef.current = mr;
      setRecording(true);
      setAudioURL(null);
    } catch {
      alert(pick(
        'Microphone access chahiye recording ke liye. Browser settings mein allow karo.',
        'Microphone access is required for recording. Please allow it in your browser settings.',
      ));
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }

  /* ── Submit / rate ─────────────────────────────────────────────── */
  function handleSubmit() {
    setShowModal(true);
  }

  async function rate(got) {
    if (got) {
      setScore((s) => s + 1);
      const q = data.questions[idx];
      if (q.conceptId && authStatus === 'authenticated') {
        try {
          const res = await fetch('/api/mock-interview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ conceptId: q.conceptId }),
          });
          const reward = await res.json();
          if (res.ok && reward.gained) setXpEarned((x) => x + reward.gained);
        } catch {}
      }
    }
    setShowModal(false);
    const isLast = idx + 1 >= (data?.questions?.length || 0);
    if (isLast) { setFinished(true); return; }
    setIdx((i) => i + 1);
    resetAnswer();
  }

  /* ── Loading / empty states ────────────────────────────────────── */
  if (!data) {
    return (
      <p className="mx-auto w-full max-w-[820px] px-4 sm:px-6 lg:px-8 py-16 text-muted">
        {pick('Questions load ho rahe hain…', 'Loading questions…')}
      </p>
    );
  }

  if (!data.questions?.length) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-4xl">🎤</p>
        <h1 className="mt-4 text-2xl font-bold text-ink">
          {pick('Mock Interview', 'Mock Interview')}
        </h1>
        <p className="mt-2 text-muted">
          {pick(
            'Is course ke liye abhi interview questions nahi hain.',
            'No interview questions for this course yet.',
          )}
        </p>
        <Link href={`/courses/${slug}`} className="mt-6 inline-block font-bold text-brand underline">
          {pick('Course pe wapas', 'Back to course')}
        </Link>
      </div>
    );
  }

  /* ── Finished screen ───────────────────────────────────────────── */
  if (finished) {
    const pct = Math.round((score / data.questions.length) * 100);
    return (
      <div className="mx-auto max-w-[460px] px-4 py-16 text-center">
        <p className="text-[52px] leading-none">🎤</p>
        <h1 className="mt-3.5 text-[44px] font-bold text-ink">
          {score} / {data.questions.length}
        </h1>
        <p className="mt-1 text-[15px] text-muted">
          {pick('confidently answer kiye', 'confidently answered')}
        </p>
        <div className="mx-auto mt-[18px] h-2.5 w-[220px] overflow-hidden rounded-full bg-line-soft">
          <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${pct}%` }} />
        </div>

        {xpEarned > 0 && (
          <div
            className="mt-6 flex items-center gap-3.5 rounded-2xl p-5 text-left"
            style={{ background: 'linear-gradient(120deg,var(--color-violet),#a855f7)' }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" className="shrink-0">
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
            <div>
              <div className="text-[17px] font-bold text-white">+{xpEarned} XP {pick('mile', 'earned')}</div>
              {baselineXP !== null && (
                <div className="mt-0.5 text-[12.5px] text-violet-100">
                  {baselineXP} → {baselineXP + xpEarned} {pick('total XP', 'total XP')}
                </div>
              )}
            </div>
          </div>
        )}

        <p className="mt-6 text-[13.5px] leading-relaxed text-muted">
          {pick(
            'Jo "needs work" the, unke concepts dobara padho aur retry karo.',
            'Re-read the concepts you marked "needs work" and retry.',
          )}
        </p>
        <div className="mt-6 flex gap-3">
          <button onClick={load} className="lv-btn lv-btn-primary flex-1 justify-center">
            {pick('Retry', 'Retry')}
          </button>
          <Link href={`/courses/${slug}`} className="lv-btn lv-btn-ghost flex-1 justify-center">
            {pick('Course pe wapas', 'Back to course')}
          </Link>
        </div>
      </div>
    );
  }

  /* ── Main interview UI ─────────────────────────────────────────── */
  const q = data.questions[idx];
  const modelAnswer = (uiLang === 'hi' && q.hinglish) ? q.hinglish : q.english;

  return (
    <div className="mx-auto w-full max-w-[820px] px-4 py-10 sm:px-6 lg:px-8 lg:py-11">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-[19px] font-bold text-ink sm:text-[22px]">
          🎤 {data.course?.icon} {data.course?.title} — {pick('Mock Interview', 'Mock Interview')}
        </h1>
        <span className="lv-pill shrink-0 bg-line-soft text-ink-soft">
          {idx + 1} / {data.questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-line-soft">
        <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${(idx / data.questions.length) * 100}%` }} />
      </div>

      {/* Question card */}
      <div className="lv-card mt-6 p-6 sm:p-[26px]">
        <span className="lv-pill bg-amber-tint text-amber-ink">{DIFFICULTY_LABEL[q.difficulty] || q.difficulty}</span>
        <h2 className="mt-4 text-[19px] font-bold leading-snug text-ink">
          {q.question}
        </h2>
        <p className="mt-2 text-[13.5px] text-muted">
          {pick(
            'Pehle khud answer socho, phir record ya type karo aur submit karo.',
            'Think about the answer first, then record or type it and submit.',
          )}
        </p>

        {/* Answer inputs */}
        <div className="mt-[22px] grid gap-4 sm:grid-cols-2">

          {/* Voice recording */}
          <div className="flex flex-col items-center justify-start rounded-2xl border border-line p-5">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-wide text-muted">
              {pick('Voice Record', 'Voice Record')}
            </p>

            {/* Mic button */}
            <button
              onClick={recording ? stopRecording : startRecording}
              aria-label={recording ? 'Stop recording' : 'Start recording'}
              className={`relative grid h-16 w-16 place-items-center rounded-full text-white transition focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 ${
                recording ? 'bg-red-500 focus-visible:ring-red-400' : 'bg-brand hover:bg-brand-dark focus-visible:ring-brand-tint'
              }`}
            >
              {recording && (
                <span className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-60" />
              )}
              {recording ? (
                <span className="relative h-5 w-5 rounded-sm bg-white" />
              ) : (
                <MicIcon />
              )}
            </button>

            <p className="mt-3 text-xs text-muted">
              {recording
                ? pick('Recording… ruk ke stop karo', 'Recording… tap to stop')
                : audioURL
                ? pick('Dobara record karo', 'Re-record')
                : pick('Tap karo record karne ke liye', 'Tap to record')}
            </p>

            {audioURL && (
              <audio src={audioURL} controls className="mt-4 w-full" />
            )}
          </div>

          {/* Text input */}
          <div className="flex flex-col rounded-2xl border border-line p-[18px]">
            <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-muted">
              {pick('Type Answer', 'Type Answer')}
            </p>
            <textarea
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder={pick('Yahan apna answer likho…', 'Type your answer here…')}
              rows={6}
              className="flex-1 resize-none rounded-xl border border-line bg-line-soft p-3 text-sm text-ink placeholder-muted-soft focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand-tint"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="lv-btn lv-btn-primary mt-5 w-full justify-center focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-tint focus-visible:ring-offset-2"
        >
          {pick('Submit & Model Answer Dekho', 'Submit & See Model Answer')}
        </button>
      </div>

      {/* ── Reveal Modal ──────────────────────────────────────────── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/55 sm:items-center sm:p-4"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          {/* Bottom sheet on mobile (flat bottom edge), centred dialog on desktop */}
          <div className="lv-card w-full max-w-lg rounded-b-none shadow-2xl sm:rounded-b-3xl">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-line-soft px-6 py-4">
              <h2 className="font-bold text-ink">
                {pick('Answer Reveal', 'Answer Reveal')}
              </h2>
              <span className="text-xs text-muted">
                Q {idx + 1} / {data.questions.length}
              </span>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
              {/* User's answer */}
              {(userText.trim() || audioURL) && (
                <div className="mb-4 rounded-2xl bg-brand-tint p-4">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-brand-dark">
                    {pick('Aapka Jawab', 'Your Answer')}
                  </p>
                  {audioURL && (
                    <audio src={audioURL} controls className="mb-3 w-full" />
                  )}
                  {userText.trim() && (
                    <p className="text-sm leading-relaxed text-ink-soft">
                      {userText}
                    </p>
                  )}
                </div>
              )}

              {/* Model answer */}
              <div className="rounded-2xl bg-line-soft p-4">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted">
                  {pick('Sahi Jawab', 'Model Answer')}
                </p>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {modelAnswer}
                </p>
                {uiLang !== 'hi' && q.hinglish && (
                  <div className="mt-3 rounded-xl bg-amber-tint p-3">
                    <p className="text-xs font-bold text-amber-ink">Hinglish</p>
                    <p className="mt-1 text-sm text-ink-soft">{q.hinglish}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Rate buttons */}
            <div className="grid grid-cols-2 gap-3 border-t border-line-soft px-6 py-4">
              <button onClick={() => rate(false)} className="lv-btn justify-center bg-amber-500 text-white">
                {pick('Aur practice chahiye', 'Needs work')}
              </button>
              <button onClick={() => rate(true)} className="lv-btn justify-center bg-accent-green text-white">
                {pick('Aa gaya ✓', 'Got it ✓')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
