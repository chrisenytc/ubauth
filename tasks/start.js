'use strict';

var childProcess = require('child_process');
var electron = require('electron-prebuilt');
var gulp = require('gulp');
var pkg = require('../app/package.json');

gulp.task('start', ['build', 'watch'], function () {
    childProcess.spawn(electron, ['./build/' + pkg.productName + '.asar'], {
        stdio: 'inherit'
    })
    .on('close', function () {
        // User closed the app. Kill the host process.
        process.exit();
    });
});
