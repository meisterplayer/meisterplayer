# Meister Web Player #

JavaScript based web player.

## Style Configuration ##

Below we will include a list of CSS elements that can be used to style the default player UI to your liking. Please note that these changes generally only affect the appearance of the elements, not their placement within the player.

#### Player Size ####

To fix the dimensions of the player (not the video element), set the width and height property on the div you insert the player into. i.e. The div which you pass to the constructor.

#### Preview Styles ####

**.pf-over-preview-info**  
Change the appearance of text in the preview overlay.

* color: *white;*
* font-size: *15px;*
* font-family: *'Arial';*

**.pf-over-preview-play-button**  
Change the appearance of the play button in the preview overlay. (To change the colour of the icon please use the .pf-ui-element-active class, see below.)

* border-radius: *50%;*
* background-color: *rgba(0, 0, 0, 0.5);*

#### Control Bar Styles ####

**.pf-control-bar.top**  
Change the appearance of the top control bar.

* background: *linear-gradient(to bottom, black, transparent);*

**.pf-control-bar.bottom**  
Change the appearance of the top control bar.

* background: *linear-gradient(to top, black, transparent);*

#### UI Element Styles ####

**.pf-ui-element**  
Change the appearance of static ui elements (the title and time display).

* color: *white;*

**.pf-ui-element-active**  
Change the appearance of ui elements that can be interacted with.

* color: *rgb(240, 240, 240);*

**.pf-ui-element-active:hover**  
Change the appearance of ui elements that can be interacted with when hovered over.

* color: *white;*

**.pf-ui-element-inactive**  
Change the appearance of ui elements that can usually be interacted with but not at this moment (previous item button while at the start of a playlist).

* color: *grey;*

#### Title Styles ####

**.pf-title**  
Change the appearance of the title.

* font-size: *15px;*

#### Volume Slider Styles ####

**.pf-volume-slider-fill**  
Change the appearance of the volume slider fill.

* background-color: *white;*

**.pf-volume-slider-figure**  
Change the appearance of the volume slider figure.

* width: *3px;*
* height: *10px;*
* top: *-3px;* (Use this to align the figure when changing the size)
* background-color: *white;*

#### Quality Selector Styles ####

**.pf-quality-selector**  
Change the appearance of quality selection options.

* background-color: *rgba(37, 37, 37, 0.7);*

**.pf-quality-option:hover**  
Change the appearance of the quality option the user hovers over.

* background-color: *#252525;*

#### Seek Bar Styles ####

**.pf-seek-bar.duration**  
Change the appearance of the duration bar.

* background-color: *rgba(128, 128, 128, 0.6);*

**.pf-seek-bar.buffered**  
Change the appearance of the buffered ahead bar. This is the bar that shows how much of the media has been buffered.

* background-color: *rgba(255, 255, 255, 0.2);*

**.pf-seek-bar.highlight**  
Change the appearance of the highlight bar. This is the bar that overlays the other bars on hover.

* background-color: *rgba(255, 255, 255, 0.6);*

**.pf-seek-bar.fill**  
Change the appearance of the progress bar. This bar colours the content that precedes the current time of the media.

* background-color: *rgba(255, 255, 255, 0.8);*

**.pf-seek-bar-figure**  
Change the appearance of the progress figure. This shows the current position in the media.

* width: *10px;*
* height: *10px;*
* margin-top: *-3px;* (Use this to align the figure when changing the size)
* border-radius: *50%;*
* background-color: *white;*

#### Seek Bar Preview Styles ####

**.pf-seek-bar-preview**  
Customize the appearance of the border around the preview image (should it be present).

* background-color: *black;*

**.pf-seek-bar-preview-time**  
Customize the appearance of the time preview.

* background-color: *rgba(0, 0, 0, 0.7);*

#### Loading Spinner Styles ####

**.pf-spinner-loading**  
Customize the appearance of the loading spinner. Consists out of 4 similar parts.

* border-bottom: *6px solid (255, 255, 255, 0.2);*
* border-left: *6px solid (255, 255, 255, 0.2);*
* border-right: *6px solid (255, 255, 255, 0.2);*
* border-bottom: *6px solid (255, 255, 255, 0.9);*

#### Ad Styles ####

**.pf-ad-controls**  
Customize the appearance of the ad duration bar.  

* background-color: *rgba(128, 128, 128, 0.3);*

**.progress-bar-fill**  
Customize the appearance of the ad progress bar.

* background-color: *white;*

**.pf-ad-info-view**  
Customize the appearace of the 'ad X of Y' and countdown text.

* color: *white;* (Colour of the text)
* font-size: *10px;*
* font-weight: *200;*

    note: You can use the following elements for seperate styles for the ad count and ad countdown:

    * **.pf-ad-count**
    * **.pf-ad-countdown**

**.pf-ad-point**
Customize the appearance of the adbreak indicators on the seek bar.

* background-color: *orange;*
