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
    print(f"  Cost: \${plan.monthly_cost_usd}/month (+ API costs if applicable)")
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
    print(f"  Value of time saved: \${task.value_saved:.0f}")
    print(f"  Codex Pro plan cost allocated (1 task of ~30/month): ~\${200/30:.1f}")
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
  {
    title: 'Maximising Codex in Daily Dev Workflow',
    level: 'advanced',
    description: 'Codex ko apne real development workflow mein integrate karo — GitHub Actions ke saath issue-to-PR automation, TDD, systematic refactoring, aur automated PR reviews.',
    concepts: [
      {
        title: 'Issue-to-PR Automation Pipeline',
        difficulty: 'hard',
        tags: ['github-actions', 'automation', 'ci-cd', 'workflow', 'agentic'],
        explanation: {
          english: `The most powerful way to use Codex is not through the ChatGPT interface manually — it is by wiring it into your GitHub workflow so that creating a GitHub Issue automatically triggers Codex to read the issue, explore the codebase, write the code, run tests, and open a PR. This is full-cycle agentic software development.

Here is how the pipeline works end-to-end:

Step 1 — Issue Creation: A developer (or product manager, or automated tool) creates a GitHub Issue. The issue is labeled "codex-ready." This label is the trigger signal.

Step 2 — GitHub Actions Triggers: A GitHub Actions workflow watches for issues with the "codex-ready" label. When it sees one, it calls the Codex API with the issue body as the task description.

Step 3 — Codex Reads the Issue: Codex receives the issue content, clones the repository, reads the codebase structure, and begins planning its implementation.

Step 4 — Implementation and Testing: Codex writes the code, runs the test suite, iterates on failures — all in its isolated sandbox. It uses the issue description as its task specification.

Step 5 — PR Opened: Codex opens a GitHub PR with the title referencing the issue, a description summarizing what it did, and links back to the original issue. Your team is notified for review.

What makes a good "codex-ready" issue?
- Clear acceptance criteria: "The endpoint should return 200 with paginated results. The total_count field must reflect filtered results, not all records."
- Links to relevant files: "The user model is in src/models/user.py. Follow the pattern of the existing /products endpoint in src/routes/products.py."
- Test expectations: "Write tests for: success case, auth required, pagination with filters."
- Constraints: "Do not change the response format. Do not add new npm packages."

Issues that fail: vague descriptions without acceptance criteria, issues requiring architectural decisions, security-sensitive changes without domain context.

The payoff: your team spends time on high-value work — architecture, product decisions, code review — while Codex handles the implementation of well-scoped tickets autonomously.`,
          hinglish: `Codex use karne ka sabse powerful tarika ChatGPT interface se manually nahi hai — balki ise apne GitHub workflow mein wire karo taaki GitHub Issue banana automatically Codex ko trigger kare issue padhne, codebase explore karne, code likhne, tests run karne, aur PR open karne ke liye. Yeh full-cycle agentic software development hai.

Pipeline end-to-end kaise kaam karta hai:

Step 1 — Issue Creation: Ek developer (ya product manager, ya automated tool) ek GitHub Issue create karta hai. Issue "codex-ready" label diya jaata hai. Yeh label trigger signal hai.

Step 2 — GitHub Actions Triggers: Ek GitHub Actions workflow "codex-ready" label wale issues watch karta hai. Jab ek milta hai, woh Codex API ko issue body as task description ke saath call karta hai.

Step 3 — Codex Issue Padhta Hai: Codex issue content receive karta hai, repository clone karta hai, codebase structure padhta hai, aur apni implementation planning shuru karta hai.

Step 4 — Implementation aur Testing: Codex code likhta hai, test suite run karta hai, failures pe iterate karta hai — sab isolated sandbox mein. Issue description ko apni task specification ke roop mein use karta hai.

Step 5 — PR Khulta Hai: Codex ek GitHub PR open karta hai issue reference karte hue title ke saath, kya kiya uska summary describe karte hue description ke saath, aur original issue pe wapas link ke saath. Team review ke liye notify hoti hai.

Achha "codex-ready" issue kya banata hai?
- Clear acceptance criteria: "Endpoint 200 return kare paginated results ke saath. total_count field filtered results reflect kare, sabhi records nahi."
- Relevant files ke links: "User model src/models/user.py mein hai. src/routes/products.py mein existing /products endpoint ka pattern follow karo."
- Test expectations: "Tests likho: success case, auth required, filters ke saath pagination."
- Constraints: "Response format mat badlo. Naye npm packages mat add karo."

Issues jo fail hote hain: acceptance criteria ke bina vague descriptions, architectural decisions chahne wale issues, domain context ke bina security-sensitive changes.

Payoff: tumhari team high-value kaam pe time spend karti hai — architecture, product decisions, code review — jabki Codex well-scoped tickets ki implementation autonomously handle karta hai.`,
        },
        dailyLifeExample: `Socho ek pizza delivery system: customer order place karta hai (Issue create hota hai), system automatically kitchen ko notify karta hai (GitHub Actions trigger), chef order ke hisaab se pizza banata hai (Codex code likhta hai), quality check hota hai (tests run), aur delivery ke liye ready kiya jaata hai (PR open). Tum sirf order review karte ho (PR review) — baaki sab automated hai.`,
        codeExample: `# GitHub Actions YAML — Codex ko "codex-ready" issue pe trigger karo
# File: .github/workflows/codex-issue-automation.yml

name: Codex Issue Automation

on:
  issues:
    types: [labeled]

jobs:
  trigger-codex:
    # Sirf "codex-ready" label wale issues pe run karo
    if: github.event.label.name == 'codex-ready'
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install OpenAI SDK
        run: pip install openai

      - name: Trigger Codex Task
        env:
          OPENAI_API_KEY: \${{ secrets.OPENAI_API_KEY }}
          ISSUE_TITLE: \${{ github.event.issue.title }}
          ISSUE_BODY: \${{ github.event.issue.body }}
          ISSUE_NUMBER: \${{ github.event.issue.number }}
          REPO_FULL_NAME: \${{ github.repository }}
        run: |
          python - <<'PYEOF'
          import os
          import openai

          client = openai.OpenAI(api_key=os.environ["OPENAI_API_KEY"])

          issue_title = os.environ["ISSUE_TITLE"]
          issue_body = os.environ["ISSUE_BODY"]
          issue_number = os.environ["ISSUE_NUMBER"]
          repo = os.environ["REPO_FULL_NAME"]

          # Codex task description issue content se build karo
          task_description = f"""
          GitHub Issue #{issue_number}: {issue_title}

          {issue_body}

          Additional context:
          - Repository: {repo}
          - After completing the implementation, open a PR referencing issue #{issue_number}
          - PR title format: "fix: <short description> (closes #{issue_number})"
          - Run the full test suite before opening the PR
          - Do NOT merge the PR — leave it for human review
          """

          print(f"Submitting Codex task for issue #{issue_number}:")
          print(f"Title: {issue_title}")
          print("Task submitted — Codex will open a PR when complete.")

          # NOTE: Replace this with actual Codex API call when available
          # The exact API endpoint depends on OpenAI's Codex agent API
          # Check: https://platform.openai.com/docs for current endpoints
          print("Codex agent task queued successfully.")
          PYEOF

# ============================================
# GOOD "codex-ready" Issue Template
# ============================================
# Yeh GitHub Issue template use karo (.github/ISSUE_TEMPLATE/codex-task.yml)

issue_template = """
name: Codex Task
description: A well-scoped task for Codex to implement autonomously
labels: ["codex-ready"]
body:
  - type: textarea
    id: objective
    attributes:
      label: "Objective (one sentence)"
      placeholder: "Add CSV export endpoint to the admin reports API"
    validations:
      required: true

  - type: textarea
    id: acceptance_criteria
    attributes:
      label: "Acceptance Criteria"
      placeholder: |
        - GET /api/reports/export?format=csv returns a valid CSV file
        - CSV includes all columns from the current reports response
        - Auth required (returns 401 if no valid token)
        - Tests pass for: valid export, auth required, empty data case
    validations:
      required: true

  - type: textarea
    id: relevant_files
    attributes:
      label: "Relevant Files"
      placeholder: |
        - api/views/reports.py (existing reports endpoint)
        - api/serializers/reports.py (data structure to export)
        - tests/test_reports.py (add tests here)
        - Follow the pattern of api/views/users.py for auth pattern
    validations:
      required: true

  - type: textarea
    id: constraints
    attributes:
      label: "Constraints"
      placeholder: |
        - Do NOT change existing /api/reports/ endpoint
        - Do NOT add new pip packages (use Python stdlib csv module)
        - Keep backward compatible with existing API clients
"""

print("Issue template for codex-ready issues:")
print(issue_template)`,
        keyPoints: [
          'GitHub Actions + Codex = fully automated issue-to-PR pipeline with zero manual coding',
          'Use the "codex-ready" label as the trigger — only well-scoped issues should get this label',
          'Good issues have clear acceptance criteria, relevant file links, test expectations, and constraints',
          'Codex opens a PR with the issue referenced — your team reviews and merges',
          'Bad issues (vague, architectural, security-sensitive) should NOT be labeled codex-ready',
          'The pipeline scales: one developer can manage many Codex tasks simultaneously',
          'Always gate the pipeline: require human review before merging any Codex PR',
        ],
        quiz: [
          {
            question: 'GitHub Issue-to-PR automation pipeline mein "codex-ready" label ka kya role hai?',
            options: [
              'Yeh label issue ko automatically close kar deta hai',
              'Yeh trigger signal hai jo GitHub Actions workflow ko Codex API call karne ke liye activate karta hai',
              'Yeh label sirf documentation ke liye hai',
              'Yeh label PR ko automatically merge kar deta hai',
            ],
            correctIndex: 1,
          },
          {
            question: 'Kaunsa issue "codex-ready" label ke liye LEAST suitable hai?',
            options: [
              'Issue jisme clear acceptance criteria aur relevant file links hain',
              '"Design karo ki humara monolith microservices mein kaise migrate hoga" — architectural decision requiring business context',
              'Bug fix issue with clear reproduction steps aur test expectations',
              'CRUD endpoint add karna existing pattern follow karte hue',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How would you set up an automated issue-to-PR pipeline using Codex and GitHub Actions?',
            difficulty: 'hard',
            frequency: 'medium',
            answer: {
              english: 'Set up a GitHub Actions workflow triggered on the "labeled" event for issues. When an issue receives a "codex-ready" label, the workflow calls the Codex API with the issue body as the task description. Codex clones the repo in its sandbox, implements the feature, runs tests, and opens a PR referencing the issue. Key requirements for this to work well: issues must include clear acceptance criteria, relevant file paths, test expectations, and constraints. The workflow should use a repository secret for the OpenAI API key. Always require human code review before merging — never auto-merge Codex PRs, especially from automated pipelines.',
              hinglish: 'Issues ke liye "labeled" event pe trigger hone wala GitHub Actions workflow set up karo. Jab ek issue "codex-ready" label receive karta hai, workflow Codex API ko issue body as task description ke saath call karta hai. Codex apne sandbox mein repo clone karta hai, feature implement karta hai, tests run karta hai, aur issue reference karte hue PR open karta hai. Yeh well work karne ke liye key requirements: issues mein clear acceptance criteria, relevant file paths, test expectations, aur constraints hone chahiye. Workflow OpenAI API key ke liye repository secret use kare. Merging se pehle hamesha human code review require karo — kabhi bhi Codex PRs auto-merge mat karo, especially automated pipelines se.',
            },
          },
        ],
      },
      {
        title: 'Test Generation & TDD with Codex',
        difficulty: 'medium',
        tags: ['tdd', 'testing', 'test-generation', 'coverage', 'pytest'],
        explanation: {
          english: `Codex is exceptionally good at writing tests — arguably better at test writing than at feature implementation, because tests have clear, predictable structure. This opens up two powerful workflows: TDD (Test-Driven Development) with Codex, and retroactive test generation for legacy code.

Test-Driven Development with Codex:
Classic TDD says "write the test first, then write the implementation." With Codex, you can push this further: you write the specification, Codex writes the tests, you review the tests to confirm they correctly capture the requirements, and then Codex writes the implementation to make them pass.

The TDD workflow:
1. You write a function specification in plain English: what the function does, its signature, edge cases, error conditions.
2. Codex writes comprehensive tests covering all cases — more thoroughly than most developers would write manually.
3. You review the tests: do they correctly capture what "correct behavior" means? Add any missing cases.
4. Codex implements the function to make all tests pass.
5. You review the implementation.

This workflow produces better-tested code because tests are written before implementation bias sets in. The tests describe requirements, not implementation details.

Test generation for legacy code:
This is where Codex shines for existing codebases. The task: "Write unit tests for every exported function in src/payments/ — aim for 90% coverage." Codex reads the existing code, understands what each function does, and writes tests covering the behavior it observes. This is dramatically faster than writing tests manually for code you didn't write.

Best practices for test spec tasks:
- Specify the test framework and any existing test patterns to follow
- Specify the coverage target explicitly ("90% coverage")
- List specific edge cases to test ("empty array input", "negative numbers", "None values")
- Tell Codex how to mock external dependencies ("mock the stripe module")
- Point to an existing test file as a style reference`,
          hinglish: `Codex tests likhne mein exceptionally good hai — arguably feature implementation se zyada, kyunki tests ki clear, predictable structure hoti hai. Yeh do powerful workflows open karta hai: Codex ke saath TDD (Test-Driven Development), aur legacy code ke liye retroactive test generation.

Codex ke saath Test-Driven Development:
Classic TDD kehta hai "pehle test likho, phir implementation." Codex ke saath, tum aage badh sakte ho: tum specification likhte ho, Codex tests likhta hai, tum tests review karte ho confirm karne ke liye ki requirements correctly capture hue hain, phir Codex implementation likhta hai unhe pass karne ke liye.

TDD workflow:
1. Tum plain English mein function specification likhte ho: function kya karta hai, signature, edge cases, error conditions.
2. Codex comprehensive tests likhta hai sab cases cover karte hue — zyaadatar developers se zyada thoroughly.
3. Tum tests review karte ho: kya yeh correctly capture karte hain "correct behavior" ka matlab? Koi missing cases add karo.
4. Codex function implement karta hai sab tests pass karne ke liye.
5. Tum implementation review karte ho.

Yeh workflow better-tested code produce karta hai kyunki tests implementation bias set hone se pehle likhe jaate hain.

Legacy code ke liye test generation:
Yahi Codex existing codebases ke liye shine karta hai. Task: "src/payments/ mein har exported function ke liye unit tests likho — 90% coverage aim karo." Codex existing code padhta hai, samajhta hai har function kya karta hai, aur observed behavior cover karte hue tests likhta hai. Yeh us code ke liye manually tests likhne se dramatically faster hai jo tumne nahi likha.

Test spec tasks ke liye best practices:
- Test framework aur existing test patterns specify karo jo follow karne hain
- Coverage target explicitly specify karo ("90% coverage")
- Specific edge cases list karo jo test karne hain
- Batao Codex ko external dependencies kaise mock karne hain
- Style reference ke liye existing test file point karo`,
        },
        dailyLifeExample: `Socho tum ek chef ho aur Codex tumhara sous chef. TDD workflow mein, tum recipe specifications likhte ho ("dish mein yeh flavors hone chahiye, yeh restrictions"), Codex tasting criteria likhta hai (tests), tum confirm karte ho criteria sahi hain, phir Codex recipe implement karta hai (implementation). Legacy testing mein, Codex existing dishes (code) taste karta hai aur uske recipes (tests) ke liye standards document karta hai taaki future mein koi change quality break na kare.`,
        codeExample: `# TDD with Codex — Specification se Tests tak se Implementation tak

# ============================================
# STEP 1: Tum function specification likhte ho
# ============================================
function_spec = """
Function: calculate_order_discount(order_total, customer_tier, coupon_code)

What it does:
Calculate the discount amount to apply to an order.

Parameters:
- order_total: float — the pre-discount order total in USD (must be > 0)
- customer_tier: str — one of "bronze", "silver", "gold", "platinum"
- coupon_code: str | None — optional coupon code

Discount rules:
- Bronze: 0%, Silver: 5%, Gold: 10%, Platinum: 15% (base tier discounts)
- Coupon "SAVE10" applies additional 10% off
- Coupon "SAVE20" applies additional 20% off
- Coupons stack with tier discounts (multiply, don't add)
  e.g. Gold (10%) + SAVE10 (10%) = 19% total discount (0.9 * 0.9 = 0.81 multiplier)
- Order total must be > 0, else raise ValueError("order_total must be positive")
- Invalid customer_tier raises ValueError("invalid customer_tier: <tier>")
- Invalid coupon code is silently ignored (no discount applied for coupon)
- Return value: float — the discount AMOUNT (not percentage), rounded to 2 decimal places

Examples:
- (100.0, "gold", None) -> 10.0
- (100.0, "gold", "SAVE10") -> 19.0  (10% + 10% stacked = 19%)
- (200.0, "platinum", "SAVE20") -> 68.0  (15% + 20% stacked = 32% = 64, wait: 0.85*0.80=0.68, discount=200*0.32=64... recheck)
- (50.0, "bronze", "SAVE10") -> 5.0  (0% + 10% = 10%)
- (-10.0, "gold", None) -> raises ValueError
"""

# ============================================
# STEP 2: Codex yeh tests generate karta hai
# ============================================
# Codex ka generated test file (tests/test_discount.py):
generated_tests = '''
import pytest
from src.pricing.discount import calculate_order_discount

class TestCalculateOrderDiscount:

    # === Basic tier discounts ===
    def test_bronze_tier_no_discount(self):
        assert calculate_order_discount(100.0, "bronze", None) == 0.0

    def test_silver_tier_five_percent(self):
        assert calculate_order_discount(100.0, "silver", None) == 5.0

    def test_gold_tier_ten_percent(self):
        assert calculate_order_discount(100.0, "gold", None) == 10.0

    def test_platinum_tier_fifteen_percent(self):
        assert calculate_order_discount(100.0, "platinum", None) == 15.0

    # === Coupon stacking ===
    def test_gold_with_save10_coupon(self):
        # Gold 10% + SAVE10 10% stacked: 1 - (0.9 * 0.9) = 0.19 = 19%
        assert calculate_order_discount(100.0, "gold", "SAVE10") == 19.0

    def test_bronze_with_save10_coupon(self):
        # Bronze 0% + SAVE10: 1 - (1.0 * 0.9) = 0.10 = 10%
        assert calculate_order_discount(50.0, "bronze", "SAVE10") == 5.0

    def test_platinum_with_save20_coupon(self):
        # Platinum 15% + SAVE20 20%: 1 - (0.85 * 0.80) = 0.32 = 32%
        assert calculate_order_discount(100.0, "platinum", "SAVE20") == 32.0

    # === Invalid coupon silently ignored ===
    def test_invalid_coupon_ignored(self):
        # "FAKECODE" not valid — bronze discount only (0%)
        assert calculate_order_discount(100.0, "bronze", "FAKECODE") == 0.0

    def test_gold_with_invalid_coupon_only_tier_discount(self):
        assert calculate_order_discount(100.0, "gold", "NOTVALID") == 10.0

    # === Rounding ===
    def test_result_rounded_to_two_decimal_places(self):
        # 33.33 * 0.19 = 6.3327 -> should round to 6.33
        result = calculate_order_discount(33.33, "gold", "SAVE10")
        assert result == round(33.33 * 0.19, 2)

    # === Error conditions ===
    def test_negative_order_total_raises(self):
        with pytest.raises(ValueError, match="order_total must be positive"):
            calculate_order_discount(-10.0, "gold", None)

    def test_zero_order_total_raises(self):
        with pytest.raises(ValueError, match="order_total must be positive"):
            calculate_order_discount(0.0, "gold", None)

    def test_invalid_tier_raises(self):
        with pytest.raises(ValueError, match="invalid customer_tier: vip"):
            calculate_order_discount(100.0, "vip", None)

    def test_invalid_tier_message_includes_tier_name(self):
        with pytest.raises(ValueError, match="invalid customer_tier: diamond"):
            calculate_order_discount(100.0, "diamond", None)
'''

# ============================================
# STEP 3: Tum tests review karte ho (3 minutes)
# STEP 4: Codex implementation likhta hai tests pass karne ke liye
# ============================================

# === Legacy code ke liye test generation ===
legacy_test_task = """
Write unit tests for every exported function in src/payments/

Files to test:
- src/payments/processor.py (3 exported functions)
- src/payments/validators.py (5 exported functions)
- src/payments/formatters.py (4 exported functions)

Coverage target: 90% line coverage minimum.

Test framework: pytest (existing tests are in tests/payments/ — follow the style there)
Mocking: mock the 'stripe' module using unittest.mock.patch

For each function, cover:
- Happy path (valid inputs, expected output)
- Edge cases (empty strings, zero values, None where applicable)
- Error/exception cases (invalid inputs that should raise)
- Boundary values (max/min valid inputs)

Run: pytest tests/payments/ --cov=src/payments --cov-report=term-missing
to verify 90% coverage is achieved.
"""

print("TDD Workflow with Codex:")
print("1. You write function spec (5 mins)")
print("2. Codex writes tests (2 mins automated)")
print("3. You review tests (3 mins)")
print("4. Codex implements function (automated)")
print("5. You review implementation (5 mins)")
print("Total: ~15 mins vs 45+ mins traditional TDD")`,
        keyPoints: [
          'TDD with Codex: you write spec, Codex writes tests, you review, Codex implements',
          'Tests written before implementation bias prevent implementation-specific tests',
          'Legacy code test generation: "write unit tests for every function in src/X — 90% coverage"',
          'Specify test framework, existing patterns to follow, and mocking approach',
          'Always review Codex-generated tests: verify they actually test correct behavior',
          'Codex writes more comprehensive tests than most devs write manually',
          'TDD workflow: specification → tests (reviewed) → implementation → PR review',
        ],
        quiz: [
          {
            question: 'Codex ke saath TDD workflow ka main advantage kya hai?',
            options: [
              'Kyunki Codex tests automatically production mein deploy kar deta hai',
              'Tests implementation se pehle likhe jaate hain — implementation bias nahi aati, tests requirements describe karte hain na ki implementation details',
              'Kyunki Codex-written tests hamesha 100% coverage dete hain',
              'Kyunki TDD ke liye koi manual review nahi chahiye',
            ],
            correctIndex: 1,
          },
          {
            question: 'Legacy codebase ke liye Codex test generation task likhte waqt kaunsa detail SABSE important hai?',
            options: [
              'Code ki exact line count batana',
              'Test framework, mocking approach, coverage target, aur ek existing test file as style reference — taaki Codex consistent style mein tests likhe',
              'Codex ko programming language batana',
              'Har function ki internal implementation explain karna',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Refactoring & Technical Debt Reduction',
        difficulty: 'medium',
        tags: ['refactoring', 'technical-debt', 'async-await', 'typescript', 'migration'],
        explanation: {
          english: `Systematic refactoring is one of Codex's highest-leverage use cases. Refactoring is often deferred because it is tedious, time-consuming, and mentally exhausting — but important. Codex excels at it because refactoring tasks are well-defined (clear before/after state), span multiple files (where humans make consistency mistakes), and can be fully verified with tests.

Types of refactoring Codex handles well:

1. Callback to async/await migration: "Convert all callback-based database queries in src/db/ to use async/await. The pattern is: db.query(sql, params, callback) → await db.queryAsync(sql, params). Run tests after each file to verify."

2. Library migration: "Migrate from the deprecated 'request' library to 'axios' in all files under src/api/. The request pattern is: request.get(url, (err, res, body) => ...). The axios equivalent is: const res = await axios.get(url); const body = res.data."

3. TypeScript adoption: "Add TypeScript types to all JS files in src/services/. Do not change any logic. Use strict: true. Run npx tsc --noEmit to verify."

4. CommonJS to ES Modules: "Convert src/utils/ from CommonJS (require/module.exports) to ES Modules (import/export). Update any files that import from src/utils/ accordingly."

5. Pattern standardization: "Extract all duplicated pagination logic across src/routes/ into a shared usePagination utility in src/utils/pagination.js. Replace all duplications with calls to this utility."

Why Codex is better than humans at systematic refactoring:
- Consistency: humans get fatigued and introduce inconsistencies across file 15 of 30. Codex applies the same transformation every time.
- Completeness: humans miss one file. Codex processes every file matching the pattern.
- Speed: what takes a developer 2 days of tedious work takes Codex 20 minutes.

The key: give Codex the before/after pattern explicitly, point to an example of both, and have a test suite to verify behavior is preserved.`,
          hinglish: `Systematic refactoring Codex ke highest-leverage use cases mein se ek hai. Refactoring aksar defer hota hai kyunki yeh tedious, time-consuming, aur mentally exhausting hai — lekin important hai. Codex isme excel karta hai kyunki refactoring tasks well-defined hote hain (clear before/after state), multiple files span karte hain (jahan humans consistency mistakes karte hain), aur tests se fully verify ho sakte hain.

Codex kis tarah ke refactoring ke liye well-suited hai:

1. Callback se async/await migration: "src/db/ mein sab callback-based database queries ko async/await use karne ke liye convert karo. Pattern hai: db.query(sql, params, callback) → await db.queryAsync(sql, params). Har file ke baad tests run karo verify karne ke liye."

2. Library migration: "src/api/ mein sab files mein deprecated 'request' library se 'axios' pe migrate karo."

3. TypeScript adoption: "src/services/ mein sab JS files mein TypeScript types add karo. Koi logic mat badlo. Strict: true use karo."

4. CommonJS se ES Modules: "src/utils/ ko CommonJS (require/module.exports) se ES Modules (import/export) mein convert karo."

5. Pattern standardization: "src/routes/ mein sab duplicated pagination logic ko src/utils/pagination.js mein shared utility mein extract karo."

Humans se zyada achha kyun hai Codex systematic refactoring mein:
- Consistency: humans 30 files mein se 15th file pe fatigued ho jaate hain aur inconsistencies introduce karte hain. Codex har baar same transformation apply karta hai.
- Completeness: humans ek file miss karte hain. Codex pattern match karne wali har file process karta hai.
- Speed: jo developer ke liye 2 din ka tedious kaam hai, Codex 20 minutes mein karta hai.

Key: Codex ko before/after pattern explicitly do, dono ka example point karo, aur behavior preserved hai verify karne ke liye test suite rakho.`,
        },
        dailyLifeExample: `Socho ek warehouse hai jisme sab items purane shelving system pe rakhe hain. Naya system adopt karna hai. Ek insaan sab items manually naye system pe shift kare — weeks lagenge aur kuch items miss ho jaayenge. Ek robot (Codex) har item systematically, consistently, aur jaldi process karta hai. Tum sirf rule batao: "purana label → naya label format," aur robot sab kuch convert kar deta hai. Yeh hai Codex ka refactoring power.`,
        codeExample: `# CommonJS se ES Modules migration — Codex task example

# ============================================
# CODEX TASK: CommonJS to ES Modules Migration
# ============================================
migration_task = """
Migrate src/utils/ from CommonJS to ES Modules.

Current pattern (CommonJS — OLD):
  const helpers = require('./helpers');
  const { formatDate } = require('../utils/date');
  module.exports = { myFunction, anotherFunction };
  module.exports.default = mainFunction;

New pattern (ES Modules — NEW):
  import helpers from './helpers.js';
  import { formatDate } from '../utils/date.js';
  export { myFunction, anotherFunction };
  export default mainFunction;

Files to convert (all files in src/utils/):
- src/utils/date.js
- src/utils/validators.js
- src/utils/formatters.js
- src/utils/pagination.js
- src/utils/logger.js

After converting each file:
1. Find all files that import from src/utils/ and update their import statements
2. Add .js extension to all relative imports (ES Modules requirement)
3. Check package.json — if "type" is not set to "module", add it

Verify with: node --input-type=module < /dev/null (no syntax errors)
Then run: npm test to verify all existing tests pass

Constraint: Do NOT change any function logic or signatures.
"""

# ============================================
# BEFORE and AFTER comparison
# ============================================
before_code = """
// src/utils/date.js (BEFORE - CommonJS)
const moment = require('moment');

function formatDate(date, format) {
  return moment(date).format(format || 'YYYY-MM-DD');
}

function isValidDate(dateString) {
  return moment(dateString, 'YYYY-MM-DD', true).isValid();
}

function daysBetween(date1, date2) {
  return Math.abs(moment(date1).diff(moment(date2), 'days'));
}

module.exports = { formatDate, isValidDate, daysBetween };
"""

after_code = """
// src/utils/date.js (AFTER - ES Modules)
import moment from 'moment';

export function formatDate(date, format) {
  return moment(date).format(format || 'YYYY-MM-DD');
}

export function isValidDate(dateString) {
  return moment(dateString, 'YYYY-MM-DD', true).isValid();
}

export function daysBetween(date1, date2) {
  return Math.abs(moment(date1).diff(moment(date2), 'days'));
}
"""

print("Migration: CommonJS -> ES Modules")
print()
print("BEFORE:")
print(before_code)
print("AFTER:")
print(after_code)
print()

# ============================================
# Aur ek common refactoring: Callbacks to async/await
# ============================================
callback_before = """
// BEFORE: Callback-based database query
function getUserById(userId, callback) {
  db.query(
    'SELECT * FROM users WHERE id = ?',
    [userId],
    (err, rows) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, rows[0] || null);
    }
  );
}
"""

async_after = """
// AFTER: async/await
async function getUserById(userId) {
  const rows = await db.queryAsync(
    'SELECT * FROM users WHERE id = ?',
    [userId]
  );
  return rows[0] || null;
  // Errors propagate naturally as rejected promises
}
"""

print("Callback -> async/await migration:")
print("BEFORE:", callback_before)
print("AFTER:", async_after)

# Codex task jo yeh systematically karta hai
callback_migration_task = """
Convert all callback-based functions in src/db/queries.js to async/await.

Pattern transformation:
  OLD: function name(params, callback) { db.query(sql, args, (err, rows) => { if (err) { callback(err); return; } callback(null, result); }); }
  NEW: async function name(params) { const rows = await db.queryAsync(sql, args); return result; }

The db.queryAsync() method already exists — it is the promisified version.
After converting, run: npm test -- --testPathPattern=queries to verify all tests pass.
Do NOT change any function signatures visible to callers.
"""
print("\\nTask for Codex:")
print(callback_migration_task)`,
        keyPoints: [
          'Refactoring is Codex\'s sweet spot: well-defined before/after, multiple files, verifiable with tests',
          'Consistency advantage: Codex applies the same transformation every time, humans fatigue',
          'Always provide before/after pattern explicitly with an example of each',
          'Run tests after each file (or batch) to catch regressions early',
          'CommonJS → ES Modules, callbacks → async/await, JS → TypeScript are all perfect Codex tasks',
          'For large refactors, break into batches: "migrate src/utils/ first, then src/services/"',
          'The test suite is your safety net — good test coverage is prerequisite for Codex refactoring',
        ],
        quiz: [
          {
            question: 'Systematic refactoring mein Codex humans se better kyun hai?',
            options: [
              'Kyunki Codex faster type karta hai',
              'Consistency aur completeness: Codex har file pe same transformation apply karta hai bina fatigue ke, jabki humans inconsistencies introduce karte hain aur files miss karte hain',
              'Kyunki Codex ko code nahi samajhna padta refactor karne ke liye',
              'Kyunki Codex automatically production mein deploy karta hai',
            ],
            correctIndex: 1,
          },
          {
            question: 'Codex ko refactoring task dete waqt sabse important cheez kaunsi hai?',
            options: [
              'Codebase ki total file count batana',
              'Before/after pattern explicitly provide karna, dono ka example dena, aur behavior preserved hai verify karne ke liye test suite specify karna',
              'Codex ko programming language history explain karna',
              'Saari files ek saath process karna, batches mein nahi',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'PR Review Automation',
        difficulty: 'hard',
        tags: ['pr-review', 'automation', 'code-review', 'github', 'security'],
        explanation: {
          english: `Beyond writing code, Codex can act as an automated PR reviewer: it reads the diff, runs the tests, checks for common issues, and posts review comments on GitHub. This creates a "Codex reviewer required" workflow where every PR gets an automated first pass before human reviewers spend time on it.

How Codex PR review works:
1. A developer opens a PR
2. A GitHub Actions workflow triggers on PR open/update
3. Codex reads the diff and the surrounding context from the repository
4. Codex runs the test suite
5. Codex posts inline review comments identifying: failing tests, potential security issues, missing error handling, violations of project conventions, performance concerns
6. The developer addresses Codex's comments before requesting human review

What Codex checks in a PR review:
- Test coverage: are the changed functions tested? Are new functions covered?
- Security patterns: SQL injection risks, missing auth checks on new endpoints, hardcoded credentials
- Code consistency: does the new code follow the patterns established in the codebase?
- Error handling: are new HTTP calls wrapped in try/catch? Are file operations using context managers?
- Breaking changes: does the changed code maintain backward compatibility with its callers?

Configuring review depth: You can configure what Codex focuses on — a quick review (test and security checks only) vs a thorough review (conventions, performance, architecture). For most PRs, the quick review catches 80% of issues.

How to respond to Codex review comments: treat them like human review comments. Address each one: fix it, or add a comment explaining why you disagree. After addressing all comments, re-request Codex review to get a clean bill of health.

Setting up a "Codex reviewer required" branch policy: in GitHub branch protection settings, add a required status check that passes only when the Codex review GitHub Actions workflow completes successfully. This ensures no PR can be merged without Codex's automated review passing.`,
          hinglish: `Code likhne se aage, Codex ek automated PR reviewer ki tarah act kar sakta hai: diff padhta hai, tests run karta hai, common issues check karta hai, aur GitHub pe review comments post karta hai. Yeh ek "Codex reviewer required" workflow create karta hai jahan har PR ko human reviewers time spend karne se pehle automated first pass milta hai.

Codex PR review kaise kaam karta hai:
1. Developer PR open karta hai
2. GitHub Actions workflow PR open/update pe trigger hota hai
3. Codex diff aur repository se surrounding context padhta hai
4. Codex test suite run karta hai
5. Codex inline review comments post karta hai identifying: failing tests, potential security issues, missing error handling, project conventions violations, performance concerns
6. Developer human review request karne se pehle Codex ke comments address karta hai

Codex PR review mein kya check karta hai:
- Test coverage: kya changed functions tested hain? Kya naye functions cover hain?
- Security patterns: SQL injection risks, naye endpoints pe missing auth checks, hardcoded credentials
- Code consistency: kya naya code codebase mein established patterns follow karta hai?
- Error handling: kya naye HTTP calls try/catch mein wrapped hain? Kya file operations context managers use kar rahi hain?
- Breaking changes: kya changed code apne callers ke saath backward compatible hai?

Review depth configure karna: tum configure kar sakte ho Codex kya focus kare — quick review (sirf test aur security checks) vs thorough review (conventions, performance, architecture). Zyaadatar PRs ke liye, quick review 80% issues catch karta hai.

Codex review comments ka jawab kaise dein: human review comments ki tarah treat karo. Har ek address karo: fix karo, ya comment add karo kyun disagree karte ho. Sab comments address karne ke baad, clean bill of health ke liye re-request Codex review karo.

"Codex reviewer required" branch policy set up karna: GitHub branch protection settings mein, ek required status check add karo jo sirf tab pass ho jab Codex review GitHub Actions workflow successfully complete ho. Yeh ensure karta hai ki koi PR bina Codex ke automated review pass kiye merge nahi ho sakta.`,
        },
        dailyLifeExample: `Socho ek restaurant mein quality check system: har dish customer ke paas jaane se pehle ek automated sensor se guzarti hai jo temperature, presentation standards, aur allergen presence check karta hai. Agar sensor issues find karta hai, dish kitchen wapas jaati hai. Sirf sensor pass karne wali dishes head chef (human reviewer) ke paas jaati hain final approval ke liye. Yeh hai Codex PR review — automated first-pass quality gate.`,
        codeExample: `# GitHub Actions: Codex PR Review Automation
# File: .github/workflows/codex-pr-review.yml

pr_review_workflow = """
name: Codex PR Review

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  codex-review:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
      contents: read

    steps:
      - name: Checkout PR branch
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for diff context

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: pip install openai requests

      - name: Run Codex PR Review
        env:
          OPENAI_API_KEY: \${{ secrets.OPENAI_API_KEY }}
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          PR_NUMBER: \${{ github.event.pull_request.number }}
          BASE_SHA: \${{ github.event.pull_request.base.sha }}
          HEAD_SHA: \${{ github.event.pull_request.head.sha }}
          REPO: \${{ github.repository }}
        run: python .github/scripts/codex_review.py
"""

# .github/scripts/codex_review.py
codex_review_script = '''
import os
import subprocess
import json
import openai
import requests

def get_pr_diff():
    """Get the diff for the current PR."""
    base_sha = os.environ["BASE_SHA"]
    head_sha = os.environ["HEAD_SHA"]
    result = subprocess.run(
        ["git", "diff", f"{base_sha}..{head_sha}", "--unified=5"],
        capture_output=True, text=True
    )
    return result.stdout

def post_pr_comment(comment_body):
    """Post a review comment on the GitHub PR."""
    token = os.environ["GITHUB_TOKEN"]
    repo = os.environ["REPO"]
    pr_number = os.environ["PR_NUMBER"]

    url = f"https://api.github.com/repos/{repo}/issues/{pr_number}/comments"
    headers = {
        "Authorization": f"token {token}",
        "Content-Type": "application/json"
    }
    data = {"body": comment_body}
    response = requests.post(url, headers=headers, json=data)
    return response.status_code == 201

def run_tests():
    """Run the project test suite."""
    result = subprocess.run(
        ["pytest", "tests/", "-v", "--tb=short"],
        capture_output=True, text=True, timeout=300
    )
    return {
        "returncode": result.returncode,
        "output": result.stdout[-3000:],  # Last 3000 chars
        "passed": result.returncode == 0
    }

def codex_review_pr(diff, test_results):
    """Ask Codex to review the PR diff."""
    client = openai.OpenAI(api_key=os.environ["OPENAI_API_KEY"])

    test_summary = "PASSED" if test_results["passed"] else f"FAILED:\\n{test_results['output']}"

    review_prompt = f"""
    You are a senior code reviewer. Review this PR diff and provide structured feedback.

    Test suite results: {test_summary}

    PR Diff:
    {diff[:8000]}  # Limit diff size

    Provide a review covering:
    1. Test results — pass/fail and any failures to address
    2. Security concerns — SQL injection, missing auth, hardcoded secrets
    3. Error handling gaps — unhandled exceptions, missing try/catch
    4. Code consistency — does it follow apparent codebase conventions?
    5. Overall verdict: APPROVE (looks good), REQUEST_CHANGES (issues found), or COMMENT (minor notes)

    Format your response as a GitHub PR review comment in Markdown.
    Be specific: reference exact line numbers or code snippets where possible.
    Be concise — focus on real issues, not style preferences.
    """

    response = client.chat.completions.create(
        model="o4-mini",  # Use available model
        messages=[{"role": "user", "content": review_prompt}]
    )
    return response.choices[0].message.content

if __name__ == "__main__":
    print("Getting PR diff...")
    diff = get_pr_diff()

    print("Running tests...")
    test_results = run_tests()

    print("Requesting Codex review...")
    review = codex_review_pr(diff, test_results)

    print("Posting review comment...")
    header = "## Codex Automated Review\\n\\n"
    if post_pr_comment(header + review):
        print("Review posted successfully.")
    else:
        print("Failed to post review comment.")
        print(review)
'''

print("PR Review Automation Setup:")
print("1. Add .github/workflows/codex-pr-review.yml")
print("2. Add .github/scripts/codex_review.py")
print("3. Add OPENAI_API_KEY to repository secrets")
print("4. Enable 'Codex PR Review' as required status check in branch protection")
print()
print("Branch Protection Setup (GitHub Settings -> Branches -> Add Rule):")
protection_settings = {
    "branch_name_pattern": "main",
    "require_status_checks": ["codex-review"],
    "require_pull_request_reviews": True,
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": True
}
print(json.dumps(protection_settings, indent=2))`,
        keyPoints: [
          'Codex PR review = automated first-pass: reads diff, runs tests, posts inline comments',
          'Checks: test coverage, security patterns, error handling, code consistency, breaking changes',
          'Configure depth: quick (tests + security) vs thorough (full conventions check)',
          'Treat Codex review comments like human comments — address or explain each one',
          '"Codex reviewer required" branch policy: required status check before human review',
          'Codex review does NOT replace human review — it surfaces obvious issues early',
          'Developers fix Codex-flagged issues before requesting human reviewer time',
        ],
        quiz: [
          {
            question: 'Codex PR review ka main benefit kya hai development workflow mein?',
            options: [
              'Yeh human code reviewers ki zaroorat completely eliminate karta hai',
              'Yeh ek automated first-pass gate provide karta hai jo obvious issues (tests fail, security gaps, missing error handling) early catch karta hai, human reviewer time bachata hai',
              'Yeh automatically PRs merge karta hai jo pass hote hain',
              'Yeh sirf syntax errors check karta hai',
            ],
            correctIndex: 1,
          },
          {
            question: '"Codex reviewer required" branch policy kaise set karte hain GitHub mein?',
            options: [
              'Repository settings mein Codex enable karo',
              'GitHub branch protection mein Codex review GitHub Actions workflow ko required status check ke roop mein add karo — PR merge nahi ho sakta jab tak yeh pass nahi hota',
              'Har PR pe manually Codex review request karo',
              'GitHub Marketplace se Codex app install karo',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How can Codex be used as an automated PR reviewer, and what should it check?',
            difficulty: 'hard',
            frequency: 'medium',
            answer: {
              english: 'Codex can be integrated as an automated PR reviewer via GitHub Actions: trigger on PR open/update, have Codex read the diff and surrounding repository context, run the test suite, and post structured review comments. It should check: test coverage of changed code, security patterns (SQL injection, missing auth checks, hardcoded credentials), error handling gaps, code consistency with codebase conventions, and potential breaking changes. This creates a "Codex reviewer required" gate — developers address automated findings before requesting human reviewer time. The key benefit: human reviewers spend time on architecture and product decisions, not catching missing try/catch blocks or forgot-to-add-auth issues.',
              hinglish: 'Codex ko GitHub Actions se automated PR reviewer ke roop mein integrate kiya ja sakta hai: PR open/update pe trigger karo, Codex ko diff aur surrounding repository context padhne do, test suite run karo, aur structured review comments post karo. Ise check karna chahiye: changed code ka test coverage, security patterns (SQL injection, missing auth checks, hardcoded credentials), error handling gaps, codebase conventions ke saath code consistency, aur potential breaking changes. Yeh ek "Codex reviewer required" gate banata hai — developers automated findings address karte hain human reviewer time request karne se pehle. Key benefit: human reviewers architecture aur product decisions pe time spend karte hain, missing try/catch ya forgot-to-add-auth issues catch karne mein nahi.',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Prompt Engineering for Codex & AI Coding Agents',
    level: 'advanced',
    description: 'AI coding agents ke liye effective prompts aur task specifications kaise likhein, context engineering kya hai, iterative agent workflows, aur multiple AI tools ko combine kaise karein.',
    concepts: [
      {
        title: 'Writing Great Codex Task Specifications',
        difficulty: 'medium',
        tags: ['prompt-engineering', 'task-spec', 'best-practices', 'specification'],
        explanation: {
          english: `The difference between a Codex task that succeeds on the first try and one that requires three rounds of iteration is almost entirely in the quality of the task specification. This is the highest-leverage skill in working with AI coding agents.

The anatomy of a perfect Codex task:

(1) Context files to read: Tell Codex exactly which files are relevant — the files that contain patterns to follow, the files being changed, the test files to update. Don't make Codex guess. "Read these files before starting: src/routes/products.py (the pattern to follow), src/models/order.py (the data model), tests/test_products.py (the test pattern to follow)."

(2) Acceptance criteria — what "done" looks like: Define success in observable, testable terms. Not "make the login work" but "GET /api/auth/login with valid credentials returns 200 with a JWT token in the response body as {"token": "..."}. With invalid credentials, it returns 401 with {"error": "Invalid credentials"}."

(3) Constraints — don't break X, preserve Y interface: Explicitly state what must NOT change. "Do not change the User model fields. Do not modify any existing API endpoints. Keep all existing tests passing. Do not add new npm packages."

(4) Test command to verify: Give Codex the exact command to verify success. "Run: pytest tests/test_auth.py -v to verify. All tests must pass. Run: pytest --cov=src/auth --cov-fail-under=85 to verify coverage."

Weak vs strong task examples:
Weak: "Add authentication to the app."
Strong: "Add JWT authentication to the FastAPI app. Relevant files: main.py (app entry), routers/users.py (endpoints to protect). Create auth.py with token creation/verification. Add POST /auth/login returning JWT. Protect all /users/ endpoints. Write pytest tests in tests/test_auth.py for: login success, login fail, valid token, expired token, no token. Do not change existing User model. Run: pytest tests/test_auth.py to verify."

Hinglish insight: "Ek achhi task specification se Codex pehli baar mein kaam kar deta hai — revision rounds pe time waste nahi hota. Specification mein invest karo, iteration save karo."`,
          hinglish: `Ek Codex task jo pehli baar succeed karta hai aur ek jo teen rounds of iteration chahta hai — dono mein fark almost entirely task specification ki quality mein hai. AI coding agents ke saath kaam karne mein yeh highest-leverage skill hai.

Perfect Codex task ki anatomy:

(1) Context files to read: Codex ko exactly batao kaunsi files relevant hain — patterns follow karne ke liye files, change hone wali files, update hone wale test files. Codex ko guess mat karne do. "Shuru karne se pehle yeh files padho: src/routes/products.py (follow karne ka pattern), src/models/order.py (data model), tests/test_products.py (test pattern to follow)."

(2) Acceptance criteria — "done" kab lagta hai: Observable, testable terms mein success define karo. "Login kaam karo" nahi, balki "GET /api/auth/login valid credentials ke saath 200 return kare response body mein JWT token ke saath as {'token': '...'}. Invalid credentials ke saath, 401 return kare {'error': 'Invalid credentials'} ke saath."

(3) Constraints — X mat todo, Y interface preserve karo: Explicitly state karo kya change NAHI karna. "User model fields mat badlo. Existing API endpoints modify mat karo. Sab existing tests passing rakhna. Naye npm packages add mat karo."

(4) Test command to verify: Codex ko exact command do success verify karne ke liye. "Run: pytest tests/test_auth.py -v to verify. Sab tests pass hone chahiye."

Weak vs strong task examples:
Weak: "App mein authentication add karo."
Strong: "FastAPI app mein JWT authentication add karo. Relevant files: main.py, routers/users.py. auth.py create karo token creation/verification ke saath. POST /auth/login add karo JWT return karte hue. Sab /users/ endpoints protect karo. pytest tests tests/test_auth.py mein likho. Existing User model mat badlo. Run: pytest tests/test_auth.py to verify."

Hinglish insight: "Ek achhi task specification se Codex pehli baar mein kaam kar deta hai — revision rounds pe time waste nahi hota. Specification mein invest karo, iteration save karo."`,
        },
        dailyLifeExample: `Socho ek construction project: agar tum architect ko bolte ho "ek achha building banao" — woh confuse ho jaayega. Lekin agar tum detailed blueprints, materials specifications, building codes compliance requirements, aur inspection criteria dete ho — contractor pehli baar mein exactly wahi banata hai jo chahiye. Codex task specification wohi blueprint hai.`,
        codeExample: `# Perfect Codex Task Specification — Template aur Examples

# ============================================
# TEMPLATE: The anatomy of a perfect task
# ============================================
perfect_task_template = """
[OBJECTIVE — 1 sentence]
<What to build/fix/change>

[CONTEXT FILES — Read these first]
- <filepath1>: <why it's relevant>
- <filepath2>: <why it's relevant>
- <filepath3>: <the pattern to follow>

[ACCEPTANCE CRITERIA — Observable, testable]
1. <Specific behavior: input X produces output Y>
2. <Specific behavior: error case A returns status B with body C>
3. <Specific behavior: edge case D is handled by doing E>

[TEST REQUIREMENTS]
Write tests in <test_file_path> covering:
- <Test case 1: specific scenario>
- <Test case 2: error condition>
- <Test case 3: edge case>
Verify with: <exact test command>

[CONSTRAINTS — What must NOT change]
- Do NOT change: <specific things to preserve>
- Do NOT add: <packages/patterns to avoid>
- Backward compatibility: <what must keep working>

[VERIFICATION COMMAND]
Run: <exact command> — all tests must pass
"""

# ============================================
# WEAK vs STRONG: Real examples
# ============================================

weak_task_1 = "Add search to the API"
strong_task_1 = """
[OBJECTIVE]
Add search functionality to GET /api/products endpoint.

[CONTEXT FILES — Read these first]
- src/routes/products.py: the endpoint to modify
- src/repositories/product_repository.py: where to add the query logic (follow existing query pattern)
- tests/test_products.py: add new tests here, follow existing test style
- src/utils/pagination.py: pagination utility already in use (keep using it)

[ACCEPTANCE CRITERIA]
1. GET /api/products?search=shirt returns products where name or description contains "shirt" (case-insensitive)
2. GET /api/products?category=accessories returns products with that category only
3. GET /api/products?search=shirt&category=accessories combines both filters (AND logic)
4. GET /api/products (no params) returns all products — unchanged from current behavior
5. Pagination meta (total_count) reflects FILTERED count, not all products
6. GET /api/products?search= (empty string) treats as no search filter

[TEST REQUIREMENTS]
Write tests in tests/test_products.py covering:
- Search by name partial match (case-insensitive)
- Search by description partial match
- Category filter exact match
- Combined search + category
- Empty search returns all products
- Pagination with filters: page 2 of filtered results has correct items
- SQL injection safety: search="'; DROP TABLE products;--" returns empty, no error
Verify with: pytest tests/test_products.py -v

[CONSTRAINTS]
- Do NOT change response format (data/meta structure must stay the same)
- Do NOT add new Python packages (SQLAlchemy ILIKE handles case-insensitive search)
- All existing product tests must still pass
"""

# ============================================
# Hinglish insight as code comment
# ============================================
insight = """
# "Ek achhi task specification se Codex pehli baar mein kaam kar deta hai."
# — Revision rounds mein jo time jaata hai, woh specification mein
#   5 extra minutes invest karke bacha sakte ho.
#
# Weak task: 3 rounds of iteration = 3x Codex API cost + 30 mins of your review time
# Strong task: 1 round success = 1x cost + 10 mins review
#
# ROI calculation:
# 5 mins better spec -> save 2 rounds * (Codex API cost + 20 min review)
# Clearly worth it every time.
"""

print("Task Specification Quality Comparison:")
print(f"Weak: '{weak_task_1}'")
print()
print(f"Strong: (see full task above)")
print()
print("Key additions in strong task:")
additions = [
    "Specific file paths to read first",
    "Observable acceptance criteria with exact inputs/outputs",
    "Test cases listed explicitly including edge cases",
    "Constraints on what NOT to change",
    "Exact verification command",
]
for item in additions:
    print(f"  + {item}")

print(insight)`,
        keyPoints: [
          'Task quality = output quality: invest 5 extra minutes in the spec, save 2 rounds of iteration',
          'Four pillars: context files, acceptance criteria, constraints, verification command',
          'Acceptance criteria must be observable and testable, not vague ("make it work")',
          'Context files prevent Codex from guessing — tell it exactly where to look',
          'Constraints are as important as requirements — what NOT to change prevents surprises',
          'Provide the exact test command so Codex knows how to verify success',
          '"Ek achhi task specification se Codex pehli baar mein kaam kar deta hai"',
        ],
        quiz: [
          {
            question: 'Perfect Codex task specification ke "4 pillars" kaunse hain?',
            options: [
              'Language, framework, database, testing tool',
              'Context files to read, acceptance criteria (done kab lagta hai), constraints (kya mat badlo), verification command',
              'Title, description, assignee, due date',
              'Frontend, backend, database, tests',
            ],
            correctIndex: 1,
          },
          {
            question: '"Ek achhi task specification se Codex pehli baar mein kaam kar deta hai" — iska practical implication kya hai?',
            options: [
              'Better spec likhne mein zyada time lagata hai overall',
              '5 extra minutes specification mein invest karke 2+ rounds of iteration bach jaate hain, resulting in net time saving aur kam API cost',
              'Codex ko sirf simple tasks ke liye specification chahiye',
              'Specification sirf large teams ke liye zaroori hai',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What makes a Codex task specification "great" versus "weak"?',
            difficulty: 'medium',
            frequency: 'high',
            answer: {
              english: 'A great Codex task specification has four pillars: (1) Context files — explicitly list which files to read before starting (patterns to follow, files to change, test files to update). (2) Observable acceptance criteria — define done in testable terms: "POST /auth/login with valid credentials returns 200 with {token: ...} in the body" not "make login work." (3) Constraints — explicitly state what must not change: don\'t modify the User model, don\'t add new packages, keep all existing tests passing. (4) Verification command — provide the exact test command to verify success. A weak task is vague ("add search"), forcing Codex to make assumptions about intent, scope, and approach — producing output that needs heavy revision. The payoff: 5 minutes of better spec writing saves 2+ rounds of iteration.',
              hinglish: 'Ek great Codex task specification ke chaar pillars hain: (1) Context files — explicitly list karo kaunsi files shuru karne se pehle padhni hain (follow karne ke patterns, change hone wali files, update hone wale test files). (2) Observable acceptance criteria — done ko testable terms mein define karo: "POST /auth/login valid credentials ke saath 200 return kare {token: ...} ke saath" na ki "login kaam karo." (3) Constraints — explicitly state karo kya change nahi karna: User model modify mat karo, naye packages add mat karo, sab existing tests passing rakhna. (4) Verification command — success verify karne ke liye exact test command do. Weak task vague hota hai ("search add karo"), Codex ko intent, scope, aur approach ke baare mein assumptions banane par force karta hai — aise output produce karta hai jo heavy revision chahta hai. Payoff: 5 minutes better spec likhne se 2+ rounds of iteration bachte hain.',
            },
          },
        ],
      },
      {
        title: 'Context Engineering for AI Coding Agents',
        difficulty: 'hard',
        tags: ['context-engineering', 'repo-structure', 'agents-md', 'codebase-design'],
        explanation: {
          english: `Context engineering is different from prompt engineering. Prompt engineering is about crafting the right words in a single message. Context engineering is about structuring your entire codebase so that AI agents can read it and immediately understand what to do. The payoff is not just for one task — a well-structured codebase helps every future AI agent task you assign.

Unlike prompt engineering for chat (where you tune one interaction), coding agents need CODE context: they read your actual repository, not just your message.

What AI agents need from a codebase:
1. Relevant files they can discover through structure: well-organized directories with clear, semantic names. An agent reading "src/routes/users.py" knows exactly what it contains before opening it. "src/stuff/misc3.py" tells it nothing.

2. README and AGENTS.md: the README explains how to set up and test the project. An AGENTS.md file (some agent systems read this explicitly) can provide agent-specific guidance: "When adding a new endpoint, follow the pattern in src/routes/products.py. Run tests with: pytest tests/ -v. The pagination utility is in src/utils/pagination.py."

3. Examples in tests: your test files are living documentation. A test for "createUser" shows an agent exactly what a valid user looks like, what an invalid user triggers, and what the response format is. Good tests = agents understand your data shapes.

4. Clear module boundaries: agents work better when each module has a clear, single responsibility. A 2000-line "utils.py" that contains everything is harder to navigate than 10 focused modules.

5. Existing patterns that repeat consistently: if 20 endpoints all follow the same pattern (auth middleware, request validation, service call, response formatter), agents learn the pattern and apply it to the 21st endpoint without you needing to explain it.

The principle of "code that teaches itself": write code as if a smart new developer joins your team with no context. If they can figure out what to do from reading the code and the README alone — an AI agent can too.`,
          hinglish: `Context engineering, prompt engineering se alag hai. Prompt engineering ek single message mein sahi words craft karne ke baare mein hai. Context engineering tumhara poora codebase is tarah structure karne ke baare mein hai ki AI agents ise padh sakein aur immediately samajh sakein kya karna hai. Payoff sirf ek task ke liye nahi hai — well-structured codebase har future AI agent task mein help karta hai.

Chat ke liye prompt engineering se alag (jahan tum ek interaction tune karte ho), coding agents ko CODE context chahiye: yeh tumhara actual repository padhte hain, sirf tumhara message nahi.

AI agents ko codebase se kya chahiye:
1. Relevant files jo structure ke through discover kar sakein: clear, semantic names ke saath well-organized directories. "src/routes/users.py" padhne wala agent exactly jaanta hai isme kya hai bina khola. "src/stuff/misc3.py" kuch nahi batata.

2. README aur AGENTS.md: README explain karta hai project kaise setup aur test karein. Ek AGENTS.md file (kuch agent systems yeh explicitly padhte hain) agent-specific guidance provide kar sakti hai: "Naya endpoint add karte waqt, src/routes/products.py mein pattern follow karo. Tests run karo: pytest tests/ -v."

3. Tests mein examples: tumhare test files living documentation hain. "createUser" ka test ek agent ko exactly dikhata hai valid user kaisa lagta hai, invalid user kya trigger karta hai, aur response format kya hai.

4. Clear module boundaries: agents better kaam karte hain jab har module ki ek clear, single responsibility ho.

5. Consistently repeat hone wale existing patterns: agar 20 endpoints sab same pattern follow karte hain, agents pattern seekhte hain aur ise 21st endpoint pe apply karte hain bina explanation ke.

"Code that teaches itself" ka principle: code likho jaisa ek smart new developer tumhari team mein joins karta hai bina context ke. Agar woh sirf code aur README padh ke figure out kar sakte hain kya karna hai — ek AI agent bhi kar sakta hai.`,
        },
        dailyLifeExample: `Socho ek well-organized library vs ek chaotic attic. Library mein, har book labeled shelf pe hai genre ke hisaab se — koi bhi ek new visitor specific book quickly dhundh sakta hai. Attic mein, sab cheez piles mein hai — even owner ko dhundne mein time lagta hai. AI agent wohi new visitor hai. Tumhara codebase wohi library ya attic hai. Well-organized codebase = agent faster aur better kaam karta hai.`,
        codeExample: `# Context Engineering — Apna Codebase AI-agent-friendly banao

# ============================================
# 1. AGENTS.md — Agent-specific documentation
# ============================================
agents_md_content = """
# AGENTS.md
# AI agents tumhare project mein kaam karte waqt yeh file padhein.

## Project Overview
FastAPI REST API for an e-commerce platform. Python 3.11, PostgreSQL, pytest.

## Quick Start (tests run karne ke liye)
pip install -r requirements.txt
cp .env.example .env
pytest tests/ -v

## Architecture
- src/routes/       — HTTP route handlers (one file per resource)
- src/services/     — Business logic (one file per resource)
- src/repositories/ — Database queries (one file per resource)
- src/models/       — SQLAlchemy ORM models
- src/utils/        — Shared utilities (pagination, validators, formatters)
- tests/            — Mirrors src/ structure (test_users.py tests src/routes/users.py)

## Adding a New Resource (follow this pattern EXACTLY)
1. src/models/resource.py          — follow src/models/product.py
2. src/repositories/resource_repo.py  — follow src/repositories/product_repo.py
3. src/services/resource_service.py  — follow src/services/product_service.py
4. src/routes/resource.py          — follow src/routes/products.py
5. Register in src/main.py         — see existing registrations as example
6. tests/test_resource.py          — follow tests/test_products.py

## Response Format (ALL endpoints must follow this)
Success: {"data": <result>, "meta": {"total": int, "page": int, "limit": int}}
Error:   {"error": {"code": str, "message": str}}

## Auth Pattern
All endpoints except /auth/* require:
  Depends(get_current_user)  — see src/routes/users.py for example

## Pagination
Use: from src.utils.pagination import paginate_query
See: src/routes/products.py for usage example

## Testing Conventions
- Use fixtures from tests/conftest.py (do not create new fixtures)
- Mock external services with: unittest.mock.patch
- Test naming: test_<function>_<scenario>
  e.g.: test_create_product_success, test_create_product_missing_name

## What NOT to do
- Do NOT use raw SQL strings — use SQLAlchemy ORM
- Do NOT add new top-level directories without discussing
- Do NOT change existing API response formats
- Do NOT add packages without checking requirements.txt first
"""

# ============================================
# 2. Directory structure comparison
# ============================================
bad_structure = """
# BAD: Vague names, unclear boundaries
src/
  api.py          # 3000 lines, everything mixed together
  stuff/
    helpers.py    # What does this do? No idea
    misc.py
    utils2.py
  db.py
tests/
  test_stuff.py   # Tests for... what?
"""

good_structure = """
# GOOD: Clear, semantic, mirrors real domain
src/
  routes/
    users.py      # Immediately clear: user API endpoints
    products.py   # Product endpoints
    orders.py     # Order endpoints
  services/
    user_service.py     # User business logic
    product_service.py
  repositories/
    user_repository.py  # User database queries
    product_repository.py
  models/
    user.py       # User ORM model
    product.py
  utils/
    pagination.py     # Pagination helper
    validators.py     # Input validation
    formatters.py     # Response formatting
tests/
  conftest.py          # Shared fixtures
  test_users.py        # Tests for src/routes/users.py
  test_products.py     # Tests for src/routes/products.py
"""

# ============================================
# 3. Tests as documentation
# ============================================
good_test_as_docs = '''
# tests/test_users.py — Yeh agent ko sikhata hai:
# - Valid user kaisa lagta hai
# - Invalid user kya trigger karta hai
# - Response format kya hai
# - Auth kaise kaam karta hai

def test_create_user_success(client, auth_headers):
    """Valid user creation — agent seekhta hai valid payload format."""
    response = client.post("/api/users", json={
        "email": "test@example.com",
        "username": "testuser",
        "password": "SecurePass123!"
    }, headers=auth_headers)
    assert response.status_code == 201
    assert response.json()["data"]["email"] == "test@example.com"
    assert "password" not in response.json()["data"]  # Never expose password

def test_create_user_invalid_email(client, auth_headers):
    """Invalid email — agent sees: validation, 422 status, error format."""
    response = client.post("/api/users", json={
        "email": "not-an-email",  # <- Invalid
        "username": "testuser",
        "password": "SecurePass123!"
    }, headers=auth_headers)
    assert response.status_code == 422

def test_create_user_requires_auth(client):
    """No auth header — agent understands auth requirement."""
    response = client.post("/api/users", json={...})
    assert response.status_code == 401
'''

print("Context Engineering Checklist:")
checklist = [
    "AGENTS.md with project overview, patterns, conventions",
    "README with setup instructions and test commands",
    "Semantic directory/file naming (routes/, services/, repositories/)",
    "Consistent patterns across all resources (agent learns by induction)",
    "Tests that serve as living documentation of data shapes and behaviors",
    "Clear module boundaries — single responsibility per module",
]
for item in checklist:
    print(f"  [+] {item}")`,
        keyPoints: [
          'Context engineering = structuring the codebase for AI agents, not just writing one prompt',
          'AGENTS.md provides explicit agent guidance: patterns to follow, how to run tests, conventions',
          'Semantic naming lets agents discover relevant files without you listing every one',
          'Tests are living documentation — agents learn data shapes and behaviors from them',
          'Consistent patterns let agents learn by induction and apply to new tasks without explicit instructions',
          '"Code that teaches itself": if a new developer can understand from reading alone, an agent can too',
          'Module boundaries matter: clear, single-responsibility modules are easier for agents to navigate',
        ],
        quiz: [
          {
            question: 'Context engineering aur prompt engineering mein kya fundamental difference hai?',
            options: [
              'Context engineering sirf API keys ke baare mein hai',
              'Prompt engineering ek single message tune karta hai; context engineering poora codebase is tarah structure karta hai ki AI agents ise padh ke immediately samajh sakein kya karna hai — har future task ke liye benefit milta hai',
              'Dono exactly same cheez hain alag naam se',
              'Context engineering sirf ChatGPT ke liye kaam karta hai',
            ],
            correctIndex: 1,
          },
          {
            question: 'AGENTS.md file ka AI coding agents ke liye kya role hai?',
            options: [
              'Yeh GitHub Actions workflows define karta hai',
              'Yeh agent-specific documentation provide karta hai: project patterns, kaise tests run karein, conventions, aur kya avoid karein — taaki agent bina guess kiye sahi decisions le sake',
              'Yeh automatically PRs create karta hai',
              'Yeh sirf human developers ke liye documentation hai',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Iterative Agent Workflows',
        difficulty: 'hard',
        tags: ['iteration', 'debugging', 'agent-failure', 'multi-round', 'workflow'],
        explanation: {
          english: `Even with great task specifications, AI agent tasks sometimes fail on the first attempt. Understanding how to handle failures effectively — and how to structure multi-round workflows for complex features — is a critical skill for working with AI coding agents.

When the first Codex attempt fails, there are three key failure modes and how to handle each:

1. Misunderstood requirements: Codex built something technically correct but wrong. "You built a public search endpoint, but the requirement was search only for the authenticated user's own data." Fix: clarify the misunderstood requirement specifically, referencing the acceptance criteria that was violated, and re-submit.

2. Environmental failure: Codex's code is correct but the test environment setup is wrong. "Tests fail because the DATABASE_URL env var is not set in the sandbox." Fix: add setup instructions to AGENTS.md or the README, or include environment setup in the task description.

3. Partial completion: Codex got 70% right but failed on edge cases or one component. Accept what works, give a new targeted task for what's left. "The pagination and search work correctly. The only remaining issue is the sort parameter — it's not being applied when search is also present."

How to write a follow-up task that incorporates error output:
Include the specific error message, the failing test name and line number, the observed behavior vs expected behavior, and which file/line needs attention. Never say "it doesn't work" — say "test_X fails at line Y with error Z. The issue is in file A line B where the code does C but should do D."

Using "partial completion" strategically: for complex features, break them into rounds intentionally. Round 1: "Implement the data model and database migration only — no endpoints yet." Review and merge. Round 2: "Add the read endpoints using the model from Round 1." Round 3: "Add write endpoints and validation."

Reading Codex's reasoning trace: when Codex produces output, it often includes a summary of decisions made and assumptions taken. Read this carefully — it tells you where Codex was uncertain. Those uncertain points are where bugs most often live.`,
          hinglish: `Great task specifications ke baavjood bhi, AI agent tasks kabhi kabhi pehli attempt mein fail ho jaate hain. Failures effectively handle karna — aur complex features ke liye multi-round workflows structure karna — AI coding agents ke saath kaam karne ki critical skill hai.

Jab pehla Codex attempt fail ho, teen key failure modes hain:

1. Misunderstood requirements: Codex ne technically correct lekin wrong cheez banaayi. "Tumne public search endpoint banaya, lekin requirement thi sirf authenticated user ke apne data ke liye search." Fix: specifically clarify karo kya misunderstand hua, violated acceptance criteria reference karte hue, aur re-submit karo.

2. Environmental failure: Codex ka code correct hai lekin test environment setup galat hai. "Tests fail ho rahe hain kyunki sandbox mein DATABASE_URL env var set nahi hai." Fix: AGENTS.md ya README mein setup instructions add karo, ya task description mein environment setup include karo.

3. Partial completion: Codex 70% sahi hai lekin edge cases ya ek component pe fail ho gaya. Jo kaam kiya accept karo, baaki ke liye naya targeted task do. "Pagination aur search correctly kaam karte hain. Sirf sort parameter remaining issue hai — jab search bhi present ho tab apply nahi ho raha."

Error output incorporate karte hue follow-up task kaise likhein:
Specific error message, failing test name aur line number, observed behavior vs expected behavior, aur kaunsa file/line attention chahta hai include karo. Kabhi mat kaho "yeh kaam nahi karta" — kaho "test_X line Y pe error Z se fail hota hai. Issue file A line B mein hai jahan code C karta hai lekin D karna chahiye."

"Partial completion" strategically use karna: complex features ke liye, rounds mein intentionally todo. Round 1: "Sirf data model aur database migration implement karo — abhi endpoints nahi." Review aur merge karo. Round 2: "Round 1 ke model se read endpoints add karo." Round 3: "Write endpoints aur validation add karo."

Codex ki reasoning trace padhna: Codex output produce karte waqt aksar decisions aur assumptions ka summary include karta hai. Ise dhyan se padho — yeh batata hai kahan Codex uncertain tha. Wahi uncertain points hain jahan bugs most often hote hain.`,
        },
        dailyLifeExample: `Socho ek construction project jo mehraundon mein hota hai. Architect pehle foundation design karta hai aur inspect karta hai. Phir structural frame. Phir interior. Phir finishing. Har round mein review hota hai aur next round mein feedback incorporate hota hai. Codex ke saath complex features ka yahi workflow hai — poora ek baar mein deliver karne ki koshish mat karo, stages mein break karo aur review karte jao.`,
        codeExample: `# Iterative Agent Workflows — Multi-round complex feature implementation

# ============================================
# SCENARIO: Implementing a complex feature in stages
# Feature: Real-time notification system
# ============================================

# ROUND 1 TASK: Data model aur migration sirf
round_1_task = """
Round 1 of 3 — Notification System: Data Model Only

Implement ONLY the data model and database migration for notifications.
Do NOT implement any endpoints or business logic in this round.

Files to create/modify:
- src/models/notification.py (new file — follow src/models/product.py pattern)
- migrations/ (create Alembic migration — follow existing migration files)

Notification model fields:
- id: UUID, primary key, auto-generated
- user_id: UUID, foreign key to users.id, NOT NULL, CASCADE delete
- type: String(50), NOT NULL — values: 'mention', 'reply', 'system'
- title: String(255), NOT NULL
- body: Text, nullable
- is_read: Boolean, default False, NOT NULL
- created_at: DateTime, auto-set to current UTC time
- read_at: DateTime, nullable (set when is_read changes to True)

Tests to write in tests/test_notification_model.py:
- Notification creates successfully with required fields
- is_read defaults to False
- read_at is None by default
- user_id foreign key constraint enforced

Verify: pytest tests/test_notification_model.py -v
Run migration: alembic upgrade head
"""

# ROUND 2 TASK (after Round 1 PR is merged):
round_2_task = """
Round 2 of 3 — Notification System: Read Endpoints

The Notification model from Round 1 is already merged and available.
File: src/models/notification.py

Implement read-only endpoints and repository layer ONLY.
Do NOT implement write endpoints or notification creation in this round.

Files to create:
- src/repositories/notification_repository.py (follow product_repository.py pattern)
- src/routes/notifications.py (follow products.py for auth and pagination patterns)

Endpoints:
- GET /api/notifications — list current user's notifications, paginated, newest first
  Params: ?is_read=true|false (optional filter), ?limit=20 (default), ?page=1
  Returns: {"data": [...], "meta": {"total": int, "unread_count": int, "page": int, "limit": int}}
- GET /api/notifications/{id} — get single notification (must belong to current user, 404 otherwise)

Tests in tests/test_notifications.py:
- List notifications for authenticated user (returns only OWN notifications)
- Unread filter works correctly
- Pagination works with filters
- GET by ID returns 404 for another user's notification
- GET by ID returns 404 for non-existent ID
- Auth required for all endpoints

Verify: pytest tests/test_notifications.py -v
"""

# ============================================
# HOW TO WRITE FOLLOW-UP TASK when first attempt fails
# ============================================

# First attempt error (hypothetical):
first_attempt_error = """
FAILED tests/test_notifications.py::test_list_returns_only_own_notifications
AssertionError: Expected 2 notifications for user A, got 5 (includes user B's notifications)

Codex output shows:
  query = db.query(Notification).all()  # BUG: no user filter!
"""

# BAD follow-up:
bad_followup = "The test for user isolation is failing"

# GOOD follow-up:
good_followup = """
Follow-up on Round 2 PR — Fix user isolation bug:

Failing test: test_list_returns_only_own_notifications (tests/test_notifications.py:line 45)

Error:
  AssertionError: Expected 2 notifications for user_a, got 5
  (Test creates notifications for 2 users; expects list to return only user_a's 2)

Root cause: In src/repositories/notification_repository.py, the get_for_user method:
  CURRENT (wrong):  return db.query(Notification).all()
  SHOULD BE:        return db.query(Notification).filter(Notification.user_id == user_id).all()

Fix needed:
1. Add user_id filter to get_for_user() in notification_repository.py
2. Verify test_list_returns_only_own_notifications passes
3. Also check: does the unread_count in meta also filter by user? It should.

Run: pytest tests/test_notifications.py::test_list_returns_only_own_notifications -v
"""

print("Multi-round complex feature workflow:")
rounds = [
    "Round 1: Data model + migration (review and merge)",
    "Round 2: Read endpoints (review and merge)",
    "Round 3: Write endpoints + business logic",
]
for round_desc in rounds:
    print(f"  -> {round_desc}")

print()
print("Benefits of staged approach:")
benefits = [
    "Each round is reviewable independently",
    "Bugs are caught at the layer they're introduced",
    "If Round 1 needs redesign, you haven't wasted Round 2/3 effort",
    "Tests verify each layer works before building on top",
]
for b in benefits:
    print(f"  + {b}")`,
        keyPoints: [
          'Three failure modes: misunderstood requirements, environmental failures, partial completion',
          'For partial completion: accept what works, write new targeted task for what remains',
          'Follow-up tasks must include: specific error, failing test name/line, observed vs expected behavior',
          'Never say "it doesn\'t work" — specify exact file, line, observed vs expected behavior',
          'Break complex features into rounds: model → read endpoints → write endpoints',
          'Read Codex\'s reasoning trace to find where it was uncertain — bugs live there',
          'Staged workflows are more reviewable and less likely to have cascading failures',
        ],
        quiz: [
          {
            question: 'Codex ke follow-up task mein sabse effective feedback kaunsa hai?',
            options: [
              '"Yeh sahi nahi hai, dobara try karo"',
              '"Tests fail ho rahe hain"',
              'Specific test name jo fail ho raha hai, exact error output, kaunsa file/line galat hai, observed behavior vs expected behavior — Codex ke liye actionable information',
              '"Poora implementation delete karo aur fresh start karo"',
            ],
            correctIndex: 2,
          },
          {
            question: 'Complex feature ko multiple rounds mein implement karne ka kya advantage hai?',
            options: [
              'Zyada rounds = zyada Codex API cost',
              'Har round independently review ho sakta hai, bugs sirf apni layer pe caught hote hain, aur agar early design change chahiye toh baad ke rounds ka effort waste nahi hota',
              'Multiple rounds se Codex zyada confused ho jaata hai',
              'Sirf ek round mein karna hamesha better hai',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Combining Codex with Other AI Tools',
        difficulty: 'medium',
        tags: ['ai-stack', 'chatgpt', 'claude-code', 'copilot', 'tool-selection'],
        explanation: {
          english: `The most effective developers in 2025 don't use just one AI tool — they use a stack of complementary tools, each for what it does best. Understanding which tool to reach for at which moment is itself a high-leverage skill.

The modern AI dev stack:

1. ChatGPT (chat interface, broad knowledge): Best for architectural brainstorming, understanding unfamiliar concepts, designing system interfaces, quick questions about libraries you've never used. "Design the architecture for a real-time notification system — what are the tradeoffs between WebSockets, Server-Sent Events, and polling?" ChatGPT can reason about tradeoffs quickly. It cannot run code or read your actual codebase.

2. OpenAI Codex (autonomous agent): Best for implementing well-scoped tickets, background batch tasks, test generation, systematic refactoring. You've decided what to build (with ChatGPT's help). Now delegate the implementation. Codex works while you're in meetings.

3. Claude Code (interactive terminal assistant): Best for interactive sessions where you need real-time feedback — debugging a session, understanding a complex part of the codebase, making a targeted small fix while you're in flow. Claude Code reads your actual files and terminal output. It's the "pair programmer" mode.

4. GitHub Copilot (IDE inline): Best for moment-to-moment coding when you know what you're writing and just want autocomplete friction reduced. Writing boilerplate, completing known patterns, not looking up syntax.

Which tool to use when:
- "I don't know what approach to take" → ChatGPT to design/brainstorm
- "I know what to build, it's a well-scoped task" → Codex to implement autonomously
- "I'm actively debugging or need to explore the code interactively" → Claude Code
- "I'm writing code and want inline assistance" → GitHub Copilot

How to pass context between tools: ChatGPT can output a design spec → paste it as the Codex task description. Codex output (the diff/PR) can be described to Claude Code for interactive review and fixes. The output of one tool becomes the input specification of the next.

Workflow example: use ChatGPT to design the architecture → Codex to implement → Claude Code to review and fix interactively.`,
          hinglish: `2025 ke sabse effective developers sirf ek AI tool use nahi karte — woh complementary tools ka ek stack use karte hain, har ek ke liye jo woh best karta hai. Kaunsa tool kab reach karna hai — yeh khud ek high-leverage skill hai.

Modern AI dev stack:

1. ChatGPT (chat interface, broad knowledge): Architectural brainstorming ke liye best, unfamiliar concepts samajhne ke liye, system interfaces design karne ke liye, kabhi use nahi ki libraries ke baare mein quick questions. "Real-time notification system ka architecture design karo — WebSockets, Server-Sent Events, aur polling mein tradeoffs kya hain?" ChatGPT tradeoffs ke baare mein quickly reason kar sakta hai. Code run nahi kar sakta ya actual codebase nahi padh sakta.

2. OpenAI Codex (autonomous agent): Well-scoped tickets implement karne ke liye best, background batch tasks, test generation, systematic refactoring. Kya build karna hai decide kar liya (ChatGPT ki help se). Ab implementation delegate karo. Codex meetings mein kaam karta hai.

3. Claude Code (interactive terminal assistant): Interactive sessions ke liye best jahan real-time feedback chahiye — debugging session, codebase ka complex hissa samajhna, flow mein rehte hue targeted small fix karna. Claude Code tumhare actual files aur terminal output padhta hai. Yeh "pair programmer" mode hai.

4. GitHub Copilot (IDE inline): Moment-to-moment coding ke liye best jab tum jaante ho kya likh rahe ho aur sirf autocomplete friction reduce karna chahte ho.

Kaunsa tool kab use karein:
- "Mujhe nahi pata kaunsa approach lena hai" → ChatGPT to design/brainstorm
- "Main jaanta hoon kya build karna hai, yeh well-scoped task hai" → Codex to implement autonomously
- "Main actively debug kar raha hoon ya interactively code explore karna chahta hoon" → Claude Code
- "Main code likh raha hoon aur inline assistance chahta hoon" → GitHub Copilot

Tools ke beech context kaise pass karein: ChatGPT design spec output kar sakta hai → Codex task description ke roop mein paste karo. Codex output (diff/PR) ko Claude Code ko interactive review aur fixes ke liye describe karo. Ek tool ka output agla tool ki input specification ban jaata hai.

Workflow example: ChatGPT se architecture design karein → Codex se implement karein → Claude Code se interactively review aur fix karein.`,
        },
        dailyLifeExample: `Socho ek construction crew: architect (ChatGPT) building design karta hai aur plans banata hai. General contractor (Codex) plans lekar independently team manage karta hai aur construction karta hai. Site supervisor (Claude Code) real-time pe site pe hota hai problems solve karne ke liye. Skilled workers (GitHub Copilot) apne specialized tasks rapidly execute karte hain. Har koi apna role jaanta hai — sab ek saath mile toh whole building jaldi aur better banta hai.`,
        codeExample: `# Modern AI Dev Stack — Which Tool When

# ============================================
# TOOL SELECTION DECISION FRAMEWORK
# ============================================
from dataclasses import dataclass
from typing import List

@dataclass
class AITool:
    name: str
    best_for: List[str]
    not_good_for: List[str]
    mode: str  # 'chat', 'autonomous', 'interactive', 'inline'

tools = [
    AITool(
        name="ChatGPT",
        best_for=[
            "Architecture design and tradeoff analysis",
            "Understanding unfamiliar technologies or libraries",
            "Brainstorming approaches to a problem",
            "Writing user-facing documentation or specs",
            "Quick questions about concepts",
        ],
        not_good_for=[
            "Running your actual code",
            "Reading your real codebase files",
            "Autonomous multi-file implementation",
            "Verifying that suggested code actually works",
        ],
        mode="chat"
    ),
    AITool(
        name="OpenAI Codex",
        best_for=[
            "Implementing well-scoped tickets autonomously",
            "Generating tests (TDD or retroactive)",
            "Systematic refactoring across many files",
            "Background tasks while you work on other things",
            "Issue-to-PR automation pipelines",
        ],
        not_good_for=[
            "Novel architectural decisions needing product context",
            "Urgent work (it's async — takes time)",
            "Interactive debugging sessions",
            "Tasks where you need to be in the loop continuously",
        ],
        mode="autonomous"
    ),
    AITool(
        name="Claude Code",
        best_for=[
            "Interactive debugging sessions",
            "Understanding complex parts of the codebase",
            "Small targeted fixes while in coding flow",
            "Real-time pair programming",
            "Reviewing Codex PRs interactively",
        ],
        not_good_for=[
            "Large autonomous background tasks",
            "Tasks where you want to be completely hands-off",
            "High-volume batch operations",
        ],
        mode="interactive"
    ),
    AITool(
        name="GitHub Copilot",
        best_for=[
            "Inline autocomplete while actively typing",
            "Completing known boilerplate patterns quickly",
            "Reducing syntax lookup friction",
            "Staying in flow while writing familiar code",
        ],
        not_good_for=[
            "Large multi-file tasks",
            "Architectural decisions",
            "Autonomous execution",
        ],
        mode="inline"
    ),
]

# ============================================
# WORKFLOW EXAMPLE: Full feature from idea to PR
# ============================================
feature_workflow = {
    "Step 1 — Design (ChatGPT)": {
        "tool": "ChatGPT",
        "task": "Design the notification system architecture. Ask: WebSockets vs SSE vs polling? How to handle offline users? What database schema?",
        "output": "Architecture decision doc + data model design + API spec"
    },
    "Step 2 — Implement (Codex)": {
        "tool": "OpenAI Codex",
        "task": "Implement the notification system based on the spec from Step 1. Context: [paste ChatGPT's spec]. Files to follow: [list]. Tests: [list]. Constraints: [list].",
        "output": "GitHub PR with implementation + tests"
    },
    "Step 3 — Review & Fix (Claude Code)": {
        "tool": "Claude Code",
        "task": "Review Codex's PR interactively. Read the diff, run tests locally, fix any issues found, optimize performance-critical paths.",
        "output": "Reviewed, tested, merged PR"
    },
    "Step 4 — Daily Coding (Copilot)": {
        "tool": "GitHub Copilot",
        "task": "As you work on features that USE the notification system, Copilot autocompletes your calls to the new API.",
        "output": "Faster coding of downstream features"
    }
}

print("Modern AI Dev Stack Workflow:")
for step, details in feature_workflow.items():
    print(f"\\n{step}")
    print(f"  Tool: {details['tool']}")
    print(f"  Task: {details['task'][:80]}...")
    print(f"  Output: {details['output']}")

print()
print("Mental model:")
mental_models = {
    "ChatGPT": "Expert consultant — advises, you decide",
    "Codex": "Autonomous junior dev — implement and test, you review",
    "Claude Code": "Pair programmer — works WITH you in real-time",
    "GitHub Copilot": "Smart keyboard — autocomplete, you drive",
}
for tool, model in mental_models.items():
    print(f"  {tool:<20}: {model}")`,
        keyPoints: [
          'ChatGPT = brainstorm and design; Codex = autonomous implement; Claude Code = interactive pair; Copilot = inline autocomplete',
          'Use ChatGPT to design architecture → paste the spec as the Codex task description',
          'Claude Code is best for interactive debugging and reviewing Codex PRs in real-time',
          'GitHub Copilot reduces inline coding friction — use while actively writing known patterns',
          'Context flows between tools: ChatGPT output → Codex task → Claude Code review',
          'Each tool has a different feedback loop: Copilot < 1s, ChatGPT seconds, Codex minutes-hours',
          'The stack multiplies individual productivity — know when to switch tools',
        ],
        quiz: [
          {
            question: 'Ek developer ko realtime notification system ke architecture ke baare mein brainstorm karna hai — WebSockets vs SSE tradeoffs. Kaunsa tool use karein?',
            options: [
              'GitHub Copilot — inline suggestions lene ke liye',
              'OpenAI Codex — autonomous implementation ke liye',
              'ChatGPT — architectural brainstorming aur tradeoff analysis ke liye, jab actual code run karna ya real codebase padhna zaroori na ho',
              'Claude Code — interactive debugging ke liye',
            ],
            correctIndex: 2,
          },
          {
            question: 'ChatGPT → Codex → Claude Code workflow mein tools ke beech context kaise pass hota hai?',
            options: [
              'Teeno tools automatically ek doosre ke saath communicate karte hain',
              'ChatGPT ka design output Codex task description mein paste hota hai; Codex ka PR/diff Claude Code ke saath interactive review ke liye share hota hai — har tool ka output agla tool ki input spec banta hai',
              'Sirf Claude Code baaki tools ka context access kar sakta hai',
              'Context pass nahi hota — har tool independently kaam karta hai',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'How do you choose between ChatGPT, Codex, and Claude Code for different tasks?',
            difficulty: 'medium',
            frequency: 'high',
            answer: {
              english: 'The choice depends on the task type and feedback loop needed. ChatGPT: use for architectural design, brainstorming tradeoffs, understanding unfamiliar technologies, and quick conceptual questions — it is a conversational expert but cannot run code or read your actual codebase. OpenAI Codex: use for well-scoped implementation tasks you want to delegate entirely — it works autonomously, runs tests, and returns a PR for review. Claude Code: use for interactive sessions where you need real-time feedback — debugging, exploring a complex codebase, targeted fixes while in flow. A productive workflow chains them: ChatGPT designs the architecture → you write a Codex task spec from the design → Codex implements → Claude Code helps review and fix interactively.',
              hinglish: 'Choice task type aur needed feedback loop pe depend karti hai. ChatGPT: architectural design ke liye, tradeoffs brainstorm karne ke liye, unfamiliar technologies samajhne ke liye use karo — yeh ek conversational expert hai lekin code run nahi kar sakta ya actual codebase nahi padh sakta. OpenAI Codex: well-scoped implementation tasks ke liye use karo jo tum entirely delegate karna chahte ho — yeh autonomously kaam karta hai, tests run karta hai, aur review ke liye PR return karta hai. Claude Code: interactive sessions ke liye use karo jahan real-time feedback chahiye — debugging, complex codebase explore karna, flow mein targeted fixes. Productive workflow chain karta hai: ChatGPT architecture design karta hai → tum design se Codex task spec likhte ho → Codex implements → Claude Code interactively review aur fix karne mein help karta hai.',
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
  {
    question: 'How would you set up a fully automated issue-to-PR pipeline using Codex?',
    difficulty: 'hard',
    frequency: 'medium',
    answer: {
      english: 'Set up a GitHub Actions workflow triggered on the issues "labeled" event. When an issue receives the "codex-ready" label, the workflow calls the Codex API using the issue title and body as the task description. Codex reads the issue, clones the repository in its sandbox, implements the feature, runs the test suite, and opens a GitHub PR referencing the original issue. For this to work reliably: (1) issues must follow a structured template with clear acceptance criteria, relevant file links, test expectations, and constraints; (2) the repository needs good context — a README with test commands, an AGENTS.md with conventions, consistent patterns for Codex to follow; (3) the OPENAI_API_KEY must be stored as a GitHub repository secret. Critical: never configure the pipeline to auto-merge Codex PRs — always require human review via branch protection rules.',
      hinglish: 'GitHub Actions workflow set up karo jo issues ke "labeled" event pe trigger ho. Jab ek issue "codex-ready" label receive kare, workflow Codex API ko issue title aur body as task description ke saath call kare. Codex issue padhta hai, sandbox mein repository clone karta hai, feature implement karta hai, test suite run karta hai, aur original issue reference karte hue GitHub PR open karta hai. Yeh reliably kaam karne ke liye: (1) issues structured template follow karein jisme clear acceptance criteria, relevant file links, test expectations, aur constraints ho; (2) repository mein achha context ho — README with test commands, AGENTS.md with conventions, Codex ke follow karne ke liye consistent patterns; (3) OPENAI_API_KEY GitHub repository secret ke roop mein stored ho. Critical: pipeline ko Codex PRs auto-merge karne ke liye configure kabhi mat karo — branch protection rules se hamesha human review require karo.',
    },
  },
  {
    question: 'What is context engineering and how does it improve AI coding agent performance?',
    difficulty: 'medium',
    frequency: 'medium',
    answer: {
      english: 'Context engineering is the practice of structuring your entire codebase so that AI agents can read it and immediately understand what to do — as opposed to prompt engineering which tunes a single interaction. Unlike chatbots that get snippets you paste, coding agents read your actual repository. A well-context-engineered codebase has: (1) Semantic file/directory naming so agents discover relevant files through structure. (2) An AGENTS.md file providing agent-specific guidance: which patterns to follow, how to run tests, what conventions the codebase uses, what NOT to do. (3) A README with setup and test commands so agents can run the test suite correctly. (4) Consistent patterns repeated across the codebase so agents learn conventions by induction. (5) Tests that document data shapes and expected behaviors — effectively living documentation. The principle: "code that teaches itself" — if a new developer with no context can understand the codebase by reading it, an AI agent can too.',
      hinglish: 'Context engineering woh practice hai jisme poora codebase is tarah structure kiya jaata hai ki AI agents ise padh ke immediately samajh sakein kya karna hai — prompt engineering se alag jo ek single interaction tune karta hai. Chatbots se alag jo tumhare paste kiye snippets get karte hain, coding agents actual repository padhte hain. Well-context-engineered codebase mein hota hai: (1) Semantic file/directory naming taaki agents structure ke through relevant files discover kar sakein. (2) AGENTS.md file jo agent-specific guidance provide kare: kaunse patterns follow karein, tests kaise run karein, codebase kaunse conventions use karta hai, kya mat karo. (3) README with setup aur test commands taaki agents test suite correctly run kar sakein. (4) Codebase mein consistent patterns repeat hon taaki agents conventions induction se seekhein. (5) Tests jo data shapes aur expected behaviors document karein — effectively living documentation. Principle: "code that teaches itself" — agar ek new developer bina context ke codebase padh ke samajh sakta hai, ek AI agent bhi kar sakta hai.',
    },
  },
  {
    question: 'When should you use Codex versus Claude Code versus ChatGPT for a development task?',
    difficulty: 'medium',
    frequency: 'high',
    answer: {
      english: 'Each tool has a distinct role: ChatGPT is the architect/consultant — use it for brainstorming, architectural decisions, understanding tradeoffs, and designing interfaces when you do not yet know what to build. It cannot access your codebase or run code. OpenAI Codex is the autonomous implementer — use it for well-scoped, non-urgent implementation tasks you want to delegate entirely: the task runs in its sandbox, implements code, runs tests, and returns a PR. Best for: tickets you know what to build, background batch tasks, systematic refactoring, test generation. Claude Code is the interactive pair programmer — use it when you are actively working on the code and need real-time feedback: debugging sessions, exploring unfamiliar parts of the codebase, making targeted fixes while in flow. The decision rule: "I do not know what to build" → ChatGPT. "I know what to build, it is a well-defined task, I can wait" → Codex. "I am actively coding and need help right now" → Claude Code.',
      hinglish: 'Har tool ka ek distinct role hai: ChatGPT architect/consultant hai — brainstorming ke liye, architectural decisions ke liye, tradeoffs samajhne ke liye, aur interfaces design karne ke liye use karo jab abhi nahi jaante kya build karna hai. Yeh tumhara codebase access nahi kar sakta ya code run nahi kar sakta. OpenAI Codex autonomous implementer hai — well-scoped, non-urgent implementation tasks ke liye use karo jo tum entirely delegate karna chahte ho: task sandbox mein run karta hai, code implement karta hai, tests run karta hai, aur PR return karta hai. Best for: tickets jahan jaante ho kya build karna hai, background batch tasks, systematic refactoring, test generation. Claude Code interactive pair programmer hai — jab actively code pe kaam kar rahe ho aur real-time feedback chahiye: debugging sessions, codebase ke unfamiliar parts explore karna, flow mein targeted fixes karna. Decision rule: "Mujhe nahi pata kya build karna hai" → ChatGPT. "Mujhe pata hai kya build karna hai, well-defined task hai, wait kar sakta hoon" → Codex. "Main actively coding kar raha hoon aur abhi help chahiye" → Claude Code.',
    },
  },
];
