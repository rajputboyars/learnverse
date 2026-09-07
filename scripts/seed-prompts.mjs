/**
 * Seeds the Prompt Library with the official starter set.
 *
 *   npm run seed:prompts
 *
 * Idempotent: prompts are upserted by slug, so re-running updates the official
 * set without touching community submissions, ratings or save counts.
 */
import mongoose from 'mongoose';
import fs from 'node:fs';
import path from 'node:path';

// Same .env.local loading the other scripts rely on.
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim();
  }
}

const PromptSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const Prompt = mongoose.models.Prompt || mongoose.model('Prompt', PromptSchema);

const PROMPTS = [
  {
    slug: 'explain-this-error',
    title: 'Explain this error like I am new',
    description: 'Turn a stack trace into a cause, a fix, and how to avoid it next time.',
    category: 'programming',
    difficulty: 'beginner',
    tags: ['debugging', 'errors'],
    content: `I am working in {{language}} and hit this error:

{{error}}

Explain it to someone fairly new to {{language}}:
1. What the error actually means, in plain words.
2. The most likely cause in code like mine.
3. Two other causes worth checking.
4. A concrete fix, with a code example.
5. How to avoid it next time.

Skip the disclaimers. If you need to see more of my code to be sure, say exactly which part.`,
    expectedResult: 'A plain-language cause, a concrete fix with code, and one prevention tip.',
  },
  {
    slug: 'review-my-code-like-a-senior',
    title: 'Review my code like a senior would',
    description: 'A blunt, prioritised review — correctness first, style last.',
    category: 'programming',
    difficulty: 'intermediate',
    tags: ['code-review', 'quality'],
    content: `Review this {{language}} code the way a senior engineer would in a pull request.

\`\`\`
{{code}}
\`\`\`

Rules for your review:
- Lead with correctness bugs. If there are none, say so plainly instead of inventing some.
- Then performance issues that would actually matter at realistic scale.
- Then readability and naming.
- Style nits last, and only if they matter.

For each point: what is wrong, why it matters, and the corrected code. Do not rewrite the whole file unless the structure itself is the problem.`,
    expectedResult: 'A prioritised list of real issues with corrected snippets.',
  },
  {
    slug: 'interview-answer-builder',
    title: 'Turn a topic into an interview answer',
    description: 'A structured, speakable answer plus the follow-ups you will get.',
    category: 'interview',
    difficulty: 'intermediate',
    tags: ['interview', 'preparation'],
    content: `I have an interview for a {{role}} role and need to be able to answer questions on {{topic}}.

Give me:
1. A 60-second spoken answer — how I would actually say it out loud, not how a textbook writes it.
2. The one-sentence version, for when the interviewer wants it short.
3. A concrete example I could give from real project work.
4. The three follow-up questions an interviewer is most likely to ask next, with brief answers.
5. The mistake candidates most often make on this topic.

Assume {{experience}} of experience. Keep it honest — no filler confidence.`,
    expectedResult: 'A speakable answer, a short version, an example, and likely follow-ups.',
  },
  {
    slug: 'debug-with-me-socratic',
    title: 'Debug with me, do not fix it for me',
    description: 'Guides you to the bug with questions instead of handing over the answer.',
    category: 'programming',
    difficulty: 'intermediate',
    tags: ['debugging', 'learning'],
    content: `I am debugging this problem and I want to find it myself — do not give me the answer.

What I expect: {{expected}}
What actually happens: {{actual}}
Relevant code:

\`\`\`
{{code}}
\`\`\`

Ask me one diagnostic question at a time. After each answer, tell me what it rules in or out, then ask the next. Only if I say "just tell me" should you give the fix.`,
    expectedResult: 'One question at a time, narrowing towards the cause.',
  },
  {
    slug: 'learn-by-building',
    title: 'Teach me by making me build',
    description: 'A build-first path through a topic, with checkpoints rather than lectures.',
    category: 'learning',
    difficulty: 'beginner',
    tags: ['projects', 'practice'],
    content: `I want to learn {{topic}} by building rather than reading. I have {{time}} a week and I am at {{level}} level.

Design a build-first path:
- Five projects, each slightly harder than the last.
- For each: what it teaches, what to build, roughly how long, and the one thing that will trip me up.
- What to read only when I get stuck on that project, not before.
- A checkpoint per project: a concrete thing I should be able to do afterwards.

No "learn the fundamentals first" preamble — work the fundamentals into the projects.`,
    expectedResult: 'Five escalating projects with checkpoints and just-in-time reading.',
  },
  {
    slug: 'explain-like-two-levels',
    title: 'Explain it at two levels at once',
    description: 'The simple version and the real version, side by side.',
    category: 'learning',
    difficulty: 'beginner',
    tags: ['explanation', 'depth'],
    content: `Explain {{topic}} twice.

First: the version you would give someone on their first week of programming. Plain words, one everyday analogy, no jargon.

Then: the version you would give an engineer who needs to reason about it properly — the mechanism, the edge cases, and where the simple version breaks down.

Finish with one sentence naming exactly what the simple version left out.`,
    expectedResult: 'A beginner explanation, a real one, and what the simple version hides.',
  },
  {
    slug: 'compare-two-approaches',
    title: 'Compare two approaches honestly',
    description: 'A decision-focused comparison that commits to a recommendation.',
    category: 'analysis',
    difficulty: 'intermediate',
    tags: ['decisions', 'architecture'],
    content: `I am deciding between {{optionA}} and {{optionB}} for {{context}}.

Compare them on the criteria that actually decide this kind of choice — not a generic feature table. For each criterion say which one wins and by how much.

Then:
- When {{optionA}} is clearly right.
- When {{optionB}} is clearly right.
- What people usually get wrong about this choice.
- Your recommendation for my case, and what would change your mind.

Commit to a recommendation. "It depends" without saying what it depends on is not an answer.`,
    expectedResult: 'A criteria comparison and a committed recommendation.',
  },
  {
    slug: 'weekly-learning-review',
    title: 'Weekly learning review',
    description: 'Turn a messy week of learning into what stuck and what to do next.',
    category: 'productivity',
    difficulty: 'beginner',
    tags: ['reflection', 'consistency'],
    content: `Here is what I did this week:

{{activity}}

Help me review it:
1. What I actually learned, as opposed to what I merely read.
2. Which of it I probably cannot explain yet, and how to test that quickly.
3. What I avoided, and whether that avoidance is reasonable.
4. Three things for next week — one to finish, one to start, one to drop.

Be direct. I want an honest read, not encouragement.`,
    expectedResult: 'An honest read on the week and three concrete next actions.',
  },
  {
    slug: 'research-a-topic-properly',
    title: 'Research a topic properly',
    description: 'A structured briefing with what is settled, what is disputed, and what to read.',
    category: 'research',
    difficulty: 'intermediate',
    tags: ['research', 'briefing'],
    content: `Brief me on {{topic}} as if I have to make a decision about it this week.

Structure:
1. The 5-line version.
2. What is genuinely settled and widely agreed.
3. What is actively disputed, and who takes which side.
4. What changed most recently, and how confident you are about it.
5. The three things worth reading, and why each one.
6. What you are uncertain about in this answer.

Where you are estimating rather than recalling, say so explicitly.`,
    expectedResult: 'A briefing that separates settled fact from open dispute.',
  },
  {
    slug: 'rewrite-my-resume-bullet',
    title: 'Rewrite a resume bullet so it lands',
    description: 'Turns a vague responsibility into a specific, believable achievement.',
    category: 'career',
    difficulty: 'beginner',
    tags: ['resume', 'career'],
    content: `Rewrite this resume bullet so a hiring manager would stop on it:

{{bullet}}

Context: I was a {{role}} and the real impact was {{impact}}.

Give me three versions — one impact-led, one skill-led, one scope-led. Each under 25 words, in past tense, with a concrete number only where I actually gave you one. Do not invent metrics.

Then tell me which one you would use and why, and what extra detail from me would make it stronger.`,
    expectedResult: 'Three tightened versions, no invented numbers, and a recommendation.',
  },
  {
    slug: 'first-principles-check',
    title: 'Check whether I actually understand it',
    description: 'Quizzes you until it finds the gap, then explains only that.',
    category: 'learning',
    difficulty: 'intermediate',
    tags: ['self-testing', 'recall'],
    content: `I think I understand {{topic}}. Test whether I actually do.

Ask me five questions, one at a time, getting progressively harder. Start with recall and end with something that requires applying it to a situation I have not seen.

After each answer, tell me briefly whether it was right and what was missing — then ask the next.

At the end: name the specific gap in my understanding and explain only that part. Do not re-teach what I already got right.`,
    expectedResult: 'Five escalating questions, then a targeted explanation of the gap.',
  },
  {
    slug: 'linkedin-post-from-learning',
    title: 'LinkedIn post that does not sound like AI',
    description: 'A specific, human post about something you actually learned.',
    category: 'social',
    difficulty: 'beginner',
    tags: ['linkedin', 'writing'],
    content: `Write a LinkedIn post about something I learned: {{topic}}.

What I actually did: {{detail}}

Rules:
- Open with a specific line, not a rhetorical question.
- Say what I got wrong before I got it right.
- One practical takeaway a reader can use today.
- Short paragraphs, blank lines between them.
- No "game-changer", no "excited to share", no emoji walls, no three-word sentences for drama.
- End with a real question, not engagement bait.
- Five hashtags at most.

Write it in first person, in a normal human voice. If what I gave you is too thin to make a good post, tell me what to add instead of padding it.`,
    expectedResult: 'A specific, human-sounding post you would actually publish.',
  },
];

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not set. Add it to .env.local first.');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected. Seeding official prompts…');

  let created = 0;
  let updated = 0;

  for (const p of PROMPTS) {
    const existing = await Prompt.findOne({ slug: p.slug }).lean();
    await Prompt.updateOne(
      { slug: p.slug },
      {
        $set: {
          ...p,
          providers: ['any'],
          origin: 'official',
          authorName: 'Learnverse',
          status: 'verified',
          reviewedAt: new Date(),
        },
        // Counters belong to the community, not the seed — never reset them.
        $setOnInsert: { usageCount: 0, saveCount: 0, ratingSum: 0, ratingCount: 0, reportCount: 0 },
      },
      { upsert: true }
    );
    if (existing) updated += 1;
    else created += 1;
  }

  console.log(`Done. ${created} created, ${updated} updated.`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
