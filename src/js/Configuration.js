const ENVIRONMENT = 'development';

const store = {
    production: {
        global: {
            autoplay: false,
            controls: true,
            startMuted: false,
            debug: false,
            audioOnly: false,
        },
        Dash: {
            dvrThreshold: 300,
            dvrEnabled: true,
        },
        Hls: {
            dvrEnabled: true,
        },
    },

    development: {
        global: {
            autoplay: false,
            controls: true,
            startMuted: false,
            debug: false,
            audioOnly: false,
        },
        Dash: {
            dvrThreshold: 300,
            dvrEnabled: true,
        },
        Hls: {
            dvrEnabled: true,
        },
    },
};


class Configuration {

    static set(key, value) {
        store[ENVIRONMENT][key] = value;
    }

    static get(key) {
        return store[ENVIRONMENT][key];
    }

    static getGlobals(options) {
        Object.keys(options).forEach((key) => {
            store[ENVIRONMENT].global[key] = options[key];
        });

        return store[ENVIRONMENT].global;
    }

    static overwrite(plugins) {
        // For all plugins..
        Object.keys(plugins).forEach((plugin) => {
            if (!store[ENVIRONMENT][plugin]) {
                // If not, create a new config object and move on
                store[ENVIRONMENT][plugin] = plugins[plugin];
                return;
            }

            Object.keys(plugins[plugin]).forEach((config) => {
                store[ENVIRONMENT][plugin][config] = plugins[plugin][config];
            });
        });
    }

    static getAll() {
        return store[ENVIRONMENT];
    }
}

export default Configuration;
