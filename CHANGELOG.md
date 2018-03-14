<a name="5.3.0"></a>
# [5.3.0](https://github.com/meisterplayer/meisterplayer/compare/v5.2.3...v5.3.0) (2018-03-14)


### Bug Fixes

* **destroy:** Fix issue where all instances where removed ([bc376e3](https://github.com/meisterplayer/meisterplayer/commit/bc376e3))


### Features

* **browser:** Add getInfo to make browser detection async ([cf7806e](https://github.com/meisterplayer/meisterplayer/commit/cf7806e))



<a name="5.2.3"></a>
## [5.2.3](https://github.com/meisterplayer/meisterplayer/compare/v5.2.2...v5.2.3) (2018-01-30)


### Bug Fixes

* **translations:** moved advertisement translations from old style to i18n localisation file ([46f1144](https://github.com/meisterplayer/meisterplayer/commit/46f1144))



<a name="5.2.2"></a>
## [5.2.2](https://github.com/meisterplayer/meisterplayer/compare/v5.2.1...v5.2.2) (2017-12-04)


### Features
* **localization:** Add more localization properties
* **version:** Use package.json as the version lead ([f8546f3](https://github.com/meisterplayer/meisterplayer/commit/f8546f3))



<a name="5.2.1"></a>
## [5.2.1](https://github.com/meisterplayer/meisterplayer/compare/v5.2.0...v5.2.1) (2017-11-07)



<a name="5.2.0"></a>
# [5.2.0](https://github.com/meisterplayer/meisterplayer/compare/v5.1.2...v5.2.0) (2017-11-01)


### Bug Fixes

* **Readme:** Fix using wrong bundled example ([d0e0d58](https://github.com/meisterplayer/meisterplayer/commit/d0e0d58))


### Features

* **localization:** Add ability to add a whole template to the localization bag ([c960b57](https://github.com/meisterplayer/meisterplayer/commit/c960b57))
* **localization:** Add more localization properties ([e6866b5](https://github.com/meisterplayer/meisterplayer/commit/e6866b5))



<a name="5.1.1"></a>
## [5.1.1](https://github.com/meisterplayer/meisterplayer/compare/v5.1.0...v5.1.1) (2017-07-13)


### Bug Fixes

* **plugins:** Registering middleware no longer breaks ([f20788c](https://github.com/meisterplayer/meisterplayer/commit/f20788c))



<a name="5.1.0"></a>
# [5.1.0](https://github.com/meisterplayer/meisterplayer/compare/v5.0.3...v5.1.0) (2017-07-12)


### Bug Fixes

* **plugins:** Allow overriding of already registered plugins ([ce00414](https://github.com/meisterplayer/meisterplayer/commit/ce00414)), closes [#26](https://github.com/meisterplayer/meisterplayer/issues/26)
* **time:** Make time property accessors return the correct values ([dccb4b7](https://github.com/meisterplayer/meisterplayer/commit/dccb4b7)), closes [#36](https://github.com/meisterplayer/meisterplayer/issues/36)



<a name="5.0.3"></a>
## [5.0.3](https://github.com/meisterplayer/meisterplayer/compare/v5.0.2...v5.0.3) (2017-06-06)


### Bug Fixes

* **configuration:** Fix configuration for Meister 5 ([be1d5fc](https://github.com/meisterplayer/meisterplayer/commit/be1d5fc))



<a name="4.9.3"></a>
## [4.9.3](http://git.triple-it.nl/javascript/player-framework/compare/v4.9.2...v4.9.3) (2017-02-28)


### Bug Fixes

* **conviva:** Pause events now track correctly ([570b2d3](http://git.triple-it.nl/javascript/player-framework/commits/570b2d3))



<a name="4.9.2"></a>
## [4.9.2](http://git.triple-it.nl/javascript/player-framework/compare/v4.9.1...v4.9.2) (2017-02-27)


### Bug Fixes

* **drm:** Fix issue where Firefox would not return the correct DRM support list ([c5886ef](http://git.triple-it.nl/javascript/player-framework/commits/c5886ef))



<a name="4.9.1"></a>
## [4.9.1](http://git.triple-it.nl/javascript/player-framework/compare/v4.9.0...v4.9.1) (2017-02-27)


### Bug Fixes

* **GA:** Make event label configurable ([57d3381](http://git.triple-it.nl/javascript/player-framework/commits/57d3381))
* **ima:** Content pause on ads is now non-user ([68da5cb](http://git.triple-it.nl/javascript/player-framework/commits/68da5cb))



<a name="4.9.0"></a>
# [4.9.0](http://git.triple-it.nl/javascript/player-framework/compare/v4.8.2...v4.9.0) (2017-02-27)


### Bug Fixes

* **ui:** Icecast on samsung stock browser no longer buffers continuously ([57261f8](http://git.triple-it.nl/javascript/player-framework/commits/57261f8))


### Features

* **audio:** Add option to display an image during audio playback ([99a0a07](http://git.triple-it.nl/javascript/player-framework/commits/99a0a07))
* **audio:** Add playerMode getter to check for audioMode ([a3748de](http://git.triple-it.nl/javascript/player-framework/commits/a3748de))
* **ui:** Add condensedUi config flag ([0c8d679](http://git.triple-it.nl/javascript/player-framework/commits/0c8d679))



<a name="4.8.2"></a>
## [4.8.2](http://git.triple-it.nl/javascript/player-framework/compare/v4.8.1...v4.8.2) (2017-02-23)


### Bug Fixes

* **drm:** Add null checks on video element on unload ([376640e](http://git.triple-it.nl/javascript/player-framework/commits/376640e))
* **drm:** Add unloaded checks to request callbacks ([d8a59d5](http://git.triple-it.nl/javascript/player-framework/commits/d8a59d5))
* **drm:** Specify capabilities and robustness ([bff7824](http://git.triple-it.nl/javascript/player-framework/commits/bff7824))
* **html5:** Add null checks on video element on unload ([f2c8e3a](http://git.triple-it.nl/javascript/player-framework/commits/f2c8e3a))
* **ima:** Dash streams should start after ads ([993a687](http://git.triple-it.nl/javascript/player-framework/commits/993a687))
* **startPos:** Allow initial seek even when blocked ([682fe08](http://git.triple-it.nl/javascript/player-framework/commits/682fe08))



<a name="4.8.1"></a>
## [4.8.1](http://git.triple-it.nl/javascript/player-framework/compare/v4.8.0...v4.8.1) (2017-02-22)


### Bug Fixes

* **conviva:** Add null check for requestPause ([5433a86](http://git.triple-it.nl/javascript/player-framework/commits/5433a86))



<a name="4.8.0"></a>
# [4.8.0](http://git.triple-it.nl/javascript/player-framework/compare/v4.7.1...v4.8.0) (2017-02-22)


### Bug Fixes

* **ima:** Trigger adEnded when an ad is skipped ([44cfc3a](http://git.triple-it.nl/javascript/player-framework/commits/44cfc3a))
* **keyboard:** Remove default focus ([aeb5675](http://git.triple-it.nl/javascript/player-framework/commits/aeb5675))


### Features

* **conviva:** Add adpod tracking ([71cac7f](http://git.triple-it.nl/javascript/player-framework/commits/71cac7f))
* **drm:** Add custom error when fairplay contentId function fails ([bf7b5c9](http://git.triple-it.nl/javascript/player-framework/commits/bf7b5c9)), closes [#167](http://git.triple-it.nl/javascript/player-framework/issues/167)
* **drm:** Add PSSH forge capability for Widevine ([d16ce73](http://git.triple-it.nl/javascript/player-framework/commits/d16ce73))
* **media:** Add option to disable seeking forward per item ([03f91d3](http://git.triple-it.nl/javascript/player-framework/commits/03f91d3))
* **quality:** Add event for auto bitrate switch ([521618c](http://git.triple-it.nl/javascript/player-framework/commits/521618c))
* **standardUi:** Ability to disable pause with live content ([38fbe79](http://git.triple-it.nl/javascript/player-framework/commits/38fbe79))
* **ui:** Add option to disable hiding controls ([ddbc399](http://git.triple-it.nl/javascript/player-framework/commits/ddbc399))
* **ui:** Add triggers for hide/show controls ([d137357](http://git.triple-it.nl/javascript/player-framework/commits/d137357))
* **ui:** Make control fade timeout configurable ([f6d2228](http://git.triple-it.nl/javascript/player-framework/commits/f6d2228))



<a name="4.7.1"></a>
## [4.7.1](http://git.triple-it.nl/javascript/player-framework/compare/v4.7.0...v4.7.1) (2017-02-17)


### Bug Fixes

* **dash:** No longer report negative currentTime ([5e1e702](http://git.triple-it.nl/javascript/player-framework/commits/5e1e702))


### Features

* **drm:** Allow functions as contentId for Fairplay ([b640ba0](http://git.triple-it.nl/javascript/player-framework/commits/b640ba0))
* **hls:** Make dvr threshold configurable ([69e24d3](http://git.triple-it.nl/javascript/player-framework/commits/69e24d3))
* **nativeHls:** Make dvrThreshold configurable ([ad48a47](http://git.triple-it.nl/javascript/player-framework/commits/ad48a47))



<a name="4.7.0"></a>
# [4.7.0](http://git.triple-it.nl/javascript/player-framework/compare/v4.6.5...v4.7.0) (2017-02-08)


### Bug Fixes

* **smooth:** Fix issue where plugin could not unload ([1206c42](http://git.triple-it.nl/javascript/player-framework/commits/1206c42))
* **ui:** Fix pointer events in resolution button ([885575f](http://git.triple-it.nl/javascript/player-framework/commits/885575f))


### Features

* **html5:** Throw error on 404 video src ([a904dc9](http://git.triple-it.nl/javascript/player-framework/commits/a904dc9))
* **ui:** Add configurable step forward/backward buttons ([519e8d7](http://git.triple-it.nl/javascript/player-framework/commits/519e8d7))



<a name="4.6.5"></a>
## [4.6.5](http://git.triple-it.nl/javascript/player-framework/compare/v4.6.4...v4.6.5) (2017-02-07)


### Bug Fixes

* **ima:** Fire playerEnded even without postrolls ([9960dca](http://git.triple-it.nl/javascript/player-framework/commits/9960dca))
* **streamsense:** Fix <type>roll labels for ads ([6f0545a](http://git.triple-it.nl/javascript/player-framework/commits/6f0545a))



<a name="4.6.4"></a>
## [4.6.4](http://git.triple-it.nl/javascript/player-framework/compare/v4.6.3...v4.6.4) (2017-02-06)


### Bug Fixes

* **nativehls:** Fix issue where time info was incorrect in DVR streams ([c7c1990](http://git.triple-it.nl/javascript/player-framework/commits/c7c1990))
* **streamsense:** Correct clip labelling with ads ([58f0040](http://git.triple-it.nl/javascript/player-framework/commits/58f0040))


### Features

* **dash:** Update to latest version ([4d891bd](http://git.triple-it.nl/javascript/player-framework/commits/4d891bd))



<a name="4.6.3"></a>
## [4.6.3](http://git.triple-it.nl/javascript/player-framework/compare/v4.6.2...v4.6.3) (2017-01-27)


### Features

* **hls:** Update to the latest version ([7253e0b](http://git.triple-it.nl/javascript/player-framework/commits/7253e0b))



<a name="4.6.2"></a>
## [4.6.2](http://git.triple-it.nl/javascript/player-framework/compare/v4.6.1...v4.6.2) (2017-01-25)


### Features

* **GA:** Expand configuration options ([78f3ae0](http://git.triple-it.nl/javascript/player-framework/commits/78f3ae0))



<a name="4.6.1"></a>
## [4.6.1](http://git.triple-it.nl/javascript/player-framework/compare/v4.6.0...v4.6.1) (2017-01-25)


### Bug Fixes

* **drm:** Fix issue where stringToByteArrayW was missing ([fcd041f](http://git.triple-it.nl/javascript/player-framework/commits/fcd041f))



<a name="4.6.0"></a>
# [4.6.0](http://git.triple-it.nl/javascript/player-framework/compare/v4.5.4...v4.6.0) (2017-01-24)


### Bug Fixes

* **dash:** Quality switch up replaces the buffer faster. ([9ee9523](http://git.triple-it.nl/javascript/player-framework/commits/9ee9523))
* **drm:** Fix issue where giving a Content-Type would result in duplicate headers ([16e29d8](http://git.triple-it.nl/javascript/player-framework/commits/16e29d8))
* **ima:** Fix issue where ad info would not display ([e69ee11](http://git.triple-it.nl/javascript/player-framework/commits/e69ee11))
* **ima:** Load video after ads on IE and Edge ([f96dcd0](http://git.triple-it.nl/javascript/player-framework/commits/f96dcd0))
* **middleware:** Fixed broken middleware implementation ([a87e2ed](http://git.triple-it.nl/javascript/player-framework/commits/a87e2ed))
* **streamsense:** Fix missing sko_cl and ns_st_cl labels. Correctly give time while seeking. Send end event. ([6d6c9f8](http://git.triple-it.nl/javascript/player-framework/commits/6d6c9f8))
* **volume:** Base volume on mediaElement volume ([1d4bbab](http://git.triple-it.nl/javascript/player-framework/commits/1d4bbab))


### Features

* **debugoverlay:** Add debug overlay ([ad8ec84](http://git.triple-it.nl/javascript/player-framework/commits/ad8ec84))
* **drm:** Add support for old PlayReady custom data ([ecc12a4](http://git.triple-it.nl/javascript/player-framework/commits/ecc12a4))
* **fairplay:** Add support for base64 certificates ([67236af](http://git.triple-it.nl/javascript/player-framework/commits/67236af))
* **Meister:** can now pass a DOM element to constructor ([f36f864](http://git.triple-it.nl/javascript/player-framework/commits/f36f864))
* **Meister:** Utils are now seperated ES6 modules ([28bf923](http://git.triple-it.nl/javascript/player-framework/commits/28bf923))
* **smooth:** Added smooth support ([2136dbf](http://git.triple-it.nl/javascript/player-framework/commits/2136dbf))
* **ui:** Add fullscreenOnDoubleClick flag to enable fullscreen toggling ([17df3c8](http://git.triple-it.nl/javascript/player-framework/commits/17df3c8))



<a name="4.5.4"></a>
## [4.5.4](http://git.triple-it.nl/javascript/player-framework/compare/v4.5.3...v4.5.4) (2016-12-23)


### Bug Fixes

* **captions:** Fix bug where captions would not be removed. ([f502c94](http://git.triple-it.nl/javascript/player-framework/commits/f502c94))
* **drm:** Filter unwanted chars from fairplay url ([b2e070d](http://git.triple-it.nl/javascript/player-framework/commits/b2e070d))
* **drm:** Properly check for drm config ([7ae852b](http://git.triple-it.nl/javascript/player-framework/commits/7ae852b))
* **resolution:** Broadcast quality switch once ([f11e5e7](http://git.triple-it.nl/javascript/player-framework/commits/f11e5e7))
* **StreamSense:** Correctly clean up on destroy ([7cfe332](http://git.triple-it.nl/javascript/player-framework/commits/7cfe332))


### Features

* **drm:** Allow fairplay contentid configuration ([769c026](http://git.triple-it.nl/javascript/player-framework/commits/769c026))
* **Media:** Add optional startposition parameter ([4a4e3c6](http://git.triple-it.nl/javascript/player-framework/commits/4a4e3c6))
* **Youbora:** Allow overriding of properties ([3ba836d](http://git.triple-it.nl/javascript/player-framework/commits/3ba836d))



<a name="4.5.2"></a>
## [4.5.2](http://git.triple-it.nl/javascript/player-framework/compare/v4.5.0...v4.5.2) (2016-12-01)


### Bug Fixes

* **drm:** add DRM to meister-global ([4abb43e](http://git.triple-it.nl/javascript/player-framework/commits/4abb43e))
* **scriptloader:** Fix for pending promise in scriptloader when a player is completely destroyed and recreated. ([3f4781c](http://git.triple-it.nl/javascript/player-framework/commits/3f4781c))
* **UI:** add check for subtitles-array ([4dfc365](http://git.triple-it.nl/javascript/player-framework/commits/4dfc365))


### Features

* **bitrates:** add bitrate mapping to resolutions with configuration options ([c1a8ad4](http://git.triple-it.nl/javascript/player-framework/commits/c1a8ad4))
* **language:** add dutch translations ([bf87f0c](http://git.triple-it.nl/javascript/player-framework/commits/bf87f0c))



<a name="4.5.1"></a>
## [4.5.1](http://git.triple-it.nl/javascript/player-framework/compare/v4.5.0...v4.5.1) (2016-11-29)


### Bug Fixes

* **drm:** add DRM to meister-global ([4abb43e](http://git.triple-it.nl/javascript/player-framework/commits/4abb43e))
* **UI:** add check for subtitles-array ([4dfc365](http://git.triple-it.nl/javascript/player-framework/commits/4dfc365))



<a name="4.5.0"></a>
# [4.5.0](http://git.triple-it.nl/javascript/player-framework/compare/v4.4.0...v4.5.0) (2016-11-24)


### Features

* **drm:** Separated DRM from core ([f503d9b](http://git.triple-it.nl/javascript/player-framework/commits/f503d9b))
* **Youbora:** Use the Youbora sdk to make calls ([8facda2](http://git.triple-it.nl/javascript/player-framework/commits/8facda2))



<a name="4.4.0"></a>
# [4.4.0](http://git.triple-it.nl/javascript/player-framework/compare/v4.3.2...v4.4.0) (2016-11-09)


### Features

* **Conviva:** Add Conviva plugin ([99bdc1a](http://git.triple-it.nl/javascript/player-framework/commits/99bdc1a))



<a name="4.3.2"></a>
## [4.3.2](http://git.triple-it.nl/javascript/player-framework/compare/v4.3.0...v4.3.2) (2016-11-03)


### Bug Fixes

* **hls:** Add more information to the currentItem method ([ecd81ec](http://git.triple-it.nl/javascript/player-framework/commits/ecd81ec))
* **vast:** Trigger playerPlay/pause on ad play/pause ([d14a9ba](http://git.triple-it.nl/javascript/player-framework/commits/d14a9ba))


### Features

* **dash:** Add low memory mode option ([a7e194c](http://git.triple-it.nl/javascript/player-framework/commits/a7e194c))
* **webvtt:** Add initial support for WebVTT captions ([fc3c1a3](http://git.triple-it.nl/javascript/player-framework/commits/fc3c1a3))



<a name="4.3.1"></a>
## 4.3.1 (2016-09-30)


### Bug Fixes

* **playready:** Add fix for DRM fix in edge 14 ([311be71](http://git.triple-it.nl/javascript/player-framework/commits/311be71))
* **vast:** Make prerolls on android work more reliably ([3fe8f8f](http://git.triple-it.nl/javascript/player-framework/commits/3fe8f8f))
* **dash** Fix errors thrown while destroying player ([deac0f9])
* **dash** Workaround for error thrown while using Chrome at playerPlay (caused no functional problems) ([962f4ab])



### Features

* **meister:** Add destroy method to properly clear the player ([a2e9e41](http://git.triple-it.nl/javascript/player-framework/commits/a2e9e41))
* **youbora** Add booleanvalue to indicate the play/pause event was triggered by a user instead of some other plugin ([3dfa8e0])
* **googleanalytics** Add booleanvalue to indicate the play/pause event was triggered by a user instead of some other plugin ([3dfa8e0])


<a name="4.3.0"></a>
# 4.3.0 (2016-09-16)


### Bug Fixes

* **playready:** Add fix for DRM fix in edge 14 ([311be71](http://git.triple-it.nl/javascript/player-framework/commits/311be71))
* **vast:** Make prerolls on android work more reliably ([3fe8f8f](http://git.triple-it.nl/javascript/player-framework/commits/3fe8f8f))


### Features

* **meister:** Add destroy method to properly clear the player ([a2e9e41](http://git.triple-it.nl/javascript/player-framework/commits/a2e9e41))



<a name="4.2.3"></a>
## [4.2.3](http://git.triple-it.nl/javascript/player-framework/compare/v4.2.2...v4.2.3) (2016-08-30)


### Bug Fixes

* **youbora:** Give pingTime in seconds instead of milliseconds ([2701dfe](http://git.triple-it.nl/javascript/player-framework/commits/2701dfe))

### Features

* **ima:** Support for VMAP's ([7378923](http://git.triple-it.nl/javascript/player-framework/commits/7378923))



<a name="4.2.2"></a>
## [4.2.2](http://git.triple-it.nl/javascript/player-framework/compare/v4.2.1...v4.2.2) (2016-08-29)


### Bug Fixes

* **parallel:** No longer listen to bitrateChange when the content plugin already listens ([5b60acd](http://git.triple-it.nl/javascript/player-framework/commits/5b60acd))

### Features

* **message:** Add a messagestore to override default (error) messages by errorCode ([9bf3f8b](http://git.triple-it.nl/javascript/player-framework/commits/9bf3f8b))
* **native-hls:** Update drm config if needed. ([ec86053](http://git.triple-it.nl/javascript/player-framework/commits/ec86053))



<a name="4.2.1"></a>
## [4.2.1](http://git.triple-it.nl/javascript/player-framework/compare/v4.2.0...v4.2.1) (2016-08-23)


### Bug Fixes

* **native-hls:** Display correct dvr time info on quality switching. ([e640d3d](http://git.triple-it.nl/javascript/player-framework/commits/e640d3d))



<a name="4.2.0"></a>
# [4.2.0](http://git.triple-it.nl/javascript/player-framework/compare/v4.1.1...v4.2.0) (2016-08-22)


### Bug Fixes

* **meister:** Add hack to rebind console methods warn and error inside iFrames ([519d028](http://git.triple-it.nl/javascript/player-framework/commits/519d028))
* **quality-switching:** Fixed issue where Safari could not quality switch with DRM ([c3b6a46](http://git.triple-it.nl/javascript/player-framework/commits/c3b6a46))
* **time-display:** Fix where Safari would show the incorrect timing with a new playlist item ([73c5dbb](http://git.triple-it.nl/javascript/player-framework/commits/73c5dbb))
* **youbora:** Check url before prepending http:// and improve some events ([181a051](http://git.triple-it.nl/javascript/player-framework/commits/181a051))

### Features

* **consolePlugin:** Create plugin that prints logs to a textarea (for IE/Edge issues with debug cons ([2b2c178](http://git.triple-it.nl/javascript/player-framework/commits/2b2c178))



<a name="4.1.1"></a>
## [4.1.1](http://git.triple-it.nl/javascript/player-framework/compare/v4.1.0...v4.1.1) (2016-08-16)


### Bug Fixes

* **drm:** Cancel outgoing license requests when switching content ([2692293](http://git.triple-it.nl/javascript/player-framework/commits/2692293))
* **drm:** Hide license spinner after adding key. ([57328b8](http://git.triple-it.nl/javascript/player-framework/commits/57328b8))
* **drm:** Switching between drm content on ie/edge now works properly ([c35e546](http://git.triple-it.nl/javascript/player-framework/commits/c35e546))
* **message:** Hide message when the item is unloaded ([e06b7ca](http://git.triple-it.nl/javascript/player-framework/commits/e06b7ca))
* **mobile:** Now properly exit fullscreen on iOS devices. ([659d3a5](http://git.triple-it.nl/javascript/player-framework/commits/659d3a5))
* **ui:** Add extra styles on IE and Edge so the go live button is clickable. ([89d126b](http://git.triple-it.nl/javascript/player-framework/commits/89d126b))
* **ui:** Disable screen play/pause on mobile ([8c5a930](http://git.triple-it.nl/javascript/player-framework/commits/8c5a930))
* **ui:** Display quality as raw bitrate instead of questionable conversion ([f5152c9](http://git.triple-it.nl/javascript/player-framework/commits/f5152c9))

### Features

* **consolePlugin:** Create plugin that prints logs to a textarea (for IE/Edge issues with debug cons ([2b2c178](http://git.triple-it.nl/javascript/player-framework/commits/2b2c178))
* **message:** Add error message overlay ([4f7910b](http://git.triple-it.nl/javascript/player-framework/commits/4f7910b))
* **standardUi:** Make quality button hideable through config. ([3f307ac](http://git.triple-it.nl/javascript/player-framework/commits/3f307ac))



<a name="4.1.0"></a>
# [4.1.0](http://git.triple-it.nl/javascript/player-framework/compare/v4.0.0...v4.1.0) (2016-08-01)


### Bug Fixes

* **dash:** Only broadcast bitrates on the initial load, not on every new manifest ([fd1e14c](http://git.triple-it.nl/javascript/player-framework/commits/fd1e14c))
* **dash:** Properly unload events ([d92d5a4](http://git.triple-it.nl/javascript/player-framework/commits/d92d5a4))
* **overlay:** Clicking the overlay will now properly start playback again ([6223c63](http://git.triple-it.nl/javascript/player-framework/commits/6223c63))

### Features

* **meister:** Add config option for setting a custom fullscreen element ([5d50b8b](http://git.triple-it.nl/javascript/player-framework/commits/5d50b8b))
* **multi-source:** Add support for fallback sources based on playback capabilities ([e970ab4](http://git.triple-it.nl/javascript/player-framework/commits/e970ab4))
* **StreamSense:** Add first version of the StreamSense plugin ([1db94c4](http://git.triple-it.nl/javascript/player-framework/commits/1db94c4))



<a name="4.0.0"></a>
# [4.0.0](http://git.triple-it.nl/javascript/player-framework/compare/v3.4.1...v4.0.0) (2016-07-25)


### Bug Fixes

* **html5:** A quick call to pause should no longer trigger a new play ([46eec40](http://git.triple-it.nl/javascript/player-framework/commits/46eec40))



<a name="3.4.1"></a>
## [3.4.1](http://git.triple-it.nl/javascript/player-framework/compare/v3.4.0...v3.4.1) (2016-07-25)


### Bug Fixes

* **his:** Use native HLS player for Samsung devices, since the lack of MediaSource support ([8b9a80b](http://git.triple-it.nl/javascript/player-framework/commits/8b9a80b))
* **html5:** Call to pause should no longer restart player. ([1e90ab2](http://git.triple-it.nl/javascript/player-framework/commits/1e90ab2))

### Features

* **dash:** Add dvr seeking support in the standard ui. ([3a65cf0](http://git.triple-it.nl/javascript/player-framework/commits/3a65cf0))
* **dash:** Add quality switching for dash streams ([aa4fee1](http://git.triple-it.nl/javascript/player-framework/commits/aa4fee1))
* **drm:** Switching between DRM streams in one session is now supported. ([5349ff9](http://git.triple-it.nl/javascript/player-framework/commits/5349ff9))
* **fairplay:** Add fairplay plugin structure ([ffd8879](http://git.triple-it.nl/javascript/player-framework/commits/ffd8879))
* **hls:** Add quality switching for native safari hls ([3e47b69](http://git.triple-it.nl/javascript/player-framework/commits/3e47b69))
* **hls:** Add rudimentary DVR support for native hls ([e0fa9e2](http://git.triple-it.nl/javascript/player-framework/commits/e0fa9e2))
* **Meister:** Rename Vinson player to Meister player ([0b3ad61](http://git.triple-it.nl/javascript/player-framework/commits/0b3ad61))
* **playready:** Add playready support ([b7efbfc](http://git.triple-it.nl/javascript/player-framework/commits/b7efbfc))
* **playready:** Add PlayReady support for edge ([c79c043](http://git.triple-it.nl/javascript/player-framework/commits/c79c043))
* **wide vine:** Widevine now uses the DRMPlugin class ([6653df9](http://git.triple-it.nl/javascript/player-framework/commits/6653df9))



<a name="3.4.0"></a>
# [3.4.0](http://git.triple-it.nl/javascript/player-framework/compare/v3.3.1...v3.4.0) (2016-07-04)


### Bug Fixes

* **vast:** Switching content during adbreak should no longer break the player ([94f76d8](http://git.triple-it.nl/javascript/player-framework/commits/94f76d8))

### Features

* **drm:** Add type DRM Plugin ([f92456c](http://git.triple-it.nl/javascript/player-framework/commits/f92456c))
* **vinson:** Add a config option for item loading during live ([9d591f6](http://git.triple-it.nl/javascript/player-framework/commits/9d591f6))



<a name="3.3.1"></a>
## [3.3.1](http://git.triple-it.nl/javascript/player-framework/compare/v3.3.0...v3.3.1) (2016-06-23)


### Bug Fixes

* **hls:** HLS as parallel item can now switch bitrate. ([cae2923](http://git.triple-it.nl/javascript/player-framework/commits/cae2923))

### Features

* **ui:** Clicking the player screen now plays/pauses content ([d6dc45b](http://git.triple-it.nl/javascript/player-framework/commits/d6dc45b))



<a name="3.3.0"></a>
# [3.3.0](http://git.triple-it.nl/javascript/player-framework/compare/v3.2.4...v3.3.0) (2016-06-21)


### Bug Fixes

* **ui:** The progress bars on iOS < 9 should work properly now ([719b0f9](http://git.triple-it.nl/javascript/player-framework/commits/719b0f9))
* **vast:** Empty vast responses should no longer break the player on iPad ([8d2f41c](http://git.triple-it.nl/javascript/player-framework/commits/8d2f41c))

### Features

* **vast:** Add item to support prerolls on arbitrary media. KNOWN ISSUE: does not always wo ([8066ccc](http://git.triple-it.nl/javascript/player-framework/commits/8066ccc))



<a name="3.2.4"></a>
## [3.2.4](http://git.triple-it.nl/javascript/player-framework/compare/v3.2.3...v3.2.4) (2016-06-03)


### Bug Fixes

* **hls:** HLS livestreams should now display 'LIVE' correctly on iOS. ([effe99e](http://git.triple-it.nl/javascript/player-framework/commits/effe99e))
* **hls:** Update to the latest version ([e1b9604](http://git.triple-it.nl/javascript/player-framework/commits/e1b9604))
* **vinson:** Fullscreen button now works correctly on iPad ([a4a7455](http://git.triple-it.nl/javascript/player-framework/commits/a4a7455))



<a name="3.2.3"></a>
## [3.2.3](http://git.triple-it.nl/javascript/player-framework/compare/v3.2.2...v3.2.3) (2016-04-19)


### Bug Fixes

* **preview:** Align content for safari on iOS 8 ([4d0f5ec](http://git.triple-it.nl/javascript/player-framework/commits/4d0f5ec))

### Features

* **hls:** Update hls player to latest stable version ([7af3e41](http://git.triple-it.nl/javascript/player-framework/commits/7af3e41))



<a name="3.2.2"></a>
## [3.2.2](http://git.triple-it.nl/javascript/player-framework/compare/v3.2.1...v3.2.2) (2016-04-14)


### Bug Fixes

* **hls:** Now switch streams more reliably on slower systems. ([4fcc0f3](http://git.triple-it.nl/javascript/player-framework/commits/4fcc0f3))
* **html5:** Workaround for chrome 50 mediaElement.play() promise. ([3dae80e](http://git.triple-it.nl/javascript/player-framework/commits/3dae80e))



<a name="3.2.1"></a>
## [3.2.1](http://git.triple-it.nl/javascript/player-framework/compare/v3.2.0...v3.2.1) (2016-04-04)


### Features

* **vinson:** Add audioOnly config flag on the whole player ([55b4eec](http://git.triple-it.nl/javascript/player-framework/commits/55b4eec))



<a name="3.2.0"></a>
# [3.2.0](http://git.triple-it.nl/javascript/player-framework/compare/v3.1.0...v3.2.0) (2016-04-01)


### Features

* **hls:** Allow playing of audio only streams when specified. ([e9036df](http://git.triple-it.nl/javascript/player-framework/commits/e9036df))
* **player:** Allow for a audio element to be created for audio only media items. ([de2d7e9](http://git.triple-it.nl/javascript/player-framework/commits/de2d7e9))
* **ui:** Add toggle for controls and add click to play ([b7a6050](http://git.triple-it.nl/javascript/player-framework/commits/b7a6050))
* **vinson:** Add showControls property to toggle controls. ([27080b7](http://git.triple-it.nl/javascript/player-framework/commits/27080b7))



<a name="3.1.0"></a>
# [3.1.0](http://git.triple-it.nl/javascript/player-framework/compare/v3.0.0...v3.1.0) (2016-02-19)


### Bug Fixes

* **facebook:** Fixed android loading ([1e219e9](http://git.triple-it.nl/javascript/player-framework/commits/1e219e9))
* **hls:** No longer forget to unload hls streams that came from a SMIL. ([c526189](http://git.triple-it.nl/javascript/player-framework/commits/c526189))
* **ui:** Make seek bar more touch friendly ([bf6de33](http://git.triple-it.nl/javascript/player-framework/commits/bf6de33))
* **ui:** Mouse stays pointer on draggin bars in Safari ([6ee2e04](http://git.triple-it.nl/javascript/player-framework/commits/6ee2e04))
* **ui:** No longer show ui after mouseup anywhere on the page ([4e90eac](http://git.triple-it.nl/javascript/player-framework/commits/4e90eac))

### Features

* **ui:** Add mobile specific ui tweaks ([e900c8e](http://git.triple-it.nl/javascript/player-framework/commits/e900c8e))
* **ui:** Highlight active buttons on hover ([547225d](http://git.triple-it.nl/javascript/player-framework/commits/547225d))



<a name="3.0.0"></a>
# [3.0.0](http://git.triple-it.nl/javascript/player-framework/compare/v2.0.0...v3.0.0) (2016-02-15)


### Bug Fixes

* **facebook:** iOS can now play video in the Facebook browser. ([8b3855b](http://git.triple-it.nl/javascript/player-framework/commits/8b3855b))
* **styles:** No longer resize player when video aspect ratio changes. ([8331f79](http://git.triple-it.nl/javascript/player-framework/commits/8331f79))
* **styles:** Remove test layout styles ([4e27cd7](http://git.triple-it.nl/javascript/player-framework/commits/4e27cd7))
* **vast:** Ads now display in fullscreen again ([47f6d58](http://git.triple-it.nl/javascript/player-framework/commits/47f6d58))
* **vinson:** Restore currentlyPlaying getter functionality ([a9330e2](http://git.triple-it.nl/javascript/player-framework/commits/a9330e2))

### Features

* **events:** Add this.on/this.one shortcut to classes ([785e34d](http://git.triple-it.nl/javascript/player-framework/commits/785e34d))


### BREAKING CHANGES

* events: The scope parameter has been removed in favour of native scope binding.



<a name="2.0.0"></a>
# [2.0.0](http://git.triple-it.nl/javascript/player-framework/compare/v1.6.1...v2.0.0) (2016-02-11)


### Bug Fixes

* **adUI:** Restore regular UI when switching video during ad display ([65a1b7c](http://git.triple-it.nl/javascript/player-framework/commits/65a1b7c))
* **hls:** HLS in safari is no longer always live ([6d07a98](http://git.triple-it.nl/javascript/player-framework/commits/6d07a98))
* **smil:** Parse mp3 urls correctly ([bb1aee9](http://git.triple-it.nl/javascript/player-framework/commits/bb1aee9))
* **ui:** Buffered bar now also works on timerange[0]... ([af9e876](http://git.triple-it.nl/javascript/player-framework/commits/af9e876))
* **ui:** Make seek bar preview display correctly in FF ([844b7ca](http://git.triple-it.nl/javascript/player-framework/commits/844b7ca))
* **vast:** Properly destroy vast context on switching media ([d4fca47](http://git.triple-it.nl/javascript/player-framework/commits/d4fca47))
* **vinson:** No longer breaks when no global options are provided ([2ca89f9](http://git.triple-it.nl/javascript/player-framework/commits/2ca89f9))

### Features

* **console:** Add a way of hiding console logs ([4043a34](http://git.triple-it.nl/javascript/player-framework/commits/4043a34))
* **ie:** Add support for IE ([55fcba9](http://git.triple-it.nl/javascript/player-framework/commits/55fcba9))
* **social-share:** Add social share plugin ([388c596](http://git.triple-it.nl/javascript/player-framework/commits/388c596))



<a name="1.6.1"></a>
## [1.6.1](http://git.triple-it.nl/javascript/player-framework/compare/v1.6.0...v1.6.1) (2016-02-05)


### Bug Fixes

* **baseMedia:** No longer consider everything as live ([f66ebc4](http://git.triple-it.nl/javascript/player-framework/commits/f66ebc4))



<a name="1.6.0"></a>
# [1.6.0](http://git.triple-it.nl/javascript/player-framework/compare/v1.5.0...v1.6.0) (2016-02-04)


### Bug Fixes

* **hls:** Switching on iOS now works slightly better ([0879aba](http://git.triple-it.nl/javascript/player-framework/commits/0879aba))
* **smil:** Parse audio only streams correctly ([d916df1](http://git.triple-it.nl/javascript/player-framework/commits/d916df1))
* **ui:** Fix quality option font on safari ([54ab469](http://git.triple-it.nl/javascript/player-framework/commits/54ab469))
* **ui:** Quality button menu is no longer compressed ([728f71d](http://git.triple-it.nl/javascript/player-framework/commits/728f71d))
* **vast:** Fix VAST to VMAP conversion on multiple browsers. ([d059eed](http://git.triple-it.nl/javascript/player-framework/commits/d059eed))
* **vast:** Make autoplay and vast work together ([6f04ffb](http://git.triple-it.nl/javascript/player-framework/commits/6f04ffb))
* **vast:** Pausing ads on iOS no longer breaks player ([769a6c5](http://git.triple-it.nl/javascript/player-framework/commits/769a6c5))
* **vast:** Stop autoplaying ads. ([374fad7](http://git.triple-it.nl/javascript/player-framework/commits/374fad7))

### Features

* **plugin-loader:** Now loads plugins in their own instance. ([e45327c](http://git.triple-it.nl/javascript/player-framework/commits/e45327c))
* **seekBar:** Show buffered timerange ([3115b97](http://git.triple-it.nl/javascript/player-framework/commits/3115b97))
* **vast:** Ads are now supported in IE and Edge ([d0f0d65](http://git.triple-it.nl/javascript/player-framework/commits/d0f0d65))
* **volume:** Remember volume in cookie when changing volume. ([f07d1dc](http://git.triple-it.nl/javascript/player-framework/commits/f07d1dc))



<a name="1.5.0"></a>
# [1.5.0](http://git.triple-it.nl/javascript/player-framework/compare/v1.4.0...v1.5.0) (2016-01-25)


### Bug Fixes

* **chanSel:** Change colours + refactored scss ([8ab5250](http://git.triple-it.nl/javascript/player-framework/commits/8ab5250))
* **config:** All plugin now have a name ([e628e74](http://git.triple-it.nl/javascript/player-framework/commits/e628e74))
* **hls:** No longer error on different metadata ([166e2b1](http://git.triple-it.nl/javascript/player-framework/commits/166e2b1))
* **hls:** Recover from error on Firefox ([26cf73b](http://git.triple-it.nl/javascript/player-framework/commits/26cf73b))
* **mediaContr:** currentlyPlaying supported ([0cc4342](http://git.triple-it.nl/javascript/player-framework/commits/0cc4342))
* **parallel:** Prevent duplicate plugins ([a5be2fd](http://git.triple-it.nl/javascript/player-framework/commits/a5be2fd))
* **smil:** Make smil work with the new playlist ([3075e19](http://git.triple-it.nl/javascript/player-framework/commits/3075e19))
* **ui:** Clear previous bitrates ([8b91718](http://git.triple-it.nl/javascript/player-framework/commits/8b91718))
* **ui:** Properly update seekbar upon playlist events ([67505bb](http://git.triple-it.nl/javascript/player-framework/commits/67505bb))
* **vast:** Do not duplicate ads on playlist events ([8c2def2](http://git.triple-it.nl/javascript/player-framework/commits/8c2def2))
* **vinson:** getPlayerByType now returns the correct player ([91bf985](http://git.triple-it.nl/javascript/player-framework/commits/91bf985))

### Features

* **ad:** Replace ad controls ([21adbe7](http://git.triple-it.nl/javascript/player-framework/commits/21adbe7))
* **analytics:** Hearthbeat of 0 disables it ([21ed6dd](http://git.triple-it.nl/javascript/player-framework/commits/21ed6dd))
* **chromecast:** Add chromecast support ([817f583](http://git.triple-it.nl/javascript/player-framework/commits/817f583))
* **hls:** Implement stream switching ([5e2dbf7](http://git.triple-it.nl/javascript/player-framework/commits/5e2dbf7))
* **npo:** Add ticker feed ([e62f850](http://git.triple-it.nl/javascript/player-framework/commits/e62f850))
* **ui:** Add spinner for basic media ([89bd317](http://git.triple-it.nl/javascript/player-framework/commits/89bd317))



<a name="1.4.0"></a>
# [1.4.0](http://git.triple-it.nl/javascript/player-framework/compare/v1.3.0...v1.4.0) (2016-01-18)


### Bug Fixes

* **ios:** HLS works once again ([8f0add6](http://git.triple-it.nl/javascript/player-framework/commits/8f0add6))

### Features

* **middleware:** Add middleware ([468663c](http://git.triple-it.nl/javascript/player-framework/commits/468663c))



<a name="1.3.0"></a>
# [1.3.0](http://git.triple-it.nl/javascript/player-framework/compare/v1.2.0...v1.3.0) (2016-01-18)


### Features

* **chanSel:** Hacky npo channel switching ([aa16c69](http://git.triple-it.nl/javascript/player-framework/commits/aa16c69))



<a name="1.2.0"></a>
# [1.2.0](http://git.triple-it.nl/javascript/player-framework/compare/v1.0.0...v1.2.0) (2016-01-11)


### Bug Fixes

* **baseMedia:** Display title again ([f5a1fc7](http://git.triple-it.nl/javascript/player-framework/commits/f5a1fc7))
* **hls:** Rename m3u8 to hls ([d0c9f95](http://git.triple-it.nl/javascript/player-framework/commits/d0c9f95))
* **utils:** Convert seconds correctly ([f575777](http://git.triple-it.nl/javascript/player-framework/commits/f575777))

### Features

* **analytics:** Add Heartbeat.js ([5023c2e](http://git.triple-it.nl/javascript/player-framework/commits/5023c2e))
* **hls:** Add quality switching through UI ([51ecb5e](http://git.triple-it.nl/javascript/player-framework/commits/51ecb5e))
* **hls:** Disable seekbar for live ([8497411](http://git.triple-it.nl/javascript/player-framework/commits/8497411))
* **hls:** Display correct metadata ([d1cdfb5](http://git.triple-it.nl/javascript/player-framework/commits/d1cdfb5))
* **hls:** Switch down when not displayed ([1cc9e4f](http://git.triple-it.nl/javascript/player-framework/commits/1cc9e4f))



<a name="1.0.0"></a>
# [1.0.0](http://git.triple-it.nl/javascript/player-framework/compare/v0.0.4...v1.0.0) (2016-01-06)


### Features

* **m3u8:** Added Metadata parsing ([114793b](http://git.triple-it.nl/javascript/player-framework/commits/114793b))
* **parallel:** Play preroll and postroll ads correctly ([8190d25](http://git.triple-it.nl/javascript/player-framework/commits/8190d25))
* **parallel:** Use default bitrate ([bd3c5a6](http://git.triple-it.nl/javascript/player-framework/commits/bd3c5a6))
* **ui:** Add working play button ([2463d58](http://git.triple-it.nl/javascript/player-framework/commits/2463d58))
* **vast:** Play ads on iOS and Android ([a8007b7](http://git.triple-it.nl/javascript/player-framework/commits/a8007b7))
* **vinson:** Add currentlyPlaying to access metadata of current item ([9593109](http://git.triple-it.nl/javascript/player-framework/commits/9593109))
* **vinson:** Add toggleFullscreen ([b260a1d](http://git.triple-it.nl/javascript/player-framework/commits/b260a1d))
* **vinson:** First major version ([2e2f47b](http://git.triple-it.nl/javascript/player-framework/commits/2e2f47b))
* **youbora:** Add basic support for Youbora analytics ([5429699](http://git.triple-it.nl/javascript/player-framework/commits/5429699))



<a name="0.0.4"></a>
## [0.0.4](http://git.triple-it.nl/javascript/player-framework/compare/v0.0.3...v0.0.4) (2015-12-04)


### Features

* **plugin/player:** add basic HLS plugin ([3772bd4](http://git.triple-it.nl/javascript/player-framework/commits/3772bd4))



<a name="0.0.3"></a>
## [0.0.3](http://git.triple-it.nl/javascript/player-framework/compare/v0.0.2...v0.0.3) (2015-12-04)


### Features

* **plugin/ui:** add simple play and pause button plugins ([eba2d34](http://git.triple-it.nl/javascript/player-framework/commits/eba2d34))



<a name="0.0.2"></a>
## [0.0.2](http://git.triple-it.nl/javascript/player-framework/compare/v0.0.1...v0.0.2) (2015-12-03)




<a name="0.0.1"></a>
## 0.0.1 (2015-12-03)
