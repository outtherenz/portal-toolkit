import Component from '@ember/component';
import { get, computed } from '@ember/object';
import layout from '../templates/components/loading-icon';

const LoadingIconComponent = Component.extend({
  layout,

  classNames: [ 'loading-icon' ],
  classNameBindings: [ 'typeClassName' ],

  typeClassName: computed('type', function() {
    return 'loading-icon--' + this.type;
  })
});

LoadingIconComponent.positionalParams = 'type';

export default LoadingIconComponent;
