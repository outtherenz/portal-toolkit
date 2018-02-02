import Service from '@ember/service';
import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const NOTIFICATION_SELECTOR = '.notification-message';
const CONTENT_SELECTOR = '.notification-message__content';
const ICON_SELECTOR = '.notification-message__icon .fa';
const COUNTDOWN_SELECTOR = '.notification-message__countdown';

const INFO_CLASS = 'notification-message--info';
const ERROR_CLASS = 'notification-message--error';
const WARNING_CLASS = 'notification-message--warning';
const SUCCESS_CLASS = 'notification-message--success';

moduleForComponent('notification-message', 'Integration | Component | notification message', {
  integration: true,

  beforeEach() {
    this.set('notification', {
      autoClear: true,
      clearDuration: 100,
      message: 'content'
    });
  }
});

test('it renders error notification in inline form', function(assert) {
  assert.expect(10);

  this.render(hbs`{{notification-message notification=notification}}`);

  assert.ok(this.$(CONTENT_SELECTOR).text().match(/content/), 'message is correct');
  assert.ok(this.$(ICON_SELECTOR).attr('class').match(/fa-info-circle/), 'default icon is correct');

  this.set('notification.type', 'info');
  assert.ok(this.$(NOTIFICATION_SELECTOR).hasClass(INFO_CLASS), 'has info class');
  assert.ok(this.$(ICON_SELECTOR).hasClass('fa-info-circle'), 'info icon is correct');

  this.set('notification.type', 'error');
  assert.ok(this.$(NOTIFICATION_SELECTOR).hasClass(ERROR_CLASS), 'has error class');
  assert.ok(this.$(ICON_SELECTOR).hasClass('fa-exclamation-circle'), 'error icon is correct');

  this.set('notification.type', 'warning');
  assert.ok(this.$(NOTIFICATION_SELECTOR).hasClass(WARNING_CLASS), 'has warning class');
  assert.ok(this.$(ICON_SELECTOR).hasClass('fa-warning'), 'warning icon is correct');

  this.set('notification.type', 'success');
  assert.ok(this.$(NOTIFICATION_SELECTOR).hasClass(SUCCESS_CLASS), 'has success class');
  assert.ok(this.$(ICON_SELECTOR).hasClass('fa-check'), 'success icon is correct');
});

test('it shows a progress bar if autoClear is true', function(assert) {
  assert.expect(3);

  const done = assert.async();

  this.render(hbs`{{notification-message notification=notification}}`);

  assert.equal(this.$(COUNTDOWN_SELECTOR).length, 1, 'progress bar exists');
  assert.equal(this.$(COUNTDOWN_SELECTOR).css('animation-duration'), '0.1s', 'progress bar has correct animation duration');

  const initialWidth = this.$(COUNTDOWN_SELECTOR).width();

  run.later(() => {
    assert.ok(this.$(COUNTDOWN_SELECTOR).width() < initialWidth, 'progress bar shrunk');
    done();
  }, 50);
});

test('it does not show progress bar is autoClear is false', function(assert) {
  assert.expect(1);

  this.set('notification.autoClear', false);

  this.render(hbs`{{notification-message notification=notification}}`);

  assert.equal(this.$(COUNTDOWN_SELECTOR).length, 0);
});

test('it clicking on close runs close action', function(assert) {
  assert.expect(1);

  const done = assert.async();
  const notification = this.get('notification');

  const notificationsServiceStub = Service.extend({
    clear(n) {
      assert.equal(n, notification);
      done();
    }
  });

  this.register('service:notifications', notificationsServiceStub);
  this.render(hbs`{{notification-message notification=notification}}`);

  this.$('a').click();
});
