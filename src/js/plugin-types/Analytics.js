import ProtoPlugin from './ProtoPlugin';
import EventDefaults from '../events/default-events';

class Analytics extends ProtoPlugin {
    // eslint-disable-next-line class-methods-use-this
    isAnalytics() {
        return true;
    }

    load() {
        EventDefaults.forEach((eventHandle) => {
            const uppercasedHandle = eventHandle.charAt(0).toUpperCase() + eventHandle.substring(1);
            const funcName = `on${uppercasedHandle}`;

            if (this[funcName]) {
                this.on(eventHandle, (e) => { this[funcName](e); });
            }
        });
    }

    unload() {
        super.unload();
    }

    onPlayerRemoteConnected() {
        this.deferLogging = true;
    }

    onPlayerRemoteDisconnected() {
        this.deferLogging = false;
    }
}

export default Analytics;
