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
#     ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}

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
];
