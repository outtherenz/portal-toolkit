import Ember from 'ember';

const {
  Controller,
  inject: { service },
  get,
  set,
  $
} = Ember;

export default Controller.extend({
  notifications: service(),
  actions: {
    notifyAll() {
      get(this, 'notifications').error('Error');
      get(this, 'notifications').success('success');
      get(this, 'notifications').info('info');
      get(this, 'notifications').warning('warning');
    },
    notifyError() {
      get(this, 'notifications').error('Error');
    },
    notifysuccess() {
      get(this, 'notifications').success('Success');
    },
    notifyInfo() {
      get(this, 'notifications').info('Info');
    },
    notifyWarning() {
      get(this, 'notifications').warning('Warning');
    },
    clearAll() {
      get(this, 'notifications').clearAll();
    }
  }
});
