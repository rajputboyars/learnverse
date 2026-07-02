'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';

export default function MockInterviewPage() {
  const { slug } = useParams();
  const { lang: uiLang, pick } = useLang();

  const [data, setData]         = useState(null);
  const [idx, setIdx]           = useState(0);
  const [score, setScore]       = useState(0);
  const [finished, setFinished] = useState(false);

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
    setData(null); setIdx(0); setScore(0); setFinished(false); resetAnswer();
    fetch(`/api/mock-interview?courseSlug=${slug}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ questions: [] }));
  }

  useEffect(() => { load(); }, [slug]);

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

  function rate(got) {
    if (got) setScore((s) => s + 1);
    setShowModal(false);
    const isLast = idx + 1 >= (data?.questions?.length || 0);
    if (isLast) { setFinished(true); return; }
    setIdx((i) => i + 1);
    resetAnswer();
  }

  /* ── Loading / empty states ────────────────────────────────────── */
  if (!data) {
    return (
      <p className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-16 text-slate-400">
        {pick('Questions load ho rahe hain…', 'Loading questions…')}
      </p>
    );
  }

  if (!data.questions?.length) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-4xl">🎤</p>
        <h1 className="mt-4 text-2xl font-bold">
          {pick('Mock Interview', 'Mock Interview')}
        </h1>
        <p className="mt-2 text-slate-600">
          {pick(
            'Is course ke liye abhi interview questions nahi hain.',
            'No interview questions for this course yet.',
          )}
        </p>
        <Link
          href={`/courses/${slug}`}
          className="mt-6 inline-block font-semibold text-indigo-600 underline"
        >
          {pick('Course pe wapas', 'Back to course')}
        </Link>
      </div>
    );
  }

  /* ── Finished screen ───────────────────────────────────────────── */
  if (finished) {
    const pct = Math.round((score / data.questions.length) * 100);
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-5xl">🎤</p>
        <h1 className="mt-4 text-3xl font-bold">
          {score} / {data.questions.length}
        </h1>
        <p className="mt-1 text-slate-600">
          {pick('confidently answer kiye', 'confidently answered')}
        </p>
        <div className="mx-auto mt-4 h-3 w-48 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-slate-500">
          {pick(
            'Jo "needs work" the, unke concepts dobara padho aur retry karo.',
            'Re-read the concepts you marked "needs work" and retry.',
          )}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={load}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700"
          >
            {pick('Retry', 'Retry')}
          </button>
          <Link
            href={`/courses/${slug}`}
            className="rounded-xl border border-slate-200 px-5 py-2.5 font-semibold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {pick('Course pe wapas', 'Back to course')}
          </Link>
        </div>
      </div>
    );
  }

  /* ── Main interview UI ─────────────────────────────────────────── */
  const q = data.questions[idx];
  const modelAnswer = (uiLang === 'hi' && q.hinglish) ? q.hinglish : q.english;
  const hasAnswer = userText.trim() || audioURL;

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-2">
        <h1 className="text-xl font-bold">
          🎤 {data.course?.icon} {data.course?.title} —{' '}
          {pick('Mock Interview', 'Mock Interview')}
        </h1>
        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {idx + 1} / {data.questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all"
          style={{ width: `${((idx) / data.questions.length) * 100}%` }}
        />
      </div>

      {/* Question card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 sm:p-8">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-500 dark:bg-slate-800">
          {q.difficulty}
        </span>
        <p className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
          {q.question}
        </p>
        <p className="mt-2 text-sm text-slate-500">
          {pick(
            'Pehle khud answer socho, phir record ya type karo aur submit karo.',
            'Think about the answer first, then record or type it and submit.',
          )}
        </p>

        {/* Answer inputs */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">

          {/* Voice recording */}
          <div className="flex flex-col items-center justify-start rounded-xl border border-slate-200 p-5 dark:border-slate-700">
            <p className="mb-4 text-xs font-bold uppercase tracking-wide text-slate-400">
              {pick('Voice Record', 'Voice Record')}
            </p>

            {/* Mic button */}
            <button
              onClick={recording ? stopRecording : startRecording}
              aria-label={recording ? 'Stop recording' : 'Start recording'}
              className={`relative grid h-16 w-16 place-items-center rounded-full text-white transition focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 ${
                recording
                  ? 'bg-red-500 focus-visible:ring-red-400'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-400'
              }`}
            >
              {recording && (
                <span className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-60" />
              )}
              {recording ? (
                /* Stop square */
                <span className="relative h-5 w-5 rounded-sm bg-white" />
              ) : (
                /* Mic icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 1a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V5a4 4 0 0 0-4-4Z" />
                  <path fillRule="evenodd" d="M4 11a1 1 0 0 1 2 0 6 6 0 0 0 12 0 1 1 0 1 1 2 0 8 8 0 0 1-7 7.93V21h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-2.07A8 8 0 0 1 4 11Z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            <p className="mt-3 text-xs text-slate-500">
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
          <div className="flex flex-col rounded-xl border border-slate-200 p-4 dark:border-slate-700">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
              {pick('Type Answer', 'Type Answer')}
            </p>
            <textarea
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder={pick('Yahan apna answer likho…', 'Type your answer here…')}
              rows={6}
              className="flex-1 resize-none rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="mt-5 w-full rounded-xl bg-indigo-600 py-3.5 font-semibold text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
        >
          {pick('Submit & Model Answer Dekho', 'Submit & See Model Answer')}
        </button>
      </div>

      {/* ── Reveal Modal ──────────────────────────────────────────── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl dark:bg-slate-900">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <h2 className="font-bold text-slate-900 dark:text-slate-100">
                {pick('Answer Reveal', 'Answer Reveal')}
              </h2>
              <span className="text-xs text-slate-500">
                Q {idx + 1} / {data.questions.length}
              </span>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
              {/* User's answer */}
              {(userText.trim() || audioURL) && (
                <div className="mb-4 rounded-xl bg-indigo-50 p-4 dark:bg-indigo-900/20">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                    {pick('Aapka Jawab', 'Your Answer')}
                  </p>
                  {audioURL && (
                    <audio src={audioURL} controls className="mb-3 w-full" />
                  )}
                  {userText.trim() && (
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {userText}
                    </p>
                  )}
                </div>
              )}

              {/* Model answer */}
              <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {pick('Sahi Jawab', 'Model Answer')}
                </p>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {modelAnswer}
                </p>
                {uiLang !== 'hi' && q.hinglish && (
                  <div className="mt-3 rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
                    <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">Hinglish</p>
                    <p className="mt-1 text-sm text-amber-900 dark:text-amber-200">{q.hinglish}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Rate buttons */}
            <div className="grid grid-cols-2 gap-3 border-t border-slate-100 px-6 py-4 dark:border-slate-800">
              <button
                onClick={() => rate(false)}
                className="rounded-xl bg-amber-500 py-3 font-semibold text-white hover:bg-amber-600"
              >
                {pick('Aur practice chahiye', 'Needs work')}
              </button>
              <button
                onClick={() => rate(true)}
                className="rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
              >
                {pick('Aa gaya ✓', 'Got it ✓')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
