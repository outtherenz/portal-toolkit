/* eslint-env node */

module.exports = {
  name: 'portal-toolkit',

  isDevelopingAddon: () => true,

  bowerDirectory: 'bower_components',
  otherAssetPaths: [],

  sassOptions: {
    includePaths: [
      'app/styles/**/*'
    ]
  }
};
