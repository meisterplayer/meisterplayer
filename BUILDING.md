**[TODO] Setup boilerplate and url to boilerplate on github **

# Building Meister Web Player #

This is a quick guide to setting up the development environment for creating and maintaining plugins.


### How do I get set up? ###

#### Cloning from Github ####

To get started working on existing plugins you need to clone those plugins and the meister-core from github. It's recommended to create a meister directory dedicated to these plugins;
```
mkdir meister && cd meister
```
Clone the core player and core plugins;
```
git clone https://github.com/meisterplayer/meisterplayer.git 
```

Clone any other plugins you might want to use, check out the meisterplayer-repo's on github;
```
git clone https://github.com/meisterplayer/media-hls.git
```

#### Setup a development-target ####
In order to work with the plugins you need to create a project. There's a boilerplate project available on GitHub which contains all gulp-tasks preconfigured for you;

```
git clone https://github.com/meisterplayer/meisterplayer-dev-env.git && cd meisterplayer-dev-env
npm i
```
The environment should now be setup for basic development. Normally you'd install the meister-core and plugins from NPM and configure/build your player, however; we want to develop plugins and maintain the core, this can be done by using `npm link`. NPM link will symlink the github repositories you cloned in the previous step to npm-modules. It easy to setup up, from the `meisterplayer-dev-env` folder enter;
``` 
npm link ../meister/meisterplayer 
``` 
and/or 
``` 
npm link ../meister/media-hls 
``` 



`npm link` all the plugins you cloned in the previous step. Change the path to reflect your folder-structure, you can use both relative and absolute paths.

*You should now be ready to start working on the meister-core and the plugins*

### Update after switching branches ###

If you checkout a branch of a plugin that has new dependencies you should update the node-modules. This can be done by cd'ing to the plugin-directory (the target of the NPM-link) and enter `npm update` . The package list should be updated to reflect the changes in dependencies.


