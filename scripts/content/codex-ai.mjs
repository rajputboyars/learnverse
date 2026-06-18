export function slugify(text) {
  return String(text).toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

export const course = {
  title: 'OpenAI Codex',
  slug: 'codex-ai',
  description: 'OpenAI Codex — autonomous AI coding agent — samjho kya hai, GitHub Copilot se kaise alag hai, kaise use karo efficiently, plans kya hain, aur development workflow mein integrate karo.',
  icon: '⚡',
  tags: ['codex', 'openai', 'ai-coding', 'agentic', 'github-copilot'],
  difficulty: 'intermediate',
  language: 'Python',
  status: 'published',
  order: 38,
};

export const curriculum = [
  {
    title: 'Understanding OpenAI Codex',
    level: 'beginner',
    description: 'OpenAI Codex kya hai, yeh kaise kaam karta hai, aur yeh ChatGPT ya GitHub Copilot se kaise fundamentally alag hai — yeh sab samjho is topic mein.',
    concepts: [
      {
        title: 'What is OpenAI Codex',
        difficulty: 'easy',
        tags: ['codex', 'agentic-ai', 'openai', 'autonomous'],
        explanation: {
          english: `OpenAI Codex (2025 release) is not just a code-generating model — it is a fully autonomous AI software engineering agent. The key word is "autonomous": you give it a task description in plain English, and it independently handles the entire software engineering workflow without you being in the loop for every step.

Here is what makes it fundamentally different from tools you may have used before: Codex runs in an isolated cloud sandbox environment. It clones your repository, reads your existing code structure, plans its approach, writes the code, runs your test suite, iterates on failures, and produces a summary of changes — all on its own. Think of it as a remote junior software engineer you hired, except it works at machine speed and never takes breaks.

The 2025 Codex agent is the evolutionary successor of the original Codex model (a GPT-based model fine-tuned on public GitHub code) that launched in 2021 and powered GitHub Copilot's inline autocomplete. That original model just predicted the next lines of code. The new Codex agent is a complete software engineering system.

Practically, this means: you open your ChatGPT interface (or the API), assign it a task like "Add rate limiting to the /api/login endpoint and write tests for it," and Codex goes off, reads your codebase, writes the middleware, hooks it into your Express app, writes Jest tests, and comes back with a diff for you to review. You were free to do other things while it worked.

The value proposition is clear: for routine-but-time-consuming engineering tasks (adding tests, writing CRUD endpoints, migrating code to TypeScript, fixing reported bugs), Codex can dramatically compress developer time. You become the architect and reviewer; Codex does the implementation gruntwork.`,
          hinglish: `OpenAI Codex (2025 mein launch hua) sirf ek code-generating model nahi hai — yeh ek fully autonomous AI software engineering agent hai. "Autonomous" word pe dhyan do: tum ise plain English mein ek task dete ho, aur yeh poori software engineering workflow khud sambhalta hai, bina tumhare har step pe involved rahe.

Isko previous tools se alag kya banata hai: Codex ek isolated cloud sandbox mein run karta hai. Yeh tumhara repository clone karta hai, existing code structure padhta hai, apna approach plan karta hai, code likhta hai, tests run karta hai, failures pe iterate karta hai, aur changes ka ek summary deta hai — sab khud se. Socho jaisa ek remote junior software engineer hire kiya ho, lekin machine speed pe kaam karta hai aur kabhi break nahi leta.

2025 Codex agent original Codex model (ek GPT-based model jo public GitHub code pe fine-tune tha) ka evolutionary successor hai jo 2021 mein launch hua tha aur GitHub Copilot ke inline autocomplete ko power karta tha. Woh model sirf next lines of code predict karta tha. Naya Codex agent ek complete software engineering system hai.

Practically: tum ChatGPT interface (ya API) open karte ho, task assign karte ho jaise "Add rate limiting to the /api/login endpoint and write tests for it," aur Codex apna kaam shuru kar deta hai — tumhari codebase padhta hai, middleware likhta hai, Express app mein hook karta hai, Jest tests likhta hai, aur review ke liye diff lekar aata hai. Is beech tum kuch aur kaam kar sakte the.

Value clear hai: routine-but-time-consuming engineering tasks ke liye (tests add karna, CRUD endpoints likhna, code TypeScript pe migrate karna, reported bugs fix karna), Codex developer time dramatically compress kar sakta hai. Tum architect aur reviewer ban jate ho; Codex implementation ka gruntwork karta hai.`,
        },
        dailyLifeExample: `Socho tumne ek naya junior developer hire kiya office mein. Tum use batate ho: "Yaar, users table mein pagination add karo aur uske tests bhi likho." Woh apni seat pe jaake codebase padhta hai, samajhta hai, code karta hai, tests run karta hai, aur kuch ghanton baad tum par ek PR aata hai review ke liye. Tum beech mein kuch aur kaam karte rahe. Yahi hai Codex — except it works in minutes, not hours, and lives in the cloud.`,
        codeExample: `# Codex ko task dene ka way (ChatGPT interface ya OpenAI API se)
# Yeh ek conceptual example hai kaise tum Codex ko task assign karte ho

# === OPENAI API se Codex task submit karna ===
import openai
import json

client = openai.OpenAI(api_key="your-api-key-here")

# Codex agent ko ek task assign karo
# (Note: actual API endpoints OpenAI ke documentation se verify karo)
task_description = """
Task: Add input validation to the user registration endpoint.

Repository context:
- Framework: Express.js (Node.js)
- Test framework: Jest
- Relevant file: src/routes/auth.js (the register endpoint is here)
- Existing validation library: joi (already installed)

Requirements:
1. Validate email format
2. Validate password minimum 8 characters, at least one number
3. Validate username: alphanumeric only, 3-20 characters
4. Return appropriate 400 errors with field-specific messages
5. Write Jest tests covering valid input and each validation failure case

Do NOT change the API response format for successful registrations.
"""

# Yeh dikhata hai task kaise structured hota hai
print("Task submitted to Codex:")
print(task_description)
print("\\nCodex will now:")
print("1. Clone/read the repository")
print("2. Find src/routes/auth.js")
print("3. Understand existing code patterns")
print("4. Implement joi validation")
print("5. Write Jest test cases")
print("6. Run tests to verify")
print("7. Return a diff/PR for your review")

# === Expected workflow ===
workflow_steps = [
    "Codex reads repo structure",
    "Finds relevant files (auth.js, existing tests)",
    "Plans implementation approach",
    "Writes validation code using joi",
    "Writes test file (auth.test.js or similar)",
    "Runs: npm test -- --testPathPattern=auth",
    "Fixes any test failures",
    "Produces summary + diff for human review"
]

for i, step in enumerate(workflow_steps, 1):
    print(f"Step {i}: {step}")`,
        keyPoints: [
          'Codex is an autonomous agent — it works end-to-end without you intervening at each step',
          'It runs in isolated cloud sandboxes — never has access to your production systems',
          'You give it a plain-English task description; it figures out the implementation',
          'It is the evolution of the original 2021 Codex model that powered GitHub Copilot',
          'Best for routine engineering tasks: adding features, fixing bugs, writing tests, refactoring',
          'You review its output as a PR — same as reviewing a junior developer\'s work',
          'It reads your actual repository, not a fake or demo codebase',
        ],
        quiz: [
          {
            question: 'OpenAI Codex (2025) ko "autonomous" kyon kaha jata hai?',
            options: [
              'Kyunki yeh code automatically compile karta hai',
              'Kyunki yeh poori engineering workflow — planning se testing tak — khud se handle karta hai bina step-by-step instructions ke',
              'Kyunki yeh GitHub pe directly push karta hai without review',
              'Kyunki yeh sirf Python code likh sakta hai',
            ],
            correctIndex: 1,
          },
          {
            question: 'Original 2021 Codex model (jo GitHub Copilot power karta tha) aur 2025 Codex agent mein kya fundamental difference hai?',
            options: [
              'Original model zyada accurate tha',
              'Original model sirf Python support karta tha',
              'Original model next lines of code predict karta tha; naya agent complete tasks end-to-end execute karta hai sandbox mein',
              'Original model free tha; naya agent paid hai',
            ],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is OpenAI Codex and how does it differ from the original Codex model?',
            difficulty: 'easy',
            frequency: 'high',
            answer: {
              english: 'OpenAI Codex (2025) is an autonomous AI software engineering agent that can independently plan, write, test, and summarize code changes for entire tasks. The original Codex model (2021) was a GPT-based model fine-tuned on GitHub code that powered GitHub Copilot\'s inline autocomplete — it predicted the next lines of code as you typed. The new Codex agent is a complete agentic system: it runs in isolated cloud sandboxes, reads your actual repository, executes your test suite, and produces PR-ready diffs for your review.',
              hinglish: 'OpenAI Codex (2025) ek autonomous AI software engineering agent hai jo independently poore tasks ke liye code plan, write, test aur summarize kar sakta hai. Original Codex model (2021) ek GPT-based model tha jo GitHub code pe fine-tune tha aur GitHub Copilot ke inline autocomplete ko power karta tha — yeh type karte waqt next lines predict karta tha. Naya Codex agent ek complete agentic system hai: isolated cloud sandboxes mein run karta hai, actual repository padhta hai, test suite execute karta hai, aur PR-ready diffs produce karta hai review ke liye.',
            },
          },
        ],
      },
      {
        title: 'Codex vs GitHub Copilot vs ChatGPT',
        difficulty: 'easy',
        tags: ['comparison', 'github-copilot', 'chatgpt', 'codex'],
        explanation: {
          english: `These three tools are often conflated, but they serve fundamentally different use cases. Understanding the distinction helps you choose the right tool for the right moment.

GitHub Copilot is your typing companion. It sits inside your IDE (VS Code, JetBrains, Neovim) and offers inline suggestions as you type — completing the current line, suggesting the next function, auto-filling boilerplate. Its feedback loop is nearly instantaneous (< 1 second). You are always driving; Copilot just fills in what comes next. It is excellent for moment-to-moment productivity: quickly writing familiar patterns, completing known boilerplate, getting the syntax right without looking up docs. The scope is always a few lines to a function.

ChatGPT is your conversational coding mentor. You describe a problem, it explains concepts, writes code snippets, debugs with you iteratively through conversation. The key limitation: YOU are the executor. ChatGPT cannot run code, cannot read your actual repository, cannot verify that the code it writes actually works in your specific environment. You copy its output, paste it into your editor, run it, see what breaks, copy the error back, and iterate. It is fantastic for learning, for exploring unfamiliar APIs, for getting explanations alongside code. The scope is whatever fits in its context window.

OpenAI Codex agent is your autonomous implementation teammate. It does not just suggest or converse — it executes. Codex gets a task, goes into a sandbox, clones your repo, does the actual software engineering work (write → test → fix → repeat), and delivers a PR. You are not in the loop during execution. This makes it perfect for larger, well-defined tasks: "Implement feature X as described in ticket Y" or "Fix the bug described in issue Z and add regression tests." The scope can be entire features spanning multiple files.

The mental model: Copilot = autocomplete at your fingertips. ChatGPT = expert you can ask questions. Codex = junior dev you assign tasks to.`,
          hinglish: `Yeh teeno tools often confuse kar dete hain, lekin inke fundamentally alag use cases hain. Difference samajhna tumhe sahi tool sahi moment pe choose karne mein help karta hai.

GitHub Copilot tumhara typing companion hai. Yeh tumhare IDE (VS Code, JetBrains, Neovim) ke andar rehta hai aur type karte waqt inline suggestions deta hai — current line complete karna, next function suggest karna, boilerplate auto-fill karna. Iska feedback loop almost instantaneous hai (1 second se kam). Tum hamesha drive kar rahe ho; Copilot sirf aage kya aayega woh fill karta hai. Moment-to-moment productivity ke liye excellent hai. Scope hamesha few lines to a function hota hai.

ChatGPT tumhara conversational coding mentor hai. Tum problem describe karte ho, yeh concepts explain karta hai, code snippets likhta hai, conversation ke through tumhare saath debug karta hai. Key limitation: tum executor ho. ChatGPT code run nahi kar sakta, tumhara actual repository nahi padh sakta, verify nahi kar sakta ki jo code likha woh tumhare specific environment mein kaam karta hai ya nahi. Tum output copy karte ho, editor mein paste karte ho, run karte ho, kya toot gaya dekhte ho, error wapas copy karte ho, aur iterate karte ho. Learning ke liye, unfamiliar APIs explore karne ke liye, explanations ke saath code paane ke liye fantastic hai.

OpenAI Codex agent tumhara autonomous implementation teammate hai. Yeh sirf suggest ya converse nahi karta — yeh execute karta hai. Codex task leta hai, sandbox mein jata hai, repo clone karta hai, actual software engineering kaam karta hai (write → test → fix → repeat), aur PR deliver karta hai. Execution ke dauran tum loop mein nahi hote. Yeh bade, well-defined tasks ke liye perfect hai. Scope poore features spanning multiple files ho sakta hai.

Mental model: Copilot = haath ke paas autocomplete. ChatGPT = expert se sawal pooch sakte ho. Codex = junior dev jisko tasks assign karte ho.`,
        },
        dailyLifeExample: `Ek office analogy socho: GitHub Copilot = ek smart keyboard jo common phrases aur sentences predict karta hai jab tum type karte ho (jaise phone ki T9 prediction). ChatGPT = ek knowledgeable friend jisse tum call karte ho, woh advice deta hai, tum khud implement karte ho. Codex = ek junior developer jo tum se task leke apni desk pe jaake poora kaam karke tum par PR bhejta hai review ke liye.`,
        codeExample: `# Teeno tools ka use case comparison

# === GitHub Copilot (IDE mein inline) ===
# Tum type karte ho:
def calculate_tax(income, rate):
    # ... Copilot yahan instantly suggest karta hai:
    # return income * rate / 100
    # Tum Tab press karte ho, accept ho jaata hai
    pass

# Copilot ka scope: current line / function
# Speed: < 1 second
# You are: always driving, Copilot assists

# ===========================================

# === ChatGPT (browser/API mein conversational) ===
# Tum poochte ho: "Python mein JWT token verify karne ka function likho"
# ChatGPT code deta hai:
import jwt

def verify_jwt_token(token, secret_key):
    try:
        payload = jwt.decode(token, secret_key, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

# Phir tum:
# 1. Code copy karte ho
# 2. Apne project mein paste karte ho
# 3. Run karte ho
# 4. Error aaye toh ChatGPT ko batate ho
# 5. Iterate karte ho
# You are: the executor — ChatGPT cannot run code itself

# ===========================================

# === OpenAI Codex Agent (task-based) ===
# Tum task description submit karte ho:
task = """
Add JWT authentication to the FastAPI application.

Repository: my-fastapi-app
Relevant files:
  - main.py (app entry point)
  - routers/users.py (user endpoints that need protection)
  - models/user.py (User model)

Requirements:
1. Install python-jose[cryptography] and passlib[bcrypt] if not present
2. Create auth.py with token creation and verification functions
3. Add /auth/login endpoint that returns JWT token
4. Protect all /users/* endpoints with JWT dependency
5. Write pytest tests for auth flow (login, valid token, invalid token, expired token)
6. Do not change the existing User model structure

Constraints: Keep backward compatible with any endpoints not mentioned above.
"""

# Codex kya karta hai:
print("Codex autonomous execution:")
steps = [
    "1. Reads repo: understands FastAPI structure, existing patterns",
    "2. Plans: identifies files to create/modify",
    "3. Creates auth.py with JWT logic",
    "4. Modifies main.py to include auth router",
    "5. Adds dependency injection to users.py",
    "6. Writes test_auth.py with pytest tests",
    "7. Runs: pytest tests/test_auth.py",
    "8. Fixes any test failures autonomously",
    "9. Returns: diff + summary for YOUR review"
]
for step in steps:
    print(step)

# YOU were free to do other work during steps 1-9
# Now you review the PR like any junior dev's submission

# ===========================================
print("\\nComparison Summary:")
print(f"{'Tool':<20} {'Scope':<30} {'You do':<30}")
print("-" * 80)
print(f"{'GitHub Copilot':<20} {'Lines/function':<30} {'Drive, accept/reject suggestions':<30}")
print(f"{'ChatGPT':<20} {'Snippets/explanations':<30} {'Copy-paste, run, iterate':<30}")
print(f"{'Codex Agent':<20} {'Features/bugs/modules':<30} {'Write task, review PR':<30}")`,
        keyPoints: [
          'GitHub Copilot = inline IDE autocomplete, scope is lines/functions, you are always driving',
          'ChatGPT = conversational mentor, YOU copy-paste and execute its suggestions',
          'Codex agent = autonomous executor, works end-to-end in sandbox, delivers PR for review',
          'Copilot: best for moment-to-moment productivity while actively coding',
          'ChatGPT: best for learning, exploration, getting explanations alongside code',
          'Codex: best for larger well-defined tasks you want to delegate entirely',
          'None of them replace architectural thinking — you still need to know what to build',
        ],
        quiz: [
          {
            question: 'GitHub Copilot aur OpenAI Codex agent mein main difference kya hai?',
            options: [
              'Copilot free hai, Codex paid hai',
              'Copilot sirf Python ke liye hai, Codex sab languages ke liye',
              'Copilot IDE mein inline suggestions deta hai jab tum type karte ho; Codex autonomous agent hai jo poore tasks end-to-end execute karta hai sandbox mein',
              'Copilot zyada accurate code likhta hai Codex se',
            ],
            correctIndex: 2,
          },
          {
            question: 'ChatGPT se code lena aur Codex agent use karne mein kya fundamental limitation hai ChatGPT ki?',
            options: [
              'ChatGPT sirf 100 lines tak code likh sakta hai',
              'ChatGPT code run nahi kar sakta, tumhara actual repository nahi padh sakta, aur verify nahi kar sakta ki code tumhare environment mein kaam karta hai',
              'ChatGPT Python nahi jaanta',
              'ChatGPT ke paas internet access nahi hai',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'How Codex Works (Sandbox Architecture)',
        difficulty: 'easy',
        tags: ['sandbox', 'architecture', 'workflow', 'autonomous'],
        explanation: {
          english: `Understanding Codex's internal architecture helps you use it more effectively and set the right expectations. The key design principle is isolation: Codex never touches your production systems.

Here is the step-by-step flow of what happens when you submit a task to Codex:

Step 1 — Task Reception: You submit a natural language task description. You can include repository context, specific file paths, requirements, constraints, and test expectations. The richer your description, the better Codex performs.

Step 2 — Sandbox Provisioning: Codex spins up an isolated cloud compute environment. This sandbox is ephemeral — it exists only for the duration of your task and is destroyed afterward. It has no access to your production database, live servers, or any external systems beyond what is in the repository.

Step 3 — Repository Ingestion: Codex clones your repository (or reads a snapshot of it). It builds an understanding of your project's structure — file hierarchy, language/framework detected, existing test patterns, naming conventions, imported libraries.

Step 4 — Planning: Before writing a single line of code, Codex creates a plan: which files need to be modified, what new files should be created, what the implementation approach will be, and what tests need to be written.

Step 5 — Implementation: Codex writes the code changes, creating and modifying files in the sandbox. It uses the patterns it observed in your codebase to match your style.

Step 6 — Test Execution: This is the critical differentiator. Codex actually runs your test suite (npm test, pytest, go test, etc.) in the sandbox. It sees the real pass/fail output.

Step 7 — Iteration: If tests fail, Codex does not give up. It reads the error output, diagnoses what went wrong, adjusts the code, and runs tests again. This loop can happen multiple times.

Step 8 — Human Review Package: Finally, Codex produces a structured summary: what it changed, why, what tests pass, and a diff you can review. You review this like any PR — check the diff, understand the changes, run locally if needed, then approve or request changes.`,
          hinglish: `Codex ki internal architecture samajhna tumhe ise zyada effectively use karne aur sahi expectations set karne mein help karta hai. Key design principle hai isolation: Codex tumhare production systems ko kabhi touch nahi karta.

Step-by-step flow jo hota hai jab tum Codex ko task submit karte ho:

Step 1 — Task Reception: Tum natural language task description submit karte ho. Repository context, specific file paths, requirements, constraints, aur test expectations include kar sakte ho. Description jitni rich hogi, Codex utna achha perform karega.

Step 2 — Sandbox Provisioning: Codex ek isolated cloud compute environment spin up karta hai. Yeh sandbox ephemeral hai — sirf tumhare task ki duration ke liye exist karta hai aur baad mein destroy ho jaata hai. Iske paas tumhare production database, live servers, ya repository ke bahar kisi bhi external system ka access nahi hai.

Step 3 — Repository Ingestion: Codex tumhara repository clone karta hai. Project ki structure samajhta hai — file hierarchy, language/framework, existing test patterns, naming conventions, imported libraries.

Step 4 — Planning: Ek bhi line code likhne se pehle, Codex ek plan banata hai: kaunse files modify karne hain, kaunse naye files create karne hain, implementation approach kya hogi, aur kaunse tests likhne hain.

Step 5 — Implementation: Codex sandbox mein files create aur modify karke code changes likhta hai. Tumhari codebase mein jo patterns observe kiye, unhe use karke tumhara style match karta hai.

Step 6 — Test Execution: Yeh critical differentiator hai. Codex actually tumhara test suite run karta hai (npm test, pytest, go test, etc.) sandbox mein. Real pass/fail output dekhta hai.

Step 7 — Iteration: Agar tests fail hote hain, Codex haara nahi maanta. Error output padhta hai, kya galat hua diagnose karta hai, code adjust karta hai, aur phir tests run karta hai. Yeh loop multiple times ho sakta hai.

Step 8 — Human Review Package: Finally, Codex ek structured summary produce karta hai: kya change kiya, kyun, kaunse tests pass hue, aur ek diff jo tum review kar sako. Tum ise kisi bhi PR ki tarah review karte ho.`,
        },
        dailyLifeExample: `Socho ek software agency ka workflow: tum client ho jisne ek feature ka scope diya. Agency (Codex) apna kaam apne office (sandbox) mein karti hai — tumhare live production server pe nahi. Woh tumhara existing codebase padhti hai, plan banati hai, kaam karti hai, internally test karti hai, phir ek polished deliverable lekar aati hai tumhare sign-off ke liye. Tumhara production kabhi touch nahi hota jab tak tum khud merge nahi karte.`,
        codeExample: `# Codex Sandbox Architecture — Conceptual Flow Visualization

import time
from dataclasses import dataclass
from typing import List, Optional

@dataclass
class CodexTask:
    description: str
    repo_url: str
    branch: str = "main"

@dataclass
class SandboxEnvironment:
    sandbox_id: str
    is_isolated: bool = True
    has_production_access: bool = False  # Always False — safety guarantee

@dataclass
class CodexResult:
    files_modified: List[str]
    files_created: List[str]
    tests_passed: int
    tests_failed: int
    summary: str
    diff: str

def simulate_codex_workflow(task: CodexTask) -> CodexResult:
    """
    Yeh function Codex ke internal workflow ko simulate karta hai.
    Real Codex yeh sab OpenAI ke cloud infrastructure pe karta hai.
    """

    print(f"[Codex] Task received: {task.description[:80]}...")
    print()

    # Step 1: Sandbox provision
    print("[Step 1] Provisioning isolated sandbox...")
    sandbox = SandboxEnvironment(
        sandbox_id="sandbox-abc123-ephemeral",
        is_isolated=True,
        has_production_access=False
    )
    print(f"  Sandbox ID: {sandbox.sandbox_id}")
    print(f"  Production access: {sandbox.has_production_access}  <- Always False")
    print()

    # Step 2: Repository ingestion
    print(f"[Step 2] Cloning repository: {task.repo_url}")
    print("  Reading file structure...")
    print("  Detecting: Python/FastAPI, pytest test suite")
    print("  Identifying naming conventions from existing code")
    print("  Finding relevant files for this task")
    print()

    # Step 3: Planning
    print("[Step 3] Creating implementation plan...")
    plan = [
        "CREATE: src/middleware/rate_limiter.py",
        "MODIFY: src/routes/auth.py (add rate limit decorator)",
        "MODIFY: requirements.txt (add redis dependency)",
        "CREATE: tests/test_rate_limiter.py",
    ]
    for item in plan:
        print(f"  - {item}")
    print()

    # Step 4: Implementation
    print("[Step 4] Writing code changes...")
    print("  Matching existing code style (snake_case, type hints, docstrings)")
    print("  Creating rate_limiter.py...")
    print("  Modifying auth.py...")
    print()

    # Step 5: Test execution (THE KEY STEP)
    print("[Step 5] Running test suite in sandbox...")
    print("  $ pytest tests/ -v")
    print()

    # Simulate a failure and recovery
    print("  [Run 1] FAILED: test_rate_limit_exceeded — Redis connection refused")
    print()
    print("[Step 6] Iterating: diagnosing test failure...")
    print("  Error: Redis not configured in test environment")
    print("  Fix: Use fakeredis library for testing")
    print("  Modifying test_rate_limiter.py to use fakeredis...")
    print()

    print("  [Run 2] PASSED: 24 passed, 0 failed")
    print()

    # Step 7: Summary for human review
    print("[Step 7] Preparing human review package...")
    result = CodexResult(
        files_modified=["src/routes/auth.py", "requirements.txt"],
        files_created=["src/middleware/rate_limiter.py", "tests/test_rate_limiter.py"],
        tests_passed=24,
        tests_failed=0,
        summary="Added sliding window rate limiting (10 requests/minute) to /api/login. Uses Redis in production, fakeredis in tests. All 24 tests pass.",
        diff="--- a/src/routes/auth.py\\n+++ b/src/routes/auth.py\\n@@ ... @@\\n+@rate_limit(max_calls=10, period=60)\\n def login(...):"
    )

    print(f"  Files modified: {result.files_modified}")
    print(f"  Files created: {result.files_created}")
    print(f"  Tests: {result.tests_passed} passed, {result.tests_failed} failed")
    print()
    print("[Done] PR ready for your review.")
    print("You were free to work on other things during steps 1-7.")

    return result

# Example usage
task = CodexTask(
    description="Add rate limiting to /api/login endpoint: max 10 requests per minute per IP. Write tests.",
    repo_url="github.com/yourorg/your-api",
    branch="main"
)

result = simulate_codex_workflow(task)
print(f"\\nSummary for your review: {result.summary}")`,
        keyPoints: [
          'Codex always runs in an isolated sandbox — never touches production systems',
          'The sandbox is ephemeral: created for the task, destroyed when done',
          'Codex reads your actual repository to understand structure and conventions',
          'It plans before coding — identifies which files to create/modify',
          'It ACTUALLY RUNS your test suite, not just checks if the code looks right',
          'If tests fail, it iterates autonomously — error → diagnose → fix → retest',
          'Final output is a human-reviewable diff, not auto-deployed code',
        ],
        quiz: [
          {
            question: 'Codex ka sandbox "ephemeral" kyun hai aur yeh kab destroy hota hai?',
            options: [
              'Sandbox sirf ek ghante ke liye exist karta hai, phir automatically delete ho jaata hai',
              'Sandbox task ki duration ke liye exist karta hai aur task complete hone ke baad destroy ho jaata hai — yeh ek safety aur resource management design hai',
              'Sandbox tab destroy hota hai jab tum PR merge karte ho',
              'Sandbox kabhi destroy nahi hota — reuse hota hai next task ke liye',
            ],
            correctIndex: 1,
          },
          {
            question: 'Codex ke workflow mein "Test Execution" step ko critical differentiator kyun kaha jaata hai?',
            options: [
              'Kyunki yeh sabse time-consuming step hai',
              'Kyunki yeh sirf Codex karta hai, ChatGPT nahi kar sakta — Codex actually tumhara real test suite run karta hai sandbox mein aur real pass/fail output dekhta hai',
              'Kyunki yeh automatically code production mein deploy karta hai',
              'Kyunki yeh tumhare code ko delete kar sakta hai agar tests fail hote hain',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    title: 'Features & Capabilities',
    level: 'intermediate',
    description: 'Codex kya kya build kar sakta hai, apni repository kaise samajhta hai, aur iske output ko responsibly kaise review karein — yeh sab is topic mein cover karenge.',
    concepts: [
      {
        title: 'What Codex Can Build For You',
        difficulty: 'medium',
        tags: ['capabilities', 'features', 'use-cases', 'productivity'],
        explanation: {
          english: `Codex's capabilities span a wide range of software engineering tasks. Understanding what it excels at — and where it struggles — helps you allocate tasks effectively.

Feature Implementation: This is Codex's sweet spot. Give it a clear feature description with context about your codebase and it can implement complete features: "Add pagination to the GET /users endpoint — use offset/limit query params, return total_count in response, default limit 20, max 100. Match the pattern from GET /products which already has pagination." It reads your existing pagination implementation and mirrors the pattern.

Bug Fixing with Tests: Provide a bug report and Codex can often fix it and simultaneously write a regression test to prevent future recurrence. "Users report that login fails for emails with + signs. Reproduce the bug, fix it, and add a test." Codex finds the validation logic, identifies the issue, fixes the regex or encoding, and adds a test case for + emails.

Code Refactoring: "Migrate all database queries in src/db/ from raw SQL strings to our QueryBuilder class. The QueryBuilder is in src/utils/query_builder.py." Codex refactors systematically across multiple files while maintaining the same behavior.

TypeScript Migration: "Add TypeScript types to src/services/payment.js. Don't change any logic, only add type annotations. Use strict mode." Particularly effective for gradual TS adoption.

Documentation Generation: "Add docstrings to all public functions in src/api/ that currently lack them. Follow the Google docstring format we use in src/utils/." Codex reads the format, matches it, and fills in documentation.

Database Migrations: Create migration files, add indexes, write rollback logic — all while understanding your existing migration patterns.

Where Codex struggles: novel architecture decisions requiring business context, tasks with ambiguous requirements, highly security-sensitive changes that need deep domain knowledge, tasks where the "right answer" depends on product decisions not visible in the code.`,
          hinglish: `Codex ki capabilities wide range of software engineering tasks span karti hain. Yeh kahan excel karta hai aur kahan struggle karta hai samajhna tumhe tasks effectively allocate karne mein help karta hai.

Feature Implementation: Yeh Codex ka sweet spot hai. Clear feature description do context ke saath aur poori features implement kar sakta hai. "GET /users endpoint mein pagination add karo — offset/limit query params use karo, response mein total_count return karo, default limit 20, max 100. GET /products ka pattern follow karo jisme already pagination hai." Yeh existing pagination implementation padhta hai aur pattern mirror karta hai.

Bug Fixing with Tests: Bug report do aur Codex aksar fix kar sakta hai aur simultaneously ek regression test bhi likh sakta hai future recurrence rokne ke liye. "+ signs wale emails ke liye login fail hota hai — bug reproduce karo, fix karo, test likho." Codex validation logic dhundhta hai, issue identify karta hai, regex fix karta hai, aur + emails ke liye test case add karta hai.

Code Refactoring: "src/db/ mein saare database queries raw SQL strings se QueryBuilder class pe migrate karo. QueryBuilder src/utils/query_builder.py mein hai." Codex multiple files mein systematically refactor karta hai same behavior maintain karte hue.

TypeScript Migration: "src/services/payment.js mein TypeScript types add karo. Logic mat badlo, sirf type annotations add karo. Strict mode use karo." Gradual TS adoption ke liye particularly effective.

Documentation Generation: "src/api/ mein jo public functions abhi docstrings ke bina hain unhe add karo. Google docstring format follow karo jo hum src/utils/ mein use karte hain." Codex format padhta hai, match karta hai, aur documentation fill karta hai.

Jahan Codex struggle karta hai: novel architecture decisions jisme business context chahiye, ambiguous requirements wale tasks, highly security-sensitive changes jisme deep domain knowledge chahiye, tasks jahan sahi answer product decisions pe depend karta hai jo code mein visible nahi hain.`,
        },
        dailyLifeExample: `Socho Codex ek experienced freelance developer hai jo tumhare project mein kaam karta hai. Tumhara existing codebase samajhta hai, tumhare coding standards follow karta hai, aur clearly defined tasks ke liye deliver karta hai. Lekin architectural decisions like "should we use microservices or monolith" ke liye tum usse nahi poochoge — woh decisions tumhara kaam hai jo product strategy se aate hain.`,
        codeExample: `# Codex ke different capabilities ke liye effective task descriptions

# ============================================
# 1. FEATURE IMPLEMENTATION
# ============================================
feature_task = """
Feature: Add CSV export to the admin dashboard reports page.

Repository context:
- Backend: Django REST Framework (Python)
- Frontend: React (you don't need to touch frontend, just the API)
- Relevant files:
  - api/views/reports.py (existing report endpoints)
  - api/serializers/reports.py (existing serializers)

Requirements:
1. Add GET /api/reports/export?format=csv endpoint
2. Accept same filter params as existing /api/reports/ endpoint
3. Use Python csv module (already in stdlib, no new deps)
4. Set appropriate Content-Disposition header for file download
5. Write tests that verify: CSV headers correct, filters work, auth required

Constraint: Do not change existing /api/reports/ endpoint behavior.
"""

# ============================================
# 2. BUG FIX WITH REGRESSION TEST
# ============================================
bugfix_task = """
Bug: User passwords containing special characters (&, <, >)
     cause login to fail with 400 error.

Steps to reproduce:
1. Create user with password "P@ssw0rd<2024>"
2. Try to log in — fails with "Invalid credentials"
3. Same password without < > works fine

Relevant files:
- auth/validators.py (password validation logic)
- auth/views.py (login endpoint)
- tests/test_auth.py (existing auth tests)

Task:
1. Find root cause (likely HTML encoding or unescaped characters)
2. Fix the bug
3. Add regression test specifically for passwords with &, <, >, ", '
4. Verify all existing auth tests still pass

Do NOT change the password strength requirements.
"""

# ============================================
# 3. REFACTORING TASK
# ============================================
refactor_task = """
Refactor: Convert all direct database queries in src/repositories/
from using the old DB class to our new DatabaseClient.

Context:
- Old pattern: db = DB(); db.query("SELECT * FROM users WHERE id = %s", [id])
- New pattern: client = DatabaseClient(); client.fetch_one("users", filters={"id": id})
- DatabaseClient is in src/infrastructure/database_client.py
- See src/repositories/product_repository.py for an example of the NEW pattern
- Files to convert: src/repositories/user_repository.py,
                    src/repositories/order_repository.py,
                    src/repositories/inventory_repository.py

Requirements:
1. Convert all three files to use DatabaseClient
2. Do NOT change any method signatures or return types
3. Run existing repository tests to verify behavior unchanged
4. Remove any remaining imports of the old DB class after conversion
"""

# ============================================
# 4. TYPESCRIPT MIGRATION
# ============================================
ts_migration_task = """
TypeScript migration: Add type annotations to src/services/payment.js

Rules:
1. Rename file to payment.ts
2. Add TypeScript types to all function parameters and return values
3. Do NOT change any logic or implementation
4. Use strict: true compatible types
5. Create a PaymentDetails interface for the payment object used in multiple functions
6. Check tsconfig.json for our TypeScript configuration before starting
7. Run: npx tsc --noEmit to verify no type errors
8. Update the import in src/routes/payments.js to import from payment.ts
"""

# ============================================
# Summary: What makes a GOOD Codex task?
# ============================================
good_task_checklist = {
    "specific_files": "Tell Codex which files are relevant",
    "existing_patterns": "Point to examples of patterns to follow",
    "clear_requirements": "Numbered list of what to implement",
    "test_expectations": "Specify what tests are needed",
    "constraints": "What NOT to change",
    "acceptance_criteria": "How to verify it worked"
}

print("Good Codex task checklist:")
for key, description in good_task_checklist.items():
    print(f"  [{key}]: {description}")`,
        keyPoints: [
          'Feature implementation is Codex\'s sweet spot — give clear requirements and file context',
          'Bug fixing + regression tests together is extremely valuable use case',
          'Refactoring across multiple files: Codex maintains consistency humans often miss',
          'TypeScript migration is particularly effective for gradual adoption',
          'Best results come from well-tested codebases with clear conventions',
          'Avoid: novel architectural decisions, highly ambiguous requirements, business-context-heavy decisions',
          'Point Codex to existing examples ("do it like X in file Y") for best style matching',
        ],
        quiz: [
          {
            question: 'Codex kis type ke task ke liye LEAST suitable hai?',
            options: [
              'Existing code mein pagination add karna',
              'Bug fix karna aur regression test likhna',
              '"Should we build this as microservices or monolith?" jaise novel architectural decisions jo business context require karte hain',
              'TypeScript types existing JavaScript codebase mein add karna',
            ],
            correctIndex: 2,
          },
          {
            question: 'Codex ko bug fix task dete waqt "regression test bhi likho" kyon specify karna chahiye?',
            options: [
              'Kyunki Codex bina explicitly bataye tests nahi likhta',
              'Kyunki regression test likhne se Codex ko bug ki root cause samajhne mein help milti hai aur future mein same bug wapas nahi aayega — yeh ek double benefit hai',
              'Kyunki tests ke bina Codex ka output invalid hota hai',
              'Kyunki OpenAI charge karta hai agar tests nahi hain',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Repository Understanding & Context',
        difficulty: 'medium',
        tags: ['context', 'repository', 'codebase', 'conventions'],
        explanation: {
          english: `One of Codex's most powerful and underappreciated capabilities is its ability to read and understand your entire repository before writing a single line of code. This is fundamentally different from ChatGPT where you paste snippets and hope for the best. But this power comes with nuance: the quality of Codex's understanding depends on the quality of your codebase's structure and documentation.

What Codex reads and how it uses it:

File Structure: Codex understands your project layout — it knows where routes live, where models are, where utilities are, how you've organized tests. This lets it put new files in the right place without you specifying the exact path.

Existing Patterns: If your codebase has 50 API endpoints all following a consistent pattern (same error handling, same response format, same middleware order), Codex picks this up and applies it to the new endpoint it creates. This is context learning — it is not told the pattern, it infers it.

Test Structure: Codex reads how your existing tests are written: which test framework you use, how you set up fixtures, how you mock dependencies, naming conventions. New tests it writes will follow these conventions.

README and Documentation: If your README explains how to set up the project, what environment variables are needed, how to run tests — Codex uses this. A good README can prevent many "Codex doesn't know how to run the test suite" failures.

How to help Codex understand your project better:
1. Keep a README with setup instructions and test commands
2. Maintain consistent coding style across the codebase (Codex learns by induction)
3. Write docstrings/comments explaining non-obvious decisions
4. Have a consistent test structure — Codex will follow it
5. Use clear, descriptive naming (findActiveUsersByRole is better than getUsers)
6. In your task description, point to examples: "Follow the pattern in src/routes/products.py"

Where Codex struggles: massive monorepos with inconsistent conventions across different teams/eras of the codebase, heavily commented "magic" code without explanation, test suites that require complex environment setup not documented anywhere.`,
          hinglish: `Codex ki ek powerful aur underappreciated capability yeh hai ki yeh ek bhi line code likhne se pehle tumhara poora repository padh aur samajh sakta hai. Yeh ChatGPT se fundamentally alag hai jahan tum snippets paste karte ho. Lekin yeh power nuance ke saath aati hai: Codex ki understanding ki quality tumhare codebase ki structure aur documentation ki quality pe depend karti hai.

Codex kya padhta hai aur kaise use karta hai:

File Structure: Codex project layout samajhta hai — jaanta hai routes kahan hain, models kahan hain, utilities kahan hain, tests kaise organize hain. Yeh new files sahi jagah rakh sakta hai bina exact path specify kiye.

Existing Patterns: Agar tumhari codebase mein 50 API endpoints hain jo sab consistent pattern follow karte hain (same error handling, same response format, same middleware order), Codex yeh pick up karta hai aur naye endpoint mein apply karta hai. Yeh context learning hai — ise pattern bataya nahi gaya, usne khud infer kiya.

Test Structure: Codex padhta hai ki tumhare existing tests kaise likhe hain: kaunsa test framework, fixtures kaise setup karte ho, dependencies kaise mock karte ho, naming conventions. Naye tests inhi conventions follow karenge.

README aur Documentation: Agar README mein setup instructions hain, environment variables kya chahiye, tests kaise run karte hain — Codex yeh use karta hai. Ek achha README kaafi "Codex doesn't know how to run the test suite" failures prevent kar sakta hai.

Codex ko tumhara project better samajhne mein help karne ke liye:
1. Setup instructions aur test commands wala README rakho
2. Consistent coding style maintain karo (Codex induction se seekhta hai)
3. Non-obvious decisions explain karne ke liye docstrings/comments likho
4. Consistent test structure rakho — Codex follow karega
5. Clear, descriptive naming use karo
6. Task description mein examples point karo

Codex kahan struggle karta hai: massive monorepos jisme different teams/eras ki inconsistent conventions hain, heavily commented "magic" code without explanation, test suites jo complex environment setup require karte hain jo kahi documented nahi.`,
        },
        dailyLifeExample: `Socho Codex ek new hire hai jo pehle din office aaya. Ek well-organized office mein jahan sab kuch labeled hai, processes documented hain, aur existing employees ka kaam consistent style mein hai — naya hire jaldi productive ho jaata hai. Lekin ek messy office mein jahan koi documentation nahi, har koi apna kaam alag style mein karta hai — new hire confuse ho jaata hai. Tumhara codebase wohi office hai.`,
        codeExample: `# How Codex reads repository — aur tum ise better kaise bana sakte ho

# ============================================
# EXAMPLE: Ek project jo Codex ke liye achhe se structured hai
# ============================================

# my-fastapi-project/
# +-- README.md                    # <- Codex yeh padhta hai PEHLE
# +-- requirements.txt
# +-- pytest.ini                   # <- Test runner config
# +-- src/
# |   +-- __init__.py
# |   +-- main.py                  # <- App entry point
# |   +-- config.py                # <- Settings/env vars
# |   +-- routes/
# |   |   +-- __init__.py
# |   |   +-- users.py             # <- Existing route pattern
# |   |   +-- products.py          # <- Another route example
# |   +-- services/
# |   |   +-- user_service.py      # <- Business logic pattern
# |   |   +-- product_service.py
# |   +-- models/
# |   |   +-- user.py              # <- Model pattern
# |   |   +-- product.py
# |   +-- utils/
# |       +-- pagination.py        # <- Shared utilities
# |       +-- validators.py
# +-- tests/
#     +-- conftest.py              # <- Test fixtures
#     +-- test_users.py            # <- How tests are written
#     +-- test_products.py

# ============================================
# README.md jo Codex ko help karta hai
# ============================================
readme_content = """
# My FastAPI Project

## Setup
pip install -r requirements.txt
cp .env.example .env  # Fill in values

## Running the app
uvicorn src.main:app --reload

## Running tests
pytest tests/ -v
# For a specific module:
pytest tests/test_users.py -v

## Project conventions
- All routes return: {"data": ..., "meta": {"total": int, "page": int}}
- Error responses: {"error": {"code": str, "message": str}}
- Use pagination utility from src/utils/pagination.py for list endpoints
- All endpoints require authentication except /auth/login and /auth/register
- Test fixtures are in tests/conftest.py -- use existing fixtures, don't create new ones

## Adding a new resource
1. Create src/models/resource.py (follow product.py pattern)
2. Create src/services/resource_service.py (follow product_service.py pattern)
3. Create src/routes/resource.py (follow products.py pattern)
4. Register in src/main.py
5. Add tests in tests/test_resource.py (follow test_products.py pattern)
"""

# ============================================
# GOOD task description using repository context
# ============================================
good_task = """
Add a new "orders" resource to the FastAPI project.

Follow the exact pattern established by the "products" resource:
- Model: src/models/product.py -> create src/models/order.py
- Service: src/services/product_service.py -> create src/services/order_service.py
- Routes: src/routes/products.py -> create src/routes/orders.py
- Tests: tests/test_products.py -> create tests/test_orders.py
- Register in src/main.py the same way products are registered

Order fields needed:
- id (UUID, auto-generated)
- user_id (UUID, foreign key to users table)
- status (enum: 'pending', 'processing', 'shipped', 'delivered', 'cancelled')
- total_amount (Decimal, 2 decimal places)
- created_at (datetime, auto-set)
- updated_at (datetime, auto-updated)

Endpoints needed (follow same response format as products):
- GET /orders (list, paginated, auth required)
- GET /orders/{id} (detail, auth required, only own orders)
- POST /orders (create, auth required)
- PATCH /orders/{id}/status (update status, auth required)

Write tests covering all endpoints including: auth required, own orders only filter,
invalid status transitions, pagination.
"""

# ============================================
# BAD task description (missing context)
# ============================================
bad_task = """
Add orders to my project
"""
# Yeh task mein kya missing hai:
missing_info = [
    "Kaunse files relevant hain?",
    "Existing pattern kya follow karein?",
    "Order ke fields kya hain?",
    "Kaunse endpoints chahiye?",
    "Auth required hai ya nahi?",
    "Tests likhne hain ya nahi?",
]
print("BAD task mein kya missing hai:")
for item in missing_info:
    print(f"  - {item}")

print("\\nAchha README + achhi task description = Codex ka best output")`,
        keyPoints: [
          'Codex reads your ENTIRE repository before writing code — not just snippets you paste',
          'It learns your conventions by induction — consistent code teaches it your style',
          'A good README with setup and test commands helps Codex run your tests correctly',
          'Point to existing examples in task descriptions: "follow the pattern in products.py"',
          'Well-tested codebases with consistent structure get the best Codex results',
          'Codex struggles with monorepos having inconsistent conventions across different eras',
          'Clear file structure and descriptive naming dramatically improve Codex\'s understanding',
        ],
        quiz: [
          {
            question: 'Codex ko tumhare project ko better samajhne mein kaunsi cheez SABSE ZYADA help karti hai?',
            options: [
              'Ek bahut bada codebase jisme lots of code ho',
              'Consistent coding style, achha README with setup/test commands, aur task description mein existing examples ki references',
              'Sirf Python mein likhna, JavaScript nahi',
              'Codebase mein maximum comments hona',
            ],
            correctIndex: 1,
          },
          {
            question: 'Codex "context learning" kaise karta hai patterns ke liye?',
            options: [
              'Tum use explicitly har pattern ka documentation dete ho',
              'Yeh OpenAI ke database mein tumhare project ki information store hoti hai',
              'Yeh tumhari existing codebase padhta hai aur patterns infer karta hai by induction — ise bataya nahi jaata, yeh khud observe karta hai',
              'Yeh sirf woh patterns jaanta hai jo uski training mein the',
            ],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'Reviewing Codex Output',
        difficulty: 'medium',
        tags: ['code-review', 'pr-review', 'quality', 'responsibility'],
        explanation: {
          english: `Reviewing Codex's output responsibly is not optional — it is the most critical part of the workflow. The fundamental mindset shift: Codex is a capable junior developer, not an oracle. Its PRs deserve the same rigorous review you would give any human contributor's PR. Probably more, actually, because Codex cannot ask you clarifying questions mid-task.

What to check when reviewing a Codex PR:

1. Understand every change: Do not approve code you don't understand. If Codex added a caching layer you didn't ask for, understand why and whether it's appropriate. If it changed something you told it not to change, understand what happened.

2. Check the diff holistically: Read changed files top to bottom. Look for: accidentally removed code, logic that looks plausible but is wrong, hardcoded values that should be configurable, missing error handling, security issues (SQL injection, XSS, missing auth checks).

3. Test locally: Pull Codex's branch. Run the tests locally (don't just trust Codex's sandbox run). Manually test the feature/fix in your dev environment. Codex tested in its sandbox — your environment may differ.

4. Check test quality: Codex sometimes writes tests that are too narrow, only testing the happy path. Check: are edge cases tested? Are error conditions covered? Is the test testing behavior or implementation details?

5. Read the summary: Codex produces a summary of what it did. Read it. It will tell you if it made assumptions or had to work around something — these are areas that need extra scrutiny.

How to iterate with Codex when its first attempt isn't right: Be specific about what is wrong. "The pagination doesn't work when the filter is applied simultaneously" is much better than "it doesn't work." Point to the specific failing test case or the specific incorrect behavior. Codex can iterate on its own PR with more targeted feedback.

What to never auto-merge: Codex output that modifies security-sensitive areas (auth, permissions, payment), complex business logic without domain expert review, anything you don't fully understand.`,
          hinglish: `Codex ke output ko responsibly review karna optional nahi hai — yeh workflow ka sabse critical part hai. Fundamental mindset shift: Codex ek capable junior developer hai, oracle nahi. Iske PRs ko same rigorous review milni chahiye jo tum kisi bhi human contributor ke PR ko dete ho. Shayad aur zyada, kyunki Codex task ke beech clarifying questions nahi poochh sakta.

Codex PR review karte waqt kya check karein:

1. Har change samjho: Aise code approve mat karo jo tum nahi samajhte. Agar Codex ne ek caching layer add ki jo tumne nahi manga tha, samjho kyun aur kya yeh appropriate hai. Agar usne kuch change kiya jo tumne change na karne kaha tha, samjho kya hua.

2. Diff holistically check karo: Changed files top to bottom padho. Dhundo: accidentally removed code, logic jo plausible lagti hai lekin galat hai, hardcoded values jo configurable honi chahiye, missing error handling, security issues.

3. Locally test karo: Codex ki branch pull karo. Tests locally run karo (sirf Codex ke sandbox run pe trust mat karo). Dev environment mein feature/fix manually test karo.

4. Test quality check karo: Codex kabhi kabhi tests likhta hai jo bahut narrow hain, sirf happy path test karte hain. Check karo: edge cases tested hain? Error conditions covered hain? Test behavior test kar raha hai ya implementation details?

5. Summary padho: Codex summary produce karta hai kya kiya. Ise padho. Yeh batayega agar usne assumptions banaye ya kisi cheez ke around work karna pada — yeh areas extra scrutiny chahte hain.

Codex ke saath iterate kaise karein jab pehli attempt sahi nahi hai: Kya galat hai iske baare mein specific raho. "Pagination filter simultaneously apply hone pe kaam nahi karta" "yeh kaam nahi karta" se bahut better hai. Specific failing test case ya specific incorrect behavior point karo.

Kya kabhi auto-merge mat karo: Security-sensitive areas modify karne wala Codex output (auth, permissions, payment), complex business logic without domain expert review, kuch bhi jo tum fully nahi samajhte.`,
        },
        dailyLifeExample: `Socho tumne ek junior developer ki PR review karna hai. Tum use sirf isliye merge nahi karoge kyunki usne kaha "main ne test kiya aur sab kuch kaam karta hai." Tum code padhoge, samjhoge, locally run karoge, edge cases sochoge, aur security implications check karoge. Codex ke PR ke saath exactly yahi karo — bas kyunki AI ne likha hai yeh automatically sahi nahi banata.`,
        codeExample: `# Codex PR Review Checklist — Python/code examples ke saath

import ast
import subprocess
from typing import List

# ============================================
# REVIEW CHECKLIST jab Codex ka PR aaye
# ============================================

class CodexPRReviewer:
    """
    Yeh class demonstrate karti hai systematic approach
    Codex output review karne ke liye.
    """

    def review_checklist(self) -> dict:
        return {
            "understand_every_change": [
                "Har modified file ka diff padho",
                "Poocho: Codex ne yeh change kyun kiya?",
                "Agar koi unexpected change hai, understand karo before approving",
            ],
            "security_checks": [
                "Koi naya SQL query — parametrized hai ya direct string concat?",
                "Naye endpoints — auth required hai?",
                "User input sanitization hai?",
                "Sensitive data logs mein toh nahi print ho raha?",
            ],
            "logic_checks": [
                "Edge cases handle hain? (empty list, None values, zero)",
                "Error handling appropriate hai?",
                "Race conditions possible hain?",
                "Memory leaks ho sakte hain? (unclosed files/connections)",
            ],
            "test_quality_checks": [
                "Tests sirf happy path cover karte hain ya edge cases bhi?",
                "Tests behavior test karte hain ya implementation details?",
                "Tests actually fail karte hain jab behavior galat ho?",
                "Test names descriptive hain?",
            ],
            "local_verification": [
                "git checkout codex/branch-name",
                "pip install -r requirements.txt",
                "pytest tests/ -v (khud run karo, sandbox pe rely mat karo)",
                "Feature manually test karo dev environment mein",
            ]
        }

    def check_for_common_codex_mistakes(self, code_snippet: str) -> List[str]:
        """Codex ke common mistakes check karo."""
        issues = []

        # Check 1: Hardcoded values
        hardcoded_indicators = ["localhost", "127.0.0.1", "password123", "secret_key"]
        for indicator in hardcoded_indicators:
            if indicator in code_snippet.lower():
                issues.append(f"Possible hardcoded value found: '{indicator}' — should use env var")

        # Check 2: Missing error handling patterns
        if "requests.get(" in code_snippet and "try:" not in code_snippet:
            issues.append("HTTP request without try/except — network errors unhandled")

        if "open(" in code_snippet and "with open(" not in code_snippet:
            issues.append("File opened without 'with' statement — may not close properly")

        # Check 3: Overly broad exception handling
        if "except Exception:" in code_snippet or "except:" in code_snippet:
            issues.append("Catching broad Exception — consider catching specific exceptions")

        return issues


# ============================================
# HOW TO GIVE FEEDBACK TO CODEX FOR ITERATION
# ============================================

# BAD feedback (too vague):
bad_feedback = "The pagination doesn't work correctly."

# GOOD feedback (specific, actionable):
good_feedback = """
Iteration feedback on your rate limiter PR:

Failing test: test_rate_limit_per_ip_isolation (tests/test_rate_limiter.py:line 87)

Error output:
  AssertionError: IP 192.168.1.1 is being affected by IP 192.168.1.2's requests
  Expected: IP 1 can make 10 requests; IP 2 can separately make 10 requests
  Actual: After IP 1 makes 10 requests, IP 2's 1st request is also rate limited

Root cause I found: In your implementation at src/middleware/rate_limiter.py line 34,
the cache key is:
  key = f"rate_limit:{request.path}"
It should be:
  key = f"rate_limit:{request.path}:{request.remote_addr}"

Please fix the key construction to include the IP address, and verify the
per-IP isolation test passes. Also double-check the test for rate limit reset --
I want to make sure the key expiry is per-IP as well after this fix.
"""

# ============================================
# THINGS TO NEVER AUTO-MERGE
# ============================================
never_auto_merge = {
    "auth_changes": "Authentication, authorization, session management",
    "payment_logic": "Any payment processing, billing, pricing calculations",
    "data_deletion": "Code that deletes or permanently modifies user data",
    "security_middleware": "CORS, rate limiting, request validation middleware",
    "crypto_operations": "Hashing, encryption, key management",
    "database_migrations": "Schema changes (always have rollback plan)",
    "code_you_dont_understand": "ANYTHING you cannot explain line by line"
}

print("NEVER auto-merge Codex output that touches:")
for category, description in never_auto_merge.items():
    print(f"  [{category}]: {description}")

print("\\nReview Rule: If you can't explain every changed line, don't merge it.")`,
        keyPoints: [
          'Treat Codex PRs exactly like human PRs — read every line, understand every change',
          'Run tests locally in your own environment, don\'t just trust sandbox test results',
          'Check for security issues: SQL injection, missing auth, unhandled user input',
          'Test quality matters — Codex sometimes writes narrow tests covering only happy path',
          'Read Codex\'s summary — it tells you assumptions made and workarounds used',
          'Give specific feedback when iterating: "pagination broken when filter applied simultaneously"',
          'Never auto-merge: auth changes, payment logic, anything you don\'t fully understand',
        ],
        quiz: [
          {
            question: 'Codex ke PR mein tests pass ho gaye sandbox mein — kya tum directly merge kar sakte ho?',
            options: [
              'Haan, agar sab tests pass hain toh merge kar sakte ho',
              'Nahi — tumhe khud locally tests run karne chahiye, diff dhyan se review karna chahiye, aur feature manually test karni chahiye apne dev environment mein',
              'Haan, agar task description clear thi toh merge kar sakte ho',
              'Nahi, sirf CTO hi Codex PRs merge kar sakta hai',
            ],
            correctIndex: 1,
          },
          {
            question: 'Codex ko iterate karne ke liye feedback dete waqt kaunsa approach best hai?',
            options: [
              '"Yeh kaam nahi karta, dobara try karo"',
              '"Tests fail ho rahe hain" jaise general statement',
              'Specific scenario batao: kaunsi exact request fail hoti hai, expected behavior kya hai, actual behavior kya hai, aur relevant file kaunsi hai',
              'Pura codebase delete karo aur fresh start karo',
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
  {
    title: 'Access, Plans & Workflows',
    level: 'intermediate',
    description: 'Codex kaise access karein, pricing kya hai, aur apne development workflow mein effectively integrate kaise karein — yeh sab is topic mein cover karenge.',
    concepts: [
      {
        title: 'Codex Plans & Pricing',
        difficulty: 'medium',
        tags: ['pricing', 'plans', 'chatgpt-plus', 'api', 'cost'],
        explanation: {
          english: `Understanding Codex's access tiers helps you choose the right plan for your usage and estimate costs before committing. The pricing landscape as of 2025:

ChatGPT Plus ($20/month): Gives you access to Codex agent with a limited number of tasks per month. Exact limits are subject to change by OpenAI, but Plus users get significantly fewer Codex tasks than Pro users. Best for: individuals doing occasional coding assistance, learning, or exploring what Codex can do before committing to Pro.

ChatGPT Pro ($200/month): Significantly more Codex tasks per month. This is the tier for developers who want to regularly use Codex as part of their workflow — multiple tasks per day is feasible. The $200/month price point looks expensive until you compare it to developer time: if Codex saves 2-3 hours of development work per month on routine tasks, it's already paying for itself at any reasonable hourly developer rate.

ChatGPT Team: Shared organization access with centralized billing. Teams can pool their Codex usage. Enterprise handles compliance, data privacy, and custom quotas.

OpenAI API (Pay-per-use): For programmatic access — you integrate Codex into your own tools, CI/CD pipelines, or automation workflows. You pay based on the compute resources each Codex task consumes (which maps to tokens + execution time + sandbox compute). This gives you maximum flexibility and is cost-effective for predictable, high-volume usage where you can optimize task descriptions.

Cost estimation framework: A simple Codex task (fix one bug, write one function with tests) might cost the equivalent of 10-30 minutes of API compute. A large task (implement a complete feature across multiple files with comprehensive tests) might be 1-3 hours equivalent. Compare this to your hourly developer cost — at $50-150/hr developer cost, even a $5-15 Codex API task that saves 30 minutes of developer time is cost-effective.

Free tier limitations: The free ChatGPT plan has very limited or no Codex agent access. Basic code generation through the chat interface (like asking ChatGPT to write code) is available, but the full autonomous Codex agent experience requires a paid tier.`,
          hinglish: `Codex ke access tiers samajhna tumhe sahi plan choose karne aur costs estimate karne mein help karta hai. 2025 ke pricing landscape ke hisaab se:

ChatGPT Plus ($20/month): Limited number of Codex tasks per month ke saath Codex agent access milta hai. Plus users ko Pro users se significantly kam Codex tasks milte hain. Best for: individuals jo occasional coding assistance chahte hain, learning kar rahe hain, ya Pro commit karne se pehle explore karna chahte hain.

ChatGPT Pro ($200/month): Significantly zyada Codex tasks per month. Yeh tier un developers ke liye hai jo regularly Codex ko workflow mein use karna chahte hain — multiple tasks per day feasible hai. $200/month mehenga lagta hai jab tak developer time se compare na karo: agar Codex per month routine tasks pe 2-3 ghante bachata hai, toh already worth ho gayi kisi bhi reasonable hourly developer rate pe.

ChatGPT Team: Centralized billing ke saath shared organization access. Teams apna Codex usage pool kar sakti hain. Enterprise compliance, data privacy, aur custom quotas handle karta hai.

OpenAI API (Pay-per-use): Programmatic access ke liye — apne tools, CI/CD pipelines, ya automation workflows mein Codex integrate karo. Har Codex task ke consume kiye gaye compute resources ke basis pe pay karo (jo tokens + execution time + sandbox compute map karta hai). Maximum flexibility milti hai.

Cost estimation: Ek simple Codex task (ek bug fix, ek function with tests) 10-30 minutes of API compute equivalent ho sakta hai. Ek large task (complete feature across multiple files with comprehensive tests) 1-3 hours equivalent ho sakta hai. Apne hourly developer cost se compare karo — $50-150/hr developer cost pe, ek $5-15 Codex API task jo 30 minutes developer time bachata hai, cost-effective hai.

Free tier limitations: Free ChatGPT plan mein Codex agent access bahut limited ya na ke barabar hai. Full autonomous Codex agent experience ke liye paid tier chahiye.`,
        },
        dailyLifeExample: `Socho ek courier service ke plans: Free plan mein tum khud parcel deliver karte ho (ChatGPT copy-paste). Plus plan mein limited number of deliveries per month (Codex basic access). Pro plan mein unlimited deliveries (Codex for regular use). API plan mein tum delivery company se direct contract karte ho apni specific needs ke liye. Har plan ka trade-off hai convenience vs cost — choose karo based on kitna actually use karoge.`,
        codeExample: `# Codex Pricing Comparison aur Cost Calculation

from dataclasses import dataclass
from typing import Optional

@dataclass
class CodexPlan:
    name: str
    monthly_cost_usd: float
    codex_tasks_per_month: str  # Approximate, OpenAI changes these
    best_for: str

@dataclass
class TaskCostEstimate:
    task_description: str
    estimated_complexity: str  # simple/medium/complex
    estimated_developer_hours_saved: float
    developer_hourly_rate_usd: float

    @property
    def value_saved(self) -> float:
        return self.estimated_developer_hours_saved * self.developer_hourly_rate_usd

# ============================================
# Plan comparison
# ============================================
plans = [
    CodexPlan(
        name="ChatGPT Free",
        monthly_cost_usd=0,
        codex_tasks_per_month="Very limited / not available",
        best_for="Basic chat coding help only, no autonomous agent"
    ),
    CodexPlan(
        name="ChatGPT Plus",
        monthly_cost_usd=20,
        codex_tasks_per_month="Limited (exact count changes -- check openai.com)",
        best_for="Individuals exploring Codex, occasional use"
    ),
    CodexPlan(
        name="ChatGPT Pro",
        monthly_cost_usd=200,
        codex_tasks_per_month="Significantly more (suitable for daily use)",
        best_for="Developers integrating Codex into regular workflow"
    ),
    CodexPlan(
        name="OpenAI API",
        monthly_cost_usd=0,  # Pay per task
        codex_tasks_per_month="Unlimited (pay per task)",
        best_for="Programmatic integration, CI/CD, high-volume predictable use"
    ),
]

print("=== Codex Plan Comparison ===")
print()
for plan in plans:
    print(f"Plan: {plan.name}")
    print(f"  Cost: ${plan.monthly_cost_usd}/month (+ API costs if applicable)")
    print(f"  Tasks: {plan.codex_tasks_per_month}")
    print(f"  Best for: {plan.best_for}")
    print()

# ============================================
# Cost-benefit analysis
# ============================================
example_tasks = [
    TaskCostEstimate(
        task_description="Add pagination to users list endpoint",
        estimated_complexity="simple",
        estimated_developer_hours_saved=1.5,
        developer_hourly_rate_usd=75
    ),
    TaskCostEstimate(
        task_description="Migrate 5 service files from callbacks to async/await",
        estimated_complexity="medium",
        estimated_developer_hours_saved=4.0,
        developer_hourly_rate_usd=75
    ),
    TaskCostEstimate(
        task_description="Add comprehensive TypeScript types to entire src/services/ directory",
        estimated_complexity="complex",
        estimated_developer_hours_saved=8.0,
        developer_hourly_rate_usd=75
    ),
]

print("=== Cost-Benefit Analysis ===")
print("(Assuming $75/hr developer rate)")
print()
for task in example_tasks:
    print(f"Task: {task.task_description}")
    print(f"  Complexity: {task.estimated_complexity}")
    print(f"  Developer time saved: {task.estimated_developer_hours_saved} hours")
    print(f"  Value of time saved: ${task.value_saved:.0f}")
    print(f"  Codex Pro plan cost allocated (1 task of ~30/month): ~${200/30:.1f}")
    roi = task.value_saved / (200/30)
    print(f"  ROI: {roi:.0f}x return on this single task")
    print()

# ============================================
# When to use which access method
# ============================================
print("=== Access Method Decision Guide ===")
decision_guide = {
    "I want to try Codex for the first time": "ChatGPT Plus — low commitment",
    "I code daily and want to use Codex regularly": "ChatGPT Pro — best balance",
    "My team needs shared access": "ChatGPT Team or Enterprise",
    "I want to automate Codex in scripts/CI": "OpenAI API — programmatic access",
    "I need to integrate Codex into internal tools": "OpenAI API — full control",
    "I'm a student / learning": "Plus to start, API if building projects",
}
for use_case, recommendation in decision_guide.items():
    print(f"  If: {use_case}")
    print(f"  -> {recommendation}")
    print()`,
        keyPoints: [
          'Plus ($20/month): Limited tasks, good for exploring Codex capabilities',
          'Pro ($200/month): Regular daily developer use, best for serious adoption',
          'Team/Enterprise: Shared org access, compliance features, custom quotas',
          'API (pay-per-use): For programmatic integration, CI/CD pipelines, automation',
          'Cost-benefit: Compare Codex cost vs developer hourly rate x hours saved',
          'Free tier has very limited or no autonomous Codex agent access',
          'Always check openai.com for current limits — OpenAI adjusts these regularly',
        ],
        quiz: [
          {
            question: 'Ek developer jo Codex ko regularly apne daily workflow mein use karna chahta hai (multiple tasks per day), uske liye kaunsa plan best hai?',
            options: [
              'ChatGPT Free — kyunki Codex free mein available hai',
              'ChatGPT Plus ($20/month) — sabse popular plan hai',
              'ChatGPT Pro ($200/month) — significantly more tasks milte hain, regular developer use ke liye suitable hai',
              'OpenAI API — kyunki programmatic access chahiye',
            ],
            correctIndex: 2,
          },
          {
            question: 'Codex API vs ChatGPT Pro kab use karna chahiye?',
            options: [
              'API hamesha better hai',
              'API tab use karo jab Codex ko apne tools/scripts/CI-CD mein programmatically integrate karna ho; Pro tab use karo jab manually ChatGPT interface se tasks assign karne ho',
              'Pro tab use karo jab free trial khatam ho jaaye',
              'API free hai, Pro paid — bas isi basis pe choose karo',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What access options are available for OpenAI Codex agent?',
            difficulty: 'easy',
            frequency: 'medium',
            answer: {
              english: 'Codex agent is accessible through multiple tiers: ChatGPT Plus ($20/month) with limited tasks, ChatGPT Pro ($200/month) with significantly more tasks suitable for regular developer use, ChatGPT Team/Enterprise for organizations needing shared access and compliance features, and the OpenAI API for programmatic access on a pay-per-use basis. The API option is best for integrating Codex into CI/CD pipelines or internal tools. The free tier has very limited or no autonomous Codex agent access.',
              hinglish: 'Codex agent multiple tiers se accessible hai: ChatGPT Plus ($20/month) limited tasks ke saath, ChatGPT Pro ($200/month) significantly more tasks ke saath jo regular developer use ke liye suitable hai, ChatGPT Team/Enterprise organizations ke liye shared access aur compliance features ke saath, aur OpenAI API pay-per-use basis pe programmatic access ke liye. API option CI/CD pipelines ya internal tools mein Codex integrate karne ke liye best hai. Free tier mein autonomous Codex agent access bahut limited ya na ke barabar hai.',
            },
          },
        ],
      },
      {
        title: 'Integrating Codex Into Dev Workflow',
        difficulty: 'medium',
        tags: ['workflow', 'integration', 'async', 'productivity'],
        explanation: {
          english: `The key insight for effective Codex integration is that it is asynchronous. Unlike Copilot where you wait for the suggestion, Codex works while you work on something else. This fundamentally changes how you should think about task allocation.

The Async Workflow Pattern:
The most effective Codex users treat it like email: you send a task (like sending an email), go do other work, and check back when Codex is done. You don't sit watching Codex work. This is the opposite of how most developers first try to use it (submit task → stare at the screen → get impatient). Instead: wake up, assign Codex 2-3 tasks → go to standup → work on your main architectural work → review Codex PRs over lunch → assign afternoon tasks → pick up reviews at end of day.

What tasks to delegate vs handle yourself:
Delegate to Codex: non-urgent background tasks (adding tests to untested code, migrating code to new patterns, adding TypeScript types, writing documentation, creating CRUD endpoints following established patterns, fixing well-described bugs with clear reproduction steps).
Handle yourself: Novel architectural decisions, tasks where the "right answer" depends on business context not visible in code, highly security-critical code (auth, payments), urgent critical-path work where you cannot wait for Codex.

How to write a clear task description (the single most impactful skill):
Specificity is everything. Include: what feature/fix is needed, which specific files are relevant, what existing pattern to follow, expected behavior and edge cases, whether tests are required, any constraints (don't change API signature, maintain backward compatibility).

Reviewing Codex PRs like human PRs:
Build a habit: never auto-merge Codex output without reading the diff. Schedule Codex PR reviews the same way you schedule human PR reviews. Leave review comments and let Codex iterate — same workflow as with human developers.

When NOT to use Codex: when the task requires rapid iteration and direct control (you'd spend more time writing task descriptions than just doing it), when you need to think through the problem yourself (learning experiences), when the task requires deep product intuition that is not codifiable in a task description.`,
          hinglish: `Effective Codex integration ki key insight yeh hai ki yeh asynchronous hai. Copilot ki tarah nahi jahan suggestion ka wait karte ho, Codex kaam karta hai jab tum kuch aur karte ho. Yeh fundamentally change karta hai kaise tum task allocation sochte ho.

Async Workflow Pattern:
Best Codex users ise email ki tarah treat karte hain: task bhejo (jaise email bhejte ho), aur kuch aur kaam karo, Codex done ho jaaye tab check karo. Codex ko kaam karte hue mat dekho. Yeh opposite hai jaise zyaadatar developers pehle try karte hain. Instead: uthke, Codex ko 2-3 tasks assign karo, standup ke liye jao, apna main architectural work karo, lunch pe Codex PRs review karo, afternoon tasks assign karo, end of day pe reviews pick karo.

Kya delegate karein vs khud handle karein:
Codex ko delegate karo: non-urgent background tasks (untested code mein tests add karna, code ko new patterns pe migrate karna, TypeScript types add karna, documentation likhna, established patterns follow karte hue CRUD endpoints banana, well-described bugs fix karna).
Khud handle karo: Novel architectural decisions, tasks jahan sahi answer business context pe depend karta hai, highly security-critical code (auth, payments), urgent critical-path work jahan Codex ka wait nahi kar sakte.

Clear task description kaise likhein:
Specificity sab kuch hai. Include karo: kya feature/fix chahiye, kaunse specific files relevant hain, kaunsa existing pattern follow karna hai, expected behavior aur edge cases, tests required hain ya nahi, constraints kya hain.

Codex PRs ko human PRs ki tarah review karo:
Habit banao: Codex output ko kabhi bina diff padhe auto-merge mat karo. Codex PR reviews schedule karo jaise human PR reviews schedule karte ho.

Codex kab use NAT karo: jab task mein rapid iteration aur direct control chahiye (task descriptions likhne mein utna time lagega jitna khud karne mein), jab problem khud soachna zaroori hai (learning experiences), jab task mein deep product intuition chahiye.`,
        },
        dailyLifeExample: `Socho tum ek manager ho aur Codex ek capable junior developer hai jo remote kaam karta hai. Tum use roz subah tasks assign karte ho ("Aaj yeh PR banao"), aur phir apna senior-level kaam karte ho. Lunch ke baad uske kaam review karte ho, feedback dete ho. Tum khud line-by-line code nahi likhte — tum direct karte ho aur review karte ho. Yahi senior developer kaam karta hai.`,
        codeExample: `# Effective Codex Workflow Integration

from datetime import datetime, time
from typing import List
from dataclasses import dataclass, field

@dataclass
class CodexTask:
    description: str
    priority: str  # 'background' | 'normal' | 'urgent'
    estimated_complexity: str
    files_affected: List[str] = field(default_factory=list)

@dataclass
class WorkflowSession:
    date: str
    morning_tasks: List[CodexTask] = field(default_factory=list)
    afternoon_tasks: List[CodexTask] = field(default_factory=list)
    your_focus: str = ""

# ============================================
# EXAMPLE: Ek developer ka daily workflow
# ============================================

def plan_daily_workflow(your_main_focus: str) -> WorkflowSession:
    """
    Async Codex workflow plan karo ek din ke liye.
    """
    session = WorkflowSession(
        date=datetime.now().strftime("%Y-%m-%d"),
        your_focus=your_main_focus
    )

    # Subah: Codex ko tasks assign karo, phir apna kaam karo
    session.morning_tasks = [
        CodexTask(
            description="""
            Add missing tests to src/services/notification_service.py.

            Current test coverage: 0% (no tests exist)
            Files: src/services/notification_service.py

            Write pytest tests in tests/test_notification_service.py covering:
            - send_email(): valid params, missing recipient, invalid template
            - send_sms(): valid params, invalid phone format
            - send_push(): valid params, invalid device token

            Follow the pattern in tests/test_email_service.py for fixture setup.
            Use unittest.mock to mock the actual sending calls.
            """,
            priority="background",
            estimated_complexity="medium",
            files_affected=["src/services/notification_service.py"]
        ),
        CodexTask(
            description="""
            Migrate src/utils/date_helpers.js to TypeScript.

            File: src/utils/date_helpers.js
            Task: Rename to date_helpers.ts, add TypeScript types only.
            Rules:
            - Do NOT change any logic
            - Strict mode compatible types
            - Run: npx tsc --noEmit to verify no errors
            - Update import in src/components/DatePicker.jsx
            """,
            priority="background",
            estimated_complexity="simple",
            files_affected=["src/utils/date_helpers.js"]
        ),
    ]

    print(f"=== Daily Workflow Plan: {session.date} ===")
    print()
    print(f"[8:00 AM] Assign to Codex:")
    for i, task in enumerate(session.morning_tasks, 1):
        print(f"  Task {i}: {task.description[:60]}...")

    print()
    print(f"[8:30 AM - 12:30 PM] YOUR FOCUS: {your_main_focus}")
    print("  (Codex works in background — you focus on high-value work)")

    print()
    print("[12:30 PM] Review Codex PRs from morning tasks")
    print("  - Pull each branch, run tests locally")
    print("  - Read every diff carefully")
    print("  - Merge if good, or leave review comments for iteration")

    print()
    print("[1:30 PM] Assign afternoon tasks to Codex")

    print()
    print("[2:00 PM - 5:00 PM] Continue YOUR main focus work")

    print()
    print("[5:00 PM] Final Codex PR reviews")

    return session

# ============================================
# WHEN TO USE vs NOT USE Codex
# ============================================

use_codex = {
    "Good Codex tasks": [
        "Add tests to existing untested code",
        "Migrate code to new patterns (callbacks -> async/await)",
        "Add TypeScript types to JS files",
        "Create CRUD endpoints following existing pattern",
        "Fix well-described bugs (clear reproduction steps)",
        "Write/update documentation",
        "Database migrations following existing migration patterns",
        "Refactor for consistency across multiple files",
    ],
    "Bad Codex tasks (do yourself)": [
        "Design the system architecture for the new microservice",
        "Decide if we should use PostgreSQL or MongoDB",
        "Urgent production fix needed in 30 minutes",
        "Feature requiring deep product intuition",
        "Task you need to learn from (don't delegate your learning)",
        "Security audit of auth system",
        "Performance optimization (requires profiling + context)",
    ]
}

for category, tasks in use_codex.items():
    print(f"\\n{category}:")
    for task in tasks:
        symbol = "+" if "Good" in category else "-"
        print(f"  [{symbol}] {task}")

session = plan_daily_workflow("Design new payment service architecture")`,
        keyPoints: [
          'Codex is async — assign tasks and work on other things while it executes',
          'Build a "morning task assignment" habit: assign Codex tasks before your own focus work',
          'Delegate background, non-urgent, well-defined tasks; do novel/urgent/security work yourself',
          'Never auto-merge Codex PRs — build PR review into your scheduled workflow',
          'Codex is NOT good for: urgent work, learning experiences, architectural decisions',
          'Write specific task descriptions upfront — vague tasks produce vague code',
          'Leave review comments and iterate with Codex, same workflow as human developers',
        ],
        quiz: [
          {
            question: 'Codex ko workflow mein integrate karne ka most effective pattern kaunsa hai?',
            options: [
              'Har Codex task submit karo aur screen pe baithke result ka wait karo',
              'Codex ko sirf jab tumhare paas koi aur kaam na ho tab use karo',
              'Async workflow: morning mein tasks assign karo, apna main work karo, baad mein PRs review karo — Codex background mein kaam karta hai',
              'Codex ko sirf Friday ko use karo weekly tasks ke liye',
            ],
            correctIndex: 2,
          },
          {
            question: 'Kaunsa task Codex ko delegate karna LEAST appropriate hai?',
            options: [
              'Untested code mein tests add karna',
              'JavaScript se TypeScript migrate karna',
              'Production mein 30 minutes mein fix karna zaroori hai (urgent critical path work)',
              'CRUD endpoints banana existing pattern follow karte hue',
            ],
            correctIndex: 2,
          },
        ],
      },
      {
        title: 'Prompt Engineering for Codex Tasks',
        difficulty: 'hard',
        tags: ['prompt-engineering', 'task-description', 'best-practices', 'iteration'],
        explanation: {
          english: `Writing effective task descriptions for Codex is arguably the most important skill to develop. The quality of your task description directly determines the quality of Codex's output. This is not the same as ChatGPT prompt engineering — you are writing a task specification, not a conversational prompt.

The anatomy of an excellent Codex task description:

1. Clear objective statement: Start with what you want accomplished in one sentence. "Add rate limiting to the /api/auth/login endpoint."

2. Repository context: Tell Codex exactly where to look. "Relevant files: src/middleware/ (existing middleware), src/routes/auth.js (the endpoint), package.json (check installed packages)." This prevents Codex from wasting time searching or making wrong assumptions.

3. Implementation specification: Describe the behavior, not the implementation. "Rate limit to 10 requests per minute per IP address. After exceeding limit, return 429 Too Many Requests with a Retry-After header." Let Codex choose the implementation approach unless you have strong preferences.

4. Existing pattern reference: This is high leverage. "Use the same middleware pattern as the existing cors middleware in src/middleware/cors.js." Codex will match your style perfectly.

5. Test requirements: Be explicit. "Write Jest tests covering: successful request under limit, 429 response after limit exceeded, rate limit reset after 60 seconds (use fake timers), per-IP isolation (two IPs don't share limits)." Vague test requirements lead to shallow tests.

6. Constraints: "Do NOT change any existing middleware, only add the new rate limiter. Do not add new npm packages — use express-rate-limit which is already installed. Keep backward compatible with all existing tests."

Bad vs Good task examples — the difference is staggering. Bad: "Add rate limiting." Good: the full specification above. Bad tasks lead to Codex making assumptions that may or may not match your intent, producing code that needs heavy revision, or worse — technically correct but missing important edge cases.

Iterating effectively: When Codex's first attempt misses: (1) identify specifically what is wrong, (2) reference the exact behavior or file that needs to change, (3) clarify any ambiguity in the original task. Do not say "this doesn't work" — say "the per-IP isolation is not working because the rate limit key uses only the endpoint path, not path + IP address. Fix the key construction in middleware/rate_limiter.js line 23."`,
          hinglish: `Codex ke liye effective task descriptions likhna arguably sabse important skill hai develop karne ke liye. Task description ki quality directly Codex output ki quality determine karti hai. Yeh ChatGPT prompt engineering jaisa nahi hai — tum task specification likh rahe ho, conversational prompt nahi.

Excellent Codex task description ki anatomy:

1. Clear objective statement: Ek sentence mein kya accomplish karna hai batao. "Add rate limiting to the /api/auth/login endpoint."

2. Repository context: Exactly batao Codex ko kahan dekhna hai. "Relevant files: src/middleware/ (existing middleware), src/routes/auth.js (the endpoint), package.json (check installed packages)." Yeh Codex ko searching mein time waste karne se rokta hai.

3. Implementation specification: Behavior describe karo, implementation nahi. "Rate limit karo 10 requests per minute per IP address. Limit exceed hone ke baad 429 Too Many Requests return karo with Retry-After header." Codex ko implementation approach choose karne do.

4. Existing pattern reference: High leverage hai yeh. "Use the same middleware pattern as the existing cors middleware in src/middleware/cors.js." Codex tumhara style perfectly match karega.

5. Test requirements: Explicit raho. "Jest tests likho covering: successful request under limit, 429 response after limit exceeded, rate limit reset after 60 seconds (fake timers use karo), per-IP isolation." Vague test requirements shallow tests lead karte hain.

6. Constraints: "Existing middleware mat change karo, sirf naya rate limiter add karo. Naye npm packages mat add karo — express-rate-limit already installed hai. Existing tests backward compatible rakho."

Bad vs Good task examples — difference staggering hai. Bad: "Add rate limiting." Good: upar ki full specification. Bad tasks Codex ko assumptions banane par force karte hain jo tumhari intent se match ho ya na ho, heavy revision chahne wala code produce karte hain.

Effectively iterate kaise karein: Jab Codex ki pehli attempt miss ho: (1) specifically identify karo kya galat hai, (2) exact behavior ya file reference karo, (3) original task ki koi ambiguity clarify karo. "Yeh kaam nahi karta" mat kaho — kaho "per-IP isolation kaam nahi kar raha kyunki rate limit key sirf endpoint path use karta hai, path + IP nahi. middleware/rate_limiter.js line 23 mein key construction fix karo."`,
        },
        dailyLifeExample: `Socho tum ek architect ho aur Codex tumhara contractor hai. Agar tum bolte ho "ek accha ghar banao" — contractor confuse ho jaayega. Lekin agar tum detailed blueprints dete ho — floor plan, specifications, materials list, existing structure ka reference, constraints (load-bearing walls mat hato) — contractor exactly wahi banayega jo tum chahte ho. Codex ke liye task description wohi blueprint hai.`,
        codeExample: `# Prompt Engineering for Codex — Bad vs Good Examples

# ============================================
# EXAMPLE 1: Bug Fix Task
# ============================================

bad_bug_task = "Fix the login bug"
# Problems: Which bug? Where? What behavior expected? What causes it?

good_bug_task = """
Bug Fix: User session expires too early on mobile browsers.

Bug report:
- Users on mobile (iOS Safari, Android Chrome) get logged out after ~10 minutes
- Desktop users stay logged in for 24 hours (expected behavior)
- Started happening after the PR merged last Tuesday (commit abc123)

Root cause (already investigated):
- Session token stored in sessionStorage on mobile (wrong)
- Should be stored in localStorage with 24h expiry (like desktop)
- Likely in src/auth/tokenStorage.js -- the detectMobile() check at line 47
  might be incorrectly classifying some desktop browsers as mobile

Task:
1. Find and fix the storage selection logic in src/auth/tokenStorage.js
2. Ensure tokens always use localStorage with 24h expiry regardless of browser
3. Add regression tests in tests/auth/test_token_storage.js covering:
   - iOS Safari user agent -> uses localStorage, not sessionStorage
   - Android Chrome user agent -> uses localStorage
   - Desktop Chrome user agent -> uses localStorage
   - Token expiry set to 24 hours (86400 seconds) in all cases
4. Verify existing tests still pass

Do NOT change the token format or the auth API endpoints.
"""

# ============================================
# EXAMPLE 2: Feature Implementation Task
# ============================================

bad_feature_task = "Add search to the products page"
# Completely underspecified — search where? Which field? API or frontend?

good_feature_task = """
Feature: Add search/filter functionality to GET /api/products endpoint.

Current behavior:
GET /api/products returns all products paginated.
Response format: {"data": [...], "meta": {"total": int, "page": int, "limit": int}}

Required changes to GET /api/products:
1. Add optional query param: ?search=<string>
   - Search across: product name (exact + partial), SKU (exact), description (partial)
   - Case-insensitive
   - If search is empty/absent, return all products (current behavior unchanged)

2. Add optional query param: ?category_id=<uuid>
   - Filter by exact category match
   - Can be combined with search (AND logic)

3. Pagination must still work with filters applied
   - total in meta must reflect filtered count, not all products

Implementation notes:
- ORM: SQLAlchemy (see existing queries in src/repositories/product_repository.py)
- Database: PostgreSQL (ILIKE for case-insensitive search)
- Follow existing query builder pattern in product_repository.py
- See tests/test_product_repository.py for fixture setup

Tests required (add to tests/test_product_endpoints.py):
- Search by name partial match
- Search by SKU exact match
- Filter by category_id
- Combined search + category filter
- Empty search returns all products (backward compat)
- Pagination works correctly with filters (page 2 of filtered results)
- search param with SQL injection characters is safe (param binding)

Constraints:
- Do NOT change response format
- Do NOT add any new Python packages (SQLAlchemy already supports everything needed)
- All existing product tests must still pass
"""

# ============================================
# EXAMPLE 3: Iteration feedback
# ============================================

bad_iteration = "The tests are failing"
# Useless — Codex cannot act on this

good_iteration = """
Iteration feedback on your rate limiter PR:

Failing test: test_rate_limit_per_ip_isolation (tests/test_rate_limiter.py:line 87)

Error output:
  AssertionError: IP 192.168.1.1 is being affected by IP 192.168.1.2's requests
  Expected: IP 1 can make 10 requests; IP 2 can separately make 10 requests
  Actual: After IP 1 makes 10 requests, IP 2's 1st request is also rate limited

Root cause I found: In your implementation at src/middleware/rate_limiter.py line 34,
the cache key is:
  key = f"rate_limit:{request.path}"
It should be:
  key = f"rate_limit:{request.path}:{request.remote_addr}"

Please fix the key construction to include the IP address, and verify the
per-IP isolation test passes. Also double-check the test for rate limit reset --
I want to make sure the key expiry is per-IP as well after this fix.
"""

# ============================================
# Task Description Template
# ============================================
task_template = """
[OBJECTIVE]
One sentence: what do you want accomplished?

[REPOSITORY CONTEXT]
Relevant files: <list specific files and why they're relevant>
Framework/libs: <what is already installed/in use>
Existing pattern to follow: <point to a specific example file>

[REQUIREMENTS]
1. <specific requirement with expected behavior>
2. <specific requirement with expected behavior>
... (be exhaustive)

[TEST REQUIREMENTS]
Write tests covering:
- <specific test case 1>
- <specific test case 2>
- <edge cases>
- <error conditions>

[CONSTRAINTS]
- Do NOT change: <list things to preserve>
- Do NOT add: <libraries or patterns to avoid>
- Backward compatibility: <what must still work>
"""

print("Codex Task Description Template:")
print(task_template)
print("\\nRemember: Quality of task description = Quality of Codex output")`,
        keyPoints: [
          'Task description quality directly determines Codex output quality — invest time here',
          'Always include: objective, relevant files, implementation specs, test requirements, constraints',
          'Reference existing patterns: "follow the pattern in file X" is extremely high leverage',
          'Specify tests explicitly — what cases to cover, what edge cases to test',
          'List constraints: what NOT to change, what packages NOT to add',
          'For iteration: be specific — name the exact file, line, and incorrect behavior',
          'Never write vague tasks ("add search") — write specification-level detail',
        ],
        quiz: [
          {
            question: 'Codex task description mein "existing pattern reference" kyun high leverage hai?',
            options: [
              'Kyunki Codex patterns ke bina code nahi likh sakta',
              'Kyunki ek existing file point karna Codex ko tumhara exact style, conventions, aur approach perfectly match karne deta hai — explicitly describe karne se zyada effective',
              'Kyunki patterns Codex ki speed improve karte hain',
              'Kyunki reference files Codex ke context window mein fit hote hain',
            ],
            correctIndex: 1,
          },
          {
            question: 'Codex ke first attempt ke baad iterate karte waqt kaunsa feedback sabse effective hai?',
            options: [
              '"Yeh kaam nahi karta, dobara karo"',
              '"Tests fail ho rahe hain"',
              '"test_rate_limit_per_ip_isolation fail ho raha hai line 87 pe kyunki rate limit key mein IP address include nahi hai — src/middleware/rate_limiter.py line 34 mein key construction fix karo"',
              '"Poori implementation galat hai, fresh start karo"',
            ],
            correctIndex: 2,
          },
        ],
        interviewQuestions: [
          {
            question: 'What information should you include in a Codex task description for best results?',
            difficulty: 'medium',
            frequency: 'high',
            answer: {
              english: 'An effective Codex task description should include: (1) A clear one-sentence objective stating what to accomplish. (2) Relevant file paths — tell Codex exactly where to look. (3) Implementation specifications describing expected behavior and edge cases. (4) An existing pattern reference — point to a specific file for Codex to follow for style/conventions. (5) Explicit test requirements listing which cases to cover. (6) Constraints specifying what not to change, what packages not to add, and backward compatibility requirements. Vague tasks like "add search" produce vague results; specification-level detail produces production-ready output.',
              hinglish: 'Effective Codex task description mein include karo: (1) Clear ek-sentence objective kya accomplish karna hai. (2) Relevant file paths — exactly batao Codex ko kahan dekhna hai. (3) Implementation specifications jo expected behavior aur edge cases describe karte hain. (4) Existing pattern reference — style/conventions ke liye specific file point karo. (5) Explicit test requirements listing kaunse cases cover karne hain. (6) Constraints specifying kya change nahi karna, kaunse packages add nahi karne, aur backward compatibility requirements. Vague tasks jaise "add search" vague results produce karte hain; specification-level detail production-ready output produce karta hai.',
            },
          },
        ],
      },
    ],
  },
];

export const generalInterviewQuestions = [
  {
    question: 'What is the difference between OpenAI Codex and GitHub Copilot?',
    difficulty: 'easy',
    frequency: 'high',
    answer: {
      english: 'GitHub Copilot provides real-time inline code suggestions inside your IDE as you type — it is an autocomplete tool for moment-to-moment coding assistance. OpenAI Codex (2025) is an autonomous agent that accepts a natural language task description and independently executes the full software engineering workflow: reading your repository, planning, writing code, running tests, iterating on failures, and producing a PR-ready diff for your review. Copilot operates at line/function scope and requires you to be driving; Codex operates at feature/task scope and works autonomously in an isolated cloud sandbox.',
      hinglish: 'GitHub Copilot real-time inline code suggestions deta hai tumhare IDE ke andar jab tum type karte ho — yeh moment-to-moment coding assistance ke liye autocomplete tool hai. OpenAI Codex (2025) ek autonomous agent hai jo natural language task description accept karta hai aur independently full software engineering workflow execute karta hai: repository padhna, planning, code likhna, tests run karna, failures pe iterate karna, aur PR-ready diff produce karna review ke liye. Copilot line/function scope pe operate karta hai aur tumhare drive karne ki zaroorat hai; Codex feature/task scope pe operate karta hai aur isolated cloud sandbox mein autonomously kaam karta hai.',
    },
  },
  {
    question: 'How does Codex handle running and testing code?',
    difficulty: 'medium',
    frequency: 'high',
    answer: {
      english: 'Codex runs code in an isolated, ephemeral cloud sandbox. After writing code changes, it executes your actual test suite (npm test, pytest, go test, etc.) in the sandbox and reads the real pass/fail output. If tests fail, Codex does not give up — it reads the error output, diagnoses what went wrong, modifies the code, and runs tests again. This iteration loop can repeat multiple times until tests pass or Codex determines it needs human input. The sandbox has no access to production systems — it only works within the cloned repository environment.',
      hinglish: 'Codex code ek isolated, ephemeral cloud sandbox mein run karta hai. Code changes likhne ke baad, yeh sandbox mein tumhara actual test suite (npm test, pytest, go test, etc.) execute karta hai aur real pass/fail output padhta hai. Agar tests fail hote hain, Codex haara nahi maanta — error output padhta hai, kya galat hua diagnose karta hai, code modify karta hai, aur tests dobara run karta hai. Yeh iteration loop multiple times repeat ho sakta hai jab tak tests pass na ho jaayein ya Codex determine na kar le ki human input chahiye. Sandbox ke paas production systems ka koi access nahi hai.',
    },
  },
  {
    question: 'What kind of tasks is Codex best suited for?',
    difficulty: 'easy',
    frequency: 'high',
    answer: {
      english: 'Codex is best suited for well-defined, non-urgent engineering tasks: adding tests to untested code, implementing features from clear specifications (following existing patterns), fixing bugs with clear reproduction steps plus adding regression tests, refactoring code across multiple files for consistency, migrating to new patterns (callbacks to async/await, JS to TypeScript), writing documentation, creating CRUD endpoints following established conventions, and database migrations. Codex is NOT well-suited for: novel architectural decisions requiring business context, urgent critical-path work, highly security-sensitive changes requiring deep domain expertise, or tasks where the right answer depends on product decisions not visible in the code.',
      hinglish: 'Codex well-defined, non-urgent engineering tasks ke liye best suited hai: untested code mein tests add karna, clear specifications se features implement karna (existing patterns follow karte hue), clear reproduction steps ke saath bugs fix karna plus regression tests add karna, consistency ke liye multiple files mein code refactor karna, new patterns pe migrate karna, documentation likhna, established conventions follow karte hue CRUD endpoints banana, aur database migrations. Codex ke liye NOT well-suited: novel architectural decisions jo business context chahten hain, urgent critical-path work, highly security-sensitive changes, ya tasks jahan sahi answer product decisions pe depend karta hai jo code mein visible nahi hain.',
    },
  },
  {
    question: 'How does Codex work in a sandbox environment?',
    difficulty: 'medium',
    frequency: 'medium',
    answer: {
      english: 'Codex creates an isolated, ephemeral cloud compute environment for each task. In this sandbox, it clones your repository and reads the project structure. It then plans which files to modify or create, writes the code changes, runs your existing test suite with the actual test runner, and iterates if tests fail. The sandbox is completely isolated — it has no access to your production database, live servers, external APIs, or any system outside the repository. It exists only for the duration of the task and is destroyed afterward. This design guarantees that Codex cannot accidentally impact production systems, making it safe to run autonomously.',
      hinglish: 'Codex har task ke liye ek isolated, ephemeral cloud compute environment create karta hai. Is sandbox mein, yeh tumhara repository clone karta hai aur project structure padhta hai. Phir plan karta hai kaunsi files modify ya create karni hain, code changes likhta hai, actual test runner se tumhara existing test suite run karta hai, aur fail hone pe iterate karta hai. Sandbox completely isolated hai — iske paas tumhare production database, live servers, external APIs, ya repository ke bahar kisi bhi system ka access nahi hai. Yeh sirf task ki duration ke liye exist karta hai aur baad mein destroy ho jaata hai. Yeh design guarantee karta hai ki Codex accidentally production systems impact nahi kar sakta.',
    },
  },
  {
    question: 'What plans give you access to Codex agent?',
    difficulty: 'easy',
    frequency: 'medium',
    answer: {
      english: 'Codex agent access is available through: ChatGPT Plus ($20/month) with a limited number of tasks per month, suitable for occasional exploration; ChatGPT Pro ($200/month) with significantly more tasks per month, suitable for regular developer use; ChatGPT Team for shared organization access with centralized billing; ChatGPT Enterprise for compliance-heavy organizations with custom quotas; and the OpenAI API on a pay-per-use basis for programmatic access and integration into tools/CI-CD pipelines. The free ChatGPT tier has very limited or no access to the autonomous Codex agent. Always check openai.com for current limits as OpenAI adjusts these regularly.',
      hinglish: 'Codex agent access available hai through: ChatGPT Plus ($20/month) limited tasks per month ke saath, occasional exploration ke liye suitable; ChatGPT Pro ($200/month) significantly more tasks per month ke saath, regular developer use ke liye suitable; ChatGPT Team shared organization access ke liye centralized billing ke saath; ChatGPT Enterprise compliance-heavy organizations ke liye custom quotas ke saath; aur OpenAI API pay-per-use basis pe programmatic access aur tools/CI-CD pipelines mein integration ke liye. Free ChatGPT tier mein autonomous Codex agent ka bahut limited ya koi access nahi hai. Current limits ke liye hamesha openai.com check karo kyunki OpenAI inhe regularly adjust karta hai.',
    },
  },
  {
    question: 'How should you review Codex\'s output before merging?',
    difficulty: 'medium',
    frequency: 'high',
    answer: {
      english: 'Review Codex output with the same rigor as any human PR — probably more. Key steps: (1) Read every changed line in the diff and understand it before approving — never approve code you don\'t understand. (2) Check for security issues: SQL injection, missing auth checks, hardcoded values, unhandled user input. (3) Evaluate test quality — Codex sometimes writes narrow tests covering only happy path; check if edge cases and error conditions are covered. (4) Pull the branch and run tests locally in your own environment, not just trusting sandbox results. (5) Read Codex\'s summary to understand assumptions it made. (6) Manually test the feature/fix in your dev environment. Never auto-merge changes to auth, payments, security middleware, or anything you cannot explain line by line.',
      hinglish: 'Codex output ko kisi bhi human PR ki tarah rigorous review karo — shayad aur zyada. Key steps: (1) Diff mein har changed line padho aur approve karne se pehle samjho — aise code kabhi approve mat karo jo tum nahi samajhte. (2) Security issues check karo: SQL injection, missing auth checks, hardcoded values, unhandled user input. (3) Test quality evaluate karo — Codex kabhi kabhi narrow tests likhta hai sirf happy path cover karte hue; check karo edge cases aur error conditions covered hain ya nahi. (4) Branch pull karo aur apne environment mein locally tests run karo, sirf sandbox results pe trust mat karo. (5) Codex ki summary padho assumptions samajhne ke liye. (6) Dev environment mein feature/fix manually test karo. Auth, payments, security middleware, ya kuch bhi jo tum line by line explain nahi kar sakte — kabhi auto-merge mat karo.',
    },
  },
  {
    question: 'What information should you give Codex for best results?',
    difficulty: 'medium',
    frequency: 'high',
    answer: {
      english: 'For best Codex results, provide a specification-level task description including: (1) A clear one-sentence objective. (2) Specific file paths relevant to the task — tell Codex exactly where to look. (3) Implementation requirements as expected behavior, not implementation instructions. (4) A reference to an existing pattern to follow ("follow the pattern in src/routes/products.py"). (5) Explicit test requirements listing specific cases to cover, edge cases, and error conditions. (6) Clear constraints — what not to change, what packages not to add, backward compatibility requirements. A well-maintained codebase with consistent conventions, a good README with setup/test instructions, and descriptive naming also dramatically improve Codex\'s ability to produce correct, style-matching output.',
      hinglish: 'Best Codex results ke liye, specification-level task description do jisme include ho: (1) Clear ek-sentence objective. (2) Task se relevant specific file paths — exactly batao Codex ko kahan dekhna hai. (3) Implementation requirements expected behavior ke roop mein, implementation instructions ke roop mein nahi. (4) Follow karne ke liye existing pattern ka reference ("src/routes/products.py mein pattern follow karo"). (5) Explicit test requirements listing specific cases, edge cases, aur error conditions jo cover karne hain. (6) Clear constraints — kya change nahi karna, kaunse packages add nahi karne, backward compatibility requirements. Consistent conventions ke saath well-maintained codebase, setup/test instructions ke saath achha README, aur descriptive naming bhi Codex ki ability ko dramatically improve karte hain correct, style-matching output produce karne mein.',
    },
  },
  {
    question: 'What is the difference between Codex agent and ChatGPT\'s code generation?',
    difficulty: 'easy',
    frequency: 'high',
    answer: {
      english: 'ChatGPT code generation is conversational: you describe a problem, ChatGPT responds with code snippets, and YOU are the executor — you copy the code, paste it into your project, run it, see what breaks, and iterate by pasting errors back into the chat. ChatGPT cannot run code, read your actual repository, or verify its suggestions work in your environment. Codex agent is autonomous execution: you submit a task description, Codex clones your real repository, writes code in an isolated sandbox, actually runs your test suite, iterates on failures automatically, and delivers a PR-ready diff. You review and merge, but Codex does the implementation. The key differences are: Codex reads real repos vs ChatGPT gets snippets you paste; Codex executes code vs ChatGPT only suggests; Codex iterates autonomously vs you iterate manually with ChatGPT.',
      hinglish: 'ChatGPT code generation conversational hai: tum problem describe karte ho, ChatGPT code snippets se respond karta hai, aur tum executor ho — tum code copy karte ho, project mein paste karte ho, run karte ho, kya toot gaya dekhte ho, aur errors wapas paste karke iterate karte ho. ChatGPT code run nahi kar sakta, tumhara actual repository nahi padh sakta, ya verify nahi kar sakta ki uske suggestions tumhare environment mein kaam karte hain. Codex agent autonomous execution hai: tum task description submit karte ho, Codex tumhara real repository clone karta hai, isolated sandbox mein code likhta hai, actually tumhara test suite run karta hai, automatically failures pe iterate karta hai, aur PR-ready diff deliver karta hai. Tum review aur merge karte ho, lekin Codex implementation karta hai. Key differences: Codex real repos padhta hai vs ChatGPT tumhare paste kiye snippets get karta hai; Codex code execute karta hai vs ChatGPT sirf suggest karta hai; Codex autonomously iterate karta hai vs tum manually ChatGPT ke saath iterate karte ho.',
    },
  },
];
