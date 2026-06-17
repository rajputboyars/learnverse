'use client';

import { SessionProvider } from 'next-auth/react';
import { LanguageProvider } from './LanguageProvider';
import PageLoader from './PageLoader';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <PageLoader />
        {children}
      </LanguageProvider>
    </SessionProvider>
  );
}
