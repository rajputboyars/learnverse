'use client';

import { useState } from 'react';

export default function ShareButtons({ title = 'Learnverse', text = '' }) {
  const [copied, setCopied] = useState(false);

  function url() {
    return typeof window !== 'undefined' ? window.location.href : '';
  }
  const shareText = encodeURIComponent(text || title);

  function open(href) {
    window.open(href, '_blank', 'noopener,noreferrer');
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  async function nativeShare() {
    if (navigator.share) {
      try { await navigator.share({ title, text, url: url() }); } catch {}
    } else {
      copy();
    }
  }

  return (
    <div className="my-6 flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-muted">Share:</span>
      <button
        onClick={() => open(`https://wa.me/?text=${shareText}%20${encodeURIComponent(url())}`)}
        className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:bg-accent-green-tint hover:text-accent-green-ink"
      >
        🟢 WhatsApp
      </button>
      <button
        onClick={() => open(`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(url())}`)}
        className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:bg-line-soft"
      >
        𝕏 Twitter
      </button>
      <button
        onClick={() => open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url())}`)}
        className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:bg-brand-tint hover:text-brand-dark"
      >
        in LinkedIn
      </button>
      <button onClick={copy} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:bg-line-soft">
        {copied ? '✓ Copied' : '🔗 Copy link'}
      </button>
      <button onClick={nativeShare} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:bg-line-soft sm:hidden">
        ↗ Share
      </button>
    </div>
  );
}
