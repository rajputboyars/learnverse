'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import PostComposer from '@/components/create/PostComposer';
import SavedDrafts from '@/components/create/SavedDrafts';
import { LoginGate, SkeletonCard } from '@/components/ui/States';

const SHELL = 'mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8';

export default function CreatePage() {
  return (
    <Suspense fallback={<div className={`${SHELL} py-10`} />}>
      <Create />
    </Suspense>
  );
}

function Create() {
  const { status } = useSession();
  const params = useSearchParams();
  const [tab, setTab] = useState('compose');

  // Deep-linkable, so "create a post from this" elsewhere can hand over a topic.
  const initial = {
    platform: params.get('platform') || 'LinkedIn',
    topic: params.get('topic') || '',
    points: params.get('points') || '',
  };

  if (status === 'loading') {
    return <div className={`${SHELL} py-12`}><SkeletonCard lines={4} /></div>;
  }

  return (
    <div className={`${SHELL} py-10`}>
      <div>
        <h1 className="text-3xl font-bold">Create a post</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Turn what you learned into something worth reading. Learnverse writes the draft; you edit
          it, copy it, and post it yourself — nothing is published on your behalf.
        </p>
      </div>

      {status !== 'authenticated' ? (
        <div className="mt-8 max-w-lg">
          <LoginGate message="Log in to generate posts from your own learning." />
        </div>
      ) : (
        <>
          <div className="mt-8 flex gap-1.5">
            {[
              { id: 'compose', label: 'Compose' },
              { id: 'drafts', label: 'Saved drafts' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
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
            {tab === 'compose' ? <PostComposer initial={initial} /> : <SavedDrafts />}
          </div>
        </>
      )}
    </div>
  );
}
