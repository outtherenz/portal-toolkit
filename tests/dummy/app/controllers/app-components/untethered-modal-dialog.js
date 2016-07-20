import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  testing: false,
  works: false,
  actions: {
    toggleIsConfirmingTest() {
      if (this.get('testing')) {
        this.set('testing', false);
      } else {
        this.set('testing', true);
        this.set('works', false);
      }
    },
    test() {
      this.set('works', true);
      this.set('testing', false);
    }
  }
});
