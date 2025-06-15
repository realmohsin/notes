# Git Installation on Ubuntu 22.04.4

1. Check if Git is installed or not using `git --version`.
2. Install Git using `sudo apt install git-all`. 
3. Set name using `git config --global user.name "Real Mohsin"`
4. Set email using `git config --global user.email "real@realmohsin.com"`
5. Install Visual Studio Code, then set editor using `git config --global core.editor "code --wait"`
6. Verify settings are set and check where they are coming from using `git config --list --show-origin`.


# old notes
Git is a Distributed Version Control System, where clients don't just check out the latest snapshot of files, but rather they fully mirror the repository, including its FULL history. Thus if any server dies, any of the client repositories can be copied back up to the server to restore it. Every clone is really a full backup of all the data.


- git config variables
- /etc/gitconfig - file for values applied to every user on the system
- ~/.gitconfig - file for values applied to current user
- .git/config in directory where git is being used to create a repository - local values
Each level overrides values in the previous level.

You can get more info for a git command with git help <verb>, git <verb> --help, or man git-<verb>

To start controlling a project directory with git, use git init to create a subdirectory .git/ that will contain all the necessary repository files. 

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

<left off at tag section of Git Internals>


Git fetch fetches all new commits and the pointers to them from remote. Git fetch only downloads the data, does not automatically merge it with any of your work. You have ot merge it manually.

If your current branch is set up to track a remote branch, you can use the git pull command to automatically fetch and then merge that remote branch into your current branch. 

The git clone command automatically sets up your local master branch to track the remote master branch on the server you cloned from.

The git push command only works if nobody has pushed to that branch since you pulled. Your push will be rejected and you'll have to fetch and incorporate the new commits first.


- renaming a branch essentially means - renaming the local branch, pushing the renamed branch to remote (from remote's perspective its a new branch), the old named branch will exist in remote, so delete it


Fast-forward merge
- when you try to merge one commit with a commit that can be reached by following the first commit's history
- branch pointer is moved forward to commit being merged in 

ORT merge
- when the branch you are merging into has diverged
- 3 way merge between the heads of the branches and the common ancestor
- a 3 way merge can lead to merge conflicts
- a merge commit is created - a commit with two parents

The output of git log shows a linear list, but that is deceiving because the commits are not connected as a singly linked list but rather a graph. The linear list is just a sorting of commits in reverse chronological order. 

During a merge conflict, in vscode's ui, 'current change' will refer to diverged commit, while 'incoming change' will refer to commit you are trying to merge in now.

Remote branches
- Remote-tracking branches are references to the state of remote branches. They're local references that you can't move, Git moves them for you whenever you do any network communication, to make sure they accurately represent the state of the remote repository. Think of them as bookmarks, to remind you where the branches in your remote repositories were the last time you connected to them. Remote-tracking branches take the form <remote>/<branch>.

Use git push to update remote refs using local refs, while sending objects necessary to complete the given refs. 

When using git fetch <remote> to bring down all new refs and remote-tracking branches, you don't automatically get local, editable copies of the remote-tracking branches. Remote-tracking branches are uneditable pointers, that you can create your own local branch off of. 

When you create a local branch based on a remote-tracking branch (for master, when you first clone down the repo), that local branch 'tracks' the associated remote, and so git pull/push will know which remote branch to target without you having to specify. To change or set this manually, use git branch -u origin/branch-name.


to do - think about merge conflicts when git pulling
to do - think about merge conflicts when rebasing
to do - read git rebase --help page

With rebase, you take all the changes that were committed on one branch and replay them on the a different branch. 

Do not rebase commits that exist outside your repository and that people may have based work on.


(TO DO: set up credential cache so you don't have to type in password everytime you push to a team repository.)

(TO DO: merge conflict when pulling? or when merging corresponding remote-tracking branch)
(TO DO: merge conflict when pushing?)



Only amend commits that are still local and have not been pushed somewhere. Amending previously pushed commits and force pushing the branch will cause problems for your collaborators. For more on what happens when you do this and how to recover if you're on the receiving end read The Perils of Rebasing.

test time of commit on order after fast forward merge (answer should be obvious, but lets settle)


Git uses the git reflog command to record changes made to the tips of branches. 

if using git pull --rebase, or setting it with `git config --global pull.rebase true`, what gets rebased onto what? 
Answer: You're replaying your local commits onto the remote tracking branch

rebase when you rebase - when you rebase, merge commits and commits that have the same 'patch-id' as a commit on rebase target don't get replayed. this means that if you're history accidentally has commits that were rebased, your rebase will not include duplicated commits. 


git describe for tagging and naming releases
git archive for creating physical release 

to create a tarball of project release
git archive master --prefix='project/' | gzip > `git describe master`.tar.gz

In certain git commands, commits can be refered to relative to the HEAD. For example, the last commit is HEAD, the commit before it is HEAD~1, and the commit before that one is HEAD~2, and so on.  