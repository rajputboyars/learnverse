'use client';

import Icon from '../Icon';
import FieldMock from './FieldMock';
import { useLang } from '../LanguageProvider';
import { useTx } from './useTx';
import { highlightLine } from '@/lib/highlight';

/**
 * The signature view of the Jahia course: a CND line on the left, the Content
 * Editor field it produces on the right. Rows stack on phones, code first.
 *
 *   rows = [{ code: '- title (string)', field: { kind: 'text', label: 'Title', value: '…' }, note }]
 */
export default function CmsVsCode({ rows, title, filename = 'definitions.cnd' }) {
  const { pick } = useLang();
  const tx = useTx();
  if (!rows?.length) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {title && <p className="border-b border-slate-100 px-4 py-3 text-sm font-bold">{tx(title)}</p>}
      <div className="hidden grid-cols-2 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider md:grid">
        <span className="flex items-center gap-2 bg-slate-900 px-4 py-2 text-slate-400">
          <Icon name="code" className="h-3 w-3" /> CND · <span className="font-mono normal-case">{filename}</span>
        </span>
        <span className="flex items-center gap-2 px-4 py-2 text-slate-500">
          <Icon name="layers" className="h-3 w-3 text-indigo-600" /> Jahia CMS · Content Editor
        </span>
      </div>

      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-[minmax(0,1fr)] border-b border-slate-100 last:border-b-0 md:grid-cols-2">
          <div className="flex flex-col justify-center bg-slate-900 px-4 py-3">
            <span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 md:hidden">
              CND
            </span>
            <pre className="overflow-x-auto font-mono text-[13px] leading-relaxed text-slate-100">
              {r.code.split('\n').map((line, j) => (
                <span key={j} className="block whitespace-pre">
                  {highlightLine(line, 'cnd')}
                </span>
              ))}
            </pre>
          </div>
          <div className="flex flex-col gap-2 px-4 py-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 md:hidden">
              {pick('Author ko dikhta hai', 'Author sees')}
            </span>
            <FieldMock field={r.field} />
            {r.note && <p className="text-xs text-slate-500">{tx(r.note)}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
