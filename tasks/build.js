/**
 * VARS
 * (c) Andrew Wei
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

var config = require('./.taskconfig');
var del = require('del');
var gulp = require('gulp');
var webpack = require('webpack');
var $util = require('gulp-util');

/**
 * Cleans the build directory.
 */
gulp.task('clean', function(done) {
  del(config.tasks.clean.input).then(function(paths) {
    done();
  });
});

/**
 * Builds the JavaScript library.
 */
gulp.task('build', function(done) {
  webpack(config.tasks.build.webpack.pretty).run(build(function() {
    webpack(config.tasks.build.webpack.ugly).run(build(done));
  }));

  function build(cb) {
    return function(err, stats) {
      if (err) throw new $util.PluginError('webpack', err);
      $util.log($util.colors.green('[webpack]'), stats.toString());
      cb();
    };
  }
});
