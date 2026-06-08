// Canonical site URL for SEO (sitemap, robots, canonical links, Open Graph).
// Set NEXT_PUBLIC_SITE_URL in your environment (and on Vercel).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
).replace(/\/$/, '');

export const SITE_NAME = 'Learnverse';
