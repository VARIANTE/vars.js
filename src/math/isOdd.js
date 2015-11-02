'use strict';

let assertType = require('../helpers/assertType');

/**
 * Determines if a number is an odd number.
 *
 * @param {Number} value - Value of interest.
 *
 * @return {Boolean} True if number is odd, false otherwise.
 *
 * @alias module:vars~math.isOdd
 */
function isOdd(value) {
  assertType(value, 'number', false, 'Invalid value specified');

  if (value === 0) return false;

  return (value % 2) !== 0;
}

module.exports = isOdd;
