'use strict';

// Core references for this to work
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

// Use for stand-alone autoprefixer
var gulpautoprefixer = require('gulp-autoprefixer');

// alternate vars if you want to use Postcss as a setup
var postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');

// Standard gulp task when using gulp-autoprefixer as a standalone process
gulp.task('build:css', function() {
  gulp.src('./scss/{,*/}*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'expanded', //alt options: nested, compact, compressed
      includePaths: require('node-bourbon').includePaths
    }))
    .pipe(gulpautoprefixer({ browsers: ['last 4 versions'], cascade: false }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'));
});

// Alternative gulp task; use when wanting to pass in more functions into the Postcss pipe
gulp.task('build:post:css', function() {
  gulp.src('./scss/{,*/}*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'expanded', //alt options: nested, compact, compressed
      includePaths: require('node-bourbon').includePaths
    }))
    .pipe(postcss([
      autoprefixer({ browsers: ['last 4 versions'], cascade: false })
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./scss/{,*/}*.{scss,sass}', ['build:css'])
})

gulp.task('default', ['build:css']);
