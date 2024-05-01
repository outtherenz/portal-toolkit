import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | value change indicator', function(hooks) {
  setupRenderingTest(hooks);

  const GOOD_CLASS = 'value-change-indicator--good';
  const BAD_CLASS = 'value-change-indicator--bad';
  const NO_CHANGE_CLASS = 'value-change-indicator--no-change';

  test('it shows uses the correct classes and arrows', async function(assert) {
    assert.expect(6);

    this.set('diff', 10);

    await render(hbs`{{value-change-indicator difference=diff}}`);

    assert.dom('.value-change-indicator').hasClass(GOOD_CLASS, 'good class on increase');
    assert.dom('.value-change-indicator .fa').hasClass('fa-arrow-up', 'up arrow on increase');

    this.set('diff', -10);

    assert.dom('.value-change-indicator').hasClass(BAD_CLASS, 'bad class on decrease');
    assert.dom('.value-change-indicator .fa').hasClass('fa-arrow-down', 'down arrow on decrease');

    this.set('diff', 0);

    assert.dom('.value-change-indicator').hasClass(NO_CHANGE_CLASS, 'no-change class on no change');
    assert.dom('.value-change-indicator .fa').hasText('', 'no icon on no change');
  });

  test('it does not add good, bad, and no-change classes if useColor is false', async function(assert) {
    assert.expect(6);

    this.set('diff', 10);

    await render(hbs`{{value-change-indicator difference=diff useColor=false}}`);

    assert.dom('.value-change-indicator').hasNoClass(GOOD_CLASS, 'no good class on increase');
    assert.dom('.value-change-indicator .fa').hasClass('fa-arrow-up', 'up arrow on increase');

    this.set('diff', -10);

    assert.dom('.value-change-indicator').hasNoClass(BAD_CLASS, 'no bad class on decrease');
    assert.dom('.value-change-indicator .fa').hasClass('fa-arrow-down', 'down arrow on decrease');

    this.set('diff', 0);

    assert.dom('.value-change-indicator').hasNoClass(NO_CHANGE_CLASS, 'no no-change class on no change');
    assert.dom('.value-change-indicator .fa').hasText('', 'no icon on no change');
  });

  test('it inverts behaviour when increaseIsGood is false', async function(assert) {
    assert.expect(6);

    this.set('diff', -10);

    await render(hbs`{{value-change-indicator difference=diff increaseIsGood=false}}`);

    assert.dom('.value-change-indicator').hasClass(GOOD_CLASS, 'good class on increase');
    assert.dom('.value-change-indicator .fa').hasClass('fa-arrow-down', 'down arrow on increase');

    this.set('diff', 10);

    assert.dom('.value-change-indicator').hasClass(BAD_CLASS, 'bad class on decrease');
    assert.dom('.value-change-indicator .fa').hasClass('fa-arrow-up', 'up arrow on decrease');

    this.set('diff', 0);

    assert.dom('.value-change-indicator').hasClass(NO_CHANGE_CLASS, 'no-change class on no change');
    assert.dom('.value-change-indicator .fa').hasText('', 'no icon on no change');
  });

  test('it can calculate a difference between two values', async function(assert) {
    assert.expect(6);

    this.set('from', 50);
    this.set('to', 100);

    await render(hbs`{{value-change-indicator from=from to=to}}`);

    assert.dom('.value-change-indicator').hasClass(GOOD_CLASS, 'good class on increase');
    assert.dom('.value-change-indicator .fa').hasClass('fa-arrow-up', 'up arrow on increase');

    this.set('from', 100);
    this.set('to', 50);

    assert.dom('.value-change-indicator').hasClass(BAD_CLASS, 'bad class on decrease');
    assert.dom('.value-change-indicator .fa').hasClass('fa-arrow-down', 'down arrow on decrease');

    this.set('to', 100);

    assert.dom('.value-change-indicator').hasClass(NO_CHANGE_CLASS, 'no-change class on no change');
    assert.dom('.value-change-indicator .fa').hasText('', 'no icon on no change');
  });
});
