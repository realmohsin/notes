Nano is a simple text editor that we can access right from the terminal. It's far more accessible than other popular command-line editors like vim and emacs.

Nano includes all the basic text editing functionality you would expect: search, spellcheck, syntax highlighting, etc.

The other two popular alternatives are vim and emacs.

To open up a file using nano, run `nano <file>`. For example, to open up the file book.txt using nano, we would run `nano book.txt` We can also use the same command to edit a file that doesn't yet exist ( we can then save it and create the file). To save in nano use ctrl+o (the Write Out option). You can also save using ctrl+s, even though that option does not appear at the bottom command options on the nano screen.

ctrl+g shows all the options available in nano. ^ refers to ctrl key and M refers to alt or esc key in Windows.

To have lines wrap in nano, use alt+shift+4 (Double check in list of options with ctrl+g)

Use ctrl+w and then enter a search phrase to search FORWARD in the file from your current cursor location. To search backwards use alt+b or esc+b

To replace use ctrl+\ and then enter the word you want to replace. Then enter the replacement and decide whether to replace specific matches or all matches.

WE can use spellchecking inside of nano, but we have to enable it first in the Nano config file located at /etc/nanorc




ctrl+g to open and close help docs
alt+shift+4 for enabling/disabling soft wrapping (to read things easily)
ctrl+\ to start replace a word process

