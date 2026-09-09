'use client';

import { useLang } from '@/components/LanguageProvider';
import { BulletList, Card, Confidence, Pill, RankChange, Section, TableWrap, TrendPill } from '../primitives';

export default function RankingView({ data }) {
  const { pick } = useLang();
  const skills = data.skills || [];
  return (
    <div className="space-y-8">
      <Card>
        <div className="flex flex-wrap items-center gap-2">
          {data.asOf && <Pill>{data.asOf}</Pill>}
          <Confidence level={data.confidence} />
        </div>
        <p className="mt-3 text-slate-700">{data.summary}</p>
      </Card>

      <Section title={pick('Ranking', 'Ranking')} icon="chart-line">
        <TableWrap>
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">{pick('Skill', 'Skill')}</th>
              <th className="px-4 py-3">{pick('Demand', 'Demand')}</th>
              <th className="px-4 py-3">{pick('Trend', 'Trend')}</th>
              <th className="px-4 py-3">{pick('Pehle', 'Was')}</th>
              <th className="px-4 py-3">{pick('Badlaav', 'Change')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {skills.map((s, i) => (
              <tr key={s.name || i} className="align-top">
                <td className="px-4 py-3 font-semibold tabular-nums text-slate-400">{s.rank ?? i + 1}</td>
                <td className="px-4 py-3">
                  <p className="font-semibold">{s.name}</p>
                  {s.whyNow && <p className="mt-0.5 text-xs text-slate-500">{s.whyNow}</p>}
                  {!!s.commonRoles?.length && (
                    <p className="mt-1 text-xs text-slate-400">{s.commonRoles.join(' · ')}</p>
                  )}
                </td>
                <td className="px-4 py-3 capitalize">{s.demand}</td>
                <td className="px-4 py-3"><TrendPill trend={s.trend} /></td>
                <td className="px-4 py-3 tabular-nums text-slate-500">{s.previousRank ?? '—'}</td>
                <td className="px-4 py-3"><RankChange current={s.rank} previous={s.previousRank} /></td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Section>

      {!!data.decliningSkills?.length && (
        <Section title={pick('Peeche ja rahe hain', 'Losing ground')} icon="trend-down">
          <div className="grid gap-3 sm:grid-cols-2">
            {data.decliningSkills.map((s, i) => (
              <Card key={i}>
                <p className="font-semibold">{s.name}</p>
                <p className="mt-1 text-sm text-slate-600">{s.why}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {!!skills.length && (
        <Section title={pick('Seekhne ka suggested order', 'Suggested learning order')} icon="list-check">
          <BulletList
            items={[...skills]
              .sort((a, b) => (a.learnOrder ?? 99) - (b.learnOrder ?? 99))
              .map(
                (s) =>
                  `${s.name} — ${s.difficulty || pick('unrated', 'unrated')}${
                    s.resources?.length ? ` (${s.resources.join(', ')})` : ''
                  }`
              )}
          />
        </Section>
      )}

      {data.recommendation && (
        <Card className="border-indigo-200 bg-indigo-50">
          <p className="text-sm font-semibold text-indigo-900">
            {pick('Iska kya karna hai', 'What to do about it')}
          </p>
          <p className="mt-1 text-sm text-indigo-800">{data.recommendation}</p>
        </Card>
      )}
    </div>
  );
}
