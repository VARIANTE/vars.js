/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Module of methods for manipulating functions.
 *
 * @type {Module}
 */

'use strict';

define('functions', [
  'functions/debounce',
  'functions/inherit',
  'functions/noop'
], function(
  debounce,
  inherit,
  noop
) {
  var api = {};

  Object.defineProperty(api, 'debounce', { value: debounce, writable: false, enumerable: true });
  Object.defineProperty(api, 'inherit', { value: inherit, writable: false, enumerable: true });
  Object.defineProperty(api, 'noop', { value: noop, writable: false, enumerable: true });

  return api;
});
