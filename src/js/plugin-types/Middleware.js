import ProtoPlugin from './ProtoPlugin';

class Middleware extends ProtoPlugin {
    isItemSupported() {
        return new Promise(resolve => resolve({
            supported: false,
            errorCode: Meister.ErrorCodes.WRONG_TYPE,
        }));
    }

    process(item) {
        return new Promise((resolve) => {
            resolve(item);
        });
    }
}

export default Middleware;
