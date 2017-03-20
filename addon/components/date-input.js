import Ember from 'ember';
import layout from '../templates/components/date-input';

const {
  Component
} = Ember;

export default Component.extend({
  layout,

  placeholder: 'Please select a Date',

  classNames: [ 'date-input' ],

  isActive: false,
  format: 'dddd, D MMMM YYYY',

  actions: {
    selectAndDeactivate(date) {
      this.toggleProperty('isActive');
      this.sendAction('select', date);
    }
  }
});
