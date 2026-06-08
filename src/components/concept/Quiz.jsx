'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Quiz({ conceptId, quiz, onPassed }) {
  const { data: session } = useSession();
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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

  return (
    <section className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl">🧠</span>
        <h3 className="text-lg font-semibold">Did you understand? Quick quiz</h3>
      </div>

      <div className="space-y-5">
        {quiz.map((q, qi) => {
          const res = result?.results?.[qi];
          return (
            <div key={qi}>
              <p className="mb-2 font-medium">{qi + 1}. {q.question}</p>
              <div className="grid gap-2">
                {q.options.map((opt, oi) => {
                  const selected = answers[qi] === oi;
                  let cls = 'border-slate-200 bg-white hover:border-indigo-300';
                  if (result) {
                    if (oi === res.correctIndex) cls = 'border-green-500 bg-green-50';
                    else if (selected) cls = 'border-red-400 bg-red-50';
                    else cls = 'border-slate-200 bg-white opacity-70';
                  } else if (selected) {
                    cls = 'border-indigo-500 bg-indigo-50';
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
                <p className="mt-2 text-sm text-slate-600">💡 {res.explanation}</p>
              )}
            </div>
          );
        })}
      </div>

      {!result ? (
        <button
          onClick={submit}
          disabled={!allAnswered || submitting}
          className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {submitting ? 'Checking...' : 'Submit answers'}
        </button>
      ) : (
        <div className="mt-5 rounded-xl bg-white p-4">
          <p className="font-semibold">
            You got {result.correct}/{result.total} correct{' '}
            {result.passed || (result.guest && result.correct / result.total >= 0.6)
              ? '🎉'
              : '— try again!'}
          </p>
          {result.guest ? (
            <p className="mt-2 text-sm text-slate-600">
              <Link href="/login" className="font-semibold text-indigo-600 underline">
                Login
              </Link>{' '}
              and claim <b>+15 XP</b> + start your streak.
            </p>
          ) : result.reward?.gained ? (
            <p className="mt-2 text-sm text-green-700">
              +{result.reward.gained} XP earned! Total: {result.reward.totalXP} XP
            </p>
          ) : result.passed ? (
            <p className="mt-2 text-sm text-slate-600">Already completed earlier ✅</p>
          ) : (
            <button
              onClick={() => { setResult(null); setAnswers({}); }}
              className="mt-2 text-sm font-semibold text-indigo-600 underline"
            >
              Retry quiz
            </button>
          )}
        </div>
      )}
    </section>
  );
}
