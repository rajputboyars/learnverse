'use client';

import Icon from '@/components/Icon';
import { Card, Confidence, Pill, Section } from '../primitives';

const EFFORT_TONE = { small: 'green', medium: 'amber', large: 'red' };

export default function AnalysisView({ data }) {
  return (
    <div className="space-y-8">
      <Card>
        <Confidence level={data.confidence} />
        <p className="mt-3 text-slate-700">{data.summary}</p>
        <p className="mt-3 text-xs text-slate-400">
          Based on the activity this site has recorded for you — not on anything outside it.
        </p>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {!!data.strengths?.length && (
          <Section title="Working well" icon="check-circle">
            <div className="space-y-3">
              {data.strengths.map((s, i) => (
                <Card key={i} className="border-green-200 bg-green-50 p-4">
                  <p className="font-semibold text-green-900">{s.title}</p>
                  <p className="mt-1 text-sm text-green-800">{s.detail}</p>
                </Card>
              ))}
            </div>
          </Section>
        )}
        {!!data.gaps?.length && (
          <Section title="Worth attention" icon="warning">
            <div className="space-y-3">
              {data.gaps.map((g, i) => (
                <Card key={i} className="p-4">
                  <p className="font-semibold">{g.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{g.detail}</p>
                </Card>
              ))}
            </div>
          </Section>
        )}
      </div>

      {!!data.patterns?.length && (
        <Section title="Patterns in your activity" icon="chart">
          <div className="space-y-2">
            {data.patterns.map((p, i) => (
              <Card key={i} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <p className="text-sm text-slate-700">{p.observation}</p>
                {p.basedOn && <Pill>from: {p.basedOn}</Pill>}
              </Card>
            ))}
          </div>
        </Section>
      )}

      {!!data.nextSteps?.length && (
        <Section title="Do this next" icon="target">
          <div className="space-y-2">
            {data.nextSteps.map((s, i) => (
              <Card key={i} className="flex flex-wrap items-start justify-between gap-3 border-indigo-200 bg-indigo-50 p-4">
                <div>
                  <p className="font-semibold text-indigo-900">{s.action}</p>
                  <p className="mt-1 text-sm text-indigo-800">{s.why}</p>
                </div>
                {s.effort && <Pill tone={EFFORT_TONE[s.effort] || 'slate'}>{s.effort} effort</Pill>}
              </Card>
            ))}
          </div>
        </Section>
      )}

      {data.encouragement && (
        <p className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <Icon name="seedling" className="h-4 w-4 text-green-600" />
          {data.encouragement}
        </p>
      )}
    </div>
  );
}
