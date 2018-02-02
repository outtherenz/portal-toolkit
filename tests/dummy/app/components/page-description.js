import Component from '@ember/component';
import layout from '../templates/components/page-description';

export default Component.extend({
  layout,
  description: false,
  title: '',

  actions: {
    toggleDescription() {
      this.toggleProperty('description');
    }
  }
});
