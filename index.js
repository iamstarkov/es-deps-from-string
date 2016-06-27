import { parse as _parse } from 'acorn';
import { simple } from 'acorn/dist/walk';
import R from 'ramda';
import contract from 'neat-contract';

const parse = input => _parse(input, { sourceType: 'module', allowHashBang: true });

// es2015+
const importValue = R.path(['source', 'value']);

// CommonJS
const isRequire = R.pathEq(['callee', 'name'], 'require');
const isLiteral = R.pipe(R.prop('arguments'), R.head, R.propEq('type', 'Literal'));
const isLiteralRequire = R.both(isRequire, isLiteral);
const requireValue = R.pipe(R.prop('arguments'), R.head, R.prop('value'));

const deps = ast => {
  let list = [];
  const addToList = item => { list = list.concat(item); };
  simple(ast, {
    ImportDeclaration: R.pipe(importValue, addToList),
    CallExpression: R.when(isLiteralRequire, R.pipe(requireValue, addToList)),
  });
  return list;
};

// esDepsFromString -> String -> Array[String]
const esDepsFromString = R.unary(R.pipe(
  contract('input', String),
  parse,
  deps
));

export default esDepsFromString;
