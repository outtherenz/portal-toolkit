import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  Service,
  run
} = Ember;

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

  assert.ok(this.$('.content').text().match(/content/), 'message is correct');
  assert.ok(this.$('.icon i').attr('class').match(/fa-info-circle/), 'default icon is correct');

  this.set('notification.type', 'info');
  assert.ok(this.$('.notification').hasClass('info'), 'has info class');
  assert.ok(this.$('.icon i').attr('class').match(/fa-info-circle/), 'info icon is correct');

  this.set('notification.type', 'error');
  assert.ok(this.$('.notification').hasClass('error'), 'has error class');
  assert.ok(this.$('.icon i').attr('class').match(/fa-exclamation-circle/), 'error icon is correct');

  this.set('notification.type', 'warning');
  assert.ok(this.$('.notification').hasClass('warning'), 'has warning class');
  assert.ok(this.$('.icon i').attr('class').match(/fa-warning/), 'warning icon is correct');

  this.set('notification.type', 'success');
  assert.ok(this.$('.notification').hasClass('success'), 'has success class');
  assert.ok(this.$('.icon i').attr('class').match(/fa-check/), 'success icon is correct');
});

test('it shows a progress bar if autoClear is true', function(assert) {
  assert.expect(3);

  const done = assert.async();

  this.render(hbs`{{notification-message notification=notification}}`);

  assert.equal(this.$('.countdown').length, 1, 'progress bar exists');
  assert.equal(this.$('.countdown').css('animation-duration'), '0.1s', 'progress bar has correct animation duration');

  const initialWidth = this.$('.countdown').width();

  run.later(() => {
    assert.ok(this.$('.countdown').width() < initialWidth, 'progress bar shrunk');
    done();
  }, 50);
});

test('it does not show progress bar is autoClear is false', function(assert) {
  assert.expect(1);

  this.set('notification.autoClear', false);

  this.render(hbs`{{notification-message notification=notification}}`);

  assert.equal(this.$('.countdown').length, 0);
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
