import ProtoPlugin from './ProtoPlugin';

class Ui extends ProtoPlugin {
    constructor(config, meister) {
        super(config, meister);

        this.controlsWrapper = this.meister.controlsWrapper;

        this.element = null;
    }
}

export default Ui;
