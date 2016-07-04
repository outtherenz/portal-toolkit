import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('charts/data-table', 'Integration: ChartsDataTableComponent', { integration: true }, function() {
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#charts/data-table}}
    //     template content
    //   {{/charts/data-table}}
    // `);

    this.render(hbs`{{charts/data-table}}`);
    expect(this.$()).to.have.lengthOf(1);
  });
});
