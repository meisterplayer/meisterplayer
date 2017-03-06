import PluginLoader from '../../../src/js/core/PluginLoader';

let pluginLoader = null;

describe('PluginLoader', () => {

    // Test with a new plugin loader every test.
    beforeEach(function() {
        pluginLoader = new PluginLoader({
            trigger: () => {},
        });
    });

    describe('getRegistered()', function() {
        it('return an array', function() {
            expect(PluginLoader.getRegistered()).to.be.instanceOf(Array);
        });
    });

    describe('register', function() {

    });

    describe('get', function() {

    });
})
