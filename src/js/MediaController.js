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
                        });
                    } else {
                        this.meister.trigger('itemLoaded', { item: processedItem });
                    }
                })
                .catch((err) => {
                    this.meister.error(`Could not find plugin to play type: '${item.type}'.`,
                        err.errorCode, { title: 'Unable to play content.' });
                    console.error(`@${this.plugin.name}: Could not load item with type: '${item.type}' and src: '${item.src}'.`); //eslint-disable-line
                });
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
