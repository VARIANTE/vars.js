/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

let vars = require('../../dist/vars');

let chai = require('chai');
let expect = chai.expect;
chai.should();

describe('functions', function() {
  it('should be able to inherit', function() {
    function Foo() {}
    Foo.prototype.foo = function() {};

    vars.inherit(Bar, Foo);

    function Bar() {
      Bar.__super__.constructor.apply(this, arguments);
    }

    var bar = new Bar();
    bar.foo.should.exist;
  });
});
