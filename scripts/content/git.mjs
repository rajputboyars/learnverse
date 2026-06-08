// Git & GitHub curriculum — beginner -> intermediate -> advanced.
// Same shape as javascript.mjs, consumed by scripts/seed.mjs.

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export const course = {
  title: 'Git & GitHub',
  slug: 'git',
  description:
    'Version control seekho — commits, branches, pull requests aur team collaboration. English + Hinglish, desi examples, code aur interview questions ke saath.',
  icon: '🌿',
  tags: ['git', 'github', 'version-control', 'devops'],
  difficulty: 'beginner',
  language: ['english', 'hinglish'],
  status: 'published',
  order: 13,
};

const beginner = [
  {
    title: 'Git Fundamentals',
    level: 'beginner',
    description: 'Git kya hai, setup aur basic commands.',
    concepts: [
      {
        title: 'What is Git',
        difficulty: 'easy',
        tags: ['intro', 'basics', 'vcs'],
        explanation: {
          english:
            'Git is a distributed version control system — it tracks changes to files over time so you can recall specific versions, collaborate with others, and undo mistakes. Every developer has a complete copy of the history. Git was created by Linus Torvalds in 2005 for managing the Linux kernel source code.',
          hinglish:
            'Git ek distributed version control system hai — ye time ke saath files mein changes track karta hai taaki specific versions wapas recall kar sako, doosron ke saath collaborate kar sako, aur galtiyan undo kar sako. Har developer ke paas history ki poori copy hoti hai. Git 2005 mein Linus Torvalds ne Linux kernel source code manage karne ke liye banaya tha.',
        },
        dailyLifeExample:
          'Git ek time machine jaisi hai jo har roz tumhari project ki ek snapshot leta hai. Galti ho gayi? Kal wali snapshot pe wapas jao. Sab log ek saath kaam karte hain apni-apni copies pe — badlaav baad mein merge ho jaate hain.',
        codeExample:
          '# First-time Git setup\ngit config --global user.name "Arjun Kumar"\ngit config --global user.email "arjun@example.com"\n\n# Start tracking a project\ngit init              # create a new repo\ngit status            # see what changed\ngit add .             # stage all changes\ngit commit -m "Initial commit"  # save a snapshot\n\n# See history\ngit log --oneline',
        keyPoints: [
          'Tracks file changes over time — full history',
          'Distributed — every developer has the full repo',
          'Lets you branch, merge, and collaborate',
          'Used with GitHub/GitLab to host repos remotely',
        ],
        quiz: [
          {
            question: 'What does `git init` do?',
            options: [
              'Clones a remote repository',
              'Creates a new local Git repository in the current folder',
              'Pushes code to GitHub',
              'Resets all changes',
            ],
            correctIndex: 1,
          },
          {
            question: 'What is the difference between Git and GitHub?',
            options: [
              'They are the same thing',
              'Git is the version control tool; GitHub is a cloud hosting service for Git repos',
              'GitHub is the CLI; Git is the website',
              'Git is owned by Microsoft',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between Git and GitHub?',
            difficulty: 'easy',
            frequency: 'very-common',
            answer: {
              english:
                'Git is a free, open-source version control system that runs locally on your machine and tracks changes to files. GitHub is a cloud hosting platform for Git repositories that adds collaboration features: pull requests, issues, code review, Actions (CI/CD), and a web UI. You can use Git without GitHub (e.g. with GitLab, Bitbucket, or just locally).',
              hinglish:
                'Git ek free, open-source version control system hai jo tumhari machine pe locally run hota hai aur files mein changes track karta hai. GitHub Git repositories ke liye ek cloud hosting platform hai jo collaboration features add karta hai: pull requests, issues, code review, Actions (CI/CD), aur web UI. Git ko GitHub ke bina bhi use kar sakte ho (jaise GitLab, Bitbucket, ya sirf locally).',
            },
          },
        ],
      },
      {
        title: 'Staging and Committing',
        difficulty: 'easy',
        tags: ['commit', 'staging', 'basics'],
        explanation: {
          english:
            'Git has three areas: the Working Directory (files you edit), the Staging Area (what will go into the next commit), and the Repository (committed history). `git add` moves changes to staging; `git commit` saves the staged snapshot permanently. This two-step process lets you craft exactly what goes into each commit.',
          hinglish:
            'Git ke teen areas hain: Working Directory (files jo tum edit karte ho), Staging Area (jo agle commit mein jaayega), aur Repository (committed history). `git add` changes ko staging pe le jaata hai; `git commit` staged snapshot permanently save karta hai. Ye two-step process exactly control karne deta hai ki har commit mein kya jaaye.',
        },
        dailyLifeExample:
          'Working directory tumhari draft notebook hai. Staging area envelope hai jisme tum specific pages rakho bhejne se pehle. Commit woh moment hai jab envelope seal ho jaata hai aur post box mein jaata hai — hamesha ke liye record ho jaata hai.',
        codeExample:
          '# Check what changed\ngit status\ngit diff                    # unstaged changes\ngit diff --staged           # staged changes\n\n# Stage selectively\ngit add src/app.js          # specific file\ngit add src/                # entire folder\ngit add -p                  # interactive patch mode\n\n# Commit\ngit commit -m "Add login form validation"\n\n# Undo staging (does NOT delete changes)\ngit restore --staged src/app.js\n\n# Amend last commit message (before push)\ngit commit --amend -m "Fix: add login form validation"',
        keyPoints: [
          'Working Dir → git add → Staging → git commit → Repo',
          'git status shows current state at a glance',
          'git diff shows exact line-by-line changes',
          'Write clear commit messages: "what" and "why"',
        ],
        quiz: [
          {
            question: 'What does `git add .` do?',
            options: [
              'Commits all changes',
              'Stages all changes in the current directory for the next commit',
              'Creates a new branch',
              'Pushes to remote',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the Git staging area and why is it useful?',
            difficulty: 'easy',
            frequency: 'common',
            answer: {
              english:
                'The staging area (index) is a preparation zone between the working directory and the repository. It lets you cherry-pick exactly which changes go into the next commit, even if you have edits in multiple files. This keeps commits focused and atomic — one logical change per commit — making history easier to read and reverting easier.',
              hinglish:
                'Staging area (index) working directory aur repository ke beech ek preparation zone hai. Ye exactly choose karne deta hai ki kaunse changes agle commit mein jaayein, chahe kai files mein edits hon. Isse commits focused aur atomic rehte hain — ek logical change per commit — history padhna aur reverting karna easy hota hai.',
            },
          },
        ],
      },
      {
        title: 'Branching and Merging',
        difficulty: 'easy',
        tags: ['branching', 'merging', 'workflow'],
        explanation: {
          english:
            'Branches let you work on a feature or bug fix in isolation without affecting the main codebase. `git branch feature-login` creates a branch; `git checkout -b feature-login` creates and switches in one step. When done, `git merge` combines the work back. Conflicts arise when two branches changed the same lines — Git asks you to resolve them manually.',
          hinglish:
            'Branches ek feature ya bug fix par main codebase affect kiye bina alag kaam karne dete hain. `git branch feature-login` branch banata hai; `git checkout -b feature-login` ek step mein banata aur switch karta hai. Kaam hone par `git merge` wapas combine karta hai. Conflicts tab hote hain jab do branches ne same lines badli hon — Git manually resolve karne bolata hai.',
        },
        dailyLifeExample:
          'Branching ek book ki photocopy lene jaisi hai — original safe hai. Copy pe edit karo, jab satisfy ho toh original mein merge karo. Agar kisi doosre ne bhi same page edit ki toh conflict hoga — baithkar decide karo kaunsi wali rakhni hai.',
        codeExample:
          '# Create and switch to a branch\ngit checkout -b feature/login\n\n# See all branches\ngit branch\n\n# Switch back to main\ngit checkout main\n\n# Merge feature branch into main\ngit merge feature/login\n\n# Delete merged branch\ngit branch -d feature/login\n\n# Rebase (cleaner history alternative to merge)\ngit rebase main',
        keyPoints: [
          'Branches isolate work — main stays stable',
          'checkout -b creates + switches in one step',
          'Merge combines branches; may produce conflicts',
          'Rebase replays commits on top for linear history',
        ],
        quiz: [
          {
            question: 'What does `git checkout -b feature/auth` do?',
            options: [
              'Checks out an existing branch named feature/auth',
              'Creates a new branch and switches to it',
              'Deletes the feature/auth branch',
              'Merges feature/auth into main',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between git merge and git rebase?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                '`git merge` creates a merge commit that joins two branch histories — history shows the divergence and join. `git rebase` moves (replays) your commits onto the tip of another branch, creating a linear history as if you branched off the latest point. Merge is non-destructive and safer for shared branches. Rebase gives cleaner history but rewrites commits — never rebase shared/public branches.',
              hinglish:
                '`git merge` ek merge commit banata hai jo do branch histories ko join karta hai — history divergence aur join dikhati hai. `git rebase` tumhare commits ko doosre branch ke tip par move (replay) karta hai, linear history create karta hai jaise tumne latest point se branch kiya ho. Merge non-destructive aur shared branches ke liye safer hai. Rebase cleaner history deta hai par commits rewrite karta hai — shared/public branches pe kabhi rebase mat karo.',
            },
          },
        ],
      },
    ],
  },
];

const intermediate = [
  {
    title: 'GitHub Collaboration',
    level: 'intermediate',
    description: 'Remote repositories, pull requests aur team workflow.',
    concepts: [
      {
        title: 'Remote Repositories and GitHub',
        difficulty: 'medium',
        tags: ['github', 'remote', 'push', 'pull'],
        explanation: {
          english:
            'A remote repository is a version of your project hosted on the internet (GitHub, GitLab). `git clone` downloads a repo; `git push` uploads your commits; `git pull` downloads and merges remote changes. `origin` is the default name for the remote you cloned from.',
          hinglish:
            'Remote repository tumhare project ka internet pe hosted version hai (GitHub, GitLab). `git clone` repo download karta hai; `git push` tumhare commits upload karta hai; `git pull` remote changes download karke merge karta hai. `origin` us remote ka default naam hai jahan se clone kiya.',
        },
        dailyLifeExample:
          'GitHub Google Drive jaisa hai code ke liye. Local machine tumhari notebook hai, GitHub shared office file server hai. Kaam karo locally, push karo taaki team dekh sake aur sync rakhe.',
        codeExample:
          '# Clone an existing repo\ngit clone https://github.com/user/learnverse.git\n\n# Check remotes\ngit remote -v\n\n# Push a branch to GitHub\ngit push -u origin feature/login\n\n# Pull latest changes from main\ngit pull origin main\n\n# Fetch without merging\ngit fetch origin\n\n# Fork workflow: add upstream remote\ngit remote add upstream https://github.com/original/repo.git\ngit fetch upstream\ngit rebase upstream/main',
        keyPoints: [
          'origin = default remote (where you cloned from)',
          'git push uploads commits to remote',
          'git pull = git fetch + git merge',
          'git fetch downloads without changing working files',
        ],
        quiz: [
          {
            question: 'What is the difference between `git fetch` and `git pull`?',
            options: [
              'They are the same',
              'fetch downloads remote changes but does not merge; pull downloads AND merges',
              'pull is for branches; fetch is for tags',
              'fetch is faster than pull',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain the GitHub pull request workflow.',
            difficulty: 'easy',
            frequency: 'very-common',
            answer: {
              english:
                '1. Fork or clone the repo. 2. Create a feature branch (git checkout -b feature/x). 3. Make commits on the branch. 4. Push the branch to GitHub (git push -u origin feature/x). 5. Open a Pull Request on GitHub from your branch to main/develop. 6. Team reviews, requests changes, approves. 7. Merge the PR into the target branch. 8. Delete the feature branch. This protects main from direct pushes and enables code review.',
              hinglish:
                '1. Repo fork ya clone karo. 2. Feature branch banao (git checkout -b feature/x). 3. Branch pe commits karo. 4. Branch GitHub pe push karo (git push -u origin feature/x). 5. GitHub pe apni branch se main/develop mein Pull Request kholo. 6. Team review kare, changes request kare, approve kare. 7. PR ko target branch mein merge karo. 8. Feature branch delete karo. Ye main ko direct pushes se bachata hai aur code review enable karta hai.',
            },
          },
        ],
      },
      {
        title: '.gitignore',
        difficulty: 'easy',
        tags: ['gitignore', 'basics'],
        explanation: {
          english:
            'The `.gitignore` file lists patterns of files and folders Git should not track — like `node_modules/`, `.env` files with secrets, build outputs, and editor configs. Anything listed is invisible to Git. You can use `*` wildcards and negate patterns with `!`.',
          hinglish:
            '`.gitignore` file un files aur folders ke patterns list karta hai jinhe Git track nahi karna chahiye — jaise `node_modules/`, secrets wali `.env` files, build outputs, aur editor configs. Jo bhi list mein hai woh Git ke liye invisible hai. `*` wildcards aur `!` se patterns negate kar sakte ho.',
        },
        dailyLifeExample:
          '.gitignore ek "do not pack" list jaisi hai jab ghar shift karte ho — kachra, purani daftar ki files, temporary items. Sirf zaroori cheezein new house le jaao, baaki chod do.',
        codeExample:
          '# .gitignore for a Node.js / Next.js project\nnode_modules/\n.next/\ndist/\nbuild/\n\n# Environment secrets — NEVER commit these\n.env\n.env.local\n.env.production\n\n# Editor files\n.vscode/\n.idea/\n*.swp\n\n# OS files\n.DS_Store\nThumbs.db\n\n# Logs\n*.log\nnpm-debug.log*',
        keyPoints: [
          'List files/folders to exclude from version control',
          'Never commit .env or node_modules',
          'Use gitignore.io to generate templates',
          'Already-tracked files must be untracked with git rm --cached',
        ],
        quiz: [
          {
            question: 'Why should you add `.env` to .gitignore?',
            options: [
              'Because .env files are too large',
              'To prevent secret keys and passwords from being committed to the repo',
              'Because Git cannot read .env files',
              '.env files cause merge conflicts',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'You accidentally committed a .env file with secrets. What do you do?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                '1. Immediately rotate / revoke the exposed secrets. 2. Add .env to .gitignore. 3. Remove it from tracking: `git rm --cached .env`. 4. Commit the removal. 5. Rewrite history to remove the file from past commits with `git filter-repo` or BFG Repo Cleaner. 6. Force push the rewritten history (all collaborators must re-clone). Step 1 is critical — assume the secret is already compromised.',
              hinglish:
                '1. Expose hue secrets turant rotate/revoke karo. 2. .env ko .gitignore mein add karo. 3. Tracking se hatao: `git rm --cached .env`. 4. Removal commit karo. 5. `git filter-repo` ya BFG Repo Cleaner se past commits se file rewrite karo. 6. Rewritten history force push karo (sab collaborators re-clone karein). Step 1 critical hai — assume karo ki secret already compromised hai.',
            },
          },
        ],
      },
    ],
  },
];

const advanced = [
  {
    title: 'Advanced Git',
    level: 'advanced',
    description: 'Stash, cherry-pick, reset aur professional workflows.',
    concepts: [
      {
        title: 'git stash, reset, and revert',
        difficulty: 'hard',
        tags: ['stash', 'reset', 'revert', 'advanced'],
        explanation: {
          english:
            '`git stash` temporarily shelves uncommitted changes so you can switch context. `git stash pop` restores them. `git reset` moves the HEAD pointer — `--soft` keeps staged changes, `--mixed` unstages them, `--hard` discards them entirely. `git revert` creates a new commit that undoes a previous one — safe for shared branches because it doesn\'t rewrite history.',
          hinglish:
            '`git stash` uncommitted changes temporarily shelf karta hai taaki context switch kar sako. `git stash pop` unhe restore karta hai. `git reset` HEAD pointer move karta hai — `--soft` staged changes rakhta hai, `--mixed` unstage karta hai, `--hard` poora discard karta hai. `git revert` ek naya commit banata hai jo pehle wale ko undo karta hai — shared branches ke liye safe hai kyunki history rewrite nahi karta.',
        },
        dailyLifeExample:
          'Stash notebook ka "temporary bookmark" hai — kaam beech mein rukao, bookmark lagao, doosra kaam karo, wapas aao. Reset time machine ki tarah hai — past pe jaao. Revert ek "correction letter" ki tarah hai — galti accept karo aur naya entry daalo ki "galti thi, correct kar rahe hain".',
        codeExample:
          '# Stash uncommitted work\ngit stash\ngit stash pop           # restore latest stash\ngit stash list          # see all stashes\ngit stash drop stash@{0}\n\n# Reset (be careful!)\ngit reset --soft HEAD~1  # undo last commit, keep staged\ngit reset --mixed HEAD~1 # undo last commit, keep unstaged\ngit reset --hard HEAD~1  # undo last commit, DISCARD changes\n\n# Revert — safe for shared branches\ngit revert abc1234       # creates undo commit for abc1234\n\n# Cherry-pick — apply a specific commit\ngit cherry-pick abc1234',
        keyPoints: [
          'stash: temporary shelf for uncommitted changes',
          'reset --hard: dangerous — permanently discards work',
          'revert: safe undo via a new commit',
          'cherry-pick: apply any commit to current branch',
        ],
        quiz: [
          {
            question: 'Which git command safely undoes a commit on a shared branch?',
            options: ['git reset --hard', 'git revert', 'git stash', 'git cherry-pick'],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between git reset and git revert?',
            difficulty: 'medium',
            frequency: 'very-common',
            answer: {
              english:
                '`git reset` moves the HEAD and branch pointer backwards, rewriting history — changes after the reset point are gone (or unstaged). Safe only on local/private branches. `git revert` creates a new commit that applies the inverse of the target commit — history is preserved. Safe on shared branches because it doesn\'t rewrite. Rule: use revert for anything already pushed.',
              hinglish:
                '`git reset` HEAD aur branch pointer ko backwards move karta hai, history rewrite karta hai — reset point ke baad ke changes chale jaate hain (ya unstage ho jaate hain). Sirf local/private branches pe safe hai. `git revert` ek naya commit banata hai jo target commit ka inverse apply karta hai — history preserved rehti hai. Shared branches pe safe hai kyunki rewrite nahi karta. Rule: jo bhi already push ho chuka hai uske liye revert use karo.',
            },
          },
        ],
      },
    ],
  },
];

export const curriculum = [...beginner, ...intermediate, ...advanced];

export const generalInterviewQuestions = [
  {
    question: 'What is a good Git branching strategy for a team?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Popular strategies: (1) GitHub Flow — one main branch, short-lived feature branches merged via PRs; simple and works for CI/CD. (2) Gitflow — main + develop + feature/release/hotfix branches; more structure for scheduled releases. For most web apps with continuous deployment, GitHub Flow is simpler and sufficient. Key rule: never commit directly to main; always use feature branches and PRs for code review.',
      hinglish:
        'Popular strategies: (1) GitHub Flow — ek main branch, short-lived feature branches PRs ke through merge; simple aur CI/CD ke liye kaam karta hai. (2) Gitflow — main + develop + feature/release/hotfix branches; scheduled releases ke liye zyada structure. Zyaadatar continuous deployment wale web apps ke liye GitHub Flow simpler aur sufficient hai. Key rule: main pe directly commit mat karo; code review ke liye hamesha feature branches aur PRs use karo.',
    },
  },
];
