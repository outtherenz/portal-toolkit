import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('value-change-indicator', 'Integration | Component | value change indicator', {
  integration: true
});

const GOOD_CLASS = 'value-change-indicator--good';
const BAD_CLASS = 'value-change-indicator--bad';
const NO_CHANGE_CLASS = 'value-change-indicator--no-change';

test('it shows uses the correct classes and arrows', function(assert) {
  assert.expect(6);

  this.set('diff', 10);

  this.render(hbs`{{value-change-indicator difference=diff}}`);

  assert.ok(this.$('.value-change-indicator').hasClass(GOOD_CLASS), 'good class on increase');
  assert.ok(this.$('.value-change-indicator .fa').hasClass('fa-arrow-up'), 'up arrow on increase');

  this.set('diff', -10);

  assert.ok(this.$('.value-change-indicator').hasClass(BAD_CLASS), 'bad class on decrease');
  assert.ok(this.$('.value-change-indicator .fa').hasClass('fa-arrow-down'), 'down arrow on decrease');

  this.set('diff', 0);

  assert.ok(this.$('.value-change-indicator').hasClass(NO_CHANGE_CLASS), 'no-change class on no change');
  assert.equal(this.$('.value-change-indicator .fa').text(), '', 'no icon on no change');
});

test('it does not add good, bad, and no-change classes if useColor is false', function(assert) {
  assert.expect(6);

  this.set('diff', 10);

  this.render(hbs`{{value-change-indicator difference=diff useColor=false}}`);

  assert.notOk(this.$('.value-change-indicator').hasClass(GOOD_CLASS), 'no good class on increase');
  assert.ok(this.$('.value-change-indicator .fa').hasClass('fa-arrow-up'), 'up arrow on increase');

  this.set('diff', -10);

  assert.notOk(this.$('.value-change-indicator').hasClass(BAD_CLASS), 'no bad class on decrease');
  assert.ok(this.$('.value-change-indicator .fa').hasClass('fa-arrow-down'), 'down arrow on decrease');

  this.set('diff', 0);

  assert.notOk(this.$('.value-change-indicator').hasClass(NO_CHANGE_CLASS), 'no no-change class on no change');
  assert.equal(this.$('.value-change-indicator .fa').text(), '', 'no icon on no change');
});

test('it inverts behaviour when increaseIsGood is false', function(assert) {
  assert.expect(6);

  this.set('diff', -10);

  this.render(hbs`{{value-change-indicator difference=diff increaseIsGood=false}}`);

  assert.ok(this.$('.value-change-indicator').hasClass(GOOD_CLASS), 'good class on increase');
  assert.ok(this.$('.value-change-indicator .fa').hasClass('fa-arrow-down'), 'down arrow on increase');

  this.set('diff', 10);

  assert.ok(this.$('.value-change-indicator').hasClass(BAD_CLASS), 'bad class on decrease');
  assert.ok(this.$('.value-change-indicator .fa').hasClass('fa-arrow-up'), 'up arrow on decrease');

  this.set('diff', 0);

  assert.ok(this.$('.value-change-indicator').hasClass(NO_CHANGE_CLASS), 'no-change class on no change');
  assert.equal(this.$('.value-change-indicator .fa').text(), '', 'no icon on no change');
});

test('it can calculate a difference between two values', function(assert) {
  assert.expect(6);

  this.set('from', 50);
  this.set('to', 100);

  this.render(hbs`{{value-change-indicator from=from to=to}}`);

  assert.ok(this.$('.value-change-indicator').hasClass(GOOD_CLASS), 'good class on increase');
  assert.ok(this.$('.value-change-indicator .fa').hasClass('fa-arrow-up'), 'up arrow on increase');

  this.set('from', 100);
  this.set('to', 50);

  assert.ok(this.$('.value-change-indicator').hasClass(BAD_CLASS), 'bad class on decrease');
  assert.ok(this.$('.value-change-indicator .fa').hasClass('fa-arrow-down'), 'down arrow on decrease');

  this.set('to', 100);

  assert.ok(this.$('.value-change-indicator').hasClass(NO_CHANGE_CLASS), 'no-change class on no change');
  assert.equal(this.$('.value-change-indicator .fa').text(), '', 'no icon on no change');
});
