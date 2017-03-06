import ProtoPlugin from './ProtoPlugin';

class UiPlugin extends ProtoPlugin {
    constructor(config, meister) {
        super(config, meister);

        this.element = null;

        const querySelector = this.config.parentSelector;
        if (querySelector) {
            this.parentElement = document.querySelector(querySelector);

            if (!this.parentElement) {
                console.warn(`Unable to find element with parentSelector '${querySelector}', ${this.name} is disabled.`);
                return;
            }
        } else {
            this.one('uiReady', (e) => this.onUiReady(e));
        }
    }

    onPluginOpen(e) {
        if (e.name !== this.name) {
            return;
        }

        this.element.classList.remove('pf-ui-element-hidden');
    }

    onPluginClose() {
        this.element.classList.add('pf-ui-element-hidden');
    }

    onUiReady(e) {
        const parent = e.pluginSpace;

        parent.appendChild(this.element);
        this.element.classList.add('pf-ui-element-hidden');

        // Only listen to these events once attached.
        this.on('uiPluginOpen', this.onPluginOpen.bind(this));
        this.on('uiPluginClose', this.onPluginClose.bind(this));

        this.meister.trigger('uiPluginInserted', {
            icon: this.config.icon,
            name: this.name,
        });
    }

    draw() {
        if (this.parentElement) {
            this.parentElement.appendChild(this.element);
        }
    }
}

export default UiPlugin;
