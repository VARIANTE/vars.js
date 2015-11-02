'use strict';

/**
 * Collection of function manipulating methods.
 *
 * @namespace module:vars~functions
 */
let functions = {};

Object.defineProperty(functions, 'debounce', { value: require('./functions/debounce'), writable: false, enumerable: true });
Object.defineProperty(functions, 'inherit', { value: require('./functions/inherit'), writable: false, enumerable: true });
Object.defineProperty(functions, 'noop', { value: require('./functions/noop'), writable: false, enumerable: true });

module.exports = functions;
