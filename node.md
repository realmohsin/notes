# Node

Nodejs is a cross platform JavaScript runtime environment. It runs the V8 JavaScript engine, the core of Google Chrome, outside the browser. 

NodeJs is very performant because of its non-blocking paradigms. Node runs in a single process, without creating a new thread for every request. Node's I/O primitives are asynchronous and so most JavaScript code in node is non-blocking. So it uses only one call stack with an event loop to handle concurrency. When node performs an I/O operation, like reading from the network, accessing a database or accessing the filesystem, instead of blocking the thread and wasting CPU cycles waiting, NodeJs will resume the operations when the response comes back, while using those CPU cycles on other things that might need to get done. Presumably other languages create a new thread (call stack) for I/O operations and then one thread waits for the other - which presumably is cumbersome and less performant compared to node. 


## NVM

Node Version Manager allows you to quickly install and use different versions of node via the command line. NVM is designed to be installed per-user and invoked per-shell. 

To install nvm, go to https://github.com/nvm-sh/nvm and run the install script by downloading with cURL. The script will download relevant files to ~/.nvm and add lines to the startup file ~/.bashrc. This is the script that runs for every bash shell invocation. It's where you put environment variables that you want available for every shell session. (Env variables are usually temporary to a shell session and associated processes UNLESS written to this bash startup file, in which case they will be available in every shell session.) The lines from the downloaded scrip add some environment variables and also runs another script initializing nvm for the bash session.

After installing nvm with curl:
- source ~/.bashrc
to have it apply to current session without having to restart it

To list all versions of node available for download:
- nvm list-remote

To install a version of node
- nvm install v20.11.0
- nvm install <alias>

To list installed versions of node (and some aliases)
- nvm list

To switch between installed versions of node
- nvm use lts/hydrogen


## Environment

The 'process' module of Node.js provides the env property which hosts all the environment variables that were set at the moment the process was started.

By convention, the NODE_ENV variable is used to set the environment type, such as development, testing, staging and production. While node itself does not change based on the NODE_ENV environment variable, a few libraries in the npm registy rely on it for making optimizations. In these libraries, certain performance optimizations will only take place in a production node process such as keeping logs to a minimum and using more caching.


Previously to load environment variables from a file in a node program you would need to use the dotenv library, but now, in the latest versions of node, you can load env variables by specifying an env file at program start:
- node --env-file=.env <file>
You can then access env variables from process.env.VARIABLE
To use this feature with ts-node, write a script first:
"start": "node -r ts-node/register --env-file=.env src/index.ts"

Previously to run a program in watch mode (program restarts when its source code has been changed), we used nodemon package, but now its built into node:
- node --watch <file>



## Node Scripts

To turn a simple node script into a command line executable:
- remove the .js extension if it has one
- add following shebang line to top of file: #!/usr/bin/env node
- change file permissions to allow execute - `chmod u+x app.js`
- place the file in a folder thats specified by PATH, or edit .bashrc to update PATH with a new folder that contains our script:
```bash
# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi
```



## Sending and Receiving Requests

To make http requests in node natively:
```js
https.get(url, res => {
        let data = '';

        res.on('data', chunk => {
                data += chunk;
        });

        res.on('end', () => {
                console.log(data);
        });
}).on('error', err => {
        console.log('Error: ' + err.message);
});
```

To make an http server with node natively:
```js
const http = require('http');

const hostname = '45.55.200.218'; // ip of current server
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```


## Node Process Management

pm2
- a process manager for Node.js applications. PM2 makes it possible to daemonize applications so that they will run in the background as a service.

install pm2:
- npm install pm2@latest -g
start pm2 to run node app in background, will auto restart if app crashes or is killed
- pm2 start <node-program>
to have pm2 launch the node app as a daemon on system startup:
- pm2 startup systemd
'pm2 startup systemd' will ask to run something similar to the following command:
- sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u <user> --hp /home/<user>

(If not setting up to start processes on boot, you can save the current process list with 'pm2 save' and restart them all at once with 'pm2 resurrect', as a shortcut for manually restarting every node process yourself. Not as important of a workflow as we probably want to just have thing run on startup. Actually, do you need to run pm2 save to specify which list of processes need to be set on startup? As precaution just run 'pm2 save' at the end of the above workflow.) 

Now you can use following commands to work with the newly created systemd unit, like you work wiht nginx:
- sudo systemctl start pm2-user
- sudo systemctl status pm2-user
- sudo systemctl restart pm2-user
- etc
If there's any error at this point, reboot the system with:
- sudo reboot
More commands (some do the same thing as above systemctl commands):
- pm2 stop <app_name_or_id>
- pm2 restart <app_name_or_id>
- pm2 list
- pm2 info <app_name>
To monitor processes:
- pm2 monit


## NPM

