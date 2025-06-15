ssh
storing a public key in the authorized_keys file will allow the owner of hte private key to connect through ssh to this host
digitalocean asks for a public key during dashboard creation of a node (this just means it will create a authorized_keys file and put it there)
To put a public key in another host, tools like ssh-copy-id may help. Manual copying and typing it out works, or anyway to do it.
OpenSSH is the service, process that allows for connections. It listens on a port. It must be enabled withing firewalls like ufw.

http default port is 80. this means if port is not specified an http request will be sent to port 80 of the ip address given.
If you want user to hit a different port, it needs to be specified in the URL. 


domains-
domain registrar - has domains to sell
nameservers - serves where domain names are mapped to ip addresses
usually domain registrars have nameservers. 
when you get a domain you need to set the nameserver where the DNS records will be. (initially the domain registrar will most likely
have it set to their nameserver by default)
then you need to set DNS records on the nameserver. (usually done through dashboard of company or servic that owns nameserver)
A record will require a ipv4 address, which will be ip of host you want to point to. 
AAAA record if host using ipv6 address
CNAME record for pointing a domain to another domain's location (double check this)
other records - do research

once you set an A record, all http requests to that domain to be sent to port 80 of that host by default (and https to 443)


nginx

master process handles interpreting the configuration file, and spawning/controlling the worker processes. the worker processes handle
http requests.

user nginx; user directive will specify the user the worker processes will start as. The master process user will be the user that started nginx service
from the terminal.
the worker_processes directive specifys number of worker processes that should be spawned - general rule is to have 1 worker process per CPU core


pid directive will be file that will have master process id written in

events section handles configuring network related mechanisms. the worker_connections directive specifies the max number of connections one 
worker process can/should handle.


http section deals with directives involved with the http connection.

include refers to file with directives to import

nginx -t tests if nginx config is proper or not

for server block, specify server_name which should be domain 'example.com' (_ means any domain), for location directive, specify where the files for 
the website will be.

server {
	server_name example.com;
	location / {
		root /var/www/example;
		index index.html;
	}
}
^ the above says - whenever any request comes to example.com on this nginx instance, serve the files specified in location 
you need to change ownership of served folder to user specified in the top directory because worker process needs permission to serve:
chown -R nginx.nginx /var/www/example/

you can have multiple server blocks specifying different domains with different locations (folders) to serve for each domain


mime - if you talk about the data that are stored in a web server - image, word docs, pdf, music, excel sheet, audio, video, etc...
content-type - informs the browser the content type so browser can open accordingly (use some plugin or do something specific)

the mime.types file in nginx maps the file extension to what it should send in the 'content-type' header of a response.
if a server can't determine which content-type to use from the mime.types file, then it will use as default - application/octet-stream
if a browser receives something with content-type application/octet-stream it will download the file instead of trying to process it through anything
in the mime.types file there are some extensions that are set to application/octet-stream like bin exe and iso. These are not meant to be opened by 
the browser anyway and are expected to be downloaded and opened with some other application or executed.

nginx as reverse-proxy 
reverse-proxy retreieves a resource on behalf of a client from one or more servers  
browser --> nginx <--> application server

advantages of reverse proxy
- it hides existence of the origin backend servers
- can protect the server from web-based attacks, DOS etc
- can provide great caching functionality
- can optimize content by compressing it
- can act as an SSL Terminating Proxy
- Request Routing - you can have multiple servers for different things and route appropriately - for example - example.com/app -> application server, 
example.com/picture -> media server and example.com/games -> gaming server, where you serve normal files from application server, images and video 
from the media server, and games from the gaming server.

proxy_pass directive forwards the request to the proxied servers specified along with this directive

location / {
	proxy_pass http://192.168.10.50;
}

more examples:
location /admin {
	proxy_pass http://192.168.10.50;
}

location /app {
	proxy_pass http://192.168.10.100/application; // will replace /app with /application when it gets to destination
}



docker

docker build -t <name> .
docker run -dp port:port <name> the command docker run by default starts in attached mode, so usualy you want -d for servers, or running processes
docker ps
docker stop <container-id>
docker rm <container-id>
docker rm -f <container-id> (stop and remove)
docker image ls
docker tag <source> <target> create a clone of another image with a new name
docker login -u <username>
docker push <image-name>
docker volume create todo-db
docker run -dp 3000:3000 --mount type=volume,src=todo-db,target=/etc/todos getting-started-docker


docker run -d ubuntu bash -c ""
docker exec <container-id> cat /data.txt  (doesn't work in windows git bash)
docker run -it ubuntu ls

attached mode allows STDOUT to show up in host terminal

docker start
docker start -a (start in attached mode) the command docker start by default starts in detached mode, so for apps that run once wiht no running process, need to add -a, and -i for STDIN
docker logs
docker attach <container-id>
docker rmi <image-id>
docker image prune -a 
docker image inspect
docker run --rm (remove when stopped)
docker run --name (name the container)
docker run -it (connect STDIN and create tty)
docker container prune


## vscode
keybindings.json -
{ "key": ".", "command": "" } // add this for npmintellisense + pathintellisense extensions - https://github.com/ChristianKohler/NpmIntellisense/issues/12

## regex crash course

. - matches any single character
^ - matches the start of a line
$ - matches the end of a line
[abc] - matches any character in the set
[^abc] - matches any character not in the set
[A-Z] - matches characters in a range
* - repeat previous expression 0 or more times
\ - escape meta-characters