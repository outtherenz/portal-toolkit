import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, findAll, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | loading button', function(hooks) {
  setupRenderingTest(hooks);

  test('renders in inline form', async function(assert) {
    assert.expect(1);

    await render(hbs`{{loading-button buttonText='Test'}}`);

    assert.dom('button').hasText('Test');
  });

  test('renders in block form', async function(assert) {
    assert.expect(1);

    await render(hbs`{{#loading-button}}Test{{/loading-button}}`);

    assert.dom('button').hasText('Test');
  });

  test('shows a loading icon when loading', async function(assert) {
    assert.expect(5);

    await render(hbs`{{loading-button isLoading=isLoading}}`);

    // Record the inital style attributes for comparison later
    const styleBefore = getComputedStyle(this.$('button')[0]);

    // Start loading
    this.set('isLoading', true);

    // Check the button is disabled and the icon is shown
    assert.ok(this.$('button')[0].disabled);
    assert.dom('button i.fa').exists({ count: 1 });

    // Check the dimensions of the button didn't change
    const styleAfter = getComputedStyle(this.$('button')[0]);
    assert.equal(styleBefore.width, styleAfter.width);
    assert.equal(styleBefore.height, styleAfter.height);

    // Check everything returns to normal once loading finishes
    this.set('isLoading', false);
    assert.dom('button').hasText('Submit');
  });

  test('triggers action when clicked', async function(assert) {
    assert.expect(0);

    const done = assert.async();

    this.set('test', done);
    await render(hbs`{{loading-button action=(action test)}}`);
    await click('button');
  });
});
