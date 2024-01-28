Git is a Distributed Version Control System, where clients don't just check out the latest snapshot of files, but rather they fully mirror the repository, including its FULL history. Thus if any server dies, any of the client repositories can be copied back up to the server to restore it. Every clone is really a full backup of all the data.

- installing git
on linux, sudo apt install git-all
on windows, go to website, download installer, run installer

- git config variables
- /etc/gitconfig - file for values applied to every user on the system
- ~/.gitconfig - file for values applied to current user
- .git/config in directory where git is being used to create a repository - local values
Each level overrides values in the previous level.

After install, check config options, make sure your name, email and default editor is set.

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

A tree in objects/, representing a version of a directory, is file listing the real file names that constitute that directory and the corresponding hashes that represent those files in the objects/ directory. 

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

A branch in Git is simply a lightweight movable pointer to a commit.

HEAD is a pointer to a branch.


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