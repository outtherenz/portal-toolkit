import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import { beforeEach } from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  Service,
  assign,
  run
} = Ember;

describeComponent('notification-message', 'Integration: NotificationMessageComponent', { integration: true }, function() {
  beforeEach(function() {
    this.set('notification', {
      autoClear: true,
      clearDuration: 100,
      message: 'content'
    });
  });

  it('renders error notification in inline form', function() {
    this.render(hbs`{{notification-message notification=notification}}`);

    expect(this.$('.content').text()).to.contain('content', 'message is correct');
    expect(this.$('.icon i').attr('class')).to.contain('fa-info-circle', 'default icon is correct');

    this.set('notification.type', 'info');
    expect(this.$('.notification').hasClass('info')).to.equal(true, 'has info class');
    expect(this.$('.icon i').attr('class')).to.contain('fa-info-circle', 'info icon is correct');

    this.set('notification.type', 'error');
    expect(this.$('.notification').hasClass('error')).to.equal(true, 'has error class');
    expect(this.$('.icon i').attr('class')).to.contain('fa-exclamation-circle', 'error icon is correct');

    this.set('notification.type', 'warning');
    expect(this.$('.notification').hasClass('warning')).to.equal(true, 'has warning class');
    expect(this.$('.icon i').attr('class')).to.contain('fa-warning', 'warning icon is correct');

    this.set('notification.type', 'success');
    expect(this.$('.notification').hasClass('success')).to.equal(true, 'has success class');
    expect(this.$('.icon i').attr('class')).to.contain('fa-check', 'success icon is correct');
  });

  it('shows a progress bar if autoClear is true', function(done) {
    this.render(hbs`{{notification-message notification=notification}}`);

    expect(this.$('.countdown')).to.have.length(1, 'progress bar exists');
    expect(this.$('.countdown').css('animation-duration')).to.equal('0.1s', 'progress bar has correct animation duration');

    const initialWidth = this.$('.countdown').width();

    run.later(() => {
      expect(this.$('.countdown').width()).to.be.lt(initialWidth, 'progress bar shrunk');
      done();
    }, 50);
  })

  it('does not show progress bar is autoClear is false', function() {
    this.set('notification.autoClear', false);

    this.render(hbs`{{notification-message notification=notification}}`);

    expect(this.$('.countdown')).to.have.length(0);
  });

  it('clicking on close runs close action', function(done) {
    const notification = this.get('notification');

    const notificationsServiceStub = Service.extend({
      clear(n) {
        expect(n).to.equal(notification);
        done();
      }
    });

    this.register('service:notifications', notificationsServiceStub);
    this.render(hbs`{{notification-message notification=notification}}`);

    this.$('a').click();
  });

});
