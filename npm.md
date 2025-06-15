# npm

NPM, or Node Package Manager does 3 main things for you:
- fetches packages from a registry, public or private
- organizes dependencies
- handles scripts, (lately not just a package manager, it offers ways to handle the execution of your programs)

NPM also does the following: 
- generates .lock files - locks working state of program
- handles versions, updates packages
- installs global packages
- assists in creating and publishing packages
- assists with security tools

To set directory as a node project and create a package.json file - 
- npm init

To know more about a package (before or after installing) -
- npm view <package> 

To install a package
- npm install <package> or npm i <package>

To install a package as a development dependency
- npm install --save-dev <package> or npm i -D <package>

To install a package globally, adding its location to PATH env variable, so package can be run like a command - 
- npm install -g <package>

To show graph of dependencies in project - 
- npm list -depth=1

To show list of global packages - 
- npm list -g 

To see where global packages are installed - 
- npm root -g 

To uninstall a local and global package - 
- npm uninstall <package>
- npm uninstall -g <package>

To use package-lock.json to create node_modules/ -
- npm ci

To only install normal dependencies and omit dev dependencies
- npm i --omit=dev

To remove installed devDependencies
- npm prune --production 

To show which packages are outdated - 
- npm outdated

To update packages to highest possible version specified by range (for ^ its latest minor version) - 
- npm update --save
The --save flag also updates package.json, not just node_modules/ and package-lock.json.



After installing a package, you'll have node_modules/ folder, package-lock.json and package.json - the three main elements of a node project.


# NPM Scripts

If using a predetermined script name like 'start' or 'test', (see full list of predetermined script names by pressing ctrl + space in scripts block of package.json) then you can run it like - `npm start` or `npm test`.  If using custom script name, then you have to use the 'run' argument - `npm run <custom-name>`. 

We can use && operator in script to run one thing after another. (To run things concurrently we need a specific npm package.)

What language are we using when writing npm scripts? Looks like bash wrapped in an environment with extra folder designated in PATH - node_modules/.bin/.
Answer: (Assumption is more or less correct.) NPM scripts are basically small bash scripts with access to executables in node_modules/.bin/. (You can use commands like pwd, ls, etc.)

While you can reference node_modules/.bin binaries by command, if you want to reference other scripts, you need to specify `npm run <script>` within the script.
ex: "build-all": "npm run build-browser && npm run build-node"


Two ways to bring in packages or other files - CommonJS and ECMAscript Modules 
CommonJS 
const uuid = require('uuid');
module.exports = {
  loadData,
};

ECMAscript Modules
import { v4 } from 'uuid';
export default v4


By default, the module 'type' of an npm project is set to 'commonjs' (CommonJS). To use ES Module syntax, it should be set to 'module'.

To use both syntaxes within one project, set the extension of commonjs files to .cjs and the extension of ES module files to .mjs.   

When you add a package, it can sometimes add something to the .bin directory of node_modules/. This gives you access to an executable command. This command can be run by referencing it in an npm script. 


# Note about creating script for html 
If wanting to execute in the browser, and your program has dependencies from node_modules, you can't just add your program to an html script tag and expect it to work because by default you can't have import statements in a script thats added to an html file and you can't have require either (it'll say require is not defined, because require only exists in the node global environment.) Basically, you can't use commonjs or es modules for the browser. For the browser you need to bundle all dependencies with main script before adding to html, or attach separate script tags for each dependency and order them correctly. 


## Semver Versioning

major:minor:patch
major for breaking changes, minor for new features that don't break existing code, patch for bug fixes
default is ^ which means when ppl use 'npm i' to install all packages from a package.json, it will install the latest minor patch.


## npx
npx allows a way to execute a command from node_modules/.bin/ directly instead of having to go through an npm script. npx also allows you to execute any package from the internet and (if its not in the local node_modules/.bin) it will install it in the npm cache instead of where it installs packages globally.   It's a way to execute any package from the internet without having to install it locally or globally. (The install messsage will still appear, but it gets installed in the npm cache, which will get cleared or can be manually cleared.)

## peer dependency
Peer dependencies refer to plugins or packages that should be installed alongside the referenced package. Since npm v7, peerDependencies are treated as dependencies - they will be installed by npm automatically.


## package-lock.json

npm i is not deterministic because package semver rules (like the default ^) might cause installations of updated packages. This means contributers can have different package-lock.json files despite having the same package.json file. This means some random commit from a contributor might have an updated package-lock.json file, if they recently did `npm i`.  What should happen here? Should they commit the new package-lock.json file? If so, should other contributors do `npm i` when they get new package-lock.json file? When you `git pull` and there is a new package-lock.json, are you alerted in anyway to update your node_modules/? 

I believe the answer to above question is that - yes, you should update node_modules when you get a new package-lock.json. How would you know though?

Because `npm i` is not deterministic, in CI/CD and for sure in production, we should use `npm ci`. This is because if a package gets updated between the last test being successful and `npm i` running on the production server, then the production server will install an updated dependency that wasn't part of last commit or test.


## npm workspaces

npm workspaces - allows monorepos (a folder structure where multiple projects reside together and share the same package repository (node_modules folder) but have their own package.json's)

can create workspace during npm init with:
npm init -y -w packages/server -w packages/client
will create two folders, server and client, in a packages folder in the root where each is a separate workspace
will create following in package.json:
"workspaces": [
  "packages/server",
  "packages/client"
]

workspaces can treat other workspaces as packages and list them as dependency in dependencies section of package.json. (there will be bug where if there is name clash, npm will think its from npm registry when hovered over)

from root can call scripts in nested workspaces:
npm test -w packages/client

to install a package to just one of the nested workspaces (called a filtered install)
npm i mocha -w packages/server 


## creating npm packages

when creating a package, you should export everything from index.js or whatever is 'main' entry file in package.json.  A lot of packages will have all the logic in other files and just use index.js to import and re export from. 

you can install a self-created local package using:
- npm install <path-to-package> 
ex: npm install /home/alexhd/work/concise-logger
note: to easily get path of a file or directory, you can right click a file and click 'copy path' from options.

when using npm i, npm uses the default public npm registry, check:
- npm get registry

can use verdaccio to create own private registry that can be hosted like any web project gets hosted.
install verdaccio globally
- npm install --location=global verdaccio@6-next
Go to locally hosted verdaccio server to see private registry (localhost:...)
create user on this registry
can check user with:
- npm whoami --registry http://localhost:4873/
go to folder of package, then publish:
- npm publish --registry http://localhost:4873/
if you are logged in, you can now use npm i to download published package in another repository
have to specify private registry because default will always be npm's public repository
- npm i <package> --registry http://localhost:4873/

you can set registry config to private registry so you can call npm publish without specifying registry:
this will create a .npmrc file with this variable set
- npm set registry http://localhost:4873/
Then you can npm publish (after increasing package version in package.json) without specifying private registry in command:
- npm publish

Notes: You can log in as a user relative to a npm registry. So there is registry management in npm and user login functionalities. Makes sense as these would be needed to publish packages. It seems registry management in npm happens without specifying a main registry. The main npmjs.com repository will always be default. ANd if you want to use a private registry you have to always specify with command line flags and/or with .npmrc file. This makes it so when you use naked npm commands in other projects, it will assume the regular npmjs.com repository. This is unlike git remotes, where you have to specify the remote you're pushing to and change back explicitly or else git push will always push to the last remote you specified as main. 

how git tags and npm versions work in relation to each other?  should it be a direct mapping? Probably yes

Use 'npm pack' to generate an archive that will contain our package. Use this to check what needs to be ignored in final package that will be published. Use .npmignore file to ignore development files, src folder, etc. then npm publish to create final package.


## typescript in npm project

to change a project to use typescript:
install typescript globally, then install as dev dependency in project
initialize typescript in project with tsconfig.json:
- tsc --init
after changing to typescript, in tsconfig.json, default is ts will compile to commonjs, this is not a bad idea even if you've been using esmodules because you can still use esmodules in the source .ts files, it'll just compile to commonjs, which does have more support in the wider world (at least for now). So if switching to ts, good idea to change package.json type option to : "type": "commonjs". You can use modern esmodule syntax in ts files but have everything compile to commonjs js files. 

you might need to install node types -
- npm i --save-dev @types/node
this will make it so typescript will recognize global objects like 'process'. 
@types/node is a package that contains type declarations in the form of files .d.ts which only include types and type declarations.
you can then compile with tsc, then run the compiled code with 'node dist/index.js'
you might need to install @types/uuid for each package you install (take time to understand how exactly typescript finds declaration files and uses them)

to create type declaration files for our package, add the following to tsconfig.json:
"declaration": true
tsc will now compile ts to js and also create .d.ts declaration files

change/add entries to package.json after adding typescript and creating type declaration files: 
"main": "dist/Logger.js" - should be set to output file from tsc compilation
"types": "dist/Logger.d.ts" - set types file for this package

if a package doesn't ship its types, they might be available from the DefinitelyTyped project.
creating types helps with autocompletion and type errors when a package is installed and used from another package.

look into ts-node for executing ts projects without having to compile first (update: tsx is better)

previously to load environment variables in a node program you would need to use dotenv, but now, in the latest versions of node, you can do this natively by specifying env file at program start:
- node --env-file=.env <file>
now you can access env variables from process.env.SECRET
To use this feature with ts-node, here's the trick: write a script first:
"start": "node -r ts-node/register --env-file=.env src/index.ts" 
update: tsx is better, find equivalent solution when needed


## npm security

To check for vulnerabilities - things that can be exploited by bad actors:
- npm audit
Vulnerabilities (CVE's) can be fixed by updating packages

To fix vulnerabilities by updating dependencies of dependencies only: 
- npm audit fix
only package-lock.json will be updated

To fix all issues, including updating packages that might include breaking changes:
- npm audit fix --force
This will updated package.json and also update major versions as well.

postinstall hack -
there is an option "postinstall" in the scripts section (like test, start, etc). If this is defined, then it will run if anyone installs this package with npm i. This created an opening for attackers. If you accidentally make a typo like - npm i reacx - someone could've published a package named reacx that has a postinstall script that runs malicious code. Currently postinstall for third-party packages is disabled. However if it is not disabled or has been re-enabled, use npm i <package> --ignore-scripts, or create .npmrc with ignore-scripts=true line when dealing with potentially malicious packages.

In the above, the attack described is called 'typosquatting', where malicious packages are published with the hope that someone installs them accidentally.

To check health of package and repo:
- npm doctor

when a package is for a private company or repository
set package.json entry "private": true


## misc

previously to run a program in watch mode (program restarts when its source code has been changed), we used nodemon package, but now its built into node:
- node --watch <file>

if npm init is run in a git repository, then a few extra fields will appear in the package.json file referencing the remote git repository.

you can install npm packages from git repository directly. example:
npm i https://github.com/lodash/lodash
it will result in package.json entry:
"dependencies": {
  "lodash": "github:lodash/lodash"
}

npkill is a package that can be used to delete packages (cached or installed) that are taking too much space on your computer.