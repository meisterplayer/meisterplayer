const rollupConfig = require('./gulp/tasks/bundle').rollupConfig;
const newRollupConfig = {
    format: 'iife',
    moduleName: 'Meister',
    sourceMap: 'inline',
    plugins: rollupConfig.plugins,
}

module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'chai'],

        files: [
            'test/js/**/*.test.js'
        ],

        preprocessors: {
            'test/js/**/*.test.js': ['rollup']
        },
        rollupPreprocessor: newRollupConfig,

        reporters: ['mocha'],

        mochaReporter: {
            output: 'spec'
        },

        browsers: ['Chrome'],

        client: {
            mocha: {
                reporter: 'html',
                ui: 'bdd',
            }
        }
    });
};
