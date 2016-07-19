import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  testing: false,
  actions: {
    toggleIsConfirmingTest() {
      if (this.get('testing')) {
        this.set('testing', false);
      } else {
        this.set('testing', true);
      }
    },
    test() {
      alert("it works!!");
    }
  }
});
