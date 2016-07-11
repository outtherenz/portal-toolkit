import Ember from 'ember';
import layout from '../templates/components/page-description';

export default Ember.Component.extend({
  layout,
  description: false,
  title: '',

  actions: {
    toggleDescription() {
      this.toggleProperty('description');
    }
  }
});
