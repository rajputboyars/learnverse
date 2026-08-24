'use client';

import { useRef, useState } from 'react';

// Runs user JS in a Web Worker (separate thread) so an infinite loop can be
// killed via worker.terminate() without freezing the page. HTML/CSS render in
// a sandboxed iframe.
const WORKER_SRC = `
self.onmessage = function (e) {
  function fmt(v) {
    if (typeof v === 'string') return v;
    if (typeof v === 'function') return '[Function]';
    try { return JSON.stringify(v); } catch (_) { return String(v); }
  }
  function send(kind, args) {
    self.postMessage({ kind: kind, text: Array.prototype.map.call(args, fmt).join(' ') });
  }
  console.log = function () { send('log', arguments); };
  console.info = function () { send('log', arguments); };
  console.warn = function () { send('warn', arguments); };
  console.error = function () { send('error', arguments); };
  try {
    (0, eval)(e.data);
  } catch (err) {
    self.postMessage({ kind: 'error', text: String(err && err.stack ? err.stack : err) });
  }
  self.postMessage({ kind: 'done' });
};
`;

export default function CodePlayground({ code: initialCode, language = 'javascript' }) {
  const mode = language === 'html' ? 'html' : 'js'; // only js + html are runnable
  const [code, setCode] = useState(initialCode || '');
  const [output, setOutput] = useState([]);
  const [running, setRunning] = useState(false);
  const [ran, setRan] = useState(false);
  const iframeRef = useRef(null);

  function reset() {
    setCode(initialCode || '');
    setOutput([]);
    setRan(false);
    if (iframeRef.current) iframeRef.current.srcdoc = '';
  }

  function runJs() {
    setOutput([]);
    setRunning(true);
    setRan(true);
    let worker;
    try {
      const url = URL.createObjectURL(new Blob([WORKER_SRC], { type: 'application/javascript' }));
      worker = new Worker(url);
      const logs = [];
      const timer = setTimeout(() => {
        worker.terminate();
        URL.revokeObjectURL(url);
        setOutput([...logs, { kind: 'error', text: '⏱ Timed out (2s) — possible infinite loop.' }]);
        setRunning(false);
      }, 2000);
      worker.onmessage = (e) => {
        const d = e.data;
        if (d.kind === 'done') {
          clearTimeout(timer);
          worker.terminate();
          URL.revokeObjectURL(url);
          setOutput(logs.length ? [...logs] : [{ kind: 'muted', text: '(no console output)' }]);
          setRunning(false);
          return;
        }
        logs.push(d);
        setOutput([...logs]);
      };
      worker.onerror = (err) => {
        clearTimeout(timer);
        worker.terminate();
        URL.revokeObjectURL(url);
        setOutput([...logs, { kind: 'error', text: err.message }]);
        setRunning(false);
      };
      worker.postMessage(code);
    } catch {
      setOutput([{ kind: 'error', text: 'Could not start the runner in this browser.' }]);
      setRunning(false);
    }
  }

  function runHtml() {
    setRan(true);
    if (iframeRef.current) iframeRef.current.srcdoc = code;
  }

  const run = mode === 'html' ? runHtml : runJs;

  return (
    <div className="overflow-hidden rounded-[20px]" style={{ background: 'var(--color-ink)' }}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]" />
        <span className="ml-2 font-mono text-xs text-slate-400">
          playground.{mode === 'html' ? 'html' : 'js'}
        </span>
        <div className="ml-auto flex gap-2">
          <button
            onClick={reset}
            className="rounded-md px-2.5 py-1 text-xs font-medium text-slate-400 hover:bg-white/10"
          >
            Reset
          </button>
          <button
            onClick={run}
            disabled={running}
            className="rounded-md px-4 py-1.5 text-xs font-bold text-white disabled:opacity-50"
            style={{ background: 'var(--color-accent-green)' }}
          >
            {running ? 'Running…' : `▶ ${mode === 'html' ? 'Preview' : 'Run'}`}
          </button>
        </div>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        rows={Math.min(16, Math.max(6, code.split('\n').length + 1))}
        className="w-full resize-y bg-transparent p-5 font-mono text-[13.5px] leading-[1.8] text-slate-100 outline-none"
      />

      {ran && (
        <div className="border-t border-white/10">
          {mode === 'html' ? (
            <iframe
              ref={iframeRef}
              title="HTML preview"
              sandbox="allow-scripts"
              className="h-64 w-full bg-white"
            />
          ) : (
            <div className="max-h-64 overflow-auto p-4 font-mono text-sm">
              {output.length === 0 && running && <span className="text-slate-500">Running…</span>}
              {output.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.kind === 'error'
                      ? 'whitespace-pre-wrap text-red-400'
                      : line.kind === 'warn'
                      ? 'whitespace-pre-wrap text-amber-400'
                      : line.kind === 'muted'
                      ? 'whitespace-pre-wrap text-slate-500'
                      : 'whitespace-pre-wrap text-[#86efac]'
                  }
                >
                  {line.text}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
