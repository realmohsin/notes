- os 
- unix, linux
- kernel
- shell, terminal, bash, git-bash
- unix/linux's command line commands vs other OS's
- man pages for commands
- point of confusion - sometimes (creating in vm) root user is disabled and non-root user must be created,
other times (digital ocean) root user is only user initially created and has a password
- ufw - uncomplicated firewall - included by default within Ubuntu distros, upon installation, applications that rely on network communications will typically set up a ufw profile

- hashing
- mapping an infinite set to a finite set
- can verify somebody has something without needing them to send that exact thing to you
- can check if something, like file contents, has changed or not

- ssh (secure shell) 
- OpenSSH - ssh daemon (listens on port 22 by default), ssh client
- two ways to connect (to remote server) - password (of a user on remote server) or ssh key
- ssh keys - private and public
- ssh-keygen - command to generate keys in ~/.ssh/id_rsa and ~/.ssh/id_rsa.pub
- ~/.ssh/authorized_key - where public keys go (during server creation?) in user home directory
- public key will be asked for by many services like github to establish secure connection
- ssh username@remote_host - to connect to remote server
- ssh-agent - service that auto types your private key's passphrase (not necessary)
- typing 'exit' disconnects ssh connection to remote server

- remote server setup (create server with ssh public key, connect, create superuser, enable firewall, allow SSH connection with new superuser)
- (digitalocean) choose physical destination, choose hardware specs, choose OS, provide public ssh key, get back created server's IP
- (digitalocean) for Ubuntu, only root user created on server creation (but in vm root user disabled and custom user created?)
- ssh root@ip_address to connect for first time
- first time accept warning about host authenticity to add server to known hosts
- best practice not to use root, so create new user, then give sudo privileges to that user
- adduser username - to create new user, process will ask to setup password, etc
- usermod -aG sudo username - give user superuser, sudo privileges
- enable ufw firewall (important: allow OpenSSH)  
- ufw app list, ufw allow OpenSSH, ufw enable, ufw status (ufw will block all connections except SSH)
- make sure you can SSH into the newly created user account directly
- since public key is already in the root account's home directory, we can copy that file and directory structure to our new user account's home directory
- rsync --archive --chown=username:username ~/.ssh /home/username (rsync copies files with the correct ownership and permissions), now client machine can connect to remote server as newly created user

- dns

- nextjs
- npx create-next-app@latest


(https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands)
https://linuxjourney.com/
