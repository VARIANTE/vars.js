/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * Clean task.
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

var config = require('./.taskconfig');
var del = require('del');
var gulp = require('gulp');

/**
 * Cleans the build directory.
 */
gulp.task('clean', function(done) {
  del(config.tasks.clean.input).then(function(paths) {
    done();
  });
});
