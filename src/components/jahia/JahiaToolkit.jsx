'use client';

import Link from 'next/link';
import Icon from '../Icon';
import { useLang } from '../LanguageProvider';
import CndReference from './CndReference';
import NodeTypeExplorer from './NodeTypeExplorer';
import DebugLab from './DebugLab';
import ProjectBoard from './ProjectBoard';
import { TOOLS } from '@/data/jahia/tools';


const SHELL = 'mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8';

export default function JahiaToolkit({ tool, lessons }) {
  const { pick } = useLang();
  const meta = TOOLS[tool];

  return (
    <div className="bg-slate-50 pb-16">
      <nav className={`${SHELL} flex flex-wrap items-center gap-2 pt-5 text-sm text-slate-400`}>
        <Link href="/courses" className="hover:text-indigo-600">{pick('Saare courses', 'All courses')}</Link>
        <span>/</span>
        <Link href="/courses/jahia" className="hover:text-indigo-600">Jahia DXP</Link>
        <span>/</span>
        <span className="font-medium text-slate-600">{meta.title}</span>
      </nav>

      <header className={`${SHELL} pt-3.5`}>
        <div className="flex flex-col gap-4 rounded-3xl bg-slate-900 p-6 sm:p-8 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-800">
              <Icon name={meta.icon} className="h-5 w-5 text-indigo-300" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Jahia toolkit</p>
              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{meta.title}</h1>
            </div>
          </div>
          <p className="max-w-3xl text-slate-400">{meta.description}</p>
          <div className="flex gap-1.5 overflow-x-auto">
            {Object.entries(TOOLS).map(([key, t]) => (
              <Link
                key={key}
                href={`/courses/jahia/toolkit/${key}`}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold ${
                  key === tool ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Icon name={t.icon} className="h-3.5 w-3.5" />
                {t.title}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main className={`${SHELL} pt-5`}>
        {tool === 'cnd' && <CndReference lessons={lessons} />}
        {tool === 'node-types' && <NodeTypeExplorer />}
        {tool === 'debugging' && <DebugLab lessons={lessons} />}
        {tool === 'project' && <ProjectBoard lessons={lessons} />}
      </main>
    </div>
  );
}

/** Link to a lesson by title, or plain text if it is not seeded yet. */
export function LessonLink({ title, lessons }) {
  const slug = lessons?.[title]?.slug;
  if (!slug) return <span className="text-sm text-slate-500">{title}</span>;
  return (
    <Link href={`/concepts/${slug}`} className="text-sm font-semibold text-indigo-600 hover:underline">
      {title} <Icon name="arrow-right" className="h-2.5 w-2.5" />
    </Link>
  );
}
