import ProtoPlugin from './ProtoPlugin';

class Media extends ProtoPlugin {
    /**
     * Checking if an item is supported by the plugin
     * @return {boolean} Default always returns false.
     */
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
     * Process is for reading metadata/parsing
     */
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
