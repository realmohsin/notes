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


# Daily Task




# Commands To Memorize

## Configuration and Initialization

To check if git is installed, and its version
- git --version

To check config options
- git config --list
- git config --show-origin 
--show-origin

Set these 3 git config options after installing on OS
- git config --global user.name "John Doe"
- git config --global user.email johndoe@example.com
- git config --global core.editor "code --wait"

To initialize a git repository
- git init

To create a local version of a git repository hosted online
git clone <remote-address> <local-directory-name>
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
To add (long) commit message using editor, use git commit without any arguments.

To view commits of current branch in reverse chronological order
- git log
To view commits in a condensed format use --oneline option.


## Branches

To create new branch on current checked-out commit
- git branch <branch-name>

To switch to an existing branch
- git checkout <branch-name>

To delete a branch
- git branch -d <branch-name>

To view branches
- git branch
Use --merged, --no-merged to view branches merged and not merged into current checked-out branch
Use -r to view remote-tracking branches
Use -vv to view branches with the remote branches they're tracking


## Merging, Rebasing, Cherrypicking

To merge a branch with new commits into checked-out older branch
- git merge <branch-with-new-commits>
The pointer of the branch you are checked-out on will move up
Use --abort to stop merge process during a merge conflict
Use --squash to squash commits into a one commit and apply on top of checked out branch (like cherry-pick ?)

To replay commits from one branch onto another 
- git rebase <branch-to-rebase-onto>
The pointer of <branch-to-rebase-onto> will move up

To apply a commit on top of checked-out branch as a new commit:
git cherry-pick <commit>
?? add notes after trying


## Remote Repositories

Add remote repository
- git remote add origin <repository-address>




# Notes