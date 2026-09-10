'use client';

import Icon from '../Icon';
import FieldMock from './FieldMock';
import { useLang } from '../LanguageProvider';
import { useTx } from './useTx';
import { highlightLine } from '@/lib/highlight';

/**
 * What a result looks like, by type:
 *   { type: 'field', field }                 a CMS / form field (FieldMock)
 *   { type: 'html', html, height }           rendered in a sandboxed iframe
 *   { type: 'table', columns, rows }         query result
 *   { type: 'json', value }                  API response
 *   { type: 'terminal', text }               command output
 *   { type: 'text', text }                   plain explanation
 */
export function ResultView({ result }) {
  const tx = useTx();
  if (!result) return null;
  switch (result.type) {
    case 'field':
      return <FieldMock field={result.field} />;
    case 'html':
      return (
        <iframe
          title="Rendered result"
          sandbox=""
          srcDoc={`<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:system-ui,sans-serif;margin:12px;color:#0f172a;background:#fff}</style></head><body>${result.html}</body></html>`}
          className="w-full rounded-lg border border-slate-200 bg-white"
          style={{ height: result.height || 140 }}
        />
      );
    case 'table':
      return (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-left font-mono text-[12.5px]">
            <thead className="bg-slate-50 text-slate-500">
              <tr>{result.columns.map((c) => <th key={c} className="px-3 py-1.5 font-semibold">{c}</th>)}</tr>
            </thead>
            <tbody>
              {result.rows.map((r, i) => (
                <tr key={i} className="border-t border-slate-100">
                  {r.map((v, j) => <td key={j} className="px-3 py-1.5 text-slate-700">{v === null ? 'NULL' : String(v)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          {result.note && <p className="border-t border-slate-100 px-3 py-1.5 text-[11px] text-slate-400">{result.note}</p>}
        </div>
      );
    case 'json':
      return (
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-[12.5px] leading-relaxed text-slate-100">
          {(typeof result.value === 'string' ? result.value : JSON.stringify(result.value, null, 2)).split('\n').map((l, i) => (
            <span key={i} className="block whitespace-pre">{highlightLine(l, 'javascript')}</span>
          ))}
        </pre>
      );
    case 'terminal':
      return <pre className="overflow-x-auto whitespace-pre rounded-lg bg-slate-900 p-3 font-mono text-[12.5px] leading-relaxed text-emerald-300">{result.text}</pre>;
    default:
      return <p className="text-sm text-slate-700">{tx(result.text)}</p>;
  }
}

/**
 * CODE → WHAT YOU SEE, row by row. Code on the left (dark), result on the
 * right; rows stack on phones, code first.
 *
 *   rows = [{ code, language?, result: {…} }]         any course
 *   rows = [{ code, field: {…}, note }]               CMS shorthand (Jahia)
 */
export default function CodeResult({ rows, title, filename, language, codeLabel, resultLabel }) {
  const { pick } = useLang();
  const tx = useTx();
  if (!rows?.length) return null;
  const cms = rows.some((r) => r.field);
  const lang = language || (cms ? 'cnd' : 'javascript');
  const left = codeLabel || (cms ? 'CND' : 'Code');
  const right = resultLabel || (cms ? 'Jahia CMS · Content Editor' : pick('Kya dikhta hai', 'What you see'));
  const file = filename ?? (cms ? 'definitions.cnd' : null);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {title && <p className="border-b border-slate-100 px-4 py-3 text-sm font-bold">{tx(title)}</p>}
      <div className="hidden grid-cols-2 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider md:grid">
        <span className="flex items-center gap-2 bg-slate-900 px-4 py-2 text-slate-400">
          <Icon name="code" className="h-3 w-3" /> {left}
          {file && <> · <span className="font-mono normal-case">{file}</span></>}
        </span>
        <span className="flex items-center gap-2 px-4 py-2 text-slate-500">
          <Icon name={cms ? 'layers' : 'eye'} className="h-3 w-3 text-indigo-600" /> {right}
        </span>
      </div>

      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-[minmax(0,1fr)] border-b border-slate-100 last:border-b-0 md:grid-cols-2">
          <div className="flex min-w-0 flex-col justify-center bg-slate-900 px-4 py-3">
            <span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 md:hidden">{left}</span>
            <pre className="overflow-x-auto font-mono text-[13px] leading-relaxed text-slate-100">
              {r.code.split('\n').map((line, j) => (
                <span key={j} className="block whitespace-pre">{highlightLine(line, r.language || lang)}</span>
              ))}
            </pre>
          </div>
          <div className="flex min-w-0 flex-col gap-2 px-4 py-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 md:hidden">{right}</span>
            <ResultView result={r.result || (r.field ? { type: 'field', field: r.field } : null)} />
            {r.note && <p className="text-xs text-slate-500">{tx(r.note)}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
