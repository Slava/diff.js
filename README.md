diff.js
=======

Overview
--------

> `diff` is a file comparison utility that outputs the differences between two
> files. It is typically used to show the changes between one version of a file
> and a former version of the same file. Diff displays the changes made per line
> for text files. Modern implementations also support binary files. The output
> is called a "diff", or a patch, since the output can be applied with the Unix
> program patch. The output of similar file comparison utilities are also called
> a "diff"; like the use of the word "grep" for describing the act of searching,
> the word diff is used in jargon as a verb for calculating any difference.
> -- <cite>[Wikipedia][0]</cite>

JavaScript implementation of reasonably fast `diff` algorithm. [Paper of Eugene
W. Mayers][1] was used a reference during implementation.

First version of algorithm will run in O(N+D^2) time complexity in general
cases, where D is the length of difference and N is the length of input. The
goal is to implement general-case fast algorithm with linear memory space usage.

The main application is comparing of text files, presumably source codes. But
the interface will be written in a very extensible way, so this implementation
would be easily applied to any comparable sequences.

Default behavior is comparison by lines, with extensibility these will be available:

- Comparison of texts, line by line
- Comparison of strings character by character
- Comparison of written plain text, word by word, sentence by sentence, etc
- Comparison of source code lexeme by lexeme
- ???
- PROFIT!!!

Eventual implementation would be running in linear space and O(NlgN+D^2) worst
time complexity using suffix tries. (At least I want to, I studied suffix tries
but never applied them).

MIT Licensed, Vyacheslav Kim.

[0]: http://en.wikipedia.org/wiki/Diff
[1]: http://www.xmailserver.org/diff2.pdf

Testing
-------

You will need mocha.

```
npm install mocha
./run_tests.sh
```

