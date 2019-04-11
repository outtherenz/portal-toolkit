import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    alert() {
      alert('An action ran!'); // eslint-disable-line
    }
  }
});
