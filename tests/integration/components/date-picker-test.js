import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('date-picker', 'Integration | Component | date picker', {
  integration: true
});

test('it renders all parts of the UI', function(assert) {
  assert.expect(8);

  this.set('changeDate', () => {}); // eslint-disable-line no-empty-function
  this.render(hbs`{{date-picker select=changeDate}}`);

  assert.equal(this.$().find('.date-picker').length, 1);
  assert.equal(this.$().find('.date-picker__header').length, 1);
  assert.equal(this.$().find('.date-picker__month-switch-button').length, 2);
  assert.equal(this.$().find('.date-picker__selected-date').length, 1);
  assert.equal(this.$().find('.date-picker__days-of-the-week').length, 1);
  assert.equal(this.$().find('.date-picker__day-of-the-week').length, 7);
  assert.equal(this.$().find('.date-picker__calendar').length, 1);
  assert.equal(this.$().find('.date-picker__day').length, 6 * 7);
});

test('can change month', function(assert) {
  assert.expect(5);

  this.set('date', new Date('2017-02-01'));
  this.set('changeDate', () => assert.ok(false), 'change date action should not be called');
  this.render(hbs`{{date-picker date=date select=changeDate}}`);

  const [ prevBtn, nextBtn ] = this.$('.date-picker__month-switch-button');

  assert.equal(getSelectedDate.apply(this), 'February 2017');
  prevBtn.click();

  return wait().then(() => {
    assert.equal(getSelectedDate.apply(this), 'January 2017');
    prevBtn.click();

    return wait();
  }).then(() => {
    assert.equal(getSelectedDate.apply(this), 'December 2016');
    nextBtn.click();

    return wait();
  }).then(() => {
    assert.equal(getSelectedDate.apply(this), 'January 2017');
    nextBtn.click();

    return wait();
  }).then(() => {
    assert.equal(getSelectedDate.apply(this), 'February 2017');
  });
});

test('can show selection', function(assert) {
  assert.expect(2);

  this.set('date', new Date('2017-02-01'));
  this.set('changeDate', () => assert.ok(false), 'change date action should not be called');
  this.render(hbs`{{date-picker date=date select=changeDate}}`);

  const [ prevBtn ] = this.$('.date-picker__month-switch-button');
  const [ selectedDate ] = this.$('.date-picker__selected-date');

  prevBtn.click();

  return wait().then(() => {
    assert.equal(getSelectedDate.apply(this), 'January 2017');
    selectedDate.click();

    return wait();
  }).then(() => {
    assert.equal(getSelectedDate.apply(this), 'February 2017');
  });
});

test('can make selection', function(assert) {
  assert.expect(2);

  this.set('date', new Date('2017-02-01'));
  this.set('changeDate', newDate => {
    this.set('date', newDate);
    assert.ok(true);
  });

  this.render(hbs`{{date-picker date=date select=changeDate}}`);

  const [ day ] = this.$('.date-picker__day');

  day.click();

  return wait().then(() => {
    assert.equal(getSelectedDate.apply(this), 'January 2017', 'clicking a date in an inactive month should select that month');
  });
});

function getSelectedDate() {
  return this.$('.date-picker__selected-date').text().trim().replace(/\s+/g, ' ');
}
