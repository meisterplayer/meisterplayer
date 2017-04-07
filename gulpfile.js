const gulp = require('gulp');
const tripleGulp = require('@npm-wearetriple/js-dev').gulp;
const webpackTask = require('@npm-wearetriple/gulp-webpack-tasks');

// Building tasks.
const MODULE_NAME = 'Meister';

const bundleConfig = webpackTask.createConfig('./index.js', `build/${MODULE_NAME}.js`);
const bundleCompiler = webpackTask.createCompiler(bundleConfig);
gulp.task('build', webpackTask.createBuildTask(bundleCompiler));

const bundleConfigDist = webpackTask.createConfig('./index.js', `dist/${MODULE_NAME}.js`);
const bundleCompilerDist = webpackTask.createCompiler(bundleConfigDist);
gulp.task('build:dist', webpackTask.createBuildTask(bundleCompilerDist));

const bundleConfigMin = webpackTask.createConfig('./index.js', `dist/${MODULE_NAME}.min.js`, true);
const bundleCompilerMin = webpackTask.createCompiler(bundleConfigMin);
gulp.task('build:min', webpackTask.createBuildTask(bundleCompilerMin));

// Documentation tasks.
gulp.task('js-docs', tripleGulp.jsdocModule.createGenerateDocs(['./src/**/*.js'], './docs/js-docs'));

// Versioning tasks.
gulp.task('bump-version', tripleGulp.versioningModule.createBumpVersion('./package.json'));

// Changelog tasks.
gulp.task('changelog', tripleGulp.changelogModule.createGenerateLog('./CHANGELOG.md'));

// Cleaning tasks
gulp.task('clean:build', tripleGulp.cleanModule.createClean('./build/*'));
gulp.task('clean:dist', tripleGulp.cleanModule.createClean('./dist/*'));
