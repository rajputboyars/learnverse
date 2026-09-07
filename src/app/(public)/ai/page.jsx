'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Icon from '@/components/Icon';
import AIQuickActions from '@/components/ai/AIQuickActions';
import RecentResults from '@/components/ai/RecentResults';

const SHELL = 'mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8';

const TABS = [
  { id: 'all', label: 'All actions' },
  { id: 'career', label: 'Career' },
  { id: 'learning', label: 'Learning' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'create', label: 'Create' },
];

// useSearchParams needs a Suspense boundary above it during prerender.
export default function AIToolsPage() {
  return (
    <Suspense fallback={<div className={`${SHELL} py-10`} />}>
      <AITools />
    </Suspense>
  );
}

function AITools() {
  const params = useSearchParams();
  const initialTab = TABS.some((t) => t.id === params.get('tab')) ? params.get('tab') : 'all';
  const [tab, setTab] = useState(initialTab);
  const [historyTab, setHistoryTab] = useState('recent');

  return (
    <div className={`${SHELL} py-10`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">AI Tools</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Ask a question in one click. Pick an action, fill a couple of fields, and get a
            structured answer you can save, export or turn into a post.
          </p>
        </div>
        <Link
          href="/settings/ai"
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          <Icon name="plug" className="mr-1.5 h-3.5 w-3.5" />AI connections
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap gap-1.5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === t.id
                ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <AIQuickActions
          category={tab === 'all' ? undefined : tab}
          heading="What do you want to know?"
          subheading="Every action writes the full prompt for you and returns a structured result."
        />
      </div>

      <div className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Your results</h2>
          <div className="flex gap-1.5">
            {[
              { id: 'recent', label: 'Recent' },
              { id: 'saved', label: 'Saved' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setHistoryTab(t.id)}
                className={`rounded-full border px-3 py-1 text-sm font-medium ${
                  historyTab === t.id
                    ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <RecentResults key={historyTab} savedOnly={historyTab === 'saved'} />
        </div>
      </div>
    </div>
  );
}
