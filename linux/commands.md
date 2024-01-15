To bring up documentation for a command
- man <command>

To know type of command
- type <command>

To know location of executable
- which <command>

To bring up documentation for commands that don't have man page (like most shell built-in's)
- help <command>

To clear the terminal screen
- clear

To print working directory
- pwd

To list contents of a directory
- ls
To list contents of a directory, including hidden files and folders
- ls -a 
To list contents of a directory with details about each file and folder
- ls -l

To change the current working directory
- cd
can use relative or absolute paths, or / and ~

To create new files
- touch <filename>
To update the access and modification times of a file
- touch <filename>

To determine file type
- file <filename>

To create new directories
- mkdir <directory-name>

To open file in Nano editor (creates file if it doesn't exist)
- nano <filename>

To delete a file
- rm <filename>

To delete a directory and all its contents
- rm -r <directory-name>
To delete a directory and all its contents without being prompted if you're sure for each subdirectory
- rm -rf <directory-name>

To move files and directories from one location to another
- mv <file-or-directory-name> <destination-directory>
To rename a file
- mv <file-name> <new-file-name>
To rename a directory
- mv <directory-name> <new-directory-name>
new directory name must not be an existing directory otherwise directory will be moved instead of renamed

To copy a file
- cp <file-name> <file-name-for-copy>
To copy file(s) into another directory, preserving name
- cp <file-name> <file-name> <destination-directory>
To copy directory
- cp -r <directory> <directory-name-for-copy>
To copy directories into another directory, preserving name
- cp -r <directory> <directory> <destination-directory>

To print files
- cat <filename>
concatenates file contents before printing when given multiple files
To print standard input
- cat

To open file in less
- less <filename>

To print line count, word count and size (# of bytes) for a file
- wc <filename>

To print (or echo) given text
- echo <text>
used for receiving data as standard output