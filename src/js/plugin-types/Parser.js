import ProtoPlugin from './ProtoPlugin';

class Parser extends ProtoPlugin {
    // eslint-disable-next-line class-methods-use-this
    isItemSupported() {
        return new Promise(resolve => resolve({
            supported: false,
            errorCode: Meister.ErrorCodes.WRONG_TYPE,
        }));
    }

    // eslint-disable-next-line class-methods-use-this
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
