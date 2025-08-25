# Questions
- What is Git?
- Why is Git the most popular version control system?
- What are the main Git configuration options, how are they applied and how do you change them?
- What happens when you initialize git in a project with `git init`?
- What are some of the contents of the hidden .git/ folder?
- How are file versions stored in Git?
- What is a tree object in the context of Git?
- What is a commit object in Git?
- What is a ref?
- What is a branch?
- What is HEAD?
- What is a remote?
- What is the difference between an untracked file and an unstaged file?
- Define the following and describe how they relate to each other: local branch, remote branch, remote-tracking branch, and local-tracking branch.
- What does it mean to set the upstream of a local branch?
- What is merging?
- What are the two main types of merges?
- What is a merge conflict?
- What is rebasing?
- What are the dangers of rebasing? 
- What is squashing?
- What is cherry-picking?
  ...
- What is the index in Git?
- What does `git push` do and when does it fail?
- What does `git pull` do?
- What happens when using git pull and the remote branch has diverged? What is a configuration option for changing how this is handled?
- How can you compare files between commits?
- How can you change a file to look like it was at a previous commit?
- How can you unstage or untrack a file?
- How can you go back to a previous commit in history permanently?
- When going back to a previous commit in history, why are the commits that were moved past unreachable? 
- How might you be able to find unreachable commits to undo moving back in history?
- How can you squash the last few commits into one commit?
- How can you easily change just the last commit?
- What is a 'detached HEAD' state?
- How do you create a branch from a previous commit? 



# Daily Task
Create a git repository, set the user name to "Real Mohsin" globally, set the user email to "real@realmohsin.com" locally, show all config settings and what file they are set in, show just the user name and user email settings, make a commit on master, create a repository on GitHub, add remote repository, push master to remote repository without setting upstream of local master branch, create branches and commits to show a rebase, a squashed merge, and a cherry-pick, all with merge conflicts. output to stdout how a file looked like at a previous commit. Make a change to a file and show the diff of the change you made and what the file looked like at last commit. Show the diff of a file between latest commit and an older commit. restore the file to what it looked like at last commit. Then change the file to look like what it was at a previous older commit. commit the change.  Remove the last commit from history. Undo this and go back to deleted commit. Delete the commit again. make 3 commits. change history to squash these 3 commits into one commit with all their changes plus one additional change.


# Git Commands
## Configuration and Initialization
To check if git is installed, and its version
- git --version
To check config options
- git config --list
- git config --show-origin --list
Set these 3 git config options after installing on OS
- git config --global user.name "John Doe"
- git config --global user.email johndoe@example.com
- git config --global core.editor "code --wait"
To initialize a git repository
- git init
To create a local version of a git repository hosted online
- git clone <remote-address> <local-directory-name>
  Implicitly adds the remote address as a remote named 'origin'

## Making Commits
To check status of working directory
- git status
To track or stage a file (for all files use '.'):
- git add <filename-or-directory>
  Also used to mark merge-conflicted files as resolved and ready to be commited.
To untrack or unstage a file (for all files use '.'):
- git restore --staged <filename>
To commit with a commit message
- git commit -m "commit-message"
  To add (long) commit message using editor, use `git commit` without any arguments.
To view commits of current branch in reverse chronological order
- git log
  To view commits in a condensed format use --oneline option.

## Branches
To create a new branch on current checked-out commit
- git branch <branch-name>
To switch to an existing branch (to move HEAD)
- git checkout <branch-name>
To delete a branch
- git branch -d <branch-name>
To view local and local-tracking branches
- git branch
  Use --merged, --no-merged to view branches merged and not merged into current checked-out branch
  Use -r to view remote-tracking branches, use -a to view all branches, local, local-tracking and remote-tracking
  Use -vv to view branches with the remote branches they're tracking in square brackets
To track remote branch (to create local-tracking branch from local branch)
- git branch --set-upstream-to=<origin>/<branchname>
  Sets current checked-out branch to track the remote-tracking branch specified.

## Merging, Rebasing, Cherrypicking
To merge a branch with new commits into checked-out older branch
- git merge <branch-with-new-commits>
  The pointer of the branch you are checked-out on will move up
  Use --abort to stop merge process during a merge conflict
  Use --squash to squash commits into a one commit and apply on top of checked out branch
To replay commits from one branch onto another
- git rebase <branch-to-rebase-onto>
  The pointer of <branch-to-rebase-onto> will move up
To apply a commit on top of checked-out branch as a new commit:
- git cherry-pick <commit>

## Remote Repositories
Add remote repository
- git remote add origin <repository-address>
List remotes
- git remote
  Use -v to show address of remote
To fetch all commits, and pointers from remote
- git fetch
To fast-forward merge your checked-out  branch into remote branch or to create a new remote branch:
- git push <origin> <remote-branch>
  Use -u to turn checked-out local branch into a local-tracking branch of the remote branch
  If a fast-forward merge is not possible, git will tell you to 'git pull' and handle merging first.
To force a remote branch to have the same history as checked-out local branch:
- git push --force
To fetch all commits and pointers from remote, then merge remote-tracking branch into local-tracking branch:
- git pull
  Shortcut for `git fetch && git merge origin/<branch-name>`
  Use --rebase if you want to rebase instead of merge - `git fetch && git rebase origin/<branch-name>`

## Comparing and Undoing History
Show file content at a certain commit:
- git show <commit>:<filename>
To show diff of a file between commits:
- git diff <older-commit> <newer-commit> <filename>
To show diff between current changes and last commit, stage file then run:
- git diff HEAD~0 <filename>
To change a file to what it looked like at a certain commit, unstage then:
- git restore -s <commit> <filename>
To move HEAD to a commit (which will change history):
- git reset --hard <commit>
To move HEAD to a commit with the diff of moved-passed commits being outputed onto the index:
- git reset --soft <commit>
  Use this to go back in history and use the outputted diff to make a new commit - useful for redoing or squashing commits.
To see history of what HEAD has pointed to:
- git reflog
  You can use git reflog to find commits that are no longer reachable, for example to undo a git reset.
To change the last commit, stage changes, then
- git commit --amend -m "new commit message"
To view project at certain commit
- git checkout <commit>
  This puts you in a "detached HEAD" state. You can start a new branch from here.
  You can just change the commit message, by not staging any changes.
- interactive rebase ! TODO

## Miscellaneous
To put aside uncommitted changes
- git stash push -m "message"
  To list saved uncommited changes that were put aside
- git stash list
  To bring back uncommitted changes to the index and remove from stash:
- git stash pop




# Notes
Git is a Distributed Version Control System, where clients don't just check out the latest snapshot of files, but rather they fully mirror the repository, including its FULL history. Thus if any server dies, any of the client repositories can be copied back up to the server to restore it. Every clone is really a full backup of all the data.
- git config variables
- /etc/gitconfig - file for values applied to every user on the system
- ~/.gitconfig - file for values applied to current user
- .git/config in directory where git is being used to create a repository - local values
  Each level overrides values in the previous level.

## Git Push and Pull
You can only git push if your local-tracking branch can fast-forward merge into the remote branch. Otherwise you will have to git pull to handle merging before git pushing again.

When using `git pull` the default is the to `git fetch &&  git merge` but if you want to rebase instead of merge, you can use `git pull --rebase`. To make rebasing the default you can add the following git configuration:
```bash
git config --global pull.rebase true
```

You can also add it to the appropriate git config file.

Object Packages
object packages (*.pack) & index files(*.idx)
.git/objects/pack
git gc (Garbage Collection)

git objects are packed into package files to save space. Usually happens when garbage collection occurs. You can trigger garbage collection with `git gc`

## dangers of rebasing
- What does `git push --force` do and why is it discouraged?

in merge conflict when rebasing use git rebase --continue after fixing conflicts

.git/ directory contents
- HEAD - points to the branch you currently have checked out
- index - where Git stores your staging area information
- config file - contains project specific git configuration variables
- description - used by the GitWeb program
- info/ - keeps gloabl exclude file for ignored patterns you dont want to track in a .gitignore file
- hooks/ - contains client- or server-side hook scripts
- objects/ - stores all the content for your database
- refs/ - stores pointers into commit objects (in objects/) (to represent branches, tags, remotes and more)

Files are stored as blobs, and directories are stored as trees in the objects/ database folder. They are both stored and referenced by the hash of their contents. EACH version of a new file commited will generate a new saved file in the objects/ folder. If a file is changed and committed 10 times, there will be 10 files in objects/ folder, each representing a version of that same file. If a file is not changed when a commit happens, that file's saved file in objects/ remains the same and is still pointed to by the latest commit.

A tree in objects/, representing a version of a directory, is a file listing the real file names that constitute that directory and the corresponding hashes that represent those files in the objects/ directory.

Sample tree file:
100644 blob ca35a4cae90ebfce16d872449fc7998f080a4f11    hellogit.txt
100644 blob 3b18e512dba79e4c8300dd08aeb37f8e728b8dad    helloworld.txt
100644 blob 3b18e512dba79e4c8300dd08aeb37f8e728b8dad    nofile.txt

From the perspective of .git folder, a file or directory's real name is only known from the tree file where its referenced.

Example of commit file:
tree bcd72ed0fdb0adc541578741b5c9b240321da099
parent 068c4f5cdf5167c818fc069ead73b7c1c8f32ead
author Real Mohsin <real@realmohsin.com> 1705864327 -0500
committer Real Mohsin <real@realmohsin.com> 1705864327 -0500

Second commit

Commit's will always reference the top level nameless tree that represents the root working directory.

A git reference, or ref, is a file that contains the SHA-1 of a commit. The file's name can then be used as an easy to remember shortcut for that SHA-1 to reference in commands.

You can find these refs in .git/refs directory.

A branch in Git is simply a lightweight movable pointer to a commit. (Branches are refs, you can find them in .git/refs/heads). A branch is a simple pointer or reference to the head of a line of work.

HEAD is a pointer to a branch, Its a ref, but it points to another ref file. But sometimes it can contain a SHA-1 value itself, this happens when you checkout a tag, commit or remote branch which puts your repository in 'detached HEAD' state. 'Detached HEAD' state can then be defined as when the HEAD ref file directly contains a SHA-1 commit hash.

git cherry-pick, git rebase, git merge --squash all applies commits on top of a branch instead of linking them.

Starting Flow for Existing Repository
- git clone git@github.com:Mike88Kilic/RemoteRepo.git
- cd RemoteRepo/
- git pull + git push now available

Starting Flow for Local Repository
- mkdir <reponame>
- cd <reponame>
- git init
- git commit -a -m "Initial commit"
- git remote add origin git@github.com:<account>/<reponame>.git
- git push -u

Fast-forward merge
- when you try to merge one commit with a commit that can be reached by following the first commit's history
- branch pointer is moved forward to commit being merged in

ORT merge
- when the branch you are merging into has diverged
- 3 way merge between the heads of the branches and the common ancestor
- a 3 way merge can lead to merge conflicts
- a merge commit is created - a commit with two parents

The output of git log shows a linear list, but that is deceiving because the commits are not connected as a singly linked list but rather a graph. The linear list is just a sorting of commits in reverse chronological order.

rebase when you rebase - when you rebase, merge commits and commits that have the same 'patch-id' as a commit on rebase target don't get replayed. this means that if you're history accidentally has commits that were rebased, your rebase will not include duplicated commits.

git describe for tagging and naming releases
git archive for creating physical release

to create a tarball of project release
git archive master --prefix='project/' | gzip > `git describe master`.tar.gz

Object Packages
object packages (*.pack) & index files(*.idx)
.git/objects/pack
git gc (Garbage Collection)

git objects are packed into package files to save space. Usually happens when garbage collection occurs. You can trigger garbage collection with `git gc`

you have to specify remote if there are multiple when git pushing - git push gitlab

If there is a merge conflict with Binary files, you cannot settle issue in editor. To solve:
To use the version in current branch -
git checkout --ours -- image.png
git commit -a

To use version from incoming branch -
git checkout --theirs -- image.png
git commit -a

detached head is for inspeacting the commit in the working directory.  Its for seeing the project in your working directory at a certain commit. to see the state of the project at a certain commit in your working directory - to be able to work with the files as they were at a certain commit

detached head commits can be used to create a branch and merge it in from a convenient commit instead of just making changes on top of current HEAD. Its like going back in time to create branch at an older commit instead of creating the branch from current HEAD. You might want to do this because of convenience of starting from older commit - you expect merge conflict but you want to start working from a cleaner commit.

Github

3 types of github accounts -
personal user account
organizational account
enterprise account - central management of multiple github accounts

A repository owned by a user account has two permission levels: the repository owner and collaborators.

When creating an organization, your personal user account becomes its owner and theres a sort of organization account that gets created as well, which doesn't seem to do much since your personal user account is whats used to create and commit to repositories.

when inviting to organization you can invite as member or owner. owner will mean same permission as yourself.

organization members have base permissions which can be changed.
however, different organization members cannot be given different permissions based on repository. To achieve this you need to use teams.

You can create teams that belong to an organization. then you can assign repositories to teams and specify the permission level of the team members for that repository. Remember organization base permission takes precendence.

you can add outside collabarators to organizational repositories, but lets not worry too much about this until use case is needed then do your own research.

contribution vs collaboration

collaboration is through  added collaborator on personal user account repo, or outside collaborator on repos in organizations, or being organization member.

contribution is adding to project without being a collaborator.

# pull request

better name couldve been 'merge request' because that is what it literally is. It is a request to merge one branch into another.

Forking is a way to contribute to projects you are not a collaborator on.

Issues are like tickets, they are just a title and description. They can be labeled and associated with pull requests. Ways of organizing bug tickets etc.

Projects in Github allows organizing todo's and tickets. Issues + projects can act as a substitute for Jira. Issues can be added to projects and tracked as they progress from todo -> in progress --> done.

---

What is kanban?

Read
- https://nvie.com/posts/a-successful-git-branching-model/#feature-branches
- https://docs.github.com/en/get-started/using-github/github-flow


## Hooks
A hook is script that gets executed when a certain event occurs in Git. There are two categories of hooks - local and remote.

local
- pre-commit
- prepare-commit-msg
- commit-msg
- post-commit
- pre-push ?

remote ()
- pre-receive
- update
- post-receive

Remote hooks do not execute on the server. And GitHub uses webhooks which is a separate feature. How exactly does the server communicate back to local for the remote hooks to fire? Not used often, so lets not investigate.

Hooks will be saved in .git/ directory. That means you can't push hook scripts up to github.

Hooks are mainly used to enforce some sort of policy or formatting rules.

The script should be saved with a file name that maps to the hook event it will execute on. If script exits with 1 then it will stop the event from going through successfully.


## etckeeper
In linux systems, the /etc directory keeps config files for the system. It essentially stores the 'state' of the system. You can put this folder into version control with git using etckeeper.

You have to install etckeeper, if not already installed. Once installed, /etc will have a .git/ directory and you can use git as you normally would. One issue to look out for, as usual when dealing with Linux, would be permissions - make sure to change the permissions appropriately.

With etckeeper every day a commit will be made and you can set it up to push to GitHub automatically.

# Git Game
https://ohmygit.org/
