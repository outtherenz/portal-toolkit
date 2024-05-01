import { get } from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | cache', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    assert.ok(this.owner.lookup('service:cache'));
  });

  test('it throws when not provided with a cache or key name to store under', function(assert) {
    assert.throws(() => this.owner.lookup('service:cache').store());
    assert.throws(() => this.owner.lookup('service:cache').store('test'));
  });

  test('it can store data', function(assert) {
    this.owner.lookup('service:cache').store('test', 'key', 'x');
    assert.equal(get(this.owner.lookup('service:cache'), '_cache.test.0.value'), 'x');
  });

  test('it can store data with an object as a key', function(assert) {
    this.owner.lookup('service:cache').store('test', { a: 1 }, 'y');
    assert.equal(get(this.owner.lookup('service:cache'), '_cache.test.1.key.a'), 1);
    assert.equal(get(this.owner.lookup('service:cache'), '_cache.test.1.value'), 'y');
  });

  test('it can store data with a falsey value as a key', function(assert) {
    this.owner.lookup('service:cache').store('test', 0, 'z');
    assert.equal(get(this.owner.lookup('service:cache'), '_cache.test.2.key'), 0);
    assert.equal(get(this.owner.lookup('service:cache'), '_cache.test.2.value'), 'z');
  });

  test('it throws when not provided with a cache or key name to lookup', function(assert) {
    assert.throws(() => this.owner.lookup('service:cache').lookup());
    assert.throws(() => this.owner.lookup('service:cache').lookup('test'));
  });

  test('it can lookup data', function(assert) {
    const value = this.owner.lookup('service:cache').lookup('test', 'key');
    assert.equal(value, 'x');
  });

  test('it can lookup data with an object as a key', function(assert) {
    const value = this.owner.lookup('service:cache').lookup('test', { a: 1 });
    assert.equal(value, 'y');
  });

  test('it can lookup data with an falsey value as a key', function(assert) {
    const value = this.owner.lookup('service:cache').lookup('test', 0);
    assert.equal(value, 'z');
  });

  test('it throws when not provided with a cache to clear', function(assert) {
    assert.throws(() => this.owner.lookup('service:cache').clear());
  });

  test('it can clear one item from the cache', function(assert) {
    this.owner.lookup('service:cache').store('test', 'key', 'x');

    const initial = get(this.owner.lookup('service:cache'), '_cache.test.length');
    const success = this.owner.lookup('service:cache').clear('test', 'key');

    assert.ok(success);
    assert.equal(get(this.owner.lookup('service:cache'), '_cache.test').length, initial - 1);
  });

  test('it can clear the cache', function(assert) {
    this.owner.lookup('service:cache').store('test', 'key', 'x');

    const success = this.owner.lookup('service:cache').clear('test');

    assert.ok(success);
    assert.equal(get(this.owner.lookup('service:cache'), '_cache.test').length, 0);
  });
});
