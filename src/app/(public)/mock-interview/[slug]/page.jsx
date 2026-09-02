'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';
import Icon from '@/components/Icon';

const STAGE = 'mx-auto w-full max-w-[720px] px-4 sm:px-6';
const WIDE = 'mx-auto w-full max-w-[900px] px-4 sm:px-6';

function mmss(s) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

export default function MockInterviewPage() {
  const { slug } = useParams();
  const { lang: uiLang, pick } = useLang();

  const [data, setData] = useState(null);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [needsWork, setNeedsWork] = useState([]);
  const [finished, setFinished] = useState(false);

  const [revealed, setRevealed] = useState(false);
  const [userText, setUserText] = useState('');
  const [typing, setTyping] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [seconds, setSeconds] = useState(0);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const resetAnswer = useCallback(() => {
    setUserText(''); setAudioURL(null); setRecording(false);
    setRevealed(false); setTyping(false); setSeconds(0);
    if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop();
  }, []);

  const load = useCallback(() => {
    setData(null); setIdx(0); setScore(0); setNeedsWork([]); setFinished(false); resetAnswer();
    fetch(`/api/mock-interview?courseSlug=${slug}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ questions: [] }));
  }, [slug, resetAnswer]);

  useEffect(() => { load(); }, [load]);

  // Thinking / recording clock.
  useEffect(() => {
    if (finished || revealed) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [finished, revealed, idx]);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => e.data.size > 0 && chunksRef.current.push(e.data);
      mr.onstop = () => {
        setAudioURL(URL.createObjectURL(new Blob(chunksRef.current, { type: 'audio/webm' })));
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      mediaRecorderRef.current = mr;
      setRecording(true);
      setAudioURL(null);
    } catch {
      alert(pick(
        'Microphone access chahiye recording ke liye. Browser settings mein allow karo.',
        'Microphone access is required for recording. Please allow it in your browser settings.'
      ));
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }

  function advance() {
    if (idx + 1 >= data.questions.length) { setFinished(true); return; }
    setIdx((i) => i + 1);
    resetAnswer();
  }

  function rate(got) {
    if (got) setScore((s) => s + 1);
    else setNeedsWork((n) => [...n, data.questions[idx]]);
    advance();
  }

  /* ── Loading / empty ── */
  if (!data) {
    return <div className={`${STAGE} py-20 text-center text-slate-400`}>{pick('Questions load ho rahe hain…', 'Loading questions…')}</div>;
  }

  if (!data.questions?.length) {
    return (
      <div className={`${STAGE} py-20 text-center`}>
        <Icon name="microphone" className="mx-auto h-10 w-10 text-indigo-600" />
        <h1 className="mt-4 text-2xl font-bold">{pick('Mock interview', 'Mock interview')}</h1>
        <p className="mt-2 text-slate-600">
          {pick('Is course ke liye abhi interview questions nahi hain.', 'No interview questions for this course yet.')}
        </p>
        <Link href={`/courses/${slug}`} className="mt-6 inline-block font-semibold text-indigo-600 underline">
          {pick('Course pe wapas', 'Back to course')}
        </Link>
      </div>
    );
  }

  /* ── Finished ── */
  if (finished) {
    const pct = Math.round((score / data.questions.length) * 100);
    return (
      <div className="bg-slate-50 pb-16">
        <div className={`${STAGE} flex flex-col gap-5 pt-8`}>
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 dark:bg-slate-950">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-45"
              style={{
                backgroundImage:
                  'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
            <div className="relative flex flex-col items-center gap-5 p-7 sm:flex-row">
              <span
                className="grid h-24 w-24 shrink-0 place-items-center rounded-full"
                style={{
                  background: `conic-gradient(#4f46e5 0turn ${pct / 100}turn, #1e293b ${pct / 100}turn 1turn)`,
                }}
              >
                <span className="grid h-[76px] w-[76px] place-items-center rounded-full bg-slate-900 text-2xl font-bold text-white dark:bg-slate-950">
                  {pct}%
                </span>
              </span>
              <div className="flex flex-1 flex-col gap-2 text-center sm:text-left">
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  {score} / {data.questions.length} {pick('confidently', 'answered confidently')}
                </h1>
                <p className="leading-relaxed text-slate-400">
                  {needsWork.length === 0
                    ? pick('Sab par confident the. Ab asli interview.', 'Confident on all of them. Now the real thing.')
                    : pick(
                        `${needsWork.length} sawaal pe practice chahiye — neeche list hai.`,
                        `${needsWork.length} need more work — the list is below.`
                      )}
                </p>
              </div>
              <div className="flex shrink-0 gap-2.5 sm:flex-col">
                <button
                  type="button"
                  onClick={load}
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  {pick('Phir se', 'Run again')}
                </button>
                <Link
                  href={`/courses/${slug}`}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-semibold text-slate-200 hover:bg-slate-800"
                >
                  {pick('Course pe wapas', 'Back to course')}
                </Link>
              </div>
            </div>
          </div>

          {/* Which ones — the old screen told you to revise them without saying which */}
          {needsWork.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="mb-3.5 flex items-center gap-2.5">
                <h2 className="font-bold">{pick('Inpe kaam karo', 'Work on these')}</h2>
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                  {needsWork.length}
                </span>
              </div>
              <div className="flex flex-col gap-2.5">
                {needsWork.map((n, i) => (
                  <div
                    key={`${n.question}-${i}`}
                    className="flex flex-col gap-2 rounded-xl border border-slate-200 px-4 py-3"
                  >
                    <span className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      <span className="flex-1 text-sm font-medium">{n.question}</span>
                      <span className="shrink-0 text-xs capitalize text-slate-400">{n.difficulty}</span>
                    </span>
                    <p className="pl-[18px] text-sm leading-relaxed text-slate-500">
                      {uiLang === 'hi' && n.hinglish ? n.hinglish : n.english}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── The stage ── */
  const q = data.questions[idx];
  const modelAnswer = uiLang === 'hi' && q.hinglish ? q.hinglish : q.english;
  const hasAnswer = userText.trim() || audioURL;

  return (
    <div className="min-h-[80vh] bg-slate-50 pb-16">

      {/* Task bar */}
      <div className="border-b border-slate-200 bg-white dark:bg-slate-900">
        <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 sm:px-6">
          <span className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 dark:bg-slate-800">
              <Icon name={data.course?.icon} brand className="h-4 w-4" />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-bold leading-tight">{data.course?.title}</span>
              <span className="text-xs text-slate-400">{pick('Mock interview', 'Mock interview')}</span>
            </span>
          </span>

          <span className="flex items-center gap-3">
            <span className="text-xs text-slate-500">Q {idx + 1} / {data.questions.length}</span>
            <span className="block h-1.5 w-24 overflow-hidden rounded-full bg-slate-200 sm:w-40">
              <span
                className="block h-1.5 rounded-full bg-indigo-600 transition-all"
                style={{ width: `${(idx / data.questions.length) * 100}%` }}
              />
            </span>
          </span>

          <span className="ml-auto flex items-center gap-2">
            <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
              {score} {pick('aa gaye', 'got it')}
            </span>
            {needsWork.length > 0 && (
              <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                {needsWork.length} {pick('practice', 'to work on')}
              </span>
            )}
            <Link
              href={`/courses/${slug}`}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              {pick('Chhodo', 'Leave')}
            </Link>
          </span>
        </div>
      </div>

      {revealed ? (
        /* ── Compare, side by side — not behind a modal ── */
        <div className={`${WIDE} flex flex-col gap-4 pt-8`}>
          <h1 className="max-w-[720px] text-xl font-bold leading-snug tracking-tight sm:text-2xl">{q.question}</h1>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-2xl border border-indigo-200 bg-indigo-50/40 p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                {pick('Tumhara jawab', 'Your answer')}
              </span>
              {audioURL && <audio src={audioURL} controls className="w-full" />}
              {userText.trim() ? (
                <p className="leading-relaxed text-slate-700">{userText}</p>
              ) : (
                !audioURL && (
                  <p className="text-sm text-slate-500">
                    {pick('Is baar kuch record ya type nahi kiya.', 'Nothing recorded or typed this time.')}
                  </p>
                )
              )}
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5">
              <span className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {pick('Model answer', 'Model answer')}
                </span>
              </span>
              <p className="leading-relaxed text-slate-700">{modelAnswer}</p>
              {uiLang !== 'hi' && q.hinglish && (
                <div className="rounded-xl bg-amber-50 p-3.5">
                  <p className="text-xs font-semibold text-amber-700">Hinglish</p>
                  <p className="mt-1 text-sm leading-relaxed text-amber-900">{q.hinglish}</p>
                </div>
              )}
            </div>
          </div>

          {/* Self-rating that says what it does */}
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
            <span className="flex flex-col gap-0.5">
              <span className="font-semibold">{pick('Kitna confident the?', 'How confident were you?')}</span>
              <span className="text-xs text-slate-400">
                {pick('Isse tay hoga ki ye sawaal dobara aayega ya nahi.', 'This decides whether it comes back.')}
              </span>
            </span>
            <span className="ml-auto flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => rate(false)}
                className="flex flex-col items-center rounded-xl bg-amber-500 px-5 py-2.5 font-semibold text-white hover:bg-amber-600"
              >
                {pick('Aur practice chahiye', 'Needs work')}
                <span className="text-[11px] font-normal opacity-90">
                  {pick('aakhir mein dobara', 'listed at the end')}
                </span>
              </button>
              <button
                type="button"
                onClick={() => rate(true)}
                className="flex flex-col items-center rounded-xl bg-green-600 px-5 py-2.5 font-semibold text-white hover:bg-green-700"
              >
                {pick('Aa gaya', 'Got it')}
                <span className="text-[11px] font-normal opacity-90">{pick('agle sawaal pe', 'next question')}</span>
              </button>
            </span>
          </div>
        </div>
      ) : (
        /* ── Answering ── */
        <div className={`${STAGE} flex flex-col gap-5 pt-10`}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-600">
              {q.difficulty}
            </span>
            <span className="ml-auto flex items-center gap-2 font-mono text-xs text-slate-400">
              <Icon name="clock" className="h-3.5 w-3.5" />
              {mmss(seconds)}
            </span>
          </div>

          <h1 className="text-2xl font-bold leading-snug tracking-tight sm:text-[27px]">{q.question}</h1>

          <p className="leading-relaxed text-slate-500">
            {pick(
              'Pehle zor se bolke jawab do — jaise interview mein dete. Phir record ya type karke model answer se milao.',
              'Answer out loud first, the way you would in the room. Then record or type it and compare.'
            )}
          </p>

          {/* Recording is the primary path */}
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-7">
            <button
              type="button"
              onClick={recording ? stopRecording : startRecording}
              aria-label={recording ? 'Stop recording' : 'Start recording'}
              className={`relative grid h-20 w-20 place-items-center rounded-full text-white transition focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 ${
                recording ? 'bg-red-500 focus-visible:ring-red-400' : 'bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-400'
              }`}
            >
              {recording && <span className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-60" />}
              {recording ? (
                <span className="relative h-6 w-6 rounded-md bg-white" />
              ) : (
                <Icon name="microphone" className="relative h-8 w-8" />
              )}
            </button>

            <p className="text-sm font-medium">
              {recording
                ? pick('Recording… rokne ke liye tap karo', 'Recording… tap to stop')
                : audioURL
                  ? pick('Dobara record karo', 'Re-record')
                  : pick('Record karne ke liye tap karo', 'Tap to record')}
            </p>

            {audioURL && <audio src={audioURL} controls className="w-full" />}
          </div>

          {/* Typing is the secondary path, collapsed */}
          {typing ? (
            <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {pick('Type karke jawab', 'Typed answer')}
              </span>
              <textarea
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                placeholder={pick('Yahan apna answer likho…', 'Type your answer here…')}
                rows={5}
                autoFocus
                className="resize-none rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm outline-none focus:border-indigo-400 dark:bg-slate-800"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setTyping(true)}
              className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 px-4 py-3.5 text-left transition hover:border-indigo-300"
            >
              <Icon name="file" className="h-4 w-4 shrink-0 text-slate-400" />
              <span className="flex-1 text-sm text-slate-500">
                {pick('Bolne ke bajaye likhna hai? Type karke jawab do', 'Rather write it? Type your answer instead')}
              </span>
              <Icon name="chevron-down" className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            </button>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={advance}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              {pick('Skip karo', 'Skip')}
            </button>
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="ml-auto flex items-center gap-2.5 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white hover:bg-indigo-700"
            >
              {hasAnswer
                ? pick('Model answer se milao', 'Compare with the model answer')
                : pick('Model answer dikhao', 'Show the model answer')}
              <Icon name="arrow-right" className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
