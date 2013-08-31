
// Longest Common Subsequence
// @param A - sequence of atoms - String or Array
// @param B - sequence of atoms - String or Array
// @param equals - optional comparator of atoms - returns true or false,
//                 if not speicified, tripple equals operator is used
// @returns sequence of atoms, one of LCSs
var LCS = function (A, B, /* optional */ equals) {
  // Get the the point in Edit Graph, one of the LCS pathes goes through.
  // Ideally the point equally diveds [startA;endA] and [startB;endB] in two
  // parts each.
  // @param startA, endA - substring of A we are working on
  // @param startB, endB - substring of B we are working on
  // @returns Array - [midA, midB] - midpoints
  var midPoint = function (startA, endA, startB, endB) {};
};

