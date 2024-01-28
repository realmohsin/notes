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

To compare unstaged files against last commit (untracked files do not show up)
- git diff

To compare staged changes against last commit:
- git diff --staged

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
To restore a file to what it looked like when you last committed:
- git restore <filename>

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

To show tag data:
- git show <tag-name>

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
Can use to create local version of remote tracking branch

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
Add -u to remember association between local and remote, for subsequent 'git push' invocations

To manually set or change upstream branch
- git branch -u origin/<branch> 

To delete a remote branch on the server
- git push <remote> --delete <branch-name>

To
