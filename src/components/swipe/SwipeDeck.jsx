'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';

const THRESHOLD = 90; // px of travel before a release counts as a swipe
const FLY = 700; // how far off-screen the card is thrown

/**
 * A deck of swipeable cards.
 *
 * Direction meaning, which is the opposite of the dating apps this borrows its
 * gesture from, so it is spelled out on screen at all times:
 *
 *   swipe LEFT  → save to favourites  (keep it)
 *   swipe RIGHT → move on             (done with it)
 *
 * Pointer events rather than touch events, so the same code drives a finger on
 * a phone and a mouse drag on a laptop. Keyboard arrows do the same two things,
 * because a deck you can only operate by dragging is a deck some people cannot
 * operate at all.
 */
export default function SwipeDeck({ items, renderCard, onSave, onSkip, onEmpty, emptyState }) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const [flying, setFlying] = useState(null); // 'left' | 'right' | null
  const [saved, setSaved] = useState([]);

  const startRef = useRef({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const current = items[index];
  const upcoming = items.slice(index + 1, index + 3);

  const commit = useCallback(
    (direction) => {
      if (!current || flying) return;
      setFlying(direction);

      // Let the throw animation play before the next card takes its place.
      setTimeout(() => {
        if (direction === 'left') {
          onSave?.(current);
          setSaved((s) => [...s, current.id]);
        } else {
          onSkip?.(current);
        }
        setIndex((i) => i + 1);
        setDrag({ x: 0, y: 0, active: false });
        setFlying(null);
      }, 260);
    },
    [current, flying, onSave, onSkip]
  );

  useEffect(() => {
    if (items.length && index >= items.length) onEmpty?.();
  }, [index, items.length, onEmpty]);

  // Arrow keys, for anyone not dragging.
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowLeft') commit('left');
      if (e.key === 'ArrowRight') commit('right');
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [commit]);

  function onPointerDown(e) {
    if (flying) return;
    // Let taps on buttons inside the card (quiz options) behave normally.
    if (e.target.closest('button, a')) return;
    startRef.current = { x: e.clientX, y: e.clientY };
    setDrag({ x: 0, y: 0, active: true });
    cardRef.current?.setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e) {
    if (!drag.active || flying) return;
    setDrag({
      x: e.clientX - startRef.current.x,
      y: e.clientY - startRef.current.y,
      active: true,
    });
  }

  function onPointerUp() {
    if (!drag.active || flying) return;
    if (drag.x < -THRESHOLD) commit('left');
    else if (drag.x > THRESHOLD) commit('right');
    else setDrag({ x: 0, y: 0, active: false }); // snap back
  }

  if (!current) {
    return emptyState ?? null;
  }

  const x = flying ? (flying === 'left' ? -FLY : FLY) : drag.x;
  const rotate = x / 18; // a little tilt, the way a real card leans
  const intent = Math.min(1, Math.abs(x) / THRESHOLD);

  return (
    <div className="select-none">
      {/* Progress + what the gestures do */}
      <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
        <span>
          Card {index + 1} of {items.length}
        </span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-indigo-600">
            <Icon name="arrow-left" className="h-3 w-3" />save
          </span>
          <span className="flex items-center gap-1">
            next<Icon name="arrow-right" className="h-3 w-3" />
          </span>
        </span>
      </div>

      <div className="relative h-[30rem] sm:h-[32rem]">
        {/* The stack behind, so the deck has depth and you can see it shrink. */}
        {upcoming
          .slice()
          .reverse()
          .map((item, i) => {
            const depth = upcoming.length - i; // 2 for the far one, 1 for the near
            return (
              <div
                key={item.id}
                aria-hidden
                className="absolute inset-x-0 top-0 origin-top rounded-3xl border border-slate-200 bg-white shadow-sm"
                style={{
                  height: '100%',
                  transform: `translateY(${depth * 10}px) scale(${1 - depth * 0.035})`,
                  opacity: 1 - depth * 0.25,
                  zIndex: 10 - depth,
                }}
              />
            );
          })}

        {/* The live card */}
        <div
          ref={cardRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          role="group"
          aria-label={`Card ${index + 1} of ${items.length}. Swipe left to save, right for next.`}
          className={`absolute inset-x-0 top-0 z-20 h-full touch-none overflow-hidden rounded-3xl border bg-white shadow-lg ${
            drag.active ? 'cursor-grabbing' : 'cursor-grab'
          } ${
            x < -20 ? 'border-indigo-400' : x > 20 ? 'border-slate-300' : 'border-slate-200'
          }`}
          style={{
            transform: `translate(${x}px, ${flying ? -40 : drag.y * 0.15}px) rotate(${rotate}deg)`,
            transition: drag.active ? 'none' : 'transform 260ms ease-out, opacity 260ms ease-out',
            opacity: flying ? 0 : 1,
          }}
        >
          {/* Intent stamps, fading in as you drag */}
          <div
            className="pointer-events-none absolute left-4 top-4 z-30 rounded-xl border-2 border-indigo-500 px-3 py-1 text-sm font-bold uppercase tracking-wide text-indigo-600"
            style={{ opacity: x < 0 ? intent : 0, transform: `rotate(-12deg)` }}
          >
            <Icon name="bookmark" className="mr-1.5 h-3.5 w-3.5" />Saved
          </div>
          <div
            className="pointer-events-none absolute right-4 top-4 z-30 rounded-xl border-2 border-slate-400 px-3 py-1 text-sm font-bold uppercase tracking-wide text-slate-500"
            style={{ opacity: x > 0 ? intent : 0, transform: `rotate(12deg)` }}
          >
            Next<Icon name="arrow-right" className="ml-1.5 h-3.5 w-3.5" />
          </div>

          <div className="h-full overflow-y-auto thin-scroll p-6">{renderCard(current)}</div>
        </div>
      </div>

      {/* The same two actions as buttons — a gesture should never be the only way. */}
      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          onClick={() => commit('left')}
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-indigo-300 bg-white text-indigo-600 shadow-sm transition-transform hover:scale-105 hover:border-indigo-500"
          aria-label="Save to favourites"
        >
          <Icon name="bookmark" className="h-5 w-5" />
        </button>
        <span className="text-xs text-slate-400">
          {saved.length} saved
        </span>
        <button
          onClick={() => commit('right')}
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-slate-300 bg-white text-slate-500 shadow-sm transition-transform hover:scale-105 hover:border-slate-400"
          aria-label="Next card"
        >
          <Icon name="arrow-right" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
