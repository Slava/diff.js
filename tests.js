var assert = require('assert');

var LCS = require('./lcs.js');

suite('Simple cases for correct length of LCS', function () {
  function t(a, b, r) {
    assert.equal(LCS(a, b), r);
  };
  test('Manual tests', function () {
    t('abcabba', 'cbabac', 4);
    t('qqq123ag', 'zqoagq2a', 4);
    t('zzzz', 'aaaaaaaa', 0);
  });
});
