'use client';

import Icon from '@/components/Icon';
import { BulletList, Card, Pill, Section } from '../primitives';

export default function RoadmapView({ data }) {
  const stages = data.stages || [];
  return (
    <div className="space-y-8">
      <Card>
        <div className="flex flex-wrap items-center gap-2">
          {data.totalDuration && <Pill tone="indigo"><Icon name="clock" className="h-3 w-3" />{data.totalDuration}</Pill>}
          <Pill>{stages.length} stages</Pill>
        </div>
        <p className="mt-3 text-slate-700">{data.summary}</p>
      </Card>

      <Section title="The plan" icon="map">
        <ol className="relative space-y-4 border-l border-slate-200 pl-6">
          {stages.map((s, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[1.9rem] top-1 grid h-6 w-6 place-items-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                {i + 1}
              </span>
              <Card>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-semibold">{s.title}</h4>
                  {s.duration && <Pill>{s.duration}</Pill>}
                </div>
                {s.goal && <p className="mt-2 text-sm text-slate-600">{s.goal}</p>}

                {!!s.topics?.length && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {s.topics.map((t) => (
                      <Pill key={t} tone="indigo">{t}</Pill>
                    ))}
                  </div>
                )}

                {s.project && (
                  <p className="mt-3 flex gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm">
                    <Icon name="wrench" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                    <span><span className="font-medium">Build:</span> {s.project}</span>
                  </p>
                )}
                {s.checkpoint && (
                  <p className="mt-2 flex gap-2 text-sm text-green-700">
                    <Icon name="square-check" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span><span className="font-medium">Done when:</span> {s.checkpoint}</span>
                  </p>
                )}
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      {!!data.skipIf?.length && (
        <Section title="Skip ahead if" icon="hand-point-up">
          <BulletList items={data.skipIf.map((s) => `If ${s.condition} — skip “${s.skip}”`)} />
        </Section>
      )}

      {!!data.risks?.length && (
        <Section title="Where people stall" icon="warning">
          <BulletList items={data.risks} icon="warning" />
        </Section>
      )}
    </div>
  );
}
