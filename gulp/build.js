'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

module.exports = function (options) {

    // Cleans Dist and temp folders
    gulp.task('clean', $.del.bind(null, [options.dist + '/', options.tmp + '/']));

    gulp.task('static-dist', ['inject-prod'], function () {

        return gulp.src([
            options.src + '/**/*.*',
            '!' + options.src + '/js/*.*',
            '!' + options.src + '/css/**/*.*',
            '!' + options.src + '/**/*.less'
        ])
            .pipe(gulp.dest(options.dist + '/'));

    });

    gulp.task('build-dev', ['inject-dev'], function () {
        return gulp.src(options.src + '/css/icons/**/*.*')
            .pipe(gulp.dest(options.tmp + '/css/icons'));
    });

    gulp.task('build-prod', ['static-dist'], function () {
        return gulp.src(options.src + '/css/icons/**/*.*')
            .pipe(gulp.dest(options.dist + '/styles/icons'));
    });

};
