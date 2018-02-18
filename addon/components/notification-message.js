import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import layout from '../templates/components/notification-message';

export default Component.extend({
  layout,

  notifications: service(),

  classNames: [ 'notification-message' ],
  classNameBindings: [
    'typeClassVariant',
    'notification.dismiss::notification-message--incoming'
  ],

  typeClassVariant: computed('notification.type', function() {
    const type = get(this, 'notification.type');
    return `notification-message--${type}`;
  }),

  icon: computed('notification.type', function() {
    const type = get(this, 'notification.type');

    switch (type) {
      case 'warning': return 'warning';
      case 'success': return 'check';
      case 'error':   return 'exclamation-circle';
      default:        return 'info-circle';
    }
  }),

  // Apply the clear animation duration rule inline
  notificationClearDuration: computed('notification.clearDuration', function() {
    const duration = Number(get(this, 'notification.clearDuration'));
    return htmlSafe(`animation-duration: ${duration}ms; -webkit-animation-duration: ${duration}ms`);
  }),

  actions: {
    clear() {
      const notifications = get(this, 'notifications');
      const notification = get(this, 'notification');
      notifications.clear(notification);
    }
  }
});
