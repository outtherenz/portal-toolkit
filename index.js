'use strict';

module.exports = {
  name: require('./package').name,
  options: {
    'ember-fontawesome': {
      useScss: true,
      icons: {
        'free-solid-svg-icons': 'all',
        'free-regular-svg-icons': 'all',
        'free-brands-svg-icons': 'all',
      },
    },
  },
  included: function (/* app */) {
    this._super.included.apply(this, arguments);
  },
};
