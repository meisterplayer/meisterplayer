const gulp = require('gulp');
const tripleGulp = require('@npm-wearetriple/js-dev').gulp;
const rollupGulp = require('@npm-wearetriple/gulp-rollup-tasks');

// Building tasks.
const MODULE_NAME = 'Meister';

const rollupConfig = rollupGulp.createRollupConfig('index.js');
const bundleConfig = rollupGulp.createBundleConfig(`./build/${MODULE_NAME}.js`);
gulp.task('build', rollupGulp.createRollupBundler(rollupConfig, bundleConfig));

const rollupConfigDist = rollupGulp.createRollupConfig('index.js');
const bundleConfigDist = rollupGulp.createBundleConfig(`./dist/${MODULE_NAME}.js`);
gulp.task('build:dist', rollupGulp.createRollupBundler(rollupConfigDist, bundleConfigDist));

const rollupConfigMin = rollupGulp.createRollupConfig('index.js', true);
const bundleConfigMin = rollupGulp.createBundleConfig(`./dist/${MODULE_NAME}.min.js`, false, MODULE_NAME, 'umd');
gulp.task('build:min', rollupGulp.createRollupBundler(rollupConfigMin, bundleConfigMin));

// Documentation tasks.
gulp.task('js-docs', tripleGulp.jsdocModule.createGenerateDocs(['./src/**/*.js'], './docs/js-docs'));

// Versioning tasks.
gulp.task('bump-version', tripleGulp.versioningModule.createBumpVersion('./package.json'));

// Changelog tasks.
gulp.task('changelog', tripleGulp.changelogModule.createGenerateLog('./CHANGELOG.md'));

// Cleaning tasks
gulp.task('clean:build', tripleGulp.cleanModule.createClean('./build/*'));
gulp.task('clean:dist', tripleGulp.cleanModule.createClean('./dist/*'));
