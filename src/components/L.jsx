'use client';

import { useLang } from './LanguageProvider';

// Tiny client island for translating a single string inside a server component.
// Usage: <L hi="Hinglish text" en="English text" />
export default function L({ hi, en }) {
  const { pick } = useLang();
  return <>{pick(hi, en)}</>;
}
