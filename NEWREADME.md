Meister Web Player
====

Plugable JavaScript web player - version v4.9.3.

This is the Meister core. It required additional plugins to get set up. This guide will help you get starting up and play a simple MP4 video.

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
var meisterPlayer = new Meister('#player', {
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
// Outputs v4.9.6
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

### static get instances:*Array<{id:Number, instance:Meister}>* ###

Will return all the instances of Meister running on the page.

Example:

``` JavaScript
console.log(Meister.instances);
```
