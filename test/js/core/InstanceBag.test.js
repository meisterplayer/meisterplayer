import InstanceBag from '../../../src/js/core/InstanceBag';


describe('InstanceBag', () => {
    describe('.add() & .get()', () => {
        it('add and get a item', () => {
            InstanceBag.add('test', 40);
            const value = InstanceBag.get('test');

            expect(value).to.equal(40);
        });

        it('expect double keys to overwrite', () => {
            InstanceBag.add('test', 40);
            InstanceBag.add('test', 41);

            expect(InstanceBag.get('test')).to.equal(41);
        });
    });
});
