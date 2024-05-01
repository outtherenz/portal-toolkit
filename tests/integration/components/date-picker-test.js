import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | date picker', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders all parts of the UI', async function(assert) {
    assert.expect(8);

    this.set('changeDate', () => {}); // eslint-disable-line no-empty-function
    await render(hbs`{{date-picker select=changeDate}}`);

    assert.equal(this.$().find('.date-picker').length, 1);
    assert.equal(this.$().find('.date-picker__header').length, 1);
    assert.equal(this.$().find('.date-picker__month-switch-button').length, 2);
    assert.equal(this.$().find('.date-picker__selected-date').length, 1);
    assert.equal(this.$().find('.date-picker__days-of-the-week').length, 1);
    assert.equal(this.$().find('.date-picker__day-of-the-week').length, 7);
    assert.equal(this.$().find('.date-picker__calendar').length, 1);
    assert.equal(this.$().find('.date-picker__day').length, 6 * 7);
  });

  test('can change month', async function(assert) {
    assert.expect(5);

    this.set('date', new Date('2017-02-01'));
    this.set('changeDate', () => assert.ok(false), 'change date action should not be called');
    await render(hbs`{{date-picker date=date select=changeDate}}`);

    const [ prevBtn, nextBtn ] = this.$('.date-picker__month-switch-button');

    assert.equal(getSelectedDate.apply(this), 'February 2017');
    prevBtn.click();

    return settled().then(() => {
      assert.equal(getSelectedDate.apply(this), 'January 2017');
      prevBtn.click();

      return settled();
    }).then(() => {
      assert.equal(getSelectedDate.apply(this), 'December 2016');
      nextBtn.click();

      return settled();
    }).then(() => {
      assert.equal(getSelectedDate.apply(this), 'January 2017');
      nextBtn.click();

      return settled();
    }).then(() => {
      assert.equal(getSelectedDate.apply(this), 'February 2017');
    });
  });

  test('can show selection', async function(assert) {
    assert.expect(2);

    this.set('date', new Date('2017-02-01'));
    this.set('changeDate', () => assert.ok(false), 'change date action should not be called');
    await render(hbs`{{date-picker date=date select=changeDate}}`);

    const [ prevBtn ] = this.$('.date-picker__month-switch-button');
    const [ selectedDate ] = this.$('.date-picker__selected-date');

    prevBtn.click();

    return settled().then(() => {
      assert.equal(getSelectedDate.apply(this), 'January 2017');
      selectedDate.click();

      return settled();
    }).then(() => {
      assert.equal(getSelectedDate.apply(this), 'February 2017');
    });
  });

  test('can make selection', async function(assert) {
    assert.expect(2);

    this.set('date', new Date('2017-02-01'));
    this.set('changeDate', newDate => {
      this.set('date', newDate);
      assert.ok(true);
    });

    await render(hbs`{{date-picker date=date select=changeDate}}`);

    const [ day ] = this.$('.date-picker__day');

    day.click();

    return settled().then(() => {
      assert.equal(getSelectedDate.apply(this), 'January 2017', 'clicking a date in an inactive month should select that month');
    });
  });

  function getSelectedDate() {
    return find('.date-picker__selected-date').textContent.trim().replace(/\s+/g, ' ');
  }
});
