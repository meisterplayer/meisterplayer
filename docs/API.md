# Meister Web Player #

JavaScript based web player, version v5.2.2.

### Configuration ###

These config options go in the `global` options property.

* **autoPlay** :: *Bool*  
    Start playing the media as soon as it is loaded (will not work for the first playback on mobile). Defaults to `false`.
* **startMuted** :: *Bool*  
    Start the player muted or not. Defaults to `false`.
* **controls** :: *Bool*  
    Start the player without controls or not. Defaults to `true`.
* **debug** :: *Bool*  
    Start the player with console messages or not. Defaults to `false`.
* **disableLoadDuringAd** :: *Bool*  
    Setting this to true will block the player from switching content while an ad is playing. Defaults to `false`.
* **customFullscreenElement** :: *String* || *Node*  
    Define a custom element tha should go fullscreen instead of the default. Takes a string to be used as a querySelector or a Node reference. Should an invalid value be set the player will display an error and use the default element instead.


### Static Player Methods and Properties ###

The player has two static getters that can be used to retrieve the version and name:
* **Meister.version** :: *String*  
    Yields `"vX.Y.Z"`
* **Meister.name** :: *String*  
    Yields `"meister"`

### Player Instance Methods and Properties ###

#### Properties ####

These properties have both a getter and a setter.

* **player.volume** :: *Float*  
    Adjust or get the volume of the player. Must be a value between 0 and 1.
* **player.muted** :: *Bool*  
    Mute or unmute the player.
* **player.currentTime** :: *Float*  
    Get or set the current playback position of the player.
* **player.debugEnabled** :: *Bool*  
    Enable or disable console logging.
* **player.showControls** :: *Bool*  
    Enable or disable the onscreen controls.

#### Read-only Properties ####

These properties can only be used to retrieve information about the player.

* **player.playing** :: *Bool*  
    Check whether the player is currently playing.
* **player.currentlyPlaying** :: *Object* { **title**  :: *String*, **bitrate**  :: *Int*, ... }  
    Retrieve some metadata about the item that is currently playing. Please note that the data available depends on the source material, so not all fields might be available for every item.
* **player.duration** :: *Float*  
    Get the current duration of the media that is playing.
* **player.isFullscreen** :: *Bool*  
    Check whether the player is currently fullscreen.
* **player.playerMode** :: *String*  
    Returns 'audio' when audioOnly is active, otherwise it returns 'video'.

#### Methods ####

* **player.setItem(item :: *Object*)**  
    Tell the player what item to load. Item should be an object with at least the following properties { **src**: :: *String* , **type**: :: *String* }.
* **player.load()**  
    Load the media that has been set.
* **player.play()**  
    Start playing the media (as long as it has finished loading). *NOTE: needs user interaction on mobile*
* **player.pause()**  
    Pause playback of the media.
* **player.requestFullscreen()**  
    Make the player go fullscreen (*needs user interaction*).
* **player.cancelFullscreen()**  
    Make the player leave fullscreen.
* **player.on(event :: *String* || *[String,...]*, callback :: *Function*, [identifier :: *String*])** :: *Array*  
    Register a persistent callback for the specified event/events with an optional identifier. This method can take a single string as the eventname or an array of strings. Every time the event fires the callback will be called. Should any execptions be thrown in the callback the player will print the identifier as well, should one have been provided. Returns an array of eventListener references, one for each event. An eventListener reference looks as follows: { **id** :: *Int*, **hook** :: *String* }. These can be used for deregistering events with `player.remove()`.
* **player.one(event :: *String*, callback :: *Function*, [identifier :: *String*])** :: *Object*  
    Similar to `player.on()`, except that this registers a one time only listener and can only take a single event hook as an argument. As a result it will also return only a single eventListener reference. When the event fires and the listener has not been removed it will fire and remove itself.
* **player.remove(eventListeners :: *Object* || *[Object]*)**  
    Takes a single eventListener reference or an array of them. This will deregister the callbacks associated with the reference, so that when the event fires the callback will no longer be called.
* **player.trigger(event :: *String*)**  
    Manually trigger an event, firing all the callbacks registered for that event.

## List of Built In Events ##

### Advertisement Related Events ###
* **adStarted**  
    Fired at the start of an individual ad (can fire multiple times in an ad break should it contain multiple ads).
* **adEnded**  
    Fired at the end of an individual ad (can fire multiple times in an ad break should it contain multiple ads).
* **adBreakStarted**  
    Fired at the start of an ad break (can also be a single ad).
* **adBreakEnded**  
    Fired at the end of an ad break.

##### Media Item Related Events ######
* **itemLoaded**  
    Fired when an item has finished loading. Use this listen for the moment when the player is ready for playback.
* **itemLoadPrevented** { error :: *String* }  
    Fired when the `disableLoadDuringAd` flag has been set and `player.load()` is called and prevented.  
    - **error** : Reason for preventing the load. Is set to 'adPlaying' in the disableLoadDuringAd scenario.
* **itemUnloaded**  
    Fired when an item has finished unloading.

##### Window Focus Related Events #####
* **windowFocusChange** { onForeground :: *Bool* }  
    Fired when the focus of the browser window changes, i.e. when a user switches to a different application.  
    - **onForeGround** : Set to true when the window has focus, and is false when it does not.
* **windowVisibilityChange** { visibility :: *String* }  
    Fired when the browser window visibility changes, i.e. when the window is minimized/maximized or the user switches to a different tab/to this tab.  
    - **visibility** : Set to 'hidden' when the window is not in view, 'visible' when it is in view.

##### Player Related Events #####
* **playerPlay**  
    Fires when the player starts playing.
* **playerPause**  
    Fires when the player is paused while it was playing.
* **playerEnd**  
    Fires when the player has finished playing the media.
* **playerTimeUpdate** { currentTime :: *Float*, duration :: *Float* }  
    Fires every timeupdate of the video element. This occurs while the player is playing.  
    - **currenTime** : The current playback time in seconds.  
    - **duration** : The duration of the media in seconds.
* **playerSeek** { relativePosition :: *Float*, currentTime :: *Float*, duration :: *Float* }  
    Fires when a seek operation is triggered on the player.  
    - **relativePosition** A value between 0 and 1 indicating how far into the duration the media is.  
    - **currenTime** : The current playback time in seconds.  
    - **duration** : The duration of the media in seconds.
* **playerError**  
    Fires when the player encounters an error.
* **playerVolumeChange**  
    Fires when the volume of the player is changed.
* **playerFullscreen**  
    Fires when the player leaves or enters fullscreen.
* **playerSwitchBitrate**  
    Fires when the player switches quality level.
* **playerProgress**  
    Fires while the player is downloading the media (behaviour not consistent among all browsers).
* **playerLoadedMetadata**  
    Fires when the player has downloaded the metadata associated with the media.
* **playerDurationChange**  
    Fires when the duration of the media changes.
* **playerBuffering**  
    Fires when the player is stalling playback in order to buffer. *NOTE: this sometimes fires false positives when seeking backwards in the video.*
* **playerBufferedEnough**  
    Fires when the player has buffered enough to start playing again.
