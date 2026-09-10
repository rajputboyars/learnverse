'use client';

import Icon from '../Icon';

// Numbered callout used by screenshots and mockups. Inline colour, because the
// dark-mode remap layer would otherwise turn slate-900 text light on amber.
export function Marker({ n, className = '' }) {
  if (n == null) return null;
  return (
    <span
      className={`inline-grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber-400 text-[11px] font-bold shadow-sm ${className}`}
      style={{ color: '#0f172a' }}
      aria-label={`Marker ${n}`}
    >
      {n}
    </span>
  );
}

const BOX = 'rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700';

function Control({ field }) {
  const v = field.value;
  switch (field.kind) {
    case 'number':
    case 'decimal':
      return (
        <div className={`${BOX} flex items-center justify-between font-mono`}>
          <span>{v || ' '}</span>
          <span className="flex flex-col text-[8px] leading-none text-slate-400">▲<br />▼</span>
        </div>
      );
    case 'textarea':
      return <div className={`${BOX} min-h-[64px] whitespace-pre-wrap`}>{v}</div>;
    case 'richtext':
      return (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="flex flex-wrap gap-2 border-b border-slate-100 bg-slate-50 px-2 py-1.5 text-xs text-slate-500">
            <b>B</b><i>I</i><u>U</u><span>• List</span><span>1. List</span><span>🔗 Link</span><span>🖼 Image</span>
          </div>
          <div className="min-h-[56px] px-3 py-2 text-sm text-slate-700" dangerouslySetInnerHTML={{ __html: String(v || '') }} />
        </div>
      );
    case 'checkbox':
      return (
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <span className={`grid h-5 w-5 place-items-center rounded border ${v ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 bg-white'}`}>
            {v && <Icon name="check" className="h-3 w-3" />}
          </span>
          {field.label}
        </div>
      );
    case 'date':
    case 'datetime':
      return (
        <div className={`${BOX} flex items-center justify-between`}>
          <span>{v}</span>
          <Icon name="calendar" className="h-3.5 w-3.5 text-slate-400" />
        </div>
      );
    case 'select':
      return (
        <div className={`${BOX} flex items-center justify-between`}>
          <span>{v}</span>
          <Icon name="chevron-down" className="h-3 w-3 text-slate-400" />
        </div>
      );
    case 'multitext':
    case 'tags':
    case 'category':
      return (
        <div className={`${BOX} flex flex-wrap items-center gap-1.5`}>
          {(Array.isArray(v) ? v : [v]).map((x) => (
            <span key={x} className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
              {field.kind === 'category' ? '📁 ' : ''}{x} ×
            </span>
          ))}
          <span className="text-xs text-slate-400">{field.kind === 'category' ? '+ Select category' : '+ Add'}</span>
        </div>
      );
    case 'picker-image':
    case 'picker-file':
    case 'picker-content':
    case 'picker-page': {
      const icon = { 'picker-image': 'eye', 'picker-file': 'file', 'picker-content': 'layers', 'picker-page': 'file' }[field.kind];
      return (
        <div className="flex items-center gap-2.5 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-white text-slate-400">
            <Icon name={icon} className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1 truncate text-sm text-slate-600">{v}</span>
          <span className="shrink-0 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-indigo-600">
            {field.kind === 'picker-image' ? 'Browse images' : 'Browse'}
          </span>
        </div>
      );
    }
    case 'color':
      return (
        <div className={`${BOX} flex items-center gap-2 font-mono`}>
          <span className="h-4 w-4 rounded border border-slate-200" style={{ background: v }} />
          {v}
        </div>
      );
    case 'hidden':
      return <p className="text-xs italic text-slate-400">Not shown to the author</p>;
    case 'readonly':
      return <div className={`${BOX} bg-slate-50 text-slate-400`}>{v} 🔒</div>;
    case 'type':
      return (
        <div className={`${BOX} flex items-center gap-2`}>
          <Icon name="plus" className="h-3 w-3 text-indigo-600" />
          <span>{v}</span>
        </div>
      );
    case 'section':
      return (
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
          <p className="font-semibold text-slate-700">▾ {field.label}</p>
          <p className="text-xs text-slate-500">{v}</p>
        </div>
      );
    case 'toggle-section':
      return (
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
          <span className="font-semibold text-slate-700">{field.label}</span>
          <span className={`flex h-5 w-9 items-center rounded-full px-0.5 ${v ? 'justify-end bg-indigo-600' : 'bg-slate-100 ring-1 ring-slate-200'}`}>
            <span className="h-4 w-4 rounded-full bg-white shadow" />
          </span>
        </div>
      );
    case 'children':
      return (
        <div className="flex flex-col gap-1.5">
          {(v || []).map((x) => (
            <div key={x} className={`${BOX} py-1.5`}>{x}</div>
          ))}
          <span className="text-xs font-semibold text-indigo-600">+ Add item</span>
        </div>
      );
    default:
      return <div className={BOX}>{v || ' '}</div>;
  }
}

/**
 * A drawn Content Editor field — what the author sees for a given CND line.
 * Not a real input: it is a picture of one, so it is not focusable.
 */
export default function FieldMock({ field, marker }) {
  if (!field) return null;
  const showLabel = !['checkbox', 'section', 'toggle-section'].includes(field.kind);
  return (
    <div className="flex flex-col gap-1.5">
      {showLabel && (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
          <Marker n={marker ?? field.marker} />
          <span>{field.label}</span>
          {field.required && <span className="text-red-600">*</span>}
          {field.i18n && (
            <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-700" title="Translatable — one value per language">
              <Icon name="globe" className="mr-1 h-2.5 w-2.5" />EN
            </span>
          )}
        </div>
      )}
      {!showLabel && (marker ?? field.marker) != null && <Marker n={marker ?? field.marker} />}
      <Control field={field} />
      {field.error && <p className="text-xs text-red-600">{field.error}</p>}
    </div>
  );
}
