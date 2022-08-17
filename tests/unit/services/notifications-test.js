import { get } from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | notifications', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const service = this.owner.lookup('service:notifications');
    assert.ok(service);
  });

  test('it can add a notification with show(message)', function(assert) {
    this.owner.lookup('service:notifications').show('Message 1');
    const notification = get(this.owner.lookup('service:notifications'), 'list.lastObject');
    assert.equal(get(notification, 'type'), 'info');
    assert.equal(get(notification, 'message'), 'Message 1');
    assert.notOk(get(notification, 'autoClear'));
  });

  test('it can add a notification with show(message, duration)', function(assert) {
    this.owner.lookup('service:notifications').show('Message 2', 2000);
    const notification = get(this.owner.lookup('service:notifications'), 'list.lastObject');
    assert.equal(get(notification, 'type'), 'info');
    assert.equal(get(notification, 'message'), 'Message 2');
    assert.ok(get(notification, 'autoClear'));
    assert.equal(get(notification, 'clearDuration'), 2000);
  });

  test('it can add notifications with info(), warning(), success(), and error()', function(assert) {
    let notification;

    [ 'info', 'warning', 'success', 'error' ].forEach(type => {
      this.owner.lookup('service:notifications')[type](type);
      notification = get(this.owner.lookup('service:notifications'), 'list.lastObject');
      assert.equal(get(notification, 'type'), type);
      assert.equal(get(notification, 'message'), type);

      this.owner.lookup('service:notifications')[type](`${type} auto clear`, 1234);
      notification = get(this.owner.lookup('service:notifications'), 'list.lastObject');
      assert.equal(get(notification, 'type'), type);
      assert.equal(get(notification, 'message'), `${type} auto clear`);
      assert.ok(get(notification, 'autoClear'));
      assert.equal(get(notification, 'clearDuration'), 1234);
    });
  });

  test('it can clear a single notification', function(assert) {
    const list = get(this.owner.lookup('service:notifications'), 'list');
    const toRemove = list.findBy('autoClear', false);
    this.owner.lookup('service:notifications').clear(toRemove);
    assert.ok(get(toRemove, 'dismiss'));
  });

  test('it throws if no notification is provided for clearance', function(assert) {
    assert.throws(() => this.owner.lookup('service:notifications').clear());
  });

  test('it can clear all notifications', function(assert) {
    this.owner.lookup('service:notifications').clearAll();
    const notifications = get(this.owner.lookup('service:notifications'), 'list');
    assert.equal(notifications.length, get(notifications.filterBy('dismiss'), 'length'));
  });
});
