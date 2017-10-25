'use strict';

var gulp = require('gulp'),
    inject = require('gulp-inject'), //https://www.npmjs.com/package/gulp-inject
    path = require('path'),
    wrench = require('wrench');

var options = {
    src: 'app',
    server: 'server',
    dist: 'dist',
    tmp: '.tmp',
    paths : {
        less: ['./app/css/**/*.less'],
        js_dev: [
            './app/index.js',
            './app/modules/**/*module.js',
            './app/modules/**/*controller.js',
            './app/modules/**/*.js',
            '!./www/js/app.js',
            '!./www/lib/**'
        ],
        js_dev_lazy: [
            './.tmp/js/*.js',
            '!./.tmp/serve/**/*.js'
        ],
        css_dev: [
            './.tmp/css/**/*.css',
            '!./.tmp/**/angular-theme.css',
            '!./.tmp/**/layout.css',
            '!./.tmp/**/custom.css',
            '!./.tmp/serve/**/*.css',
            '!./www/css/ionic.app*.css',
            '!./www/lib/**'
        ],
        css_dev_lazy: [
            './.tmp/css/**/angular-theme.css',
            './.tmp/css/**/layout.css',
            './.tmp/css/**/custom.css'
        ],
        js_dist: [
            './app/index.js',
            './app/modules/**/*module.js',
            './app/modules/**/*controller.js',
            './app/modules/**/*.js',
            '!./.tmp/js',
            '!./www/js/app.js',
            '!./www/lib/**'
        ],
        js_dist_lazy: [
            './dist/scripts/*.js',
        ],
        css_dist: [
            './dist/styles/*.css',
            '!./dist/**/angular-theme*.css',
            '!./dist/**/layout*.css',
            '!./dist/**/custom*.css'
        ],
        css_dist_lazy: [
            './dist/styles/**/angular-theme*.css',
            './dist/styles/**/layout*.css',
            './dist/styles/**/custom*.css'
        ],
    },
    wiredep: {
        directory: 'bower_components',
        exclude: [
            /bootstrap-sass-official\/.*\.js/,
            /bootstrap\.css/,
            /open-sans-fontface\/.*/
        ],
        fileTypes: {
            html: {
                replace: {
                    js: function (filePath) {
                        var options = '';
                        if (filePath.match(/pace\.js/)) {
                            options = " data-pace-options='{ \"target\": \".content-wrap\", \"ghostTime\": 1000 }'"
                        }
                        return '<script' + options + ' src="' + filePath + '"></script>';
                    }
                }
            }
        },
        ignorePath: /^(\.\.\/)+/
    }
};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
    require('./gulp/' + file)(options);
});

gulp.task('default', ['clean'], function () {
    gulp.start('build-dev');
});

gulp.task('dist', ['clean'], function () {
    gulp.start('build-prod');
});

