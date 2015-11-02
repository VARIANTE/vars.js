/**
 * VARS
 * (c) VARIANTE (http://variante.io)
 *
 * Gulp tasks.
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

require('./tasks/clean');
require('./tasks/build');
require('./tasks/docs');
require('./tasks/test');

var config = require('./tasks/.taskconfig');
var gulp = require('gulp');
var sequence = require('run-sequence');

/**
 * Default task.
 *
 * @param {Boolean} --watch
 */
gulp.task('default', function(done) {
  var seq = ['clean', 'build', 'docs'];

  seq.push(function() {
    if (config.env.watch) {
      for (var i = 0; i < config.tasks.watch.build.length; i++) {
        var entry = config.tasks.watch.build[i];
        gulp.watch(entry.files, entry.tasks);
      }
    }

    done();
  });

  sequence.apply(null, seq);
});
