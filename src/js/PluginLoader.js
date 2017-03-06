import Configuration from './Configuration';
import Parallel from './Parallel';

const registered = [];
const loaded = [];

const registeredMiddleware = [];

class PluginLoader {

    constructor(meister) {
        this.loaded = [];
        this.meister = meister;
    }

    static getRegistered() {
        return registered;
    }

    static getLoaded() {
        return loaded;
    }

    static get(name) {
        return registered.find(plugin => (plugin.name === name));
    }

    getLoadedPlugin(name) {
        return this.loaded.find(plugin => (plugin.name === name));
    }

    static getMiddleware(name) {
        return registeredMiddleware.find(plugin => (plugin.name === name));
    }

    config(options, instance) {
        // Merge with the builtIn plugins
        const newOptions = {};
        if (Meister.builtIn) {
            Object.keys(Meister.builtIn).forEach((key) => {
                if (options[key]) {
                    return;
                }

                newOptions[key] = Meister.builtIn[key];
            });
        }

        Object.assign(newOptions, options);

        Object.keys(newOptions).forEach((key) => {
            const plugin = PluginLoader.get(key);

            if (!plugin) {
                if (key !== 'global') {
                    console.warn(`${key} is not a registered plugin.`);
                }

                return;
            }

            let pluginConfig = {};
            pluginConfig = Configuration.get(key);
            pluginConfig.name = key;

            const next = (item) =>
                PluginLoader.execMiddleware(pluginConfig.middleware, instance, item);

            this.loaded.push({
                name: plugin.name,
                plugin: new plugin.Plugin(pluginConfig, instance, next),
                middleware: pluginConfig.middleware,
            });
        });

        // Register built-in plugins.
        this.loaded.push({
            name: 'parallel',
            plugin: new Parallel(instance),
        });
    }

    static execMiddleware(middlewares, instance, item) {
        const result = [];

        // No middlewares? Just return the item. This way we fake a middleware.
        if (!middlewares || !middlewares.length) {
            return new Promise((resolve) => {
                resolve(item);
            });
        }

        middlewares.forEach((middleware) => {
            const middlewareObject = this.getMiddleware(middleware);

            result.push(new middlewareObject.Middleware({}, instance));
        });

        return this.processMiddlewares(result, item);
    }

    static processMiddlewares(middlewares, item, index = 0) {
        return middlewares[index].process(item).then((newItem) => {
            if (middlewares[index + 1]) {
                return this.processMiddlewares(middlewares, newItem, index + 1);
            }

            return newItem;
        });
    }

    getPluginByItem(item) {
        // When DRM is set on an item, let the player know.
        if (item.drmConfig) {
            this.meister.trigger('drmConfig', item.drmConfig);
        }

        const isItemSupportedPromises = [];
        const pluginsInConsideration = [];

        // Add all plugin which have the isItemSupported method to a promise array.
        this.loaded.forEach((plugin) => {
            if (plugin.plugin.isItemSupported) {
                pluginsInConsideration.push(plugin);
                const isSupported = plugin.plugin.isItemSupported(item);

                isItemSupportedPromises.push(isSupported);
            }
        });

        // Go through all the items and search for a plugin that can handle the item.
        return Promise.all(isItemSupportedPromises).then((items) => {
            // Search for the plugin that returned true and map that to the loaded plugins
            let errorCode = Meister.ErrorCodes.WRONG_TYPE;
            for (let i = 0; i < items.length; i++) {
                const supportInfo = items[i];

                if (supportInfo.supported) {
                    return pluginsInConsideration[i].plugin;
                }

                if (supportInfo.errorCode !== Meister.ErrorCodes.WRONG_TYPE) {
                    errorCode = supportInfo.errorCode;
                }
            }

            return { errorCode };
        });
    }

    getPlayerPluginByType(type) {
        const playerPlugin = this.loaded.find((plugin) => {
            if (plugin.plugin.isTypeSupported) {
                return plugin.plugin.isTypeSupported(type);
            }

            return false;
        });

        return playerPlugin ? playerPlugin.plugin : null;
    }

    drawUiPlugins() {
        this.loaded.forEach((plugin) => {
            if (plugin.plugin.draw) {
                plugin.plugin.draw();
            }
        });
    }

    loadAnalyticsPlugins() {
        this.loaded.forEach((plugin) => {
            if (plugin.plugin.isAnalytics) {
                plugin.plugin.load();
            }
        });
    }

    static register(name, plugin) {
        if (this.get(name)) {
            throw new Error(`Plugin ${name} is already registered. Having the same name?`);
        }

        registered.push({
            name,
            Plugin: plugin,
        });
    }

    static registerMiddleware(name, middleware) {
        if (this.getMiddleware(name)) {
            throw new Error(`Middleware ${name} is already registered. Having the same name?`);
        }

        registeredMiddleware.push({
            name,
            Middleware: middleware,
        });
    }
}

export default PluginLoader;
