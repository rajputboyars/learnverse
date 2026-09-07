'use client';

import { useMemo, useState } from 'react';
import Icon from '@/components/Icon';
import { buildCardCaption, buildCardSVG } from '@/lib/cards/render';

const THEMES = ['indigo', 'slate', 'amber', 'green'];

/**
 * Preview, download and share one card.
 *
 * The PNG is produced by drawing the same SVG onto a canvas — no screenshot
 * library, and what downloads is exactly what was previewed. The SVG references
 * nothing external, so the canvas never taints and export cannot fail on a
 * blocked resource.
 */
export default function ShareCard({ card, onClose }) {
  const [theme, setTheme] = useState(card.theme || 'indigo');
  const [note, setNote] = useState('');

  const themed = useMemo(() => ({ ...card, theme }), [card, theme]);
  const svg = useMemo(() => buildCardSVG(themed), [themed]);
  const dataUrl = useMemo(
    () => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
    [svg]
  );

  function flash(message) {
    setNote(message);
    setTimeout(() => setNote(''), 2200);
  }

  async function toBlob() {
    const image = new Image();
    image.src = dataUrl;
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = () => reject(new Error('Could not render the card'));
    });

    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, 1080, 1080);

    return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  }

  async function download() {
    try {
      const blob = await toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `learnverse-${card.kind}-${new Date().toISOString().slice(0, 10)}.png`;
      a.click();
      URL.revokeObjectURL(url);
      flash('Downloaded');
    } catch (e) {
      flash(e.message);
    }
  }

  async function copyCaption() {
    try {
      await navigator.clipboard.writeText(buildCardCaption(themed));
      flash('Caption copied');
    } catch {
      flash('Clipboard unavailable');
    }
  }

  // Native share, when the browser supports sharing a file. Falls back to the
  // download rather than pretending the share happened.
  async function share() {
    try {
      const blob = await toBlob();
      const file = new File([blob], `learnverse-${card.kind}.png`, { type: 'image/png' });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: buildCardCaption(themed) });
        return;
      }
      flash('Sharing files is not supported here — downloading instead');
      await download();
    } catch {
      /* the user dismissed the share sheet */
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{card.eyebrow}</h3>
          <p className="mt-0.5 text-sm text-slate-500">{card.headline}</p>
        </div>
        {onClose && (
          <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
            <Icon name="x" className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Preview. The img renders the very SVG that gets exported. */}
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={dataUrl} alt={`${card.eyebrow}: ${card.headline}`} className="block w-full" />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-slate-500">Colour</span>
        {THEMES.map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            aria-label={t}
            className={`h-6 w-6 rounded-full border-2 ${theme === t ? 'border-slate-900' : 'border-transparent'}`}
            style={{
              background: { indigo: '#312e81', slate: '#0f172a', amber: '#78350f', green: '#14532d' }[t],
            }}
          />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button onClick={download} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
          <Icon name="download" className="mr-1.5 h-3.5 w-3.5" />Download PNG
        </button>
        <button onClick={share} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
          <Icon name="share" className="mr-1.5 h-3.5 w-3.5" />Share
        </button>
        <button onClick={copyCaption} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
          <Icon name="copy" className="mr-1.5 h-3.5 w-3.5" />Copy caption
        </button>
        {note && <span className="text-sm text-green-700">{note}</span>}
      </div>
    </div>
  );
}
