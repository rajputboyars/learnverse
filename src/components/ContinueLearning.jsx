'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Icon from '@/components/Icon';

export default function ContinueLearning() {
  const { status } = useSession();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch('/api/me/continue')
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, [status]);

  if (status !== 'authenticated' || !data?.concept) return null;

  return (
    <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 pt-4">
      <Link
        href={`/concepts/${data.concept.slug}`}
        className="group flex items-center justify-between rounded-2xl border border-green-200 bg-green-50 p-5 transition hover:border-green-300"
      >
        <div>
          <p className="text-sm font-semibold text-green-700"><Icon name="play" className="mr-1.5 h-3 w-3" />Continue learning</p>
          <p className="mt-1 font-bold group-hover:text-green-700">
            <Icon name={data.course?.icon} brand className="mr-2 h-4 w-4" />{data.concept.title}
          </p>
        </div>
        <span className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white">Resume <Icon name="arrow-right" className="h-3 w-3" /></span>
      </Link>
    </section>
  );
}
