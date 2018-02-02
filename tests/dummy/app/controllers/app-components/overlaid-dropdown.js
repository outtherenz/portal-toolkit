import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    alertAction() {
      alert('Success!'); // eslint-disable-line no-alert
    }
  }
});
