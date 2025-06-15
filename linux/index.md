# Linux

* There are two main families of operating systems - Microsoft NT descendants (Windows) and UNIX descendants (Mac OS, Linux).

* The UNIX philosophy - modular software design, write programs that do one thing well, combine programs, and write programs to handle text streams (because that is a universal interface). 

* Linux was created from the Linux kernal and GNU software project, with the goal of making a UNIX-like OS that was open source. (There are many Linux distributions like Fedora, Ubuntu, Debian, etc)

* Original UNIX design choices live on in Linux like being a multi-user OS and having a hierarchical file system.

* Kernel - core of an operating system that facilitates interactions between hardware and software, and handles memory management, task scheduling and allocation of resources. 

* Shell - an interface to the operating system. Shell's expose an OS's services to users or other programs. A terminal is a program that runs a shell. There are many shells, such as bash, zsh, powershell, etc. Bash is the most common shell, and is the default on Linux. (Git-Bash is a good emulation for Windows to be able to use UNIX-like commands.)

** EVERYTHING IN LINUX IS A FILE **

* A file is specified without a slash at the end. Directories, although not required, should be specified with a slash at the end, for clarity. 

* file extensions do not determine file type, but should match expectations otherwise programs might choose not to open them

* Nano is a simple text editor that can be used from the terminal. (See ./nano.md for notes.)

* Less is a program for viewing a file rather than editing, useful for viewing large files as they are broken up into 'pages' that can be turned.

* There are 4 categories of commands:
  - executable program - usually stored in the form of compiled binary files in /bin, /usr/bin, or /usr/local/bin
  - built-in shell command - commands that are part of the shell
  - shell function (....)
  - alias (....)

* MAN pages are built-in documentation pages for Linux. Some commands do not have a MAN page entry, like many shell-builtins - in which case the help command can be used.



## Ubuntu File System

* The starting point for the file system is the root folder / . (Confusingly, there is a sub-directory named root.)

* /home contains a home folder ~ for each user on the system.

* Hidden files and folders usually begin with a .

* Relative paths specify a directory/file relative to the current directory, while absolute paths start from the root directory / . To provide relative paths in commands, a single dot . is used to represent the current directory, while two dots .. represents the parent directory.

### Folders of /

- /bin - short for binary, lots of executable programs
- /etc - contains configuration files and initialization scripts
- /media - to access content on removable media like USB drives, SD cards, DVDs, CD roms, etc
- /var - short for variable - contains log files, files that are outputs of programs, and caches (Somewhat strangely, Nginx uses /var/www as default location to store static content.)
- /root - home folder for the root user
- /home - folder that contains all the home folders for each user on the OS
- /usr - lots of executable files, libraries and programs. If we install software, it usually ends up here. (Question: Is this where most user-specific programs are installed, whereas system-wide programs are installed in /bin?)



## Command History

* Bash keeps a record of previously entered commands. 

* You can scroll through the history at the command line using the UP and DOWN arrows. You can search with CTRL+r, then use CTRL+r again to cycle through previous commands, then ENTER to use selected command, and DOWN arrow to exit search.

* There is also a file of the command history at ~/.bash_history. 



## Standard Streams

* Standard streams are communication channels between a computer program and its environment. Standard streams are data streams that connect a computer program to the environment its executing in. There are three standard streams - standard input (stdin), standard output (stdout) and standard error (stderr).

* Standard output is a place to which a program or command can send information. We can control where standard output sends data to, although there is a default per environment, usually the terminal. We can send standard output to a file, printer, or another command. When we chain commands together we send the output of one command as the input to another command. 

* Question: For the notion of sending standard output to another command, does this mean the program needs to end with outputting standard output? What happens if a command outputs to standard output twice, once at start then at end of script, which output gets used by the chained command as input?

* Standard error is where programs send error messages. By default, the shell directs error information to the screen, but we can change that.
 
* Standard input is where a program or command gets its input information from. By default, the shell directs standard input from the keyboard but it can be changed to come from a file, or even another command. Standard input is completely different from arguments given to a command. Standard input is a separate channel to accept data from, and its default of coming from the keyboard is rarely used. (Rare example of default stdin being used - cat command with no arguments waits for you to type things to echo back.) A program that begins a prompt for you to type into is using stdin and its default source of keyboard.

* Redirection describes the ways we can alter the source of standard input (instead of the default keyboard), and the destinations for standard output and standard error (instead of the default terminal).

* For redirection from or into files: 
  - The symbol > tells the shell to redirect the standard output of a command to a specific file instead of the terminal - this would overwrite the file. The symbol >> can be used to append to the file instead of overwriting. Example: `echo hello world > file.txt`
  -  The symbol < is used to pass the contents of a file to the standard input of a command. Example: `cat < file.txt`
  -  Standard output and standard input can be redirected at the same time. Example: `cat < original.txt > output.txt` (If given standard input, cat just sends it to standard output.)
  - The symbol 2> is used to redirect standard error to a file. 
  - When redirecting both stdout and stderr, you have to redirect stdout first in the syntax. Example: `cat bees.txt ants.txt > insects.txt 2> errors.txt` If stdout and stderr should go in the same file you can use 2>&1 at the end. Example: `cat bees.txt ants.txt > insects.txt 2>&1`

** The symbols >, >>, <, 2> are all for redirection from or into files. ** 

** There are two separate input sources for commands: arguments and stdin ** 


















