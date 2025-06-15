To exit from the shell
- exit

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

To see list of previously used commands
- history

To print working directory
- pwd

To print date
- date

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
used for receiving data as standard output by other commands

To find a file given a substring
- locate <substring>
have to install plocate with sudo
uses pre-generated database file instead of searching the entire machine (not live)

To list every file and nested file in current directory
- find
To list every file and nested file in given directory
- find <directory>
To list a certain type of file use -type f (file), -type d (directory), -type l (symlink), etc

To list every file and nested file that matches a name (or pattern)
- find <directory> -name "*.txt"
Use -iname for case insensitive check

To list every file and nested file based on size
- find <directory> -size <size-notation>

To list every file and nested file based on owner
- find -user <username>

To list every file and nested file based on mtime
- find -mtime -5

To delete every file that contains 'phrase' in its file name
- find -name "*phrase*" -exec rm '{}' ';'
We had to wrap the {} and ; in quotes because those characters have special meanings otherwise

To create copy of every html file and nested html file:
- find -type f -name "*.html" -exec cp '{}' '{}_COPY' ';'
Creates copies with _COPY at end of file name 

To list detailed info about every file and nested file that matches a pattern
- find -name "*.txt" | xargs ls -l

To create concatenated file from multiple specific files that match a pattern
- find -name "chapter[1-4].txt" | xargs cat > fullbook.txt

To list all lines of a file that contain the given word
- grep "cat" gatsby.txt
use -w to search for exact word and not match fragments of other words
use -i for case insensitive search

To list all lines from all files and nested files in a directory that contain the given word
- grep -r "parm[ae]san"
can use regex in grep to specify pattern

To list all current processes
- ps

To add write permissions to a file's group
- chmod g+w <filename>

To remove write permissions from all
- chmod a-w <filename>

To add executable permissions for owner
- chmod u+x <filename>

To set permissions to read-only for all
- chmod a=r <filename>

To start a new login shell as another user from within current user's shell session
- su - <username>
To start a non-login shell as another user, using current user environment settings
- su <username>
To switch into root user, using non-login shell
- su root

To print current user 
- whoami

To see commands that can be run with sudo as current user
- sudo -l

To check for updates available
- sudo apt update
To list upgradable packages (usually used after `sudo apt update`)
- apt list --upgradable
To download and install upgradable pacakges
- sudo apt upgrade

To change owner of a file/directory
- sudo chown <user> <file>
To change group of a file/directory
- chown :<group> <file>
To change owner and group of a file/directory
- sudo chown <user>:<group> <file>

To view groups of current user
- groups
To create new group
- sudo addgroup <group>
To add user to group
- sudo adduser <user> <group>

To create brand new user
- adduser <username>
Begins process to setup new user

To remove a user
- sudo userdel <user>

To change password of user
- passwd <user>

To print the environment (variables) for a shell session
- printenv

To print the HOME environment variable
- echo $HOME

To spawn child shell session
- bash

To add shell variable
- <key>=<value>

To add environment variable
- export <key>=<value>

To apply changes of configuration file to current bash session
- source <config-file>

To create our own command based on existing commands
- alias ll='ls -alF'

To run a raw bash script
- bash <bash-script>
- ./<bash-script>
Scripts that are used a lot should be added to PATH to become commands, and not executed this way

To open crontaq file for current user
- crontab -e

To see list of all running processes
- ps aux
a for processes started by other users, u for more details, x for processes without controlling terminal

To see running processes in real time
- top

To send a SIGSTOP signal to a foregrounded process
- CTRL+Z
To send a SIGINT signal to a foregrounded process
- CTRL+C

To send a SIGTERM signal to a process or job
- kill <PID-or-job-id>
To send a SIGKILL signal to a process or job
- kill -9 <PID-or-job-id>

To run a command with different niceness level
- nice -n 5 apt upgrade
To set niceness level of existing process
- renice 10 -p <PID>

To run a job in the background
- <command> <command-arguments> &
To list all jobs
- jobs
To send a job to the background (usually after suspending with SIGSTOP)
- bg <job-id>
To bring a job to the foreground
- fg <job-id>

To compress a file using gzip
- gzip <file>
To uncompress a gzipped file
- gunzip <file.gz>

To turn a directory of files into a single file
- tar -cvf <tar-file-name> <directory-or-files>
To unpack archive
- tar -xvf <tar-file-name>

To install a .deb package (without installing its dependencies)
- dpkg -i <deb-package.deb>
To install a .deb package and its dependencies
- sudo apt install <deb-package.deb>
To remove a .deb package
- dpkg -r <deb-package.deb>
To list all installed packages
- dpkg -l

To install a package from a repository
- apt install <package-name>
To remove a package installed from repository
- apt remove <package-name>
To remove a package and delete associated system-wide config files
- apt purge <package-name>
To remove orphaned dependencies
- apt autoremove
To update package repositories
- apt update
To get more information about an installed package
- apt show <package-name>


To send a GET request from shell and receive body of response as stdout
- curl <url>
To show full response (include headers) in cURL output
- curl -i <url>
To show only the headers with cURL
- curl -I <url>
To write cURL's output to a file
- curl -o <filename> <url>
To make a POST request with cURL
- curl -X "POST" -d <data> <url>

To print ip address
- ifconfig -a
To get ip as received from another location
- curl -4 icanhazip.com

To create symbolic link
- ln -s <file> <destination-directory>