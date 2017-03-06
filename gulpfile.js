const gulp = require('gulp');
const tripleGulp = require('@npm-wearetriple/js-dev').gulp;

// Building tasks.
const MODULE_NAME = 'Meister';

const rollupConfig = tripleGulp.rollupModule.createRollupConfig('index.js');
const bundleConfig = tripleGulp.rollupModule.createBundleConfig(`./build/${MODULE_NAME}.js`);
gulp.task('build', tripleGulp.rollupModule.createRollupBundler(rollupConfig, bundleConfig));

const rollupConfigDist = tripleGulp.rollupModule.createRollupConfig('index.js');
const bundleConfigDist = tripleGulp.rollupModule.createBundleConfig(`./dist/${MODULE_NAME}.js`);
gulp.task('build:dist', tripleGulp.rollupModule.createRollupBundler(rollupConfigDist, bundleConfigDist));

const rollupConfigMin = tripleGulp.rollupModule.createRollupConfig('index.js', true);
const bundleConfigMin = tripleGulp.rollupModule.createBundleConfig(`./dist/${MODULE_NAME}.min.js`, false, MODULE_NAME, 'umd');
gulp.task('build:min', tripleGulp.rollupModule.createRollupBundler(rollupConfigMin, bundleConfigMin));

// Documentation tasks.
gulp.task('js-docs', tripleGulp.jsdocModule.createGenerateDocs(['./src/**/*.js'], './docs/js-docs'));

// Versioning tasks.
gulp.task('bump-version', tripleGulp.versioningModule.createBumpVersion('./package.json'));

// Changelog tasks.
gulp.task('changelog', tripleGulp.changelogModule.createGenerateLog('./CHANGELOG.md'));

// Cleaning tasks
gulp.task('clean:build', tripleGulp.cleanModule.createClean('./build/*'));
gulp.task('clean:dist', tripleGulp.cleanModule.createClean('./dist/*'));
