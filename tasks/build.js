'use strict';

/**
 * Build task
 */

var gulp                 = require('gulp');
var path                 = require('path');
var sq                   = require('streamqueue');
var runSequence          = require('run-sequence');
var del                  = require('del');
var plumber              = require('gulp-plumber');
var usemin               = require('gulp-usemin');
var cssRebaseUrls        = require('gulp-css-url-rebase');
var autoprefixer         = require('gulp-autoprefixer');
var minifyCss            = require('gulp-minify-css');
var angularTemplatecache = require('gulp-angular-templatecache');
var concat               = require('gulp-concat');
var ngAnnotate           = require('gulp-ng-annotate');
var uglify               = require('gulp-uglify');
var revAll               = require('gulp-rev-all');
var revToExclude         = require('./config/revFilesToExclude');

var toDelete = [];

module.exports = function (done) {
  runSequence(
    ['clean:dist', 'sass', 'jade-index'],
    ['usemin', 'copy:dist'],
    ['scripts', 'cssmin'],
    'rev',
    'clean:finish',
    done);
};

gulp.task('clean:dist', function (done) {
  del(['dist/**', '!dist', '!dist/.git{,/**}'], done);
});

gulp.task('clean:finish', function (done) {
  del([
    '.tmp/**',
    'dist/client/app.{css,js}'
  ].concat(toDelete), done);
});

gulp.task('copy:dist', function () {
  var main = gulp.src(['server/**/*', 'package.json'], { base: './' });
  var assets = gulp.src('client/assets/**/*', { base: './' });

  //Added the bower components folder, since many of our custom added resources have dependencies that are relative to their bower folders
  var bowerComponents = gulp.src('client/bower_components/**/*',{base: './'});

  return sq({ objectMode: true }, main, assets, bowerComponents)
    .pipe(gulp.dest('dist/'));
});

gulp.task('usemin', ['inject'], function () {
  return gulp.src('client/index.html')
    .pipe(plumber())
    //note, unfortunately, cssRebaseUrls doesnt get us all the way from relative references in the css files, to a fully working concatenated version
    //    with the right, rewritten urls. assets relative to the bower_components files are rewritten, but there is no bower_component directory, unless
    //       we manually move it over, so hence, the above copy:dist addition of bower_components
    .pipe(usemin({ css: [cssRebaseUrls({ root: 'client' }), 'concat'] }))
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('cssmin', function () {
  return gulp.src('dist/client/app.css')
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('scripts', function () {
  var views = gulp.src('client/views/**/*.html')
    .pipe(angularTemplatecache({
      root: 'views',
      module: 'columbiaWync'
    }));

  var tpls = gulp.src('client/directives/**/*.html')
    .pipe(angularTemplatecache({
      root: 'directives',
      module: 'columbiaWync'
    }));

  var app = gulp.src('dist/client/app.js');

  return sq({ objectMode: true }, app, views, tpls)
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('rev', function () {

  var rev = new revAll({
    transformFilename: function (file, hash) {
      var filename = path.basename(file.path);
      if (revToExclude.indexOf(filename) !== -1) {
        return filename;
      }
      toDelete.push(path.resolve(file.path));
      var ext = path.extname(file.path);
      return path.basename(file.path, ext) + '.' + hash.substr(0, 8) + ext;
    }
  });

  //note, that we exlude the bower_components directory, since we dont want to rev that entire directory
  //@see for excluding directories in globs - https://github.com/gulpjs/gulp/issues/165
  return gulp.src(['dist/client/**', '!dist/client/{bower_components,bower_components/**}'])
    .pipe(rev.revision())
    .pipe(gulp.dest('dist/client/'));
});
