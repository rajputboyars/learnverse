import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileTabBar from '@/components/MobileTabBar';

export default function PublicLayout({ children }) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      {/* pb-16 on small screens keeps the last of the page clear of the fixed
          tab bar, which would otherwise sit on top of it. */}
      <main id="main" className="flex-1 pb-16 sm:pb-0">{children}</main>
      <Footer />
      {/* The bar reads the query string (?deck=), so it needs a Suspense
          boundary of its own during prerender. */}
      <Suspense fallback={null}>
        <MobileTabBar />
      </Suspense>
    </>
  );
}
