var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var ENVIRONMENT = 'development';

var store = {
    production: {
        global: {
            autoplay: false,
            controls: true,
            startMuted: false,
            debug: false,
            audioOnly: false
        },
        dash: {
            dvrThreshold: 300,
            dvrEnabled: true
        },
        hls: {
            dvrEnabled: true
        }
    },

    development: {
        global: {
            autoplay: false,
            controls: true,
            startMuted: false,
            debug: false,
            audioOnly: false
        },
        dash: {
            dvrThreshold: 300,
            dvrEnabled: true
        },
        hls: {
            dvrEnabled: true
        }
    }
};

var Configuration = function () {
    function Configuration() {
        classCallCheck(this, Configuration);
    }

    createClass(Configuration, null, [{
        key: 'set',
        value: function set$$1(key, value) {
            store[ENVIRONMENT][key] = value;
        }
    }, {
        key: 'get',
        value: function get$$1(key) {
            return store[ENVIRONMENT][key];
        }
    }, {
        key: 'getGlobals',
        value: function getGlobals(options) {
            Object.keys(options).forEach(function (key) {
                store[ENVIRONMENT].global[key] = options[key];
            });

            return store[ENVIRONMENT].global;
        }
    }, {
        key: 'overwrite',
        value: function overwrite(plugins) {
            // For all plugins..
            Object.keys(plugins).forEach(function (plugin) {
                if (!store[ENVIRONMENT][plugin]) {
                    // If not, create a new config object and move on
                    store[ENVIRONMENT][plugin] = plugins[plugin];
                    return;
                }

                Object.keys(plugins[plugin]).forEach(function (config) {
                    store[ENVIRONMENT][plugin][config] = plugins[plugin][config];
                });
            });
        }
    }, {
        key: 'getAll',
        value: function getAll() {
            return store[ENVIRONMENT];
        }
    }]);
    return Configuration;
}();

var ProtoPlugin = function () {
    function ProtoPlugin(config, meister) {
        classCallCheck(this, ProtoPlugin);

        this.config = config;
        this.meister = meister;
        this.name = this.config.name;

        this.eventStore = [];

        // Don't store this in the eventStore as this messes up unloading of several child classes.
        this.meister.on('requestDestroy', this.destroy.bind(this), this.name);
    }

    createClass(ProtoPlugin, [{
        key: 'on',
        value: function on(hook, handler) {
            var _eventStore;

            (_eventStore = this.eventStore).push.apply(_eventStore, toConsumableArray(this.meister.on(hook, handler, this.name)));
        }
    }, {
        key: 'one',
        value: function one(hook, block, handler) {
            this.eventStore.push(this.meister.one(hook, block, handler, this.name));
        }
    }, {
        key: 'unload',
        value: function unload() {
            this.meister.remove(this.eventStore);
            this.eventStore = [];
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.unload();
        }
    }]);
    return ProtoPlugin;
}();

var Media = function (_ProtoPlugin) {
    inherits(Media, _ProtoPlugin);

    function Media() {
        classCallCheck(this, Media);
        return possibleConstructorReturn(this, (Media.__proto__ || Object.getPrototypeOf(Media)).apply(this, arguments));
    }

    createClass(Media, [{
        key: 'isItemSupported',

        /**
         * Checking if an item is supported by the plugin
         * @return {boolean} Default always returns false.
         */
        value: function isItemSupported() {
            return new Promise(function (resolve) {
                return resolve({
                    supported: false,
                    errorCode: Meister.ErrorCodes.WRONG_TYPE
                });
            });
        }
    }, {
        key: 'process',


        /**
         * Process is for reading metadata/parsing
         */
        value: function process(item) {
            return new Promise(function (resolve) {
                console.warn('Process not implemented. Player may not play correctly.');
                resolve(item);
            });
        }

        /**
         * Registers events and prepares for play.
         */

    }, {
        key: 'load',
        value: function load(item) {
            var _this2 = this;

            if (this.meister.config.debug) {
                console.log('Loading item with type \'' + item.type + '\' and src \'' + item.src + '\'');
            }
            if (Number.isFinite(item.startPosition)) {
                this.startPosition = item.startPosition;
            }
            this.on('playerLoadedMetadata', function () {
                return _this2.playerLoadedMetadata();
            });

            this.blockSeekForward = !!item.blockSeekForward;
        }
    }, {
        key: 'playerLoadedMetadata',
        value: function playerLoadedMetadata() {
            // when startPosition is within the duration of the current video
            if (this.startPosition > 0 && this.player.duration > this.startPosition) {
                this.meister.trigger('requestSeek', {
                    targetTime: this.startPosition,
                    forcedStart: true
                });
            }
        }

        /**
         * Unloads events that you dont need anymore.
         */

    }, {
        key: 'unload',
        value: function unload() {
            get(Media.prototype.__proto__ || Object.getPrototypeOf(Media.prototype), 'unload', this).call(this);
            this.startPosition = null;
            this.blockSeekForward = false;
        }

        /**
         * Destroys the whole plugin.
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            get(Media.prototype.__proto__ || Object.getPrototypeOf(Media.prototype), 'destroy', this).call(this);
        }
    }, {
        key: 'currentItem',
        get: function get$$1() {
            console.error(this.name + ' does not support this method.');
            return null;
        }
    }]);
    return Media;
}(ProtoPlugin);

// import PluginLoader from './plugin-loader';
var Parallel = function (_MediaPlugin) {
    inherits(Parallel, _MediaPlugin);

    function Parallel(meister) {
        classCallCheck(this, Parallel);

        var _this = possibleConstructorReturn(this, (Parallel.__proto__ || Object.getPrototypeOf(Parallel)).call(this, { name: 'parallel-builtin' }, meister));

        _this.meister = meister;
        _this.plugins = [];

        _this.bitrates = null;
        _this.currentBitrateIndex = 0;

        _this.plugin = null;

        _this.eventStore = [];
        return _this;
    }

    createClass(Parallel, [{
        key: 'isItemSupported',
        value: function isItemSupported(item) {
            return new Promise(function (resolve) {
                if (item.type !== 'media') {
                    return resolve({
                        supported: false,
                        errorCode: Meister.ErrorCodes.WRONG_TYPE
                    });
                }

                return resolve({
                    supported: true
                });
            });
        }
    }, {
        key: 'process',
        value: function process(item) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var processPromises = [];

                _this2.bitrates = item.bitrates;
                _this2.currentBitrateIndex = Math.floor(_this2.bitrates.length / 2);

                // Don't trigger bitrates for hls media.
                var sampleItem = _this2.bitrates[_this2.currentBitrateIndex];

                if (sampleItem.type !== 'm3u' && sampleItem.type !== 'm3u8' && sampleItem.type !== 'mpd' && sampleItem.type !== 'dash' && sampleItem.metadata) {
                    _this2.bitrates.sort(function (a, b) {
                        return a.metadata.bitrate - b.metadata.bitrate;
                    });

                    var selectableBitrates = [];
                    for (var i = 0; i < _this2.bitrates.length; i++) {
                        var bitrate = _this2.bitrates[i];

                        // If there is a defalt bitrate specified prefer that.
                        if (bitrate.default) {
                            _this2.currentBitrateIndex = i;
                        }

                        selectableBitrates.push({
                            bitrate: bitrate.metadata.bitrate,
                            index: i
                        });
                    }

                    _this2.meister.trigger('itemBitrates', {
                        bitrates: selectableBitrates,
                        currentIndex: _this2.currentBitrateIndex
                    });
                }

                _this2.meister.pluginLoader.getPluginByItem(_this2.bitrates[_this2.currentBitrateIndex]).then(function (itemPlugin) {
                    if (itemPlugin.errorCode) {
                        _this2.meister.error('Could not find plugin to play type: \'' + _this2.bitrates[_this2.currentBitrateIndex].type + '\'.', //eslint-disable-line
                        itemPlugin.errorCode, { title: 'Unable to play content.' });
                        return;
                    }

                    _this2.plugin = itemPlugin;

                    var getPluginsPromises = [];

                    processPromises.push(_this2.plugin.process(_this2.bitrates[_this2.currentBitrateIndex]));

                    // Get all plugins for each parallelItem
                    item.parallel.forEach(function (parallelItem) {
                        var plugin = _this2.meister.pluginLoader.getPluginByItem(parallelItem);
                        if (plugin.errorCode) {
                            return;
                        }

                        getPluginsPromises.push(plugin);
                    });

                    Promise.all(getPluginsPromises).then(function (plugins) {
                        // Process all plugins..
                        plugins.forEach(function (plugin, index) {
                            if (!plugin.errorCode) {
                                _this2.plugins.push(plugin);

                                processPromises.push(plugin.process(item.parallel[index]));
                            }
                        });

                        Promise.all(processPromises).then(function () {
                            resolve(item);
                        }).catch(function (err) {
                            reject(err);
                        });
                    });
                });
            });
        }
    }, {
        key: 'load',
        value: function load(item) {
            var _this3 = this;

            this.plugin.load(this.bitrates[this.currentBitrateIndex]);

            this.plugins.forEach(function (plugin, index) {
                // XXX: Not sure if this should work.
                plugin.load(item.parallel[index]);
            });

            if (!this.plugin.onRequestBitrate) {
                this.on('requestBitrate', function (info) {
                    return _this3.onRequestBitrate(info.bitrateIndex);
                });
            }
        }
    }, {
        key: 'unload',
        value: function unload() {
            get(Parallel.prototype.__proto__ || Object.getPrototypeOf(Parallel.prototype), 'unload', this).call(this);

            // Unload the main plugin.
            if (this.plugin) this.plugin.unload();

            // Unload parallel plugins.
            this.plugins.forEach(function (plugin) {
                plugin.unload();
            });

            this.plugins = [];
        }
    }, {
        key: 'onRequestBitrate',
        value: function onRequestBitrate(index) {
            // No need to do anything when the same bitrate is requested.
            if (this.currentBitrateIndex === index) {
                return;
            }

            this.currentBitrateIndex = index;

            if (this.plugin && this.plugin.changeBitrate) {
                this.plugin.changeBitrate(this.currentBitrateIndex);
                return;
            }

            // Assuming variant bitrates are the same type
            var switchTime = this.meister.currentTime;
            var wasPlaying = this.meister.playing;

            // HACK: This can be done way prettier.
            this.plugin.unload();
            this.plugin.load(this.bitrates[this.currentBitrateIndex]);
            this.meister.currentTime = switchTime;
            if (wasPlaying) this.meister.play();

            var newBitrate = this.bitrates[this.currentBitrateIndex].metadata ? this.bitrates[this.currentBitrateIndex].metadata.bitrate : 0;

            this.meister.trigger('playerSwitchBitrate', {
                newBitrate: newBitrate,
                newBitrateIndex: index
            });
        }
    }, {
        key: 'currentItem',
        get: function get$$1() {
            if (this.plugin) {
                return this.plugin.currentItem;
            }

            return null;
        }
    }]);
    return Parallel;
}(Media);

var registered = [];
var loaded = [];

var registeredMiddleware = [];

var PluginLoader = function () {
    function PluginLoader(meister) {
        classCallCheck(this, PluginLoader);

        this.loaded = [];
        this.meister = meister;
    }

    createClass(PluginLoader, [{
        key: 'getLoadedPlugin',
        value: function getLoadedPlugin(name) {
            return this.loaded.find(function (plugin) {
                return plugin.name === name;
            });
        }
    }, {
        key: 'config',
        value: function config(options, instance) {
            var _this = this;

            // Merge with the builtIn plugins
            var newOptions = {};
            if (Meister.builtIn) {
                Object.keys(Meister.builtIn).forEach(function (key) {
                    if (options[key]) {
                        return;
                    }

                    newOptions[key] = Meister.builtIn[key];
                });
            }

            Object.assign(newOptions, options);

            Object.keys(newOptions).forEach(function (key) {
                var plugin = PluginLoader.get(key);

                if (!plugin) {
                    if (key !== 'global') {
                        console.warn(key + ' is not a registered plugin.');
                    }

                    return;
                }

                var pluginConfig = {};
                pluginConfig = Configuration.get(key);
                pluginConfig.name = key;

                var next = function next(item) {
                    return PluginLoader.execMiddleware(pluginConfig.middleware, instance, item);
                };

                _this.loaded.push({
                    name: plugin.name,
                    plugin: new plugin.Plugin(pluginConfig, instance, next),
                    middleware: pluginConfig.middleware
                });
            });

            // Register built-in plugins.
            this.loaded.push({
                name: 'parallel',
                plugin: new Parallel(instance)
            });
        }
    }, {
        key: 'getPluginByItem',
        value: function getPluginByItem(item) {
            // When DRM is set on an item, let the player know.
            if (item.drmConfig) {
                this.meister.trigger('drmConfig', item.drmConfig);
            }

            var isItemSupportedPromises = [];
            var pluginsInConsideration = [];

            // Add all plugin which have the isItemSupported method to a promise array.
            this.loaded.forEach(function (plugin) {
                if (plugin.plugin.isItemSupported) {
                    pluginsInConsideration.push(plugin);
                    var isSupported = plugin.plugin.isItemSupported(item);

                    isItemSupportedPromises.push(isSupported);
                }
            });

            // Go through all the items and search for a plugin that can handle the item.
            return Promise.all(isItemSupportedPromises).then(function (items) {
                // Search for the plugin that returned true and map that to the loaded plugins
                var errorCode = Meister.ErrorCodes.WRONG_TYPE;
                for (var i = 0; i < items.length; i++) {
                    var supportInfo = items[i];

                    if (supportInfo.supported) {
                        return pluginsInConsideration[i].plugin;
                    }

                    if (supportInfo.errorCode !== Meister.ErrorCodes.WRONG_TYPE) {
                        errorCode = supportInfo.errorCode;
                    }
                }

                return { errorCode: errorCode };
            });
        }
    }, {
        key: 'getPlayerPluginByType',
        value: function getPlayerPluginByType(type) {
            var playerPlugin = this.loaded.find(function (plugin) {
                if (plugin.plugin.isTypeSupported) {
                    return plugin.plugin.isTypeSupported(type);
                }

                return false;
            });

            return playerPlugin ? playerPlugin.plugin : null;
        }
    }, {
        key: 'drawUiPlugins',
        value: function drawUiPlugins() {
            this.loaded.forEach(function (plugin) {
                if (plugin.plugin.draw) {
                    plugin.plugin.draw();
                }
            });
        }
    }, {
        key: 'loadAnalyticsPlugins',
        value: function loadAnalyticsPlugins() {
            this.loaded.forEach(function (plugin) {
                if (plugin.plugin.isAnalytics) {
                    plugin.plugin.load();
                }
            });
        }
    }], [{
        key: 'getRegistered',
        value: function getRegistered() {
            return registered;
        }
    }, {
        key: 'getLoaded',
        value: function getLoaded() {
            return loaded;
        }
    }, {
        key: 'get',
        value: function get$$1(name) {
            return registered.find(function (plugin) {
                return plugin.name === name;
            });
        }
    }, {
        key: 'getMiddleware',
        value: function getMiddleware(name) {
            return registeredMiddleware.find(function (plugin) {
                return plugin.name === name;
            });
        }
    }, {
        key: 'execMiddleware',
        value: function execMiddleware(middlewares, instance, item) {
            var _this2 = this;

            var result = [];

            // No middlewares? Just return the item. This way we fake a middleware.
            if (!middlewares || !middlewares.length) {
                return new Promise(function (resolve) {
                    resolve(item);
                });
            }

            middlewares.forEach(function (middleware) {
                var middlewareObject = _this2.getMiddleware(middleware);

                result.push(new middlewareObject.Middleware({}, instance));
            });

            return this.processMiddlewares(result, item);
        }
    }, {
        key: 'processMiddlewares',
        value: function processMiddlewares(middlewares, item) {
            var _this3 = this;

            var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            return middlewares[index].process(item).then(function (newItem) {
                if (middlewares[index + 1]) {
                    return _this3.processMiddlewares(middlewares, newItem, index + 1);
                }

                return newItem;
            });
        }
    }, {
        key: 'register',
        value: function register(name, plugin) {
            if (this.get(name)) {
                throw new Error('Plugin ' + name + ' is already registered. Having the same name?');
            }

            registered.push({
                name: name,
                Plugin: plugin
            });
        }
    }, {
        key: 'registerMiddleware',
        value: function registerMiddleware(name, middleware) {
            if (this.getMiddleware(name)) {
                throw new Error('Middleware ' + name + ' is already registered. Having the same name?');
            }

            registeredMiddleware.push({
                name: name,
                Middleware: middleware
            });
        }
    }]);
    return PluginLoader;
}();

var index = noop;

// no operation
// null -> null
function noop() {}

var EventHandler = function () {
    function EventHandler(eventHooks) {
        classCallCheck(this, EventHandler);

        this.counter = 0;
        this.disabledHandles = [];

        // Protected handles are callbacks that cannot be blocked and thus
        // protected.
        this.protectedHandles = {};

        // Register the default event hooks.
        this.stack = {};
        for (var i = 0; i < eventHooks.length; i++) {
            var eventHook = eventHooks[i];

            this.stack[eventHook] = [];
        }
    }

    createClass(EventHandler, [{
        key: 'on',
        value: function on(hooks, method) {
            var caller = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Anonymous';

            // Check whether the method is a function.
            if (!(method instanceof Function)) {
                console.error('EventHandler: Provided handler is not a function.');
                return;
            }

            // Convert hooks to an array to keep flow similar.
            if (!(hooks instanceof Array)) {
                hooks = [hooks];
            }

            // Register the handle on all hooks.
            var newHandles = [];
            for (var i = 0; i < hooks.length; i++) {
                var hook = hooks[i];

                if (!this.stack[hook]) {
                    this.stack[hook] = [];
                }

                var newHandle = this._createHandler(caller, method);
                this.stack[hook].push(newHandle);

                newHandles.push({
                    id: newHandle.id,
                    hook: hook
                });
            }

            // Return an array of objects that can be used to remove the handlers.
            return newHandles;
        }
    }, {
        key: 'one',
        value: function one(hook, block, method) {
            var caller = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Anonymous';

            // Check whether block is present, if not change parameters
            if (typeof block !== 'boolean') {
                caller = method;
                method = block;
                block = false;
            }

            // Check whether the method is a function.
            if (!(method instanceof Function)) {
                console.error('EventHandler: Provided handler is not a function.');
                return;
            }

            if (!this.stack[hook]) {
                this.stack[hook] = [];
            }

            if (!this.stack[hook].one) {
                this.stack[hook].one = [];
            }

            var newHandle = this._createHandler(caller, method, block);
            this.stack[hook].one.push(newHandle);

            // Return an object that can be used to remove the handler.
            return {
                id: newHandle.id,
                hook: hook
            };
        }
    }, {
        key: '_createHandler',
        value: function _createHandler(caller, method) {
            var block = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var newHandle = {
                id: this.counter,
                caller: caller,
                method: method,
                block: block
            };

            this.counter++;

            return newHandle;
        }
    }, {
        key: 'remove',
        value: function remove(events) {
            // Convert hooks to an array to keep flow similar.
            if (!(events instanceof Array)) events = [events];

            for (var i = 0; i < events.length; i++) {
                var eventObject = events[i];
                var removed = false;

                // First check the single handlers.
                if (this.stack[eventObject.hook].one) {
                    for (var _i = 0; _i < this.stack[eventObject.hook].one.length; _i++) {
                        var trigger = this.stack[eventObject.hook].one[_i];

                        // Since ID's are unique break after finding one.
                        if (trigger.id === eventObject.id) {
                            this.stack[eventObject.hook].one.splice(_i, 1);
                            removed = true;
                            break;
                        }
                    }

                    // No more single handlers so delete the array.
                    if (this.stack[eventObject.hook].one.length === 0) {
                        delete this.stack[eventObject.hook].one;
                    }

                    // Again, since ID's are unique don't bother checking the rest after removing one.
                    if (removed) continue;
                }

                // Now check regular handlers.
                for (var _i2 = 0; _i2 < this.stack[eventObject.hook].length; _i2++) {
                    var _trigger = this.stack[eventObject.hook][_i2];

                    // Since ID's are unique break after finding one.
                    if (_trigger.id === eventObject.id) {
                        this.stack[eventObject.hook].splice(_i2, 1);
                        break;
                    }
                }
            }
        }
    }, {
        key: 'trigger',
        value: function trigger() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            // Extract the first element as the hook.
            var hook = args.splice(0, 1)[0];

            // Check whether the event exists.
            if (!this.stack[hook]) {
                // console.warn(`EventHandler: '${hook}' is not a registered event.`);
                return;
            }

            // Check whether the event has been disabled.
            if (this.disabledHandles.indexOf(hook) !== -1) {

                // Check whether we have a protected handler if we do trigger that.
                if (this.protectedHandles[hook]) {
                    this.protectedHandles[hook](args);
                }

                console.debug('EventHandler: \'' + hook + '\' is disabled, skipping trigger');
                return;
            }

            // Check whether there are any registered handlers.
            if (this.stack[hook].length === 0 && !this.stack[hook].one) {
                // console.debug(`EventHandler: no handlers registered for '${hook}'`);
                return;
            }

            if (this.stack[hook].one) {
                var block = false;

                for (var i = 0; i < this.stack[hook].one.length; i++) {
                    var single = this.stack[hook].one[i];

                    // Only check for blocking when not already blocked.
                    if (!block) block = single.block;

                    try {
                        single.method.apply(null, args);
                    } catch (e) {
                        console.error('EventHandler: Handle from \'' + single.caller + '\' for \'' + hook + '\' failed. Error: ' + e);
                    }
                }

                delete this.stack[hook].one;

                // Should block, do not trigger regular handlers.
                if (block) return;
            }

            // Trigger all regular handles associated with the hook.
            for (var _i3 = 0; _i3 < this.stack[hook].length; _i3++) {
                var eventHandle = this.stack[hook][_i3];

                try {
                    eventHandle.method.apply(null, args);
                } catch (e) {
                    console.error('EventHandler: Handle from \'' + eventHandle.caller + '\' for \'' + hook + '\' failed. Error: ' + e);
                }
            }
        }
    }, {
        key: 'disable',
        value: function disable(hook) {
            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : index;

            this.protectedHandles[hook] = callback;

            if (this.disabledHandles.indexOf(hook) === -1) {
                this.disabledHandles.push(hook);
            }
        }
    }, {
        key: 'enable',
        value: function enable(hook) {
            this.protectedHandles[hook] = index;

            var hookIndex = this.disabledHandles.indexOf(hook);

            if (hookIndex !== -1) {
                this.disabledHandles.splice(hookIndex, 1);
            }
        }
    }]);
    return EventHandler;
}();

var AdEvents = ['adBreakStarted', 'adBreakEnded', 'adStarted', 'adEnded', 'adTimeupdate', 'adCuePoints'];

var ControlEvents = ['requestPlay', 'requestSeek', 'requestPause', 'requestBitrate'];

var ItemEvents = ['itemLoadPrevented', 'itemLoaded', 'itemUnloaded', 'itemMetadata', 'itemTimeInfo', 'itemLanguages', 'itemCaptions', 'itemBitrates', 'itemImagestream'];

var GlobalEvents = ['windowFocusChange', 'windowVisibilityChange'];

var PlayerEvents = ['playerCreated', 'playerDestroyed', '_playerTimeUpdate', 'playerTimeUpdate', 'playerPlay', 'playerPlaying', 'playerPause', '_playerSeek', 'playerSeek', 'playerNudge', 'playerEnd', 'playerError', 'playerVolumeChange', 'playerFullscreen', 'playerSwitchBitrate', 'playerAutoSwitchBitrate', 'playerProgress', 'playerLoadedMetadata', 'playerDurationChange', 'playerBuffering', 'playerBufferedEnough'];

var PlaylistEvents = ['playlistInfo', 'playlistNext', 'playlistPrevious', 'playlistGoTo', 'playlistMetadata'];

var UiEvents = ['uiReady', 'uiPluginInserted', 'uiPluginOpen', 'uiPluginClose'];

var EventDefaults = [];

EventDefaults.push.apply(EventDefaults, toConsumableArray(AdEvents));
EventDefaults.push.apply(EventDefaults, toConsumableArray(ControlEvents));
EventDefaults.push.apply(EventDefaults, toConsumableArray(ItemEvents));
EventDefaults.push.apply(EventDefaults, toConsumableArray(GlobalEvents));
EventDefaults.push.apply(EventDefaults, toConsumableArray(PlayerEvents));
EventDefaults.push.apply(EventDefaults, toConsumableArray(PlaylistEvents));
EventDefaults.push.apply(EventDefaults, toConsumableArray(UiEvents));

var store$1 = [];

var InstanceBag = function () {
    function InstanceBag() {
        classCallCheck(this, InstanceBag);
    }

    createClass(InstanceBag, null, [{
        key: "add",
        value: function add(key, value) {
            store$1[key] = value;
        }
    }, {
        key: "get",
        value: function get$$1(key) {
            return store$1[key];
        }
    }]);
    return InstanceBag;
}();

// import InstanceBag from './instance-bag';

var ExtraEvents = function () {
    function ExtraEvents() {
        classCallCheck(this, ExtraEvents);
    }

    createClass(ExtraEvents, null, [{
        key: 'register',
        value: function register(meisterInstance) {
            // windowFocusChange
            window.onfocus = function () {
                meisterInstance.eventHandler.trigger('windowFocusChange', {
                    onForeground: true
                });
            };

            window.onblur = function () {
                meisterInstance.eventHandler.trigger('windowFocusChange', {
                    onForeground: false
                });
            };

            // windowVisibilityChange
            document.addEventListener('visibilitychange', function () {
                meisterInstance.eventHandler.trigger('windowVisibilityChange', {
                    visibility: document.visibilityState
                });
            });

            document.addEventListener('webkitfullscreenchange', function () {
                meisterInstance.eventHandler.trigger('playerFullscreen');
            });

            document.addEventListener('mozfullscreenchange', function () {
                meisterInstance.eventHandler.trigger('playerFullscreen');
            });

            document.addEventListener('fullscreenchange', function () {
                meisterInstance.eventHandler.trigger('playerFullscreen');
            });

            document.addEventListener('MSFullscreenchange', function () {
                meisterInstance.eventHandler.trigger('playerFullscreen');
            });
        }
    }]);
    return ExtraEvents;
}();

function timeToHMS(time) {
    if (isNaN(time)) return '-';

    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time - hours * 3600) / 60);
    var seconds = time - hours * 3600 - minutes * 60;

    if (hours !== 0 && minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    if (hours !== 0) {
        return hours + ':' + minutes + ':' + seconds;
    }

    return minutes + ':' + seconds;
}

function bitrateToResolution(bitrate) {
    // A negative bitrate does not make sense
    if (bitrate < 0) {
        return NaN;
    }

    var kbps = bitrate / 1000;
    return kbps + 'Kbps';

    // let bitsps = bitrate * 8;
    // let e = Math.floor(Math.log(bitsps) / Math.log(1000));
    // let mbits = bitsps / Math.pow(1000, Math.floor(e));

    // Following what we assume the platform outputs:
    // https://www.theplatform.com/blog/publishing-mpx-accelerate/
    // if (mbits <= 2) {
    //     return '240p';
    // } else if (mbits <= 4.5) {
    //     return '360p';
    // } else if (mbits <= 9) {
    //     return '480p';
    // } else if (mbits <= 13) {
    //     return '720p';
    // } else {
    //     return '1080p';
    // }


    // Roughly following youtube guidelines:
    // https://support.google.com/youtube/answer/1722171?hl=en
    // if (mbits <= 2) {
    //     return '360p';
    // } else if (mbits <= 5) {
    //     return '480p';
    // } else if (mbits <= 8) {
    //     return '720p';
    // } else if (mbits <= 16) {
    //     return '1080p';
    // } else if (mbits <= 35) {
    //     return '1440p';
    // } else {
    //     return '2160p';
    // }
}

/**
 * Constructs a new URI by interpreting a path relative to another
 * URI.
 * @param basePath {string} a relative or absolute URI
 * @param path {string} a path part to combine with the base
 * @return {string} a URI that is equivalent to composing `base`
 * with `path`
 * @see http://stackoverflow.com/questions/470832/getting-an-absolute-url-from-a-relative-one-ie6-issue
 */
function resolveUrl(basePath, path) {
    // use the base element to get the browser to handle URI resolution
    var oldBase = document.querySelector('base');
    var docHead = document.querySelector('head');
    var a = document.createElement('a');
    var base = oldBase;
    var oldHref = void 0;

    // prep the document
    if (oldBase) {
        oldHref = oldBase.href;
    } else {
        base = docHead.appendChild(document.createElement('base'));
    }

    base.href = basePath;
    a.href = path;
    var result = a.href;

    // clean up
    if (oldBase) {
        oldBase.href = oldHref;
    } else {
        docHead.removeChild(base);
    }
    return result;
}

/**
 * Simple evaluator if the given element is
 * an node object or not and returns a Boolean.
 * @param node {any} anything that will be evaluated if it is a Node Object
 * @see http://stackoverflow.com/a/384380
*/
function isDOMNode(node) {
    try {
        return node instanceof HTMLElement;
    } catch (e) {
        return (typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object' && node.nodeType === 1 && _typeof(node.style) === 'object' && _typeof(node.ownerDocument) === 'object';
    }
}

/*
    Exports
------------------------------------------ */
var Utils = {
    timeToHMS: timeToHMS,
    bitrateToResolution: bitrateToResolution,
    resolveUrl: resolveUrl,
    isDOMNode: isDOMNode
};

var ElementUtils = function () {
    function ElementUtils() {
        classCallCheck(this, ElementUtils);
    }

    createClass(ElementUtils, null, [{
        key: "classListAdd",
        value: function classListAdd(element) {
            for (var _len = arguments.length, classNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                classNames[_key - 1] = arguments[_key];
            }

            for (var i = 0; i < classNames.length; i++) {
                var className = classNames[i];

                element.classList.add(className);
            }
        }
    }, {
        key: "classListRemove",
        value: function classListRemove(element) {
            for (var _len2 = arguments.length, classNames = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                classNames[_key2 - 1] = arguments[_key2];
            }

            for (var i = 0; i < classNames.length; i++) {
                var className = classNames[i];

                element.classList.remove(className);
            }
        }
    }]);
    return ElementUtils;
}();

// 'Inspired' by https://github.com/clappr/clappr/blob/master/src/components/browser.js

var Browser = {};

var userAgent = navigator.userAgent;

var browserInfo = function browserInfo() {
    var uaRegEx = /\b(playstation 4|nx|opera|chrome|edge|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i; //eslint-disable-line
    var parts = userAgent.match(uaRegEx) || [];
    var extra = void 0;

    if (/trident/i.test(parts[1])) {
        extra = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
        return { name: 'IE', version: parseInt(extra[1] || '', 10) };
    } else if (parts[1] === 'Chrome') {
        extra = userAgent.match(/\bOPR\/(\d+)/);
        if (extra !== null) {
            return { name: 'Opera', version: parseInt(extra[1], 10) };
        }

        extra = userAgent.match(/\bEdge\/(\d+\.\d+)/);
        if (extra !== null) {
            return { name: 'Edge', version: parseFloat(extra[1]) };
        }
    }
    parts = parts[2] ? [parts[1], parts[2]] : [navigator.appName, navigator.appVersion, '-?'];

    extra = userAgent.match(/version\/(\d+)/i);
    if (extra) {
        parts.splice(1, 1, extra[1]);
    }

    return { name: parts[0], version: parseInt(parts[1], 10) };
};

var info = browserInfo();

Browser.isSafari = /safari/i.test(userAgent) && userAgent.indexOf('Chrome') === -1;
Browser.isEdge = /edge/i.test(userAgent);
Browser.isChrome = /chrome/i.test(userAgent) && !Browser.isEdge;
Browser.isChrome64 = Browser.isChrome && /\bx64/i.test(userAgent);
Browser.isFirefox = /firefox/i.test(userAgent);
Browser.isLegacyIE = !!window.ActiveXObject;
Browser.isIE = Browser.isLegacyIE || /trident.*rv:1\d/i.test(userAgent);
Browser.isIE11 = /trident.*rv:11/i.test(userAgent);
Browser.isChromecast = Browser.isChrome && /CrKey/i.test(userAgent);
Browser.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini/i.test(userAgent); //eslint-disable-line
Browser.isiOS = /iPad|iPhone|iPod/i.test(userAgent);

Browser.isAndroid = /Android/i.test(userAgent);
Browser.isWindowsPhone = /Windows Phone/i.test(userAgent);
Browser.isWin8App = /MSAppHost/i.test(userAgent);
Browser.isWiiU = /WiiU/i.test(userAgent);
Browser.isPS4 = /PlayStation 4/i.test(userAgent);
Browser.isSamsungBrowser = /SamsungBrowser/i.test(userAgent);
Browser.isSamsung = /SAMSUNG/i.test(userAgent);
Browser.isMacintosh = /Macintosh/i.test(userAgent);

Browser.name = info.name;
Browser.version = info.version;

var BrowserPolyfill = function () {
    function BrowserPolyfill() {
        classCallCheck(this, BrowserPolyfill);
    }

    createClass(BrowserPolyfill, null, [{
        key: 'init',
        value: function init() {
            if (!('remove' in Element.prototype)) {
                Element.prototype.remove = function remove() {
                    if (this.parentNode) {
                        this.parentNode.removeChild(this);
                    }
                };
            }
        }
    }]);
    return BrowserPolyfill;
}();

var Playlist = function () {
    function Playlist(list, meister) {
        var _this = this;

        classCallCheck(this, Playlist);

        this.list = list;
        this.meister = meister;

        this.index = 0;

        this.meister.on('playlistNext', function () {
            return _this.next();
        });
        this.meister.on('playlistPrevious', function () {
            return _this.previous();
        });
        this.meister.on('playlistGoTo', function (e) {
            return _this.goTo(e.index);
        });

        this.meister.on('playerEnd', function () {
            if (_this.meister.config.autoplay && _this.index < _this.list.length - 1) {
                _this.next();
            }
        });
    }

    createClass(Playlist, [{
        key: 'loadCurrentIndex',
        value: function loadCurrentIndex() {
            var _this2 = this;

            this.meister.trigger('showLoading', {
                code: 'INITIALIZING'
            });

            var item = this.list[this.index];
            this.getPluginFor(item).then(function (plugin) {
                _this2.meister.trigger('playlistMetadata', item);

                // Check whether it is a parsing plugin
                if (plugin instanceof Meister.ParserPlugin) {
                    plugin.process(item).then(function (newItem) {
                        if (newItem instanceof Array) {
                            // Replace the current index with the returned array.
                            var newList = _this2.list.slice(0, _this2.index);
                            newList.push.apply(newList, toConsumableArray(newItem));
                            newList.push.apply(newList, toConsumableArray(_this2.list.slice(_this2.index + 1)));

                            _this2.list = newList;
                        } else {
                            _this2.list[_this2.index] = newItem;
                        }

                        _this2.loadCurrentIndex();
                        return;
                    }).catch(function (err) {
                        console.error('Could not process item with type: ' + item.type + ' and src: ' + item.src + '. \n' + err);
                    });
                } else if (plugin instanceof Meister.MediaPlugin) {
                    // Not very idiomatic.
                    _this2.meister.switchItem(item);

                    // Inform player of the state of the playlist.
                    _this2.meister.trigger('playlistInfo', {
                        currentIndex: _this2.index,
                        length: _this2.list.length
                    });

                    return;
                }
            }).catch(function (err) {
                _this2.meister.error('Could not find plugin to play type: \'' + item.type + '\'.', err.errorCode, { title: 'Unable to play content.' });
                console.error('Could not load item with type: \'' + item.type + '\' and src: \'' + item.src + '\'.');
            });
        }
    }, {
        key: 'next',
        value: function next() {
            var newIndex = this.index + 1;
            this.goTo(newIndex);
        }
    }, {
        key: 'previous',
        value: function previous() {
            var newIndex = this.index - 1;
            this.goTo(newIndex);
        }
    }, {
        key: 'goTo',
        value: function goTo(newIndex) {
            if (newIndex < 0 || newIndex >= this.list.length) {
                console.error('Playlist index \'' + newIndex + '\' is out of bounds.');
                return;
            }

            this.index = newIndex;
            this.loadCurrentIndex();
        }
    }, {
        key: 'getPluginFor',
        value: function getPluginFor(item) {
            return this.meister.pluginLoader.getPluginByItem(item).then(function (result) {
                if (result.errorCode) {
                    throw result;
                }

                return result;
            });
        }
    }]);
    return Playlist;
}();

// import PluginLoader from './plugin-loader';

var MediaController = function () {
    function MediaController(meister) {
        var _this = this;

        classCallCheck(this, MediaController);

        this.meister = meister;

        this.currentPlugin = null;

        // Keep track of whether an ad is playing.
        this.adBreakPlaying = false;
        this.meister.on('adBreakStarted', function () {
            _this.adBreakPlaying = true;
        });

        this.meister.on(['adBreakEnded', 'itemUnloaded'], function () {
            _this.adBreakPlaying = false;
        });
    }

    createClass(MediaController, [{
        key: 'loadNewItem',
        value: function loadNewItem(item) {
            var _this2 = this;

            if (this.meister.config.disableLoadDuringAd && this.adBreakPlaying) {
                this.meister.trigger('itemLoadPrevented', { error: 'adPlaying' });
                console.warn('Unable to switch content while ad is playing');
                return;
            }

            // Unload the previous plugin should it be present.
            if (this.plugin) {
                this.plugin.unload();
                this.plugin = null;
            }
            // Signal to the rest of the player that the item is now unloaded.
            this.meister.trigger('itemUnloaded');

            this.getPluginFor(item).then(function (plugin) {
                _this2.plugin = plugin;

                _this2.plugin.process(item).then(function (processedItem) {
                    var promise = _this2.plugin.load(processedItem);

                    if (promise) {
                        promise.then(function () {
                            _this2.meister.trigger('itemLoaded', { item: processedItem });
                        });
                    } else {
                        _this2.meister.trigger('itemLoaded', { item: processedItem });
                    }
                }).catch(function (err) {
                    _this2.meister.error('Could not find plugin to play type: \'' + item.type + '\'.', err.errorCode, { title: 'Unable to play content.' });
                    console.error('@' + _this2.plugin.name + ': Could not load item with type: \'' + item.type + '\' and src: \'' + item.src + '\'.'); //eslint-disable-line
                });
            });
        }
    }, {
        key: 'switchItem',
        value: function switchItem(newItem) {
            this.loadNewItem(newItem);
        }
    }, {
        key: 'getPluginFor',
        value: function getPluginFor(item) {
            return this.meister.pluginLoader.getPluginByItem(item).then(function (result) {
                if (result.errorCode) {
                    throw result;
                }

                return result;
            });
        }
    }, {
        key: 'currentItem',
        get: function get$$1() {
            if (this.plugin && this.plugin.currentItem) {
                return this.plugin.currentItem;
            }

            console.warn(this.plugin.name + ' does not provide metadata.');
            return {};
        }
    }]);
    return MediaController;
}();

var FullscreenController = function () {
    function FullscreenController(meister) {
        classCallCheck(this, FullscreenController);

        this.meister = meister;
        // Set the custom fullscreen element should one be provided.
        this.fullscreenElement = this.meister.defaultWrapper;
        if (this.meister.config.customFullscreenElement) {
            if (typeof this.meister.config.customFullscreenElement === 'string') {
                var element = document.querySelector(this.meister.config.customFullscreenElement);
                if (!element) {
                    console.warn('Unable to find fullscreen element with queryselector ' + this.meister.config.customFullscreenElement + ', using default element instead.');
                } else {
                    this.fullscreenElement = element;
                }
            } else if (this.meister.config.customFullscreenElement instanceof Node) {
                this.fullscreenElement = this.meister.config.customFullscreenElement;
            } else {
                console.warn('Custom fullscreen element is not of type string or Node, using default element instead.');
            }
        }
        if (this.meister.config.fullscreenOnDoubleClick) {
            if (this.meister.browser.isiOS || this.meister.browser.isAndroid) {
                // mobile, so do a custom double tap check
                this.tapped = null;
                this.meister.controlsWrapper.addEventListener('touchstart', this.doubleTapCheck.bind(this));
            } else {
                // desktop, use the dblclick event
                this.meister.controlsWrapper.addEventListener('dblclick', this.toggleFullscreen.bind(this));
            }
        }
    }

    createClass(FullscreenController, [{
        key: 'requestFullscreen',
        value: function requestFullscreen() {
            if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
                if (this.meister.browser.isiOS) {
                    // iPad fullscreen has to go on the media element.
                    this.meister.playerPlugin.mediaElement.webkitEnterFullscreen();
                } else if (this.fullscreenElement.requestFullscreen) {
                    this.fullscreenElement.requestFullscreen();
                } else if (this.fullscreenElement.mozRequestFullScreen) {
                    this.fullscreenElement.mozRequestFullScreen();
                } else if (this.fullscreenElement.webkitRequestFullscreen) {
                    this.fullscreenElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                } else if (this.fullscreenElement.msRequestFullscreen) {
                    this.fullscreenElement.msRequestFullscreen();
                }
            }
        }
    }, {
        key: 'cancelFullscreen',
        value: function cancelFullscreen() {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            if (this.meister.browser.isiOS) {
                // iOS fullscreen has to go on the media element.
                this.meister.playerPlugin.mediaElement.webkitExitFullScreen();
            }
        }
    }, {
        key: 'doubleTapCheck',
        value: function doubleTapCheck() {
            var _this = this;

            // if tap is not set, set up single tap
            if (!this.tapped) {
                // wait 300ms then run single click code
                this.tapped = setTimeout(function () {
                    _this.tapped = null;
                }, 300);
            } else {
                // tapped within 300ms of last tap. double tap
                // stop single tap callback
                clearTimeout(this.tapped);
                this.tapped = null;
                this.toggleFullscreen();
            }
        }
    }, {
        key: 'toggleFullscreen',
        value: function toggleFullscreen() {
            if (this.meister.isFullscreen) {
                this.cancelFullscreen();
            } else {
                this.requestFullscreen();
            }
        }
    }, {
        key: 'isFullscreen',
        get: function get$$1() {
            if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
                return false;
            }

            return true;
        }
    }]);
    return FullscreenController;
}();

var Cookie = function () {
    function Cookie() {
        classCallCheck(this, Cookie);
    }

    createClass(Cookie, null, [{
        key: 'set',
        value: function set$$1(key, value) {
            var date = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            var expires = '';

            if (date !== null) {
                expires = '; expires=' + date.toGMTString();
            }

            document.cookie = key + '=' + value + expires + '; path=/';
        }
    }, {
        key: 'get',
        value: function get$$1(key) {
            var keyEQ = key + '=';
            var ca = document.cookie.split(';');

            for (var i = 0; i < ca.length; i++) {
                var cookie = ca[i];

                while (cookie.charAt(0) == ' ') {
                    cookie = cookie.substring(1, cookie.length);
                }if (cookie.indexOf(keyEQ) == 0) return cookie.substr(keyEQ.length, cookie.length);
            }

            return null;
        }
    }, {
        key: 'delete',
        value: function _delete(key) {
            this.set(key, '', -1);
        }
    }]);
    return Cookie;
}();

var errorCodes = {
    // Plugin is unable to process items of the passed type.
    WRONG_TYPE: 'MSTR-0001',
    // Plugin does not play in current browser.
    NOT_SUPPORTED: 'MSTR-0002',
    // Media type does not support drm playback in current browser.
    NO_DRM: 'MSTR-0003',
    // Media not found.
    NO_MEDIA_FOUND: 'MSTR-0404',
    // Custom Fairplay contentId function threw an error.
    FAIRPLAY_CONTENT_ID_FUNCTION_ERROR: 'MSTR-1001'
};

var English = {
    VIDEO_ACQUIRING_LICENSE: 'Acquiring license..',
    VIDEO_BUFFERING: 'Buffering...',
    VIDEO_ACQUIRING_MANIFEST: 'Retrieving manifest..',
    INITIALIZING: 'Initializing',
    NONE: 'None'
};

var Dutch = {
    VIDEO_ACQUIRING_LICENSE: 'Ophalen licentie..',
    VIDEO_BUFFERING: 'Bufferen...',
    VIDEO_ACQUIRING_MANIFEST: 'Ophalen manifest..',
    INITIALIZING: 'Initialiseren',
    NONE: 'Geen'
};

var i18n = {
    VIDEO_ACQUIRING_LICENSE: {
        en: 'Acquiring license..',
        nl: 'Ophalen licentie..'
    },
    VIDEO_BUFFERING: {
        en: 'Buffering...',
        nl: 'Bufferen...'
    },
    VIDEO_ACQUIRING_MANIFEST: {
        en: 'Retrieving manifest..',
        nl: 'Ophalen manifest...'
    },
    INITIALIZING: {
        en: 'Initializing',
        nl: 'Initialiseren'
    },
    NONE: {
        en: 'None',
        nl: 'Geen'
    }
};

var currentLanguage = 'en';

var languageBag = {};

var Localization = function () {
    function Localization() {
        classCallCheck(this, Localization);
    }

    createClass(Localization, null, [{
        key: 'init',
        value: function init(i18nOn) {
            if (i18nOn) {
                Object.keys(i18n).forEach(function (key) {
                    Localization.set(key, i18n[key], currentLanguage);
                });
            } else {
                console.warn('In future Meister versions this localization method is deprecated. Set i18nEnabled to true in the Meister global object.');
                Object.keys(English).forEach(function (key) {
                    Localization.set(key, English[key], 'en');
                });

                Object.keys(Dutch).forEach(function (key) {
                    Localization.set(key, Dutch[key], 'nl');
                });
            }
        }
    }, {
        key: 'set',
        value: function set$$1(key, valueOrObj) {
            var language = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : currentLanguage;

            // Create the language if it does not exist.
            if (!languageBag[language]) {
                languageBag[language] = {};
            }
            // no value or object use the key
            var value = key;
            if ((typeof valueOrObj === 'undefined' ? 'undefined' : _typeof(valueOrObj)) === 'object') {
                // it's a object its the i18n type
                value = valueOrObj[language];
            } else if (typeof valueOrObj === 'string') {
                // it's a string so use the deprecated method
                value = valueOrObj;
            }
            languageBag[language][key] = value;
        }
    }, {
        key: 'get',
        value: function get$$1(key) {
            var language = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentLanguage;

            return languageBag[language][key];
        }
    }, {
        key: 'all',
        value: function all() {
            var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentLanguage;

            return languageBag[language];
        }
    }, {
        key: 'setLanguage',
        value: function setLanguage(lang) {
            currentLanguage = lang;
        }
    }]);
    return Localization;
}();

var Analytics = function (_ProtoPlugin) {
    inherits(Analytics, _ProtoPlugin);

    function Analytics() {
        classCallCheck(this, Analytics);
        return possibleConstructorReturn(this, (Analytics.__proto__ || Object.getPrototypeOf(Analytics)).apply(this, arguments));
    }

    createClass(Analytics, [{
        key: 'isAnalytics',
        value: function isAnalytics() {}
    }, {
        key: 'load',
        value: function load() {
            var _this2 = this;

            var _loop = function _loop(i) {
                var eventHandle = EventDefaults[i];
                var uppercasedHandle = eventHandle.charAt(0).toUpperCase() + eventHandle.substring(1);
                var funcName = 'on' + uppercasedHandle;

                if (_this2[funcName]) {
                    _this2.on(eventHandle, function (e) {
                        return _this2[funcName](e);
                    });
                }
            };

            for (var i = 0; i < EventDefaults.length; i++) {
                _loop(i);
            }
        }
    }, {
        key: 'unload',
        value: function unload() {
            get(Analytics.prototype.__proto__ || Object.getPrototypeOf(Analytics.prototype), 'unload', this).call(this);
        }
    }]);
    return Analytics;
}(ProtoPlugin);

var Parser = function (_ProtoPlugin) {
    inherits(Parser, _ProtoPlugin);

    function Parser() {
        classCallCheck(this, Parser);
        return possibleConstructorReturn(this, (Parser.__proto__ || Object.getPrototypeOf(Parser)).apply(this, arguments));
    }

    createClass(Parser, [{
        key: 'isItemSupported',
        value: function isItemSupported() {
            return new Promise(function (resolve) {
                return resolve({
                    supported: false,
                    errorCode: Meister.ErrorCodes.WRONG_TYPE
                });
            });
        }
    }, {
        key: 'process',
        value: function process(item) {
            return new Promise(function (resolve) {
                console.error('Process not implemented. Player may not play correctly.');
                resolve(item);
            });
        }
    }, {
        key: 'unload',
        value: function unload() {
            get(Parser.prototype.__proto__ || Object.getPrototypeOf(Parser.prototype), 'unload', this).call(this);
        }
    }]);
    return Parser;
}(ProtoPlugin);

var Player = function (_ProtoPlugin) {
    inherits(Player, _ProtoPlugin);

    function Player(config, meister) {
        classCallCheck(this, Player);

        var _this = possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, config, meister));

        _this.wrapper = _this.meister.playerWrapper;

        _this.mediaElement = null;
        return _this;
    }

    createClass(Player, [{
        key: 'isTypeSupported',
        value: function isTypeSupported() {
            return false;
        }
    }, {
        key: 'load',
        value: function load() {
            var _this2 = this;

            this.on('requestPlay', this.play.bind(this));
            this.on('requestPause', this.pause.bind(this));

            this.one('playerCreated', function () {
                var cookieVolume = Cookie.get('volume');

                if (cookieVolume) {
                    _this2.volume = cookieVolume;
                }
            });
        }
    }, {
        key: 'unload',
        value: function unload() {
            get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'unload', this).call(this);
            this.mediaElement = null;
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.mediaElement.style.display = 'none';
        }
    }, {
        key: 'show',
        value: function show() {
            this.mediaElement.style.display = 'block';
        }
    }, {
        key: 'play',
        value: function play() {}
    }, {
        key: 'pause',
        value: function pause() {}
    }, {
        key: 'currentTime',
        get: function get$$1() {
            console.warn('currentTime getter is not defined.');
        },
        set: function set$$1(time) {
            console.warn('currentTime setter is not defined. Can\'t process ' + time + '.');
        }
    }, {
        key: 'duration',
        get: function get$$1() {
            console.warn('duration getter is not defined.');
        }
    }, {
        key: 'playing',
        get: function get$$1() {
            console.warn('playing getter is not defined.');
        }
    }, {
        key: 'buffered',
        get: function get$$1() {
            console.warn('bufferd getter is not defined.');
        }
    }, {
        key: 'controls',
        get: function get$$1() {
            console.warn('controls getter is not defined.');
        },
        set: function set$$1(controls) {
            console.warn('controls setter is not defined. Can\'t process ' + controls + '.');
        }
    }, {
        key: 'currentSrc',
        get: function get$$1() {
            console.warn('currentSrc getter is not defined.');
        },
        set: function set$$1(url) {
            console.warn('currentSrc setter is not defined. Can\'t process ' + url + '.');
        }
    }]);
    return Player;
}(ProtoPlugin);

var Ui = function (_ProtoPlugin) {
    inherits(Ui, _ProtoPlugin);

    function Ui(config, meister) {
        classCallCheck(this, Ui);

        var _this = possibleConstructorReturn(this, (Ui.__proto__ || Object.getPrototypeOf(Ui)).call(this, config, meister));

        _this.controlsWrapper = _this.meister.controlsWrapper;

        _this.element = null;
        return _this;
    }

    return Ui;
}(ProtoPlugin);

var UiPlugin = function (_ProtoPlugin) {
    inherits(UiPlugin, _ProtoPlugin);

    function UiPlugin(config, meister) {
        classCallCheck(this, UiPlugin);

        var _this = possibleConstructorReturn(this, (UiPlugin.__proto__ || Object.getPrototypeOf(UiPlugin)).call(this, config, meister));

        _this.element = null;

        var querySelector = _this.config.parentSelector;
        if (querySelector) {
            _this.parentElement = document.querySelector(querySelector);

            if (!_this.parentElement) {
                console.warn('Unable to find element with parentSelector \'' + querySelector + '\', ' + _this.name + ' is disabled.');
                return possibleConstructorReturn(_this);
            }
        } else {
            _this.one('uiReady', function (e) {
                return _this.onUiReady(e);
            });
        }
        return _this;
    }

    createClass(UiPlugin, [{
        key: 'onPluginOpen',
        value: function onPluginOpen(e) {
            if (e.name !== this.name) {
                return;
            }

            this.element.classList.remove('pf-ui-element-hidden');
        }
    }, {
        key: 'onPluginClose',
        value: function onPluginClose() {
            this.element.classList.add('pf-ui-element-hidden');
        }
    }, {
        key: 'onUiReady',
        value: function onUiReady(e) {
            var parent = e.pluginSpace;

            parent.appendChild(this.element);
            this.element.classList.add('pf-ui-element-hidden');

            // Only listen to these events once attached.
            this.on('uiPluginOpen', this.onPluginOpen.bind(this));
            this.on('uiPluginClose', this.onPluginClose.bind(this));

            this.meister.trigger('uiPluginInserted', {
                icon: this.config.icon,
                name: this.name
            });
        }
    }, {
        key: 'draw',
        value: function draw() {
            if (this.parentElement) {
                this.parentElement.appendChild(this.element);
            }
        }
    }]);
    return UiPlugin;
}(ProtoPlugin);

var Middleware = function (_ProtoPlugin) {
    inherits(Middleware, _ProtoPlugin);

    function Middleware() {
        classCallCheck(this, Middleware);
        return possibleConstructorReturn(this, (Middleware.__proto__ || Object.getPrototypeOf(Middleware)).apply(this, arguments));
    }

    createClass(Middleware, [{
        key: 'isItemSupported',
        value: function isItemSupported() {
            return new Promise(function (resolve) {
                return resolve({
                    supported: false,
                    errorCode: Meister.ErrorCodes.WRONG_TYPE
                });
            });
        }
    }, {
        key: 'process',
        value: function process(item) {
            return new Promise(function (resolve) {
                resolve(item);
            });
        }
    }]);
    return Middleware;
}(ProtoPlugin);

// import DRMUtils from './utils/DRMUtils';
// import {setDebug} from './Debug';

// Abstract Plugins
// HACK for IE11 iFrames.
if (window !== window.top) {
    console.warn = console.log.bind(console);
    console.error = console.log.bind(console);
}

var instances = [];

var Meister$2 = function () {
    /**
     * Create a new player instance.
     *
     * @param {string} query for finding the element that meister will use to render the player.
     * @param {object} options for meisterjs. Also required for initializing plugins.
     */
    function Meister(query, userOptions) {
        var _this = this;

        classCallCheck(this, Meister);

        // Make sure we at least have a wrapper or else the player can't continue.

        // create the options by merging the default with the user options
        var defaultOptions = {
            global: {}
        };
        var options = Object.assign({}, defaultOptions, userOptions);

        // checks if the query is a DOM element, otherwise querySelector the query string
        if (isDOMNode(query)) {
            this.wrapper = query;
        } else {
            this.wrapper = document.querySelector(query);
        }

        if (!this.wrapper) {
            throw Error('Wrapper with Queryseletor: ' + query + ' not found.');
        }

        // Instantiate the event handler and utilities.
        this.eventHandler = new EventHandler(EventDefaults);
        this.instanceId = Math.random();
        InstanceBag.add('eventHandler', this.eventHandler);

        this.utils = Utils;
        // this.DRMUtils = DRMUtils;
        this.elementUtils = ElementUtils;
        this.browser = Browser;
        this.Localization = Localization;

        BrowserPolyfill.init();

        // Extract global config
        this.config = Configuration.getGlobals(options.global);
        if (this.config.language) {
            this.Localization.setLanguage(this.config.language);
        }
        this.Localization.init(this.config.i18nEnabled);

        // Enable autoplay
        if (this.config.autoplay) {
            // Disable the first autoplay on mobile, so that ads will display
            if (this.browser.isMobile) {
                var wasAutoplay = this.config.autoplay;
                this.config.autoplay = false;
                this.one('playerPlay', function () {
                    _this.config.autoplay = wasAutoplay;
                    _this.on('itemLoaded', function () {
                        return _this.trigger('requestPlay');
                    }, 'meister');
                }, 'meister');
            } else {
                this.on('itemLoaded', function () {
                    return _this.trigger('requestPlay');
                }, 'meister');
            }
        }

        if (this.config.fullscreenOnDoubleClick) {
            this.config.iosPlaysInline = true;
        }
        // Set logging level
        // this.debugEnabled = this.config.debug;

        this.container = document.createElement('div');
        this.defaultWrapper = document.createElement('div');
        this.playerWrapper = document.createElement('div');
        this.controlsWrapper = document.createElement('div');
        this.adWrapper = document.createElement('div');

        this.container.classList.add('pf-player-container');
        this.defaultWrapper.classList.add('pf-default-wrapper');
        this.playerWrapper.classList.add('pf-player');
        this.controlsWrapper.classList.add('pf-controls');
        if (!this.config.controls) this.controlsWrapper.classList.add('pf-ui-element-hidden');
        this.elementUtils.classListAdd(this.adWrapper, 'pf-ads', 'pf-ui-element-hidden');

        this.wrapper.appendChild(this.container);
        this.container.appendChild(this.defaultWrapper);
        this.defaultWrapper.appendChild(this.playerWrapper);
        this.defaultWrapper.appendChild(this.controlsWrapper);
        this.defaultWrapper.appendChild(this.adWrapper);

        Configuration.overwrite(options);

        this.pluginLoader = new PluginLoader(this);
        this.pluginLoader.config(options, this);

        // PluginLoader.config(options, this);

        this.pluginLoader.drawUiPlugins();
        this.pluginLoader.loadAnalyticsPlugins();

        ExtraEvents.register(this);

        this.playerPlugin = null;
        this.playlist = null;

        this.mediaController = new MediaController(this);
        this.fullscreenController = new FullscreenController(this);

        this.on('requestDrmKeySystemSupport', function () {
            _this.trigger('drmKeySystemSupport', []);
        });

        instances.push({
            id: this.instanceId,
            instance: this
        });
    }

    /**
     * Gets the current Meister version.
     *
     * @return {string} The meister version.
     */


    createClass(Meister, [{
        key: 'load',
        value: function load() {
            this.playlist.loadCurrentIndex();
        }

        /**
         * Destroys the instance of the player and it's plugins.
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            var _this2 = this;

            // Remove the player from the page.
            this.wrapper.innerHTML = '';

            this.trigger('requestDestroy');
            // HACK: fix this hack! Because requestDestroy refers to this.playerPlugin (via get playing) it throws an error when playerPlugin is nulled.. By using setTimeout 0 we effectively added nullifying on the eventstack
            setTimeout(function () {
                _this2.pluginLoader = null;
                _this2.playerPlugin = null;
                _this2.playlist = null;
                _this2.mediaController = null;
                _this2.fullscreenController = null;

                instances = instances.filter(function (instance) {
                    return instance.id === _this2.id;
                });
            }, 0);
        }
    }, {
        key: 'play',
        value: function play() {
            var triggerByUser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            // Do this through events so ads have a chance to register
            this.trigger('requestPlay', { triggerByUser: triggerByUser });
        }
    }, {
        key: 'pause',
        value: function pause() {
            var triggerByUser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            this.trigger('requestPause', { triggerByUser: triggerByUser });
        }
    }, {
        key: 'requestFullscreen',
        value: function requestFullscreen() {
            if (!this.fullscreenController) return;
            this.fullscreenController.requestFullscreen();
        }
    }, {
        key: 'cancelFullscreen',
        value: function cancelFullscreen() {
            if (!this.fullscreenController) return;
            this.fullscreenController.cancelFullscreen();
        }
    }, {
        key: 'getPlayerByType',
        value: function getPlayerByType(type, mediaItem) {
            var playerPlugin = this.pluginLoader.getPlayerPluginByType(type, mediaItem);

            if (this.playerPlugin) {
                if (this.playerPlugin && this.playerPlugin.name !== playerPlugin.name) {
                    this.playerPlugin.unload();
                    this.playerWrapper.innerHTML = '';
                    this.playerPlugin = playerPlugin;
                    this.playerPlugin.load(mediaItem);
                }
            } else if (playerPlugin) {
                this.playerPlugin = playerPlugin;
                this.playerPlugin.load(mediaItem);
            } else {
                console.warn('Could not find player with type \'' + type + '\'');
            }

            return this.playerPlugin;
        }

        /**
         * Sets the item.
         *
         * @param {object} item The item you want to play.
         */

    }, {
        key: 'setItem',
        value: function setItem(item) {
            if (!item.type) {
                throw new TypeError('Item must have a type attribute.');
            } else if (item.type !== 'aditem' && item.type !== 'multi-source' && !item.src) {
                throw new TypeError('Non-aditem items must have a src attribute.');
            }

            this.playlist = new Playlist([item], this);
        }
    }, {
        key: 'setPlaylist',
        value: function setPlaylist(list) {
            for (var i = 0; i < list.length; i++) {
                if (!list[i].type) {
                    throw new TypeError('Item ' + i + ': Item must have a type attribute.');
                } else if (list[i].type !== 'aditem' && list[i].type !== 'multi-source' && !list[i].src) {
                    throw new TypeError('Item ' + i + ': Non-aditem items must have a src attribute.');
                }
            }

            this.playlist = new Playlist(list, this);
        }
    }, {
        key: 'switchItem',
        value: function switchItem(item) {
            this.mediaController.switchItem(item);
        }

        // Event handler shorthands.

    }, {
        key: 'on',
        value: function on(hook, handler, caller) {
            return this.eventHandler.on(hook, handler, caller);
        }
    }, {
        key: 'one',
        value: function one(hook, block, handler, caller) {
            return this.eventHandler.one(hook, block, handler, caller);
        }
    }, {
        key: 'trigger',
        value: function trigger() {
            var _eventHandler;

            (_eventHandler = this.eventHandler).trigger.apply(_eventHandler, arguments);
        }
    }, {
        key: 'remove',
        value: function remove(events) {
            this.eventHandler.remove(events);
        }
    }, {
        key: 'disable',
        value: function disable(hook, callback) {
            this.eventHandler.disable(hook, callback);
        }
    }, {
        key: 'enable',
        value: function enable(hook, callback) {
            this.eventHandler.enable(hook, callback);
        }
    }, {
        key: 'error',
        value: function error(message) {
            var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ERR-9001';
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            console.error(code + ' - ' + message);
            this.eventHandler.trigger('error', {
                message: message,
                code: code,
                options: options
            });
        }

        // Static methods.

    }, {
        key: 'debugEnabled',


        /**
         * Is Debug mode enabled
         *
         * @return {boolean} Return true if debug is enabled.
         */
        get: function get$$1() {
            return this.config.debug;
        }

        /**
         * Sets debug mode.
         *
         * @param  {boolean} debug true for debug mode.
         */
        ,
        set: function set$$1(debug) {
            // setDebug(debug);
            this.config.debug = debug;
        }
    }, {
        key: 'showControls',
        get: function get$$1() {
            return this.config.controls;
        },
        set: function set$$1(controls) {
            if (controls) {
                this.controlsWrapper.classList.remove('pf-ui-element-hidden');
            } else {
                this.controlsWrapper.classList.add('pf-ui-element-hidden');
            }

            this.config.controls = controls;
        }
    }, {
        key: 'playerMode',
        get: function get$$1() {
            return this.config.audioOnly ? 'audio' : 'video';
        }
    }, {
        key: 'volume',
        get: function get$$1() {
            if (!this.playerPlugin) return null;

            return this.playerPlugin.volume;
        },
        set: function set$$1(volume) {
            if (!this.playerPlugin) return;

            Cookie.set('volume', volume);
            this.playerPlugin.volume = volume;
        }
    }, {
        key: 'muted',
        get: function get$$1() {
            if (!this.playerPlugin) return null;

            return this.playerPlugin.muted;
        },
        set: function set$$1(muted) {
            if (!this.playerPlugin) return;

            this.playerPlugin.muted = muted;
        }
    }, {
        key: 'playing',
        get: function get$$1() {
            if (!this.playerPlugin) return null;

            return this.playerPlugin.playing;
        }
    }, {
        key: 'currentItem',
        get: function get$$1() {
            if (!this.mediaController) return null;

            return this.mediaController.currentItem;
        }
    }, {
        key: 'duration',
        get: function get$$1() {
            if (!this.playerPlugin) return null;

            return this.playerPlugin.duration;
        }
    }, {
        key: 'currentTime',
        get: function get$$1() {
            if (!this.playerPlugin) return null;

            return this.playerPlugin.currentTime;
        },
        set: function set$$1(time) {
            if (!this.playerPlugin) return;

            this.playerPlugin.currentTime = time;
        }
    }, {
        key: 'isFullscreen',
        get: function get$$1() {
            if (!this.fullscreenController) return null;
            return this.fullscreenController.isFullscreen;
        }
    }], [{
        key: 'registerPlugin',
        value: function registerPlugin(name, plugin) {
            return PluginLoader.register(name, plugin);
        }
    }, {
        key: 'registerMiddleware',
        value: function registerMiddleware(name, plugin) {
            return PluginLoader.registerMiddleware(name, plugin);
        }
    }, {
        key: 'version',
        get: function get$$1() {
            return 'v4.9.3';
        }
    }, {
        key: 'instances',
        get: function get$$1() {
            return instances;
        }
    }]);
    return Meister;
}();

window.Meister = Meister$2;

// Expose a way to extend
Meister$2.MediaPlugin = Media;
Meister$2.ParserPlugin = Parser;
Meister$2.PlayerPlugin = Player;
Meister$2.Ui = Ui;
Meister$2.UiPlugin = UiPlugin;
Meister$2.AnalyticsPlugin = Analytics;
Meister$2.Middleware = Middleware;
Meister$2.ProtoPlugin = ProtoPlugin;

// Expose utils.
// Meister.DRMUtils = DRMUtils;
Meister$2.Browser = Browser;

// Expose error codes.
Meister$2.ErrorCodes = errorCodes;

// TODO: Make this cleaner.
Meister$2.PluginLoader = PluginLoader;
Meister$2.Configuration = Configuration;

// Backwards compatibility
window.Vinson = Meister$2;

export default Meister$2;
//# sourceMappingURL=Meister.js.map
