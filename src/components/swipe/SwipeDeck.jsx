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
  const axisRef = useRef(null); // 'x' once the gesture is committed to a swipe
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
    axisRef.current = null; // undecided until the finger has moved a little
    setDrag({ x: 0, y: 0, active: true });
  }

  function onPointerMove(e) {
    if (!drag.active || flying) return;
    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;

    // Decide once, after ~8px of travel, whether this gesture is a horizontal
    // swipe or a vertical scroll of the card's own content. Without this lock a
    // thumb sliding down the card drags it sideways at the same time.
    if (!axisRef.current && Math.abs(dx) + Math.abs(dy) > 8) {
      axisRef.current = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      // Once it is ours, capture the pointer so the card keeps receiving moves
      // even if the finger strays outside it. Capture throws if the pointer is
      // already gone, and an exception here would abandon the drag mid-swipe —
      // the capture is an optimisation, not a requirement.
      if (axisRef.current === 'x') {
        try {
          cardRef.current?.setPointerCapture?.(e.pointerId);
        } catch {
          /* no active pointer; the drag still works without capture */
        }
      }
    }
    if (axisRef.current !== 'x') return; // leave vertical scrolling alone

    setDrag({ x: dx, y: dy, active: true });
  }

  function onPointerUp() {
    if (!drag.active || flying) return;
    if (drag.x < -THRESHOLD) commit('left');
    else if (drag.x > THRESHOLD) commit('right');
    else setDrag({ x: 0, y: 0, active: false }); // snap back
    axisRef.current = null;
  }

  // A cancelled pointer (the browser took the gesture, the call came in) is not
  // a decision — put the card back rather than committing a half-swipe.
  function onPointerCancel() {
    axisRef.current = null;
    setDrag({ x: 0, y: 0, active: false });
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
          onPointerCancel={onPointerCancel}
          role="group"
          aria-label={`Card ${index + 1} of ${items.length}. Swipe left to save, right for next.`}
          className={`absolute inset-x-0 top-0 z-20 h-full overflow-hidden rounded-3xl border bg-white shadow-lg ${
            drag.active ? 'cursor-grabbing' : 'cursor-grab'
          } ${
            x < -20 ? 'border-indigo-400' : x > 20 ? 'border-slate-300' : 'border-slate-200'
          }`}
          style={{
            // pan-y, not none: the browser keeps vertical scrolling of the card
            // body while horizontal movement stays ours. With the default
            // (auto) it claims a one-finger drag for scrolling and cancels the
            // pointer stream, which is why only a two-finger drag used to work.
            touchAction: 'pan-y',
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

          <div
            style={{ touchAction: 'pan-y' }}
            className="h-full overflow-y-auto thin-scroll p-6"
          >
            {renderCard(current)}
          </div>
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
        <span className="text-xs text-slate-500">
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
