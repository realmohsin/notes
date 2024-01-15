os
- two families - microsoft nt descendants like windows and everything else Unix descendants like mac os, linux and android
- original unix desing choices live on like multi-user os and hierarchical file systems.
- unix philosophy - modular software design, write programs that do one thing well, combine programs, write programs to handle text streams, because that is a universal interface
- linux created from linux kernel and GNU project software with goal to make unix-like os that is open source
- kernel is core of operating system that facilitates interactions between hardware and software, and manages critical tasks like memory management and task scheduling and allocation of resources. 
- many different linux distributions like fedora, ubuntu, debian. etc
- shell is an interface to an operating system. shells expose an OS's services to users or other programs. terminal is a program that runs a shell. there are many shells, such as bash, zsh, powershell etc, 
- bash is teh most common shell and is the default on linux. (git-bash is a good emulation on windows computers to be able to use unix-like commands)

- man pages are built-in documentation for linux

- 4 types of commands (use type command to tell us the type of another command)
  - executable program - usually stored in /bin, /usr/bin, or /usr/local/bin. there are compiled binary files
  - built-in shell command - these commands are part of the shell (bash in our case)
  - shell function
  - alias
- some commands do not have a man page entry, like many shell built-ins. use help command for those commands

- The starting point for the file system is the root folder /. (Confusingly there is a sub-directory named root, which is not the same as /.)
- /home contains a home folder (~) for each user on the system
- hidden files and folders usually begin with .
- relative paths specify a directory/file relative to the current directory, and absolute paths start from the root directory (start with a /)
- to provide relative paths in commands, a single dot (.) is used to represent the current directory and two dots (..) represents the parent directory.
- folders in the root directory 
  - bin - short of binary - lots of executable programs
  - etc - contains configuration files and initialization scripts
  - media - to access content on removable media like usb drives, sd cards, dvds, cd roms. 
  - var - short for variable - contains files related to logging - log files, files that are outputs of other programs, caches
  - root - is the home folder for the root user. 
  - home - folder that contains home folder for each user on the os
  - usr - lots of executable files, libraries, programs. if we install software, usually ends up here. (most likely user specific programs go here whereas system wide programs go to bin?)

- extension does not determine file type, but should match expectations otherwise programs cannot open properly

- a file is specified without slash at the end. directories are specified with slash at the end like logs/

- nano - simple text editor that can be used from terminal. simpler than vim or emacs

- bash keeps a record of the commands we previously entered. You can scroll through the history using the up and down arrows, but also see a file of the history at ~/.bash_history. You can search the history at the command line with ctrl+r, then use ctrl+r again to cycle through, enter to use command, down arrow to exit search.

- less - program for viewing a file rather than editing, useful for viewing large files as they are broken up into 'pages' to turn

- standard streams 
- the three standard streams are communication channels between a computer program and its environment - standard input, standard output and standard error. (is this the case for user made binaries or just built-in or common programs? can you tap into this notion of standard streams in nodejs programs?)
- standard streams are data streams that connect a computer program to the environment its executing in
- standard output is a place to which a program or command can send information. We can control where standard output sends its data to, although there is a default per environment, usually the terminal. We can send standard output to a file, printer, other another command. We can chain commands together when we send the output of one command as the input to another command.
- standard error is where programs send error messages. by default the shell directs error information to the screen, but we can change that.
- standard input is where a program or co mmand gets its input information from. by default, the shell directs standard input from the keyboard. the input information could come from a keyboard, a file, or even another command. 
- standard input is different from accepting arguments. It's a separate channel to accept data from, and its default of coming from the keyboard is rarely used. (rare example of default stdin being used - cat command with no arguments waits for you to type things to echo back.) any program that begins a prompt for you to type into is using stdin and its default of keyboard usage.
- redirection describes the ways we can alter the source of standard input (from its default keyboard), and the destinations for standard output and standard error (from its default terminal)
- redirecting output - the redirect output symbol (>) tells the shell to redirect the output of a command to a specific file instead of the screen. Use (>>) to append to the file instead of overwriting.
- to pass contents of a file to standard input use (<) - command < filename
- can redirect standard input and output at the same time. example - cat < original.txt > output.txt (taking advantage of the fact that cat echoes standard input)
- to redirect standard error to a file use (2>)
- when redirecting both standard output and standard error, you have to redirect standard output first in the syntax - example - cat bees.txt ant.txt > insects.txt 2> error.txt
- IMPORTANT: >, >>, <, 2> are all for redirection into or from files. 



