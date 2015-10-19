/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Construction of the VARS API.
 */

'use strict';

define('vars', [
  'functions',
  'math',
  'objects'
], function(
  functions,
  math,
  objects
) {
  var vars = {};

  Object.defineProperty(vars, 'name', { value: 'VARS', writable: false });
  Object.defineProperty(vars, 'version', { value: '0.1.0', writable: false });

  injectModule('functions', functions);
  injectModule('math', math);
  injectModule('objects', objects);

  /**
   * @private
   *
   * Injects a module and all of its sub-modules into the core VARS module.
   *
   * @param {String} name    Name of the module (used as the key for the
   *                         key-value pair in VARS).
   * @param {Object} module  Module object (used as value for the key-value
   *                         pair in VARS).
   */
  function injectModule(name, module) {
    Object.defineProperty(vars, name, {
      value: module,
      writable: false
    });

    for (var key in module) {
      if (module.hasOwnProperty(key)) {
        Object.defineProperty(vars, key, {
          value: module[key],
          writable: false
        });
      }
    }
  }

  return vars;
});
