/**
 * VARS
 * (c) Andrew Wei
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Collection of object manipulating methods.
 *
 * @namespace module:vars~objects
 */
let objects = {};

Object.defineProperty(objects, 'noval',      { value: require('./noval'),      writable: false, enumerable: true });
Object.defineProperty(objects, 'keyOfValue', { value: require('./keyOfValue'), writable: false, enumerable: true });
Object.defineProperty(objects, 'length',     { value: require('./length'),     writable: false, enumerable: true });

module.exports = objects;
