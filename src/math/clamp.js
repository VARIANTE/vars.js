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
 * Clamps a value to a min and max value, inclusive.
 *
 * @param {number} value - Value to be clamped.
 * @param {number} min   - Minimum value of the clamp boundary.
 * @param {number} max   - Maximum value of the clamp boundary.
 *
 * @return {number} The resulting value.
 *
 * @alias module:vars~math.clamp
 */
function clamp(value, min, max) {
  assertType(value, 'number', false, 'Invalid value specified');
  assertType(min, 'number', false, 'Invalid min value specified');
  assertType(max, 'number', false, 'Invalid max value specified');

  let output = value;

  output = Math.min(output, max);
  output = Math.max(output, min);

  return output;
}

module.exports = clamp;
