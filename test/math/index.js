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

describe('math', function() {
  it('should be able to identify odd/even numbers', function() {
    expect(vars.isOdd(1)).to.be.true;
    expect(vars.isOdd(2)).to.be.false;
    expect(vars.isEven(2)).to.be.true;
    expect(vars.isEven(0)).to.be.true;
    expect(vars.isEven(0, true)).to.be.false;
    expect(vars.isEven(1)).to.be.false;
    expect(vars.isEven(2.0)).to.be.true;
    expect(vars.isEven(2.1)).to.be.false;
  });
});
