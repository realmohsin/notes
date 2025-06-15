


## more file system

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



## standard streams 
- the three standard streams are communication channels between a computer program and its environment - standard input, standard output and standard error. (is this the case for user made binaries or just built-in or common programs? can you tap into this notion of standard streams in nodejs programs?)
- standard streams are data streams that connect a computer program to the environment its executing in
- standard output is a place to which a program or command can send information. We can control where standard output sends its data to, although there is a default per environment, usually the terminal. We can send standard output to a file, printer, another command. We can chain commands together when we send the output of one command as the input to another command. (for the notion of sending standard output to another command, does this mean for command line programs the program needs to end by outputting standard output? what happens if a command outputs to standard output twice, once at start then at end of script, which output gets used by chained command as input?)
- standard error is where programs send error messages. by default the shell directs error information to the screen, but we can change that.
- standard input is where a program or command gets its input information from. by default, the shell directs standard input from the keyboard. the input information could come from a keyboard, a file, or even another command. 
- standard input is different from accepting arguments. It's a separate channel to accept data from, and its default of coming from the keyboard is rarely used. (rare example of default stdin being used - cat command with no arguments waits for you to type things to echo back.) any program that begins a prompt for you to type into is using stdin and its default of keyboard usage.
- redirection describes the ways we can alter the source of standard input (from its default keyboard), and the destinations for standard output and standard error (from its default terminal)


- redirecting output - the redirect output symbol (>) tells the shell to redirect the output of a command to a specific file instead of the screen. Use (>>) to append to the file instead of overwriting.
- to pass contents of a file to standard input use (<) - command < filename
- can redirect standard input and output at the same time. example - cat < original.txt > output.txt (taking advantage of the fact that cat echoes standard input)
- to redirect standard error to a file use (2>)
- when redirecting both standard output and standard error, you have to redirect standard output first in the syntax - example - cat bees.txt ant.txt > insects.txt 2> error.txt
- if redirecting both standard output and standard error to same file, you can use - cat bees.txt ant.txt > insects.txt 2>&1
- IMPORTANT: >, >>, <, 2> are all for redirection into or from files. 

- two input sources for commands - 
  - arguments 
  - standard input stream


- Pipes are used to redirect a stream from one program to another program. We can take the standard output of one command and redirect it to the standard input of another. We use the pipe character | to separate two commands. The output of the first command will be passed to the standard input of the second command. It seems piping only works if a command was made to receive standard input, which most commands optionally do for the purpose of being part of a pipe, most likely.

> connects a command to some file
| connects a command to another command

- tee command reads standard input and sends to standard output and a file. Used for saving something to a file in the middle of pipes. 

## globbing patterns

- globbing patterns or pathname expansion - special characters used within command arguments that represent patterns for the command to match against. * used as pathname expansion for part of a filename in current directory. * gets expanded to any number of possible characters. ? gets expanded to represent any single character. but matches are made from possible files in current directory, hence the term 'pathname expansion'. To match range of characters - [A-F]. To represent 'not' use ^ like [^A-F]
- ~ expands to home directory absolute pathname
- brace expansion - used to generate arbitrary strings - example: touch page{1,2,3}.txt leads to page1.txt, page2.txt, page3.txt
- arithmetic expansion - $((math-expression)) allow shell to perform math
- command substitution - $(command) expands into output of command given (useful in scripts)

## file metadata

- The system stores three timestamps for every file:
  - mtime, modification time, is when a file was last modified (when its contents changed)
  - ctime, change time, is when a file was last changed. Occurs anytime mtime changes, but also when file is renamed, moved, or permissions were altered.
  - atime, access time, is updated when a file is read by an application or a command like cat

- ls -l shows mtime
- ls -lc will replace mtime with ctime
- ls -lu will replace mtime with atime

- with timestamps and find command, can find files taht have been modified in the last hour, or find files that have not been accessed in the last week, etc


## Permissions

- linux systems are multiuser operating systems - more than one person can be using the same computer at the same time. as regular users, we do not have permission to write or even read every file on the machine.
- a single user may be the owner of files and directories, meaning they have control over their access. 
- additionally, users can belong to groups which are given access to particular files and folders by their owners.

- file owner - 3rd column in ls -l details
- group owner - each file and each folder has a group owner. each user can belong to a group and these groups can be given access to a file
- in ubuntu, when a new user is created a default group is created with the same name as the user
- can apply permissions to file owner and group owner granularly

- file attributes - the 10 characters of hte first column in ls -l. These characters tell us the type of the file, the read, write and execute permissions for the file's owner, the file's group owner, and everyone else.

- the very first character indicates the type of the file. some common types:
  - - regular file
  - d directory
  - c character devices or character special file
  - | symbolic link
  - b block devices or special file, files that refer to a device, ex references to harddrive partitions etc
- the next 9 characters tell us permission. first 3 about file owner, the second 3 about members of the group owner, and the final 3 about others
- the first character of each 3 character block tells us about read permission, if its r, then read is allowed, if its - then read is not allowed. what is read? for a file, read is being able to be read. for a directory it means the contents can be listed.
- the second character is for write permission, and follows same rule as read. what is write? for a file it means file cna be modified. for directory it means the directory contents can be modified (create new files, rename things) but only if the executable attribute is also set
- the third character is for execute permission, and follow same standad as read/write. what is execute? for a file it means it can be treated as a program to be executed. for directory it means it can be entered or 'cd'ed into

To change permisions we use the chmod command. To use chmod to alter permissions, we need to tell it:
who we are changing permissions for, what change are we making, adding or removing? and which permissions are we settings? who, what, which. We use a symbolic notation to answer these questions.
to specify who we use: 
  - u - owner of the file
  - g - group (mmembers of the group hte file belongs to)
  - o - others
  - a - all of the above
next, we tell chmod what we are doing:
  - - (minus sign) removes the permission
  - + (plus sign) grants the permission
  - = (equals sign) set a permission and removes others
finally, we specify which permission with:
  - r - read permission
  - w - write permission
  - x - execute permission

examples:
Add write permissions to the group
chmod g+w file.txt

remove write permissions from all
chmod a-w file.txt

add executable permissions for owner
chmod u+x file.txt

set permissions to read only for all
chmod a=r file.txt

- theres another way to tell chmod how to set permissions that's called octal notation which uses base-8, a set of numbers (8) equal to the number of possible permission combinations, that creates a mapping and then specifies just one base8 number for each set - user, group and all.

## su command and sudo relating to permissions

Sometimes we might want to start a shell as another user, from within our own shell session. We can use the su command. using with - will make sure to log you in as new user without mixing environments, and so is the recommended way to do this. type exit to exit session to previous user's session.

The root user can run any command and access any file regardless of the file's actual owner. (I believe only the root user can change the owner of a file, not even the owner itself can change that, but can with sudo.) Sometimes in ubuntu the root user cannot be accessed directly (probably based on inital setup?). This is fine because there is a way for normal users to gain abilities of the root user.
- sudo allows you run commands as the root user. individual users are granted an allowed list of commands they can run as the super user. (the first user created is usually allowed to do everything.) run sudo -l to see the permitted commands for your particular user. 

To change the owner of a file and the file group owner use the chown command. may need to use sudo depending on desired change.

## environment variables

- The shell maintains a set of information during a shell session known as the environment. It's just a series of key value pairs that define properties like your home directory, working directory, name of your shell, name of logged in user. Can view the environment using printenv.

- to access environment information, or environment variables, in commands, you can use parameter expansion using $VARIABLE. (IMPORTANT!)

- there are environment variables, that are available in parent and child shell sessions, then there are temporary shell variables that can be set by typping - key=value that will be available only in current session. To set an environment variable then type - export key=value

- to set an environment variable is truly global and available in every shell session, you have to modify the startup files. For non-login sessions (like gui terminal launch) the startup files include 
  - etc/bash.bashrc - global config for all users
  - ~/.bashrc - specific settings for each user. this is where we can define our own settings and configuration
When we log in, the shell reads information from startup files. First the shell reads from global config files that effect the environment for all users. Then the shell reads startup files for specific users. The specific files the shell reads from depends on the type of session: login vs non-login shell sessions
For login sessions:
  - /etc/profile - global config for all users
  - ~/.bash_profile - users's personal config file
  - ~/.bash_login - read if bash_profile isn't found
  - ~/.profile - used if previous two aren't found

We can define our own commands using the alias keyword, and like shell vs environment vs truly global variables, where we define them will determine their scope. If saving to .bashrc can instead save to .bash_aliases and create a link from .bashrc for better organization. for something more dynamic and specific than aliases, need to write our own scripts.


## bash scripting and cron

- bash scripting
basic steps -
  - write a script in a file and save it
  - make the script executable using chmod
  - verify that the shell can find your script

The first line of our script should read #!/bin/bash. It's called the shebang, and it's used to tell the OS which interpreter it should use when parsing the file. We want to say - 'use bash to interpret this file'. After the shebang, we need to include the path to the Bash binary. This is not bash specific. if we wanted  to write a python script, we would include the path to the python binary. 

- PATH variable - it is a list of directories where the shell looks to try and find a program when we tell it to run a program, and it is ordered.
- for scripts we make, its customary to store them in a directory called bin that we make in our user's home directory. then we add that ~/bin/ directory to start of PATH variable. add PATH="$HOME/bin:$PATH" to the .bashrc file.

- cron
The cron service allows us to schedule commands to run at regular intervals like - every 30 min, every day at midnight, every 1st of the month, every december 15, etc. To set up a cron job, we need to edit the crontab configuration file. Rather than edit the files directly, it's best to use the crontab -e command. 

cron syntax
a         b        c        d           e                  command
minute    hour     day      month       day(of week)
0-59      0-23     1-31     1-12        0-6

cron characters
- * any value (means every or all)
- 5,6 list of values (5 and 6)
- 1-4 Range of values (1 to 4)
- */5 Step values (every 5)

use crontab.guru for help with crontab syntax


random aside - difference between regex and glob patterns is regex usually matches strings in code, while globbing matches file names or file contents in the terminal. Globbing is the shell's way of providing regular expression patterns like other programming languages.  (but grep uses real regex right?)

random aside - tabs are treated differently than spaces in many ways, the expand and unexpand command changes tabs in a file. Maybe look into tabs if you ever come across issues.

## permissions again

- When running a process, it will run as the owner of that process.
- users and groups have UID and GID
- In linux, you'll have (non-human/symbolic?) users in addition to the normal humans that use the system. Sometimes these users are system daemons that continuously run processes to keep the system functioning. 
- /etc/sudoers is file to show who has access to sudo
- /etc/passwd is a file listing all users and information about them - username:password:uid:gid:gecos:homedir:shell. Lots of non-human users in /etc/passwd. Users are really only on the system to run processes with different permissions. Sometimes we want to run processes with pre-determined permissions. For example, the daemon user is used for daemon processes.
- the /etc/shadow file is used to store information about user authentication, such as encrypted passwords
- /etc/group file lists groups and info about them. (notice users in sudo group.)
- umask - every file gets created with a default set of permissions. if you ever wanted to change the default set of permissions you can do that with the umask command.
- setuid - in addition to r, w, x in permissions, there is s - which is (setuid) which means when a program is run as the owner of the program file rather than the user who executed. this might be necessary for commands that modify sensitive files. those sensitive files most likely are only modifiable by root, but if a command/program needs to modify those files, it will need to be run as root, so setuid provides this for normal users.
- setgid - similar to setuid except for groups. if s is used as permission flag, then program is run as if it was a member of owner group. 

- Process Permissions - there are 3 UIDs associated with every process - effective user ID, real user ID, saved user ID. The real user Id is the user who ran the program. the effective user id is usually also the real user ID.  effective user id's permissions are what are used. setuid can be used to set a different user as effective user id. saved user ID is used to switch between effective user id and real uid, to make sure a process only gets elevated privileges when needed. 

- the sticky bit - t - this permision bit (like r, w, x) in the  place x says that only the owner (or root) can delete or modify the file. (useful for shared directories - no one can delete the directory, but users can add files, modify files in that directory)

## sockets

Sockets are a way to enable inter-process communication between programs running on a server, or between programs running on separate servers. Communication between servers relies on network sockets, which use the Internet Protocol (IP) to encapsulate and handle sending and receiving data.

Network sockets on both clients and servers are referred to by their socket address. An address is a unique combination of a transport protocol like the Transmission Control Protocol (TCP) or User Datagram Protocol (UDP), an IP address, and a port number.

Types of sockets include:
  * Stream sockets - which use TCP as their underlying transport protocol
  * Unix Domain sockets, which use local files to send and receive data isntead of network interfaces and IP packets. 
    - Used by local processes to communicate with each other.
    - MySQL on Ubuntu defaults to using a file name /var/run/mysqld/mysql.sock for communication with local clients. Clients read from and write to the socket, as does MySQL server itself.


## processes


- processes
- processes are the programs that are running on your machine, they are managed by teh kernel and each process has an Id associated with it called the PID. PID is assigned in the order that processes are created. ps aux will show snapshot of running processes. Main fields to look at from ps are PID, STAT (process status code), COMMAND (name of executable/command). There is also a TTY field that refers to the terminal that executed the command. ? in this field means the process does not have a controlling terminal. Closing a controlling terminal will close the associated process. 

There are processes such as daemon processes, which are special processes that are essentially keeping the system running. They often start at system boot and usually get terminated when the system is shutdown. They run in the background and since we don't want these special processes to get terminated they are not bound to a controlling terminal.

- daemon - a daemon is a computer program that runs as a background process, rather than being under the direct control of an interactive user.

A process is a running program, more precisely its the system allocating memory, CPU, I/O to make the program run. The kernel is in charge of processes, when we run a program the kernel loads up the code of the program in memory, determines and allocates resources and then keeps tabs on each process, its knows the status of the process, the resources the process is using and receives, the process owner, signal handling, etc. 

Steps when a process is created - an existing (parent) process basically clones itself using the fork system call. THe fork system call creates a mostly identical child process that takes on a new PID, and the original process gets a parent id - PPID. Afterwards the child process can either use the same program as its parent or, more often, use the execve system call to launch up a new program. 

Every process has a parent and they are just forks of each other, and so there is a mother of all processes, that is the process called init with a PID of 1 and it is created by teh kernel when the system boots. It can't be terminated unless the system shuts down. It is the process that spawns all other processes.

The parent process of a command you run from the shell, is the shell process.

- process termination
- A process can exit using the _exit system call, this will free up the resources that process was using for reallocation. So when a process is ready to terminate, it lets the kernel know why it's terminating with something called a termination status. Most commonly a status of 0 means that the process succeeded. However, that's not enough to completely terminate a process. The parent process has to acknowledge the termination of the child process by using the wait system call and what this does is it checks the termination status of the child process. (There is another way to terminate a process and that involves using signals)

orphan processes
- When a parent process dies before a child process, the kernel knows that it's not going to get a wait call, so instead it makes these processes "orphans" and puts them under the care of init (remember mother of all processes). Init will eventually perform the wait system call for these orphans so they can die.

- zombie processes
- What happens when a child terminates and the parent process hasn't called wait yet? We still want to be able to see how a child process terminated, so even though the child process finished, the kernel turns the child process into a zombie process. The resources the child process used are still freed up for other processes, however there is still an entry in the process table for this zombie. Zombie processes also cannot be killed, since they are technically "dead", so you can't use signals to kill them. Eventually if the parent process calls the wait system call, the zombie will disappear, this is known as "reaping". If the parent doesn't perform a wait call, init will adopt the zombie and automatically perform wait and remove the zombie. It can be a bad thing to have too many zombie processes, since they take up space on the process table, if it fills up it will prevent other processes from running

- signals
A signal is a notification to a process that something has happened. They are software interrupts and they have lots of uses:
  - A user can type one of the special terminal characters (Ctrl-C) or (Ctrl-Z) to kill, interrupt or suspend processes
  - Hardware issues can occur and the kernel wants to notify the process
  - Software issues can occur and the kernel wants to notify the process
  - They are basically ways processes can communicate

When a signal is generated by some event, it's then delivered to a process, it's considered in a pending state until it's delivered. When the process is ran, the signal will be delivered. However, processes have signal masks and they can set signal delivery to be blocked if specified. 

When a signal is delivered, a process can do a multitude of things:
  - Ignore the signal
  - "Catch" the signal and perform a specific handler routine
  - Process can be terminated, as opposed to the normal exit system call
  - Block the signal, depending on the signal mask

Each signal is defined by integers with symbolic names that are in the form of SIGxxx. Some of the most common signals are:

- SIGHUP or HUP or 1: Hangup - Hangup, sent to a process when the controlling terminal is closed. For example, if you closed a terminal window that had a process running in it, you would get a SIGHUP signal.
- SIGINT or INT or 2: Interrupt - Is an interrupt signal, so you can use Ctrl-C and the system will try to gracefully kill the process
- SIGTERM or TERM or 15: Software termination - Kill the process, but allow it to do some cleanup first, (save it state, if it wants to)
- SIGKILL or KILL or 9: Kill - Kill the process, doesn't do any cleanup
- SIGSTOP or STOP: Stop - Stop/suspend a process
- SIGSEGV or SEGV or 11: Segmentation fault

Some signals are unblockable, one example is the SIGKILL signal. The KILL signal destroys the process.

Processes use the CPU for a small amount of time called a time slice. Then they pause for milliseconds and another process gets a little time slice. By default, process scheduling happens in this round-robin fashion. Processes aren't able to decide when and how long they get CPU time. here is a way to influence the kernel's process scheduling algorithm with a nice value. To change nicess value use nice and renice command.

In the STAT column, you'll see lots of values. A linux process can be in a number of different states. The most common state codes you'll see are described below:

R: running or runnable, it is just waiting for the CPU to process it
S: Interruptible sleep, waiting for an event to complete, such as input from the terminal
D: Uninterruptible sleep, processes that cannot be killed or interrupted with a signal, usually to make them go away you have to reboot or fix the issue
Z: Zombie, we discussed in a previous lesson that zombies are terminated processes that are waiting to have their statuses collected
T: Stopped, a process that has been suspended/stopped

- everything in linux is a file, even processes. Process information is stored in a special filesystem known as the /proc filesystem. There are sub-directories for every PID. In the /proc/<PID>?status file you can see process state information and more detailed information that can't be found from ps command output. The /proc directory is how the kernel views the system.

- jobs
- jobs refer to processes (that you the user started) that are running in the background or foreground. Job control refers to the ability to manipulate these processes, including suspending, resuming, and terminating them. This can be useful for managing multiple tasks or for debugging problems with a process.

- You can't interact with a shell while a process is running, However you can run a program in the background - send a job to the background by appending a & to the command. To view all background jobs use the jobs command. In the output + denotes most recent background job and - denotes second most recent background job.  To send an existing job to the background, suspend it with ctrl+z (send a SIGSTOP signal), then run bg command. (aside: ctrl+c ends a running program/process by sending a SIGINT). To move a job from the background to the foreground, find job id from jobs command, then run fg <job-id>. You can kill a background job/process by using their job id with kill command.







## Filesystem

- / - The root directory of the entire filesystem hierarchy, everything is nestled under this directory.
- /bin - Essential ready-to-run programs (binaries), includes the most basic commands such as ls and cp.
- /boot - Contains kernel boot loader files.
- /dev - Device files.
- /etc - Core system configuration directory, should hold only configuration files and not any binaries.
- /home - Personal directories for users, holds your documents, files, settings, etc.
- /lib - Holds library files that binaries can use.
- /media - Used as an attachment point for removable media like USB drives.
- /mnt - Temporarily mounted filesystems.
- /opt - Optional application software packages.
- /proc - Information about currently running processes.
- /root - The root user's home directory.
- /run - Information about the running system since the last boot.
- /sbin - Contains essential system binaries, usually can only be ran by root.
- /srv - Site-specific data which are served by the system.
- /tmp - Storage for temporary files
- /usr - This is unfortunately named, most often it does not contain user files in the sense of a home folder. This is meant for user installed software and utilities, however that is not to say you can't add personal directories in there. Inside this directory are sub-directories for /usr/bin, /usr/local, etc.
- /var - Variable directory, it's used for system logging, user tracking, caches, etc. Basically anything that is subject to change all the time.

There are many different types of filesystems, so a VFS - Virtual File System abstraction layer exists so applications can work with any underlying filesystem.

Journaling is a crucial element of most filesystems - it refers to keeping a log of every action, start and sucessful end. This way if the system shuts down suddenly without the current action being completed, for example, in the middle of a file being copied, the system can still recover the correct state the file system needs to be in. 

Filesystem types: 
ext4 - the most current version of the native linux filesystems - the standard choice for linux filesystems
XFS - high performance journaling file system, great for a system with large files such as a media server
NTFS, NAT - Windows filesystems
HFS+ - Macintosh filesystem

Hard disks can be subdivided into partitions, essentially making multiple block devices. Usually /dev/sda is the whole disk, and /dev/sda1 is the first partition, /dev/sda2 is the second partition, etc. If you need a certain filesystem, you can create a partition instead of making the entire disk one filesystem type.

Every disk will have a partition table, this table tells the system how the disk is partitioned. This table tells you where partitions begin and end, which partitions are bootable, what sectors of the disk are allocated to what partition, etc. There are two main partition table schemes used, Master Boot Record (MBR) and GUID Partition Table (GPT).

File system anatomy
 - Boot block - This is located in the first few sectors of the filesystem, and it's not really used the by the filesystem. Rather, it contains information used to boot the operating system. Only one boot block is needed by the operating system. If you have multiple partitions, they will have boot blocks, but many of them are unused.
 - Super block - This is a single block that comes after the boot block, and it contains information about the filesystem, such as the size of the inode table, size of the logical blocks and the size of the filesystem.
 - Inode table - Think of this as the database that manages our files. Each file or directory has a unique entry in the inode table and it has various information about the file.
 - Data blocks - This is the actual data for the files and directories.

To see partition table use `sudo parted -l`

A USB is essentially a file system, and it can be partitioned if needed. Many tools can be used for partitioning, such as the command line tool `parted`. After partitioning, filesystems can be created on a partition with the `mkfs` tool: `sudo mkfs -t ext4 /dev/sdb2`. You generally only want to create a filesystem on a new partition, because creating one on top of an existing one usually leaves it in a corrupted state.

Mounting/Unmounting
You have to mount a filesystem onto a mount point to view it. You'll need the device location, the filesystem type and the mount point. THe mount pooint is a directory on the system where the filesystem will be attached. For instance, you can mount a USB's filesystem on a certain directory location. For example: `sudo mount -t ext4 /dev/sdb2 /mydrive`. To unmount  `sudo umount /mydrive`. For some types of device categories, the kernal names devices in the order it finds them, so sometimes you might need to use a devices UUID (universally unique ID) instead of a name. 

When we want to automatically mount filesystems at startup we can add them to a file called /etc/fstab. By default you can notice that on boot, the main filesystem gets mounted on / . 

There is something called a swap partition. This is a partition that can be used to allocate virtual memory. If you are low on memory, the system can use this partition to 'swap' pieces of memory of idle processes to the disk partition to lessen the load.

Tools for checking disk usage include 
 - `df -h` for showing utilization of currently mounted filesystems
 - `du -h` for showing sized of files and directories in current directory

Filesystems can beome corrupted, for example due to a sudden shutdown, in which case tools like `fsck` can be used to check the consistency and repair things.

Inodes
A filesystem is comprised of all our actual files and a database that manages those files. The database is known as the inode table. An inode is an entry in this table. Entries contains all sorts of information - file type, owner, group, access permissions, timestamps, number of hardlinks to the file, size of the file, number of blocks allocated to the file, pointers to the data blocks of the file, almost everything except the filename and file itself.

Inodes are identified by numbers, when a file gets created it is assigned an inode number. You can see inode numbers, run `ls -li`. The first field will show the inode number of a file. 

Data is not necessarily stored sequentially and so inodes are needed to point to the actual data blocks of the files. 

The link count in `ls -li`, third column, refers to the total number of hard links a file has. There are two types of links, symlinks and hard links. 

symlinks are like shortcuts in Windows, they are just aliases, they link to another file through filenames. Hard links are acutal files that contain a link to an inode. So a hardlink will have the same inode number of its copies.  

To create hardlink `ln somefile somelink`
To create symlink `ln -s myfile mylink`




  
## systemd

systemd is a suite of basic building blocks for a Linux system. It provides a system and service manager that runs as PID 1 and starts the rest of the system. systemd provides an init model for managing an entire machine from boot onwards. systemd's advantage over older init systems is mainly its aggressive parallelization capabilities.  

The basic object that systemd manages and acts upon is a “unit”.  Units are the objects that systemd knows how to manage. These are basically a standardized representation of system resources that can be managed by systemd. Units can be said to be similar to services or jobs in other init systems. However, a unit has a much broader definition, as units can be used to abstract not only services, but also network resources, devices, filesystem mounts, and isolated resource pools. 

** systemd doesn't just stop and start services, it can mount filesystems, monitor your network sockets, etc and because of that robustness it has different types of units it operates. **
 
Categories of units include:

* .service - A service unit describes how to manage a service or application on the server. This will include how to start or stop the service, under which circumstances it should be automatically started, and the dependency and ordering information for related software. 

* .socket - A socket unit file describes a network or IPC socket, or a FIFO buffer that systemd uses for socket-based activation. These always have an associated .service file that will be started when activity is seen on the socket that this unit defines.

* .device - A unit that describes a device that has been designated as needing systemd management by udev or the sysfs filesystem. Not all devices will have .device files. Some scenarios where .device units may be necessary are for ordering, mounting, and accessing the devices.

* .target - A target unit is used to provide synchronization points for other units when booting up or changing states. They also can be used to bring the system to a new state. Other units specify their relation to targets to become tied to the target’s operations. 

A target unit can be a collection of other units that together represent a 'goal'. systemd uses these target goals to drive things - basically you have a target that you want to achieve and this target also has dependencies that we need to achieve. Here's what happens on boot:
  * First, systemd loads its configuration files, usually located in /etc/systemd/system or /usr/lib/systemd/system
  * Then it determines the boot goal, which is usually default.target
  * systemd figures out the dependencies of the boot target and activates them

systemd can boot into different targets:
  * poweroff.target - shutdown system
  * rescue.target - single user mode
  * multi-user.target - multiuser with networking
  * graphical.target - multiuser with networking and GUI
  * reboot.target - restart    

The default boot goal of default.target usually points to graphical.target . 

Once a single unit is activated, everything below that unit gets activated as well. So let's say we boot into default.target and this target groups together the networking.service unit and crond.service unit, so those services will be activated.

The files that define how systemd will handle a unit can be found in many different locations. The system has a copy in /lib/systemd/system. When software installs unit files on the system, this is the location where they are placed by default. You should not edit files in this directory. If you wish to modify the way that a unit functions, the best location to do so is within the /etc/systemd/system directory. Unit files found in this directory location take precedence over any of the other locations on the filesystem.

If you wish to override only specific directives from the system’s unit file, you can actually provide unit file snippets within a subdirectory. These will append or modify the directives of the system’s copy, allowing you to specify only the options you want to change. The correct way to do this is to create a directory named after the unit file with .d appended on the end. So for a unit called example.service, a subdirectory called example.service.d could be created. Within this directory a file ending with .conf can be used to override or extend the attributes of the system’s unit file.

Example of basic service unit file for foobar.service

```
[Unit]

Description=My Foobar
Before=bar.target


[Service]

ExecStart=/usr/bin/foobar


[Install]

WantedBy=multi-user.target
```
At the beginning of the file, we see a section for [Unit], this allows us to give our unit file a description as well as control the ordering of when to activate the unit. The next portion, [Service] section, under here we can start, stop or reload a service. And the [Install] section is used for dependency management. 


## systemctl

To manage services in particular, our main tool is the `systemctl` command.  















## incorporated are below

## Boot Process

1. BIOS - Basic Input/Output System - initializes the hardware and makes sure with a Power On Self Test (POST) that all hardware is ready. The main job of the BIOS is to load up the bootloader.

  * BIOS firmware common in IBM PC computers, dominant type of computers today. 
  * BIOS firmware can be used to change the boot order of your harddisks, check system time, get machine's mac address, etc
  * Once BIOS boots up the hard drive, it searches for the boot block, the first sector of the hard drive, (that gets reserved in every partition), to figure out how to find the bootloader.
  * Linux uses BIOS. However there is another fireware type EFI/UEFI that was designed to be the successor to BIOS. Today Macintosh machines use EFI/UEFI while Windows is moving to it, but Linux is using BIOS. (BIOS seems independent of Linux, Windows, Mac, etc since its below them as the very first level on top of hardware. So it might be more appropriate to say that Linux can only run on top of BIOS, not EFI/UEFI)

2. Bootloader - loads the kernel into memory and then starts the kernal with a set of kernel parameters. 

  * Boots into an operating system, selects a kernel to use and specifies kernel parameters.
  * Most common bootloader for Linux is GRUB.
  * Can enter GRUB menu by clicking 'e' during startup. You can find kernel parameters from this menu:
    - initrd - specifies the location of initial RAM disk
    - BOOT_IMAGE - where the kernel image is located
    - root - location of root filesystem
    - ro - flag for read-only mode
    - quiet - added so that you don't see display messages that are going on in the background during boot
    - splash - lets splash screen be shown

3. Kernel - when loaded, it immediately initializes devices and memory. The main job of the kernel is to load up the init process. The kernel will talk to hardware to make sure it does what we want our processes to do.

  * The kernel manages our systems hardware, however not all drivers are available to the kernel during boot up, so we depend on a temporary root filesystem that contains just the essential modules that the kernel needs to get the rest of the hardware. 
    - In the past, this job was given to the initrd (initial ram disk) - the kernel would mount the initrd, get the necessary bootup drivers, then when it was done loading everything, it would replace the initrd with the actual root filesystem.
    - In the present, initramfs is used instead - a temporary root filesystem that is built into the kernel inself to load all the necessary drivers for the real root filesystem, so no more locating the initrd file. 
  * After getting all the modules it needs, it mounts the root partition in read-only mode first to run `fsck` to check for system integrity, then afterwards it remounts the root filesystem in read-write mode.
  * After the root filesystem is mounted, the kernel locates the init program and executes it.
  * When we talk about the Linux operating system, we organize it into 3 different levels of abstraction - the hardware, the kernel, and the user space (the shell, the programs you run, the graphics, etc). We separate the kernel and user space because we want them to operate in different modes for security.
    - The kernel operates in kernel mode. In kernel mode, the kernel has complete access to the hardware. Anything that involves hardware - reading/writing to disk, controlling our network, etc, is done in kernel mode.  
    - The user space operates in user mode - there is a very small amount of safe memory and CPU that is allowed access in user mode. 
    - There are two main levels and modes in x86 architecture that correspond to kernel and user modes, expressed as Ring #0 and Ring #3, respectively. 
    - When we need to do anything that involves hardware in our user mode - which is the level we're usually always at - we need to make system calls which performs a privileged instruction in kernel mode, then switches back to user mode.
    - syscall - System calls provide user space processes a way to request the kernel to do somethign for us. The kernel makes certain services available through the system call API. There is a fixed table of system calls, each identified by a unique ID, that do things like read/write to a file, modify memory usage, modify the network, etc.
    - When a program like `ls` is called, the code inside this program has as 'system call wrapper' that invokes the system call through its syscall ID, which goes the process of switching to kernel mode to do what needs to be done, before returning to user mode. You can view and debug system calls with `strace`, example: `strace ls`
  * You can have multiple kernels installed on your system - we can choose which kernel to use from the GRUB bootloader menu. To see what kernel version you have use `uname -r`. To upgrade to latest kernal version, you can use `sudo apt dist-upgrade` which will upgrade all packages on your system. 
  * The kernel is located in the /boot directory. The file vmlinuz is the actual linux kernel. There are various kernel-related configuration files in the directory. 
  * Kernel modules are pieces of code that can be loaded and unloaded into the kernel on demand - they allow us to extend the functionality of the kernel without actually adding to the core kernel code. Kernel modules can be found in the /lib directory.
    - To list currently loaded kernel modules use `lsmod`
    - Loading a module example: `sudo modprobe bluetooth`
    - Removing a module example: `sudo modprobe -r bluetooth`
  * To load modules during system boot, instead of temporarily loading them with modprobe, add a configuration file to the /etc/modprobe.d directory. 
 


4. Init - the first process that gets started, init starts and stops essential service processes on the system, as the mother of all processes. There are three implementations of init in Linux:
  - System V init (sysv): This is the traditional init system.
  - Upstart: This is the init you'll find in older Ubuntu installations. It uses the idea of jobs and events, it works by starting jobs that perform certain actions in response to events.
  - Systemd - is the new standard for init. It is goal oriented - basically, you have a goal that you want to achieve and systemd tries to satisfy the goal's dependencies to complete the goal.

  
## find command

- logical operators can be used with find
examples:
- list all files that have chick or kitty in name
find -name "*chick*" -or -name "*kitty*"
- list all non html files
find -type -f -not -name "*.html"
! is alternative syntax for -not 
- and (-and) operator/command is optional because it's implied through multiple options

- we can provide find with our own action to perform using each matching pathname 
find -exec command {};
The {} are a placeholder for the current pathname(each match), and the semicolon is required to indicate the end of the command.

- when using find, when we provide a command via -exec, that command is executed separately for every single element. We can instead use a special command called xargs to build up the input into a bundle that will be provided as an argument list to the next command. 

- xargs is not just for usage within find. Its used anytime we want to pass a list of arguments to another command. Useful for when a command is not setup to accept sdin so piping without xargs first would not work. 

## grep command

- the grep command searches for patterns in each file's contents. grep will print each line that matches a pattern we provide. -i will make search case insensitive, -w will make sure to match words only instead of fragments located inside of other words. 

- useful to pipe outputs of other commands to grep to search for something in the output 




## packages

- packages
- packages are installed with package managers, but can also be installed through source code.
Two main varieties of packages are Debian (.deb) and Red Hat (.rpm). Ubuntu uses .deb. Packages are lots of files compiled into one. The people that write this software are known as upstream providers, they compile their code and write up how to get it installed. These upstream providers work on getting out new software and update existing software. When they are ready to release it to the world, they send their package to package maintainers, who handle getting this piece of software in the hands of the users. These package maintainers review, manage and distribute this software in the form of packages.

Package Repositories - a central storage location for pacakges. Distributions already come with pre-approved sources to get packages from. On ubuntu this sources file is /etc/apt/sources.list.

- file archive - file types such as .rar and .zip. These are an archive of files, they contain many files inside of them, but they come in this very neat single file known as an archive.
- gzip is a program used to compress files in linux, they end in a .gz extension.
- gzip can't add multiple files into one archive. tar is used for that. tar will archive a directory into a single file.
- tar files usually then get compressed so you end up with a .tar.gz file. So you need to uncompress first, then unarchive to get the directory of files.

packages need their dependencies also available.

If not gotten from package management systems, a package will come as a .deb or .rpm file. need to use the package management tools dpkg or rpm to install. (dpkg with .deb files for ubuntu). When installing .deb manually like this, its your responsibility to know the dependencies and go install those yourself first. 

Package management systems like apt and yum were created so that you dont have to worry about installing dependencies yourself. They make installing and removing packages easier. 

It's a best practice to update your package repositories so they are up to date before you install and update a package. 

Sometimes you might have to install the rare obscure package from source code, in which case you'll need to install the build-essential package with apt, which will give you the make command. Then you'll have to uncompress/unarchive the source code, go inside and run any configure scripts to check for dependencies, then you'll have to make sure there's a makefile, then run make install. (make is the compiler for C programs. C programs seem to exist parallel to bash scripting, same low level for OS programming.)

## devices

Devices are abstractions that 'do something' that can be considered a little removed from in-memory data movement. There are external devices like printers, hard disks/ filesystems, usb, and then there are psuedo devices. External devices usually transfer data in blocks and thus called block devices. Pseudo devices are usually character devices, as they work with data character at a time, like /dev/null that takes input and discards it. Named pipes allow two or more processes to communicate with each other. Socket devices facilitate communication between many processes at once. SCSI devices are peripherals like hard disks. /sys filesyemns contains all the information for all devices on system, while /dev directory is simple, it allows other programs to access devices themselves, while the /sys filesystem is used to view information and manage the device. There is a udevd daemon that is running on the system and it listens for messages from the kernel about devices connected to the system. Udevd will parse that information then create and remove device files from /dev. dd tool is useful for copying data. It reads input from a file or data stream and writes it to a file or data stream. Can be used to create backups of anything, even whole disk drives. 


## os
- two families - microsoft nt descendants like windows and everything else Unix descendants like mac os, linux and android
- original unix design choices live on like multi-user os and hierarchical file systems.
- unix philosophy - modular software design, write programs that do one thing well, combine programs, write programs to handle text streams, because that is a universal interface
- linux created from linux kernel and GNU project software with goal to make unix-like os that is open source
- kernel is core of operating system that facilitates interactions between hardware and software, and manages critical tasks like memory management and task scheduling and allocation of resources. 
- many different linux distributions like fedora, ubuntu, debian. etc
- shell is an interface to an operating system. shells expose an OS's services to users or other programs. terminal is a program that runs a shell. there are many shells, such as bash, zsh, powershell etc, 
- bash is the most common shell and is the default on linux. (git-bash is a good emulation on windows computers to be able to use unix-like commands)

everything in linux is a file


## Linux command line

- man pages are built-in documentation for linux

- 4 types of commands (use type command to tell us the type of another command)
  - executable program - usually stored in /bin, /usr/bin, or /usr/local/bin. there are compiled binary files
  - built-in shell command - these commands are part of the shell (bash in our case)
  - shell function
  - alias
- some commands do not have a man page entry, like many shell built-ins. use help command for those commands

- nano - simple text editor that can be used from terminal. simpler than vim or emacs

- bash keeps a record of the commands we previously entered. You can scroll through the history using the up and down arrows, but also see a file of the history at ~/.bash_history. You can search the history at the command line with ctrl+r, then use ctrl+r again to cycle through, enter to use command, down arrow to exit search.

- less - program for viewing a file rather than editing, useful for viewing large files as they are broken up into 'pages' to turn