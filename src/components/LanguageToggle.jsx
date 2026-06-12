'use client';

import { useLang } from './LanguageProvider';
import { LANGS } from '@/lib/i18n';

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div
      className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-0.5 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
      role="group"
      aria-label="Language"
    >
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          className={`rounded-full px-2.5 py-1 transition ${
            lang === l.code
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-500 hover:text-indigo-600'
          }`}
          title={l.label}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}
