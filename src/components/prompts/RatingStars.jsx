'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import { useLang } from '@/components/LanguageProvider';


/** Read-only when `onRate` is omitted — the same stars serve both jobs. */
export default function RatingStars({ value = 0, myRating = 0, count = 0, onRate }) {
  const { pick } = useLang();
  const [hover, setHover] = useState(0);
  const active = hover || myRating || value;

  return (
    <div className="flex items-center gap-2">
      <div className="flex" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            disabled={!onRate}
            onMouseEnter={() => onRate && setHover(n)}
            onClick={() => onRate?.(n)}
            aria-label={pick(`5 mein se ${n} do`, `Rate ${n} out of 5`)}
            className={`p-0.5 ${onRate ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <Icon
              name="star"
              className={`h-4 w-4 ${n <= active ? 'text-amber-400' : 'text-slate-200'}`}
            />
          </button>
        ))}
      </div>
      <span className="text-sm text-slate-500">
        {value ? `${value} (${count})` : pick('Abhi rating nahi hai', 'Not rated yet')}
        {myRating ? pick(' · tumhari save ho gayi', ' · yours saved') : ''}
      </span>
    </div>
  );
}
