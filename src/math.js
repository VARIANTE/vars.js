'use strict';

/**
 * Collection of math utility methods.
 *
 * @namespace module:vars~math
 */
let math = {};

Object.defineProperty(math, 'clamp', { value: require('./math/clamp'), writable: false, enumerable: true });
Object.defineProperty(math, 'isClamped', { value: require('./math/isClamped'), writable: false, enumerable: true });
Object.defineProperty(math, 'isEven', { value: require('./math/isEven'), writable: false, enumerable: true });
Object.defineProperty(math, 'isOdd', { value: require('./math/isOdd'), writable: false, enumerable: true });

module.exports = math;
