import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('date-input', 'Integration | Component | date input', {
  integration: true
});

test('clicking the input toggles the picker', function(assert) {
  this.set('date', new Date());
  this.render(hbs`{{date-input date=date select=(action (mut date))}}`);

  assert.equal(this.$('.date-input__picker').length, 0);

  const display = this.$('.date-input__display');

  display.click();

  return wait().then(() => {
    assert.equal(this.$('.date-input__picker').length, 1);
    display.click();
  }).then(() => {
    assert.equal(this.$('.date-input__picker').length, 0);
  });
});

test('clicking the overlay hides the picker', function(assert) {
  this.set('date', new Date());
  this.render(hbs`{{date-input date=date isActive=true select=(action (mut date))}}`);

  this.$('.date-input__overlay').click();

  return wait().then(() => {
    assert.equal(this.$('.date-input__picker').length, 0);
  });
});

test('if provided, a format string is used', function(assert) {
  this.set('date', new Date('2017-01-01'));
  this.set('format', 'ddd');
  this.render(hbs`{{date-input date=date format=format select=(action (mut date))}}`);

  assert.equal(this.$('.date-input__display').text().trim(), 'Sun');
});

test('the select action is fired when a date is selected', function(assert) {
  assert.expect(1);

  this.set('date', new Date('2017-01-01'));
  this.set('select', () => assert.ok(1));
  this.render(hbs`{{date-input date=date isActive=true select=select}}`);

  this.$('.date-picker__day').click();
});
