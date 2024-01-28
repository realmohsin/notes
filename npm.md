npm
node package manager
- fetches packages from a registry, public or private
- organizes dependencies
- handles scripts, (lately not just a package manager, it offers way you can handle the execution of your programs)

- generates .lock files - locks working state of program
- handle versions, update packages
- install global packages
- assists in creating and publishing packages
- building security tools

npm init
npm view <package>
npm i <package>

if using a predetermined script name like 'start' or 'test', see others by pressing ctrl + space in scripts block of package.json, then you can write 'npm start/test/etc', if using custom name then have have to call like this 'npm run <custom-name>'

we can use && operator in script to run one thing after another.
what language are we using when writing npm scripts? looks like bash wrapped in an environment with extra variables in PATH from node_modules/.bin/.
while you can reference node_modules/.bin binaries by command, if you want to reference other scripts (like itself) from the scripts part of package.json, you can't do it by name instead have to start with npm.
ex: "build-all": "npm run build-browser && npm run build-node"

two ways to reuse or reference code - commonjs and ecmascript modules 
commonjs 
const uuid = require('uuid');
module.exports = {
  loadData,
};

ecmascript modules
import { v4 } from 'uuid';

By default, 'type' of npm project is set to commonjs, must set to 'module' to use es modules syntax, or use extension .mjs
(some packages are not updated to use es modules syntax?)
currently, es modules syntax is used for browser javascript pre bundle creation.
currently common js syntax is used for node javascript and files with commonjs in node javascript have extension .cjs

.mjs and .cjs need to explicitly set because an npm project can only have one type - module or commonjs (set in package.json). So if you want to use both types, file extensions must be named accordingly.

when you add a package, it can sometimes add something to the .bin directory of node_modules/, this gives you access to a script/command. This script/command can be run by referencing its name in an npm script. 

with scripts section of package.json, npm can directly call local code or code from an external package installed locally.

if wanting to execute in the browser, and your program has dependencies from node_modules, you can't just add your program to an html script tag and expect it to work because by default you can't have import statements in a script thats added to an html file and you can't have require either (it'll say require is not defined, because require only exists in the node global environment.) for the browser you need to bundle all dependencies with main script before adding to html, or attach separate script tag for each dependency before the script tag that has the main script. 

npm i <package> --save-dev for dev dependency

global packages - adding node package to PATH so that it can be run like a command
npm list -depth=1 to show graph of dependencies
npm list -g to show global dependencies
npm i <package> -g to install globally
npm root -g to see where global packages are installed

semver versioning
major:minor:patch
major for breaking changes, minor for new features without breaking, patch for bug fixes
default is ^ which means when ppl use 'npm i' to install all packages from a package.json, it will install the latest minor patch.

(need to look into semver some more)

npx - way to execute a command in node_modules/.bin/ directly instead of having to go through a package.json script. npx also allows you to execute any package from the internet and (if its not in hte local node_modules/.bin) it will install it in the npm cache instead of where it installs packages globally.   It's touted as a way to execute any package from the internet without having to install it locally or globally, but if it gets installed in the npm cache, what substantive difference is there from just installing it globally first? 
can use npm exec <package> instead of npx

peerDependency is treated as dependency - peer dependencies will be installed by npm. They are meant to signal plugins or a package that needs to be installed alongside another package and used actively alongside that package.

npm ci - clean install uses package-lock instead of package.json. npm i is not deterministic because package semver rules might cause installations of updated packages. (something to use to check for bugs?)

npm prune --production - removes devDependencies installed, might want to uninstall after pipeline to save resources

npm outdated - shows list of whether packages are outdated or not 
npm update - updates all packages to highest possible version specified by range
npm update --save - updates all packages and reflects that change in package.json.
 brings up question about package-lock.json and how that changes every time someone npm i's. 

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

to install a package to jsut one of the nested workspaces (called a filtered install)
npm i mocha -w packages/server 

(need more research into monorepos using npm)

when creating a package, export everything from index.js or whatever is 'main' entry file in package.json.

you can install a self-created or local package using:
- npm install <path-to-package> 
ex: npm install /home/alexhd/work/concise-logger

when using npm i, npm uses the default public npm registry, check:
- npm get registry

can use verdaccio to create own private registry
install verdaccio globally
- npm install --location=global verdaccio@6-next
Go to local hosted verdaccio server to see private registry
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

how git tags and npm versions work in relation to each other?  should it be a direct mapping?

to change a project to use typescript:
install typescript globally, then install as dev dependency in project
initialize typescript in project with tsconfig.json:
- tsc --init
after changing to typescript, in tsconfig.json, default is ts will compile to commonjs, this is not a bad idea even if you've been using esmodules because you can still use esmodules in the source .ts files, it'll just compile to commonjs, which does have more support in the wider world (at least for now). So if switching to ts, good idea to change package.json type option to : "type": "commonjs". You can use modern esmodule syntax in ts files but have everything compile to commonjs js files. 

you might need to install node types -
- npm i --save-dev @types/node
this will make it so typescript will recognize global objects like 'process'. 
@types/node is a package that contains type declarations in the form of files .d.ts which only include types and type declarations.
you can then compile with tsc, then run the compiled code with 'node dist/indexjs'
you might need to install @types/uuid for each package you install and import into ts files (take time to understand how exactly typescript find declaration files and uses them)

to create type declaration files for our package, add the following to tsconfig.json:
"declaration": true
tsc will now compile ts to js and also create .d.ts declaration files

change/add entries to package.json after adding typescript and creating type declaration files: 
"main": "dist/Logger.j" - should be set to output file from tsc compilation
"types": "dist/Logger.d.ts" - set types file for this package

if a package doe sn't ship its types, they might be available from the DefinitelyTyped project.
creating types helps with autocompletion and type errors when a package is installed and used from another package.

Use 'npm pack' to generate an archive that will contain our package. Use this to check what needs to be ignored in final package that will be published. Use .npmignore file to ignore development files, src folder, etc. then npm publish to create final package.

To check for vulnerabilities - things that can be exploited by bad actors:
- npm audit
Vulnerabilities can be fixed by updating packages

To fix vulnerabilities by updating dependencies of dependencies only: 
- npm audit fix
only package-lock.json will be updated

To fix all issues, including updating packages that might include breaking changes:
- npm audit fix --force

Highlighting an issue that may have been resolved:
there is an option "postinstall" in the scripts section (like test, start, etc). If this is defined, then it will run if anyone installs this package with npm i. This created an opening for attackers. If you accidentally make a typo like - npm i reacx - someone could've published a package named reacx that has a postinstall script that does all sorts of malicious things. If this ever becomes an issue again, use npm i <package> --ignore-scripts, or create .npmrc with ignore-scripts=true line. 

To check health of package and repo:
- npm doctor

when a package is for a private company or repository
set package.json entry "private": true

look into ts-node for executing ts projects

previously to load environment variables in a node program you would need to use dotenv, but now, in the latest versions of node, you can do this natively by specifying env file at program start:
- node --env-file=.env <file>
now you can access env variables from process.env.SECRET
To use this feature with ts-node, here's the trick: write a script first:
"start": "node -r ts-node/register --env-file=.env src/index.ts"

previously to run a program in watch mode (program restarts when its source code has been changed), we used nodemon package, but now its built into node:
- node --watch <file>

if npm init is run in a git repository, then a few extra fields will appear in the package.json file referencing the remote git repository.
