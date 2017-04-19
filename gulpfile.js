const gulp = require('gulp');
const tripleGulp = require('meister-js-dev').gulp;
const webpackTask = require('meister-gulp-webpack-tasks');

// Building tasks.
const MODULE_NAME = 'Meister';

gulp.task('build', (done) => {
    const bundleConfig = webpackTask.createConfig('./index.js', `build/${MODULE_NAME}.js`, false);
    const bundleCompiler = webpackTask.createCompiler(bundleConfig);

    webpackTask.createBuildTask(bundleCompiler)(done);
});

gulp.task('build:dist', (done) => {
    const bundleConfigDist = webpackTask.createConfig('./index.js', `dist/${MODULE_NAME}.js`, false);
    const bundleCompilerDist = webpackTask.createCompiler(bundleConfigDist);

    webpackTask.createBuildTask(bundleCompilerDist)(done);
});

gulp.task('build:min', (done) => {
    const bundleConfigMin = webpackTask.createConfig('./index.js', `dist/${MODULE_NAME}.min.js`, true);
    const bundleCompilerMin = webpackTask.createCompiler(bundleConfigMin);

    webpackTask.createBuildTask(bundleCompilerMin)(done);
});

// Documentation tasks.
gulp.task('js-docs', tripleGulp.jsdocModule.createGenerateDocs(['./src/**/*.js'], './docs/js-docs'));

// Versioning tasks.
gulp.task('bump-version', tripleGulp.versioningModule.createBumpVersion('./package.json'));

// Changelog tasks.
gulp.task('changelog', tripleGulp.changelogModule.createGenerateLog('./CHANGELOG.md'));

// Cleaning tasks
gulp.task('clean:build', tripleGulp.cleanModule.createClean('./build/*'));
gulp.task('clean:dist', tripleGulp.cleanModule.createClean('./dist/*'));
