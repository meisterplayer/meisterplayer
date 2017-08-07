import Meister from '../src/js/Meister';

jest.enableAutomock().unmock('../src/js/Meister');

describe('Meister class', () => {
    test('version should return a version string', () => {
        // Version should match the SemVer pattern (e.g. 2.11.9)
        expect(Meister.version).toMatch(/\d+\.\d+\.\d+/);
    });
});

describe('The rest of the test suite', () => {
    test('It should be written', () => {
        const test = { testsWritten: false };

        expect(test).toEqual({ testsWritten: true });
    });
});
