import Ember from 'ember';
import layout from '../templates/components/loading-icon';

const { Component, computed } = Ember;

const LoadingIconComponent = Ember.Component.extend({
  layout,

  classNames: [ 'loading-icon' ],
  classNameBindings: [
    'isRipple:loading-ripple',
    'isSpinner:loading-spinner'
  ],

  isRipple: computed.equal('type', 'ripple'),
  isSpinner: computed.equal('type', 'spinner')
});

LoadingIconComponent.reopenClass({
  positionalParams: [ 'type' ]
});

export default LoadingIconComponent;
