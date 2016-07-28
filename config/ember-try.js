/* eslint-env node */

module.exports = {
  scenarios: [{
    name: 'default',
    bower: {
      dependencies: { }
    }
  }, {
    name: 'ember-release',
    bower: {
      dependencies: { ember: 'components/ember#release' },
      resolutions: { ember: 'release' }
    }
  }]
};
