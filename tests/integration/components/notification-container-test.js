import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('notification-container', 'Integration: NotificationContainerComponent', { integration: true }, function() {
  it('Displays multiple notificaions', function() {
    const errorNotification1 = {autoClear: false, clearDuration: 350000, message: 'test-warning', type: 'warning'};
    const errorNotification2 = {autoClear: false, clearDuration: 350000, message: 'test-error', type: 'error'};
    const errorNotification3 = {autoClear: false, clearDuration: 350000, message: 'test-info', type: 'info'};
    const errorNotification4 = {autoClear: false, clearDuration: 350000, message: 'test-success', type: 'success'};
    const thisNotifications = {};
    thisNotifications.list = [errorNotification1, errorNotification2, errorNotification3, errorNotification4];
    this.set('notifications', thisNotifications);
    this.render(hbs`{{notification-container notifications=notifications}}`);
    expect(this.$('.notification')).to.have.lengthOf(4);
  });
});
