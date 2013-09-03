#!/usr/bin/env node

var diff = require('./diff.js');
var fs = require('fs');
var Fiber = require('fibers');
var Future = require('fibers/future');

var main = function () {
  var argv = require('optimist').argv._;
  if (argv.length !== 2) {
    console.log('Usage: diff_cli.js <fileA> <fileB>');
    process.exit(1);
  }

  var textA = readFile(argv[0]).split('\n');
  var textB = readFile(argv[1]).split('\n');

  var diffText = diff(
    textB, textA
  ).map(function (o) {
    return (o.operation === "none" ? " " :
            o.operation === "add"  ? "+" :
                                     "-") + " " + o.atom;
  }).join('\n');

  console.log(diffText);
};

var readFile = function (path) {
  return Future.wrap(fs.readFile)(path, { encoding: 'utf8' }).wait();
};

Fiber(main).run();

