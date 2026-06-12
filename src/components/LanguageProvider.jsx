'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { DEFAULT_LANG, translate } from '@/lib/i18n';

const LangContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (key) => key,
  pick: (hi) => hi,
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANG);

  // Read the saved preference after mount (avoids SSR/hydration mismatch).
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lang');
      if (saved === 'en' || saved === 'hi') setLangState(saved);
    } catch {}
  }, []);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem('lang', next);
    } catch {}
  }, []);

  const t = useCallback((key) => translate(lang, key), [lang]);

  // Inline picker for page-specific strings: pick('Hinglish text', 'English text')
  const pick = useCallback((hi, en) => (lang === 'hi' ? hi : en), [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t, pick }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
