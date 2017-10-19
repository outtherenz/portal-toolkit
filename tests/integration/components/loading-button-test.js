import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('loading-button', 'Integration | Component | loading button', {
  integration: true
});

test('renders in inline form', function(assert) {
  assert.expect(1);

  this.render(hbs`{{loading-button buttonText='Test'}}`);

  assert.equal(this.$('button').text(), 'Test');
});

test('renders in block form', function(assert) {
  assert.expect(1);

  this.render(hbs`{{#loading-button}}Test{{/loading-button}}`);

  assert.equal(this.$('button').text(), 'Test');
});

test('shows a loading icon when loading', function(assert) {
  assert.expect(5);

  this.render(hbs`{{loading-button isLoading=isLoading}}`);

  // Record the inital style attributes for comparison later
  const styleBefore = getComputedStyle(this.$('button')[0]);

  // Start loading
  this.set('isLoading', true);

  // Check the button is disabled and the icon is shown
  assert.ok(this.$('button')[0].disabled);
  assert.equal(this.$('button i.fa').length, 1);

  // Check the dimensions of the button didn't change
  const styleAfter = getComputedStyle(this.$('button')[0]);
  assert.equal(styleBefore.width, styleAfter.width);
  assert.equal(styleBefore.height, styleAfter.height);

  // Check everything returns to normal once loading finishes
  this.set('isLoading', false);
  assert.equal(this.$('button').text(), 'Submit');
});

test('triggers action when clicked', function(assert) {
  assert.expect(0);

  const done = assert.async();

  this.set('test', done);
  this.render(hbs`{{loading-button action=(action test)}}`);
  this.$('button').click();
});
