import Configuration from '../../../src/js/core/Configuration';


describe('Configuration', () => {
    describe('.set() & .get()', () => {
        it('add and get the same item', () => {
            Configuration.set('test', 3);
            const result = Configuration.get('test');

            expect(result).to.equal(3);
        });
    });

    describe('.getGlobals()', () => {
        it('return global values', () => {
            const globals = Configuration.getGlobals({});

            expect(globals.audioOnly).to.exist;
        });

        it('overwrite all default values', () => {
            const globals = Configuration.getGlobals({
                autoplay: true,
                controls: false,
            });

            expect(globals.autoplay).to.be.true;
            expect(globals.controls).to.be.false;
        });
    });

    describe('.overwrite()', () => {
        it('overwrite all default values', () => {
            Configuration.overwrite({
                global: {
                    autoplay: true,
                    controls: false,
                }
            });

            const globalConfiguration = Configuration.get('global');

            // Make sure our overwrites took effect.
            expect(globalConfiguration.autoplay).to.be.true;
            expect(globalConfiguration.controls).to.be.false;

            // Also make sure our non overwritten values are still the same.
            expect(globalConfiguration.startMuted).to.be.false;
        });
    });
});
