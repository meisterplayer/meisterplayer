# Meister Web Player #

JavaScript based web player, version v4.9.3.  
This is a quick guide to setting up the player, for an overview of the various properties, methods, and events you can go [here](API.md).

## Note ##

Previously this was the Vinson player. For backwards compatibility the Vinson namespace mirrors the Meister namespace, though we recommend moving to the new namespace.

### How do I get set up? ###

Simply include the `meister.bundled.js` and `meister.bundled.css` in your page and initialize the player:


``` HTML
<link rel="stylesheet" href="stylesheets/meister.bundled.css">

<div id="player"></div>


<script src="meister.bundled.js"></script>
<script>
    // initialize Meister and plugins.
    var player = new Meister('#player', {
        // Plugins can be configured
        youboraAnalytics: {
            url: 'tracking URL',
            pluginVersion: '2.0.0_html5',
            system: 'npawplug',
            defaultPingTime: 5
        },
        // You can also configure the player globally
        global: {
            startMuted: false,   // Mute audio on page load
            autoplay: false,     // Start playing once the player has loaded
            controls: true,     // Do not show the controls
            audioOnly: false,    // Always use an audio element to play the media
            disableLoadDuringAd: false, // Disable switching of content during an adbreak
            language : "en" // set language of interface elements to english (default) or nl (dutch)
        }
    });

    // Tell the player you want to play an MP4.
    player.setItem({
        src: 'YOUR_CONTENT_URL',
        type: 'mp4'
    });

    // Start playing once the item has loaded (will not work on mobile devices)
    player.one('itemLoaded', function() {
        player.play();
    });

    // Load the player.
    player.load();
</script>
```

This will initialize the player with the youboraAnalytics plugin. This plugin is optional, initializing without it will not affect the playing capabilities of the player. In addition to the YouBora plugin you can also configure the player globally, which will be described at the end of this document.

#### Cleaning Up ####
Once you're done playing your content you can destroy the player context by calling the `destroy` method and nulling the references you have to the player.  

```JavaScript
var player = new Meister('#player', {
    global: {
        autoplay: true,
    }
});

// Tell the player you want to play an MP4.
player.setItem({
    src: 'YOUR_CONTENT_URL',
    type: 'mp4'
});

// Load the player.
player.load();

//... Some time passes

// We want to clean up the player
player.destroy(); // also removes the DOM elements
player = null; // Make sure no references remain so the GC can clean up any remaining resources
```


### Switching Content ###

Perhaps you changed your mind and would like to display a different video. This can be accomplished relatively straightforward by repeating most of the steps in the setup.

``` JavaScript
// Tell the player what new item it should display.
player.setItem({
    src: 'MORE_INTERESTING_CONTENT_URL',
    type: 'smil'
});

// Start playing the new media once it has been loaded.
player.one('itemLoaded', function() {
    player.play();
});

// Tell the player to process the resource and prepare for playback.
player.load();
```

As is shown in the above example, the new item does not have to be of the same type as the previously displayed item.

#### Switching Content During Ad Break ####

By default the player will cancel the current ad break when another item is loaded. Optionally you can set a global configuration flag to prevent the switching of content when the player is playing an ad break. No new item will be loaded and to the user it will seem as if nothing happens. To remedy this you can listen to the `itemLoadPrevented` event and look for the `adPlaying` propertyto give appropriate feedback to the user.

``` JavaScript
var player = new Meister('#player', {
    global: {
        disableLoadDuringAd: true
    }
});

// Set up a handler to inform the user.
player.on('itemLoadPrevented', function (e) {
    if (e.error === 'adPlaying') {
        alert('Sorry, please finish watching this ad first.')
    }
});

/* Player starts playing an ad break */

// Setting a new item is still possible.
player.setItem({
    src: 'MORE_INTERESTING_CONTENT_URL',
    type: 'm3u8'
});

// This will not do anything, except trigger the 'itemLoadPrevented' event.
player.load();
```

Any `setItem` calls will still go through, even though the content won't be loaded immediately. This allows you to set up a simple queuing system that will start playing content after the ad break has completed. An example apporach is provided below:  

``` JavaScript
var player = new Meister('#player', {
    global: {
        disableLoadDuringAd: true,
        autoplay: true
    }
});

/* Start playing media  */

// This indicates whether there is a queued up item or not.
var playQueue = false;
player.on('itemLoadPrevented', function (e) {
    if (e.error === 'adPlaying') {
        playQueue = true;
    };
});

player.on('adBreakEnded', function () {
    if (playQueue) {
        playQueue = false;

        // Player will start playing due to the global autoplay property.
        player.load();
    }
});
```

### Error Messages ###

Despite our best efforts it can happen that the player encounters an error. This is most often the case when you try to play an item which is not supported in a browser, or perhaps because there is no plugin present for the item in question. Should this happen the player will present the user with an error screen and give an indication of what might be wrong. It is possible to override the default error message to provide localized or more specific feedback to the user. We provided a small example below:  

``` JavaScript
window.Meister.MessageStore.setMessages({
    code: window.Meister.ErrorCodes.WRONG_TYPE, // Unable to find a plugin for this type
    message: 'A custom error message.',
    options: {
        title: 'A custom title.',
        headTitle: 'A custom header title.',
    }
});
```

The above snippet will store a custom message for the error code `MSTR-0001`, so whenever the player is unable to find a plugin to play an item it will display this message instead of the default one. Below are the error codes currently in use.

- **window.Meister.ErrorCodes.WRONG_TYPE**: There is no plugin present for the item type.
- **window.Meister.ErrorCodes.NOT_SUPPORTED**: There is a plugin present for this item, but it is not supported in the current browser.
- **window.Meister.ErrorCodes.NO_DRM**: You specified DRM info for this item but the plugin does not support DRM playback in the current browser.

You can also set multiple messages at once by passing an array:  

``` JavaScript
window.Meister.MessageStore.setMessages([
    {
        code: window.Meister.ErrorCodes.NOT_SUPPORTED, // Unable to find a plugin for this type
        message: 'Please consider updating your browser or use another browser.',
        options: {
            title: 'Unable to play content.',
            headTitle: 'Unsupported browser.',
        }
    },
    {
        code: window.Meister.ErrorCodes.NO_DRM, // Unable to find a plugin for this type
        message: 'Please use a modern, up-to-date browser such as Chrome, Safari, or Edge.',
        options: {
            title: 'Unable to play content.',
            headTitle: 'Unsupported browser.',
        }
    },
]);
```

### Fallback Sources ###

Not all browsers offer support for all streaming methods, as such it is not uncommon to have multiple different streams for the same content. To make this easier the player supports the `multi-source` type, in which you can configure multiple sources.

```JavaScript
var player = new Meister('#player', {}); // No need for any options on the player.

// When setting the item provide the player with information on the various DRM options.
player.setItem({
    type: 'multi-source',
    sources: [
        {
            // Player will first try to play the dash stream.
            src: 'YOUR_DASH_URL',
            type: 'dash',
        },
        {
            // If dash playback is not possible, the player will try hls.
            src: 'YOUR_HLS_URL',
            type: 'hls',
        }
    ],
});
```

### Configuring UI ###

#### Disable Auto Hide Controls ####

By default the controls will hide after 3 seconds, and show again on mouseover. The duration before the controls fade is configurable through the `timeToFade` config value:

```JavaScript
const player = new Meister('#targetDiv', {
    ...,
    standard: {
        timeToFade: 3, // Time in seconds.
    }
});
```

In addition it is possible to completely disable the hiding of the controls. You can set the initial state through the `fixedControls` config value, and change it manually by triggering an event on the instance.

```JavaScript
const player = new Meister('#targetDiv', {
    ...,
    standard: {
        fixedControls: false, // Default value
    }
});

// Player now hides controls after 3 seconds of no mouse activity.

player.trigger('standard:toggleFixedControls', {
    fixed: true,
});

// Player now shows controls and disables the hiding mechanism.

player.trigger('standard:toggleFixedControls', {
    fixed: false,
});

// Player now hides controls after 3 seconds once again.
```

### DRM Content ###

The player is capable of playing content encrypted with Apple's FairPlay, Google's WideVine, and Microsoft's PlayReady. The configuration is quite straightforward, as you can see in the example below:

``` JavaScript
var player = new Meister('#player', {}); // No need for any options on the player.

// When setting the item provide the player with information on the various DRM options.
player.setItem({
    src: 'YOUR_CONTENT_URL',
    type: 'dash',
    // use the drmConfig property to pass the information.
    drmConfig: {
        // You specify the details for each drm type seperately.
        playready: {
            drmServerUrl: 'YOUR_PLAYREADY_DRM_SERVER_URL',
            // Any custom headers that need to be present on the request can be specified here.
            customHeaders: {
                'X-HEADER-KEY-1': 'HEADER-VALUE-1',
                'X-HEADER-KEY-2': 'HEADER-VALUE-2',
            }
        },
        widevine: {
            drmServerUrl: 'YOUR_WIDEVINE_DRM_SERVER_URL',
            // Any custom headers that need to be present on the request can be specified here.
            customHeaders: {
                'X-HEADER-KEY-1': 'HEADER-VALUE-1',
                'X-HEADER-KEY-2': 'HEADER-VALUE-2',
            },
            // Additionally should the DRM server require a specific scheme you can specify that too.
            scheme: {
                kid: '%%KID%%', // The %%KID%% will be replace with the KID of the content, regardless of the key.
                drm_info: '%%KEY_MESSAGE%%', // Same as for the KID, the key does not matter, only the %%KEY_MESSAGE%%.
            }
        }
    }
});

// For fairplay you also need to specify the certificate url.
player.setItem({
    src: 'YOUR_CONTENT_URL',
    type: 'm3u8',
    drmConfig: {
        fairplay: {
            drmServerUrl: 'YOUR_FAIRPLAY_DRM_SERVER_URL',
            drmCertificateUrl: 'YOUR_FAIRPLAY_CERTIFICATE_URL',
            customHeaders: {
                'X-HEADER-KEY-1': 'HEADER-VALUE-1',
                'X-HEADER-KEY-2': 'HEADER-VALUE-2',
            }
        },
    }
});
```

As you can see there is not a lot to it, and you should be able to set it up with relative ease.  

#### Fairplay ContentId ####

Since it is not always possible to follow Apple's guidelines with regards to placement of the content id we provide the possibilty to configure a regular expression, or insert the content id directly. When passing the contentId as a regular expression make sure to only use a single capture group. If the regex fails it will print an error to the console and use 'CONTENT_ID_NOT_FOUND' as the content id.

```JavaScript
// For fairplay you also need to specify the certificate url.
player.setItem({
    src: 'YOUR_CONTENT_URL',
    type: 'm3u8',
    drmConfig: {
        fairplay: {
            drmServerUrl: 'YOUR_FAIRPLAY_DRM_SERVER_URL',
            drmCertificateUrl: 'YOUR_FAIRPLAY_CERTIFICATE_URL',
            contentId: /.*keyIdentifier=(.*)&/,
            // contentId: 'CONTENT_ID_AS_A_STRING',
            customHeaders: {
                'X-HEADER-KEY-1': 'HEADER-VALUE-1',
                'X-HEADER-KEY-2': 'HEADER-VALUE-2',
            }
        },
    }
});
```

#### Checking DRM Capabilities ####

In order to check whether a browser supports DRM content the player exposes a function that returns a matrix with DRM namespaces and a boolean indicating if they are supported or not.

``` JavaScript
// It is a promise based check which passes the results through a callback.
Meister.DRMUtils.keySystemSupport.then(function (drm) {
    console.log('DRM support :: ', drm);
    // On Chrome 52 on mac this will output:
    'DRM support :: ' {
            isFinalEME: true, // Does this browser implement the final EME spec
            'com.adobe.primetime':  false,
            'com.apple.fps': false,
            'com.apple.fps.1_0': false,
            'com.apple.fps.2_0': false,
            'com.microsoft.playready': false,
            'com.widevine.alpha': true,
            'org.w3.clearkey': true, // While most browsers support this the player does not yet.
        }
});
```

#### Multi-Source Support ####

When you load a `multi-source` item with a 'drmConfig', the player will also test for DRM playback capabilities when deciding on what source to use. In the below example the player will choose the dash stream in modern versions of Chrome, and the hls stream in modern versions of Safari.

``` JavaScript
var player = new Meister('#player', {});

player.setItem({
    type: 'multi-source',
    sources: [
        {
            src: 'YOUR_DASH_URL',
            type: 'dash',
        },
        {
            src: 'YOUR_HLS_URL',
            type: 'hls',
        },
    ],
    drmConfig: {
        playready: {
            drmServerUrl: 'YOUR_PLAYREADY_DRM_SERVER_URL',
        },
        widevine: {
            drmServerUrl: 'YOUR_WIDEVINE_DRM_SERVER_URL',
        },
        fairplay: {
            drmServerUrl: 'YOUR_FAIRPLAY_DRM_SERVER_URL',
            drmCertificateUrl: 'YOUR_FAIRPLAY_CERTIFICATE_URL',
        },
    }
});
```

#### Notes ####

This feature of the player is still in development and as such some parts might be lacking or too verbose. There are plans to support  a 'general' custom headers option, so you do not have to repeat the same headers for all DRM providers.  

The scheme property only supports the setting of the key message and the kid for now, but this can be expanded should the need arise.  

While most browsers will indicate they can play content encrypted with clearkey the player does not provide support for this yet.


### Content Types ###

#### aditem ####

This type allows you to play a preroll before a arbitrary media item. *Currently it only supports Vast ads as a preroll.* IMPORTANT: *will not work properly on iOS with all content. Known issue with IMA SDK.*

```JavaScript
player.setItem({    
    media: {
        src: 'HLS_LIVESTREAM_URL',
        type: 'm3u8',
    },
    preroll: {
        src: 'VAST_URL',
        type: 'vast', // Currently the only option.
        tags: 'preroll' // Currently the only option.
    },
    type: 'aditem',
});

```

### Playing Audio Only ###

You can choose to let the media play in an audio element, either by default or on a per item basis. The main benefit of this is that an audio element allows for inline and background playback on mobile devices.  

#### Player Default ####

By setting the `audioOnly` config flag when instantiating a player you can force the player to play all content in an audio tag. This will also play video content, albeit without the visuals. You can also configure a default image to be used as the background image through the `defaultAudioImage` option. The player will then use this image when you don't specify one in the item.

``` JavaScript
var audioPlayer = new Meister('#player', {
    global: {
        audioOnly: true,
        defaultAudioImage: 'DEFAULT_IMG_URL',
    }
});

// Player will use 'DEFAULT_IMG_URL' as the image source when playing items.

audioPlayer.setItem({
    src: 'CONTENT_URL',
    type: 'm3u8',
    backgroundImage: 'CUSTOM_IMG_URL'
});

audioPlayer.load();

// Player will use 'CUSTOM_IMG_URL' as the image source for the duration of this item.
```

#### Per Media Item ####

By including the `mediaType: 'audio'` property in an item you can signal to the player it should use an audio element to play the content.

``` JavaScript
// Here we set the optional mediaType property to audio.
player.setItem({
    src: 'HLS_STREAM_WITH_AUDIO_ONLY_URL',
    type: 'm3u8',
    // Optionally tell the player this should be treated as audio only.
    mediaType: 'audio'
});
```  
**Important Note:** Do note that the player will not resize automatically, you will have to manually resize the container.  
**Important Note 2:** Audio only support for HLS streams containing both video and audio is experimental. It will NOT work when the manifest comes from a smil file.

#### Condensed UI ####

For a more mobile-friendly audio UI you can pass the `condensedUi` config flag to the standard UI plugin. This will disable the top bar, which makes lower player height values possible. In addition, this option removes the full screen button and replaces it with the cast button.

```JavaScript
const player = new Meister('#targetDiv', {
    // other options...,
    standard: {
        condensedUi: true,
    }
});

```

### Player Events ###

In the previous examples we already used the event system of the player to listen for the moment where the player is ready for playback. First we'll explain how to set up event listeners and how to destry them, before providing a list of the numerous events available.

#### Listener Basics ####

The basic syntax for registering events is `player.on("nameOfEvent", handle, [name])`, where `nameOfEvent` is a string, `handle` a function, and `name` is an optional string specifying the origin of the `handle`.

##### (optional) Handler Name #####

This argument is mainly used internally to better pinpoint where errors occur in event handlers. When you pass a string this will be used in logging error messages that occur in the event handler callback.

``` JavaScript
player.on("playerPlay", function() {
    // This will throw an error "undeclaredVariable is not defined".
    console.log(undeclaredVariable.length);
}, "ourIdentifier")

// *Player starts playing*
    Output: "EventHandler: Handle from 'ourIdentifier' for 'playerPlay' failed. Error: TypeError: undeclaredVariable is not defined"
```

##### Handler Scope #####

IMPORTANT: The optional `scope` parameter has been removed in favour of native scope binding.

There are multiple ways to go about in ensuring the handle you pass to the event handler will have the correct scope. Consider the following example:

``` JavaScript
// Simple object with a property and a method.
var person = {
    name: "John",
    greet: function() {
        console.log("Hello, my name is " + this.name);
    }
};

person.greet();
    Output: "Hello, my name is John"

// Now try this through the event handler.
player.on("playerPlay", person.greet);

// *Player starts playing*
    Output: "Hello, my name is"
```

The output through the event handler misses the name from the object because the scope of the handler is not the same as it was in `person.greet()`. To remedy this you can explicitly bind the function to a scope:

``` JavaScript
// Bind the scope to the function before passing it as the handle.
player.on("playerPlay", person.greet.bind(person));

// *Player starts playing*
    Output: "Hello, my name is John"
```

#### Persistent Listeners ####

Say we want to track how often the player starts playing, the code below will help us accomplish that.

``` JavaScript
var numberOfPlays = 0;
player.on("playerPlay", function() {
    numberOfPlays += 1;
});
```

Since we used `player.on()` the handler will trigger every time the player fires the 'playerPlay' event, which happens every time the player starts playing. You can also pass an array of eventNames that should all trigger the handle.

Maybe we're not so interested in the number of times the player starts playing after all and would like to stop listening to the event. To facilitate this the eventhandler returns an array of handler references that we can later use to stop listening to these events.

``` JavaScript
// First make sure to store the event references somewhere.
var eventReferences = player.on(["playerPlay", "playerPause"], function() {
    console.log("The player did something.");
});

// For demonstration purposes only.
console.log(eventReferences);
    Output: [Object { id: 0, hook: "playerPlay" }, Object { id: 1, hook: "playerPause" }]

// You can remove multiple events at once by passing an array of references.
player.remove(eventReferences);

// Or you can pass a single reference to remove just one
var singleReference = player.on("itemLoaded", function() {
    console.log("The item loaded");
});

// Even though we only registered a single event it still returns an array!
console.log(singleReference);
    Output: [Object { id: 2, hook: "itemLoaded" }]

// So we would first need to isolate it before removing, or pass the array with a single element in it, both ways work
var singleReferenceObject = singleReference[0];
player.remove(singleReferenceObject);
```

#### Single Time Listeners ####

Some events are only useful the first time they fire, like in the intial example where we wanted the player to start once it had loaded the item. Rather than keeping track of this yourself the player provides a method for this: `player.one()`. It works exactly like `player.on()`, except that it removes the handler after the first trigger.

``` JavaScript
// We just want to know when the first playback has started.
player.one("playerPlay", function() {
    console.log("First playback.");
});

// *Player starts playing*
    Output: "First playback."

// *Pause the player*

// *Player starts playing again*
    No output
```

#### Plugin Configuration ####

### Note ###

Plugins are not included by default. Depending on the package you have certain plugins may or may not be available. In the future plugins will come with their own seperate documentation to prevent confusion.

---

**hls**

This plugin offers some options to customize the splash screen before a stream starts.

* *splashTitle : String* The title you would like be displayed when stream has loaded but not yet started.
* *splashDescription : String* Displayed just below the title on the splash screen.
* *splashThumbnail : String* Path to an image you would like to use as background on the splash screen.

``` JavaScript
var player = new Meister("#querySelector", {
    hls: {
        splashTitle: "AWESOME_STREAM",
        splashDescription: "MUST_WATCH",
        splashThumbnail: "stream_splash_image_url"
    }
});
```

**youboraAnalytics**

Track events using YouBora. The plugin was developed and tested with version 5.3.0. The plugin supports setting default option values through the config, as well as overriding options through the setItem call.

* *scriptUrl : String* Either the path to the Youbora plugin library or the string 'none' to indicate you have already loaded the library yourself
* *libVersion : String* Version of the Youbora library that's being used
* *pluginVersion : String* The version of the plugin
* *pluginName : String* The name of the plugin
* *trackUIUserEventsOnly : Boolean* makes the player report onPlayerPlay and onPlayerPause ONLY when triggered by user (not by ads etc)
* *defaultOptions: Object* Object containing the default options the plugin should use. The following options are currently supported:
    * *code : String* Your youbora code
    * *transactionCode : String* Transaction code to identify the tracking sessions
    * *live : Boolean* Indicates that the media to be played is going to be live or VOD
    * *title : String* The title to be used in the tracking for the media
    * *hashTitle: Boolean* Whether to use the hashTitle functionality of youbora or not
    * *user : String* An identifier for the current user
    * *properties : Object* Custom properties you want the player to track. The object will be stringified and as such supports nesting
    * *extraParams : Object* Any extra parameters that should be tracked. This object does not support nesting

``` JavaScript
var player = new Meister("#querySelector", {
    youboraAnalytics: {
        scriptUrl: 'http://smartplugin.youbora.com/v5/javascript/libs/5.3.03/youboralib.js',
        libVersion: '5.3.0',
        pluginVersion: '1.0',
        pluginName: 'MeisterYoubora',
        trackUIUserEventsOnly : true,
        defaultOptions: {
            code: 'CODE_GOES_HERE',
            transactionCode: 'myTransCode',
            live: true,
            title: 'MyTitle'
            hashTitle: true,
            user: 'YOUR_USER_STRING',
            properties: {
                'additional_metadata': {
                    'additional_information',
                },
            },
            extraParams: {
                param1: 'value1',
                param2: 'value2',
            },
        }
    },
});
```

To override options add those to the item passed to the setMedia call as can be seen in the example below:

``` JavaScript
// Assuming we used the same setup code as in the previous example.

player.setItem({
    src: 'CONTENT_URL',
    type: 'm3u8',
    youboraOptions: {
        title: 'MyNewTitle', // will override the 'MyTitle' from the default.
        user: null, // null will override the default value of the property and remove it.
    }
})

// For the values we didn't specify the plugin will fallback to the default values.
```

**Platform Preview**

If you serve content from the Platform that supports the 'format=preview' request you can indicate this by flagging the particular item. To keep the player flexible this config is not located in a plugin, so you can load both content that supports the Platform Preview and content that does not in the same player instance.

``` JavaScript
// Assume we have a player instantiated.
player.setItem({
    src: 'PLATFORM_CONTENT_URL?format=smil',
    type: 'smil',
    "thePlatform:Preview": true
});

// ...

// We can later load content without this flag without breaking the player.
player.setItem({
    src: 'OTHER_CONTENT_URL',
    type: 'smil'
});
```
