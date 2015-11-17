/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

let assertType = require('../helpers/assertType');

/**
 * Determines if a number is an odd number.
 *
 * @param {number} value - Value of interest.
 *
 * @return {boolean} True if number is odd, false otherwise.
 *
 * @alias module:vars~math.isOdd
 */
function isOdd(value) {
  assertType(value, 'number', false, 'Invalid value specified');

  if (value === 0) return false;

  return (value % 2) !== 0;
}

module.exports = isOdd;
