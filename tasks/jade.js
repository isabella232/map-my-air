'use strict';

/**
 * Compile jade
 *
 * @author chrismarx
 */

var gulp      = require('gulp');
var plumber   = require('gulp-plumber');
var gutil     = require('gulp-util');
var gulpif    = require('gulp-if');
var jade      = require('gulp-jade');

module.exports = {

  //Remember, to use relative file path for gulp.dest, ensure to set the base file path in gulp.src
  index: function () {
  	return gulp.src(['./client/index.jade'],{base: './'})
      .pipe(plumber())
      .pipe(gulpif(/[.]jade$/, jade({pretty:true}).on('error', gutil.log)))
      .pipe(gulp.dest('./'));
  },

  template: function () {
  	// combine compiled Jade and html template files into 
    // build/template.js
    return gulp.src([
      '!./client/index.jade',
      '!./client/index.html',
      //'./app/**/*.html', 
      './client/views/**/*.jade'],{base: './'})
      .pipe(plumber())
      .pipe(gulpif(/[.]jade$/, jade({pretty:true}).on('error', gutil.log)))
      .pipe(gulp.dest('./'))
  }
};