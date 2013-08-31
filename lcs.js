// Refer to http://www.xmailserver.org/diff2.pdf

// Longest Common Subsequence
// @param A - sequence of atoms - String or Array
// @param B - sequence of atoms - String or Array
// @param equals - optional comparator of atoms - returns true or false,
//                 if not specified, triple equals operator is used
// @returns Array - sequence of atoms, one of LCSs, edit script from A to B
var LCS = function (A, B, /* optional */ equals) {
  // We just compare atoms with default equals operator by default
  if (equals === undefined)
    equals = function (a, b) { return a === b; };

  // Get the point in Edit Graph, one of the LCS paths goes through.
  // Ideally the point equally divides [startA;endA] and [startB;endB] in two
  // parts each.
  // @param startA, endA - substring of A we are working on
  // @param startB, endB - substring of B we are working on
  // @returns Array - [midA, midB, D, L] - midpoints, edit distance, LCS length
  var midPoint = function (startA, endA, startB, endB) {
    var N = endA - startA + 1;
    var M = endB - startB + 1;
    var Max = N + M;
    // Maps -Max .. 0 .. +Max, diagonal index to endpoints for furthest reaching
    // D-path on current iteration.
    var V = {};

    V[0] = 0;

    // Iterate over each possible length of edit script
    for (var D = 0; D <= Max; D++) {
      // Iterate over each diagonal
      for (var k = -D; k <= D; k += 2) {
        // Positions in sequences A and B of furthest going D-path on diagonal k.
        var x, y;

        // Choose from each diagonal we extend
        if (k === -D || (k !== D && V[k - 1] < V[k + 1])) {
          // Extending path one point down, that's why x doesn't change, y
          // increases implicitly
          x = V[k + 1];
        } else {
          // Extending path one point to the right, x increases
          x = V[k - 1] + 1;
        }

        // We can calculate the y out of x and diagonal index.
        y = x - k;

        // Try to extend the D-path with diagonal paths. Possible only if atoms
        // A_x match B_y
        while (x < N && y < M // if there are atoms to compare
               && equals(A[startA + x], B[startB + y])) {
          x++; y++;
        }

        // We can safely update diagonal k, since on every iteration we consider
        // only even or only odd diagonals and the result of one depends only on
        // diagonals of different iteration.
        V[k] = x;

        // If we reached the end point of edit graph, then we found an answer
        if (x === N && y === M)
          return [undefined, undefined, D, N + M - D]; // TODO: midpoint
      }
    }
  };

  // XXX temp
  return midPoint(0, A.length - 1, 0, B.length - 1);
};

