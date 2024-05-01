import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

let print;

module('Integration | Component | print button', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    // Store the original window.print
    print = window.print;

    // Stub window.print with an event trigger
    window.print = function() {
      const event = new Event('print-stub');
      window.dispatchEvent(event);
    };
  });

  hooks.afterEach(function() {
    window.print = print;
  });

  test('it triggers window.print() when clicked', async function(assert) {
    assert.expect(0);

    const done = assert.async();

    await render(hbs`{{print-button}}`);

    // Listen for the event from the window.print stub
    window.addEventListener('print-stub', () => done());

    // Print
    await click('button');
  });

  test('it has the correct title attribute', async function(assert) {
    assert.expect(2);

    // Default
    await render(hbs`{{print-button}}`);
    assert.dom('button').hasAttribute('title', 'Print');

    // Custom
    await render(hbs`{{print-button title='Send to printer'}}`);
    assert.dom('button').hasAttribute('title', 'Send to printer');
  });
});
