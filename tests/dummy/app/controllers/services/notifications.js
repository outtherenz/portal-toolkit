import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

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
