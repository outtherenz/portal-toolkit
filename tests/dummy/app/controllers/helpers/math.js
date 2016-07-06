import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  operand1: 1,
  operand2: 1,
  operatorunselect: 1,
  operator: Ember.computed('operatorunselect', function() {
    switch (this.get('operatorunselect')) {
      case '1':
        return '+';
      case '2':
        return '-';
      case '3':
        return '*';
      case '4':
        return '/';
      default:
        return '+';
    }

  }),
});
