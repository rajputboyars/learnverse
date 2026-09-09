'use client';

import Icon from '@/components/Icon';
import { useLang } from '@/components/LanguageProvider';
import { BulletList, Card, Confidence, Pill, Section } from '../primitives';

const KIND_ICON = {
  docs: 'file',
  course: 'graduation',
  video: 'play',
  book: 'book',
  article: 'file',
  practice: 'code',
  community: 'users',
};

export default function ResourcesView({ data }) {
  const { pick } = useLang();
  return (
    <div className="space-y-8">
      <Card>
        <Confidence level={data.confidence} />
        <p className="mt-3 text-slate-700">{data.summary}</p>
      </Card>

      <Section title={pick('Tumhare time ke layak', 'Worth your time')} icon="book-open">
        <div className="grid gap-3 lg:grid-cols-2">
          {(data.resources || []).map((r, i) => (
            <Card key={i} className="flex gap-4">
              <Icon name={KIND_ICON[r.kind] || 'link'} className="mt-1 h-4 w-4 shrink-0 text-indigo-500" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-semibold">{r.name}</h4>
                  {r.cost && <Pill tone={r.cost === 'free' ? 'green' : 'slate'}>{r.cost}</Pill>}
                  {r.level && <Pill>{r.level}</Pill>}
                </div>
                <p className="mt-1 text-sm text-slate-600">{r.whyGood}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  {r.timeToValue && <span><Icon name="clock" className="mr-1 h-3 w-3" />{r.timeToValue}</span>}
                  {r.url && (
                    <a
                      href={r.url}
                      target={r.url.startsWith('/') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="font-medium text-indigo-600 hover:underline"
                    >
                      {pick('Kholo', 'Open')} <Icon name="external-link" className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {!!data.order?.length && (
        <Section title={pick('Inhe is order mein use karo', 'Use them in this order')} icon="list-check">
          <ol className="space-y-2 text-sm text-slate-700">
            {data.order.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </Section>
      )}

      {!!data.avoid?.length && (
        <Section title={pick('Inhe chhod do', 'Skip these')} icon="x-circle">
          <BulletList items={data.avoid.map((a) => `${a.name} — ${a.why}`)} icon="x" />
        </Section>
      )}
    </div>
  );
}
