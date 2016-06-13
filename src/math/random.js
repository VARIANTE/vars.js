/**
 * VARS
 * (c) Andrew Wei
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

let assertType = require('../helpers/assertType');

/**
 * Generates a random real number within the given range, starting from the
 * minimum (inclusive) to the maximum (exclusive).
 *
 * @param {number} min - Min value (inclusive).
 * @param {number} max - Max value (exclusive).
 *
 * @return {number} Random number within the given range.
 *
 * @alias module:vars~math.random
 */
function random(min, max) {
  assertType(min, 'number', false, 'Parameter \'min\' must be a number');
  assertType(max, 'number', false, 'Parameter \'max\' must be a number');

  return Math.random() * (max - min) + min;
}

module.exports = random;
