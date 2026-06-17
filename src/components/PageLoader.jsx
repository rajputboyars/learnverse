'use client';

import { useEffect, useState } from 'react';

const LETTERS = 'Learnverse'.split('');

// Show loader only once per browser session
const SESSION_KEY = 'lv_loader_seen';

export default function PageLoader() {
  const [phase, setPhase] = useState('hidden'); // hidden | show | fadeout | done

  useEffect(() => {
    // Skip on subsequent visits within the same tab session
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(SESSION_KEY)) {
      return;
    }

    setPhase('show');

    // Letters drop in over ~900ms (10 letters × 80ms stagger + 100ms base)
    // Hold for 400ms, then fade out over 500ms
    const holdTimer = setTimeout(() => setPhase('fadeout'), 1400);
    const doneTimer = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem(SESSION_KEY, '1');
    }, 1900);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === 'hidden' || phase === 'done') return null;

  return (
    <>
      <style>{`
        @keyframes lv-letter-drop {
          0%   { opacity: 0; transform: translateY(-28px) scale(0.85); }
          60%  { opacity: 1; transform: translateY(4px)   scale(1.05); }
          100% { opacity: 1; transform: translateY(0)     scale(1);    }
        }
        @keyframes lv-logo-pop {
          0%   { opacity: 0; transform: scale(0.6); }
          70%  { opacity: 1; transform: scale(1.12); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes lv-underline-grow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .lv-loader-overlay {
          transition: opacity 0.5s ease;
        }
        .lv-loader-overlay.fadeout {
          opacity: 0;
        }
      `}</style>

      <div
        className={`lv-loader-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-slate-950 ${
          phase === 'fadeout' ? 'fadeout' : ''
        }`}
        aria-hidden="true"
      >
        {/* Logo box */}
        <div
          style={{
            animation: 'lv-logo-pop 0.45s cubic-bezier(.34,1.56,.64,1) both',
          }}
          className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-indigo-600 text-3xl font-extrabold text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40"
        >
          L
        </div>

        {/* Letter-drop wordmark */}
        <div className="flex items-end gap-[2px]" aria-label="Learnverse">
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              className="inline-block text-3xl font-bold text-slate-800 dark:text-slate-100"
              style={{
                animation: `lv-letter-drop 0.45s cubic-bezier(.34,1.56,.64,1) both`,
                animationDelay: `${0.15 + i * 0.075}s`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Animated underline */}
        <div
          className="mt-3 h-[3px] w-36 origin-left rounded-full bg-indigo-500"
          style={{
            animation: 'lv-underline-grow 0.6s cubic-bezier(.4,0,.2,1) 0.9s both',
          }}
        />

        {/* Tagline */}
        <p
          className="mt-3 text-xs font-medium tracking-widest text-slate-400 dark:text-slate-500"
          style={{
            animation: 'lv-letter-drop 0.4s ease both',
            animationDelay: '1.05s',
          }}
        >
          LEARN · CODE · GROW
        </p>
      </div>
    </>
  );
}
