export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const course = {
  title: 'Claude Code',
  slug: 'claude-code',
  icon: '🖥️',
  description:
    'Master Claude Code — Anthropic\'s agentic CLI that reads your files, edits code, runs commands, and integrates with git. Learn file operations, MCP servers, CLAUDE.md, slash commands, and autonomous task completion.',
  order: 36,
  level: 'intermediate',
  status: 'published',
  tags: ['claude-code', 'cli', 'agentic-ai', 'developer-tools', 'anthropic'],
  category: 'AI Tools',
};

export const curriculum = [
  // ─────────────────────────────────────────────
  // Topic 1 — What is Claude Code?
  // ─────────────────────────────────────────────
  {
    title: 'Introduction to Claude Code',
    description: 'Understand what Claude Code is, how it differs from claude.ai, and the agentic loop that powers it.',
    level: 'beginner',
    concepts: [
      {
        title: 'What is Claude Code?',
        explanation: {
          english:
            'Claude Code is Anthropic\'s official command-line interface (CLI) for Claude. Unlike claude.ai (a chat interface in your browser), Claude Code runs directly in your terminal alongside your codebase. It can read your files, edit code, run shell commands, execute tests, and interact with git — all autonomously or with your step-by-step approval.\n\nClaude Code is built for software engineers and power users who want Claude to be a true coding partner, not just a chat window. It is the reference implementation of the Claude Agent SDK and is itself open-source.',
          hinglish:
            'Claude Code Anthropic ka CLI tool hai jo terminal mein run hota hai. Ye claude.ai chat se alag hai — ye actual files padh sakta hai, code edit kar sakta hai, shell commands run kar sakta hai, aur git ke saath kaam kar sakta hai. Developers ke liye design kiya gaya hai jo Claude ko real coding partner banana chahte hain.',
        },
        dailyLifeExample:
          'Instead of copy-pasting code snippets into claude.ai, you type `claude "add pagination to the /api/courses endpoint"` in your project directory and Claude reads the relevant files, writes the code, and shows you the diff.',
        codeExample: `# Install Claude Code globally
npm install -g @anthropic-ai/claude-code

# Or use via npx (no install needed)
npx @anthropic-ai/claude-code

# Authenticate (opens browser to get an API key)
claude auth login

# Start an interactive session in your project directory
cd /path/to/your/project
claude

# Or run a one-shot task
claude "explain what this codebase does"
claude "fix the failing tests in src/utils/"
claude "add TypeScript types to all API routes"`,
        keyPoints: [
          'Claude Code is a CLI tool — it runs in your terminal, not a browser.',
          'It can read files, write files, execute commands, and use git.',
          'Built on the Claude Agent SDK — open-source and extensible.',
          'Requires an Anthropic API key (set via `claude auth login`).',
          'Works interactively or as one-shot commands.',
        ],
        quiz: [
          {
            question: 'What is the key difference between Claude Code and claude.ai?',
            options: [
              'Claude Code uses a different AI model',
              'Claude Code runs in the terminal and can access your local files',
              'Claude Code is only for Python projects',
              'Claude Code requires a paid plan to use',
            ],
            correct: 1,
          },
        ],
        tags: ['claude-code', 'cli', 'installation', 'introduction'],
        difficulty: 'easy',
        interviewQuestions: [
          {
            question: 'What makes Claude Code different from using Claude through the web interface?',
            answer: {
              english:
                'Claude Code is a CLI tool that runs directly in your terminal with access to your local filesystem, git history, and shell environment. This means it can read and write actual project files, run test suites, execute build commands, and make git commits — all without manual copy-pasting. The web interface (claude.ai) requires you to copy code in and out manually and has no access to your local environment.',
              hinglish:
                'Claude Code terminal mein run hota hai aur local files, git, aur shell access karta hai. Ye actual code edit kar sakta hai, tests run kar sakta hai, git commits bana sakta hai. Claude.ai mein sab kuch manually copy-paste karna padta hai aur local environment ka access nahi hota.',
            },
            difficulty: 'easy',
            frequency: 'common',
          },
        ],
      },
      {
        title: 'The Agentic Loop',
        explanation: {
          english:
            'Claude Code operates in an agentic loop — a cycle of perception, reasoning, and action:\n\n1. **Perceive**: Claude reads the task (your prompt) and gathers context (reads files, runs `git log`, etc.)\n2. **Reason**: Claude thinks about the best approach, considering the codebase structure and constraints.\n3. **Act**: Claude takes an action — edits a file, runs a command, reads more files.\n4. **Observe**: Claude reads the result of the action (output of a command, updated file content).\n5. **Loop**: Steps 2–4 repeat until the task is complete.\n\nBy default, Claude Code asks your permission before taking potentially destructive actions (writing files, running commands, pushing to git). You can set the permission level with `--dangerously-skip-permissions` for fully autonomous operation, but use this carefully.',
          hinglish:
            'Claude Code ek loop mein kaam karta hai: perceive (task padhna, files read karna) → reason (best approach sochna) → act (file edit karna, command run karna) → observe (result dekhna) → phir se reason. Default mein destructive actions pe permission maangta hai. Fully autonomous ke liye `--dangerously-skip-permissions` use kar sakte ho.',
        },
        dailyLifeExample:
          'You say "fix the broken tests". Claude reads the test file (perceive), identifies the failing assertion (reason), edits the function (act), runs the tests again (act+observe), sees one still fails, reads the error, makes another edit, runs again — until green.',
        codeExample: `# Example of Claude Code's agentic loop in action:
# User prompt: "Add input validation to the signup API route"

# Step 1 — Claude reads relevant files:
# > Reading src/app/api/auth/signup/route.js
# > Reading src/models/User.js
# > Reading src/lib/validation.js (if it exists)

# Step 2 — Claude reasons about what validation to add
# (thinking: email format, password length, username uniqueness)

# Step 3 — Claude edits the file (shows diff, asks permission)
# + import { z } from 'zod';
# + const signupSchema = z.object({
# +   email: z.string().email(),
# +   password: z.string().min(8),
# +   name: z.string().min(2).max(50),
# + });

# Step 4 — Claude runs tests to verify
# > Running: npm test -- --testPathPattern=signup

# Step 5 — Claude observes: 2 tests pass, 1 fails
# > Claude reads the error, adjusts the fix, re-runs

# Step 6 — All tests pass → task complete`,
        keyPoints: [
          'Agentic loop: perceive → reason → act → observe → repeat.',
          'Claude reads files and runs commands to gather context autonomously.',
          'Shows diffs and asks permission before file edits (by default).',
          'Loop continues until the task is complete or Claude is stuck.',
          'Use --dangerously-skip-permissions for fully autonomous operation.',
        ],
        quiz: [
          {
            question: 'What happens in the "observe" step of Claude Code\'s agentic loop?',
            options: [
              'Claude asks the user for input',
              'Claude reads the result of its last action (e.g. command output or file content)',
              'Claude generates the final summary',
              'Claude commits to git',
            ],
            correct: 1,
          },
        ],
        tags: ['agentic-loop', 'perception', 'action', 'autonomous'],
        difficulty: 'medium',
        interviewQuestions: [
          {
            question: 'Explain the agentic loop in Claude Code.',
            answer: {
              english:
                'The agentic loop is the core execution pattern: (1) Perceive — Claude reads the task and gathers context by reading files, running git commands, etc. (2) Reason — Claude plans the approach. (3) Act — Claude performs an action: editing a file, running a shell command, or reading more files. (4) Observe — Claude reads the result. Steps 2–4 repeat until the task is done. This makes Claude Code genuinely autonomous for multi-step software tasks.',
              hinglish:
                'Agentic loop ka pattern hai: (1) Perceive — task padhna, files read karna. (2) Reason — approach plan karna. (3) Act — file edit karna, command run karna. (4) Observe — result dekhna. Steps 2-4 tab tak repeat hote hain jab task complete na ho. Isse Claude Code multi-step software tasks genuinely autonomous tarike se kar sakta hai.',
            },
            difficulty: 'medium',
            frequency: 'common',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Topic 2 — Core Capabilities
  // ─────────────────────────────────────────────
  {
    title: 'File Operations and Git Integration',
    description: 'Learn how Claude Code reads, writes, and edits files with precision, and how it integrates with git.',
    level: 'intermediate',
    concepts: [
      {
        title: 'Reading, Editing, and Writing Files',
        explanation: {
          english:
            'Claude Code has three file-related capabilities:\n\n**Read** — Claude reads files to understand context before acting. It reads only what\'s needed (not the whole codebase blindly). Triggered by "look at", "explain", "understand".\n\n**Edit** — Claude makes precise, targeted edits to existing files. It shows a diff (old vs new) and asks your permission before applying. This is the most common operation — Claude changes only what needs to change.\n\n**Write** — Claude creates new files. Used for new components, test files, config files. Also asks permission before creating.\n\nClaude Code uses smart context selection — it uses grep, file structure analysis, and import tracing to find the right files rather than reading everything. This keeps context window usage efficient.',
          hinglish:
            'Claude Code teen file operations karta hai:\n- Read: context samajhne ke liye relevant files padhna.\n- Edit: existing files mein precise changes karna (diff dikhata hai, permission maangta hai).\n- Write: naye files banana.\n\nClaude sirf relevant files padhta hai — grep aur import tracing se sahi files dhundhta hai, puri codebase nahi padhta.',
        },
        dailyLifeExample:
          '"Refactor the getUserById function to use async/await instead of callbacks." Claude finds the file, shows exactly which lines change, you approve, done. It doesn\'t rewrite the whole file.',
        codeExample: `# Ask Claude to read and explain
claude "explain how authentication works in this codebase"
# Claude traces: NextAuth config → User model → API routes → middleware

# Ask Claude to edit an existing file
claude "add rate limiting to the /api/auth/signin route"
# Claude shows diff:
# src/app/api/auth/signin/route.js
# + import { rateLimit } from '@/lib/rate-limit';
# + const limiter = rateLimit({ interval: 60_000, uniqueTokenPerInterval: 500 });
#
#   export async function POST(req) {
# +   await limiter.check(req, 10); // 10 requests per minute per IP
#     // ... existing code unchanged

# Ask Claude to create a new file
claude "create a Zod validation schema for the course creation form"
# Claude creates: src/lib/schemas/course.ts

# Multi-file task
claude "add JSDoc comments to all exported functions in src/lib/"
# Claude reads all files in src/lib/, edits only functions missing JSDoc`,
        keyPoints: [
          'Read → Edit → Write are Claude\'s three file operations.',
          'Edit shows a diff and asks permission before changing files.',
          'Claude uses grep and import tracing to find relevant files efficiently.',
          'Only changed lines are shown — Claude doesn\'t rewrite whole files.',
          'Permission prompts can be bypassed with --dangerously-skip-permissions.',
        ],
        quiz: [
          {
            question: 'What does Claude Code show before applying a file edit?',
            options: [
              'A full file preview',
              'A diff of old vs new content, with a permission prompt',
              'A list of all modified files in the project',
              'Nothing — it applies edits immediately',
            ],
            correct: 1,
          },
        ],
        tags: ['file-operations', 'read', 'edit', 'write', 'diff'],
        difficulty: 'easy',
        interviewQuestions: [
          {
            question: 'How does Claude Code find the right files to edit in a large codebase?',
            answer: {
              english:
                'Claude Code uses a combination of techniques: grep-style text search for relevant symbols or patterns, file structure analysis (reading package.json, tsconfig.json, etc.), import/require tracing to follow code dependencies, and git history for recently changed files. This lets it target only the relevant files rather than reading the entire codebase into context.',
              hinglish:
                'Claude Code grep-style search, file structure analysis (package.json, tsconfig.json), import tracing, aur git history use karta hai relevant files dhundhne ke liye. Isse puri codebase padhne ki zaroorat nahi hoti — sirf relevant files padh ke efficient rehta hai.',
            },
            difficulty: 'medium',
            frequency: 'common',
          },
        ],
      },
      {
        title: 'Terminal and Shell Command Execution',
        explanation: {
          english:
            'Claude Code can run shell commands in your terminal. This enables:\n- Running test suites (`npm test`, `pytest`, `cargo test`)\n- Installing dependencies (`npm install`, `pip install`)\n- Starting and stopping dev servers\n- Running linters and formatters (`eslint`, `prettier`, `black`)\n- Executing build commands (`npm run build`, `next build`)\n- Querying databases (`mongosh`, `psql`)\n\nBy default, Claude will ask permission before running commands. Claude shows the exact command it wants to run and you approve or deny it. In auto-approve mode, commands run automatically.\n\nClaude reads stdout/stderr output and incorporates it into its reasoning — if a command fails, Claude diagnoses the error and tries to fix it.',
          hinglish:
            'Claude Code shell commands run kar sakta hai: tests, npm install, linters, build commands, database queries. Default mein permission maangta hai command dikhake. Command ka output Claude read karta hai — agar fail ho toh error diagnose karke fix karne ki koshish karta hai.',
        },
        dailyLifeExample:
          '"Run the full test suite and fix any failing tests." Claude runs `npm test`, sees 3 failures, reads the error output, fixes each file, re-runs until all pass.',
        codeExample: `# Claude runs commands as part of task completion

# Example session:
# User: "Install and configure ESLint for this project"
#
# Claude runs:
# > npm install --save-dev eslint @eslint/js
# > npx eslint --init
# Claude reads the prompts and answers them based on your tech stack
# > Claude creates .eslintrc.json with appropriate rules
# > Claude runs: npx eslint src/ --fix
# > Reads output: "12 problems (0 errors, 12 warnings)"
# > Claude adjusts config, re-runs until clean

# Example: database seed
# User: "Seed the database with test data"
# Claude runs: node scripts/seed.mjs
# Reads output, reports success or diagnoses errors

# Commands Claude will typically ask permission for:
# - npm install (modifies node_modules)
# - git push (affects remote)
# - rm -rf (destructive)
# - Database operations

# Commands Claude typically runs without asking:
# - npm test (read-only observation)
# - git status / git diff (read-only)
# - cat / head / grep (read-only)`,
        keyPoints: [
          'Claude can run any shell command available in your terminal.',
          'It reads stdout/stderr and uses it to diagnose errors.',
          'Default: asks permission for potentially destructive commands.',
          'Read-only commands (git status, npm test) usually run without prompting.',
          'Claude will retry and fix based on command output.',
        ],
        quiz: [
          {
            question: 'What does Claude do when a shell command it runs returns an error?',
            options: [
              'It stops and reports failure',
              'It reads the error output and tries to diagnose and fix the issue',
              'It retries the same command indefinitely',
              'It asks the user to fix it manually',
            ],
            correct: 1,
          },
        ],
        tags: ['shell', 'terminal', 'commands', 'testing', 'npm'],
        difficulty: 'easy',
        interviewQuestions: [
          {
            question: 'How does Claude Code handle failing shell commands?',
            answer: {
              english:
                'When a command fails, Claude reads the stderr/stdout output as part of its observation step. It then reasons about the cause of the failure, potentially reads relevant files for more context, and takes corrective action — editing code, installing missing dependencies, or adjusting configuration. The loop continues until the command succeeds or Claude determines the issue is outside its scope.',
              hinglish:
                'Jab command fail hoti hai, Claude stderr/stdout output padhta hai (observation step). Phir failure ka cause reason karta hai, relevant files padhta hai, aur corrective action leta hai — code edit karna, dependencies install karna, ya config adjust karna. Loop tab tak chalta hai jab tak command succeed na ho.',
            },
            difficulty: 'medium',
            frequency: 'common',
          },
        ],
      },
      {
        title: 'Git Integration',
        explanation: {
          english:
            'Claude Code has deep git integration:\n\n**Reading git context**: Claude runs `git log`, `git diff`, `git status`, and `git blame` to understand what changed recently and who wrote what.\n\n**Staging and committing**: Claude can `git add` specific files and `git commit` with descriptive messages.\n\n**Branch management**: Claude can create branches, switch branches, and merge.\n\n**PR workflow**: Claude can push branches and — when configured with GitHub MCP — create pull requests, respond to review comments, and fix CI failures.\n\nClaude follows safe git practices by default: it never force-pushes, always commits to the current branch, and shows what it plans to commit before doing so.',
          hinglish:
            'Claude Code git ke saath deeply integrated hai: git log/diff/status/blame padh sakta hai, files stage kar sakta hai, commits bana sakta hai descriptive messages ke saath, branches manage kar sakta hai, aur PR workflow ke liye GitHub MCP ke saath kaam kar sakta hai. Default mein safe practices follow karta hai — no force push.',
        },
        dailyLifeExample:
          '"Commit all changes with a descriptive message." Claude runs `git diff` to see what changed, groups related changes into logical commits, writes meaningful commit messages (not "fix stuff"), and commits.',
        codeExample: `# Claude's git workflow in action:

# 1. Understanding git context
# claude "what changed in the last 3 commits?"
# Claude runs: git log --oneline -3
# git diff HEAD~3..HEAD -- src/
# Summarises changes in plain English

# 2. Creating a commit
# claude "commit the authentication changes"
# Claude runs: git status
# git diff --staged
# git add src/app/api/auth/ src/middleware.js
# git commit -m "feat(auth): add rate limiting and JWT refresh"

# 3. Branch workflow
# claude "create a feature branch for the new dashboard and start implementing it"
# Claude runs: git checkout -b feat/new-dashboard
# Then begins editing files for the feature

# 4. PR-ready workflow
# claude "prepare this feature for review"
# Claude: checks git log, writes comprehensive commit messages,
# ensures tests pass, pushes branch

# 5. Fixing merge conflicts
# claude "resolve the merge conflicts in src/models/"
# Claude reads both versions, understands intent, resolves intelligently`,
        keyPoints: [
          'Claude reads git log, diff, status, and blame for context.',
          'Commits with descriptive, conventional commit messages.',
          'Creates feature branches on request.',
          'Never force-pushes without explicit user instruction.',
          'Integrates with GitHub via MCP for PR workflows.',
        ],
        quiz: [
          {
            question: 'What git information does Claude read to understand recent changes?',
            options: [
              'Only git status',
              'git log, git diff, git status, and git blame',
              'Only the current branch name',
              'Claude does not read git information',
            ],
            correct: 1,
          },
        ],
        tags: ['git', 'commits', 'branches', 'pr', 'version-control'],
        difficulty: 'medium',
        interviewQuestions: [
          {
            question: 'How does Claude Code integrate with git workflows?',
            answer: {
              english:
                'Claude Code can run any git command. It reads git log, diff, status, and blame to understand codebase history and current state. It can stage files, create commits with descriptive messages, create and switch branches, and resolve merge conflicts. With GitHub MCP integration, it can push branches, create pull requests, respond to review comments, and fix CI failures autonomously.',
              hinglish:
                'Claude Code koi bhi git command run kar sakta hai. Git log, diff, status, blame se history samajhta hai. Files stage karna, commits banana, branches manage karna, merge conflicts resolve karna — sab kar sakta hai. GitHub MCP ke saath PR banana, review comments respond karna, CI fixes bhi autonomous tarike se kar sakta hai.',
            },
            difficulty: 'medium',
            frequency: 'common',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Topic 3 — Configuration & Advanced Usage
  // ─────────────────────────────────────────────
  {
    title: 'Configuration, MCP, and Advanced Usage',
    description: 'Master CLAUDE.md, slash commands, MCP servers, and permission modes for production-grade Claude Code usage.',
    level: 'intermediate',
    concepts: [
      {
        title: 'CLAUDE.md — Project Instructions',
        explanation: {
          english:
            'CLAUDE.md is a Markdown file you place in your project root (or any directory). Claude Code reads it automatically at the start of every session. Use it to give Claude persistent context about your project:\n\n- **Tech stack**: "This is a Next.js 16 app with MongoDB, NextAuth v5, Tailwind CSS"\n- **Coding conventions**: "Use TypeScript. No `any` types. Prefer async/await over callbacks."\n- **Architecture rules**: "API routes go in src/app/api/. Models go in src/models/."\n- **Commands**: "Run `npm run dev` to start. Run `npm test` to test."\n- **Off-limits areas**: "Never edit node_modules. Never commit .env.local."\n\nCLAUDE.md is checked into git — everyone on the team benefits from the same Claude context. Sub-directories can have their own CLAUDE.md files for component-specific instructions.',
          hinglish:
            'CLAUDE.md ek Markdown file hai jo project root mein rakho. Claude Code har session mein automatically ye file padhta hai. Isme likho: tech stack, coding conventions, architecture rules, commands, off-limits areas. Git mein check in hota hai isliye team ke sabhi members ko same Claude context milta hai.',
        },
        dailyLifeExample:
          'Your CLAUDE.md says "all database calls must use try/catch" — now every time Claude edits a route file, it automatically adds error handling without being told.',
        codeExample: `# Example CLAUDE.md for a Next.js project

# Learnverse — Developer Guide for Claude

## Stack
- Next.js 16.2.7 (App Router, not Pages Router)
- MongoDB + Mongoose (ODM)
- NextAuth v5 (authentication)
- Tailwind CSS (styling)
- Node.js 20

## Project Structure
- src/app/ — Next.js App Router pages and API routes
- src/models/ — Mongoose models
- src/lib/ — shared utilities (db.js, auth.js, etc.)
- scripts/ — standalone Node.js scripts (seed, migrate)

## Coding Rules
- TypeScript preferred. Use .ts/.tsx extensions for new files.
- No \`any\` type. Use proper Mongoose typings.
- All API routes must: validate input, handle errors with try/catch, return proper status codes.
- Prefer server components. Add 'use client' only when necessary.

## Commands
- Dev server: npm run dev (port 3000)
- Tests: npm test
- Database seed: npm run seed
- Lint: npm run lint

## Off-limits
- NEVER commit .env.local — it contains live production credentials.
- NEVER edit files in node_modules.
- NEVER use git push --force without explicit permission.`,
        keyPoints: [
          'CLAUDE.md is read automatically at the start of every Claude Code session.',
          'Place it in the project root for global rules; sub-dirs for local rules.',
          'Check it into git so the whole team benefits.',
          'Include: stack, conventions, architecture, commands, off-limits areas.',
          'Eliminates the need to repeat context in every chat.',
        ],
        quiz: [
          {
            question: 'When does Claude Code read CLAUDE.md?',
            options: [
              'Only when you explicitly say "read CLAUDE.md"',
              'Automatically at the start of every session',
              'Only on the first run ever',
              'Never — it must be imported manually',
            ],
            correct: 1,
          },
        ],
        tags: ['claude-md', 'configuration', 'project-instructions', 'conventions'],
        difficulty: 'easy',
        interviewQuestions: [
          {
            question: 'What is CLAUDE.md and why is it important for team workflows?',
            answer: {
              english:
                'CLAUDE.md is a Markdown configuration file that Claude Code reads automatically at the start of every session. It contains project-specific instructions: tech stack, coding conventions, architectural rules, common commands, and off-limits areas. Because it\'s checked into git, every team member gets the same Claude context without copy-pasting instructions into every chat.',
              hinglish:
                'CLAUDE.md ek Markdown file hai jo Claude Code automatically har session mein padhta hai. Isme project-specific instructions hoti hain: tech stack, coding conventions, architecture rules, commands. Git mein check in hone se puri team ko same Claude context milta hai bina baar baar repeat kiye.',
            },
            difficulty: 'easy',
            frequency: 'very-common',
          },
        ],
      },
      {
        title: 'Slash Commands',
        explanation: {
          english:
            'Slash commands are shortcuts within a Claude Code session. Built-in commands:\n\n- **/help** — show available commands and usage\n- **/clear** — clear the current conversation context\n- **/compact** — compress conversation history to save context tokens\n- **/memory** — show what Claude knows about the project (from CLAUDE.md and session)\n- **/cost** — show token usage and API cost for the current session\n- **/model** — switch the underlying Claude model mid-session\n- **/bug** — report a Claude Code bug to Anthropic\n- **/review** — trigger a structured code review of staged changes\n- **/pr-comments** — fetch and respond to GitHub PR review comments\n\nYou can also define **custom slash commands** in `.claude/commands/` as Markdown files. Each file becomes a slash command: `/your-command-name`.',
          hinglish:
            'Slash commands Claude Code session mein shortcuts hain. /help, /clear, /compact, /cost, /model — built-in hain. Custom commands `.claude/commands/` mein Markdown files ke roop mein define kar sakte ho. Har file ek slash command ban jaati hai.',
        },
        dailyLifeExample:
          'You\'re midway through a long debugging session. Type `/compact` to compress the history (saving tokens), then `/cost` to see you\'ve spent $0.12 so far.',
        codeExample: `# Built-in slash commands

/help                    # Show all available commands
/clear                   # Start fresh context
/compact                 # Compress history to save tokens
/cost                    # Show session token usage + cost
/model claude-opus-4-8   # Switch to Opus for a hard problem
/memory                  # Show Claude's project knowledge

# ── Custom slash commands ──
# Create file: .claude/commands/review-pr.md
# Content:
# ---
# Review the git diff of staged changes for:
# 1. Security vulnerabilities (SQL injection, XSS, auth bypass)
# 2. Performance regressions
# 3. Missing error handling
# 4. Violations of our coding conventions from CLAUDE.md
# Return findings as a structured list with severity ratings.
# ---

# Now in Claude Code, type:
/review-pr    # Claude runs the full review template

# Another custom command: .claude/commands/deploy-check.md
# Checks all pre-deployment requirements before pushing to production`,
        keyPoints: [
          '/clear, /compact, /cost, /model are the most-used built-ins.',
          '/compact reduces context size without losing important information.',
          'Custom commands go in .claude/commands/ as Markdown files.',
          'Custom commands enable reusable, team-wide prompt templates.',
          '/cost helps you track API spend during a session.',
        ],
        quiz: [
          {
            question: 'What does the /compact slash command do?',
            options: [
              'Compresses source code files',
              'Compresses the conversation history to reduce token usage',
              'Creates a compressed build of the project',
              'Removes comments from code files',
            ],
            correct: 1,
          },
        ],
        tags: ['slash-commands', 'shortcuts', 'custom-commands', 'session'],
        difficulty: 'easy',
        interviewQuestions: [
          {
            question: 'How do you create custom slash commands in Claude Code?',
            answer: {
              english:
                'Create Markdown files in the `.claude/commands/` directory of your project. Each file\'s name (without the .md extension) becomes a slash command. When triggered, Claude executes the prompt defined in that file as its task. Custom commands are team-shareable since `.claude/` can be committed to git, enabling reusable workflow templates like `/review-pr` or `/deploy-check`.',
              hinglish:
                '`.claude/commands/` directory mein Markdown files banao. File ka naam (bina .md ke) slash command ban jaata hai. Trigger karne pe Claude us file ka prompt execute karta hai. `.claude/` git mein commit ho sakta hai isliye team-shareable workflow templates bana sakte ho.',
            },
            difficulty: 'medium',
            frequency: 'common',
          },
        ],
      },
      {
        title: 'MCP — Model Context Protocol',
        explanation: {
          english:
            'MCP (Model Context Protocol) is an open standard that lets Claude connect to external tools and data sources through a plugin-like interface. Claude Code supports MCP servers that provide:\n\n- **GitHub MCP**: create PRs, read/comment on issues, manage branches — all from Claude\n- **Database MCPs**: query PostgreSQL, MongoDB, or MySQL directly\n- **Filesystem MCPs**: access files outside the current project directory\n- **Browser MCPs**: control a browser for end-to-end testing or web scraping\n- **Slack/Linear/Notion MCPs**: integrate with project management tools\n\nMCP servers are configured in `~/.claude/config.json` (global) or `.claude/config.json` (project-level). Each server runs as a separate process that Claude calls when needed.\n\nThe GitHub MCP (used in this very session) lets Claude read PRs, post comments, trigger CI runs, and create pull requests — making the full dev workflow autonomous.',
          hinglish:
            'MCP (Model Context Protocol) ek open standard hai jo Claude ko external tools se connect karta hai. GitHub MCP se PR banana/read karna, Database MCP se queries karna, Browser MCP se browser control — sab Claude se kar sakte ho. Configuration `~/.claude/config.json` mein hoti hai. GitHub MCP puri dev workflow ko autonomous bana deta hai.',
        },
        dailyLifeExample:
          '"Create a PR for this feature, add a description, and fix any CI failures that come up." Claude uses GitHub MCP to push, create the PR, wait for CI, read the error logs, fix the code, and push again — entirely without you.',
        codeExample: `// ~/.claude/config.json — MCP server configuration
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://localhost/mydb"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/home/user/projects"  // allow access to this directory
      ]
    }
  }
}

// With GitHub MCP configured, Claude can:
// claude "create a PR for the current branch targeting main"
// claude "list open PRs assigned to me"
// claude "fix the failing CI check on PR #42"`,
        keyPoints: [
          'MCP is an open standard for extending Claude with external tools.',
          'Configure MCP servers in ~/.claude/config.json or .claude/config.json.',
          'GitHub MCP enables autonomous PR workflows.',
          'Database MCPs let Claude query production or dev databases.',
          'MCP servers run as separate processes — Claude calls them as tools.',
        ],
        quiz: [
          {
            question: 'What is MCP in the context of Claude Code?',
            options: [
              'A compression algorithm for code',
              'A protocol for connecting Claude to external tools and data sources',
              'A multi-core processing mode',
              'A memory caching protocol',
            ],
            correct: 1,
          },
        ],
        tags: ['mcp', 'model-context-protocol', 'github', 'integrations', 'plugins'],
        difficulty: 'medium',
        interviewQuestions: [
          {
            question: 'What is the Model Context Protocol (MCP) and what problem does it solve?',
            answer: {
              english:
                'MCP is an open standard that defines how Claude connects to external tools and data sources. Without MCP, Claude can only access files and run shell commands. With MCP, it can query databases, interact with GitHub\'s API, control browsers, or talk to any service with an MCP server implementation. It solves the problem of Claude being isolated — MCP makes it a genuinely connected agentic system.',
              hinglish:
                'MCP ek open standard hai jo Claude ko external tools se connect karta hai. Bina MCP ke Claude sirf files aur shell commands access kar sakta tha. MCP ke saath databases query karna, GitHub API use karna, browser control karna — sab possible hai. Claude ko isolated hone ki problem solve karta hai.',
            },
            difficulty: 'medium',
            frequency: 'common',
          },
        ],
      },
      {
        title: 'Permission Modes and Security',
        explanation: {
          english:
            'Claude Code has several permission tiers:\n\n**Default (interactive)**: Claude asks permission before: writing files, running non-trivial commands, making git commits. Read-only operations (file reads, git status) happen automatically.\n\n**Auto-approve (--dangerously-skip-permissions)**: No permission prompts — Claude acts fully autonomously. Use in CI/CD pipelines or when you trust the task completely. High risk: Claude could delete files or make unintended changes.\n\n**Read-only mode**: Claude can only read files and run read-only commands — useful for code review and analysis without risk of modification.\n\n**Sandboxed execution**: Commands can be run inside Docker or a controlled environment to limit blast radius.\n\nSecurity best practices: Never run with auto-approve in production environments. Review diffs before approving file writes. Use .gitignore and CLAUDE.md to declare off-limits files.',
          hinglish:
            'Permission modes:\n- Default: write/commit pe permission maangta hai.\n- --dangerously-skip-permissions: fully autonomous, no prompts. CI/CD ke liye theek hai.\n- Read-only: sirf read operations, koi modification nahi.\n\nSecurity: production mein auto-approve mat use karo. Diffs review karo. CLAUDE.md mein off-limits files declare karo.',
        },
        dailyLifeExample:
          'In a GitHub Action (CI/CD), you run Claude Code with `--dangerously-skip-permissions` to automatically fix lint errors on every PR. In local development, you keep the default mode so you review every change.',
        codeExample: `# Permission modes in practice:

# ── Interactive (default) ──
claude "refactor the auth module"
# Claude reads files (no prompt)
# Claude proposes edits → shows diff → YOU APPROVE OR DENY
# Claude runs npm test → YOU APPROVE command
# Claude creates commit → YOU APPROVE

# ── Auto-approve (CI/CD) ──
claude --dangerously-skip-permissions "fix all ESLint errors"
# Claude reads, edits, runs, commits — zero prompts
# ⚠ Use ONLY in isolated/sandboxed environments

# ── In a GitHub Action ──
# .github/workflows/auto-fix.yml
# - name: Auto-fix lint errors
#   run: |
#     claude --dangerously-skip-permissions \\
#       "fix all ESLint errors and commit with message 'fix(lint): auto-fix'"
#   env:
#     ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}

# ── Project-level permission config ──
# .claude/settings.json
{
  "permissions": {
    "allow": ["Read", "Edit"],
    "deny": ["Bash(git push*)", "Bash(rm -rf*)"]
  }
}`,
        keyPoints: [
          'Default mode asks permission for writes, commands, and commits.',
          '--dangerously-skip-permissions enables fully autonomous operation.',
          'Read-only mode: only file reads and git reads, no modifications.',
          'Configure fine-grained permissions in .claude/settings.json.',
          'Use auto-approve only in sandboxed CI/CD, never in production.',
        ],
        quiz: [
          {
            question: 'When is it safe to use --dangerously-skip-permissions?',
            options: [
              'Always — it\'s just a speed improvement',
              'In sandboxed CI/CD pipelines with well-defined, limited tasks',
              'On production servers',
              'Never — it should never be used',
            ],
            correct: 1,
          },
        ],
        tags: ['permissions', 'security', 'ci-cd', 'auto-approve', 'sandboxing'],
        difficulty: 'medium',
        interviewQuestions: [
          {
            question: 'What are the security risks of running Claude Code with --dangerously-skip-permissions?',
            answer: {
              english:
                'With auto-approve mode, Claude can read, write, and delete any files it can access, run arbitrary shell commands, and make git commits — all without human review. Risks include: accidental deletion of important files, unintended commits to the wrong branch, execution of commands with unintended side effects, and prompt injection via untrusted content Claude reads. Safe use: limit to sandboxed environments, well-defined tasks, and CI/CD pipelines where the task scope is tightly constrained.',
              hinglish:
                'Auto-approve mein Claude bina permission ke files delete kar sakta hai, arbitrary commands run kar sakta hai, wrong branch pe commit kar sakta hai, aur untrusted content se prompt injection ho sakta hai. Safe use: sandboxed CI/CD mein, tightly constrained tasks ke liye. Production mein kabhi nahi.',
            },
            difficulty: 'hard',
            frequency: 'common',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Topic 4 — Daily Dev Workflow Automation
  // ─────────────────────────────────────────────
  {
    title: 'Daily Dev Workflow Automation',
    description: 'Automate your daily development workflows — standups, code review, documentation, and test writing — using Claude Code.',
    level: 'intermediate',
    concepts: [
      {
        title: 'Morning Dev Routine with Claude Code',
        explanation: {
          english:
            'Claude Code can compress your entire morning standup prep into five minutes:\n\n1. **Branch summary**: `claude "summarise what changed in the last 24 hours across all branches"` — Claude runs `git log --all --since=24h`, reads diffs, and produces human-readable standup notes.\n2. **PR triage**: `claude "review open PRs assigned to me and summarise what needs attention"` — via GitHub MCP, Claude reads PR descriptions, latest review comments, and CI status, then prioritises your review queue.\n3. **CI health check**: `claude "check for any failing CI on my PRs and suggest fixes"` — Claude reads GitHub Actions run logs via MCP, identifies the failure, locates the relevant source file, and proposes a fix before you even open your laptop properly.\n\nThis pattern turns reactive morning fire-fighting into proactive, focused work.',
          hinglish:
            'Subah 5 minute mein poora day plan ho jaata hai Claude Code ke saath. `git log --all --since=24h` se standup notes, GitHub MCP se PR triage, failing CI fixes — sab ek ke baad ek Claude karta hai. Reactive fire-fighting ki jagah proactive focused kaam shuru ho jaata hai.',
        },
        dailyLifeExample:
          'You wake up, run three Claude commands while coffee brews, and by the time you sit down you have: yesterday\'s changes summarised, your PR review queue prioritised, and a proposed fix for the failing CI — all before 9 AM.',
        codeExample: '# Morning standup prep (run in sequence)\n\n# 1. What changed across all branches in the last 24 hours?\nclaude "summarise what changed in the last 24 hours across all branches, grouped by feature area"\n\n# 2. PR triage (requires GitHub MCP)\nclaude "review open PRs assigned to me and summarise what needs attention — flag any that are blocking others"\n\n# 3. CI health check\nclaude "check for any failing CI on my PRs and suggest fixes"\n\n# Bonus: chain them into a single morning-report command\n# Create .claude/commands/morning-report.md:\n# ---\n# Run the following three checks and combine into a morning standup report:\n# 1. Summarise git changes across all branches in the last 24 hours.\n# 2. List open PRs assigned to me with their current status and blockers.\n# 3. List any failing CI runs on my PRs and propose fixes.\n# Format as a concise bullet-point report I can paste into Slack.\n# ---\n\n# Then each morning:\n/morning-report',
        keyPoints: [
          'Claude reads git log --all --since=24h to produce accurate standup notes.',
          'GitHub MCP enables PR triage directly from the terminal.',
          'CI failure analysis + fix suggestion is a single Claude command away.',
          'Chain multiple checks into one custom /morning-report slash command.',
          'Transforms reactive mornings into structured, proactive days.',
        ],
        quiz: [
          {
            question: 'Which Claude Code feature enables PR triage and CI status checks in the morning routine?',
            options: [
              'CLAUDE.md file',
              'GitHub MCP integration',
              'The /compact slash command',
              'The --dangerously-skip-permissions flag',
            ],
            correct: 1,
          },
          {
            question: 'How would you create a reusable "morning report" command in Claude Code?',
            options: [
              'Add it as a function in CLAUDE.md',
              'Create a Markdown file in .claude/commands/ named morning-report.md',
              'Pass it as a --template flag on the CLI',
              'Add it to package.json scripts',
            ],
            correct: 1,
          },
        ],
        tags: ['workflow-automation', 'standup', 'git', 'github-mcp', 'productivity'],
        difficulty: 'easy',
        interviewQuestions: [
          {
            question: 'How would you use Claude Code to automate daily standup prep?',
            answer: {
              english:
                'Create a custom slash command in .claude/commands/morning-report.md that chains three tasks: (1) run git log --all --since=24h and summarise changes by feature area, (2) via GitHub MCP list open PRs assigned to me with status and blockers, (3) check CI run results on my PRs and propose fixes. Running /morning-report each morning produces a paste-ready standup summary in under a minute.',
              hinglish:
                '.claude/commands/morning-report.md mein custom slash command banao jo teen tasks chain kare: git changes summary, GitHub MCP se PR triage, aur failing CI fixes. /morning-report command ek minute mein standup-ready report de deta hai.',
            },
            difficulty: 'easy',
            frequency: 'common',
          },
        ],
      },
      {
        title: 'Automated Code Review & Quality Gates',
        explanation: {
          english:
            'Claude Code can act as a quality gate before every commit by running as a pre-commit hook. The hook runs Claude on your staged changes and blocks the commit if critical issues are found:\n\n```bash\nclaude --dangerously-skip-permissions \\\n  "review staged changes for: bugs, security issues, missing error handling. Block commit if critical issues found."\n```\n\nYou can also define a custom `/security-review` slash command that runs a full security audit on demand:\n- Checks for hardcoded secrets and credentials\n- SQL/NoSQL injection vulnerabilities\n- XSS attack vectors\n- Insecure direct object references\n- Missing authentication/authorisation checks\n\nThe pre-commit hook + custom security command together form a developer-side shift-left security practice that catches issues before they ever hit a PR.',
          hinglish:
            'Claude Code pre-commit hook ke roop mein quality gate ban sakta hai. Staged changes pe run karo aur critical issues milne pe commit block karo. Custom `/security-review` slash command full security audit karta hai: hardcoded secrets, SQL injection, XSS, auth bypass. Pre-commit hook + security command shift-left security practice hai.',
        },
        dailyLifeExample:
          'You try to commit a new API route. The pre-commit hook triggers Claude, which spots that user-supplied input is passed directly into a MongoDB query without sanitisation. Commit is blocked with a clear explanation and a suggested fix.',
        codeExample: '#!/bin/sh\n# .git/hooks/pre-commit\n# Make executable: chmod +x .git/hooks/pre-commit\n\necho "Running Claude Code pre-commit review..."\n\n# Get list of staged files\nSTAGED=$(git diff --cached --name-only --diff-filter=ACM)\n\nif [ -z "$STAGED" ]; then\n  echo "No staged files. Skipping Claude review."\n  exit 0\nfi\n\n# Run Claude review on staged changes\nREVIEW_RESULT=$(claude --dangerously-skip-permissions \\\n  "Review the staged git changes (run git diff --cached to see them). \\\n   Check for: (1) bugs and logic errors, (2) security issues including injection, \\\n   auth bypass, and hardcoded secrets, (3) missing error handling, \\\n   (4) violations of CLAUDE.md conventions. \\\n   If any CRITICAL issues are found, output the word BLOCK on its own line \\\n   followed by a description. If only warnings, output WARN. If clean, output OK.")\n\necho "$REVIEW_RESULT"\n\nif echo "$REVIEW_RESULT" | grep -q "^BLOCK"; then\n  echo "Pre-commit review blocked the commit. Fix issues above and try again."\n  exit 1\nfi\n\necho "Pre-commit review passed."\nexit 0\n\n# ── Custom /security-review slash command ──\n# .claude/commands/security-review.md\n# Run a full security audit on the entire src/ directory:\n# 1. Scan for hardcoded secrets, API keys, passwords.\n# 2. Check all database queries for injection vulnerabilities.\n# 3. Check all API routes for missing authentication checks.\n# 4. Scan for XSS vectors in any HTML rendering.\n# 5. Check for insecure direct object references (IDOR).\n# Return findings grouped by severity: Critical / High / Medium / Low.',
        keyPoints: [
          'Pre-commit hooks can run Claude on staged changes before every commit.',
          'Claude outputs a structured BLOCK/WARN/OK to drive hook exit codes.',
          'Custom /security-review command enables on-demand full security audits.',
          'This is a shift-left security practice — catch issues before PRs.',
          '--dangerously-skip-permissions is safe in hooks (sandboxed, read-heavy task).',
        ],
        quiz: [
          {
            question: 'What exit code should a pre-commit hook return to block a commit?',
            options: [
              '0',
              '1',
              '2',
              '42',
            ],
            correct: 1,
          },
          {
            question: 'What is the benefit of a Claude Code pre-commit quality gate over a CI check?',
            options: [
              'CI is slower and catches issues only after the commit is pushed',
              'Pre-commit gates run on the developer\'s machine before the commit is even created, providing immediate feedback',
              'Claude Code cannot run in CI',
              'Pre-commit hooks are enforced by GitHub',
            ],
            correct: 1,
          },
        ],
        tags: ['pre-commit', 'quality-gates', 'security', 'code-review', 'automation'],
        difficulty: 'medium',
        interviewQuestions: [
          {
            question: 'How would you set up Claude Code as a pre-commit quality gate?',
            answer: {
              english:
                'Create a .git/hooks/pre-commit shell script (chmod +x) that runs `claude --dangerously-skip-permissions` with a prompt asking it to review staged changes (via git diff --cached) for bugs, security issues, and convention violations. Instruct Claude to output BLOCK, WARN, or OK on its first line. The hook reads that output: if BLOCK, exit 1 (prevents commit); otherwise exit 0. This catches critical issues before they reach PR.',
              hinglish:
                '.git/hooks/pre-commit script banao jo `claude --dangerously-skip-permissions` run kare staged changes review ke liye. Claude ko BLOCK/WARN/OK output karne ko kaho. Hook BLOCK pe exit 1 (commit rok deta hai), warna exit 0. Issues PR tak pahunchne se pehle hi pakad leta hai.',
            },
            difficulty: 'medium',
            frequency: 'common',
          },
        ],
      },
      {
        title: 'Documentation Generation Automation',
        explanation: {
          english:
            'Claude Code can generate and maintain documentation automatically:\n\n- **JSDoc generation**: `claude "generate JSDoc for all exported functions in src/ that are missing documentation"` — Claude reads each file, identifies undocumented exports, and writes @param, @returns, and @example blocks.\n- **README sections**: `claude "update the README API section based on the current route files in src/app/api/"` — Claude reads all route files and generates accurate API documentation.\n- **Release notes**: A shell script that runs Claude Code on every release tag, comparing git log from the previous tag and generating a CHANGELOG entry.\n- **Custom `/gen-docs` command**: A reusable slash command that runs the full documentation generation pipeline.\n\nThe key insight: documentation generated from the actual code is always accurate. Claude reads the real implementation, not what someone thought they wrote.',
          hinglish:
            'Claude Code documentation automatically generate aur maintain kar sakta hai: JSDoc for missing exports, README sections from route files, release notes from git log. `/gen-docs` slash command poori documentation pipeline run karta hai. Real code se generate documentation always accurate hoti hai.',
        },
        dailyLifeExample:
          'You finish implementing a new utility module with 12 functions. Instead of spending 30 minutes writing JSDoc manually, you run `/gen-docs` and Claude documents every function in 45 seconds, including inferred @param types from how the function is used in the codebase.',
        codeExample: '#!/bin/bash\n# scripts/generate-docs.sh\n# Run on every release: bash scripts/generate-docs.sh v1.2.0\n\nVERSION=${1:-"latest"}\nPREV_TAG=$(git describe --abbrev=0 --tags HEAD~1 2>/dev/null || echo "initial")\n\necho "Generating documentation for release $VERSION (since $PREV_TAG)..."\n\n# 1. Generate JSDoc for undocumented exports\nclaude --dangerously-skip-permissions \\\n  "Generate JSDoc comments for all exported functions and classes in src/ \\\n   that are currently missing documentation. Follow the existing JSDoc style \\\n   in the codebase. Do not modify functions that already have JSDoc."\n\n# 2. Update API docs from route files\nclaude --dangerously-skip-permissions \\\n  "Read all route files in src/app/api/ and update the API_REFERENCE.md file \\\n   with accurate endpoint documentation: method, path, request body schema, \\\n   response schema, and authentication requirements."\n\n# 3. Generate CHANGELOG entry\nclaude --dangerously-skip-permissions \\\n  "Generate a CHANGELOG.md entry for version $VERSION. \\\n   Use git log $PREV_TAG..HEAD --oneline to get commits. \\\n   Group by: Breaking Changes, New Features, Bug Fixes, Internal. \\\n   Prepend the new entry to CHANGELOG.md without removing existing entries."\n\necho "Documentation generation complete."\n\n# ── Custom slash command: .claude/commands/gen-docs.md ──\n# Generate documentation for the current codebase:\n# 1. Add missing JSDoc to all exported functions in src/.\n# 2. Regenerate API_REFERENCE.md from current route files.\n# 3. Update README.md\'s Features section to reflect current capabilities.\n# Follow existing documentation style throughout.',
        keyPoints: [
          'Claude reads actual source to generate accurate docs — no hallucination.',
          'JSDoc generation targets only undocumented exports, preserving existing docs.',
          'README and API docs can be regenerated from route/model files on demand.',
          'Shell script + --dangerously-skip-permissions enables release automation.',
          '/gen-docs custom command gives the team a one-command documentation update.',
        ],
        quiz: [
          {
            question: 'Why is Claude Code-generated documentation more reliable than manually written docs?',
            options: [
              'Claude makes up better descriptions',
              'Claude reads the actual implementation code, so docs reflect what the code really does',
              'Claude writes docs faster so developers update them more often',
              'Claude Code has access to the internet to find the latest API specs',
            ],
            correct: 1,
          },
          {
            question: 'Where would you create a reusable /gen-docs slash command?',
            options: [
              'In CLAUDE.md at the project root',
              'In .claude/commands/gen-docs.md',
              'In package.json under "scripts"',
              'In .github/workflows/docs.yml',
            ],
            correct: 1,
          },
        ],
        tags: ['documentation', 'jsdoc', 'readme', 'automation', 'release-notes'],
        difficulty: 'medium',
        interviewQuestions: [
          {
            question: 'How would you automate API documentation generation using Claude Code?',
            answer: {
              english:
                'Create a shell script that runs Claude Code with --dangerously-skip-permissions and prompts it to read all route files in src/app/api/ and update API_REFERENCE.md with accurate endpoint documentation (method, path, request/response schemas, auth requirements). Run this script as part of the release process or as a git pre-push hook. Claude reads the actual implementation, so the documentation is always in sync with the code.',
              hinglish:
                'Shell script banao jo Claude Code run kare src/app/api/ ke route files read karke API_REFERENCE.md update kare. Release process ya git pre-push hook mein run karo. Claude actual implementation padhta hai isliye documentation code ke saath always in sync rehti hai.',
            },
            difficulty: 'medium',
            frequency: 'common',
          },
        ],
      },
      {
        title: 'Test Writing Automation',
        explanation: {
          english:
            'Claude Code can generate comprehensive tests, dramatically reducing one of the most tedious parts of development:\n\n- **Batch test generation**: `claude "write comprehensive tests for all functions in src/utils/ that currently have no tests"` — Claude reads each utility, understands its behaviour from implementation and usage, and writes unit tests with edge cases.\n- **TDD workflow**: `claude "write failing tests for this feature spec, then implement to make them pass"` — true red-green-refactor agentic loop.\n- **BDD-style generation**: Provide a feature description and Claude writes Gherkin-style scenarios that map to Jest/Vitest tests.\n\nClaude is particularly effective at test writing because it can infer expected behaviour from how a function is called throughout the codebase, not just from its signature.',
          hinglish:
            'Claude Code tests automatically generate kar sakta hai: src/utils/ ke untested functions ke liye comprehensive tests, TDD workflow (failing tests likhna phir implement karna), BDD-style scenario generation. Claude function ka usage codebase mein trace karta hai isliye accurate test cases likhta hai.',
        },
        dailyLifeExample:
          'Your codebase has 40 utility functions with zero test coverage. You run one Claude command before lunch. By the time you\'re back, all 40 have tests, 3 of which immediately reveal actual bugs that have been lurking in production.',
        codeExample: '# ── 1. Batch test generation ──\nclaude "Write comprehensive unit tests for all functions in src/utils/ that\ncurrently have no test file. Use Vitest. For each function:\n- Test the happy path\n- Test edge cases (empty input, null, boundary values)\n- Test error cases\nCreate test files in src/utils/__tests__/ mirroring the source filenames."\n\n# ── 2. TDD workflow ──\n# Step A: write failing tests from a spec\nclaude "Given this feature spec:\n  \'A user can upload a profile picture. Max size 2MB. Formats: JPG, PNG, WebP.\n   If validation fails, return a structured error. Store in /uploads/{userId}/.\'\nWrite failing Vitest tests that fully specify this behaviour.\nDo NOT implement the feature yet."\n\n# Step B: implement to make tests pass\nclaude "The failing tests are in src/lib/__tests__/uploadProfile.test.ts.\nImplement src/lib/uploadProfile.ts to make all tests pass.\nRun the tests after each change and iterate until all pass."\n\n# ── 3. BDD-style generation script ──\n#!/bin/bash\n# scripts/gen-tests.sh <feature-description>\nFEATURE_DESC="$1"\n\nclaude --dangerously-skip-permissions \\\n  "Generate BDD-style Vitest tests for this feature: $FEATURE_DESC\n   Structure: describe blocks for each scenario, it() for each step.\n   Write the test file to src/__tests__/$(echo $FEATURE_DESC | tr \' \' \'-\' | tr \'[:upper:]\' \'[:lower:]\').test.ts\n   Then run the tests and fix any syntax or import errors."',
        keyPoints: [
          'Claude infers test cases from usage patterns, not just function signatures.',
          'Batch test generation can cover an entire directory in one command.',
          'TDD workflow: Claude writes failing tests first, then implements to pass.',
          'BDD-style tests can be generated from plain-English feature descriptions.',
          'Claude runs the tests and iterates — you get passing tests, not just written ones.',
        ],
        quiz: [
          {
            question: 'What makes Claude Code effective at writing accurate test cases?',
            options: [
              'It uses a test-generation model trained on Jest documentation',
              'It reads how functions are called throughout the codebase to infer expected behaviour',
              'It copies test patterns from popular open-source projects',
              'It generates only happy-path tests to avoid complexity',
            ],
            correct: 1,
          },
          {
            question: 'In the TDD workflow with Claude Code, what is the correct order?',
            options: [
              'Implement → write tests → refactor',
              'Write failing tests → implement to pass → refactor',
              'Write tests → deploy → verify',
              'Run linter → write tests → implement',
            ],
            correct: 1,
          },
        ],
        tags: ['testing', 'tdd', 'bdd', 'vitest', 'jest', 'automation', 'unit-tests'],
        difficulty: 'medium',
        interviewQuestions: [
          {
            question: 'Describe how you would use Claude Code for a TDD workflow.',
            answer: {
              english:
                'Step 1: Write a clear feature spec. Step 2: `claude "write failing tests for this feature spec — do NOT implement yet"`. Claude reads the spec and existing codebase patterns, writes comprehensive Vitest/Jest tests that fail. Step 3: `claude "make all tests in [test file] pass — iterate until the full test suite is green"`. Claude implements the feature, runs the tests after each change, and self-corrects until all pass. This produces both a tested implementation and tests that serve as living documentation.',
              hinglish:
                'Step 1: feature spec likhna. Step 2: `claude "write failing tests — implement mat karo abhi"`. Claude failing tests likhta hai. Step 3: `claude "make all tests pass — iterate karo"`. Claude implement karta hai, tests run karta hai, self-correct karta hai. Result: tested implementation aur living documentation dono milte hain.',
            },
            difficulty: 'medium',
            frequency: 'common',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Topic 5 — Prompt Engineering for Claude Code
  // ─────────────────────────────────────────────
  {
    title: 'Prompt Engineering for Claude Code',
    description: 'Write prompts that get Claude Code to the right answer on the first attempt — scope, constraints, verification, style, and decomposition.',
    level: 'intermediate',
    concepts: [
      {
        title: 'Writing Effective Task Prompts',
        explanation: {
          english:
            'A great Claude Code prompt has four components:\n\n1. **Scope** — which files/directories are in play: "In src/app/api/courses/"\n2. **Constraint** — what NOT to change: "Do not modify the Mongoose schema. Do not change the function signature."\n3. **Verification** — how success is measured: "All existing tests must still pass. Run npm test to verify."\n4. **Style** — follow existing patterns: "Follow the same error handling pattern as getUserById in src/lib/user.js."\n\n**Bad prompt**: "Add caching to the API"\n**Good prompt**: "Add Redis caching to the GET /api/courses endpoint in src/app/api/courses/route.js. Use the existing Redis client in src/lib/redis.js. Cache with a 5-minute TTL. Do not change the response shape. Run npm test after to verify no regressions."\n\nEck achha prompt likhne se Claude Code pehli baar hi sahi kaam karta hai.',
          hinglish:
            'Ek achha prompt likhne se Claude Code pehli baar hi sahi kaam karta hai. Prompt ke 4 components: (1) Scope — kaun se files. (2) Constraint — kya NAHI badalna. (3) Verification — success kaise measure karein. (4) Style — existing patterns follow karo. Bad: "add caching". Good: specific file, existing Redis client, 5-min TTL, same response shape, run tests.',
        },
        dailyLifeExample:
          'Vague prompt: "improve the search" → Claude refactors the wrong file, changes the API signature, breaks two tests. Specific prompt: "optimise the search query in src/lib/search.js — only the buildQuery function — to use MongoDB text indexes. Keep the function signature identical. Run npm test after." → perfect first time.',
        codeExample: '# ── Bad vs Good Prompts ──\n\n# BAD: vague scope, no constraints, no verification\nclaude "add error handling to the API"\n# Claude may edit 15 files, change function signatures, miss the real issues\n\n# GOOD: scope + constraint + verification + style\nclaude "Add try/catch error handling to all API route handlers in\nsrc/app/api/ that are currently missing it. Each catch block should:\n- Log the error with console.error (check existing routes for the format)\n- Return NextResponse.json({ error: \'Internal server error\' }, { status: 500 })\nDo NOT change the happy-path logic. Do NOT add error handling that already exists.\nRun npm test after each file to verify no regressions."\n\n# ── Prompt anatomy template ──\n# [SCOPE] In <file or directory>,\n# [TASK] <what to do>,\n# [CONSTRAINT] without changing <what to preserve>,\n# [STYLE] following the same pattern as <reference>,\n# [VERIFICATION] then run <command> to verify.\n\n# Example using the template:\nclaude "In src/models/Course.js, add a createdBy field (ObjectId ref User)\nto the Mongoose schema, without changing any existing fields or indexes,\nfollowing the same pattern as the updatedBy field in src/models/Post.js,\nthen run npm test to verify no regressions."',
        keyPoints: [
          'Every good prompt has: Scope, Constraint, Verification, Style.',
          'Scope tells Claude exactly which files/dirs to touch.',
          'Constraint prevents Claude from over-engineering or breaking neighbours.',
          'Verification (run npm test) gives Claude a success signal to loop on.',
          'Style reference prevents Claude from inventing new patterns.',
        ],
        quiz: [
          {
            question: 'Which component of an effective Claude Code prompt tells it what NOT to change?',
            options: [
              'Scope',
              'Constraint',
              'Verification',
              'Style',
            ],
            correct: 1,
          },
          {
            question: 'Why is adding a verification step (e.g. "run npm test") to a prompt important?',
            options: [
              'It makes the prompt longer which improves Claude\'s understanding',
              'It gives Claude a concrete success signal to loop on until the task is truly done',
              'It forces Claude to use TDD',
              'It is required for --dangerously-skip-permissions mode',
            ],
            correct: 1,
          },
        ],
        tags: ['prompt-engineering', 'task-prompts', 'scope', 'constraints', 'best-practices'],
        difficulty: 'medium',
        interviewQuestions: [
          {
            question: 'What are the four components of an effective Claude Code task prompt?',
            answer: {
              english:
                'Scope (which files/directories to work in), Constraint (what not to change — function signatures, existing behaviour, off-limits files), Verification (how to confirm success — run a test command, check a specific output), and Style (which existing code to model the solution after). Together these four components eliminate the most common failure modes: wrong file, broken neighbours, no way to know if it worked, and inconsistent coding style.',
              hinglish:
                'Scope (kaun se files), Constraint (kya NAHI badalna), Verification (success kaise check karein — test run karo), aur Style (kaun se existing code ko follow karo). Ye charon components sabse common failure modes eliminate karte hain: wrong file edit, neighbor code break, success confirm na kar paana, inconsistent style.',
            },
            difficulty: 'medium',
            frequency: 'very-common',
          },
        ],
      },
      {
        title: 'CLAUDE.md as a Prompt Engineering Tool',
        explanation: {
          english:
            'CLAUDE.md is not just documentation — it is a permanent system prompt injected into every Claude Code session. Treat it as prompt engineering infrastructure:\n\n- **Architectural decision records (ADRs)**: "We use repository pattern, not direct DB calls in routes — see src/repositories/ for examples."\n- **Anti-patterns to explicitly forbid**: "Never use `any` in TypeScript. Never use callbacks — always async/await. Never return raw Mongoose documents — always call .toObject() first."\n- **Positive examples**: Paste 5–10 lines of the preferred coding style directly in CLAUDE.md.\n- **Links to critical docs**: "For authentication, see: https://next-auth.js.org/v5/migration"\n- **Sub-directory CLAUDE.md files**: `/src/app/api/CLAUDE.md` can contain API-specific rules that only apply when Claude is working in that directory.\n\nA well-crafted CLAUDE.md means you never have to repeat context — Claude inherits it in every session.',
          hinglish:
            'CLAUDE.md sirf documentation nahi hai — ye har session mein inject hone wala permanent system prompt hai. ADRs likho, anti-patterns forbid karo ("never use any"), positive code examples paste karo, critical docs link karo. Sub-directory CLAUDE.md files component-specific rules ke liye. Achha CLAUDE.md matlab context baar baar repeat nahi karna padta.',
        },
        dailyLifeExample:
          'Your CLAUDE.md says "never use direct mongoose.find() in route files — always use the repository pattern (see src/repositories/)". Now Claude never introduces the anti-pattern, even when the easiest solution would be to call Mongoose directly.',
        codeExample: '# ── Production CLAUDE.md Template ──\n\n# ProjectName — Claude Code System Prompt\n\n## Tech Stack\n- Next.js 16 (App Router). NOT Pages Router. Never use getServerSideProps.\n- MongoDB + Mongoose 8. Use the connection helper in src/lib/db.js.\n- NextAuth v5. Session via auth() from src/lib/auth.js — not getServerSession().\n- Tailwind CSS 4. No inline styles. No CSS modules unless pre-existing.\n- TypeScript strict mode. No `any`. No non-null assertions (!) without a comment.\n\n## Architecture Rules\n- Routes in src/app/api/ must ONLY call repository functions — no direct DB queries.\n- Repositories in src/repositories/ own all Mongoose calls.\n- Shared utilities go in src/lib/. Components go in src/components/.\n- Server components by default. Add "use client" only if you need hooks or event handlers.\n\n## Anti-Patterns — NEVER Do These\n- Never call mongoose.find() or Model.findOne() directly in a route file.\n- Never use callbacks. Always use async/await.\n- Never return raw Mongoose docs — call .toObject() or .lean() first.\n- Never commit anything from the .env* family of files.\n\n## Preferred Code Style (copy this pattern)\n# src/repositories/courseRepository.js — reference implementation:\n# export async function getCourseById(id) {\n#   await connectDB();\n#   const course = await Course.findById(id).lean();\n#   if (!course) throw new NotFoundError(`Course ${id} not found`);\n#   return course;\n# }\n\n## Sub-directory CLAUDE.md files\n# src/app/api/CLAUDE.md — API route-specific rules\n# src/components/CLAUDE.md — component and Tailwind rules\n\n## Commands\n# Dev: npm run dev | Tests: npm test | Lint: npm run lint | Seed: npm run seed',
        keyPoints: [
          'CLAUDE.md is a permanent system prompt injected automatically into every session.',
          'Include ADRs — architectural decisions Claude should never contradict.',
          'List anti-patterns explicitly to prevent Claude from introducing them.',
          'Paste reference code snippets directly — Claude will pattern-match to them.',
          'Sub-directory CLAUDE.md files let you set component-specific rules.',
        ],
        quiz: [
          {
            question: 'What is the most effective way to prevent Claude Code from using a specific anti-pattern?',
            options: [
              'Remind Claude in every single prompt',
              'List it explicitly in CLAUDE.md under an "Anti-Patterns — NEVER Do These" section',
              'Use --dangerously-skip-permissions to make Claude faster',
              'Write a custom slash command that says "don\'t do X"',
            ],
            correct: 1,
          },
          {
            question: 'What is the purpose of a sub-directory CLAUDE.md file?',
            options: [
              'To override the root CLAUDE.md completely',
              'To add component-specific rules that apply only when Claude works in that directory',
              'To store secret credentials for that component',
              'Sub-directory CLAUDE.md files are not supported',
            ],
            correct: 1,
          },
        ],
        tags: ['claude-md', 'prompt-engineering', 'anti-patterns', 'architecture', 'system-prompt'],
        difficulty: 'medium',
        interviewQuestions: [
          {
            question: 'How would you use CLAUDE.md to enforce architectural consistency across a team?',
            answer: {
              english:
                'Write CLAUDE.md as a permanent system prompt that encodes your architecture: list the repository pattern requirement, name the anti-patterns to forbid (no direct DB calls in routes, no `any` types), paste a reference implementation of the preferred coding style, and link to the relevant internal docs or ADRs. Commit it to git so every developer\'s Claude sessions inherit the same rules. Add sub-directory CLAUDE.md files for component-specific rules (API routes, UI components). The result: Claude enforces architecture automatically without per-prompt reminders.',
              hinglish:
                'CLAUDE.md mein architecture encode karo: repository pattern requirement, forbidden anti-patterns, reference implementation, important docs links. Git mein commit karo. Sub-directory CLAUDE.md files component-specific rules ke liye. Result: Claude automatically architecture enforce karta hai bina baar baar yaad dilaaye.',
            },
            difficulty: 'medium',
            frequency: 'common',
          },
        ],
      },
      {
        title: 'Multi-Step Task Decomposition',
        explanation: {
          english:
            'Complex features should be decomposed into a chain of focused Claude Code tasks rather than one giant prompt. Instead of "build the auth system", use a five-step chain:\n\n1. `claude "design the database schema for users and sessions — output as a Mongoose schema file draft"`\n2. `claude "implement the Mongoose models based on the schema draft in src/models/ — include indexes and validation"`\n3. `claude "write the API routes for signup, signin, signout, and refresh — use the models from step 2"`\n4. `claude "write comprehensive tests for all auth routes — run them and make them pass"`\n5. `claude "document all auth endpoints in API_REFERENCE.md"`\n\nUse `#` in follow-up prompts to reference previous context: `claude "#signup route — add rate limiting to it"`.\n\nEach step is independently verifiable and can be reviewed before proceeding.',
          hinglish:
            'Complex features ko ek giant prompt mein mat daalo — 5 focused steps mein tod do. Schema design → models implement → API routes → tests → docs. Har step independently verifiable hai. Follow-up prompts mein `#` use karo previous context reference karne ke liye.',
        },
        dailyLifeExample:
          'Building a payment integration: one giant prompt produces an overwhelming mess that\'s hard to review. Five focused prompts produce five small, reviewable PRs, each adding one layer — schema, models, routes, tests, docs.',
        codeExample: '# ── 5-Step Feature Implementation Workflow ──\n# Feature: Course Enrollment System\n\n# Step 1: Schema design\nclaude "Design the MongoDB schema for course enrollments.\nA user can enroll in a course once. Track: userId, courseId, enrolledAt,\nprogress (0-100), completedAt (nullable), paymentId.\nOutput as a commented Mongoose schema in src/models/Enrollment.js.\nDo NOT implement yet — output the schema design only for my review."\n\n# [Review and approve the schema]\n\n# Step 2: Model implementation\nclaude "Implement the Enrollment Mongoose model based on the\nschema I just approved in src/models/Enrollment.js.\nAdd: unique compound index on [userId, courseId], timestamps,\nand a static method getCourseEnrollmentCount(courseId).\nRun npm test to check for conflicts with existing models."\n\n# Step 3: API routes\nclaude "Write the API routes for the enrollment system:\n- POST /api/enrollments — enroll a user (check: not already enrolled)\n- GET /api/enrollments/my — get current user\'s enrollments\n- PATCH /api/enrollments/:id/progress — update progress\nUse the Enrollment model from Step 2.\nFollow the same auth + error handling pattern as /api/courses/route.js."\n\n# Step 4: Tests\nclaude "Write comprehensive Vitest tests for all three enrollment routes\ncreated in Step 3. Cover: happy path, already-enrolled error, auth checks.\nRun the tests and iterate until all pass."\n\n# Step 5: Documentation\nclaude "Document all three enrollment endpoints in API_REFERENCE.md,\nfollowing the same format as the existing courses section."\n\n# Referencing previous context with #\nclaude "# enrollment routes — add idempotency keys to the POST endpoint"',
        keyPoints: [
          'Decompose complex features into 5 focused, independently verifiable steps.',
          'Schema → Models → Routes → Tests → Docs is a reliable feature chain.',
          'Each step can be reviewed and approved before the next begins.',
          'Use # in follow-up prompts to reference context from earlier in the session.',
          'Small steps produce reviewable, mergeable PRs — not one giant diff.',
        ],
        quiz: [
          {
            question: 'Why is task decomposition important when using Claude Code for complex features?',
            options: [
              'Claude has a token limit that prevents it from handling more than 100 lines',
              'Each step is independently verifiable, reviewable, and correctable before proceeding',
              'Claude charges per task so smaller tasks cost less',
              'Decomposition is only necessary for TypeScript projects',
            ],
            correct: 1,
          },
          {
            question: 'How do you reference context from earlier in a Claude Code session in a follow-up prompt?',
            options: [
              'Use the /memory slash command',
              'Use # before the reference (e.g. "#signup route — add rate limiting")',
              'Claude automatically remembers all previous context without special syntax',
              'Use the --context flag on the CLI',
            ],
            correct: 1,
          },
        ],
        tags: ['task-decomposition', 'workflow', 'multi-step', 'feature-development', 'prompt-engineering'],
        difficulty: 'medium',
        interviewQuestions: [
          {
            question: 'How do you use Claude Code to build a complex feature without producing an unreviable giant diff?',
            answer: {
              english:
                'Decompose the feature into a chain of focused tasks, each independently verifiable: (1) schema/design, (2) data models, (3) API routes, (4) tests, (5) documentation. Run each as a separate Claude prompt, review the output before proceeding, and commit each step separately. This produces a series of small, focused PRs or commits that are easy to review and easy to roll back if needed. Use # in follow-up prompts to reference earlier context without re-explaining.',
              hinglish:
                'Feature ko focused tasks mein decompose karo: schema → models → routes → tests → docs. Har step alag Claude prompt, review karo, phir aage badho, separate commit. Small focused PRs milte hain jo review karna easy hai. Follow-up prompts mein # use karo earlier context reference karne ke liye.',
            },
            difficulty: 'medium',
            frequency: 'common',
          },
        ],
      },
      {
        title: 'Iterative Refinement Patterns',
        explanation: {
          english:
            'When Claude Code\'s first attempt isn\'t right, you have several refinement techniques:\n\n- **`--continue`**: Resume the previous session without restarting: `claude --continue "the validation is wrong — it should allow empty strings"`. Claude has full context of what it already did.\n- **Add constraints**: "Do not change the function signature. Do not rename any variables."\n- **Provide examples**: "Make the error messages look like the ones in src/lib/errors.js — same structure, same field names."\n- **Show failing tests as a spec**: Run `npm test`, paste the failure, and say "make this test pass without changing the test file."\n- **Red-green-refactor agentic loop**: Claude writes a failing test, implements until green, then refactors for clarity — you just review the refactor step.\n\nThe pattern to avoid: repeatedly asking Claude to "try again" without adding new information. Each refinement prompt should add a concrete constraint, example, or test that Claude can loop on.',
          hinglish:
            'Pehla attempt sahi nahi aaya? Refinement techniques: `--continue` se session resume karo, constraints add karo ("function signature mat badlo"), examples do ("errors.js jaisa format use karo"), failing tests as spec paste karo. Red-green-refactor agentic loop: test likho, pass karo, refactor karo. "Try again" mat kaho — har refinement mein concrete constraint ya example add karo.',
        },
        dailyLifeExample:
          'Claude writes a validation function but it rejects valid input. Instead of "try again", you run the test, paste the failure, and say "--continue: make this failing test pass without changing the test file." Claude has a concrete target and fixes it correctly.',
        codeExample: '# ── Iterative refinement patterns ──\n\n# 1. Resume with --continue (same session, full context)\nclaude "add input validation to the signup route"\n# [Claude writes validation, but it rejects valid email formats]\nclaude --continue "the email validation is too strict — it rejects valid\naddresses with subdomains like user@mail.example.com. Fix the regex\nwithout changing the function signature or the error response shape."\n\n# 2. Show a failing test as the spec\n# [Run npm test, see: AssertionError: expected 422, got 400]\nclaude --continue "The test src/__tests__/signup.test.ts line 34 is failing:\n  expected status 422 for missing fields, got 400.\nMake that test pass. Do NOT change the test file — only change the route handler."\n\n# 3. Provide a style reference\nclaude --continue "The error response format is wrong. It should match the\nformat in src/app/api/courses/route.js — look at how it structures { error, code, details }."\n\n# 4. Red-green-refactor agentic loop\nclaude "Write a failing test for a rate-limit utility that allows 10 requests\nper minute per IP and blocks the 11th. Do not implement the utility yet."\n# [Review the tests]\nclaude --continue "Now implement src/lib/rateLimit.js to make all the tests pass.\nRun the tests after each change and iterate."\n# [Tests pass]\nclaude --continue "Refactor rateLimit.js for clarity — better variable names,\nadd JSDoc — without changing any behaviour. Tests must still pass after."',
        keyPoints: [
          '--continue resumes the previous session with full context intact.',
          'Add constraints to each refinement — never just say "try again".',
          'Paste failing test output as a concrete spec for Claude to target.',
          'Style references prevent Claude from inventing inconsistent patterns.',
          'Red-green-refactor agentic loop: write test → implement → refactor separately.',
        ],
        quiz: [
          {
            question: 'What is the most effective way to guide Claude Code when its first attempt is close but not quite right?',
            options: [
              'Say "try again" and let Claude figure out what was wrong',
              'Use --continue and add a specific constraint, failing test, or style reference',
              'Start a new session and re-describe the entire task',
              'Use /clear to reset the context and try a different approach',
            ],
            correct: 1,
          },
          {
            question: 'In the red-green-refactor agentic loop with Claude Code, what is your role?',
            options: [
              'Write the failing tests yourself, then ask Claude to implement',
              'Review the refactor step and approve or request changes',
              'Run the test suite manually and paste results after each step',
              'Write the implementation and let Claude write the tests',
            ],
            correct: 1,
          },
        ],
        tags: ['iterative-refinement', 'continue', 'red-green-refactor', 'prompt-engineering', 'debugging'],
        difficulty: 'medium',
        interviewQuestions: [
          {
            question: 'How do you guide Claude Code when the first implementation attempt is incorrect?',
            answer: {
              english:
                'Use --continue to resume with full context, then add new information rather than just saying "try again": add a concrete constraint ("do not change the function signature"), provide a style reference ("match the pattern in errors.js"), or paste a failing test output and say "make this test pass without modifying the test file". Each refinement prompt must add something Claude can reason about — a target, a constraint, or an example. The failing test pattern is the most powerful because it gives Claude an unambiguous success criterion.',
              hinglish:
                '--continue se resume karo phir new information add karo — sirf "try again" mat kaho. Constraint add karo, style reference do, ya failing test paste karo ("make this test pass without changing the test file"). Har refinement prompt mein kuch concrete add karo jis pe Claude reason kar sake. Failing test pattern sabse powerful hai kyunki Claude ko unambiguous success criterion milta hai.',
            },
            difficulty: 'medium',
            frequency: 'very-common',
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'What is Claude Code and how does it differ from claude.ai?',
    answer: {
      english:
        'Claude Code is Anthropic\'s CLI tool that runs in your terminal and has direct access to your local filesystem, git repository, and shell environment. It operates in an agentic loop — reading files, editing code, running commands, and observing results. claude.ai is a web chat interface that requires manual copy-pasting and has no access to your local environment.',
      hinglish:
        'Claude Code ek CLI tool hai jo terminal mein run hota hai aur local files, git, aur shell access karta hai. Agentic loop mein kaam karta hai. claude.ai ek web chat interface hai jisme sab manually copy-paste karna padta hai aur local environment ka access nahi hota.',
    },
    difficulty: 'easy',
    frequency: 'very-common',
  },
  {
    question: 'What is CLAUDE.md and when should you create one?',
    answer: {
      english:
        'CLAUDE.md is a Markdown file in the project root that Claude Code reads automatically at the start of every session. Create one whenever you have a project with specific conventions, architecture rules, or tooling that Claude should know about. Include: tech stack, coding standards, project structure, common commands, and off-limits files. Check it into git so it benefits the whole team.',
      hinglish:
        'CLAUDE.md ek Markdown file hai jo project root mein hoti hai aur Claude Code automatically padhta hai. Jab bhi project-specific conventions, architecture rules ya tooling ho tabhi banao. Tech stack, coding standards, structure, commands, off-limits files include karo. Git mein check in karo.',
    },
    difficulty: 'easy',
    frequency: 'very-common',
  },
  {
    question: 'How does MCP extend Claude Code\'s capabilities?',
    answer: {
      english:
        'MCP (Model Context Protocol) is an open standard that connects Claude to external tools. Without MCP, Claude can only access local files and run shell commands. With MCP servers, Claude can query databases, interact with GitHub\'s API (creating PRs, responding to reviews), control browsers, post to Slack, query Linear, and more. MCP servers are configured in .claude/config.json and run as separate processes.',
      hinglish:
        'MCP ek open standard hai jo Claude ko external tools se connect karta hai. Bina MCP ke sirf local files aur shell. MCP ke saath databases query karna, GitHub PR banana, browser control karna, Slack pe post karna — sab possible. `.claude/config.json` mein configure hota hai.',
    },
    difficulty: 'medium',
    frequency: 'common',
  },
  {
    question: 'How would you use Claude Code to debug a production issue?',
    answer: {
      english:
        'A typical workflow: (1) Provide Claude with error logs or a stack trace. (2) Claude reads the relevant source files and git history to understand context. (3) Claude identifies the likely cause and proposes a fix. (4) Claude writes a failing test that reproduces the bug, then fixes the source to make it pass. (5) Claude verifies with the test suite. (6) Claude prepares a clean commit with a clear message explaining the fix.',
      hinglish:
        'Workflow: (1) Error logs ya stack trace Claude ko do. (2) Claude relevant files aur git history padh ke context samajhta hai. (3) Likely cause identify karta hai. (4) Failing test likhta hai, phir source fix karta hai. (5) Test suite se verify karta hai. (6) Clean commit with descriptive message banata hai.',
    },
    difficulty: 'medium',
    frequency: 'common',
  },
  {
    question: 'What are Claude Code\'s permission modes and when do you use each?',
    answer: {
      english:
        'Default (interactive): Claude asks permission before writing files, running commands, or committing. Best for local development where you want to review every change. Auto-approve (--dangerously-skip-permissions): Claude acts fully autonomously. Use in sandboxed CI/CD pipelines with well-defined tasks. Read-only: Claude can only read and analyse — use for audits and code reviews. Fine-grained control via .claude/settings.json allows and denies specific operations.',
      hinglish:
        'Default: writes/commands pe permission maangta hai. Local development ke liye. Auto-approve (--dangerously-skip-permissions): fully autonomous. Sandboxed CI/CD ke liye. Read-only: sirf read/analyse, koi modification nahi. `.claude/settings.json` mein fine-grained control hai.',
    },
    difficulty: 'medium',
    frequency: 'common',
  },
  {
    question: 'How do you create reusable prompt templates in Claude Code?',
    answer: {
      english:
        'Create Markdown files in the `.claude/commands/` directory. Each file\'s name (without .md) becomes a slash command accessible with `/command-name` during a session. Examples: `/review-security` runs a security audit template, `/deploy-check` verifies pre-deployment requirements. These are committed to git so the whole team shares the same workflow shortcuts.',
      hinglish:
        '`.claude/commands/` mein Markdown files banao. File ka naam (bina .md) slash command ban jaata hai. Examples: `/review-security` security audit, `/deploy-check` deployment verification. Git mein commit karo taaki team share kare.',
    },
    difficulty: 'medium',
    frequency: 'common',
  },
  {
    question: 'How does Claude Code handle large codebases efficiently?',
    answer: {
      english:
        'Claude Code doesn\'t read the entire codebase upfront. It uses smart context selection: grep for relevant symbols, package.json/tsconfig analysis for project structure, import tracing to follow dependencies, and git history for recent changes. It reads only what\'s necessary for the current task. For very large codebases, CLAUDE.md can point Claude to the right directories and conventions, further improving targeting.',
      hinglish:
        'Claude Code puri codebase upfront nahi padhta. Smart context selection use karta hai: relevant symbols ke liye grep, project structure ke liye package.json analysis, dependencies ke liye import tracing, recent changes ke liye git history. Sirf task ke liye necessary files padh ta hai. CLAUDE.md se aur bhi targeted ho jaata hai.',
    },
    difficulty: 'medium',
    frequency: 'common',
  },
  {
    question: 'What is the agentic loop and why is it more powerful than a simple chat interface?',
    answer: {
      english:
        'The agentic loop is Claude Code\'s execution model: perceive (read task + context) → reason (plan approach) → act (edit file / run command) → observe (read result) → repeat. This is more powerful than chat because: Claude can observe real outcomes (test output, errors), self-correct based on actual results, take multi-step actions without human input at each step, and complete complex tasks like "fix all failing tests" by iterating until done.',
      hinglish:
        'Agentic loop Claude Code ka execution model hai: perceive → reason → act → observe → repeat. Chat se zyada powerful hai kyunki: real outcomes dekh sakta hai (test output, errors), actual results ke basis pe self-correct kar sakta hai, multi-step actions bina human input ke le sakta hai, aur "fix all failing tests" jaisi complex tasks complete kar sakta hai iterate karke.',
    },
    difficulty: 'medium',
    frequency: 'common',
  },
  {
    question: 'How would you automate your daily development workflow using Claude Code?',
    answer: {
      english:
        'Create a custom /morning-report slash command (.claude/commands/morning-report.md) that chains three tasks: (1) git log --all --since=24h to summarise changes by feature area, (2) GitHub MCP to list assigned PRs with status and blockers, (3) GitHub MCP to read failing CI logs and propose fixes. Run once each morning to get a paste-ready standup summary. Additionally, set up a pre-commit hook that runs Claude on staged changes and blocks commits if critical issues (security vulnerabilities, missing error handling) are found.',
      hinglish:
        '/morning-report custom slash command banao (.claude/commands/morning-report.md) jo teen tasks chain kare: git changes summary, GitHub MCP se PR triage, failing CI fixes. Har subah ek command se standup-ready report milti hai. Plus pre-commit hook jo staged changes pe Claude run kare aur critical issues pe commit block kare.',
    },
    difficulty: 'medium',
    frequency: 'common',
  },
  {
    question: 'What are the four components of an effective Claude Code prompt and why does each matter?',
    answer: {
      english:
        'Scope (which files/directories to work in) — prevents Claude from editing the wrong files. Constraint (what NOT to change) — prevents breaking adjacent code or changing function signatures. Verification (a command Claude can run to confirm success, e.g. npm test) — gives Claude a concrete success target to loop on. Style (a reference implementation to pattern-match against) — ensures the output is consistent with the existing codebase. Together they eliminate the most common failure modes and produce correct output on the first attempt.',
      hinglish:
        'Scope (kaun se files) — wrong files edit hone se bachata hai. Constraint (kya NAHI badalna) — adjacent code break hone se bachata hai. Verification (npm test jaisa command) — Claude ko success target deta hai loop karne ke liye. Style (reference implementation) — output existing codebase ke saath consistent rehta hai. Charon milake first attempt mein correct output dete hain.',
    },
    difficulty: 'medium',
    frequency: 'very-common',
  },
  {
    question: 'How does CLAUDE.md function as a prompt engineering tool beyond simple project documentation?',
    answer: {
      english:
        'CLAUDE.md is a permanent system prompt injected into every Claude Code session. As a prompt engineering tool it encodes: architectural decision records (ADRs) that Claude must not contradict, an explicit anti-patterns list ("never use any, never use callbacks"), positive code examples that Claude pattern-matches against, and links to critical external docs. Sub-directory CLAUDE.md files add component-specific rules. The result is that every team member\'s Claude sessions share the same architectural context without any per-prompt repetition — effectively making Claude a consistent enforcer of team coding standards.',
      hinglish:
        'CLAUDE.md har session mein inject hone wala permanent system prompt hai. Prompt engineering tool ke roop mein: ADRs jo Claude contradict nahi karega, explicit anti-patterns list, positive code examples for pattern matching, critical docs links. Sub-directory files component-specific rules ke liye. Result: team ke sabhi Claude sessions same architectural context share karte hain bina baar baar repeat kiye — Claude team coding standards ka consistent enforcer ban jaata hai.',
    },
    difficulty: 'medium',
    frequency: 'common',
  },
];
