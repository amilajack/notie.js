// Build script for notie.js

'use strict';

import gulp from 'gulp';
import del from 'del';
import path from 'path';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

// Default task
gulp.task('scripts', () => {

  gulp.src('./src/*')
    .pipe($.concat('notie.min.js'))
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write())
    .pipe($.uglify())
    // .pipe($.uglify({preserveComments: 'license'}))
    .pipe($.size({title: 'scripts'}))
    .pipe(gulp.dest('./dist'))
});

// Version bump
gulp.task('bump', function() {
    gulp.src('./bower.json')
        .pipe($.bump())
        .pipe(gulp.dest('./'));
})

// Watch scripts
gulp.task('serve', () => {
  gulp.watch([
    './src/*',
  ], ['scripts']);
});

// Clean output directory
gulp.task('clean', cb => del([
  './dist/*', // '!./public/dist/vendor'
], {dot: true}));


gulp.task('default', ['scripts']);
