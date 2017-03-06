class ProtoPlugin {
    constructor(config, meister) {
        this.config = config;
        this.meister = meister;
        this.name = this.config.name;

        this.eventStore = [];

        // Don't store this in the eventStore as this messes up unloading of several child classes.
        this.meister.on('requestDestroy', this.destroy.bind(this), this.name);
    }

    on(hook, handler) {
        this.eventStore.push(...this.meister.on(hook, handler, this.name));
    }

    one(hook, block, handler) {
        this.eventStore.push(this.meister.one(hook, block, handler, this.name));
    }

    unload() {
        this.meister.remove(this.eventStore);
        this.eventStore = [];
    }

    destroy() {
        this.unload();
    }
}

export default ProtoPlugin;
