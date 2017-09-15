import PluginLoader from './PluginLoader';
import Configuration from './Configuration';
import EventHandler from './lib/triple/event-handler';
import EventDefaults from './events/default-events';
import ExtraEvents from './ExtraEvents';
import Utils, { isDOMNode } from './utils/Utils';
// import DRMUtils from './utils/DRMUtils';
import ElementUtils from './utils/ElementUtils';
import Browser from './utils/Browser';
import BrowserPolyfill from './utils/BrowserPolyfill';
import Playlist from './Playlist';
import MediaController from './MediaController';
import FullscreenController from './FullscreenController';
import Cookie from './lib/triple/cookie';
import errorCodes from './errorCodes';
import Localization from './Localization';
// import {setDebug} from './Debug';

// Abstract Plugins
import Analytics from './plugin-types/Analytics';
import Media from './plugin-types/Media';
import Parser from './plugin-types/Parser';
import Player from './plugin-types/Player';
import Ui from './plugin-types/Ui';
import UiPlugin from './plugin-types/UiPlugin';
import Middleware from './plugin-types/Middleware';
import ProtoPlugin from './plugin-types/ProtoPlugin';

// HACK for IE11 iFrames.
if (window !== window.top) {
    console.warn = console.log.bind(console);
    console.error = console.log.bind(console);
}

let instances = [];

class Meister {
    /**
     * Create a new player instance.
     *
     * @param {string} query for finding the element that meister will use to render the player.
     * @param {object} options for meisterjs. Also required for initializing plugins.
     */
    constructor(query, userOptions) {
        // Make sure we at least have a wrapper or else the player can't continue.

        // create the options by merging the default with the user options
        const defaultOptions = {
            global: {},
        };
        const options = Object.assign({}, defaultOptions, userOptions);

        // checks if the query is a DOM element, otherwise querySelector the query string
        if (isDOMNode(query)) {
            this.wrapper = query;
        } else {
            this.wrapper = document.querySelector(query);
        }

        if (!this.wrapper) {
            throw Error(`Wrapper with Queryseletor: ${query} not found.`);
        }

        // Instantiate the event handler and utilities.
        this.eventHandler = new EventHandler(EventDefaults);
        this.instanceId = Math.random();

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
            if (this.browser.isMobile || (this.browser.isNonAutoPlay && !this.config.startMuted)) {
                const wasAutoplay = this.config.autoplay;
                this.config.autoplay = false;
                this.one('playerPlay', () => {
                    this.config.autoplay = wasAutoplay;
                    this.on('itemLoaded', () => this.trigger('requestPlay'), 'meister');
                }, 'meister');
            } else {
                this.on('itemLoaded', () => this.trigger('requestPlay'), 'meister');
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

        this.on('requestDrmKeySystemSupport', () => {
            this.trigger('drmKeySystemSupport', []);
        });

        instances.push({
            id: this.instanceId,
            instance: this,
        });
    }

    /**
     * Gets the current Meister version.
     *
     * @return {string} The meister version.
     */
    static get version() {
        return 'v5.1.2';
    }

    /**
     * Returns filtered and formatted list of all registered plugins and their version.
     *
     * @return {Array} List with plugins and their version.
     */
    static get pluginVersions() {
        const registeredPlugins = PluginLoader.getRegistered();
        const result = [];

        registeredPlugins.forEach((plugin) => {
            const pluginName = plugin.Plugin.pluginName.toLowerCase();
            const alreadyExists = result.findIndex(resultPlugin => resultPlugin.pluginName.toLowerCase() === pluginName);

            if (alreadyExists !== -1) return;

            result.push({
                pluginName: plugin.Plugin.pluginName,
                pluginVersion: plugin.Plugin.pluginVersion,
            });
        });

        return result;
    }

    /**
     * Is Debug mode enabled
     *
     * @return {boolean} Return true if debug is enabled.
     */
    get debugEnabled() {
        return this.config.debug;
    }

    /**
     * Sets debug mode.
     *
     * @param  {boolean} debug true for debug mode.
     */
    set debugEnabled(debug) {
        // setDebug(debug);
        this.config.debug = debug;
    }

    /**
     * Are controls enabled?
     *
     * @return {boolean} Returns true if controls are shown
     */
    get showControls() {
        return this.config.controls;
    }

    /**
     * Hides/shows controls based on the given boolean.
     *
     * @param  {boolean} controls true to show controls, false to hide.
     */
    set showControls(controls) {
        if (controls) {
            this.controlsWrapper.classList.remove('pf-ui-element-hidden');
        } else {
            this.controlsWrapper.classList.add('pf-ui-element-hidden');
        }

        this.config.controls = controls;
    }

    load() {
        this.playlist.loadCurrentIndex();
    }

    /**
     * Destroys the instance of the player and it's plugins.
     */
    destroy() {
        // Remove the player from the page.
        this.wrapper.innerHTML = '';

        this.trigger('requestDestroy');
        // HACK: fix this hack! Because requestDestroy refers to this.playerPlugin (via get playing) it throws an error when playerPlugin is nulled.. By using setTimeout 0 we effectively added nullifying on the eventstack
        setTimeout(() => {
            this.pluginLoader = null;
            this.playerPlugin = null;
            this.playlist = null;
            this.mediaController = null;
            this.fullscreenController = null;

            this.eventHandler.destroy();

            instances = instances.filter(instance => instance.id === this.id);
        }, 0);
    }

    play(triggerByUser = false) {
        // Do this through events so ads have a chance to register
        this.trigger('requestPlay', { triggerByUser });
    }

    pause(triggerByUser = false) {
        this.trigger('requestPause', { triggerByUser });
    }

    get playerMode() {
        return this.config.audioOnly ? 'audio' : 'video';
    }

    get volume() {
        if (!this.playerPlugin) return null;

        return this.playerPlugin.volume;
    }

    set volume(volume) {
        if (!this.playerPlugin) return;

        Cookie.set('volume', volume);
        this.playerPlugin.volume = volume;
    }

    get muted() {
        if (!this.playerPlugin) return null;

        return this.playerPlugin.muted;
    }

    set muted(muted) {
        if (!this.playerPlugin) return;

        this.playerPlugin.muted = muted;
    }

    get playing() {
        if (!this.playerPlugin) return null;

        return this.playerPlugin.playing;
    }

    get currentItem() {
        if (!this.mediaController) return null;

        return this.mediaController.currentItem;
    }

    get duration() {
        if (!this.mediaController) return null;

        return this.mediaController.duration;
    }

    get currentTime() {
        if (!this.mediaController) return null;

        return this.mediaController.currentTime;
    }

    set currentTime(time) {
        if (!this.mediaController) return;

        this.mediaController.currentTime = time;
    }

    get isFullscreen() {
        if (!this.fullscreenController) return null;
        return this.fullscreenController.isFullscreen;
    }

    get playerType() {
        return this.playerPlugin.type;
    }

    requestFullscreen() {
        if (!this.fullscreenController) return;
        this.fullscreenController.requestFullscreen();
    }

    cancelFullscreen() {
        if (!this.fullscreenController) return;
        this.fullscreenController.cancelFullscreen();
    }

    getPlayerByType(type, mediaItem) {
        const playerPlugin = this.pluginLoader.getPlayerPluginByType(type, mediaItem);

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
            console.warn(`Could not find player with type '${type}'`);
        }

        return this.playerPlugin;
    }

    /**
     * Sets the item.
     *
     * @param {object} item The item you want to play.
     */
    setItem(item) {
        if (!item.type) {
            throw new TypeError('Item must have a type attribute.');
        } else if (item.type !== 'aditem' && item.type !== 'multi-source' && !item.src) {
            throw new TypeError('Non-aditem items must have a src attribute.');
        }

        this.playlist = new Playlist([item], this);
    }

    setPlaylist(list) {
        for (let i = 0; i < list.length; i += 1) {
            if (!list[i].type) {
                throw new TypeError(`Item ${i}: Item must have a type attribute.`);
            } else if (list[i].type !== 'aditem'
                && list[i].type !== 'multi-source'
                && !list[i].src) {
                throw new TypeError(`Item ${i}: Non-aditem items must have a src attribute.`);
            }
        }

        this.playlist = new Playlist(list, this);
    }

    switchItem(item) {
        this.mediaController.switchItem(item);
    }

    // Event handler shorthands.
    on(hook, handler, caller) {
        return this.eventHandler.on(hook, handler, caller);
    }

    one(hook, block, handler, caller) {
        return this.eventHandler.one(hook, block, handler, caller);
    }

    trigger(...args) {
        this.eventHandler.trigger(...args);
    }

    remove(events) {
        this.eventHandler.remove(events);
    }

    disable(hook, callback) {
        this.eventHandler.disable(hook, callback);
    }

    enable(hook, callback) {
        this.eventHandler.enable(hook, callback);
    }

    error(message, code = 'ERR-9001', options = {}) {
        console.error(`${code} - ${message}`);
        this.eventHandler.trigger('error', {
            message,
            code,
            options,
        });
    }

    // Static methods.
    static registerPlugin(name, plugin) {
        return PluginLoader.register(name, plugin);
    }

    static registerMiddleware(name, plugin) {
        return PluginLoader.registerMiddleware(name, plugin);
    }

    static get instances() {
        return instances;
    }
}

window.Meister = Meister;

// Expose a way to extend
Meister.MediaPlugin = Media;
Meister.ParserPlugin = Parser;
Meister.PlayerPlugin = Player;
Meister.Ui = Ui;
Meister.UiPlugin = UiPlugin;
Meister.AnalyticsPlugin = Analytics;
Meister.Middleware = Middleware;
Meister.ProtoPlugin = ProtoPlugin;

// Expose utils.
// Meister.DRMUtils = DRMUtils;
Meister.Browser = Browser;

// Expose error codes.
Meister.ErrorCodes = errorCodes;

// TODO: Make this cleaner.
Meister.PluginLoader = PluginLoader;
Meister.Configuration = Configuration;

// Backwards compatibility
window.Vinson = Meister;

export default Meister;
