import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  click,
  find,
  findAll,
  fillIn
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | month picker', function(hooks) {
  setupRenderingTest(hooks);

  function checkDate(assert, expectedYear, expectedMonth) {
    const actualYear = find('select.year option:checked').value;
    const actualMonth = find('select.month option:checked').value;

    assert.equal(actualYear, expectedYear);
    assert.equal(actualMonth, expectedMonth);
  }

  test('it displays the correct date on init', async function(assert) {
    assert.expect(2);

    await render(hbs`{{month-picker period='2050-04'}}`);

    const year = find('select.year option:checked').value;
    const month = find('select.month option:checked').value;

    assert.equal(year, '2050');
    assert.equal(month, '04');
  });

  test('it has "month-picker" classname', async function(assert) {
    assert.expect(1);

    await render(hbs`{{month-picker period='2050-09'}}`);
    assert.dom('.month-picker').exists({ count: 1 });
  });

  test('it can change month', async function(assert) {
    assert.expect(12);

    await render(hbs`{{month-picker period='2050-11'}}`);

    await click('button:nth-of-type(3)');
    checkDate.call(this, assert, '2050', '12');

    await click('button:nth-of-type(3)');
    checkDate.call(this, assert, '2051', '01');

    await click('button:nth-of-type(1)');
    checkDate.call(this, assert, '2050', '01');

    await click('button:nth-of-type(2)');
    checkDate.call(this, assert, '2049', '12');

    await click('button:nth-of-type(2)');
    checkDate.call(this, assert, '2049', '11');

    await click('button:nth-of-type(4)');
    checkDate.call(this, assert, '2050', '11');
  });

  test('it updates the bound period field when a new date is selected', async function(assert) {
    assert.expect(1);

    this.set('period', '2050-05');
    await render(hbs`{{month-picker period=period}}`);
    await fillIn('select.year', '2047');
    await fillIn('select.month', '02');

    assert.equal(this.period, '2047-02');
  });

  test('it lists at least 8 years in the past and 2 in the future', async function(assert) {
    assert.expect(4);

    const thisYear = new Date().getFullYear();
    this.set('period', `${thisYear}-06`);
    await render(hbs`{{month-picker period=period}}`);

    assert.equal(this.$(`select.year option[value=${thisYear - 9}]`).length, 0);
    assert.equal(this.$(`select.year option[value=${thisYear - 8}]`).length, 1);
    assert.equal(this.$(`select.year option[value=${thisYear + 2}]`).length, 1);
    assert.equal(this.$(`select.year option[value=${thisYear + 3}]`).length, 0);
  });

  test('it always lists at least 2 years before and after the selected year', async function(assert) {
    assert.expect(4);

    const thisYear = new Date().getFullYear();
    this.set('period', `${thisYear - 10}-06`);
    await render(hbs`{{month-picker period=period}}`);

    assert.equal(this.$(`select.year option[value=${thisYear - 12}]`).length, 1);
    assert.equal(this.$(`select.year option[value=${thisYear - 13}]`).length, 0);

    this.set('period', `${thisYear + 10}-06`);

    assert.equal(this.$(`select.year option[value=${thisYear + 12}]`).length, 1);
    assert.equal(this.$(`select.year option[value=${thisYear + 13}]`).length, 0);
  });
});
