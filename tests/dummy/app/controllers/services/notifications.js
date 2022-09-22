import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Controller.extend({
  notifications: service(),
  actions: {
    notifyAll() {
      this.notifications.error('Error');
      this.notifications.success('success');
      this.notifications.info('info');
      this.notifications.warning('warning');
    },
    notifyError() {
      this.notifications.error('Error');
    },
    notifysuccess() {
      this.notifications.success('Success');
    },
    notifyInfo() {
      this.notifications.info('Info');
    },
    notifyWarning() {
      this.notifications.warning('Warning');
    },
    clearAll() {
      this.notifications.clearAll();
    }
  }
});
