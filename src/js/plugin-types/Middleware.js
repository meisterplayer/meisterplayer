import ProtoPlugin from './ProtoPlugin';

class Middleware extends ProtoPlugin {
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
            resolve(item);
        });
    }
}

export default Middleware;
