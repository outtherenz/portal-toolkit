import Ember from 'ember';
import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

const { get } = Ember;

describeModule('service:cache', 'CacheService', {}, function() {
  it('exists', function() {
    expect(this.subject()).to.be.ok;
  });

  it('throws when not provided with a cache or key name to store under', function() {
    expect(() => this.subject().store()).to.throw();
    expect(() => this.subject().store('test')).to.throw();
  });

  it('can store data', function() {
    this.subject().store('test', 'key', 'x');
    expect(get(this.subject(), '_cache.test.0.value')).equals('x');
  });

  it('can store data with an object as a key', function() {
    this.subject().store('test', { a: 1 }, 'y');
    expect(get(this.subject(), '_cache.test.1.key.a')).equals(1);
    expect(get(this.subject(), '_cache.test.1.value')).equals('y');
  });

  it('can store data with a falsey value as a key', function() {
    this.subject().store('test', 0, 'z');
    expect(get(this.subject(), '_cache.test.2.key')).equals(0);
    expect(get(this.subject(), '_cache.test.2.value')).equals('z');
  });

  it('throws when not provided with a cache or key name to lookup', function() {
    expect(() => this.subject().lookup()).to.throw();
    expect(() => this.subject().lookup('test')).to.throw();
  });

  it('can lookup data', function() {
    const value = this.subject().lookup('test', 'key');
    expect(value).equals('x');
  });

  it('can lookup data with an object as a key', function() {
    const value = this.subject().lookup('test', { a: 1 });
    expect(value).equals('y');
  });

  it('can lookup data with an falsey value as a key', function() {
    const value = this.subject().lookup('test', 0);
    expect(value).equals('z');
  });

  it('throws when not provided with a cache to clear', function() {
    expect(() => this.subject().clear()).to.throw();
  });

  it('can clear one item from the cache', function() {
    const initial = get(this.subject(), '_cache.test.length');
    const success = this.subject().clear('test', 'key');
    expect(success).to.be.ok;
    expect(get(this.subject(), '_cache.test')).to.have.lengthOf(initial - 1);
  });

  it('can clear the cache', function() {
    const success = this.subject().clear('test');
    expect(success).to.be.ok;
    expect(get(this.subject(), '_cache.test')).to.have.lengthOf(0);
  });
});
