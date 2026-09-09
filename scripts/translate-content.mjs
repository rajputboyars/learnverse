// Backfill English for content fields that only exist in Hinglish.
//
// Three fields were authored in Hinglish only — a course description, a topic
// description and a concept's daily-life example. lib/content.js now renders
// { english, hinglish } and falls back to the Hinglish text when English is
// missing, so nothing is broken; it is just Hinglish in English mode.
//
// There are over a thousand of them, which is too many to write by hand and
// exactly the kind of job the platform's own AI layer exists for.
//
//   node scripts/translate-content.mjs --dry
//   GEMINI_API_KEY=… node scripts/translate-content.mjs --limit 20
//   GEMINI_API_KEY=… node scripts/translate-content.mjs
//
// Any one of GEMINI_API_KEY, OPENAI_API_KEY or ANTHROPIC_API_KEY works. Without
// --provider the first one set wins, in that order: Gemini first because it has
// a free tier, Anthropic last because it is the one most likely to be sitting in
// the environment for something else. Pass --provider to decide explicitly.
//
//   --dry     report what would be translated, call no model, write nothing
//   --limit   stop after N fields (start small, read the output, then widen)
//   --field   courseDescription | topicDescription | dailyLifeExample
//   --provider gemini | openai | anthropic  (pick one explicitly)
//
// It only ever touches fields that are still plain strings, so it is safe to
// re-run and it can be stopped and resumed at any point.
//
// This is machine translation. Spot-check a sample before trusting the lot —
// the daily-life examples carry deliberate cultural detail that a model can
// flatten, and that detail is the reason the field exists.

import mongoose from 'mongoose';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const envPath = join(ROOT, '.env.local');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

const args = process.argv.slice(2);
const arg = (n) => {
  const i = args.indexOf(`--${n}`);
  return i === -1 ? null : args[i + 1];
};
const DRY = args.includes('--dry');
const LIMIT = Number(arg('limit')) || Infinity;
const ONLY = arg('field');
const PROVIDER = arg('provider');
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set.');
  process.exit(1);
}

/* ── the model call, kept deliberately small ── */
const PROVIDERS = [
  {
    name: 'gemini',
    envKey: 'GEMINI_API_KEY',
    key: () => process.env.GEMINI_API_KEY,
    async call(key, prompt) {
      const res = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.3, maxOutputTokens: 1200 },
          }),
        }
      );
      if (!res.ok) throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 200)}`);
      const body = await res.json();
      return (body.candidates?.[0]?.content?.parts || [])
        .map((p) => p.text || '')
        .join('')
        .trim();
    },
  },
  {
    name: 'openai',
    envKey: 'OPENAI_API_KEY',
    key: () => process.env.OPENAI_API_KEY,
    async call(key, prompt) {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          max_completion_tokens: 1200,
          temperature: 0.3,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      if (!res.ok) throw new Error(`OpenAI ${res.status}: ${(await res.text()).slice(0, 200)}`);
      const body = await res.json();
      return (body.choices?.[0]?.message?.content || '').trim();
    },
  },
  {
    name: 'anthropic',
    envKey: 'ANTHROPIC_API_KEY',
    key: () => process.env.ANTHROPIC_API_KEY,
    async call(key, prompt) {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 1200,
          temperature: 0.3,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      if (!res.ok) throw new Error(`Anthropic ${res.status}: ${(await res.text()).slice(0, 200)}`);
      const body = await res.json();
      return (body.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('').trim();
    },
  },
];

function activeProvider() {
  // --provider is explicit and wins. Without it the first configured provider
  // in PROVIDERS order is used, and that order puts the free tier first — a key
  // left in .env.local should not quietly decide which service gets billed.
  if (PROVIDER) {
    const chosen = PROVIDERS.find((p) => p.name === PROVIDER);
    if (!chosen) {
      console.error(
        `\nUnknown --provider "${PROVIDER}". Options: ${PROVIDERS.map((p) => p.name).join(', ')}.\n`
      );
      process.exit(1);
    }
    if (!chosen.key()) {
      console.error(`\n--provider ${PROVIDER} needs ${chosen.envKey} to be set.\n`);
      process.exit(1);
    }
    return chosen;
  }
  return PROVIDERS.find((p) => p.key()) || null;
}

const PROMPT = (kind, text) =>
  [
    'You are translating content for Learnverse, a programming learning site for developers in India.',
    'The source is Hinglish — Hindi written in Roman script, mixed with English technical terms.',
    '',
    kind === 'dailyLifeExample'
      ? 'This is a "daily-life example": an everyday Indian analogy that explains a technical idea. KEEP the analogy exactly as it is — a dhaba stays a dhaba, a local train stays a local train. Do not swap it for a Western equivalent. The familiarity is the whole point of the field.'
      : 'This is a short description shown on a card or a list.',
    '',
    'Translate it into natural English. Match the length and the tone. Keep every technical term as-is.',
    'Return ONLY the translation — no preamble, no quotes, no notes.',
    '',
    '---',
    text,
    '---',
  ].join('\n');

const loose = () => new mongoose.Schema({}, { strict: false, timestamps: true });
const Course = mongoose.models.Course || mongoose.model('Course', loose());
const Topic = mongoose.models.Topic || mongoose.model('Topic', loose());
const Concept = mongoose.models.Concept || mongoose.model('Concept', loose());

const TARGETS = [
  { id: 'courseDescription', Model: Course, field: 'description', label: 'course descriptions' },
  { id: 'topicDescription', Model: Topic, field: 'description', label: 'topic descriptions' },
  { id: 'dailyLifeExample', Model: Concept, field: 'dailyLifeExample', label: 'daily-life examples' },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 });

  const provider = activeProvider();
  if (!DRY && !provider) {
    console.error(
      '\nNo provider key found. Set GEMINI_API_KEY, OPENAI_API_KEY or ANTHROPIC_API_KEY,\n' +
        'pick one with --provider, or run with --dry.\n'
    );
    await mongoose.disconnect();
    process.exit(1);
  }

  let done = 0;
  let failed = 0;

  for (const target of TARGETS) {
    if (ONLY && ONLY !== target.id) continue;

    // Only plain strings need work; anything already an object is translated.
    const pending = await target.Model.find({ [target.field]: { $type: 'string', $ne: '' } })
      .select(`_id title slug ${target.field}`)
      .lean();

    console.log(`\n${target.label}: ${pending.length} still Hinglish-only`);
    if (DRY) {
      pending.slice(0, 3).forEach((d) =>
        console.log(`  e.g. ${String(d[target.field]).slice(0, 70)}…`)
      );
      continue;
    }

    for (const doc of pending) {
      if (done >= LIMIT) break;
      const hinglish = String(doc[target.field]);
      try {
        const english = await provider.call(provider.key(), PROMPT(target.id, hinglish));
        if (!english) throw new Error('empty translation');

        await target.Model.updateOne(
          { _id: doc._id },
          { $set: { [target.field]: { english, hinglish } } }
        );
        done += 1;
        process.stdout.write(`  [${done}] ${(doc.title || doc.slug || doc._id).toString().slice(0, 46)}\n`);
      } catch (err) {
        failed += 1;
        console.error(`  ! ${(doc.title || doc._id).toString().slice(0, 40)} — ${err.message}`);
        // A rate limit should slow us down, not kill the run.
        await sleep(2000);
      }
      await sleep(250); // be polite to the provider
    }
    if (done >= LIMIT) break;
  }

  console.log(
    DRY
      ? '\n[dry] nothing was written. Re-run without --dry and with a provider key.'
      : `\nTranslated ${done} fields (${failed} failed). Re-running picks up where this stopped.`
  );
  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
