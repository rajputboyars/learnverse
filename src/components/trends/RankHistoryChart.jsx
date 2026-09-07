'use client';

import { useId } from 'react';

/**
 * A skill's rank over time. Rank 1 is the *best*, so the y-axis is inverted —
 * a line going up means the skill climbed.
 *
 * Inline SVG rather than a chart library: it is one series, it must theme with
 * the page, and pulling in a charting dependency for this would cost more than
 * it returns. Points are only ever plotted where a snapshot exists; there is no
 * interpolation of days nobody recorded.
 */
export default function RankHistoryChart({ history, height = 160 }) {
  const gradientId = useId();

  if (!history?.length) return null;

  if (history.length === 1) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-500">
        Only one snapshot recorded so far — there is nothing to plot a line against yet.
      </p>
    );
  }

  const width = 640;
  const pad = { top: 16, right: 16, bottom: 26, left: 30 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;

  const ranks = history.map((h) => h.rank);
  const best = Math.min(...ranks);
  const worst = Math.max(...ranks);
  // A flat line would divide by zero; give it a band to sit in the middle of.
  const span = worst - best || 2;
  const top = worst === best ? best - 1 : best;

  const x = (i) => pad.left + (history.length === 1 ? innerW / 2 : (i / (history.length - 1)) * innerW);
  const y = (rank) => pad.top + ((rank - top) / span) * innerH;

  const line = history.map((h, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(h.rank)}`).join(' ');
  const area = `${line} L ${x(history.length - 1)} ${pad.top + innerH} L ${x(0)} ${pad.top + innerH} Z`;

  const fmt = (d) =>
    new Date(d).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full min-w-[20rem]"
        role="img"
        aria-label={`Rank history across ${history.length} snapshots, best rank ${best}, worst rank ${worst}`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Best and worst rank guides */}
        {[best, worst].map((r, i) =>
          worst === best && i === 1 ? null : (
            <g key={r}>
              <line
                x1={pad.left}
                x2={width - pad.right}
                y1={y(r)}
                y2={y(r)}
                stroke="currentColor"
                className="text-slate-200"
                strokeDasharray="3 3"
              />
              <text x={4} y={y(r) + 4} className="fill-slate-400 text-[10px]">
                #{r}
              </text>
            </g>
          )
        )}

        <path d={area} fill={`url(#${gradientId})`} />
        <path d={line} fill="none" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" />

        {history.map((h, i) => (
          <g key={i}>
            <circle cx={x(i)} cy={y(h.rank)} r="3.5" fill="#6366f1" />
            <title>{`${fmt(h.capturedAt)} — rank #${h.rank}${h.demand ? `, ${h.demand} demand` : ''} (${h.source})`}</title>
          </g>
        ))}

        {/* Only the first and last dates, so labels never collide */}
        <text x={pad.left} y={height - 6} className="fill-slate-400 text-[10px]">
          {fmt(history[0].capturedAt)}
        </text>
        <text x={width - pad.right} y={height - 6} textAnchor="end" className="fill-slate-400 text-[10px]">
          {fmt(history[history.length - 1].capturedAt)}
        </text>
      </svg>
    </div>
  );
}
