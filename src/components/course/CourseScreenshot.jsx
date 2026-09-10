'use client';

import { useEffect, useState } from 'react';
import Icon from '../Icon';
import FieldMock, { Marker } from './FieldMock';
import { AVAILABLE_SCREENSHOTS } from '@/data/jahia/screenshots';
import { useTx } from './useTx';

function label(item) {
  return typeof item === 'string' ? item : item.label;
}

/**
 * A drawn wireframe of a Jahia screen: app bar, left navigation, breadcrumb,
 * toolbar and one of several panels (list, grid, form, tree, page areas).
 * Used whenever a real capture has not been added yet.
 */
function MockScreen({ mock }) {
  const tx = useTx();
  const nav = mock.nav || [];
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white text-[12.5px]">
      <div className="flex items-center gap-2 bg-slate-800 px-3 py-2 text-slate-200">
        <span className="grid h-5 w-5 place-items-center rounded bg-indigo-500 text-[10px] font-bold text-white">J</span>
        <span className="font-semibold">Jahia</span>
        <span className="text-slate-400">·</span>
        <span className="truncate">{mock.app}</span>
        <span className="ml-auto flex items-center gap-2 text-slate-400">
          {mock.appMarker != null && <Marker n={mock.appMarker} />}
          <span className="hidden sm:inline">{mock.site || 'learnverse'}</span>
          <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px]">{mock.lang || 'EN'}</span>
        </span>
      </div>

      <div className="flex flex-col sm:flex-row">
        {nav.length > 0 && (
          <div className="flex gap-1 overflow-x-auto border-b border-slate-100 bg-slate-50 p-2 sm:w-44 sm:shrink-0 sm:flex-col sm:border-b-0 sm:border-r">
            {nav.map((item) => {
              const on = label(item) === mock.active;
              return (
                <span
                  key={label(item)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 ${
                    on ? 'bg-indigo-50 font-semibold text-indigo-700' : 'text-slate-600'
                  }`}
                >
                  {typeof item === 'object' && <Marker n={item.marker} />}
                  {label(item)}
                </span>
              );
            })}
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-3 p-3">
          {mock.breadcrumb && (
            <p className="flex flex-wrap items-center gap-1 text-[11px] text-slate-400">
              {mock.breadcrumb.map((b, i) => (
                <span key={b + i} className="flex items-center gap-1">
                  {i > 0 && <span>/</span>}
                  <span className={i === mock.breadcrumb.length - 1 ? 'font-semibold text-slate-600' : ''}>{b}</span>
                </span>
              ))}
            </p>
          )}

          {mock.toolbar && (
            <div className="flex flex-wrap items-center gap-2">
              {mock.toolbar.map((b) => (
                <span
                  key={label(b)}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ${
                    b.primary ? 'bg-indigo-600 text-white' : 'border border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  {typeof b === 'object' && <Marker n={b.marker} />}
                  {label(b)}
                </span>
              ))}
            </div>
          )}

          {mock.panel === 'form' && (
            <div className="flex flex-col gap-3 rounded-lg border border-slate-100 p-3">
              {mock.formTitle && <p className="text-sm font-bold text-slate-700">{mock.formTitle}</p>}
              {(mock.fields || []).map((f) => (
                <FieldMock key={f.label} field={f} />
              ))}
            </div>
          )}

          {mock.panel === 'list' && (
            <div className="overflow-hidden rounded-lg border border-slate-100">
              {(mock.items || []).map((it) => (
                <div
                  key={label(it)}
                  className={`flex items-center gap-2 border-b border-slate-100 px-3 py-2 last:border-b-0 ${
                    it.active ? 'bg-indigo-50' : ''
                  }`}
                >
                  <Marker n={it.marker} />
                  <span className="min-w-0 flex-1 truncate text-slate-700">{label(it)}</span>
                  {it.meta && <span className="shrink-0 text-[11px] text-slate-400">{it.meta}</span>}
                  {it.status && (
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        it.status === 'Published'
                          ? 'bg-green-50 text-green-700'
                          : it.status === 'Modified'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {it.status}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {mock.panel === 'grid' && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(mock.items || []).map((it) => (
                <div key={label(it)} className="relative flex flex-col gap-1 rounded-lg border border-slate-100 p-1.5">
                  <span className="grid aspect-video place-items-center rounded bg-slate-100 text-lg text-slate-400">
                    {it.icon || '🖼'}
                  </span>
                  <span className="truncate text-[11px] text-slate-600">{label(it)}</span>
                  {it.marker != null && <Marker n={it.marker} className="absolute right-1 top-1" />}
                </div>
              ))}
            </div>
          )}

          {mock.panel === 'tree' && (
            <pre className="overflow-x-auto rounded-lg border border-slate-100 bg-slate-50 p-3 font-mono text-[12px] leading-relaxed text-slate-700">
              {(mock.tree || []).join('\n')}
            </pre>
          )}

          {mock.panel === 'page' && (
            <div className="flex flex-col gap-2 rounded-lg border border-slate-100 p-2">
              {(mock.areas || []).map((a) => (
                <div key={a.label} className="rounded-md border border-dashed border-indigo-200 p-2">
                  <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-600">
                    <Marker n={a.marker} /> {a.label}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {(a.items || []).map((x) => (
                      <div key={label(x)} className="flex items-center gap-1.5 rounded bg-slate-50 px-2 py-1.5 text-slate-700">
                        {typeof x === 'object' && <Marker n={x.marker} />}
                        {label(x)}
                      </div>
                    ))}
                    <span className="text-[11px] font-semibold text-indigo-600">+ Add content</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {mock.note && <p className="text-[11px] text-slate-500">{tx(mock.note)}</p>}
        </div>
      </div>
    </div>
  );
}

function Body({ shot, real }) {
  if (real) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-slate-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={shot.src} alt={shot.title} className="block h-auto w-full" />
        {(shot.markers || [])
          .filter((m) => m.x != null && m.y != null)
          .map((m) => (
            <Marker key={m.number} n={m.number} className="absolute -translate-x-1/2 -translate-y-1/2" />
          ))}
      </div>
    );
  }
  return <MockScreen mock={shot.mock || {}} />;
}

/**
 * A Jahia screen, with numbered markers and a legend explaining them.
 *
 * Shows the real capture when it exists (listed in data/jahia/screenshots),
 * otherwise a drawn mockup clearly labelled as an illustration.
 */
export default function CourseScreenshot({ shot }) {
  const tx = useTx();
  const [full, setFull] = useState(false);
  const real = Boolean(shot.src && AVAILABLE_SCREENSHOTS.has(shot.src));

  useEffect(() => {
    if (!full) return;
    const onKey = (e) => e.key === 'Escape' && setFull(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [full]);

  const legend = shot.markers || [];

  return (
    <figure className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-start gap-2">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="font-bold">{tx(shot.title)}</p>
          {shot.description && <p className="text-sm text-slate-500">{tx(shot.description)}</p>}
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            real ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-600'
          }`}
          title={real ? 'Captured from Jahia' : 'Drawn illustration of the Jahia screen — labels may differ slightly by version'}
        >
          {real ? 'Screenshot' : 'Illustration'}
        </span>
      </div>

      <Body shot={shot} real={real} />

      {legend.length > 0 && (
        <ol className="grid grid-cols-[minmax(0,1fr)] gap-1.5 sm:grid-cols-2">
          {legend.map((m) => (
            <li key={m.number} className="flex items-start gap-2 text-sm text-slate-600">
              <Marker n={m.number} className="mt-0.5" />
              <span>{tx(m.label)}</span>
            </li>
          ))}
        </ol>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {shot.caption && <figcaption className="flex-1 text-xs text-slate-400">{tx(shot.caption)}</figcaption>}
        <button
          type="button"
          onClick={() => setFull(true)}
          className="ml-auto flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-indigo-300"
        >
          <Icon name="external-link" className="h-3 w-3" />
          Open full image
        </button>
      </div>

      {full && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={tx(shot.title)}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/80 p-3 sm:p-8"
          onClick={() => setFull(false)}
        >
          <div className="w-full max-w-5xl rounded-2xl bg-white p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center gap-3">
              <p className="flex-1 font-bold">{tx(shot.title)}</p>
              <button
                type="button"
                onClick={() => setFull(false)}
                className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200"
                aria-label="Close"
              >
                <Icon name="x" className="h-3.5 w-3.5" />
              </button>
            </div>
            <Body shot={shot} real={real} />
            {legend.length > 0 && (
              <ol className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-1.5 sm:grid-cols-2">
                {legend.map((m) => (
                  <li key={m.number} className="flex items-start gap-2 text-sm text-slate-600">
                    <Marker n={m.number} className="mt-0.5" />
                    <span>{tx(m.label)}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      )}
    </figure>
  );
}
