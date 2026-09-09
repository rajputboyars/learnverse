import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileTabBar from '@/components/MobileTabBar';

export default function PublicLayout({ children }) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main" className="flex-1">{children}</main>
      {/* The bottom padding belongs on the LAST thing in the document, which is
          the footer — not on <main>. On <main> it left the footer's own final
          line sitting underneath the fixed tab bar, unreachable by scrolling. */}
      <div className="pb-14 sm:pb-0">
        <Footer />
      </div>
      {/* The bar reads the query string (?deck=), so it needs a Suspense
          boundary of its own during prerender. */}
      <Suspense fallback={null}>
        <MobileTabBar />
      </Suspense>
    </>
  );
}
