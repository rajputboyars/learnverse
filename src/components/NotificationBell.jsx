'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function NotificationBell() {
  const { status } = useSession();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (status !== 'authenticated') return;
    let active = true;
    const load = () =>
      fetch('/api/notifications')
        .then((r) => r.json())
        .then((d) => active && setUnread(d.unread || 0))
        .catch(() => {});
    load();
    const onFocus = () => load();
    window.addEventListener('focus', onFocus);
    return () => { active = false; window.removeEventListener('focus', onFocus); };
  }, [status]);

  if (status !== 'authenticated') return null;

  return (
    <Link href="/notifications" className="relative rounded-md p-1.5 text-lg hover:bg-slate-100 dark:hover:bg-slate-800" title="Notifications">
      🔔
      {unread > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
          {unread > 9 ? '9+' : unread}
        </span>
      )}
    </Link>
  );
}
