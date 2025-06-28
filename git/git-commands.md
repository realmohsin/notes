# Comparing file to its history

Show file content at a certain commit:
- git show <commit>:<filename>
Example: git show HEAD~1:file1.txt
Show current file content: cat file1.txt
Show file content at last commit: git show HEAD~0:file1.txt

To show diff of a file between commits:
- git diff <older-commit> <newer-commit> <filename>
Example: git diff HEAD~1 HEAD~0 file1.txt
To show diff between current changes and last commit, stage file then run:
- git diff HEAD~0 <filename>
Note: You can imagine the above as satisfying `git diff <older-commit> <newer-commit> <filename>` with <newer-commit> being replaced with staged changes (next-commit) but being ommited because it has no name yet (just a a way to make it easier to memorize) 
Note: For all files, you can replace <filename> with '.'



# Changing file to its history

To unstage a file (for all files use '.'):
- git restore --staged <filename>
To change a file to what it looked like at a certain commit, unstage then:
- git restore -s <commit> <filename>
Example: git restore -s HEAD~2 file1.txt
Example (restore to last commit): git restore -s HEAD~0 file1.txt 
Note: After restoring, you can then make a commit to permanently go back to old state of a file.  
Note: For all files, you can replace <filename> with '.'



# Undoing History

To move HEAD (branch pointer) to a commit (which will change history):
- git reset --hard <commit>
To move HEAD (branch pointer) to a commit with the diff being outputed onto the index:
- git reset --soft <commit>
Note: You can use git reset to go back in history permanently, if you make a mistake you can go forward again by finding the soon-to-be-deleted commits using git reflog. You can go back and forth this way, if you havn't made changes between resets. 
Note: You can use --soft option to undo history then pick changes from the diff to make a new commit with, essentially squashing commits with a few modifications.
Note: Don't do this with public commit history (?)




# Detached HEAD
- move to a commit without moving HEAD

# Stashing current changes
...


- if you have to git push --force, then others will have to git fetch and git rebase to get their history to match. When the time comes, look into this in depth.

- git commit --amend => for changing last commit message. Find out how to change any previous commit message. then decide whether this is a command we need to remember.

- git branch --merged - shows branches whose latest commit has been merged
- git branch --no-merged - shows branches whose latest commit has not been merged

- git cherry-pick takes a commit and applies it's changes as a new commit on top of current branch (?). Can result in merge conflicts. How is common ancestor chosen? Probably easy. 

- remote repository - git clone <repo> - git pull, git push

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

git push is only allowed to create a fast-forward merge in the remote repository. 

git pull pulls all new commits but only merges the active branch, so if you've done work on other branches, those don't get merged with new work on their remote tracking branches.

git push only pushes the commits from the active branch

git status only uses information of remote-tracking branches based on last git pull / fetch. 

you have to specify remote if there are multiple when git pushing - git push gitlab

If there is a merge conflict with Binary files, you cannot settle issue in editor. To solve:
To use the version in current branch - 
git checkout --ours -- image.png
git commit -a

To use version from incoming branch -
git checkout --theirs -- image.png
git commit -a

To abort a merge
git merge --abort

git pull is two commands - git fetch and git merge ?

git rebase & git pull --rebase
Do not use git rebase to change the history of commits on a public branch.

--------

- What does `git push --force` do and why is it discouraged?



--------
we need some examples of how to recover from history being re-written on the remote. 


one use case of rebase is in the way git pull can work, git pull --rebase

in merge conflict when rebasing use git rebase --continue after fixing conflicts

To squash commits into one commit and apply on top target branch (similar to git rebase), you can use git merge --squash <branch> 

git cherry-pick, git rebase, git merge --squash all applies commits on top of a branch instead of linking them.

when using syntax HEAD@{4} it refers to git objects being pointed to by HEAD in the reflog history.

@ is shorthand syntax or HEAD

git show refs/heads/feature1
git show refs/remotes/origin/feature2

difference between ~ and ^

the ^ is used to show second parent commit (from merges)

git log --stat for seeing files changed and number of lines changed

git log --oneline --stat --follow -- <path> for searching commits that modify certain files'

git grep 'text' v15.0.0 can be used to search for text in a file at a point in history

git blame <file> used to show all changes to a file and who made them

git bisect can be used hone in on what commit caused an issue by using interactive binary search

git shortlog --summary --numbered --email --no-merges to show list of contributors and their number of commits


detached head is for inspeacting the commit in the working directory.  Its for seeing the project in your working directory at a certain commit. to see the state of the project at a certain commit in your working directory - to be able to work with the files as they were at a certain commit

detached head commits can be used to create a branch and merge it in from a convenient commit instead of just making changes on top of current HEAD. Its like going back in time to create branch at an older commit instead of creating the branch from current HEAD. You might want to do this because of convenience of starting from older commit - you expect merge conflict but you want to start working from a cleaner commit. 

How to undo undoing history, how to get back to newer commit after 'deleting it'. use reflog to find the commit you 'deleted' using git reset --hard. then checkout that lost commit and run git reset --hard again. To get back deleted branch, reflog and check out the commit of the deleted branches head, then create a new branch there. 

rebasing is changing a single commit's parent. 

When to use rebase (suggested by one course, loook into this) - when there are new commits on master while you're working on feature branch. you rebase master into feature (?) then fast forward merge feature into master ? 

git cherry-pick - move a copy of a commit on top of a branch


A local tracking branch is a branch in your local repo that is configured to track a branch on a remote repo. 
A remote tracking branch is a read-only copy of a branch from a remote repository, maintained by Git to keep track of the state of the remote branch.
You can create a local tracking branch from a remote tracking branch using 
- git branch --track <branchname> <remote>/<remotebranchname> 
It's recommented to have branchname be the same as it is in remote
(if you just create a branch from remote tracking branch isn't the resulting local branch automatically tracked to the remote tracking branch? I think so, but this is jsut more explicit)

use git branch -vv to see local tracking branches and what remote tracking branches they track.

to push a new branch that is not tracking a remote branch, use git push origin <branchname>.
using -u when pushing a new branch will automatically set up the branch to track the remote branch you're creating. Otherwise you would have to manually track the remote by recreating the local branch with --track or find a git command that sets upstream or tracks.

To delete remote tracking branch:

To delete remote branch:

To delete commits that are public (be careful, no way to recover)
git push --force


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