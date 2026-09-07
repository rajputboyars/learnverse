'use client';

import Icon from '@/components/Icon';

/**
 * This period against the one before it — the comparison the product is built
 * around, since a learner's only fair benchmark is their own previous self.
 *
 * With no previous period there is no percentage. "First week of activity" is
 * the honest answer, not "+100%".
 */
export default function ComparisonTile({ label, current, previous, change, unit = '' }) {
  const noBaseline = change === null || change === undefined;
  const up = !noBaseline && change > 0;
  const flat = !noBaseline && change === 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">
        {current}
        {unit && <span className="ml-1 text-base font-medium text-slate-400">{unit}</span>}
      </p>

      {noBaseline ? (
        <p className="mt-2 text-xs text-slate-400">
          No earlier period to compare against yet.
        </p>
      ) : (
        <p
          className={`mt-2 flex items-center gap-1.5 text-sm font-medium ${
            flat ? 'text-slate-500' : up ? 'text-green-600' : 'text-amber-600'
          }`}
        >
          <Icon name={flat ? 'minus' : up ? 'trend-up' : 'trend-down'} className="h-3 w-3" />
          {flat ? 'Same as' : `${up ? '+' : ''}${change}% vs`} the previous period
          <span className="font-normal text-slate-400">({previous})</span>
        </p>
      )}
    </div>
  );
}
