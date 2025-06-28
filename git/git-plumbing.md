take stdin, hash it (to create filename), then write it to object database
- echo 'test content' | git hash-object -w --stdin
 
find and print all files in .git/objects
- find .git/objects -type f
 
figure out the type (blob, tree or object) then print it appropriately
- git cat-file -p <hash>

hash and write specified file to object database
- git hash-object -w test.txt

tells you object type of an object in git
- git cat-file -t <hash>

Artifically add blob from object database to index
- git update-index --add --cacheinfo 100644 <blob-hash> <fileName>

Add file(blob) in directory to index
- git update-index --add <file-in-directory>

Read an existing tree into the index, and give it name
- git read-tree --prefix=<tree-name> <tree-hash>
 
Write the staging area out to a tree
- git write-tree

Create commit object by specifying tree (tree that represents top level directory)
and (unless its the first commit) previous commit
- echo 'First commit' | git commit-tree <tree-hash> 
- echo 'First commit' | git commit-tree <tree-hash> -p <previous-commit-hash>

Log the git history based on commit given
- git log --stat <last-commit-hash>



if the contents of a blob are the same as an existing blob, a new blob does not get saved, because itll have the same hash.

// what we did so far by the end of tree section of git internals - 
- we hashed and saved version one of test.txt
- we hashed and saved version two of test.txt
- we added version 1 of test.txt to index and wrote out a tree
- we added version 2 of test.txt and a new file new.txt to index and wrote out a tree
- we then added the first tree to the the contents of the second tree (already in index) and wrote out a third tree

Object Packages
object packages (*.pack) & index files(*.idx)
  .git/objects/pack
  git gc (Garbage Collection)

git objects are packed into package files to save space. Usually happens when garbage collection occurs. You can trigger garbage collection with `git gc`

git rev-list - lists commits with only hashcodes (for use in scripts)