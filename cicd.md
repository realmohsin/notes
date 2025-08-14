# CI/CD

Continuous Integration is a way for developers to use a shared repository. Every new integration must go through an automatic build step, that may include testing and linting, to make sure our project builds as expected, to make sure the code to be integrated is compatible with the rest of our codebase and to make sure the code to be integrated does not break anything.

Continuous Delivery is the process of putting small patches into production that pass end-to-end tests and are manually approved by a human.

Continuous Deployment is the process of automatically deploying new code to production it has passed end-to-end tests.


# Github Actions
what are github actions?
A workflow automation service by github, automate all kinds of repository-related processes and actions.
github actions most important in automatcing the processes involved in code deployment.
proper modern code deployment is achieved through CI/CD or continuous integration and continuous delivery.

continuous integration - code changes automatically built, tested and merged with existing code.
continuous delivery - publishing new versions of an app or package after new code integration

github actions can also help with automating code & repository management

workflows, jobs, steps 

You can add workflows to github repositories. Workflows include one or more jobs. Jobs contain one or more steps that will be executed in the order they are specified. 

workflows are triggered upon events - for example on manual trigger or when a commit is pushed to a certain branch.

jobs define a runner. a runner is the execution environment -  the machine and operating system that will be used for executing steps. These runners can be runners predefined by github or you can configure your own runners. 

Jobs run in parallel by default but can be configured to run in sequential order. You can also run conditional jobs.

A step can be a shell script or an Action. Actions are predefined scripts that perform a certain task. Can use custom or third-party actions.

A job must have at least one step. Steps are executed in sequential order. Steps can be conditional.

 
Events
workflow_dispatch - manually trigger workflow
repository_dispatch - REST Api request triggers workflow
schedule - workflow is scheduled
workflow_call - can be called by other workflows

Check documentation for full list of events and how to use them

Workflows don't execute in the repository context by default. You have to fetch the code.

Action - A custom application that performs a typically complex frequently repeated task. 
Alternative to Actions is using the 'run' command to execute shell command that's defined by you

There are actions created by the community and are open source that you can use. There are also actions created and maintained by github, like 'checkout' which is an action for checking out a repo. 

The ubuntu-latest runner has nodejs installed by default. 

Use 'needs' keyword in yaml for sequential jobs - to tell a job what other job needs to finish first.

You can access metadata that's passed into jobs and steps. This metadata is collectively named context. github actions creates some context data with various pieces of information about the event trigger, and the runner and other things that can be accessed from steps. You have to use an expression syntax - ${{}} to access context objects.

```yaml
name: Deployment Exercise 1
on: push
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Get Code
        uses: actions/checkout@v3
      - name: Install dependencies
        run: npm ci
      - name: Lint Code
        run: npm run lint
      - name: Test Code
        run: npm run test
      - name: Build Code
        run: npm run build
      - name: Deploy Code
        run: echo "Deploying..."
```

```yaml
name: Handle Issues
on: issues
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Output Event Details
        uses: echo "${{ toJson(github.event) }}"
```

Events have activity types and filters.
Activity types and filters provide more detailed control over when a workflow will be triggered.

Activity types are like subtypes of events.
Example of using activity type:
```yaml
name: Events Demo
on:
  pull_request:
    types: [opened, edited]
```
another way of specifying activity types
```yaml
name: Events Demo
on:
  pull_request:
    types:
      - opened
  workflow_dispatch:
```
If you need to to add two events, one with activity types specified and one not, you still need to have the colon on the one that doesn't specify, like above.

Example of Event filter
For the push event, you can filter by branch or tag
```yaml
name: Events Demo
on:
pull_request:
    types: [opened, edited]
    branches:
      - main # main
      - 'dev-*' # dev-new dev-this-is-new
      - 'feat/**' # feat/new feat/new/button
  push:
    branches:
      - main # main
      - 'dev-*' # dev-new dev-this-is-new
      - 'feat/**' # feat/new feat/new/button
```
A note about pull request event - By default, pull requests based on forks do not trigger a workflow.

Canceling & Skipping Workflow runs
canceling - by default, workflows get cancelled if jobs fail. by default, a job fails if at least one step fails, you can also cancel workflows manually. All this can be changed however.

skipping - For push and pull_request events you can do certain things to skip workflow runs. For push events, if you add [skip ci] to your commit message, github will not trigger the workflow.



## Job Artifacts & Output
```yaml
name: Deploy website
on:
  push:
    branches:
      - main
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Get Code
        uses: actions/checkout@v3
      - name: Cache Dependencies
        uses: actions/cache@v3 # how to cache npm packages across workflows 
          with:
            path: ~/.npm
            key: deps-node-modules-${{ hashFiles('**/package-lock.json') }}
      - name: Install Dependencies
        run: npm ci
      - name: Lint Code
        run: npm run lint
      - name: Test Code
        run: npm run test
  build:
    needs: test
    runs-on: ubuntu-latest
    outputs:
      script-file: ${{ steps.publish.outputs.script-file }} # set output of overall job from output of step with id publish
    steps:
      - name: Get Code
        uses: actions/checkout@v3
      - name: Cache Dependencies
        uses: actions/cache@v3 # how to cache npm packages across workflows 
          with:
            path: ~/.npm
            key: deps-node-modules-${{ hashFiles('**/package-lock.json') }}
      - name: Install Dependencies
        run: npm ci
      - name: Build Website
        run: npm run build
      - name: Publish JS Filename
        id: publish # for targeting the right step from the steps context object above
        run: find dist/assets/*.js -type f -execdir echo 'script-file={}' >> $GITHUB_OUTPUT ';'
      - name: Upload Artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist-files
          path: dist # what directories and files to store
          # path: |
          #   dist
          #   package.json
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Get Build Artifacts
        uses: actions/download-artifact@v3
        with: 
          name: dist-files
      - name: Output Contents
        run: ls # can check in console what directory we're in (should be in artifact directly
      - name: Output Filename
        run: echo "${{ needs.build.outputs.script-file }}"
      - name: Deploy
        run: echo "Deploying..."
```

Job Artifacts - Assets outputted by a job, for example app binary, website files etc. We can upload and save artifacts created by a job, which we can then download and use manually, we can also automatically download and use them in other jobs.

There is a broad variety of web hosting providers and most of them provide their own actions for uploading artifacts to them. 

Every job gets its own runner machine, the files that are produced in the build job will not exist in the deploy job. However a github provided action called actions/download-artifact@v3 can download artifacts uploaded by actions/upload-artifact@v3 in a previous job that is specified by 'needs'.

Job Outputs
Artifacts are files and folders, log files, app binaries. Jobs can also output simple values that can be used by another job, for example, the name of a file as a string. A job step can output a value by writing to $GITHUB_OUTPUT which is an environement variable that points to a filename managed by github actions. THe key-value pair written to the output file for the step can then be accessed by the job to build the job's overall output. 'steps' is a special context value like 'github' where the output of each step can be accessed.

Dependency Caching
Often times installing of the same dependencies happens across many workflows and jobs. You can use the github provided action - actions/cache@v3, to cache across workflows and jobs. You can make use of hte fact that npm uses caching itself by storing packages in ~/.npm. So you can have that location populated with packages before running every job. You have to provide a key that will tell Github actions when to bust the cache, which can be a hash of the package-lock.json file.


Environment Variables
You can define environment variables on the workflow level or on the job level with the 'env' keyword.

Example of Env variables being used:
```yaml
name: Deployment
on:
  push:
    branches:
      - main
      - dev
env: # setting environment variables on the workflow level
  MONGODB_DB_NAME: gha-demo
jobs:
  test:
    environment: testing # uses testing environment created in repository settings
    env:
      MONGODB_CLUSTER_ADDRESS: cluster0.15pwqcc.mongodb.net
      MONGODB_USERNAME: ${{ secrets.MONGODB_USERNAME }}
      MONGODB_PASSWORD: ${{ secrets.MONGODB_PASSWORD }}
      PORT: 8080
    runs-on: ubuntu-latest
    steps:
      - name: Get Code
        uses: actions/checkout@v3
      - name: Cache dependencies
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: npm-deps-${{ hashFiles('**/package-lock.json') }}
      - name: Install dependencies
        run: npm ci
      - name: Run server
        run: npm start & npx wait-on http://127.0.0.1:$PORT
      - name: Run tests
        run: npm test
      - name: Output information
        run:
          | # need to write below in new line for some reason, otherwise syntax error
          echo "MONGODB_USERNAME: ${{ env.MONGODB_USERNAME  }}"
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Output information
        run: | # only db name env variable will be available
          echo "MONGODB_USERNAME: ${{ env.MONGODB_USERNAME }}"
          echo "MONGODB_DB_NAME: ${{ env.MONGODB_DB_NAME }}"
```

In addition to env variables you can define, github actions provides some useful default env variables. These environment variable can, for example, give you quick access to the repository to which the workflow belongs, the name of the event that triggered the workflow and many other things.

To securely provide env variables without directly including them in the yaml, github actions provides options in the settings tab of a repository to store env variables as secrets.

There is also the concept of Repository Environments. You can organize secrets into environemnts. This way you can use one set of secrets for one workflow and a differeent set of secrets for another workflow. To refer to the right environment, use 'environment' key in yaml.

In settings for environment creation (which is just a set of key value pairs signifying environment variables), you can create protection rules that will stop certain workflows or jobs from executing, if it cant access the environment.

## Conditional Jobs and Steps
You can have conditional execution via 'if' field. You can ignore errors via 'continue-on-error' field. And you can evaluate conditions via expressions.

```yaml
name: Website Deployment
on:
  push:
    branches:
      - main
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - name: Get code
        uses: actions/checkout@v3
      - name: Cache dependencies
        id: cache
        uses: actions/cache@v3
        with:
          path: node_modules
          key: deps-node-modules-${{ hashFiles('**/package-lock.json') }}
      - name: Install dependencies
        if: steps.cache.outputs.cache-hit != 'true'
        run: npm ci
      - name: Lint code
        run: npm run lint
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Get code
        uses: actions/checkout@v3
      - name: Cache dependencies
        id: cache
        uses: actions/cache@v3
        with:
          path: node_modules
          key: deps-node-modules-${{ hashFiles('**/package-lock.json') }}
      - name: Install dependencies
        if: steps.cache.outputs.cache-hit != 'true'
        run: npm ci
      - name: Test code
        id: run-tests
        run: npm run test
      - name: Upload test report
        if: failure() && steps.run-tests.outcome == 'failure' # failure is required here
        uses: actions/upload-artifact@v3
        with:
          name: test-report
          path: test.json
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Get code
        uses: actions/checkout@v3
      - name: Cache dependencies
        id: cache
        uses: actions/cache@v3
        with:
          path: node_modules
          key: deps-node-modules-${{ hashFiles('**/package-lock.json') }}
      - name: Install dependencies
        if: steps.cache.outputs.cache-hit != 'true'
        run: npm ci
      - name: Build website
        id: build-website
        run: npm run build
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist-files
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Get build artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist-files
      - name: Output contents
        run: ls
      - name: Deploy
        run: echo "Deploying..."
  report:
    needs: [lint, deploy]
    if: failure()
    runs-on: ubuntu-latest
    steps:
      - name: Output information
        run: |
          echo "Something went wrong"
          echo "${{ github }}"

```

The if keyword is used to designate whether a step should run or not. Usually an expression needs to be wrapped in ${{}}, but there is an exception for the 'if' keyword.

Github Actions provides 4 special functions you can call in 'if' - 
failure() - returns true when any previous step or job failed
success() - returns true when none of the previous steps have failed
always() - causes the step to always execute, even when cancelled
cancelled() - returns true if the workflow has been cancelled
Using the above is required in 'if' so that github actions knows to override its default behavior of not running steps if a previous step has failed. 

Gotcha: If you're going to run a job or step if some other job or step has failed, you need to make sure it runs sequentially after the requisite job.

The 'continue-on-error' keyword can be used to continue running steps and jobs if current job or step fails.  However, it will treat a failed step or job as a success, and it will appear as successful in the  github dashboard until you dig in. steps.<step_id>.outcome will be the result before 'continue-on-error', and steps.<step_id>.conclusion will be after 'continue-on-error'. So if step with 'continue-on-error' fails, outcome will be 'failure', and conclusion will 'success'.
```yaml
- name: Test Code
  continue-on-error: true
  id: run-tests
  run: npm run test
```


## Matrix Jobs
The idea behind a matrix simply is you can run the same job with different configurations for example on different runners or different node version or any other values you might be interested in changing at the same time.
```yaml
name: Matrix Demo
on: push
jobs:
  build:
    continue-on-error: true
    strategy:
      matrix:
        node-version: [12, 14, 16]
        operating-system: [ubuntu-latest, windows-latest]
        include:
          - node-version: 18
            operating-system: ubuntu-latest
        exclude:
          - node-version: 12
            operating-system: windows-latest
    runs-on: ${{ matrix.operating-system }}
    steps:
      - name: Get code
        uses: actions/checkout@v3
      - name: Install NodeJs
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      - name: Install Dependencies
        run: npm ci
      - name: Build Project
        run: npm run build
```

matrix jobs will be run in parallel. Every unique combination of matrix values will cause a job run. If one matrix job fails, all other jobs are cancelled, to opt out of this default behavior use continue-on-error. Use 'include' and 'exclude' to add or exclude specific combinations.  

# reusuable workflow
You can call a workflow inside another workflow like a function. You do this wiht the 'workflow_call' event. Workflows with this event can be callable from other workflows. Then to call the workflow use the 'uses' keyword and specify the relative path to the workflow you want to call.
```yaml
name: Reusable Workflow
on: workflow_call # if no inputs required
```
```yaml
name: Reusable Workflow
on: 
  workflow_call:
    inputs:  # specify input parameters
      artifact-name:
        description: The name of the deployable artifact files
        required: false
        default: dist
        type: string
    secrets: # specify secrets to pass in
      some-secret:
        required: false
    outputs:
      result: 
        description: The result of the deployment operation
        value: ${{ jobs.deploy.outputs.outcome }}
jobs:
  deploy:
    outputs:
      outcome: ${{ steps.set-result.outputs.step-result }}
    runs: ubuntu-latest
    steps:
      - name: Get Code
        uses: actions/download-artifact@v3
        with:
          name: ${{ inputs.artifact-name }} # use the input
      - name: List Files
        run: ls
      - name: Ouput Information
        run: echo "Deploying & uploading..."
      - name: Set Result Output
        run: echo "step-result=success" >> $GITHUB_OUTPUT
```
```yaml
deploy:
  needs: build
  uses: ./.github/workflows/reusable.yml # reusable workflow
  with:
    artifact-name: dist-files # input value passed
  secrets: # for passing secrets (not needed for this job, showing example)
    some-secret: $${{ secrets.some-secret }}
print-deploy-result:
  needs: deploy
  runs-on: ubuntu-latest
  steps:
    - name: Print deploy output
      run: echo "${{ needs.deploy.outputs.result }}

```
You can pass inputs and secrets to a reusable workflow like a function, check above. You can also have an output that will be accessible to the calling workflow. 


# Jobs & Docker Containers
Docker Containers - Packages that container code + its execution environment, including os. Advantage is reproducible execution environment & results. 

you can run jobs on containers instead of the runners given by github actions, this allows you to have full control over environment & installed software.

When running jobs on containers, the containers will be running on the runners. The containerized job will be hosted by the runner.

You can also create Services: Utility containers used by your steps: (Example: Testing Database)

```yaml
jobs:
  test:
    environment: testing
    runs-on: ubuntu-latest
    container:
      image: node:16
      env: # environment variables needed by the image, if needed will be in documentation, (not your steps, which will be defined below)
    env:
      MONGODB_CLUSTER_ADDRESS: cluster0.15pwqcc.mongodb.net
      MONGODB_USERNAME: ${{ secrets.MONGODB_USERNAME }}
      MONGODB_PASSWORD: ${{ secrets.MONGODB_PASSWORD }}
      PORT: 8080
    steps:
```
To run job in container, use the 'container' keyword and specify an image that can be found and downloaded from dockerhub. If you want to use an image you created, you have to upload to dockerhub and can then specify.


Service container - runs inside a container (hosted by the runner) allowing you to have a service that's needed parallel to the job. Job steps can communicate with service containers (and services exposed by them). To use service containers, use the 'services' keyword to specify an image (service can't run on native runner) and any other configurations needed like env variables:
```yaml
jobs:
  test:
    environment: testing
    runs-on: ubuntu-latest
    container:
      image: node:16
      env: # environment variables needed by the image, if needed will be in documentation, (not your steps, which will be defined below)
    env:
      MONGODB_CONNECTION_PROTOCOL: mongodb_srv
      MONGODB_CLUSTER_ADDRESS: cluster0.15pwqcc.mongodb.net
      MONGODB_USERNAME: root
      MONGODB_PASSWORD: example
      PORT: 8080
    services:
      mongodb: # name up to you
        image: mongo
        env:
          MONGO_INITDB_ROOT_USERNAME: root  # mongo image needs this as per docs
          MONGO_INITDB_ROOT_PASSWORD: example  # mongo image needs this as per docs
    steps:
```
For communicating with service container - if the job is running in a container as well, then communication is simple and address of container can be specified as service name. But if job is not running on container, then address of service needs to specified as localhost:PORT where PORT is the port the docker container has created a connection to. 

For job running on container:
```yaml
jobs:
  test:
    environment: testing
    runs-on: ubuntu-latest
    container:
      image: node:16
      env: # environment variables needed by the image, if needed will be in documentation, (not your steps, which will be defined below)
    env:
      MONGODB_CONNECTION_PROTOCOL: mongodb
      MONGODB_CLUSTER_ADDRESS: mongodb # because job is running on node:16 image container, name of service will point to the container address (but why don't we have to specify port?)
      MONGODB_USERNAME: root
      MONGODB_PASSWORD: example
      PORT: 8080
    services:
      mongodb: # name up to you
        image: mongo
        env:
          MONGO_INITDB_ROOT_USERNAME: root  # mongo image needs this as per docs
          MONGO_INITDB_ROOT_PASSWORD: example  # mongo image needs this as per docs
    steps:

```
For job running on runner:
```yaml
jobs:
  test:
    environment: testing
    runs-on: ubuntu-latest
    env:
      MONGODB_CONNECTION_PROTOCOL: mongodb
      MONGODB_CLUSTER_ADDRESS: 127.0.0.1:27017 # because job running on runner, have to specify address of container and port to connect to
      MONGODB_USERNAME: root
      MONGODB_PASSWORD: example
      PORT: 8080
    services:
      mongodb: # name up to you
        image: mongo
        ports:
          - 27017:27017 # have to specify because job running on runner
        env:
          MONGO_INITDB_ROOT_USERNAME: root  # mongo image needs this as per docs
          MONGO_INITDB_ROOT_PASSWORD: example  # mongo image needs this as per docs
    steps:

```

## Custom Actions
Why custom actions? to simplify workflow steps - instead of writing multiple (possibly very complex) step definitios, you can build and use a single custom action. multiple steps can be grouped into a single custom action. No existing community action - existing, public actions might not solve the specific problem you have in your workflow. custom actions can contain any logic you need to solve your specific workflow problems.  

3 types of custom actions
- javascript actions - executes a javascript file, uses javascript (nodejs) + any packages of your choice, pretty straightforward if you know javascript
- docker actions - perform any task of your choice with any language, create a dockerfile with your required configuration
- composite actions - combine multiple workflow steps into a single action, combine run and uses, allows for reusing shared steps

Composite Actions
you can create composite actions that exist in the .github folder that can only be used locally. (To use across repositories, you need to create standalone actions, discussed later) Create the following in .github/actions/cached-deps: (file name must always be action.yml)
```yaml
name: 'Get & Cache Dependencies'
description: 'Get the dependencies (via npm) and cache them.'
inputs: # if you want your custom actions to take inputs
  caching:
    description: 'Whether to cache dependencies or not'
    required: false
    default: 'true'
 outputs:
  used-cache:
    description: 'Whether cache was used.'
    value: ${{ steps.install.outputs.cache }}
runs:
  using: 'composite'
  steps:
    - name: Cache dependencies
      if: inputs.caching == 'true'
      id: cache
      uses: actions/cache@v3
      with:
        path: node_modules
        key: deps-node-modules-${{ hashFiles('**/package-lock.json') }}
    - name: Install dependencies
      if: steps.cache.outputs.cache-hit != 'true' || inputs.caching != 'true'
      run: | 
        npm ci
        echo "cache='${{ inputs.caching }}'" >> $GITHUB_OUTPUT
      shell: bash # must specify in custom action if using 'run' 
```

How to use custom actions
```yaml
steps:
  - name: Get code # if using custom action defined in the code (.github folder) then obviously 'Get Code' cannot be part of custom action
    uses: actions/checkout@v3
  - name: Load & cache dependencies
    id: cache-deps
    uses: ./.github/actions/cached-deps # don't need to specify file because github actions will automatically look for file named action.yml, also this is relative to root folder of project so thats why it starts with './'
    with:
      caching: 'false'
  - name: Output Information
    run: echo "Cache used? ${{ steps.cache-deps.outputs.used-cache }}"
```

Just like community actions, you can set up your custom actions to take inputs and return an output. 


JavaScript Actions
also needs to be in a file named action.yml
```yaml
# .github/actions/deploy-s3-javascript/action.yml
name: 'Deploy to AWS S3'
descripton: 'Deploy a static website via AWS S3'
inputs:
  bucket:
    description: 'The S3 bucket name'
    required: true
  bucket-region:
    description: 'The region of the S3 bucket'
    required: false
    default: 'us-east-1'
  dist-folder:
    description: 'The folder containing the deployable files'
    required: true
outputs:
  website-url:
    description: 'The URL of the deployed website'
runs:
  using: 'node16'
  main: 'main.js'
```
```javascript
// .github/actions/deploy-s3-javascript/main.js
const core = require('@actions/core')
// const github = require('@actions/github') not need for this, but useful for tapping into github apis
const exec = require('@actions/exec')

function run() {
  const bucket = core.getInput('bucket', { required: true })
  const bucketRegion = core.getInput('bucket-region', { required: true })
  const distFolder = core.getInput('dist-folder', { required: true })

  const s3Uri = `s3://${bucket}`
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`) // executes command in runner, aws cli comes installed in ubuntu-latest runner

  const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`
  core.setOutput('website-url', websiteUrl);

  // core.notice('Hello from my custom JavaScript Action!'); // console log to runner
}

run();
```
```yaml
# using javascript custom action
steps:
  - name: Get Code
    uses: actions/checkout@v3
  - name: Get Build Artifacts
    uses: actions/download-artifact@v3
    with:
      name: dist-files
      path: ./dist
  - name: Output Contents
    run: ls
  - name: Deploy Site
    uses: ./.github/actions/deploy-s3-javascript # relative path to action.yml, can be docker action too (see below)
    env:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    with:
      bucket: gha-custom-action-hosting
      dist-folder: ./dist
      bucket-region: us-east-2
  - name: Output Information
    run: |
      echo "Live URL: ${{ steps.deploy.outputs.website-url }}"
```

For javascript custom actions, you have to specify a name of javascript file. Then you have to make the directory a npm project with `npm --init` and download the following packages 
`npm i @actions/core @actions/github @actions/exec`. Don't add a .gitignore as all the code for the javascript needs to be available. Also make sure the top level .gitignore does not affect anything here. The @actions/* packages allow you to interact with the runner environment, etc.

Note to remember - when defining custom actions locally in .github, you have to get the code into the runner first.



Docker Actions
You can specify a locally defined Dockerfile to run as an action. The Dockerfile can be set up to run, for example, a local python script.
```yaml
# action.yml
name: 'Deploy to AWS S3'
description: 'Deploy a static website via AWS S3.'
inputs:
  bucket:
    description: 'The S3 bucket name'
    required: true
  bucket-region:
    description: 'The region of the S3 bucket'
    required: false
    default: 'us-east-1'
  dist-folder:
    description: 'The folder containing the deployable files'
    required: true
outputs:
  website-url:
    description: 'The URL of the deployed website'
runs:
  using: 'docker'
  image: 'Dockerfile' # points to file in same folder named 'Dockerfile'
```
```dockerfile
FROM python:3

COPY requirements.txt /requirements.txt

RUN pip install -r requirements.txt

COPY deployment.py /deployment.py

CMD ["python", "/deployment.py"]
```


Github Actions takes the inputs to a custom docker action and makes them available as environment variables in the runner. The environment variables made available are named `INPUT_` + the name of the input. For example, if you have an input named `bucket`, the environment variable will be named `INPUT_BUCKET`. To set output, if the docker container will run python, use print('::set-output name=website-url::{website_url}') which will be picked up as step output. (There's also probably a github actions python package you can download to set output)


You can store your actions in separate repositories and share them with others. To use a custom action in another repository, reference the repository like this: my-account/my-action@v1. 
You can publish your custom action to the GitHub Marketplace to share it with others. 


# Security & Permissions
Three topics for Security Concerns
- script injection
  - A value, set outside a workflow, is used in a workflow
  - example: Issue title used in a workflow shell command
  - Workflow / command behavior could be changed
- malicious third-party actions
  - actions can perform any logic, including potentially malicious logic
  - example: a third-party action that reads and exports your secrets
  - only use trusted actions and inspect code of unknown / untrusted authors
- permission issues
  - consider avoiding overly permissive permissions
  - example: only allow checking out code (read-only)
  - github actions supports fine-grained permissions control


## Script Injection
To avoid script injection attacks, don't set variables to user input within a script or command. One workaround would be to use the 'env' keyword in the workflow file to set user input to environment variables, and then use those environment variables in the script, instead of using user input directly in the script.

## Malicious Third-Party Actions
Only use trusted actions by verified creators.

## Permissions
You can add the 'permissions' key to a job or workflow to limit the permissions that the job has. 
```yaml
jobs:
  assign-label:
    permissions:
      issues: write
```

There is a special GITHUB_TOKEN secret that is available to all workflows, even though you don't have to define it. It is so you can send it to the GitHub API in HTTP requests to perform actions from a runner. 
```yaml
run: |
  curl -X POST \
  --url https://api.github.com/repos/${{ github.repository }}/issues/${{ github.event.issue.number }}/labels \
  -H "Authorization: token ${{ secrets.GITHUB_TOKEN }}" \
  -H "Content-Type: application/json" \
```
Prmissions are actually encoded into the GITHUB_TOKEN. 

Under the hood, many actions from marketplace use GITHUB_TOKEN.

By default, if you don't set permissions, you have read and write access to (almost) all resources. To change default to read only, you can change option in repository settings.
Repository settings also has options for limiting workflows from creating and approving pull requests and what types of actions are allowed.

## Third-Party Permissions & OpenID Connect
In previous examples, we used an AWS access key ID and secret access key to authenticate with AWS. This might not be the best practice always, as there is some surface area for secret exposure, and unnessary permissions. 

You can use OpenID Connect to authenticate with AWS. You have to create an IAM user and select OpenID Connect. Then provide the id from github, and you'll have an OpenID identity that is connected to a IAM user, which you can then use to set roles and policies as you would in AWS. You'll then request permissions from AWS using a custom action from AWS.

(Not sure why the secret access key method is not the same here. Am i not using the access key of the IAM user? or is it that IAM users don't have access keys, only root users do? )

```yaml
jobs: 
  deploy:
    permissions:
      id-token: write # need this as by default its read only, and its needed for aws-actions/configure-aws-credentials, (id-token refers to secrets.GITHUB_TOKEN, i think, which is what you need to set in https requests to github api. double check this)
      contents: read
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Get Code
        uses: actions/checkout@v3
      - name: Get Build Artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist-files
          path: ./dist
      - name: Output Contents
        run: ls
      - name: Get AWS Credentials
        uses: aws-actions/configure-aws-credentials
        with:
          role-to-assume: arn:aws:iam::123456789012:role/MyGitHubRole # get arn from AWS dashboard
          aws-region: us-east-1
      - name: Deploy to S3
        id: deploy
        uses: ./github/actions/deploy-s3-docker
        with:
          bucket: my-bucket
          dist-folder: ./dist
      - name: Output Information
        run: echo "Live URL: ${{ steps.deploy.outputs.website-url }}"
```