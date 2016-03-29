# es-deps-from-string

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> ECMAScript 2015+/CommonJS module dependencies array from string

This package handles es2015+ modules, and 'cause CommonJS won't go away anytime soon, it also
takes care of non-dynamic `require`s.

## Install

    npm install --save es-deps-from-string

## Usage

```js
import esDepsFromString from 'es-deps-from-string';

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

esDepsFromString(input); /* [
  'out', './local',
  'q', 'fs', './local-cjs', 'globalImport',
] */
```

## API

### esDepsFromString(input)

#### input

*Required*  
Type: `String`

Your JavaScript code.

## License

MIT © [Vladimir Starkov](https://iamstarkov@gmail.com)

[npm-url]: https://npmjs.org/package/es-deps-from-string
[npm-image]: https://img.shields.io/npm/v/es-deps-from-string.svg?style=flat-square

[travis-url]: https://travis-ci.org/iamstarkov/es-deps-from-string
[travis-image]: https://img.shields.io/travis/iamstarkov/es-deps-from-string.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/iamstarkov/es-deps-from-string
[coveralls-image]: https://img.shields.io/coveralls/iamstarkov/es-deps-from-string.svg?style=flat-square

[depstat-url]: https://david-dm.org/iamstarkov/es-deps-from-string
[depstat-image]: https://david-dm.org/iamstarkov/es-deps-from-string.svg?style=flat-square
