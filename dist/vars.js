/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Start file for r.js.
 */
(function(root, factory, undefined) {
  'use strict';

  var vars = factory;

  // Check if using CommonJS.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = vars;
  }
  // Check if using AMD.
  else if (typeof define === 'function' && typeof define.amd === 'object') {
    define('vars', [], vars);
  }
  // Browser (?).
  else {
    root.vars = vars;
  }
}((typeof window !== 'undefined') ? window : this, function() {
/**
 * @license almond 0.3.1 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                //Lop off the last part of baseParts, so that . matches the
                //"directory" and not name of the baseName's module. For instance,
                //baseName of "one/two/three", maps to "one/two/three.js", but we
                //want the directory, "one/two" for this normalization.
                name = baseParts.slice(0, baseParts.length - 1).concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            var args = aps.call(arguments, 0);

            //If first arg is not require('string'), and there is only
            //one arg, it is the array form without a callback. Insert
            //a null so that the following concat is correct.
            if (typeof args[0] !== 'string' && args.length === 1) {
                args.push(null);
            }
            return req.apply(undef, args.concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {
        if (typeof name !== 'string') {
            throw new Error('See almond README: incorrect module build, no module name');
        }

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("almond", function(){});

/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('helpers/assert',[],function() {
  /**
   * Asserts the specified condition and throws a warning if assertion fails.
   *
   * @param {Boolean} condition          Condition to validate against.
   * @param {String}  message:undefined  Message to be displayed when assertion
   *                                     fails.
   *
   * @return {Boolean} True if assert passed, false otherwise.
   */
  function assert(condition, message) {
    if (!condition) {
      throw new Error((message || 'Assert failed'));
    }

    return condition;
  }

  return assert;
});

/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('helpers/assertType',[
  'helpers/assert'
],
function(
  assert
) {
  /**
   * Asserts the specified condition and throws a warning if assertion fails.
   * Internal use only.
   *
   * @param {*}            value                 Value used for the assertion.
   * @param {String/Class} type                  Type(s) to evaluate against.
   *                                             If this is a string, this
   *                                             method will use 'typeof'
   *                                             operator. Otherwise
   *                                             'instanceof' operator will be
   *                                             used. If this parameter is an
   *                                             array, all elements in the
   *                                             array will be evaluated
   *                                             against.
   * @param {Boolean}      allowUndefined:false  Specifies whether assertion
   *                                             should pass if the supplied
   *                                             value is undefined.
   * @param {String}       message:undefined     Message to be displayed when
   *                                             assertion fails.
   *
   * @return {Boolean} True if assert passed, false otherwise.
   */
  function assertType(value, type, allowUndefined, message) {
    if (!assert(type !== undefined, 'Paremeter \'type\' must be a string or a class')) return;
    if (!assert((allowUndefined === undefined) || (typeof allowUndefined === 'boolean'), 'Paremeter \'allowUndefined\', if specified, must be a boolean')) return;
    if (!assert((message === undefined) || (typeof message === 'string'), 'Parameter \'message\', if specified, must be a string')) return;

    allowUndefined = (allowUndefined === undefined) ? false : allowUndefined;

    var ok = false;

    if (allowUndefined && (value === undefined)) {
      ok = true;
    }
    else if (type instanceof Array) {
      var n = type.length;

      for (var i = 0; i < n; i++) {
        if (checkType(value, type[i])) {
          ok = true;
          break;
        }
      }
    }
    else {
      ok = checkType(value, type);
    }

    if (!ok) {
      throw new Error(message || 'AssertType failed');
    }

    return ok;
  }

  /**
   * Verifies that a given is of the given type.
   *
   * @param {*} value  Any value.
   * @param {*} type   Any class or string that describes a type.
   *
   * @return {Boolean} True if validation passes, false otherwise.
   */
  function checkType(value, type) {
    if (typeof type === 'string') {
      switch (type) {
        case 'string':
        case 'object':
        case 'number':
        case 'boolean':
        case 'function':
          return typeof value === type;

        case 'class':
          return typeof value === 'function';

        case 'array':
          return value instanceof Array;

        default:
          return false;
      }
    }
    else {
      return value instanceof type;
    }
  }

  return assertType;
});

/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('functions/debounce',[
  'helpers/assertType'
],
function(
  assertType
) {
  /**
   * Returns a function that, as long as it continues to be invoked, will not
   * be triggered. The function will be called after it stops being called for
   * N milliseconds. If 'leading' is passed, the function will be triggered on
   * the leading edge instead of the trailing.
   *
   * @param {Function} method         Method to be debounced.
   * @param {Number}   delay:0        Debounce rate in milliseconds.
   * @param {Boolean}  leading:false  Indicates whether the method is triggered
   *                                  on the leading edge instead of the
   *                                  trailing.
   *
   * @return {Function} The debounced method.
   */
  function debounce(method, delay, leading) {
    assertType(method, 'function', false, 'Invalid parameter: method');
    assertType(delay, 'number', true, 'Invalid optional parameter: delay');
    assertType(leading, 'boolean', true, 'Invalid optional parameter: leading');

    if (delay === undefined) delay = 0;
    if (leading === undefined) leading = false;

    var timeout;

    return function() {
      var context = this;
      var args = arguments;

      var later = function() {
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

  return debounce;
});

/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('functions/inherit',[
  'helpers/assertType'
],
function(
  assertType
) {
  /**
   * Sets up prototypal inheritance between a child class and a parent class.
   *
   * @param {Class} childClass   Child class
   * @param {Class} parentClass  Parent class
   *
   * @return {Class} Extended child class.
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

  return inherit;
});

/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('functions/noop',[],function() {
  /**
   * This method does absolutely nothing.
   */
  function noop() {}

  return noop;
});

/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Module of methods for manipulating functions.
 *
 * @type {Module}
 */



define('functions', [
  'functions/debounce',
  'functions/inherit',
  'functions/noop'
], function(
  debounce,
  inherit,
  noop
) {
  var api = {};

  Object.defineProperty(api, 'debounce', { value: debounce, writable: false, enumerable: true });
  Object.defineProperty(api, 'inherit', { value: inherit, writable: false, enumerable: true });
  Object.defineProperty(api, 'noop', { value: noop, writable: false, enumerable: true });

  return api;
});

/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('math/clamp',[
  'helpers/assertType'
], function(
  assertType
) {
  /**
   * Clamps a value to a min and max value.
   *
   * @param {Number} value
   * @param {Number} min
   * @param {Number} max
   *
   * @return {Number} The clamped value.
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

  return clamp;
});

/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('math/isClamped',[
  'helpers/assertType'
], function(
  assertType
) {
  /**
   * Determines if value is bounded by the specified min and max values,
   * defaults to inclusive.
   *
   * @param {Number}  value
   * @param {Number}  min
   * @param {Number}  max
   * @param {Boolean} exclusive:false
   *
   * @return {Boolean} True if bounded, false otherwise.
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

  return isClamped;
});

/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('math/isEven',[
  'helpers/assertType'
], function(
  assertType
) {
  /**
   * Determines if a number is an even number. Zero is considered even by
   * default.
   *
   * @param {Number}  value
   * @param {Boolean} excludeZero:false
   *
   * @return {Boolean} True if number is even, false otherwise.
   */
  function isEven(value, excludeZero) {
    assertType(value, 'number', false, 'Invalid value specified');
    assertType(excludeZero, 'boolean', true, 'Invalid parameter: excludeZero');

    if (excludeZero === undefined) excludeZero = false;

    if (value === 0) return (!excludeZero);

    return (value % 2) === 0;
  }

  return isEven;
});

/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('math/isOdd',[
  'helpers/assertType'
], function(
  assertType
) {
  /**
   * Determines if a number is an odd number.
   *
   * @param {Number} value
   *
   * @return {Boolean} True if number is odd, false otherwise.
   */
  function isOdd(value) {
    assertType(value, 'number', false, 'Invalid value specified');

    if (value === 0) return false;

    return (value % 2) !== 0;
  }

  return isOdd;
});

/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Module of methods/classes related to math.
 *
 * @type {Module}
 */



define('math', [
  'math/clamp',
  'math/isClamped',
  'math/isEven',
  'math/isOdd'
], function(
  clamp,
  isClamped,
  isEven,
  isOdd
) {
  var api = {};

  Object.defineProperty(api, 'clamp', { value: clamp, writable: false, enumerable: true });
  Object.defineProperty(api, 'isClamped', { value: isClamped, writable: false, enumerable: true });
  Object.defineProperty(api, 'isEven', { value: isEven, writable: false, enumerable: true });
  Object.defineProperty(api, 'isOdd', { value: isOdd, writable: false, enumerable: true });

  return api;
});

/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('objects/noval',[
  'helpers/assert',
  'helpers/assertType'
],
function(
  assert,
  assertType
) {
  /**
   * Checks if a given value is equal to null. Option to specify recursion,
   * which would further evaluate inner elements, such as when an Array or
   * Object is specified.
   *
   * @param {*}       value            Value to evaluate.
   * @param {Boolean} recursive:false  Specifies whether to recursively
   *                                   evaluate the supplied value's inner
   *                                   values (i.e. an Array or Object).
   *
   * @return {Boolean} True if null, false otherwise.
   */
  function noval(value, recursive) {
    assertType(recursive, 'boolean', true, 'Invalid parameter: recursive');

    if (recursive === undefined) recursive = false;

    if (value === undefined || value === null) {
      return true;
    }
    else if (recursive && (value instanceof Array)) {
      var n = value.length;

      for (var i = 0; i < n; i++) {
        if (!noval(value[i], true)) return false;
      }

      return true;
    }
    else if (recursive && (typeof value === 'object')) {
      for (var p in value) {
        if (!noval(value[p], true)) return false;
      }

      return true;
    }
    else {
      return false;
    }
  }

  return noval;
});

/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('objects/keyOfValue',[
], function(
) {
  /**
   * Gets the key of a given value in a given object.
   *
   * @param {Object} object  Target object.
   * @param {Value}  value   Target value.
   */
  function keyOfValue(object, value) {
    if (!object || !value) return null;
    if (typeof object !== 'object') return null;

    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        if (object[property] === value) {
          return property;
        }
      }
    }

    return null;
  }

  return keyOfValue;
});

/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('objects/length',[],function() {
  /**
   * Gets the number of keys in a given object.
   *
   * @param {*} object  Any object type.
   *
   * @return {Number} Size of specified object (depending on the object type,
   *                  it can be the number of keys in a plain object, number
   *                  of elements in an array, number of characters in a
   *                  string, number of digits in a number, and 0 for all
   *                  other types.
   */
  function length(object) {
    if (object === undefined || object === null) return 0;

    // If object internally has length property, use it.
    if (object.length !== undefined) return object.length;

    var size = 0;

    switch (typeof object) {
      case 'object': {
        if (object !== null && object !== undefined) {
          for (var k in object) size++;
        }

        break;
      }

      case 'number': {
        size = ('' + object).length;
        break;
      }

      default: {
        size = 0;
        break;
      }
    }

    return size;
  }

  return length;
});

/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Module of methods for manipulating objects.
 *
 * @type {Module}
 */



define('objects', [
  'objects/noval',
  'objects/keyOfValue',
  'objects/length'
], function(
  noval,
  keyOfValue,
  length
) {
  var api = {};

  Object.defineProperty(api, 'noval', { value: noval, writable: false, enumerable: true });
  Object.defineProperty(api, 'keyOfValue', { value: keyOfValue, writable: false, enumerable: true });
  Object.defineProperty(api, 'length', { value: length, writable: false, enumerable: true });

  return api;
});

/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Construction of the VARS API.
 */



define('vars', [
  'functions',
  'math',
  'objects'
], function(
  functions,
  math,
  objects
) {
  var vars = {};

  Object.defineProperty(vars, 'name', { value: 'VARS', writable: false });
  Object.defineProperty(vars, 'version', { value: '0.1.0', writable: false });

  injectModule('functions', functions);
  injectModule('math', math);
  injectModule('objects', objects);

  /**
   * @private
   *
   * Injects a module and all of its sub-modules into the core VARS module.
   *
   * @param {String} name    Name of the module (used as the key for the
   *                         key-value pair in VARS).
   * @param {Object} module  Module object (used as value for the key-value
   *                         pair in VARS).
   */
  function injectModule(name, module) {
    Object.defineProperty(vars, name, {
      value: module,
      writable: false
    });

    for (var key in module) {
      if (module.hasOwnProperty(key)) {
        Object.defineProperty(vars, key, {
          value: module[key],
          writable: false
        });
      }
    }
  }

  return vars;
});

/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * End file for r.js.
 */
  return require('vars');
}()));

//# sourceMappingURL=vars.js.map