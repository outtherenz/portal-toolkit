import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

let print;

moduleForComponent('print-button', 'Integration | Component | print button', {
  integration: true,

  beforeEach() {
    // Store the original window.print
    print = window.print;

    // Stub window.print with an event trigger
    window.print = function() {
      const event = new Event('print-stub');
      window.dispatchEvent(event);
    };
  },

  afterEach() {
    window.print = print;
  }
});

test('it triggers window.print() when clicked', function(assert) {
  assert.expect(0);

  const done = assert.async();

  this.render(hbs`{{print-button}}`);

  // Listen for the event from the window.print stub
  window.addEventListener('print-stub', () => done());

  // Print
  this.$('button').click();
});

test('it has the correct title attribute', function(assert) {
  assert.expect(2);

  // Default
  this.render(hbs`{{print-button}}`);
  assert.equal(this.$('button').attr('title'), 'Print');

  // Custom
  this.render(hbs`{{print-button title='Send to printer'}}`);
  assert.equal(this.$('button').attr('title'), 'Send to printer');
});
