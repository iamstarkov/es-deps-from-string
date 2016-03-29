import { parse as _parse } from 'acorn';
import { simple } from 'acorn/dist/walk';
import R from 'ramda';

// contract :: String -> Constructor -> a
const contract = R.curry((name, ctor, param) => R.unless(
  R.is(ctor),
  () => { throw new TypeError(`\`${name}\` should be \`${R.type(ctor())}\`, but got \`${R.type(param)}\``); }
)(param));

const parse = input => _parse(input, { sourceType: 'module' });

// es2015+
const importValue = R.path(['source', 'value']);

// CommonJS
const isRequire = R.pathEq(['callee', 'name'], 'require');
const isLiteral = R.pipe(R.prop('arguments'), R.head, R.propEq('type', 'Literal'));
const isLiteralRequire = R.both(isRequire, isLiteral);
const requireValue = R.pipe(R.prop('arguments'), R.head, R.prop('value'));

// esDepsFromString -> String -> Array[String]
const esDepsFromString = R.unary(R.pipe(
  contract('input', String),
  parse,
  ast => {
    let list = [];
    const addToList = item => { list = list.concat(item); };
    simple(ast, {
      ImportDeclaration: R.pipe(importValue, addToList),
      CallExpression: R.when(isLiteralRequire, R.pipe(requireValue, addToList)),
    });
    return list;
  }
));

export default esDepsFromString;
