/**
 * VARS
 * (c) Andrew Wei
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

var config = require('./.taskconfig');
var gulp = require('gulp');
var path = require('path');
var spawn = require('child_process').spawn;

/**
 * Run Mocha tests.
 */
gulp.task('test', function(done) {
  var proc = spawn('./node_modules/.bin/mocha', [config.paths.test, '--recursive', '--reporter', 'spec'], { stdio: 'inherit' });
  proc.on('exit', done);
});
