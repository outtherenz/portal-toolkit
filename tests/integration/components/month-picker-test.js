import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('month-picker', 'Integration | Component | month picker', {
  integration: true
});

function checkDate(assert, expectedYear, expectedMonth) {
  const actualYear = this.$('select.year option:selected').val();
  const actualMonth = this.$('select.month option:selected').val();

  assert.equal(actualYear, expectedYear);
  assert.equal(actualMonth, expectedMonth);
}

test('it displays the correct date on init', function(assert) {
  assert.expect(2);

  this.render(hbs`{{month-picker period='2050-04'}}`);

  const year = this.$('select.year option:selected').val();
  const month = this.$('select.month option:selected').val();

  assert.equal(year, '2050');
  assert.equal(month, '04');
});

test('it has "month-picker" classname', function(assert) {
  assert.expect(1);

  this.render(hbs`{{month-picker period='2050-09'}}`);
  assert.equal(this.$('.month-picker').length, 1);
});

test('it can change month', function(assert) {
  assert.expect(12);

  this.render(hbs`{{month-picker period='2050-11'}}`);

  this.$('button:nth-of-type(3)').click();
  checkDate.call(this, assert, '2050', '12');

  this.$('button:nth-of-type(3)').click();
  checkDate.call(this, assert, '2051', '01');

  this.$('button:nth-of-type(1)').click();
  checkDate.call(this, assert, '2050', '01');

  this.$('button:nth-of-type(2)').click();
  checkDate.call(this, assert, '2049', '12');

  this.$('button:nth-of-type(2)').click();
  checkDate.call(this, assert, '2049', '11');

  this.$('button:nth-of-type(4)').click();
  checkDate.call(this, assert, '2050', '11');
});

test('it updates the bound period field when a new date is selected', function(assert) {
  assert.expect(1);

  this.set('period', '2050-05');
  this.render(hbs`{{month-picker period=period}}`);
  this.$('select.year').val('2047').trigger('change');
  this.$('select.month').val('02').trigger('change');

  assert.equal(this.get('period'), '2047-02');
});

test('it lists at least 8 years in the past and 2 in the future', function(assert) {
  assert.expect(4);

  const thisYear = new Date().getFullYear();
  this.set('period', `${thisYear}-06`);
  this.render(hbs`{{month-picker period=period}}`);

  assert.equal(this.$(`select.year option[value=${thisYear - 9}]`).length, 0);
  assert.equal(this.$(`select.year option[value=${thisYear - 8}]`).length, 1);
  assert.equal(this.$(`select.year option[value=${thisYear + 2}]`).length, 1);
  assert.equal(this.$(`select.year option[value=${thisYear + 3}]`).length, 0);
});

test('it always lists at least 2 years before and after the selected year', function(assert) {
  assert.expect(4);

  const thisYear = new Date().getFullYear();
  this.set('period', `${thisYear - 10}-06`);
  this.render(hbs`{{month-picker period=period}}`);

  assert.equal(this.$(`select.year option[value=${thisYear - 12}]`).length, 1);
  assert.equal(this.$(`select.year option[value=${thisYear - 13}]`).length, 0);

  this.set('period', `${thisYear + 10}-06`);

  assert.equal(this.$(`select.year option[value=${thisYear + 12}]`).length, 1);
  assert.equal(this.$(`select.year option[value=${thisYear + 13}]`).length, 0);
});
