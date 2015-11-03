(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vars"] = factory();
	else
		root["vars"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * VARS
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var injectModule = __webpack_require__(1);

	/**
	* @module vars
	*/
	var vars = {};

	/**
	 * @property {string} name - Module name.
	 */
	Object.defineProperty(vars, 'name', { value: 'VARS', writable: false });

	/**
	 * @property {string} version - Version number.
	 */
	Object.defineProperty(vars, 'version', { value: '0.3.0', writable: false });

	injectModule(vars, 'functions', __webpack_require__(2));
	injectModule(vars, 'math', __webpack_require__(9));
	injectModule(vars, 'objects', __webpack_require__(14));

	module.exports = vars;

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * VARS
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Injects a module and all of its sub-modules into a target module.
	 *
	 * @param {Object} target     - Target module for injecting a module into.
	 * @param {String} moduleName - Name of the module to be injected (used as the
	 *                              key for the key-value pair in target module).
	 * @param {Object} module     - Module object (used as value for the key-value
	 *                              pair in target module).
	 *
	 * @alias module:vars~helpers.injectModule
	 */
	;
	function injectModule(target, moduleName, module) {
	  Object.defineProperty(target, moduleName, {
	    value: module,
	    writable: false
	  });

	  for (var key in module) {
	    if (module.hasOwnProperty(key)) {
	      Object.defineProperty(target, key, {
	        value: module[key],
	        writable: false
	      });
	    }
	  }
	}

	module.exports = injectModule;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * VARS
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Collection of function manipulating methods.
	 *
	 * @namespace module:vars~functions
	 */
	;
	var functions = {};

	Object.defineProperty(functions, 'debounce', { value: __webpack_require__(3), writable: false, enumerable: true });
	Object.defineProperty(functions, 'inherit', { value: __webpack_require__(7), writable: false, enumerable: true });
	Object.defineProperty(functions, 'noop', { value: __webpack_require__(8), writable: false, enumerable: true });

	module.exports = functions;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * VARS
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var assertType = __webpack_require__(4);

	/**
	 * Returns a function that, as long as it continues to be invoked, will not
	 * be triggered. The function will be called after it stops being called for
	 * N milliseconds. If 'leading' is passed, the function will be triggered on
	 * the leading edge instead of the trailing.
	 *
	 * @param {Function} method          - Method to be debounced.
	 * @param {Number}   [delay=0]       - Debounce rate in milliseconds.
	 * @param {Boolean}  [leading=false] - Indicates whether the method is triggered
	 *                                     on the leading edge instead of the
	 *                                     trailing.
	 *
	 * @return {Function} The debounced method.
	 *
	 * @alias module:vars~functions.debounce
	 */
	function debounce(method, delay, leading) {
	  assertType(method, 'function', false, 'Invalid parameter: method');
	  assertType(delay, 'number', true, 'Invalid optional parameter: delay');
	  assertType(leading, 'boolean', true, 'Invalid optional parameter: leading');

	  if (delay === undefined) delay = 0;
	  if (leading === undefined) leading = false;

	  var timeout = undefined;

	  return function () {
	    var context = this;
	    var args = arguments;

	    var later = function later() {
	      timeout = null;

	      if (!leading) {
	        method.apply(context, args);
	      }
	    };

	    var callNow = leading && !timeout;
	    clearTimeout(timeout);
	    timeout = setTimeout(later, delay);

	    if (callNow) {
	      method.apply(context, args);
	    }
	  };
	}

	module.exports = debounce;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * VARS
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

	var assert = __webpack_require__(5);
	var checkType = __webpack_require__(6);

	/**
	 * Asserts the specified condition and throws a warning if assertion fails.
	 * Internal use only.
	 *
	 * @param {*}            value                  - Value used for the assertion.
	 * @param {String|Class} type                   - Type(s) to evaluate against.
	 *                                                If this is a string, this
	 *                                                method will use 'typeof'
	 *                                                operator. Otherwise
	 *                                                'instanceof' operator will be
	 *                                                used. If this parameter is an
	 *                                                array, all elements in the
	 *                                                array will be evaluated
	 *                                                against.
	 * @param {Boolean}      [allowUndefined=false] - Specifies whether assertion
	 *                                                should pass if the supplied
	 *                                                value is undefined.
	 * @param {String}       [message]              - Message to be displayed when
	 *                                                assertion fails.
	 *
	 * @return {Boolean} True if assert passed, false otherwise.
	 *
	 * @throws Error if assert fails.
	 *
	 * @alias module:vars~helpers.assertType
	 */
	function assertType(value, type, allowUndefined, message) {
	  if (!assert(type !== undefined, 'Paremeter \'type\' must be a string or a class')) return;
	  if (!assert(allowUndefined === undefined || typeof allowUndefined === 'boolean', 'Paremeter \'allowUndefined\', if specified, must be a boolean')) return;
	  if (!assert(message === undefined || typeof message === 'string', 'Parameter \'message\', if specified, must be a string')) return;

	  allowUndefined = allowUndefined === undefined ? false : allowUndefined;

	  var ok = false;

	  if (allowUndefined && value === undefined) {
	    ok = true;
	  } else if (_instanceof(type, Array)) {
	    var n = type.length;

	    for (var i = 0; i < n; i++) {
	      if (checkType(value, type[i])) {
	        ok = true;
	        break;
	      }
	    }
	  } else {
	    ok = checkType(value, type);
	  }

	  if (!ok) {
	    throw new Error(message || 'AssertType failed');
	  }

	  return ok;
	}

	module.exports = assertType;

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * VARS
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

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
	;
	function assert(condition, message) {
	  if (!condition) throw new Error(message || 'Assert failed');
	  return condition;
	}

	module.exports = assert;

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * VARS
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Verifies that a given is of the given type.
	 *
	 * @param {*} value - Any value.
	 * @param {*} type  - Any class or string that describes a type.
	 *
	 * @return {Boolean} True if validation passes, false otherwise.
	 *
	 * @alias module:vars~helpers.checkType
	 */
	;

	function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

	function _typeof(obj) { return obj && obj.constructor === Symbol ? "symbol" : typeof obj; }

	function checkType(value, type) {
	  if (typeof type === 'string') {
	    switch (type) {
	      case 'string':
	      case 'object':
	      case 'number':
	      case 'boolean':
	      case 'function':
	        return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === type;

	      case 'class':
	        return typeof value === 'function';

	      case 'array':
	        return _instanceof(value, Array);

	      default:
	        return false;
	    }
	  } else {
	    return _instanceof(value, type);
	  }
	}

	module.exports = checkType;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * VARS
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var assertType = __webpack_require__(4);

	/**
	 * Sets up prototypal inheritance between a child class and a parent class.
	 *
	 * @param {Class} childClass  - Child class.
	 * @param {Class} parentClass - Parent class.
	 *
	 * @return {Class} Extended child class.
	 *
	 * @alias module:vars~functions.inherit
	 */
	function inherit(childClass, parentClass) {
	  assertType(childClass, 'class', false, 'Invalid parameter: childClass');
	  assertType(parentClass, 'class', false, 'Invalid parameter: parentClass');

	  for (var key in parentClass) {
	    if (parentClass.hasOwnProperty(key)) {
	      childClass[key] = parentClass[key];
	    }
	  }

	  function C() {
	    this.constructor = childClass;
	  }

	  C.prototype = Object.create(parentClass.prototype);
	  childClass.prototype = new C();
	  childClass.__super__ = parentClass.prototype;
	  return childClass;
	}

	module.exports = inherit;

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * VARS
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * This method does absolutely nothing.
	 *
	 * @alias module:vars~functions.noop
	 */
	;
	function noop() {}

	module.exports = noop;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * VARS
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Collection of math utility methods.
	 *
	 * @namespace module:vars~math
	 */
	;
	var math = {};

	Object.defineProperty(math, 'clamp', { value: __webpack_require__(10), writable: false, enumerable: true });
	Object.defineProperty(math, 'isClamped', { value: __webpack_require__(11), writable: false, enumerable: true });
	Object.defineProperty(math, 'isEven', { value: __webpack_require__(12), writable: false, enumerable: true });
	Object.defineProperty(math, 'isOdd', { value: __webpack_require__(13), writable: false, enumerable: true });

	module.exports = math;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * VARS
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var assertType = __webpack_require__(4);

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

	  var output = value;

	  output = Math.min(output, max);
	  output = Math.max(output, min);

	  return output;
	}

	module.exports = clamp;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * VARS
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var assertType = __webpack_require__(4);

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
	    return value > min && value < max;
	  } else {
	    return value >= min && value <= max;
	  }
	}

	module.exports = isClamped;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * VARS
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var assertType = __webpack_require__(4);

	/**
	 * Determines if a number is an even number. Zero is considered even by default.
	 *
	 * @param {Number}  value               - Value of interest.
	 * @param {Boolean} [excludeZero=false] - Speicifies whether zero should be
	 *                                        excluded from the test.
	 *
	 * @return {Boolean} True if number is even, false otherwise.
	 *
	 * @alias module:vars~math.isEven
	 */
	function isEven(value, excludeZero) {
	  assertType(value, 'number', false, 'Invalid value specified');
	  assertType(excludeZero, 'boolean', true, 'Invalid parameter: excludeZero');

	  if (excludeZero === undefined) excludeZero = false;

	  if (value === 0) return !excludeZero;

	  return value % 2 === 0;
	}

	module.exports = isEven;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * VARS
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var assertType = __webpack_require__(4);

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

	  return value % 2 !== 0;
	}

	module.exports = isOdd;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * VARS
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Collection of object manipulating methods.
	 *
	 * @namespace module:vars~objects
	 */
	;
	var objects = {};

	Object.defineProperty(objects, 'noval', { value: __webpack_require__(15), writable: false, enumerable: true });
	Object.defineProperty(objects, 'keyOfValue', { value: __webpack_require__(16), writable: false, enumerable: true });
	Object.defineProperty(objects, 'length', { value: __webpack_require__(17), writable: false, enumerable: true });

	module.exports = objects;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * VARS
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	function _typeof(obj) { return obj && obj.constructor === Symbol ? "symbol" : typeof obj; }

	function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

	var assertType = __webpack_require__(4);

	/**
	 * Checks if a given value is equal to null. Option to specify recursion, which
	 * would further evaluate inner elements, such as when an Array or Object is
	 * specified.
	 *
	 * @param {*}       value              - Value to evaluate.
	 * @param {Boolean} [recursive=false]  - Specifies whether to recursively
	 *                                       evaluate the supplied value's inner
	 *                                       values (i.e. an Array or Object).
	 *
	 * @return {Boolean} True if null, false otherwise.
	 *
	 * @alias module:vars~objects.noval
	 */
	function noval(value, recursive) {
	  assertType(recursive, 'boolean', true, 'Invalid parameter: recursive');

	  if (recursive === undefined) recursive = false;

	  if (value === undefined || value === null) {
	    return true;
	  } else if (recursive && _instanceof(value, Array)) {
	    var n = value.length;

	    for (var i = 0; i < n; i++) {
	      if (!noval(value[i], true)) return false;
	    }

	    return true;
	  } else if (recursive && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	    for (var p in value) {
	      if (!noval(value[p], true)) return false;
	    }

	    return true;
	  } else {
	    return false;
	  }
	}

	module.exports = noval;

/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * VARS
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Gets the key of a given value in a given object.
	 *
	 * @param {Object} object - Target object.
	 * @param {Value}  value  - Target value.
	 *
	 * @alias module:vars~objects.keyOfValue
	 */
	;

	function _typeof(obj) { return obj && obj.constructor === Symbol ? "symbol" : typeof obj; }

	function keyOfValue(object, value) {
	  if (!object || !value) return null;
	  if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') return null;

	  for (var property in object) {
	    if (object.hasOwnProperty(property)) {
	      if (object[property] === value) {
	        return property;
	      }
	    }
	  }

	  return null;
	}

	module.exports = keyOfValue;

/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * VARS
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Gets the number of keys in a given object.
	 *
	 * @param {*} object - Any object type.
	 *
	 * @return {Number} Size of specified object (depending on the object type, it
	 *                  can be the number of keys in a plain object, number of
	 *                  elements in an array, number of characters in a string,
	 *                  number of digits in a number, and 0 for all other types.
	 *
	 * @alias module:vars~objects.length
	 */
	;

	function _typeof(obj) { return obj && obj.constructor === Symbol ? "symbol" : typeof obj; }

	function length(object) {
	  if (object === undefined || object === null) return 0;

	  // If object internally has length property, use it.
	  if (object.length !== undefined) return object.length;

	  var size = 0;

	  switch (typeof object === 'undefined' ? 'undefined' : _typeof(object)) {
	    case 'object':
	      {
	        if (object !== null && object !== undefined) {
	          for (var k in object) {
	            size++;
	          }
	        }

	        break;
	      }

	    case 'number':
	      {
	        size = ('' + object).length;
	        break;
	      }

	    default:
	      {
	        size = 0;
	        break;
	      }
	  }

	  return size;
	}

	module.exports = length;

/***/ }
/******/ ])
});
;