Meister Web Player
====

Plugable JavaScript web player - version v5.0.3.

This is the Meister core. It required additional plugins to get set up. This guide will help you get starting up and play a simple MP4 video.

Installation
----

To install using npm:

```
npm install @meisterplayer/meisterplayer
```

And then import them:

```
import Meister from '@meisterplayer/meisterplayer'
```

To install using ```<script>``` tags:

``` html
<script src="Meister.min.js">
```

Getting started
----

To get started simply include the ```Meister.js``` in your page. There are two ways of setting up the Meister Player. The usage of ```<script>``` tags and the use of ES6 modules. We will explain the ```<script>``` tag version first.

Meister on it's own can't play video's it requires at least a player plugin and a media plugin. We will show in the example below how to add these plugins to get a playing MP4 file.
We will be using the following plugins:

- [BaseMedia for Meister](https://github.com/meisterplayer/media-basemedia) (This is the plugin for MP4 playback)
- [HTML5 Player for Meister](https://github.com/meisterplayer/player-html5player) (This is the plugin to playback using HTML5)
- [Standard UI for Meister](https://github.com/meisterplayer/ui-standardui) (This is the plugin to get a different UI for Meister)


### Setting up using ```<script>``` tags

The following snippet can be used to initialize the Meister player:

``` HTML
<!DOCTYPE html>
<html>
    <head>
        <title>Meister player example</title>
        <!-- It's important that Meister.js will be loaded before the plugins -->
        <script src="Meister.js"></script>
        <script src="BaseMedia.js"></script>
        <script src="Html5Player.js"></script>
        <script src="StandardUi.js"></script>
    </head>
    <body>
        <div id="player"></div>
        <script>
            // Initialize the meister player
            // Meister uses the querySelector to get the dom element.
            var meisterPlayer = new Meister('#player', {
                // Configures Meister player to use these plugin.
                // We will later go in depth what these are for.
                BaseMedia: {},
                Html5Player: {},
                StandardUi: {},
            });

            // Configures meister to play the mp4 media item.
            meisterPlayer.setItem({
                src: 'INSERT_URL_TO_MP4_HERE',
                type: 'mp4', // Tells meister we will play an mp4 item. 
            });

            // Tells meister we are ready to load the player and start playing
            meisterPlayer.load();
        </script>
    </body>
</html>
```

This is the basic way of getting setup with Meister. We will later get in depth in what these functions exactly does and how we can configure Meister to our likings.

### Setting up using ES6 modules

The following example shows how you can use ES6 modules to load in the Meister players with the plugins mentioned above.

First install Meister through NPM:

``` Bash
npm install -S @npm-wearetriple/meisterplayer
```

And for the additional plugins you can also npm install them:

```
npm install -S @npm-wearetriple/meister-plugin-basemedia
npm install -S @npm-wearetriple/meister-plugin-html5player
npm install -S @npm-wearetriple/meister-plugin-standardui
```

``` JavaScript
import Meister from '@npm-wearetriple/meisterplayer';
import BaseMedia from '@npm-wearetriple/meister-plugin-basemedia';
import Html5Player from '@npm-wearetriple/meister-plugin-html5player';
import StandardUi from '@npm-wearetriple/meister-plugin-standardui';

// Initialize the meister player
// Meister uses the querySelector to get the dom element.
const meisterPlayer = new Meister('#player', {
    // Configures Meister player to use these plugin.
    // Uses pluginName as object name to be future proof.
    [BaseMedia.pluginName]: {},
    [Html5Player.pluginName]: {},
    [StandardUi.pluginName]: {},
});

// Configures meister to play the mp4 media item.
meisterPlayer.setItem({
    src: 'INSERT_URL_TO_MP4_HERE',
    type: 'mp4', // Tells meister we will play an mp4 item. 
});

// Tells meister we are ready to load the player and start playing
meisterPlayer.load();

```

Configuration
----

The following options can be used to configure the Meister core. All options will be inside of ```global:{}```

### language *[String]* (default: 'en') ###

The language you want the player to be. 

Example:

``` JavaScript
var meisterInstance = new Meister('#player', {
    global: {
        language: 'nl' // Set the Meister player language to dutch.
    }
});
```

### i18nEnabled *[Boolean]* (default: false)

Turns i18n on instead of the custom localization api. In future version this will be set to true by default.

Example:

``` JavaScript
var meisterInstance = new Meister('#player', {
    global: {
        i18nEnabled: true,
    }
});
```

### autoplay *[Boolean]* (default: false) ###

Autoplays the video instead of having to click on play

``` JavaScript
var meisterInstance = new Meister('#player', {
    global: {
        autoplay: true,
    }
});
```

### fullscreenOnDoubleClick *[Boolean]* (default: false) ###

Allows the player to go fullscreen when the user double clicks on the player. This also set ```iosPlaysInline``` to true to be able to support this feature.

``` JavaScript
var meisterInstance = new Meister('#player', {
    global: {
        fullscreenOnDoubleClick: true,
    }
});
```

### controls *[Boolean]* (default: true) ###

Enables/disables controls.

``` JavaScript
var meisterInstance = new Meister('#player', {
    global: {
        controls: false, // Now the controls are not shown.
    }
});
```

### debug *[Boolean]* (default: false) ###

Defines if Meister will be in debug mode yes or no.

``` JavaScript
var meisterInstance = new Meister('#player', {
    global: {
        debug: true, // Meister is now in debug mode.
    }
});
```

### disableLoadDuringAd *[Boolean]* (default: false) ###

Disables the ```load()``` function call when an ad is playing. So it disables switching of content during an adbreak.


API
----

We will explain the API here for all methods on Meister

Meister instance properties
----

### Meister(query:*String|Element*, config:*Object*):*Meister* ###

Constructor of Meister.

- query:String - The dom Query to select the ```<div>``` element you want to use for Meister
- query:Element - The dom element you want to use. This is an alternate to using query:String.
- config:Object - The config object to initialize plugins and configure them to your liking. Check each plugin for documentation to configure a plugin.

returns an instance of Meister

Example:

``` JavaScript
// Using the query:String method:
var meisterPlayer = new Meister('#player', {
    // Configuration per plugin goes here.
});

// Using the query:Element method:
var meisterPlayer = new Meister(document.getElementById('player'), {
    // Configuration per plugin goes here.
});

```

### **Methods:** ###

### setItem(item:*Object\<MediaObject\>*); ###

Sets the media item that you want to play. Configuration can differ per plugin but the basic item object has a src & type.

MediaObject:
- src:*String* : URL to the media.
- type:*String* : The type of the media. Check the plugin documentation to see what type exactly you have to input.
- ...:*any* : A MediaObject can have more options but this differs per plugin. Please check the plugin documentation for more options.

Example (requires a mp4 plugin): 

``` JavaScript
meisterInstance.setItem({
    src: 'https://example.com/video.mp4',
    type: 'mp4'
});
```

### setPlaylist(items:*Array*[*Object*:\<*MediaObject*\>]) ###

Same as setItem(Object:*MediaObject*) only this method allows for multiple items to be set. Meister will walk through the items one by one (When the end event is triggered).

Please see setItem(Object:*MediaObject*) for the documentation of *MediaObject*

Example:

``` JavaScript
meisterInstance.setPlaylist([
    {
        src: 'https://example.com/video.mp4',
        type: 'mp4'
    },
    {
        src: 'https://example.com/anotherVideo.mp4',
        type: 'mp4'
    }
]);
```

### switchItem(item:*Object:\<MediaObject\>*) ###

Allows for switching items inside of Meister. This way you can load a new item while already playing a other item.

Please see setItem(Object:*MediaObject*) for the documentation of *MediaObject*

Example:

``` JavaScript
meisterInstance.switchItem({
    src: 'https://example.com/video.mp4',
    type: 'mp4'
});
```

### load() ###

Loads the media item that has been set by ```setItem```. Or the first item in the playlist that has been set by ```setPlaylist```.

Example:

``` JavaScript
meisterInstance.load();
```

### destroy() ###

Destroys the meister player and it's plugins.

Example: 

``` JavaScript
meisterInstsance.destroy()
```

### play(triggerByUser:Boolean = false) ###

Starts playback of the media.

- triggerByUser:*Boolean* (default false): Defines if the play() has been triggered by the user. (Analytics purposes).

Example:

``` JavaScript
meisterInstsance.play()
```

### pause(triggerByUser:Boolean = false) ###

Pauses playback of the media.

- triggerByUser:*Boolean* (default false): Defines if the pause() has been triggered by the user. (Analytics purposes).

Example:

``` JavaScript
meisterInstsance.pause()
```

### requestFullscreen() ###

Requests the window if we can make the player full screen. This functions can only be called as a result of a user action. Otherwise browsers will decline the request.

Example:

``` JavaScript
myDomElement.onclick = () => {
    meisterInstance.requestFullscreen()
}
```

### cancelFullscreen() ###

Exits fullscreen mode.

Example:

``` JavaScript
meisterInstance.cancelFullscreen();
```

### on(hook:String, handler:Function(event:any), caller?:String):EventHandle ###

Listens for events happening inside of Meister. For all the hooks checkout the events section. Also you can check per plugin what events are available. 

- hook:*String* : The name of the event you want to listen to.
- handler:Function(event:any) : The callback for the event. What returns is different per event. 
- caller?:String : The caller of the event. This is used for tracking if an exception is thrown so you can see where the exception occured.

returns ```EventHandle```:

- id:*Number* The id of the event.
- hook:*String* The hook that was used for this event.

Example:

``` JavaScript
// Without caller set
meisterInstance.on('playerPause', () => {
    console.log('The player is now paused');
});

meisterInstance.on('playerPlay', () => {
    console.log('The player triggered play');
}, 'MyScript');
```

### one(hook: String, handler:Function(event:any), caller?:String):EventHandle ###

This is the same as **on(hook:String, handler:Function(event:any), caller?:String)**. Only difference is this function only listens one time for the event. 

returns ```EventHandle```:

- id:*Number* The id of the event.
- hook:*String* The hook that was used for this event.

Example:

``` JavaScript
// Without caller set
meisterInstance.one('playerPause', () => {
    console.log('The player is now paused');
});

meisterInstance.one('playerPlay', () => {
    console.log('The player triggered play');
}, 'MyScript');
```

### trigger(hook:String, ...args) ###

Triggers an event to the specified hook. 

- hook:String - The hook you want to listen to check. For all the hooks checkout the events section. Also you can check per plugin what events are available.
- ...args:any - This is given to the listener to handle.

Example: 

``` JavaScript
meisterInstance.trigger('myCustomEvent', {
    someProps: 'test'
});
```

### remove(events:EventHandle|Array<EventHandle>) ###

Removes all given listeners from the event stack. 

- events:EventHandle|Array<EventHandle> - Object that is returned by ```on()``` and ```one()```

Example: 

``` JavaScript
const event = meisterInstance.on( ... );
meisterInstance.remove(event);
```

### disable(hook:String, handler:Function(event:any)) ###

Disables an event so ```on()``` and ```one()``` will not be triggered with the given hook. You can use the ```handler``` parameter to still handle the event.

- hook:String -  The hook you want to listen to check. For all the hooks checkout the events section. Also you can check per plugin what events are available.
- handler:Function(event:any) : The callback for the event. What returns is different per event.

Example

``` JavaScript
meisterInstance.disable('playerPlay', () => {
    // Now only this function gets called when meister triggers 'playerPlay'.
});
```

### enable(hook:String) ###

Enables an event so it can be used again. 

- hook:String -  The hook you want to listen to check. For all the hooks checkout the events section. Also you can check per plugin what events are available.

Example:

``` JavaScript
meisterInstance.enable('playerPlay');
```

### error(message:String, code:String = 'ERR-9001', options:Object = {}) ###

Throws an error on the meister player. This will also trigger an event so plugins can handle this (For example log the error to a server or show a different UI).

- message:String - The error you want to output
- code:String - An identifier of the error message. (ERR-9001 = unknown error)
- options:Object - The options you want to send along the event. Can differ per plugin.

Example:

``` JavaScript
meisterInstance.error('An error occured', 'TST-1234');
```

### static registerPlugin(name:*String*, plugin:*Object*) ###

Registers the plugin with Meister.

- name:String - The name of the plugin that is registered. Note: Will also be used as config object.
- plugin:Object - The meister plugin object that is Meister compatible (class/object etc)

Example:

``` JavaScript
class TestPlugin extends Meister.ParserPlugin {
    constructor(config) {
        // Will output 'hello'
        console.log(config.param);
    }
    static get pluginName() { return 'testName'; }
}

Meister.registerPlugin(TestPlugin.pluginName, TestPlugin);

const meisterInstance = new Meister('#player', {
    // Notices that this is binded to the pluginName
    testName: {
        param: 'hello'
    }
});
```

### **Getters & Setters:** ###

### get version:*String* ###

Returns the current version of Meister. Yields `"vX.Y.Z"`

Example:

```JavaScript
// Outputs v5.0.3
console.log(meisterInstance.version);
```

### get/set showControls:*Boolean*  ###

- set: Hides/Shows the controls.
- get: Returns the current controls status.

Example:

``` JavaScript
// Hides the controls
meisterInstance.showControls = false;

// Shows the controls
meisterInstance.showControls = true;
```

### get playerMode:String ###

Returns the current player mode this can either be 'audio' or 'video'

Example:

``` JavaScript
console.log(meisterInstance.playerMode);
```

### get/set volume:Number ###

Gets/Sets the current playback volume of Meister. This volume will also be rememberd by Meister so the user has the same volume on each page. 

- set:Number - The volume you want it to set to between 0 and 1
- get:Number - The current playback volume between 0 and 1

Example: 

``` JavaScript
meisterInstance.volume = 0.7;
```

### get/set muted:Boolean ###

Gets/Sets the current player muted mode. 

- muted:Boolean - True to mute the player. false to unmute.

Example:

``` JavaScript
// The player is now silent
meisterInstance.muted = true;

// The player is now playing the audio again
meisterInstance.muted = false;
```

### get playing:Boolean ###

Returns if the player is currently playing.

``` JavaScript
console.log(meisterInstance.playing);
```

### get currentItem:MediaObject ###

Returns the current playing media item.

``` JavaScript
console.log(meisterInstance.currentItem);
```

### get duration:Number ###

Returns the duration of the media.

``` JavaScript
console.log(meisterInstance.duration);
```

### get/set currentTime:Number ###

Gets/sets the current time of the media.

- currentTime:Number - The time you want to seek to.

Example: 

``` JavaScript
// Seeks to the given moment.
meisterInstance.currentTime = 10.2;
```

### get isFullscreen:Boolean ###

Returns whether the player is in fullscreen mode or not.

Example: 

``` JavaScript
console.log(meisterInstance.isFullscreen);
```

### get playerType:String ###

Gets the current player type. This is for example 'html5'.

Example:

``` JavaScript
console.log(meisterInstance.playerType);
```

### static get instances:*Array<Object{id:Number, instance:Meister}>* ###

Will return all the instances of Meister running on the page.

Example:

``` JavaScript
console.log(Meister.instances);
```

Events
----

The following events can be used to listen/trigger with the ```on```, ```one``` and ```trigger``` functions on Meister:

### **Ad events** ###



### adBreakStarted -> { ad: any, ... } ###

Triggers when an ad break started playing (When you go from content to ad)

returns:

- ad:any - Information about the current playing ad.

### adBreakEnded -> {ad: any, ... } ###

Triggers when an ad break is done. (When you go from ad to content)

returns:

- ad:any - Information about the current playing ad.

### adStarted -> {ad: any, ... } ###

Triggers when an ad has started in the adbreak (This is triggered on each ad in the ad break).

returns:

- ad:any - Information about the current playing ad.

### adEnded -> {ad: any, ... } ###

Triggers when an ad has ended in the adbreak (This is triggered on each ad in the ad break).

returns:

- ad:any - Information about the current playing ad.

### adTimeupdate -> { currentTime: Number, duration: Number }

Triggers each time an ad time update has been done.

- currentTime:Number - The current time relative to the ad.
- duration:Number - The duration of the ad.

### adCuePoints -> { points:any } ###

Triggers when information about the ad points are known. These points are when ad breaks are scheduled.

- points:any - The schedulded ad points.

### **Control events** ###


### requestPlay -> { ?triggerByUser:Boolean } ###

Triggers when a request to play has been done. 

- triggerByUser:Boolean - Is this event result of an user action.

### requestSeek -> { ?relativePosition:Number, ?timeOffset:Number } ###

Triggers when a request to seek has been done.

- ?relativePosition:Number - (optional) The position in percentage you want to seek to relative to the duration
- ?timeOffset:Number - (optional) Amount of seconds you want to step forward (positive number)/backwards (negative number)

### requestPause -> { ?triggerByUser:Boolean } ###

Triggers when a request to pause has been done.

- triggerByUser:Boolean - Is this event result of an user action.

### requestBitrate -> { bitrateIndex:Number } ###

Triggers when a request has been done to set the bitrate

- bitrateIndex:Number - The index of the bitrate that is selected, -1 is auto.


### **Item events** ###

### itemLoadPrevented -> { error: String } ###

Triggers when a load is trying to be done while an ad is playing (and the config option disableLoadDuringAd is set to true).

- error:String - The cause of a load prevented.

### itemLoaded -> { item: MediaObject } ###

Triggers when the ```load()``` on a plugin has completed. This does not mean the video is capable of playback yet. 

- item:MediaObject - The item that is loaded.
    - MediaObject:*Object<{ src:String, type:String, ... }>* - The item object

### itemUnloaded ###

Triggers when the ```unload()``` on a plugin has completed.

### itemTimeInfo -> { isLive:Boolean, hasDVR:Boolean, duration:Number } ###

Triggers when additional time info is known. It's recommended to use this for a correct representation of time.

- isLive:Boolean - Whether the video is live or not.
- hasDVR:Boolean - Whether the video has a DVR window.
- duration:Number - The duration of the video.

### itemBitrates -> { bitrates:Array<Object>, currentIndex:Number } ###

Triggers when the bitrates that are available are known.

- bitrates:Array<Object{bitrate:Number, index:Number}> - An array of all available bitrates
- currentIndex:Number - The current selected bitrate index.

### itemImageStream -> { images:Array<Object{ src:String, start:Number, end:Number }> } ### 

Triggers when a image stream is available. It can be used to show for example on a timeline.

- images:Array<Object{ ... }> - All images that can be used for the ui
    - src:String - The src of the image.
    - start:Number - The start time relative to the duration.
    - end:Number - The end time relative to the duration.


### **Player events** ###

### playerCreated ###

Triggers when a player has been created and is available for use.

### playerDestroyed ###

Triggers when a player is unloaded from Meister.

### playerTimeUpdate -> { currentTime:Number, duration:Number} ###

Triggers when a time update has occured.

- currentTime:Number - The current time of the player in the media.
- duration:Number - The duration of the media item.

### playerPlay -> { triggerByUser:Boolean } ###

Triggers when playback of the media starts after having been paused; that is, when playback is resumed after a prior pause event.

### playerPlaying ###

Triggers when the media begins to play (either for the first time, after having been paused, or after ending and then restarting).

### playerFirstPlay ###

Triggers when an item starts playing for the first time.

### playerReplay ###

Triggers when an item has ended and the play button is hit again.

### playerPause -> { ?type:String, ?triggerByUser:Boolean } ###

Triggers when playback is paused.

- type:String - What kind of media type paused the item
- triggerByUser:Boolean - If the pause was caused by a user action.

### playerSeek -> {relativePosition:Number, currentTime:Number, duration:Number} ###

Triggers when a seek has been done

- relativePosition:Number - The position relative to the duration (in percentage)
- currentTime:Number - The new currentTime
- duration:Number - The current duration of the media item.

### playerSeeking ###

Triggers when a seek operation begins.

### playerNudge -> { totalNudges:Number } ###

Triggers when a nudge has been done. This is usually when the player could not overcome a gap in the media item.

- totalNudges:Number - The amount of nudges in total done.

### playerEnd ###

Triggers when playback completes.

### playerError -> { mediaError:any } ###

Triggers when an error occurs with playback of the current item.

- mediaError:any - The media error.


### playerVolumeChange ###

Triggers when the audio volume changes (both when the volume is set and when the muted attribute is changed).

### playerFullscreen ### 

Triggers when the browser is switched to/out-of fullscreen mode.

### playerSwitchBitrate -> { newBitrate:Number, newBitrateIndex:Number } ###

Triggers when a request for a new bitrate has been completed.

- newBitrate:Number - The new bitrate selected
- newBitrateIndex:Number - The new selected bitrate index.

### playerAutoSwitchBitrate -> { newBitrate:Number, newBitrateIndex:Number } ###

Triggers when has automatically chosen a new bitrate. 

- newBitrate:Number - The new bitrate selected
- newBitrateIndex:Number - The new selected bitrate index.

### playerProgress -> mediaElement:HTMLMediaElement|any ###

Triggers periodically to inform interested parties of progress downloading the media. Information about the current amount of the media that has been downloaded is available in the media element's buffered attribute.

- mediaElement:HTMLMediaElement|any - The media element itself.

### playerLoadedMetadata ###

Triggers when media's metadata has finished loading; all attributes now contain as much useful information as they're going to.

### playerDurationChange ###

Triggers when metadata has loaded or changed, indicating a change in duration of the media.  This is sent, for example, when the media has loaded enough that the duration is known.

### playerBuffering ###

Triggers when the player is buffering

### playerBufferedEnough ###

Triggers when the player has buffered enough to continue playback.


### **Playlist events** ###

### playlistInfo -> { currentIndex:Number, length:Number }  ###

Informars what position in the playlist we are.

- currentIndex:Number - The current index in the playlist.
- length:Number - The length of the playlist.

### playlistNext ###

Triggers when the next item in the playlist has been requested. This is mostly triggered by UI and not by the playlist itself.

### playlistPrevious ###

Triggers when the previous item in the playlist has been requested. This is mostly triggered by UI and not by the playlist itself.

### playlistMetadata -> item:MediaObject ###

Triggers when a new item is being loaded in the playlist. 

- item:MediaObject - The item that is loaded.
    - MediaObject:*Object<{ src:String, type:String, ... }>* - The item object

### uiReady -> { pluginSpace:Element } ###

Tells the player the UI is ready to be used and gives other ui plugin a chance to render their UI in the given pluginSpace.

- pluginSpace:Element - The element users can use to insert nodes into.

### uiPluginInserted -> { icon:String, name:String } ###

Triggers when a uiPlugin has been inserted in the pluginSpace.

- icon:String - The url to the icon.
- name:String - The name of the plugin.

### uiPluginOpen -> { name:String } ###

Triggers when a ui plugin is opened

- name:String - The name of the plugin that is opened.

### uiPluginClose ###

Triggers when a ui plugin is closed


Creating plugins
----

Plugins are a way for Meister to play different media types and add different functionality to the player. Plugins are used by Meister internally so it's very flexible in what it can do.

There are a few types of plugins Meister supports. These are the following:

- Meister.MediaPlugin - Allows media types to be played ex. hls, dash, mp4, etc
- Meister.ParserPlugin - Allows plugins to parse manifests or other playlist formats. ex. smil, webvtt, etc
- Meister.PlayerPlugin - Allows using different players to be used within Meister, ex. HTML5, Flash, Silverlight, etc.
- Meister.Ui - Allows for Ui creation. ex. Message Overlay, StandardUi, etc.
- Meister.AnalyticsPlugin - Allows plugins to track data of the video. ex. GoogleAnalytics, Conviva, etc.
- Meister.Middleware - Allows to sit between plugins and modify their items. ex. conversion of URLs
- Meister.ProtoPlugin - Anything that doesn't fall between these spaces. For example Utility's (DRM, etc).

### **Simple plugin example:** ###

``` JavaScript

// We need to extend from the Meister.MediaPlugin
// So meister knows what lifecycle functions are available.
class MyAwesomePlugin extends Meister.MediaPlugin {
    // Each plugin type gets a config and the meister instance object.
    // config is determined through 'new Meister('#player', config)'
    // It maps the pluginName with the config.
    constructor(config, meister) {
        // Super must be called to initialise the plugin
        super(config, meister);
    }

    // We recommend setting a statoc pluginName getter on the class to be able to allow users to know what plugin name to configure with.
    static get pluginName() {
        return 'MyAwesomePlugin';
    }

    // This will be called when Meister is searching for a plugin that can play the item
    // that is set by setItem();
    // isItemSupported is a promise function so you can do async checks.
    isItemSupported(item) {
        return new Promise((resolve) => {
            if (item.type === 'mp4') {
                resolve({
                    supported: true,
                });
            } else {
                // A non supported item should resolve but with a support:false.
                resolve({
                    supported: false,
                });
            }
        });
    }

    // Do some processing for the item, such as getting tokens from the server.
    process(item) {
        return new Promise((resolve) => {
            // We want to play our media in HTML5 so we save the instance here.
            this.player = this.meister.getPlayerByType('html5');

            // Resolve with item, We didn't need to process anything.
            resolve(item);
        });
    }

    // Start loading the player.
    // This doesn't have to play automaticly, it only has to be able to play.
    load(item) {
        // The super handles things like startPositions so we need to make sure to call it.
        super.load(item);

        // Mp4 can be directly set as src
        this.player.currentSrc = item.src;
    }

    // Reset all the values for the next item.
    unload() {
        super.unload();

        this.player = null;
    }

    // This will be called after a meisterInstance.destroy()
    // For example kept variables, or states.
    destroy() {
        // We don't have anything to destroy..
    }
}

// Register the plugin in Meister so it's ready for use.
// To start the plugin you must add the plugin to the config
// So to init this plugin you can do:
// var meister = new Meister('#player', { MyAwesomePlugin: {} });

Meister.registerPlugin(MyAwesomePlugin.pluginName, MyAwesomePlugin);
```

Now you've created a minimal media plugin to start playing MP4's. 

### **Lifecycle** ###

Meister plugins have a certain lifecycle functions. Meister calls these lifecycle function upon need. 

### constructor(config:Object, meister:Meister) ###

Constructs the plugin. Here can you init variables that you may need in the future.

- config:Object - Config directly passed from new Meister. these will be mapped to whatever name you gave you'r plugin. So if you did ```Meister.registerPlugin('test', MyPlugin);``` then you need to do ```new Meister('#player', { test: { foo: 'bar' } })```. config will then contain a object with ```{ foo: 'bar' }```.
- meister:Meister - The current instance of meister.

Example: 

``` JavaScript
class MyAwesomePlugin extends Meister.MediaPlugin {
    constructor(config, meister) {
        // Do stuff here with the config.
    }
}
```

### isItemSupported(item:MediaObject):Promise ###

Is called when Meister wants to know if the plugin can play the item.

**NOTE:** This will only be called on plugins that extend from ```Meister.MediaPlugin```, ```Meister.ParserPlugin``` and ```Meister.Middleware```.

- item:MediaObject - The object that is given with setItem or setPlaylist. It contains atleast the properties ```type``` and ```src```

returns

- Promise - A promise that does not reject.
    - resolve({ supported:Boolean, errorCode: String }) - What is excpeted to resolve
        - supported:Boolean - Whether the plugins supports the item
        - errorCode:String - The error code to show. ex. TST-0001

Example:

``` JavaScript
class MyAwesomePlugin extends Meister.MediaPlugin {
    ...

    isItemSupported(item) {
        return new Promise((resolve) => {
            if (item.type === 'mp4') {
                resolve({
                    supported: true,
                });
            } else {
                resolve({
                    supported: false,
                    errorCode: 'SPRT-0001'
                });
            }
        });
    }
}
```

### process(item:MediaObject):Promise ###

Is called once the plugin has been chosen for playback/parsing. Here you can do preperation for playback such as getting the manfist or do some authorization.

**NOTE:** This will only be called on plugins that extend from ```Meister.MediaPlugin```, ```Meister.ParserPlugin``` and ```Meister.Middleware```.

- item:MediaObject - The object that is given with setItem or setPlaylist. It contains atleast the properties ```type``` and ```src```

returns

- Promise - A promise that can resolve or reject
    - resolve(item:MediaObject) - The processed item.
    - reject(error:String) - An error message

Example:

``` JavaScript
class MyAwesomePlugin extends Meister.MediaPlugin {
    ...

    process(item) {
        return new Promise((resolve, reject) => {
            try {
                doSomeTask();

                // We do not need to modify the item so we keep it like this.
                resolve(item);
            } catch(err) {
                reject(err);
            }
        });
    }
}
```

### load(item:MediaObject) ###

Allows the plugin to load the media item into the player. This is the last step to be able to play the item. It does not mean that the item should be playing, just be ready to be played.

**NOTE:** This will only be called on plugins that extend from ```Meister.MediaPlugin```, ```Meister.ParserPlugin```,  ```Meister.Middleware```, ```Meister.AnalyticsPlugin``` and ```Meister.PlayerPlugin```.

- item:MediaObject - The object that is given with setItem or setPlaylist. It contains atleast the properties ```type``` and ```src```

Example:

``` JavaScript
class MyAwesomePlugin extends Meister.MediaPlugin {
    ...

    load(item) {
        // This allows for startPosition functionality.
        super.load(item);

        // Do something with loading the item in the player.
    }
}
```
### unload() ###

Allows the plugin to unload the item and clean up some variables.

Example:

``` JavaScript
class MyAwesomePlugin extends Meister.MediaPlugin {
    ...

    unload(item) {
        // For example:
        this.player = null;
        
        ...
    }
}
```

### destroy() ###

This is called when meisterInstance.destroy() is called. This allows a plugin to fully cleanup any listeners active and clean up all variables.

``` JavaScript
class MyAwesomePlugin extends Meister.MediaPlugin {
    ...

    destroy() {
        // Destroy all events and variables
    }
}

```

### **Analytics plugin** ###

Analytics plugins are a special kind since they have a special feature that allows not having to listen to standard events. These will be mapped to the class functions.
To start using this feature you must start the function with ```on``` and have the first letter of the event name in caps.

So for example if you want to listen for ```playerPlay``` you use the function ```onPlayerPlay``` and for the event ```itemLoaded``` you use the function ```onItemLoaded``` and so on.

NOTICE: This only works for the type ```Meister.AnalyticsPlugin``` and only events that are documented in this README.

Example:

``` JavaScript
class MyAwesomeAnalyticsPlugin extends Meister.AnalyticsPlugin {

    // Functions will be automaticly mapped to events
    onPlayerPlay() {
        doSomeTracking( ... );
    }

    // It also returns all event properties
    itemLoaded(item) {
        doSomeMoreTracking( ... );
    }
}
```
