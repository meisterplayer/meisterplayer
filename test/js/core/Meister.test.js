import Meister from '../../../src/js/core/Meister';

let meister = null;
let domElement = null;

describe('Meister', () => {
    before(() => {
        domElement = document.createElement('div');
        domElement.id = 'testElement';

        // Attach domElement to body so we can find it later.
        document.body.appendChild(domElement);
    });

    beforeEach(() => {
        meister = new Meister('#testElement');
    });

    describe('version', () => {
        it('should be a string', () => {
            expect(meister.version).to.be.a('string');
        });

        it('should not be able to be set', () => {
            meister.version = 'FAKE_VERSION';
            expect(meister.version).to.not.equal('FAKE_VERSION');
        })
    });

    describe('debugEnabled', () => {
        it('should be a boolean', () => {
            assert.isBoolean(meister.debugEnabled);
        });

        it('should be settable', () => {
            meister.debugEnabled = true;
            expect(meister.debugEnabled).to.be.true;

            meister.debugEnabled = false;
            expect(meister.debugEnabled).to.be.false;
        });
    });

    after(() => {
        meister = null;
        domElement = null;
    });
});
