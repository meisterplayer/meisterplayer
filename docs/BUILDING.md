# Making a release-bundle for Meister Web Player #

*Step-by-step howto for creating a release and bundle production-code*


## GIT ##
Before building the player be sure to check if all plugins are on the right branch and freshly pulled. If you don't you might be building on old commits.

All plugins are supposed to be on the MASTER branch, if you recently updated something in a plugin on develop you should merge it to master.

Now merge the develop-branch into master, which can be tagged later. *[needs review; should be rebased instead of merge]*


## Targets ##
To include the desired plugins in your build you need to make a target. Targets are stored in /targets.


## Bump version ##
You should create a new release-version and generate a changelog before bundling ;

`gulp bump`

## Bundling ##

If all's fine and dandy, you bumped the version, checked plugins, wrote documentation on all new fancy features, fixes and API changes and double-checked the changelog you are ready to create a bundle;

Creating a bundle is simple, on your terminal type

`gulp build --production=true --target=[targetname]`

The resulting bundle can be found in the build-folder.
For now you should copy docs/CHANGELOG.md and /README.md to build/dist-folder and zip it. In the near future the bundle task will also copy the docs and zip the file for you.

## Create Tag ##
After bundling you should create 2 tags on the master branch;
- one tag for the new version ( format v.x.x.x)
- one tag for the target (format; v.x.x.x-[targetname]). This makes tracking releases for clients easier.
