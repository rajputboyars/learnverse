'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const HARNESS = `
function assertEqual(a, b) {
  var sa = JSON.stringify(a), sb = JSON.stringify(b);
  if (sa !== sb) throw new Error('Expected ' + sb + ' but got ' + sa);
}
self.onmessage = function (e) {
  var logs = [];
  console.log = function () { logs.push(Array.prototype.slice.call(arguments).join(' ')); };
  try {
    (0, eval)(e.data);
    self.postMessage({ pass: true, logs: logs });
  } catch (err) {
    self.postMessage({ pass: false, error: String(err && err.message ? err.message : err), logs: logs });
  }
};
`;

export default function ChallengeRunner({ challenge, initiallyCompleted = false }) {
  const { data: session } = useSession();
  const [code, setCode] = useState(challenge.starter || '');
  const [status, setStatus] = useState('idle'); // idle | running | passed | failed
  const [message, setMessage] = useState('');
  const [completed, setCompleted] = useState(initiallyCompleted);
  const [gainedXp, setGainedXp] = useState(0);

  function run() {
    setStatus('running');
    setMessage('');
    let worker;
    try {
      const url = URL.createObjectURL(new Blob([HARNESS], { type: 'application/javascript' }));
      worker = new Worker(url);
      const timer = setTimeout(() => {
        worker.terminate();
        URL.revokeObjectURL(url);
        setStatus('failed');
        setMessage('⏱ Timed out (possible infinite loop).');
      }, 2000);
      worker.onmessage = async (e) => {
        clearTimeout(timer);
        worker.terminate();
        URL.revokeObjectURL(url);
        if (e.data.pass) {
          setStatus('passed');
          setMessage('✅ All tests passed!');
          if (session?.user && !completed) {
            const res = await fetch('/api/challenges/complete', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ slug: challenge.slug }),
            });
            if (res.ok) {
              const d = await res.json();
              setCompleted(true);
              if (d.gained) setGainedXp(d.gained);
            }
          }
        } else {
          setStatus('failed');
          setMessage('❌ ' + (e.data.error || 'A test failed.'));
        }
      };
      worker.onerror = (err) => {
        clearTimeout(timer);
        worker.terminate();
        URL.revokeObjectURL(url);
        setStatus('failed');
        setMessage('❌ ' + err.message);
      };
      // assert helpers + user code + tests
      worker.postMessage(`${code}\n${challenge.tests}`);
    } catch {
      setStatus('failed');
      setMessage('Could not start the runner in this browser.');
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
        <p className="text-sm text-slate-700">{challenge.prompt}</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2">
          <span className="text-xs font-medium text-slate-500">JavaScript · {challenge.xp} XP</span>
          <div className="flex gap-2">
            <button onClick={() => { setCode(challenge.starter); setStatus('idle'); setMessage(''); }} className="rounded-md px-3 py-1 text-xs font-medium text-slate-500 hover:bg-slate-200">Reset</button>
            <button onClick={run} disabled={status === 'running'} className="rounded-md bg-indigo-600 px-4 py-1 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">
              {status === 'running' ? 'Running…' : 'Run tests'}
            </button>
          </div>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          rows={Math.max(8, code.split('\n').length + 2)}
          className="w-full resize-y bg-slate-900 p-4 font-mono text-sm leading-relaxed text-slate-100 outline-none"
        />
      </div>

      {message && (
        <div className={`rounded-xl p-4 text-sm font-medium ${status === 'passed' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
          {status === 'passed' && gainedXp > 0 && <span className="ml-2 text-green-700">+{gainedXp} XP 🎉</span>}
          {status === 'passed' && completed && gainedXp === 0 && <span className="ml-2 text-slate-500">(already completed)</span>}
        </div>
      )}

      {completed && (
        <p className="text-sm font-medium text-green-700">✅ Solved {!session?.user && '(login to earn XP)'}</p>
      )}
      {!session?.user && (
        <p className="text-sm text-slate-500"><Link href="/login" className="font-semibold text-indigo-600 underline">Login</Link> to earn XP for solving challenges.</p>
      )}
    </div>
  );
}
