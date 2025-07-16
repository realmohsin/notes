nginx can function as a webserver, a reverse proxy, load balancer and more..

nginx as reverse-proxy
reverse-proxy retreieves a resource on behalf of a client from one or more servers  
browser --> nginx <--> application server

make sure apache2 is not running

contexts & directives make up the nginx.conf file

minimum nginx.conf to serve folder with nginx:
http {
  types {
    text/css css;
    text/html html;
  }
  // or
  include mime.types;

  server {
    listen 80;
    root /sites/site1;
    // index index.html;
  }
}

events {}

remember that firewall will block all ports except whats open, so you can't listen on a different port without configuring firewall.

nginx.conf specifies a custom user, but unclear how important it is

the directory specified by root directive in server block must have correct owner and permissions, (if user is specified then that user must own it and if no user then root must own it?) root directive was set to directory created in the root of linux directory ex: /sites/site1

mime.types includes types block that is needed to map file extensions to http's Content-Type header (apparently wrong content-type header leads to browser not handling files properly)

location - used to map routes to files. and used to decide how to process the request URI (the part of the request that comes after the domain name or IP address/port)
examples:
location /vegetables {
root /sites/site1;
}
will map /sites/site1/vegatables to the index.html file in that folder

location /carbs {
alias /sites/site1/fruits;
}
will map /sites/site1/carbs to index.html in /fruits directory

location /waterworks {
root /sites/site1;
try_files /waterworks/waters.html /index.html =404;
}
try /sites/site1/waterworks/waters.html, if it doesn't exist try the root - /sites/site1/index.html, and if that doesn't exist return 404.

- can use regex in location for dynamic matching

for redirecting:
location /crops {
return 307 /fruits
}
will return http code 307 and redirect to /fruits

steps:

- sudo apt update
- sudo apt install nginx
  (remove apache2 if its installed - sudo apt purge apache2, sudo apt autoremove)
- sudo ufw app list, sudo ufw allow 'Nginx HTTP', sudo ufw status
- sudo systemctl status nginx, sudo systemctl start/stop/restart/reload/disable/enable nginx
- check by getting ip - curl -4 icanhazip.com, then going to browser and making get request
- default folder for nginx config files is /etc/nginx/, cd here
- add server blocks to sites-available/
- create folder to serve in /var/www (default) and specify in server block
- create symlinks in sites-enabled/ to all the server blocks you want enabled from sites-available/

A server block is a subset of Nginx’s configuration that defines a virtual server used to handle requests of a defined type. Administrators often configure multiple server blocks and decide which block should handle which connection based on the requested domain name, port, and IP address. This allows nginx to be used to serve multiple different sites from the same server (which is called Virtual Hosting), since listen + server_name directives are used to determine which server block will process which request. if two server blocks have the same listen directive specificity then nginx will check the server_name and match it against the Host header (domain name).

how to create a symlink -
sudo ln -s /etc/nginx/sites-available/realmohsin.io /etc/nginx/sites-enabled/

To prevent hash bucket memory problem from adding additional server names, add below directive to http context:
server_names_hash_bucket_size 64

adding https:
certbot gives free ssl certificates to domains that need https
certbot recommends snap package for installation.
after installation and getting certificate certobt adds a systemd timer to run twice a day to auto renew any certificate that's within 30 days of expiration.
Steps for each domain + its www subdomain

1. make sure snapd core is up to date
- sudo snap install core; sudo snap refresh core
2. remove any manually installed certbot installs, so command will use snap version
- sudo apt remove certbot
3. install the certbot snap package
- sudo snap install --classic certbot
4. add to path
- sudo ln -s /snap/bin/certbot /usr/bin/certbot
5. make sure nginx server blocks have server_name directive set to domain and www.domain
6. allow https through ufw firewall
- sudo ufw status, sudo ufw allow 'Nginx Full', sudo ufw delete allow 'Nginx HTTP', sudo ufw status
7. run certbot for domains
- sudo certbot --nginx -d example.com -d www.example.com
8. check server blocks to see what certbot wrote
9. check status of auto renewal timer
- sudo systemctl status snap.certbot.renew.service
10. test renewal process
- sudo certbot renew --dry-run

Look at what certbot added to server blocks to see how to redirect http traffic to https in nginx (in case you need to do it manually ever, or need to know how to manually redirect something)

summary
- start by mapping port 80 and port 443 requests to go to nginx - set up two server blocks for each port (the server block for port 80 should just 301 redirect to back to port 443, certbot will write the config for you)
- if you use root directive to point to a folder, you are using nginx's built in server,
- in each server block you need to define location blocks to map the rest of the url to either:
  - folders (nginx web server will handle) or
  - to other ports/machines (in which case you are using nginx as reverse proxy)

To use nginx's built in web server, set location block's try_files value to $uri to point back to root directory to use that will have the files you want to serve, html docs, css, etc

example of server block for simple static file serving with nginx's web server:
server {
server_name realmohsin.io www.realmohsin.io;

        root /var/www/realmohsin.io;
        index index.html;

        location / {
                try_files $uri $uri/ =404;
        }

}

example of reverse proxy to port 3000:
server {
server_name realmohsin.io www.realmohsin.io;
location / {
proxy_pass http://45.55.200.218:3000;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade;
}
}

reverse-proxy - a server positioned in front of web services/servers
benefits of reverse proxy:

- clients never directly interact with the origin server, which eliminates certain vectors of attack.
- caching can be implemented on the reverse-proxy which will lower the load on the main web server
- reverse proxy can load balance by distributing requests across multiple web servers
- can be in charge of ssl encryption and 301 redirecting http requests to https so that the main server does not have to deal with that load
- monitoring can be set up on the reverse proxy


'upstream' server refers to servers behind nginx.
