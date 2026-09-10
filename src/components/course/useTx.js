'use client';

import { useCallback } from 'react';
import { useLang } from '../LanguageProvider';
import { pickText } from '@/lib/content';

/**
 * Lesson strings may be plain ('Title field') or bilingual
 * ({ english, hinglish }). tx() returns the right side for the reader's
 * language, falling back to whichever side exists.
 */
export function useTx() {
  const { lang } = useLang();
  return useCallback((value) => pickText(value, lang), [lang]);
}

/** Reads a JSON value from localStorage without ever throwing. */
export function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage blocked — progress simply is not remembered */
  }
}
