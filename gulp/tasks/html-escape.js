'use strict';

/*
    the html escape task loops through the html files in the htmlinclude folder (based on the config).
    then, escapes the html, so it can be showed properly.
*/

const gulp = require('gulp');
const config = require('../config.js');
const mergeStream = require('merge-stream');
var plugins = require('gulp-load-plugins')();

gulp.task('html-escape', function() {
    var streams = config.bundles.filter(function (b) {
        return b.htmlIncludes != null;
    }).map(function (b) {
        var ignores = b.ignorePlugins != null ? b.ignorePlugins : [];

        console.log(b.name + ' html includes are being escaped');

        return gulp.src(b.htmlIncludes)
            .pipe(plugins.plumber(config.errorHandler("html-escape")))
            .pipe(plugins.htmlEscape(config.htmlEscapeConfig))
            .pipe(gulp.dest(config.htmlEscapeDistPath));
    });

    return mergeStream(streams);
});
