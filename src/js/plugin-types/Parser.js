import ProtoPlugin from './ProtoPlugin';

class Parser extends ProtoPlugin {
    isItemSupported() {
        return new Promise((resolve) => resolve({
            supported: false,
            errorCode: Meister.ErrorCodes.WRONG_TYPE,
        }));
    }

    process(item) {
        return new Promise((resolve) => {
            console.error('Process not implemented. Player may not play correctly.');
            resolve(item);
        });
    }

    unload() {
        super.unload();
    }
}

export default Parser;
