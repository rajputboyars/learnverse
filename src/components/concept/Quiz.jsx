'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Quiz({ conceptId, quiz, onPassed }) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Close on Escape while the modal is open.
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (!quiz || quiz.length === 0) return null;

  function choose(qi, oi) {
    if (result) return;
    setAnswers((a) => ({ ...a, [qi]: oi }));
  }

  async function submit() {
    const answerArr = quiz.map((_, i) => (i in answers ? answers[i] : -1));

    if (!session?.user) {
      // Guests can attempt; grade locally and prompt to log in for XP.
      let correct = 0;
      const results = quiz.map((q, i) => {
        const ok = answerArr[i] === q.correctIndex;
        if (ok) correct++;
        return { correctIndex: q.correctIndex, correct: ok, explanation: q.explanation };
      });
      setResult({ correct, total: quiz.length, results, guest: true });
      return;
    }

    setSubmitting(true);
    const res = await fetch('/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conceptId, answers: answerArr }),
    });
    const data = await res.json();
    setSubmitting(false);
    setResult(data);
    if (data.passed && data.reward?.gained && onPassed) onPassed(data.reward);
  }

  const allAnswered = quiz.every((_, i) => i in answers);

  function closeModal() {
    setOpen(false);
  }

  if (!open) {
    return (
      <section
        className="flex flex-col items-start gap-4 rounded-3xl p-6 text-white sm:flex-row sm:items-center sm:justify-between"
        style={{ background: 'linear-gradient(120deg,var(--color-violet),#a855f7)' }}
      >
        <div>
          <h3 className="text-lg font-bold sm:text-[19px]">Ready to test yourself?</h3>
          <p className="mt-1 text-[13.5px] text-white/85">
            {quiz.length} question{quiz.length > 1 ? 's' : ''}
            {result ? ` — you scored ${result.correct}/${result.total}` : ' · earn up to 40 XP'}
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="lv-btn shrink-0 bg-white text-violet-ink"
        >
          {result ? 'Retake quiz' : 'Take the quiz'} →
        </button>
      </section>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4"
      onClick={closeModal}
      role="presentation"
    >
      <section
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Quick quiz"
        className="lv-card max-h-[85vh] w-full max-w-2xl overflow-y-auto p-5 shadow-2xl sm:p-6"
      >
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧠</span>
          <h3 className="text-lg font-bold text-ink">Did you understand? Quick quiz</h3>
        </div>
        <button
          onClick={closeModal}
          aria-label="Close quiz"
          className="rounded-lg p-1.5 text-muted hover:bg-line-soft hover:text-ink"
        >
          ✕
        </button>
      </div>

      <div className="space-y-5">
        {quiz.map((q, qi) => {
          const res = result?.results?.[qi];
          return (
            <div key={qi}>
              <p className="mb-2 font-medium text-ink">{qi + 1}. {q.question}</p>
              <div className="grid gap-2">
                {q.options.map((opt, oi) => {
                  const selected = answers[qi] === oi;
                  let cls = 'border-line bg-card text-ink-soft hover:border-brand/40';
                  if (result) {
                    if (oi === res.correctIndex) cls = 'border-accent-green bg-accent-green-tint text-ink';
                    else if (selected) cls = 'border-red-400 bg-red-50 text-ink';
                    else cls = 'border-line bg-card text-ink-soft opacity-70';
                  } else if (selected) {
                    cls = 'border-brand bg-brand-tint text-ink';
                  }
                  return (
                    <button
                      key={oi}
                      onClick={() => choose(qi, oi)}
                      disabled={!!result}
                      className={`rounded-lg border px-4 py-2.5 text-left text-sm transition ${cls}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {res?.explanation && (
                <p className="mt-2 text-sm text-muted">💡 {res.explanation}</p>
              )}
            </div>
          );
        })}
      </div>

      {!result ? (
        <button
          onClick={submit}
          disabled={!allAnswered || submitting}
          className="lv-btn lv-btn-primary mt-5 disabled:opacity-50"
        >
          {submitting ? 'Checking...' : 'Submit answers'}
        </button>
      ) : (
        <div className="mt-5 rounded-xl bg-brand-tint p-4">
          <p className="font-semibold text-ink">
            You got {result.correct}/{result.total} correct{' '}
            {result.passed || (result.guest && result.correct / result.total >= 0.6)
              ? '🎉'
              : '— try again!'}
          </p>
          {result.guest ? (
            <p className="mt-2 text-sm text-ink-soft">
              <Link href="/login" className="font-semibold text-brand underline">
                Login
              </Link>{' '}
              and claim <b>+15 XP</b> + start your streak.
            </p>
          ) : result.reward?.gained ? (
            <p className="mt-2 text-sm text-accent-green-ink">
              +{result.reward.gained} XP earned! Total: {result.reward.totalXP} XP
            </p>
          ) : result.passed ? (
            <p className="mt-2 text-sm text-ink-soft">Already completed earlier ✅</p>
          ) : (
            <button
              onClick={() => { setResult(null); setAnswers({}); }}
              className="mt-2 text-sm font-semibold text-brand underline"
            >
              Retry quiz
            </button>
          )}
          <button
            onClick={closeModal}
            className="mt-3 block text-sm font-semibold text-muted hover:text-ink"
          >
            Close
          </button>
        </div>
      )}
      </section>
    </div>
  );
}
