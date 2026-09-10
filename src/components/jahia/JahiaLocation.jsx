'use client';

import Icon from '../Icon';
import { useLang } from '../LanguageProvider';
import { useTx } from './useTx';

const APP_ICON = {
  'Jahia CMS': 'layers',
  jContent: 'layers',
  'Page Composer': 'layers',
  'Module source': 'code',
  'Jahia Studio': 'code',
  Terminal: 'desktop',
  Administration: 'sliders',
  'Jahia Tools': 'wrench',
  Browser: 'globe',
};

/**
 * "📍 Where is this?" — the exact route to a thing, in the CMS or in the
 * module source. Every concept in the course points at a real place.
 *
 *   where = [{ app: 'jContent', path: ['Media', 'Images', 'Upload'], note }]
 */
export default function JahiaLocation({ where }) {
  const { pick } = useLang();
  const tx = useTx();
  if (!where?.length) return null;
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-2.5 md:grid-cols-2">
      {where.map((w, i) => (
        <div key={i} className="flex flex-col gap-2 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-indigo-700">
            <Icon name="location-dot" className="h-3.5 w-3.5" />
            {pick('Kahan milega?', 'Where is this?')}
          </p>
          <p className="flex flex-wrap items-center gap-1.5 text-sm">
            <span className="flex items-center gap-1.5 rounded-md bg-white px-2 py-1 font-semibold text-slate-800">
              <Icon name={APP_ICON[w.app] || 'layers'} className="h-3 w-3 text-indigo-600" />
              {w.app}
            </span>
            {w.path.map((p, j) => (
              <span key={j} className="flex items-center gap-1.5">
                <Icon name="arrow-right" className="h-2.5 w-2.5 text-slate-400" />
                <span className={`rounded-md px-2 py-1 ${j === w.path.length - 1 ? 'bg-indigo-600 font-semibold text-white' : 'bg-white font-mono text-[13px] text-slate-700'}`}>
                  {p}
                </span>
              </span>
            ))}
          </p>
          {w.note && <p className="text-xs text-slate-500">{tx(w.note)}</p>}
        </div>
      ))}
    </div>
  );
}
