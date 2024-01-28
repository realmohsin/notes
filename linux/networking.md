# networking

scp - secure copy - works like cp but from one host to another using ssh

To copy a file over from local host to a remote host
- scp myfile.txt username@remotehost.com:/remote/directory

To copy a file from a remote host to your local host
- scp username@remotehost.com:/remote/directory/myfile.txt /local/directory

To copy over a directory from your local host to a remote host
- scp -r mydir username@remotehost.com:/remote/directory

rsync - remote synchronization - similar to scp but will only copy over the differences, more efficient for keeping directories in sync between local and remote

Copy/sync files on the same host
- rsync -zvr /my/local/directory/one /my/local/directory/two

Copy/sync files to local host from a remote host
- rsync /local/directory username@remotehost.com:/remote/directory

Copy/sync files to a remote host from a local host
- rsync username@remotehost.com:/remote/directory /local/directory
 

can set up simple http server to server files in current directory with python3
- python3 -m http.server

NFS - Network File System allows a server to share directories and files with one or more clients over the network. used as server client model, instead of one time usage of scp or rsync.

Samba can be used to share files with Windows machines.


## network basics

- isp - internet service provider, the company you pay to get Internet at your house
- router - the router allows each machine on your network to connect to the internet via wireless or ethernet
- WAN - Wide Area Network - this is what we call the network that encompasses everything between your router and a wider network such the Internet
- WLAN - Wireless Local Area Network - this is the network between your router and any wireless devices you may have such as laptops
- LAN - Local Area Network - this is the network between your router and any wired devices
- Hosts - Each machine on a network is known as a host
- Packet - data and information that gets transmitted through networks