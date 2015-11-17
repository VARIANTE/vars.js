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
 * Determines if a number is an even number. Zero is considered even by default.
 *
 * @param {number}  value               - Value of interest.
 * @param {boolean} [excludeZero=false] - Speicifies whether zero should be
 *                                        excluded from the test.
 *
 * @return {boolean} True if number is even, false otherwise.
 *
 * @alias module:vars~math.isEven
 */
function isEven(value, excludeZero) {
  assertType(value, 'number', false, 'Invalid value specified');
  assertType(excludeZero, 'boolean', true, 'Invalid parameter: excludeZero');

  if (excludeZero === undefined) excludeZero = false;

  if (value === 0) return (!excludeZero);

  return (value % 2) === 0;
}

module.exports = isEven;
