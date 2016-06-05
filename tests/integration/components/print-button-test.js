import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import { before, after } from 'mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('print-button', 'Integration: PrintButtonComponent', { integration: true }, function() {
  let print;

  before(function() {
    // Store the original window.print
    print = window.print;

    // Stub window.print with an event trigger
    window.print = function() {
      const event = new Event('print-stub');
      window.dispatchEvent(event);
    };
  });

  after(function() {
    window.print = print;
  });

  it('triggers window.print() when clicked', function(done) {
    this.render(hbs`{{print-button}}`);

    // Listen for the event from the window.print stub
    window.addEventListener('print-stub', () => done());

    // Print
    this.$('button').click();
  });

  it('has the correct title attribute', function() {
    // Default
    this.render(hbs`{{print-button}}`);
    expect(this.$('button').attr('title')).to.equal('Print');

    // Custom
    this.render(hbs`{{print-button title='Send to printer'}}`);
    expect(this.$('button').attr('title')).to.equal('Send to printer');
  });
});
