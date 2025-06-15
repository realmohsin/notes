To check if git is installed, and its version
- git --version

To install git 
- sudo apt install git-all

First 3 settings to set after install
- git config --global user.name "John Doe"
- git config --global user.email johndoe@example.com
- git config --global core.editor "code --wait"

Where settings are coming from
- git config --list --show-origin

Getting help
- git <verb> -h

Initializing a git repository
- git init

Cloning a git repository hosted online (and implicitly adding the address as a remote server named origin):
- git clone <address> <directory-name>

To determine which files are in which state
- git status

To track files, to stage files, to mark merge-conflicted files as resolved: 
- git add <filename-or-directory>

To compare unstaged files against last commit + staged changes (untracked files do not show up)
- git diff
- git diff <filename>

To compare staged changes against last commit:
- git diff --staged

To compare file(s) in working directory (except untracked files) against what it looked like at certain commit -
- git diff <commit> 
- git diff <commit> <filename>

To compare files betwen two commits -
- git diff <earlier-commit> <later-commit>
- git diff <earlier-commit> <later-commit> <filename>

NOTE: The above nuances of git diff make it hard to use. 
PERSONAL STRATEGY - If you want to compare working directory changes to last commit, stage everything with `git add .` then use `git diff HEAD`. Use `git diff HEAD <filename>` for single file (after staging). If you want to compare last commit to previous commit use `git diff HEAD~1 HEAD <filename>`.  

To commit with editor opened for receiving commit message:
- git commit
To see the diff of your change in the editor:
- git commit -v 

To commit with commit message:
- git commit -m "commit-message"

To view commits made in repository in reverse chronological order: 
- git log
To view commits in a condensed format:
- git log --oneline
To exclude merge commits from log output:
- git log --no-merges 
To see the difference (the patch output) introduced in each commit:
- git log -p
To limit the output to a certain number of commits:
- git log -<number>
To filter log output by path (should be added at the end after all other options):
- git log -- <filename-or-directory>

To add changes to or modify the last commit without creating a new commit:
- git commit --amend 

To move a file from staged to unstaged:
- git restore --staged <filename>
To move all staged files to unstaged:
- git restore --staged .
To restore a file to what it looked like when you last committed (must be unstaged first):
- git restore <filename>
To restore all files to last commit (must be unstaged first)
- git restore .
To restore a file to what it looked like at a previous commit - 
- git restore -s <commit> <filename>
example - git restore -s HEAD~3 file1.txt

To see which remote servers you have configured:
- git remote
To see the URLs for each remote shortname:
- git remote -v

To add a remote server:
- git remote add <remote-name> <url>

To get data from your remote servers:
- git fetch <remote-name>

To fetch and then merge the tracked branch of your currently checked-out branch:
- git pull

To push any commits you've done back up to the server:
- git push <remote-name> <branch>

To see more information about a particular remote:
- git remote show <remote-name>

To change a remote's shortname (and consequently all the remote-tracking branch names):
- git remote rename <current-name> <new-name>

To remove a remote (and all remote-tracking branches and associated settings): 
- git remote remove <remote-name>

To list existing tags (in alphabetical order): 
- git tag

To create annotated tag: 
- git tag -a <tag-name> -m "annotation/message"
To create tag at previous commit:
- git tag -a <tag-name> -m "annotation/message" <commit-hash>
To create non-annotated tag:
- git tag <tag-name>

To show details of a blob, tree, tag or commit:
- git show <git-object-name>
To who file contents at certain commmit:
- git show <commit>:<filename> // git show HEAD~1:file1.txt

To push a tag to a remote: 
- git push <remote-name> <tag-name>
To push all tags to remote that are not already there:
- git push <remote-name> --tags

To delete a tag on your local repository:
- git tag -d <tag-name>

To delete a tag from a remote server:
- git push origin --delete <tag-name>

To view the versions of files a tag is pointing to:
- git checkout <tag-name>

To view all branches
- git branch
To view all branches merged into current checked-out branch
- git branch --merged
To view all branches not merged into current checked-out branch
- git branch --no-merged
To view remote-tracking branches
- git branch -r
To view all branches with the remote branches they're tracking
- git branch -vv

To create new branch on current checked-out commit
- git branch <branch-name>
To create branch based on another branch
- git branch <new-branch-name> <branch-to-be-based-on>
Can use to create local version of remote tracking branch and it will be a 'tracking branch'

To switch to an existing branch
- git checkout <branch-name>
To create and switch to a new branch in one command
- git checkout -b <branch-name> <optional-branch-to-be-based-on>
If <optional-branch-to-be-based-on> is not given, checked-out branch is used

To switch to an existing branch with newer command
- git switch <branch-name>
To create and switch to a new branch in one command
- git switch -c <branch-name> <optional-branch-to-be-based-on>
If <optional-branch-to-be-based-on> is not given, checked-out branch is used

To delete a branch
- git branch -d <branch-name>

To rename local branch
- git branch --move <old-branch-name> <new-branch-name>
To push a branch up to remote
- git push --set-upstream origin <new-branch-name>
To delete a branch in remote
- git push origin --delete <new-branch-name>


To merge a branch with new commits into checked-out older branch
- git merge <branch-with-new-commits>
To abort a merge during a merge conflict
- git merge --abort

To make and/or update a remote branch based on the checked-out local branch
- git push <remote> <branch-name-on-remote>
Add -u to remember association between local and remote, for subsequent 'git push' invocations. Sets up to track remote branch.

To manually set or change upstream branch
- git branch -u origin/<branch> 

To delete a remote branch on the server
- git push <remote> --delete <branch-name>

To show summary information about a remote
- git remote show <remote>


To replay commits from one branch onto another
- git rebase <branch-to-rebase-onto>

To show what a file looked like at a certain commit
- git show <commit>:<filename>




git stash, git stash apply, git stash pop, git stash list, git stash drop x, git stash clear (max's git & github course)

git reflog - has history of what head has done in the last 30 days, you can find commit from commit message and use the hash given to bring it back

if you use git push --force and change commits that your teammate has pulled down, then your teammate will not be allowed to pull normally the next time they try. They will have to fetch and then rebase (look into this)