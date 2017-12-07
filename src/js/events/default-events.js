import AdEvents from './ad-events';
import ControlEvents from './control-events';
import ItemEvents from './item-events';
import GlobalEvents from './global-events';
import PlayerEvents from './player-events';
import PlaylistEvents from './playlist-events';
import UiEvents from './ui-events';
import ChromecastReceiverEvents from './chromecastreceiver-events';

const EventDefaults = [];

EventDefaults.push(...AdEvents);
EventDefaults.push(...ControlEvents);
EventDefaults.push(...ItemEvents);
EventDefaults.push(...GlobalEvents);
EventDefaults.push(...PlayerEvents);
EventDefaults.push(...PlaylistEvents);
EventDefaults.push(...UiEvents);
EventDefaults.push(...ChromecastReceiverEvents);

export default EventDefaults;
