import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import moment from 'moment';
import pickDate from '../../helpers/pick-date';

moduleForComponent('date-input', 'Integration | Component | date input', {
  integration: true
});

test('clicking the input toggles the picker', function(assert) {
  this.set('date', new Date());
  this.render(hbs`
    <div class="outside-div">Hello</div>
    {{date-input date=date select=(action (mut date))}}
  `);

  assert.equal(this.$('.date-input__picker').length, 0, 'Picker has not yet been rendered');

  this.$('.date-input__display').click();

  assert.equal(this.$('.date-input__picker').length, 1, 'Picker has been rendered');

  this.$('.outside-div').click();
  return wait().then(() => assert.equal(this.$('.date-input__picker').length, 0, 'Picker has been hidden'));
});

test('pickDate helper works', function(assert) {
  this.set('date', new Date('2019-01-01'));
  this.render(hbs`{{date-input date=date select=(action (mut date))}}`);

  pickDate(this.$, new Date('2020-02-02'));

  assert.equal(moment(this.get('date')).format('YYYY-MM-DD'), '2020-02-02', 'Date has been set');

  return wait().then(() => assert.equal(this.$('.date-input__picker').length, 0, 'Picker has been hidden'));
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
