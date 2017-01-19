/**
 * Created by Jeff on 1/19/17.
 */

var gulp = require('gulp');
var babel = require('gulp-babel');
var connect = require('gulp-connect');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gulpsync = require('gulp-sync')(gulp);

gulp.task('compile-es6', function () {
  return gulp.src('app/es6/*')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('app/js'));
});

gulp.task('pack-js', function () {
  return gulp.src('app/js/main.js')
    .pipe(browserify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('app/bundle'));
});

gulp.task('compress-bundle', function () {
  return gulp.src('app/bundle/bundle.js')
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('app/bundle'));
});

gulp.task('build', gulpsync.sync(['compile-es6', 'pack-js', 'compress-bundle']), function () {
  if (process.argv.pop() == '--dev') {
    gulp.watch('app/es6/*', gulpsync.sync(['compile-es6', 'pack-js', 'compress-bundle']));
  }
});

gulp.task('server', function () {
  connect.server({
    root: 'app',
    port: '8000',
    livereload: true
  })
});