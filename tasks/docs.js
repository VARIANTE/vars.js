/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * Documentation generating tasks.
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

var config = require('./.taskconfig');
var gulp = require('gulp');
var path = require('path');
var spawn = require('child_process').spawn;

/**
 * Generates the docs.
 */
gulp.task('docs', function(done) {
  var proc = spawn('./node_modules/.bin/jsdoc', [
    config.paths.src,
    '-r',
    '-R',
    path.join(config.paths.base, 'README.md'),
    '-c',
    './.jsdocconfig'
  ], {
    stdio: 'inherit'
  });
  proc.on('exit', done);
});
