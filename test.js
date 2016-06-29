import test from 'ava';
import esDepsFromString from './index';

const input = `
// es2015+ modules
import out from 'out';
import local from './local';

console.log('modules');

// CommonJS modules
var qName = require('q');
var fsName = require('fs');
var localName = require('./local-cjs');
var n = 1;

require('yo' + 1); // dynamic requires wont work

require('globalImport');

console.log('cjs');`;

const shebangInput = `#!/usr/bin/env node

import "./file.js"`;

test('should esDepsFromString', t => {
  const actual = esDepsFromString(input);
  const expected = [
    'out', './local',
    'q', 'fs', './local-cjs', 'globalImport',
  ];
  t.deepEqual(actual, expected);
});

test('shebang', t => {
  const actual = esDepsFromString(shebangInput);
  const expected = ['./file.js'];
  t.deepEqual(actual, expected);
});

test('should throw on empty input', t => t.throws(() => { esDepsFromString(); }, TypeError));
test('should throw on invalid input', t => t.throws(() => { esDepsFromString(2); }, TypeError));
