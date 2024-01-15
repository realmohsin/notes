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

To compare unstaged files against staged files  (untracked files do not show up)
- git diff

To compare staged changes against last commit:
- git diff --cached 

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

To fetch and then merge a remote branch into your current branch:
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

