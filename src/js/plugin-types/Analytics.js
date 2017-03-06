import ProtoPlugin from './ProtoPlugin';
import EventDefaults from '../events/default-events';

class Analytics extends ProtoPlugin {
    isAnalytics() {

    }

    load() {
        for (let i = 0; i < EventDefaults.length; i++) {
            const eventHandle = EventDefaults[i];
            const uppercasedHandle = eventHandle.charAt(0).toUpperCase() + eventHandle.substring(1);
            const funcName = `on${uppercasedHandle}`;

            if (this[funcName]) {
                this.on(eventHandle, (e) => this[funcName](e));
            }
        }
    }

    unload() {
        super.unload();
    }
}

export default Analytics;
