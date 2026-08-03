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
            frequency: 'common',
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
          {
            question: 'Does `git add` alone save your changes permanently to project history?',
            options: [
              'Yes, it is the same as committing',
              'No — it only stages the changes; git commit is what actually saves them to history',
              'It deletes the changes',
              'It pushes to GitHub',
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
          {
            question: 'You run `git merge feature/x` and Git reports a CONFLICT. What does this mean?',
            options: [
              'The merge failed completely and nothing happened',
              'Both branches changed the same lines differently; Git needs you to manually pick the correct content before finishing the merge',
              'Your branch was deleted',
              'You need to force push',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between git merge and git rebase?',
            difficulty: 'medium',
            frequency: 'common',
            answer: {
              english:
                '`git merge` creates a merge commit that joins two branch histories — history shows the divergence and join. `git rebase` moves (replays) your commits onto the tip of another branch, creating a linear history as if you branched off the latest point. Merge is non-destructive and safer for shared branches. Rebase gives cleaner history but rewrites commits — never rebase shared/public branches.',
              hinglish:
                '`git merge` ek merge commit banata hai jo do branch histories ko join karta hai — history divergence aur join dikhati hai. `git rebase` tumhare commits ko doosre branch ke tip par move (replay) karta hai, linear history create karta hai jaise tumne latest point se branch kiya ho. Merge non-destructive aur shared branches ke liye safer hai. Rebase cleaner history deta hai par commits rewrite karta hai — shared/public branches pe kabhi rebase mat karo.',
            },
          },
        ],
      },
      {
        title: 'Resolving Merge Conflicts',
        difficulty: 'medium',
        tags: ['merge', 'conflicts', 'collaboration'],
        explanation: {
          english:
            'A merge conflict happens when Git cannot automatically combine changes because two branches edited the SAME lines differently. Git pauses the merge and marks the conflicting file with special markers: <<<<<<< HEAD (your version), ======= (a divider), and >>>>>>> branch-name (their version). You manually edit the file to keep the correct content, remove the markers, then git add the file and git commit to complete the merge.',
          hinglish:
            'Merge conflict tab hota hai jab Git changes ko automatically combine nahi kar pata kyunki do branches ne SAME lines ko alag-alag tarike se edit kiya. Git merge ko pause kar deta hai aur conflicting file ko special markers se mark karta hai: <<<<<<< HEAD (tumhara version), ======= (ek divider), aur >>>>>>> branch-name (unka version). Tum manually file edit karke sahi content rakhte ho, markers hata dete ho, phir git add file aur git commit se merge complete karte ho.',
        },
        dailyLifeExample:
          "Merge conflict do logon ke ek hi Google Doc paragraph ko ek saath, alag-alag tarike se edit karne jaisa hai — jab dono save karte hain, kisi ko decide karna padta hai final version kya hoga. Git markers ek highlighted 'ye dono versions hain, tum decide karo' note jaise hain.",
        codeExample:
          '$ git merge feature/pricing\nAuto-merging pricing.js\nCONFLICT (content): Merge conflict in pricing.js\nAutomatic merge failed; fix conflicts and then commit the result.\n\n# pricing.js now contains:\n<<<<<<< HEAD\nconst price = 499; // your version (main)\n=======\nconst price = 599; // their version (feature/pricing)\n>>>>>>> feature/pricing\n\n# after manually deciding and editing to keep one (or a combined) version:\nconst price = 599;\n\n$ git add pricing.js\n$ git commit -m "Merge feature/pricing, resolve price conflict"',
        keyPoints: [
          'Conflicts happen when both branches edit the same lines differently',
          '<<<<<<<, =======, >>>>>>> mark your version vs their version',
          'Edit the file to keep the correct content and remove ALL markers',
          'git add the resolved file, then git commit to finish the merge',
          'git status always shows which files still have unresolved conflicts',
        ],
        quiz: [
          {
            question: 'What do <<<<<<< and >>>>>>> markers in a file mean?',
            options: ['The file is corrupted', 'They mark the two conflicting versions Git could not auto-merge', 'Git deleted that section', 'A syntax error in your code'],
            correctIndex: 1,
          },
          {
            question: 'After manually fixing a conflicted file, what are your next two steps?',
            options: ['Nothing, Git finishes automatically', 'git add the file, then git commit', 'Delete the file and start over', 'git push immediately'],
            correctIndex: 1,
          },
          {
            question: 'Why do merge conflicts happen?',
            options: ['Git is broken', 'Two branches changed the exact same lines in different ways', 'You forgot to commit', 'The internet connection dropped'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Undoing Uncommitted Changes: restore & checkout',
        difficulty: 'easy',
        tags: ['restore', 'undo', 'basics'],
        explanation: {
          english:
            "Before you commit, mistakes are cheap to undo. git restore <file> discards UNCOMMITTED changes in the working directory, reverting the file back to its last committed version — use this when you've messed up an edit and just want to start over. git restore --staged <file> unstages a file (moves it back from staging to working directory) WITHOUT losing the edit itself. These are different from reset/revert, which undo already-COMMITTED history.",
          hinglish:
            "Commit karne se pehle, galtiyan sasti hoti hain undo karne mein. git restore <file> WORKING DIRECTORY ki UNCOMMITTED changes discard kar deta hai, file ko uske last committed version pe wapas le aata hai — jab edit bigad gaya ho aur bas restart karna ho tab use karo. git restore --staged <file> ek file ko unstage karta hai (staging se wapas working directory mein) BINA edit khoye. Ye reset/revert se alag hain, jo already-COMMITTED history undo karte hain.",
        },
        dailyLifeExample:
          'git restore ek eraser jaisa hai jo abhi tak submit na kiya hua homework mita deta hai — jo likha tha wo gaya, blank page wapas mil gaya. git restore --staged envelope mein rakhi chitthi wapas mez pe nikaal lena hai — chitthi abhi bhi hai, bas post karne ke liye ready nahi.',
        codeExample:
          '# You made a mess in app.js and just want to start over\ngit status\n#   modified: app.js\n\ngit restore app.js       # discards uncommitted changes, back to last commit\n\n# You staged a file by mistake with git add, but aren\'t ready to commit\ngit add secrets.js       # oops, staged too early\ngit restore --staged secrets.js  # unstage it (edit is still there, just not staged)\n\n# Old command (still common in tutorials/older Git): same as restore\ngit checkout -- app.js',
        keyPoints: [
          'git restore <file>: discards uncommitted working-directory changes (careful, this is permanent!)',
          'git restore --staged <file>: unstages a file WITHOUT losing the edit',
          'These undo UNCOMMITTED work; reset/revert undo COMMITTED history',
          'git checkout -- <file> is the older, equivalent command for restore',
          'Always git status first to see exactly what state a file is in',
        ],
        quiz: [
          {
            question: 'What does git restore app.js do?',
            options: ['Deletes app.js permanently from the project', 'Discards uncommitted changes in app.js, reverting it to the last commit', 'Commits app.js', 'Renames app.js'],
            correctIndex: 1,
          },
          {
            question: "You ran git add on a file by mistake but haven't committed. How do you unstage it WITHOUT losing your edits?",
            options: ['git reset --hard', 'git restore --staged <file>', 'git revert', 'Delete and rewrite the file'],
            correctIndex: 1,
          },
          {
            question: "What's the key difference between restore and reset/revert?",
            options: ['No difference', 'restore undoes UNCOMMITTED changes; reset/revert undo already-COMMITTED history', 'restore only works on GitHub', 'reset only works locally'],
            correctIndex: 1,
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
          {
            question: 'What does the `-u` flag in `git push -u origin feature/login` do?',
            options: [
              'Uploads faster',
              "Sets the upstream tracking branch, so future git push/pull on this branch don't need the remote/branch name repeated",
              'Deletes the branch after pushing',
              'Undoes the last push',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'Explain the GitHub pull request workflow.',
            difficulty: 'easy',
            frequency: 'common',
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
          {
            question: 'You add a file to .gitignore, but Git still tracks changes to it. Why?',
            options: [
              '.gitignore is broken',
              'The file was already tracked BEFORE you added it to .gitignore — it only prevents tracking NEW files; already-tracked files need git rm --cached',
              'You need to restart your computer',
              '.gitignore only works on GitHub, not locally',
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
      {
        title: 'Tags & Releases',
        difficulty: 'medium',
        tags: ['tags', 'releases', 'versioning'],
        explanation: {
          english:
            "A tag is a permanent, named bookmark pointing at a specific commit — typically used to mark version milestones like v1.0.0. Unlike branches, tags don't move as new commits are added. An annotated tag (git tag -a) stores extra metadata (author, date, message) and is recommended for releases; a lightweight tag is just a pointer. Pushing a tag to GitHub and creating a 'Release' from it lets users download a specific, stable version of your project.",
          hinglish:
            "Tag ek permanent, named bookmark hai jo ek specific commit ko point karta hai — typically version milestones mark karne ke liye jaise v1.0.0. Branches ke ulat, tags naye commits aane se move nahi hote. Annotated tag (git tag -a) extra metadata store karta hai (author, date, message) aur releases ke liye recommended hai; lightweight tag sirf ek pointer hai. Tag ko GitHub pe push karke uska 'Release' banana users ko project ka ek specific, stable version download karne deta hai.",
        },
        dailyLifeExample:
          "Tag ek kitaab mein permanent bookmark jaisa hai jispe likha hai 'Chapter 5 final version' — chahe kitaab mein aur pages jud jaayein, ye bookmark usi jagah rehta hai. Branch ek page-marker jaisa hai jo tum aage badhate rehte ho jaise-jaise likhte ho.",
        codeExample:
          '# lightweight tag (just a pointer)\ngit tag v1.0.0\n\n# annotated tag (recommended — has metadata)\ngit tag -a v1.2.0 -m "First stable release with auth"\n\n# see all tags\ngit tag\n\n# push a single tag to GitHub\ngit push origin v1.2.0\n\n# push ALL tags\ngit push origin --tags\n\n# check out the exact code from a tagged version\ngit checkout v1.2.0',
        keyPoints: [
          'A tag is a permanent bookmark pointing at one specific commit',
          'Unlike branches, tags do NOT move as new commits are added',
          'Annotated tags (-a) store author/date/message; recommended for releases',
          'Tags are NOT pushed automatically — use git push origin --tags',
          'GitHub turns a pushed tag into a downloadable "Release"',
        ],
        quiz: [
          {
            question: 'What is the key difference between a tag and a branch?',
            options: ['No difference', 'A tag is a fixed pointer to one commit; a branch moves forward as new commits are added', 'Tags can be edited, branches cannot', 'Branches are for releases, tags are for features'],
            correctIndex: 1,
          },
          {
            question: 'Does git push automatically push your tags too?',
            options: ['Yes, always', 'No — tags need git push origin --tags (or push a specific tag by name)', 'Only annotated tags push automatically', 'Only if you use GitHub Desktop'],
            correctIndex: 1,
          },
          {
            question: 'Which type of tag stores extra metadata like author, date and a message?',
            options: ['Lightweight tag', 'Annotated tag', 'Both store the same info', 'Neither stores metadata'],
            correctIndex: 1,
          },
        ],
      },
      {
        title: 'Forking, Issues & Open Source Contribution',
        difficulty: 'medium',
        tags: ['github', 'open-source', 'fork', 'issues'],
        explanation: {
          english:
            "A fork is your own personal copy of someone else's repository on GitHub, letting you make changes without needing write access to the original. GitHub Issues track bugs, feature requests, and discussions — each one gets a number, labels (bug, good-first-issue), and comments. The typical open-source contribution flow: fork the repo, clone YOUR fork, create a branch, make changes, push to your fork, then open a Pull Request from your fork back to the original ('upstream') repository.",
          hinglish:
            "Fork kisi aur ke repository ka tumhara apna personal copy hai GitHub pe, jisse tum bina original pe write access ke changes kar sakte ho. GitHub Issues bugs, feature requests, aur discussions track karte hain — har ek ko ek number, labels (bug, good-first-issue), aur comments milte hain. Typical open-source contribution flow: repo fork karo, APNI fork clone karo, ek branch banao, changes karo, apni fork mein push karo, phir apni fork se original ('upstream') repository mein Pull Request kholo.",
        },
        dailyLifeExample:
          'Fork karna ek popular recipe ki apni personal copy nikalna hai — usme apne hisaab se badlaav kar sakte ho bina original cookbook ko chhue. Agar tumhara version achha lage to original author ko bhej sakte ho (Pull Request) taaki wo apni cookbook mein add kar le.',
        codeExample:
          "# 1. Fork the repo on GitHub (click 'Fork' button) -> creates github.com/YOU/project\n\n# 2. Clone YOUR fork, not the original\ngit clone https://github.com/YOU/project.git\ncd project\n\n# 3. Add the original repo as 'upstream' to stay in sync\ngit remote add upstream https://github.com/original-owner/project.git\n\n# 4. Create a branch, make your fix\ngit checkout -b fix/typo-in-readme\n# ...edit files...\ngit commit -am \"Fix typo in README\"\n\n# 5. Push to YOUR fork\ngit push origin fix/typo-in-readme\n\n# 6. Open a Pull Request on GitHub: YOUR fork -> original repo",
        keyPoints: [
          "Fork = your own personal copy of someone else's repo on GitHub",
          "You clone YOUR fork, not the original, when you don't have write access",
          'GitHub Issues track bugs/features — look for "good first issue" labels as a beginner',
          'upstream is the conventional name for the original repo you forked from',
          'The PR goes FROM your fork TO the original project',
        ],
        quiz: [
          {
            question: "What is a 'fork' on GitHub?",
            options: ['A way to delete a repository', "Your own personal copy of someone else's repository", 'A type of branch', 'A merge conflict'],
            correctIndex: 1,
          },
          {
            question: 'As a beginner looking to contribute to open source, which GitHub Issue label should you look for?',
            options: ['wontfix', 'good-first-issue', 'duplicate', 'invalid'],
            correctIndex: 1,
          },
          {
            question: 'In the standard open-source contribution flow, which repo do you clone?',
            options: ['The original project directly', 'YOUR fork of the project', 'It does not matter', 'You never clone, only edit on GitHub.com'],
            correctIndex: 1,
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
          {
            question: 'Why is `git reset --hard` considered dangerous?',
            options: [
              'It is slower than other commands',
              'It permanently discards uncommitted changes and any commits after the reset point, with no built-in undo',
              'It only works on GitHub',
              'It automatically pushes to remote',
            ],
            correctIndex: 1,
          },
        ],
        interviewQuestions: [
          {
            question: 'What is the difference between git reset and git revert?',
            difficulty: 'medium',
            frequency: 'common',
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

  // ─── Git Internals & Core Concepts ──────────────────────────
  {
    question: 'What are the three areas in Git and how does a change move between them?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'The WORKING DIRECTORY holds your actual files. The STAGING AREA (index) holds the snapshot you are preparing to commit. The REPOSITORY holds committed history. `git add` moves changes from working directory to staging, `git commit` moves staging to repository, and `git checkout`/`git restore` moves content back the other way. The staging area is what lets you commit only PART of your changes, which is why you can split messy work into clean, focused commits.',
      hinglish:
        'WORKING DIRECTORY tumhari asli files rakhti hai. STAGING AREA (index) wo snapshot rakhta hai jo tum commit karne ki taiyari kar rahe ho. REPOSITORY committed history rakhta hai. `git add` changes ko working directory se staging mein le jaata hai, `git commit` staging se repository mein, aur `git checkout`/`git restore` content ko wapas doosri taraf. Staging area hi tumhe apne changes ka sirf ek HISSA commit karne deta hai, isiliye tum bikhre kaam ko clean, focused commits mein baant sakte ho.',
    },
  },
  {
    question: 'What is a commit, internally?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A commit is an immutable object containing a pointer to a TREE (the full snapshot of your project at that moment), pointers to one or more PARENT commits, the author and committer with timestamps, and the message. Its SHA-1 hash is computed from all of that, so changing anything — even a timestamp — produces a different hash and therefore a different commit. This is why rewriting history changes every descendant commit\'s hash, and why Git can detect corruption.',
      hinglish:
        'Ek commit ek immutable object hai jisme ek TREE ka pointer hai (us pal tumhare project ka poora snapshot), ek ya zyada PARENT commits ke pointers, timestamps ke saath author aur committer, aur message. Uska SHA-1 hash us sab se compute hota hai, isliye kuch bhi badalna — ek timestamp bhi — ek alag hash aur isliye ek alag commit banata hai. Isiliye history rewrite karna har descendant commit ka hash badalta hai, aur isiliye Git corruption detect kar sakta hai.',
    },
  },
  {
    question: 'What is a branch in Git, really?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A branch is simply a movable POINTER to a commit — a file containing 40 characters. That is why creating a branch is instant and costs almost nothing, unlike in older version control systems where it meant copying a directory tree. Committing moves the pointer forward; `HEAD` is a pointer to the branch you currently have checked out. Understanding this makes most confusing Git operations obvious: they are just moving pointers around a commit graph.',
      hinglish:
        'Ek branch bas ek commit ka ek movable POINTER hai — ek file jisme 40 characters hain. Isiliye ek branch banana instant hai aur almost kuch cost nahi karta, purane version control systems ke ulat jahan iska matlab ek directory tree copy karna tha. Commit karna pointer ko aage badhata hai; `HEAD` us branch ka pointer hai jo tumne abhi checkout ki hui hai. Ye samajhna zyadatar confusing Git operations ko obvious bana deta hai: wo bas ek commit graph ke around pointers hila rahe hain.',
    },
  },
  {
    question: 'What is the difference between merge and rebase?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'MERGE creates a new commit joining two histories, preserving exactly what happened including the branch structure. REBASE replays your commits on top of another branch, producing a linear history but creating NEW commits with different hashes. Merge is safe and honest; rebase is cleaner to read. The essential rule: never rebase commits that others have already pulled, because rewriting shared history forces everyone else into a painful recovery.',
      hinglish:
        'MERGE do histories ko jodta ek naya commit banata hai, bilkul wahi preserve karte hue jo hua including branch structure. REBASE tumhare commits ko ek doosri branch ke upar replay karta hai, ek linear history banate hue par alag hashes ke saath NAYE commits banate hue. Merge safe aur honest hai; rebase padhne mein cleaner hai. Zaroori rule: un commits ko kabhi rebase mat karo jo doosre pehle hi pull kar chuke hain, kyunki shared history rewrite karna baaki sabko ek dukhdayi recovery mein dhakel deta hai.',
    },
  },
  {
    question: 'What is a fast-forward merge?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'When the target branch has no commits of its own since you branched off, Git can simply MOVE its pointer forward to your commit — no merge commit is needed because there is nothing to reconcile. That is a fast-forward. Use `--no-ff` to force a merge commit anyway, which preserves the fact that a feature branch existed and makes it easy to revert the whole feature as one unit. Teams differ on which they prefer, and both are defensible.',
      hinglish:
        'Jab target branch pe tumhare branch karne ke baad se apna koi commit na ho, Git bas uska pointer tumhare commit tak AAGE badha sakta hai — koi merge commit nahi chahiye kyunki reconcile karne ko kuch hai hi nahi. Wahi fast-forward hai. Phir bhi ek merge commit force karne ke liye `--no-ff` use karo, jo ye baat preserve karta hai ki ek feature branch thi aur poore feature ko ek unit ki tarah revert karna easy banata hai. Teams ki pasand alag hoti hai, aur dono defensible hain.',
    },
  },
  {
    question: 'What is the difference between git reset --soft, --mixed, and --hard?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'All three move the branch pointer to the target commit; they differ in what they do to your files. `--soft` leaves changes STAGED, which is how you squash several commits into one. `--mixed` (the default) unstages them but keeps them in your working directory. `--hard` discards them entirely — this is the one that destroys work, and the only recovery is `git reflog`. Reason about it as "how far back do I want the changes to travel: staging, working directory, or gone".',
      hinglish:
        'Teeno branch pointer ko target commit pe le jaate hain; farak ye hai ki wo tumhari files ka kya karte hain. `--soft` changes ko STAGED chhod deta hai, jisse tum kai commits ko ek mein squash karte ho. `--mixed` (default) unhe unstage karta hai par tumhari working directory mein rakhta hai. `--hard` unhe poori tarah mita deta hai — yahi wo hai jo kaam barbaad karta hai, aur ek hi recovery hai `git reflog`. Ise aise socho: "main changes ko kitna peeche bhejna chahta hoon: staging, working directory, ya gayab".',
    },
  },
  {
    question: 'What is the difference between git reset and git revert?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'RESET rewrites history by moving the branch pointer backwards, so the commits effectively disappear — safe only on local, unpushed work. REVERT creates a NEW commit that undoes a previous one, leaving history intact. On any shared branch, revert is the correct tool: it is non-destructive, it works for everyone who already pulled, and the record shows both the mistake and the fix, which is usually what you want in a team.',
      hinglish:
        'RESET branch pointer ko peeche le jaakar history rewrite karta hai, isliye commits effectively gayab ho jaate hain — sirf local, unpushed kaam pe safe. REVERT ek NAYA commit banata hai jo ek pichhle ko undo karta hai, history bachate hue. Kisi bhi shared branch pe, revert sahi tool hai: ye non-destructive hai, ye un sabke liye kaam karta hai jo pehle hi pull kar chuke hain, aur record galti aur fix dono dikhata hai, jo ek team mein usually tum chahte ho.',
    },
  },
  {
    question: 'What is git reflog and when has it saved you?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'The reflog records every position `HEAD` has held locally — every checkout, commit, reset, rebase, and merge — even for commits no branch points to any more. That makes it the recovery tool for "I did a hard reset and lost my work" or "my rebase went wrong": find the previous hash in `git reflog` and `git reset --hard` back to it. It is local-only and expires after roughly 90 days by default, but within that window almost nothing is truly lost.',
      hinglish:
        'Reflog har us position ko record karta hai jo `HEAD` ne locally rakhi — har checkout, commit, reset, rebase, aur merge — un commits ke liye bhi jinpe ab koi branch point nahi karti. Isliye ye "maine ek hard reset kiya aur apna kaam kho diya" ya "mera rebase galat ho gaya" ka recovery tool hai: `git reflog` mein pichhla hash dhoondho aur `git reset --hard` se wapas jao. Ye sirf local hai aur default se lagbhag 90 din mein expire hota hai, par us window ke andar almost kuch bhi sach mein nahi khota.',
    },
  },
  {
    question: 'How do you resolve a merge conflict?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Git marks conflicting regions with `<<<<<<<`, `=======`, and `>>>>>>>`, showing your version and theirs. Open each file, decide what the code SHOULD be — often a combination rather than picking one side — remove the markers, then `git add` the file and continue the merge or rebase. The parts people skip and regret: actually running the tests afterwards, and reading both sides properly instead of blindly taking one. `git merge --abort` gets you back to safety at any point.',
      hinglish:
        'Git conflicting regions ko `<<<<<<<`, `=======`, aur `>>>>>>>` se mark karta hai, tumhara version aur unka dikhate hue. Har file kholo, decide karo ki code kya HONA chahiye — aksar ek side chunne ke bajaye ek combination — markers hatao, phir file `git add` karke merge ya rebase continue karo. Jo hisse log skip karke pachhtate hain: baad mein tests actually chalana, aur aankh band karke ek side lene ke bajaye dono sides theek se padhna. `git merge --abort` tumhe kisi bhi point pe wapas safety mein le aata hai.',
    },
  },
  {
    question: 'What is git stash and when do you use it?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'Stash saves your uncommitted changes onto a stack and cleans the working directory, so you can switch branches or pull without committing half-finished work. `git stash pop` reapplies and removes the entry; `apply` reapplies but keeps it. Points people miss: untracked files need `-u`, stashes are not pushed anywhere so they are lost if you lose the machine, and an unlabeled stash from three weeks ago is unidentifiable — use `git stash push -m "message"`.',
      hinglish:
        'Stash tumhare uncommitted changes ko ek stack pe save karke working directory saaf kar deta hai, taaki tum aadha-adhoora kaam commit kiye bina branches switch ya pull kar sako. `git stash pop` dobara apply karke entry hata deta hai; `apply` dobara apply karta hai par use rakhta hai. Jo points log chhod dete hain: untracked files ko `-u` chahiye, stashes kahin push nahi hote isliye machine khone pe wo gaye, aur teen hafte purana ek unlabeled stash pehchanne layak nahi hota — `git stash push -m "message"` use karo.',
    },
  },
  {
    question: 'What is git cherry-pick and when is it appropriate?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Cherry-pick applies a SPECIFIC commit from one branch onto another, creating a new commit with the same changes but a different hash. It is right for backporting a hotfix to a release branch, or rescuing one commit made on the wrong branch. It is wrong as a routine substitute for merging, because the same change then exists twice in history under different hashes, which causes confusing conflicts when the branches eventually merge.',
      hinglish:
        'Cherry-pick ek branch se ek KHAAS commit doosri pe apply karta hai, wahi changes par alag hash ke saath ek naya commit banate hue. Ye ek hotfix ko ek release branch pe backport karne, ya galat branch pe kiya ek commit bachane ke liye sahi hai. Ye merging ke ek routine substitute ke roop mein galat hai, kyunki phir wahi change history mein do baar alag hashes ke neeche exist karta hai, jo branches ke aakhir mein merge hone pe confusing conflicts banata hai.',
    },
  },
  {
    question: 'What is an interactive rebase and what can you do with it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        '`git rebase -i` opens an editor listing commits, letting you `reword` messages, `squash` or `fixup` commits together, `edit` a commit to change its content, `drop` one entirely, or reorder them. It is how you turn a messy sequence of "wip", "fix typo", "actually fix it" into a clean, reviewable history before opening a PR. Because it rewrites hashes, restrict it to commits you have not pushed, or to a branch only you are working on.',
      hinglish:
        '`git rebase -i` commits ki list wala ek editor kholta hai, tumhe messages `reword` karne, commits ko `squash` ya `fixup` karne, content badalne ke liye ek commit `edit` karne, ek ko poori tarah `drop` karne, ya unhe reorder karne deta hai. Isi se tum "wip", "fix typo", "actually fix it" ke ek bikhre sequence ko ek PR kholne se pehle ek clean, reviewable history mein badalte ho. Kyunki ye hashes rewrite karta hai, ise un commits tak seemit rakho jo tumne push nahi kiye, ya ek aisi branch tak jispe sirf tum kaam kar rahe ho.',
    },
  },
  {
    question: 'What does git rebase --onto do?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        '`git rebase --onto newBase oldBase branch` replays only the commits between `oldBase` and `branch` onto `newBase`. It is the tool for transplanting a branch that was accidentally created from the wrong parent, or for extracting a feature that was built on top of another unmerged feature. It is genuinely the hardest common Git command to reason about, and the reliable approach is to draw the commit graph and identify exactly which range you want to move.',
      hinglish:
        '`git rebase --onto newBase oldBase branch` sirf `oldBase` aur `branch` ke beech ke commits ko `newBase` pe replay karta hai. Ye us branch ko transplant karne ka tool hai jo galti se galat parent se bani, ya ek aise feature ko nikaalne ka jo ek doosre unmerged feature ke upar bana tha. Ye genuinely sabse mushkil common Git command hai samajhne mein, aur reliable approach commit graph banana aur theek se pehchanana hai ki tum kaunsi range hilana chahte ho.',
    },
  },
  {
    question: 'What is the difference between git fetch and git pull?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`fetch` downloads new commits from the remote and updates your remote-tracking branches, but does NOT touch your working branch — nothing in your files changes. `pull` is `fetch` followed immediately by `merge` (or `rebase` with `--rebase`). Fetching first is the safer habit: you can inspect what changed with `git log HEAD..origin/main` before deciding how to integrate it, rather than being dropped into a conflict unexpectedly.',
      hinglish:
        '`fetch` remote se naye commits download karke tumhari remote-tracking branches update karta hai, par tumhari working branch ko NAHI chhoota — tumhari files mein kuch nahi badalta. `pull` `fetch` hai jiske turant baad `merge` (ya `--rebase` ke saath `rebase`). Pehle fetch karna surakshit aadat hai: tum `git log HEAD..origin/main` se dekh sakte ho ki kya badla, phir decide karo ki kaise integrate karna hai, achanak ek conflict mein girne ke bajaye.',
    },
  },
  {
    question: 'What is a detached HEAD state?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Normally `HEAD` points to a branch, which points to a commit. When you check out a commit hash or tag directly, `HEAD` points straight at the commit with no branch attached — detached. You can look around and even commit, but those commits belong to no branch, so checking out anything else leaves them unreachable and eventually garbage collected. The fix if you did work there is `git switch -c new-branch` before leaving, or `git reflog` to recover afterwards.',
      hinglish:
        'Normally `HEAD` ek branch pe point karta hai, jo ek commit pe point karti hai. Jab tum ek commit hash ya tag seedha checkout karte ho, `HEAD` bina kisi branch ke seedha commit pe point karta hai — detached. Tum dekh sakte ho aur commit bhi kar sakte ho, par wo commits kisi branch ke nahi hain, isliye kuch aur checkout karna unhe unreachable chhod deta hai aur aakhir mein garbage collect ho jaate hain. Agar tumne wahan kaam kiya to fix hai nikalne se pehle `git switch -c new-branch`, ya baad mein recover karne ke liye `git reflog`.',
    },
  },
  {
    question: 'What is the difference between git switch, git restore, and git checkout?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`git checkout` historically did two unrelated jobs — switching branches and discarding file changes — which made it confusing and dangerous, since a typo could silently destroy work. Git 2.23 split it: `git switch` changes branches, and `git restore` restores file contents. The split matters because the intent is now explicit in the command name, and `restore` is clearly the destructive one. `checkout` still works for backward compatibility.',
      hinglish:
        '`git checkout` historically do alag kaam karta tha — branches switch karna aur file changes mitana — jisne ise confusing aur khatarnak banaya, kyunki ek typo chupke se kaam barbaad kar sakta tha. Git 2.23 ne ise baanta: `git switch` branches badalta hai, aur `git restore` file contents restore karta hai. Ye baant isliye matter karta hai kyunki intent ab command ke naam mein explicit hai, aur `restore` saaf taur pe destructive wala hai. `checkout` backward compatibility ke liye abhi bhi kaam karta hai.',
    },
  },
  {
    question: 'What is a .gitignore file and what if a file is already tracked?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        '`.gitignore` lists patterns Git should not track — `node_modules`, build output, `.env`, editor files. The catch that surprises everyone: gitignore only affects UNTRACKED files, so adding a pattern for something already committed does nothing. You must run `git rm --cached <file>` to stop tracking it. And if a secret was ever committed, removing it from the latest commit is not enough — it remains in history, so the key must be rotated.',
      hinglish:
        '`.gitignore` un patterns ki list hai jinhe Git track na kare — `node_modules`, build output, `.env`, editor files. Wo catch jo sabko chaunkata hai: gitignore sirf UNTRACKED files ko affect karta hai, isliye pehle se commit ki gayi kisi cheez ke liye ek pattern add karna kuch nahi karta. Use track karna band karne ke liye tumhe `git rm --cached <file>` chalana padega. Aur agar ek secret kabhi commit hua, use aakhri commit se hataana kaafi nahi — wo history mein rehta hai, isliye key rotate karni hi padegi.',
    },
  },
  {
    question: 'How do you remove a secret that was accidentally committed?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'First and most importantly, ROTATE the credential — assume it is compromised, because it may already be cloned, cached, or indexed. Then remove it from history with `git filter-repo` (or BFG); `filter-branch` is deprecated and slow. Force-push the rewritten history and have every collaborator re-clone, since rewriting shared history breaks their local copies. Then add it to `.gitignore` and ideally install a pre-commit secret scanner so it cannot recur.',
      hinglish:
        'Sabse pehle aur sabse zaroori, credential ROTATE karo — maan lo wo compromised hai, kyunki wo pehle hi clone, cache, ya index ho chuka ho sakta hai. Phir use `git filter-repo` (ya BFG) se history se hatao; `filter-branch` deprecated aur slow hai. Rewritten history force-push karo aur har collaborator se dobara clone karwao, kyunki shared history rewrite karna unki local copies todta hai. Phir use `.gitignore` mein add karo aur ideally ek pre-commit secret scanner lagao taaki ye dobara na ho.',
    },
  },
  {
    question: 'What is git bisect and how do you use it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Bisect finds the commit that introduced a bug using BINARY SEARCH over history. You mark a known-good commit and a known-bad one, and Git checks out the midpoint repeatedly, narrowing by half each time — a thousand commits takes about ten tests. If you have a script that exits non-zero on failure, `git bisect run ./test.sh` automates the whole thing. It turns "when did this break?" from an afternoon of guessing into a few minutes of mechanical work.',
      hinglish:
        'Bisect us commit ko dhoondhta hai jisne ek bug laaya, history pe BINARY SEARCH se. Tum ek known-good commit aur ek known-bad mark karte ho, aur Git baar-baar midpoint checkout karta hai, har baar aadha kam karte hue — ek hazaar commits mein lagbhag das tests. Agar tumhare paas ek aisa script hai jo failure pe non-zero exit kare, `git bisect run ./test.sh` poori cheez automate kar deta hai. Ye "ye kab toota?" ko ek dopahar ke andaaze se kuch minute ke mechanical kaam mein badal deta hai.',
    },
  },
  {
    question: 'What is the difference between a lightweight and an annotated tag?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A LIGHTWEIGHT tag is just a pointer to a commit, like a branch that does not move. An ANNOTATED tag (`git tag -a`) is a full object storing the tagger, date, a message, and optionally a GPG signature. Releases should always use annotated tags, because that metadata is what tells you who cut the release and when, and signing lets consumers verify authenticity. Also remember tags are not pushed by default — you need `git push --tags` or push the tag by name.',
      hinglish:
        'Ek LIGHTWEIGHT tag bas ek commit ka pointer hai, ek aisi branch ki tarah jo hilti nahi. Ek ANNOTATED tag (`git tag -a`) ek poora object hai jo tagger, date, ek message, aur optionally ek GPG signature store karta hai. Releases ko hamesha annotated tags use karne chahiye, kyunki wahi metadata batata hai ki release kisne kaata aur kab, aur signing consumers ko authenticity verify karne deta hai. Ye bhi yaad rakho ki tags default se push nahi hote — tumhe `git push --tags` chahiye ya tag ko naam se push karna hoga.',
    },
  },
  {
    question: 'What is a fork versus a clone?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A FORK is a server-side copy of a repository under your own account — a GitHub concept, not a Git one. A CLONE is a local copy on your machine, which Git itself provides. You fork when you lack write access to the original and want to contribute via pull requests; you clone whatever repository you intend to work in. The usual open-source flow is fork, clone your fork, add the original as an `upstream` remote to stay in sync, then open a PR.',
      hinglish:
        'Ek FORK ek repository ki server-side copy hai tumhare apne account ke neeche — ek GitHub concept, Git ka nahi. Ek CLONE tumhari machine pe ek local copy hai, jo Git khud deta hai. Tum tab fork karte ho jab tumhare paas original pe write access na ho aur tum pull requests se contribute karna chaho; tum us repository ko clone karte ho jisme kaam karna hai. Usual open-source flow hai fork karo, apna fork clone karo, sync mein rehne ke liye original ko ek `upstream` remote add karo, phir ek PR kholo.',
    },
  },
  {
    question: 'What makes a good commit message?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A short imperative subject line under about fifty characters — "Fix null check in auth middleware", not "fixed stuff" — then a blank line, then a body explaining WHY the change was made, since the diff already shows what. Reference the issue or ticket. The reason this matters is that six months later `git log` and `git blame` are the only record of intent, and "why" is exactly the thing nobody can reconstruct from the code alone.',
      hinglish:
        'Ek chhoti imperative subject line lagbhag pachaas characters ke andar — "Fix null check in auth middleware", "fixed stuff" nahi — phir ek blank line, phir ek body jo bataye ki change KYUN kiya, kyunki diff pehle hi dikhata hai ki kya. Issue ya ticket reference karo. Ye isliye matter karta hai kyunki chheh mahine baad `git log` aur `git blame` hi intent ka ekmatr record hain, aur "kyun" theek wahi cheez hai jise koi sirf code se dobara nahi bana sakta.',
    },
  },
  {
    question: 'What are conventional commits?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'A convention where the subject line starts with a type and optional scope: `feat(auth): add refresh tokens`, `fix:`, `docs:`, `refactor:`, `chore:`, and `feat!:` or a `BREAKING CHANGE` footer for breaking changes. The practical payoff is automation — tools can derive the semantic version bump and generate a changelog directly from history. Even without automation it makes `git log` scannable, since you can see at a glance what kind of change each commit was.',
      hinglish:
        'Ek convention jahan subject line ek type aur optional scope se shuru hoti hai: `feat(auth): add refresh tokens`, `fix:`, `docs:`, `refactor:`, `chore:`, aur breaking changes ke liye `feat!:` ya ek `BREAKING CHANGE` footer. Practical faayda automation hai — tools semantic version bump derive karke seedha history se ek changelog bana sakte hain. Automation ke bina bhi ye `git log` ko scannable banata hai, kyunki tum ek nazar mein dekh sakte ho ki har commit kis tarah ka change tha.',
    },
  },
  {
    question: 'What is the difference between squash merge, merge commit, and rebase merge on GitHub?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'SQUASH collapses the whole PR into one commit on main — the cleanest history and the easiest to revert, but individual commits and their messages are lost. MERGE COMMIT preserves every commit plus a merge commit, keeping full detail at the cost of a busier graph. REBASE replays each commit onto main linearly, keeping them separate without a merge commit but rewriting hashes. Most teams pick squash for feature branches because the PR, not the commit, is the meaningful unit of change.',
      hinglish:
        'SQUASH poore PR ko main pe ek commit mein samet deta hai — sabse clean history aur revert karne mein sabse easy, par individual commits aur unke messages kho jaate hain. MERGE COMMIT har commit plus ek merge commit rakhta hai, ek zyada bhare graph ke cost pe poora detail rakhte hue. REBASE har commit ko main pe linearly replay karta hai, unhe bina merge commit ke alag rakhte hue par hashes rewrite karte hue. Zyadatar teams feature branches ke liye squash chunti hain kyunki PR, commit nahi, change ki meaningful unit hai.',
    },
  },
  {
    question: 'What is git blame and how do you use it well?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`git blame` shows which commit and author last changed each LINE of a file, so you can find the reasoning behind a puzzling line. Used well it is an archaeology tool, not an accusation tool. The common frustration is that a formatting or rename commit hides the real author — use `-w` to ignore whitespace, `-C` to follow code moved between files, and `git log -S "text"` to find when a specific string entered or left the codebase.',
      hinglish:
        '`git blame` dikhata hai ki ek file ki har LINE ko aakhri baar kaunse commit aur author ne badla, taaki tum ek uljhane wali line ke peeche ki wajah dhoondh sako. Achhe se use karne pe ye ek archaeology tool hai, ek ilzaam lagane ka tool nahi. Common frustration ye hai ki ek formatting ya rename commit asli author chhupa deta hai — whitespace ignore karne ke liye `-w`, files ke beech hile code ko follow karne ke liye `-C`, aur ye dhoondhne ke liye ki ek khaas string kab codebase mein aayi ya gayi `git log -S "text"` use karo.',
    },
  },
  {
    question: 'What are Git hooks and what are they used for?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Hooks are scripts Git runs at points in its lifecycle: `pre-commit` for linting and formatting, `commit-msg` for enforcing a message convention, `pre-push` for running tests. They catch problems before they reach CI. Two practical notes: hooks live in `.git/hooks` and are NOT committed, so teams use Husky or lefthook to share them; and they must stay fast, because a slow pre-commit hook is a hook developers start bypassing with `--no-verify`.',
      hinglish:
        'Hooks wo scripts hain jo Git apni lifecycle ke points pe chalata hai: linting aur formatting ke liye `pre-commit`, ek message convention enforce karne ke liye `commit-msg`, tests chalane ke liye `pre-push`. Ye problems ko CI tak pahunchne se pehle pakadte hain. Do practical notes: hooks `.git/hooks` mein rehte hain aur commit NAHI hote, isliye teams unhe share karne ke liye Husky ya lefthook use karti hain; aur unhe fast rehna chahiye, kyunki ek slow pre-commit hook wo hook hai jise developers `--no-verify` se bypass karna shuru kar dete hain.',
    },
  },
  {
    question: 'What is a Git submodule and what are its problems?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'A submodule embeds another repository at a fixed COMMIT inside yours, keeping their histories separate. It genuinely works for vendoring a dependency you also develop. Its problems are well known: clones need `--recurse-submodules` or arrive empty, the pinned commit is easy to forget to update, branch switching does not update submodules automatically, and the whole workflow surprises people repeatedly. Package managers, monorepo tooling, or `git subtree` are usually better answers.',
      hinglish:
        'Ek submodule doosri repository ko tumhari ke andar ek fixed COMMIT pe embed karta hai, unki histories alag rakhte hue. Ye ek aisi dependency vendor karne ke liye genuinely kaam karta hai jise tum develop bhi karte ho. Iski problems mashhoor hain: clones ko `--recurse-submodules` chahiye warna khaali aate hain, pinned commit update karna bhool jaana easy hai, branch switching submodules ko automatically update nahi karti, aur poora workflow logon ko baar-baar chaunkata hai. Package managers, monorepo tooling, ya `git subtree` usually better jawab hain.',
    },
  },
  {
    question: 'What is git worktree?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        '`git worktree add` checks out an additional branch into a SEPARATE directory sharing the same repository and object store. That lets you have main and a feature branch open simultaneously without stashing, switching, or re-running a full install. It is ideal for reviewing a PR while your own work stays untouched, or running a long build on one branch while editing another. It is far lighter than a second clone since the object database is shared.',
      hinglish:
        '`git worktree add` ek additional branch ko ek ALAG directory mein checkout karta hai jo wahi repository aur object store share karti hai. Isse tum main aur ek feature branch ek saath khuli rakh sakte ho bina stash, switch, ya ek poora install dobara chalaye. Ye ek PR review karne ke liye ideal hai jabki tumhara apna kaam achhoota rehta hai, ya ek branch pe ek lamba build chalane ke liye jabki doosri edit kar rahe ho. Ye ek doosre clone se bahut halka hai kyunki object database shared hai.',
    },
  },
  {
    question: 'How do you undo the last commit?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'It depends on what you want. To fix the message or add a forgotten file, `git commit --amend`. To undo the commit but keep the changes staged, `git reset --soft HEAD~1`. To keep them only in the working directory, `git reset HEAD~1`. To discard them entirely, `git reset --hard HEAD~1`. And if the commit is already PUSHED to a shared branch, use `git revert HEAD` instead — all the others rewrite history and will break things for everyone else.',
      hinglish:
        'Ye is pe depend karta hai ki tum kya chahte ho. Message theek karne ya ek bhooli file add karne ke liye, `git commit --amend`. Commit undo karne par changes staged rakhne ke liye, `git reset --soft HEAD~1`. Unhe sirf working directory mein rakhne ke liye, `git reset HEAD~1`. Unhe poori tarah mitane ke liye, `git reset --hard HEAD~1`. Aur agar commit ek shared branch pe PUSH ho chuka hai, uske bajaye `git revert HEAD` use karo — baaki sab history rewrite karte hain aur baaki sabke liye cheezein todenge.',
    },
  },
  {
    question: 'What does git push --force-with-lease do and why is it safer?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'Plain `--force` overwrites the remote branch unconditionally, so if a teammate pushed while you were rebasing, their commits vanish. `--force-with-lease` first checks that the remote is still at the commit you last saw; if someone else pushed, it REFUSES. It gives you the history rewrite you want while protecting against silently destroying work you never knew existed. Make it your default — the plain `--force` habit is how teams lose commits.',
      hinglish:
        'Plain `--force` remote branch ko bina shart overwrite karta hai, isliye agar ek teammate ne tumhare rebase karte waqt push kiya, unke commits gayab ho jaate hain. `--force-with-lease` pehle check karta hai ki remote abhi bhi us commit pe hai jo tumne aakhri baar dekha tha; agar kisi aur ne push kiya, ye MANA kar deta hai. Ye tumhe wo history rewrite deta hai jo tum chahte ho jabki us kaam ko silently barbaad hone se bachata hai jiske baare mein tum jaante hi nahi the. Ise apna default banao — plain `--force` ki aadat se hi teams commits khoti hain.',
    },
  },
  {
    question: 'What is the difference between HEAD, HEAD~1, and HEAD^2?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        '`HEAD` is your current commit. `~` walks back through FIRST parents, so `HEAD~2` is two commits back along the main line. `^` selects among PARENTS of a merge commit: `HEAD^1` is the first parent (the branch you merged into) and `HEAD^2` is the second (the branch merged in). The distinction only matters at merge commits, which is exactly where people get confused — and it is why `git revert` of a merge needs `-m 1` to say which parent is "mainline".',
      hinglish:
        '`HEAD` tumhara current commit hai. `~` PEHLE parents se peeche chalta hai, isliye `HEAD~2` main line pe do commits peeche hai. `^` ek merge commit ke PARENTS mein se chunta hai: `HEAD^1` pehla parent hai (wo branch jisme tumne merge kiya) aur `HEAD^2` doosra (wo branch jo merge hui). Ye farak sirf merge commits pe matter karta hai, jahan theek log confuse hote hain — aur isiliye ek merge ke `git revert` ko `-m 1` chahiye ye batane ke liye ki kaunsa parent "mainline" hai.',
    },
  },
  {
    question: 'How do you revert a merge commit?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'You need `git revert -m 1 <merge-hash>`, because a merge has two parents and Git cannot guess which one represents "the mainline you want to keep". `-m 1` means the first parent. The subtle trap: reverting a merge tells Git those changes are unwanted, so simply merging the same branch again later brings in nothing. To re-land it you must revert the revert, or rebuild the branch — a genuine source of confusion in real teams.',
      hinglish:
        'Tumhe `git revert -m 1 <merge-hash>` chahiye, kyunki ek merge ke do parents hote hain aur Git andaaza nahi laga sakta ki kaunsa "wo mainline jo tum rakhna chahte ho" hai. `-m 1` matlab pehla parent. Sookshm jaal: ek merge revert karna Git ko batata hai ki wo changes anchahe hain, isliye baad mein wahi branch dobara merge karna kuch nahi laata. Use dobara land karne ke liye tumhe revert ko revert karna hoga, ya branch dobara banani hogi — real teams mein confusion ka ek genuine source.',
    },
  },
  {
    question: 'What is a pull request and what makes a good one?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'A PR proposes merging one branch into another and provides the place where review, CI, and discussion happen. A good one is SMALL — a few hundred lines rather than thousands, because review quality falls off a cliff beyond that. It has a description explaining what changed and why, links the issue, includes tests, and is self-reviewed first. Large PRs get rubber-stamped, which defeats the entire purpose of review.',
      hinglish:
        'Ek PR ek branch ko doosri mein merge karne ka prastaav deta hai aur wo jagah deta hai jahan review, CI, aur discussion hote hain. Ek achha PR CHHOTA hota hai — hazaaron ke bajaye kuch sau lines, kyunki uske aage review quality ek chattan se girti hai. Uska ek description hota hai jo bataye ki kya badla aur kyun, issue link karta hai, tests include karta hai, aur pehle khud review kiya hota hai. Bade PRs pe bas mohar lag jaati hai, jo review ka poora maksad hi khatam kar deta hai.',
    },
  },
  {
    question: 'What is a monorepo and how does Git handle it?',
    difficulty: 'hard',
    frequency: 'common',
    answer: {
      english:
        'A monorepo holds many projects in one repository, giving atomic cross-project changes, one place for shared code, and consistent tooling. Git handles it adequately but strains at scale: clones get large, and status and log slow down. Mitigations are `sparse-checkout` to fetch only the directories you need, shallow and partial clones, and build tools such as Nx, Turborepo, or Bazel that understand the dependency graph and only rebuild what actually changed.',
      hinglish:
        'Ek monorepo bahut projects ek repository mein rakhta hai, atomic cross-project changes, shared code ke liye ek jagah, aur consistent tooling deta hua. Git ise theek-thaak handle karta hai par scale pe zor padta hai: clones bade ho jaate hain, aur status aur log slow ho jaate hain. Mitigations hain sirf zaroori directories laane ke liye `sparse-checkout`, shallow aur partial clones, aur Nx, Turborepo, ya Bazel jaise build tools jo dependency graph samajhte hain aur sirf wahi rebuild karte hain jo actually badla.',
    },
  },
  {
    question: 'What is the difference between origin and upstream?',
    difficulty: 'easy',
    frequency: 'common',
    answer: {
      english:
        'They are just NAMES for remotes, not built-in concepts. By convention `origin` is the repository you cloned — usually your own fork — and `upstream` is the original project you forked from. The workflow is to `git fetch upstream` and rebase or merge `upstream/main` into your branch to stay current, then push to `origin` and open a PR against upstream. You can rename or add remotes freely; the convention exists purely for shared vocabulary.',
      hinglish:
        'Wo bas remotes ke NAAM hain, built-in concepts nahi. Convention se `origin` wo repository hai jo tumne clone ki — usually tumhara apna fork — aur `upstream` wo original project hai jisse tumne fork kiya. Workflow ye hai ki `git fetch upstream` karo aur current rehne ke liye `upstream/main` ko apni branch mein rebase ya merge karo, phir `origin` pe push karke upstream ke against ek PR kholo. Tum remotes ko azaadi se rename ya add kar sakte ho; convention sirf shared vocabulary ke liye hai.',
    },
  },
  {
    question: 'What is a shallow clone and when would you use one?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        '`git clone --depth 1` fetches only the most recent commit rather than the entire history, which is dramatically faster and smaller for a repository with years of commits. It is the standard choice in CI, where you only need the current code to build and test. The limits: you cannot run `git log` meaningfully, `git blame` is useless, and some operations refuse to work — though `git fetch --unshallow` can retrieve the rest if you need it later.',
      hinglish:
        '`git clone --depth 1` poori history ke bajaye sirf sabse recent commit laata hai, jo saalon ke commits wali ek repository ke liye dramatically faster aur chhota hai. Ye CI mein standard choice hai, jahan tumhe build aur test karne ke liye sirf current code chahiye. Limits: tum `git log` meaningfully nahi chala sakte, `git blame` bekaar hai, aur kuch operations kaam karne se mana kar dete hain — halaanki `git fetch --unshallow` baaki sab laa sakta hai agar baad mein chahiye.',
    },
  },
  {
    question: 'How does Git store files efficiently?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Git is CONTENT-ADDRESSED: every file is stored as a blob named by the SHA-1 of its contents, so two identical files anywhere in history are stored exactly once. Unchanged files across commits are not duplicated — the new tree simply points to the same blob. Periodically `git gc` compresses loose objects into packfiles using delta compression between similar objects. This is why a repository with years of history is often surprisingly small.',
      hinglish:
        'Git CONTENT-ADDRESSED hai: har file ek blob ke roop mein store hoti hai jiska naam uske contents ka SHA-1 hai, isliye history mein kahin bhi do ek jaisi files bilkul ek baar store hoti hain. Commits ke across unchanged files duplicate nahi hoti — naya tree bas usi blob pe point karta hai. Samay-samay pe `git gc` loose objects ko similar objects ke beech delta compression se packfiles mein compress karta hai. Isiliye saalon ki history wali ek repository aksar hairaan karne wali chhoti hoti hai.',
    },
  },
  {
    question: 'What is the difference between git diff, git diff --staged, and git diff HEAD?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        '`git diff` alone shows working directory versus STAGING — what you have changed but not yet added. `git diff --staged` (or `--cached`) shows staging versus the last commit — exactly what will go into your next commit. `git diff HEAD` shows working directory versus the last commit, that is everything uncommitted regardless of staging. Reviewing `--staged` right before committing is the habit that catches accidental debug statements and unrelated changes.',
      hinglish:
        'Akela `git diff` working directory versus STAGING dikhata hai — jo tumne badla par abhi add nahi kiya. `git diff --staged` (ya `--cached`) staging versus aakhri commit dikhata hai — theek wahi jo tumhare agle commit mein jaayega. `git diff HEAD` working directory versus aakhri commit dikhata hai, matlab staging chahe kuch bhi ho, sab uncommitted. Commit karne se theek pehle `--staged` review karna wo aadat hai jo galti se chhode debug statements aur unrelated changes pakadti hai.',
    },
  },
  {
    question: 'How do you split a large commit into smaller ones?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Use `git add -p` (patch mode), which walks you through each hunk asking whether to stage it, letting you split even within a single file using `s` to split a hunk or `e` to edit it. Stage one logical change, commit, then repeat. For a commit already made, `git rebase -i` and mark it `edit`, then `git reset HEAD~1` to unstage everything and rebuild it as several commits. This is how a day of tangled work becomes a reviewable series.',
      hinglish:
        '`git add -p` (patch mode) use karo, jo tumhe har hunk se guzaarta hai ye poochhte hue ki stage karna hai ya nahi, tumhe ek hi file ke andar bhi split karne deta hua — ek hunk todne ke liye `s` ya edit karne ke liye `e`. Ek logical change stage karo, commit karo, phir dohrao. Pehle se bane ek commit ke liye, `git rebase -i` karke use `edit` mark karo, phir sab unstage karne ke liye `git reset HEAD~1` aur use kai commits mein dobara banao. Isi se ek din ka uljha kaam ek reviewable series ban jaata hai.',
    },
  },
  {
    question: 'What is trunk-based development?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Everyone commits to one main branch, using very short-lived branches merged within a day or two. The point is that long-lived branches drift, so their merges become large and conflict-heavy — merging often keeps each integration small. Unfinished work ships behind FEATURE FLAGS rather than sitting on a branch. It requires strong automated testing and CI, because main must always be releasable, and it is the model behind most continuous-deployment teams.',
      hinglish:
        'Sab ek main branch pe commit karte hain, ek-do din mein merge hone wali bahut short-lived branches use karte hue. Baat ye hai ki lambi chalne wali branches bhatak jaati hain, isliye unke merges bade aur conflict-bhare ho jaate hain — aksar merge karna har integration ko chhota rakhta hai. Adhoora kaam ek branch pe baithne ke bajaye FEATURE FLAGS ke peeche ship hota hai. Ise strong automated testing aur CI chahiye, kyunki main hamesha releasable hona chahiye, aur yahi zyadatar continuous-deployment teams ka model hai.',
    },
  },
  {
    question: 'What is git rerere?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        '"Reuse recorded resolution" — when enabled, Git remembers how you resolved a particular conflict and applies the same resolution automatically the next time it sees it. It is genuinely useful during a long rebase where the same conflict recurs on commit after commit, or when repeatedly rebasing a long-lived branch. Enable it with `git config --global rerere.enabled true`. It is one of the least known Git features and one of the most appreciated once discovered.',
      hinglish:
        '"Reuse recorded resolution" — enable hone pe, Git yaad rakhta hai ki tumne ek khaas conflict kaise solve kiya aur agli baar wahi dekhne pe wahi resolution automatically apply karta hai. Ye ek lambe rebase ke dauraan genuinely useful hai jahan wahi conflict commit dar commit aata rahe, ya ek lambi chalne wali branch ko baar-baar rebase karte waqt. Ise `git config --global rerere.enabled true` se enable karo. Ye sabse kam jaane jaane wale Git features mein se ek hai aur pata chalne ke baad sabse zyada sarahe jaane wale mein se.',
    },
  },
  {
    question: 'How do you recover a deleted branch?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'Deleting a branch only removes the pointer — the commits still exist until garbage collection runs. Find the tip commit in `git reflog`, then `git checkout -b recovered <hash>`. If reflog does not have it, `git fsck --lost-found` lists dangling commits. Both are local-only, so if you deleted the branch on a machine you no longer have, the remaining hope is that someone else still has it or the remote hosting provider retains it.',
      hinglish:
        'Ek branch delete karna sirf pointer hataata hai — commits garbage collection chalne tak abhi bhi exist karte hain. `git reflog` mein tip commit dhoondho, phir `git checkout -b recovered <hash>`. Agar reflog mein na ho, `git fsck --lost-found` dangling commits list karta hai. Dono sirf local hain, isliye agar tumne branch aisi machine pe delete ki jo ab tumhare paas nahi, bachi hui ummeed ye hai ki kisi aur ke paas abhi bhi ho ya remote hosting provider ne rakha ho.',
    },
  },
  {
    question: 'What is git sparse-checkout?',
    difficulty: 'hard',
    frequency: 'rare',
    answer: {
      english:
        'Sparse-checkout populates only the DIRECTORIES you specify in your working tree, while the repository still holds the full history. It is the standard tool for working comfortably in a large monorepo: you check out just the two packages you care about instead of a hundred thousand files. Combined with a partial clone (`--filter=blob:none`), Git downloads only the blobs you actually need, making a very large repository practical on a normal machine.',
      hinglish:
        'Sparse-checkout tumhari working tree mein sirf wo DIRECTORIES bharta hai jo tum specify karte ho, jabki repository abhi bhi poori history rakhti hai. Ye ek bade monorepo mein aaraam se kaam karne ka standard tool hai: tum ek lakh files ke bajaye sirf wo do packages checkout karte ho jinki tumhe parwah hai. Ek partial clone (`--filter=blob:none`) ke saath, Git sirf wo blobs download karta hai jo tumhe actually chahiye, ek bahut badi repository ko ek normal machine pe practical banate hue.',
    },
  },
  {
    question: 'What is the difference between git merge --squash and a squash merge on GitHub?',
    difficulty: 'medium',
    frequency: 'rare',
    answer: {
      english:
        'They achieve the same result by different routes. `git merge --squash branch` applies all the branch\'s changes to your working directory and STAGES them without committing, so you write the commit message yourself and no merge relationship is recorded. GitHub\'s squash merge does the same server-side, generating a message from the PR title and body, and marks the PR merged. Either way, the branch is not recorded as merged in the graph, so `git branch --merged` will not list it.',
      hinglish:
        'Wo alag raaston se wahi nateeja paate hain. `git merge --squash branch` branch ke saare changes tumhari working directory pe apply karke unhe STAGE karta hai bina commit kiye, isliye commit message tum khud likhte ho aur koi merge relationship record nahi hoti. GitHub ka squash merge wahi server-side karta hai, PR title aur body se ek message banate hue, aur PR ko merged mark karta hai. Kisi bhi tarah, branch graph mein merged record nahi hoti, isliye `git branch --merged` use list nahi karega.',
    },
  },
  {
    question: 'What should you do when a rebase goes wrong halfway through?',
    difficulty: 'medium',
    frequency: 'common',
    answer: {
      english:
        'You have three exits. `git rebase --abort` returns everything to exactly how it was before you started — the safe default when confused. `git rebase --skip` drops the current commit and continues, useful when the change is already present upstream. `git rebase --continue` proceeds after you have staged your conflict resolution. And if you have already finished a rebase that went wrong, `git reflog` still holds the pre-rebase position, so nothing is actually lost.',
      hinglish:
        'Tumhare paas teen exits hain. `git rebase --abort` sab kuch bilkul waisa hi wapas kar deta hai jaisa shuru karne se pehle tha — confuse hone pe safe default. `git rebase --skip` current commit gira kar aage badhta hai, jo tab useful hai jab change upstream pe pehle se ho. `git rebase --continue` tumhare conflict resolution stage karne ke baad aage badhta hai. Aur agar tum ek galat rebase khatam bhi kar chuke ho, `git reflog` abhi bhi pre-rebase position rakhta hai, isliye actually kuch nahi khota.',
    },
  },
];
