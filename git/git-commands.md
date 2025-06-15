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
we need some examples of how to recover from history being re-writte on the remote. 