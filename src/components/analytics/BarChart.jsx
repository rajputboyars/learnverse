'use client';

import { useLang } from '@/components/LanguageProvider';

/**
 * A single-series bar chart, inline SVG.
 *
 * Deliberately plain: no gradients, no animation, no axis furniture beyond one
 * max label. The point is to read a pattern at a glance, and every extra mark
 * on it makes that harder.
 *
 * An all-zero series still renders its (empty) bars — a flat month is a real
 * answer, and blanking the chart would hide it.
 */
export default function BarChart({ data, valueKey = 'count', format, height = 140, highlight }) {
  const { pick } = useLang();
  if (!data?.length) return null;

  const max = Math.max(...data.map((d) => d[valueKey] || 0));
  const fmt = format || ((v) => v);

  return (
    <div>
      <div className="flex items-end gap-1" style={{ height }}>
        {data.map((d, i) => {
          const value = d[valueKey] || 0;
          const pct = max ? (value / max) * 100 : 0;
          const isHigh = highlight != null && i === highlight;
          return (
            // h-full matters: the bar's height is a percentage, and a
            // percentage resolves against the parent. Without it the parent
            // sizes to its content under `items-end` and every bar collapses.
            <div key={i} className="group relative flex h-full flex-1 flex-col justify-end">
              <div
                title={`${d.label ?? d.hour}: ${fmt(value)}`}
                style={{ height: `${Math.max(pct, value > 0 ? 4 : 1)}%` }}
                className={`w-full rounded-t transition-colors ${
                  value === 0
                    ? 'bg-slate-100'
                    : isHigh
                      ? 'bg-indigo-600'
                      : 'bg-indigo-300 group-hover:bg-indigo-500'
                }`}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-1">
        {data.map((d, i) => (
          <span
            key={i}
            className="flex-1 truncate text-center text-[10px] text-slate-400"
            // Every label on a 12-bucket row is unreadable at mobile width, so
            // show every other one and keep the ends.
            style={{ visibility: data.length > 8 && i % 2 === 1 && i !== data.length - 1 ? 'hidden' : 'visible' }}
          >
            {d.label ?? d.hour}
          </span>
        ))}
      </div>
      {max > 0 && (
        <p className="mt-1 text-right text-[10px] text-slate-400">
          {pick('sabse zyada:', 'peak:')} {fmt(max)}
        </p>
      )}
    </div>
  );
}
