const gulp = require('gulp');
const tripleGulp = require('meister-js-dev').gulp;
const webpackTask = require('meister-gulp-webpack-tasks');
const argv = require('yargs').argv;

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
let type = 'patch';
const userType = argv.type ? argv.type.toLowerCase() : null;
if (userType && (userType === 'major' || userType === 'minor')) {
    type = userType;
}
gulp.task('bump-package', tripleGulp.versioningModule.createBumpVersion('./package.json', type));


gulp.task('bump-version', ['bump-package'], () => {
    // Update other files with the new version number.
    const newVersion = tripleGulp.versioningModule.extractPackageVersion('./package.json');
    return tripleGulp.versioningModule.createReplaceVersion(['./README.md', './docs/*.md', './src/js/Meister.js'], newVersion)();
});


// Changelog tasks.
gulp.task('changelog', tripleGulp.changelogModule.createGenerateLog('./CHANGELOG.md'));

// Cleaning tasks
gulp.task('clean:build', tripleGulp.cleanModule.createClean('./build/*'));
gulp.task('clean:dist', tripleGulp.cleanModule.createClean('./dist/*'));
