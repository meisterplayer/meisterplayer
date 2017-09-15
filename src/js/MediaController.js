// import PluginLoader from './plugin-loader';

class MediaController {
    constructor(meister) {
        this.meister = meister;

        this.currentPlugin = null;

        // Keep track of whether an ad is playing.
        this.adBreakPlaying = false;
        this.meister.on('adBreakStarted', () => {
            this.adBreakPlaying = true;
        });

        this.meister.on(['adBreakEnded', 'itemUnloaded'], () => {
            this.adBreakPlaying = false;
        });
    }

    loadNewItem(item) {
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

        this.getPluginFor(item).then((plugin) => {
            this.plugin = plugin;

            this.plugin.process(item)
                .then((processedItem) => {
                    const promise = this.plugin.load(processedItem);

                    if (promise) {
                        promise.then(() => {
                            this.meister.trigger('itemLoaded', { item: processedItem });
                        }).catch((err) => {
                            console.error(`@${this.plugin.name}: Could not load item with type: '${item.type}' and src: '${item.src}'.`, err);
                        });
                    } else {
                        this.meister.trigger('itemLoaded', { item: processedItem });
                    }
                })
                .catch((err) => {
                    this.meister.error(`Could not find plugin to play type: '${item.type}'.`,
                        err.errorCode, { title: 'Unable to play content.' });
                    console.error(`@${this.plugin.name}: Could not process item with type: '${item.type}' and src: '${item.src}'.`, err);
                });
        }).catch((err) => {
            console.error(`@${this.plugin.name}: Could not getPluginFor item with type: '${item.type}' and src: '${item.src} '.`, err);
        });
    }

    switchItem(newItem) {
        this.loadNewItem(newItem);
    }

    get currentItem() {
        if (this.plugin && this.plugin.currentItem) {
            return this.plugin.currentItem;
        }

        console.warn(`${this.plugin.name} does not provide metadata.`);
        return {};
    }

    /**
     * Duration of the media currently playing. Proxies the current media
     * plugin.
     * @readonly
     * @memberof MediaController
     * @returns {Number|NaN}
     */
    get duration() {
        if (!this.plugin) { return NaN; }

        return this.plugin.duration;
    }

    /**
     * Current playback position in the media. Proxies the current media
     * plugin.
     * @memberof MediaController
     * @returns {Number|NaN}
     */
    get currentTime() {
        if (!this.plugin) { return NaN; }

        return this.plugin.currentTime;
    }

    /**
     * Set the current playback position in the media. Proxies the current
     * media plugin.
     * @memberof MediaController
     */
    set currentTime(time) {
        if (!this.plugin) { return; }

        this.plugin.currentTime = time;
    }

    getPluginFor(item) {
        return this.meister.pluginLoader.getPluginByItem(item).then((result) => {
            if (result.errorCode) {
                throw result;
            }

            return result;
        });
    }
}

export default MediaController;
