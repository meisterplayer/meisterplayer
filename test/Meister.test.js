import Meister from '../src/js/Meister';

jest.enableAutomock().unmock('../src/js/Meister');

describe('Meister class', () => {
    test('version should return a version string', () => {
        // Version should match the SemVer pattern (e.g. 2.11.9)
        expect(Meister.version).toMatch(/\d+\.\d+\.\d+/);
    });
});
