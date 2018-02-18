import Component from '@ember/component';
import layout from '../templates/components/date-input';

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
