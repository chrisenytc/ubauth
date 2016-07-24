'use strict';

var Q = require('q');
var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var jetpack = require('fs-jetpack');
var asar = require('asar');

var bundle = require('./bundle');
var generateSpecImportsFile = require('./generate_spec_imports');
var utils = require('../utils');
var pkg = require('../../app/package.json');

var projectDir = jetpack;
var srcDir = projectDir.cwd('./app');
var destDir = projectDir.cwd('./build');

var paths = {
    copyFromAppDir: [
        './node_modules/**',
        './helpers/**',
        './assets/**',
        './**/*.html',
        './**/*.+(jpg|png|svg)'
    ],
};

// -------------------------------------
// Tasks
// -------------------------------------

gulp.task('clean', function () {
    return destDir.dirAsync('.', { empty: true });
});

var copyTask = function () {
    return projectDir.copyAsync('app', destDir.path(), {
            overwrite: true,
            matching: paths.copyFromAppDir
        });
};

gulp.task('copy', ['clean'], copyTask);
gulp.task('copy-watch', ['copy', 'generate']);

var generateTask = function () {
    var deferred = Q.defer();
    asar.createPackage(destDir.path(), destDir.path(pkg.productName + '.asar'), function() {
        deferred.resolve();
    });
    return deferred.promise;
};

gulp.task('generate', ['copy'], generateTask);

var bundleApplication = function () {
    return Q.all([
            bundle(srcDir.path('background.js'), destDir.path('background.js')),
            bundle(srcDir.path('app.js'), destDir.path('app.js')),
            bundle(srcDir.path('src', 'controllers', 'auth.js'), destDir.path('controllers', 'auth.js')),
            bundle(srcDir.path('src', 'controllers', 'success.js'), destDir.path('controllers', 'success.js')),
            bundle(srcDir.path('src', 'services', 'uber.js'), destDir.path('services', 'uber.js'))
        ]);
};

var bundleSpecs = function () {
    return generateSpecImportsFile().then(function (specEntryPointPath) {
        return bundle(specEntryPointPath, destDir.path('spec.js'));
    });
};

var bundleTask = function () {
    if (utils.getEnvName() === 'test') {
        return bundleSpecs()
            .then(bundleApplication());
    }
    return bundleApplication();
};

gulp.task('bundle', ['clean'], bundleTask);
gulp.task('bundle-watch', ['bundle']);

gulp.task('environment', ['clean'], function () {
    var configFile = 'config/env_' + utils.getEnvName() + '.json';
    projectDir.copy(configFile, destDir.path('env.json'));
});

gulp.task('package-json', ['clean'], function () {
    var manifest = srcDir.read('package.json', 'json');

    // Add "dev" suffix to name, so Electron will write all data like cookies
    // and localStorage in separate places for production and development.
    if (utils.getEnvName() === 'development') {
        manifest.name += '-dev';
        manifest.productName += ' Dev';
    }

    destDir.write('package.json', manifest);
});

gulp.task('watch', function () {
    watch('app/**/*.js', batch(function (events, done) {
        gulp.start('bundle-watch', done);
    }));
    watch(paths.copyFromAppDir, { cwd: 'app' }, batch(function (events, done) {
        gulp.start('copy-watch', done);
    }));
});

gulp.task('build', ['bundle', 'environment', 'package-json', 'generate']);
