'use strict';

/**
 * Collection of object manipulating methods.
 *
 * @namespace module:vars~objects
 */
let objects = {};

Object.defineProperty(objects, 'noval', { value: require('./objects/noval'), writable: false, enumerable: true });
Object.defineProperty(objects, 'keyOfValue', { value: require('./objects/keyOfValue'), writable: false, enumerable: true });
Object.defineProperty(objects, 'length', { value: require('./objects/length'), writable: false, enumerable: true });

module.exports = objects;
