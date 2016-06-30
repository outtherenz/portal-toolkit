import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('radio-slider', 'Integration: RadioSliderComponent', { integration: true }, function() {
  it.only('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#radio-slider}}
    //     template content
    //   {{/radio-slider}}
    // `);

    const radioConst = [
      { label: 'Month', value: 'month' },
      { label: 'YTD', value: 'ytd' }
    ];

    const periodConst = 'month';

    this.set('radioContent', radioConst);
    this.set('periodType', periodConst);
    this.render(hbs`{{radio-slider selected=periodType options=radioContent }}`);
    expect(this.$()).to.have.lengthOf(1);
  });
});
