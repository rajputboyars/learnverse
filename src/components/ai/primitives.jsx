'use client';

import Icon from '@/components/Icon';

// Small pieces shared by every result view, so a table, a rank arrow or a score
// bar looks identical whichever prompt produced it.

export function Section({ title, icon, children, className = '' }) {
  if (!children) return null;
  return (
    <section className={className}>
      {title && (
        <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
          {icon && <Icon name={icon} className="h-3.5 w-3.5" />}
          {title}
        </h3>
      )}
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 ${className}`}>{children}</div>
  );
}

/** Horizontal scroll lives on the table wrapper so the page never scrolls sideways. */
export function TableWrap({ children }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full min-w-[36rem] text-sm">{children}</table>
    </div>
  );
}

export function RankChange({ current, previous }) {
  if (typeof current !== 'number' || typeof previous !== 'number') {
    return <span className="text-slate-400">—</span>;
  }
  const delta = previous - current; // positive = moved up the list
  if (delta === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-slate-500">
        <Icon name="minus" className="h-3 w-3" />
        no change
      </span>
    );
  }
  const up = delta > 0;
  return (
    <span className={`inline-flex items-center gap-1 font-medium ${up ? 'text-green-600' : 'text-red-600'}`}>
      <Icon name={up ? 'trend-up' : 'trend-down'} className="h-3 w-3" />
      {up ? '+' : ''}
      {delta}
    </span>
  );
}

const TREND_STYLES = {
  growing: 'border-green-300 bg-green-50 text-green-800',
  stable: 'border-slate-300 bg-slate-50 text-slate-700',
  declining: 'border-red-300 bg-red-50 text-red-700',
};

export function Pill({ children, tone = 'slate', className = '' }) {
  const tones = {
    slate: 'border-slate-300 bg-slate-50 text-slate-700',
    indigo: 'border-indigo-300 bg-indigo-50 text-indigo-700',
    green: 'border-green-300 bg-green-50 text-green-800',
    amber: 'border-amber-300 bg-amber-50 text-amber-800',
    red: 'border-red-300 bg-red-50 text-red-700',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${tones[tone] || tones.slate} ${className}`}>
      {children}
    </span>
  );
}

export function TrendPill({ trend }) {
  if (!trend) return null;
  const key = String(trend).toLowerCase();
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${TREND_STYLES[key] || TREND_STYLES.stable}`}>
      {key === 'growing' && <Icon name="trend-up" className="h-3 w-3" />}
      {key === 'declining' && <Icon name="trend-down" className="h-3 w-3" />}
      {trend}
    </span>
  );
}

export function ScoreBar({ value, max = 5 }) {
  const pct = Math.max(0, Math.min(100, (Number(value) / max) * 100));
  return (
    <span className="flex items-center gap-2">
      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
        <span className="block h-full rounded-full bg-indigo-500" style={{ width: `${pct}%` }} />
      </span>
      <span className="tabular-nums text-xs text-slate-500">{value}</span>
    </span>
  );
}

export function Confidence({ level }) {
  if (!level) return null;
  const tone = { high: 'green', medium: 'amber', low: 'red' }[String(level).toLowerCase()] || 'slate';
  return <Pill tone={tone}>Model confidence: {level}</Pill>;
}

export function BulletList({ items, icon = 'circle-dot', className = '' }) {
  if (!items?.length) return null;
  return (
    <ul className={`space-y-2 text-sm text-slate-700 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <Icon name={icon} className="mt-1.5 h-2 w-2 shrink-0 text-indigo-400" />
          <span>{typeof item === 'string' ? item : JSON.stringify(item)}</span>
        </li>
      ))}
    </ul>
  );
}
