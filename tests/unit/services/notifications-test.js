import Ember from 'ember';
import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

const { get } = Ember;

describeModule('service:notifications', 'NotificationsService', {}, function() {
  it('exists', function() {
    const service = this.subject();
    expect(service).to.be.ok;
  });

  it('can add a notification with show(message)', function() {
    this.subject().show('Message 1');
    const notification = get(this.subject(), 'list.lastObject');
    expect(get(notification, 'type')).equals('info');
    expect(get(notification, 'message')).equals('Message 1');
    expect(get(notification, 'autoClear')).to.be.false;
  });

  it('can add a notification with show(message, duration)', function() {
    this.subject().show('Message 2', 2000);
    const notification = get(this.subject(), 'list.lastObject');
    expect(get(notification, 'type')).equals('info');
    expect(get(notification, 'message')).equals('Message 2');
    expect(get(notification, 'autoClear')).to.be.true;
    expect(get(notification, 'clearDuration')).equals(2000);
  });

  it('can add notifications with info(), warning(), success(), and error()', function() {
    let notification;

    [ 'info', 'warning', 'success', 'error' ].forEach(type => {
      this.subject()[type](type);
      notification = get(this.subject(), 'list.lastObject');
      expect(get(notification, 'type')).equals(type);
      expect(get(notification, 'message')).equals(type);

      this.subject()[type](`${type} auto clear`, 1234);
      notification = get(this.subject(), 'list.lastObject');
      expect(get(notification, 'type')).equals(type);
      expect(get(notification, 'message')).equals(`${type} auto clear`);
      expect(get(notification, 'autoClear')).to.be.true;
      expect(get(notification, 'clearDuration')).equals(1234);
    });
  });

  it('can clear a single notification', function() {
    const list = get(this.subject(), 'list');
    const toRemove = list.findBy('autoClear', false);
    this.subject().clear(toRemove);
    expect(get(toRemove, 'dismiss')).to.be.true;
  });

  it('throws if no notification is provided for clearance', function() {
    expect(() => this.subject().clear()).to.throw();
  });

  it('can clear all notifications', function() {
    this.subject().clearAll();
    const notifications = get(this.subject(), 'list');
    expect(notifications).to.have.lengthOf(get(notifications.filterBy('dismiss'), 'length'));
  });
});
