'use client';

import { SessionProvider } from 'next-auth/react';
import { LanguageProvider } from './LanguageProvider';
import PageLoader from './PageLoader';
import RouteLoader from './RouteLoader';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <PageLoader />
        <RouteLoader />
        {children}
      </LanguageProvider>
    </SessionProvider>
  );
}
