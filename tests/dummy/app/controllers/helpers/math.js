import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  operand1: 1,
  operand2: 1,
  operatorunselect: 1,
  operator: computed('operatorunselect', function() {
    switch (this.operatorunselect) {
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

  })
});
