import ProtoPlugin from '../../src/js/plugin-types/ProtoPlugin';

describe('ProtoPlugin', () => {
    const CB_HOOK_STUB = 'stubEvent';
    const CB_STUB = () => {};
    const REGISTERED_EVENT_STUB = {};
    const NAME_STUB = 'ProtoPlugin';
    const protoPluginConfigMock = {
        name: NAME_STUB,
    };

    let onMock;
    let oneMock;
    let removeMock;
    let meisterInstanceMock;
    let protoPlugin;

    beforeEach(() => {
        onMock = jest.fn(() => [REGISTERED_EVENT_STUB]);
        oneMock = jest.fn(() => REGISTERED_EVENT_STUB);
        removeMock = jest.fn();
        meisterInstanceMock = {
            on: onMock,
            one: oneMock,
            remove: removeMock,
        };

        protoPlugin = new ProtoPlugin(protoPluginConfigMock, meisterInstanceMock);
        // Get rid of the constructor call.
        onMock.mock.calls.length = 0;
    });

    describe('Constructor', () => {
        test('It should register a callback for "requestDestroy" with the config.name', () => {
            // Redo constructor to properly test the callback registration
            protoPlugin = new ProtoPlugin(protoPluginConfigMock, meisterInstanceMock);

            expect(onMock.mock.calls.length).toBe(1);
            expect(onMock).toBeCalledWith('requestDestroy', expect.any(Function), NAME_STUB);
        });
    });

    describe('on', () => {
        test('It should proxy meister.on and add the config.name as the last parameter', () => {
            protoPlugin.on(CB_HOOK_STUB, CB_STUB);

            expect(onMock.mock.calls.length).toBe(1);
            expect(onMock).toBeCalledWith(CB_HOOK_STUB, CB_STUB, NAME_STUB);
        });
    });

    describe('one', () => {
        test('It should should proxy meister.one and add the config name as the last paramater', () => {
            const BLOCK_STUB = false;
            protoPlugin.one(CB_HOOK_STUB, BLOCK_STUB, CB_STUB);

            expect(oneMock.mock.calls.length).toBe(1);
            expect(oneMock).toBeCalledWith(CB_HOOK_STUB, BLOCK_STUB, CB_STUB, NAME_STUB);
        });
    });

    describe('unload', () => {
        test('It should call meister.remove with a list of registered events', () => {
            protoPlugin.on(CB_HOOK_STUB, CB_STUB);
            protoPlugin.one(CB_HOOK_STUB, CB_STUB);

            protoPlugin.unload();

            expect(removeMock.mock.calls.length).toBe(1);
            expect(removeMock).toBeCalledWith([REGISTERED_EVENT_STUB, REGISTERED_EVENT_STUB]);
        });
    });

    describe('destroy', () => {
        test('It should call protoPlugin.unload', () => {
            protoPlugin.unload = jest.fn();

            protoPlugin.destroy();

            expect(protoPlugin.unload.mock.calls.length).toBe(1);
        });
    });
});
