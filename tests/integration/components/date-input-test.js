import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  settled,
  click,
  findAll,
  find
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import pickDate from '../../helpers/pick-date';

module('Integration | Component | date input', function(hooks) {
  setupRenderingTest(hooks);

  test('clicking the input toggles the picker', async function(assert) {
    this.set('date', new Date());
    await render(hbs`
      <div class="outside-div">Hello</div>
      {{date-input date=date select=(action (mut date))}}
    `);

    assert.dom('.date-input__picker').doesNotExist('Picker has not yet been rendered');

    await click('.date-input__display');

    assert.dom('.date-input__picker').exists({ count: 1 }, 'Picker has been rendered');

    await click('.outside-div');
    return settled().then(() => assert.dom('.date-input__picker').doesNotExist('Picker has been hidden'));
  });

  test('pickDate helper works', async function(assert) {
    this.set('date', new Date('2019-01-01'));
    await render(hbs`{{date-input date=date select=(action (mut date))}}`);

    pickDate(this.$, new Date('2020-02-02'));

    assert.equal(moment(this.date).format('YYYY-MM-DD'), '2020-02-02', 'Date has been set');

    return settled().then(() => assert.dom('.date-input__picker').doesNotExist('Picker has been hidden'));
  });

  test('if provided, a format string is used', async function(assert) {
    this.set('date', new Date('2017-01-01'));
    this.set('format', 'ddd');
    await render(hbs`{{date-input date=date format=format select=(action (mut date))}}`);

    assert.dom('.date-input__display').hasText('Sun');
  });

  test('the select action is fired when a date is selected', async function(assert) {
    assert.expect(1);

    this.set('date', new Date('2017-01-01'));
    this.set('select', () => assert.ok(1));
    await render(hbs`{{date-input date=date isActive=true select=select}}`);

    await click('.date-picker__day');
  });
});
