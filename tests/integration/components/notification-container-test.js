import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('notification-container', 'Integration: NotificationContainerComponent', { integration: true }, function() {
  it('has correct class', function() {
    this.render(hbs`{{notification-container}}`);
    expect(this.$('.notifications')).to.have.lengthOf(1);
  });

  it('lists the notifications', function() {
    const notifications = [
      { autoClear: false, clearDuration: 100, message: 'content', type: 'warning'},
      { autoClear: false, clearDuration: 100, message: 'content', type: 'warning'},
      { autoClear: false, clearDuration: 100, message: 'content', type: 'warning'},
      { autoClear: false, clearDuration: 100, message: 'content', type: 'warning'}
    ];

    this.set('notifications', { list: notifications });

    this.render(hbs`{{notification-container notifications=notifications}}`);

    expect(this.$('.notification')).to.have.lengthOf(4, 'lists all four notifications');
  });
});
