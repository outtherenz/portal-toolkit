import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    alertAction() {
      alert('Success!'); // eslint-disable-line no-alert
    }
  }
});
