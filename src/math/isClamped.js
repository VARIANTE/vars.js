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
 * Determines if value is bounded by the specified min and max values, defaults
 * include edge values.
 *
 * @param {Number}  value             - Value to test against.
 * @param {Number}  min               - Minimum value to test against.
 * @param {Number}  max               - Maximum value to test against.
 * @param {Boolean} [exclusive=false] - Specifies whether the edge values are
 *                                      omitted.
 *
 * @return {Boolean} True if bounded, false otherwise.
 *
 * @alias module:vars~math.isClamped
 */
function isClamped(value, min, max, exclusive) {
  assertType(value, 'number', false, 'Invalid value specified');
  assertType(min, 'number', false, 'Invalid min value specified');
  assertType(max, 'number', false, 'Invalid max value specified');
  assertType(exclusive, 'boolean', true, 'Invalid parameter: exclusive');

  if (exclusive === undefined) exclusive = false;

  if (exclusive) {
    return ((value > min) && (value < max));
  }
  else {
    return ((value >= min) && (value <= max));
  }
}

module.exports = isClamped;
