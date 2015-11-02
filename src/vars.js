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

let injectModule = require('./helpers/injectModule');

/**
 * @module vars
 */
function VARS() {
  let vars = {
    name: 'VARS',
    version: '0.1.0'
  };

  injectModule(vars, 'functions', require('./functions'));
  injectModule(vars, 'math', require('./math'));
  injectModule(vars, 'objects', require('./objects'));

  return vars;
}

module.exports = VARS();
