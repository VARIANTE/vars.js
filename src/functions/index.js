/**
 * VARS
 * (c) Andrew Wei
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Collection of function manipulating methods.
 *
 * @namespace module:vars~functions
 */
let functions = {};

Object.defineProperty(functions, 'debounce', { value: require('./debounce'), writable: false, enumerable: true });
Object.defineProperty(functions, 'inherit',  { value: require('./inherit'),  writable: false, enumerable: true });
Object.defineProperty(functions, 'noop',     { value: require('./noop'),     writable: false, enumerable: true });

module.exports = functions;
