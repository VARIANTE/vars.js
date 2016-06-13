/**
 * VARS
 * (c) Andrew Wei
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

let vars = require('../../dist/vars');

let chai = require('chai');
let expect = chai.expect;
chai.should();

describe('objects', function() {
  it('should be able to identify objects with no value', function() {
    let a = [];
    let b = [[], [], []];
    let c = {};
    let d = { a: {}, b: {}, c: [] };
    let e = { a: 1, b: {}, c: [] };

    expect(vars.noval(null)).to.be.true;
    expect(vars.noval(undefined)).to.be.true;
    expect(vars.noval(a, true)).to.be.true;
    expect(vars.noval(b, true)).to.be.true;
    expect(vars.noval(c, true)).to.be.true;
    expect(vars.noval(d, true)).to.be.true;
    expect(vars.noval(e, true)).to.be.false;
  });
});
