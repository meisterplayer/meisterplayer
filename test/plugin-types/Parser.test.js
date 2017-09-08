import Parser from '../../src/js/plugin-types/Parser';
import ProtoPlugin from '../../src/js/plugin-types/ProtoPlugin';

jest.mock('../../src/js/plugin-types/ProtoPlugin');

// Mock global errorcodes.
const ERROR_CODE = 404;

global.Meister = {
    ErrorCodes: {
        WRONG_TYPE: ERROR_CODE,
    },
};

describe('Parser', () => {
    const ITEM_STUB = {};
    let originalConsoleError;
    let parser;

    beforeEach(() => {
        originalConsoleError = console.error;
        console.error = jest.fn();

        parser = new Parser();
    });

    afterEach(() => {
        console.error = originalConsoleError;
    });

    describe('isItemSupported', () => {
        test('It should resolve with a unsupported response', async () => {
            const result = await parser.isItemSupported();

            expect(result).toEqual({
                supported: false,
                errorCode: ERROR_CODE,
            });
        });
    });

    describe('process', () => {
        test('It should resolve with the item', async () => {
            const result = await parser.process(ITEM_STUB);

            expect(result).toBe(ITEM_STUB);
        });
    });

    describe('unload', () => {
        test('It should call the super.unload', () => {
            parser.unload();

            expect(ProtoPlugin.prototype.unload.mock.calls.length).toBe(1);
        });
    });
});
