/*!
 * VARS
 * (c) Andrew Wei
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

let injectModule = require('./helpers/injectModule');

/**
* @module vars
*/
let vars = {};

/**
 * @property {string} name - Module name.
 */
Object.defineProperty(vars, 'name', { value: 'VARS', writable: false });

/**
 * @property {string} version - Version number.
 */
Object.defineProperty(vars, 'version', { value: '0.5.0', writable: false });

injectModule(vars, 'functions', require('./functions'));
injectModule(vars, 'math', require('./math'));
injectModule(vars, 'objects', require('./objects'));

module.exports = vars;
