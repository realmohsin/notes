The less command displays the contents of a file, one page at a time. It's a program for viewing a file, rather than editing - it's like a text editor without the editing. (nano would be what you want to use to edit.) We can navigate forwards and backwards thorugh the file, which is especially useful with very large files. `less somefile.txt` will display the contents of somefile.txt using less. This is the same interactive program that is used to open `man` pages.

Pressing h while in less will open up another less's summary documentation (using less!).

When viewing a file using the less program...

* press space or f to go to the next page of the file
* press b to go back to the previous page
* press Enter or Down arrow to scroll by one line
* to search forward, type forward slash / followed by a pattern
* to search backward, type ? followed by a pattern
* press q to quit