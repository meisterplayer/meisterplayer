class Playlist {
    constructor(list, meister) {
        this.list = list;
        this.meister = meister;

        this.index = 0;

        this.meister.on('playlistNext', () => this.next());
        this.meister.on('playlistPrevious', () => this.previous());
        this.meister.on('playlistGoTo', (e) => this.goTo(e.index));

        this.meister.on('playerEnd', () => {
            if (this.meister.config.autoplay && this.index < this.list.length - 1) {
                this.next();
            }
        });
    }

    loadCurrentIndex() {
        this.meister.trigger('showLoading', {
            code: 'INITIALIZING',
        });

        const item = this.list[this.index];
        this.getPluginFor(item).then((plugin) => {
            this.meister.trigger('playlistMetadata', item);

            // Check whether it is a parsing plugin
            if (plugin instanceof Meister.ParserPlugin) {
                plugin.process(item)
                .then((newItem) => {
                    if (newItem instanceof Array) {
                        // Replace the current index with the returned array.
                        const newList = this.list.slice(0, this.index);
                        newList.push(...newItem);
                        newList.push(...this.list.slice(this.index + 1));

                        this.list = newList;
                    } else {
                        this.list[this.index] = newItem;
                    }

                    this.loadCurrentIndex();
                    return;
                })
                .catch((err) => {
                    console.error(`Could not process item with type: ${item.type} and src: ${item.src}. \n${err}`);
                });
            } else if (plugin instanceof Meister.MediaPlugin) {
                // Not very idiomatic.
                this.meister.switchItem(item);

                // Inform player of the state of the playlist.
                this.meister.trigger('playlistInfo', {
                    currentIndex: this.index,
                    length: this.list.length,
                });

                return;
            }
        }).catch((err) => {
            this.meister.error(`Could not find plugin to play type: '${item.type}'.`,
                err.errorCode, { title: 'Unable to play content.' });
            console.error(`Could not load item with type: '${item.type}' and src: '${item.src}'.`);
        });
    }

    next() {
        const newIndex = this.index + 1;
        this.goTo(newIndex);
    }

    previous() {
        const newIndex = this.index - 1;
        this.goTo(newIndex);
    }

    goTo(newIndex) {
        if (newIndex < 0 || newIndex >= this.list.length) {
            console.error(`Playlist index '${newIndex}' is out of bounds.`);
            return;
        }

        this.index = newIndex;
        this.loadCurrentIndex();
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

export default Playlist;
