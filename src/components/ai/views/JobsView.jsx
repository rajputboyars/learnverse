'use client';

import { useLang } from '@/components/LanguageProvider';
import { Card, Confidence, Pill, Section, TrendPill } from '../primitives';

export default function JobsView({ data }) {
  const { pick } = useLang();
  return (
    <div className="space-y-8">
      <Card>
        <Confidence level={data.confidence} />
        <p className="mt-3 text-slate-700">{data.summary}</p>
      </Card>

      <Section title={pick('Roles', 'Roles')} icon="briefcase">
        <div className="grid gap-4 lg:grid-cols-2">
          {(data.roles || []).map((r, i) => (
            <Card key={i}>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-semibold">{r.title}</h4>
                <TrendPill trend={r.trend} />
                {r.demand && (
                  <Pill tone="indigo">
                    {r.demand} {pick('demand', 'demand')}
                  </Pill>
                )}
                {r.entryDifficulty && (
                  <Pill>
                    {pick('entry:', 'entry:')} {r.entryDifficulty}
                  </Pill>
                )}
              </div>

              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {pick('Hona hi chahiye', 'Must have')}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {(r.mustHaveSkills || []).map((s) => (
                  <Pill key={s} tone="green">{s}</Pill>
                ))}
              </div>

              {!!r.niceToHaveSkills?.length && (
                <>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {pick('Ho toh achha hai', 'Nice to have')}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {r.niceToHaveSkills.map((s) => (
                      <Pill key={s}>{s}</Pill>
                    ))}
                  </div>
                </>
              )}

              {r.note && <p className="mt-3 text-sm text-slate-600">{r.note}</p>}
            </Card>
          ))}
        </div>
      </Section>

      <div className="grid gap-4 sm:grid-cols-2">
        {!!data.risingSkills?.length && (
          <Section title={pick('Upar ja rahe hain', 'Rising')} icon="trend-up">
            <div className="space-y-2">
              {data.risingSkills.map((s, i) => (
                <Card key={i} className="border-green-200 bg-green-50 p-4">
                  <p className="text-sm font-semibold text-green-900">{s.name}</p>
                  <p className="mt-0.5 text-sm text-green-800">{s.why}</p>
                </Card>
              ))}
            </div>
          </Section>
        )}
        {!!data.fadingSkills?.length && (
          <Section title={pick('Dheere-dheere khatam', 'Fading')} icon="trend-down">
            <div className="space-y-2">
              {data.fadingSkills.map((s, i) => (
                <Card key={i} className="p-4">
                  <p className="text-sm font-semibold">{s.name}</p>
                  <p className="mt-0.5 text-sm text-slate-600">{s.why}</p>
                </Card>
              ))}
            </div>
          </Section>
        )}
      </div>

      {data.advice && (
        <Card className="border-indigo-200 bg-indigo-50">
          <p className="text-sm font-semibold text-indigo-900">{pick('Salaah', 'Advice')}</p>
          <p className="mt-1 text-sm text-indigo-800">{data.advice}</p>
        </Card>
      )}
    </div>
  );
}
