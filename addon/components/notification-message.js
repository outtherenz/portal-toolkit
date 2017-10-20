import Ember from 'ember';
import layout from '../templates/components/notification-message';

const {
  Component,
  computed,
  inject: { service },
  Handlebars,
  String: EString,
  get
} = Ember;

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
    var duration = Handlebars.Utils.escapeExpression(get(this, 'notification.clearDuration'));
    return EString.htmlSafe(`animation-duration: ${duration}ms; -webkit-animation-duration: ${duration}ms`);
  }),

  actions: {
    clear() {
      const notifications = get(this, 'notifications');
      const notification = get(this, 'notification');
      notifications.clear(notification);
    }
  }
});
