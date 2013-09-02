// import LCS if in node
if (typeof LCS === 'undefined')
  var LCS = require('./lcs.js');

// Diff sequence
// @param A - sequence of atoms - Array
// @param B - sequence of atoms - Array
// @param equals - optional comparator of atoms - returns true or false,
//                 if not specified, triple equals operator is used
// @returns Array - sequence of objects in a form of:
//   - operation: one of "none", "add", "delete"
//   - atom: the atom found in either A or B
// Applying operations from diff sequence you should be able to transform A to B
var diff = function (A, B, equals) {
  // We just compare atoms with default equals operator by default
  if (equals === undefined)
    equals = function (a, b) { return a === b; };

  var lcs = LCS(A, B, equals);
  var diff = [];
  var i = 0, j = 0;

  for (var k = 0; k < lcs.length; k++) {
    var atom = lcs[k];
    var ni = A.indexOf(atom, i);
    var nj = B.indexOf(atom, j);

    // XXX ES5 map
    // Delete unmatched atoms from A
    [].push.apply(diff, A.slice(i, ni).map(function (atom) {
      return { operation: "delete", atom: atom };
    }));

    // Add unmatched atoms from B
    [].push.apply(diff, B.slice(j, nj).map(function (atom) {
      return { operation: "add", atom: atom };
    }));

    // Add the atom found in both sequences
    diff.push({ operation: "none", atom: atom });

    i = ni + 1;
    j = nj + 1;
  }

  return diff;
};

// Exports
if (typeof module !== "undefined")
  module.exports = diff;

