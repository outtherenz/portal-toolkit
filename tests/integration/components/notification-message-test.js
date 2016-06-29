import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { Service } = Ember;

describeComponent('notification-message', 'Integration: NotificationMessageComponent', { integration: true }, function() {

  it('renders error notification in inline form', function() {
    const errorNotification = {autoClear: true, clearDuration: 3500, message: 'test-error', type: 'error'};
    this.set('notification', errorNotification);
    this.render(hbs`{{notification-message notification=notification}}`);
    expect(this.$('div.content').text()).to.contain('test-error');
    expect(this.$('div.icon i').attr('class')).to.contain('fa-exclamation-circle');
  });

  it('renders info notification in inline form', function() {
    const infoNotification = {autoClear: true, clearDuration: 3500, message: 'test-info', type: 'info'};
    this.set('notification', infoNotification);
    this.render(hbs`{{notification-message notification=notification}}`);
    expect(this.$('div.content').text()).to.contain('test-info');
    expect(this.$('div.icon i').attr('class')).to.contain('fa-info-circle');
  });

  it('renders warning notification in inline form', function() {
    const warningNotification = {autoClear: true, clearDuration: 3500, message: 'test-warning', type: 'warning'};
    this.set('notification', warningNotification);
    this.render(hbs`{{notification-message notification=notification}}`);
    expect(this.$('div.content').text()).to.contain('test-warning');
    expect(this.$('div.icon i').attr('class')).to.contain('fa-warning');
  });

  it('renders success notification in inline form', function() {
    const successNotification = {autoClear: true, clearDuration: 3500, message: 'test-success', type: 'success'};
    this.set('notification', successNotification);
    this.render(hbs`{{notification-message notification=notification}}`);
    expect(this.$('div.content').text()).to.contain('test-success');
    expect(this.$('div.icon i').attr('class')).to.contain('fa-check');
  });

  it('If not autoClear, doesnt display counter', function() {
    const notAutoclear = {autoClear: false, clearDuration: 3500, message: 'test-success', type: 'success'};
    this.set('notification', notAutoclear);
    this.render(hbs`{{notification-message notification=notification}}`);
    expect(this.$('div.countdown')).to.have.lengthOf(0);
  });

  it('If autoClear, displays counter', function() {
    const notAutoclear = {autoClear: true, clearDuration: 3500, message: 'test-success', type: 'success'};
    this.set('notification', notAutoclear);
    this.render(hbs`{{notification-message notification=notification}}`);
    expect(this.$('div.countdown')).not.to.have.lengthOf(0);
  });

  it('test long duration testing', function() {
    const longDuration = {autoClear: true, clearDuration: 35000, message: 'test-success', type: 'success'};
    this.set('notification', longDuration);
    this.render(hbs`{{notification-message notification=notification}}`);
    expect(this.$('div.countdown').css('animation-duration')).to.be.equal('35s');
  });

  it('test short duration testing', function() {
    const shortDuration = {autoClear: true, clearDuration: 350, message: 'test-success', type: 'success'};
    this.set('notification', shortDuration);
    this.render(hbs`{{notification-message notification=notification}}`);
    expect(this.$('div.countdown').css('animation-duration')).to.be.equal('0.35s');
  });

  it('clicking on close runs close action', function(done) {
    const stub = Service.extend({

      clear() {
        done();
      }
    });
    const longDuration = {autoClear: true, clearDuration: 35000, message: 'test-success', type: 'success'};
    this.register('service:notifications', stub);
    this.set('notification', longDuration);
    this.render(hbs`{{notification-message notification=notification}}`);
    this.$('a').click();
  });

});
