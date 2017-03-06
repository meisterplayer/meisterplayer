const store = [];

class InstanceBag {
    static add(key, value) {
        store[key] = value;
    }

    static get(key) {
        return store[key];
    }
}

export default InstanceBag;
