/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Module of methods for manipulating objects.
 *
 * @type {Module}
 */

'use strict';

define('objects', [
  'objects/noval',
  'objects/keyOfValue',
  'objects/length'
], function(
  noval,
  keyOfValue,
  length
) {
  var api = {};

  Object.defineProperty(api, 'noval', { value: noval, writable: false, enumerable: true });
  Object.defineProperty(api, 'keyOfValue', { value: keyOfValue, writable: false, enumerable: true });
  Object.defineProperty(api, 'length', { value: length, writable: false, enumerable: true });

  return api;
});
