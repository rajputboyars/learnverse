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
//   --rpm     requests per minute (default 10, sized for the Gemini free tier)
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
// Requests per minute. The Gemini free tier is the binding constraint: at the
// old four-a-second pace almost every call came back 429.
const RPM = Number(arg('rpm')) || 10;
const GAP = Math.ceil(60000 / RPM);
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set.');
  process.exit(1);
}

// Free-tier quota is per model per day, so the script works down this list as
// each allowance runs out. Aliases before pinned ids, because Google retires
// the numbered ones.
const GEMINI_MODELS = [
  'gemini-flash-latest',
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3-flash-preview',
  'gemini-3.1-flash-lite-preview',
];
let geminiModel = 0;

/* ── the model call, kept deliberately small ── */
const PROVIDERS = [
  {
    name: 'gemini',
    envKey: 'GEMINI_API_KEY',
    key: () => process.env.GEMINI_API_KEY,
    async call(key, prompt) {
      // The free tier allows only ~20 requests per DAY per model, and the
      // quota is scoped per model — so when one runs out, moving to the next
      // buys another allowance. Aliases first: Google retires numbered ids.
      while (geminiModel < GEMINI_MODELS.length) {
        const model = GEMINI_MODELS[geminiModel];
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 1200,
                // Thinking tokens come out of maxOutputTokens; on a one-line
                // translation they consume all of it and the reply is empty.
                thinkingConfig: { thinkingBudget: 0 },
              },
            }),
          }
        );

        if (res.ok) {
          const body = await res.json();
          return (body.candidates?.[0]?.content?.parts || [])
            .map((x) => x.text || '')
            .join('')
            .trim();
        }

        const raw = await res.text();
        let parsed = {};
        try {
          parsed = JSON.parse(raw);
        } catch {}
        const violations = (parsed.error?.details || []).flatMap((d) => d.violations || []);
        const perDay = violations.some((v) => /PerDay/i.test(v.quotaId || ""));

        // Out of requests for today on this model, or the model is gone:
        // retire it and try the next one. Anything else is the caller’s to
        // handle (a per-minute 429 is retried further up).
        if (perDay || res.status === 404 || res.status === 400) {
          console.log(
            `      (${model} unavailable: ${perDay ? "daily quota spent" : res.status}, trying next model)`
          );
          geminiModel += 1;
          continue;
        }
        throw new Error(`Gemini ${res.status}: ${raw.slice(0, 200)}`);
      }
      throw new Error('GEMINI_EXHAUSTED');
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

  if (!DRY) console.log(`Using ${provider.name} at ~${RPM} requests/minute.`);

  let exhausted = false;
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
        let english = '';
        // 429 (free-tier rate limit) and 503 (model busy) are both temporary.
        // Back off and retry rather than burning the field.
        for (let attempt = 1; attempt <= 5; attempt += 1) {
          try {
            english = await provider.call(provider.key(), PROMPT(target.id, hinglish));
            if (english) break;
            throw new Error('empty translation');
          } catch (err) {
            const retryable = /(429|500|502|503|504)/.test(err.message);
            if (!retryable || attempt === 5) throw err;
            // A 429 is a per-minute quota, so a few seconds achieves
            // nothing — wait out the window instead.
            const rateLimited = err.message.includes('429');
            await sleep(rateLimited ? attempt * 20000 : attempt * 4000);
          }
        }
        if (!english) throw new Error('empty translation');

        await target.Model.updateOne(
          { _id: doc._id },
          { $set: { [target.field]: { english, hinglish } } }
        );
        done += 1;
        process.stdout.write(`  [${done}] ${(doc.title || doc.slug || doc._id).toString().slice(0, 46)}\n`);
      } catch (err) {
        if (err.message === 'GEMINI_EXHAUSTED') {
          exhausted = true;
          break;
        }
        failed += 1;
        console.error(`  ! ${(doc.title || doc._id).toString().slice(0, 40)} — ${err.message}`);
        // A rate limit should slow us down, not kill the run.
        await sleep(2000);
      }
      await sleep(GAP); // stay under the provider's per-minute quota
    }
    if (done >= LIMIT || exhausted) break;
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
