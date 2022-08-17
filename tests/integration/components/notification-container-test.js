import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | notification container', function(hooks) {
  setupRenderingTest(hooks);

  test('it has correct class', async function(assert) {
    assert.expect(1);

    await render(hbs`{{notification-container}}`);

    assert.dom('.notification-container').exists({ count: 1 });
  });

  test('it lists the notifications', async function(assert) {
    assert.expect(1);

    const notifications = [
      {autoClear: false, clearDuration: 100, message: 'content', type: 'warning'},
      {autoClear: false, clearDuration: 100, message: 'content', type: 'warning'},
      {autoClear: false, clearDuration: 100, message: 'content', type: 'warning'},
      {autoClear: false, clearDuration: 100, message: 'content', type: 'warning'}
    ];

    this.set('notifications', { list: notifications });

    await render(hbs`{{notification-container notifications=notifications}}`);

    assert.dom('.notification-message').exists({ count: 4 }, 'lists all four notifications');
  });
});
