'use strict';

/**
 * Asserts the specified condition and throws a warning if assertion fails.
 *
 * @param {Boolean} condition - Condition to validate against.
 * @param {String}  [message] - Message to be displayed when assertion fails.
 *
 * @return {Boolean} True if assert passed, false otherwise.
 *
 * @throws Error if assert fails.
 *
 * @alias module:vars~helpers.assert
 */
function assert(condition, message) {
  if (!condition) throw new Error((message || 'Assert failed'));
  return condition;
}

module.exports = assert;
