'use client';

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

const BEAT_MS = 60 * 1000;

/**
 * Records time on a learning page. Renders nothing.
 *
 * It only counts while the tab is actually visible, so a page left open in a
 * background tab stops accruing. Combined with the server-side cap per beat,
 * "learning hours" means time with the page in front of the reader rather than
 * time since they opened it.
 */
export default function LearningTimer({ kind = 'concept', conceptId, courseId }) {
  const { status } = useSession();
  const pending = useRef(0);

  useEffect(() => {
    if (status !== 'authenticated') return undefined;

    function tick() {
      if (document.visibilityState === 'visible') pending.current += 1;
    }
    // One count per second is cheap and lets a partial minute still be sent
    // when the reader navigates away mid-beat.
    const secondTimer = setInterval(tick, 1000);

    async function flush() {
      const seconds = pending.current;
      if (seconds < 5) return; // ignore a glance
      pending.current = 0;
      const now = new Date();
      const body = JSON.stringify({
        kind,
        conceptId,
        courseId,
        seconds,
        localDate: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`,
        localHour: now.getHours(),
        localWeekday: now.getDay(),
      });
      try {
        await fetch('/api/me/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
          keepalive: true, // survives the page going away
        });
      } catch {
        /* a lost beat is not worth surfacing to the reader */
      }
    }

    const beatTimer = setInterval(flush, BEAT_MS);
    // Send whatever is pending when the tab is hidden or closed, so the last
    // partial minute of a session is not lost.
    function onHide() {
      if (document.visibilityState === 'hidden') flush();
    }
    document.addEventListener('visibilitychange', onHide);

    return () => {
      clearInterval(secondTimer);
      clearInterval(beatTimer);
      document.removeEventListener('visibilitychange', onHide);
      // Unmount is a real end-of-session: send the last partial minute. The
      // request is keepalive, so it survives the navigation that caused it.
      flush();
    };
  }, [status, kind, conceptId, courseId]);

  return null;
}
