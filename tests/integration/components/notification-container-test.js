import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('notification-container', 'Integration | Component | notification container', {
  integration: true
});

test('it has correct class', function(assert) {
  assert.expect(1);

  this.render(hbs`{{notification-container}}`);

  assert.equal(this.$('.notifications').length, 1);
});

test('it lists the notifications', function(assert) {
  assert.expect(1);

  const notifications = [
    {autoClear: false, clearDuration: 100, message: 'content', type: 'warning'},
    {autoClear: false, clearDuration: 100, message: 'content', type: 'warning'},
    {autoClear: false, clearDuration: 100, message: 'content', type: 'warning'},
    {autoClear: false, clearDuration: 100, message: 'content', type: 'warning'}
  ];

  this.set('notifications', { list: notifications });

  this.render(hbs`{{notification-container notifications=notifications}}`);

  assert.equal(this.$('.notification').length, 4, 'lists all four notifications');
});
