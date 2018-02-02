import { get } from '@ember/object';
import { moduleFor, test } from 'ember-qunit';

moduleFor('service:notifications', 'Unit | Service | notifications', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('it exists', function(assert) {
  const service = this.subject();
  assert.ok(service);
});

test('it can add a notification with show(message)', function(assert) {
  this.subject().show('Message 1');
  const notification = get(this.subject(), 'list.lastObject');
  assert.equal(get(notification, 'type'), 'info');
  assert.equal(get(notification, 'message'), 'Message 1');
  assert.notOk(get(notification, 'autoClear'));
});

test('it can add a notification with show(message, duration)', function(assert) {
  this.subject().show('Message 2', 2000);
  const notification = get(this.subject(), 'list.lastObject');
  assert.equal(get(notification, 'type'), 'info');
  assert.equal(get(notification, 'message'), 'Message 2');
  assert.ok(get(notification, 'autoClear'));
  assert.equal(get(notification, 'clearDuration'), 2000);
});

test('it can add notifications with info(), warning(), success(), and error()', function(assert) {
  let notification;

  [ 'info', 'warning', 'success', 'error' ].forEach(type => {
    this.subject()[type](type);
    notification = get(this.subject(), 'list.lastObject');
    assert.equal(get(notification, 'type'), type);
    assert.equal(get(notification, 'message'), type);

    this.subject()[type](`${type} auto clear`, 1234);
    notification = get(this.subject(), 'list.lastObject');
    assert.equal(get(notification, 'type'), type);
    assert.equal(get(notification, 'message'), `${type} auto clear`);
    assert.ok(get(notification, 'autoClear'));
    assert.equal(get(notification, 'clearDuration'), 1234);
  });
});

test('it can clear a single notification', function(assert) {
  const list = get(this.subject(), 'list');
  const toRemove = list.findBy('autoClear', false);
  this.subject().clear(toRemove);
  assert.ok(get(toRemove, 'dismiss'));
});

test('it throws if no notification is provided for clearance', function(assert) {
  assert.throws(() => this.subject().clear());
});

test('it can clear all notifications', function(assert) {
  this.subject().clearAll();
  const notifications = get(this.subject(), 'list');
  assert.equal(notifications.length, get(notifications.filterBy('dismiss'), 'length'));
});
