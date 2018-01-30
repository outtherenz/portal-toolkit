import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('duration-input', 'Integration | Component | duration input', {
  integration: true
});

test('inits with defualt placeholder', function(assert) {
  this.render(hbs`{{duration-input duration=duration}}`);
  assert.equal(this.$('input').attr('placeholder'), '0:00');
});

test('inits with dash placeholder', function(assert) {
  this.render(hbs`{{duration-input duration=duration placeholder='–'}}`);
  assert.equal(this.$('input').attr('placeholder'), '–');
});

test('formats on init', function(assert) {
  this.render(hbs`{{duration-input duration='5.75'}}`);
  assert.equal(this.$('input').val(), '5:45');
});

test('formats on blur', function(assert) {
  this.render(hbs`{{duration-input duration=duration}}`);
  this.$('input').val('3:30').blur();

  return wait().then(() => {
    assert.equal(this.$('input').val(), '3:30');
    assert.equal(this.get('duration'), 3.5);
  });
});

test('reformats when value is updated', function(assert) {
  this.render(hbs`{{duration-input duration=duration}}`);

  return wait().then(() => {
    this.set('duration', 6.75);
  }).then(() => {
    assert.equal(this.$('input').val(), '6:45');
  });
});
