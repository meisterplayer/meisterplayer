// import PluginLoader from './plugin-loader';
import MediaPlugin from './plugin-types/Media';

class Parallel extends MediaPlugin {
    constructor(meister) {
        super({ name: 'parallel-builtin' }, meister);

        this.meister = meister;
        this.plugins = [];

        this.bitrates = null;
        this.currentBitrateIndex = 0;

        this.plugin = null;

        this.eventStore = [];
    }

    isItemSupported(item) {
        return new Promise((resolve) => {
            if (item.type !== 'media') {
                return resolve({
                    supported: false,
                    errorCode: Meister.ErrorCodes.WRONG_TYPE,
                });
            }

            return resolve({
                supported: true,
            });
        });
    }

    get currentItem() {
        if (this.plugin) {
            return this.plugin.currentItem;
        }

        return null;
    }

    process(item) {
        return new Promise((resolve, reject) => {
            const processPromises = [];

            this.bitrates = item.bitrates;
            this.currentBitrateIndex = Math.floor(this.bitrates.length / 2);

            // Don't trigger bitrates for hls media.
            const sampleItem = this.bitrates[this.currentBitrateIndex];

            if (sampleItem.type !== 'm3u'
                && sampleItem.type !== 'm3u8'
                && sampleItem.type !== 'mpd'
                && sampleItem.type !== 'dash'
                && sampleItem.metadata
            ) {
                this.bitrates.sort((a, b) => a.metadata.bitrate - b.metadata.bitrate);

                const selectableBitrates = [];
                for (let i = 0; i < this.bitrates.length; i += 1) {
                    const bitrate = this.bitrates[i];

                    // If there is a defalt bitrate specified prefer that.
                    if (bitrate.default) {
                        this.currentBitrateIndex = i;
                    }

                    selectableBitrates.push({
                        bitrate: bitrate.metadata.bitrate,
                        index: i,
                    });
                }

                this.meister.trigger('itemBitrates', {
                    bitrates: selectableBitrates,
                    currentIndex: this.currentBitrateIndex,
                });
            }

            this.meister.pluginLoader.getPluginByItem(this.bitrates[this.currentBitrateIndex])
                .then((itemPlugin) => {
                    if (itemPlugin.errorCode) {
                        this.meister.error(`Could not find plugin to play type: '${this.bitrates[this.currentBitrateIndex].type}'.`, //eslint-disable-line
                            itemPlugin.errorCode, { title: 'Unable to play content.' });
                        return;
                    }

                    this.plugin = itemPlugin;

                    const getPluginsPromises = [];

                    processPromises.push(
                        this.plugin.process(this.bitrates[this.currentBitrateIndex]),
                    );

                    // Get all plugins for each parallelItem
                    item.parallel.forEach((parallelItem) => {
                        const plugin = this.meister.pluginLoader.getPluginByItem(parallelItem);
                        if (plugin.errorCode) {
                            return;
                        }

                        getPluginsPromises.push(plugin);
                    });

                    Promise.all(getPluginsPromises).then((plugins) => {
                        // Process all plugins..
                        plugins.forEach((plugin, index) => {
                            if (!plugin.errorCode) {
                                this.plugins.push(plugin);

                                processPromises.push(plugin.process(item.parallel[index]));
                            }
                        });

                        Promise.all(processPromises)
                            .then(() => {
                                resolve(item);
                            })
                            .catch((err) => {
                                reject(err);
                            });
                    });
                });
        });
    }

    load(item) {
        this.plugin.load(this.bitrates[this.currentBitrateIndex]);

        this.plugins.forEach((plugin, index) => {
            // XXX: Not sure if this should work.
            plugin.load(item.parallel[index]);
        });

        if (!this.plugin.onRequestBitrate) {
            this.on('requestBitrate', info => this.onRequestBitrate(info.bitrateIndex));
        }
    }

    get duration() {
         if (!this.plugin) { return NaN; }

         return this.plugin.duration;
     }

     get currentTime() {
         if (!this.plugin) { return NaN; }

         return this.plugin.currentTime;
     }

     set currentTime(time) {
         if (!this.plugin) { return; }
         this.plugin.currentTime = time;
     }

    unload() {
        super.unload();

        // Unload the main plugin.
        if (this.plugin) this.plugin.unload();

        // Unload parallel plugins.
        this.plugins.forEach((plugin) => {
            plugin.unload();
        });

        this.plugins = [];
    }

    onRequestBitrate(index) {
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
        const switchTime = this.meister.currentTime;
        const wasPlaying = this.meister.playing;

        // HACK: This can be done way prettier.
        this.plugin.unload();
        this.plugin.load(this.bitrates[this.currentBitrateIndex]);
        this.meister.currentTime = switchTime;
        if (wasPlaying) this.meister.play();

        const newBitrate = this.bitrates[this.currentBitrateIndex].metadata
            ? this.bitrates[this.currentBitrateIndex].metadata.bitrate
            : 0;

        this.meister.trigger('playerSwitchBitrate', {
            newBitrate,
            newBitrateIndex: index,
        });
    }
}

export default Parallel;
