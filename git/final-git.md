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


# Daily Task

Create a git repository, set the user name to "Real Mohsin" globally, set the user email to "real@realmohsin.com" locally, show all config settings and what file they are set in, show just the user name and user email settings, make a commit on master, create a repository on GitHub, add remote repository, push master to remote repository without setting upstream of local master branch, create branches and commits to show a rebase, a squashed merge, and a cherry-pick, all with merge conflicts. output to stdout how a file looked like at a previous commit. Make a change to a file and show the diff of the change you made and what the file looked like at last commit. Show the diff of a file between latest commit and an older commit. restore the file to what it looked like at last commit. Then change the file to look like what it was at a previous older commit. commit the change.  Remove the last commit from history. Undo this and go back to deleted commit. Delete the commit again. make 3 commits. change history to squash these 3 commits into one commit with all their changes plus one additional change. 


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

To view local and local-tracking branches
- git branch
Use --merged, --no-merged to view branches merged and not merged into current checked-out branch
Use -r to view remote-tracking branches, use -a to view all branches, local, local-tracking and remote-tracking
Use -vv to view branches with the remote branches they're tracking in square brackets

To track remote branch
git branch --set-upstream-to=<origin>/<branchname>
Sets current checked-out branch to track the remote-tracking branch specified.


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

List remotes
- git remote
Use -v to show address of remote


git fetch

git push

git pull




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
To go back in history and use the outputted diff to make a new commit - used for redoing or squashing commits. 

- git reflog entry
Note: You can use git reset to go back in history permanently, if you make a mistake you can go forward again by finding the soon-to-be-deleted commits using git reflog. You can go back and forth this way, if you havn't made changes between resets. 
Note: You can use --soft option to undo history then pick changes from the diff to make a new commit with, essentially squashing commits with a few modifications.
Note: Don't do this with public commit history (?)

To change the last commit, stage changes, then
- git commit --amend -m "new commit message"
You can just change the commit message, by not staging any changes.

- interactive rebase


## Miscellaneous

- git stash 




# Notes

 