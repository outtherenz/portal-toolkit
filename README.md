# Portal Toolkit

The Portal Toolkit is intended to hold all of the reusable components to be shared between the Portal's modules.

![Portal module structure diagram](http://i.imgur.com/AKDjysP.png)

## Installation and usage

* `git clone` this repository
* `npm install && bower install`
* `npm link` to tell npm you would like to use this locally
* `cd other-project && npm link portal-toolkit` to install the addon elsewhere

## Running standalone

Although this is an addon and therefore intended to be used inside another project, it is possible to serve the addon's dummy app outside of testing. This is useful when adding to or updating this addon.

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running tests

* `ember test`
* `ember test --server`
* `ember server` and visit [http://localhost:4200/tests](http://localhost:4200/tests)

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
