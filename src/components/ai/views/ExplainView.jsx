'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import CodeBlock from '@/components/concept/CodeBlock';
import { BulletList, Card, Section } from '../primitives';

export default function ExplainView({ data }) {
  return (
    <div className="space-y-8">
      <Card>
        <h3 className="text-lg font-bold">{data.title}</h3>
        {data.oneLiner && <p className="mt-1 text-slate-600">{data.oneLiner}</p>}
        {data.explanation && <p className="prose-content mt-4 text-slate-700">{data.explanation}</p>}
      </Card>

      {data.dailyLifeExample && (
        <Card className="border-amber-200 bg-amber-50">
          <p className="flex items-center gap-2 text-sm font-semibold text-amber-900">
            <Icon name="lightbulb" className="h-4 w-4" />
            Daily-life example
          </p>
          <p className="mt-2 text-sm text-amber-900">{data.dailyLifeExample}</p>
        </Card>
      )}

      {!!data.keyPoints?.length && (
        <Section title="Remember this" icon="thumbtack">
          <BulletList items={data.keyPoints} />
        </Section>
      )}

      {data.code?.snippet && (
        <Section title="In code" icon="code">
          <CodeBlock code={data.code.snippet} language={data.code.language || 'javascript'} />
        </Section>
      )}

      {!!data.commonMistakes?.length && (
        <Section title="Common mistakes" icon="bug">
          <div className="space-y-2">
            {data.commonMistakes.map((m, i) => (
              <Card key={i} className="p-4">
                <p className="text-sm font-medium text-red-700">{m.mistake}</p>
                <p className="mt-1 text-sm text-slate-600">{m.fix}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {!!data.checkYourself?.length && (
        <Section title="Check yourself" icon="question">
          <div className="space-y-2">
            {data.checkYourself.map((q, i) => (
              <Reveal key={i} question={q.question} answer={q.answer} />
            ))}
          </div>
        </Section>
      )}

      {!!data.nextTopics?.length && (
        <Section title="Read next" icon="arrow-right">
          <BulletList items={data.nextTopics} icon="arrow-right" />
        </Section>
      )}
    </div>
  );
}

// Hiding the answer is the point — a question you can see the answer to teaches
// nothing.
function Reveal({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="p-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 text-left text-sm font-medium"
      >
        {question}
        <Icon name="chevron-down" className={`h-3 w-3 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="mt-2 border-t border-slate-100 pt-2 text-sm text-slate-600">{answer}</p>}
    </Card>
  );
}
