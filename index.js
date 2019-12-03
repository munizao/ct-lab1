const { isNumber } = require('./lib/types.js');
const { isString } = require('./lib/types.js');
const { isBoolean } = require('./lib/types.js');
const { isArray } = require('./lib/types.js');
const { isObject } = require('./lib/types.js');
const { isFunction } = require('./lib/types.js');

console.log(isNumber('3'));
console.log(isString('hi'));
console.log(isBoolean(true));
console.log(isArray([1, 2, 3, 4]));
console.log(isObject({}));
console.log(isFunction(() => 1));
