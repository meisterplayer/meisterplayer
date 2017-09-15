import ProtoPlugin from './ProtoPlugin';

class Media extends ProtoPlugin {
    /**
     * Checking if an item is supported by the plugin
     * @return {boolean} Default always returns false.
     */
    // eslint-disable-next-line class-methods-use-this
    isItemSupported() {
        return new Promise(resolve => resolve({
            supported: false,
            errorCode: Meister.ErrorCodes.WRONG_TYPE,
        }));
    }

    get currentItem() {
        console.error(`${this.name} does not support this method.`);
        return null;
    }

    /**
     * Get the duration of the media.
     * Method should be implemented by the inheriting class.
     * @readonly
     * @memberof Media
     * @returns {Number|NaN}
     */
    get duration() {
        if (this.meister.debugEnabled) {
            console.error(`${this.name} does not provide a duration getter.`);
        }

        return NaN;
    }

    /**
     * Get the playback position in the media.
     * Method should be implemented by the inheriting class.
     * @readonly
     * @memberof Media
     * @returns {Number|NaN}
     */
    get currentTime() {
        if (this.meister.debugEnabled) {
            console.error(`${this.name} does not provide a currentTime getter.`);
        }

        return NaN;
    }

    /**
     * Set the playback position in the media.
     * Method should be implemented by the inheriting class.
     * @memberof Media
     */
    set currentTime(time) {
        if (this.meister.debugEnabled) {
            console.error(`${this.name} does not provide a currentTime setter.`);
        }
    }

    /**
     * Process is for reading metadata/parsing
     */
    // eslint-disable-next-line class-methods-use-this
    process(item) {
        return new Promise((resolve) => {
            console.warn('Process not implemented. Player may not play correctly.');
            resolve(item);
        });
    }

    /**
     * Registers events and prepares for play.
     */
    load(item) {
        if (this.meister.config.debug) {
            console.log(`Loading item with type '${item.type}' and src '${item.src}'`);
        }
        if (Number.isFinite(item.startPosition)) {
            this.startPosition = item.startPosition;
        }

        this.on('playerLoadedMetadata', () => this.playerLoadedMetadata());
        this.on('_playerTimeUpdate', this._onPlayerTimeUpdate.bind(this));
        this.on('_playerSeek', this._onPlayerSeek.bind(this));
        this.on('requestSeek', this.onRequestSeek.bind(this));

        this.blockSeekForward = !!item.blockSeekForward;
    }

    playerLoadedMetadata() {
        // when startPosition is within the duration of the current video
        if (this.startPosition > 0 && this.player.duration > this.startPosition) {
            if (this.startPositionCompleted) return;
            this.startPositionCompleted = true;

            this.meister.trigger('requestSeek', {
                targetTime: this.startPosition,
                forcedStart: true,
            });
        }
    }

    _onPlayerTimeUpdate() {
        console.error(`${this.name} does not implement '_onPlayerTimeUpdate', event ignored.`);
    }

    _onPlayerSeek() {
        console.error(`${this.name} does not implement '_onPlayerSeek', event ignored.`);
    }

    onRequestSeek() {
        console.error(`${this.name} does not implement 'onRequestSeek', event ignored.`);
    }

    /**
     * Unloads events that you dont need anymore.
     */
    unload() {
        super.unload();
        this.startPositionCompleted = false;
        this.startPosition = null;
        this.blockSeekForward = false;
    }

    /**
     * Destroys the whole plugin.
     */
    destroy() {
        super.destroy();
    }
}

export default Media;
