export default class FullscreenController {
    constructor(meister) {
        this.meister = meister;
        // Set the custom fullscreen element should one be provided.
        this.fullscreenElement = this.meister.defaultWrapper;
        if (this.meister.config.customFullscreenElement) {
            if (typeof this.meister.config.customFullscreenElement === 'string') {
                const element = document.querySelector(this.meister.config.customFullscreenElement);
                if (!element) {
                    console.warn(`Unable to find fullscreen element with queryselector ${this.meister.config.customFullscreenElement}, using default element instead.`);
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

    // eslint-disable-next-line class-methods-use-this
    get isFullscreen() {
        if (!document.fullscreenElement && !document.mozFullScreenElement &&
            !document.webkitFullscreenElement && !document.msFullscreenElement) {
            return false;
        }

        return true;
    }

    requestFullscreen() {
        if (!document.fullscreenElement && !document.mozFullScreenElement &&
            !document.webkitFullscreenElement && !document.msFullscreenElement) {
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

    cancelFullscreen() {
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

    doubleTapCheck() {
        // if tap is not set, set up single tap
        if (!this.tapped) {
            // wait 300ms then run single click code
            this.tapped = setTimeout(() => { this.tapped = null; }, 300);
        } else {
            // tapped within 300ms of last tap. double tap
            // stop single tap callback
            clearTimeout(this.tapped);
            this.tapped = null;
            this.toggleFullscreen();
        }
    }
    toggleFullscreen() {
        if (this.meister.isFullscreen) {
            this.cancelFullscreen();
        } else {
            this.requestFullscreen();
        }
    }
}
