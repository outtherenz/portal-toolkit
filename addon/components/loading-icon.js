import Ember from 'ember';
import layout from '../templates/components/loading-icon';

const {
  Component,
  computed,
  get
} = Ember;

const LoadingIconComponent = Component.extend({
  layout,

  classNames: [ 'loading-icon' ],
  classNameBindings: [ 'typeClassName' ],

  typeClassName: computed('type', function() {
    return 'loading-icon--' + get(this, 'type');
  })
});

LoadingIconComponent.reopenClass({
  positionalParams: [ 'type' ]
});

export default LoadingIconComponent;
