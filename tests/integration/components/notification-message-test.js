import Service from '@ember/service';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const NOTIFICATION_SELECTOR = '.notification-message';
const CONTENT_SELECTOR = '.notification-message__content';
const ICON_SELECTOR = '.notification-message__icon .fa';
const COUNTDOWN_SELECTOR = '.notification-message__countdown';

const INFO_CLASS = 'notification-message--info';
const ERROR_CLASS = 'notification-message--error';
const WARNING_CLASS = 'notification-message--warning';
const SUCCESS_CLASS = 'notification-message--success';

module('Integration | Component | notification message', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('notification', {
      autoClear: true,
      clearDuration: 100,
      message: 'content'
    });
  });

  test('it renders error notification in inline form', async function(assert) {
    assert.expect(10);

    await render(hbs`{{notification-message notification=notification}}`);

    assert.ok(find(CONTENT_SELECTOR).textContent.match(/content/), 'message is correct');
    assert.ok(find(ICON_SELECTOR).getAttribute('class').match(/fa-info-circle/), 'default icon is correct');

    this.set('notification.type', 'info');
    assert.dom(NOTIFICATION_SELECTOR).hasClass(INFO_CLASS, 'has info class');
    assert.dom(ICON_SELECTOR).hasClass('fa-info-circle', 'info icon is correct');

    this.set('notification.type', 'error');
    assert.dom(NOTIFICATION_SELECTOR).hasClass(ERROR_CLASS, 'has error class');
    assert.dom(ICON_SELECTOR).hasClass('fa-exclamation-circle', 'error icon is correct');

    this.set('notification.type', 'warning');
    assert.dom(NOTIFICATION_SELECTOR).hasClass(WARNING_CLASS, 'has warning class');
    assert.dom(ICON_SELECTOR).hasClass('fa-warning', 'warning icon is correct');

    this.set('notification.type', 'success');
    assert.dom(NOTIFICATION_SELECTOR).hasClass(SUCCESS_CLASS, 'has success class');
    assert.dom(ICON_SELECTOR).hasClass('fa-check', 'success icon is correct');
  });

  test('it shows a progress bar if autoClear is true', async function(assert) {
    assert.expect(3);

    const done = assert.async();

    await render(hbs`{{notification-message notification=notification}}`);

    assert.dom(COUNTDOWN_SELECTOR).exists({ count: 1 }, 'progress bar exists');
    assert.equal(this.$(COUNTDOWN_SELECTOR).css('animation-duration'), '0.1s', 'progress bar has correct animation duration');

    const initialWidth = this.$(COUNTDOWN_SELECTOR).width();

    run.later(() => {
      assert.ok(this.$(COUNTDOWN_SELECTOR).width() < initialWidth, 'progress bar shrunk');
      done();
    }, 50);
  });

  test('it does not show progress bar is autoClear is false', async function(assert) {
    assert.expect(1);

    this.set('notification.autoClear', false);

    await render(hbs`{{notification-message notification=notification}}`);

    assert.dom(COUNTDOWN_SELECTOR).doesNotExist();
  });

  test('it clicking on close runs close action', async function(assert) {
    assert.expect(1);

    const done = assert.async();
    const notification = this.notification;

    const notificationsServiceStub = Service.extend({
      clear(n) {
        assert.equal(n, notification);
        done();
      }
    });

    this.owner.register('service:notifications', notificationsServiceStub);
    await render(hbs`{{notification-message notification=notification}}`);

    await click('a');
  });
});
