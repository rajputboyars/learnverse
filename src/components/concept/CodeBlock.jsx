'use client';

import { useState } from 'react';
import { highlightLine } from '@/lib/highlight';

/**
 * A code panel.
 *
 *   <CodeBlock code={src} language="javascript" />              plain, as before
 *   <CodeBlock code={src} language="cnd" filename="definitions.cnd"
 *              highlight={[2, 3]} lineNumbers />                 file view
 *
 * The plain form is what every concept page already renders, so it is left
 * exactly as it was. Passing a filename, highlighted lines or line numbers
 * switches to the file view: numbered lines, light syntax colouring, and the
 * lines under discussion lit up.
 */
export default function CodeBlock({ code, language = 'javascript', filename, highlight, lineNumbers }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  if (!code) return null;

  const fileView = Boolean(filename || highlight?.length || lineNumbers);
  const lit = new Set(highlight || []);

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-4 py-2">
        <span className="flex min-w-0 items-center gap-2 text-xs font-medium text-slate-400">
          {filename ? (
            <>
              <span className="truncate font-mono text-slate-200">{filename}</span>
              <span className="shrink-0 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                {language}
              </span>
            </>
          ) : (
            language
          )}
        </span>
        <button onClick={copy} className="shrink-0 text-xs text-slate-400 hover:text-white">
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {fileView ? (
        <pre className="overflow-x-auto py-3 text-sm leading-relaxed">
          <code className="block min-w-max font-mono text-slate-100">
            {code.split('\n').map((line, i) => {
              const n = i + 1;
              const on = lit.has(n);
              return (
                <span
                  key={n}
                  className={`flex border-l-2 pr-4 ${
                    on ? 'border-amber-400 bg-amber-400/10' : 'border-transparent'
                  }`}
                >
                  <span className="w-10 shrink-0 select-none pr-3 text-right text-slate-600">{n}</span>
                  <span className="whitespace-pre">{highlightLine(line, language)}</span>
                </span>
              );
            })}
          </code>
        </pre>
      ) : (
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
          <code className="font-mono text-slate-100">{code}</code>
        </pre>
      )}
    </div>
  );
}
