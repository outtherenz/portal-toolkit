import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

function checkDate(expectedYear, expectedMonth) {
  const actualYear = this.$('select.year option:selected').val();
  const actualMonth = this.$('select.month option:selected').val();

  expect(actualYear).to.equal(expectedYear);
  expect(actualMonth).to.equal(expectedMonth);
}

describeComponent('month-picker', 'Integration: MonthPickerComponent', { integration: true }, function() {
  it('displays the correct date on init', function() {
    this.render(hbs`{{month-picker period='2050-04'}}`);

    const year = this.$('select.year option:selected').val();
    const month = this.$('select.month option:selected').val();

    expect(year).to.equal('2050');
    expect(month).to.equal('04');
  });

  it('has "month-picker" classname', function() {
    this.render(hbs`{{month-picker period='2050-09'}}`);
    expect(this.$('.month-picker')).to.have.lengthOf(1);
  });

  it('can change month', function() {
    this.render(hbs`{{month-picker period='2050-11'}}`);

    this.$('button:nth-of-type(3)').click();
    checkDate.call(this, '2050', '12');

    this.$('button:nth-of-type(3)').click();
    checkDate.call(this, '2051', '01');

    this.$('button:nth-of-type(1)').click();
    checkDate.call(this, '2050', '01');

    this.$('button:nth-of-type(2)').click();
    checkDate.call(this, '2049', '12');

    this.$('button:nth-of-type(2)').click();
    checkDate.call(this, '2049', '11');

    this.$('button:nth-of-type(4)').click();
    checkDate.call(this, '2050', '11');
  });

  it('updates the bound period field when a new date is selected', function() {
    this.set('period', '2050-05');
    this.render(hbs`{{month-picker period=period}}`);
    this.$('select.year').val('2047').trigger('change');
    this.$('select.month').val('02').trigger('change');
    expect(this.get('period')).to.equal('2047-02');
  });

  it('lists at least 8 years in the past and 2 in the future', function() {
    const thisYear = new Date().getFullYear();
    this.set('period', `${thisYear}-06`);
    this.render(hbs`{{month-picker period=period}}`);

    expect(this.$(`select.year option[value=${thisYear - 9}]`)).to.have.lengthOf(0);
    expect(this.$(`select.year option[value=${thisYear - 8}]`)).to.have.lengthOf(1);
    expect(this.$(`select.year option[value=${thisYear + 2}]`)).to.have.lengthOf(1);
    expect(this.$(`select.year option[value=${thisYear + 3}]`)).to.have.lengthOf(0);
  });

  it('always lists at least 2 years before and after the selected year', function() {
    const thisYear = new Date().getFullYear();
    this.set('period', `${thisYear - 10}-06`);
    this.render(hbs`{{month-picker period=period}}`);

    expect(this.$(`select.year option[value=${thisYear - 12}]`)).to.have.lengthOf(1);
    expect(this.$(`select.year option[value=${thisYear - 13}]`)).to.have.lengthOf(0);

    this.set('period', `${thisYear + 10}-06`);

    expect(this.$(`select.year option[value=${thisYear + 12}]`)).to.have.lengthOf(1);
    expect(this.$(`select.year option[value=${thisYear + 13}]`)).to.have.lengthOf(0);
  });
});
