import Ember from 'ember';
import layout from '../templates/components/loading-icon';

const { Component } = Ember;

const LoadingIconComponent = Component.extend({
  layout,

  classNames: [ 'loading-icon' ],
  classNameBindings: [ 'type' ]
});

LoadingIconComponent.reopenClass({
  positionalParams: [ 'type' ]
});

export default LoadingIconComponent;
