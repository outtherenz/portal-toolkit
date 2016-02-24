import Ember from 'ember';

const { Component, computed } = Ember;

export default Ember.Component.extend({
  classNameBindings: [
    'isRipple:loading-ripple',
    'isSpinner:loading-spinner'
  ],

  positionalParams: [ 'type' ],

  isRipple: computed.equal('type', 'ripple'),
  isSpinner: computed.equal('type', 'spinner')
});
