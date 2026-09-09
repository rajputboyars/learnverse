'use client';

import Icon from '@/components/Icon';
import { useLang } from '@/components/LanguageProvider';
import { Card, Confidence, Pill, ScoreBar, Section, TableWrap } from '../primitives';

export default function ComparisonView({ data }) {
  const { pick } = useLang();
  const criteria = data.criteria || [];
  const options = data.options || [];

  return (
    <div className="space-y-8">
      <Card>
        <Confidence level={data.confidence} />
        <p className="mt-3 text-slate-700">{data.summary}</p>
      </Card>

      <Section title={pick('Aamne-saamne', 'Side by side')} icon="table">
        <TableWrap>
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">{pick('Option', 'Option')}</th>
              {criteria.map((c) => (
                <th key={c} className="px-4 py-3">{c}</th>
              ))}
              <th className="px-4 py-3">{pick('Keemat', 'Price')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {options.map((o, i) => (
              <tr key={o.name || i}>
                <td className="px-4 py-3">
                  <p className="font-semibold">{o.name}</p>
                  {o.kind && <p className="text-xs text-slate-400">{o.kind}</p>}
                </td>
                {criteria.map((c) => (
                  <td key={c} className="px-4 py-3">
                    {o.scores?.[c] != null ? <ScoreBar value={o.scores[c]} /> : <span className="text-slate-300">—</span>}
                  </td>
                ))}
                <td className="px-4 py-3 text-slate-600">{o.price || '—'}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Section>

      <Section title={pick('Poori detail', 'The detail')} icon="file">
        <div className="grid gap-4 lg:grid-cols-2">
          {options.map((o, i) => (
            <Card key={i}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-semibold">{o.name}</h4>
                  {o.bestFor && (
                    <p className="mt-0.5 text-sm text-slate-500">
                      {pick('Iske liye sabse achha:', 'Best for:')} {o.bestFor}
                    </p>
                  )}
                </div>
                {o.url && (
                  <a
                    href={o.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-sm font-medium text-indigo-600 hover:underline"
                  >
                    {pick('Kholo', 'Visit')} <Icon name="external-link" className="h-3 w-3" />
                  </a>
                )}
              </div>
              {!!o.strengths?.length && (
                <ul className="mt-3 space-y-1 text-sm text-slate-700">
                  {o.strengths.map((s, j) => (
                    <li key={j} className="flex gap-2">
                      <Icon name="check" className="mt-1 h-3 w-3 shrink-0 text-green-600" />{s}
                    </li>
                  ))}
                </ul>
              )}
              {!!o.weaknesses?.length && (
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  {o.weaknesses.map((s, j) => (
                    <li key={j} className="flex gap-2">
                      <Icon name="minus" className="mt-1 h-3 w-3 shrink-0 text-red-500" />{s}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      </Section>

      {!!data.verdict?.length && (
        <Section title={pick('Tumhare liye kaunsa', 'Which one for you')} icon="target">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.verdict.map((v, i) => (
              <Card key={i} className="border-indigo-200 bg-indigo-50">
                <Pill tone="indigo">{v.profile}</Pill>
                <p className="mt-2 font-semibold text-indigo-900">{v.pick}</p>
                <p className="mt-1 text-sm text-indigo-800">{v.why}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {data.caution && (
        <p className="flex gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <Icon name="warning" className="mt-0.5 h-4 w-4 shrink-0" />
          {data.caution}
        </p>
      )}
    </div>
  );
}
