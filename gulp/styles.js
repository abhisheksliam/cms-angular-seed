'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var $ = require('gulp-load-plugins')();

module.exports = function (options) {
    gulp.task('dev-styles', function () {
        return gulp.src([options.src + '/css/less/theme.less',
        options.src + '/css/less/ui.less',
        options.src + '/css/less/style.less',
        options.src + '/css/less/layout.less',
        options.src + '/css/less/angular-theme.less',
        options.src + '/css/less/custom.less'
        ])
            .pipe(less({
                paths: [path.join(__dirname, 'less', 'includes')]
            }))
            .pipe(gulp.dest(options.tmp + '/css'));

    });

    gulp.task('styles', ['dev-styles'], function () {

        return gulp.src([options.tmp + '/css/theme.css',
        options.tmp + '/css/ui.css',
        options.tmp + '/css/style.css',
        options.tmp + '/css/layout.css',
        options.tmp + '/css/angular-theme.css',
        options.tmp + '/css/custom.css'
        ])
            // .pipe($.concat('app.css'))
        .pipe(gulp.dest(options.tmp + '/serve/styles/'))
        .pipe($.rev())
        .pipe(gulp.dest(options.dist + '/styles/'));

    });
};
