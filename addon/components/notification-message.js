import Ember from 'ember';
import layout from '../templates/components/notification-message';

const { Component, computed, inject, String as EString, Handlebars } = Ember;

export default Component.extend({
  layout,
  classNames: [ 'notification' ],
  classNameBindings: [
    'notification.type',
    'notification.dismiss::in'
  ],
  notifications: inject.service(),

  icon: computed('notification.type', function() {
    switch (this.get('notification.type')) {
      case 'warning':
        return 'fa-warning';
      case 'success':
        return 'fa-check';
      case 'error':
        return 'fa-exclamation-circle';
      default:
        return 'fa-info-circle';
    }
  }),

  // Apply the clear animation duration rule inline
  notificationClearDuration: computed('notification.clearDuration', function() {
    var duration = Handlebars.Utils.escapeExpression(this.get('notification.clearDuration'));
    return EString.htmlSafe(`animation-duration: ${duration}ms; -webkit-animation-duration: ${duration}ms`);
  }),

  actions: {
    clear() {
      this.get('notifications').clear(this.get('notification'));
    }
  }
});
