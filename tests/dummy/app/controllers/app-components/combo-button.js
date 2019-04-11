import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    primaryAction() {
      alert('Primary action ran!'); // eslint-disable-line
    },
    secondaryAction() {
      alert('Secondary action ran!'); // eslint-disable-line
    }
  }
});
