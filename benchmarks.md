The implemented algorithm is expected to run fast on small changes and is
quadratic in the worst case.

Benchmarks
----------

Let's begin with bad performance. Let's compare jquery-1.10.2.js and
jquery-1.2.js line by line. Both are development, not minified versions, 9K and
2.5K lines correspondingly. They appear to be almost completely different.

UNIX `diff` compares files in less then 10 milliseconds. Needless to mention,
node.js needs double of this time just to read from disk. Current `diff.js`
finishes in a minute and 12 seconds. Very sad, it might be improved though.

The UNIX version uses the TOO_EXPENSIVE heuristic on large inputs, switching to
approximation algorithm in case of obviously slow performance, producing not the
ideal but good enough output.

So there is an obvious room for improvements:

- Finish speed refinements utilizing suffix tree.
- Add approximation algorithm fallback on big inputs.
- We don't really need the linear memory refinement most of the time, but
  asymptotic grows by logarithm of input size.
- JS's hash type is not the best linear data structure for sure, it's quite
  unlikely to be optimized by V8 the same way the linear array will be optimized
  in C, we can do better.
- Looking at the one of C implementations, it heavily utilizes static linear
  buffers and preprocessor macros, in-lining a lot of things.
- Use asm.js?

What about smaller changes?

[0]: http://www.ioplex.com/~miallen/libmba/dl/src/diff.c

