'use client';

import { useState } from 'react';

export default function CodeBlock({ code, language = 'javascript' }) {
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

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2">
        <span className="text-xs font-medium text-slate-400">{language}</span>
        <button
          onClick={copy}
          className="text-xs text-slate-400 hover:text-white"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-slate-100">{code}</code>
      </pre>
    </div>
  );
}
