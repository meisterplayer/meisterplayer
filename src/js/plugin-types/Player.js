import ProtoPlugin from './ProtoPlugin';
import Cookie from '../lib/triple/cookie';

class Player extends ProtoPlugin {
    constructor(config, meister) {
        super(config, meister);

        this.wrapper = this.meister.playerWrapper;

        this.mediaElement = null;
    }

    isTypeSupported() {
        return false;
    }

    load() {
        this.on('requestPlay', this.play.bind(this));
        this.on('requestPause', this.pause.bind(this));

        this.one('playerCreated', () => {
            const cookieVolume = Cookie.get('volume');

            if (cookieVolume) {
                this.volume = cookieVolume;
            }
        });
    }

    unload() {
        super.unload();
        this.mediaElement = null;
    }

    hide() {
        this.mediaElement.style.display = 'none';
    }

    show() {
        this.mediaElement.style.display = 'block';
    }

    play() {

    }

    pause() {

    }

    get currentTime() {
        console.warn('currentTime getter is not defined.');
    }

    set currentTime(time) {
        console.warn(`currentTime setter is not defined. Can't process ${time}.`);
    }

    get duration() {
        console.warn('duration getter is not defined.');
    }

    get playing() {
        console.warn('playing getter is not defined.');
    }

    get buffered() {
        console.warn('bufferd getter is not defined.');
    }

    get controls() {
        console.warn('controls getter is not defined.');
    }

    set controls(controls) {
        console.warn(`controls setter is not defined. Can't process ${controls}.`);
    }

    get currentSrc() {
        console.warn('currentSrc getter is not defined.');
    }

    set currentSrc(url) {
        console.warn(`currentSrc setter is not defined. Can't process ${url}.`);
    }

    get type() {
        return this.playerType;
    }

    set type(playerType) {
        this.playerType = playerType;
    }
}

export default Player;
