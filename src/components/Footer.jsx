'use client';

import Link from 'next/link';
import { useLang } from './LanguageProvider';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-10 text-sm text-slate-500">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-slate-800">Learnverse</p>
            <p className="mt-1 max-w-md">{t('footer.tagline')}</p>
          </div>
          <div className="flex gap-6">
            <Link href="/courses" className="hover:text-indigo-600">{t('nav.courses')}</Link>
            <Link href="/roadmaps" className="hover:text-indigo-600">{t('nav.roadmaps')}</Link>
            <Link href="/interview-questions" className="hover:text-indigo-600">{t('nav.interview')}</Link>
            <Link href="/leaderboard" className="hover:text-indigo-600">{t('nav.leaderboard')}</Link>
          </div>
        </div>
        <p className="mt-8 text-xs text-slate-400">
          © {new Date().getFullYear()} Learnverse. {t('footer.built')}
        </p>
      </div>
    </footer>
  );
}
