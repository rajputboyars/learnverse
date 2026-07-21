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
