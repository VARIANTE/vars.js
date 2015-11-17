/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Collection of math utility methods.
 *
 * @namespace module:vars~math
 */
let math = {};

Object.defineProperty(math, 'clamp',     { value: require('./clamp'),     writable: false, enumerable: true });
Object.defineProperty(math, 'isClamped', { value: require('./isClamped'), writable: false, enumerable: true });
Object.defineProperty(math, 'isEven',    { value: require('./isEven'),    writable: false, enumerable: true });
Object.defineProperty(math, 'isOdd',     { value: require('./isOdd'),     writable: false, enumerable: true });
Object.defineProperty(math, 'random',    { value: require('./random'),     writable: false, enumerable: true });

module.exports = math;
