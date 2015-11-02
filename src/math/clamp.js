'use strict';

let assertType = require('../helpers/assertType');

/**
 * Clamps a value to a min and max value, inclusive.
 *
 * @param {Number} value - Value to be clamped.
 * @param {Number} min   - Minimum value of the clamp boundary.
 * @param {Number} max   - Maximum value of the clamp boundary.
 *
 * @return {Number} The resulting value.
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
