/* eslint-env node */

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  const app = new EmberAddon(defaults, {
    hinting: false,

    'ember-font-awesome': {
      includeFontFiles: false,
      useScss: true
    },

    'ember-composable-helpers': {
      only: [
        'inc',
        'toggle',
        'pipe'
      ]
    },

    eslint: {
      // Prevents linting tests from being automatically generated
      testGenerator: () => null
    }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  // Papaparse
  app.import('bower_components/papaparse/papaparse.js');

  // Another sortable plugin
  app.import('vendor/sortable/jquery.fn.nativeSortable.js');
  return app.toTree();
};
